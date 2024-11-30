<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require '../phpmailer/src/Exception.php';
require '../phpmailer/src/PHPMailer.php';
require '../phpmailer/src/SMTP.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$name = $_POST['name'];
$subject = $_POST['subject'];
$email = $_POST['email'];
$message = $_POST['message'];

// Retrieve form data

$mail = new PHPMailer(true);

try{


  $mail->SMTPDebug = SMTP::DEBUG_SERVER;   
    $mail->CharSet = "UTF-8";                   //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'mail.webglobe.cz';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'info@designjj-test.eu';                     //SMTP username
    $mail->Password   = 'Radegast12*';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    $mail->setFrom('info@designjj-test.eu', 'Formulář višňovka');
    $mail->addAddress('info@designjj.cz');     //Add a recipient
   
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = $subject;
    $mail->Body    = "Jméno: " . $name . "<br>" .  "Email: " . $email . "<br>" . "Zpráva: " . $message; 
    $mail->send();
    
}    

catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

?>