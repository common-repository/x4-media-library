export default {

  namespace: 'folders/count',


  getters: {

    __({ state, getters }) {
      let count = {};

      for (let folder of Object.values(state.folders)) {
        count[folder.path] = (getters['folders/children'][folder.path] || []).length;
      }

      return count;
    },

  },

};
