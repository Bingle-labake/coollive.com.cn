<?php
class MY_Model extends CI_Model {
	var $CI;
	private static $_db;
	function __construct()
	{
		parent::__construct();
		$this->CI =& get_instance();
	}
	
	//单例方法,用于访问实例的公共的静态方法
	public static function getInstanceDb($is_master = false){
		$CI =& get_instance();
	    if($is_master) {
			self::$_db = $CI->load->database('default', true);
		}else {
			self::$_db = $CI->load->database('sda',true);
		}
		return self::$_db;
	}
    
    public static function getInstanceDbs($is_master='sda')
    {
        $CI =& get_instance();
        switch ($is_master) {
			case 'def'://主库
				self::$_db = $CI->load->database('default', true);
				break;
			case 'sda'://从库
                self::$_db = $CI->load->database('sda',true);
                break;
            case 'topic'://topic
                self::$_db = $CI->load->database('topic',true);
                break;
			default :
				self::$_db = $CI->load->database('sda',true);
				break;
        }
        return self::$_db;
    }
	
	/*
	 *获取某一个值
	*@where:Array()   查询条件
	*@fileds:array()  输出字段
	*#return Array
	*/
	public function getOne($where, $fileds, $mod_name = "") {
		if(!empty($fileds)) {
			$this->db->select($fileds);
		}
		$tb_name = $mod_name;
		if(empty($tb_name)) {
			$tb_name = $this->model_name;
		}
	
		$query = $this->db->get_where($tb_name, $where);
		$result = $query->result_array();
	
		if(!empty($result)) {
			return $result[0][$fileds];
		}else {
			return false;
		}
	}
	
	
	/*
	 *获取某一条记录
	*@where:array("a"=>1)   获取条件
	*@fileds:array("a","b")  返回字段
	#return:array()
	*/
	function getRow($where, $fileds = array(), $mod_name = "") {
		if(!empty($fileds)) {
			if(is_array($fileds)) {
				$fileds = implode(", ", $fileds);
			}			
			$this->db->select($fileds);
		}
	
		$tb_name = $mod_name;
		if(empty($tb_name)) {
			$tb_name = $this->model_name;
		}
	
		$query = $this->db->get_where($tb_name, $where);
		$result = $query->result_array();
	
		if(!empty($result)) {
			return $result[0];
		}else {
			return false;
		}
	}
	
	
	/*
	 *获取符合条件的所有记录
	*@where:array("a"=>1)   获取条件
	#return:array()
	*/
	public function getAll($where = array(), $order_by = '', $mod_name = "") {
		$tb_name = $mod_name;
		if(empty($tb_name)) {
			$tb_name = $this->model_name;
		}
	
		if(is_array($where)) {
			if(!empty($order_by)) {
				$query = $this->db->where($where)
				->order_by($order_by)
				->get($tb_name);
			}else {
				$query = $this->db->get_where($tb_name, $where);
			}
		}else {
			if(!empty($order_by)) {
				$order_by = ' order by '.$order_by;
			}
			if(empty($where)) {
				$sql = 'select * from '.$tb_name.$order_by;
			}else {
				$sql = 'select * from '.$tb_name.' where '.$where.$order_by;
			}
			$query = $this->db->query($sql);
		}
		$result = $query->result_array();
	
		if(!empty($result)) {
			return $result;
		}else {
			return false;
		}
	}
	
	/*
	 *添加商品
	*@row        :array()     //入库的记录
	*@uni_id_name:string      //唯一自增长字段
	#return      :numeric     //返回数字 大于0表示插入成功。
	*/
	function add($row, $ret_id = true, $mod_name = "") {
		return $this->insert($row, $ret_id, $mod_name);
	
	}
	
	/*
	 *添加商品
	*@row        :array()     //入库的记录
	*@uni_id_name:string      //唯一自增长字段
	#return      :numeric     //返回数字 大于0表示插入成功。
	*/
	function insert($row, $ret_id = true, $mod_name = "") {
		if(!empty($row) && is_array($row)) {
			$tb_name = $mod_name;
			if(empty($tb_name)) {
				$tb_name = $this->model_name;
			}
			$res = $this->db->insert($tb_name, $row);
			if($ret_id) {
				return $this->db->insert_id();
			}else {
				return $res;
			}
		}else {
			return 0;
		}
	}
	
	
	
	/*
	 *删除记录
	*@where:array()   //删除条件
	#return:boolean   //删除是否成功
	*/
	function del($where, $mod_name = "") {
		return $this->remove($where, $mod_name);
	}
	
	/*
	 *删除记录
	*@where:array()   //删除条件
	#return:boolean   //删除是否成功
	*/
	function remove($where, $mod_name = "") {
		$tb_name = $mod_name;
		if(empty($tb_name)) {
			$tb_name = $this->model_name;
		}
		return $this->db->delete($tb_name, $where);
	}
	
	/*
	 *修改记录
	*@where    : array("_id"=>1)        //修改条件
	*@set: array("b"=>2, "c"=>3)  //待修改数据
	#return:boolean
	*/
	public function update($where, $set, $mod_name = "") {
		$tb_name = $mod_name;
		if(empty($tb_name)) {
			$tb_name = $this->model_name;
		}
		return $this->db->update($tb_name, $set, $where);
	}
	
	/*
	 *查询列表
	*@paras $where string 查询条件
	*@paras $page  int  页面page
	*@paras $size  int  limit 大小
	*@paras $order_by  string  排序
	*/
	public function getlist($where = '', $page = 1, $size = 10, $order_by = '', $mod_name = "") {
		$tb_name = $mod_name;
		if(empty($tb_name)) {
			$tb_name = $this->model_name;
		}
		
		if($page <= 0) {
			$page = 1;
		}
		if($size <=0 || $size > 100) {
			$size = 10;
		}
		$offset = ($page-1)*$size;
	
		if(empty($order_by)) {
			$sql = "select * from ".$tb_name." ".$where." limit $offset, $size";
		}else {
			$sql = "select * from ".$tb_name." ".$where." order by ".$order_by. " limit $offset, $size";
		}
		$query = $this->db->query($sql);
		return $query->result_array();
	}
	
	public function getCount($where = '', $mod_name = "") {
		$tb_name = $mod_name;
		if(empty($tb_name)) {
			$tb_name = $this->model_name;
		}
		
		$sql = "select count(*) as c from ".$tb_name." ".$where;
		$query = $this->db->query($sql);
		$res = $query->result_array();
		if($res) {
			return $res[0]['c'];
		}else {
			return 0;
		}
	}
	
	public function isExist($where, $mod_name = "") {
		$tb_name = $mod_name;
		if(empty($tb_name)) {
			$tb_name = $this->model_name;
		}
		$res = $this->db->get_where($tb_name, $where, 2, 0)
		->result_array();
		if(empty($res)) {
			return false;
		}else {
			return true;
		}
	}
}

class Sk_Model extends MY_Model {
	protected $model_name;
	function __construct()
	{
		parent::__construct();			
		$this->db = $this->CI->load->database('default', true);		
	}
}

class K_Model extends MY_Model {	
	public $db = null;
	
	function __construct()	{
		parent::__construct();	
	}
}

?>