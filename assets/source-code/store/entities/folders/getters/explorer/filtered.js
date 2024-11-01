export default {

  namespace: 'folders/explorer/filtered',


  getters: {

    __({ state, getters }) {
      let filtered = state.current
        ? state.search.text !== ''
          ?  state.search.current
            ? state.search.deep
              ? (getters['folders/children'][state.current.path] || []).slice()
              : (getters['folders/perDir'][state.current.path] || []).slice()
            : Object.values(state.folders)
          : (getters['folders/perDir'][state.current.path] || []).slice()
        : [];

      if (state.search.text) {
        filtered = applySearch(state, filtered);
      }

      filtered = applySortby(state, filtered);

      return filtered;
    },

  },

};


function applySearch(state, filtered) {
  let regexp = state.search.text.toLowerCase();
  regexp = regexp.replace(/([^\w\s\*])/gi, '\\$1').replace(/\*/g, '.+');
  regexp = new RegExp(regexp);

  filtered = filtered.filter(folder => {
    return folder.baselc.match(regexp) && folder.path !== '';
  });

  return filtered;
}


function applySortby(state, filtered) {
  let type = state.sortby.field === 'baselc'
    ?  state.sortby.type
    : 'asc';

  let factor = type === 'desc'
    ? -1
    : 1;

  filtered.sort((folder1, folder2) => {
    if (folder1.baselc < folder2.baselc) return -1 * factor;
    if (folder1.baselc > folder2.baselc) return 1 * factor;
    return 0;
  });

  return filtered;
}
