export default {

  namespace: 'folders/explorer/visible',


  getters: {

    __({ getters }) {
      return getters['folders/explorer/filtered'].slice();
    },

  },

};
