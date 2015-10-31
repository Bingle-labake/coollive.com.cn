<?php
function daddslashes($string, $force = 0) {
	! defined ( 'MAGIC_QUOTES_GPC' ) && define ( 'MAGIC_QUOTES_GPC', get_magic_quotes_gpc () );
	if (! MAGIC_QUOTES_GPC || $force) {
		if (is_array ( $string )) {
			foreach ( $string as $key => $val ) {
				$string [$key] = daddslashes ( $val, $force );
			}
		} else {
			$string = addslashes ( $string );
		}
	}
	return $string;
}
function echoFlush($str) {
	echo str_repeat ( ' ', 4096 );
	echo $str;
}

/**
 * 验证输入的邮件地址是否合法
 *
 * @access public
 * @param string $email
 *        	需要验证的邮件地址
 *        	
 * @return bool
 */
function is_email($user_email) {
	$chars = "/^([a-z0-9+_]|\\-|\\.)+@(([a-z0-9_]|\\-)+\\.)+[a-z]{2,6}\$/i";
	if (strpos ( $user_email, '@' ) !== false && strpos ( $user_email, '.' ) !== false) {
		if (preg_match ( $chars, $user_email )) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

/**
 * 计算字符串的长度（汉字按照两个字符计算）
 *
 * @param string $str
 *        	字符串
 *        	
 * @return int
 */
function str_len($str) {
	$length = strlen ( preg_replace ( '/[\x00-\x7F]/', '', $str ) );
	
	if ($length) {
		return strlen ( $str ) - $length + intval ( $length / 3 ) * 2;
	} else {
		return strlen ( $str );
	}
}

/**
 * 获取客户端IP
 * 
 * @return string
 */
function getFClientIp() {
	$ip = $_SERVER ['REMOTE_ADDR'];
	if (isset ( $_SERVER ['HTTP_CLIENT_IP'] ) && preg_match ( '/^([0-9]{1,3}\.){3}[0-9]{1,3}$/', $_SERVER ['HTTP_CLIENT_IP'] )) {
		$ip = $_SERVER ['HTTP_CLIENT_IP'];
	} elseif (isset ( $_SERVER ['HTTP_X_FORWARDED_FOR'] ) && preg_match_all ( '#\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}#s', $_SERVER ['HTTP_X_FORWARDED_FOR'], $matches )) {
		foreach ( $matches [0] as $xip ) {
			if (! preg_match ( '#^(10|172\.16|192\.168)\.#', $xip )) {
				$ip = $xip;
				break;
			}
		}
	}
	return $ip;
}

/**
 * 获得用户操作系统的换行符
 *
 * @access public
 * @return string
 */
function get_crlf() {
	/* LF (Line Feed, 0x0A, \N) 和 CR(Carriage Return, 0x0D, \R) */
	if (stristr ( $_SERVER ['HTTP_USER_AGENT'], 'Win' )) {
		$the_crlf = '\r\n';
	} elseif (stristr ( $_SERVER ['HTTP_USER_AGENT'], 'Mac' )) {
		$the_crlf = '\r'; // for old MAC OS
	} else {
		$the_crlf = '\n';
	}
	
	return $the_crlf;
}

/**
 * 自定义 header 函数，用于过滤可能出现的安全隐患
 *
 * @param
 *        	string string 内容
 *        	
 * @return void
 *
 */
function rl_header($string, $replace = true, $http_response_code = 0) {
	$string = str_replace ( array (
			"\r",
			"\n" 
	), array (
			'',
			'' 
	), $string );
	
	if (preg_match ( '/^\s*location:/is', $string )) {
		@header ( $string . "\n", $replace );
		
		exit ();
	}
	
	if (empty ( $http_response_code ) || PHP_VERSION < '4.3') {
		@header ( $string, $replace );
	} else {
		@header ( $string, $replace, $http_response_code );
	}
}

/**
 * 去除字符串右侧可能出现的乱码
 *
 * @param string $str
 *        	字符串
 *        	
 * @return string
 */
function trim_right($str) {
	$len = strlen ( $str );
	/* 为空或单个字符直接返回 */
	if ($len == 0 || ord ( $str {$len - 1} ) < 127) {
		return $str;
	}
	/* 有前导字符的直接把前导字符去掉 */
	if (ord ( $str {$len - 1} ) >= 192) {
		return substr ( $str, 0, $len - 1 );
	}
	/* 有非独立的字符，先把非独立字符去掉，再验证非独立的字符是不是一个完整的字，不是连原来前导字符也截取掉 */
	$r_len = strlen ( rtrim ( $str, "\x80..\xBF" ) );
	if ($r_len == 0 || ord ( $str {$r_len - 1} ) < 127) {
		return sub_str ( $str, 0, $r_len );
	}
	
	$as_num = ord ( ~ $str {$r_len - 1} );
	if ($as_num > (1 << (6 + $r_len - $len))) {
		return $str;
	} else {
		return substr ( $str, 0, $r_len - 1 );
	}
}

/**
 * 时间Options
 *
 * @access public
 * @param string $time        	
 * @return void
 */
function getDateOptions($type = "", $selected = 0) {
	$options = "";
	if ($type == "year") {
		$year = date ( "Y" );
		for($y = $year - 50; $y < $year - 10; $y ++) {
			if ($y == $selected) {
				$options .= '<option value="' . $y . '" selected="selected">' . $y . '</option>';
			} else {
				$options .= '<option value="' . $y . '">' . $y . '</option>';
			}
		}
	}
	if ($type == "month") {
		for($m = 1; $m <= 12; $m ++) {
			if ($m == $selected) {
				$options .= '<option value="' . $m . '" selected="selected">' . $m . '</option>';
			} else {
				$options .= '<option value="' . $m . '">' . $m . '</option>';
			}
		}
	}
	if ($type == "day") {
		for($d = 1; $d <= 31; $d ++) {
			if ($d == $selected) {
				$options .= '<option value="' . $d . '" selected="selected">' . $d . '</option>';
			} else {
				$options .= '<option value="' . $d . '">' . $d . '</option>';
			}
		}
	}
	return $options;
}

/**
 * 检查是否为一个合法的时间格式
 *
 * @access public
 * @param string $time        	
 * @return void
 */
function is_time($time) {
	$pattern = '/[\d]{4}-[\d]{1,2}-[\d]{1,2}\s[\d]{1,2}:[\d]{1,2}:[\d]{1,2}/';
	
	return preg_match ( $pattern, $time );
}

/**
 * 清除指定目录下的文件
 * 
 * @param string $dir
 *        	目录路径
 * @return void
 */
function clearDir($dir, $is_del_dir = false) {
	if (! file_exists ( $dir ))
		return;
	
	$directory = dir ( $dir );
	
	while ( $entry = $directory->read () ) {
		if ($entry != '.' && $entry != '..') {
			$filename = $dir . '/' . $entry;
			if (is_dir ( $filename ))
				clearDir ( $filename, $is_del_dir );
			
			if (is_file ( $filename ))
				removeFile ( $filename );
		}
	}
	
	$directory->close ();
	if ($is_del_dir)
		@rmdir ( $dir );
}

/**
 * 写入文件内容
 * 
 * @param string $filepat
 *        	文件路径
 * @param string $content
 *        	写入内容
 * @param string $type
 *        	写入方式 w:将文件指针指向文件头并将文件大小截为零 a:将文件指针指向文件末尾
 * @return string
 */
function writeFile($filepath, $content, $type = 'w') {
	$is_success = false;
	
	if ($fp = fopen ( $filepath, $type )) {
		/*
		 * $start_time = microtime(); do { $is_write = flock($fp, LOCK_EX);
		 * if(!$is_write) usleep(round(rand(0,100) * 1000)); } while(!$is_write
		 * && ((microtime() - $start_time) < 10000)); if ($is_write &&
		 * fwrite($fp, $content)) $is_success = true;
		 */
		@flock ( $fp, LOCK_EX );
		if (fwrite ( $fp, $content ))
			$is_success = true;
		@flock ( $fp, LOCK_UN );
		@fclose ( $fp );
		@chmod ( $filepath, 0777 );
	}
	
	return $is_success;
}

/**
 * 删除文件
 * 
 * @param string $filepat
 *        	文件路径
 * @return bool
 */
function removeFile($filepath) {
	$is_success = false;
	/*
	 * do { @unlink($filepath); $is_exists = file_exists($filepath);
	 * if($is_exists) usleep(round(rand(0,100) * 1000)); else $is_success =
	 * true; } while($is_exists && ((microtime() - $start_time) < 10000));
	 */
	@unlink ( $filepath );
	if (! file_exists ( $filepath ))
		$is_success = true;
	return $is_success;
}
function authcode($string, $operation = 'DECODE', $key = '', $expiry = 0) {
	$ckey_length = 4;
	$key = md5 ( $key ? $key : $GLOBALS ['discuz_auth_key'] );
	$keya = md5 ( substr ( $key, 0, 16 ) );
	$keyb = md5 ( substr ( $key, 16, 16 ) );
	$keyc = $ckey_length ? ($operation == 'DECODE' ? substr ( $string, 0, $ckey_length ) : substr ( md5 ( microtime () ), - $ckey_length )) : '';
	
	$cryptkey = $keya . md5 ( $keya . $keyc );
	$key_length = strlen ( $cryptkey );
	
	$string = $operation == 'DECODE' ? base64_decode ( substr ( $string, $ckey_length ) ) : sprintf ( '%010d', $expiry ? $expiry + time () : 0 ) . substr ( md5 ( $string . $keyb ), 0, 16 ) . $string;
	$string_length = strlen ( $string );
	
	$result = '';
	$box = range ( 0, 255 );
	
	$rndkey = array ();
	for($i = 0; $i <= 255; $i ++) {
		$rndkey [$i] = ord ( $cryptkey [$i % $key_length] );
	}
	
	for($j = $i = 0; $i < 256; $i ++) {
		$j = ($j + $box [$i] + $rndkey [$i]) % 256;
		$tmp = $box [$i];
		$box [$i] = $box [$j];
		$box [$j] = $tmp;
	}
	
	for($a = $j = $i = 0; $i < $string_length; $i ++) {
		$a = ($a + 1) % 256;
		$j = ($j + $box [$a]) % 256;
		$tmp = $box [$a];
		$box [$a] = $box [$j];
		$box [$j] = $tmp;
		$result .= chr ( ord ( $string [$i] ) ^ ($box [($box [$a] + $box [$j]) % 256]) );
	}
	
	if ($operation == 'DECODE') {
		if ((substr ( $result, 0, 10 ) == 0 || substr ( $result, 0, 10 ) - time () > 0) && substr ( $result, 10, 16 ) == substr ( md5 ( substr ( $result, 26 ) . $keyb ), 0, 16 )) {
			return substr ( $result, 26 );
		} else {
			return '';
		}
	} else {
		return $keyc . str_replace ( '=', '', base64_encode ( $result ) );
	}
}
function date_dir($type = 3) {
	$date_format = "Y/m/d/";
	if ($type == 1) {
		$date_format = "Y/";
	} elseif ($type == 2) {
		$date_format = "Y/m/";
	} elseif ($type == 3) {
		$date_format = "Y/m/d/";
	}
	$date = date ( $date_format, mktime () );
	return $date;
}
function rcurl($url, $data = '', $method = "post") {
	$poststr = '';
	$i = 0;
	$ch = curl_init ();
	
	if ($method == "post") {
		if (is_array ( $data )) {
			foreach ( $data as $dkey => $dval ) {
				$poststr .= $dkey . '=' . $dval;
				if ($i < count ( $data ))
					$poststr .= '&';
				$i ++;
			}
		} else {
			$poststr = $data;
		}
		curl_setopt ( $ch, CURLOPT_URL, $url );
		curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );
		curl_setopt ( $ch, CURLOPT_POST, true );
		curl_setopt ( $ch, CURLOPT_POSTFIELDS, $poststr );
		curl_setopt ( $ch, CURLOPT_TIMEOUT, 6 );
		curl_setopt ( $ch, CURLOPT_USERAGENT, "Opera/9.25" );
	} else {
		curl_setopt ( $ch, CURLOPT_URL, $url );
		curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
	}
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	$result = curl_exec ( $ch );
	curl_close ( $ch );
	return $result;
}

/**
 * cms发布系统静态化
 *
 * @param
 *        	s string $cache_name
 * @param
 *        	s string $caches
 *        	
 * @return
 *
 */
function write_cms_html($cache_name, $content, $dir = '', $ext = "html") {
	$savePath = FCPATH . $dir;
	makeDirectory ( $savePath );
	$cache_file_path = $savePath . "/" . $cache_name . '.' . $ext;
	file_put_contents ( $cache_file_path, $content, LOCK_EX );
}

/**
 * 读模板文件
 *
 * @param
 *        	s string $cache_name
 *        	
 * @return array $data
 */
function read_template_cache($cache_name, $dir = 'raylisay/views/layout/cms_template', $ext = "php") {
	$cache_file_path = FCPATH . $dir . "/" . $cache_name . '.' . $ext;
	if (file_exists ( $cache_file_path )) {
		return file_get_contents ( $cache_file_path );
	} else {
		return false;
	}
}

/**
 * 写模板文件
 *
 * @param
 *        	s string $cache_name
 * @param
 *        	s string $caches
 *        	
 * @return
 *
 */
function write_template_cache($cache_name, $content, $dir = 'raylisay/views/layout/cms_template', $ext = "php") {
	$savePath = FCPATH . $dir;
	makeDirectory ( $savePath );
	$cache_file_path = $savePath . "/" . $cache_name . '.' . $ext;
	file_put_contents ( $cache_file_path, $content, LOCK_EX );
}

/**
 * 读结果缓存文件
 *
 * @param
 *        	s string $cache_name
 *        	
 * @return array $data
 */
function read_static_cache($cache_name) {
	static $result = array ();
	if (! empty ( $result [$cache_name] )) {
		return $result [$cache_name];
	}
	$cache_file_path = FCPATH . 'public/data/static/' . $cache_name . '.php';
	if (file_exists ( $cache_file_path )) {
		include_once ($cache_file_path);
		$result [$cache_name] = $data;
		return $result [$cache_name];
	} else {
		return false;
	}
}

/**
 * 写结果缓存文件
 *
 * @param
 *        	s string $cache_name
 * @param
 *        	s string $caches
 *        	
 * @return
 *
 */
function write_static_cache($cache_name, $caches) {
	$cache_file_path = FCPATH . 'public/data/static/' . $cache_name . '.php';
	$content = "<?php\r\n";
	$content .= "\$data = " . var_export ( $caches, true ) . ";\r\n";
	$content .= "?>";
	file_put_contents ( $cache_file_path, $content, LOCK_EX );
}

/**
 * 写导航js文件
 *
 * @param
 *        	s string $cache_name
 * @param
 *        	s string $caches
 *        	
 * @return
 *
 */
function write_navi_js_cache($cache_name, $caches) {
	$cache_file_path = FCPATH . 'public/assets/default/js/' . $cache_name . '.js';
	$content = $caches;
	file_put_contents ( $cache_file_path, $content, LOCK_EX );
}

// 创建路径
function makeDirectory($directoryName) {
	$directoryName = str_replace ( "\\", "/", $directoryName );
	$dirNames = explode ( '/', $directoryName );
	$total = count ( $dirNames );
	$temp = '';
	for($i = 0; $i < $total; $i ++) {
		$temp .= $dirNames [$i] . '/';
		if (! is_dir ( $temp )) {
			$oldmask = umask ( 0 );
			if (! mkdir ( $temp, 0777 ))
				exit ( "不能建立目录 $temp" );
			umask ( $oldmask );
		}
	}
	return true;
}
// 生成缩略图--等宽压缩
function saveThumbImg($ext, $savePath, $saveName, $thumbWidth, $thumbHeight, $thumbPrefix = 'thumb_') {
	$errno = 0;
	$CreateFunction = "imagecreatefrom" . ($ext == 'jpg' ? 'jpeg' : $ext);
	$SaveFunction = "image" . ($ext == 'jpg' ? 'jpeg' : $ext);
	if (strtolower ( $CreateFunction ) == "imagecreatefromgif" && ! function_exists ( "imagecreatefromgif" )) {
		$errno = 16;
		return $errno;
	} elseif (strtolower ( $CreateFunction ) == "imagecreatefromjpeg" && ! function_exists ( "imagecreatefromjpeg" )) {
		$errno = 17;
		return $errno;
	} elseif (! function_exists ( $CreateFunction )) {
		$errno = 18;
		return $errno;
	}
	$Original = @$CreateFunction ( $savePath . $saveName );
	if (! $Original) {
		$errno = 19;
		return $errno;
	}
	$originalHeight = ImageSY ( $Original );
	$originalWidth = ImageSX ( $Original );
	$returninfo ['originalHeight'] = $originalHeight;
	$returninfo ['originalWidth'] = $originalWidth;
	if (($originalHeight < $thumbHeight && $originalWidth < $thumbWidth)) {
		// 如果比期望的缩略图小，那只Copy
		copy ( $savePath . $saveName, $savePath . $thumbPrefix . $saveName );
	} else {
		if ($originalWidth > $thumbWidth) { // 宽 > 设定宽度
			$thumbWidth = $thumbWidth;
			$thumbHeight = $thumbWidth * ($originalHeight / $originalWidth);
			if ($thumbHeight > $thumbHeight) { // 高 > 设定高度
				$thumbWidth = $thumbHeight * ($thumbWidth / $thumbHeight);
				$thumbHeight = $thumbHeight;
			}
		} elseif ($originalHeight > $thumbHeight) { // 高 > 设定高度
			$thumbHeight = $thumbHeight;
			$thumbWidth = $thumbHeight * ($originalWidth / $originalHeight);
			if ($thumbWidth > $thumbWidth) { // 宽 > 设定宽度
				$thumbHeight = $thumbWidth * ($thumbHeight / $thumbWidth);
				$thumbWidth = $thumbWidth;
			}
		}
		if ($thumbWidth == 0)
			$thumbWidth = 1;
		if ($thumbHeight == 0)
			$thumbHeight = 1;
		$createdThumb = imagecreatetruecolor ( $thumbWidth, $thumbHeight );
		if (! $createdThumb) {
			$errno = 20;
			return $errno;
		}
		if (! imagecopyresampled ( $createdThumb, $Original, 0, 0, 0, 0, $thumbWidth, $thumbHeight, $originalWidth, $originalHeight )) {
			$errno = 21;
			return $errno;
		}
		$_quality = 100;
		if (! $SaveFunction ( $createdThumb, $savePath . $thumbPrefix . $saveName, $_quality )) {
			$errno = 22;
			return $errno;
		}
	}
	return $errno;
}

// 生成缩略图--等比例压缩
function saveThumbImg_ex($ext, $savePath, $saveName, $thumbWidth, $thumbHeight, $thumbPrefix = 'thumb_', $mode = 1) {
	$errno = 0;
	$CreateFunction = "imagecreatefrom" . ($ext == 'jpg' ? 'jpeg' : $ext);
	$SaveFunction = "image" . ($ext == 'jpg' ? 'jpeg' : $ext);
	if (strtolower ( $CreateFunction ) == "imagecreatefromgif" && ! function_exists ( "imagecreatefromgif" )) {
		$errno = 16;
		return $errno;
	} elseif (strtolower ( $CreateFunction ) == "imagecreatefromjpeg" && ! function_exists ( "imagecreatefromjpeg" )) {
		$errno = 17;
		return $errno;
	} elseif (! function_exists ( $CreateFunction )) {
		$errno = 18;
		return $errno;
	}
	$Original = @$CreateFunction ( $savePath . $saveName );
	if (! $Original) {
		$errno = 19;
		return $errno;
	}
	$originalHeight = ImageSY ( $Original );
	$originalWidth = ImageSX ( $Original );
	$returninfo ['originalHeight'] = $originalHeight;
	$returninfo ['originalWidth'] = $originalWidth;
	if (($originalHeight < $thumbHeight && $originalWidth < $thumbWidth)) {
		// 如果比期望的缩略图小，那只Copy
		copy ( $savePath . $saveName, $savePath . $thumbPrefix . $saveName );
	} else {
		if ($mode == 1) {
			if ($originalWidth > $thumbWidth) { // 宽 > 设定宽度
				$thumbWidth = $thumbWidth;
				$thumbHeight = $thumbWidth * ($originalHeight / $originalWidth);
				if ($thumbHeight > $thumbHeight) { // 高 > 设定高度
					$thumbWidth = $thumbHeight * ($thumbWidth / $thumbHeight);
					$thumbHeight = $thumbHeight;
				}
			} elseif ($originalHeight > $thumbHeight) { // 高 > 设定高度
				$thumbHeight = $thumbHeight;
				$thumbWidth = $thumbHeight * ($originalWidth / $originalHeight);
				if ($thumbWidth > $thumbWidth) { // 宽 > 设定宽度
					$thumbHeight = $thumbWidth * ($thumbHeight / $thumbWidth);
					$thumbWidth = $thumbWidth;
				}
			}
		} elseif ($mode == 2) {
			if ($originalHeight > $thumbHeight) { // 高 > 设定高度
				$thumbHeight = $thumbHeight;
				$thumbWidth = $thumbHeight * ($originalWidth / $originalHeight);
				if ($thumbWidth > $thumbWidth) { // 宽 > 设定宽度
					$thumbHeight = $thumbWidth * ($thumbHeight / $thumbWidth);
					$thumbWidth = $thumbWidth;
				}
			} elseif ($originalWidth > $thumbWidth) { // 宽 > 设定宽度
				$thumbWidth = $thumbWidth;
				$thumbHeight = $thumbWidth * ($originalHeight / $originalWidth);
				if ($thumbHeight > $thumbHeight) { // 高 > 设定高度
					$thumbWidth = $thumbHeight * ($thumbWidth / $thumbHeight);
					$thumbHeight = $thumbHeight;
				}
			}
		} else {
			if ($originalHeight > $originalWidth) {
				if ($originalHeight > $thumbHeight) { // 高 > 设定高度
					$thumbHeight = $thumbHeight;
					$thumbWidth = $thumbHeight * ($originalWidth / $originalHeight);
					if ($thumbWidth > $thumbWidth) { // 宽 > 设定宽度
						$thumbHeight = $thumbWidth * ($thumbHeight / $thumbWidth);
						$thumbWidth = $thumbWidth;
					}
				} elseif ($originalWidth > $thumbWidth) { // 宽 > 设定宽度
					$thumbWidth = $thumbWidth;
					$thumbHeight = $thumbWidth * ($originalHeight / $originalWidth);
					if ($thumbHeight > $thumbHeight) { // 高 > 设定高度
						$thumbWidth = $thumbHeight * ($thumbWidth / $thumbHeight);
						$thumbHeight = $thumbHeight;
					}
				}
			} else {
				if ($originalWidth > $thumbWidth) { // 宽 > 设定宽度
					$thumbWidth = $thumbWidth;
					$thumbHeight = $thumbWidth * ($originalHeight / $originalWidth);
					if ($thumbHeight > $thumbHeight) { // 高 > 设定高度
						$thumbWidth = $thumbHeight * ($thumbWidth / $thumbHeight);
						$thumbHeight = $thumbHeight;
					}
				} elseif ($originalHeight > $thumbHeight) { // 高 > 设定高度
					$thumbHeight = $thumbHeight;
					$thumbWidth = $thumbHeight * ($originalWidth / $originalHeight);
					if ($thumbWidth > $thumbWidth) { // 宽 > 设定宽度
						$thumbHeight = $thumbWidth * ($thumbHeight / $thumbWidth);
						$thumbWidth = $thumbWidth;
					}
				}
			}
		}
		
		if ($thumbWidth == 0)
			$thumbWidth = 1;
		if ($thumbHeight == 0)
			$thumbHeight = 1;
		$createdThumb = imagecreatetruecolor ( $thumbWidth, $thumbHeight );
		if (! $createdThumb) {
			$errno = 20;
			return $errno;
		}
		if (! imagecopyresampled ( $createdThumb, $Original, 0, 0, 0, 0, $thumbWidth, $thumbHeight, $originalWidth, $originalHeight )) {
			$errno = 21;
			return $errno;
		}
		$_quality = 100;
		if (! $SaveFunction ( $createdThumb, $savePath . $thumbPrefix . $saveName, $_quality )) {
			$errno = 22;
			return $errno;
		}
	}
	return $errno;
}

/*
 * $sourePic:原图路径 $smallFileName:缩略图文件名 $width:小图宽 $heigh:小图高 针对png背景透明问题
 */
function pngthumb($sourePic, $smallFileName, $width, $heigh) {
	$image = imagecreatefrompng ( $sourePic ); // PNG
	imagesavealpha ( $image, true ); // 这里很重要 意思是不要丢了$sourePic图像的透明色;
	$BigWidth = imagesx ( $image ); // 大图宽度
	$BigHeigh = imagesy ( $image ); // 大图高度
	$thumb = imagecreatetruecolor ( $width, $heigh );
	imagealphablending ( $thumb, false ); // 这里很重要,意思是不合并颜色,直接用$img图像颜色替换,包括透明色;
	imagesavealpha ( $thumb, true ); // 这里很重要,意思是不要丢了$thumb图像的透明色;
	if (imagecopyresampled ( $thumb, $image, 0, 0, 0, 0, $width, $heigh, $BigWidth, $BigHeigh )) {
		imagepng ( $thumb, $smallFileName );
	}
	return $smallFileName; // 返回小图路径
}

/**
 * 下载远程图片
 * 
 * @param string $url
 *        	图片的绝对url
 * @param string $filepath
 *        	文件的完整路径（包括目录，不包括后缀名,例如/www/images/test）
 *        	，此函数会自动根据图片url和http头信息确定图片的后缀名
 * @return mixed 下载成功返回一个描述图片信息的数组，下载失败则返回false
 */
function downloadImage($url, $filepath) {
	// 服务器返回的头信息
	$responseHeaders = array ();
	// 原始图片名
	$originalfilename = '';
	// 图片的后缀名
	$ext = '';
	$ch = curl_init ( $url );
	// 设置curl_exec返回的值包含Http头
	curl_setopt ( $ch, CURLOPT_HEADER, 1 );
	// 设置curl_exec返回的值包含Http内容
	curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
	// 设置抓取跳转（http 301，302）后的页面
	curl_setopt ( $ch, CURLOPT_FOLLOWLOCATION, 1 );
	// 设置最多的HTTP重定向的数量
	curl_setopt ( $ch, CURLOPT_MAXREDIRS, 2 );
	
	// 服务器返回的数据（包括http头信息和内容）
	$html = curl_exec ( $ch );
	// 获取此次抓取的相关信息
	$httpinfo = curl_getinfo ( $ch );
	curl_close ( $ch );
	if ($html !== false) {
		// 分离response的header和body，由于服务器可能使用了302跳转，所以此处需要将字符串分离为 2+跳转次数 个子串
		$httpArr = explode ( "\r\n\r\n", $html, 2 + $httpinfo ['redirect_count'] );
		// 倒数第二段是服务器最后一次response的http头
		$header = $httpArr [count ( $httpArr ) - 2];
		// 倒数第一段是服务器最后一次response的内容
		$body = $httpArr [count ( $httpArr ) - 1];
		$header .= "\r\n";
		
		// 获取最后一次response的header信息
		preg_match_all ( '/([a-z0-9-_]+):\s*([^\r\n]+)\r\n/i', $header, $matches );
		if (! empty ( $matches ) && count ( $matches ) == 3 && ! empty ( $matches [1] ) && ! empty ( $matches [1] )) {
			for($i = 0; $i < count ( $matches [1] ); $i ++) {
				if (array_key_exists ( $i, $matches [2] )) {
					$responseHeaders [$matches [1] [$i]] = $matches [2] [$i];
				}
			}
		}
		// 获取图片后缀名
		if (0 < preg_match ( '{(?:[^\/\\\\]+)\.(jpg|jpeg|gif|png|bmp)$}i', $url, $matches )) {
			$originalfilename = $matches [0];
			$ext = $matches [1];
		} else {
			if (array_key_exists ( 'Content-Type', $responseHeaders )) {
				if (0 < preg_match ( '{image/(\w+)}i', $responseHeaders ['Content-Type'], $extmatches )) {
					$ext = $extmatches [1];
				}
			}
		}
		// 保存文件
		if (! empty ( $ext )) {
			$filepath .= ".$ext";
			$local_file = fopen ( $filepath, 'w' );
			if (false !== $local_file) {
				if (false !== fwrite ( $local_file, $body )) {
					fclose ( $local_file );
					$sizeinfo = getimagesize ( $filepath );
					$size = round ( filesize ( $filepath ) / 1024, 1 );
					return array (
							'filepath' => realpath ( $filepath ),
							'width' => $sizeinfo [0],
							'height' => $sizeinfo [1],
							'orginalfilename' => $originalfilename,
							'filename' => pathinfo ( $filepath, PATHINFO_BASENAME ),
							'mime' => $sizeinfo ['mime'],
							'size' => $size 
					);
				}
			}
		}
	}
	return false;
}
function getImgWH($imgPath, $ext) {
	$res = array ();
	$CreateFunction = "imagecreatefrom" . ($ext == 'jpg' ? 'jpeg' : $ext);
	$SaveFunction = "image" . ($ext == 'jpg' ? 'jpeg' : $ext);
	if (strtolower ( $CreateFunction ) == "imagecreatefromgif" && ! function_exists ( "imagecreatefromgif" )) {
		$res ['errno'] = - 1;
		return $res ['errno'];
	} elseif (strtolower ( $CreateFunction ) == "imagecreatefromjpeg" && ! function_exists ( "imagecreatefromjpeg" )) {
		$res ['errno'] = - 2;
		return $res ['errno'];
	} elseif (! function_exists ( $CreateFunction )) {
		$res ['errno'] = - 3;
		return $res ['errno'];
	}
	$Original = @$CreateFunction ( $imgPath );
	if (! $Original) {
		$res ['errno'] = - 4;
		return $res ['errno'];
	}
	$res ['h'] = ImageSY ( $Original );
	$res ['w'] = ImageSX ( $Original );
	return $res;
}
/**
 * 获取字符串长度
 * 
 * @param string $str
 *        	要获取长度的字符串
 * @return int
 */
function getStrLen($str) {
	$length = strlen ( preg_replace ( '/[\x00-\x7F]/', '', $str ) );
	
	if ($length) {
		return strlen ( $str ) - $length + intval ( $length / 3 ) * 2;
	} else {
		return strlen ( $str );
	}
}

// 获取文件扩展名
function getFileExt($fileName) {
	$ext = explode ( ".", $fileName );
	$ext = $ext [count ( $ext ) - 1];
	return strtolower ( $ext );
}

// 将秒数转换成时分秒
function changeTimeType($seconds) {
	if ($seconds > 3600) {
		$hours = intval ( $seconds / 3600 );
		$minutes = $seconds % 3600;
		$time = $hours . ":" . gmstrftime ( '%M:%S', $minutes );
	} else {
		$time = gmstrftime ( '%H:%M:%S', $seconds );
	}
	return $time;
}

/*加密*/
function strencoder($str)
{
#$yuan = 'abA!c1dB#ef2@Cg$h%iD_3jkl^E:m}4n.o{&F*p)5q(G-r[sH]6tuIv7w+Jxy8z9K0';
#$jia = 'zAy%0Bx+1C$wDv^Eu2-t3(F{sr&G4q_pH5*on6I)m:l7.Jk]j8K}ih@gf9#ed!cb[a';
$yuan = 'abAc1dBef2CghiD3jklEm4noFp5qGrsH6tuIv7wJxy8z9K0';
$jia = 'zAy0Bx1CwDvEu2t3FsrG4qpH5on6Iml7Jkj8Kihgf9edcba';
		$str = strval($str);
		if ( strlen($str) == 0) return false;
		$results = '';
		for($i = 0;$i<strlen($str);$i++)
		{
		for($j = 0;$j<strlen($yuan);$j++)
		{
		if($str[$i]==$yuan[$j])
		{
			$results .= $jia[$j];
			break;
			}
			}
			}
			return $results;
			}

			/*解密*/
			function strdecoder($str)
{
			$yuan = 'abAc1dBef2CghiD3jklEm4noFp5qGrsH6tuIv7wJxy8z9K0';
		$jia = 'zAy0Bx1CwDvEu2t3FsrG4qpH5on6Iml7Jkj8Kihgf9edcba';
		$str = strval($str);
		If (strlen($str)==0) return false;
		$results = '';
		for($i = 0;$i< strlen($str);$i++)
		{
		for($j = 0;$j<strlen($jia);$j++)
			{
			if($str[$i]==$jia[$j])
			{
			$results .= $yuan[$j];
			break;
			}
			}
			}
			return $results;
			}
			
/**
 * 重写 URL 地址
 *
 * @access public
 * @param string $app
 *        	执行程序
 * @param array $params
 *        	参数数组
 * @param string $append
 *        	附加字串
 * @param integer $page
 *        	页数
 * @param string $keywords
 *        	搜索关键词字符串
 * @return void
 */
function build_uri($app, $params, $append = '', $page = 0, $size = 0) {
	$rewrite = false;
	
	$args = array (
			'id' => 0,
			'tid' => 0,
			'vid' => 0,
			'uid' => 0,
			'album_id' => 0,
			'aid' => 0,
			'wd' => '',
			'sort' => '',
			'order' => '',
            'path'=>'' #路径前后不带“/” 例如： cosplay/sanguosha
	);
	
	extract ( array_merge ( $args, $params ) );
	
	$uri = '';
	switch ($app) {
		case 'article' :
			if (empty ( $aid )) {
				return false;
			} else {
				if ($rewrite) {
					$uri = 'article-' . $aid;					
					if (! empty ( $page )) {
						$uri .= '-' . $page;
					}
					if (! empty ( $sort )) {
						$uri .= '-' . $sort;
					}
					if (! empty ( $order )) {
						$uri .= '-' . $order;
					}
				} else {
					$uri = '/article/' . $aid;					
					if (! empty ( $page )) {
						$uri .= '&amp;page=' . $page;
					}
					if (! empty ( $sort )) {
						$uri .= '&amp;sort=' . $sort;
					}
					if (! empty ( $order )) {
						$uri .= '&amp;order=' . $order;
					}
				}
			}
			
			break;
		case 'photo' :
			if (empty ( $wd )) {
				return false;
			} else {
				if ($rewrite) {
					$uri = 'img-' . $wd;
					if (! empty ( $img_type )) {
						$uri .= '-at' . $img_type;
					}
					if (! empty ( $page )) {
						$uri .= '-' . $page;
					}
					if (! empty ( $sort )) {
						$uri .= '-' . $sort;
					}
					if (! empty ( $order )) {
						$uri .= '-' . $order;
					}
				} else {
					$uri = '/p';
                    if (! empty ( $path )) {
					$uri .= '/' . $path;
    				}
    				if (! empty ( $id )) {
    					$id = strencoder($id);
    					$uri .= '/' . $id. '.html';
    				}
					if (! empty ( $page )) {
						$uri .= '&amp;page=' . $page;
					}
					if (! empty ( $sort )) {
						$uri .= '&amp;sort=' . $sort;
					}
					if (! empty ( $order )) {
						$uri .= '&amp;order=' . $order;
					}
				}
			}
			break;
		case 'video' :
			if ($rewrite) {
				$uri = 'video-' . $wd;
				if (! empty ( $push_time )) {
					$uri .= '-pt' . $push_time;
				}
				if (! empty ( $page )) {
					$uri .= '-' . $page;
				}
				if (! empty ( $sort )) {
					$uri .= '-' . $sort;
				}
				if (! empty ( $order )) {
					$uri .= '-' . $order;
				}
			} else {
				$uri = '/v';
                if (! empty ( $path )) {
					$uri .= '/' . $path;
				}
				if (! empty ( $id )) {
					$id = strencoder($id);
					$uri .= '/' . $id. '.html';
				}
				if (! empty ( $page )) {
					$uri .= '&amp;page=' . $page;
				}
				if (! empty ( $sort )) {
					$uri .= '&amp;sort=' . $sort;
				}
				if (! empty ( $order )) {
					$uri .= '&amp;order=' . $order;
				}
			}
			
			break;
		 case 'u' :
		 	 $uri = '/u';
	         if ($rewrite) {
	         	if (! empty ( $id ) && $id > 0) {
	         		$uri .= '/' . $id. '.html';
	         	}
				if (! empty ( $page )) {
					$uri .= '-' . $page;
				}
				if (! empty ( $sort )) {
					$uri .= '-' . $sort;
				}
				if (! empty ( $order )) {
					$uri .= '-' . $order;
				}
			} else {
				if (! empty ( $id ) && $id > 0) {
					$uri .= '/' . $id;
				}
				if (! empty ( $page )) {
					$uri .= '&amp;page=' . $page;
				}
				if (! empty ( $sort )) {
					$uri .= '&amp;sort=' . $sort;
				}
				if (! empty ( $order )) {
					$uri .= '&amp;order=' . $order;
				}
			}
			
			break;
			case 't' :
				$uri = '/t';
				if ($rewrite) {
					if (! empty ( $id ) && $id > 0) {
						$uri .= '/' . $id. '.html';
					}
					if (! empty ( $page )) {
						$uri .= '-' . $page;
					}
					if (! empty ( $sort )) {
						$uri .= '-' . $sort;
					}
					if (! empty ( $order )) {
						$uri .= '-' . $order;
					}
				} else {
					if (! empty ( $id ) && $id > 0) {
						$uri .= '/' . $id;
					}
					if (! empty ( $page )) {
						$uri .= '&amp;page=' . $page;
					}
					if (! empty ( $sort )) {
						$uri .= '&amp;sort=' . $sort;
					}
					if (! empty ( $order )) {
						$uri .= '&amp;order=' . $order;
					}
				}	
				break;
			case 'game' :
	                if ($rewrite) {
						$uri = '/look/show';
						if (! empty ( $id ) && $id > 0) {							
							$uri .= '/' . $id. '.html';
						}
						if (! empty ( $page )) {
							$uri .= '-' . $page;
						}
						if (! empty ( $sort )) {
							$uri .= '-' . $sort;
						}
						if (! empty ( $order )) {
							$uri .= '-' . $order;
						}
					} else {
						$uri = '/look/show';
                        $arr = array();
						if (! empty ( $id ) && $id > 0) {
							$uri .= '/' . $id;
						}
                        if (! empty ( $path )) {
							$arr[] = 'path=' . $path;
						}
						if (! empty ( $page )) {
							$arr[] = '&amp;page=' . $page;
						}
						if (! empty ( $sort )) {
							$arr[] = '&amp;sort=' . $sort;
						}
						if (! empty ( $order )) {
							$arr[] = '&amp;order=' . $order;
						}
                        $uri .= '?'.implode('&amp;',$arr);
					}					
				break;
			case 'album' :
					if ($rewrite) {
						$uri = '/look/show';
						if (! empty ( $id ) && $id > 0) {
							$uri .= '/' . $id. '.html';
						}
						if (! empty ( $page )) {
							$uri .= '-' . $page;
						}
						if (! empty ( $sort )) {
							$uri .= '-' . $sort;
						}
						if (! empty ( $order )) {
							$uri .= '-' . $order;
						}
					} else {
						$uri = '/photo/album';
						if (! empty ( $album_id ) && $album_id > 0) {
							$uri .= '/' . strencoder($album_id);
						}
						if (! empty ( $page )) {
							$uri .= '&amp;page=' . $page;
						}
						if (! empty ( $sort )) {
							$uri .= '&amp;sort=' . $sort;
						}
						if (! empty ( $order )) {
							$uri .= '&amp;order=' . $order;
						}
					}
					break;
		default :
			if (empty ( $wd )) {
				return false;
			} else {
				if ($rewrite) {
					$uri = '/s-' . $wd;
					if (! empty ( $page )) {
						$uri .= '-' . $page;
					}
					if (! empty ( $sort )) {
						$uri .= '-' . $sort;
					}
					if (! empty ( $order )) {
						$uri .= '-' . $order;
					}
				} else {
					$uri = '/s?wd=' . $wd;
					if (! empty ( $page )) {
						$uri .= '&amp;page=' . $page;
					}
					if (! empty ( $sort )) {
						$uri .= '&amp;sort=' . $sort;
					}
					if (! empty ( $order )) {
						$uri .= '&amp;order=' . $order;
					}
				}
			}
			break;
	}
	
	if ($rewrite) {
		if ($rewrite == 2 && ! empty ( $append )) {
			$uri .= '-' . urlencode ( preg_replace ( '/[\.|\/|\?|&|\+|\\\|\'|"|,]+/', '', $append ) );
		}
		
		$uri .= '.html';
	}
	if (($rewrite == 2) && (strpos ( strtolower ( "UTF-8" ), 'utf' ) !== 0)) {
		$uri = urlencode ( $uri );
	}
	return $uri;
}

// 评论分页
function js_pages($page = 1, $total, $size = 10,$url='',$param=array()) {
	if(!$total)return false;
	if($page == 0)
		$page = 1;
	$pagenum = ceil($total/$size);
	if($pagenum < $page)
		$page = $pagenum;
	if($page > 1)
		$on_page = $page-1;
	else
		$on_page = $page;
	if($page+1 > $pagenum)
		$next_page = $pagenum;
	else
		$next_page = ($page+1);
	$returl = $url."?";
	if(isset($param['page']))
		unset($param['page']);
	if(isset($param['size']))
		unset($param['size']);
	if(!empty($param))
	{
		foreach($param as $k=>$v)
			$returl .= $k.'='.$v.'&';
	}
	$on_url = $returl.'page='.$on_page;
	$next_url = $returl.'page='.$next_page;
	
	$pagestr = '<div class="pub-page comm_pages">';
	if($page == 1)
	{
		$pagestr .= '<b>首页</b>';
	}
	else
	{
		$pagestr .= '<a href="javascript:$.Todo_Page(1, ' . $size . ');">首页</a>';
		$pagestr .= '<a href="javascript:$.Todo_Page('.$on_page.', ' . $size . ');">上一页</a>';
	}
	if($pagenum<=5 && $page<5)
	{
		for($i=1;$i<=$pagenum;$i++)
		{
		if($page == $i)
			$pagestr .= '<b>'.$i.'</b>';
			else
			$pagestr .= '<a  href="javascript:$.Todo_Page('.$i.', ' . $size . ');" >'.$i.'</a>';
		}
		}
		else
		{
		if($page+3 >$pagenum)
		{
		for($i=$pagenum-4 ;$i<=$pagenum;$i++)
		{
		if($page == $i)
			$pagestr .= '<b>'.$i.'</b>';
			else
				$pagestr .= '<a href="javascript:$.Todo_Page('.$i.', ' . $size . ');">'.$i.'</a>';
			}
			}
			else
			{
			$start = $page <= 2?1:$page-2;
				for($i=$start;$i<=$start+4;$i++)
				{
				if($page == $i)
					$pagestr .= '<b>'.$i.'</b>';
					else
					$pagestr .= '<a href="javascript:$.Todo_Page('.$i.', ' . $size . ');">'.$i.'</a>';
			}
			}
			}
			if($pagenum == $page)
			{
			$pagestr .= '<b>末页</b>';
			}
			else
			{
			$pagestr .= '<a href="javascript:$.Todo_Page('.$next_page.', ' . $size . ');">下一页</a>';
			$pagestr .= '<a href="javascript:$.Todo_Page('.$pagenum.', ' . $size . ');">末页</a>';
			}
	
			$pagestr .= '</div>';
	
	return $pagestr;
}

/**
 * 合并css样式为一个文件
 *
 * @param array $css_url        	
 * @param unknown_type $path        	
 * @param unknown_type $tmpl_path        	
 * @return unknown
 */
function merge_css($css_urls, $path = "/public/data/assets/css", $filename = '') {
	if (! is_array ( $css_urls )) {
		$css_urls [] = $css_urls;
	}
	if (! file_exists ( FCPATH . $path ))
		mkdir ( FCPATH . $path, 0777 );
	if (empty ( $filename )) {
		$filename = md5 ( implode ( ',', $css_urls ) );
	}
	$css_url = $path . "/" . $filename . ".css";
	if (! file_exists ( FCPATH . $css_url )) {
		$css_content = '';
		foreach ( $css_urls as $url ) {
			if (file_exists ( FCPATH . $url )) {
				$css_content .= @file_get_contents ( FCPATH . $url );
			}
		}
		$css_content = preg_replace ( "/[\r\n]/", '', $css_content );
		@file_put_contents ( FCPATH . $css_url, $css_content );
	}
	return $css_url;
}
/**
 * 合并js为一个文件
 *
 * @param unknown_type $urls        	
 * @param unknown_type $path        	
 * @return unknown
 */
function merge_script($js_urls, $path = "/public/data/assets/js", $filename = '') {
	if (! is_array ( $js_urls )) {
		$js_urls [] = $js_urls;
	}
	if (! file_exists ( FCPATH . $path ))
		mkdir ( FCPATH . $path, 0777 );
	if (empty ( $filename )) {
		$filename = md5 ( implode ( ',', $js_urls ) );
	}
	$js_url = $path . "/" . $filename . ".js";
	if (true || ! file_exists ( FCPATH . $js_url )) {
		require_once "app/libraries/jspacker_lib.php";
		$js_content = '';
		foreach ( $js_urls as $url ) {
			$append_content = @file_get_contents ( FCPATH . $url ) . "\r\n";
			$packer = new Jspacker_lib ( $append_content );
			$append_content = $packer->pack ();
			$js_content .= $append_content;
		}
		@file_put_contents ( FCPATH . $js_url, $js_content );
	}
	return $js_url;
}

// 生成16位顺序随机编码
function make_rand_code() {
	$order_sn = "";
	$year_code = array (
			'A',
			'B',
			'C',
			'D',
			'E',
			'F',
			'G',
			'H',
			'I',
			'J' 
	);
	$order_sn = $year_code [intval ( date ( 'Y' ) ) - 2010] . strtoupper ( dechex ( date ( 'm' ) ) ) . date ( 'd' ) . substr ( time (), - 5 ) . substr ( microtime (), 2, 5 ) . sprintf ( '%02d', rand ( 0, 99 ) );
	
	return $order_sn;
}

// 模板碎片解析
function parse_frag_template($temp_text, $data, $pic_path = '') {
	if (! empty ( $data ) && is_array ( $data )) {
		foreach ( $data as $k => $v ) {
			$title = "{{frag.$k.title}}";
			$temp_text = str_replace ( $title, $v ['title'], $temp_text );
			
			$url = "{{frag.$k.url}}";
			$temp_text = str_replace ( $url, $v ['url'], $temp_text );
			
			$pic = "{{frag.$k.pic}}";
			if (! empty ( $pic_path )) {
				$temp_text = str_replace ( $pic, $pic_path . $v ['pic'], $temp_text );
			} else {
				$temp_text = str_replace ( $pic, $v ['pic'], $temp_text );
			}
			
			$describe = "{{frag.$k.describe}}";
			$temp_text = str_replace ( $describe, $v ['describe'], $temp_text );
		}
	}
	return $temp_text;
}

/**
 * 读碎片缓存文件
 *
 * @param
 *        	s string $cache_name
 *        	
 * @return array $data
 */
function read_fragment_cache($cache_name) {
	static $result = array ();
	if (! empty ( $result [$cache_name] )) {
		return $result [$cache_name];
	}
	$cache_file_path = FCPATH . 'public/data/fragment/' . $cache_name . '.html';
	if (file_exists ( $cache_file_path )) {
		$result [$cache_name] = file_get_contents ( $cache_file_path );
		return $result [$cache_name];
	} else {
		return false;
	}
}

/**
 * 写碎片缓存文件
 *
 * @param
 *        	s string $cache_name
 * @param
 *        	s string $caches
 *        	
 * @return
 *
 */
function write_fragment_cache($cache_name, $caches) {
	$cache_path = FCPATH . 'public/data/fragment';
	if (! file_exists ( $cache_path )) {
		makeDirectory ( $cache_path );
	}
	$cache_file_path = $cache_path . '/' . $cache_name . '.html';
	$content = $caches;
	return file_put_contents ( $cache_file_path, $content, LOCK_EX );
}

/**
 * 取图片访问路径
 * type 图片类型 video photo album等
 * params 参数数组
 */
function pic_url_path($type,$params=array())
{
    if(!$type)
        return '';
    
    $args = array (
            'pic_path'=>'',
            'pic_name' =>1,
            'pic_suffix' =>'jpg',
            'w' =>190,
            'h' =>190,
            'img_url'=>'http://timg1.saiku.com.cn/thumb/d' #路径后不带“/” 
	);
	extract ( array_merge ( $args, $params ) );
    
    switch ($type) {
    	case 'video'://视频
    		$pic = $img_url.'/images/video'.$pic_path;
    		break;
    	case 'photo'://图片
            $pic = $img_url.'/images/photo/';
            break;
    	default :
    		return '';
    		break;
    }
    return $pic.$pic_name.',w_'.$w.',h_'.$h.'.'.$pic_suffix;
}

/**
 * 取图片访问路径
 * app 图片类型 video photo activity
 * params 参数数组
 */
function img_url_path($app,$params=array())
{
    if(!$app)
        return '';
    
    $args = array (
			'pic_name' =>'',#图片名带后缀的，例如：/20140425/name_54654.jpg
            'pic_path'=>'',#图片路径，例如：/20140425/2/
            'w' =>190, #缩略图宽度
            'h' =>190, #缩略图高度
            'img_url'=>'http://timg1.saiku.com.cn/thumb/d' #路径后不带“/” 
	);
	
    
	extract ( array_merge ( $args, $params ) );
   
	if(empty($pic_name))return '';

	$temp_arr = explode(".", $pic_name);
    $file_ext = array_pop($temp_arr);
	
	$type_ext = array('jpg','png','gif','jpeg');
	if(!in_array($file_ext,$type_ext)) return '';

    $img =  $temp_arr[0];

    switch ($app) {
    	case 'video'://视频
    		$pic = '/images/video'.$pic_path;
    		break;
    	case 'photo'://图片
            $pic = '/images/photo/';
            break;
		case 'activity'://文章，活动等图片
            $pic = '/images/activity/';
            break;
        case 'proto'://原型图片
            $pic = '/images/prototype/';
            break;
        case 'star'://明星图片
            $pic = '/images/star/';
            break;
    	default :
    		return '';
    		break;
    }
    $ret = $img_url.$pic.$img;
    if($w)
        $ret .= ',w_'.$w;
    if($h)
        $ret .= ',h_'.$h;
    $ret .= '.'.$file_ext;
    return  $ret;
}
    /**
     * 秒转换时间例如：640秒 转化后  10:40
     */

    function vtime($time) {
        $output = '';
        foreach (array(86400 => ':', 3600 => ':', 60 => ':', 1 => '') as $key => $value) 
        {
            if ($time >= $key) 
            {
                $yu = floor($time/$key) . $value;
                if($yu<10)
                    $output .= '0'.$yu;
                else
                    $output .= $yu;
            }
            $time %= $key;
        }
        return $output;
    }
    
    /*
     *根据$posi获取导航
    *@access   public
    *@param    string           $posi  状态代码
    *@return   array|bool
    */
    function get_naviHtml_by_position($curr_app_name = "", $posi = 'index_top') {
    	$home_navi = read_static_cache("home_navi");
    	$navi_list = isset($home_navi[$posi])?$home_navi[$posi]:array();
    	if(!empty($navi_list)) {
    		$html = '';
    		foreach($navi_list as $navi) {
    			$class = '';
    			if(!empty($navi['class_name'])) {
    				$class = ' class="'.$navi['class_name'].'"';
    			}
    			$target = '';
    		    if(!empty($navi['target'])) {
    				$target = ' target="_'.$navi['target'].'"';
    			}
    				
    			if($curr_app_name == $navi['app_name']) {
    				$html .= '<li'.$class.'><a href="'.$navi['href'].'" class="head_active" '.$target.'>'.$navi['name'].'</a></li>';
    			}else {
    				$html .= '<li'.$class.'><a href="'.$navi['href'].'" '.$target.'>'.$navi['name'].'</a></li>';
    			}
    		}
    		return $html;
    	}
    	return '';
    }
    
    /*
     *根据$posi获取导航
    *@access   public
    *@param    string           $posi  状态代码
    *@return   array|bool
    */
    function get_naviHtml_by_position_20141107($curr_app_name = "", $posi = 'index_top') {
    	$home_navi = read_static_cache("home_navi");
    	$navi_list = isset($home_navi[$posi])?$home_navi[$posi]:array();
    	if(!empty($navi_list)) {
    		$html = '';
    		foreach($navi_list as $navi) {
    			$class = '';
    			if(!empty($navi['class_name'])) {
    				$class = ' class="'.$navi['class_name'].'"';
    			}
    			$target = '';
    		    if(!empty($navi['target'])) {
    				$target = ' target="_'.$navi['target'].'"';
    			}
    				
    			if($curr_app_name == $navi['app_name']) {
    				$html .= '<a href="'.$navi['href'].'" '.$target.'>'.$navi['name'].'</a>';
    			}else {
    				$html .= '<a href="'.$navi['href'].'" '.$target.'>'.$navi['name'].'</a>';
    			}
    		}
    		return $html;
    	}
    	return '';
    }
    
    //判断是不是手机。
    function is_mobile(){
    	if (isset ($_SERVER['HTTP_X_WAP_PROFILE']))
    		return true;
    
    	if(isset ($_SERVER['HTTP_CLIENT']) &&'PhoneClient'==$_SERVER['HTTP_CLIENT'])
    		return true;
    	if (isset ($_SERVER['HTTP_VIA']))
    		return stristr($_SERVER['HTTP_VIA'], 'wap') ? true : false;
    	if (isset ($_SERVER['HTTP_USER_AGENT'])) {
    		$clientkeywords = array(
    				'nokia','sony','ericsson','mot','samsung','htc','sgh','lg','sharp','sie-','philips','panasonic','alcatel','lenovo','iphone','ipod','blackberry','meizu','android','netfront','symbian','ucweb','windowsce','palm','operamini','operamobi','openwave','nexusone','cldc','midp','wap','mobile'
    		);
    		if (preg_match("/(" . implode('|', $clientkeywords) . ")/i", strtolower($_SERVER['HTTP_USER_AGENT']))) {
    			return true;
    		}
    	}
    	if (isset ($_SERVER['HTTP_ACCEPT'])) {
    		if ((strpos($_SERVER['HTTP_ACCEPT'], 'vnd.wap.wml') !== false) && (strpos($_SERVER['HTTP_ACCEPT'], 'text/html') === false || (strpos($_SERVER['HTTP_ACCEPT'], 'vnd.wap.wml') < strpos($_SERVER['HTTP_ACCEPT'], 'text/html')))) {
    			return true;
    		}
    	}
    	return false;
    }

    function init_live_stream($uid) {
        return $uid."_".date("YmdHis");
    }
?>