export default {

  namespace: 'info',


  getters: {

    type({ getters }) {
      return getters['selected/all/count'] === 0
        ? 'folders'
        :  getters['selected/all/count'] === 1
          ? getters['selected/folders/count'] === 1
            ? 'folders'
            : 'files'
          : 'multiple';
    },


    entity({ state, getters }) {
      return getters['selected/all/count'] === 0
        ? state.current
        :  getters['selected/all/count'] === 1
          ? getters['selected/folders/count'] === 1
            ? Object.values(state.selected.folders).shift()
            : Object.values(state.selected.files).shift()
          : null;
    },


    single({ getters }) {
      return getters['selected/all/count'] === 0
        ? false
        :  getters['selected/all/count'] === 1
          ? getters['selected/folders/count'] === 1
            ? true
            : true
          : false;
    },

  },

};
