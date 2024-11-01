export default {

  namespace: 'folders/tree/context',


  mutations: {

    FOLDERS_TREE_CONTEXT_CHANGE({ state }, { folder, context }) {
      folder.tree.context = context;
    },

  },


  actions: {

    FOLDERS_TREE_CONTEXT_CHANGE: true,

    FOLDERS_PROPS_INIT: '~FOLDERS_TREE_CONTEXT_INIT',


    FOLDERS_TREE_CONTEXT_INIT(context, { folders, folder }) {
      folders = folders || [folder];

      for (let folder of folders) {
        folder.tree = folder.tree || {};
        folder.tree.context = false;
      }
    },


    CONTEXT_CHANGE_after({ state, dispatch }) {
      if (state.context.visible && state.context.block === 'tree') {
        dispatch('FOLDERS_TREE_CONTEXT_CHANGE', { folder: state.context.entity, context: true });
      }
    },


    CONTEXT_VISIBLE_CHANGE_after({ state, dispatch }) {
      if (!state.context.visible && state.context.block === 'tree') {
        dispatch('FOLDERS_TREE_CONTEXT_CHANGE', { folder: state.context.entity, context: false });
      }
    },

  },

};
