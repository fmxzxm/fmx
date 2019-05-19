<?php
include "conn.php";

$username = isset($_POST["username"]) ? $_POST["username"] : "";
$password = isset($_POST["password"]) ? $_POST["password"] : "";

$sql = "SELECT * from yg_user where username = $username and password = '$password'";

$rel = $conn -> query($sql);

if($rel -> num_rows){
    echo "ok";
}else{
    echo "stop";
}


?>