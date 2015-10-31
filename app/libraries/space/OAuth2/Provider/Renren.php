<?php
class OAuth2_Provider_Renren extends OAuth2_Provider {

	public $name	= 'renren';
	public $human	= '人人网';
	public $method	= 'POST';
	public $uid_key	= 'uid';
	
	/**
     * 授权认证登录地址
     */
	public function url_authorize() {
		return 'https://graph.renren.com/oauth/authorize';
	}
	
	/**
     * 授权认证访问地址
     */
	public function url_access_token() {
		return 'https://graph.renren.com/oauth/token';
	}

	/**
     * 获取用户信息
     */
	public function get_user_info(OAuth2_Token_Access $token) {
		$uidarr = explode('-', $token->access_token);
		$url	= 'https://api.renren.com/v2/user/get?'.http_build_query(array('access_token' => $token->access_token, 'userId' => $uidarr[1]));
		$response	= file_get_contents($url);
		$user	= json_decode($response,true);
		if (!empty($user['response']['basicInformation']['homeTown'])) {
			$province = $user['response']['basicInformation']['homeTown']['province'];
			$city = $user['response']['basicInformation']['homeTown']['city'];
			$location = $province.','.$city;
		}else {
			$location = '';
		}
		if ($user['response']['basicInformation']['sex'] == 'FEMALE') {
			$gender = '2';
		}else {
			$gender = '1';
		}
		if (array_key_exists('error', $user)) throw new OAuth2_Exception($response);
		// 返回统一的数据格式
		return array(
				'oid'			=> $user['response']['id'],
				'oauth'			=> $this->name,
				'avatar'		=> $user['response']['avatar'][1]['url'],
				'nickname'		=> $user['response']['name'],
				'gender'        => $gender,
				'location'      => $location,
				'expire_at'		=> $token->expires,
				'access_token'	=> $token->access_token,
				'refresh_token'	=> !empty($token->refresh_token) ? $token->refresh_token : ''
		);
	}
	
}