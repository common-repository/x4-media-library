<?php

namespace X4MediaLibrary\Models\Settings;


add_filter('upload_mimes', function($mime_types) {
  $x4_mime_types = namespace\get_custom_mime_types();

  if (count($x4_mime_types['enable']) === 0 && count($x4_mime_types['disable']) === 0 && count($x4_mime_types['custom']) === 0) {
    return $mime_types;
  }

  $mime_types_by_ext = array();
  $mime_types_by_mime = array();

  foreach ($mime_types as $ext_list => $mime_type) {
    $ext_list = explode('|', $ext_list);

    foreach ($ext_list as $ext) {
      $mime_types_by_ext[$ext] = $mime_type;
    }
  }

  foreach ($x4_mime_types['custom'] as $ext => $mime_type) {
    $mime_types_by_ext[$ext] = $mime_type;
  }

  if (count($x4_mime_types['enable']) > 0) {
    $wp_mime_types = wp_get_mime_types();
    $wp_mime_types_by_ext = array();

    foreach ($wp_mime_types as $ext_list => $mime_type) {
      $ext_list = explode('|', $ext_list);

      foreach ($ext_list as $ext) {
        $wp_mime_types_by_ext[$ext] = $mime_type;
      }
    }

    foreach ($x4_mime_types['enable'] as $ext) {
      if (isset($wp_mime_types_by_ext[$ext])) {
        $mime_types_by_ext[$ext] = $wp_mime_types_by_ext[$ext];
      }
    }
  }

  foreach ($x4_mime_types['disable'] as $ext) {
    if (isset($mime_types_by_ext[$ext])) {
      unset($mime_types_by_ext[$ext]);
    }
  }

  foreach ($mime_types_by_ext as $ext => $mime_type) {
    if (isset($mime_types_by_mime[$mime_type])) {
      $mime_types_by_mime[$mime_type] .= '|' . $ext;
    } else {
      $mime_types_by_mime[$mime_type] = $ext;
    }
  }

  $mime_types = array_flip($mime_types_by_mime);

  return $mime_types;
}, 1000, 1);
