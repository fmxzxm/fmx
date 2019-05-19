$(function () {


    //注册按钮跳转注册页
    $(".s1").click(function () {
        location.href = "register.html";
    });


    function randomCode() {
        var html = '0987654321qwertyuioplkjhgfdsazxcvbnmZXCVBNMLKJHGFDSAQWERTYUIOP';
        var res = '';
        for (var i = 0; i < 4; i++) {
            var now = parseInt(Math.random() * html.length);
            res += html[now];
        }
        return res;
    }
    //验证码生成
    $(".d2").html(randomCode());

    $(".d2").click(function () {
        // console.log(123);
        //验证码
        $(".d2").html(randomCode());
    });


    //点击登录

    $(".li2").click(function () {
        // console.log(123);
        //验证码输入正确才能登录
        if ($("#yzm").val() == $(".d2").html()) {
            // console.log(123);
            // console.log($("#user").val());
            // console.log($("#pass").val());

            $.ajax({
                type: "post",
                url: "../api/login.php",
                data: "username=" + $("#user").val() + "&password=" + $("#pass").val(),
                success: function (str) {
                    if (str == "ok") {
                        setCookie("username", $("#user").val(), 7);
                        location.href = "../index1.html";
                    } else {
                        alert("用户或密码不正确！");
                    }
                }
            });






        }


    })













});