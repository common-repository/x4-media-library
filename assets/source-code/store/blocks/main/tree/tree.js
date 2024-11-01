export default {

  namespace: 'tree',


  storage: {
    self: null,
  },


  mutations: {

    TREE_INIT({ storage }, { tree }) {
      storage.tree.self = tree;
    },

  },


  actions: {

    TREE_INIT: true,

  },

};
