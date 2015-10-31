<?php $this->load->view('public/common_head.php'); ?>
<style>
body{background:#fff;overflow:hidden;}
.zcCengy{width:1000px;height:380px;margin:100px auto;text-align:center;line-height:60px;}
.zcCengy dl{line-height:34px;}
</style>
<div class="zcCengy">
<h2 class="f24px fY cOrange">注册成功！</h2>
<dl>
		<dt>
            <strong class="f16px fY">我们已经向你的邮箱发送了注册激活邮件,请查看。<a class="cOrange " href="#" id="goemail" target="_blank">去我的邮箱</a></strong><br /><strong class="f16px fY">没有收到邮件?<a class="cOrange" href="javascript:;void(0)" onclick="sendemail()">重新发送</a>&nbsp;&nbsp;<span id="tip_emailagain" style="color:red"></span></strong>
		</dt>
        <dd><strong style="font-size:12px;color:gray;" class="f16px fY"><span style="color:red">*</span>如您没有找到激活邮件，请到垃圾箱查看，或把我们加入白名单，便于以后操作</strong>
</dd>
		
</dl>
</div>
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
		'foxmail.com':['http://mail.foxmail.com','Foxmail邮箱'],
		'263.net':['http://www.263.net/','263邮箱']};
		
var email = '<?php echo $reg_email; ?>';
var email_domain = email.split('@')[1];
if(typeof(m[email_domain]) != 'undefined'){
	  $("#goemail").attr("href",m[email_domain][0]);
}

function sendemail(){
	 $.ajax({
				type: "post",
				url: "/space/member/emailagain",
				dataType:"json",
				data:{
					email:'<?php echo $reg_email; ?>',
					username:'<?php echo $reg_username; ?>',
				},
				success: function(data){
				      $("#tip_emailagain").html(data['msg']);
				}
			});
}
</script>
<?php $this->load->view('public/footer.php'); ?>
