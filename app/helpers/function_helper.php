<?php 
/**************************************************************************
 *   Path:   /helpers/function_helper.php
*   Comments:   公共函数库
*   Author: Zhang Lin
*   Last Modified:  01.19.2014 / Zhang Lin
**************************************************************************/

/*****
 * 获取用户登录状态
 * */
function is_login(){
    $login = current_user();
	return !empty($login) ? true : false;
}
/**
 * 获取当前登录用户uid
 * @return number|boolean
 */
function current_user(){
	$salt = defined('LOGIN_COOKIE_SALT')?LOGIN_COOKIE_SALT:'';
	if(isset($_COOKIE['cl_uid']) && !empty($_COOKIE['hash']) && !empty($_COOKIE['vir'])){
		if($_COOKIE['vir'] == md5($_COOKIE['cl_uid'].$salt.$_COOKIE['hash'])){
			return array('uid'=>intval($_COOKIE['cl_uid']),'username'=>urldecode($_COOKIE['cl_username']));
		}
	}
	return array();
}

/**
 * 邮箱格式验证
 * @param string $email
 * @return boolean
 */
function check_emailformat($email) {
	return strlen($email) > 6 && preg_match("/^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/", $email);
}

/**
 * 用户名长度验证
 * @param string $username
 * @return boolean
 */
function check_username_len($username) {
	$len = dstrlen($username);
	if($len > 15 || $len < 5) {
		return FALSE;
	} else {
		return TRUE;
	}
}

/**
 * 检查用户名格式
 * @param string $username
 * @return boolean
 */
function check_username_format($username){
	if (!preg_match("/^[\x{4e00}-\x{9fa5}A-Za-z0-9_\-]+$/u",$username)) {
		return false;
	}
	return true;
}

/**
 * 字符串长度验证
 * @param string $str
 * @return number
 */
function dstrlen($str) {
	$count = 0;
	for($i = 0; $i < strlen($str); $i++){
		$value = ord($str[$i]);
		if($value > 127) {
			$count++;
			if($value >= 192 && $value <= 223) $i++;
			elseif($value >= 224 && $value <= 239) $i = $i + 2;
			elseif($value >= 240 && $value <= 247) $i = $i + 3;
		}
		$count++;
	}
	return $count;
}

/**
 * 手机号验证
 * @param string $mobile
 * @return boolean
 */
function checkmobile($mobile){
	$exp = "/^13[0-9]{1}[0-9]{8}$|15[012356789]{1}[0-9]{8}$|18[012356789]{1}[0-9]{8}$|14[57]{1}[0-9]{8}$/";
	if(preg_match($exp,$mobile)){
		return true;
	}else{
		return false;
	}
}

/**
 * 身份证验证
 * @param string $id_card
 * @return boolean
 */
function validation_filter_id_card($id_card){
	if(strlen($id_card)==18){
		return idcard_checksum18($id_card);
	}elseif((strlen($id_card)==15)){
		$id_card=idcard_15to18($id_card);
		return idcard_checksum18($id_card);
	}else{
		return false;
	}
}

// 计算身份证校验码，根据国家标准GB 11643-1999 
function idcard_verify_number($idcard_base){
	if(strlen($idcard_base)!=17){
		return false;
	}
	//加权因子 
	$factor=array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);
	//校验码对应值 
	$verify_number_list=array('1','0','X','9','8','7','6','5','4','3','2');
	$checksum=0;
	for($i=0;$i<strlen($idcard_base);$i++){
		$checksum += substr($idcard_base,$i,1) * $factor[$i];
	}
	$mod=$checksum % 11;
	$verify_number=$verify_number_list[$mod];
	return $verify_number;
}

