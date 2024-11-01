export default function deactivate(frame) {
  let store = frame.$store;
  store.dispatch('APP_DISABLE');
}
