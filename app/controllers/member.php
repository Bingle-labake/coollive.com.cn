<?php
/**************************************************************************
*   Path:   /member.php
*   Comments:   用户控制器
*   Author: Zhang Lin
*   Last Modified:  01.19.2014 / Zhang Lin
**************************************************************************/
class Member extends Live_Controller{
	public function __construct () {
		parent::__construct();
	    $this->load->helper('function_mail');
	    $this->load->model('space/member_db','member');
		$this->lang->load('space/member','cnZH');
	}
	
	public function index(){
		if (!is_login()) {
		   redirect($this->config->item('i_url'));
		   exit;
		}
        redirect('/users');exit;
        
	}
	
	/**
	 * 注册 
	 */
	public function register(){
		if (!empty($this->uid)) {
			redirect('/users');
			exit;
		}	  
		$data = array();
		//if (isset($_POST['user_join_submit']) && $this->input->is_ajax_request()) {
			$user = $this->input->post('user');			
	        $data['username'] = $user['username'];
	        $data['email'] = $user['email'];
	        $data['password'] = $user['password'];			
	        $user['password_confirmation'];
	        $agree = $user['tos_version'];
					
			//$data['capcode'] = $this->input->post('capcode',true);
			$this->check_input_empty($data);//检查输入是否为空
			$this->checkemail($data['email']);
			
			$this->checkusername($data['username']);
			if (strlen($data['password'])<6) {
				$response = array('result' => false,'tip_type'=> 'password','msg' => $this->lang->line('password_short'));
				exit(json_encode($response));
			}
						
			if ($data['password'] != $user['password_confirmation']) {//两次密码输入不同
				$response = array('result' => false,'tip_type'=> 'password','msg' => $this->lang->line('password_error'));
				exit(json_encode($response));
			}
			/*
			if ($_SESSION['capcode_reg'] != strtolower($data['capcode'])) {
				$response = array('result' => false,'tip_type'=> 'capcode','msg' => $this->lang->line('capcode_error'));
				exit(json_encode($response));
			}
			*/
			!$agree && exit(json_encode(array('result' => false,'tip_type'=> 'agree','msg' => $this->lang->line('agree_empty'))));
						
			unset($data['confirmpwd'],$data['capcode']);
			$id = random(6);
			$authstr = $id.'|2|'.time();
			$salt = substr(uniqid(rand()), -6);
			$data['password'] = md5(md5($data['password']).$salt);
			$data['salt'] = $salt;
			$data['authstr'] = $authstr;
			$data['regip'] = get_client_ip();
			$data['regdate'] = time();
			$data['type'] = 0;
			$data['groupid'] = 1;
			$data['lid'] = 1;
			$uid = $this->member->add_member($data);
			if ($uid>0) {						
				$url = $this->config->item("base_url")."/member/activate?uid=$uid&id=$id";
				$this->sendemail(array('username'=>$data['username'],'email'=>$data['email'],'url'=>$url),'email_subject','email_body');
				$this->member->update_users(array('authstr' => $authstr),array('uid' => $uid));						
			    //存入SESSION
				$_SESSION['reg_email'] = $data['email'];
				$_SESSION['reg_username'] = $data['username'];
				//销毁注册验证码
				//unset($_SESSION['capcode_reg']);
				exit(json_encode(array('result'=>true,'tip_type' => 'register','msg'=>'')));
			}else {
				//销毁注册验证码
				unset($_SESSION['capcode_reg']);
			}
		//}else{
		//	$this->data['app'] = 'email';
		//	$this->data['seo']['title'] = '注册酷Live网';
		//	$this->data['seo']['keywords'] = '';
		//	$this->data['seo']['description'] = '';
		//	$this->load->view('space/register.php',$this->data);
		//}		
	}
  
