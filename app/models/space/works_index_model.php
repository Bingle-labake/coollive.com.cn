<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**************************************************************************
*   Comments:   作品索引模型
*   Author: scf
*   Last Modified:  2014-02-22
**************************************************************************/
class works_index_model extends K_Model{

	private $video = 'sk_video';
    private $index = 'sk_works_index';
    private $game = 'sk_game';
    private $photo = 'sk_photo';
    private $album = 'sk_album';
    private $sign_expand = 'sk_sign_expand';

    function __construct()
    {
        parent::__construct();
        $this->db = K_Model::getInstanceDb(true);
    }
    
    /**
     * 获取一个索引
     * 
     */
    public function get_index($where,$filed=array('*'))
    {
        return $this->getRow($where, $filed, $this->index);
    }
    
    /**
     * 添加索引
     * @param array $data
     * @return boolean
     */
    public  function add_index($data){
        return $this->add($data,true,$this->index);
    }
    
    /**
     * 更新索引
     * @param array $data
     * @param array $where
     * @return boolean
     */
    public function up_index($data,$where){
    	return $this->update($where,$data,$this->index);
    }
        
    /**
     * 统计
     */
    public function get_index_count($where)
    {
        $this->model_name = $this->index;
        return $this->getCount($where);
    }
    /**
     * 查询多条数据
     * @param string $where
     * @return 返回多二维数组
     */
    public function get_works_index($where,$page=1, $size = 10,$order=' id desc '){
        $this->model_name = $this->index;
        $ret = $this->getlist($where, $page, $size, $order);
        return $ret;
    }

    /**
     * 取视频集
     */
    public function get_works($where,$page=0,$size=10,$order = ' v.adddate DESC ')
    {
        #$this->model_name = $this->video;
        #return $this->getlist($where, $page, $size, $order);
        
        if($page <= 0) {
		    $page = 1;	
		}
		if($size <=0 || $size > 100) {
		    $size = 10;	
		}
		$offset = ($page-1)*$size;
        $sql = " SELECT v.*  FROM ".$this->video." as v LEFT JOIN ".$this->index." as i  on i.wid=v.id  $where ORDER BY $order  LIMIT  $offset, $size";
        $query = $this->db->query($sql);
        return $query->result_array();
        
    }
    
    /**
     * 统计取视频集
     */
    public function get_works_count($where)
    {
        $this->model_name = $this->video;
        return $this->getCount($where);
    }
    

    /**
     * 取用户参赛视频集
     */
    public function get_space_video_uid($uid,$page=0,$size=10,$type=1,$status = 0,$gid =false)
    {
        $userid = intval($uid);
        if(!$userid)
            return false;

		$offset = ($page-1)*$size;
        $w = $gid?" AND i.gid='$gid' ":"";

		/* 选择指定的状态 */
		if(is_array($status)){
			$ids = join(',',$status);
			$s = "v.status in({$ids})";
		}else{
			$s = 'v.status > 0';
		}

        if($type === 0)
        {
            $sql = " SELECT v.id,v.title,v.userid,v.username,v.vote,v.type,v.categoryid,v.categoryid1 FROM ".$this->video." as v ";
            $sql .= "WHERE {$s}  AND v.type='$type' AND v.userid='$userid'  ORDER BY v.`update` DESC LIMIT  $offset, $size  ";
        }
		elseif($type == -1){
            $sql = " SELECT v.id,v.title,v.userid,v.username,v.vote,v.type,v.categoryid,v.categoryid1,g.longtitle,g.path,g.id as gid,i.sid FROM ".$this->index." as i ";
            $sql .= "RIGHT JOIN ".$this->video." as v  on i.wid=v.id  ";
			$sql .= "LEFT JOIN {$this->game} g ON i.gid=g.id ";
            $sql .= "WHERE v.userid='$userid' AND {$s} ORDER BY v.update DESC LIMIT {$offset},{$size}";
		}
        else
        {
            $sql = " SELECT v.id,v.title,v.userid,v.username,v.vote,v.type,v.categoryid,v.categoryid1,g.longtitle,g.path,g.id as gid  FROM ".$this->index." as i ";
            $sql .= "LEFT JOIN ".$this->video." as v  on i.wid=v.id  ";
            $sql .= "LEFT JOIN ".$this->game." as g  on i.gid=g.id  ";
            $sql .= "WHERE {$s} $w AND v.type='$type' AND v.userid='$userid' AND i.wtype ='1'   ORDER BY v.`update` DESC LIMIT  $offset, $size  ";
        }

        $query = $this->db->query($sql);
        return $query->result_array();
    }
    
