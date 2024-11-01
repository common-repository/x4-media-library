<?php

namespace X4MediaLibrary\Models\Folders;


function get_folder($path) {
  $db_folder = namespace\get_db_folder($path);
  $phy_folder = namespace\get_physical_folder($path);

  if ($phy_folder === null) {
    return null;
  }

  if ($db_folder === null) {
    $db_folder = array(
      'icon' => '',
      'color' => ''
    );
  }

  $folder = array_merge($phy_folder, $db_folder);

  return $folder;
}
