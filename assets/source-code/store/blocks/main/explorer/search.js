export default {

  namespace: 'search',


  state: {
    text: '',
    current: true,
    deep: true,
  },


  mutations: {

    SEARCH_TEXT_CHANGE({ state }, { text }) {
      state.search.text = text;
    },

    SEARCH_CURRENT_CHANGE({ state }, { current }) {
      state.search.current = current;
    },

    SEARCH_DEEP_CHANGE({ state }, { deep }) {
      state.search.deep = deep;
    },

  },


  actions: {

    SEARCH_TEXT_CHANGE: true,
    SEARCH_CURRENT_CHANGE: true,
    SEARCH_DEEP_CHANGE: true,


    CURRENT_CHANGE({ state, dispatch }) {
      if (state.search.text !== '') {
        dispatch('SEARCH_TEXT_CHANGE', { text: '' });
      }
    },


    SEARCH_RESET({ state, dispatch }) {
      if (state.search.text !== '') {
        dispatch('SEARCH_TEXT_CHANGE', { text: '' });
      }

      if (state.search.current !== true) {
        dispatch('SEARCH_CURRENT_CHANGE', { current: true });
      }

      if (state.search.deep !== true) {
        dispatch('SEARCH_DEEP_CHANGE', { deep: true });
      }
    },


    SEARCH_TEXT_CHANGE_PAID: 'SEARCH_RESET',
    SEARCH_CURRENT_CHANGE_PAID: 'SEARCH_RESET',
    SEARCH_DEEP_CHANGE_PAID: 'SEARCH_RESET',


    SEARCH_TEXT_CHANGE_APPLY({ state, dispatch }, { text }) {
      if (text === state.search.text) {
        return;
      }

      setTimeout(() => {
        dispatch('SEARCH_TEXT_CHANGE_PAID');
      }, 2000);

      dispatch('SEARCH_TEXT_CHANGE', { text });
    },


    SEARCH_CURRENT_CHANGE_APPLY({ state, dispatch }, { current }) {
      if (current === state.search.current) {
        return;
      }

      setTimeout(() => {
        dispatch('SEARCH_CURRENT_CHANGE_PAID');
      }, 2000);

      dispatch('SEARCH_CURRENT_CHANGE', { current });
    },


    SEARCH_DEEP_CHANGE_APPLY({ state, dispatch }, { deep }) {
      if (deep === state.search.deep) {
        return;
      }

      setTimeout(() => {
        dispatch('SEARCH_DEEP_CHANGE_PAID');
      }, 2000);

      dispatch('SEARCH_DEEP_CHANGE', { deep });
    },

  },

};
