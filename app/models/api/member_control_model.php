<?php
/**************************************************************************
 *   Path:   /model/space/member_controll_model.php
*   Comments:   用户相关控制模型
*   Author: Zhang Lin
*   Last Modified:  04.02.2014 / Zhang Lin
**************************************************************************/
class member_control_model extends K_Model {

	private $member_control = 'sk_member_regctrl';
    function __construct()
    {
        parent::__construct();
    }
    
    /**
     * 注册控制(同一个ip在某个时间内能注册的最大次数)
     * @param string $ip
     * @return boolean
     */
    public function regctrl($ip){
    	$this->db = K_Model::getInstanceDb(false);
    	$data = $this->getRow(array('ip'=>$ip),array('count','lastregdate'),$this->member_control);
    	if (empty($data)) {
    		return false;//不受控制
    	}else {
    		$cur_time = time();
    		$regctrl = read_static_cache('website_config');
    		if ($cur_time-$data['lastregdate']>$regctrl['regist_t']*3600) {//超过时间限制,不受控制
    			return false;
    		}else {//是否超过次数限制
    			return $data['count']+1>$regctrl['regist_count'] ? true : false;
    		}

    	}
    }
    
    /**
     * 更新注册控制统计记录
     * @param array $data
     * @return boolean
     */
    public function update_regctrl($data){
    	if (empty($data)) {
    		return false;
    	}else {
    		$this->db = K_Model::getInstanceDb(true);
    		$log = $this->getRow(array('ip'=>$data['ip']),array('count','lastregdate'),$this->member_control);
    		if (empty($log)) {
    			$id = $this->add($data,'id',$this->member_control);
    			return $id ? true : false;
    		}else {
    			$cur_time = time();
    			$regctrl = read_static_cache('website_config');
    			if ($cur_time-$data['lastregdate']>$regctrl['regist_t']*3600) {//超过时间限制,更新时间、次数归1
    				$result = $this->update(array('ip'=>$data['ip']),array('lastregdate'=>$cur_time,'count'=>1),$this->member_control);
    				return $result ? true : false;
    			}else {//没有超过次数限制
    				$result = $this->update(array('ip'=>$data['ip']),array('lastregdate'=>$cur_time,'count'=>$log['count']+1),$this->member_control);
    				return $result ? true : false;
    			}
    			 
    		}
    	}
    }
    
    /**
     * 是否在ip黑名单
     * @param string $ip
     * @return boolean
     */
    public function is_ban_ip($ip){
    	$data = read_static_cache('website_config');
    	if (empty($data)) {
    		return false;
    	}else {
    		return strpos($data['ip_blacklist'],$ip) !== false ? true : false;
    	}
    }
}
?>