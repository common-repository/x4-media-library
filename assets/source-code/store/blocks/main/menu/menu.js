import equal from '~/utils/equal';


export default {

  namespace: 'menu',


  state: [],


  mutations: {

    MENU_CHANGE({ state }, { menu }) {
      state.menu = menu;
    },

  },


  actions: {

    MENU_CHANGE: true,


    APP_ENABLE: 'MENU_REFRESH',


    MENU_REFRESH({ state, dispatch, $frame }) {
      if (!$frame.modal) {
        return;
      }

      let $menu = $frame.menu.get();

      if (!$menu) {
        return;
      }

      let menu = $menu.views.get().map(item => {
        if (item.options.state) {
          let click = item.options.click || item.click;

          return {
            cid: item.cid,
            name: item.options.text,
            state: item.options.state,
            active: item.options.state === $frame.state().get('id'),
            priority: item.options.priority,
            click: click.bind(item),
          };
        } else {
          return {
            cid: item.cid,
            separator: true,
            priority: item.options.priority,
          };
        }
      });

      menu.sort((a, b) => {
        if (a.priority > b.priority) return 1;
        if (a.priority < b.priority) return -1;
        return 0;
      });

      if (menu.filter(item => !item.separator).length === 1) {
        menu = [];
      }

      if (menu.length === 0 && state.menu.length === 0) {
        return;
      }

      dispatch('MENU_CHANGE', { menu });
    },


    MENU_ITEM_CLICK(context, { item }) {
      item.click();
    },

  },

};
