<?php

class Test extends Api_Controller { 
	protected $model_name = 'sk_message';
	protected $model_name_inte = 'sk_message_internal';
	protected $model_name_notice = 'sk_notice';
	protected $model_name_record = 'sk_message_internal_record';
	protected $model_name_publish = 'sk_message_internal_publish';
	protected $model_name_person = 'sk_message_person'; // 私信
	protected $model_name_deny   = 'sk_letter_deny';//私信黑名单
	private $notice_postfix = 'notice_';

	
	function __construct()
	{
		parent::__construct();	
		$this->code = array("code"=>0, "msg"=>"初始化");	
		$this->url = 'http://test.saiku.com.cn';	
			
	}
	
	function navi() {
		echo get_naviHtml_by_position("eshop");
	}
	
	function checkin() {
		$this->load->model('space/credit_model', 'credit_m');
		$uid = 91;
		$log_id = $this->credit_m->add_score($uid, 'mobile_auth');
		var_dump($log_id);
	}
	
	function ex() {
		$this->load->model('space/credit_model', 'credit_m');
		$uid = 93;
		$log_id = $this->credit_m->add_score($uid, 'vote_ticket_ex');
		var_dump($log_id);
	}
	
	function get_list() {
		$this->load->model('space/credit_model', 'credit_m');
		$uid = 25;
		$list = $this->credit_m->get_list_by_uid($uid, 1, 1, 10, true);
		var_dump($list);
	}
	
	/*
	 * $type       = intval($this->input->get_post('type', true));
			$ex_id      = intval($this->input->get_post('ex_id', true));
			$fuid       = intval($this->input->get_post('fuid', true));
			$parent_cid = intval($this->input->get_post('parent_cid', true));
			$content    = $this->input->get_post('content', true);
	 */
	function comment($act = 'todo') {
		$this->load->model('space/comment_model', 'comment_m');
		if($act == 'todo') {			
			$data = array('type'=>1, 'ex_id'=>100, 'content'=>'的确是这样滴 ', 'parent_cid'=>3, 'fuid'=>26);
			$result = rcurl($this->url.'/space/comment/todo', $data);
			
			var_export($result);
		}
		if($act == 'list') {
			
		}
	}
	
	//发送系统消息
	function send_sys() {
		$this->load->model('space/message_model', 'message_m');
		
		$row = array();
		$row['title'] = '137最新系统通知...';
		$row['content'] = '17 最新系统通知...内容。。。。';
		$row['type'] = 3;
		$row['ex_id'] = 0;
		$row['record_time'] = time();		
		
		
		var_export($this->message_m->publish_sys_msg($row));
	}
	
	function get_msg_html() {
		$this->load->model('space/message_model', 'message_m');
		$this->message_m->get_message_html(array());
	}
	
	function b8() {
		$this->load->model('sk_admin/words_model', 'words_m');
		$this->load->model('filter_model', 'filter_m');
		
		$p = intval($this->input->get("p"));
		if($p<=0) {
			$p = 1;
		}
		
		//$where = ' where spaminess = 0.884615';
		$where = ' where 1';
		$list = $this->words_m->getlist($where, $p, 100, 'createtime asc');
		if(!empty($list)) {
			foreach($list as $k=>$v) {				
				$spaminess = $this->filter_m->save_ham($v['word']);
				
				$where = array('id'=>$v['id']);
				$set = array('spaminess'=>$spaminess);	
				$this->words_m->update($where, $set);		
			}
		}else {
			echo "game over";
			exit;
		}
		$p++;
		echo '<script>window.location="http://test.saiku.com.cn/api/test/b8?p='.$p.'";</script>';
	}
	
	function b8_test() {
		$this->load->model('filter_model', 'filter_m');
		$text = '瑞丽杂志，爆炸爆炸';
		
		$res = $this->filter_m->scan($text);
		var_export($res);
		
		//$this->filter_m->split_words("上文提到了贝叶斯算法的几种开源实现，本文说说如何将其中一种名为b8的开源实现集成进");
	}
	
	function votes() {
		$this->load->model('straight_voting_model', 'straight_voting_m');
		$this->straight_voting_m->useup_straight(91);
	}
	
	function face() {
		$this->load->model('space/comment_model', 'comment_m');
		$this->comment_m->regex_face("瑞丽[杂志]，[kjasdf]本文说说如何将其中一种名为b8的开源实现集成进");
	}
	
	function download() {
		$this->load->model('space/comment_model', 'comment_m');
		$list = $this->comment_m->get_face_list();
		foreach($list as $v) {
			//var_export($v['face']);
			$file = basename($v['face']);
			$filename = substr($file, 0, strpos($file, "."));
			makeDirectory(FCPATH.'/public/data/images/face/general');
			downloadImage($v['face'], FCPATH.'/public/data/images/face/general/'.$filename);
		}
	}
	
