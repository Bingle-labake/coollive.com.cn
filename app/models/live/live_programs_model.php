<?php
/**
 * 赛酷  直播房间模块
 * $Author: Bingle $
 * $Id: live_programs_model.php 17171 2014-11-19 23:14:00Z Bingle $
*/
class Live_programs_model extends K_Model{
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
		$this->model_name = "sk_programs";	
		$this->model_video_name = "sk_program_videos";
	}
	
	/**
	 * 获取房间信息
	 *
	 * @access  public
	 * @paras  int $rid  房间ID
	 * 
	 * @return  array
	 */
	public function get_program($rid, $uid = 0) {
		$this->db = K_Model::getInstanceDb ( false );

        if($uid > 0) {
            $where = array('rid'=>$rid, 'uid'=>$uid, 'status'=>1);
        }else {
            $where = array('rid'=>$rid, 'status'=>1);
        }
		return $this->getRow($where);
	}
	
	public function get_program_by_stream($stream) {
		$this->db = K_Model::getInstanceDb ( false );
		
		$where = array('stream'=>$stream, 'status'=>1);
		return $this->getRow($where);
	}
	
	/**
	 * 播放数累加
	 *
	 * @access  public
	 * @paras  int $stream  房间ID
	 *
	 * @return  array
	 */
	public function inc_views_by_stream($stream, $inc_key = 'views') {
		if(!empty($stream) && in_array($inc_key, array('views'))) {
			$this->db = K_Model::getInstanceDb ( true );
			
			$sql = "update $this->model_name set $inc_key = $inc_key + 1 where stream = '$stream'";
			return $this->db->query($sql);
		}else {
			return false;
		}
	}
	
	/**
	 * 播放数累加
	 *
	 * @access  public
	 * @paras  int $stream  房间ID
	 *
	 * @return  array
	 */
	public function inc_views_by_rid($rid, $inc_key = 'views') {
		if(!empty($rid) && in_array($inc_key, array('views', 'videos'))) {
			$this->db = K_Model::getInstanceDb ( true );
				
			$sql = "update $this->model_name set $inc_key = $inc_key + 1 where rid = $rid";
			return $this->db->query($sql);
		}else {
			return false;
		}
	}
	
	/**
	 * 获取我的某一个房间信息
	 *
	 * @access  public
	 * @paras  int $rid  房间ID
	 * 
	 * @return  array
	 */
	public function get_my_program($rid, $uid) {
		$this->db = K_Model::getInstanceDb ( false );
		
		$where = array('rid'=>$rid, 'uid'=>$uid, 'status'=>1);
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
	public function save_app_program($uid, $title, $start_time, $duration, $join_num = 0, $passwd = '') {
		$this->db = K_Model::getInstanceDb ( true );

		if(empty($passwd)) {
			$passwd = 0;
		}
		$data = array('uid'        =>$uid, 
					  'stream'     =>init_live_stream($uid), 
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
     * 添加房间信息
     *
     * @access  public
     * @paras  array $data
     *
     * @return  array
     */
    public function add_item($data) {
        $this->db = K_Model::getInstanceDb ( true );

        $data['stream'] = init_live_stream($data['uid']);

        $rid = $this->add($data, 'rid');
        $res = array('rid'=>$rid, 'stream'=>$data['stream']);
        return $res;
    }
	
	/**
	 * 重置房间stream
	 *
	 * @access  public
	 * @paras  int $rid  房间ID
	 *
	 * @return  array
	 */
	public function reset_program_stream($rid, $uid) {
		$this->db = K_Model::getInstanceDb ( true );
	
		$where = array('rid'=>$rid, 'uid'=>$uid);
		$set = array('stream'=>init_live_stream($uid), 'views'=>0);
	
		return $this->update($where, $set);
	}
	
	/**
	 * 修改房间信息
	 *
	 * @access  public
	 * @paras  int $rid  房间ID
	 * 
	 * @return  array
	 */
	public function update_app_program($rid, $uid, $title, $start_time, $duration, $join_num = 0, $passwd = '') {
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
	 * 修改房间状态
	 *
	 * @access  public
	 * @paras  int $rid  房间ID
	 * 
	 * @return  array
	 */
	public function upstate_program_by_uid($rid, $uid, $set) {
		$this->db = K_Model::getInstanceDb ( true );

		$where = array('rid'=>$rid, 'uid'=>$uid);
		return $this->update($where, $set);
	}
	
	
	/**
	 * 删除房间信息
	 *
	 * @access  public
	 * @paras  int $rid  房间ID
	 * 
	 * @return  array
	 */
	public function remove_program_by_rid($rid) {
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
	public function end_program_by_rid($rid) {
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
	public function get_my_programs($uid, $skip_rid = 0, $size = 10) {
		$this->db = K_Model::getInstanceDb ( false );
		
		if($uid>0) {
			$sql = "select * from ". $this->model_name. " where uid = $uid and rid > $skip_rid order by rid asc limit $size";
			$query = $this->db->query($sql);
			return $query->result_array();			
		}else {
			return false;
		}
	}
	
	/**
	 * 回调更新
	 *
	 * @access  public
	 * @paras  int $rid  房间ID
	 * 
	 * @return  array
	 */
	public function callback_update($where, $set) {
		$this->db = K_Model::getInstanceDb ( true );
		
		if(!empty($where) && !empty($set)) {
			return $this->update($where, $set);		
		}else {
			return false;
		}
	}
	
	//添加直播视频流
	public function add_video($rid, $stream_name) {
		$this->db = K_Model::getInstanceDb ( true );
		
		if($rid>0 && !empty($stream_name)) {
			$where = array('rid'=>$rid, 
					       'stream'=>$stream_name);
			$r = $this->getRow($where, '', $this->model_video_name);
			if($r) {
				return $r['id'];
			}else {
				$data = array('rid'        =>$rid,
						'stream'     =>$stream_name,
						'record_time'=>time()
				);
				return $this->add($data, 'id', $this->model_video_name);
			}			
		}else {
			return false;
		}		
	}
	
		//添加直播视频流
	public function get_videos($rid) {
		$this->db = K_Model::getInstanceDb ( false );
		
		if($rid>0) {
			$sql = "select rv.stream, rv.record_time, v.id as vid, v.tag, v.title, v.description, v.username, v.userid as uid, v.vid as ccvid, v.image from sk_program_videos as rv left join sk_video as v on rv.vid=v.id where rv.rid=".$rid." order by rv.record_time desc";
			$query = $this->db->query($sql);
			return $query->result_array();					
		}else {
			return false;
		}		
	}
	
	public function callback_update_videos($where, $set) {
		$this->db = K_Model::getInstanceDb ( true );
		
		if(!empty($where) && !empty($set)) {
			$r = $this->getRow($where, array(), $this->model_video_name);
			if($r) {
				return $this->update($where, $set, $this->model_video_name);
			}else {
				return false;
			}			
		}else {
			return false;
		}
	}
}
?>