<?php

include "conn.php";

$username = isset($_POST["username"]) ? $_POST["username"] : ""; 
$contct = isset($_POST["contct"]) ? $_POST["contct"] : "";
$timed = isset($_POST["timed"]) ? $_POST["timed"] : "";

$sql = "INSERT into yg_lyb (username,contect,timed) values ( $username,'$contct','$timed')";

$res = $conn -> query($sql);


echo $res;


?>