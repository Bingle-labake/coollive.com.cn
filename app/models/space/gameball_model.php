<?php
/**
 * 赛酷 赛点功能模块
 * ============================================================================
 *   
 * 
 * ============================================================================
 * $Author: Bingle $
 * $Id: gameball_model.php 17171 2014-09-04 12:30:00Z Bingle $
*/
class Gameball_model extends K_Model {
	private $model_data = '';
	private $credit_config = array ();
	
	/**
	 * 构造函数
	 *
	 * @access public
	 * @return mix
	 */
	function __construct() {
		parent::__construct ();
		$this->model_name = "";
		$this->model_name_log = "sk_gameball_log";
		$this->model_recharge   = "sk_recharge";//充值日志
	}
	
	/**
	 * 购买道具(包含逻辑结构)
	 *
	 * @access public
	 * @param array $uid
	 *        	用户ID
	 * @param string $sn_code
	 *        	订单ID
	 * @param boolean $vpid
	 *        	道具标示
	 * @param boolean $pay_price
	 *        	支付赛点数
	 * @param int $num
	 *        	数量
	 *        	
	 * @return int 返回数字。-1:用户不存在； -2：赛点不够； -3：赠送赛点失败 ；-4:赛点配置不存在  0：赛点日志失败； 大于0 成功
	 */
	public function buy_magic_by_gameball($uid, $sn_code, $vpid, $pay_price, $num = 1) {
		$this->db = K_Model::getInstanceDb ( true );
		
		$this->load->model ( 'space/member_db', 'member_m' );
		$this->load->model ( 'eshop/vgoods_model', 'vgoods_m' );
				
		$magic = $this->getRow(array('vg_ide'=>$vpid), array(), 'sk_vgoods');
		if(!empty($magic)) {	
			// 判断用户赛点情况
			$credit_set = array ();
			$member = $this->member_m->get_user ( array (
					'uid',
					'gameballs'
			), array (
					'uid' => $uid 
			) );			
			if (! empty ( $member )) {
				$i_has_gameball = abs($member['gameballs']);				
				if($magic['pay_is_and'] == 1) {//金币和赛点必须满足
				    return - 3;//多货币支付
				}else {
				    if($pay_price>0) {
						$pay_price = abs($pay_price);
					}else {
						if($num<=0) {
							$num = 1;
						}
						$pay_price = abs($magic['gameball_price'])*$num;
					}					
					if($i_has_gameball>=$pay_price) {
						//符合购买条件
						$credit_set = array (
								'gameballs' => -$pay_price
						);
					}else {
						return - 4;//异常 赛点不够	
					}
				}				
			} else {
				return - 2; // 用户不存在
			}

			// 改变会员的赛点值#############
			$flag = $this->member_m->inc_val ( $uid, $credit_set );
			if ($flag) {				
				// 添加消费赛点日志
				$log_id = $this->add_log ( $uid, $sn_code, $vpid, $pay_price, $num );
				if ($log_id > 0) {
					return $log_id;
				} else {
					return 0;//日志失败
				}
			} else {
				return - 5; // 购买道具失败
			}
		} else {
			return -1; // 购买的道具不存在
		}
	}

	
	/**
	 * 获取赛点日志
	 *
	 * @access public
	 * @param int $uid
	 *        	用户ID
	 * @param int $vpid
	 *        	虚拟物品ID
	 * @param int $record_time
	 *        	大于或等于该时间
	 *
	 * @return array 返回赛点LOG。
	 */
	public function get_logs($uid, $vpid, $record_time = 0) {
		$this->db = K_Model::getInstanceDb ( true );
		$where = " vp_ide = '".$vpid. "' and uid=".$uid;		
		if($record_time>0) {
			$where .= " and record_time>=".$record_time;
		}
		return $this->getAll($where, 'record_time desc', $this->model_name_log);
	}
	
