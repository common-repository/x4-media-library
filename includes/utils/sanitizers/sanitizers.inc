<?php

namespace X4MediaLibrary\Utils\Sanitizers;

use X4MediaLibrary\Utils\Validators;


function name($value) {
  return Validators\is_name($value) ? $value : '';
}


function path($value) {
  return Validators\is_path($value) ? $value : '';
}


function icon($value) {
  return Validators\is_icon($value) ? $value : '';
}


function color($value) {
  return Validators\is_color($value) ? $value : '';
}


function mime($value) {
  return Validators\is_mime_type($value) ? pathinfo($value, PATHINFO_DIRNAME) : '';
}


function ext($value) {
  return Validators\is_ext($value) ? $value : '';
}


function date($value) {
  return Validators\is_date($value) ? mysql2date('U', $value) : 0;
}
