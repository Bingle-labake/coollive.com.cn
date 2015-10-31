<?php
class OAuth2_Provider_Baidu extends OAuth2_Provider {

	public $name	= 'baidu';
	public $human	= 'baidu';
	public $method	= 'POST';
	public $uid_key	= 'uid';
	
	/**
     * 授权认证登录地址
     */
	public function url_authorize() {
		return 'https://openapi.baidu.com/oauth/2.0/authorize';
	}
	
	/**
     * 授权认证访问地址
     */
	public function url_access_token() {
		return 'https://openapi.baidu.com/oauth/2.0/token';
	}

	/**
     * 获取用户信息
     */
	public function get_user_info(OAuth2_Token_Access $token) {
		$url	= 'https://openapi.baidu.com/rest/2.0/passport/users/getInfo?'.http_build_query(array('access_token' => $token->access_token));
		$return	= file_get_contents($url);
		$user	= json_decode($return,true);
		if (isset($user['sex'])) {
			$gender = $user['sex'] == '1' ? '1' : '2';
		}else {
			$gender = '0';
		}
	
      	if (array_key_exists('error', $user)) throw new OAuth2_Exception($return);
		// 返回统一的数据格式
		return array(
			'oid'			=> $user['userid'],
            'oauth'			=> $this->name,
			'avatar'		=> $user['portrait'],
			'nickname'		=> $user['username'],
			'gender'        => $gender,
			'location'      => '',
			'expire_at'		=> $token->expires,
			'access_token'	=> $token->access_token,
			'refresh_token'	=> !empty($token->refresh_token) ? $token->refresh_token : ''
		);
	}
}