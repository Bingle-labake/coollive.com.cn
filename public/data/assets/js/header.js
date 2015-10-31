var username = decodeURIComponent(getcookie('sk_username'));
document.writeln("<script src=\"/public/data/assets/js/base.js\"></script>");
document.writeln("<div class=\"pub-head\">");
document.writeln("	<div class=\"pub-headc pub-w fY cWhite\">");
document.writeln("		<div class=\"pub-logo fl\"><a href=\"http://www.saiku.com.cn\">赛酷网</a></div>");
document.writeln("		<ul class=\"pub-menu f16px\">");
document.writeln("			<li><a href=\"http://www.saiku.com.cn\">首页</a></li>");
document.writeln("			<li><a href=\"http://www.saiku.com.cn/look\">比赛专区</a></li>");
document.writeln("			<li><a href=\"http://www.saiku.com.cn/zuopin\">参赛作品</a></li>");
document.writeln("			<li><a href=\"http://www.saiku.com.cn/vote\" class=\"\">作品投票</a></li>");
document.writeln("			<li><a href=\"http://i.saiku.com.cn//space/eshop\" class=\"\">积分兑换</a></li>");
document.writeln("			<li class=\"pub-cup\"><a href=\"http://www.saiku.com.cn/worldcup/fixture\" class=\"\">世界杯</a></li>");
document.writeln("		</ul>");
if(username == ''){
	document.writeln("		<div class=\"pub-usr\">");
	document.writeln("			<div class=\"f14px\"><a href=\"http://i.saiku.com.cn/login\">登录</a>&nbsp;&nbsp;|&nbsp;&nbsp; <a href=\"http://i.saiku.com.cn/signup\">注册</a></div>");
	document.writeln("		</div>");
}else{
	document.writeln("		<div class=\"pub-usr\">");
	document.writeln("			<div class=\"f14px\"><a href=\"http://i.saiku.com.cn/u/home\">"+username+"</a>&nbsp;&nbsp;|&nbsp;&nbsp; <a href=\"/http://i.saiku.com.cn/logout\">退出</a></div>");
	document.writeln("			<div class=\"pub-usrpop\" style=\"display:none;\">");
	document.writeln("			</div>");
	document.writeln("		</div>");
}
document.writeln("	</div>");
document.writeln("</div>");
