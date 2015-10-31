<?php

class Video extends Api_Controller { 
	private $video_save_dir = 'public/data/video/apicloud/';
	private $video_xml_dir  = 'public/data/video/xml/';
	function __construct() {
		parent::__construct();	
		$this->load->model('video_model','video_m');
		$this->load->model('space/member_db','member_m');		
	}	
	
	/**
	 * 添加视频信息(张林app端)
	 */
	public function addinfo(){
		$file = $this->input->get_post('file',true);
		$filepath = FCPATH.$this->video_save_dir.$file;
		$video = array();
		$video['title'] = $this->input->get_post('title',true);
		$video['description'] = $this->input->get_post('description',true);
		$video['tag'] = $this->input->get_post('tags',true);
		$systemtype = $this->input->get_post('systemtype',true);//操作系统
		
		if (empty($file) || !file_exists($filepath)) {
			$this->echo_api(-1,'请先上传视频.');
		}
		if(dstrlen($video['title']) >140 || dstrlen($video['title']) <= 0){
			$this->echo_api(-2,'标题不能为空或超过140字.');
		}
		
		if(dstrlen($video['description']) > 400 || dstrlen($video['description']) <= 0 ){
			$this->echo_api(-3,'简介不能为空或超过400字.');
		}
		
		if(dstrlen($video['tag']) >60 || dstrlen($video['tag']) <= 0){
			$this->echo_api(-4,'标签不能为空或超过60字.');
		}
		
		list($filename,$ext) = explode('.', $file);
		$ext = $systemtype == 'andriod' ? $ext : 'MOV';//IOS均为MOV,解决视频格式为长字符串问题
		$video['userid'] = intval($this->input->get_post('uid',true));
		$video['username'] = $this->input->get_post('username',true);
		$video['adddate'] = date('Y-m-d H:i:s');
		$video['timeday'] = date('Y-m-d');
		$video['update'] = date('Y-m-d H:i:s');
		$video['vid'] = md5($video['userid'].$video['adddate']);
		$video['ext'] = $ext;
		$id = $this->video_m->add_video($video);
		if ($id) {
			//生成XML文件
			$xml_filepath = '/data/wwwroot/api/'.$this->video_save_dir;
			$xml_url = $this->config->item('base_url').'/'.$this->video_save_dir.$file;	
			$rename_file = $id.'.'.$ext;
			$xml  = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
			$xml .= "<video id=\"$id\">\n";
			$xml .= "<title>$video[title]</title>\n";
			$xml .= "<description>$video[description]</description>\n";
			$xml .= "<tags>$video[tag]</tags>\n";
			$xml .= "<dateline>$video[adddate]</dateline>\n";
			$xml .= "<url>$xml_url</url>\n";
			$xml .= "<filepath name=\"$rename_file\">$xml_filepath</filepath>\n";
			$xml .= "<is_rename>1</is_rename>\n";
			$xml .= "</video>";
				
			$video_xml_dir = FCPATH.$this->video_xml_dir;
			if (!is_dir($video_xml_dir)) {
				mkdir($video_xml_dir,0777,true);
				chmod($video_xml_dir, 0777);
			}
				
			file_put_contents($video_xml_dir.$id.'.xml', $xml);
			rename($filepath, FCPATH.$this->video_save_dir.$id.'.'.$ext);//重命名视频文件
			$this->echo_api(1,'添加成功.');
		}else {
			$this->echo_api(-5,'添加失败,请稍后再试.');
		}
	}
	
