import localStorage from 'localStorage';


let typeDefValue = 'desc';
let fieldDefValue = 'uploaded';
let typePropName = 'x4-media-library:sortby:type';
let fieldPropName = 'x4-media-library:sortby:field';

let defaults = {
  uploaded: 'desc',
  baselc: 'asc',
  mime: 'asc',
};


export default {

  namespace: 'sortby',


  state: {
    type: localStorage.getItem(typePropName) || typeDefValue,
    field: localStorage.getItem(fieldPropName) || fieldDefValue,
  },


  mutations: {

    SORTBY_TYPE_CHANGE({ state }, { type }) {
      localStorage.setItem(typePropName, type);
      state.sortby.type = type;
    },

    SORTBY_FIELD_CHANGE({ state }, { field }) {
      localStorage.setItem(fieldPropName, field);
      state.sortby.field = field;
    },

  },


  actions: {

    SORTBY_TYPE_CHANGE: true,
    SORTBY_FIELD_CHANGE: true,


    SORTBY_RESET({ state, dispatch }) {
      if (typeDefValue !== state.sortby.type) {
        dispatch('SORTBY_TYPE_CHANGE', { type: typeDefValue });
      }

      if (fieldDefValue !== state.sortby.field) {
        dispatch('SORTBY_FIELD_CHANGE', { field: fieldDefValue });
      }
    },


    SORTBY_TYPE_CHANGE_PAID: 'SORTBY_RESET',
    SORTBY_FIELD_CHANGE_PAID: 'SORTBY_RESET',


    SORTBY_TYPE_CHANGE_APPLY({ state, dispatch }, { type }) {
      if (type === state.sortby.type) {
        return;
      }

      setTimeout(() => {
        dispatch('SORTBY_TYPE_CHANGE_PAID');
      }, 2000);

      dispatch('SORTBY_TYPE_CHANGE', { type });
    },


    SORTBY_FIELD_CHANGE_APPLY({ state, dispatch }, { field }) {
      if (field === state.sortby.field) {
        return;
      }

      setTimeout(() => {
        dispatch('SORTBY_FIELD_CHANGE_PAID');
      }, 2000);

      dispatch('SORTBY_TYPE_CHANGE_APPLY', { type: defaults[field] });
      dispatch('SORTBY_FIELD_CHANGE', { field });
    },

  },

};
