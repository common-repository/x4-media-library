import i18n from '~/utils/i18n';
import request from '~/plugin/request';


export default {

  namespace: 'ignoredFolders',


  actions: {

    IGNORED_FOLDER_CREATE({ state, dispatch }, { path }) {
      let sameItems = state.ignoredFolders.filter(folder => path === folder.path);

      if (sameItems.length > 0) {
        dispatch('IGNORED_FOLDER_CREATE_EXISTS', { path });
        return;
      }

      dispatch('IGNORED_FOLDER_CREATE_REQUEST', { path });
    },


    IGNORED_FOLDER_CREATE_REQUEST({ dispatch }, { path }) {
      dispatch('IGNORED_FOLDER_CREATE_REQUEST_PAID', { path });

    },


    IGNORED_FOLDER_CREATE_REQUEST_ERROR_before({ dispatch }, { err, path }) {
      err.title = i18n.__('Ignored folder creating', 'x4-media-library');

      switch (err.code) {
        case '':
          break;
      }
    },

  },

};
