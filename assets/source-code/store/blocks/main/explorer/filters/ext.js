export default {

  namespace: 'filters/ext',


  state: null,


  mutations: {

    FILTERS_EXT_CHANGE({ state }, { ext }) {
      state.filters.ext = ext;
    },

  },


  actions: {

    FILTERS_EXT_CHANGE: true,


    FILTERS_EXT_RESET({ state, dispatch }) {
      if (state.filters.ext !== null) {
        dispatch('FILTERS_EXT_CHANGE', { ext: null });
      }
    },


    FILTERS_RESET: 'FILTERS_EXT_RESET',
    FILTERS_EXT_CHANGE_PAID: 'FILTERS_EXT_RESET',


    FILTERS_EXT_CHANGE_APPLY({ state, dispatch }, { ext }) {
      if (ext === state.filters.ext) {
        return;
      }

      setTimeout(() => {
        dispatch('FILTERS_EXT_CHANGE_PAID');
      }, 2000);

      dispatch('FILTERS_EXT_CHANGE', { ext });
    },

  },

};
