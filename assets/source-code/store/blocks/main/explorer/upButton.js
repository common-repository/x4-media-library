import debounce from '~/utils/debounce';


export default {

  namespace: 'upButton',


  state: {
    visible: false,
  },


  mutations: {

    UP_BUTTON_VISIBLE_CHANGE({ state }, { visible }) {
      state.upButton.visible = visible;
    },

  },


  actions: {

    UP_BUTTON_VISIBLE_CHANGE: true,


    EXPLORER_VISIBLE_RESET({ state, storage, dispatch }) {
      if (state.upButton.visible) {
        dispatch('UP_BUTTON_VISIBLE_CHANGE', { visible: false });
      }

      if (storage.explorer.self && storage.explorer.self.$el) {
        setTimeout(() => storage.explorer.self.$el.scrollTop = 0, 0);
      }
    },


    UP_BUTTON_CLICK({ state, storage, dispatch }) {
      let $explorer = storage.explorer.self.$el;

      if (!state.upButton.visible) {
        return;
      }

      if (!storage.constants.isIE && !storage.constants.isEdge) {
        $explorer.scrollTo({ behavior: 'smooth', top: 0 });
      } else {
        $explorer.scrollTop = 0;
      }
    },


    EXPLORER_SCROLL({ state, storage, dispatch }) {
      let $explorer = storage.explorer.self.$el;

      debounce('up-button', 250, true, () => {
        if (!state.upButton.visible && $explorer.scrollTop > 0) {
          dispatch('UP_BUTTON_VISIBLE_CHANGE', { visible: true });
        } else if (state.upButton.visible && $explorer.scrollTop === 0) {
          dispatch('UP_BUTTON_VISIBLE_CHANGE', { visible: false });
        }
      });
    },

  },

};