	public function aaaa() {
		$this->load->model ( 'space/member_level_model', 'member_level_m' );
		$level = $this->member_level_m->get_level_by_credit ( 570 );
		var_export($level);
		exit;
	}
	
	public function get_m($uid = 0) {
		$this->load->library ( 'memcache_lib' );
		
		$key = $this->notice_postfix . 'sys_msg_pub_list';		
		$new_sys_msg_list = $this->memcache_lib->get ( $key );
		
		if (empty ( $new_sys_msg_list )) {
			echo "即时通知(缓存)不存在!". "<br />";
		} else {
			$new_last_mi_id = 0;
			if (is_array ( $new_sys_msg_list )) {
				foreach ( $new_sys_msg_list as $v ) {
					if ($new_last_mi_id < $v ['mi_id']) {
						$new_last_mi_id = $v ['mi_id'];
					}
				}
			}
			echo "系统最后一个通知ID：".$new_last_mi_id. "<br />";
		}		
		
		if($uid>0) {			
			$mi_id_key = $this->notice_postfix . 'last_miid_' . $uid;
			$last_cache_mi_id = intval ( $this->memcache_lib->get ( $mi_id_key ) );
			echo "用户[".$uid."]的最后一个(Memcahced)通知ID：".$last_cache_mi_id. "<br />";
			
			$this->load->model ( 'space/message_model', 'message_m' );
			$last_mi_id = $this->message_m->get_last_sysid_by_uid ( $uid );
			echo "用户[".$uid."]的最后一个(Mysql)通知ID：".$last_mi_id;
		}
		
	}
	
	public function add_rooms() {
		$redis = new redis();
		$redis->connect(REDIS_HOST,REDIS_PORT);
		
		for($i = 1000; $i<2000; $i++) {
			$redis->zAdd("rooms_test_100", rand(50000,100000), $i);
		}
		
		echo "##################";		
	}
	
	public function get_rooms($rid = 100) {
		$redis = new redis();
		$redis->connect(REDIS_HOST,REDIS_PORT);
	
		$list = $redis->zRange("rooms_test_100", 0, 100, true);
		
	    var_export($list);
		echo "##################";
	}
	

	public function avatar() {
		$avatar = "http://tp4.sinaimg.cn/1772890455/50/5641353221/1";
		$uid    = "153030";
		
		$targetPath = "public/data/images/header/".checkfolder($uid);
		if( !is_dir($targetPath) ){
	        mkdir($targetPath,0777,true);
		}
		
		$filename_big = 'avatar_big_'.$uid;
		$filename = $targetPath.$filename_big;
		$img_info = downloadImage($avatar, $filename);

        var_export($img_info);
		
		$posfix = "jpg";
		$filename_big = $img_info['filename'];
		$f = explode(".", $filename_big);
		if(isset($f[1])) {
			if($f[1] != "jpg") {
				copy($img_info['filepath']  ,$filename.".jpg");
				if (!file_exists($filename.".jpg")) {
					$posfix = $f[1];	
				}
			}		    
		}
		
		echo $posfix;
		
		$filename_middle = 'avatar_middle_'.$uid.'.'.$posfix;
		$result = saveThumbImg_ex($posfix,$targetPath,$filename_big,200,200);
		var_export($result);
		
		if (file_exists($targetPath.$filename_middle)) {
			unlink($targetPath.$filename_middle);
	    }
		rename($targetPath.'thumb_'.$filename_big, $targetPath.$filename_middle);
			
		$filename_small = 'avatar_small_'.$uid.'.'.$posfix;
		$result = saveThumbImg_ex($posfix,$targetPath,$filename_big,50,50);
		var_export($result);
		
		if (file_exists($targetPath.$filename_small)) {
		    unlink($targetPath.$filename_small);
	    }
		rename($targetPath.'thumb_'.$filename_big, $targetPath.$filename_small);
		
		echo avatar($uid, $posfix);
	}
	
	function cl_register() {			
		$data = array("user[username]"=>"coollive",
					  "user[email]"=>"coollive@labake.cn",
					  "user[password]"=>"bingle",
					  "user[password_confirmation]"=>"bingle",
					  "user[tos_version]"=>true
					  );
		$result = rcurl('http://www.coollive.com.cn/member/register', $data, "post");
		var_export($result);
		exit;
	}
	
	function cl_login() {			
		$data = array("user[email]"=>"coollive@labake.cn",
					  "user[password]"=>"bingle"
					  );
		$result = rcurl('http://www.coollive.com.cn/member/login', $data, "post");
		var_export($result);
		exit;
	}

}

?>