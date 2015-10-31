<?php
class OAuth2_Provider_Qq extends OAuth2_Provider {

	public $name	= 'qq';
	public $human	= 'QQ';
	public $method	= 'POST';
	public $uid_key = 'openid';
	
	/**
     * 授权认证登录地址
     */
	public function url_authorize() {
		return 'https://graph.qq.com/oauth2.0/authorize';
	}
	
	/**
     * 授权认证访问地址
     */
	public function url_access_token() {
		return 'https://graph.qq.com/oauth2.0/token';
	}
	
	/**
     * 获取用户信息
     */
	public function get_user_info(OAuth2_Token_Access $token) {
		$url			= 'https://graph.qq.com/oauth2.0/me?'.http_build_query(array('access_token' => $token->access_token));
		$response		= file_get_contents($url);            
        if (strpos($response, 'callback') !== false) {
            $lpos		= strpos($response, '(');
            $rpos		= strrpos($response, ')');
            $response	= substr($response, $lpos + 1, $rpos - $lpos -1);
        }
        $me = json_decode($response);
        if (isset($me->error)) throw new OAuth2_Exception($response);
        $url = 'https://graph.qq.com/user/get_user_info?'.http_build_query(array('access_token' => $token->access_token, 'openid' => $me->openid, 'oauth_consumer_key' => $this->client_id));
        $response		= file_get_contents($url);
		$user			= json_decode($response);
		if ($user->gender == '男') {
			$gender = '1';
		}else {
			$gender = '2';
		}
	    if (isset($user->ret) && $user->ret != 0) throw new OAuth2_Exception($response);
		return array(
			'oid'			=> $me->openid,
            'oauth'			=> $this->name,
			'avatar'		=> $user->figureurl_1,
			'nickname'		=> $user->nickname,
			'gender'        => $gender,
			'location'      => '',
			'expire_at'		=> $token->expires,
			'access_token'	=> $token->access_token,
			'refresh_token' => !empty($token->refresh_token) ? $token->refresh_token : ''
		);
	}
}