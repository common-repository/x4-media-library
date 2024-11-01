import request from '~/plugin/request';


export default {

  namespace: 'folders/color',


  mutations: {

    FOLDER_COLOR_CHANGE({ state }, { folder, color }) {
      folder.color = color;
    },

  },


  actions: {

    FOLDER_COLOR_CHANGE: true,

  },

};
