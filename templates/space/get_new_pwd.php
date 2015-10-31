<?php $this->load->view('public/common_head.php'); ?>
<!--content begin-->
<div class="pub-content">

	<div class="pub-w clearfix">
		<div class="loginArea third_info">
			<h2 class="cOrange">密码重置</h2>
			<input type="hidden" name="uid" id="uid" value="<?php if (isset($_GET['uid'])) { ?><?php echo $_GET['uid']; ?><?php } else { ?><?php echo $uid; ?><?php } ?>">
			<dl>
				<dt>新密码：</dt>
				<dd>
					<input type='password' onBlur="checkpassword()" name="password" id="password" value='' class="login_text" onKeyUp=pwStrength(this.value) onBlur=pwStrength(this.value) />
					<!--<span class='login_ok'></span>-->
					<span class='login_error cRed' style="display:none" id="tip_password"></span>
					<div class="pwdstrength">密码强度：弱<span><i></i></span>强</div>
				</dd>
			</dl>
			<dl>
				<dt>确认密码：</dt>
				<dd>
					<input type='password' onBlur="checkconfirmpwd()" name="confirmpwd" id="confirmpwd" value='' class="login_text" />
					<span class='login_error cRed' style="display:none" id="tip_confirmpwd"></span>
				</dd>
			</dl>
			<input type="submit" value='确定' class="login_btn" onclick="getpassword()"/> 
			<span class='resetpwd_error cRed' style="display:none" id="tip_password"></span>
			<span class='resetpwd_ok' style="display:none" id="tip_getpwd"></span>
			<!--<ul class="login_options">
				<li class='cOrange'>拨打客服 86-10-110 客服帮忙找回</li>
			</ul>-->
		</div>
	</div>
	
</div>
<!--content end-->
<script type="text/javascript">
var is_run = false;
function getpassword(){
	if(!is_run) {
		is_run = true;
		$('.login_btn').val('正在处理中...请稍后!');
	    $.ajax({
				type: "post",
				url: "/space/member/getpassword",
				dataType:"json",
				data:{
					password:$("#password").val(),
					confirmpwd:$("#confirmpwd").val(),
					uid:$("#uid").val(),
					getpwdsubmit:true
				},
				success: function(data){
				      if(!data['result']){
					     $("#tip_"+data['tip_type']).html(data['msg']);
					     $("#tip_"+data['tip_type']).css("display","inline");
					     is_run = false;	
						 $('.login_btn').val('确 定');
					  }else{
						  $(".resetpwd_ok").html(data['msg']);
						  $(".resetpwd_ok").css("display","inline");
					      setTimeout(function(){window.location.href='/space/member/login';},3000);
					  }
				}
			});	
	}else {
		$('.login_btn').val('正在处理中...请稍后!');
	}
	 
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
	$("#tip_password").css("display","none");
	$("#tip_confirmpwd").css("display","none");
}
</script>
<?php $this->load->view('public/footer.php'); ?>