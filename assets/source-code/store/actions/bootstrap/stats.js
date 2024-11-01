import i18n from '~/utils/i18n';


export default {

  namespace: 'bootstrap/stats',


  state: {
    chunks: 0,
    completed: 0,
    message: '',
  },


  mutations: {

    BOOTSTRAP_STATS_CHUNKS_CHANGE({ state }, { chunks }) {
      state.bootstrap.stats.chunks = chunks;
    },

    BOOTSTRAP_STATS_COMPLETED_CHANGE({ state }, { completed }) {
      state.bootstrap.stats.completed = completed;
    },

    BOOTSTRAP_STATS_MESSAGE_CHANGE({ state }, { message }) {
      state.bootstrap.stats.message = message;
    },

  },


  actions: {

    BOOTSTRAP_STATS_CHUNKS_CHANGE: true,
    BOOTSTRAP_STATS_COMPLETED_CHANGE: true,
    BOOTSTRAP_STATS_MESSAGE_CHANGE: true,


    BOOTSTRAP_FOLDERS_START({ dispatch }) {
      let message = i18n.__('Loading media library folders', 'x4-media-library');
      dispatch('BOOTSTRAP_STATS_MESSAGE_CHANGE', { message });
    },


    BOOTSTRAP_FOLDERS_REQUEST_SUCCESS({ dispatch }, { resp }) {
      dispatch('BOOTSTRAP_STATS_CHUNKS_CHANGE', { chunks: 1 + resp.files.chunks });
      dispatch('BOOTSTRAP_STATS_COMPLETED_CHANGE', { completed: 1 });
    },


    BOOTSTRAP_FILES_START({ dispatch }) {
      let message = i18n.__('Loading media library files', 'x4-media-library');
      dispatch('BOOTSTRAP_STATS_MESSAGE_CHANGE', { message });
    },


    BOOTSTRAP_FILES_REQUEST_SUCCESS({ state, dispatch }, { resp }) {
      dispatch('BOOTSTRAP_STATS_COMPLETED_CHANGE', { completed: state.bootstrap.stats.completed + 1 });
    },


    BOOTSTRAP_FINISHING({ dispatch }) {
      let message = i18n.__('Rendering media library', 'x4-media-library');
      dispatch('BOOTSTRAP_STATS_MESSAGE_CHANGE', { message });
    },

  },

};
