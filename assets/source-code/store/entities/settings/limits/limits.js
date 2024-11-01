export default {

  namespace: 'limits',


  state: {},


  mutations: {

    LIMITS_INIT({ state }, { limits }) {
      state.limits = limits;
    },

  },


  actions: {

    LIMITS_INIT: true,


    BOOTSTRAP_FOLDERS_REQUEST_SUCCESS({ dispatch }, { resp }) {
      dispatch('LIMITS_INIT', { limits: resp.settings.limits });
    },

  },

};
