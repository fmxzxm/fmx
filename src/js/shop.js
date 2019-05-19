$(function () {
    // $(".top").load("head.html");

    $(".foot").load("foot.html");

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


    // //吸顶菜单
    var top = $(".top_1").height() + $(".top_2").height();

    $(window).scroll(function () {
        var scll = $(window).scrollTop();
        // console.log(top);
        // console.log(scll);

        if (scll >= top) {
            $(".top_3").addClass("fix");
        } else {
            $(".top_3").removeClass("fix");
        }
    });

    // $(".tjie").click(function () {
    //     console.log(123);
    // });


    //购物车渲染
    function init() {
        var username = getCookie("username");

        $.ajax({
            type: "post",
            url: "../api/xrshop.php",
            data: "username=" + username,
            success: function (str) {
                var arr = JSON.parse(str);
                console.log(arr);
                var html = arr.map(function (item) {
                    return `
                    <li data-id="${item.id}">
                    <p class="good_check">
                        <input type="checkbox" name="good" id="" value="" />
                    </p>
                    <p class="immmg">
                        <img src="../img/list_img/${item.img}" alt="">
                    </p>
                    <p class="good_name">${item.title}</p>
                    <p class="good_price">￥&nbsp;${item.price}</p>
                    <p class="num">
                        <span class="cutnum">-</span>
                        <input class="nownum" data-num="1000000" type="text" value="${item.counts}" />
                        <span class="addnum">+</span>
                    </p>
                    <p class="good_total">￥&nbsp;${item.total}</p>
                    <p class="zhi">4.5kg</p>
                    <p class="good_del">
                    <a href="javascript:;">添加收藏夹</a>
                        <a class="dell" href="javascript:;">删除</a>
                    </p>
                </li>`;
                }).join("")
                $("#cart").html(html);
                // //渲染每个商品的总价格
                // var x = $("#cart").find(".good_price").html().slice(7) * 1;
                // var y = $("#cart").find(".nownum").val();
                // var z = x * y;
                // // console.log(x);
                // // console.log(y);
                // // console.log(z);
                // z = "￥&nbsp;" + z;
                // $("#cart").find(".good_total").html(z);



                // cz();
            }
        });
        co();
    }
    init();

    //购物车数量各种操作





    var yonghu = getCookie("username");
    // console.log(yonghu);

    //1.数量变化：加减数量、手动修改数量
    $('#cart').on('click', '.addnum', function () {
        var id = $(this).parent().parent().data(id);
        // console.log(id.id);
        //		console.log(789);
        var num = $(this).prev().val();
        //		var kuncun = $(this).prev().attr('data-num');
        var kuncun = $(this).prev().data('num');//原生js叫dataset
        num++;
        if (num >= kuncun) {//设置上限
            num = kuncun;
        }
        $(this).prev().val(num);

        var u = $(this).parent().prev().html().slice(7) * 1;
        // console.log(u);

        $.ajax({
            type: "post",
            url: "../api/addcountshop.php",
            data: "username=" + yonghu + "&id=" + id.id + "&count=" + $(this).prev().val() + "&price=" + u,
            success: function (str) {
                // console.log(str);
                co();
            }

        })
        total($(this));//刷新小计
    });

    $('#cart').on('click', '.cutnum', function () {
        var id = $(this).parent().parent().data(id);
        //		console.log(789);
        var num = $(this).next().val();
        num--;
        if (num <= 1) {//设置下限
            num = 1;
        }
        $(this).next().val(num);

        var u = $(this).parent().prev().html().slice(7) * 1;
        $.ajax({
            type: "post",
            url: "../api/addcountshop.php",
            data: "username=" + yonghu + "&id=" + id.id + "&count=" + $(this).next().val() + "&price=" + u,
            success: function (str) {
                console.log(str);
                co();
            }

        })
        total($(this));//刷新小计
    });

    //手动输入的时候，改变数量
    $('#cart').on('input', '.nownum', function () {
        var num = $(this).val();
        var kuncun = $(this).data('num');
        if (num <= 1) {
            num = 1;
        } else if (num >= kuncun) {
            num = kuncun;
        }
        $(this).val(num);
        total($(this));//刷新小计
    });

    //小计的计算
    function total(now) {
        //找到数量
        var num = $(now).parent().find('.nownum').val();
        //找到单价
        var price = $(now).parent().prev().text().slice(2);
        //小计=数量*单价
        var xiaoji = (num * price).toFixed(2);
        //		console.log(num,price,xiaoji);
        $(now).parent().next().html('￥ ' + xiaoji);
        all();

    }


    //删除当行
    $('#cart').on('click', '.good_del', function () {
        var id = $(this).parent().data(id).id;
        // console.log(id);
        $.ajax({
            type: "post",
            url: "../api/deshop.php",
            data: "id=" + id,
            success: function (str) {
                // console.log(str)
                if (str) {
                    init();
                }
            }
        });

    });


    //判断如果一个商品都没有了，就隐藏最后一行(统计总数量和总价的)
    function update() {

        var len = $('.addnum').size();
        if (len == 0) {
            $('#del').hide();
        } else {
            $('#del').show();
        }
    }

    //全选
    $('#allchecked input').click(function () {
        var istrue = $('#allchecked input').prop('checked');
        $('.good_check input').prop('checked', istrue);
        all();
    });

    //计算总数量和总价格
    var arr = [];
    function all() {
        arr = [];//存被勾选的复选框的下标
        $('.good_check input').each(function (i, item) {
            if ($(item).prop('checked')) {
                //被勾选了，把下标存起来
                arr.push(i);
            }
        });

        //总数量
        var num = 0;
        //总价格
        var price = 0;

        arr.forEach(function (item) {
            num += $('.nownum').eq(item).val() * 1;
            price += $('.good_total').eq(item).text().slice(2) * 1;
        });

        // console.log(num, price.toFixed(2));

        //渲染到节点
        $('#allnum').html('已选' + num + ' 件商品');
        $('#totalprice').html('总计（不含运费）：' + '<b>' + '￥ ' + price.toFixed(2) + '</b>');

    }

    //点击复选框反过来控制全选按钮
    $('#cart').on('click', '.good_check input', function () {
        var len = $('.good_check input:checked').size();
        var total = $('.good_check input').size();
        if (len == total) {
            //全都勾选了
            $('#allchecked input').prop('checked', true);
        } else {
            $('#allchecked input').prop('checked', false);
        }
        all();//刷新总数量和总价格
    });

    //全删
    // $('#delall').click(function () {
    //     var res = confirm('您确定要删除全部吗');
    //     if (res) {
    //         console.log(arr);
    //         for (var i = arr.length - 1; i >= 0; i--) {//从数组的尾部开始删除
    //             $('.goods').eq(arr[i]).remove();
    //         }
    //         all();//刷新总数量和总价格
    //         update();
    //     }
    //     //		
    // });

    //删除操作
    // $(".slist").on("click", "li div p .re", function () {
    //     var id = $(this).parent().parent().parent().data(id).id;
    //     // console.log(id);



    // });

    //购物车数量渲染
    function co() {
        var username = getCookie("username");
        // console.log(username);
        $.ajax({
            type: "post",
            url: "../api/listco.php",
            data: "username=" + username,
            success: function (str) {
                // console.log(str);
                //购物车数量
                $(".coou").html(str);
            }
        });
    }





    //退出登录
    $("#tuichu").click(function () {
        // console.log(123);
        removeCookie("username");
        location.href = "login.html";
    });

    //继续购物
    $("#allchecked span").click(function () {
        // console.log(123);
        location.href = "list.html";
    })

    //结算

    $("#go").click(function () {
        console.log("支付成功，哈哈哈哈哈！");
    });


});