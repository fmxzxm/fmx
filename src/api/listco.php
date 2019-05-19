<?php

include "conn.php";
$username = isset($_POST["username"]) ? $_POST["username"] : "";
$sql = "SELECT sum(counts) AS num FROM yg_shop WHERE USERNAME = $username";
// echo $sql;
$res = $conn -> query($sql);
$arr = $res-> fetch_all(MYSQLI_ASSOC);

// var_dump($arr);
echo $arr[0]['num'];

?>