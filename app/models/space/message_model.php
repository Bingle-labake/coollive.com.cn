<?php
/**
 * 赛酷 消息功能模块
 * ============================================================================
 *   
 * 
 * ============================================================================
 * $Author: Bingle $
 * $Id: message_model.php 17171 2014-02-24 16:11:00Z Bingle $
*/
class Message_model extends K_Model {
	private $model_data = '';
	protected $model_name = 'sk_message';
	protected $model_name_inte = 'sk_message_internal';
	protected $model_name_notice = 'sk_notice';
	protected $model_name_record = 'sk_message_internal_record';
	protected $model_name_publish = 'sk_message_internal_publish';
	protected $model_name_person = 'sk_message_person'; // 私信
	protected $model_name_deny   = 'sk_letter_deny';//私信黑名单
	private $notice_postfix = 'notice_';
	
	// 消息类型
	// 团队邀请成员
	const INVITE_APPLY = 20;
	const INVITE_TEAM_ALLOW = 21;
	const INVITE_TEAM_DENY = 22;
	
	// 申请加入团队
	const APPLY_JOIN = 10;
	const APPLY_JOIN_ALLOW = 11;
	const APPLY_JOIN_DENY = 12;
	
	// 申请作品
	const APPLY_WORKS = 30;
	const APPLY_WORKS_ALLOW = 30;
	const APPLY_WORKS_DENY = 32;
	
	// 系统通知
	const SYTEM_NOTICE = 9;
	
	// 关注
	const FOLLOW_BE = 40; // 关注
	const FOLLOW_ASK = 41; // 请求关注
	const FOLLOW_ASK_DENY = 42; // 请求被拒绝
	                             
	// 私信
	const PERSON_LETTER = 8;
	
	// 默认初始化通知
	private $notice_ttl = 1800; // 30分钟
	private $default_notice = array (
			'uid' => 0,
			'invite_apply' => 0,
			'invite_team_allow' => 0,
			'invite_team_deny' => 0,
			'apply_join' => 0,
			'apply_join_allow' => 0,
			'apply_join_deny' => 0,
			'apply_works' => 0,
			'apply_works_allow' => 0,
			'apply_works_deny' => 0,
			'follow_be' => 0,
			'follow_ask' => 0,
			'follow_ask_deny' => 0,
			'person_letter' => 0,
			'system' => 0 
	);
	
	/**
	 * 构造函数
	 *
	 * @access public
	 * @return mix
	 */
	function __construct() {
		parent::__construct ();
		$this->load->library ( 'memcache_lib' );
	}
	
	/**
	 * 发送消息
	 *
	 * @access public
	 * @param int $type
	 *        	消息类型
	 * @param int $ex_id
	 *        	消息对象ID
	 * @param int $content
	 *        	消息内容
	 * @param int $uid
	 *        	消息者用户ID
	 * @param int $parent_cid
	 *        	被消息的消息ID(回帖ID)
	 *        	
	 * @return array 返回 消息ID
	 */
	public function send_msg($uid, $fuid, $msg_type, $ex_id, $is_priv = 0) {
		$this->db = K_Model::getInstanceDb ( true );
		
		$msg_type = intval ( $msg_type );
		$ex_id = intval ( $ex_id );
		$data = array (
				'uid' => $uid,
				'fuid' => $fuid,
				'type' => $msg_type,
				'ex_id' => $ex_id,
				'is_priv' => $is_priv,
				'record_time' => time () 
		);
		$m_id = $this->add ( $data, 'm_id' );
		if ($m_id > 0) {
			$this->send_notice ( $fuid, $msg_type );
		}
		return $m_id;
	}
	
	/**
	 * 获取某一个消息
	 *
	 * @access public
	 * @param int $where
	 *        	获取条件
	 * @param int $fileds
	 *        	消息字段
	 *        	
	 * @return array 消息内容
	 */
	public function get_msg($where, $fileds = array()) {
		$this->db = K_Model::getInstanceDb ( true );
		
		return $this->getRow ( $where, $fileds );
	}
	
	/**
	 * 改变消息已读状态
	 *
	 * @access public
	 * @param int $uid
	 *        	阅读者的用户ID
	 * @param int $m_id
	 *        	消息ID
	 *        	
	 * @return int
	 */
	public function read_msg($uid, $m_id) {
		$this->db = K_Model::getInstanceDb ( true );
		
		$where = array (
				'm_id' => $m_id,
				'fuid' => $uid 
		);
		$_row = $this->getRow ( $where);
		if(!empty($_row)) {
			if(isset($_row['is_read'])) {
				if($_row['is_read']>0) {
					return 2;
				}else {
					$set = array (
							'is_read' => 1
					);
					return intval ( $this->update ( $where, $set ) );
				}
			}else {
				return -2;
			}
		}else {
			return -1;
		}
	}
	
	/**
	 * 获取用户最后一次的系统消息发布ID
	 *
	 * @access public
	 * @param int $uid
	 *        	用户ID
	 *        	
	 * @return int 返回系统消息发布ID
	 */
	public function get_last_sysid_by_uid($uid) {
		$this->db = K_Model::getInstanceDb ( true );
		
		$last_mi_id = $this->getOne ( array (
				'uid' => $uid 
		), 'last_mi_id', $this->model_name_record );
		return intval ( $last_mi_id );
	}
	
