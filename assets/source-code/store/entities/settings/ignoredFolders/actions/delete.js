import i18n from '~/utils/i18n';
import request from '~/plugin/request';


export default {

  namespace: 'ignoredFolders',


  actions: {

    IGNORED_FOLDER_DELETE: '~IGNORED_FOLDER_DELETE_CONFIRM',


    IGNORED_FOLDER_DELETE_REQUEST({ dispatch }, { folder }) {
      dispatch('IGNORED_FOLDER_DELETE_REQUEST_PAID', { folder });

    },


    IGNORED_FOLDER_DELETE_REQUEST_ERROR_before({ dispatch }, { err, folder }) {
      err.title = i18n.__('Ignored folder deleting', 'x4-media-library');

      switch (err.code) {
        case '':
          break;
      }
    },

  },

};
