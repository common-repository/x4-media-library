import Vue from 'vue';


export default function createStore(frame) {
  let store = {
    $frame: frame,
    state: {},
    storage: {},
    getters: {},
    mutations: {},
    actions: {},
  };

  let context = require.context('./', true, /\.js$/);
  let paths = context.keys();

  for (let path of paths) {
    let module = context(path).default;

    if (!module || module.namespace === undefined) {
      continue;
    }

    if (module.state !== undefined) {
      paveAWay(store.state, module.namespace, module.state);
    }

    if (module.storage !== undefined) {
      paveAWay(store.storage, module.namespace, module.storage);
    }

    if (module.getters) {
      for (let name in module.getters) {
        let namespacedName = getNamespaced(module, name);

        store.getters[namespacedName] = () => {
          if (process.env.NODE_ENV === 'development') {
            let result = module.getters[name].call(store, store);
            console.log('%c GETTER: ' + namespacedName + ' ', 'background: green; color: white', result);
            return result;
          }

          return module.getters[name].call(store, store);
        };
      }
    }

    if (module.mutations) {
      for (let name in module.mutations) {
        store.mutations[name] = store.mutations[name] || [];

        store.mutations[name].push(payload => {
          module.mutations[name].call(store, store, payload);
        });
      }
    }

    if (module.actions) {
      for (let name in module.actions) {
        let callback = module.actions[name];
        store.actions[name] = store.actions[name] || [];

        if (callback === true) {
          store.actions[name].push(payload => store.commit(name, payload));
        } else if (typeof callback === 'string') {
          if (callback.substr(0, 1) === '~') {
            store.actions[name].push(payload => store.dispatch(callback.substr(1), payload));
          } else {
            store.actions[name].push(payload => store.dispatch(callback));
          }
        } else {
          store.actions[name].push(payload => callback.call(store, store, payload));
        }
      }
    }
  };

  store.commit = (name, payload) => {
    if (process.env.NODE_ENV === 'development' && (!payload || payload.log !== false)) {
      console.log('%c MUTATION: ' + name + ' (' + (store.mutations[name] ? store.mutations[name].length : 0) + ') ', 'background: red; color: white', payload || '');
    }

    if (store.mutations[name]) {
      for (let mutation of store.mutations[name]) {
        mutation(payload);
      }
    }
  };

  store.dispatch = (name, payload) => {
    if (store.actions[name + '_before']) {
      store.dispatch(name + '_before', payload);
    }

    if (process.env.NODE_ENV === 'development' && (!payload || payload.log !== false)) {
      console.log('%c ACTION: ' + name + ' (' + (store.actions[name] ? store.actions[name].length : 0) + ') ', 'background: blue; color: white', payload || '');
    }

    if (store.actions[name]) {
      for (let action of store.actions[name]) {
        action(payload);
      }
    }

    if (store.actions[name + '_after']) {
      store.dispatch(name + '_after', payload);
    }
  };

  let vm = new Vue({
    data: {
      $$state: store.state,
    },
    computed: store.getters,
  });

  for (let name in store.getters) {
    Object.defineProperty(store.getters, name, {
      get: () => vm[name],
    });
  }

  return store;
}


function paveAWay(obj, path, value) {
  let parts = path ? path.split('/') : [];
  let lastpart = parts.length > 0 ? parts.pop() : null;

  for (let subpart of parts) {
    obj[subpart] = obj[subpart] || {};
    obj = obj[subpart];
  };

  if (lastpart) {
    if (value instanceof Object && !Array.isArray(value)) {
      obj[lastpart] = obj[lastpart] || {};
      Object.assign(obj[lastpart], value);
    } else {
      obj[lastpart] = value;
    }
  } else {
    Object.assign(obj, value);
  }
}


function getNamespaced(module, name) {
  return module.namespace
    ? name !== '__'
      ? module.namespace + '/' + name
      : module.namespace
    : name;
}
