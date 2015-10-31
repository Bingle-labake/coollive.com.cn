<?php
/**************************************************************************
 *   Path:   /model/space/member_db.php
*   Comments:   用户模型
*   Author: Zhang Lin
*   Last Modified:  01.19.2014 / Zhang Lin
**************************************************************************/
class member_model extends CI_Model {

	private $member = 'sk_member';
	private $profile = 'sk_member_profile';
	private $login_log = 'sk_member_login_log';
	private $college = 'sk_college';
	private $works_index = 'sk_works_index';
	private $video = 'sk_video';
	private $photo = 'sk_photo';
	private $game = 'sk_game';
	private $team = 'sk_team';
	private $team_member = 'sk_team_member';
	private $sms_log = 'sk_sms_log';
	private $straight_voting ='sk_straight_voting';
	private $member_pk = 'sk_member_pk';
    function __construct()
    {
        parent::__construct();
		$this->Ma = $this->load->database('default',TRUE);
		$this->Sl = $this->load->database('default',TRUE);
    }
    
    /**
     * 添加用户
     * @param array $data
     * @return boolean
     */
    public  function add_member($data){
        $sql = $this->Ma->insert_string($this->member,$data);
        $result = $this->Ma->query($sql);
        if ($result) {
        	return @mysql_insert_id($this->Ma->conn_id);
        }else{
        	return false;
        }
    }
    
    /**
     * 添加用户资料
     * @param array $data
     * @return boolean
     */
    public  function add_member_profile($data){
    	$sql = $this->Ma->insert_string($this->profile,$data);
    	$result = $this->Ma->query($sql);
    	return $result ? true : false;
    }
    
    /**
     * 更新用户资料
     * @param array $data
     * @param array $where
     * @return boolean
     */
    public function update_profile($data,$where){
    	$result = $this->myUpdate($this->profile,$data,$where);
    	return $result;
    }
    
    /**
     * 获取用户资料
     * @param int $uid
     * @return array
     */
    public function get_profile($uid){
    	if ($uid) {
    		$sql = "select a.username,a.email,b.*,c.colname from $this->member a left join $this->profile b
									    		on a.uid=b.uid left join $this->college c
									    		on b.colid=c.colid where a.uid=$uid
		    		";
    		$data = $this->Sl->query($sql)->result_array();
    		$this->Sl->query($sql)->free_result();
    		return !empty($data) ? $data[0] : array();
    	}else {
    		return array();
    	}
    }
    
    /**
     * 更新用户表
     * @param array $data
     * @param array $where
     * @return boolean
     */
    public function update_users($data,$where){
    	$result = $this->myUpdate($this->member,$data,$where);
    	return $result;
    }
    
    /**
     * 获取激活或找回密码字符串
     * @param int $uid
     * @return array
     */
    public function get_authstr($uid){
    	$result = $this->getOne(array('authstr'),array('uid'=>$uid),$this->member);
    	return $result;
    }
    
    /**
     * 获取单个用户信息
     * @param array $field
     * @param array $where
     * @return array
     */
    public function get_user($field,$where){
    	$user = $this->getOne($field,$where,$this->member);
    	return $user;
    }
    
    /**
     * 获取用户名
     * @param int $uid
     * @return array
     */
    public function get_username($uid){
    	$user = $this->get_user(array('username'),array('uid'=>$uid));
    	return !empty($user) ? $user['username'] : '';
    }
    
    /**
     * 获取用户历史总积分/当前积分
     * @param int $uid
     * @param int $type 1:历史总积分;2:当前积分
     * @return int
     */
    public function get_credit($uid,$type = 1){
    	$field = $type == 1 ? array('hcredits') : array('credits');
    	if (empty($uid)) {
    		return array();
    	}else {
    		$where = array('uid' => $uid);
    		$credit = $this->getOne($field, $where, $this->member);
    		return $credit;
    	}
    }
    
    /**
     * 更新用户等级
     * @param int $uid
     * @param int $gid
     * @return boolean
     */
    public function update_gid($uid,$gid){
    	if (empty($uid)) {
    		return false;
    	}else {
    		$data = array('groupid' => $gid);
    		$where = array('uid' => $uid);
    		$result = $this->myUpdate($this->member, $data, $where);
    		return $result ? true : false;
    	}
    }
    
