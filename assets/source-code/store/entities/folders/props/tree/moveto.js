export default {

  namespace: 'folders/tree/moveto',


  mutations: {

    FOLDERS_TREE_MOVETO_CHANGE({ state }, { folder, moveto }) {
      folder.tree.moveto = moveto;
    },

  },


  actions: {

    FOLDERS_TREE_MOVETO_CHANGE: true,

    FOLDERS_PROPS_INIT: '~FOLDERS_TREE_MOVETO_INIT',


    FOLDERS_TREE_MOVETO_INIT(context, { folders, folder }) {
      folders = folders || [folder];

      for (let folder of folders) {
        folder.tree = folder.tree || {};
        folder.tree.moveto = false;
      }
    },


    MOVE_TARGET_CHANGE_before({ state, dispatch }, { target }) {
      if (state.move.target.folder && state.move.target.block === 'tree') {
        dispatch('FOLDERS_TREE_MOVETO_CHANGE', { folder: state.move.target.folder, moveto: false });
      }

      if (target.folder && target.block === 'tree') {
        dispatch('FOLDERS_TREE_MOVETO_CHANGE', { folder: target.folder, moveto: true });
      }
    },

  },

};
