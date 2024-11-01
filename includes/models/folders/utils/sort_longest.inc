<?php

namespace X4MediaLibrary\Models\Folders;


function sort_longest(&$folders, $by_key = false) {
  if ($by_key) {
    uksort($folders, 'namespace\sort_longest_callback');
  } else {
    usort($folders, 'namespace\sort_longest_callback');
  }
}


function sort_longest_callback($path1, $path2) {
  $count1 = substr_count($path1, '/');
  $count2 = substr_count($path2, '/');

  if ($count1 < $count2) return -1;
  if ($count1 > $count2) return 1;

  return 0;
}
