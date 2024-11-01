<?php

namespace X4MediaLibrary\Ajax\actions\upload\files;

use X4MediaLibrary\Utils\Validators;


add_filter('upload_dir', function($uploads) {
  if (!current_user_can('upload_files')) {
    return $uploads;
  }

  if (!isset($_POST['action']) || $_POST['action'] !== 'upload-attachment') {
    return $uploads;
  }

  if (!isset($_POST['x4path'])) {
    return $uploads;
  }

  $path = $_POST['x4path'];

  if (!Validators\is_path($path)) {
    return $uploads;
  }

  $dir = pathinfo($path, PATHINFO_DIRNAME);
  $dir = $dir !== '.' ? $dir : '';

  $uploads['path'] = $uploads['basedir'] . ($dir ? '/' . $dir : '');
  $uploads['url'] = $uploads['baseurl'] . ($dir ? '/' . $dir : '');

  return $uploads;
}, 10, 1);


add_filter('wp_prepare_attachment_for_js', function($response, $attachment, $meta) {
  if (!current_user_can('upload_files')) {
    return $response;
  }

  if (!isset($_POST['action']) || $_POST['action'] !== 'upload-attachment') {
    return $response;
  }

  if (!isset($_POST['x4path'])) {
    return $response;
  }

  $path = $_POST['x4path'];

  if (!Validators\is_path($path)) {
    return $response;
  }

  $dir = pathinfo($path, PATHINFO_DIRNAME);
  $dir = $dir !== '.' ? $dir : '';

  $response['x4path'] = $dir
    ?  $dir . '/' . $response['filename']
    : $response['filename'];

  return $response;
}, 10, 3);
