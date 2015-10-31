<?php
/**
 * 赛酷  直播节目模块
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
	}


    /**
     * 获取节目信息
     *
     * @access  public
     * @paras  int $rid  节目ID
     *
     * @return  array
     */
    public function find($where) {
        $this->db = K_Model::getInstanceDb ( false );

        return $this->getRow($where);
    }

	/**
	 * 获取节目信息
	 *
	 * @access  public
	 * @paras  int $rid  节目ID
	 * 
	 * @return  array
	 */
	public function get_program($rid) {
		$this->db = K_Model::getInstanceDb ( false );
		
		$where = array('rid'=>$rid, 'status'=>1);
		return $this->getRow($where);
	}

    /**
     * 获取节目预告
     *
     * @access  public
     *
     * @return  array
     */
    public function get_advance() {
        $this->db = K_Model::getInstanceDb ( false );

        $where = " visible = 0 and status = 1 and is_live = 0 ";
        $sql = "SELECT * FROM ".$this->model_name.
               " WHERE ".$where .
               " order by questions desc, start_time asc limit 20";

        $query = $this->db->query($sql);
        $ret = $query->result_array();
        if($ret) {
            return $ret;
        }else {
            return false;
        }
    }

    /**
     * 获取我的节目预告
     *
     * @access  public
     *
     * @return  array
     */
    public function get_advance_by_uid($uid) {
        $this->db = K_Model::getInstanceDb ( false );

        $now_time = time();
        $where = " is_live = 0 and start_time >= $now_time ";
        $sql = "SELECT * FROM ".$this->model_name.
            " WHERE ".$where .
            " order by start_time asc limit 10";

        $query = $this->db->query($sql);
        $ret = $query->result_array();
        if($ret) {
            return $ret;
        }else {
            return false;
        }
    }


    /**
     * 获取我的订阅预告
     *
     * @access  public
     *
     * @return  array
     */
    public function get_my_rsvps($uid) {
        $this->db = K_Model::getInstanceDb ( false );

        $now_time = time();
        $where = " p.is_live = 0 and p.start_time >= $now_time and sub.uid = $uid";
        $sql = "SELECT p.* FROM ".$this->model_name. " as p ".
               " left join sk_subscribe as sub on p.rid = sub.pid ".
               " WHERE ".$where .
               " order by p.start_time asc limit 10";

        $query = $this->db->query($sql);
        $ret = $query->result_array();
        if($ret) {
            return $ret;
        }else {
            return false;
        }
    }
	
	/**
	 * 获取节目信息
	 *
	 * @access  public
	 * @paras  int $rid  节目ID
	 * 
	 * @return  array
	 */	
	public function get_program_uid($uid) {
		$this->db = K_Model::getInstanceDb ( false );
		
		$where = array('uid'=>$uid, 'status'=>1, 'is_live'=>1);
		return $this->getRow($where);
	}
	
	/**
	 * 获取直播回放视频
	 *
	 * @access  public
	 * @paras  int $vid  视频ID/vid或vccid
	 *
	 * @return  array
	 */
	public function get_video($vid) {
		$this->db = K_Model::getInstanceDb ( false );
	
		$where = " v.status = 3";
		if(is_numeric($vid)) {
			$where .= " and pv.vid = $vid ";
		}else {
			$where .= " and pv.ccvid = '$vid' ";
		}
		$sql = "SELECT v.*, pv.views FROM sk_program_videos AS pv ".
		       " INNER JOIN sk_video AS v ON pv.ccvid = v.vid ".
		       " WHERE ".$where;
		
		$query = $this->db->query($sql);
		$ret = $query->result_array();
		if($ret) {
			return $ret[0];
		}else {
			return false;
		}
	}
	
	//获取直播存档视频
	public function get_videos($rid) {
		$this->db = K_Model::getInstanceDb ( false );
	
		if($rid>0) {
			$sql = "select rv.stream, rv.record_time, v.id as vid, v.tag, v.title, v.description, v.username, v.userid as uid, v.vid as ccvid, v.image, v.pic_path from sk_program_videos as rv left join sk_video as v on rv.vid=v.id where rv.rid=".$rid." and v.status = 3 order by rv.record_time desc";
			$query = $this->db->query($sql);
			return $query->result_array();
		}else {
			return false;
		}
	}
	
	//获取目前的直播(正在直播的优先,第二是视频数)
	public function get_new_programs($page = 1, $size = 10) {
		$this->db = K_Model::getInstanceDb ( false );
	
		if($page<=0) {
			$page = 1;
		}
		$offset = ($page - 1) * $size;
		$sql = "select p.rid, p.name, p.desc, p.pic_name, p.is_live, p.videos, m.uid, m.username, p.record_time from sk_programs as p".
			   " inner join sk_member as m on m.uid=p.uid".
			   " where p.visible=0 and p.status = 1 order by p.is_live desc, p.videos desc".
			   " limit $offset, $size";
		$query = $this->db->query($sql);
		return $query->result_array();
	}
	
	//获取目前的直播(正在直播的优先,第二是视频数)
	public function get_hot_video($last_time = 0 ,$page = 1, $size = 8) {
		$this->db = K_Model::getInstanceDb ( false );
	
		if($page<=0) {
			$page = 1;
		}
		if($last_time<=0) {
			$last_time = time() - 3600*24*30;
		}
		$offset = ($page - 1) * $size;
		$sql = "select p.rid, p.is_live, v.id as vid, v.tag, v.title, v.description, v.uid, v.pic_name, pv.views, pv.record_time".
		       " from sk_programs as p ".
		       " inner join sk_program_videos as pv on pv.rid=p.rid ".
               " inner join sk_video as v on pv.vid = v.id ".
		       " where v.status = 3 and p.record_time>$last_time order by pv.record_time desc, pv.views desc".
		       " limit $offset, $size";

		$query = $this->db->query($sql);
		return $query->result_array();
	}
	
	//获取精选直播节目  (正在直播的优先,第二是视频数)
	public function get_best_programs($page = 1, $size = 8) {
		$this->db = K_Model::getInstanceDb ( false );
	
		if($page<=0) {
			$page = 1;
		}
		$size_1 = 4;
		$offset = ($page - 1) * $size_1;
		$sql = "select p.rid, p.name, p.desc, p.pic_name, p.is_live, p.views, m.uid, m.username, p.record_time from sk_programs as p".
			   " inner join sk_member as m on m.uid=p.uid".
			   " where p.visible=0 and p.status = 1 and p.is_live = 1 order by p.max_num desc".
			   " limit $offset, $size_1";
		$query = $this->db->query($sql);
		$ret_1 = $query->result_array();
		
		$size_2 = $size - count($ret_1);
		$offset = ($page - 1) * $size_2;
		$sql = "select pv.rid, v.title as name, v.description as `desc`, v.pic_name, 2 AS is_live, pv.views, m.uid, m.username, pv.record_time from sk_program_videos as pv".
			   " inner join sk_video as v on v.id=pv.vid".
			   " inner join sk_member as m on m.uid=v.uid".
			   " where v.status=3 order by v.play desc, pv.views desc".
			   " limit $offset, $size_2";
		$query = $this->db->query($sql);
		$ret_2 = $query->result_array();
		
		return array_merge($ret_1, $ret_2);
	}



    public function recommended($keys = "", $cate = "", $size = 10) {
        if(!empty($keys)) {

        }elseif(!empty($cate)) {

        }else {
            $this->db = K_Model::getInstanceDb ( false );

            $sql = "select pv.rid, v.title as name, p.duration, v.pic_name, pv.views, m.uid, m.username, pv.record_time from sk_program_videos as pv".
                " inner join sk_programs as p on p.rid=pv.rid".
                " inner join sk_video as v on v.id=pv.vid".
                " inner join sk_member as m on m.uid=v.uid".
                " where v.status=3 order by rand()".
                " limit 0, $size";
            $query = $this->db->query($sql);
            return $query->result_array();
        }
    }
	
}
?>