<?php

namespace X4MediaLibrary\Plugin\System;

use X4MediaLibrary\Utils\Validators;


add_action('admin_init', function() {
  $db_version = get_option('x4_media_library_version');

  if ($db_version === '2.0.5') {
    return;
  }

  if (Validators\is_version($db_version)) {
    $v1 = explode('.', $db_version);
    $v2 = explode('.', '2.0.5');

    $v1 = 10000 * $v1[0] + 100 * $v1[1] + $v1[2];
    $v2 = 10000 * $v2[0] + 100 * $v2[1] + $v2[2];

    if ($v1 < $v2) {
      for ($v = $v1 + 1; $v <= $v2; $v++) {
        $patch_function = 'X4MediaLibrary\Plugin\Patches\patch_' . $v;

        if (function_exists($patch_function)) {
          $patch_function();
        }
      }
    }
  }

  update_option('x4_media_library_version', '2.0.5');
});
