<?php
/**************************************************************************
 *   Path:   /model/space/oauth_db.php
*   Comments:   第三方模型
*   Author: Zhang Lin
*   Last Modified:  02.24.2014 / Zhang Lin
**************************************************************************/
class Oauth_db extends K_Model {

	private $oauth = 'sk_oauth';
    function __construct()
    {
        parent::__construct();
    }
    
    /**
     * 第三方信息写入
     * @param array $data
     * @return int
     */
    public function add_oauth($data){
    	$this->db = K_Model::getInstanceDb(true);
    	return $this->add($data,'id',$this->oauth);
    }
    
    /**
     * 获取第三方绑定信息
     * @param array $where
     * @param array $field
     * @return int
     */
    public function getbindinfo($where,$field){
    	$this->db = K_Model::getInstanceDb(false);
    	return $this->getRow($where,$field,$this->oauth);
    }
    
    /**
     * 获取某个用户的第三方绑定信息
     * @param array $where
     * @param array $order
     * @return int
     */
    public function get_user_bindinfo($where,$order = ''){
    	$this->db = K_Model::getInstanceDb(false);
    	return $this->getAll($where,$order,$this->oauth);
    }
    
    /**
     * 第三方信息更新
     * @param array $where
     * @param array $field
     * @return boolean
     */
    public function update_oauth($where,$field){
    	$this->db = K_Model::getInstanceDb(true);
    	return $this->update($where,$field,$this->oauth);
    }
    
}
?>