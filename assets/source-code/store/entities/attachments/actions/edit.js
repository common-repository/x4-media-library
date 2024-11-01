import i18n from '~/utils/i18n';
import wp from 'wp';


export default {

  namespace: 'attachments',


  actions: {

    KEYDOWN({ state, getters, dispatch }, { event }) {
      if (!getters['explorer/focused']) {
        return;
      }

      if (event.key === 'Enter' && getters['selected/files/count'] === 1 && getters['selected/folders/count'] === 0) {
        let file = Object.values(state.selected.files).shift();
        dispatch('ATTACHMENT_EDIT', { file });
        return;
      }
    },

    ATTACHMENT_EDIT({ storage, dispatch, $frame }, { file }) {
      if (file.mime !== 'image') {
        return;
      }

      if (!storage.attachments[file.id]) {
        dispatch('ATTACHMENT_EDIT_REQUEST', { file });
        return;
      }
      
      dispatch('ATTACHMENT_EDIT_OPEN', { file });
    },


    ATTACHMENT_EDIT_REQUEST({ dispatch }, { file }) {
      let id = file.id;

      let attachments = wp.media.query({
        post__in: [id],
        orderby: 'post__in',
        perPage: -1,
      });

      attachments.more()
        .done(() => {
          if (attachments.models.length === 0) {
            dispatch('ATTACHMENT_EDIT_REQUEST_ERROR', { err: {}, id, file });
            return;
          }

          dispatch('ATTACHMENT_EDIT_REQUEST_SUCCESS', { id, file, attachment: attachments.models[0] });
        })
        .fail(err => {
          dispatch('ATTACHMENT_EDIT_REQUEST_ERROR', { err: err || {}, id, file });
        });
    },


    ATTACHMENT_EDIT_REQUEST_SUCCESS: '~ATTACHMENT_EDIT_OPEN',


    ATTACHMENT_EDIT_REQUEST_ERROR_before(context, { err }) {
      err.code = '02';
      err.title = i18n.__('Server Error', 'x4-media-library');
      err.message = i18n.__('Sorry, something went wrong, please try again later.', 'x4-media-library');
    },


    ATTACHMENT_EDIT_OPEN({ storage, $frame }, { file }) {
      let attachment = storage.attachments[file.id];

      if ($frame.modal) {
        let editState = $frame.states.get('edit-image');
        editState.set('image', attachment);

        $frame.setState('edit-image');

        if (!($frame.content.get('view') instanceof wp.media.view.EditImage)) {
          let editView = new wp.media.view.EditImage({
            frame: $frame,
            controller: $frame,
            model: attachment,
          }).render();

          $frame.content.set(editView);
          editView.loadEditor();
        }
      } else {
        if (!wp.media.frames.edit) {
          wp.media.frames.edit = wp.media({
            frame: 'edit-attachments',
            library: $frame.state().get('library'),
            controller: $frame,
            model: attachment,
          });
        } else {
          wp.media.frames.edit.trigger('refresh', attachment);
          wp.media.frames.edit.open();
        }

        wp.media.frames.edit.on('content:deactivate:edit-image', () => {
          wp.media.frames.edit.close();
        });

        wp.media.frames.edit.content.mode('edit-image');
      }
    },

  },

};
