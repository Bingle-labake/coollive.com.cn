<?php
/**
 * 赛酷  计划任务 广播拉取服务
 * ============================================================================
 *   
 * 
 * ============================================================================
 * $Author: Bingle $
 * $Id: message.php 17171 2014-02-25 15:37:00Z Bingle $
*/
class Cron_notice extends S_Controller {
	
	/**
	* 构造函数
	*
	* @access  public
	* @return  mix
	*/	
	function __construct(){
		parent::__construct();	
		
		header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
		header("Last-Modified: " . gmdate("D, d M Y H:i:s") . "GMT");
		header("Cache-Control: no-cache, must-revalidate");
		header("Pragma: no-cache");
		
	}
	
	//消息通知
	public function pop() {
		$rand_uid = rand(1, 153579);		
		
		//强制拉取系统消息
		if($rand_uid>0) {			
			$this->load->model('space/message_model','message_m');
			$this->message_m->update_pushsatus_by_uid($rand_uid);
			
			$res = $this->message_m->init_system_msg($rand_uid, true);				
		}
		echo "uid:".$rand_uid . "--> mi_id:" .$res;		
	}
	
}
?>