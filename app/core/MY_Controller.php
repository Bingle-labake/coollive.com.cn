<?php
date_default_timezone_set(TIME_ZONE);

class Api_Controller extends CI_Controller {
	protected $ret = array();
	protected $app = array();
	protected $timeout = 10;
	protected $user = array();
	protected $uid      = 0;
	protected $username = "";
	protected $check_api = true; 	//是否检查接口的安全性
	protected $field = array();

	function __construct(){
		parent::__construct();
		$this->load->helper('function_helper');
		$this->app = $this->config->item("app");
		$this->auth();

		//进行接口安全校验
		if($this->check_api)
			$this->chek_auth();
	}
	
	protected function echo_api($code = 1, $res = '') {
		$callback = $this->input->get_post('callback', true);//回调函数
		$rt       = $this->input->get_post('rt', true);  //返回类型,支持json/xml
		
		if(!in_array($rt, array('json', 'xml'))) {
			$rt = 'json';
		}
		$code = intval($code);
		if($code > 0) {
			$ret['result'] = true;	
			$ret['data'] = $res;
		}else {
			$ret['result'] = false;
			$ret['error'] = $res;
		}
		$ret['code'] = $code;		
		
		switch($rt) {
			case 'xml':
				$this->load->library('xmlparse');
				echo XML_serialize($ret);
				break;
			case 'json':
			default:
				    $data = json_encode($ret);
				    if(!empty($callback)) {
					    echo $callback."(".$data.")";
				    }else {
					    echo $data;
				    }	
		};
		exit;		
	}
	
	
	/**
	 * 接口效验
	 * @param string $time        //效验请求时间
	 * @param string $checkcode   //效验码(MD5加密)
	 * @param string $apiid       //应用ID(默认api)
	 * 
	 * 效验方式MD5($time.$appkey) == $checkcode
	 * 
	 * return boolean
	 */
	public function checkAPI(){
		/*
		$check_time = intval($this->input->get_post("time"));
		$checkcode  = $this->input->get_post("checkcode");
		$apiid      = $this->input->get_post("apiid");
		if(!empty($apiid)) {
			$apiid = "api";
		}
		if((time()-$check_time) <= $this->timeout) {
			if(isset($this->app[$apiid]) && !empty($this->app[$apiid])) {					
				$key = $this->app[$apiid];
				$check_code = MD5($check_time. $key);
				if(MD5($checkcode) == MD5($check_code)) {
					return true;
				}	
			}
		}
		return false;
		*/
		return true;
	}
	
	/**
	 * 短信验证码验证
	 * @param string $mobile
	 * @param string $sms
	 * @param string $source
	 * @return boolean
	 */
	public function check_sms_validate($mobile,$sms,$source){
		$this->load->model('space/member_db', 'member_m');
		$smslog = $this->member_m->get_sms_log($mobile,$source);
		if (empty($smslog) || $smslog['sms'] != $sms || time()-$smslog['sendtime']>60) {
			return false;
		}else {
			return true;
		}
	}
	
	public function auth() {
		if(empty($this->user)) {
			session_start();
			$this->load->helper('function_helper');
			$this->user = current_user();
		}
		
		if(empty($this->user)) {
			$this->user = array('uid'=>5, 'username'=>"Bingle");
		}

		if(isset($this->user['uid'])) {
			$this->uid      = $this->user['uid'];
			$this->username = $this->user['username'];
		}
	}

	public function chek_auth(){
		//$this->uid = 152957;
		/*
		$appid = $this->input->get_post('appid',true);
		$token = $this->input->get_post('token',true);

		if($appid == false || $token == false){
			$this->echo_api(-31,'请传入appid和token值,进行安全校验');
		}

		$uid = check_auth(array('appid' => $appid, 'token' => $token));
		if($uid === false){
			$this->echo_api(-32,'非法请求');
		}

		$this->uid = $uid;
		*/
	}

	/*
	 * 根据params参数获取返回的字段数组
	 */
	protected function parse(){
		$params = $this->input->get_post('params',true);

		if($params !== false){
			$paramsArr = explode(',',$params);
			$intersect = array_intersect($this->field,$paramsArr);
			$param = empty($intersect)? $this->field:$intersect;
		}else{
			$param = $this->field;
		}
		return $param;
	}
	
