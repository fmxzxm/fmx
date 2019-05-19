<?php
include "conn.php";

$page = isset($_POST["page"]) ? $_POST["page"] : "";
$num = isset($_POST["num"]) ? $_POST["num"] : "";
// echo $page,$num;

// 1     0-4
// 2     5-9
// 3     10-14
// 4     15-19

$index = ($page - 1)*$num;



$slq = "select * from yg_lyb LIMIT $index,$num";

$res = $conn -> query($slq);

$contect = $res ->fetch_all(MYSQLI_ASSOC);

$str = json_encode($contect,JSON_UNESCAPED_UNICODE);
echo $str;

?>