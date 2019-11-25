<?php
// set default time zone
date_default_timezone_set('Europe/Paris');

// variables used for jwt;
$key = "private key RSA";
$iss = "http://localhost/FalconNews";
$aud = "http://localhost/FalconNews/";
$iat = time();
$nbf = $iat;
$exp = $iat + 3600;
?>
