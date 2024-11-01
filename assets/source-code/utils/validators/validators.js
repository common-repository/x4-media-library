export function isName(value) {
  return typeof value === 'string' && !!value.match(/^[^/:*?"<>|\\]*$/);
}


export function isPath(value) {
  return typeof value === 'string' && value.substr(0, 1) !== '/' && value.substr(-1, 1) !== '/' && !!value.match(/^[^:*?"<>|\\]*$/);
}


export function isIcon(value) {
  return typeof value === 'string' && !!value.match(/^[a-z0-9_]+$/);
}


export function isColor(value) {
  return typeof value === 'string' && !!value.match(/^[a-z_]+:[0-9]+$/);
}


export function isExt(value) {
  return typeof value === 'string' && !!value.match(/^[a-z0-9]+$/);
}


export function isMimeType(value) {
  return typeof value === 'string' && !!value.match(/^[a-z0-9]+\/[a-z0-9.-\\+]+$/);
}
