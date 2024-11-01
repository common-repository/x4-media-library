<?php

namespace X4MediaLibrary\Models\Folders;


function get_folders() {
  $folders = array();

  $db_folders = namespace\get_db_folders(true);
  $phy_folders = namespace\get_physical_folders();

  $def_fields = array(
    'icon' => '',
    'color' => ''
  );

  foreach ($phy_folders as $phy_folder) {
    $path = $phy_folder['path'];

    $db_folder = isset($db_folders[$path])
      ? $db_folders[$path]
      : $def_fields;

    $folders[] = array_merge($phy_folder, $db_folder);
  }

  return $folders;
}
