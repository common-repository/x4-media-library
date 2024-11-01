export default {

  namespace: 'files/year',


  actions: {

    FILES_PROPS_INIT: '~FILES_YEAR_INIT',


    FILES_YEAR_INIT(context, { files, file }) {
      files = files || [file];

      for (let file of files) {
        file.year = getValue(file);
      }
    },

  },

};


function getValue(file) {
  return file.uploaded.getFullYear();
}
