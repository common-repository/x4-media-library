<?php

namespace X4MediaLibrary\Models\Folders;


function set_table_name() {
  global $wpdb;
  $wpdb->x4ml_folders = $wpdb->prefix . 'x4ml_folders';
}


function ensure_table() {
  global $wpdb;

  $charset_collate = $wpdb->get_charset_collate();
  require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

  dbDelta(
    "
      CREATE TABLE $wpdb->x4ml_folders (
        path varchar(255) NOT NULL DEFAULT '',
        icon varchar(255) NOT NULL DEFAULT '',
        color varchar(255) NOT NULL DEFAULT '',
        KEY path (path(255))
      )
      $charset_collate;
    "
  );
}


function delete_table() {
  global $wpdb;

  $wpdb->query(
    "
      DROP TABLE IF EXISTS $wpdb->x4ml_folders
    "
  );
}


add_action('switch_blog', function() {
  namespace\set_table_name();
});


namespace\set_table_name();