    /**
     * 更新用户级别
     * @param int $uid
     * @param int $lid
     * @return boolean
     */
    public function update_level_id($uid,$lid){
    	if (empty($uid)) {
    		return false;
    	}else {
    		$data = array('lid' => $lid);
    		$where = array('uid' => $uid);
    		$result = $this->myUpdate($this->member, $data, $where);
    		return $result ? true : false;
    	}
    }
    
    
    /**
     * 用户统计字段累加
     * @param int $uid
     * @param array $field 更新的字段及值 array('credits'=>1,'hcredits'=>1);
     * @return bool
     */
    public function inc_val($uid,$field){
    	if (!empty($uid) && !empty($field)) {
    		  if (!is_array($field)) {
    		  	  return false;
    		  }else {
    		  	  $tmp = array();
    		  	  foreach ($field as $k=>$v){
    		  	  	  $tmp[] = $k.'='.$k.'+'.$v;
    		  	  }
    		  	  $set = implode(',', $tmp);
    		  	  $sql = "UPDATE $this->member SET $set WHERE uid=$uid";
    		  	  $result = $this->Ma->query($sql);
    		  	  return $result ? true : false;
    		  }
    	}else {
    		return false;
    	}
    }
    
    /**
     * 获取某个用户所有的视频/参赛视频
     * @param int $uid 用户uid
     * @param bool $is_sign 是否为参赛视频
     * @param int $page 页码
     * @param int $size 每页大小
     * @param bool $is_count 是否统计总数
     * @return array
     */
    public function get_user_works_video($uid,$is_sign = true,$page = 1,$size = 10,$is_count = true){
    	if ($uid) {
    		$offset = ($page-1)*$size;
    		$sql = "select a.wid,b.id,b.title,b.image,c.path from $this->works_index a left join $this->video b on a.wid=b.id
    		        left join $this->game c on a.gid=c.id where a.uid=$uid and a.wid>0 and a.wtype=1 and a.status=1 order by b.adddate desc limit $offset,$size";
    		$result['list'] = $this->Sl->query($sql)->result_array();
    		if ($is_count && !empty($result['list'])) {
    			 
    			$sql = "select count(*) as count from $this->works_index where uid=$uid and wid>0 and status=1";
    			$result_c = $this->Sl->query($sql)->result_array();
    			$result['count'] = $result_c[0]['count'];
    		}else {
    			$result['count'] = 0;
    		}
    		$this->Sl->query($sql)->free_result();
    		return $result;
    	}else {
    		return array();
    	}
    }
    
    /**
     * 获取某个用户所有的图片/参赛图片
     * @param int $uid 用户uid
     * @param bool $is_sign 是否为参赛图片
     * @param int $page 页码
     * @param int $size 每页大小
     * @param bool $is_count 是否统计总数
     * @return array
     */
    public function get_user_works_pic($uid,$is_sign = true,$page = 1,$size = 10,$is_count = true){
    	if ($uid) {
    		$offset = ($page-1)*$size;
    		$sql = "select b.id,b.title,b.pic_name,c.path from $this->works_index a left join $this->photo 
    		        b on a.wid=b.id left join $this->game c on a.gid=c.id
    		        where a.uid=$uid and a.wid>0 and a.wtype=2 and a.status=1 order by b.adddate desc limit $offset,$size";
    		$result['list'] = $this->Sl->query($sql)->result_array();
    		if ($is_count && !empty($result['list'])) {
    
    			$sql = "select count(*) as count from $this->works_index where uid=$uid and wid>0 and wtype=2 and status=1";
    			$result_c = $this->Sl->query($sql)->result_array();
    			$result['count'] = $result_c[0]['count'];
    		}else {
    			$result['count'] = 0;
    		}
    		$this->Sl->query($sql)->free_result();
    		return $result;
    	}else {
    		return array();
    	}
    }
    
    /**
     * 获取某个用户加入的社团
     * @param int $uid
     * @return array
     */
    public function get_user_team($uid){
    	if ($uid) {
    		$sql = "select b.tid,b.name,b.uid from $this->team_member a left join $this->team b on a.tid=b.tid where a.uid=$uid";
    		$teams = $this->Sl->query($sql)->result_array();
    		$this->Sl->query($sql)->free_result();
    		return $teams;
    	}else {
    		return array();
    	}
    }
    
