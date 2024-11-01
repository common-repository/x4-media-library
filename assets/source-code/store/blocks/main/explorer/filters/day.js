export default {

  namespace: 'filters/day',


  state: null,


  mutations: {

    FILTERS_DAY_CHANGE({ state }, { day }) {
      state.filters.day = day;
    },

  },


  actions: {

    FILTERS_DAY_CHANGE: true,

    
    FILTERS_DAY_RESET({ state, dispatch }) {
      if (state.filters.day !== null) {
        dispatch('FILTERS_DAY_CHANGE', { day: null });
      }
    },


    FILTERS_RESET: 'FILTERS_DAY_RESET',
    FILTERS_DAY_CHANGE_PAID: 'FILTERS_DAY_RESET',


    FILTERS_DAY_CHANGE_APPLY({ state, dispatch }, { day }) {
      if (day === state.filters.day) {
        return;
      }

      setTimeout(() => {
        dispatch('FILTERS_DAY_CHANGE_PAID');
      }, 2000);

      dispatch('FILTERS_DAY_CHANGE', { day });
    },

  },

};
