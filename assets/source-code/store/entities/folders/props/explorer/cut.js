export default {

  namespace: 'folders/explorer/cut',


  mutations: {

    FOLDERS_EXPLORER_CUT_CHANGE({ state }, { folder, cut }) {
      folder.explorer.cut = cut;
    },

  },


  actions: {

    FOLDERS_EXPLORER_CUT_CHANGE: true,

    FOLDERS_PROPS_INIT: '~FOLDERS_EXPLORER_CUT_INIT',


    FOLDERS_EXPLORER_CUT_INIT(context, { folders, folder }) {
      folders = folders || [folder];

      for (let folder of folders) {
        folder.explorer = folder.explorer || {};
        folder.explorer.cut = false;
      }
    },


    CLIPBOARD_START_before({ state, dispatch }, { op, folders }) {
      for (let folder of Object.values(state.clipboard.folders)) {
        if (op !== 'cut' || !folders[folder.path]) {
          dispatch('FOLDERS_EXPLORER_CUT_CHANGE', { folder, cut: false });
        }
      }

      if (op === 'cut') {
        for (let folder of Object.values(folders)) {
          if (!folder.explorer.cut) {
            dispatch('FOLDERS_EXPLORER_CUT_CHANGE', { folder, cut: true });
          }
        }
      }
    },


    CLIPBOARD_DESELECT({ dispatch }, { folders }) {
      for (let folder of folders) {
        if (folder.explorer.cut) {
          dispatch('FOLDERS_EXPLORER_CUT_CHANGE', { folder, cut: false });
        }
      }
    },

  },

};