	/**
	 * 保存视频信息
	 */
	public function saveinfo(){	
		$video = array();
		$video['vid']          = $this->input->get_post('ccvid',true);		
		$video['title']        = $this->input->get_post('title',true);		
		$video['description']  = $this->input->get_post('desc',true);
		$video['tag']          = $this->input->get_post('tags',true);
		$video['pic']          = $this->input->get_post('pic',true);
		$video['categoryid']   = $this->input->get_post('categoryid',true);
		$video['categoryid1']  = $this->input->get_post('categoryid1',true);
		
		$gid = intval($this->input->get_post('gid',true));
				
		if(dstrlen($video['vid']) != 32) {
			$this->echo_api(-2,'ccvid参数异常或你还没有上传视频.');
		}
		if(dstrlen($video['title']) >140 || dstrlen($video['title']) <= 0){
			$this->echo_api(-3,'标题不能为空或超过140字.');
		}
	
		if(dstrlen($video['description']) > 400 || dstrlen($video['description']) <= 0 ){
			$this->echo_api(-4,'简介不能为空或超过400字.');
		}
	
		if(dstrlen($video['tag']) >60 || dstrlen($video['tag']) <= 0){
			$this->echo_api(-5,'标签不能为空或超过60字.');
		}
		
		if(!empty($video['tag'])) {
			$tags = preg_split(",| ", $video['tag']);	
			if($tags) {
				$temp = array();
				foreach($tags as $v) {
					if(!empty($v)) {
						$temp[] = $v;
					}
				}
				$video['tag'] = implode(",", $temp);				
			}		
		}
		
		$video['userid']      = $this->uid;
		$video['username']    = $this->username;
		$video['type']        = $gid>0?1:0;
		$video['adddate']     = date('Y-m-d H:i:s');
		$video['timeday']     = date('Y-m-d');
		$video['update']      = date('Y-m-d H:i:s');
		$video['type']        = 0;
		
		$id = $this->video_m->add_video($video);
		if ($id) {	
			$this->load->model('tag_mod','tag_m');
			$this->tag_m->save_tags($this->uid, $video['tag'], $id, 10);
					
			//加积分
			$act = 'game_sign';
			$update_credit = $this->check_credit_rule($this->uid, $act);
			$update_credit && $this->credit_m->add_score($this->uid,$act);
			
			$this->echo_api(1, $id);
		}else {
			$this->echo_api(-6,'添加失败,请稍后再试.');
		}
	}
	
	 /**
	  * 
     * 更新或添加参赛记录
     * @param ccvid     int  CC视频ID
     * @param gid       int  活动ID
     * @param schedule  int  参赛排期
     */
	public function upload_ok() {
		$ccvid     = $this->input->get_post('ccvid',true);
		$gid       = intval($this->input->get_post('gid',true));
		$schedule  = intval($this->input->get_post('schedule',true));
		
		if(dstrlen($ccvid) == 32 && $gid > 0) {
			$sid = intval($sid);
			$period = intval($period);
			$this->load->model('works_index_model','index_mod');
			 
			$where = array('vid'=>$ccvid, 'userid'=>$this->uid);
			#参数视更新视频id 到关联表
			$video = $this->video_m->get_video($where);
			if($video) {
			    $add_index = array();
				$add_index['uid']   = $this->uid;				
				$add_index['wid']   = $video['id'];
				$add_index['wtype'] = 1;
				$add_index['gid']   = $gid;
	
				$add_index['status'] = 1;
				$add_index['create_time'] = time();
				
				$w_index = array('gid'=>$gid,'uid'=>$this->uid, 'schedule'=>$schedule);
		    	$is_work_index = $this->index_mod->get_index($w_index);
				if(empty($is_work_index)){
				    $ret_id = $this->index_mod->add_index($add_index);
				    
				    $this->load->model('activity_model','activity_m');
				    $name = $this->activity_m->get_one_by_where(array('id'=>$gid), 'name');
				    if($ret_id && method_exists($this,"init_".$name)) {
				        $this->{"init_".$name}($gid, $ret_id, $schedule);
				    }
				}
				
				$updata['type'] = 1;
				$updata['info']   = 1;
				$updata['status'] = 1;
				$updata['update'] = date("Y-m-d H:i:s");
				$ret_up = $this->video_mod->up_video($updata,$where);
				if($ret_up) {
					$this->echo_api(1, $is_work_index);
				}else {
					$this->echo_api(-3, "更新失败.");
				}
			}else {
				$this->echo_api(-5, "视频信息不存在.");
			}		
		}else {
			if($gid > 0) {
				$this->echo_api(-2, "CC视频ID不存在.");
			}else {
				$this->echo_api(-4, "活动ID不存在.");
			}			
		}
	}
	
	
	 /**
     * 天梯表演秀关联表初始化
     * @param gid    int  活动id
     * @param iid    int  参赛记录id
     * @param period int  活动排期数
     */
	private function init_show($gid,$iid,$schedule = 1) {        
        $this->load->model('show/ladder_show_model','show_mod');
        
        $add_data = array();
        $add_data['wk_id']   = $iid;
        $add_data['gid']     = $gid;
        $add_data['period']  = $schedule;
        #$add_data['rank']   = $rank;
        $add_data['uid']     = $this->uid;
        
        $up_data = array('key'=>'wk_id','value'=>$iid);
        $ret = $this->show_mod->add_ladder_show($add_data,$up_data);   
        #初始化缓存
        if($ret){
            $redis = new redis();
            $redis->connect(REDIS_HOST,REDIS_PORT);
            $top_key = "ladder_show_top_".$gid.'_'.$schedule;
            $top10_key = "ladder_show_top10_".$gid.'_'.$schedule;
            $redis->del($top_key);
            $redis->del($top10_key);
        }     
	}
	
