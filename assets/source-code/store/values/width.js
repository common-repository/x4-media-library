import debounce from '~/utils/debounce';


export default {

  namespace: 'width',


  state: 0,


  storage: {
    resizeCallback: null,
  },


  mutations: {

    WIDTH_CHANGE({ state }, { width }) {
      state.width = width;
    },

  },


  actions: {

    WIDTH_CHANGE: true,

    WINDOW_RESIZE: 'WIDTH_REFRESH',


    APP_ENABLE({ storage, dispatch, $frame }) {
      storage.width.resizeCallback = () => {
        dispatch('WINDOW_RESIZE');
      };

      window.addEventListener('resize', storage.width.resizeCallback);

      dispatch('WIDTH_REFRESH');
    },


    APP_DISABLE({ storage, $frame }) {
      window.removeEventListener('resize', storage.width.resizeCallback);
    },


    WIDTH_REFRESH({ state, dispatch }) {
      debounce('width', 250, true, () => {
        let width = document.body.clientWidth || 1920;

        if (width !== state.width) {
          dispatch('WIDTH_CHANGE', { width });
        }
      });
    },

  },

};
