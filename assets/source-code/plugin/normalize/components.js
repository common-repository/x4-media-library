export default function() {
  let context = require.context('~/components', true, /\.vue$/);
  let paths = context.keys();

  for (let path of paths) {
    let module = context(path).default;
    normalizeComponent(module);
  }
}


function normalizeComponent(options) {
  normalizeMethod(options, 'data', false);
  normalizeMethod(options, 'beforeCreate', false);
  normalizeMethod(options, 'created', false);
  normalizeMethod(options, 'beforeMount', false);
  normalizeMethod(options, 'mounted', false);
  normalizeMethod(options, 'beforeUpdate', false);
  normalizeMethod(options, 'updated', false);
  normalizeMethod(options, 'beforeDestroy', false);
  normalizeMethod(options, 'destroyed', false);

  normalizeHash(options, 'computed', false);
  normalizeHash(options, 'methods', true);
}


function normalizeMethod(options, optName, withArgs) {
  if (options[optName]) {
    if (Array.isArray(options[optName])) {
      options[optName].forEach((method, index) => {
        options[optName][index] = wrapContext(options[optName][index]);
      });
    } else {
      options[optName] = wrapContext(options[optName]);
    }
  }
}


function normalizeHash(options, optName, withArgs) {
  if (options[optName]) {
    for (let name of Object.keys(options[optName])) {
      if (options[optName][name].get && options[optName][name].set) {
        options[optName][name].get = wrapContext(options[optName][name].get, withArgs);
        options[optName][name].set = wrapContext(options[optName][name].set, true);
        continue;
      }

      options[optName][name] = wrapContext(options[optName][name], withArgs);
    }
  }
}


function wrapContext(method, withArgs) {
  return function() {
    let args = [this.$root.$options.store];

    if (withArgs) {
      args = args.concat([].slice.call(arguments));
    }

    return method.apply(this, args);
  };
}


if (process.env.NODE_ENV === 'development') {
  let vueHotReloadApi = require('vue-hot-reload-api/dist/index');

  let reload = vueHotReloadApi.reload;
  let rerender = vueHotReloadApi.rerender;

  vueHotReloadApi.reload = function(id, options) {
    normalizeComponent(options);
    return reload.apply(this, arguments);
  };

  vueHotReloadApi.rerender = function(id, options) {
    normalizeComponent(options);
    return rerender.apply(this, arguments);
  };
}
