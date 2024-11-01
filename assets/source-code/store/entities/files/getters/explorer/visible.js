export default {

  namespace: 'files/explorer/visible',


  getters: {

    __({ state, getters }) {
      return getters['files/explorer/filtered'].slice(0, state.explorer.visible);
    },

  },

};
