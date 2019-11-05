<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

  require_once "libs/php-mailer-6.1.1/PHPMailer.php";
  require_once "libs/php-mailer-6.1.1/Exception.php";
  require_once "libs/php-mailer-6.1.1/SMTP.php";
  //echo phpinfo();

  $mail = new PHPMailer();
  $mail->isSMTP();
  $mail->Host = "smtp.gmail.com";
  $mail->SMTPAuth = true;
  $mail->Username = "falconewspro@gmail.com";
  $mail->Password = "falconnews<3";
  $mail->SMTPSecure = "ssl";
  $mail->Port = 465;


  $to_email = "benjamin.rozenfeld@gmail.com";
  $subject = "Test php mail";
  $message = "je test le mailing avec php";
  $headers = "from: noreply@falconews.com";

  $mail->setFrom("falconewspro@gmail.com", "Mailer");
  $mail->AddAddress($to_email);
  $mail->isHTML(false);

  $mail->Subject = $subject;
  $mail->Body = $message;

  if(!$mail->send()) {
    echo 'erreur message non envoyé';
    echo $mail->ErrorInfo;
  } else {
    echo "Message envoyé";
  }
?>
