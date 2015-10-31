<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**************************************************************************
*   Comments:   直播-用户社交页
*   Author: Bingle
*   Last Modified:  2014-12-23
**************************************************************************/
class Users extends Live_Controller {
	protected $activity_name = "users";
	
	function __construct()
	{
		parent::__construct();	
		
        $this->data['gh_css'] = array();
		$this->data['ph_css'] = array();
		
		$api = $this->config->item("api");
		$this->img_path = $api['upload']['com']['path'];
		$this->live_config = $this->config->item("live");
		
		$this->load->model('space/member_db','member_m');	
		$this->data['app'] = 'live';
		$this->uploadpath = "public/data/images/header/";
	}
	
	public function index() {
		$this->show();
	}
	
	/**
     * 直播房间
     */
    public function show($username = "") {
		$this->load->view('spree/users/profile.tpl',$this->data);    
    }
	
	//用户主页
	public function home($uid = 0) {
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
			
			$where = " where uid = $uid and status = 3 ";
			$user_videos = $this->video_m->get_videos($where);//参赛视频
			$works_count = $this->video_m->get_videos_count($where);//作品数量
			$relation = "";
			$this->data['works_count'] = $works_count;
			$this->data['me'] = false;

            //我的预告
            $my_advance = $this->live_programs_m->get_advance_by_uid($uid);
            $this->data['my_advance'] = $my_advance;

            //我订阅的直播(即将播出的)
            $my_rsvps = $this->live_programs_m->get_my_rsvps($uid);
            $this->data['my_rsvps'] = $my_rsvps;
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
			$this->data['me']   = $this->uid;
			$this->data['user'] = $uinfo;
			$this->data['video_list'] = $user_videos;	
		
		    if($this->uid > 0) {
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
			}		
		    $this->load->view('spree/users/profile.tpl',$this->data);    
		
		}else {
			redirect($this->config->item('l_url'));
		}
	}
	
	/**
	 * 获取用户头像
	 */
	public function avatar() {
		$uid = $this->input->get_post('uid',true);
		$size = $this->input->get_post('size',true);
		$size = !empty($size) ? $size : 'middle';
		$type = $this->input->get('type',true);
		$uploadpath = $this->uploadpath;
		$img_default = 'public/data/assets/img/user_default.jpg';
		$img_exists = false;
		if ($uid) {
			$img = $uploadpath.$this->checkfolder($uid).'avatar_'.$size.'_'.$uid.'.jpg';
			if (!file_exists($img)) {
				$img = $img_default;
			}else {
				$img = $img_default;
			}			
		}else {
			$img = $img_default;
		}
		$imginfo = getimagesize($img);
		$imgform = $imginfo['mime'];
		$imgdata = fread(fopen($img, 'r'), filesize($img));
		//ob_clean();
		header("content-type:$imgform", true);
		echo $imgdata;  
	}
	
	/**
	根据id处理头像/LOGO存储路径
	@param int $id 
	@return string
	*/
	private function checkfolder ($id) {
		$foldercode = substr($id."000000", 0, 6);
		$folder = '';
		for ($i=0; $i < 6; $i += 2) { 
			$folder .= substr($foldercode, $i, 2)."/";
		}
		return $folder;
	}
	
	public function following() {
        echo '';
	}

    public function demo() {
        echo '{"success":"","formats":["html"],"layout":false}';
    }

    public function live($pid = 0) {
        $config = $this->config->item("live");
        $live_config = array(
            "server"=>$config['pub_server'],
            "port"  =>$config['pub_port'],
            "vhost" =>$config['pub_server'],
            "app"   =>$config['pub_stream'],
            "stream"=>""
        );

        $this->data['rid'] = 0;
        $live = array();
        if($this->uid > 0) {
            if($pid > 0) {
                $this->load->model('live_programs_model','live_m');
                $where = array('rid'=>$pid, 'uid'=>$this->uid);
                $live = $this->live_m->find($where);
                if($live && $live['is_live'] == 0) {
                    $this->data['rid'] = $pid;
                    $live_config['stream'] = $live['stream'];
                }
            }
        }else {
            header("Location:/");
            exit;
        }

        $live['config'] = $live_config;
        $this->data['live'] = $live;

        $this->load->view('spree/users/live.tpl',$this->data);
    }
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
?>