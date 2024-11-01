import i18n from '~/utils/i18n';


export default {

  namespace: 'attachments',


  actions: {

    ATTACHMENT_FIELD_CHANGE_APPLY({ storage, dispatch }, { file, name, value }) {
      let attachment = storage.attachments[file.id];

      if (!attachment) {
        return;
      }

      let prevValue = attachment.get(name) || attachment.get('meta')[name];

      if (value !== prevValue) {
        dispatch('ATTACHMENT_FIELD_CHANGE_REQUEST', { attachment, name, value, prevValue });
      }
    },


    ATTACHMENT_FIELD_CHANGE_REQUEST({ dispatch }, { attachment, name, value, prevValue }) {
      attachment.set(name, value);

      attachment.sync('update', attachment)
        .done(() => {
          dispatch('ATTACHMENT_FIELD_CHANGE_REQUEST_SUCCESS', { attachment, name, value, prevValue });
        })
        .fail(err => {
          dispatch('ATTACHMENT_FIELD_CHANGE_REQUEST_ERROR', { err: err || {}, attachment, name, value, prevValue });
        });
    },


    ATTACHMENT_FIELD_CHANGE_REQUEST_ERROR_before(context, { err }) {
      err.code = '02';
      err.title = i18n.__('Server Error', 'x4-media-library');
      err.message = i18n.__('Sorry, something went wrong, please try again later.', 'x4-media-library');
    },


    ATTACHMENT_FIELD_CHANGE_REQUEST_ERROR: '~ATTACHMENT_FIELD_CHANGE_ROLLBACK',


    ATTACHMENT_FIELD_CHANGE_ROLLBACK(context, { attachment, name, prevValue }) {
      attachment.set(name, prevValue);
    },

  },

};
