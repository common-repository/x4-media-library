<?php

namespace X4MediaLibrary\Models\Folders;


function db_ensure($path) {
  global $wpdb, $x4_err;

  $count = $wpdb->get_var(
    $wpdb->prepare(
      "
        SELECT COUNT(*)
        FROM $wpdb->x4ml_folders
        WHERE path = %s
      ",
      $path
    )
  );

  $count = intval($count);

  if ($count > 0) {
    return;
  }

  $values = array('path' => $path);
  namespace\db_create($values);

  if ($x4_err) {
    $x4_err = '00' . $x4_err;
    return;
  }
}
