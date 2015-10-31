<?php
/**
 * 赛酷 推荐模块
 * ============================================================================
 *   
 * 
 * ============================================================================
 * $Author: Bingle $
 * $Id: recommend_model.php 17171 2014-03-18 10:45:00Z Bingle $
*/
class Recommend_model extends K_Model {
	private $model_data = '';
	const OBJ_TYPE_LIVE = 1, OBJ_TYPE_VIDEO = 2, OBJ_TYPE_USER = 3, OBJ_TYPE_CLIP = 4;
	//推荐类型  1:直播 2：视频 3：用户 4:剪辑集锦
	
	/**
	* 构造函数
	*
	* @access  public
	* @return  mix
	*/	
	function __construct(){
		parent::__construct();
		$this->model_name = "sk_recommend";	
	}	
	
	/**
	 * 获取推荐
	 *
	 * @access public
	 * @param string $position  推荐频道位置
	 *        	
	 *
	 * @return boolean 
	 */	
	public function get($position, $page = 1, $size = 10) {
		if($position>0) {
			$this->db = K_Model::getInstanceDb ( true );
			
			$where  = " where position = '" . $position."'";
			$list = $this->getlist($where, $page, $size, 'sort asc, created_at desc');
			$res = array();
            if(!empty($list)) {            
            	foreach($list as $k=>$v) {
            		switch ($v['objtype']) {
                        case self::OBJ_TYPE_LIVE://直播
                                   $this->load->model('Live_programs_model', "Live_m");
                                   $where = array('rid'=>$v['objid']);
                                   $live = $this->Live_m->getRow($where);

                                   if(isset($live['is_live']) && $live['is_live']>1) {
                                       $this->load->model('video_model', "video_m");
                                       $video =    $this->video_m->get_archive_video($live['rid']);

                                       $live['video'] = $video;
                                   }
                                   $res[$k]['obj'] = $live;
                                   break;
            			case self::OBJ_TYPE_VIDEO:
            				       $this->load->model('video_model', "video_m");
            				       $where = array('id'=>$v['objid']);
            				       $video =    $this->video_m->get_video($where,array('id', 'title', 'uid', 'duration','pic_name','play'));

                                   $res[$k]['obj'] = $video;
            				       break;
            		   case self::OBJ_TYPE_USER://会员
            				      $this->load->model('space/member_db', "member_m");
            				      $where = array('uid'=>$v['objid']);
            				      $user = $this->member_m->get_user(array('uid', 'username'), $where);
                                  $res[$k]['obj'] = $user;
            				      break;
                        case self::OBJ_TYPE_CLIP://集锦
                                  $this->load->model('Highlight_model', "Highlight_m");
                                  $where = array('uid'=>$v['objid']);
                                  $highlight = $this->Highlight_m->getRow($where);
                                  $res[$k]['obj'] = $highlight;
                                  break;
            		}
            		$api = $this->config->item("api");
            		if(!empty($v['pic_img'])) {
            			$res[$k]['recom_pic'] = $this->config->item("img1_url"). "/images/recommend/". $v['pic_img'];
            		}
            		
            	}
            }
            return $res;			
		}else {
			return false;
		}		
	}
	
	
	/**
	 * 获取推荐数量
	 *
	 * @access public
	 * @param string $position  推荐频道ID
	 *        	
	 *
	 * @return boolean 
	 */	
	public function get_count($position) {
		if($position>0) {
			$this->db = K_Model::getInstanceDb ( false );
			
			$where = array('position'=>$position);
			return $this->getCount($where);						
		}else {
			return 0;
		}		
	}
}
?>
