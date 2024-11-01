<?php

namespace X4MediaLibrary\Ajax\actions\delete;

use X4MediaLibrary\Ajax;
use X4MediaLibrary\Models\Files;
use X4MediaLibrary\Utils\Validators;


add_filter('X4MediaLibrary/nonces', function($nonces) {
  $nonces['actions/delete/files'] = wp_create_nonce('X4MediaLibrary/actions/delete/files');
  return $nonces;
});


add_action('wp_ajax_X4MediaLibrary/actions/delete/files', function() {
  global $x4_err;

  if (!current_user_can('upload_files')) {
    Ajax\forbidden('00');
  }

  if (!check_ajax_referer('X4MediaLibrary/actions/delete/files', 'nonce', false)) {
    Ajax\forbidden('01');
  }

  if (!isset($_POST['files'])) {
    Ajax\bad_request('00');
  }

  if (!is_array($_POST['files'])) {
    Ajax\bad_request('01');
  }

  $files = array();
  $errors = array();

  foreach ($_POST['files'] as $id) {
    $id = intval($id);

    if (!is_int($id) || $id <= 0) {
      Ajax\bad_request('02');
    }

    $files[] = $id;
  }

  foreach ($files as $id) {
    Files\delete($id);
    
    if ($x4_err) {
      $errors[$id] = '0200' . $x4_err;
      $x4_err = '';
    }
  }

  Ajax\success(
    array(
      'errors' => $errors
    )
  );
});
