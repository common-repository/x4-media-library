export default {

  namespace: 'uploader',


  state: {
    visible: false,
  },


  storage: {
    self: null,
    files: null,
    items: null,
    target: null,
    dragCounter: 0,
    dragEnterCallback: null,
    dragLeaveCallback: null,
    dragOverCallback: null,
    dropCallback: null,
  },


  mutations: {

    UPLOADER_VISIBLE_CHANGE({ state }, { visible }) {
      state.uploader.visible = visible;
    },

  },


  actions: {

    UPLOADER_VISIBLE_CHANGE: true,
    UPLOAD_EVENT_CHANGE: true,


    UPLOADER_INIT({ storage }, { uploader }) {
      storage.uploader.self = uploader;
    },


    UPLOADER_BUTTON_CLICK({ storage, dispatch }, { target }) {
      storage.uploader.target = target;
      storage.uploader.self.$refs.input.click();
    },


    UPLOADER_BUTTON_CHANGE_APPLY({ storage, dispatch }) {
      if (storage.uploader.self.$refs.input.files.length > 0) {
        dispatch('UPLOADER_BUTTON_CHANGE');
      }
    },


    UPLOADER_BUTTON_CHANGE({ state, storage, dispatch }) {
      storage.uploader.files = storage.uploader.self.$refs.input.files;
      storage.uploader.items = null;

      dispatch('UPLOADER_DROPPED');
    },


    UPLOAD_FINISH({ storage }) {
      storage.uploader.self.$refs.input.value = null;
    },


    UPLOAD_CANCEL({ storage }) {
      storage.uploader.self.$refs.input.value = null;
    },


    KEYDOWN({ state, getters, dispatch }, { event }) {
      if (!getters['explorer/focused']) {
        return;
      }

      if (event.shiftKey && event.key === 'U') {
        event.preventDefault();

        dispatch('UPLOADER_BUTTON_CLICK', { target: state.current });
        return;
      }
    },


    APP_ENABLE({ storage, dispatch }) {
      storage.uploader.dragEnterCallback = event => {
        dispatch('UPLOADER_DRAG_ENTER', { event });
      };

      storage.uploader.dragLeaveCallback = event => {
        dispatch('UPLOADER_DRAG_LEAVE', { event });
      };

      storage.uploader.dragOverCallback = event => {
        dispatch('UPLOADER_DRAG_OVER', { event });
      };

      storage.uploader.dropCallback = event => {
        dispatch('UPLOADER_DROP', { event });
      };

      document.body.addEventListener('dragenter', storage.uploader.dragEnterCallback);
      document.body.addEventListener('dragleave', storage.uploader.dragLeaveCallback);
      document.body.addEventListener('dragover', storage.uploader.dragOverCallback);
      document.body.addEventListener('drop', storage.uploader.dropCallback);
    },


    APP_DISABLE({ storage }) {
      document.body.removeEventListener('dragenter', storage.uploader.dragEnterCallback);
      document.body.removeEventListener('dragleave', storage.uploader.dragLeaveCallback);
      document.body.removeEventListener('dragover', storage.uploader.dragOverCallback);
      document.body.removeEventListener('drop', storage.uploader.dropCallback);
    },


    UPLOADER_DRAG_ENTER({ state, storage, dispatch }, { event }) {
      if (!dragEventValidate(state, event)) {
        return;
      }

      storage.uploader.dragCounter++;

      if (!state.uploader.visible) {
        dispatch('UPLOADER_VISIBLE_CHANGE', { visible: true });
      }
    },


    UPLOADER_DRAG_LEAVE({ state, storage, dispatch }, { event }) {
      if (!dragEventValidate(state, event)) {
        return;
      }

      storage.uploader.dragCounter--;

      if (storage.uploader.dragCounter === 0) {
        dispatch('UPLOADER_VISIBLE_CHANGE', { visible: false });
      }
    },


    UPLOADER_DRAG_OVER({ state, dispatch }, { event }) {
      if (!dragEventValidate(state, event)) {
        return;
      }

      event.dataTransfer.dropEffect = 'copy';
    },


    UPLOADER_DROP({ state, storage, dispatch, $frame }, { event }) {
      if (!dragEventValidate(state, event)) {
        return;
      }

      storage.uploader.files = event.dataTransfer.files;
      storage.uploader.items = event.dataTransfer.items;

      dispatch('UPLOADER_VISIBLE_CHANGE', { visible: false });
      dispatch('UPLOADER_DROPPED');
    },

  },

};


function dragEventValidate(state, event) {
  if (!event.dataTransfer.items || event.dataTransfer.items.length === 0 || event.dataTransfer.items[0].kind !== 'file') {
    if (!event.dataTransfer.files || event.dataTransfer.files.length === 0) {
      if (Array.prototype.slice.apply(event.dataTransfer.types).indexOf('Files') === -1) {
        return false;
      }
    }  
  }

  event.preventDefault();
  event.stopPropagation();

  if (state.progress.visible || state.alert.visible || state.loader.visible) {
    return false;
  }

  if (state.screen !== 'main') {
    return false;
  }

  return true;
}
