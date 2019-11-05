<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

// get database connection
include_once '../config/database.php';

// instantiate news object
include_once '../objects/user.php';

// to send mail
require_once "../libs/php-mailer-6.1.1/PHPMailer.php";
require_once "../libs/php-mailer-6.1.1/Exception.php";
require_once "../libs/php-mailer-6.1.1/SMTP.php";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// configuration smtp server
$smtp = "smtp.gmail.com";
$port = 465;
$username = "falconewspro@gmail.com";
$pwd = "falconnews<3";

// properties of the mail
$subject = "Welcome to FalconNews !";

$database = new Database();
$connexion = $database->getConnection();

$user = new User($connexion);

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->email)) {
  $user->email = $data->email;
  $password = $user->randomPassword();
  $user->password = password_hash($password, PASSWORD_DEFAULT);

  if($user->create()) {
    $message = "Your credentials are : \n";
    $message .= "email: " . $user->email . "\n";
    $message .= "password: " . $password;

    $mail = new PHPMailer();
    $mail->isSMTP();
    $mail->Host = $smtp;
    $mail->SMTPAuth = true;
    $mail->Username = $username;
    $mail->Password = $pwd;
    $mail->SMTPSecure = "ssl";
    $mail->Port = $port;

    $mail->setFrom($username, "FalconNews");
    $mail->addAddress($data->email);
    $mail->isHTML(false);
    $mail->Subject = $subject;
    $mail->Body = $message;
    $mail->CharSet="utf-8";

    if(!$mail->send()) {
      http_response_code(400);
      echo json_encode(array("message" => "Unable to send mail."));
      echo $mail->ErrorInfo;
    } else {
      http_response_code(201);
      echo json_encode(array("message" => "New User created."));
    }
  } else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create a user."));
  }



} else {
  http_response_code(400);
  echo json_encode(array("message" => "Unable to create user. Data is incomplete."));
}
?>
