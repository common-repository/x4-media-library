export default {

  namespace: 'bootstrap',


  state: {
    started: false,
    finished: false,
  },


  mutations: {

    BOOTSTRAP_STARTED_CHANGE({ state }, { started }) {
      state.bootstrap.started = started;
    },

    BOOTSTRAP_FINISHED_CHANGE({ state }, { finished }) {
      state.bootstrap.finished = finished;
    },

  },


  actions: {

    BOOTSTRAP_STARTED_CHANGE: true,
    BOOTSTRAP_FINISHED_CHANGE: true,


    APP_ENABLE({ state, dispatch }) {
      if (!state.started) {
        dispatch('BOOTSTRAP_START');
      }
    },


    BOOTSTRAP_START({ dispatch }) {
      dispatch('BOOTSTRAP_STARTED_CHANGE', { started: true });
      dispatch('BOOTSTRAP_FOLDERS_START');
    },


    BOOTSTRAP_FOLDERS_FINISH({ dispatch }) {
      dispatch('BOOTSTRAP_FILES_START');
    },


    BOOTSTRAP_FILES_FINISH({ dispatch }) {
      dispatch('BOOTSTRAP_FINISHING');
    },


    BOOTSTRAP_FINISHING({ dispatch }) {
      setTimeout(() => dispatch('BOOTSTRAP_FINISH'), 500);
    },


    BOOTSTRAP_FINISH({ dispatch }) {
      dispatch('BOOTSTRAP_FINISHED_CHANGE', { finished: true });
    },

  },

};
