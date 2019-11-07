<?php
//required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once "../config/database.php";
include_once "../objects/news.php";

$database = new Database();
$connection = $database->getConnection();

$news = new News($connection);
$data = file_get_contents("php://input");
$json = json_decode($data);

$news->id = $json->id;
$news->isDisplayed = $json->is_displayed;
$news->priority = $json->priority;

if($news->update()) {
  http_response_code(200);
echo json_encode(array("message" => "News was updated." /*. print_r($json)*/));
} else {
  http_response_code(400);
  echo json_encode(array("message" => "Unable to update News."));
}

?>
