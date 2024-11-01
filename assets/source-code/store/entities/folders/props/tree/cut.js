export default {

  namespace: 'folders/tree/cut',


  mutations: {

    FOLDERS_TREE_CUT_CHANGE({ state }, { folder, cut }) {
      folder.tree.cut = cut;
    },

  },


  actions: {

    FOLDERS_TREE_CUT_CHANGE: true,

    FOLDERS_PROPS_INIT: '~FOLDERS_TREE_CUT_INIT',


    FOLDERS_TREE_CUT_INIT(context, { folders, folder }) {
      folders = folders || [folder];

      for (let folder of folders) {
        folder.tree = folder.tree || {};
        folder.tree.cut = false;
      }
    },


    CLIPBOARD_START_before({ state, dispatch }, { op, folders }) {
      for (let folder of Object.values(state.clipboard.folders)) {
        if (op !== 'cut' || !folders[folder.path]) {
          dispatch('FOLDERS_TREE_CUT_CHANGE', { folder, cut: false });
        }
      }

      if (op === 'cut') {
        for (let folder of Object.values(folders)) {
          if (!folder.tree.cut) {
            dispatch('FOLDERS_TREE_CUT_CHANGE', { folder, cut: true });
          }
        }
      }
    },


    CLIPBOARD_DESELECT({ dispatch }, { folders }) {
      for (let folder of folders) {
        if (folder.tree.cut) {
          dispatch('FOLDERS_TREE_CUT_CHANGE', { folder, cut: false });
        }
      }
    },

  },

};
