import debounce from '~/utils/debounce';


export default {

  namespace: 'selectFrame',


  state: {
    visible: false,
    start: {
      x: 0,
      y: 0,
    },
    rect: {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0,
    },
    prev: {
      folders: {},
      files: {},
    },
  },


  mutations: {

    SELECT_FRAME_CHANGE({ state }, { selectFrame }) {
      state.selectFrame = selectFrame;
    },

    SELECT_FRAME_VISIBLE_CHANGE({ state }, { visible }) {
      state.selectFrame.visible = false;
    },
    
    SELECT_FRAME_RECT_CHANGE({ state }, { rect }) {
      state.selectFrame.rect = rect;
    },

  },


  actions: {

    SELECT_FRAME_CHANGE: true,
    SELECT_FRAME_VISIBLE_CHANGE: true,
    SELECT_FRAME_RECT_CHANGE: true,


    SELECT_FRAME_DRAG_START({ state, storage, getters, dispatch }, { event }) {
      event.dataTransfer.setData('text', '');
      event.dataTransfer.effectAllowed = 'move';

      if (!storage.constants.isIE) {
        let img = new Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

        event.dataTransfer.setDragImage(img, 0, 0);
      }

      let $explorer = storage.explorer.self.$el;

      let x = event.clientX - getters['centerColumn'].left;
      let y = event.clientY - getters['centerColumn'].top + $explorer.scrollTop;

      let selectFrame = {
        visible: true,
        start: {
          x,
          y,
        },
        rect: {
          x1: x,
          x2: x,
          y1: y,
          y2: y,
        },
        prev: {
          folders: Object.assign({}, state.selected.folders),
          files: Object.assign({}, state.selected.files),
        },
      };

      setTimeout(() => {
        dispatch('SELECT_FRAME_CHANGE_PAID');
      }, 1000);

      dispatch('SELECT_FRAME_CHANGE', { selectFrame });
    },


    SELECT_FRAME_DRAG_END({ dispatch }, { event }) {
      dispatch('SELECT_FRAME_VISIBLE_CHANGE', { visible: false });
    },


    SELECT_FRAME_DRAG({ state, storage, dispatch }, { event }) {
      debounce('select-frame-select', 100, false, () => {
        let select = {
          folders: [],
          files: [],
        };

        let deselect = {
          folders: [],
          files: [],
        };

        calcSelected(state, storage, select, deselect, event);

        if (select.folders.length === 0 && select.files.length === 0 && deselect.folders.length === 0 && deselect.files.length === 0) {
          return;
        }

        dispatch('SELECTED_TRAVERSE', { select, deselect });
      });
    },


    SELECT_FRAME_DRAG_OVER({ state, storage, getters, dispatch }, { event }) {
      if (state.dragstate !== 'select-frame') {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      event.dataTransfer.dropEffect = 'move';

      debounce('select-frame', 25, false, () => {
        if (event.screenX === 0 || event.screenY === 0) {
          return;
        }

        let start = state.selectFrame.start;
        let $explorer = storage.explorer.self.$el;

        let x = event.clientX - getters['centerColumn'].left;
        let y = event.clientY - getters['centerColumn'].top + $explorer.scrollTop;

        let rect = {
          x1: x >= start.x ? start.x : x,
          x2: x >= start.x ? x : start.x,
          y1: y >= start.y ? start.y : y,
          y2: y >= start.y ? y : start.y,
        };

        dispatch('SELECT_FRAME_RECT_CHANGE', { rect });
      });
    },

  },


  getters: {

    __({ state }) {
      return {
        left: state.selectFrame.rect.x1 ,
        top: state.selectFrame.rect.y1,
        width: (state.selectFrame.rect.x2 - state.selectFrame.rect.x1),
        height: (state.selectFrame.rect.y2 - state.selectFrame.rect.y1),
      };
    },

  },

};


function calcSelected(state, storage, select, deselect, event) {
  let isMultiple = state.selection.multiple;
  let rect = state.selectFrame.rect;

  let types = [
    { type: 'folders', unique: 'path' },
    { type: 'files', unique: 'id' },
  ];

  for (let { type, unique } of types) {
    for (let component of Object.values(storage.explorer[type])) {
      let { $el, entity } = component;

      let isIncluded = $el.offsetTop < rect.y2 && $el.offsetTop + $el.offsetHeight > rect.y1 &&
                       $el.offsetLeft < rect.x2 && $el.offsetLeft + $el.offsetWidth > rect.x1;

      let isSelected = !!state.selected[type][entity[unique]];
      let isPrevSelected = !!state.selectFrame.prev[type][entity[unique]];

      if (isMultiple) {
        if (type === 'folders') {
          if (event.ctrlKey || event.metaKey) {
            if ((!isIncluded && isPrevSelected) || (isIncluded && !isPrevSelected)) {
              if (!isSelected) {
                select.folders.push(entity);
              }
            } else {
              if (isSelected) {
                deselect.folders.push(entity);
              }
            }

            continue;
          }

          if (isIncluded) {
            if (!isSelected) {
              select.folders.push(entity);
            }
          } else {
            if (isSelected) {
              deselect.folders.push(entity);
            }
          }

          continue;
        }

        if (type === 'files') {
          if ((!isIncluded && isPrevSelected) || (isIncluded && !isPrevSelected)) {
            if (!isSelected) {
              select.files.push(entity);
            }
          } else {
            if (isSelected && !isPrevSelected) {
              deselect.files.push(entity);
            }
          }

          continue;
        }
      }

      if (event.ctrlKey || event.metaKey) {
        if ((!isIncluded && isPrevSelected) || (isIncluded && !isPrevSelected)) {
          if (!isSelected) {
            select[type].push(entity);
          }
        } else {
          if (isSelected) {
            deselect[type].push(entity);
          }
        }

        continue;
      }

      if (isIncluded) {
        if (!isSelected) {
          select[type].push(entity);
        }
      } else {
        if (isSelected) {
          deselect[type].push(entity);
        }
      }
    }
  }
}
