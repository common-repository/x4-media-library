import i18n from '~/utils/i18n';


export default {

  namespace: 'folders/base',


  mutations: {

    FOLDER_BASE_CHANGE({ state }, { folder, base }) {
      folder.base = base;
    },

  },


  actions: {

    FOLDER_BASE_CHANGE: true,

    FOLDERS_PROPS_INIT: '~FOLDERS_BASE_INIT',
    FOLDER_PATH_CHANGE_after: '~FOLDER_BASE_RECALC',


    FOLDERS_BASE_INIT(context, { folders, folder }) {
      folders = folders || [folder];

      for (let folder of folders) {
        folder.base = getValue(folder);
      }
    },


    FOLDER_BASE_RECALC({ state, dispatch }, { folder }) {
      let base = getValue(folder);

      if (base === folder.base) {
        return;
      }

      dispatch('FOLDER_BASE_CHANGE', { folder, base });
    },

  },

};


function getValue(folder) {
  let subs = folder.path.split('/');

  return folder.path === ''
    ? i18n.__('Media Library', 'x4-media-library')
    : subs[subs.length - 1];
}
