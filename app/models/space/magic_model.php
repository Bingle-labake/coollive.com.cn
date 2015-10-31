<?php
/**
 * 赛酷 道具功能模块
 * ============================================================================
 *   
 * 
 * ============================================================================
 * $Author: Bingle $
 * $Id: magic_model.php 17171 2014-04-29 11:30:00Z Bingle $
*/
class Magic_model extends K_Model {
	private $model_data = '';
	const MAGIC_ID_DVT = 'direct_vote_ticket', MAGIC_ID_SP = 'stride_pk', MAGIC_ID_DC = 'double_fighting';	
	
	/**
	 * 构造函数
	 *
	 * @access public
	 * @return mix
	 */
	function __construct() {
		parent::__construct ();
		$this->model_name = "sk_magics"; // 道具
		$this->model_name_log = "sk_magic_log"; // 道具日志
		
		
	}	
	
	public function getRow($where, $fileds = array(), $mod_name = "") {
		$this->db = K_Model::getInstanceDb ( true );
		
		return parent::getRow($where, $fileds, $mod_name);
	}
	
	/**
	 * //购买道具(赛点购买)
	 *
	 * @access  public
	 * @param   int     $identifier     道具商品ID
	 * @param   int     $uid            购买用户
	 * @param   array   $count_price    购买总价格 $count_price = array('gameballs'=>0, 'gold'=>0);
	 * @param   int     $num            购买数量
	 * @param   int     $is_using       flase:仅仅购买不使用  true:购买且使用完成(一次性)   2:购买使用中(持续)
	 *
	 * @return  int     $mag_log_id   返回购买道具ID（返回调用）
	 */
	public function buy($uid, $identifier, $count_price, $num = 1, $is_using = false) {
		$num = $num<=0?1:$num;	
		if($uid > 0) {
			if($num>0 && !empty($identifier)) {
				$this->db = K_Model::getInstanceDb ( true );
				
				$is_run = true;
				$this->load->model('space/member_db','member_m');
				$this->load->model('space/gameball_model','gameball_m');
				$magic = $this->getRow(array('identifier'=>$identifier));
				if(!empty($magic)) {
					if($magic['pay_is_and'] == 1) {//多虚拟币支付(还没有改需求),默认采用赛点
						$res['code'] = -4;
						$res['error'] = "购买失败！";
					}else {		
						if(isset($count_price['gameballs'])) {
							$count_gb = $count_price['gameballs'];
							$user = $this->member_m->get_user(array('gameballs','credits'), array('uid'=>$uid));
							if($user['gameballs'] < $count_gb) {
								$res['code'] = -5;
								$res['error'] = "你赛点不够！";
							}else {
								
								$sn_code = make_rand_code();//订单ID
								//购买道具订单
								$buy_ok_num = 0;
								$log_ids = '';
								for($ii = 0;$ii<$num; $ii++) {
									$log_id = 0;
									$log_id = $this->add_magic_log($uid, $identifier, $sn_code, 0, 0);
									if($log_id>0) {
										$buy_ok_num++;
										if(empty($log_ids)) {
											$log_ids = $log_id;
										}else {
											$log_ids .= ",".$log_id;
										}
									}
								}
								
								if($buy_ok_num == $num) {
								    //扣除赛点
									$flag = $this->gameball_m->buy_magic_by_gameball($uid, $sn_code, $identifier, $count_gb, $num);//扣除赛点
									if($flag>0) {
										$flag = $this->update_magic_order($uid, $log_ids, 1);
									}else {
										$this->update_magic_order($uid, $log_ids, -1);
									}
									
									if(!empty($log_ids) && $flag>0) {
										if($is_using) {
											$this->callback_disable($log_ids, $is_using);
										}
										$res['code'] = $log_ids;
									}else {
										$res['code'] = -6;
										$res['error'] = "购买失败！";
									}
								}else {
									$res['code'] = -7;
									$res['error'] = "订单失败！";
								}								
							}
						}else {
							$res['code'] = -4;
							$res['error'] = "参数异常！";
						}
					}
				}else {
					$res['code'] = -3;
					$res['error'] = "道具不存在！";
				}
			}else {
				$res['code'] = -2;
				$res['error'] = "参数异常！";
			}
		}else {
			$res['code'] = -1;
			$res['error'] = "参赛异常!";
		}
	    
		return $res['code'];		
	}	
	
