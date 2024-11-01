import Vue from 'vue';


let types = [
  { type: 'folders', unique: 'path' },
  { type: 'files', unique: 'id' },
];


export default {

  namespace: 'selected',


  state: {
    folders: {},
    files: {},
    prev: {
      folders: {},
      files: {},
    },
    last: null,
  },


  mutations: {

    SELECTED_TRAVERSE({ state }, { select, deselect }) {
      for (let { type, unique } of types) {
        for (let entity of select[type]) {
          Vue.set(state.selected[type], entity[unique], entity);
        }

        for (let entity of deselect[type]) {
          Vue.delete(state.selected[type], entity[unique]);
        }
      }
    },

    SELECTED_PREV_CHANGE({ state }, { prev }) {
      state.selected.prev = prev;
    },

    SELECTED_LAST_CHANGE({ state }, { last }) {
      state.selected.last = last;
    },

    SELECTED_FOLDERS_PATH_REPLACE({ state }, { folder, path }) {
      Vue.delete(state.selected.folders, folder.path);
      Vue.set(state.selected.folders, path, folder);
    },

  },


  actions: {

    SELECTED_TRAVERSE: true,
    SELECTED_PREV_CHANGE: true,
    SELECTED_LAST_CHANGE: true,
    SELECTED_FOLDERS_PATH_REPLACE: true,

    APP_ENABLE: 'SELECTED_RESET',
    CURRENT_CHANGE_after: 'SELECTED_RESET',
    FILTERS_MIME_CHANGE_after: 'SELECTED_RESET',
    FILTERS_EXT_CHANGE_after: 'SELECTED_RESET',
    FILTERS_YEAR_CHANGE_after: 'SELECTED_RESET',
    FILTERS_MONTH_CHANGE_after: 'SELECTED_RESET',
    FILTERS_DAY_CHANGE_after: 'SELECTED_RESET',
    SEARCH_TEXT_CHANGE_after: 'SELECTED_RESET',
    SEARCH_CURRENT_CHANGE_after: 'SELECTED_RESET',
    SEARCH_DEEP_CHANGE_after: 'SELECTED_RESET',
    ADD_FOLDER_START: 'SELECTED_RESET',


    SELECTED_RESET({ state, getters, dispatch }) {
      let select = {
        folders: [],
        files: [],
      };

      let deselect = {
        folders: Object.values(state.selected.folders),
        files: Object.values(state.selected.files),
      };

      if (state.selected.last !== null) {
        dispatch('SELECTED_LAST_CHANGE', { last: null });
      }

      if (select.folders.length > 0 || select.files.length > 0 || deselect.folders.length > 0 || deselect.files.length > 0) {
        dispatch('SELECTED_TRAVERSE', { select, deselect });
      }
    },


    SELECTED_MOUSE_DOWN_LEFT({ state, getters, dispatch }, { event, entity, type, unique }) {
      let select = {
        folders: [],
        files: [],
      };

      let deselect = {
        folders: [],
        files: [],
      };

      let prev = {
        folders: Object.assign({}, state.selected.folders),
        files: Object.assign({}, state.selected.files),
      };

      dispatch('SELECTED_PREV_CHANGE', { prev });

      selectLeft(state, getters, select, deselect, event, entity, type, unique);

      if (entity !== state.selected.last) {
        dispatch('SELECTED_LAST_CHANGE', { last: entity });
      }

      if (select.folders.length === 0 && select.files.length === 0 && deselect.folders.length === 0 && deselect.files.length === 0) {
        return;
      }

      dispatch('SELECTED_TRAVERSE', { select, deselect });
    },


    SELECTED_MOUSE_UP_LEFT({ state, dispatch }, { event, entity, type, unique }) {
      let prev = state.selected.prev;
      let wasSelected = !!prev[type][entity[unique]];

      if (!wasSelected || event.shiftKey) {
        return;
      }

      let select = {
        folders: [],
        files: [],
      };

      let deselect = {
        folders: [],
        files: [],
      };

      selectUp(state, select, deselect, event, entity, type, unique);

      if (select.folders.length === 0 && select.files.length === 0 && deselect.folders.length === 0 && deselect.files.length === 0) {
        return;
      }

      dispatch('SELECTED_TRAVERSE', { select, deselect });
    },


    SELECTED_MOUSE_DOWN_RIGHT({ state, dispatch }, { event, entity, type, unique }) {
      let wasSelected = !!state.selected[type][entity[unique]];

      if (wasSelected) {
        return;
      }

      let select = {
        folders: [],
        files: [],
      };

      let deselect = {
        folders: [],
        files: [],
      };

      selectRight(state, select, deselect, event, entity, type, unique);

      if (entity !== state.selected.last) {
        dispatch('SELECTED_LAST_CHANGE', { last: entity });
      }

      if (select.folders.length === 0 && select.files.length === 0 && deselect.folders.length === 0 && deselect.files.length === 0) {
        return;
      }

      dispatch('SELECTED_TRAVERSE', { select, deselect });
    },


    SELECT_ALL({ state, getters, dispatch }) {
      let select = {
        folders: getters['folders/explorer/filtered'],
        files: getters['files/explorer/filtered'],
      };

      let deselect = {
        folders: [],
        files: [],
      };

      if (select.folders.length === 0 && select.files.length === 0) {
        return;
      }

      if (!state.selected.last) {
        let last = select.folders.length > 0
          ? select.folders[0]
          : select.files[0]

        dispatch('SELECTED_LAST_CHANGE', { last });
      }

      dispatch('SELECTED_TRAVERSE', { select, deselect });
    },


    DESELECT_ALL({ state, dispatch }, { event }) {
      if (event.shiftKey || event.ctrlKey || event.metaKey) {
        return;
      }

      let select = {
        folders: [],
        files: [],
      };

      let deselect = {
        folders: Object.values(state.selected.folders),
        files: Object.values(state.selected.files),
      };

      if (deselect.folders.length === 0 && deselect.files.length === 0) {
        return;
      }

      dispatch('SELECTED_TRAVERSE', { select, deselect });
    },


    KEYDOWN({ state, storage, getters, dispatch }, { event }) {
      if (!getters['explorer/focused']) {
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
        event.preventDefault();
        dispatch('SELECT_ALL');
        return;
      }

      let isLeft = event.key === 'Left' || event.key === 'ArrowLeft';
      let isRight = event.key === 'Right' || event.key === 'ArrowRight';
      let isUp = event.key === 'Up' || event.key === 'ArrowUp';
      let isDown = event.key === 'Down' || event.key === 'ArrowDown';

      if (isLeft || isRight || isUp || isDown) {
        let entity = null;
        let last = state.selected.last;

        let entities = []
          .concat(getters['folders/explorer/filtered'])
          .concat(getters['files/explorer/filtered']);

        if (entities.length === 0) {
          return;
        }

        if (isLeft) {
          event.preventDefault();

          if (last !== null) {
            let index = entities.indexOf(last) - 1;
            entity = entities[index] || null;
          }
        }

        if (isRight) {
          event.preventDefault();

          if (last !== null) {
            let index = entities.indexOf(last) + 1;
            entity = entities[index] || null;
          } else {
            entity = entities[0];
          }
        }

        if (isUp) {
          event.preventDefault();

          if (last !== null) {
            let index = entities.indexOf(last) - state.explorer.columns;
            entity = entities[index] || entities[0];
          }
        }

        if (isDown) {
          event.preventDefault();

          if (last !== null) {
            let index = entities.indexOf(last) + state.explorer.columns;
            entity = entities[index] || entities[entities.length - 1];
          } else {
            entity = entities[0];
          }
        }

        if (entity !== null) {
          let select = {
            folders: [],
            files: [],
          };

          let deselect = {
            folders: [],
            files: [],
          };

          let type = !entity.id
            ? 'folders'
            : 'files';

          let unique = !entity.id
            ? 'path'
            : 'id';

          let $explorer = storage.explorer.self.$el;

          for (let component of Object.values(storage.explorer[type])) {
            if (entity === component.entity) {
              let $entity = component.$el;

              let topDiff = $explorer.scrollTop - $entity.offsetTop + 16;
              let bottomDiff = $entity.offsetTop + $entity.offsetHeight - $explorer.scrollTop - $explorer.offsetHeight + 16;

              if (topDiff > 0) {
                $explorer.scrollTop -= topDiff;
              }

              if (bottomDiff > 0) {
                $explorer.scrollTop += bottomDiff;
              }

              break;
            }
          }

          if (!state.selected[type][entity[unique]]) {
            select[type].push(entity);
          }

          deselectExcept(state, deselect, entity);

          dispatch('SELECTED_LAST_CHANGE', { last: entity });
          dispatch('SELECTED_TRAVERSE', { select, deselect });
        }

        return;
      }
    },


    CURRENT_UP_after({ state, dispatch }, { prev, current }) {
      if (!prev) {
        return;
      }

      let select = {
        folders: [prev],
        files: [],
      };

      let deselect = {
        folders: [],
        files: [],
      };

      dispatch('SELECTED_LAST_CHANGE', { last: prev });
      dispatch('SELECTED_TRAVERSE', { select, deselect });
    },


    FOLDER_RENAME_REQUEST_SUCCESS_before({ state, dispatch }, { resp, folder, path, allFolders }) {
      if (state.selected.folders[folder.path]) {
        dispatch('SELECTED_FOLDERS_PATH_REPLACE', { folder, path });
      }

      for (let item of allFolders) {
        let folder = item.folder;

        if (state.selected.folders[folder.path] && !resp.errors.folders[folder.path]) {
          dispatch('SELECTED_FOLDERS_PATH_REPLACE', { folder, path: item.path });
        }
      }
    },


    FOLDER_CREATE_REQUEST_SUCCESS_after({ state, getters, dispatch }, { path }) {
      let folder = state.folders[path];

      let select = { folders: [], files: [] };
      let deselect = { folders: [], files: [] };

      if (getters['folders/explorer/filtered'].indexOf(folder) !== -1) {
        select.folders.push(folder);
      }

      dispatch('SELECTED_LAST_CHANGE', { last: folder });
      dispatch('SELECTED_TRAVERSE', { select, deselect });
    },


    UPLOAD_FOLDERS_REQUEST_SUCCESS_after({ state, getters, dispatch }, { resp, paths }) {
      let select = { folders: [], files: [] };
      let deselect = { folders: [], files: [] };

      for (let path of paths) {
        if (!resp.errors[path]) {
          let folder = state.folders[path];
          
          if (getters['folders/explorer/filtered'].indexOf(folder) !== -1) {
            select.folders.push(folder);
          }
        }
      }

      dispatch('SELECTED_LAST_CHANGE', { last: state.folders[paths[0]] });
      dispatch('SELECTED_TRAVERSE', { select, deselect });
    },


    UPLOAD_FILE_SUCCESS_after({ state, getters, dispatch }, { attachment }) {
      let select = { folders: [], files: [] };
      let deselect = { folders: [], files: [] };

      let id = attachment.get('id');
      let file = state.files[id];
      
      if (getters['files/explorer/filtered'].indexOf(file) !== -1) {
        select.files.push(file);
      }

      dispatch('SELECTED_LAST_CHANGE', { last: file });
      dispatch('SELECTED_TRAVERSE', { select, deselect });
    },


    MOVE_REQUEST_SUCCESS_before({ state, dispatch }, { resp, allFolders, allFiles }) {
      let select = { folders: [], files: [] };
      let deselect = { folders: [], files: [] };

      for (let item of allFolders) {
        let folder = item.folder;

        if (state.selected.folders[folder.path] && !resp.errors.folders[folder.path]) {
          deselect.folders.push(folder);
        }
      }

      for (let item of allFiles) {
        let file = item.file;

        if (state.selected.files[file.id] && !resp.errors.files[file.id]) {
          deselect.files.push(file);
        }
      }

      if (deselect.folders.length > 0 || deselect.files.length > 0) {
        dispatch('SELECTED_LAST_CHANGE', { last: null });
        dispatch('SELECTED_TRAVERSE', { select, deselect });
      }
    },


    DELETE_FOLDERS_REQUEST_SUCCESS_before({ state, dispatch }, { resp, folders }) {
      let select = { folders: [], files: [] };
      let deselect = { folders: [], files: [] };

      for (let folder of folders) {
        if (state.selected.folders[folder.path] && !resp.errors[folder.path]) {
          deselect.folders.push(folder);
        }
      }

      if (deselect.folders.length > 0) {
        dispatch('SELECTED_LAST_CHANGE', { last: null });
        dispatch('SELECTED_TRAVERSE', { select, deselect });
      }
    },


    DELETE_FILES_REQUEST_SUCCESS_before({ state, dispatch }, { resp, files }) {
      let select = { folders: [], files: [] };
      let deselect = { folders: [], files: [] };

      for (let file of files) {
        if (state.selected.files[file.id] && !resp.errors[file.id]) {
          deselect.files.push(file);
        }
      }

      if (deselect.files.length > 0) {
        dispatch('SELECTED_LAST_CHANGE', { last: null });
        dispatch('SELECTED_TRAVERSE', { select, deselect });
      }
    },

  },


  getters: {

    'all/count'({ getters }) {
      return getters['selected/folders/count'] + getters['selected/files/count'];
    },

    'folders/count'({ state }) {
      return Object.values(state.selected.folders).length;
    },

    'files/count'({ state }) {
      return Object.values(state.selected.files).length;
    },

  },

};


