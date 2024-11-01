export default {

  namespace: 'keystate',


  storage: {
    keydownCallback: null,
    keyupCallback: null,
  },


  actions: {

    APP_ENABLE({ storage, dispatch, $frame }) {
      storage.keystate.keydownCallback = event => {
        dispatch('KEYDOWN', { event });
      };

      storage.keystate.keyupCallback = event => {
        dispatch('KEYUP', { event });
      };

      window.addEventListener('keydown', storage.keystate.keydownCallback);
      window.addEventListener('keyup', storage.keystate.keyupCallback);
    },


    APP_DISABLE({ storage, $frame }) {
      window.removeEventListener('keydown', storage.keystate.keydownCallback);
      window.removeEventListener('keyup', storage.keystate.keyupCallback);
    },

  },

};
