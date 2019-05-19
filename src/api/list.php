<?php

    include "conn.php";

    $page = isset($_POST["page"]) ? $_POST["page"] : "1";
    $num = isset($_POST["num"]) ? $_POST["num"] : "8";

    // 1        0-7           1
    // 2        8-15          2
    // 3        16-23
    // 4        24-31

    $index = ($page-1)*$num;
    $sql = "SELECT * from yg_list LIMIT $index,$num;";

    $res = $conn->query($sql);

    $contect = $res -> fetch_all(MYSQLI_ASSOC);

    $str = json_encode($contect,JSON_UNESCAPED_UNICODE);

    echo $str;


?>