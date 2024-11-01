<?php

namespace X4MediaLibrary\Models\Settings;

use X4MediaLibrary\Utils\Validators;


function get_custom_mime_types() {
  $default = array(
    'enable' => array(),
    'disable' => array(),
    'custom' => array()
  );

  $value = get_option('x4_media_library_mime_types', $default);

  if (!is_array($value)) {
    $value = array();
  }

  if (!isset($value['enable']) || !is_array($value['enable'])) {
    $value['enable'] = array();
  }

  if (!isset($value['disable']) || !is_array($value['disable'])) {
    $value['disable'] = array();
  }

  if (!isset($value['custom']) || !is_array($value['custom'])) {
    $value['custom'] = array();
  }

  foreach ($value['enable'] as $index => $ext) {
    if (!Validators\is_ext($ext)) {
      unset($value['enable'][$ext]);
    }
  }

  foreach ($value['disable'] as $index => $ext) {
    if (!Validators\is_ext($ext)) {
      unset($value['disable'][$ext]);
    }
  }

  foreach ($value['custom'] as $ext => $mime_type) {
    if (!Validators\is_ext($ext) || !Validators\is_mime_type($mime_type)) {
      unset($value['custom'][$ext]);
    }
  }

  return $value;
}
