<?php
// Class use to connect to the database
class Database {
  private $host = "localhost";
  private $db_name = "FalconNewsDB";
  private $username = "root";
  private $password = "";

  public $connection; // variable to use by other class to access db

  // get the database connection
  public function getConnection() {

    $this->connection = null;

    try {
      $this->connection = new PDO("mysql:host=" . $this->host .
      ";dbname=" . this->$db_name, $this->$username, $this->$password);
    } catch(PDOException $exception) {
      echo "Connection error: " . $exception->getMessage();
    }

    return $this->connection;
  }

} // end class
?>
