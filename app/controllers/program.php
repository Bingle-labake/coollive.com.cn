<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**************************************************************************
*   Comments:   直播-节目直播
*   Author: Bingle
*   Last Modified:  09.16.2014
**************************************************************************/
class Program extends Live_Controller {
	protected $activity_name = "live";
	
	function __construct()
	{
		parent::__construct();	
	    
        $this->data['gh_css'] = array();
		$this->data['ph_css'] = array();
		$this->data['ph_css'][] = '/zhuanti/tianti/css/base2.0.css';
        $this->data['ph_css'][] = '/live/css/show.css';
        $this->data['ph_css'][] = '/chat/static/css/bootstrap.css';
        //$this->data['ph_css'][] = '/chat/static/css/chat.css';
        
        $this->data['ph_js'] = array();
		#$this->data['ph_js'][] = '/tianti/js/jquery1.9.js';
        //$this->data['ph_js'][] = '/assets/play/ckplayer/ckplayer.js';
        
		
		$this->data['gf_js'] = array();
		$this->data['gf_js'][] = '/zhuanti/tianti/js/sk.js';//消息通知	
		
		
		$this->data['gf_js'][] = '/chat/config.js';
		$this->data['gf_js'][] = '/assets/im/js/jquery.json.js';
		$this->data['gf_js'][] = '/chat/static/js/chat.js';
		
		$api = $this->config->item("api");
		$this->img_path = $api['upload']['com']['path'];
		
		/*
			$config['live']['pub_server'] = "58.68.243.232";
            $config['live']['pub_port'] = 1935;
            $config['live']['pub_stream'] = "live";
        */
		$this->live_config = $this->config->item("live");
		
		$this->data['app'] = 'live';
		
	}
	
	/**
     * 首页
     */
    public function liveing(){ 
        $this->load->view('spree/live_ing.tpl',$this->data);    
    } 
	
	/**
     * 首页
     */
    public function livepre(){ 
        $this->load->view('spree/live_pre.tpl',$this->data);    
    } 
     
    /**
     * 直播房间
     */
    public function index($rid = 0) {
		if(empty($rid)){
		   @header('Location:/'.$this->activity_name.'/home');
		}
        
		$this->load->model('live_programs_model','live_programs_m');
		$this->load->model('api/member_model','member_m');
		$program = $this->live_programs_m->get_program($rid);

		//房间不存在
		if(empty($program))
		   @header('Location:/'.$this->activity_name.'/home');	
		
		$this->data['uid'] = $program['uid'];
		$this->data['user'] = $this->member_m->get_user(array('uid', 'username'), array('uid'=>$program['uid']));
		//获取赛票工具列表
		$this->data['tools_list'] = $this->tools_list();
		
		//存档视频
		$video_list = $this->live_programs_m->get_videos($rid);				
		$this->data['video_list'] = array();
		if($video_list) {
			foreach($video_list as $video) {
				$videos[] = array(
						'wid'     => $video['vid'],
						'title'   => $video['title']. " " . date("m-d H:i", $video['record_time']),
						'thumb'   => $video['image'],
						'pic_path'   => $this->config->item("img_url")."/images/video/".$video['pic_path']."/1,w_208,h_208.jpg",
						'ccvid'   =>$video['ccvid'],
						'timestamp'=> date("Y-m-d H:i:s", $video['record_time'])
				);
			}
			$this->data['video_list'] = $videos;
		}
		
		$this->data['program'] = $program;
		$stream_name = $program['stream'];
		
		if($program['is_live'] == 0) {
			$this->data['seo']['title'] = $program['name'].":直播尚未开始-,赛酷网";
            $this->data['seo']['description'] = $program['desc'];
	    	$this->data['seo']['keywords'] = $program['tags'].",视频,赛酷";
		
	    	$this->data['live_url'] = "http://demo.admin.saiku.com.cn/public/data/images/coollive.jpg";
	    	
            $this->load->view($this->activity_name.'/program.tpl',$this->data); 
		}else {	
			if($program['is_live'] == 1) {		
				$this->data['live_url'] = array('rtmp'=>'rtmp://'.$this->live_config['pub_server'].':'.$this->live_config['pub_port'].'/'.$this->live_config['pub_stream'].'/'.$stream_name,
						'hls'=>'http://'.$this->live_config['hls_server'].':'.$this->live_config['hls_port'].'/'.$this->live_config['hls_stream'].'/'.$stream_name.'_hls.m3u8');
			}else {
				$this->data['live_url'] = "http://demo.admin.saiku.com.cn".$this->img_path."/".$program['pic_name'];
			}	
			
			$this->data['seo']['title'] = $program['name']."-正在直播,赛酷网";
            $this->data['seo']['description'] = $program['desc']. "-酷Live 在2015-03-20 14:00:00 -0400 created by @TrueHoopTV - True Hoop Tv&#x27;s Channel - Insiders, TrueHoopers and You. ";
		    $this->data['seo']['keywords'] = $program['tags'].",直播,赛酷";
		
            $this->load->view($this->activity_name.'/program.tpl',$this->data); 
		}  
    }
	
		/*
	 * 获取赛票道具列表
	 */
	private function tools_list(){
		//获取赛票类别下的数据
		$params = array('time'=>time(),'appkey'=>MD5("e.saiku.com.cn"));
		$appcode = $this->api_token($params);
		$api_url = $this->config->item('i_url')."/api/eshop/wanna_magic/piao?".http_build_query($params);
		return json_decode(file_get_contents($api_url),true);
	}
	
		/*
	 * api请求的验证码
	 */
	function api_token($arr){
		$str = ''; 
		$data['appkey '] = md5("e.saiku.com.cn");
		ksort($data);
		foreach($data as $d){                                                                                                                                                       
			$str .=$d;
		}   
		return md5($str);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
