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

  public function create() {
    $query = "INSERT INTO " . $this->table_name . " SET email=:email, password=:password";
    $stmt = $this->connexion->prepare($query);

    $this->password=htmlspecialchars(strip_tags($this->password));
    $this->email=htmlspecialchars(strip_tags($this->email));

    $stmt->execute();
    return $stmt;
  }
  
  //read function
  public function read() {
    $query = "SELECT f.id, f.email, f.password, f.is_admin FROM " . $this->table_name . " f";
    $stmt = $this->connexion->prepare($query);
    $stmt->execute();
    return $stmt;
  }
  //delete function
  public function delete() {
    $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
    $stmt = $this->connexion->prepare($query);

    $stmt->bindParam(":id", $this->id);

    if($stmt->execute()) {
      return true;
    }
    return false;
  }

  /**
   * Reset a password
   */
  public function reset_password() {
    $query = "UPDATE " . $this->table_name . " SET password=:password WHERE email=:email";
    $stmt = $this->connexion->prepare($query);

    $stmt->bindParam(":email", $this->email);
    $stmt->bindParam(":password", $this->password);

    $stmt->execute();

    return $stmt;
  }



  // function to check if email exist
  public function checkEmail() {
    $query = "SELECT id FROM " . $this->table_name . " WHERE email = :email";
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
  public function checkPassword() {
    $query = "SELECT password FROM " . $this->table_name . " WHERE email = :email";
    $stmt = $this->connexion->prepare($query);
    $stmt->bindParam(":email", $this->email);
    $stmt->execute();
    $hash = $stmt->fetch(PDO::FETCH_ASSOC);
    $hash = $hash["password"];
    if(password_verify($this->password, $hash)) {
      return true;
    }
    return false;
  }

  // generate a random password
  public function randomPassword() {
    $alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    $alphabet_one = "abcdefghijklmnopqrstuvwxyz";
    $alphabet_two = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $alphabet_three = "0123456789";
    $pass = array();
    $alphabetLength = strlen($alphabet) - 1;
    for($i=0; $i < 8; $i++) {
      $n = rand(0, $alphabetLength);
      $pass[] = $alphabet[$n];
    }
    // add at least one min character
    $n = rand(0, strlen($alphabet_one)-1);
    $pass[] = $alphabet_one[$n];
    // add at least one maj character
    $n = rand(0, strlen($alphabet_two)-1);
    $pass[] = $alphabet_two[$n];
    //add at least one numeric character
    $n = rand(0, strlen($alphabet_three)-1);
    $pass[] = $alphabet_three[$n];
    return implode($pass);
  }

}
?>
