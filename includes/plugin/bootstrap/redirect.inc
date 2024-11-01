<?php

namespace X4MediaLibrary\Plugin\Bootstrap;


add_action('admin_init', function() {
  global $pagenow;

  if ($pagenow !== 'upload.php') {
    return;
  }

  $cur_user_id = get_current_user_id();
  $mode = get_user_option('media_library_mode', $cur_user_id);

  if ($mode === 'list') {
    update_user_option($cur_user_id, 'media_library_mode', 'grid');
  }

  if (isset($_GET['mode']) || isset($_GET['item']) || isset($_GET['search'])) {
    wp_redirect(admin_url('upload.php'));
    exit;
  }
});