	/**
	 * 改变道具日志订单状态
	 *
	 * @access  public
	 * @param   int     $uid          用户ID
	 * @param   int     $logs_ids     道具日志ids
	 * @param   int     $order_status 订单状态
	 *
	 * @return  array
	 */	
	public function update_magic_order($uid, $logs_ids, $order_status = 0) {
		if($uid>0 && !empty($logs_ids)) {
			$this->db = K_Model::getInstanceDb ( true );
			
			$sql = "update ".$this->model_name_log." set order_status = $order_status where uid = $uid and id in($logs_ids)";
			return $this->db->query($sql);
		}else {
			return false;
		}	
	}
	
	/**
	 * //获取一个有效的道具（某一个人的）
	 *
	 * @access  public
	 * @param   int     $uid          用户ID
	 * @param   int     $id           道具自增ID
	 * @param   int     $mag_id       道具的标示ＩＤ
	 *
	 * @return  array
	 */
	public function get_one_valid_magic_log($uid, $id, $identifier = '') {
		if($uid>0) {
			$this->db = K_Model::getInstanceDb ( true );
				
			$magic_log = array();
			if($id>0) {//具体的单个道具
				$where = array('uid'=>$uid, 'id'=>$id, 'status'=>1);
			}
			if(!empty($identifier)) {//随机取一个
				$where = array('uid'=>$uid, 'identifier'=>$identifier, 'status'=>1);
			}
			if(empty($where)) {
				return false;
			}else {
				return $this->getRow($where,'', $this->model_name_log);
			}
		}else {
			return false;
		}
	}
	
	/**
	 * //获取多个有效的道具（某一个人的）
	 *
	 * @access  public
	 * @param   int     $uid          用户ID
	 * @param   int     $mag_id       道具的标示ＩＤ
	 * @param	int		$limit		  获取数量，默认获取所有
	 *
	 * @return  array
	 */
	public function get_multi_valid_magic_log($uid,$identifier = '',$limit = '') {
		if($uid>0) {
			$this->db = K_Model::getInstanceDb ( true );
			$this->db->where(array('uid'=>$uid,'identifier'=>$identifier,'status'=>1));		
			if(!empty($limit)){
				$this->db->limit($limit);
			}
			$arr = $this->db->get($this->model_name_log)->result_array();
			return (count($arr) != $limit)? false:$arr;
		}else {
			return false;
		}
	}

	/**
	 * 获取道具信息
	 *
	 * @access  public
	 * @param   array     $where          条件
	 *
	 * @return  array
	 */	
	public function get_magic($where, $is_all = false) {
		$this->db = K_Model::getInstanceDb ( true );
		
		if(!empty($where)) {
			if($is_all) {
				return $this->getAll($where);
			}else {
				return $this->getRow($where);
			}			
		}else {
			return false;
		}		
	}
	
	/**
	 * 获取道具日志(订单)信息
	 *
	 * @access  public
	 * @param   int     $sn_code       (订单ID)
	 *
	 * @return  array
	 */	
	public function get_magic_order($sn_code) {		
		if(!empty($sn_code)) {
			$this->db = K_Model::getInstanceDb ( true );
			
			$where = array('sn_code'=>$sn_code);
			return $this->getRow($where, array('id','uid','identifier','status', 'useing'), $this->model_name_log);
		}else {
			return false;
		}
	}

	/**
	 * 获取道具列表
	 *
	 * @access  public
	 * @param   int     $identifier          道具标示
	 *
	 * @return  array
	 */
	public function get_magic_list($page = 1, $size = 10) {
		$this->db = K_Model::getInstanceDb ( true );
		
		$where = ' where status > 0 ';
		$order_by = ' magicid asc';
		$list = $this->getlist($where, $page, $size, $order_by);
		
		return $list;
	}
	
