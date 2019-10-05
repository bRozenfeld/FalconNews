<?php
//required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/database.php";
include_once "../objects/news.php";

// connect to db
$database = new Database();
$connection = $database->getConnection();

$news = new News($connection);

$stmt = $news->read();
$num = $stmt->rowCount();

if($num > 0) {

  $news_arr = array();

  while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $news_item = array(
      "id" => $id,
      "title" => $title,
      "description" => $description,
      "url" => $url,
      "date" => $date
    );

    array_push($news_arr, $new_item);
  }
  // code response 200 - Ok
  http_response_code(200);

  echo json_encode($news_arr);
} else {
  //code response 404 - page not found
  http_response_code(404);

  echo json_encode(array("message" => "No news found."));
}
?>
