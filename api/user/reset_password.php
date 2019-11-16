<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/database.php";

include_once "../objects/user.php";

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
$subject = "Password updated !";

$database = new Database();
$connexion = $database->getConnection();

$user = new User($connexion);

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->email)) {
  $user->email = $data->email;
  $password = $user->randomPassword();
  $user->password = password_hash($password, PASSWORD_DEFAULT);

  if($user->reset_password()) {
    $message = "Your password has been reset.\n";
    $message .= $password;

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
      echo json_encode(array("message" => "Password reset successfully."));
    }
  } else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to reset the password."));
  }

} else {
  http_response_code(400);
  echo json_encode(array("message" => "Unable to reset the password. Data is incomplete."));
}
?>
