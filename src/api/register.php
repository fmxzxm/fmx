<?php
include "conn.php";

$userphone = isset($_POST["userphone"])? $_POST["userphone"] : "";
$password = isset($_POST["password"])? $_POST["password"] : "";
//验证用户名是否存在
$sql2 = "SELECT * from yg_user where username = $userphone";

$rel2 = $conn->query($sql2);
// echo $userphone;
if($rel2->num_rows){//存在
    echo "no";
}else{
    //不存在
    // $sql = "INSERT into yg_user(username,PASSWORD) values($userphone,'$password')";
    // echo $userphone,$password;

    // $rel = $conn->query($sql);
    echo "yes";
}

//注册信息插入用户表


// echo $rel;

// echo $userphone,$password;






?>