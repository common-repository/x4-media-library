export default {

  namespace: 'folders/children',


  getters: {

    __({ state, getters }) {
      let children = {};

      for (let folder of Object.values(state.folders)) {
        children[folder.path] = children[folder.path] || [];

        let parents = getters['folders/parents'][folder.path] || [];

        for (let parent of parents) {
          children[parent.path] = children[parent.path] || [];
          children[parent.path].push(folder);
        }
      }

      return children;
    },

  },

};
