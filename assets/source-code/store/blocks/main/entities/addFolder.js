export default {

  namespace: 'addFolder',


  state: {
    visible: false,
    block: '',
    folder: null,
  },


  mutations: {

    ADD_FOLDER_CHANGE({ state }, { addFolder }) {
      state.addFolder = addFolder;
    },

    ADD_FOLDER_VISIBLE_CHANGE({ state }, { visible }) {
      state.addFolder.visible = visible;
    },

  },


  actions: {

    ADD_FOLDER_CHANGE: true,
    ADD_FOLDER_VISIBLE_CHANGE: true,

    RENAME_FINISH: 'ADD_FOLDER_FINISH',
    RENAME_CANCEL: 'ADD_FOLDER_FINISH',


    ADD_FOLDER_START({ state, dispatch }, { block, folder }) {
      let addFolder = {
        visible: true,
        block,
        folder: {
          base: '',
          dir: folder.path,
          explorer: {
            rename: false,
          },
          path: folder.path + '/__' + block + '_path__',
          tree: {
            rename: false,
          },
        },
      };

      dispatch('ADD_FOLDER_CHANGE', { addFolder });
    },


    ADD_FOLDER_APPLY({ state, dispatch }, { base }) {
      let dir = state.addFolder.folder.dir;
      let path = dir ? dir + '/' + base : base;

      dispatch('FOLDER_CREATE', { path });
    },


    ADD_FOLDER_FINISH({ state, dispatch }) {
      if (state.addFolder.visible) {
        dispatch('ADD_FOLDER_VISIBLE_CHANGE', { visible: false });
      }
    },

  },

};
