import request from '~/plugin/request';


export default {

  namespace: 'bootstrap/folders',


  actions: {

    BOOTSTRAP_FOLDERS_START: 'BOOTSTRAP_FOLDERS_REQUEST',


    BOOTSTRAP_FOLDERS_REQUEST_SUCCESS({ dispatch }, { resp }) {
      let folders = resp.folders.map(folder => {
        return {
          path: folder[0],
          icon: folder[1],
          color: folder[2],
        };
      });

      dispatch('FOLDERS_INIT_APPLY', { folders });
      dispatch('BOOTSTRAP_FOLDERS_FINISH');
    },


    BOOTSTRAP_FOLDERS_REQUEST({ dispatch }) {
      request(
        'actions/bootstrap/folders',
        resp => {
          dispatch('BOOTSTRAP_FOLDERS_REQUEST_SUCCESS', { resp });
        },
        err => {
          dispatch('BOOTSTRAP_FOLDERS_REQUEST_ERROR', { err });
        },
      );
    },

  },

};