// 将15位身份证升级到18位 
function idcard_15to18($idcard){
	if(strlen($idcard)!=15){
		return false;
	}else{
		// 如果身份证顺序码是996 997 998 999，这些是为百岁以上老人的特殊编码 
		if(array_search(substr($idcard,12,3),array('996','997','998','999')) !== false){
			$idcard=substr($idcard,0,6).'18'.substr($idcard,6,9);
		}else{
			$idcard=substr($idcard,0,6).'19'.substr($idcard,6,9);
		}
	}
	$idcard=$idcard.idcard_verify_number($idcard);
	return $idcard;
}

// 18位身份证校验码有效性检查 
function idcard_checksum18($idcard){
	if(strlen($idcard)!=18){
		return false;
	}
	$idcard_base=substr($idcard,0,17);
	if(idcard_verify_number($idcard_base)!=strtoupper(substr($idcard,17,1))){
		return false;
	}else{
		return true;
	}
}

/**
 *香港身份证 
 * check hk idcard
 * $id = "K548653A";
 * $xx= check_hkid($id);
 */
function check_hkid($id)
{
    if (!preg_match("/^[a-zA-Z][0-9]{6}[0-9aA]$/", $id)) {
        return false;
    }
    $mul = 8;
    $sum = (ord(strtoupper($id))-64) * $mul;
    while($mul>1) {
        $sum += intval(substr($id, 8 - $mul, 1)) * $mul;
        $mul --;
    }
    $chksum = dechex(strval(11-($sum % 11)));//dec to hex
    if ($chksum == 'b') {
        $chksum = 0;
    }
    return $chksum == strtolower(substr($id, 7, 1));
}

/**
 * 获取用户ip
 */
function get_client_ip() {
	$ip = $_SERVER['REMOTE_ADDR'];
	if (isset($_SERVER['HTTP_CLIENT_IP']) && preg_match('/^([0-9]{1,3}\.){3}[0-9]{1,3}$/', $_SERVER['HTTP_CLIENT_IP'])) {
		$ip = $_SERVER['HTTP_CLIENT_IP'];
	} elseif(isset($_SERVER['HTTP_X_FORWARDED_FOR']) AND preg_match_all('#\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}#s', $_SERVER['HTTP_X_FORWARDED_FOR'], $matches)) {
		foreach ($matches[0] AS $xip) {
			if (!preg_match('#^(10|172\.16|192\.168)\.#', $xip)) {
				$ip = $xip;
				break;
			}
		}
	}
	return $ip;
}
/**
 * 模板解析函数
 * @param string $template
 * @param array $param
 * @return string 
 */
function parse_template($template,$param){
	$searchs = $replaces = array();
	if (!empty($param) && is_array($param)) {
		foreach ($param as $k=>$v){
			$searchs[] = '{'.$k.'}';
			$replaces[] = $v;
		}
		$template = str_replace($searchs,$replaces,$template);
	}
	return $template;
}

/**
 * 随机数生成函数
 * @param int $length
 * @param $numeric
 * @return string
 */
function random($length, $numeric = 0) {
	$seed = base_convert(md5(microtime().$_SERVER['DOCUMENT_ROOT']), 16, $numeric ? 10 : 35);
	$seed = $numeric ? (str_replace('0', '', $seed).'012340567890') : ($seed.'zZ'.strtoupper($seed));
	if($numeric) {
		$hash = '';
	} else {
		$hash = chr(rand(1, 26) + rand(0, 1) * 32 + 64);
		$length--;
	}
	$max = strlen($seed) - 1;
	for($i = 0; $i < $length; $i++) {
		$hash .= $seed{mt_rand(0, $max)};
	}
	return $hash;
}

/**
 * 获取年份
 */
function get_year(){
	$cur_year = intval(date('Y'));
	$min_year = 1913;
	while ($cur_year>=$min_year) {
		$year[] = $cur_year;
		$cur_year--;
	}
	return $year;
}

/**
 * 获取月份
 */
function get_month(){
	return array(1,2,3,4,5,6,7,8,9,10,11,12);
}

/**
 * 获取日
 */
function get_day(){
	return array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31);
}

/**
 * 获取当前日历(月、日)
 */
