<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// required to decode jwt
include_once "../config/core.php";
include_once "../libs/php-jwt-5.0.0/JWT.php";
include_once "../libs/php-jwt-5.0.0/BeforeValidException.php";
include_once "../libs/php-jwt-5.0.0/ExpiredException.php";
include_once "../libs/php-jwt-5.0.0/SignatureInvalidException.php";
use \Firebase\JWT\JWT;

// get posted data
$data = json_decode(file_get_contents("php://input"));
$jwt = isset($data->jwt) ? $data->jwt : "";

// decode jwt here
if($jwt) {
	try {
		$decoded = JWT::decode($jwt, $key, array('HS256'));
		http_response_code(200);

		echo json_encode(array(
			"message" => "Access granted.",
			"data" => $decoded->data
		));
	} catch (Exception $e) {
		http_response_code(401);
		echo json_encode(array(
			"message" => "Access denied.",
			"error" => $e->getMessage()
		));
	}
} else { // jwt empty
	http_response_code(401);
	echo json_encode(array("message" => "Access denied."));
}
?>
