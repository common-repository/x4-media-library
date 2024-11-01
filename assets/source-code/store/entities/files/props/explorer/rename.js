export default {

  namespace: 'files/explorer/rename',


  mutations: {

    FILES_EXPLORER_RENAME_CHANGE({ state }, { file, rename }) {
      file.explorer.rename = rename;
    },

  },


  actions: {

    FILES_EXPLORER_RENAME_CHANGE: true,

    FILES_PROPS_INIT: '~FILES_EXPLORER_RENAME_INIT',


    FILES_EXPLORER_RENAME_INIT(context, { files, file }) {
      files = files || [file];

      for (let file of files) {
        file.explorer = file.explorer || {};
        file.explorer.rename = false;
      }
    },


    RENAME_CHANGE_after({ state, dispatch }) {
      if (state.rename.visible && state.rename.block === 'explorer' && state.rename.type === 'files') {
        dispatch('FILES_EXPLORER_RENAME_CHANGE', { file: state.rename.entity, rename: true });
      }
    },


    RENAME_VISIBLE_CHANGE_after({ state, dispatch }) {
      if (!state.rename.visible && state.rename.block === 'explorer' && state.rename.type === 'files') {
        dispatch('FILES_EXPLORER_RENAME_CHANGE', { file: state.rename.entity, rename: false });
      }
    },

  },

};