  /**
   * 登录
   */
  public function login(){
  	  if (!empty($this->uid)) {
  		redirect('/users');exit;
  		exit;
  	  }
  	  $passport = urldecode($this->input->cookie('cl_passport'));
  	  $refer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : $this->config->item('i_url').'/space/work/look';
  	  $refer = strpos($refer, 'mgetpassword') !== false || strpos($refer, 'logout') !== false ? $this->config->item('i_url') : $refer;
	  $user = $this->input->get_post("user");
  	  $callback = $this->input->get_post('callback');
  	  //if (isset($_REQUEST['loginsubmit'])) {
  	  	  $passport = $user['email'];
  	  	  $password = $user['password'];
  	  	  $remember = $this->input->get_post('remember',true);
  	  	  if ($passport == $this->lang->line('passport_email') || empty($passport)) {
  	  	  	 if (!empty($callback)) {
  	  	  	 	exit($callback."(".json_encode(array('result'=>false,'tip_type'=>'passport','msg'=>$this->lang->line('passport_empty'))).")");
  	  	  	 }else {
  	  	  	 	exit(json_encode(array('result'=>false,'tip_type'=>'passport','msg'=>$this->lang->line('passport_empty'))));
  	  	  	 }
  	  	  }
  	  	  if (empty($password)) {
  	  	  	if (!empty($callback)) {
  	  	  		exit($callback."(".json_encode(array('result'=>false,'tip_type'=>'login','msg'=>$this->lang->line('password_empty'))).")");
  	  	  	}else {
  	  	  		exit(json_encode(array('result'=>false,'tip_type'=>'login','msg'=>$this->lang->line('password_empty'))));
  	  	  	}
  	  	  }
  	  	  $loginfield = strpos($passport, '@') !==false ? array('email'=>$passport) : array('username'=>$passport);
  	  	  if (strpos($passport, '@') !== false) {//邮箱
  	  	  	  $loginfield = array('email'=>$passport);
  	  	  }elseif (checkmobile($passport)){//手机
  	  	  	  $loginfield = array('mobile'=>$passport);
  	  	  }else {//昵称
  	  	  	  $loginfield = array('username'=>$passport);
  	  	  }
  	  	  $user = $this->member->get_user(array('uid','username','email','password','salt','emailstatus','mobilestatus','status','type'),$loginfield);
  	  	  if (empty($user) || ($user['password'] != md5(md5($password).$user['salt']))) {
  	  	  	 if (!empty($callback)) {
  	  	  	 	exit($callback."(".json_encode(array('result'=>false,'tip_type'=>'login','msg'=>$this->lang->line('passport_password_error'))) .")");
  	  	  	 }else {
  	  	  	 	exit(json_encode(array('result'=>false,'tip_type'=>'login','msg'=>$this->lang->line('passport_password_error'))));
  	  	  	 }
  	  	  }else {
  	  	  	 if ($user['status']<-1) {//被删除
  	  	  	 	if (!empty($callback)) {
  	  	  	 		exit($callback."(".json_encode(array('result'=>false,'tip_type'=>'login','msg'=>$this->lang->line('passport_password_error'))) .")");
  	  	  	 	}else {
  	  	  	 		exit(json_encode(array('result'=>false,'tip_type'=>'login','msg'=>$this->lang->line('passport_password_error'))));
  	  	  	 	}
  	  	  	 }
  	  	  	 //邮箱是否激活
  	  	  	 if (!isset($loginfield['mobile']) && !$user['emailstatus'] && !$user['mobilestatus']) {
  	  	  	 	 if (!empty($callback)) {
  	  	  	 	 	exit($callback."(".json_encode(array('result'=>false,'tip_type'=>'noactivate_email','msg'=>$user['email'])) .")");
  	  	  	 	 }else {
  	  	  	 	 	exit(json_encode(array('result'=>false,'tip_type'=>'noactivate_email','msg'=>$user['email'])));
  	  	  	 	 }
  	  	  	 }
  	  	  	 
  	  	  	 //手机号是否激活(前提是非手机注册)
  	  	  	 if (isset($loginfield['mobile']) && !$user['mobilestatus'] && $user['type'] != 1) {
  	  	  	 	if (!empty($callback)) {
  	  	  	 		exit($callback."(".json_encode(array('result'=>false,'tip_type'=>'noactivate_mobile','msg'=>$user['email'])) .")");
  	  	  	 	}else {
  	  	  	 		exit(json_encode(array('result'=>false,'tip_type'=>'noactivate_mobile','msg'=>'')));
  	  	  	 	}
  	  	  	 }
  	  	  	 $this->save_login_state($user['uid'],$user['username'],$remember);
  	  	  	 $this->save_login_passport($passport);
  	  	  	 //更新登录时间及IP
  	  	  	 $this->member->update_users(array('lastloginip'=>get_client_ip(),'lastlogintime'=>time()),array('uid'=>$user['uid']));
  	  	  	 //添加登录日志
  	  	  	 $this->member->add_login_log(array('uid'=>$user['uid'],'ip'=>get_client_ip(),'fromurl'=>$this->input->post('referer',true),'logintime'=>time()));
  	  	  	 if(!empty($callback)) {
  	  	  	 	exit($callback."(".json_encode(array('result'=>true,'tip_type'=>'login','msg'=>$this->lang->line('login_success'))) .")");
  	  	  	 }else {
  	  	  	 	exit(json_encode(array('result'=>true,'tip_type'=>'login','msg'=>$this->lang->line('login_success'))));
  	  	  	 }
  	  	  }
  	  //}else {
		  /*
  	  	  $this->data['passport'] = $passport;
  	  	  $this->data['referer'] = $refer;
  	  	  $this->data['seo']['title'] = '登录-赛酷网';
  	  	  $this->data['seo']['keywords'] = '';
  	  	  $this->data['seo']['description'] = '';
  	  	  $this->data['pf_js'][] = '/assets/js/email.js';
  	  	  $this->data['ph_css'][] = '/assets/css/email-suggest.css';
  	  	  $this->load->view('space/login.php',$this->data);
		  */
  	  //}
  }
  
