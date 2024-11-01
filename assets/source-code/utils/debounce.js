let cache = {};


export default function debounce(name, delay, skip, callback) {
  let curTime = new Date().getTime();

  if (!cache[name]) {
    cache[name] = {
      lastTime: 0,
      timeout: null,
      skipped: false,
    };
  }

  if (skip && !cache[name].skipped) {
    cache[name].lastTime = curTime;
    cache[name].skipped = true;
  }

  if (delay > curTime - cache[name].lastTime) {
    clearTimeout(cache[name].timeout);

    return cache[name].timeout = setTimeout(
      () => debounce(name, delay, false, callback),
      delay,
    );
  }

  clearTimeout(cache[name].timeout);

  cache[name].lastTime = curTime;
  cache[name].skipped = false;

  callback();
}