    /**
     * 添加登录日志
     * @param array $data
     * @return boolean
     */
    public function add_login_log($data){
    	$sql = $this->Ma->insert_string($this->login_log,$data);
    	$result = $this->Ma->query($sql);
    	if ($result) {
    		return @mysql_insert_id($this->Ma->conn_id);
    	}else{
    		return false;
    	}
    }
    
    /**
     * 添加短信验证码记录
     * @param array $data
     * @return boolean
     */
    public function add_sms_log($data){
    	$sql = $this->Ma->insert_string($this->sms_log,$data);
    	$result = $this->Ma->query($sql);
    	if ($result) {
    		return true;
    	}else{
    		return false;
    	}
    }
    
    /**
     * 更新短信验证码记录
     * @param array $data
     * @param array $where
     * @param bool $is_refresh 统计次数是否归零
     * @return boolean
     */
    public function update_sms_log($data,$where,$is_refresh = false){
    	if (!empty($data) && !empty($where)) {
    		$count_set = !$is_refresh ? "count=count+1" : "count=0";
    		$sql = "update $this->sms_log set $count_set,sms=$data[sms],sendtime=$data[sendtime] where mobile=$where[mobile] and source='$where[source]'";
    		$result = $this->Ma->query($sql);
    		return $result ? true : false;
    	}else {
    		return false;
    	}
    }
    
    /**
     * 获取短信验证码记录
     * @param string $mobile
     * @param string $source
     * @return array
     */
    public function get_sms_log($mobile,$source){
    	return $this->getOne(array('sms','count','sendtime'), array('mobile'=>$mobile,'source'=>$source), $this->sms_log);
    }
    
    /**
     * 删除短信验证码记录
     * @param string $mobile
     * @param string $source
     * @return boolean
     */
    public function del_sms_log($mobile,$source){
    	$sql = "delete from $this->sms_log where mobile='$mobile' and source='$source'";
    	$result = $this->Ma->query($sql);
    	return $result ? true : false;
    }
    
    
    /**
     * 获取直投票记录
     * @param int $uid
     * @param string $refer
     * @return array
     */
    public function get_straight_voting_log($uid,$refer){
    	$sql = "select * from $this->straight_voting where uid=$uid and refer='$refer'";
    	$log = $this->Sl->query($sql)->result_array();
    	$this->Sl->query($sql)->free_result();
    	return $log;
    }
    
    /**
     *获取评委积分及准确率
     *@param int $uid
     *@return int 
     */
    public function get_rater_credit($uid){
    	$rater_credit = $this->getOne(array('rater_credit','right_rate'), array('uid'=>$uid), $this->member_pk);
    	return !empty($rater_credit) ? $rater_credit : array('rater_credit'=>0,'right_rate'=>0);
    }
    
    
    
    /**
     * 获取单条信息
     * @param array $field
     * @param array $where
     * @param string $table
     * @return array
     */
    private function getOne($field,$where,$table){
       if (!empty($field)) {
    			$field = implode(',', $field);
    		}else {
    			$field = '*';
    	}
    	
    	if (!empty($where)) {
    		foreach ($where as $k=>$v){
    			$w[] = $k.'='."'$v'";
    		}
    		$where = 'WHERE '.implode(' AND ', $w);
    	}else {
    		$where = '';
    	}
    	$sql = "SELECT $field FROM $table $where";
    	$data = $this->Sl->query($sql)->result_array();
    	$this->Sl->query($sql)->free_result();
    	return !empty($data) ? $data[0] : array();
    }
    
    /**
     * 更新
     * @param array $data
     * @param array $where
     * @param string $table
     * @return boolean
     */
    private function myUpdate($table,$data,$where){
    	if (!empty($data)) {
    		foreach ($data as $k=>$v){
    			$d[] = $k.'='."'$v'";
    		}
    		$data = implode(',', $d);
    		if (!empty($where)) {
    			foreach ($where as $k=>$v){
    				$w[] = $k.'='."'$v'";
    			}
    			$where = 'WHERE '.implode(' AND ', $w);
    		}else {
    			$where = '';
    		}
    		$sql = "UPDATE $table SET $data $where";
    		$result = $this->Ma->query($sql);
    		return $result ? true : false;
    	}else {
    		return false;
    	}
    }
}
?>