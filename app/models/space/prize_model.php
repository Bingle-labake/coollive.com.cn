<?php
/**
 * 赛酷  奖品功能模块
 * ============================================================================
 *   
 * 
 * ============================================================================
 * $Author: Bingle $
 * $Id: prize_model.php 17171 2014-06-18 11:30:00Z Bingle $
*/
class Prize_model extends K_Model {
	private $model_data = '';
	
	/**
	 * 构造函数
	 *
	 * @access public
	 * @return mix
	 */
	function __construct() {
		parent::__construct ();
		$this->model_name = "sk_prize"; // 奖品
		$this->model_name_log = "sk_prize_log"; // 奖品日志
	}
	
	//兑换奖品
	function buy($uid, $prize, $order_id = '') {
		if($uid>0 && !empty($prize)) {
			$this->db = K_Model::getInstanceDb ( true );
			$prize_ide = $prize['identifier'];				
			if(!empty($prize_ide)) {				
				$flag = $this->pay_rater_credit($uid, $prize['convert_value']);
				$log_id = 0;
				if($flag) {
					$log_id = $this->add_prize_log($order_id, $uid, $prize['identifier'], $prize['convert_type'], $prize['convert_value']);
					if($log_id) {
						//改变库存
						if($prize['num'] != -100) {
							$this->inc_sale_num($prize_ide, true);
						}else {
							$this->inc_sale_num($prize_ide);
						}						
					}
				}
				return $log_id;
			}			
		}
		return 0;
	}
	
	
	/**
	 * 获取一个有效的作品
	 *
	 * @access  public
	 * @param   int     $prize_ide   奖品标示
	 *
	 * @return  array/bool
	 */
	public function get_prize($prize_ide) {
		if(!empty($prize_ide)) {
			$this->db = K_Model::getInstanceDb ( true );	
			return $this->getRow(array('identifier'=>$prize_ide, 'available'=>1));			
		}else {
			return false;
		}
	}
	
	
	/**
	 * 判断奖品是否有效
	 *
	 * @access  public
	 * param   int      $uid          用户ID
	 * @param   int     $identifier   奖品标示
	 *
	 * @return  array/bool
	 */
	public function check_prize_by_buy($uid, $prize_ide) {
		$res = 0;
		if($uid>0 && !empty($prize_ide)) {
			$this->db = K_Model::getInstanceDb ( true );
			$this->load->model ( 'space/member_db', 'member_m' );
				
			$prize = $this->getRow(array('identifier'=>$prize_ide, 'available'=>1));
			$member = $this->member_m->get_user(array(), array('uid'=>$uid));
			if($prize && $member) {
				if($prize['num'] != -100) {
					if($prize['num']<=0) {
						return -5;//奖品已兑完
					}
				}
				/*$c_rater_credit_value = abs($prize['convert_value']);
				$c_right_rate         = $prize['right_rate'];
		
				$member_pk = $this->getRow(array('uid'=>$uid), '', 'sk_member_pk');
				if(!empty($member_pk)) {
					$u_rater_credit_value = $member_pk['rater_credit'];
					$u_right_rate         = $member_pk['right_rate'];
						
					if($c_rater_credit_value>0 && $c_right_rate>0) {
						if($u_rater_credit_value>=$c_rater_credit_value && $u_right_rate>=$c_right_rate) {
							return 1;
						}else {
							return -1;//积分或准确率未满足
						}
					}else {
						if($c_rater_credit_value>0) {
							if($u_rater_credit_value>=$c_rater_credit_value) {
								return 2;
							}else {
							    return -2;//积分未满足
						    }
						}
						if($c_right_rate>0) {
							if($u_right_rate>=$c_right_rate) {
								return 3;
							}else {
							    return -3;//准确率未满足
						    }
						}
					}
				}else {
					return -4;//评委积分为0
				}*/
				return 1;
			}else {
				return -6;//奖品不存在
			}
		}else {
			return -7;//参数异常
		}
	}
	
	
	//更新用户的评委积分
	public function pay_rater_credit($uid, $rate_credit) {
		if($uid>0) {
			$this->db = K_Model::getInstanceDb ( true );
			
			$row = $this->getRow(array('uid'=>$uid), '', 'sk_member_pk');
			if($rate_credit<0) {
				if($row['rater_credit'] < abs($rate_credit)) {
					if($row['rater_credit']>0) {
						$rate_credit = -$row['rater_credit'];
					}else {
						$rate_credit = 0;
					}					
				}
			}
			
			if($rate_credit>0) {
				$rate_credit = -$rate_credit;
			}
			$sql = "update sk_member_pk set rater_credit = rater_credit+".$rate_credit." where uid = ".$uid;
			return $this->db->query($sql);
		}else {
			return false;
		}		
	}	
	
