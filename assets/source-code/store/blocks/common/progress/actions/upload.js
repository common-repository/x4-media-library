import i18n from '~/utils/i18n';


export default {

  namespace: 'progress',


  actions: {

    UPLOAD_START_before({ dispatch }) {
      let progress = {
        op: 'uploading',
        title: i18n.__('Uploading', 'x4-media-library'),
        progress2: {
          visible: true,
          label: i18n.__('Total', 'x4-media-library'),
        },
      };

      dispatch('PROGRESS_SHOW', { progress });
    },


    UPLOAD_CALC_START_before({ dispatch }) {
      let label = i18n.__('Getting list of folders and files', 'x4-media-library');
      dispatch('PROGRESS_PROGRESS1_LABEL_CHANGE', { label });
    },


    UPLOAD_FOLDERS_START_before({ dispatch }) {
      let label = i18n.__('Folders creating', 'x4-media-library');
      dispatch('PROGRESS_PROGRESS1_LABEL_CHANGE', { label });
    },


    UPLOAD_FOLDERS_REQUEST_before({ dispatch }) {
      dispatch('PROGRESS_PROGRESS1_COMPLETED_CHANGE', { completed: 10 });
    },


    UPLOAD_FILE_PROGRESS_before: '~PROGRESS_PROGRESS1_COMPLETED_CHANGE',


    UPLOAD_FILE_START_before({ dispatch }, { path }) {
      dispatch('PROGRESS_PROGRESS1_MULTI_CHANGE', { label: path, chunks: 100, completed: 0 });
    },


    UPLOAD_CALC_FINISH_before({ dispatch }, { files }) {
      dispatch('PROGRESS_PROGRESS2_VALUE_CHANGE', { chunks: files.length + 2, completed: 1 });
    },


    UPLOAD_FOLDERS_FINISH_before: 'PROGRESS_PROGRESS2_COMPLETED_INCREMENT',
    UPLOAD_FILE_FINISH_before: 'PROGRESS_PROGRESS2_COMPLETED_INCREMENT',


    UPLOAD_FOLDERS_REQUEST_ERROR_before: '~PROGRESS_ERRORS_ITEM_ADD',
    UPLOAD_FILE_ERROR_before: '~PROGRESS_ERRORS_ITEM_ADD',


    UPLOAD_FINISH: 'PROGRESS_FINISH',

  },

};