  /**
   * 找回密码
   */
  public function lostpwd(){
	  if (!empty($this->uid)) {
	  		redirect('/users');exit;
  		    exit;
	  }
  	  if (isset($_POST['lostpwdsubmit'])) {
  	  	 $email = $this->input->post('email',true);
  	  	 $capcode = $this->input->post('capcode',true);
  	  	 $email == $this->lang->line('default_email') && exit(json_encode(array('result'=>false,'tip_type'=>'email','msg'=>$this->lang->line('email_empty'))));
  	  	 $this->check_input_empty(array('email'=>$email,'capcode'=>$capcode));
  	  	 $user = $this->member->get_user(array('uid','username','email'),array('email'=>$email));
  	  	 if (empty($user)) {
  	  	 	exit(json_encode(array('result'=>false,'tip_type'=>'email','msg'=>$this->lang->line('email_dismatch'))));
  	  	 }else {
  	  	 	if (strtolower($capcode) != $_SESSION['capcode_lostpwd']) {
  	  	 		exit(json_encode(array('result' => false,'tip_type'=> 'capcode','msg' => $this->lang->line('capcode_error'))));
  	  	 	}else {
  	  	 		$id = random(6);
  	  	 		$authstr = $id.'|1|'.time();
  	  	 		$year = $this->lang->line('year');
  	  	 		$month = $this->lang->line('month');
  	  	 		$day = $this->lang->line('day');
  	  	 		$h = $this->lang->line('hour');
  	  	 		$m = $this->lang->line('minute');
  	  	 		$params = array('username' => $user['username'],
  	  	 				        'email' => $user['email'],
  	  	 				        'datetime' => @date('Y'.$year.'m'.$month.'d'.$day.' '.'H'.$h.'i'.$m),
  	  	 				        'url' => $this->config->item('i_url')."/space/member/getpassword?uid=$user[uid]&id=$id"
  	  	 				);
  	  	 		$this->sendemail($params,'email_subject_lostpwd','email_body_lostpwd');
  	  	 		$this->member->update_users(array('authstr' => $authstr),array('uid' => $user['uid']));
  	  	 		exit(json_encode(array('result'=>true,'tip_type'=>'lostpwd','msg'=>$this->lang->line('lostpwd_email'))));
  	  	 	}
  	  	 }
  	  }else {
  	  	 $this->data['app'] = 'lostpwd';
  	  	 $this->data['seo']['title'] = '找回密码-赛酷网';
  	  	 $this->data['seo']['keywords'] = '';
  	  	 $this->data['seo']['description'] = '';
  	  	 $this->load->view('space/forget_pwd.php', $this->data);
  	  }
  }
  
