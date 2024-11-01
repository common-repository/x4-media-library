import $ from 'jquery';
import wp from 'wp';


let sync = wp.media.model.Query.prototype.sync;


wp.media.model.Query.prototype.sync = function() {
  if (this.args.posts_per_page && this.args.posts_per_page > 0) {
    return $.Deferred().resolveWith().promise();
  }

  return sync.apply(this, arguments);
};
