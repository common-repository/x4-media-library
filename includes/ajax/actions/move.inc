<?php

namespace X4MediaLibrary\Ajax\actions\move;

use X4MediaLibrary\Ajax;
use X4MediaLibrary\Models\Folders;
use X4MediaLibrary\Models\Files;
use X4MediaLibrary\Utils\Validators;


add_filter('X4MediaLibrary/nonces', function($nonces) {
  $nonces['actions/move'] = wp_create_nonce('X4MediaLibrary/actions/move');
  return $nonces;
});


add_action('wp_ajax_X4MediaLibrary/actions/move', function() {
  global $x4_err;

  if (!current_user_can('upload_files')) {
    Ajax\forbidden('00');
  }

  if (!check_ajax_referer('X4MediaLibrary/actions/move', 'nonce', false)) {
    Ajax\forbidden('01');
  }

  if (!isset($_POST['folders']) && !isset($_POST['files'])) {
    Ajax\bad_request('00');
  }

  $folders = array();
  $files = array();

  if (isset($_POST['folders'])) {
    $items = $_POST['folders'];

    if (!is_array($items)) {
      Ajax\bad_request('01');
    }

    foreach ($items as $item) {
      if (!is_array($item) || (count($item) !== 2 && count($item) !== 3)) {
        Ajax\bad_request('02');
      }

      $path = $item[0];
      $new_path = $item[1];
      $physical = isset($item[2]) && intval($item[2]) === 1;

      if (!Validators\is_path($path)) {
        Ajax\bad_request('03');
      }

      if (!Validators\is_path($new_path)) {
        Ajax\bad_request('04');
      }

      $folders[$path] = array(
        'physical' => $physical,
        'path' => $new_path,
      );
    }
  }

  if (isset($_POST['files'])) {
    $items = $_POST['files'];

    if (!is_array($items)) {
      Ajax\bad_request('05');
    }

    foreach ($items as $item) {
      if (!is_array($item) || (count($item) !== 2 && count($item) !== 3)) {
        Ajax\bad_request('06');
      }

      $id = intval($item[0]);
      $new_path = $item[1];
      $physical = isset($item[2]) && intval($item[2]) === 1;

      if (!is_int($id) || $id <= 0) {
        Ajax\bad_request('07');
      }

      if (!Validators\is_path($new_path)) {
        Ajax\bad_request('08');
      }

      $files[$id] = array(
        'physical' => $physical,
        'path' => $new_path,
      );
    }
  }

  $err_folders = array();
  $err_files = array();

  Folders\sort_shortest($folders, true);

  foreach ($folders as $path => $item) {
    Folders\move($path, $item['path'], $item['physical']);
    
    if ($x4_err) {
      $err_folders[] = [$path, '0200' . $x4_err];
      $x4_err = '';
    }
  }

  foreach ($files as $id => $item) {
    Files\move($id, $item['path'], $item['physical']);
    
    if ($x4_err) {
      $err_files[] = [$id, '0201' . $x4_err];
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
