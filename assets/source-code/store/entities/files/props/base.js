import { store } from '~/plugin/bootstrap/activate';
import wp from 'wp';


let initializeAttachment = wp.media.model.Attachment.prototype.initialize;


wp.media.model.Attachment.prototype.initialize = function() {
  initializeAttachment.apply(this, arguments);

  this.on('change', () => {
    let { state, dispatch } = store;

    let id = this.get('id');
    let file = state.files[id];
    let base = this.changed.filename;

    if (file && base && base !== file.base) {
      let path = file.dir
        ? file.dir + '/' + base
        : base;

      dispatch('FILE_NATIVE_BASE_CHANGE', { file, path });
    }
  });
};


export default {

  namespace: 'files/base',


  mutations: {

    FILE_BASE_CHANGE({ state }, { file, base }) {
      file.base = base;
    },

  },


  actions: {

    FILE_BASE_CHANGE: true,

    FILES_PROPS_INIT: '~FILES_BASE_INIT',
    FILE_PATH_CHANGE_after: '~FILE_BASE_RECALC',


    FILES_BASE_INIT(context, { files, file }) {
      files = files || [file];

      for (let file of files) {
        file.base = getValue(file);
      }
    },


    FILE_BASE_RECALC({ state, dispatch }, { file }) {
      let base = getValue(file);

      if (base === file.base) {
        return;
      }

      dispatch('FILE_BASE_CHANGE', { file, base });
    },

  },

};


function getValue(file) {
  let subs = file.path.split('/');
  return subs[subs.length - 1];
}
