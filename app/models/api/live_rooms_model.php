<?php
/**
 * 赛酷  直播房间模块
 * $Author: Bingle $
 * $Id: live_rooms_model.php 17171 2014-11-19 23:14:00Z Bingle $
*/
class Live_rooms_model extends K_Model{
	private $model_data = '';
	private $primary;
	
	/**
	* 构造函数
	*
	* @access  public
	* @return  mix
	*/	
	function __construct(){
		parent::__construct();
		$this->model_name = "sk_rooms";			
	}
	
	/**
	 * 获取房间信息
	 *
	 * @access  public
	 * @paras  int $rid  房间ID
	 * 
	 * @return  array
	 */
	public function get_room($rid) {
		$this->db = K_Model::getInstanceDb ( false );
		
		$where = array('rid'=>$rid, 'status'=>1);
		return $this->getRow($where);
	}
	
	/**
	 * 获取房间信息
	 *
	 * @access  public
	 * @paras  int $rid  房间ID
	 * 
	 * @return  array
	 */
	public function save_app_room($uid, $title, $start_time, $duration, $join_num = 0, $passwd = '') {
		$this->db = K_Model::getInstanceDb ( true );
		
		if(!empty($passwd)) {
			$passwd = 1;
		}
		$data = array('uid'        =>$uid, 
					  'stream'     =>$uid.date("YmdHis"), 
					  'name'       =>$title, 
					  'desc'       =>$title, 
					  'start_time' =>$start_time,
					  'duration'   =>$duration,
					  'max_num'    =>$join_num,
					  'visible'    =>$passwd,
					  'refer'      => 2,
					  'record_time'=>date("Y-m-d H:i:s"));
		
		$rid = $this->add($data, 'rid');
		$res = array('rid'=>$rid, 'stream'=>$data['stream']);
		return $res;
	}
	
	/**
	 * 修改房间信息
	 *
	 * @access  public
	 * @paras  int $rid  房间ID
	 * 
	 * @return  array
	 */
	public function update_app_room($rid, $uid, $title, $start_time, $duration, $join_num = 0, $passwd = '') {
		$this->db = K_Model::getInstanceDb ( true );
		
		if(!empty($passwd)) {
			$passwd = 1;
		}
		$where = array('rid'=>$rid, 'uid'=>$uid);
		
		$data = array();
		if(!empty($title)) {
			$data['name'] = $title;
		}
		if(!empty($start_time)) {
			$data['start_time'] = $start_time;
		}
		if(!empty($duration)) {
			$data['duration'] = $duration;
		}
		if(!empty($join_num)) {
			$data['max_num'] = $join_num;
		}
		if(!empty($passwd)) {
			$data['visible'] = $passwd;
		}	
		return $this->update($where, $data);
	}
	
	
	/**
	 * 删除房间信息
	 *
	 * @access  public
	 * @paras  int $rid  房间ID
	 * 
	 * @return  array
	 */
	public function remove_room_by_rid($rid) {
		$this->db = K_Model::getInstanceDb ( true );
		
		if(intval($rid) <= 0) {
			return false;
		}
		$where = array('rid'=>$rid);		
		return $this->remove($where);
	}
	
	/**
	 * 删除房间信息
	 *
	 * @access  public
	 * @paras  int $rid  房间ID
	 * 
	 * @return  array
	 */
	public function end_room_by_rid($rid) {
		$this->db = K_Model::getInstanceDb ( true );
		
		if(intval($rid) <= 0) {
			return false;
		}
		$where = array('rid'=>$rid);	
		$row = $this->getRow($where);
		if($row) {
		    if($row['is_live'] == 1) {
				$duration = time() - $row['start_time'];
				if($duration > 0) {
					$duration .= "000";
				}else {
					$duration = 0;
				}
				$set = array('is_live'=>0, 'duration'=>$duration);
				return $this->update($where, $set);
			}
		}
		return false;
	}
	
	
	/**
	 * 获取房间信息
	 *
	 * @access  public
	 * @paras  int $rid  房间ID
	 * 
	 * @return  array
	 */
	public function get_my_rooms($uid, $skip_rid = 0, $size = 10) {
		$this->db = K_Model::getInstanceDb ( false );
		
		if($uid>0) {
			$sql = "select * from ". $this->model_name. " where uid = $uid and rid > $skip_rid order by rid asc limit $size";
			$query = $this->db->query($sql);
			return $query->result_array();			
		}else {
			return false;
		}
	}
}
?>