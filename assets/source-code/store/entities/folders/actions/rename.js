import i18n from '~/utils/i18n';
import request from '~/plugin/request';


export default {

  namespace: 'folders',


  actions: {

    KEYDOWN({ state, getters, dispatch }, { event }) {
      if (!getters['explorer/focused']) {
        return;
      }

      if (event.key === 'F2' && getters['selected/folders/count'] === 1 && getters['selected/files/count'] === 0) {
        event.preventDefault();

        let folder = Object.values(state.selected.folders).shift();

        dispatch('RENAME_START', { block: 'explorer', entity: folder, type: 'folders' });
        return;
      }
    },


    FOLDER_RENAME({ getters, dispatch }, { folder, path }) {
      let allFolders = [];
      let allFiles = [];

      let children = getters['folders/children'][folder.path] || [];
      let subfiles = getters['files/perDir'][folder.path] || [];

      for (let subfile of subfiles) {
        allFiles.push({
          file: subfile,
          path: path + subfile.path.substr(folder.path.length),
        });
      }

      for (let child of children) {
        let subfiles = getters['files/perDir'][child.path] || [];

        allFolders.push({
          folder: child,
          path: path + child.path.substr(folder.path.length),
        });

        for (let subfile of subfiles) {
          allFiles.push({
            file: subfile,
            path: path + subfile.path.substr(folder.path.length),
          });
        }
      }

      let subfolders = getters['folders/perDir'][folder.dir] || [];
      let pathlc = path.toLowerCase();

      for (let subfolder of subfolders) {
        if (pathlc === subfolder.path.toLowerCase()) {
          dispatch('FOLDER_RENAME_EXISTS', { folder, path });
          return;
        }
      }

      dispatch('FOLDER_RENAME_REQUEST', { folder, path, allFolders, allFiles });
    },


    FOLDER_RENAME_REQUEST({ dispatch }, { folder, path, allFolders, allFiles }) {
      let dataFolders = [];
      let dataFiles = [];

      for (let item of allFolders) {
        dataFolders.push([item.folder.path, item.path]);
      }

      for (let item of allFiles) {
        dataFiles.push([item.file.id, item.path]);
      }

      request(
        'folders/rename',
        { path: folder.path, newPath: path, folders: dataFolders, files: dataFiles },
        resp => {
          let errFolders = {};
          let errFiles = {};

          for (let item of resp.errors.folders) {
            errFolders[item[0]] = item[1];
          }

          for (let item of resp.errors.files) {
            errFiles[item[0]] = item[1];
          }

          resp.errors.folders = errFolders;
          resp.errors.files = errFiles;

          dispatch('FOLDER_RENAME_REQUEST_SUCCESS', { resp, folder, path, allFolders, allFiles });
        },
        err => {
          dispatch('FOLDER_RENAME_REQUEST_ERROR', { err, folder, path, allFolders, allFiles });
        },
      );
    },


    FOLDER_RENAME_REQUEST_ERROR_before(context, { err, folder, base, allFolders, allFiles }) {
      err.title = i18n.__('Folder renaming', 'x4-media-library');

      switch (err.code) {
        case '':
          break;
      }
    },

  },

};
