import i18n from '~/utils/i18n';


export default {

  namespace: 'progress',


  actions: {

    DELETE_START_before({ state, storage, dispatch }) {
      let chunks = 0;

      let allFolders = storage.delete.allFolders;
      let allFiles = storage.delete.allFiles;

      if (allFiles.length > 0) {
        let limit = state.limits.deleteFilesChunk;
        chunks += Math.ceil(allFiles.length / limit);
      }

      if (allFolders.length > 0) {
        chunks++;
      }

      let progress = {
        op: 'deleting',
        title: i18n.__('Deleting', 'x4-media-library'),
        progress1: {
          label: i18n.__('Total', 'x4-media-library'),
          chunks,
        },
      };

      dispatch('PROGRESS_SHOW', { progress });
    },


    DELETE_FILES_ITERATION_FINISH: 'PROGRESS_PROGRESS1_COMPLETED_INCREMENT',
    DELETE_FOLDERS_FINISH: 'PROGRESS_PROGRESS1_COMPLETED_INCREMENT',


    DELETE_FILES_REQUEST_SUCCESS({ dispatch }, { resp }) {
      for (let err of Object.values(resp.errors)) {
        dispatch('PROGRESS_ERRORS_ITEM_ADD', { err });
      }
    },


    DELETE_FOLDERS_REQUEST_SUCCESS({ dispatch }, { resp }) {
      for (let err of Object.values(resp.errors)) {
        dispatch('PROGRESS_ERRORS_ITEM_ADD', { err });
      }
    },


    DELETE_FILES_REQUEST_ERROR({ dispatch }, { err, files }) {
      for (let file of files) {
        err = { ...err };
        err.title = files.path;

        dispatch('PROGRESS_ERRORS_ITEM_ADD', { err });
      }
    },


    DELETE_FOLDERS_REQUEST_ERROR({ dispatch }, { err, folders }) {
      for (let folder of folders) {
        err = { ...err };
        err.title = folder.path;

        dispatch('PROGRESS_ERRORS_ITEM_ADD', { err });
      }
    },


    DELETE_FINISH: 'PROGRESS_FINISH',

  },

};
