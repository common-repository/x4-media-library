export default {

  namespace: 'upload',


  actions: {

    UPLOADER_DROPPED: 'UPLOAD_START',


    UPLOAD_START({ dispatch }) {
      dispatch('UPLOAD_CALC_START');
    },


    UPLOAD_CALC_FINISH({ state, dispatch }) {
      if (state.progress.visible) {
        dispatch('UPLOAD_FOLDERS_START');
      }
    },


    UPLOAD_FOLDERS_FINISH({ state, dispatch }) {
      if (state.progress.visible) {
        dispatch('UPLOAD_FILES_START');
      }
    },


    UPLOAD_FILES_FINISH({ state, dispatch }) {
      if (state.progress.visible) {
        dispatch('UPLOAD_FINISH');
      }
    },


    PROGRESS_CANCEL({ state, dispatch }) {
      if (state.progress.op === 'uploading') {
        dispatch('UPLOAD_CANCEL');
      }
    },

  },

};
