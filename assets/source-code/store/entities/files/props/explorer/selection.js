export default {

  namespace: 'files/explorer/selection',


  mutations: {

    FILES_EXPLORER_SELECTION_TRAVERSE({ state }, { select, deselect }) {
      for (let file of select) {
        file.explorer.selection = true;
      }

      for (let file of deselect) {
        file.explorer.selection = false;
      }
    },

  },


  actions: {

    FILES_EXPLORER_SELECTION_TRAVERSE: true,

    FILES_PROPS_INIT: '~FILES_EXPLORER_SELECTION_INIT',
    SELECTION_ITEMS_TRAVERSE: '~FILES_EXPLORER_SELECTION_TRAVERSE',


    FILES_EXPLORER_SELECTION_INIT(context, { files, file }) {
      files = files || [file];

      for (let file of files) {
        file.explorer = file.explorer || {};
        file.explorer.selection = false;
      }
    },

  },

};
