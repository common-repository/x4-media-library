export default {

  namespace: 'files/explorer/cut',


  mutations: {

    FILES_EXPLORER_CUT_CHANGE({ state }, { file, cut }) {
      file.explorer.cut = cut;
    },

  },


  actions: {

    FILES_EXPLORER_CUT_CHANGE: true,

    FILES_PROPS_INIT: '~FILES_EXPLORER_CUT_INIT',


    FILES_EXPLORER_CUT_INIT(context, { files, file }) {
      files = files || [file];

      for (let file of files) {
        file.explorer = file.explorer || {};
        file.explorer.cut = false;
      }
    },


    CLIPBOARD_START_before({ state, dispatch }, { op, files }) {
      for (let file of Object.values(state.clipboard.files)) {
        if (op !== 'cut' || !files[file.id]) {
          dispatch('FILES_EXPLORER_CUT_CHANGE', { file, cut: false });
        }
      }

      if (op === 'cut') {
        for (let file of Object.values(files)) {
          if (!file.explorer.cut) {
            dispatch('FILES_EXPLORER_CUT_CHANGE', { file, cut: true });
          }
        }
      }
    },


    CLIPBOARD_DESELECT({ dispatch }, { files }) {
      for (let file of files) {
        if (file.explorer.cut) {
          dispatch('FILES_EXPLORER_CUT_CHANGE', { file, cut: false });
        }
      }
    },

  },

};
