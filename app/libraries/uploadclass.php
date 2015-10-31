<?php /*

*/
class UploadClass{
    var $saveName;// 保存名
    var $savePath;// 保存路径
    var $fileFormat = array('gif','jpg','doc','application/octet-stream');// 文件格式&MIME限定
    var $overwrite = 0;// 覆盖模式
    var $maxSize = 0;// 文件最大字节
    var $ext;// 文件扩展名
    var $thumb = 0;// 是否生成缩略图
    var $cut = 1;// 是否生成缩略图
    var $thumbWidth = 130;// 缩略图宽
    var $thumbHeight = 130;// 缩略图高
    var $thumbPrefix = "thumb_";// 缩略图前缀
    var $errno;// 错误代号
    var $returnArray= array();// 所有文件的返回信息
    var $returninfo= array();// 每个文件返回信息
    var $select=0;

    //构造函数
    // @param savePath 文件保存路径
    // @param fileFormat 文件格式限制数组
    // @param maxSize 文件最大尺寸
    // @param overwriet 是否覆盖 1 允许覆盖 0 禁止覆盖
    function __construct()
    {
       
    }
    
    function UploadImg($savePath, $fileFormat='',$maxSize = 0, $overwrite = 0,$select=0) {
        $this->setSavepath($savePath);
        $this->setFileformat($fileFormat);
        $this->setMaxsize($maxSize);
        $this->setOverwrite($overwrite);
        $this->setThumb($this->thumb, $this->thumbWidth,$this->thumbHeight);
        $this->errno = 0;
        $this->select=$select;
    }

