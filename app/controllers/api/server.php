<?php

class Server extends Api_Controller { 
	function __construct() {
		parent::__construct();	
	}
	
    //客户端登陆
	/*
	*
	*code 0:fail 1:success  2:server issue other:also server issue
	*/
	function index() {
		$code    = $this->input->get_post("code", true);		
		
		$res = array("web"=>$this->config->item("l_url").":80", 
				     "api"=>$this->config->item("base_url").":80"
				     );
		
		$this->echo_api(1, $res);
	}	
}

?>