import i18n from '~/utils/i18n';
import request from '~/plugin/request';


export default {

  namespace: 'copy',


  actions: {

    COPY_START({ getters, dispatch }, { target, folders, files }) {
      let allFolders = [];
      let allFiles = [];

      for (let folder of folders) {
        let children = getters['folders/children'][folder.path] || [];
        let subfiles = getters['files/perDir'][folder.path] || [];

        allFolders.push({
          folder: folder,
          path: (target.path ? target.path + '/' : '') +
            folder.path.substr(folder.dir ? folder.dir.length + 1 : 0),
        });

        for (let subfile of subfiles) {
          allFiles.push({
            file: subfile,
            path: (target.path ? target.path + '/' : '') +
              subfile.path.substr(folder.dir ? folder.dir.length + 1 : 0),
          });
        }

        for (let child of children) {
          let subfiles = getters['files/perDir'][child.path] || [];

          allFolders.push({
            folder: child,
            path: (target.path ? target.path + '/' : '') +
              child.path.substr(folder.dir ? folder.dir.length + 1 : 0),
          });

          for (let subfile of subfiles) {
            allFiles.push({
              file: subfile,
              path: (target.path ? target.path + '/' : '') +
                subfile.path.substr(folder.dir ? folder.dir.length + 1 : 0),
            });
          }
        }
      }

      for (let file of files) {
        allFiles.push({
          file: file,
          path: (target.path ? target.path + '/' : '') +
            file.path.substr(file.dir ? file.dir.length + 1 : 0),
        });
      }

      allFolders = allFolders.filter((elem, pos, arr) => arr.indexOf(elem) === pos);
      allFiles = allFiles.filter((elem, pos, arr) => arr.indexOf(elem) === pos);

      allFolders.sort((item1, item2) => {
        let count1 = item1.folder.path.split('/').length;
        let count2 = item2.folder.path.split('/').length;
        return count1 < count2 ? -1 : (count1 > count2 ? 1 : 0);
      });

      let subfolders = getters['folders/perDir'][target.path] || [];
      let subfiles = getters['files/perDir'][target.path] || [];

      for (let folder of folders) {
        for (let subfolder of subfolders) {
          if (folder.baselc === subfolder.baselc) {
            dispatch('COPY_EXISTS', { folders, files, match: folder, type: 'folders' });
            return;
          }
        }
      }

      for (let file of files) {
        for (let subfile of subfiles) {
          if (file.baselc === subfile.baselc) {
            dispatch('COPY_EXISTS', { folders, files, match: file, type: 'files' });
            return;
          }
        }
      }

      for (let index1 = 0; index1 < folders.length; index1++) {
        for (let index2 = 0; index2 < folders.length; index2++) {
          if (folders[index1].base === folders[index2].base && index1 !== index2) {
            dispatch('COPY_SAME_BASE', { folders, files, match: folders[index1], type: 'folders' });
            return;
          }
        };
      };

      for (let index1 = 0; index1 < files.length; index1++) {
        for (let index2 = 0; index2 < files.length; index2++) {
          if (files[index1].base === files[index2].base && index1 !== index2) {
            dispatch('COPY_SAME_BASE', { folders, files, match: files[index1], type: 'files' });
            return;
          }
        };
      };

      dispatch('COPY_REQUEST', { target, folders, files, allFolders, allFiles });
    },


    COPY_REQUEST({ getters, dispatch }, { target, folders, files, allFolders, allFiles }) {
      let dataFolders = [];
      let dataFiles = [];

      for (let item of allFolders) {
        dataFolders.push([item.folder.path, item.path]);
      }

      for (let item of allFiles) {
        dataFiles.push([item.file.id, item.path]);
      }

      request(
        'actions/copy',
        { folders: dataFolders, files: dataFiles },
        resp => {
          let newFiles = {};
          let errFolders = {};
          let errFiles = {};

          for (let item of resp.files) {
            newFiles[item[0]] = item[1];
          }

          for (let item of resp.errors.folders) {
            errFolders[item[0]] = item[1];
          }

          for (let item of resp.errors.files) {
            errFiles[item[0]] = item[1];
          }

          resp.files = newFiles;
          resp.errors.folders = errFolders;
          resp.errors.files = errFiles;

          dispatch('COPY_REQUEST_SUCCESS', { resp, target, folders, files, allFolders, allFiles });
        },
        err => {
          dispatch('COPY_REQUEST_ERROR', { err, target, folders, files, allFolders, allFiles });
        },
      );
    },


    COPY_REQUEST_SUCCESS_before({ dispatch }, { resp, target, folders, files, allFolders, allFiles }) {
      let err = {
        code: '',
        title: '',
        message: '',
      };

      for (let path of Object.keys(resp.errors.folders)) {
        err.code = resp.errors.folders[path];

        switch (err.code) {
          default:
            err.message = i18n.__('Sorry, something went wrong, please try again later.', 'x4-media-library') + ' (code:' + err.code + ')';
            break;
        }

        dispatch('COPY_REQUEST_ERROR', { err, target, folders, files, allFolders, allFiles });
        return;
      }

      for (let id of Object.keys(resp.errors.files)) {
        err.code = resp.errors.files[id];

        switch (err.code) {
          default:
            err.message = i18n.__('Sorry, something went wrong, please try again later.', 'x4-media-library') + ' (code:' + err.code + ')';
            break;
        }

        dispatch('COPY_REQUEST_ERROR', { err, target, folders, files, allFolders, allFiles });
        return;
      }
    },


    COPY_REQUEST_ERROR_before(context, { err, folders, files }) {
      err.title = folders.length === 0
        ? files.length === 1
          ? i18n.__('File copying', 'x4-media-library')
          : i18n.__('Files copying', 'x4-media-library')
        : files.length === 0
          ? folders.length === 1
            ? i18n.__('Folder copying', 'x4-media-library')
            : i18n.__('Folders copying', 'x4-media-library')
          : i18n.__('Copying', 'x4-media-library');

      switch (err.code) {
        case '':
          break;
      }
    },

  },

};
