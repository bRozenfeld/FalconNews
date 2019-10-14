
<?php
//required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

include_once "../config/database.php";
include_once "../objects/news.php";

// connect to db
$database = new Database();
$connection = $database->getConnection();

$news = new News($connection);

//get data from frontend and update backend id with it
$data = json_decode(file_get_contents("php://input"));
$news->id = $data->id;

//check if the row associated to the given id has been correctly deleted
if($news->delete())
{
  // code response 200 - Ok
  http_response_code(200);
  echo json_encode(array("message" => "Row succesfully deleted"));

  echo json_encode($news);


} else
{
  //code response 404 - page not found
  http_response_code(404);

  echo json_encode(array("message" => "Unable to delete this row."));
}
?>
