<?php

namespace X4MediaLibrary\Models\Folders;

use X4MediaLibrary\Utils\Sanitizers;


function get_db_folder($path) {
  global $wpdb;

  $folder = $wpdb->get_row(
    $wpdb->prepare(
      "
        SELECT path,
               icon,
               color
        FROM $wpdb->x4ml_folders
        WHERE path = %s
      ",
      $path
    ),
    ARRAY_A
  );

  if ($folder === null) {
    return null;
  }

  $folder = array(
    'path' => Sanitizers\path($folder['path']),
    'icon' => Sanitizers\icon($folder['icon']),
    'color' => Sanitizers\color($folder['color'])
  );

  return $folder;
}
