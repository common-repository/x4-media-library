<?php

namespace X4MediaLibrary\Models\Folders;

use X4MediaLibrary\Utils\Sanitizers;


function get_db_folders($keyed = false) {
  global $wpdb;

  $folders = $wpdb->get_results(
    "
      SELECT path,
             icon,
             color
      FROM $wpdb->x4ml_folders
    ",
    ARRAY_A
  );

  foreach ($folders as &$folder) {
    $folder = array(
      'path' => Sanitizers\path($folder['path']),
      'icon' => Sanitizers\icon($folder['icon']),
      'color' => Sanitizers\color($folder['color'])
    );
  }

  if ($keyed) {
    $folders = array_column($folders, null, 'path');
  }

  return $folders;
}
