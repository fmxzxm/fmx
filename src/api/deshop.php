<?php
include "conn.php";
$id = isset($_POST["id"]) ? $_POST["id"] : "";

$sql = "DELETE FROM yg_shop WHERE id = $id";

$res = $conn -> query($sql);

echo $res;



?>