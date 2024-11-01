export default {

  namespace: 'folders/breadcrumb',


  getters: {

    __({ state, getters }) {
      let breadcrumb = [];

      if (state.current) {
        breadcrumb = breadcrumb
          .concat(getters['folders/parents'][state.current.path] || [])
          .concat([state.current]);
      }

      return breadcrumb;
    },

  },

};
