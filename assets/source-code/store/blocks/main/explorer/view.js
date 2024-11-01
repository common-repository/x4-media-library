import localStorage from 'localStorage';


let defValue = 'large';
let propName = 'x4-media-library:view';


export default {

  namespace: 'view',


  state: localStorage.getItem(propName) || defValue,


  mutations: {

    VIEW_CHANGE({ state }, { view }) {
      localStorage.setItem(propName, view);
      state.view = view;
    },

  },


  actions: {

    VIEW_CHANGE: true,


    VIEW_RESET({ state, dispatch }) {
      if (defValue !== state.view) {
        dispatch('VIEW_CHANGE', { view: defValue });
      }
    },


    VIEW_CHANGE_PAID: 'VIEW_RESET',


    VIEW_CHANGE_APPLY({ state, dispatch }, { view }) {
      if (view === state.view) {
        return;
      }

      setTimeout(() => {
        dispatch('VIEW_CHANGE_PAID');
      }, 2000);

      dispatch('VIEW_CHANGE', { view });
    },

  },

};
