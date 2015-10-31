<?php
/**
 * saiku 会员组（等级）模块模块
 * ============================================================================
 * 会员组（等级）的相关功能
 * 
 * ============================================================================
 * $Author: Bingle $
 * $Id: member_group_model.php 17171 2014-03-05 13:49:00Z Bingle $
*/
Class Member_group_model extends K_Model {
	private $model_data = '';
	private $primary;
	const   DEFAULT_GROUP_ID = 1;
	
	function __construct(){
		parent::__construct();
		$this->model_name = "sk_member_group";
	}
	
	/*
	*获取默认用户组
	*return Array|false
	*/
	public function get_default_group() {
		$this->db = K_Model::getInstanceDb(true);
		
		$where = array("is_default"=>Member_group::DEFAULT_GROUP_ID);
		$row = $this->getRow($where);
		if($row) {
			return $row;
		}else {
		    return false;	
		}
	}
	
	/*
	 *获取用户组名称
	 *@paras int $gid 用户组ID
	 *
	 *return string
	*/
	public function get_name($gid) {
		$this->db = K_Model::getInstanceDb(true);
	
		$where = array("gid"=>$gid);
		$group_name = $this->getOne($where, 'name');
		if($group_name) {
			return $group_name;
		}else {
			return false;
		}
	}
	
	/*
	 *根据用户积分获取用户组ID
	 *
	 *@paras int $credit 积分数
	 *@paras int $type   类型(扩展)
	 *
	 *
	 *return int
	*/
	public function get_gid_by_credit($credit = 0, $type = 0) {
		$this->db = K_Model::getInstanceDb(true);
	    
		$sql = 'select gid, name from '.$this->model_name.' where min_credit<='.$credit.' and max_credit>'.$credit;
		$query = $this->db->query($sql);
		$result = $query->result_array();		
		if(!empty($result)) {
			return $result[0]['gid'];
		}else {
			return false;
		}
	}
	
	/*
	 *根据用户积分获取用户组
	*
	*@paras int $credit 积分数
	*@paras int $type   类型(扩展)
	*
	*
	*return int
	*/
	public function get_group_by_credit($credit = 0, $type = 0) {
		$this->db = K_Model::getInstanceDb(true);
		 
		$sql = 'select * from '.$this->model_name.' where min_credit<='.$credit.' and max_credit>'.$credit;
		$query = $this->db->query($sql);
		$result = $query->result_array();
		if(!empty($result)) {
			return $result[0];
		}else {
			return false;
		}
	}
	
	/*
	 *根据用户组ID获取用户级别
	*
	*@paras int $gid    组ID
	*
	*
	*return int
	*/	
	public function get_level_by_gid($gid) {
		if($gid>0) {
			$this->db = K_Model::getInstanceDb(true);
			
			$where = array('gid'=>$gid);
			return $this->getOne($where, 'level');
		}else {
			return -1;
		}		
	}
	
	/*
	 *得到所有的用户级别
	*
	*
	*
	*return array
	*/
	public function get_all() {
		$this->db = K_Model::getInstanceDb(true);
				
		$where = array();
		return $this->getAll($where, 'level asc');
	}	
	
	/*
	*根据用户组ID获取积分范围
	*
	*@paras int $gid    组ID
	*
	*
	*return array
	*/
	public function get_range_by_gid($gid) {
		if($gid>0) {
			$this->db = K_Model::getInstanceDb(true);
				
			$where = array('gid'=>$gid);
			return $this->getRow($where, array('level', 'min_credit', 'max_credit'));
		}else {
			return false;
		}
	}
}
?>