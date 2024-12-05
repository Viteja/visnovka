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

    $mail->Host       = 'wes1-smtp.wedos.net';                     //Set the SMTP server to send through

    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication

    $mail->Username   = 'info@acvisnovka.cz';                     //SMTP username

    $mail->Password   = 'Montaze2014*';                               //SMTP password

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption

    $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

 

    $mail->setFrom('info@acvisnovka.cz', 'Formulář višňovka');

    $mail->addAddress('info@acvisnovka.cz');     //Add a recipient

   

    $mail->isHTML(true);                                  //Set email format to HTML

    $mail->Subject = $subject;

    $mail->Body    = "Jméno: " . $name . "<br>" .  "Email: " . $email . "<br>" . "Zpráva: " . $message;

    $mail->send();

   

}    

 

catch (Exception $e) {

    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";

}

 

?>