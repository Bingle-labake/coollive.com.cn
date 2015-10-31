<?php
/**************************************************************************
 *   Path:   /model/space/team_db.php
*   Comments:   社团模型
*   Author: Zhang Lin
*   Last Modified:  02.25.2014 / Zhang Lin
**************************************************************************/
class Team_db extends K_Model {

	private $team = 'sk_team';
	private $team_member = 'sk_team_member';
	private $member = 'sk_member';
	private $works_index = 'sk_works_index';
	private $video = 'sk_video';
	private $photo = 'sk_photo';
	private $game = 'sk_game';
	private $sign = 'sk_sign';
    function __construct()
    {
        parent::__construct();
    }
    
    /**
     * 注册社团信息初始化
     * @param array $data
     * @return int
     */
    public function add_team($data){
    	$this->db = K_Model::getInstanceDb(true);
    	return $this->add($data,'tid',$this->team);
    }
    
    /**
     * 添加成员
     * @param array $data
     * @return int
     */
    public function add_team_member($data){
    	$this->db = K_Model::getInstanceDb(true);
    	return $this->add($data,'id',$this->team_member);
    }
    
    /**
     * 是否为社团
     * @param int $uid
     * @return boolean
     */
    public function is_team($uid){
    	$this->db = K_Model::getInstanceDb(false);
    	$team = $this->getRow(array('uid'=>$uid),array('tid'),$this->team);
    	return !empty($team) ? true : false;
    }
    /**
     * 获取某个社团信息
     * @param array $where
     * @param array $field
     * @return array
     */
    public function get_team($where,$field = array()){
    	$this->db = K_Model::getInstanceDb(false);
    	return $this->getRow($where,$field,$this->team);
    }
    
    /**
     * 获取所有社团
     * @param string $where
     * @param int $page 页码
     * @param int $size 分页大小
     * @param bool $is_count 是否统计总数
     * @return array
     */
    public function get_all_team($page = 1,$size = 10,$where = '',$is_count = true){
    	$this->db = K_Model::getInstanceDb(false);
    	$offset = ($page-1)*$size;
    	$sql = "select * from $this->team $where order by create_time desc limit $offset,$size";
    	$result['list'] = $this->db->query($sql)->result_array();
    	if ($is_count && !empty($result['list'])) {
    		$sql = "select count(*) as count from $this->team $where";
    		$result_c = $this->db->query($sql)->result_array();
    		$result['count'] = $result_c[0]['count'];
    	}else {
    		$result['count'] = 0;
    	}
    	$this->db->query($sql)->free_result();
    	return $result;
    }
    
    /**
     * 更新社团信息
     * @param array $where
     * @param array $field
     * @return array
     */
    public function update_team($where,$field){
    	$this->db = K_Model::getInstanceDb(true);
    	return  $this->update($where,$field,$this->team);
    }
    
     /**
     * 获取单个成员信息
     * @param array $where
     * @param array $field
     * @return array
     */
    public function get_team_member($where,$field){
    	$this->db = K_Model::getInstanceDb(false);
    	return  $this->getRow($where,$field,$this->team_member);
    }
    
    /**
     * 删除成员信息
     * @param array $where
     * @param array $field
     * @return array
     */
    public function del_team_member($where){
    	$this->db = K_Model::getInstanceDb(true);
    	return  $this->del($where,$this->team_member);
    }
    
    /**
     * 更新社团人数
     * @param int $tid
     * @param bool $is_add
     * @return boolean
     */
    public function inc_team_num($tid,$is_add = true) {
    	if($tid) {
    		$this->db = K_Model::getInstanceDb(true);
    		$flag = 1;
    		if(!$is_add) {
    			$flag = -1;
    		}
    		$sql = 'update '.$this->team.' set team_num = team_num+'.$flag.' where tid='.$tid;
    		return $this->db->query($sql);
    	}else {
    		return false;
    	}
    }
    
    /**
     * 获取某个社团所有成员
     * @param int $tid 社团tid
     * @param int $page 页码
     * @param int $size 分页大小
     * @param bool $is_count 是否统计总数
     * @return array
     */
    public function get_team_all_members_by_tid($tid,$page = 1,$size = 10,$is_count = true){
    	$this->db = K_Model::getInstanceDb(false);
    	$offset = ($page-1)*$size;
    	$sql = "select b.tid,b.uid,c.username from $this->team a left join $this->team_member b on a.tid=b.tid left join $this->member c 
    	               on b.uid=c.uid where b.tid=$tid and b.status=1 order by add_time desc limit $offset,$size";
    	$result['list'] = $this->db->query($sql)->result_array();
    	if ($is_count && !empty($result['list'])) {
    		$sql = "select count(*) as count from $this->team_member where tid=$tid and status=1";
    		$result_c = $this->db->query($sql)->result_array();
    		$result['count'] = $result_c[0]['count'];
    	}else {
    		$result['count'] = 0;
    	}
    	$this->db->query($sql)->free_result();
    	return $result;
    }
    
