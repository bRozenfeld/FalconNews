<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once "../config/database.php";
include_once "../objects/feeder.php";

// connect to db
$database = new Database();
$connection = $database->getConnection();

$feeder = new Feeder($connection);

$json = file_get_contents("php://input");
$data = json_decode($json);

if(!empty($data->id)) {
  $feeder->id = $data->id;

  if($feeder->delete()) {
    http_response_code(200);
    echo json_encode(array("message" => "URL RSS was deleted successfully"));
  }
} else {
  http_response_code(400);
  echo json_encode(array("message" => "Unable to delete this feed. Data is incomplete"));
}

?>
