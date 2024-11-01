export default {

  namespace: 'delete/calc',


  actions: {

    DELETE_APPLY: '~DELETE_CALC_START',


    DELETE_CALC_START({ getters, dispatch }, { folders, files }) {
      let allFolders = [];
      let allFiles = [];

      for (let folder of folders) {
        let children = [folder].concat(getters['folders/children'][folder.path] || []);
        allFolders = allFolders.concat(children);

        for (let child of children) {
          allFiles = allFiles.concat(getters['files/perDir'][child.path] || []);
        }
      }

      allFiles = allFiles.concat(files);

      allFolders = allFolders.filter((elem, pos, arr) => arr.indexOf(elem) === pos);
      allFiles = allFiles.filter((elem, pos, arr) => arr.indexOf(elem) === pos);

      allFolders.sort((folder1, folder2) => {
        let count1 = folder1.path.split('/').length;
        let count2 = folder2.path.split('/').length;
        return count1 < count2 ? 1 : (count1 > count2 ? -1 : 0);
      });

      dispatch('DELETE_CALC_FINISH', { folders, files, allFolders, allFiles });
    },


    DELETE_CALC_FINISH({ storage, dispatch }, { folders, files, allFolders, allFiles }) {
      storage.delete.allFolders = allFolders;
      storage.delete.allFiles = allFiles;
      storage.delete.folders = folders;
      storage.delete.files = files;

      dispatch('DELETE_CONFIRM');
    },

  },

};
