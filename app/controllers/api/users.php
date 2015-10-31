<?php

class Users extends Api_Controller { 
	protected $live_config = array();
	function __construct() {
		parent::__construct();	
		$this->live_config = $this->config->item("live");
		$this->load->model('space/member_db','member_m');
	}	
	
	
	
    //客户端登陆(默认登录)
	/*
	*
	*code 0:fail 1:success  2:server issue other:also server issue
	*/
	function sign_in() {
		$phone    = $this->input->get_post("phone", true);
		$password = $this->input->get_post("password", true);
		
		$user    = $this->input->get_post("user", true);
	    $ver     = $this->input->get_post("ver", true);
		$device  = $this->input->get_post("device", true);
		$rom_id  = $this->input->get_post("rom_id", true);
			
		if(empty($phone) || empty($password)) {
			if(!empty($user)) {			
			    $phone    = $user['phone'];
			    $password = $user['password'];
		    }
		}
		
		if(!empty($phone) && !empty($password)) {
			$where = array('mobile'=>$phone, 'status'=>0);
			$user = $this->member_m->get_user(array('uid','username', 'mobile','password','salt','mobilestatus','status','type'),$where);
			if (empty($user) || ($user['password'] != md5(md5($password).$user['salt']))) {
				$this->echo_api(-2, "登录失败");
			}
				
			if(empty($ver)) {				
		        $this->echo_api(1, array("id"=>$user['uid'], "username"=>$user['username'], "phone"=>$phone));		
			}else {
				$unavailable_reason = '';
				if($user['status'] != 0) {
					$available = false;
					switch($user['status']) {
						case -1:$unavailable_reason = "你已经被列入黑名单，不能操作直播。"; break;
						default:$unavailable_reason = "用户已经被锁定,请与管理员联系."; break;
					}
				}else {
					$available = true;
				}
				$res = array("result"=>true,
					         "ss_ip"=>$this->live_config['pub_server'], //发布视频流地址
					         "ss_port"=>$this->live_config['pub_port'], 
					         "ss_app"=>$this->live_config['pub_stream'],
							 "publish_token"=>"0yojohck6hfqd",
							 "ss_key"=>"4363a4857b8ddef426a722068c269993", 
							 "key_duration"=>3600,				
					         "available"=>$available,							 			 
							 "encode_mode"=>2,
					         "unavailable_reason"=>$unavailable_reason,
					         "user"=>array("id"=>$user['uid'],								           
								           "username"=>$user['username']),
					         "soft"=>array("upgrade"=>0,
								           "url"=>"",
								           "feature"=>"",
								           "size"=>0));
				if($user['status'] == 1) {
				    $res['available'] = true;	
				}
				
				$this->echo_api(1, $res);
			}			
		}else {
			$this->echo_api(-1, "手机号码或密码为空.");
		}
	}
	
	//客户端注册
	/*
	*
	*code 0:fail 1:success  2:server issue other:also server issue
	*/
	function registrations() {
		$data['mobile'] = $this->input->get_post("mobile",true);
		$data['username']  = "coollive_".substr(MD5(time()), 8, 8);
		$data['password']  = $this->input->get_post("password",true);
		$confirmpwd = $this->input->get_post("confirmpwd", true);
		$sms        = $this->input->get_post("sms", true);
        $user = $this->member_m->get_user(array('mobile'),array('mobile'=>$data['mobile'], 'mobilestatus'=>1));
  		if(empty($user)) {
			if (empty($data['mobile']) || !checkmobile($data['mobile'])) {
				$this->echo_api(-1, '你输入的手机号不对,请重新输入.');
			}			
			
			if (strlen($data['password'])<6) {//密码验证
				$this->echo_api(-2, '你输入的密码过于简单,请重新输入密码.');
  			}
  				 
  			if ($data['password'] != $confirmpwd) {//两次密码输入不同
  				$this->echo_api(-3, '两次输入的密码不同.');
  			}  				

            /*
  			if (!$this->check_sms_validate($data['mobile'], $sms, 'signup_mobile')) {//短信验证码验证
  			    $this->echo_api(-4, '你输入的短信验证码错误.');
  			}
            */
  				
  			$salt = substr(uniqid(rand()), -6);
  			$data['password'] = md5(md5($data['password']).$salt);
  			$data['salt'] = $salt;
  			$data['mobilestatus'] = 1;
  			$data['ssoid'] = 'app';
  			$data['regdate'] = time();
  			$data['type'] = 1;
  			$data['groupid'] = 1;
  			$data['lid'] = 1;
				
  			$uid = $this->member_m->add_member($data);
  			if ($uid>0) {
  				$this->member_m->add_member_profile(array('uid'=>$uid));//初始化资料

                //删除短信验证码记录
                $this->member_m->del_sms_log($data['mobile'],'signup_mobile');				
					
                //写入cookie
                //$this->save_login_state($uid, $data['username']);
					
                $this->echo_api(1, array('uid' => $uid,'username'=>$data['username']));
  			}else {
  				$this->echo_api(-5, '注册失败.');
  			}
		}else {
			$this->echo_api(-6, '该手机号码已经注册.');
		}		
	}
	
