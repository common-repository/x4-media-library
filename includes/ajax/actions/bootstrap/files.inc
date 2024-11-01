<?php

namespace X4MediaLibrary\Ajax\actions\bootstrap\files;

use X4MediaLibrary as X4Root;
use X4MediaLibrary\Ajax;
use X4MediaLibrary\Models\Files;


add_filter('X4MediaLibrary/nonces', function($nonces) {
  $nonces['actions/bootstrap/files'] = wp_create_nonce('X4MediaLibrary/actions/bootstrap/files');
  return $nonces;
});


add_action('wp_ajax_X4MediaLibrary/actions/bootstrap/files', function() {
  if (!current_user_can('upload_files')) {
    Ajax\forbidden('00');
  }

  if (!check_ajax_referer('X4MediaLibrary/actions/bootstrap/files', 'nonce', false)) {
    Ajax\forbidden('01');
  }

  if (!isset($_POST['offset'])) {
    Ajax\bad_request('00');
  }

  $offset = intval($_POST['offset']);

  if (!is_int($offset) || $offset < 0) {
    Ajax\bad_request('01');
  }

  $limit = 800;

  $files = Files\get_files($limit, $offset);

  foreach ($files as &$file) {
    $file = array(
      $file['id'],
      $file['mime'],
      $file['uploaded'],
      $file['path']
    );
  }

  Ajax\success(array(
    'files' => $files,
  ));
});