	/**
	 * 获取还没有拉取的系统消息列表
	 *
	 * @access public
	 * @param int $last_mi_id
	 *        	最后一次拉取的系统消息发布ID
	 * @param int $uid
	 *        	用户ID
	 *        	
	 * @return array 返回系统消息发布列表
	 */
	private function get_system_list_by_miid($last_mi_id, $uid = 0) {
		if ($last_mi_id >= 0) {
			$this->db = K_Model::getInstanceDb ( true );
			$reg_sql = 'select regdate from sk_member where uid=' . $uid;
			$reg_query = $this->db->query ( $reg_sql );
			$reg_res = $reg_query->result_array ();
			$last_reg_time = 0;
			if ($reg_res) {
				$last_reg_time = intval ( $reg_res [0] ['regdate'] );
			}
			
			if ($last_reg_time > 0) {
				$sql = "select * from " . $this->model_name_publish . " where mi_id>" . $last_mi_id . " and record_time>" . $last_reg_time . " order by record_time asc";
				$query = $this->db->query ( $sql );
				$result = $query->result_array ();
				
				if ($uid <= 0) {
					return false;				
				} else {
					if (empty ( $result )) {
						return false;
					} else {
						$res = array ();
						$last_list_miid = 0;
						foreach ( $result as $v ) {
							$last_list_miid = $v['mi_id'];
							
							switch ($v ['type']) {
								case 0 : // 个人
									if ($v ['ex_id'] == $uid) {
										$res [] = $v;
									}
									break;
								case 1 : // 用户组
									$this->load->model ( 'space/member_db', 'member_m' );
									$member = $this->member_m->get_user ( array (
											'uid' 
									), array (
											'groupid' => $v ['ex_id'],
											'uid' => $uid 
									) );
									if (! empty ( $member )) {
										$res [] = $v;
									}
									break;
								case 2 : // 团队
									$this->load->model ( 'space/team_db', 'team_m' );
									$team = $this->team_m->get_team_member ( array (
											'tid' => $v ['ex_id'],
											'uid' => $uid 
									), array (
											'tid' 
									) );
									if (! empty ( $team )) {
										$res [] = $v;
									}
									break;
								case 3 : // 所有
									$res [] = $v;
									break;
							}
						}
						
						return array('list'=>$res, 'last_list_miid'=>$last_list_miid);
					}
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	
	/**
	 * 根据用户id更新最后一次拉取的系统消息发布ID
	 *
	 * @access public
	 * @param int $uid
	 *        	用户ID
	 * @param int $send_last_mi_id
	 *        	最后一个系统消息发布ID
	 *        	
	 * @return
	 *
	 */
	private function change_message_innternal_record($uid, $send_last_mi_id) {
		if ($uid > 0 && $send_last_mi_id > 0) {
			$where = array (
					'uid' => $uid 
			);
			$row = $this->getRow ( $where, 'last_mi_id', $this->model_name_record );
			if (empty ( $row )) {
				$data = array (
						'uid' => $uid,
						'last_mi_id' => $send_last_mi_id 
				);
				$this->add ( $data, '', $this->model_name_record );
			} else {
				$set = array (
						'last_mi_id' => $send_last_mi_id 
				);
				$this->update ( $where, $set, $this->model_name_record );
			}
		}
	}
	
	/**
	 * 发布系统通知
	 *
	 * @access public
	 * @param array $data
	 *        	系统通知数据
	 *        	
	 *        	$data['title'] 标题
	 *        	$data['content'] 内容
	 *        	$data['type'] 通知类型 0:个人; 1：用户组; 2：团队; 3：所有人
	 *        	$data['ex_id'] 类型ID（用户ID、组ID、团队ID；所有人类型则为0）
	 *        	
	 * @return int 发布ID
	 */
	public function publish_sys_msg($data) {
		$key = $this->notice_postfix . 'sys_msg_pub_list';
		$new_sys_msg_list = $this->memcache_lib->get ( $key );
		
		if($data['type'] != 0) {
			$this->db = K_Model::getInstanceDb ( true );
			$mi_id = $this->add ( $data, 'mi_id', $this->model_name_publish );
			$data ['mi_id'] = $mi_id;
			
			$new_sys_msg_list [] = $data;
			$this->memcache_lib->set ( $key, $new_sys_msg_list, 24 * 60 ); // 一天时间
			return $mi_id;
		}else {
			//将广播直接推送到个人
			$this->send_system_msg($data['ex_id'], $data['title'], $data['content']);
			return 0;
		}		
	}
	
	/**
	 * 发送个人系统通知
	 *
	 * @access public
	 * @param int $fuid
	 *        	接收者ID
	 * @param int $title
	 *        	标题
	 * @param int $content
	 *        	内容
	 *        	
	 * @return array 返回 消息ID
	 */
	public function send_system_message($fuid, $title, $content) {
		if ($fuid > 0) {
			$sys_message = array (
					'title' => $title,
					'content' => $content,
					'type' => 0,
					'ex_id' => $fuid,
					'record_time' => time () 
			);
			return $this->publish_sys_msg ( $sys_message );
		} else {
			return 0;
		}
	}
	
	/**
	 * 改变系统消息已读状态
	 *
	 * @access public
	 * @param int $uid
	 *        	阅读者的用户ID
	 * @param int $m_id
	 *        	消息ID
	 *        	
	 * @return array 返回 消息ID
	 */
	public function read_sysem_msg($uid, $id) {
		$this->db = K_Model::getInstanceDb ( true );
		
		$where = array (
				'id' => $id,
				'fuid' => $uid 
		);
		$_row = $this->getRow ( $where, '', $this->model_name_inte );
		if(!empty($_row)) {
			if(isset($_row['is_read'])) {
				if($_row['is_read'] > 0) {
					return 2;
				}else {
					$set = array (
							'is_read' => 1
					);
					return intval ( $this->update ( $where, $set, $this->model_name_inte ) );
				}
			}else {
				return - 1;
			}
		}else {
			return - 1;
		}		
	}
	
	/**
	 * 改变私信已读状态
	 *
	 * @access public
	 * @param int $uid
	 *        	阅读者的用户ID
	 * @param int $id
	 *        	私信ID
	 *        	
	 * @return array 返回 消息ID
	 */
	public function read_person_msg($uid, $id) {
		$this->db = K_Model::getInstanceDb ( true );
		
		$where = array (
				'id' => $id,
				'fuid' => $uid
		);
		$row = $this->getRow ( $where, '', $this->model_name_person);
		if (!empty($row)) {
			$flag = 0;
			if($row['is_read']>0) {
				$flag = 2;
			}else {
				$set = array (
						'is_read' => 1
				);
				$where_message = array('uid'=>$row['uid'], 'fuid'=>$uid, 'is_priv'=>1);
				$this->update ( $where, $set, $this->model_name_person );
				$flag = $this->update ( $where_message, $set);
			}
			return $flag;			
		} else {
			return - 1;
		}
	}
	
	/**
	 * 删除消息
	 *
	 * @access public
	 * @param int $m_id
	 *        	消息ID
	 * @param int $uid
	 *        	用户ID
	 *        	
	 * @return boolean 返回
	 */
	public function remove_message($m_id, $uid) {
		if ($m_id > 0 && $uid > 0) {
			$this->db = K_Model::getInstanceDb ( true );
			$where = array (
					'fuid' => $uid,
					'm_id' => $m_id 
			);
			$set = array (
					'is_del' => 1 
			); // 逻辑删除
			return $this->update ( $where, $set );
		} else {
			return false;
		}
	}
	
	/**
	 * 删除消息(退出团体专用)
	 *
	 * @access public
	 * @param int $uid
	 *        	发送者UID
	 * @param int $fuid
	 *        	接收者UID
	 * @param int $type
	 *        	消息类型
	 * @param int $ex_id
	 *        	类型ID
	 *        	
	 * @return boolean 返回
	 */
	public function logout_team_message($uid, $fuid, $type, $ex_id) {
		if ($uid > 0 && $fuid > 0 && $type > 0 && $ex_id > 0) {
			$this->db = K_Model::getInstanceDb ( true );
			$where = array (
					'uid' => $uid,
					'fuid' => $fuid,
					'type' => $type,
					"ex_id" => $ex_id 
			);
			$list = $this->getAll ( $where, 'm_id asc' );
			if (! empty ( $list )) {
				foreach ( $list as $k => $v ) {
					if ($v ['is_del'] != 1) {
						$where = array (
								"m_id" => $v ['m_id'] 
						);
						
						$filed = '';
						if ($v ['is_read'] > 0) { // 已读
							$set = array (
									'is_del' => 1 
							);
						} else {
							$set = array (
									'is_read' => 1,
									'is_del' => 1 
							);
							$filed = $this->get_notice_filed ( $type );
						}
						
						$this->update ( $where, $set );
						if (! empty ( $filed )) {
							$this->change_notice_for_read ( $fuid, $type );
						}
					}
				}
			}
		} else {
			return false;
		}
	}
	
	/**
	 * 删除系统消息
	 *
	 * @access public
	 * @param int $mi_id
	 *        	系统消息ID
	 * @param int $uid
	 *        	用户ID
	 *        	
	 * @return array 返回 消息ID
	 */
	public function remove_system_msg($mi_id, $uid) {
		if ($mi_id > 0 && $uid > 0) {
			$this->db = K_Model::getInstanceDb ( true );
			$where = array (
					'fuid' => $uid,
					'id' => $mi_id 
			);
			$set = array (
					'is_del' => 1 
			);
			return $this->update ( $where, $set, $this->model_name_inte );
		} else {
			return false;
		}
	}
	
	/**
	 * 发送通知
	 *
	 * @access public
	 * @param int $fuid
	 *        	接收用户ID
	 * @param int $msg_type
	 *        	通知 类型
	 *        	
	 * @return array 返回 消息ID
	 */
	private function send_notice($fuid, $msg_type) {
		$key = $this->notice_postfix . $fuid;
		$notice = $this->memcache_lib->get ( $key );
		
		$is_store = false;
		if (! empty ( $notice )) {
			$is_store = true;
		}
		
		// 根据类型获取消息字段
		$filed = $this->get_notice_filed ( $msg_type );
		
		if ($is_store) {
			// 更新数据库记录
			$this->db = K_Model::getInstanceDb ( true );
			$sql = "update " . $this->model_name_notice . " set $filed=$filed+1 where uid=$fuid";
			if ($this->db->query ( $sql )) {
				$notice [$filed] = $notice [$filed] + 1;
				$this->memcache_lib->set ( $key, $notice, $this->notice_ttl );
			}
		} else {
			$this->db = K_Model::getInstanceDb ( true );
			$row = $this->getRow ( array (
					'uid' => $fuid 
			), '', $this->model_name_notice );
			
			if (! empty ( $row )) {
				$sql = "update " . $this->model_name_notice . " set $filed=$filed+1 where uid=$fuid";
				if ($this->db->query ( $sql )) {
					$row [$filed] = $row [$filed] + 1;
				}
			} else {
				$row = $this->default_notice;
				$row ['uid'] = $fuid;
				$row [$filed] = 1;
				$flag = $this->add ( $row, '', $this->model_name_notice );
			}
			
			$notice = $row;
			$this->memcache_lib->set ( $key, $notice, $this->notice_ttl );
		}
	}
	
	/**
	 * 变更通知
	 *
	 * @access public
	 * @param int $fuid
	 *        	接收用户ID
	 * @param int $msg_type
	 *        	通知 类型
	 *        	
	 * @return array 返回 消息ID
	 */
	public function change_notice_for_read($fuid, $msg_type) {
		$key = $this->notice_postfix . $fuid;
		$notice = $this->memcache_lib->get ( $key );
		
		$is_store = false;
		if (! empty ( $notice )) {
			$is_store = true;
		}
		
		// 根据类型获取消息字段
		$filed = $this->get_notice_filed ( $msg_type );

		if ($is_store) {
			// 更新数据库记录
			$this->db = K_Model::getInstanceDb ( true );
			$sql = "update " . $this->model_name_notice . " set $filed=$filed-1 where uid=$fuid";
			if ($this->db->query ( $sql )) {
				$notice [$filed] = $notice [$filed] - 1;
				$this->memcache_lib->set ( $key, $notice, $this->notice_ttl );
			}
		} else {
			$this->db = K_Model::getInstanceDb ( true );
			$row = $this->getRow ( array (
					'uid' => $fuid 
			), '', $this->model_name_notice );
			
			if (! empty ( $row )) {
				if($row[$filed]>0) {
					$sql = "update " . $this->model_name_notice . " set $filed=$filed-1 where uid=$fuid";
					if ($this->db->query ( $sql )) {
						$row [$filed] = $row [$filed] - 1;
						$this->memcache_lib->set ( $key, $notice, $this->notice_ttl );
					}
				}				
			}
		}
	}
	
	/**
	 * 初始化通知
	 *
	 * @access public
	 * @param int $fuid
	 *        	被初始化的用户ID
	 *        	
	 * @return
	 *
	 */
	public function init_notice($fuid, $force = false) {
		$key = $this->notice_postfix . $fuid;
		$value = $this->memcache_lib->get ( $key );
		
		if ($force || empty ( $value )) {
			$this->db = K_Model::getInstanceDb ( true );
			$where = array (
					'uid' => $fuid 
			);
			$notice = $this->getRow ( $where, '', $this->model_name_notice );
			if (empty ( $notice )) {
				$notice = $this->default_notice;
				$notice ['uid'] = $fuid;
				$this->add ( $notice, '', $this->model_name_notice );
			}
			$this->memcache_lib->set ( $key, $notice, $this->notice_ttl ); // 30分钟
		}
	}
	
	/**
	 * 初始化系统消息
	 *
	 * @access public
	 * @param int $fuid
	 *        	被初始化的用户ID
	 *        	
	 * @return
	 *
	 */
	public function init_system_msg($fuid, $force = false) {
		$key = $this->notice_postfix . 'last_miid_' . $fuid;
		$cache_last_mi_id = intval ( $this->memcache_lib->get ( $key ) );
		
		$send_last_mi_id = 0;
		$mem_send_last_mi_id = 0;
		if ($force || $cache_last_mi_id <= 0) {
			$last_mi_id = $this->get_last_sysid_by_uid ( $fuid );
			if ($cache_last_mi_id < $last_mi_id) {
				$wait_sys_msg_list = $this->get_system_list_by_miid ( $last_mi_id, $fuid );
			} else {
				$wait_sys_msg_list = $this->get_system_list_by_miid ( $cache_last_mi_id, $fuid );
			}
			
			$send_last_mi_id = $last_mi_id;
			$mem_send_last_mi_id = $last_mi_id;
			if (! empty ( $wait_sys_msg_list )) {
				$notice_id = 0;
				$temp_id = 0;
				
				foreach ( $wait_sys_msg_list['list'] as $k => $sys_msg ) {
					$temp_id = $sys_msg ['mi_id'];
					if ($temp_id > $send_last_mi_id) {
						$send_last_mi_id = $temp_id;
					}
					$notice_id = $this->send_system_msg ( $fuid, $sys_msg ['title'], $sys_msg ['content'] );
					if($notice_id>0 && intval($sys_msg['type']) === 0) {
						//个人通知拉取之后，发布(个人)广播删除
						$this->del(array('mi_id'=>$sys_msg ['mi_id']), $this->model_name_publish);
					}
				}				
				
				if ($send_last_mi_id > $last_mi_id) {
					if($send_last_mi_id >= $wait_sys_msg_list['last_list_miid'] ) {
						$mem_send_last_mi_id = $send_last_mi_id;
						$this->change_message_innternal_record ( $fuid, $send_last_mi_id );
					}else {
						$mem_send_last_mi_id = $wait_sys_msg_list['last_list_miid'];
						$this->change_message_innternal_record ( $fuid, $wait_sys_msg_list['last_list_miid'] );
					}					
				}else {
					$mem_send_last_mi_id = $wait_sys_msg_list['last_list_miid'];
					$this->change_message_innternal_record ( $fuid, $wait_sys_msg_list['last_list_miid'] );	
				}
			}
			
			$this->memcache_lib->set ( $key, $mem_send_last_mi_id, $this->notice_ttl ); // 30分钟
		}
		return $send_last_mi_id;
	}
	
	// 判断缓存中是否有广播
	public function has_sys_msg_by_newcache($uid) {
		$key = $this->notice_postfix . 'sys_msg_pub_list';
		$new_sys_msg_list = $this->memcache_lib->get ( $key );
		
		if (empty ( $new_sys_msg_list )) {
			return false;
		} else {
			$new_last_mi_id = 0;
			if (is_array ( $new_sys_msg_list )) {
				foreach ( $new_sys_msg_list as $v ) {
					if ($new_last_mi_id < $v ['mi_id']) {
						$new_last_mi_id = $v ['mi_id'];
					}
				}
			}
		}
		
		$mi_id_key = $this->notice_postfix . 'last_miid_' . $uid;
		$last_mi_id = intval ( $this->memcache_lib->get ( $mi_id_key ) );
		if ($new_last_mi_id > $last_mi_id) {
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * 获取通知
	 *
	 * @access public
	 * @param int $uid
	 *        	用户ID
	 *        	
	 * @return array 消息
	 */
	public function get_notice($uid) {
		$key = $this->notice_postfix . $uid;
		$notice = $this->memcache_lib->get ( $key );
		return $notice;
	}
	
	/**
	 * 根据消息类型获取字段
	 *
	 * @access public
	 * @param int $msg_type
	 *        	消息类型
	 *        	
	 * @return
	 *
	 */
	private function get_notice_filed($msg_type) {
		$filed = '';
		switch ($msg_type) {
			case self::INVITE_APPLY :
				$filed = 'invite_apply';
				break;
			case self::INVITE_TEAM_ALLOW :
				$filed = 'invite_team_allow';
				break;
			case self::INVITE_TEAM_DENY :
				$filed = 'invite_team_deny';
				break;
			
			case self::APPLY_JOIN :
				$filed = 'apply_join';
				break;
			case self::APPLY_JOIN_ALLOW :
				$filed = 'apply_join_allow';
				break;
			case self::APPLY_JOIN_DENY :
				$filed = 'apply_join_deny';
				break;
			
			case self::APPLY_WORKS :
				$filed = 'apply_works';
				break;
			case self::APPLY_WORKS_ALLOW :
				$filed = 'apply_works_allow';
				break;
			case self::APPLY_WORKS_DENY :
				$filed = 'apply_works_deny';
				break;
			
			case self::FOLLOW_BE :
				$filed = 'follow_be';
				break;
			case self::FOLLOW_ASK :
				$filed = 'follow_ask';
				break;
			case self::FOLLOW_ASK_DENY :
				$filed = 'follow_ask_deny';
				break;
			
			case self::PERSON_LETTER :
				$filed = 'person_letter';
				break;
			case self::SYTEM_NOTICE :
				$filed = 'system';
				break;
		}
		
		return $filed;
	}
	
	/**
	 * 获取消息列表(非私信)
	 *
	 * @access public
	 * @param int $fuid
	 *        	$fuid
	 * @param int $noread
	 *        	阅读标记
	 * @param int $page
	 *        	分页数
	 * @param int $size
	 *        	每页大小
	 * @param int $is_count
	 *        	是否统计
	 *        	
	 * @return array 消息列表
	 */
	public function get_msg_list($fuid, $noread = 0, $page = 1, $size = 10, $is_count = true) {
		$this->db = K_Model::getInstanceDb ( true );
		
		if ($page <= 0) {
			$page = 1;
		}
		$offset = ($page - 1) * $size;
		$limit = $size;
		$where = 'sm.is_del = 0 and sm.is_priv = 0 and sm.fuid=' . $fuid; // is_priv私信标记
		if ($noread == 1) {
			$where .= ' and sm.is_read = 0';
		}
		$sql = 'select sm.*, m.username as fusername  from ' . $this->model_name . ' as sm left join' . ' sk_member as m on sm.fuid=m.uid where ' . $where . ' order by sm.record_time desc limit ' . $offset . ', ' . $limit;
		$query = $this->db->query ( $sql );
		$result ['list'] = $query->result_array ();
		$result ['count'] = 0;
		if ($is_count) {
			$sql_c = 'select count(*) as c  from ' . $this->model_name . ' as sm where ' . $where;
			$query_c = $this->db->query ( $sql_c );
			$result_c = $query_c->result_array ();
			if (isset ( $result_c [0] ['c'] )) {
				$result ['count'] = $result_c [0] ['c'];
			}
		}
		
		return $result;
	}
	
	/**
	 * 获取系统通知列表
	 *
	 * @access public
	 * @param int $fuid
	 *        	接收用户ID
	 * @param int $noread
	 *        	阅读标记
	 * @param int $page
	 *        	分页数
	 * @param int $size
	 *        	每页大小
	 * @param int $is_count
	 *        	是否统计
	 *        	
	 * @return array 系统消息列表
	 */
	public function get_sysem_msg_list($fuid, $noread = 0, $page = 1, $size = 10, $is_count = true) {
		$this->db = K_Model::getInstanceDb ( true );
		
		if ($page <= 0) {
			$page = 1;
		}
		$offset = ($page - 1) * $size;
		$limit = $size;
		$where = 'sm.is_del = 0 and sm.fuid=' . $fuid;
		if ($noread == 1) {
			$where .= ' and sm.is_read = 0';
		}
		$sql = 'select sm.*, m.username as fusername  from ' . $this->model_name_inte . ' as sm left join' . ' sk_member as m on sm.fuid=m.uid where ' . $where . ' order by sm.record_time desc limit ' . $offset . ', ' . $limit;
		$query = $this->db->query ( $sql );
		$result ['list'] = $query->result_array ();
		$result ['count'] = 0;
		if ($is_count) {
			$sql_c = 'select count(*) as c  from ' . $this->model_name_inte . ' as sm where ' . $where;
			$query_c = $this->db->query ( $sql_c );
			$result_c = $query_c->result_array ();
			if (isset ( $result_c [0] ['c'] )) {
				$result ['count'] = $result_c [0] ['c'];
			}
		}
		
		return $result;
	}
	
	/**
	 * 消息模板渲染
	 *
	 * @access public
	 * @param int $message
	 *        	一条消息记录
	 *        	
	 * @return string 消息内容
	 */
	public function get_message_html($message = array()) {
		$this->lang->load ( 'space/team_msg' );
		$lang_temp = $this->lang->language;
		if (isset ( $lang_temp ['msg'] [$message ['type']] )) {
			$template = $lang_temp ['msg'] [$message ['type']];
			
			$params = array (
					'uid' => $message ['uid'],
					'fuid' => $message ['fuid'],
					'username' => $message ['username'],
					'fusername' => $message ['fusername'],
					'tid' => $message ['ex_id'],
					'object_name' => $message ['obj_name'] 
			);
			
			if (is_array ( $template )) {
				$res = array ();
				foreach ( $template as $k => $v ) {
					$res [$k] = parse_template ( $v, $params );
				}
				return $res;
			} else {
				return parse_template ( $template, $params );
			}
		} else {
			return 'NULL';
		}
	}
	
	/**
	 * 系统消息模板渲染
	 *
	 * @access public
	 * @param int $system_msg
	 *        	一条系统消息记录
	 *        	
	 * @return string 内容
	 */
	public function get_system_msg_html($system_msg = array()) {
		$this->lang->load ( 'space/team_msg' );
		$lang_temp = $this->lang->language;
		return '';
	}
	
	/**
	 * 获取消息类型
	 *
	 * @access public
	 * @param int $mid
	 *        	消息ID
	 *        	
	 * @return tinyint 消息类型
	 */
	public function get_message_type($mid) {
		$this->db = K_Model::getInstanceDb ( true );
		
		$where = array (
				'm_id' => $mid 
		);
		$type = $this->getOne ( $where, 'type' );
		return intval ( $type );
	}
	
	/**
	 * 改变消息状态
	 *
	 * @access public
	 * @param int $mid
	 *        	消息ID
	 *        	
	 * @return boolean 消息类型
	 */
	public function change_message_status($mid, $status = 0) {
		$this->db = K_Model::getInstanceDb ( true );
		
		$where = array (
				'm_id' => $mid 
		);
		$set = array (
				'status' => $status 
		);
		return $this->update ( $where, $set );
	}
	
	/**
	 * 接收系统通知
	 *
	 * @access public
	 * @param int $fuid
	 *        	接收者ID
	 * @param int $title
	 *        	标题
	 * @param int $content
	 *        	内容
	 * @param int $uid
	 *        	发送私信的uid
	 *        	
	 * @return array 返回 消息ID
	 */
	private function send_system_msg($fuid, $title, $content, $uid = 0) {
		$this->db = K_Model::getInstanceDb ( true );
		
		$data = array (
				'uid' => $uid,
				'fuid' => $fuid,
				'title' => $title,
				'content' => $content,
				'record_time' => time () 
		);
		$id = $this->add ( $data, 'id', $this->model_name_inte );
		if ($id > 0) {
			$this->send_notice ( $fuid, self::SYTEM_NOTICE );
		}
		return $id;
	}
	
	/**
	 * 生成私信会话ID
	 *
	 * @access public
	 * @param int $fuid
	 *        	接收者ID
	 * @param int $uid
	 *        	发送私信的uid
	 *        	
	 * @return array 返回 消息ID
	 */
	public function get_session_id($uid, $fuid) {
		if ($uid > $fuid) {
			return MD5 ( $fuid . "_" . $uid );
		} else {
			return MD5 ( $uid . "_" . $fuid );
		}
	}
	
	/**
	 * 添加私信
	 *
	 * @access public
	 * @param int $fuid
	 *        	接收者ID
	 * @param int $uid
	 *        	发送私信的uid
	 *        	
	 * @return array 返回 消息ID
	 */
	private function save_letter($data) {
		$this->db = K_Model::getInstanceDb ( true );
		
		$data = array (
				'uid' => $data ['uid'],
				'fuid' => $data ['fuid'],
				'content' => $data ['content'],
				'session_id' => $data ['session_id'],
				'is_read' => 0,
				'record_time' => time ()
		);
		$id = $this->add ( $data, 'id', $this->model_name_person );
		return $id;
	}
	
	/**
	 * 发送私信
	 *
	 * @access public
	 * @param int $fuid
	 *        	接收者ID
	 * @param int $uid
	 *        	发送私信的uid
	 *        	
	 * @return array 返回 消息ID
	 */
	public function send_letter($uid, $fuid, $content) {
		$session_id = $this->message_m->get_session_id ( $uid, $fuid );
		
		$data = array (
				'uid' => $uid,
				'fuid' => $fuid,
				'content' => $content,
				'session_id' => $session_id,
				'record_time' => time () 
		);
		
		$id = $this->save_letter ( $data );
		if ($id > 0) {
			$is_priv = 1;
			$this->send_msg ( $uid, $fuid, self::PERSON_LETTER, $id, $is_priv );
		}
		return $id;
	}
	
	/**
	 * 删除私信
	 *
	 * @access public
	 * @param int $fuid
	 *        	接收者ID
	 * @param int $uid
	 *        	发送私信的uid
	 *
	 * @return array 返回 消息ID
	 */
	public function remove_letter($m_id, $uid) {
		$this->db = K_Model::getInstanceDb ( true );
		
		if($m_id > 0 && $uid > 0) {
			$this->db = K_Model::getInstanceDb ( true );
			$where = array (
					'fuid' => $uid,
					'm_id' => $m_id
			);
			
			$row = $this->getRow($where);
			if($row) {
				if($row['is_read'] == 0) {
					$this->change_notice_for_read($uid, Message_model::PERSON_LETTER);
				}
				$set = array (
						'is_del' => 1
				); 
				//逻辑消息
				$this->update ( $where, $set );
				
				//删除私信
				$where = array (
						'fuid' => $uid,
						'id' => $row['ex_id']
				);
				return $this->update ( $where, $set , $this->model_name_person);				
			}			
		}
		return false;
	}
	
	/**
	 * 删除会话私信()
	 *
	 * @access public
	 * @param int $id
	 *        	消息ID
	 * @param int $fuid
	 *        	会话ID
	 *
	 * @return array 
	 */
	public function remove_char_letter($id, $uid, $fuid) {
		$this->db = K_Model::getInstanceDb ( true );
	
		if($id > 0 && $uid > 0) {
			$this->db = K_Model::getInstanceDb ( true );
			$where = array (
					'uid'  => $fuid,
					'fuid' => $uid,
					'id' => $id
			);
				
			$letter_row = $this->getRow($where, '', $this->model_name_person);
			if($letter_row) {				
				$set = array (
						'is_del' => 1
				);
				//逻辑删除会话
				$this->update ( $where, $set, $this->model_name_person);
	
				//删除私信消息
				$where = array (
						'uid'  => $fuid,
						'fuid' => $uid,
						'ex_id' => $id,
						'is_priv'=>1
				);
				return $this->update ( $where, $set );
			}
		}
		return false;
	}
	
	//屏蔽或解屏用户
	public function shield_letter_user($uid, $fuid, $is_un = 0) {
		$this->db = K_Model::getInstanceDb ( true );
		
		$data = array();
		$where = array('uid'=>$uid, 'fuid'=>$fuid);
		
		$row_id = $this->getOne($where, 'uid', $this->model_name_deny);
		if($row_id>0) {
			if($is_un == 1) {
				return $this->remove($where, $this->model_name_deny);
			}else {
				return true;
			}			
		}else {
			if($is_un == 1) {
				return true;
			}else {
				$data = array('uid'=>$uid, 'fuid'=>$fuid, 'record_time'=>time());
				return $this->add($data, '', $this->model_name_deny);
			}			
		}
	}
	
	
	/**
	 * //判断uid是否屏蔽了fuid
	 *
	 * @access public
	 * @param int $uid
	 *        	用户的uid
	 *
	 * @return array 返回
	 */	
	public function check_shield_user($uid, $fuid) {
		$this->db = K_Model::getInstanceDb ( true );
	
		$data = array();
		$where = array('uid'=>$uid, 'fuid'=>$fuid);
	
		$row_id = $this->getOne($where, 'uid', $this->model_name_deny);
		if($row_id>0) {
			return true;
		}else {
			return false;
		}
	}
	
	
	/**
	 * //获取uid的被屏蔽用户
	 *
	 * @access public
	 * @param int $uid
	 *        	用户的uid
	 *
	 * @return array 返回 
	 */	
	public function get_shield_user($uid) {
		$this->db = K_Model::getInstanceDb ( true );
	
		$row_list = $this->getAll('uid='.$uid, 'record_time desc', $this->model_name_deny);
		if($row_list) {
			$this->load->model ( 'space/member_db', 'member_m' );
			foreach ($row_list as $k => $v) {
				$row_list[$k]['fusername'] = $this->member_m->get_username($v['fuid']);
			}
		}
		return $row_list;
	}
	
	/**
	 * 删除个人所有私信
	 *
	 * @access public
	 * @param int $fuid
	 *        	接收者ID
	 * @param int $uid
	 *        	发送私信的uid
	 *
	 * @return array 返回 消息ID
	 */
	public function remove_all_letter($uid) {
		$this->db = K_Model::getInstanceDb ( true );
		    
		    //私信实体
			$where = array (
					'fuid' => $uid,
			);
			$set = array (
					'is_read'=>1,
					'is_del' => 1 
			); // 逻辑删除
			$this->update ( $where, $set , $this->model_name_person);
			
			//消息表
			$where = array (
					'fuid' => $uid,
					'is_priv'=>1
			);				
			$set = array (
					'is_read'=>1,
					'is_del' => 1
			); // 逻辑删除
			$flag = $this->update ( $where, $set);
			if($flag) {
				$count = $this->getCount(' where fuid = '.$uid. ' and is_read = 0');
				for($i=0; $i<$count ; $i++) {
					$this->change_notice_for_read($uid, Message_model::PERSON_LETTER);
				}
			}
			return $flag;
	}
	
	/**
	 * 获取私信会话列表
	 *
	 * @access public
	 * @param int $uid
	 *        	用户ID
	 * @param int $fuid
	 *        	接收用户ID
	 * @param int $noread
	 *        	阅读标记
	 * @param int $page
	 *        	分页数
	 * @param int $size
	 *        	每页大小
	 * @param int $is_count
	 *        	是否统计
	 *        	
	 * @return array 会话列表
	 */
	public function get_letter_session_list($uid, $fuid, $noread = 0, $page = 1, $size = 10, $is_count = true, $keyword = '') {
		$this->db = K_Model::getInstanceDb ( true );
		
		$sess_id = $this->message_m->get_session_id ( $uid, $fuid );
		if ($page <= 0) {
			$page = 1;
		}
		$offset = ($page - 1) * $size;
		$limit = $size;
		$where = "pm.is_del = 0 and pm.session_id='" . $sess_id . "'";		
		if ($noread == 1) {
			$where .= ' and pm.is_read = 0';
		}
		if(!empty($keyword)) {
			$where .= ' and pm.content like \'%'.$keyword.'%\'';
		}
		$sql = 'select pm.*, m.username as fusername  from ' . $this->model_name_person . ' as pm left join' . ' sk_member as m on pm.fuid=m.uid where ' . $where 
		     . ' order by pm.record_time desc limit ' . $offset . ', ' . $limit;
		$query = $this->db->query ( $sql );
		$result ['list'] = $query->result_array ();
		$result ['count'] = 0;
		if ($is_count) {
			$sql_c = 'select count(*) as c  from ' . $this->model_name_person . ' as pm where ' . $where;
			$query_c = $this->db->query ( $sql_c );
			$result_c = $query_c->result_array ();
			if (isset ( $result_c [0] ['c'] )) {
				$result ['count'] = $result_c [0] ['c'];
			}
		}
		
		return $result;
	}
	
	/**
	 * 获取(私信)消息列表
	 *
	 * @access public
	 * @param int $fuid
	 *        	$fuid
	 * @param int $noread
	 *        	阅读标记
	 * @param int $page
	 *        	分页数
	 * @param int $size
	 *        	每页大小
	 * @param int $is_count
	 *        	是否统计
	 *        	
	 * @return array 消息列表
	 */
	public function get_letter_msg_list($fuid, $noread = 0, $page = 1, $size = 10, $is_count = true, $keyword = '') {
		$this->db = K_Model::getInstanceDb ( true );
		
		if ($page <= 0) {
			$page = 1;
		}
		$offset = ($page - 1) * $size;
		$limit = $size;
		$where = ' sm.is_del = 0 and sm.is_priv = 1 and sm.fuid=' . $fuid;
		if ($noread == 1) {
			$where .= ' and sm.is_read = 0';
		}
		if(!empty($keyword)) {
			$where .= ' and pm.content like \'%'.$keyword.'%\'';
			$sql = 'select sm.*, m.username as fusername  from ' . $this->model_name . ' as sm ' .
					' inner join '.$this->model_name_person. ' as pm on sm.ex_id = pm.id '.
					' left join sk_member as m on sm.fuid=m.uid ' .					
					' where ' . $where . ' order by sm.record_time desc limit ' . $offset . ', ' . $limit;
			
			$c_sql = 'select count(*) as c  from ' . $this->model_name . ' as sm ' .
					' inner join '.$this->model_name_person. ' as pm on sm.ex_id = pm.id '.
					' left join sk_member as m on sm.fuid=m.uid ' .					
					' where ' . $where;
		}else {
			$sql = 'select sm.*, m.username as fusername  from ' . $this->model_name . ' as sm ' .
					' left join sk_member as m on sm.fuid=m.uid ' .
					' where ' . $where . ' order by sm.record_time desc limit ' . $offset . ', ' . $limit;
			
			$c_sql = 'select count(*) as c  from ' . $this->model_name . ' as sm ' .
					' left join sk_member as m on sm.fuid=m.uid ' .
					' where ' . $where;
		}

		$query = $this->db->query ( $sql );
		$result ['list'] = $query->result_array ();
		$result ['count'] = 0;
		if ($is_count) {
			$sql_c = $c_sql;
			$query_c = $this->db->query ( $sql_c );
			$result_c = $query_c->result_array ();
			if (isset ( $result_c [0] ['c'] )) {
				$result ['count'] = $result_c [0] ['c'];
			}
		}
		
		return $result;
	}
	
	/**
	 * 消息列表格式化
	 *
	 * @access public
	 * @param int $list
	 *        	消息数据数组
	 *        	
	 * @return array 消息列表
	 */
	public function format_msg_list($result) {
		foreach ( $result['list'] as $k => $v ) {
			$v ['obj_name'] = ''; 
			$v ['tid']      = 0;
			
			// 团队
			if ($v ['type'] == self::APPLY_JOIN || $v ['type'] == self::APPLY_JOIN_ALLOW || $v ['type'] == self::APPLY_JOIN_DENY) {
				$this->load->model ( 'space/team_db', 'team_m' );

				$team = $this->team_m->get_team ( array (
						'tid' => $v ['ex_id'] 
				), array (
						'tid',
						'name' 
				) );
				$v ['obj_name'] = $team ['name']; // 获取团队名称
				$v ['tid'] = $team ['tid'];
			}
			if ($v ['type'] == self::INVITE_APPLY || $v ['type'] == self::INVITE_TEAM_ALLOW || $v ['type'] == self::INVITE_TEAM_DENY) {
				$this->load->model ( 'space/team_db', 'team_m' );
				
				$team = $this->team_m->get_team ( array (
						'tid' => $v ['ex_id'] 
				), array (
						'tid',
						'name' 
				) );
				$v ['obj_name'] = $team ['name']; // 获取团队名称
				$v ['tid'] = $team ['tid'];
			}
			
			// 作品
			if ($v ['type'] == self::APPLY_WORKS || $v ['type'] == self::APPLY_WORKS_ALLOW || $v ['type'] == self::APPLY_WORKS_DENY) {
				$this->load->model ( 'space/video_db', 'video_m' );
				
				$works = $this->video_m->get_video ( array (
						'id' => $v ['ex_id'] 
				), 'id, title' );
				$v ['obj_name'] = $works ['title']; // 获取作品名称
				$v ['id'] = $works ['id']; // 获取作品名称
			}
			
			// 私信
			if ($v ['type'] == self::PERSON_LETTER) {
			
				$letter = $this->getRow ( array (
						'id' => $v ['ex_id']
				), 'id, content', $this->model_name_person);
				$v ['obj_name'] = $letter ['content']; // 私信的部分内容
				$v ['id'] = $letter ['id']; // 私信ID
				print_r($letter);
			}
			
			//关注 求关注 关注拒绝

			$this->load->model('space/member_db','member_m');
			$user = $this->member_m->get_user ( array (
					'username' 
			), array (
					'uid' => $v ['uid'] 
			) );
			if (! empty ( $user )) {
				$v ['username'] = $user ['username'];
				$result ['list'] [$k]['username'] = $v ['username'];
			} else {
				$v ['username'] = '';
				$result ['list'] [$k]['username'] = '';
			}
			
			$html = $this->get_message_html ( $v );
			
			$result ['list'] [$k] ['record_time'] = date ( 'Y-m-d H:i', $v ['record_time'] );
			$result ['list'] [$k] ['html'] = $html;
		}
		return $result;		
	}
	
	//将已经拉取的个人广播的广播发布状态置0(已拉取)
	public function update_pushsatus_by_uid($uid) {	
		$this->db = K_Model::getInstanceDb ( true );
		$row = $this->getRow(array('uid'=>$uid), '', $this->model_name_record);
		if(!empty($row)) {
			$last_mi_id = intval($row['last_mi_id']);
			$sql = 'update '.$this->model_name_publish.' set status = 0 where ex_id = '.$uid.' and type = 0 and mi_id < '.$last_mi_id;
			return $this->db->query($sql);
		}
	}
}
?>