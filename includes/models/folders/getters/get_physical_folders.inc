<?php

namespace X4MediaLibrary\Models\Folders;


function get_physical_folders() {
  $folders = array();

  $folders[] = array(
    'path' => ''
  );

  $paths = namespace\get_physical_folder_paths();

  foreach ($paths as $path) {
    $folders[] = array(
      'path' => $path
    );
  }

  return $folders;
}
