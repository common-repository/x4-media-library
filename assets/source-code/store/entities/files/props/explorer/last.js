export default {

  namespace: 'files/explorer/last',


  mutations: {

    FILES_EXPLORER_LAST_CHANGE({ state }, { file, last }) {
      file.explorer.last = last;
    },

  },


  actions: {

    FILES_EXPLORER_LAST_CHANGE: true,

    FILES_PROPS_INIT: '~FILES_EXPLORER_LAST_INIT',


    FILES_EXPLORER_LAST_INIT(context, { files, file }) {
      files = files || [file];

      for (let file of files) {
        file.explorer = file.explorer || {};
        file.explorer.last = false;
      }
    },


    SELECTED_LAST_CHANGE_before({ state, dispatch }, { last }) {
      if (state.selected.last && state.selected.last.id !== undefined) {
        dispatch('FILES_EXPLORER_LAST_CHANGE', { file: state.selected.last, last: false });
      }

      if (last && last.id !== undefined) {
        dispatch('FILES_EXPLORER_LAST_CHANGE', { file: last, last: true });
      }
    },

  },

};
