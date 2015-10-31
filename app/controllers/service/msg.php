<?php
/**
 * 赛酷 消息通知服务
 * ============================================================================
 *   
 * 
 * ============================================================================
 * $Author: Bingle $
 * $Id: notice.php 17171 2014-02-26 9:37:00Z Bingle $
*/
class Msg extends S_Controller {
	
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
	public function getnotice() {
		$notice = array();
		$res = array();
		
		if($this->uid > 0) {
			$this->load->model('space/message_model','message_m');
			$res['code'] = 1;
			$res['notice'] = $this->message_m->get_notice($this->uid);
			
			//判断是否有新的广播
			$res['sys'] = $this->message_m->has_sys_msg_by_newcache($this->uid);
		}else {
			$res['code'] = 0;
			$res['error'] = '你尚未登录！';
		}

		$this->output($res);
	}
	
}
?>