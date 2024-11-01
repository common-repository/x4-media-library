export default {

  namespace: 'context',


  state: {
    visible: false,
    block: '',
    type: '',
    entity: null,
    single: false,
    position: {
      left: 0,
      top: 0,
    },
  },


  mutations: {

    CONTEXT_CHANGE({ state }, { context }) {
      state.context = context;
    },

    CONTEXT_VISIBLE_CHANGE({ state }, { visible }) {
      state.context.visible = visible;
    },

  },


  actions: {

    CONTEXT_CHANGE: true,
    CONTEXT_VISIBLE_CHANGE: true,


    CONTEXT_SHOW({ state, getters, dispatch }, { event, block, entity, type, single }) {
      let context = {
        visible: true,
        block,
        type,
        entity,
        single,
        position: {
          left: event.clientX - getters['offset'].left,
          top: event.clientY - getters['offset'].top,
        },
      };

      if (block === 'explorer' && getters['selected/all/count'] > 1) {
        context.type = 'multiple';
        context.entity = null;
        context.single = false;
      }

      dispatch('CONTEXT_CHANGE', { context });
    },


    CONTEXT_HIDE({ state, dispatch }) {
      if (state.context.visible) {
        dispatch('CONTEXT_VISIBLE_CHANGE', { visible: false });
      }
    },

  },

};
