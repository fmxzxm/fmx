<?php
include "conn.php";

$userphone = isset($_POST["userphone"])? $_POST["userphone"] : "";
$password = isset($_POST["password"])? $_POST["password"] : "";
//验证用户名是否存在

    $sql = "INSERT into yg_user(username,PASSWORD) values($userphone,'$password')";

    $res = $conn->query($sql);

    // $contect = $res -> fetch_all(MYSQLI_ASSOC);

    // $str = json_encode($contect ,JSON_UNESCAPED_UNICODE);
 
    // echo $str;

    echo $res;
?>