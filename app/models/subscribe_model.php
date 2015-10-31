<?php
/**
 * 赛酷  直播订阅
 * $Author: Bingle $
 * $Id: Subscribe_model.php 17171 2015-05-10 15:57:00Z Bingle $
*/
class Subscribe_model extends K_Model{
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
		$this->model_name = "sk_subscribe";
	}
	
	/**
	 * 获取订阅
	 *
	 * @access  public
	 * @paras  int $rid  节目ID
	 * 
	 * @return  array
	 */
	public function getRow($id) {
		$this->db = K_Model::getInstanceDb ( false );
		
		$where = array('id'=>$id);
		return $this->getRow($where);
	}

    /**
     * 获取订阅
     *
     * @access  public
     * @paras  int $uid   用户ID
     * @paras  int $pid   节目ID
     * @paras  int $flag  订阅状态 1:订阅 其他值：取消订阅
     *
     * @return  boolean
     */
    public function save($uid, $pid, $flag = 1) {
        $data = array(
            'uid'=>$uid,
            'pid'=>$pid,
            'state'=>0,
            'create_at'=>time()
        );
        $where = array('uid'=>$uid, 'pid'=>$pid);
        if($flag == 1) {
            if(!$this->getOne($where, 'id')) {
                return $this->insert($data);
            }
        }else {
            if($this->getOne($where, 'id')) {
                return $this->remove($where);
            }
        }
        return false;
    }

    /**
     * 获取订阅
     *
     * @access  public
     * @paras  int $rid  节目ID
     *
     * @return  array
     */
    public function my($uid, $state = 0, $page = 1, $size = 6) {
        $this->db = K_Model::getInstanceDb ( false );

        $where['uid'] = $uid;
        if($state >= 0) {
            $where['state'] = $state;
        }


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
}
?>