<?php

namespace X4MediaLibrary\Models\Settings;


function set_ignored_folders($value) {
  global $x4_err;

  $res = update_option('x4_media_library_ignored_folders', $value, false);

  if ($res === false) {
    $x4_err = '00' . $x4_err;
    return;
  }
}
