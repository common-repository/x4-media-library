export default {

  namespace: 'folders/perDir',


  getters: {

    __({ state }) {
      let perDir = {};

      for (let folder of Object.values(state.folders)) {
        perDir[folder.path] = perDir[folder.path] || [];

        if (folder.dir !== null) {
          perDir[folder.dir] = perDir[folder.dir] || [];
          perDir[folder.dir].push(folder);
        }
      }

      return perDir;
    },

  },

};