	//获取评委积分
	public function get_rater_credit($uid) {
		if($uid>0) {
			$this->db = K_Model::getInstanceDb ( true );				
			$row = $this->getRow(array('uid'=>$uid), '', 'sk_member_pk');
			if($row) {
				return $row['rater_credit'];
			}else {
				return 0;
			}
		}else {
			return false;
		}
	}
	
	//获取评委准确率
	public function get_rater_rate($uid) {
		if($uid>0) {
			$this->db = K_Model::getInstanceDb ( true );
			$row = $this->getRow(array('uid'=>$uid), '', 'sk_member_pk');
			if($row) {
				return $row['right_rate'];
			}else {
				return 0;
			}
		}else {
			return false;
		}
	}
	

	/**
	 * 获取奖品列表
	 *
	 * @access  public
	 * @param   int     $gid          活动ID
	 *
	 * @return  array
	 */
	public function get_prize_list($gid = 0, $page = 1, $size = 10, $order_by = 'prizeid desc') {
		$this->db = K_Model::getInstanceDb ( true );
		
		$where = " where available = 1 ";
		if($gid>0) {
			$where .= " and gid = ".$gid;
		}
		$list = $this->getlist($where, $page, $size, $order_by);
		
		return $list;
	}
	
	/**
	 * 获取奖品总数
	 *
	 * @access  public
	 * @param   int     $identifier          奖品标示
	 *
	 * @return  array
	 */
	public function get_prize_count($gid = 0) {
		$this->db = K_Model::getInstanceDb ( true );
	
		$where = ' where available = 1 ';
		if($gid>0) {
			$where .= " and gid = ".$gid;
		}
		return $this->getCount($where);
	}
	
	
	/**
	 * //购买奖品记录
	 *
	 * @access  public
	 * @param   string  $order_id     订单号
	 * @param   int     $uid          用户ID
	 * @param   int     $mag_id       奖品的标示ＩＤ
	 * @param   int     $c_type       购买奖品消耗的类型
	 * @param   int     $c_value      购买奖品消耗的的值
	 *
	 * @return  array
	 */	
	private function add_prize_log($order_id, $uid, $identifier, $c_type, $c_value) {
		$this->db = K_Model::getInstanceDb ( true );
		
		$row = array();
		$row['oid']           = $order_id;
		$row['uid']           = $uid;
		$row['identifier']    = $identifier;		
		$row['status']        = 1;
		$row['convert_type']  = $c_type;
		$row['convert_value'] = $c_value;	
		$row['dateline']      = time();
		
		return $this->add($row,'id', $this->model_name_log);		
	}	
	
	
	/**
	 * 增加购买数量,减少数量
	 *
	 * @access  public
	 * @param   int     $identifier          奖品标示
	 * @param   bool    $limit               是否限量
	 *
	 * @return  array
	 */
	public function inc_sale_num($identifier, $limit = false) {
		$this->db = K_Model::getInstanceDb ( true );
		if($limit) {
			$sql = "update ".$this->model_name." set salevolume = salevolume + 1, num = num -1 where identifier = '".$identifier ."'";
		}else {
			$sql = "update ".$this->model_name." set salevolume = salevolume + 1 where identifier = '".$identifier ."'";
		}		
		return $this->db->query($sql);		
	}
	
	
	/**
	 * 获取奖品明细列表
	 *
	 * @access public
	 * @param int $uid
	 *        	用户ID
	 * @param int $page
	 *        	分页
	 * @param int $size
	 *        	页面大小
	 * @param int $is_count
	 *        	是否返回总数
	 *
	 * @return array 返回积分记录
	 */
	public function get_rater_prize_list_by_uid($uid, $page = 1, $size = 10, $is_count = FALSE) {
		$this->db = K_Model::getInstanceDb ( false );
	
		$offset = ($page - 1) * $size;
		$limit = $size;
		$where = 'where ml.uid =' . $uid ;
			
		$sql = 'select ml.*, m.name as ide_name, m.description, m.right_rate from ' . $this->model_name_log .
		       ' as ml left join ' . $this->model_name . ' as m on ml.identifier=m.identifier ' . $where . 
		       ' order by ml.dateline desc limit ' . $offset . ', ' . $limit;
		$query = $this->db->query ( $sql );
		$result ['list'] = $query->result_array ();
		if ($is_count) {
			$sql = 'select count(*) as c from ' . $this->model_name_log . ' as ml ' . $where;
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
	
	//########################################################
	//收货地址
	//########################################################
	
	/**
	 * 获取收货地址列表
	 *
	 * @access  public
	 * @param   int     $uid          用户ID
	 *
	 * @return  array
	 */
	public function get_exp_addr_list($uid = 0, $page = 1, $size = 10, $order_by = 'id desc') {
		$this->db = K_Model::getInstanceDb ( true );
	
		if($uid>0) {
			$where = " where uid = ".$uid;			
			$list = $this->getlist($where, $page, $size, $order_by, 'sk_addr_express');
			
			return $list;
		}else {
			return false;
		}		
	}
	
	/**
	 * 获取收货地址总数
	 *
	 * @access  public
	 * @param   int     $uid          用户ID
	 *
	 * @return  array
	 */
	public function get_exp_addr_count($uid) {
		$this->db = K_Model::getInstanceDb ( true );
	
		if($uid>0) {
			$where = " where uid = ".$uid;
			return $this->getCount($where, 'sk_addr_express');
		}else {
			return 0;
		}		
	}
	
	
	/**
	 * //添加收货地址
	 *
	 * @access  public
	 * @param   int     $data          收货地址数据
	 *
	 * @return  array
	 */
	public function add_exp_addr($data) {
		$this->db = K_Model::getInstanceDb ( true );
	
		$row = array();
		$row['uid']              = $data['uid'];
		$row['exp_username']     = $data['exp_username'];
		$row['province']         = $data['province'];
		$row['city']             = $data['city'];
		$row['area']             = $data['area'];
		$row['address']          = $data['address'];
		$row['mobile']           = $data['mobile'];
		$row['phone']            = $data['phone'];
		$row['email']            = $data['email'];
		$row['record_date']      = date("Y-m-d H:i:s");
	
		return $this->add($row,'id', 'sk_addr_express');
	}
	
	/**
	 * //获取收货地址
	 *
	 * @access  public
	 * @param   int     $uid          用户ID
	 * @param   int     $exp_id       收货地址ID
	 * @param   int     $set          收货地址修改项
	 *
	 * @return  array
	 */
	public function get_exp_addr($uid, $exp_id) {
		$this->db = K_Model::getInstanceDb ( true );
	
		$where = array('uid'=>$uid, 'id'=>$exp_id);
		return $this->getRow($where, '', 'sk_addr_express');
	}
	
	/**
	 * //修改收货地址
	 *
	 * @access  public
	 * @param   int     $uid          用户ID
	 * @param   int     $exp_id       收货地址ID
	 * @param   int     $set          收货地址修改项
	 *
	 * @return  array
	 */
	public function update_exp_addr($uid, $exp_id, $set) {
		$this->db = K_Model::getInstanceDb ( true );
	
		$where = array('uid'=>$uid, 'id'=>$exp_id);	
		return $this->update($where, $set, 'sk_addr_express');
	}
	
	/**
	 * //删除收货地址
	 *
	 * @access  public
	 * @param   int     $uid          用户ID
	 * @param   int     $mag_id       奖品的标示ＩＤ
	 * @param   int     $c_type       购买奖品消耗的类型
	 * @param   int     $c_value      购买奖品消耗的的值
	 *
	 * @return  array
	 */
	public function remove_exp_addr($uid, $exp_id) {
		$this->db = K_Model::getInstanceDb ( true );
	
		$where = array('uid'=>$uid, 'id'=>$exp_id);	
	    return $this->remove($where, 'sk_addr_express');
	}
	
	/**
	 * 更新订单记录
	 * @param string 订单号
	 * @param array 更新字段
	 * @return boolean
	 */
	public function update_order($order_id,$set){
		$this->db = K_Model::getInstanceDb ( true );
		
		$where = array('oid'=>$order_id);
		return $this->update($where, $set, $this->model_name_log);
	}
}
?>