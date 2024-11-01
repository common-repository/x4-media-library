<?php

namespace X4MediaLibrary\Models\Files;


function rename($id, $new_path) {
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

  $renamed_files = array();
  $metadata_changed = false;
  $backup_sizes_changed = false;

  $path = $attached_file;
  $dir = pathinfo($path, PATHINFO_DIRNAME);
  $dir = $dir !== '.' ? $dir : '';
  $base = pathinfo($path, PATHINFO_BASENAME);
  $name = pathinfo($path, PATHINFO_FILENAME);
  $ext = pathinfo($path, PATHINFO_EXTENSION);
  $abspath = $basedir . '/' . $path;
  $absurl = $baseurl . '/' . $path;

  $new_attached_file = $new_path;
  $new_base = pathinfo($new_path, PATHINFO_BASENAME);
  $new_name = pathinfo($new_path, PATHINFO_FILENAME);
  $new_abspath = $basedir . '/' . $new_path;
  $new_absurl = $baseurl . '/' . $new_path;

  if ($path === $new_path) {
    $x4_err = '01' . $x4_err;
    return;
  }

  if (!file_exists($abspath)) {
    $x4_err = '02' . $x4_err;
    return;
  }

  if ($backup_sizes && file_exists($new_abspath)) {
    namespace\rename_unique_backup_size($backup_sizes, $renamed_files, $dir, $new_base, $new_abspath, $new_absurl);
  }

  $res = @\rename($abspath, $new_abspath);

  if ($res === false) {
    $x4_err = '03' . $x4_err;
    return;
  }

  $renamed_files[$base] = $new_base;

  namespace\update_content_url($absurl, $new_absurl);

  update_post_meta($id, '_wp_attached_file', $new_attached_file);

  if ($metadata) {
    if (isset($metadata['file'])) {
      $metadata['file'] = $new_attached_file;
      $metadata_changed = true;
    }

    if (isset($metadata['sizes'])) {
      foreach ($metadata['sizes'] as $key => $size) {
        $thumb_base = $size['file'];
        $thumb_path = $dir ? $dir . '/' . $thumb_base : $thumb_base;
        $thumb_abspath = $basedir . '/' . $thumb_path;
        $thumb_absurl = $baseurl . '/' . $thumb_path;

        $new_thumb_base = $new_name . '-' . $size['width'] . 'x' . $size['height'] . '.' . $ext;
        $new_thumb_path = $dir ? $dir . '/' . $new_thumb_base : $new_thumb_base;
        $new_thumb_abspath = $basedir . '/' . $new_thumb_path;
        $new_thumb_absurl = $baseurl . '/' . $new_thumb_path;

        if ($backup_sizes && file_exists($new_thumb_abspath)) {
          namespace\rename_unique_backup_size($backup_sizes, $renamed_files, $dir, $new_thumb_base, $new_thumb_abspath, $new_thumb_absurl);
        }

        $res = @\rename($thumb_abspath, $new_thumb_abspath);

        if ($res === false) {
          continue;
        }

        $renamed_files[$thumb_base] = $new_thumb_base;
        $metadata['sizes'][$key]['file'] = $new_thumb_base;
        $metadata_changed = true;

        namespace\update_content_url($thumb_absurl, $new_thumb_absurl);
      }
    }

    if ($metadata_changed) {
      update_post_meta($id, '_wp_attachment_metadata', $metadata);
    }
  }

  if ($backup_sizes) {
    foreach ($backup_sizes as $key => $backup_size) {
      $bs_base = $backup_size['file'];

      if (!isset($renamed_files[$bs_base])) {
        continue;
      }

      $backup_sizes[$key]['file'] = $renamed_files[$bs_base];
      $backup_sizes_changed = true;
    }

    if ($backup_sizes_changed) {
      update_post_meta($id, '_wp_attachment_backup_sizes', $backup_sizes);
    }
  }
}


function rename_unique_backup_size(&$backup_sizes, &$renamed_files, $dir, $new_base, $new_abspath, $new_absurl) {
  $uploads = wp_upload_dir(null, false);

  $basedir = $uploads['basedir'];
  $baseurl = $uploads['baseurl'];

  foreach ($backup_sizes as &$backup_size) {
    if ($new_base !== $backup_size['file']) {
      continue;
    }

    $bs_base = $backup_size['file'];
    $bs_absdir = $dir ? $basedir . '/' . $dir : $basedir;
    $new_bs_base = wp_unique_filename($bs_absdir, $new_base);
    $new_bs_path = $dir ? $dir . '/' . $new_bs_base : $new_bs_base;
    $new_bs_abspath = $basedir . '/' . $new_bs_path;
    $new_bs_absurl = $baseurl . '/' . $new_bs_path;

    $res = @\rename($new_abspath, $new_bs_abspath);

    if ($res === false) {
      break;
    }

    namespace\update_content_url($new_absurl, $new_bs_absurl);

    $renamed_files[$bs_base] = $new_bs_base;
    $backup_size['file'] = $new_bs_base;

    break;
  }
}