  /**
   * 手机找回密码
   */
  public function mlostpwd(){
  	if (!empty($this->uid)) {
  		redirect('/users');exit;
  		exit;
  	}
  	if (isset($_POST['mlostpwdsubmit'])) {
  		$mobile = $this->input->post('mobile',true);
  		$sms = $this->input->post('sms',true);
  		$this->check_forget_mobile_validate($mobile);
  		$this->check_input_empty(array('sms'=>$sms));
  		$user = $this->member->get_user(array('uid','username','mobile'),array('mobile'=>$mobile));
  		if (empty($user)) {
  			exit(json_encode(array('result'=>false,'tip_type'=>'mobile','msg'=>$this->lang->line('mobile_dismatch'))));
  		}else {
  			if (!$this->check_sms_validate($mobile, $sms, 'mlostpwd')) {
  				exit(json_encode(array('result'=>false,'tip_type'=>'sms','msg'=>$this->lang->line('sms_error'))));
  			}else {
  				$_SESSION['mlostpwd_mobile'] = $mobile;
  				$_SESSION['mlostpwd_sms'] = $sms;
  				exit(json_encode(array('result'=>true,'tip_type'=>'lostpwd','msg'=>'')));
  			}
  		}
  	}else {
  		$this->data['app'] = 'mlostpwd';
  		$this->data['seo']['title'] = '找回密码-赛酷网';
  		$this->data['seo']['keywords'] = '';
  		$this->data['seo']['description'] = '';
  		$this->load->view('space/forget_pwd_mobile.php', $this->data);
  	}
  }
  
  /**
   * 重置密码
   */
  public function getpassword(){
  	  if (!empty($this->uid)) {
  		redirect('/users');exit;
  		exit;
  	  }
  	  if (isset($_POST['getpwdsubmit'])) {
  	  	 $password = $this->input->post('password',true);
  	  	 $confirmpwd = $this->input->post('confirmpwd',true);
  	  	 $this->check_input_empty(array('password'=>$password,'confirmpwd'=>$confirmpwd));
  	  	 strlen($password)<6 && exit(json_encode(array('result' => false,'tip_type'=> 'password','msg' => $this->lang->line('passpord_short'))));
  	  	 if ($password != $confirmpwd) {
  	  	 	$response = array('result' => false,'tip_type'=> 'confirmpwd','msg' => $this->lang->line('password_error'));
  	  	 	exit(json_encode($response));
  	  	 }else {
  	  	 	$uid = $this->input->post('uid',true);
  	  	 	$user = $this->member->get_user(array('salt'),array('uid'=>$uid));
  	  	 	if (!empty($user)) {
  	  	 		$newpassword = md5(md5($password).$user['salt']);
  	  	 		$result = $this->member->update_users(array('password'=>$newpassword),array('uid'=>$uid));
  	  	 		if ($result) {
  	  	 			$this->member->update_users(array('authstr'=>''),array('uid'=>$uid));
  	  	 			if (isset($_SESSION['mlostpwd_mobile']) && isset($_SESSION['mlostpwd_sms'])) {//来自手机重置密码
  	  	 				$this->member->del_sms_log($_SESSION['mlostpwd_mobile'],'mlostpwd');
  	  	 				unset($_SESSION['mlostpwd'],$_SESSION['mlostpwd_sms']);
  	  	 			}
  	  	 			exit(json_encode(array('result'=>true,'tip_type'=>'getpwd','msg'=>$this->lang->line('getpwd_success'))));
  	  	 		}else {
  	  	 			exit(json_encode(array('result'=>false,'tip_type'=>'getpwd','msg'=>$this->lang->line('getpwd_failed'))));
  	  	 		}
  	  	 	}else {
  	  	 		exit(json_encode(array('result'=>false,'tip_type'=>'getpwd','msg'=>$this->lang->line('getpwd_failed'))));
  	  	 	}
  	  	 	
  	  	 }
  	  }else {
  	  	$uid = $this->input->get('uid',true);
  	  	$id = $this->input->get('id',true);
  	  	if (empty($uid) || empty($id)) {
  	  		$this->data['msg'] = $this->lang->line('lostpwd_url_error');
  	  		$this->load->view('space/lostpwd_url_error.php',$this->data);
  	  	}else {
  	  		$user = $this->member->get_user(array('uid','authstr'),array('uid'=>$uid));
  	  		header("Content-Type: text/html; charset=utf-8");
  	  		if (empty($user) || empty($user['authstr'])) {
  	  			$this->data['msg'] = $this->lang->line('lostpwd_url_error');
  	  		    $this->load->view('space/lostpwd_url_error.php',$this->data);
  	  		}else {
  	  			list($authstr,$operation,$timestamp) = explode('|',$user['authstr']);
  	  			if (($id == $authstr) && ($operation == 1) && (time()-$timestamp<=30*24*3600)) {
  	  				$this->data['p_js'][] = '/templates/js/password.js';
  	  				$this->data['seo']['title'] = '重置密码-赛酷网';
  	  				$this->data['seo']['keywords'] = '';
  	  				$this->data['seo']['description'] = '';
  	  				$this->load->view('space/get_new_pwd.php', $this->data);
  	  			}else {
  	  				$this->data['msg'] = $this->lang->line('lostpwd_url_error');
  	  		        $this->load->view('space/lostpwd_url_error.php',$this->data);
  	  			}
  	  		}
  	  	}
  	  }
  }
  
