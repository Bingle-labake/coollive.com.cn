<?php $this->load->view('public/common_head.php'); ?>
<!--content begin-->
<div class="pub-content">

	<div class="pub-w clearfix">
		<div class="loginArea third_info">
			<h2 class="cOrange">第三方登录信息补充</h2>
			<input type="hidden" name="oid" value="<?php echo $oid; ?>" id="oid">
			<!--<dl>
				<dt>身份：</dt>
				<dd>
					<ul class='login_p_type'>
						<li>
							<input type='radio' name="type" onchange="changeprotocal(this.value)" value="0" checked="checked"/> 个人
						</li>
						<li>
							<input type='radio' name="type" onchange="changeprotocal(this.value)" value="1"/> 团体
						</li>	
					</ul>
				</dd>
				<dd></dd>
			</dl>-->
			<dl>
				<dt>邮箱：</dt>
				<dd>
					<input type='text' name="eamil" id="email" onblur="checkemail()" class="login_text" />
					<span class='login_error cRed' id="tip_email" style="display:none;"></span>
				</dd>
			</dl>
			<dl>
				<dt>昵称：</dt>
				<dd>
					<input type='text' name="username" id="username" onblur="checkusername()" value="<?php echo $username; ?>"  class="login_text" />
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
				<dt>验证码：</dt>
				<dd>
					<input type='text' name="capcode" id="capcode" value='' class="login_text" />
					<span><img id="capcode_img" src="/space/member/getcapcode?type=reg" onclick="changecapcode()"></span>
					<br><span class="login_error cRed" id="tip_capcode" style="display:none;">验证码错误</span> 
				</dd>
			</dl>
			<ul class="login_options">
			    <li style="display:none" id="team"><input type="checkbox" name="team_open" checked='checked' id="team_open"/>开通社团<a href="#" class="cOrange"> <<开通社团须知>> </a> 
				  <span class='resetpwd_error cRed' id="tip_team_open" style="display:none">请先阅读开通社团须知</span>
				</li>
				<li><input type="checkbox" checked='checked' id="agree"/>已经阅读并同意<a href="javascript:;void(0)" onclick="$.layer($('#wintmplregister').html());" class="cOrange"> <<赛酷网服务协议>> </a> 
				  <span class='login_error cRed' id="tip_agree" style="display:none;"></span>
				</li>
				<span class="login_error cRed" id="tip_regctrl" style="display:none"></span>
			</ul>
			<input type="submit" value='确定' class="login_btn" onclick="register()"/>
		</div>
	</div>
	
</div>
<div id="reg_layer" style="display:none">
<h2 class="f16px fY cWhite" style="width:362px;overflow:hidden;height:26px;padding:12px 20px 0;background:#efa280;line-height:18px;">注册成功！<span class="win-close" onclick="$.layer()"></span></h2>
<dl class="pub-confirm" style="border:none">
		<dt>
			<strong style="font-size:14px" class="f16px cOrange fY">补充完成！</strong>
            <strong class="f16px fY" style="font-size:13px">我们已经向你的邮箱发送了注册激活邮件,请查看。<a class="cOrange " href="#" id="goemail" target="_blank">去我的邮箱</a></strong>
            <strong class="f16px fY" style="margin-right: 220px;font-size:13px">没有收到邮件?<a class="cOrange" href="javascript:;void(0)" onclick="sendemail()">重新发送</a> <span id="tip_emailagain" style="color:red"></span></strong>
            <strong style="font-size:10px;color:gray;" class="f16px fY"><span style="color:red">*</span>如您没有找到激活邮件，请到垃圾箱查看，或把我们加入白名单，便于以后操作</strong>
		</dt>
		
