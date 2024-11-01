import $ from 'jquery';
import i18n from '~/utils/i18n';
import request from '~/plugin/request';


export default {

  namespace: 'files',


  actions: {

    KEYDOWN({ state, getters, dispatch }, { event }) {
      if (!getters['explorer/focused']) {
        return;
      }

      if (event.key === 'F2' && getters['selected/files/count'] === 1 && getters['selected/folders/count'] === 0) {
        event.preventDefault();

        let file = Object.values(state.selected.files).shift();

        dispatch('RENAME_START', { block: 'explorer', entity: file, type: 'files' });
        return;
      }
    },


    FILE_RENAME({ getters, dispatch }, { file, path }) {
      let subfiles = getters['files/perDir'][file.dir] || [];
      let pathlc = path.toLowerCase();

      for (let subfile of subfiles) {
        if (pathlc === subfile.path.toLowerCase()) {
          dispatch('FILE_RENAME_EXISTS', { file, path });
          return;
        }
      }

      dispatch('FILE_RENAME_REQUEST', { file, path });
    },


    FILE_RENAME_REQUEST({ dispatch }, { file, path }) {
      dispatch('FILE_RENAME_REQUEST_PAID', { file, path });

    },


    FILE_RENAME_REQUEST_SUCCESS_after(context, { file }) {
      $.get({ url: file.url, headers: { 'Cache-Control': 'no-cache' } });
      $.get({ url: file.thumb, headers: { 'Cache-Control': 'no-cache' } });
    },


    FILE_RENAME_REQUEST_ERROR_before(context, { err, file, path }) {
      err.title = i18n.__('File renaming', 'x4-media-library');

      switch (err.code) {
        case '':
          break;
      }
    },

  },

};
