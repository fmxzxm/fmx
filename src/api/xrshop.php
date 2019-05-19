<?php

include "conn.php";
$username = isset($_POST["username"]) ? $_POST["username"] : "";

$sql = "SELECT * FROM yg_shop WHERE USERNAME = $username";

$res = $conn ->query($sql);

$contect = $res -> fetch_all(MYSQLI_ASSOC);

$str = json_encode($contect,JSON_UNESCAPED_UNICODE);

// var_dump($res);

echo $str;





?>