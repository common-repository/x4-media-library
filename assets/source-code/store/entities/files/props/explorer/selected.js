export default {

  namespace: 'files/explorer/selected',


  mutations: {

    FILES_EXPLORER_SELECTED_TRAVERSE({ state }, { select, deselect }) {
      for (let file of select.files) {
        file.explorer.selected = true;
      }

      for (let file of deselect.files) {
        file.explorer.selected = false;
      }
    },

  },


  actions: {

    FILES_EXPLORER_SELECTED_TRAVERSE: true,

    FILES_PROPS_INIT: '~FILES_EXPLORER_SELECTED_INIT',
    SELECTED_TRAVERSE: '~FILES_EXPLORER_SELECTED_TRAVERSE',


    FILES_EXPLORER_SELECTED_INIT(context, { files, file }) {
      files = files || [file];

      for (let file of files) {
        file.explorer = file.explorer || {};
        file.explorer.selected = false;
      }
    },

  },

};
