import wp from 'wp';

import activate from './activate';
import compatible from './compatible';
import deactivate from './deactivate';
import './nonces';
import './query';


let active = false;
let initialize = wp.media.view.MediaFrame.prototype.initialize;


wp.media.view.MediaFrame.prototype.initialize = function() {
  initialize.apply(this, arguments);

  if (!this.modal) {
    return this.on('activate', () => {
      activate(this);
    });
  }

  this.states.add([
    new wp.media.controller.EditImage(),
  ]);

  this.on('open', () => {
    this.x4wp = true;

    if (!active && compatible(this)) {
      active = true;
      activate(this);
    }
  });

  this.states.on('activate', (a1,a2,a3) => {
    if (!this.x4wp) {
      return;
    }

    if (compatible(this)) {
      if (!active) {
        active = true;
        activate(this);
      } else {
        deactivate(this);
        activate(this);
      }
    } else {
      if (active) {
        active = false;
        deactivate(this);
      }
    }
  });

  this.on('close', () => {
    this.x4wp = false;

    if (active && compatible(this)) {
      active = false;
      deactivate(this);
    }
  });
};
