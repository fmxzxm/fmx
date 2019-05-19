<?php
include "conn.php";

//添加到购物车

$username = isset($_POST["username"]) ? $_POST["username"] : "";
$title = isset($_POST["title"]) ? $_POST["title"] : "";
$price = isset($_POST["price"]) ? $_POST["price"] : "";
$img = isset($_POST["img"]) ? $_POST["img"] : "";
$count = isset($_POST["count"]) ? $_POST["count"] : "";
$goodsid = isset($_POST["goodsid"]) ? $_POST["goodsid"] : "";


$total = $price * $count;

// echo $username,$title,$price,$img,$count,$goodsid,$total;

//判断goodsid 是否存在

$sql0 = "select counts from yg_shop where username = '$username' and goodsid = $goodsid";

$res = $conn -> query($sql0);
$contect = $res-> fetch_all(MYSQLI_ASSOC);

// var_dump($res);

// $arr = json_encode($contect,JSON_UNESCAPED_UNICODE);

// echo $contect[0]['counts'];

if($res ->num_rows){
    //如果存在就更新数量
    $str = $contect[0]['counts'] + $count;
   
    $total1 = $str * $price;

    $sql1 = "UPDATE yg_shop set counts = $str,total = $total1 WHERE username = '$username' and goodsid = $goodsid";
    
    $res = $conn -> query($sql1);
    // echo $res;
}else{
    //如果不存在就插入
    $sql2 = "INSERT into yg_shop(username,title,price,img,counts,goodsid,total) values ($username,'$title',$price,'$img',$count,$goodsid,$total)";

    $res1 = $conn -> query($sql2);

    // echo $res1;
}










?>