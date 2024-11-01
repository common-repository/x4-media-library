export default {

  namespace: 'folders/explorer/rename',


  mutations: {

    FOLDERS_EXPLORER_RENAME_CHANGE({ state }, { folder, rename }) {
      folder.explorer.rename = rename;
    },

  },


  actions: {

    FOLDERS_EXPLORER_RENAME_CHANGE: true,

    FOLDERS_PROPS_INIT: '~FOLDERS_EXPLORER_RENAME_INIT',


    FOLDERS_EXPLORER_RENAME_INIT(context, { folders, folder }) {
      folders = folders || [folder];

      for (let folder of folders) {
        folder.explorer = folder.explorer || {};
        folder.explorer.rename = false;
      }
    },


    RENAME_CHANGE_after({ state, dispatch }) {
      if (state.rename.visible && state.rename.block === 'explorer' && state.rename.type === 'folders') {
        dispatch('FOLDERS_EXPLORER_RENAME_CHANGE', { folder: state.rename.entity, rename: true });
      }
    },


    RENAME_VISIBLE_CHANGE_after({ state, dispatch }) {
      if (!state.rename.visible && state.rename.block === 'explorer' && state.rename.type === 'folders') {
        dispatch('FOLDERS_EXPLORER_RENAME_CHANGE', { folder: state.rename.entity, rename: false });
      }
    },

  },

};
