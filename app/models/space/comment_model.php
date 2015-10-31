<?php
/**
 * 赛酷 评论功能模块
 * ============================================================================
 *   
 * 
 * ============================================================================
 * $Author: Bingle $
 * $Id: comment_model.php 17171 2014-02-24 16:11:00Z Bingle $
*/
class Comment_model extends K_Model {
	private $model_data = '';
	const TYPE_GAME = 1, TYPE_VIDEO = 2, TYPE_PIC = 3;//评论类型
	
	/**
	* 构造函数
	*
	* @access  public
	* @return  mix
	*/	
	function __construct(){
		parent::__construct();
		$this->model_name = "sk_comment";	
	}


    /**
     * 获取留言项
     *
     * @access  public
     * @param   int     $is_live       直播状态
     * @param   int     $content       问题内容
     * @param   int     $url           问题来源页面
     *
     * @return  array                 返回 评论ID
     */
    public function get_items($is_live, $page = 1, $size = 20) {
        $this->db = K_Model::getInstanceDb(true);
    }


    /**
	 * 添加评论
	 *
	 * @access  public
	 * @param   int     $type          评论类型
	 * @param   int     $ex_id         评论对象ID
	 * @param   int     $content       评论内容
	 * @param   int     $uid           评论者用户ID
	 * @param   int     $parent_cid    被评论的评论ID(回帖ID)
	 * @param   int     $status        默认审核状态
	 *
	 * @return  array                 返回 评论ID
	 */
	public function add_comment($type, $ex_id, $content, $uid, $parent_cid = 0, $status = 0) {
		$this->db = K_Model::getInstanceDb(true);
		$is_main = 1;
		if($parent_cid>0) {
			$is_main = 0;
		}
		
		$row = array('type'=>$type,
		             'ex_id'=>$ex_id,
				     'content'=>$content,
				     'uid'=>$uid,
				     'is_main'=>$is_main,
				     'parent_cid'=>$parent_cid,
				     'status'=>$status,
				     'record_time'=>time()
		);

		$cid = $this->add($row, 'c_id');
		return $cid;
	}

	/**
	 * 变更主贴的评论数
	 *
	 * @access  public
	 * @param   int     $c_id          评论ID
	 * @param   int     $is_add        评论数增减
	 *
	 * @return  boolean                
	 */
	public function inc_reply_num($c_id, $is_add = true) {
		if($c_id>0) {
			$this->db = K_Model::getInstanceDb(true);
			$flag = 1;
			if(!$is_add) {
				$flag = -1;
			}
			$sql = 'update '.$this->model_name.' set reply_num = reply_num+'.$flag.' where c_id='.$c_id;
			return $this->db->query($sql);
		}else {
			return false;
		}		
	}
	
	/**
	 * 获取评论列表(主贴)
	 *
	 * @access  public
	 * @param   int     $type         评论类型（1:赛事 2：作品）
	 * @param   int     $ex_id        对象ID
	 * @param   int     $page         当前页数
	 * @param   int     $size         页面大小
	 * @param   int     $is_count     是否返回总数
	 *
	 * @return  array                 返回评论列表
	 */
	public function get_mainlist_by_object($type, $ex_id, $page = 1, $size = 10, $is_count = FALSE) {
		$this->db = K_Model::getInstanceDb(false);
		
		$offset = ($page-1)*$size;
		$limit = $size;
		$where = ' where c.type='.$type. ' and c.ex_id='.$ex_id.' and c.is_main and c.status =1';		
		$sql = 'select c.*, m.username, m.avatar from '.$this->model_name.' as c '.
			   'left join sk_member as m on c.uid=m.uid'.
		       $where.
		       ' order by c.record_time desc limit '.$offset.', '.$limit;
		$query = $this->db->query($sql);
		$result['list'] = $query->result_array();
		if($is_count) {
			$sql = 'select count(*) as c from '.$this->model_name.' as c '.$where;
			$query = $this->db->query($sql);
			$rec = $query->result_array();
			if(isset($rec[0])) {
				$result['count'] = $rec[0]['c'];
			}else {
				$result['count'] = 0;
			}			
		}
		return $result;
	}
	
