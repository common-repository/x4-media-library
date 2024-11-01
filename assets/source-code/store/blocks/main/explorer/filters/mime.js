export default {

  namespace: 'filters/mime',


  state: null,


  mutations: {

    FILTERS_MIME_CHANGE({ state }, { mime }) {
      state.filters.mime = mime;
    },

  },


  actions: {

    FILTERS_MIME_CHANGE: true,


    FILTERS_MIME_RESET({ state, dispatch }) {
      if (state.filters.mime !== null) {
        dispatch('FILTERS_MIME_CHANGE', { mime: null });
      }
    },


    FILTERS_RESET: 'FILTERS_MIME_RESET',
    FILTERS_MIME_CHANGE_PAID: 'FILTERS_MIME_RESET',


    FILTERS_MIME_REFRESH({ state, dispatch, $frame }) {
      if (!$frame.modal) {
        return;
      }

      let mime = null;
      let post_mime_type = $frame.state().get('library').mirroring.args.post_mime_type;

      if (post_mime_type) {
        mime = Array.isArray(post_mime_type)
          ?  post_mime_type.length > 0
            ? post_mime_type[0]
            : null
          : post_mime_type;
      }

      if (mime === state.filters.mime) {
        return;
      }

      dispatch('FILTERS_MIME_CHANGE', { mime });
    },


    APP_ENABLE: 'FILTERS_MIME_REFRESH',


    FILTERS_MIME_CHANGE_APPLY({ state, dispatch }, { mime }) {
      if (mime === state.filters.mime) {
        return;
      }

      setTimeout(() => {
        dispatch('FILTERS_MIME_CHANGE_PAID');
      }, 2000);

      dispatch('FILTERS_MIME_CHANGE', { mime });
    },

  },

};
