<?php
//required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// php-jwt to use tokens
include_once '../libs/php-jwt-5.0.0/BeforeValidException.php';
include_once '../libs/php-jwt-5.0.0/ExpiredException.php';
include_once '../libs/php-jwt-5.0.0/JWT.php';
include_once '../libs/php-jwt-5.0.0/SignatureInvalidException.php';
use \Firebase\JWT\JWT;

include_once "../config/database.php";
include_once "../objects/user.php";
include_once "../config/core.php";

// connect to db
$database = new Database();
$connexion = $database->getConnection();

$user = new User($connexion);

$data = json_decode(file_get_contents("php://input"));

// make sure data isn't empty
if(!empty($data->email) && !empty($data->password)) {
  $user->email = $data->email;
  $user->password = $data->password;
  // check that the email is valid
  if($user->checkEmail()) {
    if($user->checkPassword()) {
        $token = array(
         "iss" => $iss,
         "aud" => $aud,
         "iat" => $iat,
         "nbf" => $nbf,
         "exp" => $exp,
         "data" => array(
           "email" => $user->email,
           "is_admin" => $user->isAdmin()
         )
       );
      http_response_code(200);

      $jwt = JWT::encode($token, $key);
      echo json_encode(array("message" => "Login successful.", "jwt" => $jwt));
    } else {
      http_response_code(401);
      echo json_encode(array("message" => "Login failed : invalid credentials."));
    }
  } else {
    http_response_code(401);
    echo json_encode(array("message" => "Invalid credentials."));
  }
} else {
  http_response_code(400);
  echo json_encode(array("message" => "Login failed. Data incomplete."));
}
?>
