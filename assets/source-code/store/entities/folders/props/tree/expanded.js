export default {

  namespace: 'folders/tree/expanded',


  mutations: {

    FOLDERS_TREE_EXPANDED_CHANGE({ state }, { folder, expanded }) {
      folder.tree.expanded = expanded;
    },

  },


  actions: {

    FOLDERS_TREE_EXPANDED_CHANGE: true,

    FOLDERS_PROPS_INIT: '~FOLDERS_TREE_EXPANDED_INIT',
    TREE_EXPANDED_UPDATE: '~FOLDERS_TREE_EXPANDED_CHANGE',


    FOLDERS_TREE_EXPANDED_INIT(context, { folders, folder }) {
      folders = folders || [folder];

      for (let folder of folders) {
        folder.tree = folder.tree || {};
        folder.tree.expanded = false;
      }
    },

  },

};
