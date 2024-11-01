import i18n from '~/utils/i18n';
import request from '~/plugin/request';


export default {

  namespace: 'upload/folders',


  storage: [],


  actions: {

    UPLOAD_FOLDERS_REQUEST_SUCCESS: 'UPLOAD_FOLDERS_FINISH',
    UPLOAD_FOLDERS_REQUEST_ERROR: 'UPLOAD_FOLDERS_FINISH',


    UPLOAD_CALC_FINISH_before({ storage, dispatch }, { folders }) {
      storage.upload.folders = folders;
    },


    UPLOAD_FOLDERS_START({ state, storage, dispatch }) {
      let paths = storage.upload.folders.filter(path => !state.folders[path]);

      if (paths.length === 0) {
        dispatch('UPLOAD_FOLDERS_FINISH');
        return;
      }

      paths.sort((path1, path2) => {
        let count1 = path1.split('/').length;
        let count2 = path2.split('/').length;
        return count1 < count2 ? -1 : (count1 > count2 ? 1 : 0);
      });

      dispatch('UPLOAD_FOLDERS_REQUEST', { paths });
    },


    UPLOAD_FOLDERS_REQUEST({ dispatch }, { paths }) {
      request(
        'actions/upload/folders',
        { paths },
        resp => {
          let errors = {};

          for (let item of resp.errors) {
            errors[item[0]] = item[1];
          }

          resp.errors = errors;

          dispatch('UPLOAD_FOLDERS_REQUEST_SUCCESS', { resp, paths });
        },
        err => {
          dispatch('UPLOAD_FOLDERS_REQUEST_ERROR', { err, paths });
        },
      );
    },


    UPLOAD_FOLDERS_REQUEST_SUCCESS_before({ dispatch }, { resp, paths }) {
      let err = {
        code: '',
        title: '',
        message: '',
      };

      for (let path of Object.keys(resp.errors)) {
        err.code = resp.errors[path];
        err.title = path;

        switch (err.code) {
          default:
            err.message = i18n.__('Sorry, something went wrong, please try again later.', 'x4-media-library') + ' (code:' + err.code + ')';
            break;
        }

        dispatch('UPLOAD_FOLDERS_REQUEST_ERROR', { err, paths });
      }
    },


    UPLOAD_FOLDERS_REQUEST_ERROR_before(context, { err, paths }) {
      err.title = err.title || i18n.__('Folders uploading', 'x4-media-library');

      switch (err.code) {
        case '':
          break;
      }
    },

  },

};
