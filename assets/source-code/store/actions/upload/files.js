import i18n from '~/utils/i18n';


export default {

  namespace: 'upload/files',


  storage: [],


  actions: {

    UPLOAD_FILES_START: 'UPLOAD_FILES_ITERATION',
    UPLOAD_FILE_FINISH: 'UPLOAD_FILES_ITERATION',

    UPLOAD_FILE_SUCCESS: 'UPLOAD_FILE_FINISH',
    UPLOAD_FILE_ERROR: 'UPLOAD_FILE_FINISH',


    UPLOAD_CALC_FINISH_before({ storage, dispatch }, { files }) {
      storage.upload.files = files;
    },


    UPLOAD_FILES_ITERATION({ state, storage, dispatch }) {
      if (storage.upload.files.length === 0) {
        dispatch('UPLOAD_FILES_FINISH');
        return;
      }

      if (!state.progress.visible) {
        return;
      }

      let file = storage.upload.files.shift();
      dispatch('UPLOAD_FILE_START', { file, path: file.x4path });
    },


    UPLOAD_FILE_START({ $frame }, { file, path }) {
      let uploader = $frame.uploader.uploader.uploader;
      let wpUploader = $frame.uploader.uploader;

      wpUploader.param('x4path', path);
      uploader.addFile(file);
    },


    UPLOAD_FILE_ERROR_before(context, { err, errMessage, plFile }) {
      err.message = errMessage;

      err.title = !plFile
        ?  i18n.__('Files uploading', 'x4-media-library')
        : plFile.name
    },


    UPLOAD_FILE_PROGRESS({ state, $frame }, { completed }) {
      let uploader = $frame.uploader.uploader.uploader;

      if (!state.progress.visible) {
        uploader.stop();
        uploader.splice();
      }
    },

  },

};
