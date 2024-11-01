import equal from '~/utils/equal';
import i18n from '~/utils/i18n';
import request from '~/plugin/request';


export default {

  namespace: 'move',


  state: {
    folders: [],
    files: [],
    exclude: {},
    target: {
      block: '',
      folder: null,
    },
  },


  storage: {
    dragCounter: 0,
  },


  mutations: {

    MOVE_CHANGE({ state }, { move }) {
      state.move = move;
    },

    MOVE_TARGET_CHANGE({ state }, { target }) {
      state.move.target = target;
    },

  },


  actions: {

    MOVE_CHANGE: true,
    MOVE_TARGET_CHANGE: true,


    MOVE_DRAG_START({ state, storage, getters, dispatch }, { event, block, entity, type }) {
      if (type === 'folders' && entity.path === '') {
        event.preventDefault();
        return;
      }

      let move = {
        folders: [],
        files: [],
        exclude: {},
        target: {
          block: '',
          folder: null,
        },
      };

      if (block === 'explorer') {
        move.folders = Object.values(state.selected.folders);
        move.files = Object.values(state.selected.files);
      } else {
        move[type].push(entity);
      }

      event.dataTransfer.setData('text', '');
      event.dataTransfer.effectAllowed = 'copyMove';

      if (!storage.constants.isIE) {
        event.dataTransfer.setDragImage(storage.moveIcon.self.$el, 48, 60);
      }

      for (let folder of move.folders) {
        let subfolders = [folder].concat(getters['folders/children'][folder.path] || []);

        for (let subfolder of subfolders) {
          move.exclude[subfolder.path] = subfolder;
        }
      }

      dispatch('MOVE_CHANGE', { move });
    },


    MOVE_DRAG_ENTER({ state, storage, dispatch }, { event, block, folder }) {
      if (!dragEventValidate(state, event, folder)) {
        return;
      }

      storage.move.dragCounter++;

      let target = {
        block,
        folder,
      };

      if (!equal.objects(target, state.move.target)) {
        dispatch('MOVE_TARGET_CHANGE', { target });
      }
    },


    MOVE_DRAG_OVER({ state, dispatch }, { event, block, folder }) {
      if (!dragEventValidate(state, event, folder)) {
        return;
      }

      let op = event.ctrlKey || event.metaKey
        ? 'copy'
        : 'move';

      event.dataTransfer.dropEffect = op;
    },


    MOVE_DRAG_LEAVE({ state, storage, dispatch }, { event, block, folder }) {
      if (!dragEventValidate(state, event, folder)) {
        return;
      }

      storage.move.dragCounter--;

      if (storage.move.dragCounter === 0) {
        let target = {
          block: '',
          folder: null,
        };

        dispatch('MOVE_TARGET_CHANGE', { target });
      }
    },


    MOVE_DROP({ state, dispatch }, { event, block, folder }) {
      if (!dragEventValidate(state, event, folder)) {
        return;
      }

      let target = state.move.target.folder;
      let folders = state.move.folders.filter(folder => folder.dir !== target.path);
      let files = state.move.files;

      dispatch('MOVE_TARGET_CHANGE', { target: { block: '', folder: null } });

      if (folders.length === 0 && files.length === 0) {
        return;
      }

      if (event.ctrlKey || event.metaKey) {
        dispatch('COPY_START', { target, folders, files });
      } else {
        dispatch('MOVE_START', { target, folders, files });
      }
    },


    MOVE_START({ getters, dispatch }, { target, folders, files }) {
      let allFolders = [];
      let allFiles = [];

      for (let folder of folders) {
        let children = getters['folders/children'][folder.path] || [];
        let subfiles = getters['files/perDir'][folder.path] || [];

        allFolders.push({
          main: true,
          folder: folder,
          path: (target.path ? target.path + '/' : '') +
            folder.path.substr(folder.dir ? folder.dir.length + 1 : 0),
        });

        for (let subfile of subfiles) {
          allFiles.push({
            file: subfile,
            path: (target.path ? target.path + '/' : '') +
              subfile.path.substr(folder.dir ? folder.dir.length + 1 : 0),
          });
        }

        for (let child of children) {
          let subfiles = getters['files/perDir'][child.path] || [];

          allFolders.push({
            folder: child,
            path: (target.path ? target.path + '/' : '') +
              child.path.substr(folder.dir ? folder.dir.length + 1 : 0),
          });

          for (let subfile of subfiles) {
            allFiles.push({
              file: subfile,
              path: (target.path ? target.path + '/' : '') +
                subfile.path.substr(folder.dir ? folder.dir.length + 1 : 0),
            });
          }
        }
      }

      for (let file of files) {
        allFiles.push({
          main: true,
          file: file,
          path: (target.path ? target.path + '/' : '') +
            file.path.substr(file.dir ? file.dir.length + 1 : 0),
        });
      }

      allFolders = allFolders.filter(item => {
        let pathLengths = allFolders
          .filter(item2 => item.folder.path === item2.folder.path)
          .map(item2 => item2.path.length);

        return item.path.length === Math.min.apply(null, pathLengths);
      });

      allFiles = allFiles.filter(item => {
        let pathLengths = allFiles
          .filter(item2 => item.file.path === item2.file.path)
          .map(item2 => item2.path.length);

        return item.path.length === Math.min.apply(null, pathLengths);
      });

      allFolders.sort((item1, item2) => {
        let count1 = item1.folder.path.split('/').length;
        let count2 = item2.folder.path.split('/').length;
        return count1 < count2 ? 1 : (count1 > count2 ? -1 : 0);
      });

      let subfolders = getters['folders/perDir'][target.path] || [];
      let subfiles = getters['files/perDir'][target.path] || [];

      for (let folder of folders) {
        for (let subfolder of subfolders) {
          if (folder.baselc === subfolder.baselc) {
            dispatch('MOVE_EXISTS', { folders, files, match: folder, type: 'folders' });
            return;
          }
        }
      }

      for (let file of files) {
        for (let subfile of subfiles) {
          if (file.baselc === subfile.baselc) {
            dispatch('MOVE_EXISTS', { folders, files, match: file, type: 'files' });
            return;
          }
        }
      }

      for (let index1 = 0; index1 < folders.length; index1++) {
        for (let index2 = 0; index2 < folders.length; index2++) {
          if (folders[index1].base === folders[index2].base && index1 !== index2) {
            dispatch('MOVE_SAME_BASE', { folders, files, match: folders[index1], type: 'folders' });
            return;
          }
        };
      };

      for (let index1 = 0; index1 < files.length; index1++) {
        for (let index2 = 0; index2 < files.length; index2++) {
          if (files[index1].base === files[index2].base && index1 !== index2) {
            dispatch('MOVE_SAME_BASE', { folders, files, match: files[index1], type: 'files' });
            return;
          }
        };
      };

      dispatch('MOVE_REQUEST', { target, folders, files, allFolders, allFiles });
    },


    MOVE_REQUEST({ dispatch }, { target, folders, files, allFolders, allFiles }) {
      let dataFolders = [];
      let dataFiles = [];

      for (let item of allFolders) {
        dataFolders.push([item.folder.path, item.path].concat(item.main ? [1] : []));
      }

      for (let item of allFiles) {
        dataFiles.push([item.file.id, item.path].concat(item.main ? [1] : []));
      }

      request(
        'actions/move',
        { folders: dataFolders, files: dataFiles },
        resp => {
          let errFolders = {};
          let errFiles = {};

          for (let item of resp.errors.folders) {
            errFolders[item[0]] = item[1];
          }

          for (let item of resp.errors.files) {
            errFiles[item[0]] = item[1];
          }

          resp.errors.folders = errFolders;
          resp.errors.files = errFiles;

          dispatch('MOVE_REQUEST_SUCCESS', { resp, target, folders, files, allFolders, allFiles });
        },
        err => {
          dispatch('MOVE_REQUEST_ERROR', { err, target, folders, files, allFolders, allFiles });
        },
      );
    },


    MOVE_REQUEST_SUCCESS_before({ dispatch }, { resp, target, folders, files, allFolders, allFiles }) {
      let err = {
        code: '',
        title: '',
        message: '',
      };

      for (let path of Object.keys(resp.errors.folders)) {
        err.code = resp.errors.folders[path];

        switch (err.code) {
          default:
            err.message = i18n.__('Sorry, something went wrong, please try again later.', 'x4-media-library') + ' (code:' + err.code + ')';
            break;
        }

        dispatch('MOVE_REQUEST_ERROR', { err, target, folders, files, allFolders, allFiles });
        return;
      }

      for (let id of Object.keys(resp.errors.files)) {
        err.code = resp.errors.files[id];

        switch (err.code) {
          default:
            err.message = i18n.__('Sorry, something went wrong, please try again later.', 'x4-media-library') + ' (code:' + err.code + ')';
            break;
        }

        dispatch('MOVE_REQUEST_ERROR', { err, target, folders, files, allFolders, allFiles });
        return;
      }
    },


    MOVE_REQUEST_ERROR_before(context, { err, target, folders, files, allFolders, allFiles }) {
      err.title = folders.length === 0
        ? files.length === 1
          ? i18n.__('File moving', 'x4-media-library')
          : i18n.__('Files moving', 'x4-media-library')
        : files.length === 0
          ? folders.length === 1
            ? i18n.__('Folder moving', 'x4-media-library')
            : i18n.__('Folders moving', 'x4-media-library')
          : i18n.__('Moving', 'x4-media-library');

      switch (err.code) {
        case '':
          break;
      }
    },

  },

};


function dragEventValidate(state, event, folder) {
  if (state.dragstate !== 'move') {
    return false;
  }

  let op = event.ctrlKey || event.metaKey
    ? 'copy'
    : 'move';

  if (op === 'move' && state.move.exclude[folder.path]) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  return true;
}