	/**
	 * 获取我的视频信息
	 */
	public function by_me(){
		$page  = intval($this->input->get_post('p',true));
		$size  = intval($this->input->get_post('s',true));
		if($page<=0) {
			$page = 1;
		}
		if($size<=0) {
			$size = 8;
		}
		if($this->uid > 0) {
			$where = " where userid = ". $this->uid." and status = 3 ";
			$video_list = $this->video_m->get_videos($where, $page, $size);			
			
			$ret['list'] = $video_list;
			$ret['page']  = $page;
			$ret['size']  = $size;
			$ret['total'] = $this->video_m->get_videos_count($where);
						
			$this->echo_api(1, $ret);
		}else {
			$this->echo_api(-2, "尚未授权");
		}	
	}
	
	/**
	 * 获取我的比赛视频
	 */
	public function by_me_match(){
		$gid        = intval($this->input->get_post('gid',true));
		$schedule   = intval($this->input->get_post('schedule',true));
		$page       = intval($this->input->get_post('p',true));
		$size       = intval($this->input->get_post('s',true));		
		if($page<=0) {
			$page = 1;
		}
		if($size<=0) {
			$size = 8;
		}
		if($this->uid > 0) {
			$this->load->model('works_index_model','works_index_m');

			if($schedule > 0) {
				$where = " where uid = ".$this->uid. " and gid = ". $gid. " and schedule = ".$schedule;
			}else {
				$where = " where uid = ".$this->uid. " and gid = ". $gid;
			}			
			$entry_list = $this->works_index_m->get_works_index($where, $page, $size);
			foreach($entry_list as $k=>$entry) {
			    switch($entry['wtype']) {
			    	case 1:
			    		   $this->load->model('video_model','video_m');
			    		   $entry['video'] = $this->video_m->get_video(array('id'=>$entry['wid']), 
			    		   array('id', 'title', 'tag', 'adddate', 'duration', 'image', 'pic_path'));
			    		   break;
			    	case 2:
			    		   $this->load->model('photo_model','photo_m');
			    		   $entry['pic'] = $this->photo_m->get_photo(array('id'=>$entry['wid']), 
			    		   array('id', 'title', 'tag', 'pic_name', 'adddate'));
			    		   break;
			    	default:;
			    }			    
			    $entry_list[$k] = $entry;
			}
			
			$ret['list'] = $entry_list;
			$ret['page']  = $page;
			$ret['size']  = $size;
			$ret['total'] = $this->works_index_m->get_works_index_count($where);
			$this->echo_api(1, $ret);
		}else {
			$this->echo_api(-2, "尚未授权");
		}
	}
	
