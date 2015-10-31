<?php
class OAuth2_Provider_Douban extends OAuth2_Provider {

	public $name	= 'douban';
	public $human	= 'douban';
	public $method	= 'POST';
	public $uid_key	= 'uid';
	
	/**
     * 授权认证登录地址
     */
	public function url_authorize() {
		return 'https://www.douban.com/service/auth2/auth';
	}
	
	/**
     * 授权认证访问地址
     */
	public function url_access_token() {
		return 'https://www.douban.com/service/auth2/token';
	}

	/**
     * 获取用户信息
     */
	public function get_user_info(OAuth2_Token_Access $token) {
		$url='https://api.douban.com/v2/user/~me';
		$header = array(
				'Authorization: Bearer '.$token->access_token,
		);
		$ch = curl_init();
		curl_setopt ($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
		curl_setopt($ch, CURLINFO_HEADER_OUT, TRUE );
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
		curl_setopt($ch, CURLOPT_BINARYTRANSFER,true);
		$return = curl_exec($ch);
		$user	= json_decode($return,true);
      	if (array_key_exists('error', $user)) throw new OAuth2_Exception($return);
		// 返回统一的数据格式
		return array(
			'oid'			=> $user['uid'],
            'oauth'			=> $this->name,
			'avatar'		=> $user['avatar'],
			'nickname'		=> $user['name'],
			'gender'        => '0',
			'location'      => $user['loc_name'],
			'expire_at'		=> $token->expires,
			'access_token'	=> $token->access_token,
			'refresh_token'	=> !empty($token->refresh_token) ? $token->refresh_token : ''
		);
	}
}