function get_cur_calender($timestamp = ''){
	$month = array('01' => '一月','02' => '二月','03' => '三月','04' => '四月',
			       '05' => '五月','06' => '六月','07' => '七月','08' => '八月',
			       '09' => '九月','10' => '十月','11' => '十一月','12' => '十二月'
			);
	
	$timestamp = !empty($timestamp) ? $timestamp : time();
	$time = explode('-',date('m-d',$timestamp));
	$cur_calender = array('month' => $month[$time[0]],'day' => $time[1]);
	return $cur_calender;
}

/**
 * 获取星期几
 */
function get_cur_week(){
	$weekarray = array("日","一","二","三","四","五","六");
	return "星期".$weekarray[intval(date("w"))];
}
function getAuthImage($text) {
	$im_x = 160;
	$im_y = 40;
	$im = imagecreatetruecolor($im_x,$im_y);
	$text_c = ImageColorAllocate($im, mt_rand(0,100),mt_rand(0,100),mt_rand(0,100));
	$tmpC0=mt_rand(100,255);
	$tmpC1=mt_rand(100,255);
	$tmpC2=mt_rand(100,255);
	$buttum_c = ImageColorAllocate($im,$tmpC0,$tmpC1,$tmpC2);
	imagefill($im, 16, 13, $buttum_c);

	$font = 't1.ttf';

	for ($i=0;$i<strlen($text);$i++)
	{
		$tmp =substr($text,$i,1);
		$array = array(-1,1);
		$p = array_rand($array);
		$an = $array[$p]*mt_rand(1,10);//角度
		$size = 28;
		imagettftext($im, $size, $an, 15+$i*$size, 35, $text_c, $font, $tmp);
	}


	$distortion_im = imagecreatetruecolor ($im_x, $im_y);

	imagefill($distortion_im, 16, 13, $buttum_c);
	for ( $i=0; $i<$im_x; $i++) {
		for ( $j=0; $j<$im_y; $j++) {
			$rgb = imagecolorat($im, $i , $j);
			if( (int)($i+20+sin($j/$im_y*2*M_PI)*10) <= imagesx($distortion_im)&& (int)($i+20+sin($j/$im_y*2*M_PI)*10) >=0 ) {
				imagesetpixel ($distortion_im, (int)($i+10+sin($j/$im_y*2*M_PI-M_PI*0.1)*4) , $j , $rgb);
			}
		}
	}
	//加入干扰象素;
	$count = 160;//干扰像素的数量
	for($i=0; $i<$count; $i++){
		$randcolor = ImageColorallocate($distortion_im,mt_rand(0,255),mt_rand(0,255),mt_rand(0,255));
		imagesetpixel($distortion_im, mt_rand()%$im_x , mt_rand()%$im_y , $randcolor);
	}

	$rand = mt_rand(5,30);
	$rand1 = mt_rand(15,25);
	$rand2 = mt_rand(5,10);
	for ($yy=$rand; $yy<=+$rand+2; $yy++){
		for ($px=-80;$px<=80;$px=$px+0.1)
		{
			$x=$px/$rand1;
			if ($x!=0)
			{
				$y=sin($x);
			}
			$py=$y*$rand2;

			imagesetpixel($distortion_im, $px+80, $py+$yy, $text_c);
		}
	}

	//设置文件头;
	Header("Content-type: image/JPEG");

	//以PNG格式将图像输出到浏览器或文件;
	ImagePNG($distortion_im);

	//销毁一图像,释放与image关联的内存;
	ImageDestroy($distortion_im);
	ImageDestroy($im);
}

