<?php
class OAuth2_Provider_Taobao extends OAuth2_Provider {

	public $name	= 'taobao';
	public $human	= '淘宝';
	public $method	= 'POST';
	public $uid_key	= 'taobao_user_id';
 
	public function url_authorize() {
		return 'https://oauth.taobao.com/authorize';
	}

	public function url_access_token() {
		return 'https://oauth.taobao.com/token';
	}

	public function get_user_info(OAuth2_Token_Access $token) {
		$url = 'https://eco.taobao.com/router/rest?'.http_build_query(array(
			            'access_token' => $token->access_token,
                        'method' => 'taobao.user.buyer.get',
			            'v' => '2.0',
                        'format' => 'json',
                        'fields' => 'user_id,nick,sex,avatar'
		));
		$return	= file_get_contents($url);
		$user	= json_decode($return,true);
		if (array_key_exists('error', $user)) throw new OAuth2_Exception($return);
		// 返回统一的数据格式
		return array(
			'oid'			=> $user['user_buyer_get_response']['user']['user_id'],
            'oauth'			=> $this->name,
			'avatar'		=> $user['user_buyer_get_response']['user']['avatar'],
			'nickname'		=> $user['user_buyer_get_response']['user']['nick'],
			'gender'        => '',
			'location'      => '',
			'expire_at'		=> $token->expires,
			'access_token'	=> $token->access_token,
			'refresh_token'	=> $token->refresh_token
		);
	}
}