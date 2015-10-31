<?php $this->load->view('public/common_head.php'); ?>
<div class="youngstar body_bg">
<!--content begin-->

<div class="starConter">
	<div class="register_over">
    	<a href="" title="返回个人中心"></a>
    </div>
    <dl class="sta-foot fY">
    	<dt></dt>
        <dd>
            <p>
                <a href="http://www.saiku.com.cn/corporation">关于网站</a>
                <a href="http://www.saiku.com.cn/copyright">版权声明</a>
                <a href="http://www.saiku.com.cn/privacy">隐私保护</a>
                <a href="http://www.saiku.com.cn/contact">联系方式</a>
                <a href="http://www.saiku.com.cn/jobs">加入我们</a>
                <a href="http://www.saiku.com.cn/feedback">意见反馈</a>
            </p>
            <p>Copyright © 2014 Saiku.com.cn,All rights reserved. 京ICP备14012047-1   京公网安备11010102001187号</p>
        </dd>
    </dl>
</div>

<!--content end-->
</div>
<script type="text/tcl" id="paymentOk">
<div class="paymentOk">
    <dl>
    	<dt>请在新页面完成支付</dt>
        <dd>支付完成前请不要关闭此窗口，<br />完成支付后根据您的情况点击下面按钮</dd>
    </dl>
    <ul>
        <li class="fl"><a href="javascript:;" title="支付已完成">支付已完成</a></li>
        <li class="fr"><a href="javascript:;" title="返回重新支付">返回重新支付</a></li>
    </ul>
</div>
</script>
<div class="pub-downmenu hide" id="pub-downmenu">
    <li data-val="1">50</li>
    <li data-val="2">100</li>
    <li data-val="3">200</li>
    <li data-val="4">300</li>
    <li data-val="5">500</li>
</div>
<script>
$.downMenu($("#paydemo"),function(element){
    alert(element.data("val"))
});
$("#payButton").click(function(){
	var fudong = $.layer($("#paymentOk").html());
	fudong.find("a").click(function(){
		alert("购买成功了！！！");
		$.layer();
		})
});
function MentBG(){
	var mva = $("#MentBGa"),mvb = $("#MentBGb"),mvc = $("#MentBGc"),mvd = $("#MentBGd"),win = $("#WINBG");
	win.css({display:'block'});
	mva.removeClass("hide");
	mva.find("div").click(function(){
		mva.addClass("hide");
		mvb.removeClass("hide");
	});
	mvb.find("div").click(function(){
		mvb.addClass("hide");
		mvc.removeClass("hide");
	});
	mvc.find("div").click(function(){
		mvc.addClass("hide");
		mvd.removeClass("hide");
	});
	mvd.find("div").click(function(){
		mvd.addClass("hide");
		win.css({display:'none'});
	});
	mvd.find("span").click(function(){
		mvd.addClass("hide");
		mva.removeClass("hide");
	});
};
setTimeout(function(){window.location.href='<?php echo $this->config->item('base_url'); ?>/youngstar/<?php echo $join_type; ?>/<?php echo $group_type; ?>';},3000);
</script>
<div class="WINBG" id="WINBG" style="display:none;opacity:0.3;"></div>
<?php $this->load->view('public/footer.php'); ?>