function selectLeft(state, getters, select, deselect, event, entity, type, unique) {
  let wasSelected = !!state.selected[type][entity[unique]];

  if (event.ctrlKey || event.metaKey) {
    if (wasSelected) {
      return;
    }

    select[type].push(entity);
    return;
  }

  if (event.shiftKey) {
    selectShifted(state, getters, select, deselect, entity);
    return;
  }

  if (wasSelected) {
    return;
  }

  select[type].push(entity);
  deselectExcept(state, deselect);
}


function selectUp(state, select, deselect, event, entity, type, unique) {
  if (event.ctrlKey || event.metaKey) {
    deselect[type].push(entity);
    return;
  }

  deselectExcept(state, deselect, entity);
}


function selectRight(state, select, deselect, event, entity, type, unique) {
  select[type].push(entity);
  deselectExcept(state, deselect, entity);
}


function deselectFoldersExcept(state, deselect, exceptFolder) {
  for (let folder of Object.values(state.selected.folders)) {
    if (!exceptFolder || folder !== exceptFolder) {
      deselect.folders.push(folder);
    }
  }
}


function deselectExcept(state, deselect, exceptEntity) {
  for (let { type, unique } of types) {
    for (let entity of Object.values(state.selected[type])) {
      if (!exceptEntity || entity !== exceptEntity) {
        deselect[type].push(entity);
      }
    }
  };
}


function selectShifted(state, getters, select, deselect, entity) {
  let last = state.selected.last;

  let visible = {
    folders: getters['folders/explorer/visible'],
    files: getters['files/explorer/visible'],
  };

  if (!last) {
    last = visible.folders.length > 0
      ? visible.folders[0]
      : visible.files[0];
  }

  let step = 0;

  for (let { type, unique } of types) {
    for (let subEntity of visible[type]) {
      if (entity === subEntity) {
        step++;
      }

      if (last === subEntity) {
        step++;
      }

      if (step > 0) {
        if (!state.selected[type][subEntity[unique]]) {
          select[type].push(subEntity);
        }
      } else {
        if (state.selected[type][subEntity[unique]]) {
          deselect[type].push(subEntity);
        }
      }

      if (step === 2) {
        step = 0;
      }
    }
  }
}
