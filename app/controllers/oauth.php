<?php
/**************************************************************************
*   Path:   /oauth.php
*   Comments:   第三方控制器
*   Author: Bingle
*   Last Modified:  04.11.2015 / Bingle
**************************************************************************/
class Oauth extends Live_Controller{
	public function __construct () {
		parent::__construct();
		$this->load->model('space/oauth_db','oauth_m');
		$this->load->model('space/member_db','member_m');
	}
	
	/**
	 * 注册
	 */
	public function index(){
		$appid = $this->input->get('site');
		$referer = $this->input->get('referer',true);
		$this->save_oauth_referer($referer);
		if(empty($appid)) {
			$response = array('result' => false, 'msg' => "参数异常");
			echo json_encode($response);
			exit;
		}
		if(in_array($appid, array("sina", "weibo", "qq", "weixin"))) {
			$oauth_cfg = require FCPATH.APPPATH.'/config/oauth.php';
			$config	= $oauth_cfg[$appid];
			if (!$config)
			{
				$response = array('result' => false, 'msg' => "Oauth账号不存在");
				echo json_encode($response);
			}
			$config['url'] .= '?site='.$appid;
			$this->load->library('space/OAuth2');
			$this->oauth2 = new oauth2();
			// OAuth
			$code = $this->input->get('code', TRUE);
			$oauth = $this->oauth2->provider($appid, $config);
			if (!$code) { // 登录授权页
				try {
					$oauth->authorize();
				} catch (OAuth2_Exception $e) {
					echo "Error";
				}
			} else { // 回调返回数据
				$token = $oauth->access($code);
				$user = $oauth->get_user_info($token);				
				/*
				*['oid'=>''],
				*['oauth'=>''],
				['avatar'=>''],
				['nickname'=>''],
				['gender'=>''],
				['location'=>''],
				['expire_at'=>''],
				['access_token'=>''],
				['refresh_token'=>''],
				*/
				if (is_array($user)) {
					$data = array('nickname' => $user['nickname'],
								  'gender' => $user['gender'],
							      'location' => $user['location'],
								  'expire_at' => $user['expire_at'],
							      'access_token' => $user['access_token'],
								  'refresh_token' => $user['refresh_token']
					);
					$bindinfo = $this->oauth_m->getbindinfo(array('oid'=>$user['oid']),array('uid','is_bind'));
					if (!empty($bindinfo)) {
						$id = $this->oauth_m->update_oauth(array('oid' => $user['oid']),$data);
					}else {
						$id = $this->oauth_m->add_oauth($user);
					}
					
					//登录情况下
					if (is_login()) {
						if (!empty($bindinfo) && $bindinfo['is_bind']) {//已经绑定,提示已经绑定过
							header("Content-Type: text/html; charset=utf-8");
							echo "<script>alert('账号已绑定.');location.href = '/oauth/bind';</script>";exit;
						}else {//未绑定,执行绑定操作
							if ($id) {
								$result = $this->oauth_m->update_oauth(array('oid' => $user['oid']),array('uid'=>$this->uid,'is_bind'=>1));
								header("Content-Type: text/html; charset=utf-8");
								if ($result) {
									echo "<script>alert('绑定成功.');location.href = '/oauth/bind';</script>";exit;
								}else {
									echo "<script>alert('绑定失败.');location.href = '/oauth/bind';</script>";exit;
								}
							}
						}
						
					}
					
					//非登录情况下					
					if(empty($bindinfo) || !$bindinfo['is_bind']){//未绑定直接转向资料补充
		                if ($id) {
							if($this->member_m->auto_add_member($user['oid'], $user['nickname'], $user['avatar'], $user['gender'], $user['location'], $appid)) {
								header("Content-Type: text/html; charset=utf-8");
								echo "跳转中...123";
								echo "<script>";
								echo 'parent.window.location.href="'.urldecode($this->input->cookie('cl_oauth_referer')).'";';
								//echo 'window.close();';  								
								echo '</scr'.'ipt>';
								//echo "授权成功...正在跳转...";
							    //echo "<script>;location.href = '/users';//<///script>";exit;		
                                //redirect(urldecode($this->input->cookie('cl_oauth_referer')));														
							}else {
								echo "<script>alert('授权失败.');location.href = '/';</script>";exit;
							}
		                }						
					}else{
						//已经绑定
					    $id = $this->oauth_m->update_oauth(array('oid' => $user['oid']),$data);
					    $userinfo = $this->member_m->get_user(array('username'),array('uid'=>$bindinfo['uid']));
					    $this->save_login_state($bindinfo['uid'], $userinfo['username']);
						
						header("Content-Type: text/html; charset=utf-8");
						echo "跳转中...345";
						echo "<script>";
						echo 'window.opener.location.href = window.opener.location.href;';
						echo 'if(window.opener.progressWindow)';
						echo '    window.opener.progressWindow.close();';
						echo 'window.close();';
						//echo 'window.close();';  						
						echo '</scr'.'ipt>';
								//echo "授权成功...正在跳转...";
								
						//redirect(urldecode($this->input->cookie('cl_oauth_referer')));
					}
				} else {
					exit;
				}
			}
		}else {
			$response = array('result' => false, 'msg' => "参数异常");
			echo json_encode($response);
			exit;
		}
	}
	
	/**
	 * 绑定
	 */
	public function bind(){
		if (!is_login()) {
			redirect('/member/login');
		}
		
		$bind_oauth = array('qq' => array('name' => 'QQ','is_bind' => false),
				            'sina' => array('name' => '微博','is_bind' => false)
		);
		//获取绑定信息
		$bindinfo = $this->oauth_m->get_user_bindinfo(array('uid'=>$this->uid));
		if (!empty($bindinfo)) {
			foreach ($bindinfo as $v){
				$bind_oauth[$v['oauth']]['is_bind'] = !empty($v) && $v['is_bind'] ? true : false;
			}
		}
		$this->data['bind'] = $bind_oauth;
		$this->data['seo']['title'] = '绑定-酷Live';
		$this->data['seo']['keywords'] = '';
		$this->data['seo']['description'] = '';
		$this->data['app'] = 'bind';
		$this->load->view('space/bind.php',$this->data);
	}
	
	/**
	 * 解除绑定
	 */
	public function unbind(){
		$oauth = $this->input->post('oauth',true);
		$bindinfo = $this->oauth_m->getbindinfo(array('uid'=>$this->uid,'oauth' => $oauth),array('uid'));
		if (empty($bindinfo) || $bindinfo['uid'] != $this->uid) {//绑定不存在或不是自己的绑定
			exit(json_encode(array('result'=>false,'msg'=>$this->lang->line('unbind_failed'))));
		}else {//解绑
			$result = $this->oauth_m->update_oauth(array('uid' => $this->uid,'oauth' => $oauth),array('is_bind' => 0));
			if($result){
				exit(json_encode(array('result'=>true,'msg'=>$this->lang->line('unbind_success'))));
			}else {
				exit(json_encode(array('result'=>false,'msg'=>$this->lang->line('unbind_failed'))));
			}
		}
	}
	
	/**
	 * 保存来路
	 * @param string $referer
	 */
	private function save_oauth_referer($referer){
		if (!empty($referer)) {
			
			$data = array('name' => 'cl_oauth_referer',
					'value' => urlencode($referer),
					'expire' => 24*3600,
					'domain' => $this->config->item('cookie_domain')
			);
			$this->input->set_cookie($data);
		}
	}
}
?>