	/**
	 * 获取评论列表(回贴)
	 *
	 * @access  public
	 * @param   int     $parent_cid   评论父ID
	 * @param   int     $page         当前页数
	 * @param   int     $size         页面大小
	 * @param   int     $is_count     是否返回总数
	 *
	 * @return  array                 返回评论列表
	 */
	public function get_reply_by_pid($parent_cid, $page = 1, $size = 10, $is_count = FALSE) {
		$this->db = K_Model::getInstanceDb(false);
	
		$offset = ($page -1)*$size;
		$limit = $size;
		$where = ' where c.parent_cid = '.$parent_cid.' and c.status =1';
		$sql = 'select c.*, m.username, m.avatar from '.$this->model_name.' as c '.
			   'left join sk_member as m on c.uid=m.uid'.
		       $where.
			   ' order by c.record_time desc limit '.$offset.', '.$limit;
		$query = $this->db->query($sql);
		$result['list'] = $query->result_array();
		if($is_count) {
			$sql = 'select count(*) as c from '.$this->model_name.' as c '.$where;
			$query = $this->db->query($sql);
			$rec = $query->result_array();
			if(isset($rec[0])) {
				$result['count'] = $rec[0]['c'];
			}else {
				$result['count'] = 0;
			}
		}
		return $result;
	}
	
	/**
	 * 根据评论ID获取用户ID
	 *
	 * @access  public
	 * @param   int     $cid   评论ID
	 *
	 * @return  int/bool                 用户ID
	 */
	public function get_uid_by_cid($cid) {
		if($cid>0) {
			$this->db = K_Model::getInstanceDb(false);
			
			$where = array('c_id'=>$cid);
			$row = $this->getRow($where);
			if($row) {
				return $row['uid'];
			}else {
				return false;
			}
		}else {
			return false;
		}
	}
	
