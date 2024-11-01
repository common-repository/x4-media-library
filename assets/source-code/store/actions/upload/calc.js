import i18n from '~/utils/i18n';


export default {

  namespace: 'upload',


  actions: {

    UPLOAD_CALC_START({ state, storage, dispatch }) {
      let folders = [];
      let files = [];

      let readEntries = (entries, path, callback) => {
        if (entries.length === 0) {
          return callback();
        }

        let entry = entries.shift();

        readEntry(entry, path, () => {
          readEntries(entries, path, callback);
        });
      };

      let readEntry = (entry, path, callback) => {
        let subpath = path
          ? path + '/' + entry.name
          : entry.name;

        if (entry.isDirectory) {
          folders.push(subpath);

          readFolderEntries(entry, entries => {
            readEntries(entries, subpath, callback);
          });
        } else {
          entry.file(file => {
            file.x4path = subpath;
            files.push(file);
            callback();
          });
        }
      };

      let readFolderEntries = (entry, callback) => {
        let reader = entry.createReader();
        let entries = [];

        let iteration = () => {
          reader.readEntries(subentries => {
            if (subentries.length === 0) {
              return callback(entries);
            }

            entries = entries.concat(subentries);
            iteration();
          });
        };
        
        iteration();
      };

      if (storage.uploader.items && storage.uploader.items.length > 0) {
        let entries = [];

        for (let item of storage.uploader.items) {
          let entry = item.webkitGetAsEntry();
          entries.push(entry);
        }

        readEntries(entries, state.current.path, () => {
          dispatch('UPLOAD_CALC_FINISH', { folders, files });
        });

        return;
      }

      for (let file of storage.uploader.files) {
        if (file.type) {
          file.x4path = state.current.path
            ? state.current.path + '/' + file.name
            : file.name;

          files.push(file);
        }
      }

      dispatch('UPLOAD_CALC_FINISH', { folders, files });
    },

  },

};
