<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

include_once "../config/database.php";
include_once "../objects/feeder.php";

$database = new Database();
$connection = $database->getConnection();

$feeder = new Feeder($connection);

$stmt = $feeder->read();
$num = $stmt->rowCount();

if($num > 0) {
  $feed_arr = array();
  //$feed_arr["feed"] = array();

  while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    $f = array(
      "id" => $id,
      "url" => $url
    );

    array_push($feed_arr, $f);
  }
  http_response_code(200);
  echo json_encode($feed_arr);
} else {
  http_response_code(404);
  echo json_encode(array("message" => "No feeder found."));
}
?>
