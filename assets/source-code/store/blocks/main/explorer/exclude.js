import equal from '~/utils/equal';


export default {

  namespace: 'exclude',


  state: {},


  mutations: {

    EXCLUDE_CHANGE({ state }, { exclude }) {
      state.exclude = exclude;
    },

  },


  actions: {

    EXCLUDE_CHANGE: true,


    APP_ENABLE: 'EXCLUDE_REFRESH',
    BOOTSTRAP_FILES_FINISH: 'EXCLUDE_REFRESH',


    EXCLUDE_REFRESH({ state, dispatch, $frame }) {
      let exclude = {};

      if (!$frame.modal) {
        return;
      }

      let editLibrary = $frame.state().editLibrary;

      if (editLibrary) {
        let ids = editLibrary.models.map(model => model.get('id'));
        
        for (let id of ids) {
          if (state.files[id]) {
            exclude[id] = state.files[id];
          }
        }
      };

      if (equal.objects(exclude, state.exclude, 'id')) {
        return;
      }

      dispatch('EXCLUDE_CHANGE', { exclude });
    },

  },

};
