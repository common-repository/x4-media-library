import i18n from '~/utils/i18n';
import request from '~/plugin/request';


export default {

  namespace: 'fileExtensions',


  actions: {

    FILE_EXTENSION_DELETE: '~FILE_EXTENSION_DELETE_CONFIRM',


    FILE_EXTENSION_DELETE_REQUEST({ dispatch }, { fileExtension }) {
      dispatch('FILE_EXTENSION_DELETE_REQUEST_PAID', { fileExtension });

    },


    FILE_EXTENSION_DELETE_REQUEST_ERROR_before({ dispatch }, { err, fileExtension }) {
      err.title = i18n.__('File extension deleting', 'x4-media-library');

      switch (err.code) {
        case '':
          break;
      }
    },

  },

};
