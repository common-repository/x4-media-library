export default {

  namespace: 'folders/parents',


  getters: {

    __({ state, getters }) {
      let parents = {};

      for (let folder of Object.values(state.folders)) {
        parents[folder.path] = [];

        let parent = state.folders[folder.dir];

        while (parent) {
          parents[folder.path].unshift(parent);
          parent = state.folders[parent.dir];
        }
      }

      return parents;
    },

  },

};
