<?php
/**
 * 赛酷 计划任务==系统消息触发服务
 * ============================================================================
 *   
 * 
 * ============================================================================
 * $Author: Bingle $
 * $Id: message.php 17171 2014-02-25 15:37:00Z Bingle $
*/
class Crontab extends S_Controller {
	
	/**
	* 构造函数
	*
	* @access  public
	* @return  mix
	*/	
	function __construct(){
		parent::__construct();		
	}
	
	//直投票失效任务 每小时执行一次
	public function disable_straight_vote() {
	}
	
	//战斗力加成失效任务 每小时执行一次
	public function disable_flight() {
		set_time_limit(0);
		$this->load->model('eshop/vgoods_model');
		$this->vgoods_model->flight_disable();
	}
	
	/*
	 *系统免费赠送道具;任务 每5秒执行一次
	*/
	public function free() {
		$this->load->model('crontab_model');
		
	    $present_list = $this->crontab_model->will_be_present(20);
		if($present_list) {
			$ml_arr = array();
			foreach($present_list as $present) {
				$ml_ids = $this->vgoods_model->free($present['fuid'], $present['vg_ide'], $present['num']);
				if($ml_ids) {
					$this->crontab_model->had_present($present['id']);
					$ml_arr[] = $ml_ids;
				}
			}			
		}
	}
	
}
?>