<?php
//required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once "../config/database.php";
include_once "../objects/feeder.php";

// connect to db
$database = new Database();
$connexion = $database->getConnection();

$feeder = new Feeder($connexion);
$data = json_decode(file_get_contents("php://input"));

$feeder->id = $data->id;
$feeder->url = $data->url;

if($feeder->update()) {
  http_response_code(200);
  echo json_encode(array("message" => "Feeder was updated."));
} else {
  http_response_code(400);
  echo json_encode(array("message" => "Unable to update Feeder."));
}
?>
