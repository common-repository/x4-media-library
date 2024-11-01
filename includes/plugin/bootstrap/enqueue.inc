<?php

namespace X4MediaLibrary\Plugin\Bootstrap;

use X4MediaLibrary as X4Root;


add_action('wp_enqueue_media', function() {
  if (wp_script_is('x4-media-library', 'enqueued')) {
    return;
  }

  wp_enqueue_style('x4-media-library-fonts', 'https://fonts.googleapis.com/css?family=Roboto:400,500,700|Material+Icons', array(), null);
  wp_enqueue_style('x4-media-library', plugins_url('assets/x4-media-library.min.css', X4Root\ROOT_FILE), array(), '2.0.5');
  wp_enqueue_script('x4-media-library', plugins_url('assets/x4-media-library.min.js', X4Root\ROOT_FILE), namespace\get_dependencies(), '2.0.5', true);

  if (function_exists('wp_set_script_translations')) {
    wp_set_script_translations('x4-media-library', 'x4-media-library');
  }

  wp_localize_script('x4-media-library', 'X4MediaLibrary', namespace\get_localize());
});
