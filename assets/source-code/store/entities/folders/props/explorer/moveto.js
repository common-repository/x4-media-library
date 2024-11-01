export default {

  namespace: 'folders/explorer/moveto',


  mutations: {

    FOLDERS_EXPLORER_MOVETO_CHANGE({ state }, { folder, moveto }) {
      folder.explorer.moveto = moveto;
    },

  },


  actions: {

    FOLDERS_EXPLORER_MOVETO_CHANGE: true,

    FOLDERS_PROPS_INIT: '~FOLDERS_EXPLORER_MOVETO_INIT',


    FOLDERS_EXPLORER_MOVETO_INIT(context, { folders, folder }) {
      folders = folders || [folder];

      for (let folder of folders) {
        folder.explorer = folder.explorer || {};
        folder.explorer.moveto = false;
      }
    },


    MOVE_TARGET_CHANGE_before({ state, dispatch }, { target }) {
      if (state.move.target.folder && state.move.target.block === 'explorer') {
        dispatch('FOLDERS_EXPLORER_MOVETO_CHANGE', { folder: state.move.target.folder, moveto: false });
      }

      if (target.folder && target.block === 'explorer') {
        dispatch('FOLDERS_EXPLORER_MOVETO_CHANGE', { folder: target.folder, moveto: true });
      }
    },

  },

};
