$(function () {


    //判断当前登录状态
    var usn = getCookie("username");
    // console.log(usn);
    if (usn) {
        $("#regs").html(usn + "您好");
        $("#logi").html("欢迎您");

        // $("#regs").click(function () {

        // });

        // $("#logi").click(function () {

        // });
    } else {
        //注册登录跳转
        $("#regs").click(function () {
            location.href = "register.html";
        });

        $("#logi").click(function () {
            location.href = "login.html";
        });
    }



    //购物车跳转
    $("#shop1").click(function () {
        // console.log(123);
        location.href = "shop.html";
    });

    $("#shop2").click(function () {
        // console.log(456);
        location.href = "shop.html";
    });
    $("#shop").click(function () {
        // console.log(456);
        location.href = "shop.html";
    });


    // $("#huad ul li dl dd").click(function () {
    //     // console.log(123);
    //     location.href = "list.html";

    // });


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

    $("#tuichu").click(function () {
        // console.log(123);
        removeCookie("username");
        location.href = "login.html";
    });
})