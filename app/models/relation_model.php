<?php
/**************************************************************************
 *   Path:   /model/relation_model.php
*   Comments:   关注/粉丝模型
*   Author: Zhang Lin
*   Last Modified:  04.24.2014 / Zhang Lin
**************************************************************************/
class Relation_model extends K_Model {

	private $member = 'sk_member';
	private $member_follow = 'sk_member_follow';
	private $followers_cache_key = 'followers';//关注列表缓存key
	private $fans_cache_key = 'fans';//粉丝列表缓存
	private $cache_time = 43200;//一个月
    function __construct()
    {
        parent::__construct();
        $this->load->library('memcache_lib');
    }
    
    /**
     * 添加关注
     * @param array $data
     * @return boolean
     */
    public function add_follow($data){
    	$this->db = K_Model::getInstanceDb(true);
    	$id = $this->add($data,'id',$this->member_follow);
    	if ($id) {
    		return $this->update_relation_cache($data['uid'], $data['fuid']);
    	}else{
    		return false;
    	}
    }
    
    /**
     * 获取关注某个人的记录
     * @param array $where
     * @param array $field
     * @return array
     */
    public function get_follow_by_uid($where,$field = array()){
    	$this->db = K_Model::getInstanceDb(false);
    	$data = $this->getRow($where, $field,$this->member_follow);
    	return !empty($data) ? $data : array();
    }
    
    /**
     * 取消关注
     * @param int $uid
     * @param int $fuid
     * @return boolean
     */
    public function unfollow($uid,$fuid){
    	$this->db = K_Model::getInstanceDb(true);
    	$follow = $this->get_follow_by_uid(array('uid'=>$uid,'fuid'=>$fuid),array('status'));
    	if ($follow['status']) {
    		//更新数据库
    		$result1 = $this->update_relation(array('uid'=>$uid,'fuid'=>$fuid), array('status'=>0,'type'=>0));
    		$follow = $this->get_follow_by_uid(array('uid'=>$fuid,'fuid'=>$uid,'type'=>1));
    		if (!empty($follow)) {//存在相互关注,另一条记录需要更新
    			$result2 = $this->update_relation(array('uid'=>$fuid,'fuid'=>$uid), array('type'=>0));
    		}else {
    			$result2 = true;
    		}
    		if ($result1 && $result2) {
    			//更新关注缓存
    			/*$key = $uid.'_'.$this->followers_cache_key;
    			$followers = $this->memcache_lib->get($key);
    			if (!empty($followers)) {
    				$index = array_search($fuid, $followers);
    				if (isset($followers[$index])) {
    					unset($followers[$index]);
    					$followers = array_values($followers);//重置索引
    					$this->memcache_lib->set($key,$followers,$this->cache_time);
    				}
    			}*/
    			//更新粉丝缓存
    			/*$fans_key = $fuid.'_'.$this->fans_cache_key;
    			$fans = $this->memcache_lib->get($fans_key);
    			if (!empty($fans)) {
    				$index = array_search($uid, $followers);
    				if (isset($fans[$index])) {
    					unset($fans[$index]);
    					$fans = array_values($fans);//重置索引
    					$this->memcache_lib->set($fans_key,$fans,$this->cache_time);
    				}
    			}*/
    			//更新统计
    			$this->member_m->inc_val($uid,array('follows'=>-1));
    			$this->member_m->inc_val($fuid,array('fans'=>-1));
    			return true;
    		}else {
    			return false;
    		}
    	}else {
    		return false;
    	}
    }
    
    /**
     * 获取某个用户的关注列表
     * @param int $uid
     * @param int $page
     * @param int $pagesize
     * @param array $where
     * @return array
     */
    public function get_follow_list_by_uid($uid,$page,$pagesize = 10,$where){
    	$followers = array();
    	$offset = ($page-1)*$pagesize;
    	$key = $uid.'_'.$this->followers_cache_key;
    	$list = $this->memcache_lib->get($key);
    	$is_user_memcache = false;//关注缓存暂时关闭
    	if ($is_user_memcache) {//缓存能取到
    		$this->load->model('space/member_db','member_m');
    		$followers['count'] = count($list);
    		$max_i = $offset+$pagesize>$followers['count'] ? $followers['count'] : $pagesize;
    		$data = array();
    		for ($i=$offset;$i<$max_i;$i++){
    			$user = $this->member_m->get_user(array('uid','username'),array('uid'=>$list[$i]));

    			$follow = $this->get_follow_by_uid(array('uid'=>$uid,'fuid'=>$list[$i],'type'=>1));
    			if ($where['type'] == 1) {//相互关注
    				if (!empty($follow)) {
    					$user['is_follow_each'] = true;
    					if (!empty($where['username'])) {
    						if (strpos($user['username'], $where['username']) !== false) {
    							$data[$i] = $user;
    						}
    					}else {
    						$data[$i] = $user;
    					}
    				}else {
    					$user['is_follow_each'] = false;
    				}
    			}else {//全部关注
    				$user['is_follow_each'] = !empty($follow) ? true : false;
    				if (!empty($where['username'])) {
    					if (strpos($user['username'], $where['username']) !== false) {
    						$data[$i] = $user;
    					}
    				}else {
    					$data[$i] = $user;
    				}
    			}
    			
    		}
    		$followers['list'] = $data;
    	}else {//缓存取不到,取数据库
    		$this->db = K_Model::getInstanceDb(false);
    		$wh = '';
    		$wh .= !empty($where['type']) ? " and a.type=$where[type]" : "";
    		$wh .= !empty($where['username']) ? " and b.username like '%$where[username]%'" : "";
    		$sql = "select a.fuid as uid,b.username,a.type as is_follow_each from $this->member_follow a left join $this->member b on a.fuid=b.uid where a.uid=$uid and a.status=1 $wh order by dateline limit $offset,$pagesize";
    		$followers['list'] = $this->db->query($sql)->result_array();
    		$sql = "select count(*) as count from $this->member_follow where uid=$uid and status=1";
    		$data = $this->db->query($sql)->result_array();
    		$followers['count'] = $data[0]['count'];
    	}
    	return $followers;
    }
    