function getnumcapcode($width,$height,$num,$numlen ,$checknum,$fontsize,$colortype,$type = 'votecode'){
	//创建一个画布
	$img1 = imagecreatetruecolor ( $width, $height);
	//创建一系列颜色，
	$gray=imagecolorallocate($img1,200,200,200);
	$color1=imagecolorallocate($img1,240,240,240);
	$blue=imagecolorallocate($img1,0,0,255);
	$black=imagecolorallocate($img1,0,0,0);
	$red=imagecolorallocate($img1,255,0,0);
	$green=imagecolorallocate($img1,0,100,0);
	//创建一个随机产生的颜色
	$color = imagecolorallocate ( $img1, rand ( 0, 255 ), rand ( 0, 255 ), rand ( 0, 255 ) );
	imagefill ( $img1, 0, 0, $gray ); //填充北景色给验证码北景
	//生成一个要写入验证码的字串
	$str = "";
	for($i = 0; $i <= $numlen; $i ++) {

		//随机生成下标，转为十六进制。
		$num1 = dechex ( rand ( 0, $num ) );
		$str .= $num1;
	}

	//创建一个原来要写入的副本。

	$str1 = $str;
	//将原字符串随机生成四个下标位置的值替换成空格，然后，将原来的字符串生成一个副本，将变成空格的值记录下来，没变成空格

	//的值变成空格。

	//用数组来记录生成随机的要转成空格的位置，再判断，如果当前生成的空位置在前面出现过，从新生成，保证四次随机出现四个不一样的数。

	$seestr = ""; //将来记录下要存入的session值

	$arr = array ();

	//下面记录下以前随机出现过的数字，用来判断保证后面出的数是新的。
	$arr1 = array ();
	for($i = 0; $i < $checknum; $i ++) {
		$b = rand ( 0, $numlen );
		while ( in_array ( $b, $arr1 ) ) { //如果当前位置在以前出现过，再来，直到是一个新下标位置为止。

			$b = rand ( 0, $numlen );

		}
		$arr1 [] = $b;
		$arr [$b] = $str [$b]; //将要替换成空格的字符保存到一个数组。
		$str = substr_replace ( $str, " ", $b, 1 ); //循环得到的下标位置干掉，换成空格。

	}

	//对下标进行排序，从左至右保证输入的字符顺序与显示的验证码一致。
	ksort ( $arr ); //对下标进行排序。
	foreach ( $arr as $val ) {

		$seestr .= $val;
	}
	rand(1,2);
	//循环画线。
	$b=0;
	$c=rand(-8,6);;
	$d=$height;
	$x=rand(2,6)    ;
	for($a = rand(-8,6) ; $a <= 258 ; $a += $x) {
		imageline ( $img1, $a, $b, $c,$d, $color1 );
		$c+=$x;
	}

	//写入画布;
	$width_left=$width-110;
	$x = rand ( 5, $width_left );
	$y = rand ( $fontsize, 0 );
	switch($colortype)
	{
		case 1 : $colortype = $red;
		break;
		case 2 : $colortype = $blue;
		break;
		case 3 : $colortype = $black;
		break;
		case 4 : $colortype = $green;
		break;
	}
	imagestring ( $img1, $fontsize,  $x, $y , $str1 , $colortype);
	imagestring ( $img1, $fontsize,  $x, $y , $str , $color );
	//session要记录住这个随机得到的字串，验证用户填写是否一致。
	$_SESSION [$type] = $seestr;
	//将画布输出,要先规定输出的格式
	header ( "content-type:image/gif" );
	imagegif ( $img1 );
	//销毁画布
	imagedestroy ( $img1 );
}

function make_rand($length="32"){//验证码文字生成函数
	$str="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	$result="";
	for($i=0;$i<$length;$i++){
		$num[$i]=rand(0,25);
		$result.=$str[$num[$i]];
	}
	return $result;
}

/**
 * 获取用户头像
 * @param size string  注释：中middle 小small 大big
 * @param uid int  注释：用户id
 * @param type string 注释：用户user  团队team
 */
