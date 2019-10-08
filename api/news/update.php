<?php
//required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Methods: POST");

include_once "../config/database.php";
include_once "../objects/news.php";

$database = new Database();
$connection = $database->getConnection();

$news = new News($connection);
$data = json_decode(file_get_contents("php://input"));

$news->title = $data->title;
$news->description = $data->description;
$news->url = $data->url;
$news->id = $data->id;


if($news->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
    echo json_encode(array("message" => "News was updated."));
	echo json_encode($news);
}
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
    echo json_encode(array("message" => "Unable to update news."));
	}
?>