export default {

  namespace: 'centerColumn',


  getters: {

    __({ state, storage, getters }) {
      let left = 0;
      let top = 0;

      let width = state.width;

      left += getters['offset'].left;
      top += getters['offset'].top;

      width -= getters['offset'].left;
      width -= getters['offset'].right;

      if (!getters['responsive/isMobile']) {
        if (getters['leftColumn/visible']) {
          left += state.leftColumn.width;
          width -= state.leftColumn.width;
        }

        if (getters['rightColumn/visible']) {
          width -= state.rightColumn.width;
        }
      }

      top += storage.constants.topRowHeight;
      top += storage.constants.subtopRowHeight;

      if (width < 0) {
        width = 0;
      }

      return {
        left,
        top,
        width,
      };
    },

  },

};
