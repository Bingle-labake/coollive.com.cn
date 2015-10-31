<?php

class Live extends Live_Controller {
	protected $live_config = array();
	
	function __construct() {
		parent::__construct();	
		$this->live_config = $this->config->item("live");		
		$this->load->model('live/live_programs_model','live_programs_m');
	}
	
	//更新房间状态
	/*
	*
	*code 0:fail 1:success  2:server issue other:also server issue
	*/
	function state_act() {
		$rid        = intval($this->input->get_post("rid", true));
		$state      = intval($this->input->get_post("state", true));	// -1 状态检测  1:开始 0:结束	
		if($rid > 0 && $this->uid > 0)  {
			//$program = $this->live_programs_m->get_my_program($rid, $uid);
			$program = $this->live_programs_m->get_program($rid, $this->uid);
			if($program && $program['is_live'] < 2) {
				$set = array();
				if($state > 0) {
				    if($program['is_live'] == 0) {
						$set = array('is_live'=>1, 'start_time'=>time());
					}
		    	}else {
		    	    if($program['is_live'] == 1) {
		    			$set = array('is_live'=>2);
		    		}			    
		    	}
				
				if(!empty($set)) {
					$this->live_programs_m->upstate_program_by_uid($rid, $program['uid'], $set);
					$this->echo_api(1, "");
				}else {
					$this->echo_api(2, "");
				}				
			}else {
				if($program) {
					$this->echo_api(-4, "该直播已经结束，将会重新分配房间。");
				}else {
					$this->echo_api(-3, "该房间已经失效或不存在.");
				}				
			}			
		}else {
			$this->echo_api(-2, "预设信息不完整，请重新填写.");
		}
	}
}

?>