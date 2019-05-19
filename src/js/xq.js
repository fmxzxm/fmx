$(function () {
    //引入头部
    $(".head").load("head.html");
    //引入底部
    $(".dibu").load("foot.html");

    function init1() {
        var data = decodeURI(location.search);
        var str = data.slice(1);
        // console.log(str);
        $.ajax({
            type: "post",
            url: "../api/xq.php",
            data: "id=" + str,
            success: function (str) {
                // console.log(str);
                var arr = JSON.parse(str);
                // console.log(arr);
                var html = arr.map(function (item) {
                    return `
                    <div class="zhong_l">
                    <p class="zhong_l_t">
                        <span>零食饮料</span> >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>坚果炒货</span> >
                    </p>
                    <div class="magnifier" id="magnifier1">
                        <div class="magnifier-container">
                            <div class="images-cover"></div>
                            <!--当前图片显示容器-->
                            <div class="move-view"></div>
                            <!--跟随鼠标移动的盒子-->
                        </div>
                        <div class="magnifier-assembly">
                            <div class="magnifier-btn">
                                <span class="magnifier-btn-left">&lt;</span>
                                <span class="magnifier-btn-right">&gt;</span>
                            </div>
                            <!--按钮组-->
                            <div class="magnifier-line">
                                <ul class="clearfix animation03">
                                    <li>
                                        <div class="small-img">
                                            <img src="../img/list_img/${item.img}" />
                                        </div>
                                    </li>
                                    <li>
                                        <div class="small-img">
                                            <img src="../img/list_img/2.jpg" /> </div>
                                    </li>
                                    <li>
                                        <div class="small-img">
                                            <img src="../img/list_img/3.jpg" /> </div>
                                    </li>
                                    <li>
                                        <div class="small-img">
                                            <img src="../img/list_img/4.jpg" /> </div>
                                    </li>
                                    <li>
                                        <div class="small-img">
                                            <img src="../img/list_img/5.jpg" /> </div>
                                    </li>
                                </ul>
                            </div>
                            <!--缩略图-->
                        </div>
                        <div class="magnifier-view"></div>
                        <!--经过放大的图片显示容器-->
                    </div>
                </div>
                <div class="zhong_c">
                    <p class="zhong_cp">${item.title}</p>
                    <div class="zhong_c1">
                        <p class="zhong_c1p">
                            <span>价格</span>
                            ￥ ${item.price}
                            <span class="zhong_c1ps">
                                <del>[￥ 158]</del>
                            </span>
                        </p>
                        <p class="zhong_c2p">
                            <span>运费</span>
                            <img class="iimg" src="../img/xq_img/icon-zy.png" alt=""> 全场满199元包邮，单笔不足运费8元起，生鲜类仅限深圳同城！
                        </p>
                        <p>
                            <span>配送</span>
                            <select name="">
                                <option value="1">全国</option>
                            </select>
                        </p>
                    </div>
                    <div class="zhong_c2">
                        <p>
                            <span>时效</span>
                            当日16：00前下单，${item.address}次日送货上门(仅限深圳同城)！
                        </p>
                        <p>
                            <span>提示</span>
                            产品图片及其描述仅作参考，${item.kind}请您以收到的实物为准！
                        </p>
                        <p class="zhong_c2p">
                            <span>理赔</span>
                            ${item.courier}
                        </p>
                    </div>
                    <div class="zhong_c3">
                        <div class="zhong_c3t">
                            <P>规格</P>
                            <P>280g
                                <img src="../img/xq_img/c-img.png" alt="">
                            </P>
                            <P class="zhong_c3tp">300g
                                <img src="../img/xq_img/c-img.png" alt="">
                            </P>
                        </div>
                        <div class="zhong_c3f">
                            <p>
                                <img class="iimg1" src="../img/xq_img/icon-fx.png" alt="">
                                <span>收藏</span>
                            </p>
                            <p class="zhong_c3ff">
                                <input type="button" class="couadd" value="+">
                                <input type="button" class="coucut" value="-">
                                <input type="text" class="counts" placeholder="1">
                                <input type="text" class="caddshop" value="加入购物车">
                            </p>
                        </div>
                    </div>
                </div>
                         `
                }).join("");

                $(".zzhong").html(html);
                aa();


                bb();




                // fdj();

            }

        });
    }
    init1();

    function aa() {
        (function ($) {

            var fnName = 'magnifier';
            var magnifier = {
                magnifier: ".magnifier",//最外层的大容器

                container: ".magnifier-container",//选择当前主图的承载容器

                containerImg: '.images-cover',//图片的容器

                view: ".magnifier-view",//图片放大后承载容器

                width: 400,//图片放大后承载容器宽度

                height: 400,//图片放大后承载容器高度

                moveView: ".move-view",//跟随鼠标移动的容器

                moveWidth: null,//如果设置了移动盒子的宽度，则不计算缩放比例

                zoom: 4,//缩放比例

                thumbnail: ".magnifier-line > ul",//缩略图容器

                assembly: ".magnifier-btn",//按钮组

                index: 0//当前图片的索引
            };


            window[fnName] = function (magnifierAttr) {

                //设置属性值
                if (typeof (magnifierAttr) == "object") {

                    for (var n in magnifierAttr) {

                        magnifier[n] = magnifierAttr[n];
                    }
                }

                var _this = this;
                //绑定容器
                _this.magnifier = $(magnifier.magnifier);
                _this.container = _this.magnifier.find(magnifier.container);
                _this.view = _this.magnifier.find(magnifier.view);
                _this.moveView = _this.magnifier.find(magnifier.moveView);
                _this.thumbnail = _this.magnifier.find(magnifier.thumbnail);
                _this.assembly = _this.magnifier.find(magnifier.assembly);
                _this.containerImg = _this.magnifier.find(magnifier.containerImg);
                var imgBox = _this.containerImg;

                //設置寬高
                _this.magnifier.css({
                    "width": magnifier.width
                });
                _this.container.css({
                    "width": magnifier.width,
                    "height": magnifier.height
                });
                _this.view.css({
                    "width": magnifier.width,
                    "height": magnifier.height
                });

                var boxMoveViewWidth, boxMoveViewHeight;
                if (magnifier.moveWidth) {

                    boxMoveViewWidth = magnifier.moveWidth;
                } else {

                    boxMoveViewWidth = magnifier.width / magnifier.zoom;
                }
                boxMoveViewHeight = boxMoveViewWidth;

                _this.moveView.css({
                    "width": boxMoveViewWidth,
                    "height": boxMoveViewHeight
                });

                //计算体积碰撞的变量
                var deviationXl,
                    deviationXr,
                    deviationYt,
                    deviationYb,
                    imgWidth,
                    imgHieght,
                    multiple;

                _this.eqImg = function () {

                    var img = new Image(),
                        src = _this.thumbnail.find("img").eq(magnifier.index).attr('src');

                    img.src = src;

                    //承载容器的宽高
                    containerWidth = magnifier.width;
                    containerHeight = magnifier.height;

                    _this.thumbnail.find('>*').removeClass('active').eq(magnifier.index).addClass('active');

                    function imgLoadEnd() {

                        if (img.width == 0) {

                            img.onload = imgLoadEnd;
                        }

                        var styleCss;
                        if (img.width > img.height) {

                            imgWidth = magnifier.width;
                            imgHieght = img.height / (img.width / magnifier.width);
                            styleCss = "top:50%;margin-top:" + (-imgHieght / 2) + "px";
                        } else {

                            imgWidth = img.width / (img.height / magnifier.width);
                            imgHieght = magnifier.width;

                            styleCss = "left:50%;margin-left:" + (-imgWidth / 2) + "px";
                        }

                        imgBox.empty().append('<img src="' + src + '" width="' + imgWidth + '" height="' + imgHieght + '" style="' + styleCss + '" />');

                        //重新计算移动盒子与图片的倍数
                        multiple = magnifier.width / boxMoveViewWidth;

                        //容器加载图片
                        _this.view.empty().append('<img src="' + src + '" width="' + imgWidth * multiple + '" height="' + imgHieght * multiple + '" />');

                        //偏移量
                        deviationXl = (magnifier.width - imgWidth) / 2;
                        deviationXr = magnifier.width - deviationXl - boxMoveViewWidth + 1;//这里额外+1的是要计算容器的左边框
                        deviationYt = (magnifier.height - imgHieght) / 2;
                        deviationYb = magnifier.height - deviationYt - boxMoveViewHeight + 1;//这里额外+1的是要计算容器的上边框

                    }

                    imgLoadEnd();
                }
                //完成后执行
                _this.eqImg();

                _this.moveFn = function (e) {

                    var X = (e.clientX - _this.magnifier.offset().left) - boxMoveViewWidth / 2,
                        Y = (e.clientY - _this.magnifier.offset().top + $(document).scrollTop()) - boxMoveViewHeight / 2;

                    endX = (X > deviationXl) ? (X < deviationXr) ? X : deviationXr : deviationXl;
                    endY = (Y > deviationYt) ? (Y < deviationYb) ? Y : deviationYb : deviationYt;

                    //当Y轴超出容器
                    endY = (endY > 0) ? (endY > (magnifier.width - boxMoveViewHeight)) ? (magnifier.height - boxMoveViewHeight) : endY : 0;
                    _this.moveView.css({
                        'left': endX,
                        'top': endY,
                        'display': "block"
                    });

                    positionX = (endX - (magnifier.width - imgWidth) / 2) * multiple;
                    positionY = (endY - (magnifier.height - imgHieght) / 2) * multiple;

                    _this.view.css({
                        'display': "block"
                    }).find('img').css({
                        'margin-left': -positionX,
                        'margin-top': -positionY
                    });
                }

                _this.container.on('mousemove', function (e) {

                    _this.moveFn(e);

                }).on('mouseleave', function () {

                    _this.moveView.hide();
                    _this.view.hide();
                });

                var thumbnailImg = _this.thumbnail.find('>*'),
                    lineLenght = thumbnailImg.length;
                _this.imgMove = function (_boole) {

                    (_boole) ? magnifier.index++ : magnifier.index--;

                    var _deviation = Math.ceil(magnifier.width / thumbnailImg.width() / 2);
                    if (lineLenght < _deviation) {
                        return false;
                    }

                    (magnifier.index < 0) ? magnifier.index = 0 : (magnifier.index > lineLenght - _deviation) ? magnifier.index = lineLenght - _deviation : magnifier.index;

                    var endLeft = (thumbnailImg.width() * magnifier.index) - thumbnailImg.width();

                    _this.thumbnail.css({

                        "left": ((endLeft > 0) ? -endLeft : 0) + "px"
                    });
                }

                //按钮组动作
                _this.assembly.find(">*").on('click', function () {

                    _this.imgMove($(this).index());
                });

                thumbnailImg.on('click', function () {

                    magnifier.index = $(this).index();

                    //显示图片
                    _this.eqImg();

                    //缩略图位置移动
                    _this.imgMove(magnifier.index);
                });

                _this.setIndex = function (n) {

                    magnifier.index = (n) ? n : 0;
                }

                return _this;
            }
        })(jQuery);
        $(function () {
            // $.ajax({
            // 	type: "get",
            // 	url: "api/getimg.php",//获取图片url
            // 	async: true,
            // 	success: function(str) {
            // 		console.log(str);//[{"id":"1","url":"1.jpg&2.jpg&3.jpg&4.jpg&1.png&2.png&3.png&4.png"}]
            // 		var arr = JSON.parse(str)[0].url.split('&');//切割得到一组图片路径 ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '1.jpg', '2.png', '3.png', '4.png']
            // 		//渲染数据到节点
            // 		$res = arr.map(function(item) {
            // 			return `<li>
            // 						<div class="small-img">
            // 							<img src="images/${item}" />
            // 						</div>
            // 					</li>`;
            // 		}).join('');


            // 	}
            // });

            // $('.animation03').html($res);

            //放大镜插件使用：先渲染再调用插件
            var magnifierConfig = {
                magnifier: "#magnifier1", //最外层的大容器
                width: 400, //承载容器宽
                height: 400, //承载容器高
                moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
                zoom: 5 //缩放比例
            };

            var _magnifier = magnifier(magnifierConfig);

        });
    }
    //点击发送留言

    function bb() {
        var usn = getCookie("username");

        $("#btn").click(function () {

            var str = $("#con").val();
            var str1 = filter(str);//过滤敏感词
            var aaa = (new Date()).getTime();
            var b = setTimes(aaa);
            var timed = b.years + "年" + b.mons + "月" + b.days + "日" + b.hours + "时" + b.mins + "分" + b.secs + "秒";
            // console.log(b);
            // console.log(timed);
            if (usn) {
                $.ajax({
                    type: "post",
                    url: "../api/lyb.php",
                    data: "username=" + usn + "&contct=" + str1 + "&timed=" + timed,
                    success: function (str) {//1
                        // console.log(str);
                        if (str) {
                            init2();
                        }
                        $("#con").val();

                    }
                });
            } else {
                alert("请先登录！");
            }

        });

    }

    var lybpage = 1;
    var lybnum = 5;

    function init2() {
        $.ajax({
            type: "post",
            url: "../api/lyb1.php",
            data: "page=" + lybpage + "&num=" + lybnum,
            success: function (str) {
                var arr = JSON.parse(str);
                // console.log(arr);
                var a = "";
                var html = arr.map(function (item) {
                    return `
                    <li data-id="${item.id}">
                        <dl>
                            <dt>${item.username}说：</dt>
                            <dd class="connn">${item.contect}</dd>
                            <dd class="timerr">${item.timed}</dd>
                        </dl>
                    </li>`;
                }).join("");
                a += html;
                $(".lybul").html(a);
            }
        });
    }
    init2();


    $("#addmore").click(function () {
        lybnum += 5;
        init2();
    });

});