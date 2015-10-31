<?php
/**
 * saiku 会员（等级）模块模块
 * ============================================================================
 * 会员（等级）的相关功能
 * 
 * ============================================================================
 * $Author: Bingle $
 * $Id: member_level_model.php 17171 2014-03-05 13:49:00Z Bingle $
*/
Class Member_level_model extends K_Model {
	private $model_data = '';
	private $primary;
	const   DEFAULT_LEVEL = 0, DEFAULT_LEVEL_ID = 1;
	
	function __construct(){
		parent::__construct();
		$this->model_name = "sk_member_level";
	}
	
	/*
	*获取默认用户级别
	*return Array|false
	*/
	public function get_default_level() {
		$this->db = K_Model::getInstanceDb(true);
		
		$where = array("level"=>Member_level_model::DEFAULT_LEVEL);
		$row = $this->getRow($where);
		if($row) {
			return $row;
		}else {
		    return false;	
		}
	}
	
	/*
	 *获取用户级别名称名称
	 *@paras int $lid 用户级别名称ID
	 *
	 *return string
	*/
	public function get_name($lid) {
		$this->db = K_Model::getInstanceDb(true);
	
		$where = array("lid"=>$lid);
		$level_name = $this->getOne($where, 'name');
		if($level_name) {
			return $level_name;
		}else {
			return false;
		}
	}
	
	/*
	 *根据用户积分获取用户级别名称ID
	 *
	 *@paras int $credit 积分数
	 *@paras int $type   类型(扩展)
	 *
	 *
	 *return int
	*/
	public function get_lid_by_credit($credit = 0, $type = 0) {
		$this->db = K_Model::getInstanceDb(true);
	    
		$sql = 'select lid, name from '.$this->model_name.' where min_credit<='.$credit.' and max_credit>'.$credit;
		$query = $this->db->query($sql);
		$result = $query->result_array();		
		if(!empty($result)) {
			return $result[0]['lid'];
		}else {
			return false;
		}
	}
	
	/*
	 *根据用户积分获取用户级别名称
	*
	*@paras int $credit 积分数
	*@paras int $type   类型(扩展)
	*
	*
	*return int
	*/
	public function get_level_by_credit($credit = 0, $type = 0) {
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
	 *根据用户级别名称ID获取用户级别
	*
	*@paras int $lid    组ID
	*
	*
	*return int
	*/	
	public function get_level_by_lid($lid) {
		if($lid>0) {
			$this->db = K_Model::getInstanceDb(true);
			
			$where = array('lid'=>$lid);
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
	*根据用户级别名称ID获取积分范围
	*
	*@paras int $lid    组ID
	*
	*
	*return array
	*/
	public function get_range_by_lid($lid) {
		if($lid>0) {
			$this->db = K_Model::getInstanceDb(true);
				
			$where = array('lid'=>$lid);
			return $this->getRow($where, array('level', 'min_credit', 'max_credit'));
		}else {
			return false;
		}
	}
}
?>