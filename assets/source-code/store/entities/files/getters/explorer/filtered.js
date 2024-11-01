export default {

  namespace: 'files/explorer/filtered',


  getters: {

    __({ state, getters }) {
      let filtered = state.current
        ? state.search.text !== ''
          ?  state.search.current
            ? state.search.deep
              ? calcDeepSearch(state, getters)
              : (getters['files/perDir'][state.current.path] || []).slice()
            : Object.values(state.files)
          : (getters['files/perDir'][state.current.path] || []).slice()
        : [];

      if (state.search.text) {
        filtered = applySearch(state, filtered);
      }

      filtered = applyFilters(state, filtered);
      filtered = applySortby(state, filtered);

      return filtered;
    },

  },

};


function calcDeepSearch(state, getters) {
  let filtered = [];

  let children = [state.current]
    .concat(getters['folders/children'][state.current.path] || []);

  for (let child of children) {
    filtered = filtered.concat(getters['files/perDir'][child.path] || []);
  }

  return filtered;
}


function applySearch(state, filtered) {
  let regexp = state.search.text.toLowerCase();
  regexp = regexp.replace(/([^\w\s\*])/gi, '\\$1').replace(/\*/g, '.+');
  regexp = new RegExp(regexp);

  filtered = filtered.filter(file => {
    return file.baselc.match(regexp);
  });

  return filtered;
}


function applyFilters(state, filtered) {
  if (state.filters.mime !== null) {
    filtered = filtered.filter(file => file.mime === state.filters.mime);
  }

  if (state.filters.ext !== null) {
    filtered = filtered.filter(file => file.ext === state.filters.ext);
  }

  if (state.filters.year !== null) {
    filtered = filtered.filter(file => file.year === state.filters.year);
  }

  if (state.filters.month !== null) {
    filtered = filtered.filter(file => file.month === state.filters.month);
  }

  if (state.filters.day !== null) {
    filtered = filtered.filter(file => file.day === state.filters.day);
  }

  if (state.exclude !== null) {
    filtered = filtered.filter(file => !state.exclude[file.id]);
  }

  return filtered;
}


function applySortby(state, filtered) {
  let factor = state.sortby.type === 'desc'
    ? -1
    : 1;

  filtered.sort((file1, file2) => {
    if (file1[state.sortby.field] < file2[state.sortby.field]) return -1 * factor;
    if (file1[state.sortby.field] > file2[state.sortby.field]) return 1 * factor;
    return 0;
  });

  return filtered;
}
