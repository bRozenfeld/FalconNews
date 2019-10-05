<?php
class Product {

  // database connection and table name
  private $connection;
  private $table_name = "news";

  // object properties
  public $id;
  public $title;
  public $description;
  public $url;
  public $date;

  // constructor with $connection as database connection
  public function __construct($connection) {
    this->connection = $connection;
  }

  // function to create data
  public function create(){}

  // function to read data
  public function read(){
    $query = "SELECT * FROM News";

    $stmt = $this->connection->prepare($query);

    $stmt->execute();

    return $stmt;
  }

  // function to update data
  public function update(){}

  // function to delete data
  public function delete(){}
}
?>
