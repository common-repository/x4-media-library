import $ from 'jquery';
import i18n from '~/utils/i18n';
import { nonces, settings } from 'X4MediaLibrary';


export default async function request(action, options, resolve, reject) {
  let ajaxUrl = settings.adminUrl + 'admin-ajax.php';

  if (typeof options === 'function') {
    reject = resolve;
    resolve = options;
    options = {};
  }

  options = options || {};
  resolve = resolve || (() => {});
  reject = reject || (() => {});

  let ajaxData = Object.assign({}, options, {
    action: 'X4MediaLibrary/' + action,
    nonce: nonces[action],
  })

  $.post({ url: ajaxUrl, data: ajaxData, dataType: 'json' })
    .done(resp => {
      if (!resp) {
        let err = getError('02');
        return reject(err);
      }

      if (!resp.success) {
        let errCode = resp.data || '02';
        let err = getError(errCode);
        return reject(err);
      }

      resolve(resp.data);
    })
    .fail(xhr => {
      let err = getError('02');
      reject(err);
    });
}


function getError(errCode) {
  let digits2 = errCode.substr(0, 2);

  let err = {
    code: errCode,
    title: '',
    message: '',
  };

  switch (digits2) {
    case '00':
      err.title = i18n.__('Access Denied', 'x4-media-library');
      err.message = i18n.__('Sorry, you are not allowed to access this page.', 'x4-media-library');
      break;
    case '01':
      err.title = i18n.__('Bad Request', 'x4-media-library');
      err.message = i18n.__('Sorry, the server can\'t process the request due to an apparent client error.', 'x4-media-library') + ' (code:' + errCode + ')';
      break;
    case '02':
      err.title = i18n.__('Server Error', 'x4-media-library');
      err.message = i18n.__('Sorry, something went wrong, please try again later.', 'x4-media-library') + ' (code:' + errCode + ')';
      break;
  }

  switch (errCode) {
    case '0000':
      err.title = i18n.__('Session Expired', 'x4-media-library');
      err.message = i18n.__('Sorry, your login session has expired, please refresh this page and sign in again.', 'x4-media-library');
      break;
    case '0001':
      err.title = i18n.__('Tokens Expired', 'x4-media-library');
      err.message = i18n.__('Sorry, the security tokens for this page have expired, please refresh the page to update security tokens.', 'x4-media-library');
      break;
  }

  return err;
}
