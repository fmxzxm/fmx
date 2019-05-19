<?php
include "conn.php";

$id = isset($_POST["id"]) ? $_POST["id"] : "";

// echo $id;
$sql = "SELECT * from yg_list where id = $id";

$res = $conn->query($sql);

$contect = $res -> fetch_all(MYSQLI_ASSOC);

$str = json_encode($contect,JSON_UNESCAPED_UNICODE);

echo $str;


?>