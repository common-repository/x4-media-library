export default {

  namespace: 'folders/tree/sorted',


  getters: {

    __({ state, getters }) {
      let sorted = {};

      for (let folder of Object.values(state.folders)) {
        if (folder.tree.expanded) {
          sorted[folder.path] = (getters['folders/perDir'][folder.path] || []).slice().sort((folder1, folder2) => {
            if (folder1.baselc < folder2.baselc) return -1;
            if (folder1.baselc > folder2.baselc) return 1;
            return 0;
          });
        }
      }

      return sorted;
    },

  },

};
