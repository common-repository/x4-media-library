<?php

namespace X4MediaLibrary\Models\Files;


function get_count() {
  global $wpdb;

  $count = $wpdb->get_var(
    $wpdb->prepare(
      "
        SELECT COUNT(*)
        FROM $wpdb->posts
        WHERE post_type = %s
      ",
      'attachment'
    )
  );

  $count = intval($count);

  return $count;
}
