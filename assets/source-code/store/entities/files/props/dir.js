export default {

  namespace: 'files/dir',


  mutations: {

    FILE_DIR_CHANGE({ state }, { file, dir }) {
      file.dir = dir;
    },

  },


  actions: {

    FILE_DIR_CHANGE: true,

    FILES_PROPS_INIT: '~FILES_DIR_INIT',
    FILE_PATH_CHANGE_after: '~FILE_DIR_RECALC',


    FILES_DIR_INIT(context, { files, file }) {
      files = files || [file];

      for (let file of files) {
        file.dir = getValue(file);
      }
    },


    FILE_DIR_RECALC({ state, dispatch }, { file }) {
      let dir = getValue(file);

      if (dir === file.dir) {
        return;
      }

      dispatch('FILE_DIR_CHANGE', { file, dir });
    },

  },

};


function getValue(file) {
  let subs = file.path.split('/');
  return subs.slice(0, subs.length - 1).join('/');
}
