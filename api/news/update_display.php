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

$news->update_display();

?>
