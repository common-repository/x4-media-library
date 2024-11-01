export default {

  namespace: 'files/perDir',


  getters: {

    __({ state }) {
      let perDir = {};

      for (let folder of Object.values(state.folders)) {
        perDir[folder.path] = [];
      }

      for (let file of Object.values(state.files)) {
        perDir[file.dir] = perDir[file.dir] || [];
        perDir[file.dir].push(file);
      }

      return perDir;
    },

  },

};
