import i18n from '~/utils/i18n';


export default {

  namespace: 'shortcuts',


  state: {
    visible: false,
  },


  storage: {
    items: [
      { keys: ['←↕→'], description: i18n.__('Navigation buttons', 'x4-media-library') },
      { keys: ['Enter'], description: i18n.__('Open folder or edit file', 'x4-media-library') },
      { keys: ['Backspace'], description: i18n.__('Navigate to the parent folder', 'x4-media-library') },
      { keys: ['F2'], description: i18n.__('Rename selected folder or file', 'x4-media-library') },
      { keys: ['CTRL+A'], description: i18n.__('Select all items in the current folder', 'x4-media-library') },
      { keys: ['CTRL+X'], description: i18n.__('Cut selected items', 'x4-media-library') },
      { keys: ['CTRL+C', 'CTRL+Insert'], description: i18n.__('Copy selected items', 'x4-media-library') },
      { keys: ['CTRL+V', 'SHIFT+Insert'], description: i18n.__('Paste items in the current folder', 'x4-media-library') },
      { keys: ['Delete', 'CTRL+D'], description: i18n.__('Delete selected items', 'x4-media-library') },
      { keys: ['SHIFT+N'], description: i18n.__('Add folder to the current folder', 'x4-media-library') },
      { keys: ['SHIFT+U'], description: i18n.__('Upload files to the current folder', 'x4-media-library') },
      { keys: ['SHIFT+V'], description: i18n.__('Open "View" dropdown box', 'x4-media-library') },
      { keys: ['SHIFT+S'], description: i18n.__('Open "Sort By" dropdown box', 'x4-media-library') },
      { keys: ['SHIFT+F'], description: i18n.__('Open "Filters" dropdown box', 'x4-media-library') },
      { keys: ['F3', 'CTRL+E', 'CTRL+F'], description: i18n.__('Open "Search" dropdown box', 'x4-media-library') },
      { keys: ['Escape'], description: i18n.__('Close opened dropdown box', 'x4-media-library') },
    ],
  },


  mutations: {

    SHORTCUTS_VISIBLE_CHANGE({ state }, { visible }) {
      state.shortcuts.visible = visible;
    },

  },


  actions: {

    SHORTCUTS_VISIBLE_CHANGE: true,


    SHORTCUTS_OPEN({ dispatch }) {
      dispatch('SHORTCUTS_VISIBLE_CHANGE', { visible: true });
    },

    SHORTCUTS_CLOSE({ dispatch }) {
      dispatch('SHORTCUTS_VISIBLE_CHANGE', { visible: false });
    },

  },

};
