<?php  
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Vars_lib  
{  
    var $CI;  
	var $variable = array();  
    function __construct(){  
        $this->CI = & get_instance();  
        //变量可以在这里定义，或者来自配置文件，也可以去数据
		$smtp    = read_static_cache("smtp_config");	
		$website = read_static_cache("website_config");	
		$upload  = read_static_cache("upload_config");	
		
		$this->CI->load->model("sk_admin/systemconfig_model");	
		if(empty($smtp)) {
			$where = array("app_name"=>"smtp");
			$smtp_list = $this->CI->systemconfig_model->getAll($where);
			$smtp = array();
			if($smtp_list && count($smtp_list)>0) {
				foreach($smtp_list as $k=>$v) {
					$smtp[$v['paras']] = $v['value'];
				}
			}
			if(!empty($smtp)) {		
				write_static_cache("smtp_config", $smtp);
			}			
		}
		if(empty($website)) {
			$where = array("app_name"=>"website");
			$website_list = $this->CI->systemconfig_model->getAll($where);
			$website = array();
			if($website_list && count($website_list)>0) {
				foreach($website_list as $k=>$v) {
					$website[$v['paras']] = $v['value'];
				}
			}
			if(!empty($website)) {			
				write_static_cache("website_config", $website);
			}			
		}
		if(empty($upload)) {
			$where = array("app_name"=>"upload");
			$upload_list = $this->CI->systemconfig_model->getAll($where);
			$upload = array();
			if($upload_list && count($upload_list)>0) {
				foreach($upload_list as $k=>$v) {
					$upload[$v['paras']] = $v['value'];
				}
			}

			if(!empty($upload)) {
				write_static_cache("upload_config", $upload);
			}			
		}
		$this->variable['smtp']    = $smtp; 
		$this->variable['website'] =  $website;
		$this->variable['upload']  =  $upload;
		
        $this->CI->load->vars($this->variable); 
    }  
	
	function setVars($app, $var) {
		$this->variable[$app] = $var;
		$this->CI->load->vars($this->variable);  
	}
	
	function getVars($app, $key) {
		if(empty($this->variable)) {
			return false;
		}else {
			if(isset($this->variable[$app])) {
				return $this->variable[$app][$key];	
			}else {
				return false;
			}		    
		}	
	}
	
}  
?>