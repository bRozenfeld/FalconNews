<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/feeder.php';
include_once '../util/util.php';

$database = new Database();
$connection = $database->getConnection();

$feeder = new Feeder($connection);

// Takes raw data from the request
$json = file_get_contents('php://input');
//converts it into php object
$data = json_decode($json);

// make sure data is not empty
if(!empty($data->url)) {


	//make sure url number is under 15
	if($feeder->checkMaxURL()){

		if($feeder->checkURL($data->url)) {
		  //set feeder property value
		  $feeder->url = $data->url;

		  //create the feeder
		  if($feeder->create()) {
			// set response code - 201 created
			http_response_code(201);
			// tell the user
			echo json_encode(array("message" => "New feed added."));
		  } else {
			// set response code - 503 service unavailable
			http_response_code(503);
			echo json_encode(array("message" => "Unable to add this feed"));
		  }

	  } else {
		http_response_code(400);
		echo json_encode(array("message" => "Url is not valid rss feed."));

	  }
	} else {
		http_response_code(400);
		echo json_encode(array("message" => "maximum url (15) has already been reach "));
	  }

// data incomplete
} else {
  // 400 - bad request
  http_response_code(400);
  echo json_encode(array("message" => "Unable to add this feed. Data incomplete."));
}
?>
