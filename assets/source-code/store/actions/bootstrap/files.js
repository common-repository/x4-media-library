import request from '~/plugin/request';


export default {

  namespace: 'bootstrap/files',


  state: {
    limit: 0,
    chunks: 0,
  },


  mutations: {

    BOOTSTRAP_FILES_LIMIT_CHANGE({ state }, { limit }) {
      state.bootstrap.files.limit = limit;
    },

    BOOTSTRAP_FILES_CHUNKS_CHANGE({ state }, { chunks }) {
      state.bootstrap.files.chunks = chunks;
    },

  },


  actions: {

    BOOTSTRAP_FILES_LIMIT_CHANGE: true,
    BOOTSTRAP_FILES_CHUNKS_CHANGE: true,


    BOOTSTRAP_FOLDERS_REQUEST_SUCCESS({ dispatch }, { resp }) {
      dispatch('BOOTSTRAP_FILES_LIMIT_CHANGE', { limit: resp.files.limit });
      dispatch('BOOTSTRAP_FILES_CHUNKS_CHANGE', { chunks: resp.files.chunks });
    },


    BOOTSTRAP_FILES_START({ state, dispatch }) {
      let offsets = [];
      let files = [];

      for (let i = 0; i < state.bootstrap.files.chunks; i++) {
        offsets.push(i * state.bootstrap.files.limit);
      }

      dispatch('BOOTSTRAP_FILES_REQUEST_APPLY', { offsets, files });
    },


    BOOTSTRAP_FILES_REQUEST_APPLY({ dispatch }, { offsets, files }) {
      if (offsets.length > 0) {
        let offset = offsets.shift();
        dispatch('BOOTSTRAP_FILES_REQUEST', { offset, offsets, files });
      } else {
        dispatch('FILES_INIT_APPLY', { files });
        dispatch('BOOTSTRAP_FILES_FINISH');
      }
    },


    BOOTSTRAP_FILES_REQUEST({ state, dispatch }, { offset, offsets, files }) {
      request(
        'actions/bootstrap/files',
        { offset },
        resp => {
          dispatch('BOOTSTRAP_FILES_REQUEST_SUCCESS', { resp, offset, offsets, files });
        },
        err => {
          dispatch('BOOTSTRAP_FILES_REQUEST_ERROR', { err, offset, offsets, files });
        },
      );
    },


    BOOTSTRAP_FILES_REQUEST_SUCCESS({ dispatch }, { resp, offsets, files }) {
      files = files.concat(resp.files.map(file => {
        return {
          id: file[0],
          mime: file[1],
          uploaded: new Date(file[2] * 1000),
          path: file[3],
        };
      }));

      dispatch('BOOTSTRAP_FILES_REQUEST_APPLY', { offsets, files });
    },

  },

};
