export default {

  namespace: 'folders/baselc',


  mutations: {

    FOLDER_BASELC_CHANGE({ state }, { folder, baselc }) {
      folder.baselc = baselc;
    },

  },


  actions: {

    FOLDER_BASELC_CHANGE: true,

    FOLDERS_BASE_INIT_after: '~FOLDERS_BASELC_INIT',
    FOLDER_BASE_CHANGE_after: '~FOLDER_BASELC_RECALC',


    FOLDERS_BASELC_INIT(context, { folders, folder }) {
      folders = folders || [folder];

      for (let folder of folders) {
        folder.baselc = getValue(folder);
      }
    },


    FOLDER_BASELC_RECALC({ dispatch }, { folder }) {
      let baselc = getValue(folder);

      if (baselc === folder.baselc) {
        return;
      }

      dispatch('FOLDER_BASELC_CHANGE', { folder, baselc });
    },

  },

};


function getValue(folder) {
  return folder.base.toLowerCase();
}
