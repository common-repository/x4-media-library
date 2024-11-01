export default {

  namespace: 'dragstate',


  state: null,


  mutations: {

    DRAGSTATE_CHANGE({ state }, { dragstate }) {
      state.dragstate = dragstate;
    },

  },


  actions: {

    DRAGSTATE_CHANGE: true,


    DRAGSTATE_RESET({ dispatch }) {
      dispatch('DRAGSTATE_CHANGE', { dragstate: null });
    },


    MOVE_DRAG_END: 'DRAGSTATE_RESET',

    SELECT_FRAME_DRAG_END: 'DRAGSTATE_RESET',

    LEFT_RESIZER_DRAG_END: 'DRAGSTATE_RESET',

    RIGHT_RESIZER_DRAG_END: 'DRAGSTATE_RESET',


    MOVE_DRAG_START({ dispatch }) {
      dispatch('DRAGSTATE_CHANGE', { dragstate: 'move' });
    },


    SELECT_FRAME_DRAG_START({ dispatch }) {
      dispatch('DRAGSTATE_CHANGE', { dragstate: 'select-frame' });
    },


    LEFT_RESIZER_DRAG_START({ dispatch }) {
      dispatch('DRAGSTATE_CHANGE', { dragstate: 'left-resizer' });
    },


    RIGHT_RESIZER_DRAG_START({ dispatch }) {
      dispatch('DRAGSTATE_CHANGE', { dragstate: 'right-resizer' });
    },

  },

};
