export default {

  namespace: 'thumbSize',


  state: {
    width: 150,
    height: 150,
    suffix: '-150x150',
  },


  mutations: {

    THUMB_SIZE_INIT({ state }, { thumbSize }) {
      state.thumbSize = thumbSize;
    },

  },


  actions: {

    THUMB_SIZE_INIT: true,


    BOOTSTRAP_FOLDERS_REQUEST_SUCCESS({ dispatch }, { resp }) {
      let thumbSize = {
        width: resp.settings.thumbSize.width,
        height: resp.settings.thumbSize.height,
      }

      thumbSize.suffix = '-' + thumbSize.width + 'x' + thumbSize.height;

      dispatch('THUMB_SIZE_INIT', { thumbSize });
    },

  },

};
