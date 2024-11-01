import request from '~/plugin/request';


export default {

  namespace: 'folders',


  actions: {

    FOLDER_ICON_CHANGE_APPLY({ dispatch }, { folder, icon }) {
      if (icon === folder.icon) {
        return;
      }

      dispatch('FOLDER_ICON_CHANGE_REQUEST', { folder, icon, prev: folder.icon });
      dispatch('FOLDER_ICON_CHANGE', { folder, icon });
    },


    FOLDER_ICON_CHANGE_REQUEST({ dispatch }, { folder, icon, prev }) {
      setTimeout(() => {
        dispatch('FOLDER_ICON_CHANGE_REQUEST_PAID', { folder, icon, prev });
      }, 2000);

    },


    FOLDER_ICON_CHANGE_ROLLBACK({ dispatch }, { folder, prev }) {
      dispatch('FOLDER_ICON_CHANGE', { folder, icon: prev });
    },


    FOLDER_ICON_CHANGE_REQUEST_ERROR: '~FOLDER_ICON_CHANGE_ROLLBACK',


    FOLDER_ICON_CHANGE_REQUEST_PAID({ dispatch }, { folder }) {
      dispatch('FOLDER_ICON_CHANGE', { folder, icon: '' });
    },

  },

};
