<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**************************************************************************
*   users/events:   直播-节目直播
*   Author: Bingle
*   Last Modified:  09.16.2014
**************************************************************************/
class Events extends Live_Controller {
	protected $activity_name = "events";
	
	function __construct()
	{
		parent::__construct();
	}

    public function create() {
        $title     = $this->input->get_post("title");
        $pic_name  = $this->input->get_post("pic_name");
        $category  = $this->input->get_post("category");
        $tag       = $this->input->get_post("tag");
        $starttime = $this->input->get_post("starttime");
        $endtime   = $this->input->get_post("endtime");
        $privacy   = $this->input->get_post("privacy");
        $desc      = $this->input->get_post("desc");

        $pid = 0;
        if($this->uid > 0) {
            $starttime = strtotime($starttime);
            $endtime   = strtotime($endtime);
            $desc      = mb_substr($desc, 0, 1024);
            $duration = $endtime - $starttime;
            if(!in_array($privacy, array('public', 'unlisted', 'private'))) {
                $privacy = 'public';
            }

            header('Content-type: application/json');
            if(empty($title) || mb_strlen($title)<2) {
                echo json_encode(array('ret'=>false, 'no'=>-1001, 'error'=>'标题不能为空'));
                exit;
            }
            if($starttime<=0 || $endtime <=0 || $starttime>=$endtime) {
                echo json_encode(array('ret'=>false, 'no'=>-1002, 'error'=>'起始时间有问题'));
                exit;
            }
            if((time()-$starttime)>=300 || $endtime<=time()) {
                echo json_encode(array('ret'=>false, 'no'=>-1003, 'error'=>'时间格式异常'));
                exit;
            }
            if($duration<300) {
                echo json_encode(array('ret'=>false, 'no'=>-1004, 'error'=>'时间间隔太短'));
                exit;
            }
            $this->load->model('live/live_programs_model','live_programs_m');
            $data = array(
                'uid'        =>$this->uid,
                'name'       =>$title,
                'desc'       =>$desc,
                'pic_name'   =>$pic_name,
                'start_time' =>$starttime,
                'end_time'   =>$endtime,
                'duration'   =>$duration,
                'cate'       =>$category,
                'tags'       =>$tag,
                'refer'      =>1,
                'visible'    =>$privacy,
                'record_time'=>time()
            );
            $result = $this->live_programs_m->add_item($data);
        }else {
            echo json_encode(array('ret'=>false, 'no'=>-1006, 'error'=>'未登录'));
            exit;
        }

        if($result) {
            $ret = array('pid'=>$result['rid'], 'ret'=>true);
            echo json_encode($ret);
        }
        exit;
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
