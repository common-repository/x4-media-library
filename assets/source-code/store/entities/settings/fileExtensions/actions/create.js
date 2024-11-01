import i18n from '~/utils/i18n';
import request from '~/plugin/request';


export default {

  namespace: 'fileExtensions',


  actions: {

    FILE_EXTENSION_CREATE({ state, dispatch }, { ext, mimeType }) {
      let sameItems = state.fileExtensions.filter(fileExtension => ext === fileExtension.ext);

      if (sameItems.length > 0) {
        dispatch('FILE_EXTENSION_CREATE_EXISTS', { ext, mimeType });
        return;
      }

      dispatch('FILE_EXTENSION_CREATE_REQUEST', { ext, mimeType });
    },


    FILE_EXTENSION_CREATE_REQUEST({ dispatch }, { ext, mimeType }) {
      dispatch('FILE_EXTENSION_CREATE_REQUEST_PAID', { ext, mimeType });

    },


    FILE_EXTENSION_CREATE_REQUEST_ERROR_before({ dispatch }, { err, ext, mimeType }) {
      err.title = i18n.__('File extension creating', 'x4-media-library');

      switch (err.code) {
        case '':
          break;
      }
    },

  },

};
