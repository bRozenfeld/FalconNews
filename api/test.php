<?php
  $arr = array();
  $a = array("url" => "lloliol");
  array_push($arr, $a);
  print_r($arr);
  echo $arr[0]["url"];
  unset($arr[0]);
  print_r($arr);
?>
