import request from '~/plugin/request';


export default {

  namespace: 'folders/icon',


  mutations: {

    FOLDER_ICON_CHANGE({ state }, { folder, icon }) {
      folder.icon = icon;
    },

  },


  actions: {

    FOLDER_ICON_CHANGE: true,

  },

};
