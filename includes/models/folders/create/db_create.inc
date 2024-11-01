<?php

namespace X4MediaLibrary\Models\Folders;


function db_create($values) {
  global $wpdb, $x4_err;

  $res = $wpdb->insert(
    $wpdb->x4ml_folders,
    array(
      'path' => $values['path'],
      'icon' => isset($values['icon'])
        ? $values['icon']
        : '',
      'color' => isset($values['color'])
        ? $values['color']
        : ''
    ),
    array(
      '%s',
      '%s',
      '%s'
    )
  );

  if ($res === false) {
    $x4_err = '00' . $x4_err;
    return;
  }
}
