export default {

  namespace: 'select',


  state: {
    visible: false,
    value: null,
    options: [],
    rect: {
      width: 0,
      left: 0,
      top: 0,
    },
    change: () => {},
    close: () => {},
  },


  mutations: {

    SELECT_CHANGE({ state }, { select }) {
      state.select = select;
    },

    SELECT_VISIBLE_CHANGE({ state }, { visible }) {
      state.select.visible = visible;
    },

  },


  actions: {

    SELECT_CHANGE: true,
    SELECT_VISIBLE_CHANGE: true,


    SELECT_OPEN({ state, getters, dispatch }, { el, value, options, change, close }) {
      let rect = el.getBoundingClientRect();

      let select = {
        visible: true,
        value,
        options,
        rect: {
          width: rect.width,
          left: rect.left - getters['offset'].left,
          top: rect.top + rect.height - getters['offset'].top,
        },
        change,
        close,
      };

      dispatch('SELECT_CHANGE', { select });
    },


    SELECT_CLOSE({ state, dispatch }) {
      if (state.select.visible) {
        dispatch('SELECT_VISIBLE_CHANGE', { visible: false });
         state.select.close();
      }
    },


    SELECT_CHANGE_APPLY({ state, dispatch }, { value }) {
      if (state.select.visible) {
        dispatch('SELECT_VISIBLE_CHANGE', { visible: false });
         state.select.change(value);
      }
    },

  },

};
