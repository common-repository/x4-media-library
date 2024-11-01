export default {

  namespace: 'filters/year',


  state: null,


  mutations: {

    FILTERS_YEAR_CHANGE({ state }, { year }) {
      state.filters.year = year;
    },

  },


  actions: {

    FILTERS_YEAR_CHANGE: true,


    FILTERS_YEAR_RESET({ state, dispatch }) {
      if (state.filters.year !== null) {
        dispatch('FILTERS_YEAR_CHANGE', { year: null });
      }
    },


    FILTERS_RESET: 'FILTERS_YEAR_RESET',
    FILTERS_YEAR_CHANGE_PAID: 'FILTERS_YEAR_RESET',


    FILTERS_YEAR_CHANGE_APPLY({ state, dispatch }, { year }) {
      if (year === state.filters.year) {
        return;
      }

      setTimeout(() => {
        dispatch('FILTERS_YEAR_CHANGE_PAID');
      }, 2000);

      dispatch('FILTERS_YEAR_CHANGE', { year });
    },

  },

};
