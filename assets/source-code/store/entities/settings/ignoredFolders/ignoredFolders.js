export default {

  namespace: 'ignoredFolders',


  state: [],


  mutations: {

    IGNORED_FOLDERS_INIT({ state }, { ignoredFolders }) {
      state.ignoredFolders = ignoredFolders;
    },

    IGNORED_FOLDER_ADD_ITEM({ state }, { folder }) {
      state.ignoredFolders.push(folder);
    },

    IGNORED_FOLDER_REMOVE_ITEM({ state }, { folder }) {
      state.ignoredFolders.splice(state.ignoredFolders.indexOf(folder), 1);
    },

  },


  actions: {

    IGNORED_FOLDERS_INIT: true,
    IGNORED_FOLDER_ADD_ITEM: true,
    IGNORED_FOLDER_REMOVE_ITEM: true,


    BOOTSTRAP_FOLDERS_REQUEST_SUCCESS({ dispatch }, { resp }) {
      let ignoredFolders = resp.settings.ignoredFolders.map(item => ({
        path: item[0],
        reserved: item[1],
        ignore: item[2],
      }));

      dispatch('IGNORED_FOLDERS_INIT', { ignoredFolders });
    },


    IGNORED_FOLDER_CREATE_REQUEST_SUCCESS({ dispatch }, { path }) {
      let folder = {
        path,
        reserved: false,
        ignore: true,
      };

      dispatch('IGNORED_FOLDER_ADD_ITEM', { folder });
    },


    IGNORED_FOLDER_DELETE_REQUEST_SUCCESS({ dispatch }, { folder }) {
      dispatch('IGNORED_FOLDER_REMOVE_ITEM', { folder });
    },

  },


  getters: {

    reserved({ state }) {
      let reserved = state.ignoredFolders.filter(item => item.reserved);

      reserved.sort((a, b) => {
        if (a.path < b.path) return -1;
        if (a.path > b.path) return 1;
        return 0;
      });

      return reserved;
    },


    custom({ state }) {
      let custom = state.ignoredFolders.filter(item => !item.reserved);

      custom.sort((a, b) => {
        if (a.path < b.path) return -1;
        if (a.path > b.path) return 1;
        return 0;
      });

      return custom;
    },

  },

};
