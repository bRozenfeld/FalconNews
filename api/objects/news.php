<?php
class News {

  // database connection and table name
  private $connection;
  private $table_name = "news";

  // object properties
  public $id;
  public $title;
  public $description;
  public $url;
  public $date;
  public $priority;
  public $isDisplayed;

  // constructor with $connection as database connection
  public function __construct($connection) {
    $this->connection = $connection;
  }

  // function to create data
  public function create(){
	  $query = "INSERT INTO " . $this->table_name . " SET title=:title, description=:description, url=:url, date=:date";

	  $stmt = $this->connection->prepare($query);

	  // sanitize
	  $this->title=htmlspecialchars(strip_tags($this->title));
	  $this->description=htmlspecialchars(strip_tags($this->description));
	  $this->url=htmlspecialchars(strip_tags($this->url));
	  $this->date=htmlspecialchars(strip_tags($this->date));

	  // bind values
	  $stmt->bindParam(":title", $this->title);
	  $stmt->bindParam(":description", $this->description);
	  $stmt->bindParam(":url", $this->url);
	  $stmt->bindParam(":date", $this->date);

	  $stmt->execute();

	  return $stmt;
  }

  // function to read data
  public function read(){
    $query = "SELECT id, title, published_date, description, url, priority
              FROM " . $this->table_name . "
              WHERE is_displayed IS NOT TRUE
              ORDER BY priority DESC, published_date DESC
              LIMIT 1";

    $stmt = $this->connection->prepare($query);

    $stmt->execute();

    return $stmt;
  }

  // function to update data
  public function update(){

    $query = "UPDATE " . $this->table_name .
    " SET priority = :priority, is_displayed = :is_displayed
    WHERE id = :id";

    $stmt = $this->connection->prepare($query);
    $stmt->bindParam(":priority", $this->priority);
    $stmt->bindParam(":is_displayed", $this->isDisplayed);
    $stmt->bindParam(":id", $this->id);

    $stmt->execute();

    return $stmt;
  }

  public function delete(){
    $query = "DELETE FROM " . $this->table_name . " WHERE id = :d";
    $stmt = $this->connection->prepare($query);
    $stmt->bindParam(":id", $this->id);
    if($stmt->execute()) {
      return true;
    }
    return false;
  }
	
  public function update_display() {
    $query = "UPDATE " . $this->table_name . " SET is_displayed = false WHERE id = :id";
    $stmt = $this->connection->prepare($query);
    $stmt->bindParam(":id", $this->id);
    $stmt->execute();	  
  }
}
?>
