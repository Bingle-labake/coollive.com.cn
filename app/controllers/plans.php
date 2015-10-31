<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**************************************************************************
*   Path:   /Home.php
*   Home:   直播-首页
*   Author: Bingle
*   Last Modified:  10.29.2014 / scf
**************************************************************************/
class Plans extends Live_Controller {
	protected $period = 1;
	protected $activity_name = "";

	function __construct()
	{
		parent::__construct();	

        $this->data['gh_css'] = array();
		$this->data['ph_css'] = array();
		$this->data['ph_css'][] = '/live/css/base2.0.css';
        $this->data['ph_css'][] = '/live/css/show.css';
		
        $this->data['ph_js'][] = '/live/js/base2.0.js';
		$this->data['ph_js'][] = '/live/js/lrtk.js';
		
		$this->data['gf_js'] = array();
		$this->data['gf_js'][] = '/live/js/sk.js';//消息通知	
		$this->data['gf_js'][] = '/assets/im/js/jquery.json.js';
		$this->data['gf_js'][] = '/assets/im/js/message_driver.js';
		
		$this->data['app'] = 'live';
	}
       
    /**
     * 首页
     */
    public function index(){     	
		$this->load->view('spree/plans.tpl',$this->data);    
    }  
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
