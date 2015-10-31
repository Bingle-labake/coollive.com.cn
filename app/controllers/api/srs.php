<?php
//SRS  回调API 
/*
 * 事件：发生该事件时，即回调指定的HTTP地址。
HTTP地址：可以支持多个，以空格分隔，SRS会依次回调这些接口。
数据：SRS将数据POST到HTTP接口。
返回值：SRS要求HTTP服务器返回HTTP200并且response内容为整数错误码（0表示成功），其他错误码会断开客户端连接。
 */

class Srs extends Api_Controller { 
	protected $live_config = array();
	protected $xml_path = "/public/data/video/xml";
	
	function __construct() {
		parent::__construct();	
		$this->live_config = $this->config->item("live");		
		$this->load->model('live/live_programs_model','live_programs_m');
	}
	
	//发布回调
	/*
	 *{
    "action": "on_connect",
    "client_id": 1985,
    "ip": "192.168.1.10", "vhost": "video.test.com", 
    "app": "live",
    "tcUrl": "rtmp://video.test.com/live?key=xxx",
    "pageUrl": "//demo.live.saiku.com.cn/program/102"
}
	*
	*/
	function connect() {
		$xmlstr = file_get_contents('php://input');
		$data = array();
		if(!empty($xmlstr)) {
			//$data = "###:connect()".$xmlstr;
			//file_put_contents("/data/wwwroot/api/app/controllers/srs.txt",$data, FILE_APPEND);
			$data = json_decode($xmlstr, true);
			$pageUrl = isset($data['pageUrl'])?$data['pageUrl']:"";
			if(!empty($pageUrl)) {	
				$http_arr = parse_url($pageUrl);
				$rid = 0;
				if(isset($http_arr['path'])) {
					$path = $http_arr['path'];
					$path_arr = explode("/", $path);
					if($path_arr[2]) {
						$rid = $path_arr[2];
					}
				}

				if($rid > 0) {
					$this->load->model('live/live_programs_model','live_programs_m');
					//$program  = $this->live_programs_m->get_program($rid);
					$this->live_programs_m->inc_views_by_rid($rid);
				}				
			}
		}else {
			$data['action']    = $this->input->get_post("action");
			$data['client_id'] = $this->input->get_post("client_id");
			$data['ip']        = $this->input->get_post("ip");
			$data['tcUrl']     = $this->input->get_post("tcUrl");//"rtmp://video.test.com/live?key=xxx"
			$data['pageUrl']   = $this->input->get_post("pageUrl");//"http://www.test.com/live.html"
		}				
		echo 0;
	}
	
	//发布回调
	/*
	 *{
    "action": "on_close",
    "client_id": 1985,
    "ip": "192.168.1.10", "vhost": "video.test.com", 
    "app": "live"
}
	*
	*/
	function close() {
		$xmlstr = file_get_contents('php://input');
		$data = array();
		if(!empty($xmlstr)) {
			$data = "###:close()".$xmlstr;
			file_put_contents("/data/wwwroot/api/app/controllers/srs.txt",$data, FILE_APPEND);
			
			$data = json_decode($xmlstr, true);
		}else {
			$data['action']    = $this->input->get_post("action");
			$data['client_id'] = $this->input->get_post("client_id");
			$data['ip']        = $this->input->get_post("ip");
			$data['vhost']     = $this->input->get_post("vhost");
			$data['stream']    = $this->input->get_post("stream");
		}
		echo 0;
	}
	
	//发布回调
	/*
	 *{"action":"on_publish","client_id":106,"ip":"10.10.11.57","vhost":"__defaultVhost__","app":"live","pageUrl":"","stream":"15300620141126122953"}
	*
	*/
	function publish() {
		$xmlstr = file_get_contents('php://input');
		$data = array();
		$flag = 0;
		if(!empty($xmlstr)) {			
			$data = json_decode($xmlstr, true);
			$stream = isset($data['stream'])?$data['stream']:"";
			if(!empty($stream)) {
                $this->load->model('live/live_programs_model','live_programs_m');
                $program  = $this->live_programs_m->get_program_by_stream($stream);
                if($program && $program['is_live']<2) {
                    //update start time
                    $where = array('rid'=>$program['rid']);
                    $set = array('start_time'=>time());
                    $this->live_programs_m->callback_update($where, $set);
                }
			}else {
				$flag = -2;
			}
		}else {
			$data['action']    = $this->input->get_post("action");
			$data['client_id'] = $this->input->get_post("client_id");
			$data['ip']        = $this->input->get_post("ip");
			$data['vhost']     = $this->input->get_post("vhost");
			$data['stream']    = $this->input->get_post("stream");
		}
		echo $flag;
	}
	
