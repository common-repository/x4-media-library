import Vue from 'vue';


export default {

  namespace: 'files',


  state: {},


  mutations: {

    FILES_INIT({ state }, { files }) {
      state.files = files;
    },

    FILES_ITEM_ADD({ state }, { file }) {
      Vue.set(state.files, file.id, file);
    },

    FILES_ITEM_REMOVE({ state }, { file }) {
      Vue.delete(state.files, file.id);
    },

  },


  actions: {

    FILES_INIT: true,
    FILES_ITEM_ADD: true,
    FILES_ITEM_REMOVE: true,

    FILES_INIT_APPLY_before: '~FILES_PROPS_INIT',
    FILES_ITEM_ADD_before: '~FILES_PROPS_INIT',


    FILES_INIT_APPLY({ dispatch }, { files }) {
      let result = {};

      for (let file of files) {
        result[file.id] = file;
      }

      dispatch('FILES_INIT', { files: result });
    },


    UPLOAD_FILE_SUCCESS({ dispatch }, { id, attachment }) {
      let newFile = {
        id: attachment.get('id'),
        mime: attachment.get('mime').split('/').shift() || '',
        uploaded: new Date(attachment.get('date')),
        path: attachment.get('x4path'),
      };

      dispatch('FILES_ITEM_ADD', { file: newFile });
    },


    COPY_REQUEST_SUCCESS({ getters, dispatch }, { resp, allFiles }) {
      for (let item of allFiles) {
        let file = item.file;

        if (resp.files[file.id] && !resp.errors.files[file.id]) {
          let newFile = {
            id: resp.files[file.id],
            mime: file.mime,
            uploaded: file.uploaded,
            path: item.path,
          };

          dispatch('FILES_ITEM_ADD', { file: newFile });
        }
      }
    },


    DELETE_FILES_REQUEST_SUCCESS({ getters, dispatch }, { resp, files }) {
      for (let file of files) {
        if (!resp.errors[file.id]) {
          dispatch('FILES_ITEM_REMOVE', { file });
        }
      }
    },

  },

};
