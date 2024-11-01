<?php

namespace X4MediaLibrary\Ajax\actions\bootstrap\nonces;

use X4MediaLibrary\Ajax;


add_filter('X4MediaLibrary/nonces', function($nonces) {
  $nonces['actions/bootstrap/nonces'] = wp_create_nonce('X4MediaLibrary/actions/bootstrap/nonces');
  return $nonces;
});


add_action('wp_ajax_X4MediaLibrary/actions/bootstrap/nonces', function() {
  if (!current_user_can('upload_files')) {
    Ajax\forbidden('00');
  }

  $nonces = apply_filters('X4MediaLibrary/nonces', array());

  Ajax\success(array(
    'nonces' => $nonces,
  ));
});
