<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**************************************************************************
*   Comments:   直播-标签视频
*   Author: Bingle
*   Last Modified:  2014-12-23
**************************************************************************/
class Tag extends Live_Controller {
	protected $activity_name = "tag";
	
	function __construct()
	{
		parent::__construct();	
	    
        $this->data['gh_css'] = array();
		$this->data['ph_css'] = array();
		$this->data['ph_css'][] = '/live/css/base2.0.css';
        //$this->data['ph_css'][] = '/live/css/show.css';
        $this->data['ph_css'][] = '/live/css/style.custom_140303.css';
        $this->data['ph_css'][] = '/live/css/style.global_140915.css';
        
        $this->data['ph_js'] = array();
		$this->data['ph_js'][] = '/tianti/js/jquery1.9.js';
        //$this->data['ph_js'][] = '/assets/play/ckplayer/ckplayer.js';
        
		
		$this->data['gf_js'] = array();
		$this->data['gf_js'][] = '/zhuanti/tianti/js/sk.js';//消息通知	
		
		
		//$this->data['gf_js'][] = '/chat/config.js';
		//$this->data['gf_js'][] = '/assets/im/js/jquery.json.js';
		//$this->data['gf_js'][] = '/chat/static/js/chat.js';
		
		$api = $this->config->item("api");
		$this->img_path = $api['upload']['com']['path'];
		$this->live_config = $this->config->item("live");
		
		$this->load->model('space/member_db','member_m');	
		$this->data['app'] = 'live';
		
	}
     
    /**
     * 
     */
    public function index($keyword = "") {	
		$uid = intval($uid);
		if($uid <= 0) {
		    if($this->uid > 0) {
				$uid = $this->uid;
			}
		}
		
		$this->load->model('video_model','video_m');	
		$this->load->model('space/relation_model','relation_m');
		$this->load->model('live_programs_model','live_programs_m');
		if($uid > 0) {
			$user['info'] = $this->member_m->get_profile($uid);//个人资料
			
		if (empty($user['info'])) {
			redirect($this->config->item('l_url'));
		}else {
			//获取直播
			$program = $this->live_programs_m->get_program_uid($uid);
			if(!empty($program)) {
				$this->live_config = $this->config->item("live");
				
				$stream_name = $program['stream'];
				$program['live_url'] = array('rtmp'=>'rtmp://'.$this->live_config['pub_server'].':'.$this->live_config['pub_port'].'/'.$this->live_config['pub_stream'].'/'.$stream_name,
						'hls'=>'http://'.$this->live_config['hls_server'].':'.$this->live_config['hls_port'].'/'.$this->live_config['hls_stream'].'/'.$stream_name.'_hls.m3u8');
				
				$this->data['program'] = $program;
			}
			
			$uinfo = $this->member_m->get_user(array(),array('uid'=>$uid));
			if ($uinfo['status']<-1) {//用户被删除
				redirect($this->config->item('l_url'));
			}
			
			$where = " where userid = $uid and status = 3 ";
			$user_videos = $this->video_m->get_videos($where);//参赛视频
			$works_count = $this->video_m->get_videos_count($where);//作品数量
			$relation = "";
			$this->data['works_count'] = $works_count;
			$this->data['me'] = false;
			if($this->uid > 0) {
				if($this->uid != $uid) {
					$relation = $this->relation_m->get_follow_by_uid(array('uid'=>$this->uid,'fuid'=>$uid,'status'=>1),array('type'));//关系	
				}else {
					$this->data['me'] = true;
				}
			}
			
			if($relation == 1) {
				$this->data['relation'] = 3;
			}else {
				if($relation == 0) {
					$this->data['relation'] = 1;					
				}else {
					$this->data['relation'] = 0;
				}
			}
			$uinfo['profile']   = $user['info'];
			$this->data['user'] = $uinfo;
			$this->data['video_list'] = $user_videos;			
		}
		
		$this->load->view('profile.tpl',$this->data); 
		
		}else {
			redirect($this->config->item('l_url'));
		}
		
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
