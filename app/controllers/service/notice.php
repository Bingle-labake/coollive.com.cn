<?php
/**
 * 赛酷  拉取广播
 * ============================================================================
 *   
 * 
 * ============================================================================
 * $Author: Bingle $
 * $Id: message.php 17171 2014-02-25 15:37:00Z Bingle $
*/
class Notice extends S_Controller {
	
	/**
	* 构造函数
	*
	* @access  public
	* @return  mix
	*/	
	function __construct(){
		parent::__construct();		
	}
	
	//消息通知
	public function push() {
		$fuid = $this->uid;
		$res = 0;
		
		//强制拉取广播消息
		if($fuid>0) {
			$this->load->model('space/message_model','message_m');
			$res = $this->message_m->init_system_msg($this->uid, true);				
		}
		$this->output($res);
	}
	
}
?>