<?php

class Live extends Api_Controller { 
	protected $live_config = array();
	
	function __construct() {
		parent::__construct();	
		$this->live_config = $this->config->item("live");		
		$this->load->model('live/live_programs_model','live_programs_m');
	}
	
    //客户端登陆
	/*
	*
	*code 0:fail 1:success  2:server issue other:also server issue
	*/
	function new_act() {
		$uid        = intval($this->input->get_post("user_id", true));
		$title      = $this->input->get_post("title", true);
		$start_time = $this->input->get_post("start_time", true);
		$duration   = intval($this->input->get_post("duration", true));
		$join_num   = intval($this->input->get_post("join_num", true));
		$passwd     = $this->input->get_post("passwd", true);
		$is_tmp     = $this->input->get_post("is_tmp", true);
		
		if(strlen($start_time) > 10) {
			$start_time = substr($start_time, 0, 10);
		}
		if($uid > 0 && !empty($title))  {
			if($start_time - time()>0) {
				$res = $this->live_programs_m->save_app_program($uid, $title, $start_time, $duration, $join_num, $passwd);
			}else {
				if($start_time <= 0) {
				    $start_time = time();
				}
				$res = $this->live_programs_m->save_app_program($uid, $title, $start_time, $duration, $join_num, $passwd);	
			}
			
			if($res['rid'] > 0) {
				$this->echo_api(1, array("rid"=>$res['rid'], "message"=>$this->config->item("l_url")."/events/".$res['rid'], "token"=>$res['stream'], 'items'=>$res));
			}else {
				$this->echo_api(-3, "预设直播失败.");
			}
		}else {
			$this->echo_api(-2, "预设信息不完整，请重新填写.[$uid][$title][$start_time]");
		}
	}
	
	//客户端注册
	/*
	*
	*code 0:fail 1:success  2:server issue other:also server issue
	*/
	function del_act() {
		$rid        = intval($this->input->get_post("rid", true));		
		if($rid > 0)  {
			$program = $this->live_programs_m->get_program($rid);
			if($program) {				
				$flag = $this->live_programs_m->remove_program_by_rid($rid);
				if($flag) {
					$this->echo_api(1, "");
			    }else {
			    	$this->echo_api(-4, "删除失败.");
				}
			}else {
				$this->echo_api(-3, "该活动已不存在.");
			}
		}else {
			$this->echo_api(-2, "参数异常...");
		}
	}
	
	//客户端登陆
	/*
	*
	*code 0:fail 1:success  2:server issue other:also server issue
	*/
	function edit_act() {
		$rid        = intval($this->input->get_post("rid", true));
		$uid        = intval($this->input->get_post("user_id", true));
		$title      = $this->input->get_post("title", true);
		$start_time = $this->input->get_post("start_time", true);
		$duration   = intval($this->input->get_post("duration", true));
		$join_num   = intval($this->input->get_post("join_num", true));
		$passwd     = $this->input->get_post("passwd", true);
		$is_tmp     = $this->input->get_post("is_tmp", true);
		
		if(strlen($start_time) > 10) {
			$start_time = substr($start_time, 0, 10);
		}
		if($rid > 0 && $uid > 0 && !empty($title))  {
			$program = $this->live_programs_m->get_my_program($rid, $uid);
			if($program) {
				if(empty($passwd)) {
					$passwd = 0;
				}
				$flag = $this->live_programs_m->update_app_program($rid, $uid, $title, $start_time, $duration, $join_num, $passwd);
				if($flag) {
					$this->echo_api(1, "");
			    }else {
			    	$this->echo_api(-4, "修改失败.");
				}
			}else {
				$this->echo_api(-3, "该活动已不存在.");
			}
		}else {
			$this->echo_api(-2, "预设信息不完整，请重新填写.[$uid][$title][$start_time]");
		}
	}
	
	
	//更新房间状态
	/*
	*
	*code 0:fail 1:success  2:server issue other:also server issue
	*/
	function state_act() {
		$rid        = intval($this->input->get_post("rid", true));
		//$uid        = intval($this->input->get_post("user_id", true));
		$state      = intval($this->input->get_post("state", true));	// -1 状态检测  1:开始 0:结束	
		if($rid > 0)  {
			//$program = $this->live_programs_m->get_my_program($rid, $uid);
			$program = $this->live_programs_m->get_program($rid);
			if($program && $program['is_live'] < 2) {
				$set = array();
				if($state > 0) {
				    if($program['is_live'] == 0) {
						$set = array('is_live'=>1, 'start_time'=>time());
					}
		    	}else {
		    	    if($program['is_live'] == 1) {
		    			$set = array('is_live'=>2);
		    		}			    
		    	}
				
				if(!empty($set)) {
					$this->live_programs_m->upstate_program_by_uid($rid, $program['uid'], $set);
					$this->echo_api(1, "");
				}else {
					$this->echo_api(2, "");
				}				
			}else {
				if($program) {
					$this->echo_api(-4, "该直播已经结束，将会重新分配房间。");
				}else {
					$this->echo_api(-3, "该房间已经失效或不存在.");
				}				
			}			
		}else {
			$this->echo_api(-2, "预设信息不完整，请重新填写.");
		}
	}
	