    /**
     * 获取所有社团的成员
     * @param int $page 页码
     * @param int $size 分页大小
     * @param string $where
     * @param bool $is_count 是否统计总数
     * @return array
     */
    public function get_team_all_members($page = 1,$size = 10,$where,$is_count = true){
    	$this->db = K_Model::getInstanceDb(false);
    	$offset = ($page-1)*$size;
    	$sql = "select a.uid,b.username from $this->team_member a left join $this->member b
    	        on a.uid=b.uid where a.status=1 and founder=0 $where group by a.uid order by add_time desc limit $offset,$size";
    	$result['list'] = $this->db->query($sql)->result_array();
    	if ($is_count && !empty($result['list'])) {
    		$sql = "select count(*) as count from $this->team_member a left join $this->member b
    	            on a.uid=b.uid where a.status=1 and founder=0 $where group by a.uid";
    		$result_c = $this->db->query($sql)->result_array();
    		$result['count'] = $result_c[0]['count'];
    	}else {
    		$result['count'] = 0;
    	}
    	$this->db->query($sql)->free_result();
    	return $result;
    }
    
    /**
     * 更新社团成员信息
     * @param string $where
     * @param string $field
     * @return boolean
     */
    public function update_team_member($where,$field){
    	if (!empty($where) && !empty($field)) {
    		$this->db = K_Model::getInstanceDb(true);
    		$sql = "update $this->team_member set $field where $where";
    		return $this->db->query($sql);
    	}else {
    		return false;
    	}
  
    }
    
    /**
     * 获取某个社团的视频
     * @param int $tid 社团tid
     * @param bool $is_sign 是否为参赛作品
     * @param int $page 页码
     * @param int $size 每页大小
     * @param bool $is_count 是否统计总数
     * @return array
     */
    public function get_team_works($uid,$is_sign = true,$page = 1,$size = 10,$is_count = true){ 
    	if ($uid) {
    		$this->db = K_Model::getInstanceDb(false);
    		$offset = ($page-1)*$size;
    		$sql = "select a.wid,b.title,b.image,b.id from $this->works_index a left join $this->video b on a.wid=b.id
    		        left join $this->game c on a.gid=c.id where a.uid=$uid and a.wid>0 and wtype=1 and a.status=1 order by b.adddate desc limit $offset,$size";
    		$result['list'] = $this->db->query($sql)->result_array();
    		if ($is_count && !empty($result['list'])) {
    			
    			$sql = "select count(*) as count from $this->works_index where uid=$uid and wid>0 and wtype=1 and status=1";
    			$result_c = $this->db->query($sql)->result_array();
    			$result['count'] = $result_c[0]['count'];
    		}else {
    			$result['count'] = 0;
    		}
    		$this->db->query($sql)->free_result();
    		return $result;
    	}else {
    		return array();
    	}
    }
    
    /**
     * 获取某个社团的图片
     * @param int $tid 社团tid
     * @param bool $is_sign 是否为参赛作品
     * @param int $page 页码
     * @param int $size 每页大小
     * @param bool $is_count 是否统计总数
     * @return array
     */
    public function get_team_works_pic($uid,$is_sign = true,$page = 1,$size = 10,$is_count = true){
    	if ($uid) {
    		$this->db = K_Model::getInstanceDb(false);
    		$offset = ($page-1)*$size;
    		$sql = "select  b.title,b.pic_name,b.id,c.path from $this->works_index a left join $this->photo b on a.wid=b.id
    		        left join $this->game c on a.gid=c.id where a.uid=$uid and a.wid>0 and wtype=2 and a.status=1 order by b.adddate desc limit $offset,$size";
    		$result['list'] = $this->db->query($sql)->result_array();
    		if ($is_count && !empty($result['list'])) {
    			$sql = "select count(*) as count from $this->works_index where uid=$uid and wid>0 and wtype=2 and status=1";
    			$result_c = $this->db->query($sql)->result_array();
    			$result['count'] = $result_c[0]['count'];
    		}else {
    			$result['count'] = 0;
    		}
    		$this->db->query($sql)->free_result();
    		return $result;
    	}else {
    		return array();
    	}
    }
    
    /**
     * 更新社团作品信息
     * @param string $where
     * @param string $field
     * @return boolean
     */
    public function update_team_works($where,$field){
    	if (!empty($where) && !empty($field)) {
    		$this->db = K_Model::getInstanceDb(true);
    		$sql = "update $this->works_index set $field where $where";
    		return $this->db->query($sql);
    	}else {
    		return false;
    	}
        
    }
    
    /**
     * 获取社团参加的所有比赛的开始时间
     * @param int $tid 社团tid
     * @return array
     */
    public function get_game_starttime($tid){
    	$this->db = K_Model::getInstanceDb(true);
    	$sql = "select b.starttime,b.endtime from $this->sign a left join $this->game b on a.gid=b.id where a.tid=$tid";
    	$data = $this->db->query($sql)->result_array();
    	$this->db->query($sql)->free_result();
    	return $data;
    }
    
    //获取该团队的用户ID
    public function get_uids_by_tid($tid, $page = 1, $size = 10) {
    	$offset = ($page-1)*$size;
    	if($tid>0) {
    		$sql = "SELECT uid FROM ". $this->team. " where tid = $tid order by tid asc limit $offset, $size";
    		return $this->Sl->query($sql)->result_array();
    	}else {
    		return false;
    	}
    }
    
}
?>