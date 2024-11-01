export default {

  namespace: 'files/baselc',


  mutations: {

    FILE_BASELC_CHANGE({ state }, { file, baselc }) {
      file.baselc = baselc;
    },

  },


  actions: {

    FILE_BASELC_CHANGE: true,

    FILES_BASE_INIT_after: '~FILES_BASELC_INIT',
    FILE_BASE_CHANGE_after: '~FILE_BASELC_RECALC',


    FILES_BASELC_INIT(context, { files, file }) {
      files = files || [file];

      for (let file of files) {
        file.baselc = getValue(file);
      }
    },


    FILE_BASELC_RECALC({ dispatch }, { file }) {
      let baselc = getValue(file);

      if (baselc === file.baselc) {
        return;
      }

      dispatch('FILE_BASELC_CHANGE', { file, baselc });
    },

  },

};


function getValue(file) {
  return file.base.toLowerCase();
}
