import wp from 'wp';


export default {

  __(text, domain) {
    if (wp.i18n && wp.i18n.__) {
      text = wp.i18n.__(text, domain);
    }

    return text;
  },

};
