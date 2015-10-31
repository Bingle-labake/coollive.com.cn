<?php
/**
 * 赛酷 积分功能模块
 * ============================================================================
 *   
 * 
 * ============================================================================
 * $Author: Bingle $
 * $Id: credit_model.php 17171 2014-02-24 09:30:00Z Bingle $
*/
class Credit_model extends K_Model {
	private $model_data = '';
	private $credit_config = array ();
	const CREDIT_PAY = 2, CREDIT_EARN = 1;	
	
	/**
	 * 构造函数
	 *
	 * @access public
	 * @return mix
	 */
	function __construct() {
		parent::__construct ();
		$this->model_name = "";
		$this->model_name_config = "sk_credit_config"; // 积分配置
		$this->model_name_rule = "sk_credit_rule"; // 积分规则
		$this->model_name_log = "sk_credit_log"; // 积分日志
		$credit_config = read_static_cache ( $this->model_name_config );
		
		$this->config_group = $this->config->item("credit_group");
	}
	
	/**
	 * 添加积分(包含逻辑结构)
	 *
	 * @access public
	 * @param array $uid
	 *        	用户ID
	 * @param boolean $act
	 *        	积分动作
	 * @param boolean $act_sorce
	 *        	积分分值(跨级PK专用)
	 *        	
	 * @return int 返回数字。-1:用户不存在； -2：积分不够； -3：赠送积分失败 ；-4:积分配置不存在  0：积分日志失败； 大于0 成功
	 */
	public function add_score($uid, $act, $act_sorce = 0) {
		$this->load->model ( 'space/member_db', 'member_m' );
		
		$rule_code = $this->check_rule ( $uid, $act );//分发判断
		if ($rule_code > 0) {
			$credit_config_item = array ();
			if (isset ( $this->credit_config [$act] )) {
				$credit_config_item = $this->credit_config [$act];
			} else {
				$credit_config_item = $this->get_item ( $act );
			}

			if(!$credit_config_item) {
				return -4;
			}
			$curr_credit_value = 0;
			if($act == "conv_stride_pk") {
				//PK扣分
				$curr_credit_value = -abs($act_sorce);
			}else {
				if (isset ( $credit_config_item ['act_score'] )) {
					$curr_credit_value = $credit_config_item ['act_score'];
				}
			}			
			
			// 判断用户积分情况
			$credit_set = array ();
			$member = $this->member_m->get_user ( array (
					'uid',
					'hcredits',
					'credits',
					'lid' 
			), array (
					'uid' => $uid 
			) );			
			if (! empty ( $member )) {
				if ($curr_credit_value < 0) {
					$credit_set = array (
							'credits' => $curr_credit_value 
					);
					$credits = intval ( $member ['credits'] );
					if ($credits < abs($curr_credit_value)) {
						return - 2; // 积分不够
					}
				} else {
					$credit_set = array (
							'hcredits' => $curr_credit_value,
							'credits' => $curr_credit_value 
					);
				}
			} else {
				return - 1; // 用户不存在
			}

			// 给会员添加积分#############
			$flag = $this->member_m->inc_val ( $uid, $credit_set );
			if ($flag) {
				//再次获取积分信息
				$member = array();
				$member = $this->member_m->get_user ( array (
						'uid',
						'hcredits',
						'credits',
						'lid'
				), array (
						'uid' => $uid
				) );
				
				$member_credit = intval ( $member ['hcredits'] ); // 获取总积分
				
				$this->load->model ( 'space/member_level_model', 'member_level_m' );
				$level = $this->member_level_m->get_level_by_credit ( $member_credit );				
				if (!empty($level)) {
					$lid = intval ( $level ['lid'] );
					if ($lid <= 0) {
						$lid = Member_level_model::DEFAULT_LEVEL_ID;
					}
				} else {
					$lid = Member_level_model::DEFAULT_LEVEL_ID;
				}
				if ($lid > intval ( $member ['lid'] )) {
					// 更新用户等级,并且赠送抽奖数及直投票
					if ($this->member_m->update_level_id ( $uid, $lid )) {
						$this->member_m->inc_val ( $uid, array (
								'lottery' => $level ['draw_num'] 
						) );
						
						//兑换直投票
						$this->load->model('straight_voting_model','straight_voting_m');
						for($k=0;$k<$level ['vote_num']; $k++) {
							$this->straight_voting_m->add_straight($uid, 'L'.$level ['level']);
						}						
					}	
					//发送系统通知
					$level_num = 0;
					if (!empty($level)) {
						$level_num = $level ['level'];
					}
					$this->load->model ( 'space/message_model', 'message_m' );
					$this->message_m->send_system_message($uid, 
							                              "恭喜你升级啦！", 
							                              "  你目前已经升级到".$level_num."级,同时获得".$level ['vote_num']."次直投票，".$level ['draw_num']."次抽奖!");
				}
				// 添加积分日志
				$log_id = $this->add_log ( $uid, $act, $curr_credit_value );
				if ($log_id > 0) {
					return $log_id;
				} else {
					return 0;//积分日志失败
				}
			} else {
				return - 3; // 赠送会员积分失败
			}
		} else {
			return -100+$rule_code; // 不符合积分策略
		}
	}
	
	
	
