<?php
include "conn.php";

$sql = "SELECT * from index1";

$res = $conn ->query($sql);

$contect = $res ->fetch_all(MYSQLI_ASSOC);

$str = json_encode($contect,JSON_UNESCAPED_UNICODE);

echo $str;

// var_dump($contect);

?>