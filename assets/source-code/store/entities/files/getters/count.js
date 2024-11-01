export default {

  namespace: 'files/count',


  getters: {

    __({ state, getters }) {
      let count = {};

      for (let folder of Object.values(state.folders)) {
        count[folder.path] = 0;

        let children = [folder]
          .concat(getters['folders/children'][folder.path] || []);

        for (let child of children) {
          count[folder.path] += (getters['files/perDir'][child.path] || []).length;
        }
      }

      return count;
    },

  },

};
