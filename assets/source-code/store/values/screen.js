export default {

  namespace: 'screen',


  state: 'bootstrap',


  mutations: {

    SCREEN_CHANGE({ state }, { screen }) {
      state.screen = screen;
    },

  },


  actions: {

    SCREEN_CHANGE: true,


    BOOTSTRAP_FINISH({ dispatch }) {
      dispatch('SCREEN_CHANGE', { screen: 'main' });
    },


    SETTINGS_BUTTON_CLICK({ dispatch }) {
      dispatch('SCREEN_CHANGE', { screen: 'settings' });
    },


    MAIN_BUTTON_CLICK({ dispatch }) {
      dispatch('SCREEN_CHANGE', { screen: 'main' });
    },

  },

};
