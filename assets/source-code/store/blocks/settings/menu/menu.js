import i18n from '~/utils/i18n';


let menu = [
  { page: 'ignored-folders', icon: 'folder_special', name: i18n.__('Ignored Folders', 'x4-media-library') },
  { page: 'file-extensions', icon: 'insert_drive_file', name: i18n.__('File Extensions', 'x4-media-library') },
];

menu.forEach(item => item.active = false);
menu[0].active = true;


export default {

  namespace: 'settings/menu',


  state: menu,


  mutations: {

    SETTINGS_MENU_ITEM_ACTIVE_CHANGE({ state }, { item, active }) {
      item.active = active;
    },

  },


  actions: {

    SETTINGS_MENU_ITEM_ACTIVE_CHANGE: true,


    SETTINGS_MENU_ITEM_CLICK({ state, getters, dispatch }, { item }) {
      if (item.active) {
        return;
      }

      dispatch('SETTINGS_MENU_ITEM_ACTIVE_CHANGE', { item: getters['settings/menu/active'], active: false });
      dispatch('SETTINGS_MENU_ITEM_ACTIVE_CHANGE', { item, active: true });
    },

  },


  getters: {

    active({ state }) {
      return state.settings.menu.reduce((res, item) => item.active ? item : res, null);
    },

  },

};
