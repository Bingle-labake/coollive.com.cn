<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**************************************************************************
*   Comments:   直播-
*   Author: Bingle
*   Last Modified:  2014-12-23
**************************************************************************/
class Rt extends Live_Controller {
	function __construct()
	{
		parent::__construct();			
	}
     
    /**
     * 
     */
    public function heartbeat($ping = "") {	
	    echo '{"messages":{},"capabilities":{"presence":"true","room":"true"},"sig":"~kmc"}';	
    }
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