	//发布回调
	/*
	 *{"action":"on_unpublish","client_id":104,"ip":"10.10.11.57","vhost":"__defaultVhost__","app":"live","pageUrl":"","stream":"153006201411261229"}
	*
	*/
	function unpublish() {
		$flag = 0;
		$xmlstr = file_get_contents('php://input');
		//file_put_contents("/data/wwwroot/api/app/controllers/srs.txt",$xmlstr, FILE_APPEND);
		//$xmlstr = '{"action":"on_unpublish","client_id":104,"ip":"10.10.11.57","vhost":"__defaultVhost__","app":"live","pageUrl":"","stream":"15300620141128120831"}';
		$data = array();
		if(!empty($xmlstr)) {			
			$data = json_decode($xmlstr, true);
			$stream = isset($data['stream'])?$data['stream']:"";
			if(!empty($stream)) {
				$is_rename = $this->find_file($stream, FCPATH.$this->live_config['dvr_path']);
			    $this->load->model('live/live_programs_model','live_programs_m');
				$program  = $this->live_programs_m->get_program_by_stream($stream);
				if($program) {
					$this->load->model('video_model','video_m');
					$this->load->model('space/member_db','member_m');

                    //update end time
                    $where = array('rid'=>$program['rid']);
                    $end_time = time();
                    $duration = $end_time - $program['start_time'];
                    $set = array('duration'=>$duration, 'end_time'=>$end_time);
                    $this->live_programs_m->callback_update($where, $set);
							
					//插入视频
					$video['title']       = $program['name'];
					$video['description'] = $program['desc'];
					$video['tag']         = !empty($program['tags'])?$program['tags']:$program['name'];
					$video['uid']         = intval($program['uid']);
					$video['created_at']  = date('Y-m-d H:i:s');
							
					$id = $this->video_m->add_video($video);
					if($id > 0) {
						//将视频ID回写到视频组表
						$where = array('stream'=>$stream);
						$set = array('vid'=>$id, 'views'=>$program['views']);
						$flag = $this->live_programs_m->callback_update_videos($where, $set);
						if($flag) {
							//重置房间stream 
							//$this->live_programs_m->reset_program_stream($program['rid'], $program['uid']);
							
							//返回视频ID
							//写入XML文档
							$xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
							$xml .= "<video id=\"".$id."\">\n";
							$xml .= "<title>" . $program['name'] . "</title>\n";
							$xml .= "<tags>" . $video['tag'] . "</tags>\n";
							$xml .= "<is_rename>" . intval($is_rename) . "</is_rename>\n";
							$xml .= "<description>" . $program['desc'] . "</description>\n";
							$xml .= "<dateline>" . date("Y-m-d H:i:s") . "</dateline>\n";
							$xml .= "<url>".$this->config->item("w_url").$this->live_config['dvr_path'].DIRECTORY_SEPARATOR . $program['stream'] . ".flv</url>\n";
							$xml .= "<filepath name=\"".$program['stream'].".flv\">".FCPATH.$this->live_config['dvr_path']."</filepath>\n";
							$xml .= "</video>\n";
							
							file_put_contents(FCPATH.$this->xml_path.DIRECTORY_SEPARATOR."$id.xml",$xml);
							
							$flag = 0;
						}else {
							$flag = -1;
						}						
					}
				}				
			}
		}else {
			$data['action']    = $this->input->get_post("action");
			$data['client_id'] = $this->input->get_post("client_id");
			$data['ip']        = $this->input->get_post("ip");
			$data['vhost']     = $this->input->get_post("vhost");
			$data['stream']    = $this->input->get_post("stream");
		}
		echo 0;
	}
	
	//发布回调
	/*
	 *{
    "action": "on_play",
    "client_id": 1985,
    "ip": "192.168.1.10", "vhost": "video.test.com", 
    "app": "live",
    "stream": "livestream"
}
	*
	*/
	function play() {
		$xmlstr = file_get_contents('php://input');
		$data = array();
		if(!empty($xmlstr)) {
			$data = json_decode($xmlstr, true);
			$stream = isset($data['stream'])?$data['stream']:"";
			if(!empty($stream)) {				
			    $this->load->model('live/live_programs_model','live_programs_m');
				$program  = $this->live_programs_m->get_program_by_stream($stream);
				if($program) {
					$this->live_programs_m->inc_views_by_stream($stream);
				}
			}
		}else {
			$data['action']    = $this->input->get_post("action");
			$data['client_id'] = $this->input->get_post("client_id");
			$data['ip']        = $this->input->get_post("ip");
			$data['vhost']     = $this->input->get_post("vhost");
			$data['stream']    = $this->input->get_post("stream");
		}
		echo 0;
	}
	
	//发布回调
	/*
	 *{
    "action": "on_stop",
    "client_id": 1985,
    "ip": "192.168.1.10", "vhost": "video.test.com", 
    "app": "live",
    "stream": "livestream"
}
	*
	*/
	function stop() {
		$xmlstr = file_get_contents('php://input');
		$data = array();
		if(!empty($xmlstr)) {
			$data = "###:stop()".$xmlstr;
			file_put_contents("/data/wwwroot/api/app/controllers/srs.txt",$data, FILE_APPEND);
			
			$data = json_decode($xmlstr, true);
		}else {
			$data['action']    = $this->input->get_post("action");
			$data['client_id'] = $this->input->get_post("client_id");
			$data['ip']        = $this->input->get_post("ip");
			$data['vhost']     = $this->input->get_post("vhost");
			$data['stream']    = $this->input->get_post("stream");
		}
		echo 0;
	}
	
	private function find_file($str_name, $dir) {
		$find_filename = "";
		$filename_postfix = "";
	    if(is_dir($dir)) {
			if ($dh = opendir($dir)) {
			    while (($file = readdir($dh)) !== false) {			    	
				    if((is_dir($dir."/".$file)) && $file!="." && $file!="..") {
					}else{
						if($file!="." && $file!="..") {							
							$name_arr = explode(".", $file);												
						    if(isset($name_arr[2]) && $name_arr[0] == $str_name) {
						    	$find_filename = $file;
						    	$filename_postfix = isset($name_arr[2])?$name_arr[2]:"flv";
						    	break;
						    }
						}
					}
				}
				closedir($dh);
			}
		}
		
		if(!empty($find_filename)) {
			return rename ( $dir.DIRECTORY_SEPARATOR.$find_filename , $dir.DIRECTORY_SEPARATOR. $str_name.".".$filename_postfix);
		}else {
			return false;
		}
	}
}

?>