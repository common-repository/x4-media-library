<?php

namespace X4MediaLibrary\Models\Files;

use X4MediaLibrary\Utils\Sanitizers;


function get_files($limit = 1000000, $offset = 0) {
  global $wpdb;

  $files = $wpdb->get_results(
    $wpdb->prepare(
      "
        SELECT p.ID,
               p.post_mime_type,
               p.post_date,
               pm1.meta_value AS path
        FROM $wpdb->posts AS p
        LEFT JOIN $wpdb->postmeta AS pm1
          ON p.ID = pm1.post_id
        WHERE p.post_type = %s
          AND pm1.meta_key = %s
        LIMIT %d
        OFFSET %d
      ",
      'attachment',
      '_wp_attached_file',
      $limit,
      $offset
    ),
    ARRAY_A
  );

  foreach ($files as &$file) {
    $file = array(
      'id' => intval($file['ID']),
      'mime' => Sanitizers\mime($file['post_mime_type']),
      'uploaded' => Sanitizers\date($file['post_date']),
      'path' => Sanitizers\path($file['path'])
    );
  }

  return $files;
}
