<?php

namespace X4MediaLibrary\Models\Folders;

use X4MediaLibrary\Models\Settings;


function get_physical_folder_paths() {
  $paths = array();

  $uploads = wp_upload_dir(null, false);
  $basedir = $uploads['basedir'];

  $exclude_folders = array();
  $ignored_folders = Settings\get_ignored_folders();

  foreach ($ignored_folders as $path => $value) {
    if ($value['ignore']) {
      $exclude_folders[] = $uploads['basedir'] . '/' . $path;
    }
  }

  $directory_iterator = new \RecursiveDirectoryIterator($basedir, \FilesystemIterator::SKIP_DOTS | \FilesystemIterator::UNIX_PATHS);

  $filter_iterator = new \RecursiveCallbackFilterIterator($directory_iterator, function($info, $path, $iterator) use ($exclude_folders) {
    if (!$info->isDir()) {
      return false;
    }

    if (in_array($path, $exclude_folders)) {
      return false;
    }

    return true;
  });

  $iterator = new \RecursiveIteratorIterator($filter_iterator, \RecursiveIteratorIterator::SELF_FIRST);

  foreach ($iterator as $path => $info) {
    if (!$info->isDir()) {
      continue;
    }

    $paths[] = substr($path, strlen($basedir) + 1);
  }

  sort($paths, SORT_STRING);

  return $paths;
}