	 /**
     * 发送短信验证码
     * @param string $mobile
     * @param string $source
     */
    public function sendsms($mobile,$source){
    	empty($mobile) && $this->echo_api(-11, "手机号码为空.");
    	if (!checkmobile($mobile)) {
            $this->echo_api(-12, "手机号码为空.");
    	}else {
    		$sms_source = array('signup_mobile','mlostpwd','sign','mobilemodify_set','mobilereset_set','mobileunbind_set','mobilebind');
    		if (empty($source) || !in_array($source, $sms_source)) {//来源不对
                $this->echo_api(-13, "手机号码为空.");
    		}
    		$this->load->model('space/member_db', 'member_m');
    		$smslog = $this->member_m->get_sms_log($mobile,$source);
    		$sms_max_count = $source == 'signup_mobile' ? 3 : 10;
    		if (!empty($smslog)) {
    			if ($smslog['count']>=$sms_max_count) {//超过每天该类型下最大的发送次数
                    $this->echo_api(-14, "手机号码为空.");
    			}elseif (time()-$smslog['sendtime']<=60){//60s内只能发送一次
                    $this->echo_api(-15, "手机号码为空.");
    			}else {
    				//发送短信验证码
    				$sms = random(5,1);
    				$content = '('.$sms.')'.'赛酷用户验证码';
    				if (sendSMS(array($mobile),$content)) {
    					if (date('Y-m-d',time()) == date('Y-m-d',$smslog['sendtime'])) {//同一天：更新次数及发送时间
    						$result = $this->member_m->update_sms_log(array('sms'=>$sms,'sendtime'=>time()),array('mobile'=>$mobile,'source'=>$source));
    					}else {//不在同一天，统计次数归零
    						$result = $this->member_m->update_sms_log(array('sms'=>$sms,'sendtime'=>time()),array('mobile'=>$mobile,'source'=>$source),true);
    					}
    					if ($result) {
    						$msg = sprintf($this->lang->line('sms_send_success'),$sms_max_count-$smslog['count']-1);
                            $this->echo_api(1, array('tip_type'=>'sms','msg'=>$msg));
    					}else {
                            $this->echo_api(-16, "手机号码为空.");
    					}
    				}else {
                        $this->echo_api(-17, "手机号码为空.");
    				}
    			}
    		}else {
    			//发送短信验证码
    			$sms = random(5,1);
    			$content = '('.$sms.')'.'赛酷用户验证码';
    			if (sendSMS(array($mobile), $content)) {
    				$result = $this->member_m->add_sms_log(array('mobile'=>$mobile,'sms'=>$sms,'source'=>$source,'count'=>1,'sendtime'=>time()));
    				if ($result) {
    					$msg = sprintf($this->lang->line('sms_send_success'),$sms_max_count-1);
                        $this->echo_api(2, array('tip_type'=>'sms','msg'=>$msg));
    				}else {
                        $this->echo_api(-18, "手机号码为空.");
    				}
    			}else {
                    $this->echo_api(-19, "手机号码为空.");
    			}
    		}
    	}
    }
    
}

class Live_Controller extends CI_Controller {
	protected $data;//模板数据
	protected $uid;
	protected $username;
    protected $space;
	function __construct(){
		parent::__construct();
		$this->data = array();
		$this->space = array();
		$this->temp_dir = '/templates';		
		$this->data['temp_dir'] = $this->temp_dir;
		
		session_start();
		$this->load->helper('function_helper');
		$user = current_user();
		$this->data['user'] = $user;
	    $this->uid = !empty($user) ? $user['uid'] : 0;
	    $this->username = !empty($user) ? $user['username'] : '';
	    
	    $this->init_header();	    
	}	
	
