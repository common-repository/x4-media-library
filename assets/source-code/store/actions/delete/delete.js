export default {

  namespace: 'delete',


  storage: {
    allFolders: [],
    allFiles: [],
    folders: [],
    files: [],
    ops:[],
  },


  actions: {

    KEYDOWN({ state, getters, dispatch }, { event }) {
      if (!getters['explorer/focused']) {
        return;
      }

      if ((event.key === 'Delete' || ((event.ctrlKey || event.metaKey) && event.key === 'd')) && getters['selected/all/count'] > 0) {
        event.preventDefault();

        let folders = Object.values(state.selected.folders);
        let files = Object.values(state.selected.files);

        dispatch('DELETE_APPLY', { folders, files });
        return;
      }
    },


    DELETE_START({ storage, dispatch }) {
      let allFiles = storage.delete.allFiles;

      if (allFiles.length > 0) {
        dispatch('DELETE_FILES_START');
      } else {
        dispatch('DELETE_FOLDERS_START');
      }
    },


    DELETE_FILES_FINISH({ state, storage, dispatch }) {
      if (state.progress.visible) {
        let allFolders = storage.delete.allFolders;

        if (allFolders.length > 0) {
          dispatch('DELETE_FOLDERS_START');
        } else {
          dispatch('DELETE_FINISH');
        }
      }
    },


    DELETE_FOLDERS_FINISH({ state, dispatch }) {
      if (state.progress.visible) {
        dispatch('DELETE_FINISH');
      }
    },


    PROGRESS_CANCEL({ state, dispatch }) {
      if (state.progress.op === 'deleting') {
        dispatch('DELETE_CANCEL');
      }
    },

  },

};
