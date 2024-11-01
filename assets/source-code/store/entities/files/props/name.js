export default {

  namespace: 'files/name',


  mutations: {

    FILE_NAME_CHANGE({ state }, { file, name }) {
      file.name = name;
    },

  },


  actions: {

    FILE_NAME_CHANGE: true,

    FILES_BASE_INIT_after: '~FILES_NAME_INIT',
    FILE_BASE_CHANGE_after: '~FILE_NAME_RECALC',


    FILES_NAME_INIT(context, { files, file }) {
      files = files || [file];

      for (let file of files) {
        file.name = getValue(file);
      }
    },


    FILE_NAME_RECALC({ dispatch }, { file }) {
      let name = getValue(file);

      if (name === file.name) {
        return;
      }

      dispatch('FILE_NAME_CHANGE', { file, name });
    },

  },

};


function getValue(file) {
  let subs = file.base.split('.');
  return subs.slice(0, subs.length - 1).join('.');
}
