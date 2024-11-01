<?php

namespace X4MediaLibrary\Models\Files;


function copy($id, $new_path) {
  global $x4_err;

  $uploads = wp_upload_dir(null, false);
  $basedir = $uploads['basedir'];

  $post = get_post($id, ARRAY_A);

  if ($post === null) {
    $x4_err = '00' . $x4_err;
    return;
  }

  $meta = get_post_meta($id);

  if (!isset($meta['_wp_attached_file'])) {
    $x4_err = '01' . $x4_err;
    return;
  }

  $attached_file = $meta['_wp_attached_file'][0];

  $metadata = isset($meta['_wp_attachment_metadata'])
    ? unserialize($meta['_wp_attachment_metadata'][0])
    : null;

  $backup_sizes = isset($meta['_wp_attachment_backup_sizes'])
    ? unserialize($meta['_wp_attachment_backup_sizes'][0])
    : null;

  $copied_files = array();

  $path = $attached_file;
  $dir = pathinfo($path, PATHINFO_DIRNAME);
  $dir = $dir !== '.' ? $dir : '';
  $base = pathinfo($path, PATHINFO_BASENAME);
  $abspath = $basedir . '/' . $path;

  $new_attached_file = $new_path;
  $new_dir = pathinfo($new_path, PATHINFO_DIRNAME);
  $new_dir = $new_dir !== '.' ? $new_dir : '';
  $new_absdir = $basedir . ($new_dir ? '/' . $new_dir : $new_dir);
  $new_abspath = $basedir . '/' . $new_path;

  if ($path === $new_path) {
    $x4_err = '02' . $x4_err;
    return;
  }

  if (!file_exists($abspath)) {
    $x4_err = '03' . $x4_err;
    return;
  }

  if (!is_dir($new_absdir)) {
    $x4_err = '04' . $x4_err;
    return;
  }

  $res = @\copy($abspath, $new_abspath);

  if ($res === false) {
    $x4_err = '05' . $x4_err;
    return;
  }

  $copied_files[$base] = true;

  unset($post['ID']);
  $new_id = wp_insert_post($post);

  if ($new_id === 0) {
    $x4_err = '06' . $x4_err;
    return;
  }

  add_post_meta($new_id, '_wp_attached_file', $new_attached_file);

  if ($metadata) {
    if (isset($metadata['file'])) {
      $metadata['file'] = $new_attached_file;
    }

    if (isset($metadata['sizes'])) {
      foreach ($metadata['sizes'] as $size) {
        $thumb_base = $size['file'];
        $thumb_path = $dir ? $dir . '/' . $thumb_base : $thumb_base;
        $thumb_abspath = $basedir . '/' . $thumb_path;

        $new_thumb_path = $new_dir ? $new_dir . '/' . $thumb_base : $thumb_base;
        $new_thumb_abspath = $basedir . '/' . $new_thumb_path;

        $res = @\copy($thumb_abspath, $new_thumb_abspath);

        if ($res === false) {
          continue;
        }

        $copied_files[$thumb_base] = true;
      }
    }

    add_post_meta($new_id, '_wp_attachment_metadata', $metadata);
  }

  if ($backup_sizes) {
    foreach ($backup_sizes as $backup_size) {
      $bs_base = $backup_size['file'];

      if (isset($copied_files[$bs_base])) {
        continue;
      }

      $bs_path = $dir ? $dir . '/' . $bs_base : $bs_base;
      $bs_abspath = $basedir . '/' . $bs_path;

      $new_bs_path = $new_dir ? $new_dir . '/' . $bs_base : $bs_base;
      $new_bs_abspath = $basedir . '/' . $new_bs_path;

      $res = @\copy($bs_abspath, $new_bs_abspath);

      if ($res === false) {
        continue;
      }

      $copied_files[$bs_base] = true;
    }

    add_post_meta($new_id, '_wp_attachment_backup_sizes', $backup_sizes);
  }

  foreach ($meta as $meta_key => $meta_values) {
    if ($meta_key === '_wp_attached_file' || $meta_key === '_wp_attachment_metadata' || $meta_key === '_wp_attachment_backup_sizes') {
      continue;
    }

    foreach ($meta_values as $meta_value) {
      add_post_meta($new_id, $meta_key, $meta_value);
    }
  }

  return $new_id;
}
