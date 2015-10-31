<?php 
$lang['username_empty'] = '昵称不能为空';
$lang['username_format_error'] = '昵称过短';
$lang['username_illeagal'] = '昵称非法';
$lang['username_exists'] = '昵称已存在';
$lang['default_email'] = '请输入注册时填写的电子邮箱';
$lang['email_empty'] = '邮箱不能为空';
$lang['email_format_error'] = '邮箱格式不对';
$lang['email_illeagal'] = '邮箱不允许注册';
$lang['email_exists'] = '邮箱已存在';
$lang['password_empty'] = '密码不能为空';
$lang['passpord_short'] = '密码至少6位';
$lang['confirmpwd_empty'] = '确认密码不能为空';
$lang['password_error'] = '两次密码输入不同';
$lang['capcode_empty'] = '验证码不能为空';
$lang['capcode_error'] = '验证码错误';
$lang['mobile_empty'] = '手机号不能为空';
$lang['mobile_error'] = '手机号格式错误';
$lang['birthyear_empty'] = '年份不能为空';
$lang['birthmonth_empty'] = '月份不能为空';
$lang['birthday_empty'] = '出生日不能为空';
$lang['team_open_empty'] = '请先阅读开通社团须知';
$lang['agree_empty'] = '请先同意协议';
$lang['system_busy'] = '系统繁忙,请稍后再试';
$lang['email_subject'] = '酷Live注册激活邮件';
$lang['email_body'] = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-hans">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style type="text/css">
    html,body,p {margin:0; padding:0;}
    p {margin: 20px 0; line-height: 1.2em;}
    #isp_footer a {color: #AAA;}
    </style>
</head>
<body style="font-size: 14px; background-color: #cfcbc1; color: #999; padding: 30px 0 10px;">
 <p>酷Live注册激活邮件</p>
 <p>{username}，您好</p>

 <p>欢迎加入酷Live。</p>

<p> 请点击下面链接完成注册：</p>
<p> <a href="{url}" target="_blank">{url}</a></p>
<p>(如果上面链接不能点击，请将其复制到浏览器地址栏里)</p>
</body>
</html>';

$lang['emailagain_sucess'] = '发送成功';
$lang['emailagain_failed'] = '发送失败';
$lang['activation_email'] = '激活邮件';
$lang['register_sucess_msg'] = '注册成功,邮件已发送至{email},请注意查收邮件! ';
$lang['email_verify_failed'] = '激活失败或链接已经失效!';
$lang['email_verify_success'] = '激活成功!页面即将跳转';
$lang['passport_email'] = '昵称/电子邮箱';
$lang['passport_empty'] = '帐号不能为空';
$lang['password_empty'] = '密码不能为空';
$lang['passport_password_error'] = '帐号或密码错误';
$lang['email_dismatch'] = '该邮箱没有注册过，请核对后重新输入';
$lang['email_subject_lostpwd'] = '酷Live找回密码邮件';
$lang['email_body_lostpwd'] = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-hans">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style type="text/css">
    html,body,p {margin:0; padding:0;}
    p {margin: 20px 0; line-height: 1.2em;}
    #isp_footer a {color: #AAA;}
    </style>
</head>
<body style="font-size: 14px; background-color: #cfcbc1; color: #999; padding: 30px 0 10px;">
 <p>酷Live找回密码邮件</p>
 <p>{username}，您好</p>

 <p>您于{datetime}申请找回密码。如果您没有申请找回密码，请忽略此邮件</p>

<p> 如果您需要找回密码，请点击下面的链接，并按照随后页面的进一步提示重新设置您的密码：</p>
<p> <a href="{url}" target="_blank">{url}</a></p>
<p>(如果上面链接不能点击，请将其复制到浏览器地址栏里)</p>
</body>
</html>';

$lang['login_success'] = '登录成功';
$lang['year'] = '年';
$lang['month'] = '月';
$lang['day'] = '日';
$lang['hour'] = '时';
$lang['minute'] = '分'; 
$lang['lostpwd_url_error'] = '找回密码链接错误或已经失效';
$lang['lostpwd_email'] = '找回密码邮件已发送,请注意查收';
$lang['getpwd_failed'] = '重置失败';
$lang['getpwd_success'] = '重置成功,3s后将转到登录页!';
$lang['save_success'] = '保存成功';
$lang['save_failed'] = '保存失败';

$lang['realname_empty'] = '真实姓名不能为空';
$lang['sign_mobile_error'] = '手机号输入有误，请重新填写';
$lang['sign_idcard_error'] = '身份证号输入有误，请重新填写';
$lang['sign_school_empty'] = '所在院校不能为空';
$lang['sign_upload_empty'] = '您还未上传';

$lang['entryform_empty'] = '请选择参赛形式';
$lang['entryname_empty'] = '请选择参赛名称';
$lang['sign_success'] = '报名成功!';
$lang['sign_failed'] = '报名失败!';
$lang['team_no_exists'] = '团队名称不存在,请重新填写!';
$lang['upvideo_tips'] = '之前已填写过报名信息。如果无误,请直接';
$lang['efid_exists'] = '参赛形式不能重复';
$lang['sign_notice_not_agree'] = '请先阅读报名须知';
$lang['word_exception'] = '分词异常';
?>