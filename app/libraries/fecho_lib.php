<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * CodeIgniter Crawl Active Record Library

 */

class Fecho_lib {	
	private $CI;
	
	public function __construct()
	{
		$this->CI =&get_instance();	
		$this->CI->load->library('xmlparse');	
		$this->CI->load->library('vars_lib');	
		$this->CI->load->model("sk_admin/managerlog_model");
	}
	
	public function out($data, $template='', $temp_dir="layout") {
		$re_type  = $this->CI->input->get_post('re_type');
		$callback = $this->CI->input->get_post('callback');
		$code_format = $this->CI->input->get_post('cf');
		
		$this->CI->smarty_lib->assign("BASE_URL", $this->CI->config->item('base_url'));
		$this->CI->smarty_lib->assign("ADMIN_FOLDER", $this->CI->config->item('admin_folder'));
		
		//执行日志
		if(intval($this->CI->vars_lib->variable['website']['manager_log'])>0) {
			$cms_log = $this->CI->vars_lib->getVars("logs", "cms_log");
		    $this->CI->managerlog_model->saveLog($data, $cms_log);
		}		
		if(!empty($re_type)) {
			switch($re_type) {
				case 'json':							
				case 'jsonp':
							if(is_array($data)) {
								$data = json_encode($data);	
							}
							if(!empty($callback)) {
								echo $callback."(".$data.")";
							}else {
								echo $data;
							}
							break;
				case 'xml':
				            if(!is_array($data)) {
								$data = array($data);
							}	
							echo XML_serialize($data);						
				            break;
				default:    if(is_array($data)) {
								$data = implode(" ", $data);	
							};
							echo $data;
			}	
			exit;
		}else {
			if(empty($template)) {
		        $template = "index";			
			}
			foreach($data as $k=>$v) {
				$this->CI->smarty_lib->assign($k, $v);
			}			
			$this->CI->smarty_lib->layout = $temp_dir.'/'.$template;
			$this->CI->smarty_lib->show($template);	
		}		
	}
	
	public function api($data, $format = 'json') {
		$re_type  = $this->CI->input->get('re_type');
		$callback = $this->CI->input->get('callback');
		if(!empty($re_type)) {
			$format = $re_type;
		}
		switch($format) {
			case 'json':							
			case 'jsonp':
						if(is_array($data)) {
							$data = json_encode($data);	
						}
						if(!empty($callback)) {
							echo $callback."(".$data.")";
						}else {
							echo $data;
						}						
						break;
			case 'xml':
						if(!is_array($data)) {
							$data = array($data);
						}	
						echo XML_serialize($data);						
						break;
			default: echo json_encode($data);
		}	
	}
	
	public function my_redirect($url, $isTop = false) {
		if($isTop) {
			echo '<scr'.'ipt type="text/javascript">';
			echo 'if (top.location !== self.location) {';
			echo 'top.location = "'.$url.'";';
			echo '}else{';
			echo 'location = "'.$url.'";';
			echo '}';
			echo '</scr'.'ipt>';
			exit;
		}else {
			redirect($url);
		}		
	}
	
	/*
	*
	*/
	public function msg($type, $msg, $links, $m = 3) {
	    $data['msg']['msg_type'] = $type;
		$data['msg']['msg_detail'] = $msg;
		$data['msg']['auto_redirect'] = 3;
		
		$data['msg']['links'] = $links;
		$data['msg']['default_url'] = $links[0]['href'];

		$this->out($data, "warnning", "sk_admin");	
		exit;
	}
	
}

// EOF

?>