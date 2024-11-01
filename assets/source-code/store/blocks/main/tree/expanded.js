import Vue from 'vue';


export default {

  namespace: 'tree/expanded',


  state: {},


  mutations: {

    TREE_EXPANDED_UPDATE({ state }, { folder, expanded }) {
      Vue[expanded ? 'set' : 'delete'](state.tree.expanded, folder.path, folder);
    },

  },


  actions: {

    TREE_EXPANDED_UPDATE: true,


    FOLDERS_INIT_after({ state, dispatch }) {
      dispatch('TREE_EXPANDED_UPDATE', { folder: state.folders[''], expanded: true });
    },


    TREE_EXPANDED_TOGGLE({ state, dispatch }, { folder }) {
      let expanded = !state.tree.expanded[folder.path];
      dispatch('TREE_EXPANDED_UPDATE', { folder, expanded });
    },


    ADD_FOLDER_START({ state, dispatch }, { block, folder }) {
      if (block !== 'tree') {
        return;
      }

      if (state.tree.expanded[folder.path]) {
        return;
      }

      dispatch('TREE_EXPANDED_UPDATE', { folder, expanded: true });
    },

  },

};
