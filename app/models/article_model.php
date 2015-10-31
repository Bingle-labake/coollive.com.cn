<?php
/**
 * 赛酷  文章/公告模块
 * $Author: Bingle $
 * $Id: article_model.php 17171 2014-09-12 09:14:00Z Bingle $
*/
class Article_model extends K_Model{
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
		$this->model_name = "sk_article";		
	}
	
	public function get_items_by_gid($gid, $page = 1, $size = 10, $order_by = 'top desc, createtime desc') {
		$this->db = K_Model::getInstanceDb ( false );
		
		$offset = ($page - 1) * $size;
		$sql = "select id, title, createtime, top from ".$this->model_name." where gid = $gid and status = 1 order by $order_by limit $offset, $size";
		$query = $this->db->query($sql);
		return $query->result_array();		
	}
    /**
     *获取一个公告 
     */
	public function get_item($article_id) {
        $this->db = K_Model::getInstanceDb ( false );
        $article_id = intval($article_id);
        if(!$article_id) return false;
        $where = array('id'=>$article_id);
        return $this->getRow($where, array('*'), $this->model_name);
	}
}
?>
