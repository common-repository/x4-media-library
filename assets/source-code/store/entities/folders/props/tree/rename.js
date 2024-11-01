export default {

  namespace: 'folders/tree/rename',


  mutations: {

    FOLDERS_TREE_RENAME_CHANGE({ state }, { folder, rename }) {
      folder.tree.rename = rename;
    },

  },


  actions: {

    FOLDERS_TREE_RENAME_CHANGE: true,

    FOLDERS_PROPS_INIT: '~FOLDERS_TREE_RENAME_INIT',


    FOLDERS_TREE_RENAME_INIT(context, { folders, folder }) {
      folders = folders || [folder];

      for (let folder of folders) {
        folder.tree = folder.tree || {};
        folder.tree.rename = false;
      }
    },


    RENAME_CHANGE_after({ state, dispatch }) {
      if (state.rename.visible && state.rename.block === 'tree' && state.rename.type === 'folders') {
        dispatch('FOLDERS_TREE_RENAME_CHANGE', { folder: state.rename.entity, rename: true });
      }
    },


    RENAME_VISIBLE_CHANGE_after({ state, dispatch }) {
      if (!state.rename.visible && state.rename.block === 'tree' && state.rename.type === 'folders') {
        dispatch('FOLDERS_TREE_RENAME_CHANGE', { folder: state.rename.entity, rename: false });
      }
    },

  },

};
