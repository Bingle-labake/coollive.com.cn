<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**************************************************************************
*   Comments:   视频模型
*   Author: Song Changfu
*   Last Modified:  2014-01-22
**************************************************************************/
class video_model extends K_Model{
	private $video = 'sk_video';
    private $live_video = 'sk_program_videos';

    function __construct()
    {
        parent::__construct();
        
        $this->db = K_Model::getInstanceDb(true);
    }

    
    /**
     * 获取一个视频信息
     * 
     */
    public function get_video($where,$filed=array('*'))
    {
        return $this->getRow($where, $filed, $this->video);
    }

	/**
     * 获取一个视频信息
     * 
     */
    public function get_archive_video($pid)
    {		
        $sql = "select v.* from ".$this->live_video." as pv ".
		       " left join sk_video as v on v.id = pv.vid ".
			   " where pv.rid = $pid and v.status = 3 ";
		$query = $this->db->query($sql);
		$ret = $query->result_array();
		if(!empty($ret)) {
			return $ret[0];
		}else {
		    return false;	
		}
    }
    
    /**
     * 查询多条数据
     * @param string $where
     * @return 返回多二维数组
     */
    public function get_videos($where,$page=1, $size = 10,$order=' id desc '){
        $this->model_name = $this->video;
        $ret = $this->getlist($where, $page, $size, $order);
        return $ret;
    }
	
	 /**
     * 统计视频数
     * @param string $where
     * @return int
     */
    public function get_videos_count($where){
        $this->model_name = $this->video;
		
		if(!empty($where)) {
			$sql = "select count(*) as num from $this->model_name ".$where;
			$query = $this->db->query($sql);
			$ret = $query->result_array();
			if(!empty($ret)) {
				return $ret[0]['num'];
			}else {
			    return 0;	
			}
		}else {
		    return 0;	
		}
    }

    /**
     * 添加视频信息
     * @param array $data
     * @return boolean
     */
    public  function add_video($data){
        
        return $this->add($data,true,$this->video);
    }
    
    /**
     * 更新视频表
     * @param array $data
     * @param array $where
     * @return boolean
     */
    public function up_video($data,$where){
    	
        return $this->update($where,$data,$this->video);
    }

    /**
     * 视频统计
     */
    public function count_video($where)
    {
        $this->model_name = $this->video;
        return $this->getCount($where);
    }
    
    
    /**
     * 视频播放数
     */
    public function video_play($id)
    {
		if(is_numeric($id)) {
			$sql = " UPDATE ".$this->video." SET `play`=play+1  WHERE  id='$id' ";
		}else {
			$sql = " UPDATE ".$this->video." SET `play`=play+1  WHERE  vid='$id' ";
		}        
        $query = $this->db->query($sql);
        return $query;
    }
    
    
    /**
     * id数组
     */
    public function get_video_idin($ids)
    {
        if(!is_array($ids))
            return false;
        $id = implode(", ", $ids);
        $sql = " SELECT *  FROM ".$this->video." WHERE  id IN ($id)";
        $query = $this->db->query($sql);
        return $query->result_array();
    }
	 
	 //
	 public function get_hot_video($size, $cat = 0) {
	 }
}
?>
