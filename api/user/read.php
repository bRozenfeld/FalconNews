<?php
//required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

include_once "../config/database.php";
include_once "../objects/user.php";

// connect to db
$database = new Database();
$connection = $database->getConnection();

$user= new User($connection);

$stmt = $user->read();
$num = $stmt->rowCount();


if($num > 0) {

  $user_arr = array();
 
  while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

    extract($row);

    $n = array(
      "id" => $id,
      "email" => $email,
      "password" => $password,
      "is_admin" => $is_admin
    );

    array_push($user_arr, $n);

  }
  
  http_response_code(200);
  echo json_encode($user_arr);
} else {
  http_response_code(404);
  echo json_encode(array("message" => "No users found."));
}
?>
