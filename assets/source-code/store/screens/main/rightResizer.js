import debounce from '~/utils/debounce';


export default {

  namespace: 'rightResizer',


  state: {
    x: 0,
    width: 0,
  },


  mutations: {

    RIGHT_RESIZER_CHANGE({ state }, { x, width }) {
      state.rightResizer.x = x;
      state.rightResizer.width = width;
    },

  },


  actions: {

    RIGHT_RESIZER_CHANGE: true,


    RIGHT_RESIZER_DRAG_START({ state, storage, dispatch }, { event }) {
      dispatch('RIGHT_RESIZER_DRAG_START_PAID');

    },


    RIGHT_RESIZER_DRAG_OVER({ state, dispatch }, { event }) {
    },

  },

};
