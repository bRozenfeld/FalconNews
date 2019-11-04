<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

// get database connection
include_once '../config/database.php';

// instantiate news object
include_once '../objects/user.php';

$database = new Database();
$connexion = $database->getConnection();

$user = new User($connexion);

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->email)) {

} else {
  http_response_code(400);
  echo json_encode(array("message" => "Unable to create user. Data is incomplete."));
}
?>
