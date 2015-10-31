<?php
/**************************************************************************
 *   Path:   /model/relation_model.php
*   Comments:   关注/粉丝模型
*   Author: Zhang Lin
*   Last Modified:  04.24.2014 / Zhang Lin
**************************************************************************/
class Relation_model extends CI_Model{

	private $member_follow = 'sk_member_follow';
	private $master;
	private $slave;

    function __construct()
    {
        parent::__construct();
		$this->master 	= $this->load->database('default',TRUE);
		$this->slave 	= $this->load->database('default',TRUE);
    }
    
    /**
     * 添加关注
	 * @param int $uid 关注用户id
	 * @param int $to_uid 被关注用户id
     * @return boolean
     */
    public function add_follow($uid = NULL,$fuid = NULL){
		if(empty($uid) || empty($fuid))
			return -1;

		//检查是否已经关注过该用户
		$info = $this->slave->get_where($this->member_follow,array('uid'=>$uid,'fuid'=>$fuid))->row_array();
		if(!empty($info))
			return -2;

		//检查两者是否为互相关注
		$followInfo = $this->slave->select('uid,fuid')->get_where($this->member_follow,array('fuid'=>$uid,'uid'=>$fuid))->row_array();
		if(empty($followInfo)){
			$type = 0;
		}else{
			//修改记录的type为1标注为相互关注了
			$this->setType($followInfo['uid'],$followInfo['fuid'],1);
			$type = 1;
		}

		$data = array(
			'uid' => $uid,
			'fuid'=> $fuid,
			'dateline' => time(),
			'type' => $type,
		);
		return $this->master->insert($this->member_follow,$data);
    }

	/*
	 * 修改type字段
	 */
	private function setType($uid,$fuid,$type){
		return $this->slave->where(array('uid'=>$uid,'fuid'=>$fuid))->update($this->member_follow,array('type'=>$type));
	}
    
    /**
     * 获取关注某个人的记录
     * @param array $where
     * @param array $field
     * @return array
     */
    public function get_follow_by_uid($where,$field = array()){
    	$this->db = K_Model::getInstanceDb(false);
		$data = $this->slave->select($field)->get_where($this->member_follow,$where);
    	return !empty($data) ? $data : array();
    }
    
    /**
     * 取消关注
     * @param int $uid
     * @param int $fuid
     * @return boolean
     */
    public function unfollow($uid,$fuid){
		$rs = $this->master->delete($this->member_follow,array('uid'=>$uid,'fuid'=>$fuid));
		if($rs){
			//修改双向关注
			$this->setType($fuid,$uid,0);
		}
		return $rs;
    }
    
    /**
     * 获取某个用户的关注列表
     * @param int $uid
     * @param int $page
     * @param int $pagesize
     * @return array
     */
    public function follow_list($uid,$page,$pagesize = 20){
		/* 计算页数 */
		$num = $this->follow_num($uid);
		$count = ceil($num / $pagesize);
		if($page > $count)
			$page = 1;
		$offset = ($page-1)*$pagesize;

		$list = $this->slave->select('fuid as uid,type as is_follow_each')->where('uid',$uid)->get($this->member_follow,$pagesize,$offset)->result_array();
		if(!empty($list)){
			$this->load->model('space/member_db');
			//查找用户数据
			foreach($list as $k=>&$l){
				$info = $this->member_db->get_user_by_uid($l['uid'],'username');
				if(empty($info)){
					unset($list[$k]);
				}else{
					$l['username'] = $info['username'];
				}
			}
			$list['count'] = $count;
		}
		return $list;
    }
    
    /**
     * 获取某个用户的粉丝列表
     * @param int $uid
     * @param int $page
     * @param int $pagesize
     * @param array $where
     * @return array
     */
    public function fans_list($uid,$page,$pagesize = 20){
		/* 计算页数 */
		$num = $this->fans_num($uid);
		$count = ceil($num / $pagesize);
		if($page > $count)
			$page = 1;
		$offset = ($page-1)*$pagesize;

		$list = $this->slave->select('uid,type as is_follow_each')->where('fuid',$uid)->get($this->member_follow,$pagesize,$offset)->result_array();
		if(!empty($list)){
			$this->load->model('space/member_db');
			//查找用户数据
			foreach($list as $k=>&$l){
				$info = $this->member_db->get_user_by_uid($l['uid'],'username');
				if(empty($info)){
					unset($list[$k]);
				}else{
					$l['username'] = $info['username'];
				}
			}
			$list['count'] = $count;
		}
		return $list;
    }

	/*
	 * 用户粉丝数
	 */
	public function fans_num($uid){
		return $this->slave->where(array('fuid'=>$uid))->count_all_results($this->member_follow);
	}

	/*
	 * 用户关注数
	 */
	public function follow_num($uid){
		return $this->slave->where(array('uid'=>$uid))->count_all_results($this->member_follow);
	}
    
}
?>