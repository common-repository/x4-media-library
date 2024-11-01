import i18n from '~/utils/i18n';
import request from '~/plugin/request';


export default {

  namespace: 'folders',


  actions: {

    FOLDER_CREATE({ state, dispatch }, { path }) {
      if (state.folders[path]) {
        dispatch('FOLDER_CREATE_EXISTS', { path });
        return;
      }

      dispatch('FOLDER_CREATE_REQUEST', { path });
    },


    KEYDOWN({ state, getters, dispatch }, { event }) {
      if (!getters['explorer/focused']) {
        return;
      }

      if (event.shiftKey && event.key === 'N') {
        event.preventDefault();

        dispatch('ADD_FOLDER_START', { block: 'explorer', folder: state.current });
        return;
      }
    },


    FOLDER_CREATE_REQUEST({ dispatch }, { path }) {
      request(
        'folders/create',
        { path },
        resp => {
          dispatch('FOLDER_CREATE_REQUEST_SUCCESS', { resp, path });
        },
        err => {
          dispatch('FOLDER_CREATE_REQUEST_ERROR', { err, path });
        },
      );
    },


    FOLDER_CREATE_REQUEST_ERROR_before({ dispatch }, { err, path }) {
      err.title = i18n.__('Folder creating', 'x4-media-library');

      switch (err.code) {
        case '':
          break;
      }
    },

  },

};
