export default {

  namespace: 'current',


  state: null,


  mutations: {

    CURRENT_CHANGE({ state }, { current }) {
      state.current = current;
    },

  },


  actions: {

    CURRENT_CHANGE: true,

    APP_ENABLE: 'CURRENT_SELECTION_REFRESH',
    SELECTION_ITEMS_INIT_after: 'CURRENT_SELECTION_REFRESH',
    CURRENT_UP: '~CURRENT_CHANGE',


    BOOTSTRAP_FOLDERS_FINISH({ state, dispatch }) {
      dispatch('CURRENT_CHANGE', { current: state.folders[''] });
    },


    CURRENT_CHANGE_APPLY({ state, dispatch }, { folder }) {
      if (state.search.text !== '' || folder !== state.current) {
        dispatch('CURRENT_CHANGE', { current: folder });
      }
    },


    CURRENT_UP_APPLY({ state, dispatch }) {
      let current = state.search.text === ''
        ? state.current.dir !== null
          ? state.folders[state.current.dir]
          : null
        : state.current;

      let prev = state.search.text === ''
        ? state.current
        : null;

      if (current) {
        dispatch('CURRENT_UP', { prev, current });
      }
    },


    KEYDOWN({ state, getters, dispatch }, { event }) {
      if (!getters['explorer/focused']) {
        return;
      }

      if (event.key === 'Enter' && getters['selected/folders/count'] === 1 && getters['selected/files/count'] === 0) {
        let current = Object.values(state.selected.folders).shift();
        dispatch('CURRENT_CHANGE', { current });
        return;
      }

      if (event.key === 'Backspace' && (state.search.text !== '' || state.current.dir !== null)) {
        dispatch('CURRENT_UP_APPLY');
        return;
      }
    },


    CURRENT_SELECTION_REFRESH({ state, dispatch }) {
      if (state.selection.items.length === 0) {
        return;
      }

      let firstFile = state.selection.items[0];
      let folder = state.folders[firstFile.dir];

      if (folder === state.current) {
        return;
      }

      dispatch('CURRENT_CHANGE', { current: folder });
    },


    UPLOADER_BUTTON_CHANGE_before({ state, storage, dispatch }) {
      if (state.current !== storage.uploader.target) {
        dispatch('CURRENT_CHANGE', { current: storage.uploader.target });
      }
    },


    DELETE_FOLDERS_REQUEST_SUCCESS_before({ state, dispatch }, { resp, folders }) {
      if (folders.indexOf(state.current) !== -1 && !resp.errors[state.current.path]) {
        dispatch('CURRENT_CHANGE', { current: state.folders[''] });
      }
    },

  },

};
