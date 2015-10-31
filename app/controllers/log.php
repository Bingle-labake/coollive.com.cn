<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**************************************************************************
*   Comments:   直播-节目直播
*   Author: Bingle
*   Last Modified:  09.16.2014
**************************************************************************/
class Log extends Live_Controller {
	protected $activity_name = "live";
	
	function __construct()
	{
		parent::__construct();	
	    
        $this->data['gh_css'] = array();
		$this->data['ph_css'] = array();
		$this->data['ph_css'][] = '/zhuanti/tianti/css/base2.0.css';
        $this->data['ph_css'][] = '/live/css/show.css';
        $this->data['ph_css'][] = '/chat/static/css/bootstrap.css';
        //$this->data['ph_css'][] = '/chat/static/css/chat.css';
        
        $this->data['ph_js'] = array();
		#$this->data['ph_js'][] = '/tianti/js/jquery1.9.js';
        //$this->data['ph_js'][] = '/assets/play/ckplayer/ckplayer.js';
        
		
		$this->data['gf_js'] = array();
		$this->data['gf_js'][] = '/zhuanti/tianti/js/sk.js';//消息通知	
		
		
		$this->data['gf_js'][] = '/chat/config.js';
		$this->data['gf_js'][] = '/assets/im/js/jquery.json.js';
		$this->data['gf_js'][] = '/chat/static/js/chat.js';
		
		$api = $this->config->item("api");
		$this->img_path = $api['upload']['com']['path'];
		
		/*
			$config['live']['pub_server'] = "58.68.243.232";
            $config['live']['pub_port'] = 1935;
            $config['live']['pub_stream'] = "live";
        */
		$this->live_config = $this->config->item("live");
		
		$this->data['app'] = 'live';
		
	}
     
    /**
     * 直播房间
     */
    public function transaction() {
		echo '"ok"';
    }
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
