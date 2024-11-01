<?php

namespace X4MediaLibrary\Models\Folders;


function get_physical_folder($path) {
  $uploads = wp_upload_dir(null, false);
  $basedir = $uploads['basedir'];

  $abspath = $basedir . '/' . $path;

  if (!is_dir($abspath)) {
    return null;
  }

  $folder = array(
    'path' => $path
  );

  return $folder;
}
