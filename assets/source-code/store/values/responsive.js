export default {

  namespace: 'responsive',


  getters: {

    isMobile({ state, storage }) {
      return state.width < storage.constants.mobileLimit;
    },

  },

};