	/**
	 * 获取道具总数
	 *
	 * @access  public
	 * @param   int     $identifier          道具标示
	 *
	 * @return  array
	 */
	public function get_magic_count() {
		$this->db = K_Model::getInstanceDb ( true );
	
		$where = ' where status > 0 ';
		return $this->getCount($where);
	}
	
	
	/**
	 * //购买道具记录
	 *
	 * @access  public
	 * @param   int     $uid            用户ID
	 * @param   int     $identifier     道具的标示ＩＤ
	 * @param   int     $sn_code        订单ID
	 * @param   int     $status         是否失效
	 * @param   int     $useing         是否使用中
	 *
	 * @return  array
	 */	
	public function add_magic_log($uid, $identifier, $sn_code = "", $status = 1, $useing=0, $order_status = 0) {
		$this->db = K_Model::getInstanceDb ( true );
		
		$row = array();
		$row['uid']            = $uid;
		$row['identifier']     = $identifier;
		$row['sn_code']        = $sn_code;
		$row['useing']         = 0;
		$row['status']         = 1;
		$row['order_status']   = $order_status;
		$row['dateline']       = time();
		
		return $this->add($row,'id', $this->model_name_log);		
	}	
	
	
	/**
	 * 增加购买数量
	 *
	 * @access  public
	 * @param   int     $identifier          道具标示
	 *
	 * @return  array
	 */
	public function inc_sale_num($identifier) {
		$this->db = K_Model::getInstanceDb ( true );
		$sql = "update ".$this->model_name." set salevolume = salevolume + 1 where identifier = '".$identifier ."'";
		return $this->db->query($sql);		
	}
	
	
	/**
	 * //检测道具状态
	 *
	 * @access  public
	 * @param   int     $uid          用户ID
	 * @param   int     $identifier   道具的标示
	 *
	 * @return  boolean
	 */
	private function check_magic_state($uid, $identifier) {
		$this->db = K_Model::getInstanceDb ( true );		
		
		if($this->check_magic_useing_state($uid, $identifier)) {
			return -100;
		}else {
			$where = array('uid'=>$uid, 'identifier'=>$identifier, 'status'=>1);
		    $magic = $this->getRow($where, '', $this->model_name_log);
		    if(!empty($magic)) {
		    	if($magic['useing'] == 1) {
			    	return -100;
		    	}else {
			    	return 1;
			    }
		    }else {
			    return 0;
	    	}
		}		
	}
	
	/**
	 * //检测道具状态
	 *
	 * @access  public
	 * @param   int     $uid          用户ID
	 * @param   int     $mag_id       道具的标示ＩＤ
	 *
	 * @return  boolean
	 */
	private function check_state_by_id($uid, $id) {
		$this->db = K_Model::getInstanceDb ( true );
		
		$where = array('uid'=>$uid, 'id'=>$id, 'status'=>1);
		$magic = $this->getRow($where, '', $this->model_name_log);
		if(!empty($magic)) {
			if($magic['useing'] == 1) {
				return -100;
			}else {
				if($this->check_magic_useing_state($uid, $magic['identifier'])) {
					return -100;
				}else {
					return 1;
				}				
			}
		}else {
			return 0;
		}
	}
	
	/**
	 * //检测道具是否使用可以叠加使用
	 *
	 * @access  public
	 * @param   int     $uid          用户ID
	 * @param   int     $identifier   道具的标示
	 *
	 * @return  boolean
	 */
	private function check_magic_useing_state($uid, $identifier) {
		$this->db = K_Model::getInstanceDb ( true );
		
		$where = array('uid'=>$uid, 'identifier'=>$identifier, 'status'=>1, 'useing'=>1);
		$magic = $this->getRow($where, '', $this->model_name_log);
		if(!empty($magic)) {
			return true;
		}else {
			return false;
		}
	}
	
