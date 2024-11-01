<?php

namespace X4MediaLibrary\Models\Folders;


function sort_shortest(&$folders, $by_key = false) {
  if ($by_key) {
    uksort($folders, 'namespace\sort_shortest_callback');
  } else {
    usort($folders, 'namespace\sort_shortest_callback');
  }
}


function sort_shortest_callback($path1, $path2) {
  $count1 = substr_count($path1, '/');
  $count2 = substr_count($path2, '/');

  if ($count1 < $count2) return -1;
  if ($count1 > $count2) return 1;

  return 0;
}
