export default {

  namespace: 'settings/ignoredFolders',


  state: {
    addNew: {
      visible: false,
    },
    infoMessage: {
      visible: false,
    },
  },


  mutations: {

    IGNORED_FOLDERS_ADD_NEW_VISIBLE_CHANGE({ state }, { visible }) {
      state.settings.ignoredFolders.addNew.visible = visible;
    },

    IGNORED_FOLDERS_INFO_MESSAGE_VISIBLE_CHANGE({ state }, { visible }) {
      state.settings.ignoredFolders.infoMessage.visible = visible;
    },

  },


  actions: {

    IGNORED_FOLDERS_ADD_NEW_VISIBLE_CHANGE: true,
    IGNORED_FOLDERS_INFO_MESSAGE_VISIBLE_CHANGE: true,


    IGNORED_FOLDERS_ADD_NEW_VISIBLE_TOGGLE({ state, dispatch }) {
      let visible = !state.settings.ignoredFolders.addNew.visible;
      dispatch('IGNORED_FOLDERS_ADD_NEW_VISIBLE_CHANGE', { visible });
    },


    IGNORED_FOLDER_IGNORE_CHANGE_REQUEST_SUCCESS({ dispatch }) {
      dispatch('IGNORED_FOLDERS_INFO_MESSAGE_VISIBLE_CHANGE', { visible: true });
    },


    IGNORED_FOLDER_CREATE_REQUEST_SUCCESS({ dispatch }) {
      dispatch('IGNORED_FOLDERS_ADD_NEW_VISIBLE_CHANGE', { visible: false });
      dispatch('IGNORED_FOLDERS_INFO_MESSAGE_VISIBLE_CHANGE', { visible: true });
    },


    IGNORED_FOLDER_CREATE_REQUEST_PAID({ dispatch }) {
      dispatch('IGNORED_FOLDERS_ADD_NEW_VISIBLE_CHANGE', { visible: false });
    },


    IGNORED_FOLDER_DELETE_REQUEST_SUCCESS({ dispatch }) {
      dispatch('IGNORED_FOLDERS_INFO_MESSAGE_VISIBLE_CHANGE', { visible: true });
    },

  },

};