function avatar($uid, $postfix = "jpg", $size = 'middle',$type = 'user') {
	$uploadpath = $type == 'team' ? 'public/data/images/team/' : 'public/data/images/header/';
	if ($uid) {
		$img = $uploadpath.checkfolder($uid).'avatar_'.$size.'_'.$uid.'.'.$postfix;
		if (!file_exists($img)) {			
			$imgurl =  '/users/avatar?uid='.$uid;
		}else {
			$imgurl = "/".$img;
		}			
	}else {
		$imgurl = $type == 'team' ? '/assets/img/team_default.'.$postfix : '/assets/img/user_default.'.$postfix;
	}
	return $imgurl;
}

/**
 根据uid处理用户头像存储路径
 @param int $uid 用户id
 @return NULL
 */
function checkfolder ($uid) {
	$foldercode = substr($uid."000000", 0, 6);
	$folder = '';
	for ($i=0; $i < 6; $i += 2) {
		$folder .= substr($foldercode, $i, 2)."/";
	}
	return $folder;
}

/**
 * 短信发送 用例
 * @param array $mobiles
 * @param string $content
 * @return int $errorcode
 */
function sendSMS($mobiles,$content)
{
    set_time_limit(0);

    header("Content-Type: text/html; charset=UTF-8");

    /**
     * 定义程序绝对路径
     */
    define('SCRIPT_ROOT',  FCPATH.APPPATH.'libraries/sms/');
    require_once SCRIPT_ROOT.'include/Client.php';


    /**
     * 网关地址
     */
    $gwUrl = 'http://sdkhttp.eucp.b2m.cn/sdk/SDKService?wsdl';


    /**
     * 序列号,请通过亿美销售人员获取
     */
    $serialNumber = '3SDK-EMY-0130-JFTRN';

    /**
     * 密码,请通过亿美销售人员获取
     */
    $password = '182815';

    /**
     * 登录后所持有的SESSION KEY，即可通过login方法时创建
     */
    $sessionKey = '169304';

    /**
     * 连接超时时间，单位为秒
     */
    $connectTimeOut = 2;

    /**
     * 远程信息读取超时时间，单位为秒
     */
    $readTimeOut = 10;

    /**
    $proxyhost		可选，代理服务器地址，默认为 false ,则不使用代理服务器
    $proxyport		可选，代理服务器端口，默认为 false
    $proxyusername	可选，代理服务器用户名，默认为 false
    $proxypassword	可选，代理服务器密码，默认为 false
     */
    $proxyhost = false;
    $proxyport = false;
    $proxyusername = false;
    $proxypassword = false;

    $client = new Client($gwUrl,$serialNumber,$password,$sessionKey,$proxyhost,$proxyport,$proxyusername,$proxypassword,$connectTimeOut,$readTimeOut);
    /**
     * 发送向服务端的编码，如果本页面的编码为GBK，请使用GBK
     */
    $client->setOutgoingEncoding("UTF8");
    //global $client;
    /**
     * 下面的代码将发送内容为 test 给 159xxxxxxxx 和 159xxxxxxxx
     * $client->sendSMS还有更多可用参数，请参考 Client.php
     */

    //第一次使用需要先执行,以后无需再执行,除非调用logout
    //$statusCode = $client->login($sessionKey);
    $statusCode = $client->sendSMS($mobiles,'【赛酷网】'.$content);
    if ($statusCode != '' && $statusCode == 0) {
        return true;
    }else {
        return false;
    }
}


    /**
     * 短信发送 用例
     * @param array $mobiles
     * @param string $content
     * @return int $errorcode
     */
    function  mobileSMS($mobiles,$content)
    {
        set_time_limit(0);
    	header("Content-Type: text/html; charset=UTF-8");
    	#定义程序绝对路径
    	define('SCRIPT_ROOT',  FCPATH.APPPATH.'libraries/sms/');
    	require_once SCRIPT_ROOT.'include/Client.php';
    	#网关地址
    	$gwUrl = 'http://sdkhttp.eucp.b2m.cn/sdk/SDKService?wsdl';
    	#序列号,请通过亿美销售人员获取
    	$serialNumber = '3SDK-EMY-0130-JFTRN';
    	#密码,请通过亿美销售人员获取
    	$password = '182815';
    	#登录后所持有的SESSION KEY，即可通过login方法时创建
    	$sessionKey = '169304';
    	#连接超时时间，单位为秒
    	$connectTimeOut = 2;
    	#远程信息读取超时时间，单位为秒
    	$readTimeOut = 10;
    	/**
    	 $proxyhost		可选，代理服务器地址，默认为 false ,则不使用代理服务器
    	 $proxyport		可选，代理服务器端口，默认为 false
    	 $proxyusername	可选，代理服务器用户名，默认为 false
    	 $proxypassword	可选，代理服务器密码，默认为 false
    	 */
    	$proxyhost = false;
    	$proxyport = false;
    	$proxyusername = false;
    	$proxypassword = false;
    
    	$client = new Client($gwUrl,$serialNumber,$password,$sessionKey,$proxyhost,$proxyport,$proxyusername,$proxypassword,$connectTimeOut,$readTimeOut);
    	#发送向服务端的编码，如果本页面的编码为GBK，请使用GBK
    	$client->setOutgoingEncoding("UTF8");
    	#global $client;
    	/*
    	 * 下面的代码将发送内容为 test 给 159xxxxxxxx 和 159xxxxxxxx
    	 * $client->sendSMS还有更多可用参数，请参考 Client.php
    	*/
    	#第一次使用需要先执行,以后无需再执行,除非调用logout
    	#$statusCode = $client->login($sessionKey);
    	$msg = '【赛酷网】'.$content;
    	$statusCode = $client->sendSMS($mobiles,$msg);
    	if ($statusCode != '' && $statusCode == 0) {
    		return true;
    	}else {
    		return false;
    	}
    }
    
    /**
     * 订单号生成
     */
    function get_order_id(){
    	return date('Ymd') . str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT);
    }

