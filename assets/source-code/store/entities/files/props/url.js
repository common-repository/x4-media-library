import { settings } from 'X4MediaLibrary';


export default {

  namespace: 'files/url',


  mutations: {

    FILE_URL_CHANGE({ state }, { file, url }) {
      file.url = url;
    },

  },


  actions: {

    FILE_URL_CHANGE: true,

    FILES_PROPS_INIT: '~FILES_URL_INIT',
    FILE_PATH_CHANGE_after: '~FILE_URL_RECALC',


    FILES_URL_INIT(context, { files, file }) {
      files = files || [file];

      for (let file of files) {
        file.url = getValue(file);
      }
    },


    FILE_URL_RECALC({ dispatch }, { file }) {
      let url = getValue(file);

      if (url === file.url) {
        return;
      }

      dispatch('FILE_URL_CHANGE', { file, url });
    },

  },

};


function getValue(file) {
  return settings.uploadsUrl + '/' + file.path;
}
