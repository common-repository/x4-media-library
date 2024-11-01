import Vue from 'vue';

import createStore from '~/store';
import normalizeUploader from '~/plugin/normalize/uploader';
import normalizeComponents from '~/plugin/normalize/components';
import App from '~/components/App';


export let app = null;
export let store = null;
export let firstTime = true;


export default function activate(frame) {
  let uploader = frame.uploader.uploader.uploader;

  let el = firstTime
    ? document.createElement('div')
    : app.$el;

  let parent = frame.modal
    ?  frame.modal.el.querySelector('.media-modal')
    : document.body;

  parent.appendChild(el);

  if (!uploader.x4wp) {
    normalizeUploader(frame);
    uploader.x4wp = true;
  }

  if (firstTime) {
    normalizeComponents();
    store = createStore(frame);

    app = new Vue({
      el,
      frame,
      store,
      render: h => h(App),
    });

    store.$app = app;
  } else {
    store.$frame = frame;
    app.$options.frame = frame;
  }

  frame.$store = store;
  frame.$app = app;

  store.dispatch('APP_ENABLE');

  firstTime = false;
}