</dl>
</div>
<script type="text/tmpl" id="msgtmpl">
</script>
<script type="text/tmpl" id="wintmplregister">
<?php $this->load->view('block/register_protocal');?>
</script>
<script type="text/javascript">
var is_run = false;
var m = {'163.com':['http://mail.163.com','网易163邮箱'],
		'139.com':['http://mail.10086.cn','139手机邮箱'],
		'sohu.com':['http://mail.sohu.com','搜狐邮箱'],
		'tom.com':['http://mail.tom.com','TOM邮箱'],
		'189.cn':['http://webmail21.189.cn/webmail','189邮箱'],
		'126.com':['http://www.126.com','网易126邮箱'],
		'gmail.com':['https://accounts.google.com/ServiceLogin?service=mail&passive=true&rm=false&continue=http://mail.google.com/mail/&scc=1<mpl=default<mplcache=2','Gmail'],
		'sina.com.cn':['http://mail.sina.com.cn/?err=50102','新浪邮箱'],
		'vip.sina.com':['http://mail.sina.com.cn/?err=50102','新浪邮箱'],
		'vip.sina.com.cn':['http://mail.sina.com.cn/?err=50102','新浪邮箱'],
		'sina.com':['http://mail.sina.com.cn/?err=50102','新浪邮箱'],
		'hotmail.com':['https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=11&ct=1331866872&rver=6.1.6206.0&wp=MBI&wreply=http:%2F%2Fmail.live.com%2Fdefault.aspx&lc=2052&id=64855&mkt=zh-cn&cbcxt=mai&snsc=1','Hotmail'],
		'sogou.com':['http://mail.sogou.com/','搜狗邮箱'],
		'qq.com':['https://mail.qq.com/cgi-bin/loginpage?','QQ邮箱'],
		'yahoo.com.cn':['http://mail.cn.yahoo.com/','雅虎邮箱'],
		'yahoo.cn':['http://mail.cn.yahoo.com/','雅虎邮箱'],
		'eyou.com':['http://www.eyou.com/','亿邮'],
		'21cn.com':['http://mail.21cn.com/','21CN邮箱'],
		'188.com':['http://www.188.com/','188财富邮'],
		'yeah.net':['http://www.yeah.net/','网易Yeah.net邮箱'],
		'263.net':['http://www.263.net/','263邮箱']};
		
function register(){
	 initial();
	 var obj_agree = document.getElementById("agree");
	 var obj_team = document.getElementById("team_open");
	 var agree = obj_agree.checked ? 1 : 0;
	 var team_open = obj_team.checked ? 1 : 0;
	 if(!is_run){
		 is_run = true;
		 $('.login_btn').val('正在处理中...请稍后!');
		 $.ajax({
				type: "post",
				url: "/space/member/register",
				dataType:"json",
				data:{
				   email:$("#email").val(),
				   username:$("#username").val(),
				   password:$("#password").val(),
				   confirmpwd:$("#confirmpwd").val(),
				   oid:$("#oid").val(),
				   type:$('input[name="type"]:checked').val(),
	               //team_open:team_open,
				   capcode:$("#capcode").val(),
				   agree:agree,
				   regsbumit:true
				  },
				success: function(data){
					  if(!data['result']){
						     $("#tip_"+data['tip_type']).html(data['msg']);
						     $("#tip_"+data['tip_type']).css("display","block");
						  }else{
						     /*var email = $("#email").val();
						     var email_domain = email.split('@')[1];
						     if(typeof(m[email_domain]) != 'undefined'){
							     $("#goemail").attr("href",m[email_domain][0]);
							     $('#msgtmpl').html($("#reg_layer").html());
							  }
							  $.layer($('#msgtmpl').html());*/
							  window.location.href='<?php echo $this->config->item('i_url'); ?>';
						  }
						  is_run = false;
						  $('.login_btn').val('确定');
						  
				    
				}
			});
	 }else{
		 $('.login_btn').val('正在处理中...请稍后!');
     }
		
}

function checkemail(){
 $.ajax({
			type: "post",
			url: "/space/member/checkemail",
			dataType:"json",
			data:{email:$("#email").val()},
			success: function(data){
			      if(!data['result']){
				     $("#tip_email").html(data['msg']);
				     $("#tip_email").css("display","block");
					 return false;
				  }else{
				     $("#tip_email").html("");
				     $("#tip_email").css("display","none");
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
    $("#tip_email").css("display","none");
	$("#tip_username").css("display","none");
	$("#tip_password").css("display","none");
	$("#tip_confirmpwd").css("display","none");
	$("#tip_agree").css("display","none");
	$("#tip_regctrl").css("display","none");
}

function hidereg(){
	$("#reg_layer").hide();
}

function sendemail(){
	 $.ajax({
				type: "post",
				url: "/space/member/emailagain",
				dataType:"json",
				data:{
					email:$("#email").val(),
					username:$("#username").val(),
				},
				success: function(data){
				      $("#tip_emailagain").html(data['msg']);
				      $('#msgtmpl').html($("#reg_layer").html());
				      $.layer($('#msgtmpl').html());
				}
			});
}

function changeprotocal(v){
	if(v == 1){
       $("#team").css("display","block");
	}else{
	   $("#team").css("display","none");
	}
}

function changecapcode(){
	$("#capcode_img").attr("src","/space/member/getcapcode?type=reg"+Math.random());
}
</script>
<?php $this->load->view('public/footer.php'); ?>