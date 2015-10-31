<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**************************************************************************
*   Path:   /Lauch.php
*   Home:   直播-首页
*   Author: Bingle
*   Last Modified:  10.29.2014 / scf
**************************************************************************/
class Lauch extends Live_Controller {
	protected $period = 1;
	protected $activity_name = "";

	function __construct()
	{
		parent::__construct();	

        $this->data['gh_css'] = array();
		$this->data['ph_css'] = array();
		$this->data['ph_css'][] = '/live/css/base2.0.css';
		
        $this->data['ph_js'][] = '/live/js/base2.0.js';
		
		$this->data['gf_js'] = array();
		$this->data['gf_js'][] = '/assets/im/js/jquery.json.js';
		
		$this->data['app'] = 'live';
		
		$this->data['seo']['title'] = "酷Live-有你更精彩,做不一样的直播平台";
        $this->data['seo']['description'] = '酷Live-中国最好玩的直播视频网站,提供比赛、娱乐、PK等直播娱乐平台';
        $this->data['seo']['keywords'] = "社交,视频,媒体,在线,面对面,聊天，直播，脱口秀,相声，PK,网络,平台";
	}
	
	/**
     * 首页
     */
    public function index(){
		$pic_name[] = "http://coollive.labake.cn/public/data/images/coollive/img20150320-8746-y01jkz.jpg?1426860004";
		$pic_name[] = "http://coollive.labake.cn/public/data/images/coollive/163623_photo.jpg?1427077663";
		$pic_name[] = "http://coollive.labake.cn/public/data/images/coollive/641675_photo.jpg?1399943906";
		$pic_name[] = "http://coollive.labake.cn/public/data/images/coollive/163602_photo.jpg?1426959397";
		$pic_name[] = "http://coollive.labake.cn/public/data/images/coollive/355294_photo.jpg?1352336813";
		$pic_name[] = "http://coollive.labake.cn/public/data/images/coollive/922025_photo.jpg?1420255388";
		$pic_name[] = "http://coollive.labake.cn/public/data/images/coollive/img20150221-26754-1f34xst.jpg?1424564067";
		$pic_name[] = "http://coollive.labake.cn/public/data/images/coollive/648047_photo.jpg?1416532039";
		
		if(is_login()){			
			$this->home();
        }else{
			$this->load->model('live_programs_model','live_m');
            /*+++++++++++++++++++++++++++++++列表数据++++++++++++++++++++++++++*/
            //酷Live精选
            $new_programes = $this->live_m->get_best_programs(1,10);
			
			foreach($new_programes as $k=>$v) {
				if($v['is_live'] == 1) {
					$new_programes[$k]['pic_name'] = $pic_name[$k];
				}else {
					$new_programes[$k]['pic_name'] = "/public/data/images/video/cut/187x140_".$v['pic_name'];
				}				
			}
            $this->data['new_programes'] = $this->new_programes($new_programes);
            /*+++++++++++++++++++++++++++++++列表数据结束++++++++++++++++++++++++++*/            

            $this->load->view('spree/index.tpl',$this->data);    
        }        
    } 
	
	
	/**
     * 首页
     */
    public function home(){
        $this->load->model('fragment_model', 'fragment_m');
        $this->load->model('article_model', 'article_m');
        $this->load->model('recommend_model','recommend_m');
        $this->load->model('live_programs_model','live_m');
		$this->load->model('space/member_db','member_m');

        //推荐节目焦点图
        $this->data['frag_home_focus'] = $this->fragment_m->get_html('E331499963418128');
		//推荐节目预告
        $this->data['topArr'] = $this->live_m->get_advance();
		
		//推荐剪辑
        $this->data['hot_videos'] = $this->_videoInfo($this->recommend_m->get("home_highlight",1,8));
		
		//推荐用户
		$this->data['recommend'] = $this->_videoInfo($this->recommend_m->get("home_user",1,4));

        //热点节目
		$start_time = time() - 3600*24*30;
        $hot_prog_videos = $this->live_m->get_hot_video($start_time, 1, 8);
		foreach($hot_prog_videos as $k=>$v) {
			if($v['is_live'] == 1) {
				$hot_prog_videos[$k]['pic_name'] = $pic_name[$k];
			}else {
				$hot_prog_videos[$k]['pic_name'] = "/public/data/images/video/cut/187x140_".$v['pic_name'];
			}
			$hot_prog_videos[$k]['username'] = $this->member_m->get_username($v['uid']);	
			$hot_prog_videos[$k]['record_time'] = $v['record_time']."000";
		}
        $this->data['hot_prog_videos'] = $hot_prog_videos;
		
		$user_profile = array('user_data'=>array(
						'env'=>'production',
						'event'=>false,
						'is_embed'=>false,
						'scm_env'=>'production',
						"user"=>array(
								  "about_me"=>"",
								  "first_name"=>$this->username,
								  "has_been_authenticated"=>true,
								  "last_name"=>null,
								  "needs_to_confirm_email"=>false,
								  "user_id"=>$this->uid,
								  "alt"=>900543,
								  "admin"=>false,
								  "content_mod"=>false,
								  "profile_photo_thumb_url"=>"/templates/spree/production/images/noprofile50.png",
								  "profile_photo_medium_url"=>"http://www.coollive.com.cn".avatar($this->uid),
								  "is_fb"=>false,
								  "ppv_approved"=>false,
								  "is_affiliate"=>false,
								  "following_events"=>[],
								  "is_locked"=>true,
								  "plan_name"=>"Basic",
								  "can_create_spreecast"=>false,
								  "allow_friend_requests"=>true,
								  "is_connected"=>true,
								  "vcat"=>null
								  ),
						"recommended_users"=>array(
												   array("id"=>915646,
                                                         "cached_slug"=>"kermit-and-friends",
                                                         "name"=>"Kermit and Friends",
                                                         "photo"=>"//s3.amazonaws.com/spreecast-photos/production/users/915646/tile_100x100/915646_photo.jpg?1429593653"),
												   array("id"=>414856,
                                                         "cached_slug"=>"truehooptv--2",
                                                         "name"=>"@TrueHoopTV",
                                                         "photo"=>"//s3.amazonaws.com/spreecast-photos/production/users/414856/tile_100x100/414856_photo.jpg?1355868415")
												   )
						)
			  );
		$user_profile = json_encode($user_profile);
		$this->data['user_profile'] = base64_encode($user_profile);
        $this->load->view('spree/home.tpl',$this->data);    
    } 
	
	
	//热门
	public function trending() {
		$this->load->view('spree/trending.tpl',$this->data);    		
	}	
	
	
	//即将播出
	public function upcoming() {
		$this->load->view('spree/upcoming.tpl',$this->data);    		
	}


	private function _videoInfo($info,$w=208,$h=165){
		if($info) {
            foreach($info as &$v){

            }
        }
		return $info;
	}

	private function new_programes($new_programes) {
		if(!empty($new_programes)) {
			foreach($new_programes as $k=>$programe) {
				$time_status = time() - intval($programe['record_time']);
				if(!empty($programe['pic_name'])) {
					$new_programes[$k]['pic_src'] = $this->config->item("img1_url")."/images/com/".$programe['pic_name'];
				}else {
					$i = rand(1, 10);
					$new_programes[$k]['pic_src'] = $this->config->item("img_url")."/live/tmp/".$i.",h_165,w_210.jpg";
				}
				if($time_status <= 10*60) {
					$new_programes[$k]['time_status'] = "刚刚";
				}else if($time_status <= 30*60){
					$new_programes[$k]['time_status'] = "半小时";
				}else if($time_status <= 60*60){
					$new_programes[$k]['time_status'] = "一小时";
				}else {
					$new_programes[$k]['time_status'] = "";
				}
			}
		}
		return $new_programes;
	}
	
	private function _date_format($str){
		$tmp = explode(' ',$str);
		return str_replace('-','/',$tmp[0]);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