  /**
   * 手机重置密码
   */
  public function mgetpassword(){
  	if (!isset($_SESSION['mlostpwd_mobile']) || !isset($_SESSION['mlostpwd_sms'])) {
  		$this->data['msg'] = $this->lang->line('sms_error');
  		$this->load->view('space/lostpwd_url_error.php',$this->data);
  	}else {
  		$mobile = $_SESSION['mlostpwd_mobile'];
  		$sms = $_SESSION['mlostpwd_sms'];
  		if (!$this->check_sms_validate($mobile, $sms, 'mlostpwd')) {
  			$this->data['msg'] = $this->lang->line('sms_error');
  			$this->load->view('space/lostpwd_url_error.php',$this->data);
  		}else {
  			$user = $this->member->get_user(array('uid'),array('mobile'=>$mobile));
  			if (empty($user)) {
  				redirect($this->config->item('i_url').'/space/member/mlostpwd');
  			}else {
  				$this->data['uid'] = $user['uid'];
  				$this->data['p_js'][] = '/templates/js/password.js';
  				$this->data['seo']['title'] = '手机重置密码-赛酷网';
  				$this->data['seo']['keywords'] = '';
  				$this->data['seo']['description'] = '';
  				$this->load->view('space/get_new_pwd.php', $this->data);
  			}
  		}
  	}
  }
  
  /**
   * 退出
   */
  public function logout(){
	  	$hash_cookie = array('name' => 'hash',
	  			'value' => '',
	  			'expire' => -365*24*3600,
	  			'domain' => $this->config->item('cookie_domain')
	  	);
	  	$uid_cookie = array('name' => 'cl_uid',
	  			'value' => '',
	  			'expire' => -365*24*3600,
	  			'domain' => $this->config->item('cookie_domain')
	  	);
	  	$nick_cookie = array('name' => 'cl_username',
	  			'value' => '',
	  			'expire' => -365*24*3600,
	  			'domain' => $this->config->item('cookie_domain')
	  	);
	  	$vir_cookie = array('name' => 'vir',
	  			'value' => '',
	  			'expire' => -365*24*3600,
	  			'domain' => $this->config->item('cookie_domain')
	  	);
		$js_cookie = array('name' => 'coollive_user',
				'value' => '',
				'expire' => -365*24*3600,
				'domain' => $this->config->item('cookie_domain')
		);
		
	  	$this->input->set_cookie($hash_cookie);
	  	$this->input->set_cookie($vir_cookie);
	  	$this->input->set_cookie($uid_cookie);
	  	$this->input->set_cookie($nick_cookie);
		$this->input->set_cookie($js_cookie);
	  	$backurl = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : $this->config->item('i_url'); 
	  	header("Content-Type: text/html; charset=utf-8");
	  	echo '正在跳转...';
	  	echo "<script>setTimeout(function(){window.location.href='$backurl';},2000)</scr"."ipt>";
	  	//@header("Location:$backurl");
  }
  
  
  /**
   * 检查邮箱
   */
  public function checkemail($pemail = '',$ptype = ''){
	  	$email = !empty($pemail) ? $pemail : $this->input->post('email',true);
	  	$type = !empty($ptype) ? $ptype : $this->input->post('type',true);
	  	if (empty($email) || $email == $this->lang->line('default_email')) {
	  		$response = array('result' => false, 'tip_type'=> 'email','msg' => $this->lang->line('email_empty'));
	  		exit(json_encode($response));
	  	}else {
	  		$legal = check_emailformat($email);
	  		$user = $this->member->get_user(array('email'),array('email'=>$email));
	  		if ($type == 'lostpwd') {
	  			if (!$legal) {
	  				$this->check_input(-3);
	  			}else {
	  				if (empty($user)) {
	  					$this->check_input(-5);
	  				}
	  				$response = array('result' => true, 'tip_type'=> 'email','msg' => '');
		  			exit(json_encode($response));
	  			}
	  		}else {
	  			if ($legal && empty($user)) {
	  				if (!empty($pemail)) {
	  					return;
	  				}else {
	  					$response = array('result' => true, 'tip_type'=> 'email','msg' => '');
	  					exit(json_encode($response));
	  				}
	  			}else {
	  				$status = !$legal ? -3 : -4;
	  				$this->check_input($status);
	  			}
	  		}
	  	}
  }
  
