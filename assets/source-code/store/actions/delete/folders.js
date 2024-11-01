import i18n from '~/utils/i18n';
import request from '~/plugin/request';


export default {

  namespace: 'delete/folders',


  actions: {

    DELETE_FOLDERS_START({ storage, dispatch }) {
      dispatch('DELETE_FOLDERS_REQUEST', { folders: storage.delete.allFolders });
    },


    DELETE_FOLDERS_REQUEST({ dispatch }, { folders }) {
      let paths = folders.map(folder => folder.path);

      request(
        'actions/delete/folders',
        { folders: paths },
        resp => {
          dispatch('DELETE_FOLDERS_REQUEST_SUCCESS', { resp, folders });
        },
        err => {
          dispatch('DELETE_FOLDERS_REQUEST_ERROR', { err, folders });
        },
      );
    },


    DELETE_FOLDERS_REQUEST_SUCCESS_before({ state }, { resp, folders }) {
      for (let path of Object.keys(resp.errors)) {
        let code = resp.errors[path];

        let err = {
          code,
          title: path,
          message: '',
        };

        switch (code) {
          default:
            err.message = i18n.__('Sorry, something went wrong, please try again later.', 'x4-media-library') + ' (code:' + code + ')';
            break;
        }

        resp.errors[path] = err;
      }
    },


    DELETE_FOLDERS_REQUEST_ERROR_before(context, { err, folders }) {
      switch (err.code) {
        default:
          break;
      }
    },


    DELETE_FOLDERS_REQUEST_SUCCESS: 'DELETE_FOLDERS_FINISH',
    DELETE_FOLDERS_REQUEST_ERROR: 'DELETE_FOLDERS_FINISH',

  },

};
