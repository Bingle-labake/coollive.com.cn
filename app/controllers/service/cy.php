<?php

/**
 * 畅言
 * @author lin.zhang
 *
 */
class Cy extends Api_Controller { 

	
	function __construct()
	{
		parent::__construct();	
		$this->load->model('space/member_db', 'member_m');
		$this->load->helper('function');
		$this->load->helper('common');
	}
	
	/**
	 * 获取用户信息
	 */
	public function get_user_info(){
		$callback = $this->input->get('callback');
		if (!is_login()) {
			exit($callback."(".json_encode(array('is_login'=>0)).")");
		}else {
			$data = current_user();
			$info['user_id'] = $data['uid'];
			$info['nickname'] = $data['username'];
			$info['img_url'] = $this->config->item('img3_url').avatar($data['uid']);
			$info['profile_url'] = $this->config->item('q_url').build_uri('u', array('id'=>$data['uid']));
			$str = 'img_url='.$info['img_url'].'&nickname='.$info['nickname'].'&profile_url='.$info['profile_url'].'&user_id='.$info['user_id'];
			$info['user']['sign'] = $this->get_signature($str, '4f7b47c758a7e071f0225035c44cd5a4');
			exit($callback."(".json_encode(array('is_login'=>1,'user'=>$info)).")");
		}
	}
	
	/**
	 * 登录
	 */
	public function login(){
		$cy_user_id = intval($this->input->get('cy_user_id'));
		$user_id = intval($this->input->get('user_id'));
		$nickname = $this->input->get('nickname');
		$img_url = $this->input->get('img_url');
		$profile_url = $this->input->get('profile_url');
		$sign = $this->input->get('sign');
		$callback = $this->input->get('callback');
		$str = 'cy_user_id='.$cy_user_id.'&img_url='.$img_url.'&nickname='.$nickname.'&profile_url='.$profile_url.'&user_id='.$user_id;
		$mysign = $this->get_signature($str, '4f7b47c758a7e071f0225035c44cd5a4');
		if ($sign != $mysign) {
			exit($callback."(".json_encode(array('user_id'=>0,'reload_page'=>0,'js_src'=>'')).")");
		}else {
			if ($user_id) {
				$user = $this->member_m->get_user(array('uid'),array('uid'=>$user_id));//存在绑定关系(即咱们网站的用户)
				Space_Controller::save_login_state($user_id,$nickname,1);
				exit($callback."(".json_encode(array('user_id'=>$user_id,'reload_page'=>1,'js_src'=>'')).")");
			}else {
				exit($callback."(".json_encode(array('user_id'=>0,'reload_page'=>0,'js_src'=>'')).")");
			}
		}
	}
	
	/**
	 * 登出
	 */
	public function logout(){
		$callback = $this->input->get('callback');
		$this->sk_logout();
		exit($callback."(".json_encode(array('code'=>1,'reload_page'=>1,'js_src'=>'')).")");
	}
	
	
	/**
	 * 赛酷退出
	 */
	public function sk_logout(){
		$hash_cookie = array('name' => 'hash',
				'value' => '',
				'expire' => -365*24*3600,
				'domain' => $this->config->item('cookie_domain')
		);
		$uid_cookie = array('name' => 'sk_uid',
				'value' => '',
				'expire' => -365*24*3600,
				'domain' => $this->config->item('cookie_domain')
		);
		$nick_cookie = array('name' => 'sk_username',
				'value' => '',
				'expire' => -365*24*3600,
				'domain' => $this->config->item('cookie_domain')
		);
		$vir_cookie = array('name' => 'vir',
				'value' => '',
				'expire' => -365*24*3600,
				'domain' => $this->config->item('cookie_domain')
		);
		$this->input->set_cookie($hash_cookie);
		$this->input->set_cookie($vir_cookie);
		$this->input->set_cookie($uid_cookie);
		$this->input->set_cookie($nick_cookie);
	}
	
	private function get_signature($str, $key)
	{
		$signature = "";
		if (function_exists('hash_hmac'))
		{
			$signature = base64_encode(hash_hmac("sha1", $str, $key, true));
		}
		else
		{
			$blocksize	= 64;
			$hashfunc	= 'sha1';
			if (strlen($key) > $blocksize)
			{
				$key = pack('H*', $hashfunc($key));
			}
			$key	= str_pad($key,$blocksize,chr(0x00));
			$ipad	= str_repeat(chr(0x36),$blocksize);
			$opad	= str_repeat(chr(0x5c),$blocksize);
			$hmac 	= pack(
					'H*',$hashfunc(
							($key^$opad).pack(
									'H*',$hashfunc(
											($key^$ipad).$str
									)
							)
					)
			);
			$signature = base64_encode($hmac);
		}
	
		return $signature;
	}
	
}

?>