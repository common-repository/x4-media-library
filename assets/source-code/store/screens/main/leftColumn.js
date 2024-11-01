import localStorage from 'localStorage';


let widthDefValue = 220;
let manuallyDefValue = true;
let widthPropName = 'x4-media-library:left-column:width';
let manuallyPropName = 'x4-media-library:left-column:manually';

let widthInitialValue = localStorage.getItem(widthPropName);
widthInitialValue = widthInitialValue ? parseFloat(widthInitialValue) : widthDefValue;

let manuallyInitialValue = localStorage.getItem(manuallyPropName);
manuallyInitialValue = manuallyInitialValue ? manuallyInitialValue === 'true' : manuallyDefValue;


export default {

  namespace: 'leftColumn',


  state: {
    appeared: false,
    width: widthInitialValue,
    manually: manuallyInitialValue,
    manuallyMobile: false,
  },


  mutations: {

    LEFT_COLUMN_WIDTH_CHANGE({ state }, { width }) {
      localStorage.setItem(widthPropName, width);
      state.leftColumn.width = width;
    },

    LEFT_COLUMN_MANUALLY_CHANGE({ state }, { manually }) {
      localStorage.setItem(manuallyPropName, manually);
      state.leftColumn.manually = manually;
    },

    LEFT_COLUMN_MANUALLY_MOBILE_CHANGE({ state }, { manuallyMobile }) {
      state.leftColumn.manuallyMobile = manuallyMobile;
    },

    LEFT_COLUMN_APPEARED_CHANGE({ state }, { appeared }) {
      state.leftColumn.appeared = appeared;
    },

  },


  actions: {

    LEFT_COLUMN_APPEARED_CHANGE: true,
    LEFT_COLUMN_WIDTH_CHANGE: true,
    LEFT_COLUMN_MANUALLY_CHANGE: true,
    LEFT_COLUMN_MANUALLY_MOBILE_CHANGE: true,


    APP_ENABLE({ dispatch }) {
      dispatch('LEFT_COLUMN_APPEARED_CHANGE', { appeared: false });
    },


    LEFT_COLUMN_APPEARED({ dispatch }) {
      dispatch('LEFT_COLUMN_APPEARED_CHANGE', { appeared: true });
    },


    LEFT_COLUMN_MANUALLY_TOGGLE({ state, storage, dispatch }) {
      if (state.width < storage.constants.leftColumnMobileLimit) {
        dispatch('LEFT_COLUMN_MANUALLY_MOBILE_CHANGE', { manuallyMobile: !state.leftColumn.manuallyMobile });
      } else {
        setTimeout(() => {
          dispatch('LEFT_COLUMN_MANUALLY_CHANGE_PAID');
        }, 2000);

        dispatch('LEFT_COLUMN_MANUALLY_CHANGE', { manually: !state.leftColumn.manually });
      }
    },


    LEFT_COLUMN_MANUALLY_CHANGE_PAID({ dispatch }) {
      dispatch('LEFT_COLUMN_MANUALLY_CHANGE', { manually: true });
    },


    LEFT_COLUMN_MOBILE_CLOSE({ state, dispatch }) {
      if (state.leftColumn.manuallyMobile) {
        dispatch('LEFT_COLUMN_MANUALLY_MOBILE_CHANGE', { manuallyMobile: false });
      }
    },

  },


  getters: {

    visible({ state, storage }) {
      return state.width < storage.constants.leftColumnMobileLimit
        ? state.leftColumn.manuallyMobile
        : state.leftColumn.manually;
    },

  },

};
