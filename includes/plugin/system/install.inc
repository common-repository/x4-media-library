<?php

namespace X4MediaLibrary\Plugin\System;

use X4MediaLibrary as X4Root;
use X4MediaLibrary\Models\Folders;
use X4MediaLibrary\Models\Settings;


add_filter('plugin_action_links_x4-media-library/x4-media-library.php', function($actions, $plugin_file, $plugin_data, $context) {
  $url = esc_url('https://codecanyon.net/item/x4-media-library-for-wordpress/24017686');

  $style = esc_attr__('color: #ff1744; font-weight: 600;');
  $label = esc_html__('Buy Premium', 'x4-media-library');

  $actions[] = '<a target="_blank" href="' . $url . '" style="' . $style . '">' . $label . '</a>';

  return $actions;
}, 10, 4);


register_activation_hook(X4Root\ROOT_FILE, function($network_wide) {
  if (is_multisite() && $network_wide) {
    $sites = get_sites();

    $cur_blog_id = get_current_blog_id();

    foreach ($sites as $site) {
      switch_to_blog($site->blog_id);
      namespace\install_blog();
    }

    switch_to_blog($cur_blog_id);
  } else {
    namespace\install_blog();
  }
});


add_action('wpmu_new_blog', function($blog_id) {
  $cur_blog_id = get_current_blog_id();
  switch_to_blog($blog_id);

  namespace\install_blog();

  switch_to_blog($cur_blog_id);
}, 10, 1);


add_action('deleted_blog', function($blog_id, $drop) {
  if ($drop) {
    $cur_blog_id = get_current_blog_id();
    switch_to_blog($blog_id);

    namespace\remove_blog();

    switch_to_blog($cur_blog_id);
  }
}, 10, 2);


function install_blog() {
  Settings\ensure_yearmonth();
  Folders\ensure_table();
}


function remove_blog() {
  Folders\delete_table();
}