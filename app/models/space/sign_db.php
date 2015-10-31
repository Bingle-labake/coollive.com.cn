<?php
/**************************************************************************
 *   Path:   /model/space/sign_db.php
*   Comments:   报名模型
*   Author: Zhang Lin
*   Last Modified:  02.14.2014 / Zhang Lin
**************************************************************************/
class sign_db extends CI_Model {

	private $sign = 'sk_sign';
	private $sign_ext_info = 'sk_sign_ext_info';
	private $sign_ext_model = 'sk_sign_model';
	private $team = 'sk_team';
	private $game  = 'sk_game';
    function __construct()
    {
        parent::__construct();
		$this->Ma = $this->load->database('default',TRUE);
		$this->Sl = $this->load->database('sda',true);
    }
    
    /**
     * 添加报名信息
     * @param array $data
     * @return boolean
     */
    public  function add_sign($data){
        $sql = $this->Ma->insert_string($this->sign,$data);
        $result = $this->Ma->query($sql);
        if ($result) {
        	return @mysql_insert_id($this->Ma->conn_id);
        }else{
        	return false;
        }
    }
    
    /**
     * 添加报名信息
     * @param array $data
     * @return boolean
     */
    public  function add_sign_ext($data){
    	$sql = $this->Ma->insert_string($this->sign_ext_info,$data);
    	$result = $this->Ma->query($sql);
    	if ($result) {
    		return @mysql_insert_id($this->Ma->conn_id);
    	}else{
    		return false;
    	}
    }
    
    /**
     * 添加团体信息
     * @param array $data
     * @return boolean
     */
    public  function add_team($data){
    	$sql = $this->Ma->insert_string($this->team,$data);
    	$result = $this->Ma->query($sql);
    	if ($result) {
    		return @mysql_insert_id($this->Ma->conn_id);
    	}else{
    		return false;
    	}
    }
    
    /** 更新报名信息
    * @param array $data
    * @param array $where
    * @return boolean
    */
    public function update_sign($data,$where){
    	$result = $this->myUpdate($this->sign,$data,$where);
    	return $result;
    }
    
    /**
     * 获取某个用户报名信息
     * @param array $field
     * @param array $where
     * @return array
     */
    public function get_sign($field,$where,$order = 'sid DESC'){
    	return $this->getOne($field,$where,$this->sign,$order);
    }
    
    /**
     * 获取某个用户报名的扩展信息
     * @param int $sid
     * @return array
     */
    public function get_sign_ext_info($sid){
    	$sql = "select * from $this->sign_ext_info where sid=$sid";
    	$data = $this->Sl->query($sql)->result_array();
    	$this->Sl->query($sql)->free_result();
    	return $data;
    }
    
     /**
     * 获取单个团体信息
     * @param array $field
     * @param array $where
     * @return array
     */
    public function get_team($field,$where){
    	$user = $this->getOne($field,$where,$this->team);
    	return $user;
    }
    
    /**
     * 获取团体报名的参赛形式
     * @param string $name
     * @param int $cate_id
     * @return array
     */
    public function get_team_sign_efid($name,$cate_id){
    	$sql = "select cate_id from $this->sign a left join $this->team b on a.tid=b.tid
    	                     where b.name='".$name."' and a.cate_id=$cate_id";
    	$data = $this->Sl->query($sql)->result_array();
    	$this->Sl->query($sql)->free_result();
    	return $data;
    }
    
    /**
     * 检查赛事id有效性
     * @param int $gid
     * @return boolean
     */
    public function is_gid_validate($gid){
    	$game = $this->getOne(array('status'),array('id'=>$gid),$this->game);
    	if (empty($game) || $game['status'] == 0) {
    		return false;
    	}else {
    		return true;
    	}
    }
    
    
    /**
     * 获取单条信息
     * @param array $field
     * @param array $where
     * @param string $table
     * @return array
     */
    private function getOne($field,$where,$table,$order = ''){
       if (!empty($field)) {
    			$field = implode(',', $field);
    		}else {
    			$field = '*';
    	}
    	
    	if (!empty($where)) {
    		foreach ($where as $k=>$v){
    			$w[] = $k.'='."'$v'";
    		}
    		$where = 'WHERE '.implode(' AND ', $w);
    	}else {
    		$where = '';
    	}
    	$order = !empty($order) ? " ORDER BY $order" : '';
    	$sql = "SELECT $field FROM $table $where $order";
    	$data = $this->Sl->query($sql)->result_array();
    	$this->Sl->query($sql)->free_result();
    	return !empty($data) ? $data[0] : array();
    }
    
    /**
     * 更新
     * @param array $data
     * @param array $where
     * @param string $table
     * @return boolean
     */
    private function myUpdate($table,$data,$where){
    	if (!empty($data)) {
    		foreach ($data as $k=>$v){
    			$d[] = $k.'='."'$v'";
    		}
    		$data = implode(',', $d);
    		if (!empty($where)) {
    			foreach ($where as $k=>$v){
    				$w[] = $k.'='."'$v'";
    			}
    			$where = 'WHERE '.implode(' AND ', $w);
    		}else {
    			$where = '';
    		}
    		$sql = "UPDATE $table SET $data $where";
    		$result = $this->Ma->query($sql);
    		return $result ? true : false;
    	}else {
    		return false;
    	}
    }
    
    //获取扩展
    public function  get_ext_model($name) {
    	if(!empty($name)) {
    		$sql = "select * from ".$this->sign_ext_model." where mod_name = '".$name."' order by id asc";
    		$query = $this->Sl->query($sql);
    		return $query->result_array();
    	}else {
    		return false;
    	}
    }  
}
?>