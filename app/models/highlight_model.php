<?php
/**
 * 赛酷  视频集锦
 * $Author: Bingle $
 * $Id: Highlight_model.php 17171 2015-05-10 14:14:00Z Bingle $
*/
class Highlight_model extends K_Model{
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
		$this->model_name = "sk_highlight";
	}
	
	/**
	 * 获取节目信息
	 *
	 * @access  public
	 * @paras  int $rid  节目ID
	 * 
	 * @return  array
	 */
	public function getRow($id) {
		$this->db = K_Model::getInstanceDb ( false );
		
		$where = array('id'=>$id, 'status'=>1);
		return $this->getRow($where);
	}
}
?>