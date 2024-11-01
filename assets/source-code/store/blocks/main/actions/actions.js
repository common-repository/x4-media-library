import i18n from '~/utils/i18n';
import wp from 'wp';


export default {

  namespace: 'actions',


  state: [],


  mutations: {

    ACTIONS_CHANGE({ state }, { actions }) {
      state.actions = actions;
    },

  },


  actions: {

    ACTIONS_CHANGE: true,

    APP_ENABLE: 'ACTIONS_REFRESH',


    ACTION_CLICK({ state, dispatch, $frame }, { action }) {
      if (!action.required) {
        action.click();
        return;
      }

      let ids = state.selection.items.map(file => file.id);
      dispatch('ACTION_CLICK_REQUEST', { ids, action });
    },


    ACTION_CLICK_REQUEST({ dispatch }, { ids, action }) {
      let attachments = wp.media.query({
        post__in: ids,
        orderby: 'post__in',
        perPage: -1,
      });

      attachments.more()
        .done(() => {
          dispatch('ACTION_CLICK_REQUEST_SUCCESS', { ids, action, attachments: attachments.models });
        })
        .fail(err => {
          dispatch('ACTION_CLICK_REQUEST_ERROR', { err: err || {}, ids, action });
        });
    },


    ACTION_CLICK_REQUEST_SUCCESS({ dispatch, $frame }, { attachments, action }) {
      let $selection = $frame.state().get('selection');

      $selection.reset();
      $selection.add(attachments);

      action.click();
    },


    ACTION_CLICK_REQUEST_ERROR_before(context, { err }) {
      err.code = '02';
      err.title = i18n.__('Server Error', 'x4-media-library');
      err.message = i18n.__('Sorry, something went wrong, please try again later.', 'x4-media-library');
    },


    ACTIONS_REFRESH({ state, dispatch, $frame }) {
      if (!$frame.modal) {
        return;
      }

      let $toolbar = $frame.toolbar.get();

      if (!$toolbar || !$toolbar.primary) {
        return;
      }

      let actions = $toolbar.primary.views.get().map(action => {
        let name = action.model.get('text') || $toolbar.options.text;
        let click = action.options.click || action.click;

        name = name.replace(' a new ', ' ');
        name = name.replace('video playlist', 'playlist');

        return {
          cid: action.cid,
          name,
          required: action.options.requires && action.options.requires.selection,
          priority: action.options.priority,
          click: click.bind(action),
        };
      });

      actions.sort((a, b) => {
        if (a.priority > b.priority) return -1;
        if (a.priority < b.priority) return 1;
        return 0;
      });

      if (actions.length === 0 && state.actions.length === 0) {
        return;
      }

      dispatch('ACTIONS_CHANGE', { actions });
    },

  },

};
