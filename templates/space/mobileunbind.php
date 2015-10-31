<?php $this->load->view('public/common_head.php'); ?>
<div class="my_phone">
    <div class="phone_title"><h2><a href="/space/set/mobile" class="cWhite">手机设置</a></h2></div>
    <div class="phone_cont">
        <dl>
            <dt><span>您绑定的手机是：  <?php echo $space['mobile']; ?></span><input type="button" value="修改号码" /></dt>
            <dd><span>如果不想继续使用该手机，可以</span><a href="/space/set/mobileunbind">解除绑定</a></dd>
        </dl>
    </div>
    <div class="phone_bott">
        <ul class="phone_jbcg">
        	<li></li>
        </ul>
    	<h2>手机号码： <?php echo $space['mobile']; ?></h2>
        <dl>
        	<dt>验证码：</dt>
            <dd>
                <p><input id="hQuyzma" type="button" value="免费获取验证码" onclick="sendMessage()" /></p>
                <span><input type="text" name="sms" id="sms" value=""><a href="javascript:;" onClick="is_unbind()">解除绑定</a></span>
                <p class="cRed" id="tip_sms" style="display:none"></p>
            </dd>
        </dl>
    </div>
    
</div>
<!--content end-->
<script type="text/tmpl" id="phone_jiebang">
<div class="phone-tan w458">
	<h2><span onClick="$.layer()" class="win-close"></span>解除绑定</h2>
    <dl>
    	<dt class="fY f14px">确定要解除绑定的手机号码吗？<p class="cOrange f12px">解除后将不再获得新的评委积分，之前获得的评委积分可以继续使用</p></dt>
        <dd><a href="javascript:;" onClick="$.layer()">取消</a><a href="javascript:;" onClick="unbind()">确定</a></dd>
    </dl>
</div>
</script>
<script type="text/tmpl" id="phone_jiebangcg">
<div class="phone-tan">
	<h2><a class="win-close" href="/u/set"></a></h2>
    <dl>
    	<dt class="fY f14px">手机号码解绑成功！</dt>
        <dd><a href="/u/set" >继续编辑个人资料</a></dd>
    </dl>
</div>
</script>
<script type="text/javascript">
function unbind(){
	 $.layer();
	 $.ajax({
				type: "post",
				url: "/space/set/mobileunbind",
				dataType:"json",
				data:{sms:$("#sms").val()},
				success: function(data){
					 if(!data['result']){
						 $("#tip_"+data['tip_type']).html(data['msg']);
					     $("#tip_"+data['tip_type']).css("display","block");
					 }else{
						 $.layer($('#phone_jiebangcg').html());
					 }
				}
	  });
}

function is_unbind(){
	 initial();
	 $.ajax({
				type: "post",
				url: "/space/set/is_mobileunbind_validate",
				dataType:"json",
				data:{sms:$("#sms").val()},
				success: function(data){
					 if(!data['result']){
						 $("#tip_"+data['tip_type']).html(data['msg']);
					     $("#tip_"+data['tip_type']).css("display","block");
					 }else{
						 $.layer($('#phone_jiebang').html())
					 }
				}
	  });
}

function sendsms(){
	 initial();
	 $.ajax({
				type: "post",
				url: "/space/set/send_set_sms",
				dataType:"json",
				data:{mobile:'<?php echo $space['mobile']; ?>',source:'mobileunbind_set'},
				success: function(data){
					 $("#tip_"+data['tip_type']).html(data['msg']);
				     $("#tip_"+data['tip_type']).css("display","block");
				}
	  });
}

function initial(){
	$("#tip_sms").html("");
	$("#tip_mobile").html("");
}
</script>
<script type="text/javascript">
/*-------------------------------------------*/
var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
var code = ""; //验证码
var codeLength = 6;//验证码长度
var but_hq = $("#hQuyzma");//按钮
function sendMessage() {
	curCount = count;
	var dealType; //验证方式
var uid=$("#uid").val();//用户uid
if ($("#phone").attr("checked") == true) {
		dealType = "phone";
	}
	else {
		dealType = "email";
	}
	//产生验证码
for (var i = 0; i < codeLength; i++) {
		code += parseInt(Math.random() * 9).toString();
	}
	//设置button效果，开始计时
		but_hq.attr("disabled", "true");
		but_hq.val("请在" + curCount + "秒内输入验证码");
		InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
		sendsms();
	}
//timer处理函数
function SetRemainTime() {
	if (curCount == 0) {                
		window.clearInterval(InterValObj);//停止计时器
		but_hq.removeAttr("disabled");//启用按钮
		but_hq.val("重新发送验证码");
		code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效    
	}
	else {
		curCount--;
		but_hq.val("请在" + curCount + "秒内输入验证码");
	}
}
</script>
<?php $this->load->view('public/footer.php'); ?>
