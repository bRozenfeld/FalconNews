<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once "../config/database.php";
include_once "../objects/user.php";

// connect to db
$database = new Database();
$connection = $database->getConnection();

$user = new User($connection);

$json = file_get_contents("php://input");

$data = json_decode($json);

if(!empty($data->id)) {
  $user->id = $data->id;

  if($user->delete()) {
    http_response_code(200);
    echo json_encode(array("message" => "User was deleted successfully"));
  }
} else {
  http_response_code(400);
  echo json_encode(array("message" => "Unable to delete this user. Data is incomplete"));
}

?>
