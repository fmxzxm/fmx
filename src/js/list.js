$(function () {
    co();

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



    var page = 1;
    var num = 8;
    var str1 = "";
    function xr() {
        $.ajax({
            type: "post",
            url: "../api/list.php",
            data: "page=" + page + "&num=" + num,
            success: function (str) {
                // console.log(str);
                var arr = JSON.parse(str);
                // console.log(arr);

                var html = arr.map(function (item) {
                    return `
                    <li data-id="${item.id}">
                    <img class="tu" src="../img/list_img/${item.img}" alt="">
                    <p class="price">￥ ${item.price}</p>
                    <p class="title">
                        <img class="tubiao" src="../img/list_img/crd_03.png" alt="">
                        <span>${item.title}</span>
                    </p>
                    <p>
                        <span class="kind">${item.kind}</span>
                        <span class="address">${item.address}</span>
                        <span class="courier">${item.courier}</span>
                    </p>
                    <div class="d5">
                        <div class="d5_l">
                            <input type="button" class="cut" value="-">
                            <input type="text" class="num" value="1" >
                            <input type="button" class="add" value="+">
                        </div>
                        <div class="d5_r">
                            <img src="../img/list_img/icon-shop.png" alt="">
                            <span class="addshop">加入购物车</span>
                        </div>
                    </div>
                </li>      
                    `;


                }).join("");

                str1 += html;
                // console.log(str1);

                $(".ul6").html(str1);
                init();

            }
        });
    }
    xr();


    var count = 0;
    //数量减少
    $(".ul6").on("click", "li .cut", function () {

        count = $(this).next().val();
        count--;
        if (count <= 1) {
            count = 1;
        }
        $(this).next().val(count);
        // console.log($(this).find(".add"));
    });


    //数量增加
    $(".ul6").on("click", "li .add", function () {
        // var count = 0;
        count = $(this).prev().val();
        count++;
        // console.log(count)
        $(this).prev().val(count);

        // console.log($(this).find(".add"));
        // console.log($(this).prev().val());
    });



    function init() {

        //事件委托    控制商品数量
        //var ddid = $(".ul6 li").data("id");
        //数量减少


        //点击添加到购物车
        $(".ul6").on("click", "li .addshop", function () {
            //获取数量
            var counts = $(this).parent().prev().find("input").eq(1).val();
            //用户名
            var username = getCookie("username");
            console.log(counts);
            //获取id
            var id = $(this).parent().parent().parent().data(id);

            // price = price.slice(1).trim() * 1;
            // console.log(id.id);
            // //获取标题
            // var title = $(this).

            $.ajax({
                type: "post",
                url: "../api/xq.php",
                data: "id=" + id.id,
                success: function (str) {
                    // console.log(str);
                    var arr = JSON.parse(str);
                    // console.log(arr);
                    var title = arr[0].title;
                    var price = arr[0].price;
                    var img = arr[0].img;

                    // console.log(counts);
                    // console.log(username);
                    // console.log(title, price, img);
                    function add() {
                        $.ajax({
                            type: "post",
                            url: "../api/addshop.php",
                            data: "username=" + username + "&title=" + title + "&price=" + price + "&img=" + img + "&count=" + counts + "&goodsid=" + id.id,
                            async: false,
                            success: function (str) {
                                // console.log(str);

                            }
                        });
                        co();
                    }
                    add();

                }
            });
        });


        //加载更多

        $(".geng").click(function () {
            page++;
            xr();
            if (page >= 3) {
                $(".geng").css("display", "none");
            }
        });

        //商品数量


        //点击商品跳转到详情页
        $(".tu").click(function () {
            var goods = $(this).parent().data("id");
            console.log(goods);
            location.href = "xq.html?" + goods;
        });
    }
});

function co() {
    var username = getCookie("username");
    $.ajax({
        type: "post",
        url: "../api/listco.php",
        data: "username=" + username,
        async: false,
        success: function (str) {
            // console.log(str);
            //购物车数量
            $(".s1").html(str);
        }
    });
}



$(function () {

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

    //登录注册跳转
    $("#regs").click(function () {
        location.href = "register.html";
    });

    $("#logi").click(function () {
        location.href = "login.html";
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


    //列表显示
    $(".ul4 li").mouseover(function () {
        $(".list_1").css("display", "block");
        $(".list_1").mouseover(function () {
            $(".list_1").css("display", "block");
        });

        $(".list_1").mouseout(function () {
            $(".list_1").css("display", "none");
        });
    });

    $(".ul4 li").mouseout(function () {
        $(".list_1").css("display", "none");
    });



    // //左侧列表点击收起

    // $(".ul3 li dl dt .fen").toggle(
    //     function () {
    //         // console.log($(this).parent().siblings());
    //         console.log(123);
    //     }, function () {
    //         console.log(456);
    //     });


    //退出登录
    $("#tuichu").click(function () {
        // console.log(123);
        removeCookie("username");
        location.href = "login.html";
    });

});


$(function () {
    var isok1 = true;
    $(".ul3 li dl").on("click", "dt .fen", function () {

        if (isok1) {
            $(this).parent().siblings().css("display", "none");

        } else if (!isok1) {
            $(this).parent().siblings().css("display", "block");

        }
        isok1 = !isok1;
    });
})
























