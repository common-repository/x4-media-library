<?php

namespace X4MediaLibrary\Ajax\folders\rename;

use X4MediaLibrary\Ajax;
use X4MediaLibrary\Models\Folders;
use X4MediaLibrary\Models\Files;
use X4MediaLibrary\Utils\Validators;


add_filter('X4MediaLibrary/nonces', function($nonces) {
  $nonces['folders/rename'] = wp_create_nonce('X4MediaLibrary/folders/rename');
  return $nonces;
});


add_action('wp_ajax_X4MediaLibrary/folders/rename', function() {
  if (!current_user_can('upload_files')) {
    Ajax\forbidden('00');
  }

  if (!check_ajax_referer('X4MediaLibrary/folders/rename', 'nonce', false)) {
    Ajax\forbidden('01');
  }

  if (!isset($_POST['path'])) {
    Ajax\bad_request('00');
  }

  $path = $_POST['path'];

  if (!Validators\is_path($path)) {
    Ajax\bad_request('01');
  }

  if (!isset($_POST['newPath'])) {
    Ajax\bad_request('02');
  }

  $new_path = $_POST['newPath'];

  if (!Validators\is_path($new_path)) {
    Ajax\bad_request('03');
  }

  $folders = array();
  $files = array();

  if (isset($_POST['folders'])) {
    $items = $_POST['folders'];

    if (!is_array($items)) {
      Ajax\bad_request('04');
    }

    foreach ($items as $item) {
      if (!is_array($item) || count($item) !== 2) {
        Ajax\bad_request('05');
      }

      $subpath = $item[0];
      $new_subpath = $item[1];

      if (!Validators\is_path($subpath)) {
        Ajax\bad_request('06');
      }

      if (!Validators\is_path($new_subpath)) {
        Ajax\bad_request('07');
      }

      $folders[$subpath] = $new_subpath;
    }
  }

  if (isset($_POST['files'])) {
    $items = $_POST['files'];

    if (!is_array($items)) {
      Ajax\bad_request('08');
    }

    foreach ($items as $item) {
      if (!is_array($item) || count($item) !== 2) {
        Ajax\bad_request('09');
      }

      $subid = intval($item[0]);
      $new_subpath = $item[1];

      if (!is_int($subid) || $subid <= 0) {
        Ajax\bad_request('10');
      }

      if (!Validators\is_path($new_subpath)) {
        Ajax\bad_request('11');
      }

      $files[$subid] = $new_subpath;
    }
  }

  $err_folders = array();
  $err_files = array();

  Folders\rename($path, $new_path, true);
  Ajax\check_error('00');

  foreach ($folders as $subpath => $new_subpath) {
    Folders\rename($subpath, $new_subpath, false);
    
    if ($x4_err) {
      $err_folders[] = [$subpath, '0201' . $x4_err];
      $x4_err = '';
    }
  }

  foreach ($files as $subid => $new_subpath) {
    Files\move($subid, $new_subpath, false);

    if ($x4_err) {
      $err_files[] = [$subid, '0202' . $x4_err];
      $x4_err = '';
    }
  }

  Ajax\success(
    array(
      'errors' => array(
        'folders' => $err_folders,
        'files' => $err_files
      )
    )
  );
});
