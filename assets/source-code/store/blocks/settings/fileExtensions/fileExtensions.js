export default {

  namespace: 'settings/fileExtensions',


  state: {
    addNew: {
      visible: false,
    },
    infoMessage: {
      visible: false,
    },
  },


  mutations: {

    FILE_EXTENSIONS_ADD_NEW_VISIBLE_CHANGE({ state }, { visible }) {
      state.settings.fileExtensions.addNew.visible = visible;
    },

    FILE_EXTENSIONS_INFO_MESSAGE_VISIBLE_CHANGE({ state }, { visible }) {
      state.settings.fileExtensions.infoMessage.visible = visible;
    },

  },


  actions: {

    FILE_EXTENSIONS_ADD_NEW_VISIBLE_CHANGE: true,
    FILE_EXTENSIONS_INFO_MESSAGE_VISIBLE_CHANGE: true,


    FILE_EXTENSIONS_ADD_NEW_VISIBLE_TOGGLE({ state, dispatch }) {
      let visible = !state.settings.fileExtensions.addNew.visible;
      dispatch('FILE_EXTENSIONS_ADD_NEW_VISIBLE_CHANGE', { visible });
    },


    FILE_EXTENSION_ALLOWED_CHANGE_REQUEST_SUCCESS({ dispatch }) {
      dispatch('FILE_EXTENSIONS_INFO_MESSAGE_VISIBLE_CHANGE', { visible: true });
    },


    FILE_EXTENSION_CREATE_REQUEST_SUCCESS({ dispatch }) {
      dispatch('FILE_EXTENSIONS_ADD_NEW_VISIBLE_CHANGE', { visible: false });
      dispatch('FILE_EXTENSIONS_INFO_MESSAGE_VISIBLE_CHANGE', { visible: true });
    },


    FILE_EXTENSION_CREATE_REQUEST_PAID({ dispatch }) {
      dispatch('FILE_EXTENSIONS_ADD_NEW_VISIBLE_CHANGE', { visible: false });
    },


    FILE_EXTENSION_DELETE_REQUEST_SUCCESS({ dispatch }) {
      dispatch('FILE_EXTENSIONS_INFO_MESSAGE_VISIBLE_CHANGE', { visible: true });
    },

  },

};