	//客户端登陆
	/*
	*
	*code 0:fail 1:success  2:server issue other:also server issue
	*/
	function client_update() {
		$phone     = $this->input->get_post("phone", true);
		$$realName = $this->input->get_post("realName", true);
		
		$res = array("code"=>1, "id"=>11111, "realName"=>"bingle");
		echo json_encode($res);	
	}
	
	function check_user_state() {
		$userphone     = $this->input->get_post("userphone", true);
		echo 11111;	
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
	
	
	/**
	 * 用户信息
	 */
	public function info(){
		$uid = intval($this->input->get_post('uid',true));
		$params = $this->input->get('params',true);

		$field = array('username','email','status','uid','mobile','gameballs','credits','follows','fans','regdate','avatar');
		if($params !== false){
			$paramsArr = explode(',',$params);
			$intersect = array_intersect($field,$paramsArr);
			$param = empty($intersect)? $field:$intersect;
		}else{
			$param = $field;
		}
		$userinfo = array();
		if ($uid) {
			$userinfo = $this->member_m->get_user($param,array('uid'=>$uid));
			//计算用户头像
			if (!empty($userinfo) && isset($param['avatar'])) {
				$userinfo['avatar'] = $this->config->item('img3_url').avatar($uid);
			}
		}
		$this->echo_api(1,$userinfo);
		
	}
	
	/**
	 * 修改密码
	 */
	public function pwd(){
		$password = $this->input->get_post('password',true);
		$newpwd = $this->input->get_post('newpwd',true);
		$confirmpwd = $this->input->get_post('confirmpwd',true);
		$uid = intval($this->input->get_post('uid',true));
		if (empty($password) || empty($newpwd) || empty($confirmpwd)) {
			$this->echo_api(-1,'当前密码、新密码、确认密码不能为空.');
		}
		strlen($newpwd)<6 && exit(json_encode(array('result'=>false,'tip_type'=>'newpwd','msg'=>$this->lang->line('newpwd_short'))));
		if (strlen($newpwd)<6) {
			$this->echo_api(-2,'新密码过短.');
		}
		if ($newpwd != $confirmpwd) {
			$this->echo_api(-3,'确认密码与新密码不一致.');
		}
		$user = $this->member_m->get_user(array('password','salt'),array('uid'=>$uid));
		if (!empty($user)) {
			if ($user['password'] != md5(md5($password).$user['salt'])) {
				$this->echo_api(-4,'当前密码错误.');
			}else {
				$newpwd = md5(md5($newpwd).$user['salt']);
				$result = $this->member_m->update_users(array('password'=>$newpwd),array('uid'=>$uid));
				if ($result) {
					$this->echo_api(1,'修改成功.');
				}else {
					$this->echo_api(-5,'修改失败.');
				}
			}
		}else {
			$this->echo_api(-5,'修改失败.');
		}
	}
	
	/**
	 * 重置密码
	 */
	public function reset(){
		$mobile    = intval($this->input->get_post('mobile',true));
		$passwd    = $this->input->get_post('passwd',true);
		$c_passwd  = $this->input->get_post('c_passwd',true);
		$checkcode = intval($this->input->get_post('checkcode',true));
		
		if (empty($mobile) || empty($passwd) || empty($checkcode)) {
			$this->echo_api(-1,'参数异常....');
		}
		if(strlen($passwd) < 6) {
			$this->echo_api(-2,'新密码过短.');
		}
		if (MD5($passwd) != MD5($c_passwd)) {
			$this->echo_api(-3,'确认密码与新密码不一致.');
		}
		
		$this->echo_api(1,'');
	}
	
	/**
	 * 保持登录状态
	 * @param int $uid
	 * @param string $username
	 * @param int $remember
	 */
	private function save_login_state($uid,$username,$remember = 0){
		$cookie_time = $remember ? 7*24*3600 : 0;
		$uid_cookie = array('name' => 'sk_uid',
				'value' => $uid,
				'expire' => $cookie_time,
				'domain' => $this->config->item('cookie_domain')
		);
		$nick_cookie = array('name' => 'sk_username',
				'value' => urlencode($username),
				'expire' => $cookie_time,
				'domain' => $this->config->item('cookie_domain')
		);
		$hash_cookie = array('name' => 'hash',
				'value' => rand(10000,99999),
				'expire' => $cookie_time,
				'domain' => $this->config->item('cookie_domain')
		);
		$salt = defined('LOGIN_COOKIE_SALT')?LOGIN_COOKIE_SALT:'';
		$vir_cookie = array('name' => 'vir',
				'value' => md5($uid.$salt.$hash_cookie['value']),
				'expire' => $cookie_time,
				'domain' => $this->config->item('cookie_domain')
		);
	
		$this->input->set_cookie($uid_cookie);
		$this->input->set_cookie($nick_cookie);
		$this->input->set_cookie($hash_cookie);
		$this->input->set_cookie($vir_cookie);
	}
    
    /**
     * 发送短信验证码
     */
    public function send_sms(){
    	$mobile = $this->input->get_post('mobile',true);
    	$source = $this->input->get_post('source',true);	
    	if (empty($mobile) || !checkmobile($mobile)) {
    		$this->echo_api(-1, '你输入的手机号不对,请重新输入.');
    	}
    	$this->sendsms($mobile,$source);
    
    }
}

?>
