export default {

  namespace: 'folders/path',


  mutations: {

    FOLDER_PATH_CHANGE({ state }, { folder, path }) {
      folder.path = path;
    },

  },


  actions: {

    FOLDER_PATH_CHANGE: true,


    FOLDER_RENAME_REQUEST_SUCCESS({ dispatch }, { resp, folder, path, allFolders }) {
      dispatch('FOLDER_PATH_CHANGE', { folder, path });

      for (let item of allFolders) {
        let folder = item.folder;

        if (!resp.errors.folders[folder.path]) {
          dispatch('FOLDER_PATH_CHANGE', { folder, path: item.path });
        }
      }
    },


    MOVE_REQUEST_SUCCESS({ dispatch }, { resp, allFolders }) {
      for (let item of allFolders) {
        let folder = item.folder;

        if (!resp.errors.folders[folder.path]) {
          dispatch('FOLDER_PATH_CHANGE', { folder, path: item.path });
        }
      }
    },

  },

};
