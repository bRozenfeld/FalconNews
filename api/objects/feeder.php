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

    $query = ("INSERT INTO " . $this->table_name . "(url) VALUES(:url)");

    $stmt = $this->connection->prepare($query);

    $stmt->bindParam(":url", $this->url);

    if($stmt->execute()) {
      return true;
    }
    return false;
  }
}
?>