	/**
	 * 保持登录状态
	 * @param int $uid
	 * @param string $username
	 * @param int $remember
	 */
	public function save_login_state($uid,$username,$remember = 0){
		$cookie_time = $remember ? 7*24*3600 : 0;
		$uid_cookie = array('name' => 'cl_uid',
				'value' => $uid,
				'expire' => $cookie_time,
				'domain' => $this->config->item('cookie_domain')
		);
		$nick_cookie = array('name' => 'cl_username',
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
		
		$js_cookie = array('name' => 'coollive_user',
				'value' => md5($uid.$salt.$hash_cookie['value']),
				'expire' => $cookie_time,
				'domain' => $this->config->item('cookie_domain')
		);
		
	
		$this->input->set_cookie($uid_cookie);
		$this->input->set_cookie($nick_cookie);
		$this->input->set_cookie($hash_cookie);
		$this->input->set_cookie($vir_cookie);
		$this->input->set_cookie($js_cookie);
	}
	
	/**
	 * 检查输入项是否为空
	 * @param array $input
	 * @return json字符串
	 */
	public function check_input_empty($input){
		if (!empty($input) && is_array($input)) {
			foreach ($input as $k=>$v){
				if (empty($v)) {
					$response = array('result' => false, 'tip_type'=> $k,'msg' => $this->lang->line($k.'_empty'));
					exit(json_encode($response));
				}
			}
		}
	}
	
	public function init_templates() {

	}
	
	//初始化全局样式
	private function init_header() {
	    $this->data['gh_js'] = array();//全局头部js
	    $this->data['gf_js'] = array();//全局尾部js
	    $this->data['ph_js'] = array();//局部头部js
	    $this->data['pf_js'] = array();//局部尾部js
	    
	    $this->data['gh_css'] = array();//全局头部样式	    
	    $this->data['ph_css'] = array();//局部头部样式
	    
	    $this->data['seo'] = array('title'=>'赛酷网', 'keywords'=>'', 'description'=>'赛酷、视频');
	    
	    $this->data['gh_js'][] = '/assets/js/jquery1.9.js';
	    $this->data['gh_js'][] = '/assets/js/global.js';
	    //$this->data['gf_js'][] = '/assets/js/footer.js';
	    $this->data['gf_js'][] = '/assets/js/sk.js';//消息通知
	    $this->data['gh_css'][] = '/assets/css/base1.1.css';
	    $this->data['gh_css'][] = '/assets/css/login.css';
	    //$this->data['ph_css'][] = '/assets/css/ucenter.css';
	}


    protected function echo_api($code = 1, $res = '') {
        header('Content-type: application/json');
        $callback = $this->input->get_post('callback', true);//回调函数
        $rt       = $this->input->get_post('rt', true);  //返回类型,支持json/xml

        if(!in_array($rt, array('json', 'xml'))) {
            $rt = 'json';
        }
        $code = intval($code);
        if($code > 0) {
            $ret['result'] = true;
            $ret['data'] = $res;
        }else {
            $ret['result'] = false;
            $ret['error'] = $res;
        }
        $ret['code'] = $code;

        switch($rt) {
            case 'xml':
                $this->load->library('xmlparse');
                echo XML_serialize($ret);
                break;
            case 'json':
            default:
                $data = json_encode($ret);
                if(!empty($callback)) {
                    echo $callback."(".$data.")";
                }else {
                    echo $data;
                }
        };
        exit;
    }
}

//服务专用
class S_Controller extends CI_Controller {
	protected $uid;
	protected $username;

	function __construct(){
		parent::__construct();	

		session_start();
		$this->load->helper('function_helper');
		$user = current_user();		
		$this->uid = !empty($user) ? $user['uid'] : 0;
		$this->username = !empty($user) ? $user['username'] : '';
	}
	
	function output($data) {
		$callback = $this->input->get_post('callback');//回调函数名
		$r = intval($this->input->get_post('r'));//返回类型
		
		$res = '';
		switch ($r) {
			case 0:$res = json_encode($data); break;//json
			case 1:break;//xml
			case 2:
			       $res = serialize($data);break;//serialize
			default:$res = json_encode($data); break;//json
		}
		
		if(empty($callback)) {
			echo $res;
		}else {
			echo $callback.'('.$res.')';
		}
		exit;
	}
}

?>
