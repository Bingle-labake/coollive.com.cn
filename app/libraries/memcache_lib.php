<?php

/**
 *      [Discuz!] (C)2001-2099 Comsenz Inc.
 *      This is NOT a freeware, use is subject to license terms
 *
 *      $Id: Memcache_lib.php 7158 2014-02-26 10:40:23Z Bingle $
 */

class Memcache_lib
{
	var $enable;
	var $obj;
	var $prefix='sk_';
    var $config = array('server' => MEMCACHED_HOST,
    		            'port' => MEMCACHED_PORT,
    		            'pconnect' => MEMCACHED_PCONNECT);
	function Memcache_lib() {
         $this->init();
	}

	function init() {
		if(!empty($this->config['server'])) {
			try{
			    $this->obj = new Memcache;
			    if($this->config['pconnect']) {
				    $connect = @$this->obj->pconnect($this->config['server'], $this->config['port']);
			    } else {
				    $connect = @$this->obj->connect($this->config['server'], $this->config['port']);
			    }
			    $this->enable = $connect ? true : false;
			}catch(Exception $e){
				$this->enable = false;
			}	
		}else {
			exit('the memcached server config is disable!');
		}
	}

	function get($key) {
		if(!$this->enable) return false;
        $res = '';
		try{
			if(empty($this->obj)) {
				$res = false;
			}else {
				$res = $this->obj->get($this->prefix.$key);
			}			
		}catch(Exception $e){
			$res = false;
		}	
		return $res;	
	}

	function set($key, $value, $ttl = 0) {
        if(!$this->enable) return false;
		return $this->obj->set($this->prefix.$key, $value, MEMCACHE_COMPRESSED, $ttl);
	}

	function rm($key) {
        if(!$this->enable) return false;
		return $this->obj->delete($this->prefix.$key);
	}
	function rm_all() {
        if(!$this->enable) return false;
		$items=$this->obj->getExtendedStats('items');
		$items=$items[$this->config['server'].":".$this->config['port']]['items'];
		$len=count($items);
        for($i=0;$i<$len;$i++){
            $number=$items[$i]['number'];			
	         $str=$this->obj->getExtendedStats("cachedump",$number,0);		 
	         $line=$str[$this->config['server'].":".$this->config['port']];
	         if(is_array($line) && count($line)>0){
	            foreach($line as $key=>$value){
	                 if(substr($key,0,4)==$this->prefix)
	                 	$this->obj->delete($key);
	             }
	        }
     	}		
	}
	function rm_specialkey($subkey) {
        if(!$this->enable) return false;
		$subkey = $this->prefix.$subkey;
		$this->obj->delete($subkey);
		
		$count = strlen($subkey);
		$items=$this->obj->getExtendedStats('items');
		$items=$items[$this->config['server'].":".$this->config['port']]['items'];
		$len=count($items);
        for($i=0;$i<$len;$i++){
            $number=$items[$i]['number'];			
	         $str=$this->obj->getExtendedStats("cachedump",$number,0);		 
	         $line=$str[$this->config['server'].":".$this->config['port']];
	         if(is_array($line) && count($line)>0){
	            foreach($line as $key=>$value){		            	 
		                 if(substr($key,0,$count)== $subkey || $key==$subkey){ 		                 	
		                 	$this->obj->delete($key);
		                 }
	             }
	        }
     	}		
	}
}

?>