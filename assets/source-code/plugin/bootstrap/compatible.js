export default function compatible(frame) {
  let library = frame.state().get('library');

  return library && library.mirroring && library.mirroring.args &&
    library.mirroring.args.posts_per_page && library.mirroring.args.posts_per_page > 0;
}
