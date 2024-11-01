export default {

  namespace: 'controls',


  state: {
    active: null,
  },


  mutations: {

    CONTROLS_CHANGE({ state }, { active }) {
      state.controls.active = active;
    },

    CONTROLS_ACTIVE_CHANGE({ state }, { active }) {
      state.controls.active = active;
    },

  },


  actions: {

    CONTROLS_CHANGE: true,
    CONTROLS_ACTIVE_CHANGE: true,


    CONTROLS_TOGGLE({ state, storage, dispatch }, { active }) {
      if (active && state.controls.active && active !== state.controls.active) {
        dispatch('CONTROLS_ACTIVE_CHANGE', { active: null });

        setTimeout(() => {
          dispatch('CONTROLS_CHANGE', { active });
        }, 300);

        return;
      }

      if (active === state.controls.active) {
        active = null;
      }

      dispatch('CONTROLS_CHANGE', { active });
    },


    KEYDOWN({ state, getters, dispatch }, { event }) {
      if (!getters['explorer/focused']) {
        return;
      }

      if (event.key === 'Escape' && state.controls.active !== null) {
        event.preventDefault();

        dispatch('CONTROLS_CLOSE');
        return;
      }

      if (event.shiftKey && event.key === 'V') {
        event.preventDefault();

        if (state.controls.active !== 'view') {
          dispatch('CONTROLS_TOGGLE', { active: 'view' });
        }

        return;
      }

      if (event.shiftKey && event.key === 'S') {
        event.preventDefault();

        if (state.controls.active !== 'sortby') {
          dispatch('CONTROLS_TOGGLE', { active: 'sortby' });
        }

        return;
      }

      if (event.shiftKey && event.key === 'F') {
        event.preventDefault();

        if (state.controls.active !== 'filters') {
          dispatch('CONTROLS_TOGGLE', { active: 'filters' });
        }

        return;
      }

      if (event.key === 'F3' || ((event.ctrlKey || event.metaKey) && (event.key === 'e' || event.key === 'f'))) {
        event.preventDefault();

        if (state.controls.active !== 'search') {
          dispatch('CONTROLS_TOGGLE', { active: 'search' });
        }

        return;
      }
    },


    CONTROLS_CLOSE({ state, dispatch }) {
      if (state.controls.active) {
        dispatch('CONTROLS_ACTIVE_CHANGE', { active: null });
      }
    },

  },

};
