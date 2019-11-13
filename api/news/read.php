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

$stmt = $news->read();
$num = $stmt->rowCount();


if($num == 1) {

  $new = array();
  //$new["news"] = array();

  while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

    extract($row);

    $n = array(
      "id" => $id,
      "title" => $title,
      "description" => $description,
      "url" => $url,
      "published_date" => $published_date,
      "priority" => $priority,
      "url_img" => $url_img
    );

    //array_push($new["news"], $n);
    array_push($new, $n);

    $news->id = $id;
    $news->priority = $priority-2;
    $news->isDisplayed = true;
    $news->update();
  }
  // code response 200 - Ok
  http_response_code(200);

  echo json_encode($new);
  //return json_encode($news);
  //echo json_last_error_msg();
} else {
  //code response 404 - page not found
  http_response_code(404);

  echo json_encode(array("message" => "No news found."));
}
?>
