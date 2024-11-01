<?php

namespace X4MediaLibrary\Ajax\actions\delete;

use X4MediaLibrary\Ajax;
use X4MediaLibrary\Models\Folders;
use X4MediaLibrary\Utils\Validators;


add_filter('X4MediaLibrary/nonces', function($nonces) {
  $nonces['actions/delete/folders'] = wp_create_nonce('X4MediaLibrary/actions/delete/folders');
  return $nonces;
});


add_action('wp_ajax_X4MediaLibrary/actions/delete/folders', function() {
  global $x4_err;

  if (!current_user_can('upload_files')) {
    Ajax\forbidden('00');
  }

  if (!check_ajax_referer('X4MediaLibrary/actions/delete/folders', 'nonce', false)) {
    Ajax\forbidden('01');
  }

  if (!isset($_POST['folders'])) {
    Ajax\bad_request('00');
  }

  if (!is_array($_POST['folders'])) {
    Ajax\bad_request('01');
  }

  $folders = array();
  $errors = array();

  foreach ($_POST['folders'] as $path) {
    if (!Validators\is_path($path)) {
      Ajax\bad_request('02');
    }

    $folders[] = $path;
  }

  Folders\sort_longest($folders);

  foreach ($folders as $path) {
    Folders\delete($path);
    
    if ($x4_err) {
      $errors[$path] = '0201' . $x4_err;
      $x4_err = '';
    }
  }

  Ajax\success(
    array(
      'errors' => $errors
    )
  );
});
