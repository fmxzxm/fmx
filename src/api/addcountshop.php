<?php

include "conn.php";

$username = isset($_POST["username"]) ? $_POST["username"] : "";
$id = isset($_POST["id"]) ? $_POST["id"] : "";
$count = isset($_POST["count"]) ? $_POST["count"] : "";
$price = isset($_POST["price"]) ? $_POST["price"] : "";

$str = $count * $price;

// echo $username,$id,$count;

$sql = "UPDATE  yg_shop set counts = $count,total = $str where username = $username and id = $id";

$res = $conn ->query($sql);

echo $res;


?>