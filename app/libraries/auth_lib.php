<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Auth_lib {
	var $CI;
	
	//this is the expiration for a non-remember session
	var $session_expire	= 600;

	function __construct()	{
		$this->CI =& get_instance();
		$this->CI->load->library('fecho_lib');	
		//$this->CI->load->library('vars');		
		
		$this->CI->load->model('sk_admin/manager_model');
		$this->CI->load->model("sk_admin/role_model");	
		//$this->CI->load->model("sk_admin/managerlog_model");
		
		$this->CI->load->library('session_lib');
		
		$this->CI->lang->load('auth');
		$this->CI->load->helper('url');
		$this->CI->load->helper('language');

		session_start();
	}
	
	function check_access($access, $default_redirect=false, $redirect = false)	{
		/*
		we could store this in the session, but by accessing it this way
		if an admin's access level gets changed while they're logged in
		the system will act accordingly.
		*/
		
		$manager = $this->CI->session_lib->userdata('manager');		
		
		$where = array("id"=>$manager['id']);
		$result = $this->CI->manager_model->getRow($where);		
		
		//result should be an object I was getting odd errors in relation to the object.
		//if $result is an array then the problem is present.
		if(!$result || is_array($result)){
			$this->logout();
			return false;
		}
	//	echo $result->access;
		if ($access){
			$_SESSION['sk_administrator'] = 1;
			if ($access == $result->access)	{
				return true;
			}else{
				if ($redirect){
					redirect($redirect);
				}elseif($default_redirect){	
					$this->fecho_lib->my_redirect($this->CI->config->item('admin_folder').'/setting/');	
				}else{
					return false;
				}
			}
			
		}
	}
	
	function check_action($act, $model, $warnning = true)	{
		$manager = $this->CI->session_lib->userdata('manager');			
		$this->CI->vars_lib->setVars("logs", $this->CI->managerlog_model->recordLog($manager['admin_name'], $model, $act));
		
		$auth_act_list = array();
		if($manager && sizeof($manager)>0) {			
			if(!empty($manager['role'])) {				
				if(!empty($manager['role']['node_list']) && $manager['role']['status'] == 1) {					
				    $node_list = $manager['role']['node_list'];
					if(is_array($node_list)) {
					    foreach($node_list as $v) {
						    foreach($v['nodes'] as $node) {
								$auth_act_list[$node['rn_name']] = explode(",", $node['act']);
							}
						}
					}
					if(isset($auth_act_list[$model])) {
						if(in_array($act, $auth_act_list[$model])) {							
						    return true;	
						}
					}
			    }
			}
		}
		if ($warnning){			
			$links[] = array("href"=>"javascript:window.history.back();", "text"=>lang('return'));	
			$this->CI->fecho_lib->msg(0, lang('no_power_action'), $links);
			exit;
		}else {
			return false;
		}	
		
	}
	
        /*
	this checks to see if the admin is logged in
	we can provide a link to redirect to, and for the login page, we have $default_redirect,
	this way we can check if they are already logged in, but we won't get stuck in an infinite loop if it returns false.
	*/
	function is_logged_in($redirect = false, $default_redirect = true) {
		$manager = $this->CI->session_lib->userdata('manager');	
		
		if (!$manager)
		{
			if ($redirect)
			{
				$this->CI->session_lib->set_flashdata('redirect', $redirect);
			}
				
			if ($default_redirect)
			{	
			    $this->CI->fecho_lib->my_redirect($this->CI->config->item('admin_folder').'/login', true);			    
			}			
			return false;
		}
		else
		{
		
			//check if the session is expired if not reset the timer
			if($manager['expire'] && $manager['expire'] < time())
			{

				$this->logout();
				if($redirect)
				{
					$this->CI->session_lib->set_flashdata('redirect', $redirect);
				}

				if($default_redirect)
				{
					$this->CI->fecho_lib->my_redirect($this->CI->config->item('admin_folder').'/login', true);		
				}

				return false;
			}
			else
			{

				//update the session expiration to last more time if they are not remembered
				if($manager['expire'])
				{
					$manager['expire'] = time()+$this->session_expire;
					$this->CI->session_lib->set_userdata(array('manager'=>$manager));
				}

			}

			return true;
		}
	}
	/*
	this function does the logging in.
	$email : username
	*/
	function login_admin($username, $password, $remember=false)
	{
		$where = array("admin_name"=>$username, "admin_pwd"=>MD5($password), "isdisable"=>1);
		$cms_log = $this->CI->managerlog_model->recordLog($username, "Auth", "login_admin");
		
		$result = $this->CI->manager_model
		                   ->getRow($where);		
		if (sizeof($result) > 0 && intval($result['isdisable']) > 0)
		{ 
			$admin = array();			
			$admin['manager']			        = array();
			$admin['manager']['id']		        = $result['id'];	
			$admin['manager']['admin_name']     = $result['admin_name'];		
			$admin['manager']['email']	        = $result['email'];	
			$admin['manager']['phone']	        = $result['phone'];			
			$admin['manager']['last_login_time']= $result['last_login_time'];	
			
			$role = $this->CI->role_model->getRow(array("role_id"=>$result['role_id']));
			$role['node_list'] = $this->CI->role_model->getNodeList($result['role_id']);
			$admin['manager']['role']	     = $role;		
			//用户组、加载
			
			if(!$remember)
			{
				$admin['manager']['expire'] = time()+$this->session_expire;
			}
			else
			{
				$admin['manager']['expire'] = false;
			}
 
			$this->CI->session_lib->set_userdata($admin);
			
			if(true) {
				$_SESSION['sk_administrator'] = 1;
				
				$cms_log['cms_log']['log_result'] = "登录成功";
			    $cms_log['cms_log']['log_msg'] = "";
			    $this->CI->managerlog_model->insertLog($cms_log);
			}
			$this->CI->manager_model
			         ->settingLoginStatus($admin['manager']['id']);
						
			return true;
		}
		else
		{
			if(true) {
				$cms_log['cms_log']['log_result'] = "登录失败";
			    $cms_log['cms_log']['log_msg'] = "";
			    $this->CI->managerlog_model->insertLog($cms_log);
			}			
			return false;
		}
	}
	
	function getManager() {
		return $this->CI->session_lib->userdata('manager');
	}
	
	/*
	this function does the logging out
	*/
	function logout()
	{
		$manager = $this->CI->session_lib->userdata('manager');		
		$this->CI->session_lib->unset_userdata('manager');
		$this->CI->session_lib->sess_destroy();	
		
		if(true) {
			$cms_log = $this->CI->managerlog_model->recordLog($manager['admin_name'], "Auth", "logout");
			$cms_log['cms_log']['log_result'] = "退出登录";
		    $cms_log['cms_log']['log_msg'] = "";
		    $this->CI->managerlog_model->insertLog($cms_log);
		}		
	}

	/*
	This function resets the admins password and emails them a copy
	*/
	function reset_password($email)
	{
		$admin = $this->get_admin_by_email($email);
		if ($admin)
		{
			$this->CI->load->helper('string');
			$this->CI->load->library('email');
			
			$new_password		= random_string('alnum', 8);
			$admin['password']	= sha1($new_password);
			$this->save_admin($admin);
			
			$this->CI->email->from($this->CI->config->item('email'), $this->CI->config->item('site_name'));
			$this->CI->email->to($email);
			$this->CI->email->subject($this->CI->config->item('site_name').': Admin Password Reset');
			$this->CI->email->message('Your password has been reset to '. $new_password .'.');
			$this->CI->email->send();
			return true;
		}
		else
		{
			return false;
		}
	}
	
	/*
	This function gets the admin by their email address and returns the values in an array
	it is not intended to be called outside this class
	*/
	private function get_admin_by_email($email)
	{
		$this->CI->db->select('*');
		$this->CI->db->where('email', $email);
		$this->CI->db->limit(1);
		$result = $this->CI->db->get('admin');
		$result = $result->row_array();

		if (sizeof($result) > 0)
		{
			return $result;	
		}
		else
		{
			return false;
		}
	}

}

?>