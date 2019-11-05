<?php
//required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");

include_once "../config/database.php";
include_once "../objects/news.php";

$database = new Database();
$connection = $database->getConnection();

$news = new News($connection);
$data = json_decode(file_get_contents("php://input"));

$news->id = $data->id;
$news->isDisplayed = $data->isDisplayed;
$news->priority = $data->priority;

if($news->update()) {
  http_response_code(200);
  echo json_encode(array("message" => "News was updated."));
} else {
  http_response_code(400);
  echo json_encode(array("message" => "Unable to update News."));
}

?>
