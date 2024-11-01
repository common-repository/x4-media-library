<?php

namespace X4MediaLibrary\Models\Settings;


function ensure_yearmonth() {
  $value = get_option('uploads_use_yearmonth_folders');
  
  if ($value !== '' && $value !== false) {
    update_option('uploads_use_yearmonth_folders', '');
  }
}
