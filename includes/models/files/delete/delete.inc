<?php

namespace X4MediaLibrary\Models\Files;


function delete($id) {
  global $x4_err;

  $res = wp_delete_attachment($id, true);

  if ($res === false) {
    $x4_err = '00' . $x4_err;
    return;
  }
}
