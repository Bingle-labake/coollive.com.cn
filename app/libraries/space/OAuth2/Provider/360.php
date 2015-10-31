<?php
class OAuth2_Provider_360 extends OAuth2_Provider {

	public $name	= '360';
	public $human	= '360';
	public $method	= 'POST';
	public $uid_key	= 'uid';
	
	/**
     * 授权认证登录地址
     */
	public function url_authorize() {
		return 'https://openapi.360.cn/oauth2/authorize';
	}
	
	/**
     * 授权认证访问地址
     */
	public function url_access_token() {
		return 'https://openapi.360.cn/oauth2/access_token';
	}

	/**
     * 获取用户信息
     */
	public function get_user_info(OAuth2_Token_Access $token) {
		$url	= 'https://openapi.360.cn/user/me?'.http_build_query(array('access_token' => $token->access_token, 'fields' => 'id,name,avatar,sex,area'));
		$return	= file_get_contents($url);
		$user	= json_decode($return,true);
		if (isset($user['sex'])) {
			$gender = $user['sex'] == 'm' ? '1' : ($user['sex'] == 'f' ? '2' : '0');
		}else {
			$gender = '0';
		}
		if (!empty($user['area'])) {
			$arr = explode(' ', $user['area']);
			$user['area'] = $arr[0].','.$arr[1];
		}
      	if (array_key_exists('error', $user)) throw new OAuth2_Exception($return);
		// 返回统一的数据格式
		return array(
			'oid'			=> $user['id'],
            'oauth'			=> $this->name,
			'avatar'		=> $user['avatar'],
			'nickname'		=> $user['name'],
			'gender'        => $gender,
			'location'      => $user['area'],
			'expire_at'		=> $token->expires,
			'access_token'	=> $token->access_token,
			'refresh_token'	=> !empty($token->refresh_token) ? $token->refresh_token : ''
		);
	}
}