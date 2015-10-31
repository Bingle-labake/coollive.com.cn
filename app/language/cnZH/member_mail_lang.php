<?php
$lang['activate_message_title'] = '赛酷注册激活邮件';
$lang['activate_message'] = '
        <p>{username}，您好</p>
		<p>欢迎加入赛酷。</p>
		
		<p>请点击下面链接完成注册：<br />
		
		<a href="{verifyurl}" target="_blank">{verifyurl}</a>
		<br />
		(如果上面链接不能点击，请将其复制到浏览器地址栏里)</p>
		
		<p>[赛酷]</p>';
$lang['activate_message_send_ok'] = '发送成功';
$lang['activate_message_send_failed'] = '发送失败';

$lang['lostpassword_message_title'] = '赛酷找回密码邮件';
$lang['lostpassword_message'] = '
<p>{username}，您好</p>
<p>您于{sendtime}申请找回密码。如果您没有申请找回密码，请忽略此邮件</p>
<p>如果您需要找回密码，请将下面的链接粘贴到浏览器的地址栏中并回车，并按照随后页面的进一步提示重新设置您的密码：</p>
<p><a href="{verifyurl}" target="_blank">{verifyurl}</a></p>
<p>[赛酷]</p>';

?>