	/**
	 *道具价格(算法)
	 *
	 * @access  private
	 * @param   int     $magic       道具
	 * @param   int     $paras       道具参数
	 *
	 * @return  array
	 */
	private function run_price($uid, $magic, $num) {
		$func_name = "fun_price_".$magic['mg_cat'];
		if (function_exists($func_name)) {
			return $this->{$func_name}($uid, $magic, $num);//返回赛点价格
		}else {
			return false;
		}
		
	}
	
	
	/**
	 *道具使用完成失效回写状态
	 *
	 * @access  public
	 * @param   int     $mag_log_id    私人道具IDS(1,2,3,4)
	 * @param   int     $is_using      true:购买且使用完成(一次性)   2:购买使用中(持续)
	 *
	 * @return  bool
	 */
	public function callback_disable($mag_log_ids, $is_using = true) {
		$this->db = K_Model::getInstanceDb ( true );
		
		$where = " id in($mag_log_ids)";
		if($is_using === 2) {
			$sql = "update ".$this->model_name_log." set useing = 1 where id in($mag_log_ids)";		
			return $this->db->query($sql);
		}else {
			$sql = "update ".$this->model_name_log." set status = 0, useing = 0 where id in($mag_log_ids)";
			return $this->db->query($sql);
		}		
	}
	
	/**
	 *道具自动到期失效(一个星期)
	 *
	 * @access  public
	 * @param   int     $mag_log_id    私人道具ID
	 *
	 * @return  bool
	 */
	public function flight_disable() {
		$this->db = K_Model::getInstanceDb ( true );
	
		$l_time = time() - 7*24*3600;
		$sql = "update ".$this->model_name_log." set status = 0, useing = 0 where identifier = 'double_fighting' and useing = 1 and start_time<$l_time";
		
		return $this->db->query($sql);
	}
	
	/**
	 *截止某个时间的兑换道具的个数
	 *
	 * @access  public
	 * @param   int     $mag_log_id    私人道具ID
	 *
	 * @return  bool
	 */
	public function get_count_by_time($identifier, $limit_time = 0,$gid=0) {
		$this->db = K_Model::getInstanceDb ( true );
	
		$sql = "select count(*) as c from ".$this->model_name_log." where identifier = '".$identifier."' and dateline>$limit_time";	
        if($gid)
            $sql .= " AND gid=$gid ";
		$query = $this->db->query($sql);
		$res = $query->result_array();
		if(isset($res[0]['c'])) {
			return $res[0]['c'];
		}else {
			return 0;
		}
	}
	
	
	/**
	 * 获取道具明细列表
	 *
	 * @access public
	 * @param int $uid
	 *        	用户ID
	 * @param string $mg_cate
	 *        	道具类型
	 * @param int $page
	 *        	分页
	 * @param int $size
	 *        	页面大小
	 * @param int $is_count
	 *        	是否返回总数
	 *
	 * @return array 返回积分记录
	 */
	public function get_list_by_uid($uid, $mg_cate, $page = 1, $size = 10, $is_count = FALSE) {
		$this->db = K_Model::getInstanceDb ( false );
	
		$offset = ($page - 1) * $size;
		$limit = $size;
		$where = 'where ml.uid =' . $uid;
		if(!empty($mg_cate)) {
			$where = ' and m.mg_cate = \'' . $mg_cate .'\'';
		}
			
		$sql = 'select ml.*, m.name as ide_name, m.description from ' . $this->model_name_log .
		       ' as ml left join ' . $this->model_name . ' as m on ml.identifier=m.identifier ' . $where . 
		       ' order by ml.dateline desc limit ' . $offset . ', ' . $limit;


		$query = $this->db->query ( $sql );
		$result ['list'] = $query->result_array ();
		if ($is_count) {
			$sql = 'select count(*) as c from ' . $this->model_name_log .
			' as ml left join ' . $this->model_name . ' as m on ml.identifier=m.identifier ' . $where ;

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
	 *计算展示率曝光所需要的赛点
	 *
	 * @access  public
	 * @param   $basic     $basic    基数
	 * @param   $basic     $n        次数
	 *
	 * @return  int
	 */
	public function get_ad_exposure_price($basic = 100, $n = 1) {
		return $basic*pow(2,($n-1));
	}
	
	//计算复活需要的赛点
	/**
	 *计算复活需要的赛点
	 *
	 * @access  public
	 * @param   $basic     $basic    基数
	 * @param   $basic     $n        次数
	 *
	 * @return  int
	 */
	public function get_reborn_works_price($basic = 500, $n = 1) {
		return $basic*pow(2,($n-1));
	}
}
?>