  /**
   * 检查用户名(字母、数字和下划线，第一个字符不能为数字)
   */
  public function checkusername($pusername = ''){
  	$username = !empty($pusername) ? $pusername : $this->input->post('username',true);
  	if (empty($username)) {
  		$response = array('result' => false, 'tip_type'=> 'username','msg' => $this->lang->line('username_empty'));
  		exit(json_encode($response));
  	}else {
  		$legal = check_username_len($username) && check_username_format($username);
  		//$this->load->model('filter_model','filter_m');
  		//$word = $this->filter_m->scan($username);
  		//if (!$word['res'] && $word['msg'] != $this->lang->line('word_exception')) {
  		//	$this->check_input(-6);
  		//}
  		$user = $this->member->get_user(array('username'),array('username'=>$username));
  		if ($legal && empty($user)) {
  			if (!empty($pusername)) {
  				return;
  			}else {
  				$response = array('result' => true, 'tip_type'=> 'username','msg' => '');
  				exit(json_encode($response));
  			}
  		}else {
  			$status = !$legal ? -1 : -2;
  			if (!check_username_len($username)) {
  				$status = -7;
  			}elseif (!check_username_format($username)){
  				$status = -1;
  			}else {
  				$status = -2;
  			}
  			$this->check_input($status);
  		}
  	}
  }
  
  
  /**
   * 检查验证码
   */
  public function checkcapcode(){
  	$capcode = $this->input->post('capcode',true);
  	$ctype = $this->input->post('ctype',true);
  	if (empty($capcode)) {
  		$response = array('result' => false, 'tip_type'=> 'capcode','msg' => $this->lang->line('capcode_empty'));
  		exit(json_encode($response));
  	}else {
        if ($capcode != $_SESSION['capcode_'.$ctype]) {
        	$response = array('result' => false,'tip_type'=> 'capcode','msg' => $this->lang->line('capcode_error'));
        	exit(json_encode($response));
        }else {
        	$response = array('result' => true,'tip_type'=> 'capcode','msg' => '');
        	exit(json_encode($response));
        }
  	}
  }

  
  /**
   * 检查输入是否正确
   * @param $status
   * @return json字符串
   */
  public function check_input($status){
  	switch ($status) {
  		case -1:
  			$response = array('result' => false,'tip_type'=> 'username','msg' => $this->lang->line('username_format_error'));//昵称格式不对
  			exit(json_encode($response));
  			break;
  		case -2:
  			$response = array('result' => false, 'tip_type'=> 'username','msg' => $this->lang->line('username_exists'));//昵称已存在
  			exit(json_encode($response));
  			break;
  		case -7:
  			$response = array('result' => false, 'tip_type'=> 'username','msg' => $this->lang->line('username_len_error'));//昵称长度有误
  			exit(json_encode($response));
  			break;
  		case -6:
  			$response = array('result' => false,'tip_type'=> 'username','msg' => $this->lang->line('username_illeagal'));//昵称非法
  			exit(json_encode($response));
  			break;
  		case -3:
  			$response = array('result' => false,'tip_type'=> 'email', 'msg' => $this->lang->line('email_format_error'));//邮箱格式不对
  			exit(json_encode($response));
  			break;
  		case -4:
  			$response = array('result' => false, 'tip_type'=> 'email','msg' => $this->lang->line('email_exists'));//邮箱已存在
  			exit(json_encode($response));
  			break;
  		case -5:
  			$response = array('result' => false, 'tip_type'=> 'email','msg' => $this->lang->line('email_dismatch'));//邮箱没有被注册过
  			exit(json_encode($response));
  			break;
  		default:
  			break;
  	}
  }
  
