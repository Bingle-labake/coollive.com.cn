<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**************************************************************************
*   Path:   /subscripe.php
*   Home:   直播-订阅
*   Author: Bingle
*   Last Modified:  2015-5-10
**************************************************************************/
class Subscripe extends Live_Controller {
	protected $period = 1;
	protected $activity_name = "";

	function __construct()
	{
		parent::__construct();
        $this->load->model('subscribe_model','subscribe_m');
	}
	
	/**
     * 首页
     */
    public function todo(){
        $success = false;
		$pid = $this->input->get_post('pid', 0);
        if($this->uid > 0 && $pid > 0) {
            $this->load->model('live_programs_model','live_m');
            if($this->live_m->getOne(array('rid'=>$pid), 'rid')) {
                $success = $this->subscribe_m->save($this->uid, $pid);
            }
        }
        echo '{"success":"","formats":["html"],"layout":false}';
    } 
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
