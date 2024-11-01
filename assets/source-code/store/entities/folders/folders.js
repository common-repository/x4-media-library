import Vue from 'vue';


export default {

  namespace: 'folders',


  state: {},


  mutations: {

    FOLDERS_INIT({ state }, { folders }) {
      state.folders = folders;
    },

    FOLDERS_PATH_REPLACE({ state }, { folder, path }) {
      Vue.delete(state.folders, folder.path);
      Vue.set(state.folders, path, folder);
    },

    FOLDERS_ITEM_ADD({ state }, { folder }) {
      Vue.set(state.folders, folder.path, folder);
    },

    FOLDERS_ITEM_REMOVE({ state }, { folder }) {
      Vue.delete(state.folders, folder.path);
    },

  },


  actions: {

    FOLDERS_INIT: true,
    FOLDERS_PATH_REPLACE: true,
    FOLDERS_ITEM_ADD: true,
    FOLDERS_ITEM_REMOVE: true,

    FOLDERS_INIT_APPLY_before: '~FOLDERS_PROPS_INIT',
    FOLDERS_ITEM_ADD_before: '~FOLDERS_PROPS_INIT',
    FOLDER_PATH_CHANGE: '~FOLDERS_PATH_REPLACE',


    FOLDERS_INIT_APPLY({ dispatch }, { folders }) {
      let result = {};

      for (let folder of folders) {
        result[folder.path] = folder;
      }

      dispatch('FOLDERS_INIT', { folders: result });
    },


    FOLDER_CREATE_REQUEST_SUCCESS({ dispatch }, { path }) {
      let newFolder = {
        path,
        icon: '',
        color: '',
      };

      dispatch('FOLDERS_ITEM_ADD', { folder: newFolder });
    },


    UPLOAD_FOLDERS_REQUEST_SUCCESS({ dispatch }, { resp, paths }) {
      for (let path of paths) {
        if (!resp.errors[path]) {
          let newFolder = {
            path,
            icon: '',
            color: '',
          };

          dispatch('FOLDERS_ITEM_ADD', { folder: newFolder });
        }
      }
    },


    COPY_REQUEST_SUCCESS({ getters, dispatch }, { resp, allFolders }) {
      for (let item of allFolders) {
        let folder = item.folder;

        if (!resp.errors.folders[folder.path]) {
          let newFolder = {
            path: item.path,
            icon: folder.icon,
            color: folder.color,
          };

          dispatch('FOLDERS_ITEM_ADD', { folder: newFolder });
        }
      }
    },


    DELETE_FOLDERS_REQUEST_SUCCESS({ dispatch }, { resp, folders }) {
      for (let folder of folders) {
        if (!resp.errors[folder.path]) {
          dispatch('FOLDERS_ITEM_REMOVE', { folder });
        }
      }
    },

  },

};
