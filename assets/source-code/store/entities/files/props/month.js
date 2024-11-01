export default {

  namespace: 'files/month',


  actions: {

    FILES_PROPS_INIT: '~FILES_MONTH_INIT',


    FILES_MONTH_INIT(context, { files, file }) {
      files = files || [file];

      for (let file of files) {
        file.month = getValue(file);
      }
    },

  },

};


function getValue(file) {
  return file.uploaded.getMonth();
}
