<?php

namespace X4MediaLibrary\Models\Folders;


function copy($path, $new_path) {
  global $x4_err;

  $uploads = wp_upload_dir(null, false);
  $basedir = $uploads['basedir'];

  $dir = pathinfo($path, PATHINFO_DIRNAME);
  $dir = $dir !== '.' ? $dir : '';
  $base = pathinfo($path, PATHINFO_BASENAME);
  $abspath = $basedir . '/' . $path;

  $new_dir = pathinfo($new_path, PATHINFO_DIRNAME);
  $new_dir = $new_dir !== '.' ? $new_dir : '';
  $new_abspath = $basedir . '/' . $new_path;

  if ($path === $new_path) {
    $x4_err = '00' . $x4_err;
    return;
  }

  if (!is_dir($abspath)) {
    $x4_err = '01' . $x4_err;
    return;
  }

  namespace\create($new_path);

  if ($x4_err) {
    $x4_err = '02' . $x4_err;
    return;
  }

  $db_folder = namespace\get_db_folder($path);
  $newdb_folder = namespace\get_db_folder($new_path);

  if ($db_folder && !$newdb_folder) {
    $newdb_folder = $db_folder;
    $newdb_folder['path'] = $new_path;

    namespace\db_create($newdb_folder);
  }
}