/**
 * 友好日期时间
 *
 * @param DateTime $datetime 日期时间
 * @param int $size 精确到位数
 * @throws \InvalidArgumentException
 * @return string
 */
function friendly_date($datetime, $size=1)
{
    if (is_int($datetime)) {
        $dt = date("Y-m-d H:i:s", $datetime);
        $datetime = new \DateTime($dt);
    }

    if (!($datetime instanceof \DateTime)) {
        if(is_numeric($datetime)) {
            $dt = date("Y-m-d H:i:s", $datetime);
            $datetime = new \DateTime($dt);
        }else {
            $datetime = new \DateTime($datetime);
        }
    }

    $now = new \DateTime();
    $interval = $now->diff($datetime);

    $intervalData = array(
        $interval->y, $interval->m, $interval->d,
        $interval->h, $interval->i, $interval->s,
    );
    $intervalFormat = array('年', '个月', '天', '小时', '分种', '秒');

    foreach($intervalData as $index=>$value) {
        if ($value) {
            $intervalData[$index] = $value . $intervalFormat[$index];
        } else {
            unset($intervalData[$index]);
            unset($intervalFormat[$index]);
        }
    }

    return implode('', array_slice($intervalData, 0, $size));
}

/**
 * 时长格式化
 *
 * @param int $duration  时常间隔
 * @throws \InvalidArgumentException
 *
 * @return string
 */
function format_duration($duration = 0) {
    $duration = intval($duration);
    if($duration<0) {
        return "00:00:00";
    }elseif($duration<10) {
        return "00:00:0".$duration;
    }elseif($duration<60) {
        return "00:00:".$duration;
    }elseif($duration<3600) {
        $m = floor($duration/60);
        $ss = $duration%60;
        if($m<10) {
            $m = "0".$m;
        }
        return "00:$m:".$ss;
    }elseif($duration<86400) {
        $h = floor($duration/3600);
        $duration = $duration%3600;
        $m = floor($duration/60);
        $ss = $duration%60;

        if($h<10) {
            $h = "0".$h;
        }
        if($m<10) {
            $m = "0".$m;
        }
        return "$h:$m:$ss";
    }else {
        return "--:--:--";
    }
}
?>