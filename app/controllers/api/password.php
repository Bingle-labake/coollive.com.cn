<?php

class Password extends CI_Controller { 
	function __construct() {
		parent::__construct();	
	}
	
    //重置密码
	/*
	*
	*code 0:fail 1:success  2:server issue other:also server issue
	*/
	function get() {
		$email    = $this->input->get_post("email", true);//手机号或邮箱	
		
		$res = array("web"=>"http://coollive.labake.cn:80");
		echo json_encode($res);	
		//{"web":"http://yishizhibo.com:80"}
	}	
}

?>