<?php

namespace X4MediaLibrary\Plugin\Bootstrap;


function get_localize() {
  global $pagenow;

  $uploads = wp_upload_dir(null, false);

  $settings = array(
    'pluginUrl' => plugins_url('x4-media-library'),
    'uploadsUrl' => $uploads['baseurl'],
    'adminUrl' => admin_url()
  );

  $nonces = apply_filters('X4MediaLibrary/nonces', array());

  return array(
    'settings' => $settings,
    'nonces' => $nonces
  );
}
