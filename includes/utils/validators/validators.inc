<?php

namespace X4MediaLibrary\Utils\Validators;


function is_version($value) {
  return is_string($value) && preg_match('/^\d+\.\d+\.\d+$/', $value);
}


function is_name($value) {
  return is_string($value) && preg_match('/^[^\/:*?"<>|\\\\]*$/', $value);
}


function is_path($value) {
  return is_string($value) && substr($value, 0, 1) !== '/' && substr($value, -1, 1) !== '/' && preg_match('/^[^:*?"<>|\\\\]*$/', $value);
}


function is_icon($value) {
  return is_string($value) && preg_match('/^[a-z0-9_]+$/', $value);
}


function is_color($value) {
  return is_string($value) && preg_match('/^[a-z_]+:[0-9]+$/', $value);
}


function is_mime_type($value) {
  return is_string($value) && preg_match('/^[a-z0-9]+\/[a-z0-9.-\\\+]+$/', $value);
}


function is_ext($value) {
  return is_string($value) && preg_match('/^[a-z0-9]+$/', $value);
}


function is_date($value) {
  return is_string($value) && mysql2date('U', $value) !== false;
}
