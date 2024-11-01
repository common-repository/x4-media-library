import i18n from '~/utils/i18n';


export default {

  namespace: 'progress',


  state: {
    visible: false,
    finished: false,
    op: '',
    title: '',
    progress1: {
      visible: false,
      label: '',
      chunks: 0,
      completed: 0,
    },
    progress2: {
      visible: false,
      label: '',
      chunks: 0,
      completed: 0,
    },
    buttons: {
      cancel: {
        icon: '',
        label: '',
      },
      close: {
        icon: '',
        label: '',
      },
    },
    errors: [],
  },


  mutations: {

    PROGRESS_CHANGE({ state }, { progress }) {
      state.progress = progress;
    },

    PROGRESS_VISIBLE_CHANGE({ state }, { visible }) {
      state.progress.visible = visible;
    },

    PROGRESS_FINISHED_CHANGE({ state }, { finished }) {
      state.progress.finished = finished;
    },

    PROGRESS_ERRORS_ITEM_ADD({ state }, { err }) {
      state.progress.errors.push(err);
    },

    PROGRESS_PROGRESS1_LABEL_CHANGE({ state }, { label }) {
      state.progress.progress1.label = label;
    },

    PROGRESS_PROGRESS1_CHUNKS_CHANGE({ state }, { chunks }) {
      state.progress.progress1.chunks = chunks;
    },

    PROGRESS_PROGRESS1_COMPLETED_CHANGE({ state }, { completed }) {
      state.progress.progress1.completed = completed;
    },

    PROGRESS_PROGRESS1_COMPLETED_INCREMENT({ state }) {
      state.progress.progress1.completed++;
    },

    PROGRESS_PROGRESS1_VALUE_CHANGE({ state }, { chunks, completed }) {
      state.progress.progress1.chunks = chunks;
      state.progress.progress1.completed = completed;
    },

    PROGRESS_PROGRESS1_MULTI_CHANGE({ state }, { label, chunks, completed }) {
      state.progress.progress1.label = label;
      state.progress.progress1.chunks = chunks;
      state.progress.progress1.completed = completed;
    },

    PROGRESS_PROGRESS2_LABEL_CHANGE({ state }, { label }) {
      state.progress.progress2.label = label;
    },

    PROGRESS_PROGRESS2_CHUNKS_CHANGE({ state }, { chunks }) {
      state.progress.progress2.chunks = chunks;
    },

    PROGRESS_PROGRESS2_COMPLETED_CHANGE({ state }, { completed }) {
      state.progress.progress2.completed = completed;
    },

    PROGRESS_PROGRESS2_COMPLETED_INCREMENT({ state }) {
      state.progress.progress2.completed++;
    },

    PROGRESS_PROGRESS2_VALUE_CHANGE({ state }, { chunks, completed }) {
      state.progress.progress2.chunks = chunks;
      state.progress.progress2.completed = completed;
    },

    PROGRESS_PROGRESS2_MULTI_CHANGE({ state }, { label, chunks, completed }) {
      state.progress.progress2.label = label;
      state.progress.progress2.chunks = chunks;
      state.progress.progress2.completed = completed;
    },

  },


  actions: {

    PROGRESS_CHANGE: true,
    PROGRESS_VISIBLE_CHANGE: true,
    PROGRESS_FINISHED_CHANGE: true,
    PROGRESS_PROGRESS1_LABEL_CHANGE: true,
    PROGRESS_PROGRESS1_CHUNKS_CHANGE: true,
    PROGRESS_PROGRESS1_COMPLETED_CHANGE: true,
    PROGRESS_PROGRESS1_COMPLETED_INCREMENT: true,
    PROGRESS_PROGRESS1_VALUE_CHANGE: true,
    PROGRESS_PROGRESS1_MULTI_CHANGE: true,
    PROGRESS_PROGRESS2_LABEL_CHANGE: true,
    PROGRESS_PROGRESS2_CHUNKS_CHANGE: true,
    PROGRESS_PROGRESS2_COMPLETED_CHANGE: true,
    PROGRESS_PROGRESS2_COMPLETED_INCREMENT: true,
    PROGRESS_PROGRESS2_VALUE_CHANGE: true,
    PROGRESS_PROGRESS2_MULTI_CHANGE: true,
    PROGRESS_ERRORS_ITEM_ADD: true,


    PROGRESS_SHOW({ dispatch }, { progress }) {
      progress.visible = true;
      progress.finished = false;

      progress.op = progress.op || '';
      progress.title = progress.title || '';

      progress.progress1 = progress.progress1 || {};
      progress.progress1.visible = progress.progress1.visible || true;
      progress.progress1.label = progress.progress1.label || '';
      progress.progress1.chunks = progress.progress1.chunks || 10;
      progress.progress1.completed = progress.progress1.completed || 0;

      progress.progress2 = progress.progress2 || {};
      progress.progress2.visible = progress.progress2.visible || false;
      progress.progress2.label = progress.progress2.label || '';
      progress.progress2.chunks = progress.progress2.chunks || 10;
      progress.progress2.completed = progress.progress2.completed || 0;

      progress.buttons = progress.buttons || {};

      progress.buttons.cancel = progress.buttons.cancel || {};
      progress.buttons.cancel.visible = progress.buttons.cancel.visible || true;
      progress.buttons.cancel.icon = progress.buttons.cancel.icon || 'close';
      progress.buttons.cancel.label = progress.buttons.cancel.label || i18n.__('Cancel', 'x4-media-library');

      progress.buttons.close = progress.buttons.close || {};
      progress.buttons.close.visible = progress.buttons.close.visible || false;
      progress.buttons.close.icon = progress.buttons.close.icon || 'check';
      progress.buttons.close.label = progress.buttons.close.label || i18n.__('OK', 'x4-media-library');

      progress.errors = [];

      dispatch('PROGRESS_CHANGE', { progress });
    },


    PROGRESS_FINISH({ state, dispatch }) {
      setTimeout(() => {
        dispatch('PROGRESS_FINISHED_CHANGE', { finished: true });

        if (state.progress.errors.length === 0) {
          dispatch('PROGRESS_HIDE');
        }
      }, 500);
    },


    PROGRESS_CANCEL: 'PROGRESS_HIDE',


    PROGRESS_HIDE({ dispatch }) {
      dispatch('PROGRESS_VISIBLE_CHANGE', { visible: false });
    },

  },

};
