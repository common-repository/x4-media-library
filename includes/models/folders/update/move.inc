<?php

namespace X4MediaLibrary\Models\Folders;


function move($path, $new_path, $physical) {
  global $wpdb, $x4_err;

  $uploads = wp_upload_dir(null, false);
  $basedir = $uploads['basedir'];

  $err_folders = array();
  $err_files = array();

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

  if ($path === '' || strpos($new_dir . '/', $path . '/') === 0) {
    $x4_err = '01' . $x4_err;
    return;
  }

  if ($physical) {
    if (!is_dir($abspath)) {
      $x4_err = '02' . $x4_err;
      return;
    }

    if (is_dir($new_abspath)) {
      $x4_err = '03' . $x4_err;
      return;
    }

    $res = @\rename($abspath, $new_abspath);

    if ($res === false) {
      $x4_err = '04' . $x4_err;
      return;
    }
  }

  $db_folder = namespace\get_db_folder($path);
  $newdb_folder = namespace\get_db_folder($new_path);

  if ($db_folder) {
    if (!$newdb_folder) {
      $wpdb->update(
        $wpdb->x4ml_folders,
        array(
          'path' => $new_path
        ),
        array(
          'path' => $path
        ),
        array(
          '%s'
        ),
        array(
          '%s'
        )
      );
    } else {
      $wpdb->delete(
        $wpdb->x4ml_folders,
        array(
          'path' => $path
        ),
        array(
          '%s'
        )
      );
    }
  }
}
