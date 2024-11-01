import debounce from '~/utils/debounce';


export default {

  namespace: 'leftResizer',


  state: {
    x: 0,
    width: 0,
  },


  mutations: {

    LEFT_RESIZER_CHANGE({ state }, { x, width }) {
      state.leftResizer.x = x;
      state.leftResizer.width = width;
    },

  },


  actions: {

    LEFT_RESIZER_CHANGE: true,


    LEFT_RESIZER_DRAG_START({ state, storage, dispatch }, { event }) {
      dispatch('LEFT_RESIZER_DRAG_START_PAID');

    },


    LEFT_RESIZER_DRAG_OVER({ state, dispatch }, { event }) {
    },

  },

};
