$(function () {
    //手机验证
    $("#inp1").blur(function () {
        if (!$("#inp1").val().trim()) {
            $(".dd1").css("display", "block");
            // $("#img2").css("display", "block");
            $(".p1").html("请输入正确的手机号码");
        } else {
            if ($("#inp1").val().trim().length == 11) {
                $(".dd1").css("display", "block").css("background-position-y", "0");
                // $(".p1").html("");
                $(".p1").css("display", "none");

                $.ajax({
                    type: "post",
                    url: "../api/register.php",
                    data: "userphone=" + $("#inp1").val(),
                    success: function (str) {
                        if (str == "no") {
                            $(".p1").css("display", "block");
                            $(".p1").html("用户名已存在");
                        } else {
                            if ($("#inp1").val()) {
                                $(".p1").css("display", "block");
                                $(".p1").html("用户名可用");
                            }

                        }
                    }
                });

            } else {
                // $(".dd1").css("display", "block");
                $(".p1").html("请输入正确的手机号码");
                $(".dd1").css("display", "block").css("background-position-y", "-40px")
            }
        }

    });

    //用户名失去焦点数据库验证
    // $("#inp1").blur(function () {

    // })

    //密码验证
    $("#inp6").blur(function () {
        //密码验证
        if (!$("#inp6").val().trim()) {
            $(".dd2").css("display", "block");
            // $("#img2").css("display", "block");
            $(".p2").html("密码为6-16位的数字，字母或下划线组成");
        } else {
            if ($("#inp6").val().trim().length >= 6 && $("#inp6").val().trim().length <= 16) {
                $(".dd2").css("display", "block").css("background-position-y", "0");
                // $(".p1").html("");
                $(".p2").css("display", "none");

            } else {
                // $(".dd1").css("display", "block");
                $(".p2").css("display", "block");
                $(".p2").html("密码为6-16位的数字，字母或下划线组成");
                $(".dd2").css("display", "block").css("background-position-y", "-40px")
            }
        }

    });

    $("#inp3").blur(function () {
        //密码确认验证
        if ($("#inp3").val().trim() == $("#inp6").val().trim()) {
            $(".dd3").css("display", "block").css("background-position-y", "0");
            $(".p3").css("isplay", "none");
        } else {
            $(".p3").css("display", "block");
            $(".p3").html("两次输入的密码不一致");
            $(".dd3").css("display", "block").css("background-position-y", "-40px")

        }

    });

    //已有账号中的登录
    $(".reg").click(function () {
        location.href = "login.html";
    });

    //短信验证码之前的验证码
    function randomCode() {
        var html = '0987654321qwertyuioplkjhgfdsazxcvbnmZXCVBNMLKJHGFDSAQWERTYUIOP';
        var res = '';
        for (var i = 0; i < 4; i++) {
            var now = parseInt(Math.random() * html.length);
            res += html[now];
        }
        return res;
    }
    //短信验证
    $("#inp5").click(function () {
        //验证码弹出
        $(".zy").css("display", "block");
        //初始的验证码
        $("#p4").html(randomCode());
        $(function () {
            //点击切换
            $("#p4").click(function () {
                // console.log(randomCode());
                $("#p4").html(randomCode());
            });
            //输入验证码
            $("#inp7").keyup(function () {
                if ($("#inp7").val() == $("#p4").html()) {//如果相等
                    $(".zy").css("display", "none");//弹框隐藏

                    var num = 60;//倒计时
                    var timer2 = setInterval(dj, 1000);
                    function dj() {
                        $("#inp5").val("请等候" + num-- + "秒");
                        if (num < 0) {
                            clearInterval(timer2);
                            $("#inp5").val("发送验证码！");
                        }
                    }
                    //调用接口，获取验证码
                    $.ajax({
                        type: "post",
                        url: "../api/duanxin.php",
                        data: "userphone=" + $("#inp1").val(),
                        success: function (str) {
                            console.log(str);
                            arr = JSON.parse(str);
                            console.log(arr);
                        }
                    });

                }
            });


        });


    });




    //注册完成
    $(".li3").click(function () {



        if (arr.phonecode == $("#inp2").val()) {

            $.ajax({
                type: "post",
                url: "../api/register1.php",
                data: "userphone=" + $("#inp1").val() + "&password=" + $("#inp6").val(),
                success: function (str) {
                    // console.log(str);
                    if (str == 1) {
                        location.href = "../index1.html";
                    }

                }
            });

        } else {
            alert("验证码错误！");
        }

        // console.log($("#inp6").val());










    })










})