export default {

  namespace: 'fileExtensions',


  state: [],


  mutations: {

    FILE_EXTENSIONS_INIT({ state }, { fileExtensions }) {
      state.fileExtensions = fileExtensions;
    },

    FILE_EXTENSION_ADD_ITEM({ state }, { fileExtension }) {
      state.fileExtensions.push(fileExtension);
    },

    FILE_EXTENSION_REMOVE_ITEM({ state }, { fileExtension }) {
      state.fileExtensions.splice(state.fileExtensions.indexOf(fileExtension), 1);
    },

  },


  actions: {

    FILE_EXTENSIONS_INIT: true,
    FILE_EXTENSION_ADD_ITEM: true,
    FILE_EXTENSION_REMOVE_ITEM: true,


    BOOTSTRAP_FOLDERS_REQUEST_SUCCESS({ dispatch }, { resp }) {
      let fileExtensions = resp.settings.fileExtensions.map(item => ({
        ext: item[0],
        custom: item[1],
        allowed: item[2],
        mimeType: item[3],
      }));

      dispatch('FILE_EXTENSIONS_INIT', { fileExtensions });
    },


    FILE_EXTENSION_CREATE_REQUEST_SUCCESS({ dispatch }, { ext, mimeType }) {
      let fileExtension = {
        ext,
        custom: true,
        allowed: true,
        mimeType,
      };

      dispatch('FILE_EXTENSION_ADD_ITEM', { fileExtension });
    },


    FILE_EXTENSION_DELETE_REQUEST_SUCCESS({ dispatch }, { fileExtension }) {
      dispatch('FILE_EXTENSION_REMOVE_ITEM', { fileExtension });
    },

  },


  getters: {

    sorted({ state }) {
      let sorted = state.fileExtensions.slice();

      sorted.sort((a, b) => {
        if (a.ext < b.ext) return -1;
        if (a.ext > b.ext) return 1;
        return 0;
      });

      return sorted;
    },

  },

};
