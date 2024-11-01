import i18n from '~/utils/i18n';
import request from '~/plugin/request';


export default {

  namespace: 'delete/files',


  actions: {

    DELETE_FILES_START({ state, storage, dispatch }) {
      let ops = [];

      let allFiles = storage.delete.allFiles;
      let limit = state.limits.deleteFilesChunk;
      let chunks = Math.ceil(allFiles.length / limit);

      for (let i = 0; i < chunks; i++) {
        ops.push({
          files: allFiles.slice(i * limit, (i + 1) * limit),
        });
      }

      storage.delete.ops = ops;

      dispatch('DELETE_FILES_ITERATION');
    },


    DELETE_FILES_ITERATION_FINISH: 'DELETE_FILES_ITERATION',


    DELETE_FILES_ITERATION({ state, storage, dispatch }) {
      let ops = storage.delete.ops;

      if (ops.length === 0) {
        dispatch('DELETE_FILES_FINISH');
        return;
      }

      if (!state.progress.visible) {
        return;
      }

      let op = ops.shift();

      dispatch('DELETE_FILES_ITERATION_START', { files: op.files });
    },


    DELETE_FILES_ITERATION_START: '~DELETE_FILES_REQUEST',

    
    DELETE_FILES_REQUEST({ dispatch }, { files }) {
      let ids = files.map(file => file.id);

      request(
        'actions/delete/files',
        { files: ids },
        resp => {
          dispatch('DELETE_FILES_REQUEST_SUCCESS', { resp, files });
        },
        err => {
          dispatch('DELETE_FILES_REQUEST_ERROR', { err, files });
        },
      );
    },


    DELETE_FILES_REQUEST_SUCCESS_before({ state }, { resp, files }) {
      for (let id of Object.keys(resp.errors)) {
        let code = resp.errors[id];

        let err = {
          code,
          title: state.files[id].path,
          message: '',
        };

        switch (code) {
          default:
            err.message = i18n.__('Sorry, something went wrong, please try again later.', 'x4-media-library') + ' (code:' + code + ')';
            break;
        }

        resp.errors[id] = err;
      }
    },


    DELETE_FILES_REQUEST_ERROR_before(context, { err, files }) {
      switch (err.code) {
        default:
          break;
      }
    },


    DELETE_FILES_REQUEST_SUCCESS: 'DELETE_FILES_ITERATION_FINISH',
    DELETE_FILES_REQUEST_ERROR: 'DELETE_FILES_ITERATION_FINISH',

  },

};
