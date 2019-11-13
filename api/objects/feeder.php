<?php

class Feeder {
  private $connection;
  private $table_name = "feeder";

  public $id;
  public $url;

  public function __construct($connection) {
    $this->connection = $connection;
  }

  public function create() {

    $news = $this->parseFeedToNews();

    // begin transaction, mode auto commit disable
    $this->connection->beginTransaction();

    $query = "INSERT INTO " . $this->table_name . "(url) VALUES(:url)";

    $stmt = $this->connection->prepare($query);

    $stmt->bindParam(":url", $this->url);

    // Feeder is create, now lets create the news associated
    if($stmt->execute()) {
      $last_id = $this->connection->lastInsertId();

      $query = "INSERT INTO news (title, description, url, url_img, published_date, feeder_id)";
      $query .= "VALUE(:title,:description,:url, :url_img, :published_date,:feeder_id)";
      foreach($news as $n) {
          $stmt = $this->connection->prepare($query);
          $stmt->bindParam(":title", $n["title"]);
          $stmt->bindParam(":description", $n["description"]);
          $stmt->bindParam(":url", $n["url"]);
		      $stmt->bindParam(":url_img", $n["url_img"]);
          $stmt->bindParam(":published_date", $n["published_date"]);
          $stmt->bindParam(":feeder_id", $last_id);
          if(!$stmt->execute()) {
            $this->connection->rollBack();
            return false;
          }
      }
      // no error, commit the changes
      $this->connection->commit();
      return true;
    }
    // error, cancel modifications
    $this->connection->rollBack();
    return false;
  }

  public function read() {
    $query = "SELECT f.id, f.url FROM " . $this->table_name . " f";
    $stmt = $this->connection->prepare($query);
    $stmt->execute();
    return $stmt;
  }

  public function delete() {
    $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
    $stmt = $this->connection->prepare($query);

    $stmt->bindParam(":id", $this->id);

    if($stmt->execute()) {
      return true;
    }
    return false;
  }

  public function update() {
    $news = $this->parseFeedToNews();

    // deleting news in the feed that are already in the database
    $query = "SELECT url FROM news WHERE feeder_id = :id";
    $stmt = $this->connection->prepare($query);
    $stmt->bindParam(":id", $this->id);
    $stmt->execute();
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      extract($row);
      for ($i = 0; $i < sizeof($news); $i++) {
        if(!isset($news[$i])) {
          $news[$i] = null;
        }
        if($url == $news[$i]["url"]) { // the news already exist
          unset($news[$i]);
          break;
        }
      }
    }

    $query = "INSERT INTO news (title, description, url, url_img, published_date, feeder_id)";
    $query .= "VALUE(:title,:description,:url,:url_img,:published_date,:feeder_id)";
    foreach($news as $n) {
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(":title", $n["title"]);
        $stmt->bindParam(":description", $n["description"]);
        $stmt->bindParam(":url", $n["url"]);
		$stmt->bindParam(":url_img", $n["url_img"]);
        $stmt->bindParam(":published_date", $n["published_date"]);
        $stmt->bindParam(":feeder_id", $this->id);
        if(!$stmt->execute()) {
          return false;
        }
        return true;
    }
  }


  // Check if the url of the feed is valid
  public function checkURL($url) {
    if(@simplexml_load_file($url)){
  		//check if all tags needed can be found in the feed
  		$testDom = new DOMDocument();
  		$testDom->load($url);

  		$title = $testDom->getElementsByTagName('title');
  		$link = $testDom->getElementsByTagName('link');
  		$description = $testDom->getElementsByTagName('description');
  		$pubDate = $testDom->getElementsByTagName('pubDate');

  		if(($title->length!=0) && ($link->length!=0) && ($description->length!=0) && ($pubDate->length!=0)){
        $this->url = $url;
        return true;
  		}

   } else {
     return false;
   }
  }

  //check if the number of existing url is under 15
  public function checkMaxURL(){

	 // count database's row number
	  $query = "SELECT f.id, f.url FROM " . $this->table_name . " f";
	  $stmt = $this->connection->prepare($query);
    $stmt->execute();
    $nRows = $stmt->rowCount();

	   if ($nRows>=15){
		     return false;
	   }
	   return true;
   }

   // parse the feed url to an array of news
   private function parseFeedToNews() {
     $news = array();
     $feed = simplexml_load_file($this->url);

     $urlImg = null;

     foreach($feed->channel->item as $item) {
       $urlImg = $this->getImageURL($item->link);

       $n = array (
         "title" => $item->title,
         "url" => $item->link,
         "description" => $item->description,
         "published_date" => date('Y-m-d H:i:s', strtotime(str_replace('-', '/', $item->pubDate))),
		     "url_img" => $urlImg
       );
       array_push($news, $n);
     }

     return $news;
   }


   // return the url of the image associate to a news
   // if not, return null
   private function getImageURL($link) {
     $dom = new DOMDocument();
     $dom->preserveWhiteSpace = false;
     $dom->load($this->url);

     $find = false;

     $items = $dom->getElementsByTagName('item');
     foreach ($items as $item) {
       foreach($item->childNodes as $child) {
         if($child->nodeValue == $link) {
           $find = true;
           break;
         }
       }

       if($find === true) {
         foreach($item->childNodes as $tag)
         {
           if($url = $tag->getAttribute("url"))
           {
             // check if there's image
             if(strpos($url,'jpg') || strpose($url, 'png') || strpos($url, 'jpeg'))
             {
               return $url;
             }
           }
         }
       }
     }
     return null;

   }
}
?>
