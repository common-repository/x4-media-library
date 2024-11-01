export default {

  namespace: 'active',


  state: false,


  mutations: {

    ACTIVE_CHANGE({ state }, { active }) {
      state.active = active;
    },

  },


  actions: {

    ACTIVE_CHANGE: true,


    APP_ENABLE({ dispatch }) {
      dispatch('ACTIVE_CHANGE', { active: true });
    },

    APP_DISABLE({ dispatch }) {
      dispatch('ACTIVE_CHANGE', { active: false });
    },

  },

};
