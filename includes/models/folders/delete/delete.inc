<?php

namespace X4MediaLibrary\Models\Folders;


function delete($path) {
  global $wpdb, $x4_err;

  $uploads = wp_upload_dir(null, false);
  $basedir = $uploads['basedir'];

  $abspath = $basedir . '/' . $path;

  if (!is_dir($abspath)) {
    $x4_err = '00' . $x4_err;
    return;
  }

  $directory = new \RecursiveDirectoryIterator($abspath, \FilesystemIterator::SKIP_DOTS | \FilesystemIterator::UNIX_PATHS);
  $iterator = new \RecursiveIteratorIterator($directory, \RecursiveIteratorIterator::SELF_FIRST, \RecursiveIteratorIterator::CATCH_GET_CHILD);

  foreach ($iterator as $sub_abspath => $info) {
    if ($info->isDir()) {
      $res = @\rmdir($sub_abspath);

      if ($res === false) {
        $x4_err = '01' . $x4_err;
        return;
      }
    } else {
      $res = @\unlink($sub_abspath);

      if ($res === false) {
        $x4_err = '02' . $x4_err;
        return;
      }
    }
  }

  $db_folder = namespace\get_db_folder($path);

  if ($db_folder) {
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

  $res = @\rmdir($abspath);

  if ($res === false) {
    $x4_err = '03' . $x4_err;
    return;
  }
}
