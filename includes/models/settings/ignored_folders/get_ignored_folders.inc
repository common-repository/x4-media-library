<?php

namespace X4MediaLibrary\Models\Settings;

use X4MediaLibrary\Utils\Validators;


function get_ignored_folders() {
  $default = array();

  foreach (namespace\IGNORED_FOLDERS as $path) {
    $default[$path] = array(
      'reserved' => true,
      'ignore' => true
    );
  }

  $value = get_option('x4_media_library_ignored_folders', $default);

  if (!is_array($value)) {
    $value = array();
  }

  foreach ($value as $path => &$object) {
    if (!Validators\is_path($path)) {
      unset($value[$path]);
    }

    $object['ignore'] = isset($object['ignore'])
      ? $object['ignore'] === true
      : true;

    $object['reserved'] = isset($object['reserved'])
      ? $object['reserved'] === true
      : false;
  }

  return $value;
}
