export default {

  namespace: 'folders/dir',


  mutations: {

    FOLDER_DIR_CHANGE({ state }, { folder, dir }) {
      folder.dir = dir;
    },

  },


  actions: {

    FOLDER_DIR_CHANGE: true,

    FOLDERS_PROPS_INIT: '~FOLDERS_DIR_INIT',
    FOLDER_PATH_CHANGE_after: '~FOLDER_DIR_RECALC',


    FOLDERS_DIR_INIT(context, { folders, folder }) {
      folders = folders || [folder];

      for (let folder of folders) {
        folder.dir = getValue(folder);
      }
    },


    FOLDER_DIR_RECALC({ state, dispatch }, { folder }) {
      let dir = getValue(folder);

      if (dir === folder.dir) {
        return;
      }

      dispatch('FOLDER_DIR_CHANGE', { folder, dir });
    },

  },

};


function getValue(folder) {
  let subs = folder.path.split('/');

  return folder.path !== ''
    ? subs.slice(0, subs.length - 1).join('/')
    : null;
}
