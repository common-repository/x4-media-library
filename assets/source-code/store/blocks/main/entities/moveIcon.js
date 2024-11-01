export default {

  namespace: 'moveIcon',


  storage: {
    self: null,
  },


  mutations: {

    MOVE_ICON_INIT({ storage }, { moveIcon }) {
      storage.moveIcon.self = moveIcon;
    },

  },


  actions: {

    MOVE_ICON_INIT: true,

  },

};