	/*
	 * 表情列表
	*
	*/
	public function get_face_list() {
		$list = array(
				'[草泥马]'=>array('text'=>'[草泥马]', 'face'=>'/public/data/images/face/general/shenshou_thumb.gif'),
				'[神马]'=>array('text'=>'[神马]', 'face'=>'/public/data/images/face/general/horse2_thumb.gif'),
				'[浮云]'=>array('text'=>'[浮云]', 'face'=>'/public/data/images/face/general/fuyun_thumb.gif'),
				'[给力]'=>array('text'=>'[给力]', 'face'=>'/public/data/images/face/general/geili_thumb.gif'),
				'[围观]'=>array('text'=>'[围观]', 'face'=>'/public/data/images/face/general/wg_thumb.gif'),
				'[威武]'=>array('text'=>'[威武]', 'face'=>'/public/data/images/face/general/vw_thumb.gif'),
				'[熊猫]'=>array('text'=>'[熊猫]', 'face'=>'/public/data/images/face/general/panda_thumb.gif'),
				'[兔子]'=>array('text'=>'[兔子]', 'face'=>'/public/data/images/face/general/rabbit_thumb.gif'),
				'[奥特曼]'=>array('text'=>'[奥特曼]', 'face'=>'/public/data/images/face/general/otm_thumb.gif'),
				'[囧]'=>array('text'=>'[囧]', 'face'=>'/public/data/images/face/general/j_thumb.gif'),
				'[互粉]'=>array('text'=>'[互粉]', 'face'=>'/public/data/images/face/general/hufen_thumb.gif'),
				'[礼物]'=>array('text'=>'[礼物]', 'face'=>'/public/data/images/face/general/liwu_thumb.gif'),
				'[呵呵]'=>array('text'=>'[呵呵]', 'face'=>'/public/data/images/face/general/smilea_thumb.gif'),
				'[嘻嘻]'=>array('text'=>'[嘻嘻]', 'face'=>'/public/data/images/face/general/tootha_thumb.gif'),
				'[哈哈]'=>array('text'=>'[哈哈]', 'face'=>'/public/data/images/face/general/laugh.gif'),
				'[可爱]'=>array('text'=>'[可爱]', 'face'=>'/public/data/images/face/general/tza_thumb.gif'),
				'[可怜]'=>array('text'=>'[可怜]', 'face'=>'/public/data/images/face/general/kl_thumb.gif'),
				'[挖鼻屎]'=>array('text'=>'[挖鼻屎]', 'face'=>'/public/data/images/face/general/kbsa_thumb.gif'),
				'[吃惊]'=>array('text'=>'[吃惊]', 'face'=>'/public/data/images/face/general/cj_thumb.gif'),
				'[害羞]'=>array('text'=>'[害羞]', 'face'=>'/public/data/images/face/general/shamea_thumb.gif'),
				'[挤眼]'=>array('text'=>'[挤眼]', 'face'=>'/public/data/images/face/general/zy_thumb.gif'),
				'[闭嘴]'=>array('text'=>'[闭嘴]', 'face'=>'/public/data/images/face/general/bz_thumb.gif'),
				'[鄙视]'=>array('text'=>'[鄙视]', 'face'=>'/public/data/images/face/general/bs2_thumb.gif'),
				'[爱你]'=>array('text'=>'[爱你]', 'face'=>'/public/data/images/face/general/lovea_thumb.gif'),
				'[泪]'=>array('text'=>'[泪]', 'face'=>'/public/data/images/face/general/sada_thumb.gif'),
				'[偷笑]'=>array('text'=>'[偷笑]', 'face'=>'/public/data/images/face/general/heia_thumb.gif'),
				'[亲亲]'=>array('text'=>'[亲亲]', 'face'=>'/public/data/images/face/general/qq_thumb.gif'),
				'[生病]'=>array('text'=>'[生病]', 'face'=>'/public/data/images/face/general/sb_thumb.gif'),
				'[太开心]'=>array('text'=>'[太开心]', 'face'=>'/public/data/images/face/general/mb_thumb.gif'),
				'[懒得理你]'=>array('text'=>'[懒得理你]', 'face'=>'/public/data/images/face/general/ldln_thumb.gif'),
				'[右哼哼]'=>array('text'=>'[右哼哼]', 'face'=>'/public/data/images/face/general/yhh_thumb.gif'),
				'[左哼哼]'=>array('text'=>'[左哼哼]', 'face'=>'/public/data/images/face/general/zhh_thumb.gif'),
				'[嘘]'=>array('text'=>'[嘘]', 'face'=>'/public/data/images/face/general/x_thumb.gif'),
				'[衰]'=>array('text'=>'[衰]', 'face'=>'/public/data/images/face/general/cry.gif'),
				'[委屈]'=>array('text'=>'[委屈]', 'face'=>'/public/data/images/face/general/wq_thumb.gif'),
				'[吐]'=>array('text'=>'[吐]', 'face'=>'/public/data/images/face/general/t_thumb.gif'),
				'[打哈欠]'=>array('text'=>'[打哈欠]', 'face'=>'/public/data/images/face/general/k_thumb.gif'),
				'[抱抱]'=>array('text'=>'[抱抱]', 'face'=>'/public/data/images/face/general/bba_thumb.gif'),
				'[怒]'=>array('text'=>'[怒]', 'face'=>'/public/data/images/face/general/angrya_thumb.gif'),
				'[疑问]'=>array('text'=>'[疑问]', 'face'=>'/public/data/images/face/general/yw_thumb.gif'),
				'[馋嘴]'=>array('text'=>'[馋嘴]', 'face'=>'/public/data/images/face/general/cza_thumb.gif'),
				'[拜拜]'=>array('text'=>'[拜拜]', 'face'=>'/public/data/images/face/general/88_thumb.gif'),
				'[思考]'=>array('text'=>'[思考]', 'face'=>'/public/data/images/face/general/sk_thumb.gif'),
				'[汗]'=>array('text'=>'[汗]', 'face'=>'/public/data/images/face/general/sweata_thumb.gif'),
				'[困]'=>array('text'=>'[困]', 'face'=>'/public/data/images/face/general/sleepya_thumb.gif'),
				'[睡觉]'=>array('text'=>'[睡觉]', 'face'=>'/public/data/images/face/general/sleepa_thumb.gif'),
				'[钱]'=>array('text'=>'[钱]', 'face'=>'/public/data/images/face/general/money_thumb.gif'),
				'[失望]'=>array('text'=>'[失望]', 'face'=>'/public/data/images/face/general/sw_thumb.gif'),
				'[酷]'=>array('text'=>'[酷]', 'face'=>'/public/data/images/face/general/cool_thumb.gif'),
				'[花心]'=>array('text'=>'[花心]', 'face'=>'/public/data/images/face/general/hsa_thumb.gif'),
				'[哼]'=>array('text'=>'[哼]', 'face'=>'/public/data/images/face/general/hatea_thumb.gif'),
				'[鼓掌]'=>array('text'=>'[鼓掌]', 'face'=>'/public/data/images/face/general/gza_thumb.gif'),
				'[晕]'=>array('text'=>'[晕]', 'face'=>'/public/data/images/face/general/dizzya_thumb.gif'),
				'[悲伤]'=>array('text'=>'[悲伤]', 'face'=>'/public/data/images/face/general/bs_thumb.gif'),
				'[抓狂]'=>array('text'=>'[抓狂]', 'face'=>'/public/data/images/face/general/crazya_thumb.gif'),
				'[黑线]'=>array('text'=>'[黑线]', 'face'=>'/public/data/images/face/general/h_thumb.gif'),
				'[阴险]'=>array('text'=>'[阴险]', 'face'=>'/public/data/images/face/general/yx_thumb.gif'),
				'[怒骂]'=>array('text'=>'[怒骂]', 'face'=>'/public/data/images/face/general/nm_thumb.gif'),
				'[心]'=>array('text'=>'[心]', 'face'=>'/public/data/images/face/general/hearta_thumb.gif'),
				'[伤心]'=>array('text'=>'[伤心]', 'face'=>'/public/data/images/face/general/unheart.gif'),
				'[猪头]'=>array('text'=>'[猪头]', 'face'=>'/public/data/images/face/general/pig.gif'),
				'[ok]'=>array('text'=>'[ok]', 'face'=>'/public/data/images/face/general/ok_thumb.gif'),
				'[耶]'=>array('text'=>'[耶]', 'face'=>'/public/data/images/face/general/ye_thumb.gif'),
				'[good]'=>array('text'=>'[good]', 'face'=>'/public/data/images/face/general/good_thumb.gif'),
				'[不要]'=>array('text'=>'[不要]', 'face'=>'/public/data/images/face/general/no_thumb.gif'),
				'[赞]'=>array('text'=>'[赞]', 'face'=>'/public/data/images/face/general/z2_thumb.gif'),
				'[来]'=>array('text'=>'[来]', 'face'=>'/public/data/images/face/general/come_thumb.gif'),
				'[弱]'=>array('text'=>'[弱]', 'face'=>'/public/data/images/face/general/sad_thumb.gif'),
				'[蜡烛]'=>array('text'=>'[蜡烛]', 'face'=>'/public/data/images/face/general/lazu_thumb.gif'),
				'[钟]'=>array('text'=>'[钟]', 'face'=>'/public/data/images/face/general/clock_thumb.gif'),
				'[话筒]'=>array('text'=>'[话筒]', 'face'=>'/public/data/images/face/general/m_thumb.gif'),
				'[蛋糕]'=>array('text'=>'[蛋糕]', 'face'=>'/public/data/images/face/general/cake.gif'),
				'[地球一小时]'=>array('text'=>'[地球一小时]', 'face'=>'/public/data/images/face/general/earth1r_thumb.gif'),
				'[许愿]'=>array('text'=>'[许愿]', 'face'=>'/public/data/images/face/general/lxhxuyuan_thumb.gif'),
				'[泪流满面]'=>array('text'=>'[泪流满面]', 'face'=>'/public/data/images/face/general/lxhtongku_thumb.gif'),
				'[马到成功]'=>array('text'=>'[马到成功]', 'face'=>'/public/data/images/face/general/madaochenggong_thumb.gif'),
				'[江南style]'=>array('text'=>'[江南style]', 'face'=>'/public/data/images/face/general/gangnamstyle_thumb.gif'),
				'[偷乐]'=>array('text'=>'[偷乐]', 'face'=>'/public/data/images/face/general/lxhtouxiao_thumb.gif'),
				'[得意地笑]'=>array('text'=>'[得意地笑]', 'face'=>'/public/data/images/face/general/lxhdeyidixiao_thumb.gif'),
				'[炸鸡和啤酒]'=>array('text'=>'[炸鸡和啤酒]', 'face'=>'/public/data/images/face/general/zhaji_thumb.gif'),
				'[xkl转圈]'=>array('text'=>'[xkl转圈]', 'face'=>'/public/data/images/face/general/xklzhuanquan_thumb.gif'),
				'[lt切克闹]'=>array('text'=>'[lt切克闹]', 'face'=>'/public/data/images/face/general/ltqiekenao_thumb.gif'),
				'[din推撞]'=>array('text'=>'[din推撞]', 'face'=>'/public/data/images/face/general/dintuizhuang_thumb.gif'),
				'[风扇]'=>array('text'=>'[风扇]', 'face'=>'/public/data/images/face/general/fan.gif')
		);
		return $list;
	}
	
	private function face_replace($face_word) {
		$list = $this->get_face_list();
		$fact = $list[$face_word];
		$url = '';
		if(!empty($fact)) {
			$url = $fact['face'];
		}
		if($url) {
			$alt = str_replace("[", "", $face_word);
			$alt = str_replace("]", "", $face_word);
			$html = '<img src="'.$url.'" alt="'.$alt.'" title="'.$alt.'">';
		}else {
			$html = $face_word;
		}		
		return $html;
	}
	
	public function regex_face($text_str) {
		$regex = '/\[[a-zA-Z0-9\x80-\xff]+\]/i';
		$matches = false;
		if(preg_match_all($regex, $text_str, $matches)){
			if(is_array($matches)) {
				foreach($matches[0] as $v) {
					$replace_html = '';
					$replace_html = $this->face_replace($v);
					$text_str = str_replace($v, $replace_html, $text_str);
				}
			}
			return $text_str;
		}else {
			return $text_str;
		}
	}
}
?>