	// 上传
    function run($fileInput,$changeName = 1,$newName = ''){
        if(isset($_FILES[$fileInput])){
            $fileArr = $_FILES[$fileInput];
            if(is_array($fileArr['name'])){//上传同文件域名称多个文件
                for($i = 0; $i < count($fileArr['name']); $i++){
					if($fileArr['tmp_name'][$i] != '')
                	{
						$ar['tmp_name'] = $fileArr['tmp_name'][$i];
						$ar['name'] = $fileArr['name'][$i];
						$ar['type'] = $fileArr['type'][$i];
						$ar['size'] = $fileArr['size'][$i];
						$ar['error'] = $fileArr['error'][$i];
						$this->getExt($ar['name']);//取得扩展名，赋给$this->ext，下次循环会更新
						$this->setSavename($changeName == 1 ? '' : $ar['name']);//设置保存文件名
						if($this->copyfile($ar)){
							$this->returnArray[] =  $this->returninfo;
						}else{
							$this->returninfo['error'] = $this->errmsg();
							$this->returnArray[] =  $this->returninfo;
						}
					}
                }
                return $this->errno ?  false :  true;
            }else{//上传单个文件
                $this->getExt($fileArr['name']);//取得扩展名
                //$this->setSavename($changeName == 1 ? '' : $fileArr['name']);//设置保存文件名
                $this->setSavename($newName == '' ? '' : $newName.'.'.$this->ext);//设置保存文件名
                if($this->copyfile($fileArr)){
                    $this->returnArray[] =  $this->returninfo;
                }else{
                    $this->returninfo['error'] = $this->errmsg();
                    $this->returnArray[] =  $this->returninfo;
                }
                return $this->errno ? $this->returninfo['error']  :  1;
            }
            return false;
        }else{
            $this->errno = 10;
            return $this->errmsg();
            //return false;
        }
    }

// 单个文件上传
    function copyfile($fileArray){
        $this->returninfo = array();
        // 返回信息
        //$this->returninfo['name'] = $fileArray['name'];
        $this->returninfo['saveName'] = $this->saveName;
        $this->returninfo['size'] = number_format( ($fileArray['size'])/1024 , 0, '.', ' ');//以KB为单位
        $this->returninfo['type'] = $fileArray['type'];
        // 检查文件格式
        if (!$this->validateFormat()){
            $this->errno = 11;
            return false;
        }
        // 检查目录是否可写
        if(!@is_writable($this->savePath)){
            $this->errno = 12;
            return false;
        }
        // 如果不允许覆盖，检查文件是否已经存在
        if($this->overwrite == 0 && @file_exists($this->savePath.$fileArray['name'])){
            $this->errno = 13;
            return false;
        }
        // 如果有大小限制，检查文件是否超过限制
        if ($this->maxSize != 0 ){
            if ($fileArray["size"] > $this->maxSize){
                $this->errno = 14;
                return false;
            }
        }
        // 文件上传
        if(!@copy($fileArray["tmp_name"], $this->savePath.$this->saveName)){
            $this->errno = $fileArray["error"];
            return false;
        }elseif( $this->thumb ){//创建缩略图
            $CreateFunction = "imagecreatefrom".($this->ext == 'jpg' ? 'jpeg' : $this->ext);
            $SaveFunction = "image".($this->ext == 'jpg' ? 'jpeg' : $this->ext);
            if (strtolower($CreateFunction) == "imagecreatefromgif"
                && !function_exists("imagecreatefromgif")) {
                $this->errno = 16;
                return false;
            } elseif (strtolower($CreateFunction) == "imagecreatefromjpeg"
                && !function_exists("imagecreatefromjpeg")) {
                $this->errno = 17;
                return false;
            } elseif (!function_exists($CreateFunction)) {
                $this->errno = 18;
                return false;
            }

            $Original = @$CreateFunction($this->savePath.$this->saveName);
            if (!$Original) {$this->errno = 19; return false;}
            $originalHeight = ImageSY($Original);
            $originalWidth = ImageSX($Original);
            $this->returninfo['originalHeight'] = $originalHeight;
            $this->returninfo['originalWidth'] = $originalWidth;
            if (($originalHeight <= $this->thumbHeight
                && $originalWidth <= $this->thumbWidth)) {
                // 如果比期望的缩略图小，那只Copy
                copy($this->savePath.$this->saveName,
                    $this->savePath.$this->thumbPrefix.$this->saveName);
            } else {
                if( $originalWidth > $this->thumbWidth ){// 宽 > 设定宽度
                    $thumbWidth = $this->thumbWidth ;
                    $thumbHeight = $this->thumbWidth * ( $originalHeight / $originalWidth );
                    if($thumbHeight > $this->thumbHeight){//高 > 设定高度
                        $thumbWidth = $this->thumbHeight * ( $thumbWidth / $thumbHeight );
                        $thumbHeight = $this->thumbHeight ;
                    }
                }elseif( $originalHeight > $this->thumbHeight ){//高 > 设定高度
                    $thumbHeight = $this->thumbHeight ;
                    $thumbWidth = $this->thumbHeight * ( $originalWidth / $originalHeight );
                    if($thumbWidth > $this->thumbWidth){//宽 > 设定宽度
                        $thumbHeight = $this->thumbWidth * ( $thumbHeight / $thumbWidth );
                        $thumbWidth = $this->thumbWidth ;
                    }
                }
                if ($thumbWidth == 0) $thumbWidth = 1;
                if ($thumbHeight == 0) $thumbHeight = 1;
                $createdThumb = imagecreatetruecolor($thumbWidth, $thumbHeight);
                if ( !$createdThumb ) {$this->errno = 20; return false;}
                if ( !imagecopyresampled($createdThumb, $Original, 0, 0, 0, 0,
                    $thumbWidth, $thumbHeight, $originalWidth, $originalHeight) )
                    {$this->errno = 21; return false;}
                if ( !$SaveFunction($createdThumb,
                    $this->savePath.$this->thumbPrefix.$this->saveName) )
                    {$this->errno = 22; return false;}
            }
        }
        else 
        {
        	$CreateFunction = "imagecreatefrom".($this->ext == 'jpg' ? 'jpeg' : $this->ext);
        	$Original = @$CreateFunction($this->savePath.$this->saveName);
            if (!$Original) {$this->errno = 19; return false;}
            $originalHeight = ImageSY($Original);
            $originalWidth = ImageSX($Original);
            $this->returninfo['originalHeight'] = $originalHeight;
            $this->returninfo['originalWidth'] = $originalWidth;
            if( $this->cut ){
            	imagejpeg($Original , $this->savePath.'cut_'.$this->saveName);
            	if($this->select == 0)
            		$this->imageWaterMark($this->savePath.'cut_'.$this->saveName,$this->savePath.'thumb_'.$this->saveName,$this->ext,$waterPos=9,'',$waterText="",$fontSize=12,$textColor="#CCCCCC", $fontfile='./arial.ttf',$xOffset=0,$yOffset=0);
           		 else
            		$this->imageWaterMark($this->savePath.'cut_'.$this->saveName,$this->savePath.'thumb_'.$this->saveName,$this->ext,$waterPos=9,HZP_ROOT.'/static/common/watermark.png',$waterText="",$fontSize=12,$textColor="#CCCCCC", $fontfile='./arial.ttf',$xOffset=0,$yOffset=0);
            
            }
        }
        // 删除临时文件
        if(!@$this->del($fileArray["tmp_name"])){
            return false;
        }
        return true;
    }
    

// 文件格式检查,MIME检测
    function validateFormat(){
        if(!is_array($this->fileFormat)
            || in_array(strtolower($this->ext), $this->fileFormat)
            || in_array(strtolower($this->returninfo['type']), $this->fileFormat) )
            return true;
        else
            return false;
    }
//获取文件扩展名
    function getExt($fileName){
        $ext = explode(".", $fileName);
        $ext = $ext[count($ext) - 1];
        $this->ext = strtolower($ext);
    }

//设置上传文件的最大字节限制
// @param $maxSize 文件大小(bytes) 0:表示无限制
    function setMaxsize($maxSize){
        $this->maxSize = $maxSize;
    }
//设置文件格式限定
// @param $fileFormat 文件格式数组
    function setFileformat($fileFormat){
        if(is_array($fileFormat)){$this->fileFormat = $fileFormat ;}
    }

//设置覆盖模式
// @param overwrite 覆盖模式 1:允许覆盖 0:禁止覆盖
    function setOverwrite($overwrite){
        $this->overwrite = $overwrite;
    }



//设置保存路径
// @param $savePath 文件保存路径：以 "/" 结尾，若没有 "/"，则补上
    function setSavepath($savePath){
        $this->savePath = substr( str_replace("\\","/", $savePath) , -1) == "/"
        ? $savePath : $savePath."/";
    }

//设置缩略图
// @param $thumb = 1 产生缩略图 $thumbWidth,$thumbHeight 是缩略图的宽和高
    function setThumb($thumb, $thumbWidth = 0,$thumbHeight = 0){
        $this->thumb = $thumb;
        if($thumbWidth) $this->thumbWidth = $thumbWidth;
        if($thumbHeight) $this->thumbHeight = $thumbHeight;
    }

//设置文件保存名
// @saveName 保存名，如果为空，则系统自动生成一个随机的文件名
    function setSavename($saveName){
        if ($saveName == ''){  // 如果未设置文件名，则生成一个随机文件名
            $name = date('YmdHis').rand(100,999).'.'.$this->ext;
        } else {
            $name = $saveName;
        }
        $this->saveName = $name;
    }

//删除文件
// @param $file 所要删除的文件名
    function del($fileName){
        if(!@unlink($fileName)){
            $this->errno = 15;
            return false;
        }
        return true;
    }

// 返回上传文件的信息
    function getInfo(){
        return $this->returnArray;
    }

// 得到错误信息
    function errmsg(){
        $uploadClassError = array(
            0    =>'文件上传成功 ',
            1    =>'上传图片大小不能超过2M,请重新上传.',
            2    =>'The uploaded file exceeds the MAX_FILE_SIZE that was specified in the HTML form.',
            3    =>'The uploaded file was only partially uploaded. ',
            4    =>'No file was uploaded. ',
            6    =>'Missing a temporary folder. Introduced in PHP 4.3.10 and PHP 5.0.3. ',
            7    =>'Failed to write file to disk. Introduced in PHP 5.1.0. ',
            10   =>'Input name is not unavailable!',
            11   =>'The uploaded file is Unallowable!',
            12   =>'Directory unwritable!',
            13   =>'File exist already!',
            14   =>'文件过大,请重新上传',//'File is too big!',
            15   =>'Delete file unsuccessfully!',
            16   =>'Your version of PHP does not appear to have GIF thumbnailing support.',
            17   =>'Your version of PHP does not appear to have JPEG thumbnailing support.',
            18   =>'Your version of PHP does not appear to have pictures thumbnailing support.',
            19   =>'An error occurred while attempting to copy the source image .
                    Your version of php ('.phpversion().') may not have this image type support.',
            20   =>'An error occurred while attempting to create a new image.',
            21   =>'An error occurred while copying the source image to the thumbnail image.',
            22   =>'An error occurred while saving the thumbnail image to the filesystem.
                    Are you sure that PHP has been configured with both read and write access on this folder?',
                );
        if ($this->errno == 0)
            return false;
        else
            return $uploadClassError[$this->errno];
    }
    /**
	* 建立不存在的路径目录
	* $directoryName 目录路径
	* @return 布尔型
	*/
function makeDirectory($directoryName) {
        $directoryName = str_replace("\\","/",$directoryName);
        $dirNames = explode('/', $directoryName);
        $total = count($dirNames) ;
        $temp = '';
        for($i=0; $i<$total; $i++) {
            $temp .= $dirNames[$i].'/';
            if (!is_dir($temp)) {
                $oldmask = umask(0);
                if (!mkdir($temp, 0777)) exit("不能建立目录 $temp"); 
                umask($oldmask);
            }
        }
        return true;
    }
    
