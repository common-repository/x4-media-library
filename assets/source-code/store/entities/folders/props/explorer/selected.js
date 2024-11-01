export default {

  namespace: 'folders/explorer/selected',


  mutations: {

    FOLDERS_EXPLORER_SELECTED_TRAVERSE({ state }, { select, deselect }) {
      for (let folder of select.folders) {
        folder.explorer.selected = true;
      }

      for (let folder of deselect.folders) {
        folder.explorer.selected = false;
      }
    },

  },


  actions: {

    FOLDERS_EXPLORER_SELECTED_TRAVERSE: true,

    FOLDERS_PROPS_INIT: '~FOLDERS_EXPLORER_SELECTED_INIT',
    SELECTED_TRAVERSE: '~FOLDERS_EXPLORER_SELECTED_TRAVERSE',


    FOLDERS_EXPLORER_SELECTED_INIT(context, { folders, folder }) {
      folders = folders || [folder];

      for (let folder of folders) {
        folder.explorer = folder.explorer || {};
        folder.explorer.selected = false;
      }
    },

  },

};
