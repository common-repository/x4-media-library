export default {

  namespace: 'files/ext',


  mutations: {

    FILE_EXT_CHANGE({ state }, { file, ext }) {
      file.ext = ext;
    },

  },


  actions: {

    FILE_EXT_CHANGE: true,

    FILES_BASE_INIT_after: '~FILES_EXT_INIT',
    FILE_BASE_CHANGE_after: '~FILE_EXT_RECALC',


    FILES_EXT_INIT(context, { files, file }) {
      files = files || [file];

      for (let file of files) {
        file.ext = getValue(file);
      }
    },


    FILE_EXT_RECALC({ dispatch }, { file }) {
      let ext = getValue(file);

      if (ext === file.ext) {
        return;
      }

      dispatch('FILE_EXT_CHANGE', { file, ext });
    },

  },

};


function getValue(file) {
  let subs = file.base.split('.');
  return subs[subs.length - 1];
}
