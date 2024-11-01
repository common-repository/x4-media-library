import i18n from '~/utils/i18n';


export default {

  namespace: 'alert',


  state: {
    visible: false,
    type: '',
    title: '',
    message: '',
    html: {
      prefix: false,
      suffix: false,
    },
    buttons: {
      submit: {
        visible: false,
        url: null,
        icon: '',
        label: '',
      },
      close: {
        visible: false,
        icon: '',
        label: '',
      },
    },
    submit: () => {},
    close: () => {},
  },


  mutations: {

    ALERT_CHANGE({ state }, { alert }) {
      state.alert = alert;
    },

    ALERT_VISIBLE_CHANGE({ state }, { visible }) {
      state.alert.visible = visible;
    },

  },


  actions: {

    ALERT_CHANGE: true,
    ALERT_VISIBLE_CHANGE: true,


    ALERT_SHOW({ dispatch }, { alert }) {
      alert.visible = true;

      alert.type = alert.type || 'warning';

      alert.title = alert.title || '';
      alert.message = alert.message || '';

      alert.html = alert.html || {};
      alert.html.prefix = alert.html.prefix || '';
      alert.html.suffix = alert.html.suffix || '';

      alert.buttons = alert.buttons || {};

      alert.buttons.submit = alert.buttons.submit || {};
      alert.buttons.submit.visible = alert.buttons.submit.visible || true;
      alert.buttons.submit.url = alert.buttons.submit.url || null;
      alert.buttons.submit.icon = alert.buttons.submit.icon || 'check';
      alert.buttons.submit.label = alert.buttons.submit.label || i18n.__('OK', 'x4-media-library');

      alert.buttons.close = alert.buttons.close || {};
      alert.buttons.submit.visible = alert.buttons.submit.visible || false;
      alert.buttons.close.icon = alert.buttons.close.icon || 'close';
      alert.buttons.close.label = alert.buttons.close.label || i18n.__('Cancel', 'x4-media-library');

      alert.submit = alert.submit || alert.close || (() => {});
      alert.close = alert.close || (() => {});

      dispatch('ALERT_CHANGE', { alert });
    },


    ALERT_SUBMIT({ state, dispatch }) {
      dispatch('ALERT_VISIBLE_CHANGE', { visible: false });
      state.alert.submit();
    },


    ALERT_CLOSE({ state, dispatch }) {
      dispatch('ALERT_VISIBLE_CHANGE', { visible: false });
      state.alert.close();
    },


    KEYDOWN({ state, dispatch }, { event }) {
      if (!state.alert.visible) {
        return;
      }

      switch (event.key) {
        case 'Tab':
          event.preventDefault();
          break;
        case 'Enter':
          event.preventDefault();
          dispatch('ALERT_SUBMIT');
          break;
        case 'Escape':
          event.preventDefault();
          dispatch('ALERT_CLOSE');
          break;
      }
    },


    ALERT_SHOW_PAID({ dispatch }) {
      let alert = {
        paid: true,
        type: 'error',
        title: i18n.__('FREE TRIAL', 'x4-media-library'),
        message: i18n.__('Sorry, this is a paid feature and is only available in the PREMIUM version of X4 Media Library!', 'x4-media-library'),
        buttons: {
          submit: {
            url: 'https://codecanyon.net/item/x4-media-library-for-wordpress/24017686',
            icon: 'attach_money',
            label: 'Purchase',
          },
          close: {
            visible: true,
            label: 'Continue',
          },
        },
      };

      dispatch('ALERT_SHOW', { alert });
    },


    SELECT_FRAME_CHANGE_PAID: 'ALERT_SHOW_PAID',

    LEFT_COLUMN_MANUALLY_CHANGE_PAID: 'ALERT_SHOW_PAID',
    RIGHT_COLUMN_MANUALLY_CHANGE_PAID: 'ALERT_SHOW_PAID',

    LEFT_RESIZER_DRAG_START_PAID: 'ALERT_SHOW_PAID',
    RIGHT_RESIZER_DRAG_START_PAID: 'ALERT_SHOW_PAID',

    VIEW_CHANGE_PAID: 'ALERT_SHOW_PAID',

    SORTBY_TYPE_CHANGE_PAID: 'ALERT_SHOW_PAID',
    SORTBY_FIELD_CHANGE_PAID: 'ALERT_SHOW_PAID',

    FILTERS_YEAR_CHANGE_PAID: 'ALERT_SHOW_PAID',
    FILTERS_MONTH_CHANGE_PAID: 'ALERT_SHOW_PAID',
    FILTERS_DAY_CHANGE_PAID: 'ALERT_SHOW_PAID',
    FILTERS_MIME_CHANGE_PAID: 'ALERT_SHOW_PAID',
    FILTERS_EXT_CHANGE_PAID: 'ALERT_SHOW_PAID',

    SEARCH_TEXT_CHANGE_PAID: 'ALERT_SHOW_PAID',
    SEARCH_CURRENT_CHANGE_PAID: 'ALERT_SHOW_PAID',
    SEARCH_DEEP_CHANGE_PAID: 'ALERT_SHOW_PAID',

    CLIPBOARD_START_PAID: 'ALERT_SHOW_PAID',

    FOLDER_ICON_CHANGE_REQUEST_PAID: 'ALERT_SHOW_PAID',
    FOLDER_COLOR_CHANGE_REQUEST_PAID: 'ALERT_SHOW_PAID',

    FILE_RENAME_REQUEST_PAID: 'ALERT_SHOW_PAID',

    IGNORED_FOLDER_IGNORE_CHANGE_REQUEST_PAID: 'ALERT_SHOW_PAID',
    IGNORED_FOLDER_CREATE_REQUEST_PAID: 'ALERT_SHOW_PAID',
    IGNORED_FOLDER_DELETE_REQUEST_PAID: 'ALERT_SHOW_PAID',

    FILE_EXTENSION_ALLOWED_CHANGE_REQUEST_PAID: 'ALERT_SHOW_PAID',
    FILE_EXTENSION_CREATE_REQUEST_PAID: 'ALERT_SHOW_PAID',
    FILE_EXTENSION_DELETE_REQUEST_PAID: 'ALERT_SHOW_PAID',


    ALERT_SHOW_ERROR({ dispatch }, { err }) {
      let alert = {
        type: 'error',
        title: err.title,
        message: err.message,
      };

      dispatch('ALERT_SHOW', { alert });
    },


    BOOTSTRAP_FOLDERS_REQUEST_ERROR: '~ALERT_SHOW_ERROR',
    BOOTSTRAP_FILES_REQUEST_ERROR: '~ALERT_SHOW_ERROR',

    ACTION_CLICK_REQUEST_ERROR: '~ALERT_SHOW_ERROR',

    ATTACHMENT_FIELD_CHANGE_REQUEST_ERROR: '~ALERT_SHOW_ERROR',
    ATTACHMENT_EDIT_REQUEST_ERROR: '~ALERT_SHOW_ERROR',

    FOLDER_CREATE_REQUEST_ERROR: '~ALERT_SHOW_ERROR',

    FOLDER_RENAME_REQUEST_ERROR: '~ALERT_SHOW_ERROR',

    FOLDER_COLOR_CHANGE_REQUEST_ERROR: '~ALERT_SHOW_ERROR',
    FOLDER_ICON_CHANGE_REQUEST_ERROR: '~ALERT_SHOW_ERROR',

    FILE_RENAME_REQUEST_ERROR: '~ALERT_SHOW_ERROR',

    IGNORED_FOLDER_IGNORE_CHANGE_REQUEST_ERROR: '~ALERT_SHOW_ERROR',
    IGNORED_FOLDER_CREATE_REQUEST_ERROR: '~ALERT_SHOW_ERROR',
    IGNORED_FOLDER_DELETE_REQUEST_ERROR: '~ALERT_SHOW_ERROR',

    FILE_EXTENSION_ALLOWED_CHANGE_REQUEST_ERROR: '~ALERT_SHOW_ERROR',
    FILE_EXTENSION_CREATE_REQUEST_ERROR: '~ALERT_SHOW_ERROR',
    FILE_EXTENSION_DELETE_REQUEST_ERROR: '~ALERT_SHOW_ERROR',

    COPY_REQUEST_ERROR: '~ALERT_SHOW_ERROR',

    MOVE_REQUEST_ERROR: '~ALERT_SHOW_ERROR',


    FOLDER_CREATE_EXISTS({ dispatch }, { path }) {
      let subs = path.split('/');
      let base = subs[subs.length - 1];

      let alert = {
        title: i18n.__('Folder creating', 'x4-media-library'),
        message: i18n.__('The destination folder already contains a folder named "%1$s".', 'x4-media-library')
          .replace('%1$s', base),
        close: () => {
          dispatch('RENAME_CONTINUE');
        },
      };

      dispatch('ALERT_SHOW', { alert });
    },


    FOLDER_RENAME_EXISTS({ dispatch }, { folder, path }) {
      let subs = path.split('/');
      let base = subs[subs.length - 1];

      let alert = {
        title: i18n.__('Folder renaming', 'x4-media-library'),
        message: i18n.__('The destination folder already contains a folder named "%1$s".', 'x4-media-library')
          .replace('%1$s', base),
        close: () => {
          dispatch('RENAME_CONTINUE');
        },
      };

      dispatch('ALERT_SHOW', { alert });
    },


    FILE_RENAME_EXISTS({ dispatch }, { file, path }) {
      let subs = path.split('/');
      let base = subs[subs.length - 1];

      let alert = {
        title: i18n.__('File renaming', 'x4-media-library'),
        message: i18n.__('The destination folder already contains a file named "%1$s".', 'x4-media-library')
          .replace('%1$s', base),
        close: () => {
          dispatch('RENAME_CONTINUE');
        },
      };

      dispatch('ALERT_SHOW', { alert });
    },


    IGNORED_FOLDER_CREATE_EXISTS({ dispatch }, { path }) {
      let alert = {
        title: i18n.__('Ignored folder creating', 'x4-media-library'),
        message: i18n.__('The "%1$s" ignored folder already exists.', 'x4-media-library')
          .replace('%1$s', path),
      };

      dispatch('ALERT_SHOW', { alert });
    },


    IGNORED_FOLDER_DELETE_CONFIRM({ dispatch }, { folder }) {
      let alert = {
        title: i18n.__('Ignored folder deleting', 'x4-media-library'),
        message: i18n.__('Are you sure you want to delete the "%1$s" ignored folder?', 'x4-media-library')
          .replace('%1$s', folder.path),
        buttons: {
          submit: {
            label: i18n.__('Delete', 'x4-media-library'),
          },
          close: {
            visible: true,
          },
        },
        submit: () => {
          dispatch('IGNORED_FOLDER_DELETE_REQUEST', { folder });
        },
      };

      dispatch('ALERT_SHOW', { alert });
    },


    FILE_EXTENSION_CREATE_EXISTS({ dispatch }, { ext, mimeType }) {
      let alert = {
        title: i18n.__('File extension creating', 'x4-media-library'),
        message: i18n.__('The "%1$s" file extension already exists.', 'x4-media-library')
          .replace('%1$s', ext),
      };

      dispatch('ALERT_SHOW', { alert });
    },


    FILE_EXTENSION_DELETE_CONFIRM({ dispatch }, { fileExtension }) {
      let alert = {
        title: i18n.__('File extension deleting', 'x4-media-library'),
        message: i18n.__('Are you sure you want to delete the "%1$s" file extension?', 'x4-media-library')
          .replace('%1$s', fileExtension.ext),
        buttons: {
          submit: {
            label: i18n.__('Delete', 'x4-media-library'),
          },
          close: {
            visible: true,
          },
        },
        submit: () => {
          dispatch('FILE_EXTENSION_DELETE_REQUEST', { fileExtension });
        },
      };

      dispatch('ALERT_SHOW', { alert });
    },


    COPY_EXISTS({ dispatch }, { folders, files, match, type }) {
      let alert = {
        title: folders.length === 0
          ? files.length === 1
            ? i18n.__('File copying', 'x4-media-library')
            : i18n.__('Files copying', 'x4-media-library')
          : files.length === 0
            ? folders.length === 1
              ? i18n.__('Folder copying', 'x4-media-library')
              : i18n.__('Folders copying', 'x4-media-library')
            : i18n.__('Copying', 'x4-media-library'),
        message: type === 'folders'
          ? i18n.__('The destination folder already contains a folder named "%1$s".', 'x4-media-library')
              .replace('%1$s', match.base)
          : i18n.__('The destination folder already contains a file named "%1$s".', 'x4-media-library')
              .replace('%1$s', match.base),
      };

      dispatch('ALERT_SHOW', { alert });
    },


    COPY_SAME_BASE({ dispatch }, { folders, files, match, type }) {
      let alert = {
        title: folders.length === 0
          ? files.length === 1
            ? i18n.__('File copying', 'x4-media-library')
            : i18n.__('Files copying', 'x4-media-library')
          : files.length === 0
            ? folders.length === 1
              ? i18n.__('Folder copying', 'x4-media-library')
              : i18n.__('Folders copying', 'x4-media-library')
            : i18n.__('Copying', 'x4-media-library'),
        message: type === 'folders'
          ? i18n.__('You are trying to copy two folders with the same name "%1$s" to the destination folder.', 'x4-media-library')
              .replace('%1$s', match.base)
          : i18n.__('You are trying to copy two files with the same name "%1$s" to the destination folder.', 'x4-media-library')
              .replace('%1$s', match.base),
      };

      dispatch('ALERT_SHOW', { alert });
    },


    MOVE_EXISTS({ dispatch }, { folders, files, match, type }) {
      let alert = {
        title: folders.length === 0
          ? files.length === 1
            ? i18n.__('File moving', 'x4-media-library')
            : i18n.__('Files moving', 'x4-media-library')
          : files.length === 0
            ? folders.length === 1
              ? i18n.__('Folder moving', 'x4-media-library')
              : i18n.__('Folders moving', 'x4-media-library')
            : i18n.__('Moving', 'x4-media-library'),
        message: type === 'folders'
          ? i18n.__('The destination folder already contains a folder named "%1$s".', 'x4-media-library')
              .replace('%1$s', match.base)
          : i18n.__('The destination folder already contains a file named "%1$s".', 'x4-media-library')
              .replace('%1$s', match.base),
      };

      dispatch('ALERT_SHOW', { alert });
    },


    MOVE_SAME_BASE({ dispatch }, { folders, files, match, type }) {
      let alert = {
        title: folders.length === 0
          ? files.length === 1
            ? i18n.__('File moving', 'x4-media-library')
            : i18n.__('Files moving', 'x4-media-library')
          : files.length === 0
            ? folders.length === 1
              ? i18n.__('Folder moving', 'x4-media-library')
              : i18n.__('Folders moving', 'x4-media-library')
            : i18n.__('Moving', 'x4-media-library'),
        message: type === 'folders'
          ? i18n.__('You are trying to move two folders with the same name "%1$s" to the destination folder.', 'x4-media-library')
              .replace('%1$s', match.base)
          : i18n.__('You are trying to move two files with the same name "%1$s" to the destination folder.', 'x4-media-library')
              .replace('%1$s', match.base),
      };

      dispatch('ALERT_SHOW', { alert });
    },


    DELETE_CONFIRM({ storage, dispatch }) {
      let allFolders = storage.delete.allFolders;
      let allFiles = storage.delete.allFiles;
      let folders = storage.delete.folders;
      let files = storage.delete.files;

      let alert = {
        title: folders.length === 0
          ? files.length === 1
            ? i18n.__('File deleting', 'x4-media-library')
            : i18n.__('Files deleting', 'x4-media-library')
          : files.length === 0
            ? folders.length === 1
              ? i18n.__('Folder deleting', 'x4-media-library')
              : i18n.__('Folders deleting', 'x4-media-library')
            : i18n.__('Deleting', 'x4-media-library'),
        message: folders.length === 0
          ? files.length === 1
            ? i18n.__('Are you sure you want to delete the "%1$s" file?', 'x4-media-library')
                .replace('%1$s', files[0].base)
            : i18n.__('Are you sure you want to delete %1$d files?', 'x4-media-library')
                .replace('%1$d', files.length)
          : files.length === 0
            ? folders.length === 1
              ? i18n.__('Are you sure you want to delete the "%1$s" folder (including %2$d subfolders and %3$d subfiles)?', 'x4-media-library')
                  .replace('%1$s', folders[0].base)
                  .replace('%2$d', allFolders.length - 1)
                  .replace('%3$d', allFiles.length)
              : i18n.__('Are you sure you want to delete %1$d folders (including %2$d subfolders and %3$d subfiles)?', 'x4-media-library')
                  .replace('%1$d', folders.length)
                  .replace('%2$d', allFolders.length - folders.length)
                  .replace('%3$d', allFiles.length)
            : i18n.__('Are you sure you want to delete %1$d folders and %2$d files (including %3$d subfolders and %4$d subfiles)?', 'x4-media-library')
                .replace('%1$d', folders.length)
                .replace('%2$d', files.length)
                .replace('%3$d', allFolders.length - folders.length)
                .replace('%4$d', allFiles.length - files.length),
        buttons: {
          submit: {
            label: i18n.__('Delete', 'x4-media-library'),
          },
          close: {
            visible: true,
          },
        },
        submit: () => {
          dispatch('DELETE_START');
        },
      };

      dispatch('ALERT_SHOW', { alert });
    },

  },

};
