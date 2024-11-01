export default {

  namespace: 'offset',


  state: {
    adminmenu: 0,
    adminbar: 0,
  },


  storage: {
    toggleAdminmenuCallback: null,
  },


  mutations: {

    OFFSET_ADMINMENU_CHANGE({ state }, { adminmenu }) {
      state.offset.adminmenu = adminmenu;
    },

    OFFSET_ADMINBAR_CHANGE({ state }, { adminbar }) {
      state.offset.adminbar = adminbar;
    },

  },


  actions: {

    OFFSET_ADMINMENU_CHANGE: true,
    OFFSET_ADMINBAR_CHANGE: true,


    APP_ENABLE({ storage, dispatch, $frame }) {
      if ($frame.modal) {
        return;
      }

      storage.offset.toggleAdminmenuCallback = () => {
        dispatch('OFFSET_ADMINMENU_REFRESH');
      };

      document.querySelector('#collapse-menu').addEventListener('click', storage.offset.toggleAdminmenuCallback);
      document.querySelector('#wp-admin-bar-menu-toggle').addEventListener('click', storage.offset.toggleAdminmenuCallback);
    },


    APP_DISABLE({ storage, $frame }) {
      if ($frame.modal) {
        return;
      }

      document.querySelector('#collapse-menu').removeEventListener('click', storage.offset.toggleAdminmenuCallback);
      document.querySelector('#wp-admin-bar-menu-toggle').removeEventListener('click', storage.offset.toggleAdminmenuCallback);
    },


    OFFSET_ADMINMENU_REFRESH({ dispatch }) {
      dispatch('OFFSET_ADMINMENU_CHANGE', { adminmenu: Math.random() });
    },


    OFFSET_ADMINBAR_REFRESH({ dispatch }) {
      dispatch('OFFSET_ADMINBAR_CHANGE', { adminbar: Math.random() });
    },

  },


  getters: {

    __({ state, $frame }) {
      let offset;

      if (state.width) {}
      if (state.offset.adminmenu) {}
      if (state.offset.adminbar) {}

      if ($frame.modal) {
        let $modal = $frame.modal.el.querySelector('.media-modal')

        offset = {
          left: $modal.offsetLeft,
          right: $modal.offsetLeft,
          top: $modal.offsetTop,
          bottom: $modal.offsetTop,
        };
      } else {
        offset = {
          left: document.querySelector('#adminmenuback').offsetWidth,
          right: 0,
          top: document.querySelector('#wpadminbar').offsetHeight,
          bottom: 0,
        };
      }

      return offset;
    },

  },

};
