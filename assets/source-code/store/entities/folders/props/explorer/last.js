export default {

  namespace: 'folders/explorer/last',


  mutations: {

    FOLDERS_EXPLORER_LAST_CHANGE({ state }, { folder, last }) {
      folder.explorer.last = last;
    },

  },


  actions: {

    FOLDERS_EXPLORER_LAST_CHANGE: true,

    FOLDERS_PROPS_INIT: '~FOLDERS_EXPLORER_LAST_INIT',


    FOLDERS_EXPLORER_LAST_INIT(context, { folders, folder }) {
      folders = folders || [folder];

      for (let folder of folders) {
        folder.explorer = folder.explorer || {};
        folder.explorer.last = false;
      }
    },


    SELECTED_LAST_CHANGE_before({ state, dispatch }, { last }) {
      if (state.selected.last && state.selected.last.id === undefined) {
        dispatch('FOLDERS_EXPLORER_LAST_CHANGE', { folder: state.selected.last, last: false });
      }

      if (last && last.id === undefined) {
        dispatch('FOLDERS_EXPLORER_LAST_CHANGE', { folder: last, last: true });
      }
    },

  },

};
