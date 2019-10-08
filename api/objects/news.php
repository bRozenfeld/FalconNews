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

  // constructor with $connection as database connection
  public function __construct($connection) {
    $this->connection = $connection;
  }

  // function to create data
  public function create(){}

  // function to read data
  public function read(){
    $query = "SELECT n.id, n.title, n.date, n.description, n.url
              FROM " . $this->table_name . " n";

    $stmt = $this->connection->prepare($query);

    $stmt->execute();

    return $stmt;
  }

  // function to update data
  public function update(){}
  // function to delete data

  public function delete(){
	
	//check whether the id exists or not
	$stmt = $this->connection->prepare("SELECT * FROM ". $this->table_name ." WHERE id=?");
	$stmt->execute([$this->id]); 
	$test = $stmt->fetch();

	//delete the row associated with the given id
	if ($test) {
	 
		$query = "DELETE FROM ". $this->table_name . " WHERE id = " . $this->id ; 	
		$stmt = $this->connection->prepare($query); 
        return true;
    }
    return false;	  
  }
}
?>
