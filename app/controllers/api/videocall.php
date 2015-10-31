<?php

class Videocall extends CI_Controller { 
	function __construct() {
		parent::__construct();	
	}
	
    //客户端登陆
	/*
	*
	*code 0:fail 1:success  2:server issue other:also server issue
	*/
	function client_login() {
		$phone    = $this->input->get_post("phone", true);
		$password = $this->input->get_post("password", true);
		
		$res = array("code"=>1, "id"=>11111, "realName"=>"bingle", "phone"=>$phone);
		echo json_encode($res);		
	}
	
	//客户端登陆
	/*
	*
	*code 0:fail 1:success  2:server issue other:also server issue
	*/
	function client_register() {
		$phone    = $this->input->get_post("phone", true);
		$password = $this->input->get_post("password", true);
		
		$res = array("code"=>1, "id"=>11111, "realName"=>"bingle", "phone"=>$phone);
		echo json_encode($res);	
	}
	
	//客户端登陆
	/*
	*
	*code 0:fail 1:success  2:server issue other:also server issue
	*/
	function client_update() {
		$phone     = $this->input->get_post("phone", true);
		$$realName = $this->input->get_post("realName", true);
		
		$res = array("code"=>1, "id"=>11111, "realName"=>"bingle");
		echo json_encode($res);	
	}
	
	function check_user_state() {
		$userphone     = $this->input->get_post("userphone", true);
		echo 11111;	
	}
	
	function client_upload() {
		$base_path = FCPATH.DIRECTORY_SEPARATOR ."public".DIRECTORY_SEPARATOR ."data".DIRECTORY_SEPARATOR ."uploads"; //接收文件目录  
		
		if(!file_exists($base_path)) {
			mkdir($base_path);  
            chmod($base_path,0777); 
		}	
		$xmlstr = file_get_contents('php://input');
        $filename = date("ymdHis") . "_". mt_rand(1000, 9999). ".3gp";
		
		$flag = false;
        $data = $xmlstr;
        $file = fopen($base_path . DIRECTORY_SEPARATOR  . $filename, "w");
        $flag = fwrite($file, $xmlstr);
        fclose($file);

        if ($flag) {  
            $array = array ("code" => "1", "message" => $base_path . DIRECTORY_SEPARATOR  . $filename);              
        } else {  
            $array = array ("code" => "0", "message" =>"");  
        }  
		echo json_encode ( $array );  
	}
	
}

?>