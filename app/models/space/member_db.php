<?php
/**************************************************************************
 *   Path:   /model/space/member_db.php
*   Comments:   用户模型
*   Author: Zhang Lin
*   Last Modified:  01.19.2014 / Zhang Lin
**************************************************************************/
class member_db extends CI_Model {

	private $member = 'sk_member';
	private $profile = 'sk_member_profile';
	private $login_log = 'sk_member_login_log';
	private $video = 'sk_video';
	private $photo = 'sk_photo';
	private $sms_log = 'sk_sms_log';
    function __construct()
    {
        parent::__construct();
		$this->Ma = $this->load->database('default',TRUE);
		$this->Sl = $this->load->database('sda',TRUE);
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
     * 自动注册用户(第三方授权)
     * @param array $data
     * @return boolean
     */
    public  function auto_add_member($oid, $nickname, $avatar, $gender, $location, $refer = ""){
		$remember = 1;
		
		$password = "";
		$id = random(6);
		$authstr = $id.'|2|'.time();
		$salt = substr(uniqid(rand()), -6);
		
		$data['username']    = "cl_".substr(MD5($authstr), 8,16);
		$data['nickname']    = $nickname;
		$data['password']    = md5(md5($password).$salt);
		$data['avatar']      = $avatar;
		$data['salt']        = $salt;
		$data['authstr']     = $authstr;
		$data['email']       = $data['username'] ."@labake.cn";
		$data['emailstatus'] = 1;
		$data['status']      = 1;
		
		$data['regdate']     = time();
		$data['type']        = 0;
		$data['groupid']     = 1;
		$data['lid']         = 1;
		$data['regip']       = get_client_ip();
		$uid = $this->add_member($data);
		if($uid > 0) {
			if($refer == "qq") {
				//$avatar = "http://qzapp.qlogo.cn/qzapp/101208067/44AD4A97EBE5A734FCF3A6AD7D18515B/100";
			}elseif($refer == "sina" || $refer == "weibo") {
				//$avatar = "http://tp4.sinaimg.cn/1772890455/180/5641353221/1";
			}
			$this->auto_save_avatar($uid, $avatar);				
			$this->update_users(array('authstr' => $authstr),array('uid' => $uid));
			if (!empty($oid)) {//绑定至第三方
			    $this->load->model('space/oauth_db','oauth_m');
				$this->oauth_m->update_oauth(array('oid'=>$oid),array('uid'=>$uid,'is_bind'=>1));
				$this->update_users(array('type' => 2),array('uid' => $uid));
				$this->save_login_state($uid, $data['username']);
			}	
			//存入SESSION
			$_SESSION['reg_email'] = $data['email'];
			$_SESSION['reg_username'] = $data['username'];
			
			$loginfield = array('username'=>$data['username']);
  	  	    $user = $this->get_user(array('uid','username','email','password','salt','emailstatus','mobilestatus','status','type'),$loginfield);
  	  	    if (!empty($user) && ($user['password'] == md5(md5($password).$user['salt']))) {
  	  	  	     $this->save_login_state($user['uid'],$user['username'],$remember);
  	  	  	     $this->save_login_passport($passport);
  	  	  	     //更新登录时间及IP
  	  	  	     $this->update_users(array('lastloginip'=>get_client_ip(),'lastlogintime'=>time()),array('uid'=>$user['uid']));
  	  	  	     //添加登录日志
  	  	  	     $this->add_login_log(array('uid'=>$user['uid'],'ip'=>get_client_ip(),'fromurl'=>$this->input->post('referer',true),'logintime'=>time()));  
				 
				 return true;
  	  	    }	  
		}
		return false;
    }
	
	
	/**
     * 自动下载第三方图片
     * @param array $data
     * @return boolean
     */
	private function auto_save_avatar($uid, $avatar) {
		$targetPath = "public/data/images/header/".checkfolder($uid);
		if( !is_dir($targetPath) ){
	        mkdir($targetPath,0777,true);
		}
		
		$filename_big = 'avatar_big_'.$uid;
		$filename = $targetPath.$filename_big;
		$img_info = downloadImage($avatar, $filename);		
		/*
		$img_info['filepath'] = "";
		$img_info['width'] = "";
		$img_info['height'] = "";
		$img_info['orginalfilename'] = "";
		$img_info['filename'] = "";
		$img_info['mime'] = "";
		$img_info['size'] = "";		
		*/			
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
		
		$filename_middle = 'avatar_middle_'.$uid.'.'.$posfix;
		$result = saveThumbImg_ex($posfix,$targetPath,$filename_big,200,200);
		
		if (file_exists($targetPath.$filename_middle)) {
			unlink($targetPath.$filename_middle);
	    }
		rename($targetPath.'thumb_'.$filename_big, $targetPath.$filename_middle);
			
		$filename_small = 'avatar_small_'.$uid.'.'.$posfix;
		$result = saveThumbImg_ex($posfix,$targetPath,$filename_big,50,50);
		if (file_exists($targetPath.$filename_small)) {
		    unlink($targetPath.$filename_small);
	    }
		rename($targetPath.'thumb_'.$filename_big, $targetPath.$filename_small);
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
		return $this->Ma->where($where)->update($this->profile,$data);
    }
    
    /**
     * 获取用户资料
     * @param int $uid
     * @return array
     */
    public function get_profile($uid,$field = array('*')){
    	if ($uid) {
			return $this->Sl->select($field)->get_where($this->profile,array('uid'=>$uid))->row_array();
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
		return $this->Ma->where($where)->update($this->member,$data);
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
		return $this->Sl->select($field)->get_where($this->member,$where)->row_array();
    }
    
    /**
     * 获取单个用户的基本信息
     * @param array $field
     * @param array $where
     * @return array
     */
    public function get_user_by_uid($uid, $fields = "uid, username, avatar, groupid, lid,status"){
		return $this->Sl->select($fields)->get_where($this->member,array('uid'=>$uid))->row_array();
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
    
    //获取该用户组的用户ID
    public function get_uids_by_gid($groupid, $page = 1, $size = 10) {
    	$offset = ($page-1)*$size;
    	if($groupid>0) {
    		$sql = "SELECT uid FROM ". $this->member. " where groupid = $groupid order by uid asc limit $offset, $size";
    		return $this->Sl->query($sql)->result_array();    		
    	}else {
    		return false;
    	}
    }
    
    /**
     * 短信验证码验证
     * @param string $mobile
     * @param string $sms
     * @param string $source
     * @return boolean
     */
    public function check_sms_validate($mobile,$sms,$source){
    	$smslog = $this->get_sms_log($mobile,$source);
    	if (empty($smslog) || $smslog['sms'] != $sms || time()-$smslog['sendtime']>60) {
    		return false;
    	}else {
    		return true;
    	}
    }
}
?>