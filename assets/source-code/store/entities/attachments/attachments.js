import { store } from '~/plugin/bootstrap/activate';
import i18n from '~/utils/i18n';
import wp from 'wp';


let initializeAttachment = wp.media.model.Attachment.prototype.initialize;


wp.media.model.Attachment.prototype.initialize = function() {
  initializeAttachment.apply(this, arguments);

  this.on('change', () => {
    if (this.get('id')) {
      store.dispatch('ATTACHMENT_CHANGE', { id: this.get('id'), attachment: this });
    }
  });
};


export default {

  namespace: 'attachments',


  state: {},


  storage: {},


  mutations: {

    ATTACHMENTS_INIT({ state }, { attachments }) {
      state.attachments = attachments;
    },

    ATTACHMENT_CHANGE({ state, storage }, { id, attachment }) {
      storage.attachments[id] = attachment;
      state.attachments[id] = Math.random();
    },

  },


  actions: {

    ATTACHMENTS_INIT: true,
    ATTACHMENT_CHANGE: true,


    FILES_INIT_after({ state, dispatch }) {
      let attachments = {};

      for (let file of Object.values(state.files)) {
        attachments[file.id] = false;
      }

      dispatch('ATTACHMENTS_INIT', { attachments });
    },


    ATTACHMENT_ENSURE({ storage, dispatch }, { file }) {
      if (!storage.attachments[file.id]) {
        dispatch('ATTACHMENT_ENSURE_REQUEST', { file });
      }
    },


    ATTACHMENT_ENSURE_REQUEST({ dispatch }, { file }) {
      let id = file.id;

      let attachments = wp.media.query({
        post__in: [id],
        orderby: 'post__in',
        perPage: -1,
      });

      attachments.more()
        .done(() => {
          if (attachments.models.length === 0) {
            dispatch('ATTACHMENT_ENSURE_REQUEST_ERROR', { err: {}, id, file });
            return;
          }

          dispatch('ATTACHMENT_ENSURE_REQUEST_SUCCESS', { id, file, attachment: attachments.models[0] })
        })
        .fail(err => {
          dispatch('ATTACHMENT_ENSURE_REQUEST_ERROR', { err: err || {}, id, file });
        });
    },


    ATTACHMENT_ENSURE_REQUEST_ERROR_before(context, { err }) {
      err.code = '02';
      err.title = i18n.__('Server Error', 'x4-media-library');
      err.message = i18n.__('Sorry, something went wrong, please try again later.', 'x4-media-library');
    },

  },

};
