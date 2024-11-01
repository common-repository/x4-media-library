<?php

namespace X4MediaLibrary\Ajax\folders\create;

use X4MediaLibrary\Ajax;
use X4MediaLibrary\Models\Folders;
use X4MediaLibrary\Utils\Validators;


add_filter('X4MediaLibrary/nonces', function($nonces) {
  $nonces['folders/create'] = wp_create_nonce('X4MediaLibrary/folders/create');
  return $nonces;
});


add_action('wp_ajax_X4MediaLibrary/folders/create', function() {
  if (!current_user_can('upload_files')) {
    Ajax\forbidden('00');
  }

  if (!check_ajax_referer('X4MediaLibrary/folders/create', 'nonce', false)) {
    Ajax\forbidden('01');
  }

  if (!isset($_POST['path'])) {
    Ajax\bad_request('00');
  }

  $path = $_POST['path'];

  if (!Validators\is_path($path)) {
    Ajax\bad_request('01');
  }

  Folders\create($path);
  Ajax\check_error('00');

  Ajax\success();
});
