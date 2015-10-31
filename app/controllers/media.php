<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**************************************************************************
*   Comments:   直播-视频底层页
*   Author: Bingle
*   Last Modified:  12.23.2014
**************************************************************************/
class Media extends Live_Controller {
	protected $activity_name = "live";
	
	function __construct()
	{
		parent::__construct();	
	    
        $this->data['gh_css'] = array();
		$this->data['ph_css'] = array();
		$this->data['ph_css'][] = '/zhuanti/tianti/css/base2.0.css';
        $this->data['ph_css'][] = '/zhuanti/tianti/css/show.css';
        
        #$this->data['ph_js'] = array();
		#$this->data['ph_js'][] = '/tianti/js/jquery1.9.js';
        $this->data['ph_js'][] = '/zhuanti/tianti/js/base2.0.js';
		
		$this->data['gf_js'] = array();
		$this->data['gf_js'][] = '/zhuanti/tianti/js/sk.js';//消息通知	
		$this->data['gf_js'][] = '/assets/im/js/jquery.json.js';
		$this->data['gf_js'][] = '/assets/im/js/message_driver.js';
		
		$this->data['app'] = 'live';
		$this->data['source'] = 'live';
		
	}
     
    /**
     * 
     */
    public function video($ccvid)  {
    	if(empty($ccvid)){
    		@header('Location:/home');
    	}
    	
    	$this->load->model('live_programs_model','live_m');
		$this->load->model('video_model','video_m');
    	if(is_numeric($ccvid)) {  
    		$wid = intval($ccvid);  		
    		$videoInfo = $this->live_m->get_video($wid);
    	}else {    		
    		$videoInfo = $this->live_m->get_video($ccvid);
    	}

		//查不到视频信息则调回首页
		if(empty($videoInfo))
		   @header('Location:/home');
	
        $this->data['video'] = $videoInfo;
		$this->data['seo']['title'] = $videoInfo['title'];
        $this->data['seo']['description'] = $videoInfo['description'];
		$this->data['seo']['keywords'] = $videoInfo['tag'];
		
		$this->data['seo']['title'] = '视频：'.$this->data['video']['title'].'_赛酷网';
		$this->data['seo']['keywords'] = '校园舞蹈大赛,荷花杯,荷花奖投票,舞蹈比赛,音乐比赛,摄影比赛,赛酷,赛酷网';
		$this->data['seo']['description'] = '第五届中国舞蹈节第九届中国舞蹈“荷花奖”校园舞蹈大赛是针对国内大学生的顶级舞蹈赛事。本次比赛由中国文学艺术界联合会、中国舞蹈家协会主办；由中国舞蹈家协会和赛酷网承办，各大专业舞蹈院校、艺术院校、热爱舞蹈艺术的普通高校学生均可报名参赛。';
		
		$this->data['ph_css'] = array();
		$this->data['ph_css'][] = "/assets/css/base1.1.css";
		$this->data['ph_css'][] = "/assets/css/ucenter_info.css";
		$this->data['ph_css'][] = "/assets/css/report.css";		
				
		$this->video_m->video_play($ccvid);		
        $this->load->view('video_info.tpl',$this->data);    
    }

    /**
     * @param  int gid  活动id
     * @param  int period     第几期活动
     * @param  int page 页码
     * @param  int word 关键字（搜索）
     */
    public function lists(){
        $gid = intval($this->input->get_post('gid',true));
        $page = intval($this->input->get_post('page',true));
        $period = intval($this->input->get_post('period',true));
        $or = $this->input->get_post('or',true);
        $word = trim($this->input->get_post('word',true));
        $word = addslashes($word);
        $word = strip_tags($word);
        
        $size = 20;
        if(!$gid){
             @header("Location:/show/home");exit;
        }
        $this->load->model('works_index_model','index_mod');
        $w = " WHERE  i.gid=$gid AND v.status=3  ";#
        if($period){
            $w .= " AND i.cate_id=$period ";
        }
        if(!empty($word)){
            $w .= " AND CONCAT(`title` , `tag` ,`description`) LIKE '%".$word."%' ";
        }
        $works_num = $this->index_mod->get_works_c($w);
        if($works_num){
            switch($or){
    			case 'vote':
    				$order = ' i.vote DESC ';
    			break;	
                default:
                    $order = ' v.play DESC ';
                break;
    		}
            $order = ' v.play DESC ';
            $works = $this->index_mod->get_works($w,$page,$size,$order);
            $this->data['works'] = $works;
            $this->load->helper('page_helper');
            $url = '/show/video/lists';
            $param = array(
                        'gid'=>$gid,
                        'period'=>$period,
                        'or' =>$or,
                        'word'=>$word
                    );
            $this->data['page'] = new_page_php($works_num,$page,$size,$url,$param);
            $this->data['v_path'] = $this->config->item('v_url');
        }
        $this->data['img3_url']  = $this->config->item('img3_url');
        
        
        $this->load->model('show/home_config', 'home_config');
        $home_config = $this->home_config->getList($gid);
        $period_arr = array('全部');
        if($home_config){
            foreach($home_config as $p_c){
                array_push($period_arr,$p_c['period_name']);
            }
        }
        $this->data['period'] = $period;
        $this->data['gid'] = $gid;
        $this->data['word'] = $word;
        $this->data['period_arr'] = $period_arr;
        
        $this->data['seo']['title'] = '视频列表-星光少年-赛酷网（saiku.com.cn）';
        $this->data['seo']['keywords'] = '星光少年，少儿春晚，视频，更多精彩视频，投票，比赛';
        $this->data['seo']['description'] = '星光少年活动是赛酷网承办，为2015少儿春晚节目线上选拔春晚节目录制候选名单。';
        $this->load->view('activity/show/video_list.html',$this->data);  
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
