<?php
$IP = "localhost";
$username = "root";
$password = "";
$dbn = "fmx";

$conn = new mysqli($IP,$username,$password,$dbn);
if($conn->connect_error){
    die("连接失败：".$conn->connect_error);
}
// echo "连接成功";

?>