  /**
   * 邮件发送
   * @param array $params
   * @param string $subject_name
   * @param string $body_name
   * @return null
   */
  public function sendemail($params,$subject_name,$body_name){
  	$email = $params['email'];
  	unset($params['email']);
  	$body = parse_template($this->lang->line($body_name),$params);
  	$result = send_mail($email, $this->lang->line($subject_name), $body);
  	return $result;
  }
  
  /**
   * 重发邮件(注册)
   */
  public function emailagain(){
  	$params['username'] = $this->input->post('username',true);
  	$email = $this->input->post('email',true);
  	if (!empty($email)) {
  		$user = $this->member->get_user(array('uid'),array('email'=>$email));
  		if (!empty($user)) {
  			$id = random(6);
  			$authstr = $id.'|2|'.time();
  			$params['url'] = "http://www.coollive.com.cn/member/activate?uid=$user[uid]&id=$id";
  			$body = parse_template($this->lang->line('email_body'),$params);
  			$result = send_mail($email, $this->lang->line('email_subject'), $body);
  			$this->member->update_users(array('authstr' => $authstr),array('uid' => $user['uid']));
  			$msg = $this->lang->line('emailagain_sucess');
  		}else {
  			$msg = $this->lang->line('emailagain_failed');
  		}
  	}else {
  		$msg = $this->lang->line('emailagain_failed');
  	}
  	exit(json_encode(array('msg'=>$msg)));
  }
  
  /**
   * 重发邮件(登录)
   */
  public function emailagain_login(){
  	$passport = $this->input->post('passport',true);
  	if (!empty($passport)) {
  		$loginfield = strpos($passport, '@') !==false ? array('email'=>$passport) : array('username'=>$passport);
  		$user = $this->member->get_user(array('uid','username','email'),$loginfield);
  		if (!empty($user)) {
  			$id = random(6);
  			$authstr = $id.'|2|'.time();
  			$params['username'] = $user['username'];
  			$params['url'] = "http://www.coollive.com.cn/member/activate?uid=$user[uid]&id=$id";
  			$body = parse_template($this->lang->line('email_body'),$params);
  			$result = send_mail($user['email'], $this->lang->line('email_subject'), $body);
  			$this->member->update_users(array('authstr' => $authstr),array('uid' => $user['uid']));
  			$msg = $this->lang->line('emailagain_sucess');
  		}else {
  			$msg = $this->lang->line('emailagain_failed');
  		}
  	}else {
  		$msg = $this->lang->line('emailagain_failed');
  	}
  	exit(json_encode(array('msg'=>$msg)));
  }
  
  /**
   * 邮箱激活
   */
  public function activate(){
  	if (!empty($this->uid)) {
  		redirect('/users');
  		exit;
  	}
  	$uid = $this->input->get('uid',true);
  	$id = $this->input->get('id',true);
  	$data = $this->member->get_authstr($uid);
  	if (empty($data['authstr'])) {
  		$this->data['msg'] = $this->lang->line('email_verify_failed');
  		$this->load->view('space/email_activation_failed.php',$this->data);
  	}else {
  		list($authstr,$operation,$timestamp) = explode('|',$data['authstr']);
  		if (($authstr == $id) && ($operation == 2) && (time()-$timestamp<=24*3600)) {
  			$this->member->update_users(array('emailstatus'=>1,'authstr'=>''),array('uid'=>$uid));
  			$user = $this->member->get_user(array('username'),array('uid'=>$uid));
  			$this->save_login_state($uid, $user['username']);
			
  			redirect('/users');exit;			
  		}else {
  			$this->data['msg'] = $this->lang->line('email_verify_failed');
  			$this->load->view('space/email_activation_failed.php',$this->data);
  		}
  	}
  }
  
