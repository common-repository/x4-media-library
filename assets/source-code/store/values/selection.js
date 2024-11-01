import equal from '~/utils/equal';


export default {

  namespace: 'selection',


  state: {
    multiple: false,
    items: [],
  },


  mutations: {

    SELECTION_MULTIPLE_CHANGE({ state }, { multiple }) {
      state.selection.multiple = multiple;
    },

    SELECTION_ITEMS_TRAVERSE({ state }, { select, deselect }) {
      for (let file of select) {
        if (state.selection.items.indexOf(file) === -1) {
          state.selection.items.push(file);
        }
      }

      for (let file of deselect) {
        if (state.selection.items.indexOf(file) !== -1) {
          state.selection.items.splice(state.selection.items.indexOf(file), 1);
        }
      }
    },

    SELECTION_ITEMS_REORDER({ state }, { items }) {
      state.selection.items = items;
    },

  },


  actions: {

    SELECTION_MULTIPLE_CHANGE: true,
    SELECTION_ITEMS_TRAVERSE: true,
    SELECTION_ITEMS_REORDER: true,

    APP_ENABLE: 'SELECTION_MULTIPLE_REFRESH',
    BOOTSTRAP_FILES_FINISH: 'SELECTION_ITEMS_REFRESH',


    SELECTION_MULTIPLE_REFRESH({ state, dispatch, $frame }) {
      if (!$frame.modal) {
        return;
      }

      let multiple = !!$frame.state().get('multiple');

      if (multiple !== state.selection.multiple) {
        dispatch('SELECTION_MULTIPLE_CHANGE', { multiple });
      }

      setTimeout(() => {
        dispatch('SELECTION_ITEMS_REFRESH');
      }, 100);
    },


    SELECTION_ITEMS_REFRESH({ state, $frame, dispatch }) {
      if (!$frame.modal) {
        return;
      }

      let items = $frame.state().get('selection').models
        .map(model => state.files[model.get('id')])
        .filter(file => !!file);

      let select = [];
      let deselect = [];

      for (let item of items) {
        if (state.selection.items.indexOf(item) === -1) {
          select.push(item);
        }
      }

      for (let item of state.selection.items) {
        if (items.indexOf(item) === -1) {
          deselect.push(item);
        }
      }

      if (select.length > 0 || deselect.length > 0) {
        dispatch('SELECTION_ITEMS_TRAVERSE', { select, deselect });
      }
    },


    SELECTION_ITEM_REMOVE({ state, dispatch }, { item }) {
      if (state.selection.items.indexOf(item) === -1) {
        return;
      }

      let select = [];
      let deselect = [item];

      dispatch('SELECTION_ITEMS_TRAVERSE', { select, deselect });
    },


    SELECTION_ITEMS_CLEAR({ state, dispatch }) {
      if (state.selection.items.length === 0) {
        return;
      }

      let select = [];
      let deselect = state.selection.items.slice();

      dispatch('SELECTION_ITEMS_TRAVERSE', { select, deselect });
    },


    SELECTED_TRAVERSE({ state, dispatch, $frame }, { select, deselect }) {
      if (!$frame.modal) {
        return;
      }

      let select2 = [];
      let deselect2 = [];

      if (!state.selection.multiple) {
        if (select.files.length > 0) {
          let file = state.selected.last && select.files.indexOf(state.selected.last) !== -1
            ? state.selected.last
            : select.files[0];

          if (state.selection.items.length > 0) {
            if (file !== state.selection.items[0]) {
              deselect2.push(state.selection.items[0]);
              select2.push(file);
            }
          } else {
            select2.push(file);
          }
        }
      } else {
        select2 = select.files.slice();
      }

      if (select2.length > 0 || deselect2.length > 0) {
        dispatch('SELECTION_ITEMS_TRAVERSE', { select: select2, deselect: deselect2 });
      }
    },


    DELETE_FILES_REQUEST_SUCCESS_before({ state, dispatch, $frame }, { resp, files }) {
      if (!$frame.modal) {
        return;
      }

      let select = [];
      let deselect = [];

      for (let file of files) {
        if (state.selection.items.indexOf(file) !== -1 && !resp.errors[file.id]) {
          deselect.push(file);
        }
      }

      if (deselect.length > 0) {
        dispatch('SELECTION_ITEMS_TRAVERSE', { select, deselect });
      }
    },

  },

};
