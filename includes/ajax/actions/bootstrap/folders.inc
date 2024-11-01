<?php

namespace X4MediaLibrary\Ajax\actions\bootstrap\folders;

use X4MediaLibrary as X4Root;
use X4MediaLibrary\Ajax;
use X4MediaLibrary\Models\Files;
use X4MediaLibrary\Models\Folders;
use X4MediaLibrary\Models\Settings;


add_filter('X4MediaLibrary/nonces', function($nonces) {
  $nonces['actions/bootstrap/folders'] = wp_create_nonce('X4MediaLibrary/actions/bootstrap/folders');
  return $nonces;
});


add_action('wp_ajax_X4MediaLibrary/actions/bootstrap/folders', function() {
  if (!current_user_can('upload_files')) {
    Ajax\forbidden('00');
  }

  if (!check_ajax_referer('X4MediaLibrary/actions/bootstrap/folders', 'nonce', false)) {
    Ajax\forbidden('01');
  }

  $folders = Folders\get_folders();

  foreach ($folders as &$folder) {
    $folder = array(
      $folder['path'],
      $folder['icon'],
      $folder['color']
    );
  }

  $settings = array(
    'limits' => array(
      'bootstrapFilesChunk' => 800,
      'deleteFilesChunk' => 20
    )
  );

  $settings['thumbSize'] = Settings\get_thumb_size();

  $settings['ignoredFolders'] = array();
  $ignored_folders = Settings\get_ignored_folders();

  foreach ($ignored_folders as $path => $ignored_folder) {
    $settings['ignoredFolders'][] = array(
      $path,
      $ignored_folder['reserved'],
      $ignored_folder['ignore']
    );
  }

  $settings['fileExtensions'] = array();
  $file_extensions = Settings\get_file_extensions();

  foreach ($file_extensions as $ext => $file_extension) {
    $settings['fileExtensions'][] = array(
      $ext,
      $file_extension['custom'],
      $file_extension['allowed'],
      $file_extension['mime_type']
    );
  }

  $files_count = Files\get_count();
  $files_limit = 800;

  $files_chunks = ceil($files_count / $files_limit);

  $files = array(
    'limit' => $files_limit,
    'chunks' => $files_chunks
  );

  Ajax\success(array(
    'settings' => $settings,
    'folders' => $folders,
    'files' => $files,
  ));
});
