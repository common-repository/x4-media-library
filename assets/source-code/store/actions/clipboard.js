import Vue from 'vue';


export default {

  namespace: 'clipboard',


  state: {
    op: '',
    exclude: {},
    folders: {},
    files: {},
  },


  mutations: {

    CLIPBOARD_CHANGE({ state }, { clipboard }) {
      state.clipboard = clipboard;
    },

    CLIPBOARD_DESELECT({ state }, { folders, files }) {
      for (let folder of folders) {
        Vue.delete(state.clipboard.folders, folder.path);
      }

      for (let file of files) {
        Vue.delete(state.clipboard.files, file.id);
      }
    },

    CLIPBOARD_FOLDERS_PATH_REPLACE({ state }, { folder, path }) {
      Vue.delete(state.clipboard.folders, folder.path);
      Vue.set(state.clipboard.folders, path, folder);
    },

    CLIPBOARD_EXCLUDE_PATH_REPLACE({ state }, { folder, path }) {
      Vue.delete(state.clipboard.exclude, folder.path);
      Vue.set(state.clipboard.exclude, path, folder);
    },

  },


  actions: {

    CLIPBOARD_CHANGE: true,
    CLIPBOARD_DESELECT: true,
    CLIPBOARD_FOLDERS_PATH_REPLACE: true,
    CLIPBOARD_EXCLUDE_PATH_REPLACE: true,


    KEYDOWN({ state, getters, dispatch }, { event }) {
      if (!getters['explorer/focused']) {
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.key === 'x' && getters['selected/all/count'] > 0) {
        event.preventDefault();

        let folders = Object.assign({}, state.selected.folders);
        let files = Object.assign({}, state.selected.files);

        dispatch('CLIPBOARD_START_APPLY', { op: 'cut', folders, files });
        return;
      }

      if ((event.ctrlKey || event.metaKey) && (event.key === 'c' || event.key === 'Insert') && getters['selected/all/count'] > 0) {
        event.preventDefault();

        let folders = Object.assign({}, state.selected.folders);
        let files = Object.assign({}, state.selected.files);

        dispatch('CLIPBOARD_START_APPLY', { op: 'copy', folders, files });
        return;
      }

      if ((((event.ctrlKey || event.metaKey) && event.key === 'v') || (event.shiftKey && event.key === 'Insert')) && getters['clipboard/all/count'] > 0 && state.search.text === '') {
        if ((state.clipboard.op === 'cut' && !!state.clipboard.exclude[state.current.path])) {
          return;
        }

        event.preventDefault();

        dispatch('CLIPBOARD_FINISH', { target: state.current });
        return;
      }      
    },


    CLIPBOARD_START_APPLY: 'CLIPBOARD_START_PAID',



    CLIPBOARD_START({ getters, dispatch }, { op, folders, files }) {
      let clipboard = {
        op,
        exclude: {},
        folders,
        files,
      };

      for (let folder of Object.values(folders)) {
        let subfolders = [folder].concat(getters['folders/children'][folder.path] || []);

        for (let subfolder of subfolders) {
          clipboard.exclude[subfolder.path] = subfolder;
        }
      }

      dispatch('CLIPBOARD_CHANGE', { clipboard });
    },


    CLIPBOARD_FINISH({ state, dispatch }, { target }) {
      let folders = Object.values(state.clipboard.folders);
      let files = Object.values(state.clipboard.files);

      if (state.clipboard.op === 'cut') {
        dispatch('MOVE_START', { target, folders, files });
      } else {
        dispatch('COPY_START', { target, folders, files });
      }
    },


    FOLDER_RENAME_REQUEST_SUCCESS_before({ state, dispatch }, { resp, folder, path, allFolders }) {
      if (state.clipboard.folders[folder.path]) {
        dispatch('CLIPBOARD_FOLDERS_PATH_REPLACE', { folder, path });
      }

      if (state.clipboard.exclude[folder.path]) {
        dispatch('CLIPBOARD_EXCLUDE_PATH_REPLACE', { folder, path });
      }

      for (let item of allFolders) {
        let folder = item.folder;

        if (state.clipboard.folders[folder.path] && !resp.errors.folders[folder.path]) {
          dispatch('CLIPBOARD_FOLDERS_PATH_REPLACE', { folder, path: item.path });
        }

        if (state.clipboard.exclude[folder.path] && !resp.errors.folders[folder.path]) {
          dispatch('CLIPBOARD_EXCLUDE_PATH_REPLACE', { folder, path: item.path });
        }
      }
    },


    MOVE_REQUEST_SUCCESS_before({ state, getters, dispatch }, { resp, allFolders, allFiles }) {
      let deselect = {
        folders: [],
        files: [],
      };

      for (let item of allFolders) {
        let folder = item.folder;

        if (state.clipboard.folders[folder.path] && !resp.errors.folders[folder.path]) {
          deselect.folders.push(folder);
        }
      }

      for (let item of allFiles) {
        let file = item.file;

        if (state.clipboard.files[file.id] && !resp.errors.files[file.id]) {
          deselect.files.push(file);
        }
      }

      if (deselect.folders.length > 0 || deselect.files.length > 0) {
        dispatch('CLIPBOARD_DESELECT', { folders: deselect.folders, files: deselect.files });
      }
    },


    DELETE_FOLDERS_REQUEST_SUCCESS_before({ state, getters, dispatch }, { resp, folders }) {
      let deselect = [];

      for (let folder of folders) {
        if (state.clipboard.folders[folder.path] && !resp.errors[folder.path]) {
          deselect.push(folder);
        }
      }

      if (deselect.length > 0) {
        dispatch('CLIPBOARD_DESELECT', { folders: deselect, files: [] });
      }
    },


    DELETE_FILES_REQUEST_SUCCESS_before({ state, getters, dispatch }, { resp, files }) {
      let deselect = [];

      for (let file of files) {
        if (state.clipboard.files[file.id] && !resp.errors[file.id]) {
          deselect.push(file);
        }
      }

      if (deselect.length > 0) {
        dispatch('CLIPBOARD_DESELECT', { folders: [], files: deselect });
      }
    },

  },


  getters: {

    'all/count'({ getters }) {
      return getters['clipboard/folders/count'] + getters['clipboard/files/count'];
    },


    'folders/count'({ state }) {
      return Object.values(state.clipboard.folders).length;
    },


    'files/count'({ state }) {
      return Object.values(state.clipboard.files).length;
    },

  },

};
