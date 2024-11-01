import request from '~/plugin/request';


export default {

  namespace: 'ignoredFolders',


  mutations: {

    IGNORED_FOLDER_IGNORE_CHANGE({ state }, { folder, ignore }) {
      folder.ignore = ignore;
    },

  },


  actions: {

    IGNORED_FOLDER_IGNORE_CHANGE: true,


    IGNORED_FOLDER_IGNORE_CHANGE_APPLY({ dispatch }, { folder, ignore }) {
      if (ignore !== folder.ignore) {
        dispatch('IGNORED_FOLDER_IGNORE_CHANGE_REQUEST', { folder, ignore, prev: folder.ignore });
        dispatch('IGNORED_FOLDER_IGNORE_CHANGE', { folder, ignore });
      }
    },


    IGNORED_FOLDER_IGNORE_CHANGE_REQUEST({ dispatch }, { folder, ignore, prev }) {
      setTimeout(() => {
        dispatch('IGNORED_FOLDER_IGNORE_CHANGE_REQUEST_PAID', { folder, ignore, prev });
      }, 2000);

    },


    IGNORED_FOLDER_IGNORE_CHANGE_ROLLBACK({ dispatch }, { folder, prev }) {
      dispatch('IGNORED_FOLDER_IGNORE_CHANGE', { folder, ignore: prev });
    },


    IGNORED_FOLDER_IGNORE_CHANGE_REQUEST_ERROR: '~IGNORED_FOLDER_IGNORE_CHANGE_ROLLBACK',
    IGNORED_FOLDER_IGNORE_CHANGE_REQUEST_PAID: '~IGNORED_FOLDER_IGNORE_CHANGE_ROLLBACK',

  },

};
