import localStorage from 'localStorage';


let widthDefValue = 220;
let manuallyDefValue = true;
let widthPropName = 'x4-media-library:right-column:width';
let manuallyPropName = 'x4-media-library:right-column:manually';

let widthInitialValue = localStorage.getItem(widthPropName);
widthInitialValue = widthInitialValue ? parseFloat(widthInitialValue) : widthDefValue;

let manuallyInitialValue = localStorage.getItem(manuallyPropName);
manuallyInitialValue = manuallyInitialValue ? manuallyInitialValue === 'true' : manuallyDefValue;


export default {

  namespace: 'rightColumn',


  state: {
    appeared: false,
    width: widthInitialValue,
    manually: manuallyInitialValue,
    manuallyMobile: false,
  },


  mutations: {

    RIGHT_COLUMN_WIDTH_CHANGE({ state }, { width }) {
      localStorage.setItem(widthPropName, width);
      state.rightColumn.width = width;
    },

    RIGHT_COLUMN_MANUALLY_CHANGE({ state }, { manually }) {
      localStorage.setItem(manuallyPropName, manually);
      state.rightColumn.manually = manually;
    },

    RIGHT_COLUMN_MANUALLY_MOBILE_CHANGE({ state }, { manuallyMobile }) {
      state.rightColumn.manuallyMobile = manuallyMobile;
    },

    RIGHT_COLUMN_APPEARED_CHANGE({ state }, { appeared }) {
      state.rightColumn.appeared = appeared;
    },

  },


  actions: {

    RIGHT_COLUMN_APPEARED_CHANGE: true,
    RIGHT_COLUMN_WIDTH_CHANGE: true,
    RIGHT_COLUMN_MANUALLY_CHANGE: true,
    RIGHT_COLUMN_MANUALLY_MOBILE_CHANGE: true,


    APP_ENABLE({ dispatch }) {
      dispatch('RIGHT_COLUMN_APPEARED_CHANGE', { appeared: false });
    },


    RIGHT_COLUMN_APPEARED({ dispatch }) {
      dispatch('RIGHT_COLUMN_APPEARED_CHANGE', { appeared: true });
    },


    RIGHT_COLUMN_MANUALLY_TOGGLE({ state, storage, dispatch }) {
      if (state.width < storage.constants.rightColumnMobileLimit) {
        dispatch('RIGHT_COLUMN_MANUALLY_MOBILE_CHANGE', { manuallyMobile: !state.rightColumn.manuallyMobile });
      } else {
        setTimeout(() => {
          dispatch('RIGHT_COLUMN_MANUALLY_CHANGE_PAID');
        }, 2000);

        dispatch('RIGHT_COLUMN_MANUALLY_CHANGE', { manually: !state.rightColumn.manually });
      }
    },


    RIGHT_COLUMN_MANUALLY_CHANGE_PAID({ dispatch }) {
      dispatch('RIGHT_COLUMN_MANUALLY_CHANGE', { manually: true });
    },


    RIGHT_COLUMN_MOBILE_CLOSE({ state, dispatch }) {
      if (state.rightColumn.manuallyMobile) {
        dispatch('RIGHT_COLUMN_MANUALLY_MOBILE_CHANGE', { manuallyMobile: false });
      }
    },

  },


  getters: {

    visible({ state, storage }) {
      return state.width < storage.constants.rightColumnMobileLimit
        ? state.rightColumn.manuallyMobile
        : state.rightColumn.manually;
    },

  },

};