	/**
	 * //积分兑换直投票
	 *
	 * @access public
	 * @param array $uid
	 *        	用户ID
	 * @param int $ex_num
	 *        	兑换数量
	 *
	 * @return array
	 */
	public function ex_line_ticket($uid, $ex_num) {
		$res = array();
		$ex_num = intval($ex_num);
		$uid = intval($uid);
		if($uid>0 && $ex_num>0) {
			$this->load->model('space/member_db','member_m');
			$this->load->model('space/member_level_model','member_level_m');
	
			//积分策略(兑换直投票分值（每级别每日兑换次数不高于级别数）)
			$credit_config_item = $this->get_item('vote_ticket_ex');
			$user = $this->member_m->get_user(array('credits', 'lid'), array('uid'=>$uid));
	
			//今天兑换数量
			$today_time = mktime(0,0,0,date("m"),date("d"),date("Y"));
			$today_ex_count = $this->get_logs_count($uid, 'vote_ticket_ex', $today_time);
	
			$level = intval($this->member_level_m->get_level_by_lid($user['lid']));
			if($today_ex_count < $level) {
				$count_score = $ex_num * abs($credit_config_item['act_score']);
				if($user['credits'] >= $count_score) {
					$code = 0;
					$i_can_change_num = $level - $today_ex_count;
					if($ex_num>$i_can_change_num) {
						$ex_num = $i_can_change_num;//当兑换数量大于限制数，取限制最大值，
					}
	
					for($i=$ex_num ; $i>0 ; $i--) {
						$flag = $this->add_score($uid, "vote_ticket_ex");
						if($flag>0) {
							//兑换一张直投票
							$this->load->model('straight_voting_model','straight_voting_m');
							if($this->straight_voting_m->add_straight($uid)) {
								$code++;
							}
						}
					}
	
					if($code>0) {
						$res['code'] = $code;
						$res['user'] = $this->member_m->get_user(array('uid', 'credits', 'hcredits', 'votes'), array('uid'=>$uid));
					}else {
						$res['code'] = -3;
						$res['error'] = "兑换失败！";
					}
				}else {
					$res['code'] = -2;
					$res['error'] = "积分不够！";
				}
			}else {
				$res['code'] = -4;
				$res['error'] = "每级别每日兑换次数不高于级别数！";
			}
		}else {
			$res['code'] = -1;
			$res['error'] = "";
		}
	
		return $res;
	}
	
	/**
	 * 获取积分日志
	 *
	 * @access public
	 * @param int $uid
	 *        	用户ID
	 * @param int $act
	 *        	积分动作
	 * @param int $record_time
	 *        	大于或等于该时间
	 *
	 * @return array 返回积分LOG。
	 */
	public function get_logs($uid, $act, $record_time = 0) {
		$this->db = K_Model::getInstanceDb ( true );
		$where = " act = '".$act. "' and uid=".$uid;		
		if($record_time>0) {
			$where .= " and record_time>=".$record_time;
		}
		return $this->getAll($where, 'record_time desc', $this->model_name_log);
	}
	
