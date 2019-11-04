<?php
class User {
  // database connexion and table name
  private $connexion;
  private $table_name = "user";

  // objects properties
  public $id;
  public $email;
  public $password;

  //constructor
  public function __construct($connexion) {
    $this->connexion = $connexion;
  }

  // function to check if email exist
  public function checkEmail() {
    $query = "SELECT id FROM " . $table_name . " WHERE email = :email";
    $stmt = $this->connexion->prepare($query);
    $stmt->bindParam(":email", $this->email);
    $stmt->execute();
    if($stmt->rowCount() === 1) {
      return true;
    } else {
      return false;
    }
  }

  // function to check if password is valid
  public function checkPaswword() {

  }
}
?>
