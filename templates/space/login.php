<?php $this->load->view('public/common_head.php'); ?>
<!--content begin-->
<div class="pub-content">

	<div class="pub-w clearfix">
		<div class="loginArea fl">
			<h2 class="cOrange">登录</h2>
			<input type="hidden" name="referer" id="referer" value="<?php echo $referer; ?>" />
			<dl>
				<dt>帐号：</dt>
				<dd>
					<input type='text' name="passport" id="passport" value="<?php if(!empty($passport)) { ?><?php echo $passport;?><?php } else { ?>昵称/电子邮箱/手机号<?php } ?>" onfocus="hidepassport();" onblur="showpassport();" onkeyup="show_email_suggest(this.value)" class="login_text" />
					<span class='login_error cRed' id="tip_passport" style="display:none"></span>
				</dd>
			</dl>
			<dl>
				<dt>密码：</dt>
				<dd>
					<input type='password' name="password" id="password" value='' onkeydown="gologin(event)" class="login_text" />
					<span class='login_error cRed' id="tip_password" style="display:none"></span>
				</dd>
			</dl>
			<ul class="login_options">
				<li ><a href="<?php echo $this->config->item('i_url'); ?>/lostpwd" class="cOrange forgetPwd">忘记密码</a><input type="checkbox" name="remember" id="remember" checked="checked"/>记住我，一周免登录</li>
			</ul>
			<ul class="login_options" style="display:none;padding-bottom:10px" id="passport_password">
				<li><span class='login_error cRed' id="tip_login"></span></li>
			</ul>
			<input type="submit" value='登录' class="login_btn" onclick="login()"/>
		</div>
		<div class="thirdLogin">
			<?php $this->load->view('public/oauth_login.php'); ?>
			<p>没有帐号？请先<a href="<?php echo $this->config->item('i_url'); ?>/signup" class="cOrange">注册新帐号</a></p>
		</div>
	</div>
	
</div>

<div id="login_layer" style="display:none">
 <div class="win-tan">
	<h2></h2>
    <dl>
    	<dt>
            <p class="fY f16px">你先需要激活邮箱才能登录。<a class="cOrange " href="#" id="goemail" target="_blank">去我的邮箱</a></p>
            <p class="fY f16px">没有收到邮件?<a class="cOrange" href="javascript:;void(0)" onclick="sendemail()">重新发送</a> <span id="tip_emailagain" style="color:red"></span></p>
        </dt>
    </dl>
</div>
</div>

<ul  id="email-suggest-list" class="email-suggest-list">
</ul>
<script type="text/tmpl" id="msgtmpl">
</script>
<script type="text/tmpl" id="msgtmpl_mobile">
<div class="win-tan">
	<h2></h2>
    <dl>
    	<dt>
            <p class="fY f16px">你先需要验证手机才能登录。</p>
        </dt>
    </dl>
</div>
</script>
<!--content end-->
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
		
function login(){
	var is_remember = document.getElementById("remember").checked;
	var remember = 0;
	 if(is_remember){
		 remember = 1;
	 }
     initial();
     if(!is_run){
         is_run = true;
         $('.login_btn').val('登录中...请稍后!');
		 $.ajax({
				type: "post",
				url: "/space/member/login",
				dataType:"json",
				data:{
	               passport:$("#passport").val(),
	               password:$("#password").val(),
	               remember:remember,
	               referer:$("#referer").val(),
	               loginsubmit:true
				},
				success: function(data){
					  if(!data['result']){
						 if(data['tip_type'] == 'noactivate_email'){
							 var email = data['msg'];
						     var email_domain = email.split('@')[1];
						     if(typeof(m[email_domain]) != 'undefined'){
							     $("#goemail").attr("href",m[email_domain][0]);
							  }
							 $('#msgtmpl').html($("#login_layer").html());
							 $.layer($('#msgtmpl').html());
						 }else if(data['tip_type'] == 'noactivate_mobile'){
							 $.layer($('#msgtmpl_mobile').html());
						 }else{
							 $("#tip_"+data['tip_type']).html(data['msg']);
						     $("#tip_"+data['tip_type']).css("display","block");
						     if(data['tip_type'] == 'login'){$("#passport_password").css("display","block");} 
						 }
					     is_run = false;
					     $('.login_btn').val('登录');
					  }else{
					     location.href = $("#referer").val();
					  }
				}
			});
     }else{
    	 $('.login_btn').val('登录中...请稍后!');
     }
}

function gologin(event){
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e && e.keyCode == 13){
        login();
    }
}

function focus_passport(){
	var passport = $("#passport").val();
	if(passport == '昵称/电子邮箱'){
       $("#passport").val('');
	}
}

function blur_passport(){
	var passport = $("#passport").val();
	if(passport == ''){
       $("#passport").val("昵称/电子邮箱");
	}else{
		$("#email-suggest-list").css("display","none");
	}
}

function initial(){
	$("#tip_passport").css("display","none");
	$("#tip_password").css("display","none");
}

function sendemail(){
	 $.ajax({
				type: "post",
				url: "/space/member/emailagain_login",
				dataType:"json",
				data:{
					passport:$("#passport").val()
				},
				success: function(data){
				      $("#tip_emailagain").html(data['msg']);
				      $('#msgtmpl').html($("#login_layer").html());
				      $.layer($('#msgtmpl').html());
				}
			});
}

function hidepassport(){
   if($("#passport").val() == '昵称/电子邮箱/手机号'){
	   $("#passport").val('');
   }

}

function showpassport(){
	   if($("#passport").val() == ''){
		   $("#passport").val('昵称/电子邮箱/手机号');
	   }

}
</script>
