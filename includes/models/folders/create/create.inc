<?php

namespace X4MediaLibrary\Models\Folders;


function create($path) {
  global $wpdb, $x4_err;

  $uploads = wp_upload_dir(null, false);
  $basedir = $uploads['basedir'];

  $abspath = $basedir . '/' . $path;

  if (is_dir($abspath)) {
    $x4_err = '00' . $x4_err;
    return;
  }

  $res = @\mkdir($abspath, 0777);

  if ($res === false) {
    $x4_err = '01' . $x4_err;
    return;
  }
}
