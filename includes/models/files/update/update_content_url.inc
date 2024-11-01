<?php

namespace X4MediaLibrary\Models\Files;


function update_content_url($absurl, $new_absurl) {
  global $wpdb;

  $wpdb->query(
    $wpdb->prepare( 
      "
        UPDATE $wpdb->posts 
        SET post_content = REPLACE(post_content, %s, %s)
        WHERE post_content LIKE %s
      ",
      $absurl,
      $new_absurl,
      '%' . $wpdb->esc_like($absurl) . '%'
    )
  );
}