	/**
	 * 获取视频详情
	 * @param string $ccvid //CC视频ID   多个以逗号连接
	 * @param string $vid    //视频ID    多个以逗号连接
	 * 
	 * @return json
	 */
	public function show(){
		$ccvid  = $this->input->get_post('ccvid',true);
		$id     = $this->input->get_post('vid',true);		
		
		$ids = "";
		$flag = 0;
		if(!empty($ccvid)) {
			$ccvid_arr = explode(",", $ccvid);
			foreach($ccvid_arr as $vid) {
				if(!empty($vid)) {
					if(empty($ids)) {
						$ids = "'".$vid."'";
					}else {
						$ids .= ",'".$vid."'";
					}
				}
			}
			$flag = 2;
		}elseif($id) {
			$id_arr = explode(",", $id);
			foreach($id_arr as $id) {
				if(!empty($id)) {
					if(empty($ids)) {
						$ids = $id;
					}else {
						$ids .= ",".$id;
					}
				}
			}
			$flag = 1;
		}else {
			$this->echo_api(-3, "缺少必要的参数.");
		}
		$video_list = $this->video_m->get_video_idin($ids, $flag);
		foreach($video_list as $k=>$video) {
			$video['user'] = $this->member_m->get_user_by_id($video['userid']);
			$video_list[$k] = $video;
		}			
		$this->echo_api(1, $video_list);
	}
	
	/**
	 * 参赛作品
	 * @param string $ccvid //CC视频ID   多个以逗号连接
	 * @param string $id    //视频ID     多个以逗号连接
	 *
	 * @return json
	 */
	public function works($gid = 0){
		$schedule   = intval($this->input->get_post('schedule',true));
		$uid        = intval($this->input->get_post('uid',true));
		
		$page  = intval($this->input->get_post('p',true));
		$size  = intval($this->input->get_post('s',true));
		$order = $this->input->get_post('o',true);
		
		if($page<=0) {
			$page = 1;
		}
		if($size<=0) {
			$size = 8;
		}
		if(!empty($order)) {
			if(!in_array($order, array('id', 'create_time', 'vote'))) {
				$order = "id";
			}
		}else {
			$order = "id";
		}
		if(!empty($gid)) {
			$this->load->model('works_index_model','works_index_m');
			if(preg_match("/^[0-9_a-z]*$/i", $gid)) {
				if(!is_numeric($gid)) {
					$gid = $this->activity_m->get_one_by_where(array('name'=>$gid), 'id');
				}
				
				$where = array('gid'=>$gid, 'schedule'=>$schedule, 'uid'=>$uid);
				$works_list = $this->works_index_m->get_match($where, $page, $size, $order);
				foreach($works_list as $k=>$w) {
					
					$w['user'] = $this->member_m->get_user_by_id($w['uid']);
					$works_list[$k] = $w;
				}
				
				$ret['list']  = $works_list;
				$ret['page']  = $page;
				$ret['size']  = $size;
				$ret['total'] = $this->works_index_m->get_match_count($where);
				$this->echo_api(1, $ret);
			}else {
				$this->echo_api(-2, "缺少必要的参数.");
			}			
		}else {
			$this->echo_api(-2, "缺少必要的参数.");
		}
	}
	