  /**
   * 验证码生成
   */
  public function getcapcode($type = 'reg'){
  	$checkcode = make_rand(4);
  	$_SESSION['capcode_'.$type]=strtolower($checkcode);
  	getAuthImage($checkcode);
  }
  
  /**
   * 字符颜色选择 验证码
   */
  public function getnumcapcode($type = 'votecode'){
  	getnumcapcode( 170,25,16,10,4,5,rand(1,4),$type);
  }
  
  /**
   * 注册手机号验证
   * @param string $pmobile
   */
  public function check_mobile_validate($pmobile = ''){
  	$mobile = !empty($pmobile) ? $pmobile : $this->input->post('mobile',true);
  	if (empty($mobile)) {
  		$response = array('result' => false, 'tip_type'=> 'mobile','msg' => $this->lang->line('mobile_empty'));
  		exit(json_encode($response));
  	}else {
  		if (!checkmobile($mobile)) {
  			$response = array('result' => false, 'tip_type'=> 'mobile','msg' => $this->lang->line('mobile_error'));
  			exit(json_encode($response));
  		}else {
  			$user = $this->member->get_user(array('mobile'),array('mobile'=>$mobile));
  			if (!empty($user)) {
  				$response = array('result' => false, 'tip_type'=> 'mobile','msg' => $this->lang->line('mobile_exists'));
  				exit(json_encode($response));
  			}else {
  				if (!empty($pmobile)) {
  					return;
  				}else {
  					$response = array('result' => true, 'tip_type'=> 'mobile','msg' => '');
  					exit(json_encode($response));
  				}
  			}
  		}
  	}
  }
  
  /**
   * 找回密码手机号验证
   * @param string $pmobile
   */
  public function check_forget_mobile_validate($pmobile = ''){
  	$mobile = !empty($pmobile) ? $pmobile : $this->input->post('mobile',true);
  	if (empty($mobile)) {
  		$response = array('result' => false, 'tip_type'=> 'mobile','msg' => $this->lang->line('mobile_empty'));
  		exit(json_encode($response));
  	}else {
  		if (!checkmobile($mobile)) {
  			$response = array('result' => false, 'tip_type'=> 'mobile','msg' => $this->lang->line('mobile_error'));
  			exit(json_encode($response));
  		}else {
  			$user = $this->member->get_user(array('mobile','mobilestatus'),array('mobile'=>$mobile));
  			if (empty($user)) {
  				$response = array('result' => false, 'tip_type'=> 'mobile','msg' => $this->lang->line('mobile_dismatch'));
  				exit(json_encode($response));
  			}else {
  				!$user['mobilestatus'] && exit(json_encode(array('result' => false, 'tip_type'=> 'mobile','msg' => $this->lang->line('mobile_noactivate'))));
  				if (!empty($pmobile)) {
  					return;
  				}else {
  					$response = array('result' => true, 'tip_type'=> 'mobile','msg' => '');
  					exit(json_encode($response));
  				}
  			}
  		}
  	}
  }
  
  
  /**
   * 发送短信验证码
   */
  public function send_signup_sms(){
  	 $mobile = $this->input->post('mobile',true);
  	 $source = $this->input->post('source',true);
  	 if ($this->input->is_ajax_request()) {
  	 	$this->sendsms($mobile,$source);
  	 }else {
  	 	exit(json_encode(array('result'=>false,'tip_type'=>'sms','msg'=>$this->lang->line('sms_send_failed'))));
  	 }
  	 
  }
  
  /**
   * 保存账号
   * @param string $passport
   */
  private function save_login_passport($passport){
	  	$passport = array('name' => 'cl_passport',
	  			'value' => urlencode($passport),
	  			'expire' => 365*24*3600,
	  			'domain' => $this->config->item('cookie_domain')
	  	);
	  	$this->input->set_cookie($passport);
  }
}
?>