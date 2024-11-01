<?php

namespace X4MediaLibrary\Models\Files;


function move($id, $new_path, $physical) {
  global $x4_err;

  $uploads = wp_upload_dir(null, false);

  $basedir = $uploads['basedir'];
  $baseurl = $uploads['baseurl'];

  $meta = get_post_meta($id);

  if (!isset($meta['_wp_attached_file'])) {
    $x4_err = '00' . $x4_err;
    return;
  }

  $attached_file = $meta['_wp_attached_file'][0];

  $metadata = isset($meta['_wp_attachment_metadata'])
    ? unserialize($meta['_wp_attachment_metadata'][0])
    : null;

  $backup_sizes = isset($meta['_wp_attachment_backup_sizes'])
    ? unserialize($meta['_wp_attachment_backup_sizes'][0])
    : null;

  $moved_files = array();

  $path = $attached_file;
  $dir = pathinfo($path, PATHINFO_DIRNAME);
  $dir = $dir !== '.' ? $dir : '';
  $base = pathinfo($path, PATHINFO_BASENAME);
  $abspath = $basedir . '/' . $path;
  $absurl = $baseurl . '/' . $path;

  $new_attached_file = $new_path;
  $new_dir = pathinfo($new_path, PATHINFO_DIRNAME);
  $new_dir = $new_dir !== '.' ? $new_dir : '';
  $new_absdir = $basedir . ($new_dir ? '/' . $new_dir : $new_dir);
  $new_abspath = $basedir . '/' . $new_path;
  $new_absurl = $baseurl . '/' . $new_path;

  if ($path === $new_path) {
    $x4_err = '01' . $x4_err;
    return;
  }

  if ($physical) {
    if (!file_exists($abspath)) {
      $x4_err = '02' . $x4_err;
      return;
    }

    if (!is_dir($new_absdir)) {
      $x4_err = '03' . $x4_err;
      return;
    }

    $res = @\rename($abspath, $new_abspath);

    if ($res === false) {
      $x4_err = '03' . $x4_err;
      return;
    }

    $moved_files[$base] = true;
  }

  namespace\update_content_url($absurl, $new_absurl);

  update_post_meta($id, '_wp_attached_file', $new_attached_file);

  if ($metadata) {
    if (isset($metadata['file'])) {
      $metadata['file'] = $new_attached_file;
      update_post_meta($id, '_wp_attachment_metadata', $metadata);
    }

    if (isset($metadata['sizes'])) {
      foreach ($metadata['sizes'] as $size) {
        $thumb_base = $size['file'];
        $thumb_path = $dir ? $dir . '/' . $thumb_base : $thumb_base;
        $thumb_abspath = $basedir . '/' . $thumb_path;
        $thumb_absurl = $baseurl . '/' . $thumb_path;

        $new_thumb_path = $new_dir ? $new_dir . '/' . $thumb_base : $thumb_base;
        $new_thumb_abspath = $basedir . '/' . $new_thumb_path;
        $new_thumb_absurl = $baseurl . '/' . $new_thumb_path;

        if ($physical) {
          $res = @\rename($thumb_abspath, $new_thumb_abspath);

          if ($res === false) {
            continue;
          }

          $moved_files[$thumb_base] = true;
        }

        namespace\update_content_url($thumb_absurl, $new_thumb_absurl);
      }
    }
  }

  if ($backup_sizes) {
    foreach ($backup_sizes as $backup_size) {
      $bs_base = $backup_size['file'];

      if (isset($moved_files[$bs_base])) {
        continue;
      }

      $bs_path = $dir ? $dir . '/' . $bs_base : $bs_base;
      $bs_abspath = $basedir . '/' . $bs_path;
      $bs_absurl = $baseurl . '/' . $bs_path;

      $new_bs_path = $new_dir ? $new_dir . '/' . $bs_base : $bs_base;
      $new_bs_abspath = $basedir . '/' . $new_bs_path;
      $new_bs_absurl = $baseurl . '/' . $new_bs_path;

      if ($physical) {
        $res = @\rename($bs_abspath, $new_bs_abspath);

        if ($res === false) {
          continue;
        }

        $moved_files[$bs_base] = true;
      }

      namespace\update_content_url($bs_absurl, $new_bs_absurl);
    }
  }
}