	/**
	 * 获取cc移动端播放地址
	 */
	public function playurl($ccvid){
		$param['videoid'] = $ccvid;;
		
		$api_url = 'http://union.bokecc.com/api/mobile';
		$key = 'AHQfZOzdWc5YO1WRwWIxAOORtxbfbUuh';
		$param['userid'] = '9610FEEDA921B997';		
		$param = $this->argSort($param);
		$param['time'] = time();
		$param['salt'] = $key;
		$str = '';
		foreach ($param as $k=>$v){
			$str .= $k.'='.urlencode($v).'&';
		}
	
		$str = substr($str,0,count($str)-2);
		$param['hash'] = md5($str);
		unset($param['salt']);
		$str = '';
		foreach ($param as $k=>$v){
			$str .= $k.'='.urlencode($v).'&';
		}
	
		$str = substr($str,0,count($str)-2);
		$xml = file_get_contents($api_url.'?'.$str);
		$json = json_encode(simplexml_load_string($xml));
		$json_arr = json_decode($json,true);
		if (is_array($json_arr['copy'])) {
			$play_url = $json_arr['copy'][0];
		}else {
			$play_url = $json_arr['copy'];
		}
		$this->echo_api(1,array('play_url'=>$play_url));
	}
	
	/**
	 * 功能：视频上传到CC成功之后执行(Live直播)
	 *
	 */
	public function upload_finish() {		
		$vid   = intval($this->input->get_post("vid"));
		$vccid = $this->input->get_post("vccid");
		$sid   = intval($this->input->get_post("sid"));	
		if($vid > 0 && !empty($vccid)) {
			$this->load->model('video_model','video_m');
			$updata = array('info'=>1,'vid'=>$vccid, 'status'=>1,'update'=>date("Y-m-d H:i:s"));
			
			$where = array('id'=>$vid);
			$flag = $this->video_m->up_video($updata,$where);
			if($flag) {
				$this->load->model('live/live_programs_model','live_programs_m');
				
				$where = array('vid'=>$vid);
				$set = array('ccvid'=>$vccid);
				$this->live_programs_m->callback_update_videos($where, $set);
				
				if($sid > 0) {
					$this->load->model('works_index_model','works_index_m');
					#参数视更新视频id 到关联表
					$where = array('vid'=>$vccid);
					$video = $this->video_m->get_video($where);
					if($video && $sid) {
						$windex = array('sid'=>$sid);
						$ex_index = $this->works_index_m->get_index($windex);
						if($ex_index) {
							$data_index = array('wid'=>$video['id']);
							$flag = $this->works_index_m->up_index($data_index,$windex);
						}
					}
				}
			}
			$this->echo_api(1,array('res'=>$flag, 'sid'=>$sid));
		}else {
			if(!empty($vccid)) {
				$this->load->model('video_model','video_m');
				$updata = array('info'=>1,'status'=>1,'update'=>date("Y-m-d H:i:s"));
					
				$where = array('vid'=>$vccid);
				$flag = $this->video_m->up_video($updata,$where);
				if($flag) {
					if($sid > 0) {
						$this->load->model('works_index_model','works_index_m');
						#参数视更新视频id 到关联表
						$video = $this->video_m->get_video($where);
						if($video && $sid) {
							$windex = array('sid'=>$sid);
							$ex_index = $this->works_index_m->get_index($windex);
							if($ex_index) {
								$data_index = array('wid'=>$video['id']);
								$flag = $this->works_index_m->up_index($data_index,$windex);
							}
						}
					}
				}
				$this->echo_api(1,array('res'=>$flag, 'sid'=>$sid));
			}else {
				$this->echo_api(0,"参数异常");
			}
		}
	} 
	
	
	
	/**
	 * 功能：视频转码之后的维护接口
	 *
	 */
	public function upload_callback() {		
		$vid      = intval($this->input->get_post("vid"));	
		$pic_name = $this->input->get_post("pic_name");	
		if($vid > 0 && !empty($pic_name)) {
			$this->load->model('video_model','video_m');
			$updata = array('pic_name'=>$pic_name, 'status'=>3);
			
			$where = array('id'=>$vid);
			$flag = $this->video_m->up_video($updata,$where);			
			$this->echo_api(1,array('res'=>$flag));
		}else {
			$this->echo_api(-1,"....");
		}
	} 
	
	

		
}

?>