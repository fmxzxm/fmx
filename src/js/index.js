$(function () {
    //退出登录
    $("#tuichu").click(function () {
        // console.log(123);
        removeCookie("username");
        location.href = "html/login.html";
    });

    //页面跳转
    $("#regs").click(function () {
        location.href = "html/register.html";
    });

    $("#logi").click(function () {
        location.href = "html/login.html";
    });

    $("#shop").click(function () {
        location.href = "html/shop.html";
    });

    //头部轮播图
    var isok = true;
    function lunbo() {
        if (isok) {
            $("#img1").animate({ "opacity": 0 }, 500, "linear", function () {
                $("#img2").animate({ "opacity": 1 }, 500, "linear");
            });
        } else {
            $("#img2").animate({ "opacity": 0 }, 500, "linear", function () {
                $("#img1").animate({ "opacity": 1 }, 500, "linear");
            });
        }
        isok = !isok;
    }
    var timer = setInterval(lunbo, 3000);
    //鼠标移入时停止滚动
    $(".top_2 img").mouseover(function () {
        clearInterval(timer);
    });
    //鼠标移出时继续轮播
    $(".top_2 img").mouseout(function () {
        timer = setInterval(lunbo, 3000);
    });

    //大轮播图

    var num = 0;
    function blunbo() {
        if (num % 5 == 0) {
            $("#img3").animate({ "opacity": 1 }, 500, "linear", function () {
                $("#img3").siblings("img").animate({ "opacity": 0 }, 500, "linear");
            });
            $(".s6").css("background", "yellow");
            $(".s6").siblings().css("background", "#000");
        } else if (num % 5 == 1) {
            $("#img4").animate({ "opacity": 1 }, 500, "linear", function () {
                $("#img4").siblings("img").animate({ "opacity": 0 }, 500, "linear");
            });
            $(".s7").css("background", "yellow");
            $(".s7").siblings().css("background", "#000");
        } else if (num % 5 == 2) {
            $("#img5").animate({ "opacity": 1 }, 500, "linear", function () {
                $("#img5").siblings("img").animate({ "opacity": 0 }, 500, "linear");
            });
            $(".s8").css("background", "yellow");
            $(".s8").siblings().css("background", "#000");
        } else if (num % 5 == 3) {
            $("#img6").animate({ "opacity": 1 }, 500, "linear", function () {
                $("#img6").siblings("img").animate({ "opacity": 0 }, 500, "linear");
            });
            $(".s9").css("background", "yellow");
            $(".s9").siblings().css("background", "#000");
        } else if (num % 5 == 4) {
            $("#img7").animate({ "opacity": 1 }, 500, "linear", function () {
                $("#img7").siblings("img").animate({ "opacity": 0 }, 500, "linear");
            });
            $(".s10").css("background", "yellow");
            $(".s10").siblings().css("background", "#000");
        }

        num++;
    }

    var timer1 = setInterval(blunbo, 3000);

    $(".top_4 img").mouseover(function () {
        clearInterval(timer1);
    })

    $(".top_4 img").mouseout(function () {
        timer1 = setInterval(blunbo, 3000);
    })

    //点击按钮切换轮播图
    $(".s6").click(function () {
        $("#img3").animate({ "opacity": 1 }, 500, "linear", function () {
            $("#img3").siblings("img").animate({ "opacity": 0 }, 500, "linear");
        });
        $(".s6").css("background", "yellow");
        $(".s6").siblings().css("background", "#000");
    });
    $(".s7").click(function () {
        $("#img4").animate({ "opacity": 1 }, 500, "linear", function () {
            $("#img4").siblings("img").animate({ "opacity": 0 }, 500, "linear");
        });
        $(".s7").css("background", "yellow");
        $(".s7").siblings().css("background", "#000");
    });
    $(".s8").click(function () {
        $("#img5").animate({ "opacity": 1 }, 500, "linear", function () {
            $("#img5").siblings("img").animate({ "opacity": 0 }, 500, "linear");
        });
        $(".s8").css("background", "yellow");
        $(".s8").siblings().css("background", "#000");
    });
    $(".s9").click(function () {
        $("#img6").animate({ "opacity": 1 }, 500, "linear", function () {
            $("#img6").siblings("img").animate({ "opacity": 0 }, 500, "linear");
        });
        $(".s9").css("background", "yellow");
        $(".s9").siblings().css("background", "#000");
    });
    $(".s10").click(function () {
        $("#img7").animate({ "opacity": 1 }, 500, "linear", function () {
            $("#img7").siblings("img").animate({ "opacity": 0 }, 500, "linear");
        });
        $(".s10").css("background", "yellow");
        $(".s10").siblings().css("background", "#000");
    });



    //首页部分数据渲染

    // $(".ul5").click(function () {
    //     console.log(123);
    // });

    $(function () {
        $.ajax({
            type: "post",
            url: "api/index1.php",
            success: function (str) {
                // console.log(str);
                var arr = JSON.parse(str);
                // console.log(arr);

                var html = arr.map(function (item) {
                    return `
                    <li data-id="${item.id}">
                    <div>
                        <img src="../src/img/index_img/${item.img}" alt="">
                    </div>
                    <p class="p7">${item.title}</p>
                    <p class="p8">
                        <span class="s4">￥${item.price}</span>
                        <span class="s5">
                            <del>￥${item.oprice}</del>
                        </span>
                    </p>
                </li>
                    `
                }).join("");

                $(".ul5").html(html);
            }
        });
    })

    //跳转到列表页
    $(".top_4_l li dl dt").click(function () {
        location.href = "html/list.html";
    });

    //显示和隐藏
    $(".top_4_l li dl").mouseover(function () {
        // console.log(123);
        $("#huad").css("display", "block");
        $("#huad").mouseover(function () {
            $("#huad").css("display", "block");
        });

        $("#huad").mouseout(function () {
            $("#huad").css("display", "none");
        });
    });

    $(".top_4_l li dl").mouseout(function () {
        // console.log(123);
        $("#huad").css("display", "none");
    });

    //购物车跳转
    $("#shop1").click(function () {
        // console.log(123);
        location.href = "html/shop.html";
    });

    $("#shop2").click(function () {
        // console.log(456);
        location.href = "html/shop.html";
    });

    $("#huad ul li dl dd").click(function () {
        // console.log(123);
        location.href = "html/list.html";

    });

    var usn = getCookie("username");
    // console.log(usn);
    if (usn) {
        $("#regs").html(usn + "您好");
        $("#logi").html("欢迎您");

        // $("#regs").click(function () {

        // });

        // $("#logi").click(function () {

        // });
    }


})