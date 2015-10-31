<?php
/**************************************************************************
 *   Path:   /helpers/function_mail_helper.php
*   Comments:   公共邮件函数库
*   Author: Zhang Lin
*   Last Modified:  02.13.2014 / Zhang Lin
**************************************************************************/
/**
 * 邮件发送
 * @param $to 收件人
 * @param $subject 主题
 * @param $body 内容
 * @return null
 */
define('_EXEC', 1);
function send_mail($to,$subject,$body){
	include FCPATH.APPPATH.'libraries/smtp.php';
	$smtpinfo = array();
	$smtpinfo["host"]     = "smtp.qq.com";
	$smtpinfo["username"] = "de57@qq.com";
	$smtpinfo["password"] = "de57.com";
	$smtpinfo["port"]     = "25";
	
	$from    = $smtpinfo['username'];
	$subject = '=?utf-8?B?'. base64_encode($subject) .'?=';
	$smtpMail = new smtp($smtpinfo['host'], $smtpinfo['username'], $smtpinfo['password'], $smtpinfo['port']);
	$smtpMail->setHeader('Content-Transfer-Encoding', '8bit');
	$smtpMail->setFrom($from, '=?utf-8?B?'. base64_encode("酷Live网").'?=');
	$smtpMail->addTo($to);
	$smtpMail->setSubject($subject);
	$smtpMail->setBody($body);
	@$smtpMail->send();
}
?>