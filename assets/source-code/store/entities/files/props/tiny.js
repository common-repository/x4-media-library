export default {

  namespace: 'files/tiny',


  mutations: {

    FILE_TINY_CHANGE({ state }, { file, tiny }) {
      file.tiny = tiny;
    },

  },


  actions: {

    FILE_TINY_CHANGE: true,

    FILES_PROPS_INIT: '~FILES_TINY_INIT',


    FILES_TINY_INIT(context, { files, file }) {
      files = files || [file];

      for (let file of files) {
        file.tiny = false;
      }
    },


    FILE_TINY_CHANGE_APPLY({ dispatch }, { file, tiny }) {
      if (tiny === file.tiny) {
        return;
      }

      dispatch('FILE_TINY_CHANGE', { file, tiny });
    },

  },

};
