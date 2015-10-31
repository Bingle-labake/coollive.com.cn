var SK_UID = 0;
var SK_USER_NAME = '';

function getcookie(name) {
	var cookie_start = document.cookie.indexOf(name);
	var cookie_end = document.cookie.indexOf(";", cookie_start);
	return cookie_start == -1 ? '' : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
}

SK_UID   = decodeURIComponent(getcookie('sk_uid'));
SK_USER_NAME = decodeURIComponent(getcookie('sk_username'));

function isEmail(val){
	var email_reg = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/;	 
	if(!email_reg.test(val)) {
		return false;
	}else {
		return true;
	}
}

//cnzz start
var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cspan id='cnzz_stat_icon_1000488278'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "w.cnzz.com/q_stat.php%3Fid%3D1000488278' type='text/javascript'%3E%3C/script%3E"));
//cnzz end