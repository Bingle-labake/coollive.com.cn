<?php
/**
 * 赛酷 反馈留言服务
 * ============================================================================
 *   
 * 
 * ============================================================================
 * $Author: Bingle $
 * $Id: Feedback.php 17171 2014-03-26 15:37:00Z Bingle $
*/
class Feedback extends S_Controller {
	
	/**
	* 构造函数
	*
	* @access  public
	* @return  mix
	*/	
	function __construct(){
		parent::__construct();	
		$this->load->library('memcache_lib');
	}
	
	//提交意见反馈
	public function todo() {
		$fuid = $this->uid;
		$type  = intval($this->input->get_post('type'));
		
		$desc  = urldecode($this->input->get_post('desc'));
		$desc  = addslashes(strip_tags($desc));
		$email = urldecode($this->input->get_post('email'));
		
		if(is_email($email)) {
			if($fuid > 0) {
				$refer = json_encode(array('ip'=>getFClientIp(), 'brower'=> $_SERVER['HTTP_USER_AGENT']));
				$key = MD5($fuid."_".$type."_".$refer);
				$key_value = $this->memcache_lib->get($key);
				if(empty($key_value)) {
					$this->load->model('space/question_model','question_m');
					$data = array('q_type'=>question_model::TYPE_FEEDBACK,
							'content' =>$desc,
							'q_cid '  =>$type,
							'uid'     =>$fuid,
							'email'   =>$email,
							'refer'   =>$refer,
							'record_time'=>time());
					$q_id = $this->question_m->save_feedback($data);
					if($q_id>0) {
						$res = array('code'=>1, 'msg'=>'');
						$this->memcache_lib->set($key, 1, 3600*24);
					}else {
						$res = array('code'=>$q_id, 'error'=>'提交失败！');
					}
				}else {
					$res = array('code'=>-3, 'error'=>'相同的问题已经提交，谢谢你的反馈！');
				}				
			}else {
				$res = array('code'=>-1, 'error'=>'你还没有登陆！');
			}
		}else {
			$res = array('code'=>-2, 'error'=>'你的邮箱格式异常！');
		}				
		$this->output($res);
	}
	
}
?>