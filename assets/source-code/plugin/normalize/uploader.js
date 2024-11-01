import { store } from '~/plugin/bootstrap/activate';
import i18n from '~/utils/i18n';
import wp from 'wp';


let initialize = wp.media.view.UploaderWindow.prototype.initialize;


wp.media.view.UploaderWindow.prototype.initialize = function() {
  initialize.apply(this, arguments);

  let container = document.createElement('div');
  container.className = 'x4-moxie-shim';
  document.body.appendChild(container);

  let dropzone = document.createElement('div');
  dropzone.className = 'x4-moxie-shim';
  document.body.appendChild(dropzone);

  let browser = document.createElement('div');
  browser.className = 'x4-moxie-shim';
  document.body.appendChild(browser);
  
  this.options.uploader.container = container;
  this.options.uploader.dropzone = dropzone;
  this.options.uploader.browser = browser;
};


export default function(frame) {
  let uploader = frame.uploader.uploader.uploader;
  let wpUploader = frame.uploader.uploader;

  wpUploader.success = attachment => {
    store.dispatch('UPLOAD_FILE_SUCCESS', { attachment });
  };

  wpUploader.error = (errMessage, plError, plFile) => {
    store.dispatch('UPLOAD_FILE_ERROR', { err: {}, errMessage, plFile });
  };

  wpUploader.progress = attachment => {
    store.dispatch('UPLOAD_FILE_PROGRESS', { completed: attachment.get('percent') });
  };
}
