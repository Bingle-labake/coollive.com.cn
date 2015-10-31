<?php $this->load->view('public/common_head.php'); ?>
<!--content begin-->
<div class="pub-content">

	<div class="pub-w clearfix">
		<ul class="reg_mobile_nav">
			<li><?php if ($app == 'mobile') { ?><span>手机注册</span><?php }else { ?><a href="<?php echo $this->config->item('i_url').'/signup'; ?>">手机注册</a><?php } ?></li>
			<li><?php if ($app == 'email') { ?><span>邮箱注册</span><?php }else { ?><a href="<?php echo $this->config->item('i_url').'/signup/email'; ?>">邮箱注册</a><?php } ?></li>
		</ul>
		<div class="loginArea fl">
			<dl>
				<dt>手机号：</dt>
				<dd>
					<input type='text' name="mobile" id="mobile" onblur="checkmobile()" class="login_text" />
					<span class='login_error cRed' id="tip_mobile" style="display:none;"></span>
				</dd>
			</dl>
			<dl>
				<dt>昵称：</dt>
				<dd>
					<input type='text' name="username" id="username" onblur="checkusername()" value=""  class="login_text" />
					<span class='login_error cRed' id="tip_username" style="display:none;"></span>
				</dd>
			</dl>
			<dl>
				<dt>密码：</dt>
				<dd>
					<input type='password' name="password" id="password" class="login_text" onKeyUp=pwStrength(this.value) onBlur=pwStrength(this.value) />
					<span class='login_error cRed' id="tip_password" style="display:none;"></span>
					<div class="pwdstrength">密码强度：弱<span><i></i></span>强</div>
				</dd>
			</dl>
			<dl>
				<dt>确认密码：</dt>
				<dd>
					<input type='password' name="confirmpwd" id="confirmpwd" value='' onblur="checkconfirmpwd()" class="login_text" />
					<span class='login_error cRed' id="tip_confirmpwd" style="display:none;"></span>
				</dd>
			</dl>
			<dl>
				<dt>手机验证：</dt>
				<dd>
					<input type='text' name="sms" id="sms" value='' class="login_text login_text_short" />
					<input type="button" id="getverify" class="getverify" value="免费获取验证码" onclick="sendMessage()" />
                    <p class="cRed" id="tip_sms" style="display:none"></p>
				</dd>
			</dl>
			<ul class="login_options">
				<li><input type="checkbox" checked='checked' name="agree" id="agree"/>已经阅读并同意<a href="javascript:;void(0)" onclick="$.layer($('#wintmplregister').html());" class="cOrange"> <<赛酷网服务协议>> </a> 
				  <span class='resetpwd_error cRed' id="tip_agree" style="display:none"></span>
				</li>
				<span class="login_error cRed" id="tip_regctrl" style="display:none"></span>
			</ul>
			<input type="submit" value='注册' class="login_btn" onclick="register_mobile()"/>
		</div>
		<div class="thirdLogin">
			<?php $this->load->view('public/oauth_login.php'); ?>
			<p>已有帐号？请直接<a href="<?php echo $this->config->item('i_url'); ?>/login" class="cOrange">登录</a></p>
		</div>
	</div>
	
</div>
<script type="text/tmpl" id="wintmplregister">
<?php $this->load->view('block/register_protocal');?>
</script>
<script type="text/javascript">
var is_run = false;
function register_mobile(){
	 initial();
	 var obj_agree = document.getElementById("agree");
	 var agree = obj_agree.checked ? 1 : 0;
	 if(!is_run){
		 is_run = true;
		 $('.login_btn').val('正在处理中...请稍后!');
		 $.ajax({
				type: "post",
				url: "/space/member/mobile",
				dataType:"json",
				data:{
				   mobile:$("#mobile").val(),
				   username:$("#username").val(),
				   password:$("#password").val(),
				   confirmpwd:$("#confirmpwd").val(),
	               sms:$("#sms").val(),
				   agree:agree,
				   sign_mobile_submit:true
				  },
				success: function(data){
				      if(!data['result']){
					     $("#tip_"+data['tip_type']).html(data['msg']);
					     $("#tip_"+data['tip_type']).css("display","block");
					  }else{
					     window.location.href='<?php echo $this->config->item('base_url'); ?>';
					  }
					  is_run = false;
					  $('.login_btn').val('注册');
				    
				}
			});
	 }else{
		 $('.login_btn').val('正在处理中...请稍后!');
	}
		
}

function checkmobile(){
 $.ajax({
			type: "post",
			url: "/space/member/check_mobile_validate",
			dataType:"json",
			data:{mobile:$("#mobile").val()},
			success: function(data){
			      if(!data['result']){
				     $("#tip_mobile").html(data['msg']);
				     $("#tip_mobile").css("display","block");
					 return false;
				  }else{
					  
				     $("#tip_mobile").html("");
				     $("#tip_mobile").css("display","none");
				     return true;
				  }
			    
			}
		});
}

function checkusername(){
 $.ajax({
			type: "post",
			url: "/space/member/checkusername",
			dataType:"json",
			data:{username:$("#username").val()},
			success: function(data){
			      if(!data['result']){
				     $("#tip_username").html(data['msg']);
				     $("#tip_username").css("display","block");
					 return false;
				  }else{
				     $("#tip_username").html("");
				     $("#tip_username").css("display","none");
				     return true;
				  }
			    
			}
		});
}

function sendsms(){
	 $.ajax({
				type: "post",
				url: "/space/member/send_signup_sms",
				dataType:"json",
				data:{mobile:$("#mobile").val(),source:'signup_mobile'},
				success: function(data){
					 $("#tip_"+data['tip_type']).html(data['msg']);
				     $("#tip_"+data['tip_type']).css("display","block");
				}
			});
	}


function checkpassword(){
	var password = $("#password").val();
	if(password == '' || password.length<6){
		$("#tip_password").html("密码至少6位");
		$("#tip_password").css("display","inline");
		return false;
	}else{
		$("#tip_password").css("display","none");
		return true;
	}
}

function checkconfirmpwd(){
	if($("#password").val() != $("#confirmpwd").val()){
		$("#tip_confirmpwd").html("两次密码输入不同");
		$("#tip_confirmpwd").css("display","inline");
		return false;
	}else{
		$("#tip_confirmpwd").css("display","none");
		return true;
	}
}

function initial(){
	$("#tip_mobile").css("display","none");
	$("#tip_username").css("display","none");
	$("#tip_password").css("display","none");
	$("#tip_confirmpwd").css("display","none");
	$("#tip_agree").css("display","none");
	$("#tip_regctrl").css("display","none");
	$("#tip_sms").css("display","none");
}

function hidereg(){
	$("#reg_layer").hide();
}

function changeprotocal(v){
	if(v == 1){
       $("#team").css("display","block");
	}else{
	   $("#team").css("display","none");
	}
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
	
		//手机有效性验证
		$.ajax({
			type: "post",
			url: "/space/member/check_mobile_validate",
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
<?php $this->load->view('public/footer.php'); ?> 
