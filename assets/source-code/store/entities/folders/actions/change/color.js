import request from '~/plugin/request';


export default {

  namespace: 'folders',


  actions: {

    FOLDER_COLOR_CHANGE_APPLY({ dispatch }, { folder, color }) {
      if (color === folder.color) {
        return;
      }

      dispatch('FOLDER_COLOR_CHANGE_REQUEST', { folder, color, prev: folder.color });
      dispatch('FOLDER_COLOR_CHANGE', { folder, color });
    },


    FOLDER_COLOR_CHANGE_REQUEST({ dispatch }, { folder, color, prev }) {
      setTimeout(() => {
        dispatch('FOLDER_COLOR_CHANGE_REQUEST_PAID', { folder, color, prev });
      }, 2000);

    },


    FOLDER_COLOR_CHANGE_ROLLBACK({ dispatch }, { folder, prev }) {
      dispatch('FOLDER_COLOR_CHANGE', { folder, color: prev });
    },


    FOLDER_COLOR_CHANGE_REQUEST_ERROR: '~FOLDER_COLOR_CHANGE_ROLLBACK',


    FOLDER_COLOR_CHANGE_REQUEST_PAID({ storage, dispatch }, { folder }) {
      dispatch('FOLDER_COLOR_CHANGE', { folder, color: storage.constants.folderDefColor });
    },

  },

};
