import debounce from '~/utils/debounce';


export default {

  namespace: 'explorer',


  state: {
    columns: 0,
    entitySize: 0,
  },


  storage: {
    self: null,
    folders: {},
    files: {},
  },


  mutations: {

    ExPLORER_COLUMNS_CHANGE({ state }, { columns }) {
      state.explorer.columns = columns;
    },

    ExPLORER_ENTITY_SIZE_CHANGE({ state }, { entitySize }) {
      state.explorer.entitySize = entitySize;
    },

  },


  actions: {

    ExPLORER_COLUMNS_CHANGE: true,
    ExPLORER_ENTITY_SIZE_CHANGE: true,


    EXPLORER_INIT({ storage }, { explorer }) {
      storage.explorer.self = explorer;
      storage.explorer.folders = {};
      storage.explorer.files = {};
    },

  },


  getters: {

    __({ state, storage, getters, dispatch  }) {
      let explorerWidth = getters['centerColumn'].width;
      explorerWidth -= 2 * storage.constants.explorerPadding;
      explorerWidth -= storage.constants.explorerScrollWidth;

      let entityMargin = storage.constants.explorerEntityMargins[state.view];
      let entityPadding = storage.constants.explorerEntityPadding[state.view];

      let entityOffset = 2 * (entityMargin + entityPadding);
      let entityMaxWidth = storage.constants.explorerMaxSizes[state.view] + entityOffset;
      let columns = Math.ceil(explorerWidth / entityMaxWidth);

      let entitySize = (explorerWidth - columns * entityOffset) / columns;
      entitySize = Math.floor(entitySize * 100) / 100;

      if (!entitySize || entitySize < 0) {
        entitySize = 0;
      }

      debounce('explorer-entity-size', 250, false, () => {
        if (columns !== state.explorer.columns) {
          dispatch('ExPLORER_COLUMNS_CHANGE', { columns });
        }

        if (entitySize !== state.explorer.entitySize) {
          dispatch('ExPLORER_ENTITY_SIZE_CHANGE', { entitySize });
        }
      });

      return {
        columns,
        entitySize,
      };
    },


    focused({ state, getters }) {
      let result = true;

      if (state.screen !== 'main') {
        result = false;
      }

      if (state.dragstate || state.progress.visible || state.alert.visible || state.loader.visible) {
        result = false;
      }

      return result;
    },

  },

};
