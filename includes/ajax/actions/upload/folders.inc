<?php

namespace X4MediaLibrary\Ajax\actions\upload\folders;

use X4MediaLibrary\Ajax;
use X4MediaLibrary\Models\Folders;
use X4MediaLibrary\Utils\Validators;


add_filter('X4MediaLibrary/nonces', function($nonces) {
  $nonces['actions/upload/folders'] = wp_create_nonce('X4MediaLibrary/actions/upload/folders');
  return $nonces;
});


add_action('wp_ajax_X4MediaLibrary/actions/upload/folders', function() {
  if (!current_user_can('upload_files')) {
    Ajax\forbidden('00');
  }

  if (!check_ajax_referer('X4MediaLibrary/actions/upload/folders', 'nonce', false)) {
    Ajax\forbidden('01');
  }

  if (!isset($_POST['paths'])) {
    Ajax\bad_request('00');
  }

  $paths = $_POST['paths'];

  if (!is_array($paths)) {
    Ajax\bad_request('01');
  }

  foreach ($paths as $path) {
    if (!Validators\is_path($path)) {
      Ajax\bad_request('02');
    }
  }

  $errors = array();

  Folders\sort_shortest($paths);

  foreach ($paths as $path) {
    Folders\create($path);

    if ($x4_err) {
      $errors[] = [$path, '0200' . $x4_err];
      $x4_err = '';
    }
  }

  Ajax\success(
    array(
      'errors' => $errors
    )
  );
});
