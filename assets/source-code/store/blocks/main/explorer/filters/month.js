export default {

  namespace: 'filters/month',


  state: null,


  mutations: {

    FILTERS_MONTH_CHANGE({ state }, { month }) {
      state.filters.month = month;
    },

  },


  actions: {

    FILTERS_MONTH_CHANGE: true,


    FILTERS_MONTH_RESET({ state, dispatch }) {
      if (state.filters.month !== null) {
        dispatch('FILTERS_MONTH_CHANGE', { month: null });
      }
    },


    FILTERS_RESET: 'FILTERS_MONTH_RESET',
    FILTERS_MONTH_CHANGE_PAID: 'FILTERS_MONTH_RESET',


    FILTERS_MONTH_CHANGE_APPLY({ state, dispatch }, { month }) {
      if (month === state.filters.month) {
        return;
      }

      setTimeout(() => {
        dispatch('FILTERS_MONTH_CHANGE_PAID');
      }, 2000);

      dispatch('FILTERS_MONTH_CHANGE', { month });
    },

  },

};
