export default {

  namespace: 'rename',


  state: {
    visible: true,
    block: '',
    entity: null,
    type: '',
  },


  storage: {
    self: null,
  },


  mutations: {

    RENAME_INIT({ storage }, { rename }) {
      storage.rename.self = rename;
    },

    RENAME_CHANGE({ state }, { rename }) {
      state.rename = rename;
    },

    RENAME_VISIBLE_CHANGE({ state }, { visible }) {
      state.rename.visible = visible;
    },

  },


  actions: {

    RENAME_INIT: true,
    RENAME_CHANGE: true,
    RENAME_VISIBLE_CHANGE: true,

    FOLDER_CREATE_REQUEST_SUCCESS: 'RENAME_FINISH',
    FOLDER_RENAME_REQUEST_SUCCESS: 'RENAME_FINISH',
    FILE_RENAME_REQUEST_SUCCESS: 'RENAME_FINISH',
    FOLDER_CREATE_REQUEST_ERROR: 'RENAME_CANCEL',
    FOLDER_RENAME_REQUEST_ERROR: 'RENAME_CANCEL',
    FILE_RENAME_REQUEST_ERROR: 'RENAME_CANCEL',
    FILE_RENAME_REQUEST_PAID: 'RENAME_CANCEL',


    ADD_FOLDER_START_after({ state, dispatch }) {
      dispatch('RENAME_START', { block: state.addFolder.block, entity: state.addFolder.folder, type: 'folders' });
    },


    RENAME_START({ state, dispatch }, { block, entity, type }) {
      let rename = {
        visible: true,
        block,
        entity,
        type,
      };

      dispatch('RENAME_CHANGE', { rename });
    },


    RENAME_KEYDOWN({ storage, dispatch }, { event }) {
      if (event.key === 'Enter') {
        event.preventDefault();
        storage.rename.self.$el.blur();
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        dispatch('RENAME_CANCEL');
        return;
      }

      if (event.key !== event.key.replace(/[\/:*?"<>|\\]/g, '')) {
        event.preventDefault();
        return;
      }
    },


    RENAME_APPLY({ state, dispatch }, { value }) {
      value = value.replace(/[\/:*?"<>|\\]/g, '');

      if (value === '') {
        dispatch('RENAME_CANCEL');
        return;
      }

      if (state.rename.type === 'folders') {
        let folder = state.rename.entity;

        if (value === folder.base) {
          dispatch('RENAME_CANCEL');
          return;
        }

        if (state.addFolder.visible) {
          dispatch('ADD_FOLDER_APPLY', { base: value });
          return;
        }

        let path = folder.dir
          ? folder.dir + '/' + value
          : value;

        dispatch('FOLDER_RENAME', { folder, path });
      } else {
        let file = state.rename.entity;

        if (value === file.name) {
          dispatch('RENAME_CANCEL');
          return;
        }

        let path = file.dir
          ? file.dir + '/' + value + '.' + file.ext
          : value + '.' + file.ext;

        dispatch('FILE_RENAME', { file, path });
      }
    },


    RENAME_CONTINUE({ storage }) {
      storage.rename.self.$el.focus();
    },


    RENAME_FINISH({ state, dispatch }) {
      if (state.rename.visible) {
        dispatch('RENAME_VISIBLE_CHANGE', { visible: false });
      }
    },


    RENAME_CANCEL({ state, dispatch }) {
      if (state.rename.visible) {
        dispatch('RENAME_VISIBLE_CHANGE', { visible: false });
      }
    },

  },

};
