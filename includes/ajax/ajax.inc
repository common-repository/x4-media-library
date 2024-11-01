<?php

namespace X4MediaLibrary\Ajax;


function success($resp = true) {
  wp_send_json_success($resp);
}


function forbidden($code) {
  global $x4_err;
  wp_send_json_error('00' . $code . $x4_err);
}


function bad_request($code) {
  global $x4_err;
  wp_send_json_error('01' . $code . $x4_err);
}


function server_error($code) {
  global $x4_err;
  wp_send_json_error('02' . $code . $x4_err);
}


function check_error($code) {
  global $x4_err;

  if ($x4_err) {
    namespace\server_error($code);
  }
}
