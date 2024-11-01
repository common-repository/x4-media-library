export default {

  namespace: 'files/thumb',


  mutations: {

    FILE_THUMB_CHANGE({ state }, { file, thumb }) {
      file.thumb = thumb;
    },

  },


  actions: {

    FILE_THUMB_CHANGE: true,

    FILES_URL_INIT_after: '~FILES_THUMB_INIT',
    FILE_URL_CHANGE_after: '~FILE_THUMB_RECALC',
    FILE_TINY_CHANGE_after: '~FILE_THUMB_RECALC',


    FILES_THUMB_INIT({ state }, { files, file }) {
      files = files || [file];

      for (let file of files) {
        file.thumb = getValue(file, state);
      }
    },


    FILE_THUMB_RECALC({ state, dispatch }, { file }) {
      let thumb = getValue(file, state);

      if (thumb === file.thumb) {
        return;
      }

      dispatch('FILE_THUMB_CHANGE', { file, thumb });
    },

  },

};


function getValue(file, state) {
  if (file.tiny) {
    return file.url;
  }

  let subs = file.url.split('.');
  let index = subs.length - 2;

  subs[index] = subs[index] + state.thumbSize.suffix;
  return subs.join('.');
}
