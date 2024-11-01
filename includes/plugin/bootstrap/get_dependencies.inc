<?php

namespace X4MediaLibrary\Plugin\Bootstrap;


function get_dependencies() {
  global $pagenow;

  $deps = array(
    'jquery'
  );

  if ($pagenow !== 'upload.php') {
    $deps[] = 'media-editor';
    $deps[] = 'media-upload';
  } else {
    $deps[] = 'media-grid';
    $deps[] = 'media';
  }

  if (function_exists('wp_set_script_translations')) {
    $deps[] = 'wp-i18n';
  }

  return $deps;
}
