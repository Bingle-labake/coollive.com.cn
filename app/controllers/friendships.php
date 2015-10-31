<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**************************************************************************
*   Path:   /Friendships.php
*   Home:   直播-首页
*   Author: Bingle
*   Last Modified:  10.29.2014
**************************************************************************/
class Friendships extends Live_Controller {
	protected $period = 1;
	protected $activity_name = "";

	function __construct()
	{
		parent::__construct();	
		
		$this->load->helper('page_helper');
		$this->load->model('space/member_db','member_m');
		$this->load->model('relation_model','relation_m');
		$this->load->model('space/message_model','message_m');
		$this->lang->load('relation','cnZH');
		
	}
	
	//关注
	public function following() {
		$uid = intval($this->input->get_post('uid',true));
		if (!$uid) {
			exit(json_encode(array('status'=>-1,'msg'=>$this->lang->line('follow_user_not_exists'))));//uid有误
		}else {
			if ($uid == $this->uid) {
				exit(json_encode(array('status'=>-2,'msg'=>$this->lang->line('disallow_to_follow_self'))));//不能关注自己
			}
			$follow_uinfo = $this->member_m->get_user(array('uid'),array('uid'=>$uid));
			if (empty($follow_uinfo)) {
				exit(json_encode(array('status'=>-3,'msg'=>$this->lang->line('follow_user_not_exists'))));//用户不存在
			}else {
				$follow = $this->relation_m->get_follow_by_uid(array('uid'=>$this->uid,'fuid'=>$uid),array('status'));
				if (!empty($follow)) {
					if ($follow['status'] == 1) {
						exit(json_encode(array('status'=>-4,'msg'=>$this->lang->line('followers_exists'))));//已关注过
					}else {//重新关注
						$fans = $this->relation_m->get_follow_by_uid(array('uid'=>$uid,'fuid'=>$this->uid,'status'=>1));
						$field = !empty($fans) ? array('status'=>1) : array('status'=>1,'type'=>1);
						if (!empty($fans)) {//已经是粉丝
							$result1 = $this->relation_m->update_relation(array('uid'=>$this->uid,'fuid'=>$uid),array('status'=>1,'type'=>1));
						    $result2 = $this->relation_m->update_relation(array('uid'=>$uid,'fuid'=>$this->uid),array('type'=>1));
						    $result = $result1 && $result2 ? true : false;
						}else {
							$result = $this->relation_m->update_relation(array('uid'=>$this->uid,'fuid'=>$uid),array('status'=>1));
						}
						//更新关系缓存
						$result && $this->relation_m->update_relation_cache($this->uid,$uid);
					}
				}else {
					$fans = $this->relation_m->get_follow_by_uid(array('uid'=>$uid,'fuid'=>$this->uid,'status'=>1));
					if (!empty($fans)) {//已经是粉丝
						$result1 = $this->relation_m->add_follow(array('uid'=>$this->uid,'fuid'=>$uid,'dateline'=>time(),'type'=>1));
						$result2 = $this->relation_m->update_relation(array('uid'=>$uid,'fuid'=>$this->uid),array('type'=>1));
						$result = $result1 && $result2 ? true : false;
					}else {
						$result = $this->relation_m->add_follow(array('uid'=>$this->uid,'fuid'=>$uid,'dateline'=>time()));
					}
				}
				if ($result) {
					//发送消息通知
					$this->message_m->send_msg($this->uid,$uid,Message_model::FOLLOW_BE,$uid);
					$relation = $this->relation_m->get_follow_by_uid(array('uid'=>$this->uid,'fuid'=>$uid,'`status`'=>1),array('type'));
					$type = isset($relation['type']) ? $relation['type'] : 0;
					exit(json_encode(array('status'=>0,'msg'=>$this->lang->line('follow_success'),'type'=>$type)));//关注成功
				}else {
					exit(json_encode(array('status'=>-5,'msg'=>$this->lang->line('follow_failed'))));//关注失败
				}
			}
		}
		
		echo '{"success":"","formats":["html"],"layout":false}';
	}
	
	//取消关注
	public function unfollow() {
		$uids = $this->input->get_post('uids',true);
		if (empty($uids)) {
			exit(json_encode(array('status'=>-1,'msg'=>$this->lang->line('unfollow_user_not_exists'))));//uid有误
		}else {
			$uidarr = explode(',', $uids);
			foreach ($uidarr as $u){
				$result[] = $this->relation_m->unfollow($this->uid,$u) ? 1 : 0;
			}
			if (!in_array(0, $result)) {
				exit(json_encode(array('status'=>0,'msg'=>$this->lang->line('unfollow_success'))));//取消关注成功
			}else {
				exit(json_encode(array('status'=>-3,'msg'=>$this->lang->line('unfollow_failed'))));//取消关注失败
			}
		}
	}
	
	
	
	/**
     * 首页
     */
    public function profile(){
        echo "";
    } 
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
