<?php

namespace X4MediaLibrary\Models\Settings;


function get_thumb_size() {
  $width = get_option('thumbnail_size_w', 150);
  $height = get_option('thumbnail_size_h', 150);

  $width = intval($width);
  $height = intval($height);

  return array(
    'width' => $width,
    'height' => $height
  );
}