	/**
	 * 获取积分日志统计数量
	 *
	 * @access public
	 * @param int $uid
	 *        	用户ID
	 * @param int $act
	 *        	积分动作
	 * @param int $record_time
	 *        	大于或等于该时间
	 *
	 * @return int 返回积分LOG数量。
	 */
	public function get_logs_count($uid, $act, $record_time = 0) {
	$this->db = K_Model::getInstanceDb ( true );
		$where = " where act = '".$act. "' and uid=".$uid;		
		if($record_time>0) {
			$where .= " and record_time>=".$record_time;
		}
		return $this->getCount($where, $this->model_name_log);
	}
	
	
	/**
	 * 获取积分配置
	 *
	 * @access public
	 * @param boolean $act
	 *        	积分动作
	 * @param boolean $level
	 *        	用户级别
	 *        	
	 * @return array 返回积分配置选项。
	 */
	public function get_item($act, $level = 1) {
		$this->db = K_Model::getInstanceDb ( true );
		$where = array (
				"act" => $act,
				"level" => $level 
		);
		$credit_config_item = $this->getRow ( $where, '', $this->model_name_config );
		return $credit_config_item;
	}
	
	/**
	 * 获取积分
	 *
	 * @access public
	 * @param boolean $act
	 *        	积分动作
	 * @param boolean $level
	 *        	用户级别
	 *
	 * @return int 返回积分值。
	 */
	public function get_item_by_act($act, $level = 1) {
		$this->db = K_Model::getInstanceDb ( true );
		$where = array (
				"act" => $act,
				"level" => $level
		);
		$act_score = $this->getOne ( $where, 'act_score', $this->model_name_config );
		return $act_score;
	}
	
	/**
	 * 添加积分日志
	 *
	 * @access public
	 * @param int $uid
	 *        	用户ID
	 * @param string $act
	 *        	积分动作
	 * @param int $score
	 *        	动作积分
	 *        	
	 * @return int 积分日志ID。
	 */
	public function add_log($uid, $act, $score) {
		$this->db = K_Model::getInstanceDb ( true );
		$method = 0;
		if ($score > 0) {
			$method = 1;
		} else {
			if ($score < 0) {
				$method = 2;
			}
		}
		$data = array (
				'uid' => $uid,
				'act' => $act,
				'method' => $method,
				'score' => $score,
				'record_time' => time () 
		);
		return $this->add ( $data, 'id', $this->model_name_log );
	}
	
	/**
	 * 积分策略判定
	 *
	 * @access public
	 * @param int $uid
	 *        	用户ID
	 * @param string $act
	 *        	积分动作
	 *        	
	 * @return int 返回策略代码。
	 */
	public function check_rule($uid, $act) {
		// $credit_rule = $this->get_rule($act,1);
		
		// 计算是否可以执行积分动作
		return 1;
	}
	
	
	/**
	 * 获取所有的积分配置
	 *
	 * @access public
	 *
	 * @return array 返回配置
	 */
	public function get_all_config() {
		$this->db = K_Model::getInstanceDb ( true );
		$where = array('display'=>1);
		$credit_config = $this->getAll ( $where, '', $this->model_name_config );
		$res = array();
		if($credit_config) {
			foreach($credit_config as $k=>$v) {
				$res[$v['act']] = $v;
			}
		}
		return $res;
	}
		
	/**
	 * 获取积分策略
	 *
	 * @access public
	 * @param string $act
	 *        	积分动作
	 * @param
	 *        	int level 动作等级
	 *        	
	 * @return array 返回策略
	 */
	public function get_rule($act, $level = 1) {
		$this->db = K_Model::getInstanceDb ( true );
		$where = array (
				"act" => $act,
				"level" => $level 
		);
		$credit_rule_item = $this->getRow ( $where, '', $this->model_name_rule );
		return $credit_rule_item;
	}
	
	/**
	 * 获取积分列表
	 *
	 * @access public
	 * @param int $uid
	 *        	用户ID
	 * @param int $method
	 *        	1:获取积分 2:使用积分 0:所以的
	 * @param int $page
	 *        	动作等级
	 * @param int $size
	 *        	页面大小
	 * @param int $is_count
	 *        	是否返回总数
	 *        	
	 * @return array 返回积分记录
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
	
	//获取积分配置分组
	public function get_config_group() {
		return $this->config_group;
	}
}
?>
