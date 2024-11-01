<?php

namespace X4MediaLibrary\Models\Settings;


function set_custom_mime_types($value) {
  global $x4_err;

  $res = update_option('x4_media_library_mime_types', $value, false);

  if ($res === false) {
    $x4_err = '00' . $x4_err;
    return;
  }
}
