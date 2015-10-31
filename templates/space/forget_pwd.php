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
				<dt>电子邮箱：</dt>
				<dd>
					<input type='text' onBlur="checkemail()" name="email" id="email" onfocus="hide_email()" on value='请输入注册时填写的电子邮箱' class="login_text" />
					<span class='login_error cRed' id="tip_email" style="display:none"></span>
					<!--<span class='login_ok'></span>-->
				</dd>
			</dl>
			<dl>
				<dt>验证码：</dt>
				<dd>
					<input onblur="checkcapcode()" type="text" name="capcode" id="captcha_field" class="login_text" />
					<span class='login_error cRed' id="tip_capcode" style="display:none"></span>
					<div class="verify">
						<img id="system_capcode" src="" ><span>看不清楚？<a href="javascript:;void();" onClick="changecapcode()" id="cap_resend" class="oRange">换一张</a></span>
					</div>
				</dd>
			</dl>
			<input type="submit" value='确定' class="login_btn" onclick="lostpwd()"/> <i class="ok"></i>
		</div>
	</div>
	
</div>
<!--content end-->
<div id="lostpwd_layer" style="display:none">
<dl class="pub-confirm">
		<dt>
            <strong class="f16px fY" style="font-size:13px">重置密码邮件已发送至你的邮箱,请查看。<a class="cOrange " href="#" id="goemail" target="_blank">去我的邮箱</a></strong>
		</dt>
		
</dl>
</div>
<script type="text/tmpl" id="msgtmpl">
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
	 

function lostpwd(){
	 if(!is_run){
		 is_run = true;
		 $(".login_btn").val("正在处理中...请稍后!");
		 $.ajax({
					type: "post",
					url: "/space/member/lostpwd",
					dataType:"json",
					data:{
						email:$("#email").val(),
						capcode:$("#captcha_field").val(),
						lostpwdsubmit:true
					},
					success: function(data){
					      if(!data['result']){
						     $("#tip_"+data['tip_type']).html(data['msg']);
						     $("#tip_"+data['tip_type']).css("display","inline");
						  }else{
						     $("#tip_"+data['tip_type']).html("");
						     $("#tip_"+data['tip_type']).css("display","none");
						     var email = $("#email").val();
						     var email_domain = email.split('@')[1];
						     if(typeof(m[email_domain]) != 'undefined'){
						    	  $("#goemail").attr("href",m[email_domain][0]);
							 }
						     $('#msgtmpl').html($("#lostpwd_layer").html());
							 $.layer($('#msgtmpl').html());
						  }
					      is_run = false;
						  $(".login_btn").val("确定");
					    
					}
				});
	 }else{
		 $(".login_btn").val("正在处理中...请稍后!");
	 }
}

function checkemail(){
	 $.ajax({
				type: "post",
				url: "/space/member/checkemail",
				dataType:"json",
				data:{email:$("#email").val(),type:'lostpwd'},
				success: function(data){
				      if(!data['result']){
					     $("#tip_email").html(data['msg']);
					     $("#tip_email").css("display","inline");
					     $("#email").val('请输入注册时填写的电子邮箱');
						 return false;
					  }else{
					     $("#tip_email").html("");
					     $("#tip_email").css("display","none");
					     return true;
					  }
				    
				}
			});
}

function checkcapcode(){
    $.ajax({
			type: "post",
			url: "/space/member/checkcapcode",
			dataType:"json",
			data:{capcode:$("#captcha_field").val(),ctype:'lostpwd'},
			success: function(data){
			      if(!data['result']){
				     $("#tip_capcode").html(data['msg']);
				     $("#tip_capcode").css("display","inline");
					 return false;
				  }else{
				     $("#tip_capcode").html("");
				     $("#tip_capcode").css("display","none");
				     return true;
				  }
			    
			}
		});
}
changecapcode();
function changecapcode(){
   var url = "/space/member/getcapcode/lostpwd?type=lostpwd&m="+Math.random();
   $('#system_capcode').attr('src', url);
}

function hide_email(){
	$("#email").val('');
}

function initial(){
	$("#tip_email").css("display","none");
	$("#tip_capcode").css("display","none");
}
</script>
<?php $this->load->view('public/footer.php'); ?>