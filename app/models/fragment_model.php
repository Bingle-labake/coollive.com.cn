<?php
/**
 * 赛酷  碎片模块
 * ============================================================================
 *   碎片调用
 * 
 * ============================================================================
 * $Author: Bingle $
 * $Id: fragment_model.php 17171 2014-03-31 14:48:00Z Bingle $
*/
class Fragment_model extends K_Model {
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
		$this->model_name = "sk_fragment";
		
		$api_config = $this->config->item("api");
		$this->img_path   = $api_config['upload']['fragment']['path']."/";
	}	
	
	//获取碎片
	public function get_html($fid) {		
		$html = read_fragment_cache($fid);
		if(empty($html)) {
			$this->db = K_Model::getInstanceDb ( false );
			$row = $this->getRow(array('fid'=>$fid, 'status'=>1), array('data, temp'));
			if(!empty($row)) {
				$row['data'] = unserialize($row['data']);
				$row['data'] = json_decode($row['data'], true);
				$html = parse_frag_template($row['temp'], $row['data'], $this->img_path);
				write_fragment_cache($fid, $html);				
			}
		}		
		return $html;
	}
}
?>