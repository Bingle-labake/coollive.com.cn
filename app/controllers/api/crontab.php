<?php
error_reporting(E_ERROR | E_WARNING | E_PARSE);
$curr_paht = dirname(__FILE__) ;
$root_path = $curr_paht."/../../..";

$xml_path = "/public/data/video/xml";
$video_path = "/public/data/video/live";
$video_cut_img = "/public/data/images/video/cut";
$api_url = "http://coollive.labake.cn/api/video/upload_callback";

include $root_path."/app/libraries/xmlparse.php";
include $root_path."/app/helpers/common_helper.php";

$c = 0;

while(true) {
    $_xml_path = $root_path.$xml_path;
    if (is_dir($_xml_path) && $dh = opendir($_xml_path)){
        
            while (($file = readdir($dh))!= false){
                //文件名的全路径 包含文件名
                $filePath = $_xml_path."/".$file;
                //获取文件修改时间
                $xml = file_get_contents($filePath);
                $data = XML_unserialize($xml);
                if($data) {
					$c++;
					
                    $id = $data['video attr']['id'];
                    $video = $data['video'];

                    $dateline  = $video['dateline'];
                    $filename  = $video['filepath attr']['name'];
                    $filepath  = $video['filepath'];
					
					findOneFile($filename, $root_path.$video_path);
					
					if(file_exists($root_path.$video_path."/".$filename)) {						
						$filename_arr = explode(".", $filename);
						$pic_name = $filename_arr[0];
						
						$new_file = $root_path.'/public/data/images/video/cut/'.$pic_name.'.jpg';
						$ffmpeg_cmd = '/data/software/simple-rtmp-server/trunk/objs/ffmpeg/bin/ffmpeg -y -i '.$root_path.'/public/data/video/live/'.$filename.' -ss 00:00:01 -f image2 -vframes 1 '.$new_file;                        
						
						$ret = exec($ffmpeg_cmd);
						if(file_exists($new_file)) {
							$ext = "jpg";
						    $savePath = $root_path."/public/data/images/video/cut/";
						    $saveName = $pic_name.'.jpg';

                            $ret = saveThumbImg_ex($ext, $savePath, $saveName, 187, 140, '187x140_');
						    saveThumbImg_ex($ext, $savePath, $saveName, 100, 75, '100x75_');
						    saveThumbImg_ex($ext, $savePath, $saveName, 120, 90, '120x90_');
						    $ret = saveThumbImg_ex($ext, $savePath, $saveName, 85, 64, '85x64_');
							
							if($ret == 0) {
								$data = array('vid'=>$id, 'pic_name'=>$saveName);
							    $res = rcurl($api_url, $data);	
							}
						}						
						echo "####$ret#####";
					}else {
						echo date()."[ERROR]".$root_path.$video_path."/".$filename . " not exist.";
					}
                }
				@unlink($filePath);
            }
            closedir($dh);			
        
    }
	
	if($c == 0) {
		echo "\nWaiting for 5 seconds....\n";
	    sleep(5);
	}else {
		$c = 0;
	}	
}


function findOneFile($filename, $path) {
    if (!empty($filename) && is_dir($path)){
        if ($dh = opendir($path)){
            while (($file = readdir($dh))!= false){
				$filename_arr = explode(".", $filename);
				if(count($filename_arr)>1) {
					if(preg_match("/^".$filename_arr[0]."\.[\d]+\.[flv|mp4]/", $file)) {	
						if(rename($path."/". $file, $path."/". $filename)) {
							closedir($dh);	
							return true;
						}						
                    }
				}                
            }
            closedir($dh);
        }
    }
    return false;
}

?>