    /**
     * 获取某个用户的粉丝列表
     * @param int $uid
     * @param int $page
     * @param int $pagesize
     * @param array $where
     * @return array
     */
    public function get_fans_list_by_uid($uid,$page,$pagesize = 10,$where){
    	$fans = array();
    	$offset = ($page-1)*$pagesize;
    	$key = $uid.'_'.$this->fans_cache_key;
    	$list = $this->memcache_lib->get($key);
    	$is_user_memcache = false;//粉丝缓存暂时关闭
    	if ($is_user_memcache) {//缓存能取到
    		$this->load->model('space/member_db','member_m');
    		$fans['count'] = count($list);
    		$max_i = $offset+$pagesize>$fans['count'] ? $fans['count'] : $pagesize;
    		$data = array();
    		for ($i=$offset;$i<$max_i;$i++){
    			$user = $this->member_m->get_user(array('uid','username'),array('uid'=>$list[$i]));
    			$follow = $this->get_follow_by_uid(array('uid'=>$uid,'fuid'=>$list[$i],'type'=>1));
    			if ($where['type'] == 1) {//相互关注
    				if (!empty($follow)) {
    					$user['is_follow_each'] = true;
    					$data[$i] = $user;
    				}else {
    					$user['is_follow_each'] = false;
    				}
    			}else {//全部关注
    				$user['is_follow_each'] = !empty($follow) ? true : false;
    				$data[$i] = $user;
    			}
    			
    		}
    		$fans['list'] = $data;
    	}else {//缓存取不到,取数据库
    		$this->db = K_Model::getInstanceDb(false);
    		$wh = '';
    		$wh .= !empty($where['type']) ? " and a.type=$where[type]" : "";
    		$wh .= !empty($where['username']) ? " and b.username like '%$where[username]%'" : "";
    		$sql = "select a.uid,b.username,a.type as is_follow_each from $this->member_follow a left join $this->member b on a.uid=b.uid where a.fuid=$uid and a.status=1 $wh order by dateline limit $offset,$pagesize";
    		$fans['list'] = $this->db->query($sql)->result_array();
    		$sql = "select count(*) as count from $this->member_follow where fuid=$uid and status=1";
    		$data = $this->db->query($sql)->result_array();
    		$fans['count'] = $data[0]['count'];
    	}
    	return $fans;
    }
    
    /**
     * 更新关系表
     * @param array $where
     * @param array $field
     * @return boolean
     */
    public function update_relation($where,$field){
    	$this->db = K_Model::getInstanceDb(true);
    	return $this->update($where,$field,$this->member_follow);
    }
    
    /**
     * 更新关系缓存
     * @param int $uid
     * @param int $fuid
     * @return boolean
     */
    public function update_relation_cache($uid,$fuid){
    	//更新关注缓存
    	/*$followers_cache_key = $uid.'_'.$this->followers_cache_key;
    	$followers = $this->memcache_lib->get($followers_cache_key);
    	if (!empty($followers)) {
    		$followers[] = $fuid;
    		$this->memcache_lib->set($followers_cache_key,$followers,$this->cache_time);
    	}else {
    		$this->memcache_lib->set($followers_cache_key,array($fuid),$this->cache_time);
    	}
    	//更新对方粉丝缓存
    	$fans_cache_key = $fuid.'_'.$this->fans_cache_key;
    	$fans = $this->memcache_lib->get($fans_cache_key);
    	if (!empty($fans)) {
    		$fans[] = $uid;
    		$this->memcache_lib->set($fans_cache_key,$fans,$this->cache_time);
    	}else {
    		$this->memcache_lib->set($fans_cache_key,array($uid),$this->cache_time);
    	}*/
    	//更新用户表统计数据
    	$this->load->model('space/member_db','member_m');
    	$this->member_m->inc_val($uid,array('follows'=>1));
    	$this->member_m->inc_val($fuid,array('fans'=>1));
    	return true;
    }
}
?>