<?php

namespace X4MediaLibrary\Ajax\files\rename;

use X4MediaLibrary\Ajax;
use X4MediaLibrary\Models\Files;
use X4MediaLibrary\Utils\Validators;


add_filter('X4MediaLibrary/nonces', function($nonces) {
  $nonces['files/rename'] = wp_create_nonce('X4MediaLibrary/files/rename');
  return $nonces;
});


add_action('wp_ajax_X4MediaLibrary/files/rename', function() {
  if (!current_user_can('upload_files')) {
    Ajax\forbidden('00');
  }

  if (!check_ajax_referer('X4MediaLibrary/files/rename', 'nonce', false)) {
    Ajax\forbidden('01');
  }

  if (!isset($_POST['id'])) {
    Ajax\bad_request('00');
  }

  $id = intval($_POST['id']);

  if (!is_int($id) || $id <= 0) {
    Ajax\bad_request('01');
  }

  if (!isset($_POST['newPath'])) {
    Ajax\bad_request('02');
  }

  $new_path = $_POST['newPath'];

  if (!Validators\is_path($new_path)) {
    Ajax\bad_request('04');
  }

  Files\rename($id, $new_path);
  Ajax\check_error('00');

  Ajax\success();
});
