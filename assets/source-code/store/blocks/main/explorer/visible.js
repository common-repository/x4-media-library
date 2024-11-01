import debounce from '~/utils/debounce';


export default {

  namespace: 'explorer/visible',


  state: 0,


  mutations: {

    EXPLORER_VISIBLE_CHANGE({ state }, { visible }) {
      state.explorer.visible = visible;
    },

  },


  actions: {

    EXPLORER_VISIBLE_CHANGE: true,

    APP_ENABLE: 'EXPLORER_VISIBLE_RESET',
    CURRENT_CHANGE: 'EXPLORER_VISIBLE_RESET',
    LEFT_RESIZER_CHANGE: 'EXPLORER_VISIBLE_RESET',
    RIGHT_RESIZER_CHANGE: 'EXPLORER_VISIBLE_RESET',
    VIEW_CHANGE: 'EXPLORER_VISIBLE_RESET',
    SORTBY_TYPE_CHANGE: 'EXPLORER_VISIBLE_RESET',
    SORTBY_FIELD_CHANGE: 'EXPLORER_VISIBLE_RESET',
    FILTERS_MIME_CHANGE: 'EXPLORER_VISIBLE_RESET',
    FILTERS_EXT_CHANGE: 'EXPLORER_VISIBLE_RESET',
    FILTERS_YEAR_CHANGE: 'EXPLORER_VISIBLE_RESET',
    FILTERS_MONTH_CHANGE: 'EXPLORER_VISIBLE_RESET',
    FILTERS_DAY_CHANGE: 'EXPLORER_VISIBLE_RESET',
    SEARCH_TEXT_CHANGE: 'EXPLORER_VISIBLE_RESET',
    SEARCH_CURRENT_CHANGE: 'EXPLORER_VISIBLE_RESET',
    SEARCH_DEEP_CHANGE: 'EXPLORER_VISIBLE_RESET',


    EXPLORER_VISIBLE_INCREMENT({ state, storage, dispatch }) {
      let visible = state.explorer.visible + storage.constants.explorerIncrements[state.view];
      dispatch('EXPLORER_VISIBLE_CHANGE', { visible });
    },


    EXPLORER_VISIBLE_RESET({ state, storage, dispatch }) {
      let visible = storage.constants.explorerInitials[state.view];

      if (visible !== state.explorer.visible) {
        dispatch('EXPLORER_VISIBLE_CHANGE', { visible });
      }
    },


    EXPLORER_SCROLL({ state, storage, getters, dispatch }) {
      let $explorer = storage.explorer.self.$el;

      debounce('explorer-scroll-visible', 100, true, () => {
        if (state.explorer.visible >= getters['files/explorer/filtered'].length) {
          return;
        }

        if ($explorer.scrollHeight - $explorer.scrollTop > 2 * $explorer.offsetHeight) {
          return;
        }

        dispatch('EXPLORER_VISIBLE_INCREMENT');
      });
    },

  },

};