    function imageWaterMark($groundImage,$thumbimage,$ext,$waterPos=0,$waterImage="",$waterText="",$fontSize=12,$textColor="#CCCCCC", $fontfile='./arial.ttf',$xOffset=0,$yOffset=0)
	{
	   $isWaterImage = FALSE;
		     $thumbWidth=$thumbHeight=150;
	     $CreateFunction = "imagecreatefrom".($ext == 'jpg' ? 'jpeg' : $ext);
	            $SaveFunction = "image".($ext == 'jpg' ? 'jpeg' : $ext);            
	
	            $Original = @$CreateFunction($groundImage);
	            
	            $originalHeight = @ImageSY($Original);
	            $originalWidth = @ImageSX($Original);
	            
	            if (($originalHeight < $thumbHeight
	                && $originalWidth < $thumbWidth)) {
	                // 如果比期望的缩略图小，那只Copy
	                copy($groundImage,$thumbimage);
	            } else {
	                if( $originalWidth > $thumbWidth ){// 宽 > 设定宽度
	                    $thumbWidth = $thumbWidth ;
	                    $thumbHeight = $thumbWidth * ( $originalHeight / $originalWidth );
	                    if($thumbHeight > $thumbHeight){//高 > 设定高度
	                        $thumbWidth = $thumbHeight * ( $thumbWidth / $thumbHeight );
	                        $thumbHeight = $thumbHeight ;
	                    }
	                }elseif( $originalHeight > $thumbHeight ){//高 > 设定高度
	                    $thumbHeight = $thumbHeight ;
	                    $thumbWidth = $thumbHeight * ( $originalWidth / $originalHeight );
	                    if($thumbWidth > $thumbWidth){//宽 > 设定宽度
	                        $thumbHeight = $thumbWidth * ( $thumbHeight / $thumbWidth );
	                        $thumbWidth = $thumbWidth ;
	                    }
	                }
	                
	                if ($thumbWidth == 0) $thumbWidth = 1;
	                if ($thumbHeight == 0) $thumbHeight = 1;
	                $createdThumb = imagecreatetruecolor($thumbWidth, $thumbHeight);
	                imagecopyresampled($createdThumb, $Original, 0, 0, 0, 0,$thumbWidth, $thumbHeight, $originalWidth, $originalHeight);
	                $SaveFunction($createdThumb,$thumbimage);
	        }
	   if(!empty($waterImage)){
	     //读取[du qu]水印文件[wen jian]
	     if(!empty($waterImage) && file_exists($waterImage)) {
	         $isWaterImage = TRUE;
	         $water_info = getimagesize($waterImage);
	         $water_w     = $water_info[0];//取得水印图片的宽
	         $water_h     = $water_info[1];//取得水印图片的高
	
	         switch($water_info[2])   {    //取得水印图片的格式  
	             case 1:$water_im = imagecreatefromgif($waterImage);break;
	             case 2:$water_im = imagecreatefromjpeg($waterImage);break;
	             case 3:$water_im = imagecreatefrompng($waterImage);break;
	             default:return 1;
	         }
	     }
	
	     //读取[du qu]背景图片
	     if(!empty($groundImage) && file_exists($groundImage)) {
	         $ground_info = getimagesize($groundImage);
	         $ground_w     = $ground_info[0];//取得背景图片的宽
	         $ground_h     = $ground_info[1];//取得背景图片的高
	
	         switch($ground_info[2]) {    //取得背景图片的格式  
	             case 1:$ground_im = imagecreatefromgif($groundImage);break;
	             case 2:$ground_im = imagecreatefromjpeg($groundImage);break;
	             case 3:$ground_im = imagecreatefrompng($groundImage);break;
	             default:return 1;
	         }
	     } else {
	         return 2;
	     }
	
	     //水印位置[wei zhi]
	     if($isWaterImage) { //图片水印  
	         $w = $water_w;
	         $h = $water_h;
	         $label = "图片的";
	         } else {  
	     //文字[wen zi]水印
	        if(!file_exists($fontfile))return 4;
	         $temp = imagettfbbox($fontSize,0,$fontfile,$waterText);//取得使用 TrueType 字体[zi ti]的文本[wen ben]的范围[fan wei]
	         $w = $temp[2] - $temp[6];
	         $h = $temp[3] - $temp[7];
	         unset($temp);
	     }
	     if( ($ground_w < $w) || ($ground_h < $h) ) {
	         return 3;
	     }
	     switch($waterPos) {
	         case 0://随机
	             $posX = rand(0,($ground_w - $w));
	             $posY = rand(0,($ground_h - $h));
	             break;
	         case 1://1为顶端居左
	             $posX = 0;
	             $posY = 0;
	             break;
	         case 2://2为顶端居中
	             $posX = ($ground_w - $w) / 2;
	             $posY = 0;
	             break;
	         case 3://3为顶端居右
	             $posX = $ground_w - $w;
	             $posY = 0;
	             break;
	         case 4://4为中部居左
	             $posX = 0;
	             $posY = ($ground_h - $h) / 2;
	             break;
	         case 5://5为中部居中
	             $posX = ($ground_w - $w) / 2;
	             $posY = ($ground_h - $h) / 2;
	             break;
	         case 6://6为中部居右
	             $posX = $ground_w - $w;
	             $posY = ($ground_h - $h) / 2;
	             break;
	         case 7://7为底端居左
	             $posX = 0;
	             $posY = $ground_h - $h;
	             break;
	         case 8://8为底端居中
	             $posX = ($ground_w - $w) / 2;
	             $posY = $ground_h - $h;
	             break;
	         case 9://9为底端居右
	             $posX = $ground_w - $w;
	             $posY = $ground_h - $h;
	             break;
	         default://随机
	             $posX = rand(0,($ground_w - $w));
	             $posY = rand(0,($ground_h - $h));
	             break;     
	     }
	
	     //设定图像[tu xiang]的混色模式[mo shi]
	     imagealphablending($ground_im, true);
	
	     if($isWaterImage) { //图片水印
	         $i=0;
	     	while($i<$ground_h){
	     		$j=0;
	     		while($j<$ground_w){
		         imagecopy($ground_im, $water_im, $j + $xOffset, $i + $yOffset, 0, 0, $water_w,$water_h);//拷贝[kao bei]水印到目标[mu biao]文件[wen jian]
		         $j=$j+$water_w;
		     	}
		     	$i=$i+$water_h;
     	}     
	     } else {//文字[wen zi]水印
	         if( !empty($textColor) && (strlen($textColor)==7) ) {
	             $R = hexdec(substr($textColor,1,2));
	             $G = hexdec(substr($textColor,3,2));
	             $B = hexdec(substr($textColor,5));
	         } else {
	           return 5;
	         }
	         imagettftext ( $ground_im, $fontSize, 0, $posX + $xOffset, $posY + $h + $yOffset, imagecolorallocate($ground_im, $R, $G, $B), $fontfile, $waterText);
	     }
	
	     //生成水印后的图片
	     @unlink($groundImage);
	     switch($ground_info[2]) {//取得背景图片的格式
	         case 1:imagegif($ground_im,$groundImage);break;
	         case 2:imagejpeg($ground_im,$groundImage);break;
	         case 3:imagepng($ground_im,$groundImage);break;
	         default: return 6;
	     }
	
	     //释放[shi fang]内存[nei cun]
	     if(isset($water_info)) unset($water_info);
	     if(isset($water_im)) imagedestroy($water_im);
	     unset($ground_info);
	     imagedestroy($ground_im);
	     //
	   }

	     return 0;
	}
}
?>