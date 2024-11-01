<?php

namespace X4MediaLibrary\Models\Settings;


function get_file_extensions() {
  $result = array();

  $wp_mime_types = wp_get_mime_types();
  $allowed_mime_types = get_allowed_mime_types();
  $x4_mime_types = namespace\get_custom_mime_types();

  foreach ($wp_mime_types as $ext_list => $mime_type) {
    $ext_list = explode('|', $ext_list);

    foreach ($ext_list as $ext) {
      $result[$ext] = array(
        'custom' => false,
        'allowed' => false,
        'mime_type' => $mime_type
      );
    }
  }

  foreach ($x4_mime_types['custom'] as $ext => $mime_type) {
    $result[$ext] = array(
      'custom' => true,
      'allowed' => false,
      'mime_type' => $mime_type
    );
  }

  foreach ($allowed_mime_types as $ext_list => $mime_type) {
    $ext_list = explode('|', $ext_list);

    foreach ($ext_list as $ext) {
      if (!isset($result[$ext])) {
        $result[$ext] = array(
          'custom' => false,
          'allowed' => true,
          'mime_type' => $mime_type
        );
      } else {
        $result[$ext]['allowed'] = true;
      }
    }
  }

  return $result;
}
