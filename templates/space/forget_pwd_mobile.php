<?php $this->load->view('public/common_head.php'); ?>
<!--content begin-->
<div class="pub-content">

	<div class="pub-w clearfix">
		<ul class="reg_mobile_nav">
			<li><?php if ($app == 'mlostpwd') { ?><span>手机号找回</span><?php } else { ?><a href="<?php $this->config->item('i_url'); ?>/lostpwd">手机号找回</a><?php } ?></li>
			<li><?php if ($app == 'lostpwd') { ?><span>邮箱找回</span><?php } else { ?><a href="<?php $this->config->item('i_url'); ?>/lostpwd/email">邮箱找回</a><?php } ?></li>
		</ul>
		<div class="loginArea third_info">
			<dl>
				<dt>手机号：</dt>
				<dd>
					<input type='text' name="mobile" id="mobile"  class="login_text" />
					<span class='login_error cRed' id="tip_mobile" style="display:none"></span>
				</dd>
			</dl>
			<dl>
				<dt>手机验证：</dt>
				<dd>
					<input type='text' name="sms" id="sms" value='' class="login_text login_text_short" />
					<input type="button" id="getverify" class="getverify" value="免费获取验证码" onclick="sendMessage()" />
					<p class='cRed' id="tip_sms" style="display:none"></p>
				</dd>
			</dl>
			<input type="submit" value='确定' class="login_btn" onclick="lostpwd()"/> <i class="ok"></i>
		</div>
	</div>
	
</div>

<script type="text/javascript">
var is_run = false;
function lostpwd(){
	 initial();
	 if(!is_run){
		 is_run = true;
		 $(".login_btn").val("正在处理中...请稍后!");
		 $.ajax({
					type: "post",
					url: "/space/member/mlostpwd",
					dataType:"json",
					data:{
						mobile:$("#mobile").val(),
						sms:$("#sms").val(),
						mlostpwdsubmit:true
					},
					success: function(data){
					      if(!data['result']){
						     $("#tip_"+data['tip_type']).html(data['msg']);
						     $("#tip_"+data['tip_type']).css("display","block");
						  }else{
						     location.href='<?php echo $this->config->item('i_url'); ?>/space/member/mgetpassword';
						  }
					      is_run = false;
						  $(".login_btn").val("确定");
					    
					}
				});
	 }else{
		 $(".login_btn").val("正在处理中...请稍后!");
	 }
}

function sendsms(){
	 $.ajax({
				type: "post",
				url: "/space/member/send_signup_sms",
				dataType:"json",
				data:{mobile:$("#mobile").val(),source:'mlostpwd'},
				success: function(data){
					 $("#tip_"+data['tip_type']).html(data['msg']);
				     $("#tip_"+data['tip_type']).css("display","block");
				}
			});
}
	
function initial(){
	$("#tip_mobile").css("display","none");
	$("#tip_sms").css("display","none");
}
</script>
<script type="text/javascript">
/*-------------------------------------------*/
var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
var code = ""; //验证码
var codeLength = 6;//验证码长度
var but_hq = $("#getverify");//按钮
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

        initial();
		//手机有效性验证
		$.ajax({
			type: "post",
			url: "/space/member/check_forget_mobile_validate",
			dataType:"json",
			data:{mobile:$("#mobile").val()},
			success: function(data){
			      if(!data['result']){
				     $("#tip_mobile").html(data['msg']);
				     $("#tip_mobile").css("display","block");
					 return false;
				  }else{
					//设置button效果，开始计时
					but_hq.attr("disabled", "true");
					but_hq.val("请在" + curCount + "秒内输入验证码");
					InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
					sendsms();//发送短信验证码
				  }
			    
			}
		});
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
<script type="text/tmpl" id="phone_success">
<div class="phone-tan">
	<h2><a class="win-close" href=""></a></h2>
    <dl>
    	<dt class="fY f14px">手机号码修改成功！</dt>
        <dd><a href="" >继续编辑个人资料</a></dd>
    </dl>
</div>
</script>
<?php $this->load->view('public/footer.php'); ?>