    /**
     * 统计取用户视频集的数量
	 *
	 * @param mixed $userid
	 * @param mixed $gid   比赛id
	 * @param int $type    类别：-1为全部视频、0为非比赛视频、1为参数
	 * @param int $status  属性：0为属性大于0的，如果为数字则筛选数组中的值为属性值
	 * @access public
	 * @return int
     */
    public function count_space_video_uid($uid,$type=1,$status = 0,$gid =false)
    {
		$userid = intval($uid);
        if(!$userid)
            return false;
        $w = $gid?" AND i.gid='$gid' ":"";

		/* 选择指定的状态 */
		if(is_array($status)){
			$ids = join(',',$status);
			$s = "v.status in({$ids})";
		}else{
			$s = 'v.status > 0';
		}
        
		/* 非参赛视频 */
        if($type === 0)
        {
			$sql = " SELECT count(1) as num  FROM ".$this->video." as v ";
            $sql .= "WHERE v.userid='$userid' AND {$s} AND v.type='0' ";
        }
		elseif($type == -1) //全部视频
		{
            $sql = " SELECT count(1) as num  FROM ".$this->index." as i ";
            $sql .= "RIGHT JOIN ".$this->video." as v  on i.wid=v.id  ";
			$sql .= "LEFT JOIN {$this->game} g ON i.gid=g.id ";
            $sql .= "WHERE v.userid='$userid' AND {$s}";
		}
        else //参赛视频
        {
            $sql = " SELECT count(1) as num  FROM ".$this->index." as i ";
            $sql .= "LEFT JOIN ".$this->video." as v  on i.wid=v.id  ";
            $sql .= "WHERE v.userid='$userid' AND {$s} AND v.type='$type' $w ";
        }

        
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result[0]['num'];
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
    
    /**
     * 判断报名是否上传了视频
     * @param int $uid
     * @param int $gid
     * @return boolean
     */
    public function work_exists($uid,$gid){
    	$sql = "select wid,sid from $this->index where uid=$uid and gid=$gid order by create_time desc limit 1";
    	$w = $this->db->query($sql)->result_array();
    	#$this->db->query($sql)->free_result();
    	if (!empty($w)) {
    		return !$w[0]['wid'] ? false : true;
    	}else {
    		return true;
    	}
        
    }
    /**
     * 视频播票数
     */
    public function video_vote($wid,$wtype,$type)
    {
        switch ($type) {
			case 1://直接投票
				$sql = " UPDATE ".$this->index." SET `d_vote`=d_vote+1  WHERE  wid='$wid' AND wtype='$wtype' ";
				break;
			case 2://随机投票
                $sql = " UPDATE ".$this->index." SET `r_vote`=r_vote+1  WHERE  wid='$wid' AND wtype='$wtype' ";
                break;
			default :
				return false; 
				break;
		}
        $query = $this->db->query($sql);
        return $query;
    }
    
    
    /**
     * 作品票数
     */
    public function work_vote($wid,$wtype,$type)
    {
        switch ($type) {
			case 1://直接投票
				$sql = " UPDATE ".$this->index." SET `d_vote`=d_vote+1  WHERE  wid='$wid' AND wtype='$wtype' ";
				break;
			case 2://随机投票
                $sql = " UPDATE ".$this->index." SET `r_vote`=r_vote+1  WHERE  wid='$wid' AND wtype='$wtype' ";
                break;
			default :
				return false; 
				break;
		}
        $query = $this->db->query($sql);
        return $query;
    }
    
    ########图片作品###################
    
    /**
     * 统计图集
     * where 字符串
     */
    public function count_photo_index($where)
    {
        if(!$where) return false;
        $sql = " SELECT count(1) as num  FROM ".$this->index."  $where ";
  
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result[0]['num'];
    }
    
    /**
     * 取参赛图
     * where 字符串
     */
    public function get_photos($where,$page=0,$size=10,$order=" a.album_id desc ")
    {
        if(!$where) return false;
        if($page <= 0) {
		    $page = 1;	
		}
		if($size <=0 || $size > 100) {
		    $size = 10;	
		}
		$offset = ($page-1)*$size;
		
		$sql = " SELECT a.album_id as id,a.name as title,a.pic_name,a.record_time as adddate,g.longtitle  FROM ".$this->index." as i ";
		$sql .= "LEFT JOIN ".$this->photo." as p  on i.wid=p.id  ";
		$sql .= "LEFT JOIN ".$this->game." as g  on i.gid=g.id  ";
		$sql .= $where;
		
        $sql .= " ORDER BY $order LIMIT  $offset, $size";
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }
    
    /**
     * 取参赛图集
     * where 字符串
     */
    public function get_albums($where,$page=0,$size=10,$order=" a.album_id desc ")
    {
        if(!$where) return false;
        if($page <= 0) {
		    $page = 1;	
		}
		if($size <=0 || $size > 100) {
		    $size = 10;	
		}
		$offset = ($page-1)*$size;
		$sql = " SELECT a.album_id as id,a.name as title,a.pic_name,a.record_time as adddate,g.longtitle  FROM ".$this->index." as i ";
		$sql .= "LEFT JOIN ".$this->album." as a  on i.wid=a.album_id  ";
		$sql .= "LEFT JOIN ".$this->game." as g  on i.gid=g.id  ";
		$sql .= $where;
		
        $sql .= " ORDER BY $order LIMIT  $offset, $size";
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }
    
    /**
     * id数组
     */
    public function get_photo_idin($ids)
    {
        if(!is_array($ids))
            return false;
        $id = implode(", ", $ids);
        $sql = " SELECT *  FROM ".$this->photo." WHERE  id IN ($id)";
        $query = $this->db->query($sql);
        return $query->result_array();
    }
    
    /**
     * 获取比赛的随机规定数量图片
     */
    public function get_photo_random($gid,$cate_id,$size=2)
    {
        if(!$gid || !$cate_id)
            return false;
        $sql = " SELECT p.*  FROM ".$this->photo." as p ";
        $sql .= "LEFT JOIN ".$this->index." as i  on i.wid=p.id  ";
        $sql .= "LEFT JOIN ".$this->sign_expand." as s_e  on i.id=s_e.w_i_id  ";
        $sql .= "WHERE s_e.data_value='$cate_id'  AND i.gid='$gid'  ORDER BY rand() LIMIT $size ";
        $query = $this->db->query($sql);
        return $query->result_array();
    }
    
}
?>
