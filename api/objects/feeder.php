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

    $query = "INSERT INTO " . $this->table_name . "(url) VALUES(:url)";

    $stmt = $this->connection->prepare($query);

    $stmt->bindParam(":url", $this->url);

    if($stmt->execute()) {
      return true;
    }
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

  
  // Check if the url of the feed is valid

  public function checkURL($url) {
	return true;
  }

  //check if the number of existing url is under 15
  public function checkMaxURL(){
	   
	// count database's row number
	$query = "SELECT f.id, f.url FROM " . $this->table_name . " f";
	$stmt = $this->connection->prepare($query);
    $stmt->execute();
    $nRows = $stmt->rowCount();
	echo $nRows;
	
	   if ($nRows>=15){
		   return false;
	   }
	   return true;  
   }			
}
?>
