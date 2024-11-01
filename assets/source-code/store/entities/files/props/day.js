export default {

  namespace: 'files/day',


  actions: {

    FILES_PROPS_INIT: '~FILES_DAY_INIT',


    FILES_DAY_INIT(context, { files, file }) {
      files = files || [file];

      for (let file of files) {
        file.day = getValue(file);
      }
    },

  },

};


function getValue(file) {
  return file.uploaded.getDate();
}
