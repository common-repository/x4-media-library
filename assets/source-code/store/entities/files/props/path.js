export default {

  namespace: 'files/path',


  mutations: {

    FILE_PATH_CHANGE({ state }, { file, path }) {
      file.path = path;
    },

  },


  actions: {

    FILE_PATH_CHANGE: true,

    FILE_NATIVE_BASE_CHANGE: '~FILE_PATH_CHANGE',
    FILE_RENAME_REQUEST_SUCCESS: '~FILE_PATH_CHANGE',


    FOLDER_RENAME_REQUEST_SUCCESS({ dispatch }, { resp, allFiles }) {
      for (let item of allFiles) {
        let file = item.file;

        if (!resp.errors.files[file.id]) {
          dispatch('FILE_PATH_CHANGE', { file, path: item.path });
        }
      }
    },


    MOVE_REQUEST_SUCCESS({ dispatch }, { resp, allFiles }) {
      for (let item of allFiles) {
        let file = item.file;

        if (!resp.errors.files[file.id]) {
          dispatch('FILE_PATH_CHANGE', { file, path: item.path });
        }
      }
    },

  },

};