	/**
	 * 获取赛点兑换日志统计数量
	 *
	 * @access public
	 * @param int $uid
	 *        	用户ID
	 * @param int $vpid
	 *        	虚拟物品ID
	 * @param int $record_time
	 *        	大于或等于该时间
	 *
	 * @return int 返回赛点LOG数量。
	 */
	public function get_logs_count($uid, $vpid, $record_time = 0) {
	$this->db = K_Model::getInstanceDb ( true );
		$where = " where vp_ide = '".$vpid. "' and uid=".$uid;		
		if($record_time>0) {
			$where .= " and record_time>=".$record_time;
		}
		return $this->getCount($where, $this->model_name_log);
	}
	
	
	/**
	 * 添加消费赛点日志
	 *
	 * @access public
	 * @param int $uid
	 *        	用户ID
	 * @param string $sn_code
	 *        	订单ID
	 * @param string $vp_ide
	 *        	虚拟物品标记
	 * @param int $pay_price
	 *        	花费赛点多少
	 * @param int $act
	 *        	花费来源        
	 *        	
	 * @return int 赛点日志ID。
	 */
	public function add_log($uid, $sn_code, $vp_ide, $pay_price, $num = 1, $act = 'buy') {
		$this->db = K_Model::getInstanceDb ( true );

		$data = array (
				'uid' => $uid,
				'sn_code' => $sn_code,
				'vp_ide' => $vp_ide,
				'pay_price' => abs($pay_price),
				'num' => $num,
				'pay_act' => $act,
				'record_time' => time () 
		);
		return $this->add ( $data, 'id', $this->model_name_log );
	}

	
	/**
	 * 获取赛点列表
	 *
	 * @access public
	 * @param int $uid
	 *        	用户ID
	 * @param int $method
	 *        	1:获取赛点 2:使用赛点 0:所以的
	 * @param int $page
	 *        	动作等级
	 * @param int $size
	 *        	页面大小
	 * @param int $is_count
	 *        	是否返回总数
	 *        	
	 * @return array 返回赛点记录
	 */
	public function get_list_by_uid($uid, $method = 0, $page = 1, $size = 10, $is_count = FALSE) {
		$this->db = K_Model::getInstanceDb ( true );
		
		$offset = ($page - 1) * $size;
		$limit = $size;
		$where = 'where cl.uid =' . $uid;
		if (in_array ( $method, array (
				0,
				1,
				2 
		) )) {
			if ($method > 0) {
				$where .= ' and cl.method = ' . $method;
			}
		}
		$sql = 'select cl.*, cc.name as act_name, cc.level as cat_level, cc.desc from ' . $this->model_name_log . ' as cl left join ' . $this->model_name_config . ' as cc on cl.act=cc.act ' . $where . ' order by cl.record_time desc limit ' . $offset . ', ' . $limit;
		$query = $this->db->query ( $sql );
		$result ['list'] = $query->result_array ();
		if ($is_count) {
			$sql = 'select count(*) as c from ' . $this->model_name_log . ' as cl ' . $where;
			$query = $this->db->query ( $sql );
			$rec = $query->result_array ();
			if (isset ( $rec [0] )) {
				$result ['count'] = $rec [0] ['c'];
			} else {
				$result ['count'] = 0;
			}
		}
		return $result;
	}
	
	/**
	 * 获取赛点列表
	 *
	 * @access public
	 * @param int $uid
	 *        	用户ID
	 * @param int $vp_type
	 *        	道具类型
	 * @param int $page
	 *        	当前页
	 * @param int $size
	 *        	页面大小
	 * @param int $is_count
	 *        	是否返回总数
	 *
	 * @return array 返回赛点记录
	 */
	public function get_list_by_type($uid, $vp_type = 'magic', $page = 1, $size = 10, $is_count = FALSE) {
		$this->db = K_Model::getInstanceDb ( true );
	
		$offset = ($page - 1) * $size;
		$limit = $size;
		$where = 'where gl.uid =' . $uid;
	    if (!empty($vp_type)) {
		    $where .= " and gl.vp_type = '" . $vp_type ."'";
		}
		$sql = 'select gl.* from ' . $this->model_name_log . ' as gl ' . $where . ' order by gl.record_time desc limit ' . $offset . ', ' . $limit;
		$query = $this->db->query ( $sql );
		$result ['list'] = $query->result_array ();
		if ($is_count) {
			$sql = 'select count(*) as c from ' . $this->model_name_log . ' as gl ' . $where;
			$query = $this->db->query ( $sql );
			$rec = $query->result_array ();
			if (isset ( $rec [0] )) {
				$result ['count'] = $rec [0] ['c'];
			} else {
				$result ['count'] = 0;
			}
		}
		return $result;
	}
	
	/**
	 * 获取充值记录
	 *
	 * @access public
	 * @param int $uid
	 *        	用户ID
	 * @param int $page
	 *        	当前页
	 * @param int $size
	 *        	页面大小
	 * @param int $is_count
	 *        	是否返回总数
	 *
	 * @return array 返回充值记录
	 */	
	public function get_inpour($uid, $page = 1, $size = 10, $is_count = FALSE) {
		$this->db = K_Model::getInstanceDb ( true );
		
		$offset = ($page - 1) * $size;
		$limit = $size;
		$where = 'where r.uid =' . $uid;
		$sql = 'select r.* from ' . $this->model_recharge . ' as r ' . $where . ' order by r.dateline desc limit ' . $offset . ', ' . $limit;
		$query = $this->db->query ( $sql );
		$result ['list'] = $query->result_array ();
		if ($is_count) {
			$sql = 'select count(*) as c from ' . $this->model_recharge . ' as r ' . $where;
			$query = $this->db->query ( $sql );
			$rec = $query->result_array ();
			if (isset ( $rec [0] )) {
				$result ['count'] = $rec [0] ['c'];
			} else {
				$result ['count'] = 0;
			}
		}
		return $result;
	}
}
?>