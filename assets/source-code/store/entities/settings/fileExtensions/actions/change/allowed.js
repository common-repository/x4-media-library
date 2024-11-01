import request from '~/plugin/request';


export default {

  namespace: 'fileExtensions',


  mutations: {

    FILE_EXTENSION_ALLOWED_CHANGE({ state }, { fileExtension, allowed }) {
      fileExtension.allowed = allowed;
    },

  },


  actions: {

    FILE_EXTENSION_ALLOWED_CHANGE: true,


    FILE_EXTENSION_ALLOWED_CHANGE_APPLY({ dispatch }, { fileExtension, allowed }) {
      if (allowed !== fileExtension.allowed) {
        dispatch('FILE_EXTENSION_ALLOWED_CHANGE_REQUEST', { fileExtension, allowed, prev: fileExtension.allowed });
        dispatch('FILE_EXTENSION_ALLOWED_CHANGE', { fileExtension, allowed });
      }
    },


    FILE_EXTENSION_ALLOWED_CHANGE_REQUEST({ dispatch }, { fileExtension, allowed, prev }) {
      setTimeout(() => {
        dispatch('FILE_EXTENSION_ALLOWED_CHANGE_REQUEST_PAID', { fileExtension, allowed, prev });
      }, 2000);

    },


    FILE_EXTENSION_ALLOWED_CHANGE_ROLLBACK({ dispatch }, { fileExtension, prev }) {
      dispatch('FILE_EXTENSION_ALLOWED_CHANGE', { fileExtension, allowed: prev });
    },


    FILE_EXTENSION_ALLOWED_CHANGE_REQUEST_ERROR: '~FILE_EXTENSION_ALLOWED_CHANGE_ROLLBACK',
    FILE_EXTENSION_ALLOWED_CHANGE_REQUEST_PAID: '~FILE_EXTENSION_ALLOWED_CHANGE_ROLLBACK',

  },

};