	//客户端关闭直播
	/*
	*
	*code 0:fail 1:success  2:server issue other:also server issue
	*/
	function close_act($rid = 0) {	
		if($rid > 0)  {
			$program = $this->live_programs_m->get_program($rid);
			if($program) {				
				$flag = $this->live_programs_m->end_program_by_rid($rid);
				if($flag) {				    
				    $this->echo_api(1, "");
			    }else {
					$this->echo_api(-4, "关闭失败.");
				}
			}else {				
				$this->echo_api(-3, "该活动已不存在.");
			}
		}else {			
			$this->echo_api(-2, "参数异常...");
		}
	}
	
	function my_act() {
		$uid       =  intval($this->input->get_post("user_id", true));
		$skip_rid  =  intval($this->input->get_post("next_rid", true));
		$size      = 10;
		
		if($uid > 0) {
		    $my_programs = $this->live_programs_m->get_my_programs($uid, $skip_rid, $size);	
			if($my_programs) {
				$res = array();
			    foreach($my_programs as $program) {					
					if(empty($program['visible'])) {
						$passwd = '';
					}else {
						$passwd = $program['visible'];
					}
					if(!empty($program['pic_name'])) {
						$thumb = $this->config->item("img1_url")."/images/com/".$program['pic_name'];
					}else {
						$thumb = $this->config->item("img1_url")."/images/com/coollive.png";
					}
					
					$res[] = array('id'         =>$program['rid'],
					               'duration'   =>$program['duration'],
					               'is_tmp'     =>false,
					               'join_num'   =>$program['max_num'],
					               'passwd'     =>$passwd,
					               'message'    =>$this->config->item("l_url")."/events/".$program['rid'],
					               'start_time' => $program['start_time']. "000",
					               'title'      =>$program['name'],
					               'token'      =>$program['stream'],
					               'rtmp_url'   =>$program['rid'],
					               'des'        =>$program['desc'],
					               'thumb'      =>$thumb);
				}
				
				$this->echo_api(1, $res);
			}else {
				$this->echo_api(-3, "目前你还木发现你的直播节目.");
			}
		}else {
			$this->echo_api(-2, "预设直播失败.");
		}
	}
	
	function my_program_videos() {
		$device  =  $this->input->get_post("device", true);
		$id      =  intval($this->input->get_post("id", true));
		
		if($id > 0) {
			$program['total_watch_num'] = 0;
		    $program['max_watch_num']   = 1;
		    $program['total_duration']  = "00:00:00";
		    $program['activity_id']     = $id;
		
			$videos = array();
		    $video_list = $this->live_programs_m->get_videos($id);	
			if($video_list) {
			    foreach($video_list as $video) {
					$videos[] = array(
									  'thumb'=> $video['image'],
				                      'videourl_ios'=>'http://srs.labake.cn/live/'.$video['stream'].'_hls.m3u8',
				                      'live'=>false,
				                      'timestamp'=> $video['record_time']."000",
				                      'videourl_android'=>'http://coollive.labake.cn/public/data/video/live/'.$video['stream'].'.flv');
				}
								
			}
			$program['videos']          = $videos;	
			
			$this->echo_api(1, $program);
		}else {
			$this->echo_api(-1, "参数不符...");
		}
	}
	
	/**
	 * 创建直播视频列表
	 *
	 */
	public function live_add_video() {
		$rid    = intval($this->input->get_post("rid"));
		$stream = $this->input->get_post("stream");
		
		if($rid > 0 && !empty($stream)) {
		    $this->load->model('live/live_programs_model','live_programs_m');
			$flag = $this->live_programs_m->add_video($rid, $stream);
			if($flag>0) {
				$this->echo_api(1,"");
			}else {
				$this->echo_api(-2,"插入视频列表失败");
			}			
		}else {
			$this->echo_api(-1,"参数异常");
		}
	}
	
	function client_upload() {
		$base_path = FCPATH.DIRECTORY_SEPARATOR ."public".DIRECTORY_SEPARATOR ."data".DIRECTORY_SEPARATOR ."uploads"; //接收文件目录  
		
		if(!file_exists($base_path)) {
			mkdir($base_path);  
            chmod($base_path,0777); 
		}	
		$xmlstr = file_get_contents('php://input');
        $filename = date("ymdHis") . "_". mt_rand(1000, 9999). ".3gp";
		
		$flag = false;
        $data = $xmlstr;
        $file = fopen($base_path . DIRECTORY_SEPARATOR  . $filename, "w");
        $flag = fwrite($file, $xmlstr);
        fclose($file);

        if ($flag) {  
            $array = array ("code" => "1", "message" => $base_path . DIRECTORY_SEPARATOR  . $filename);              
        } else {  
            $array = array ("code" => "0", "message" =>"");  
        }  
		echo json_encode ( $array );  
	}
	
}

?>