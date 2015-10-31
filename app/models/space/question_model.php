<?php
/**
 * 赛酷  留言评论功能模块
 * ============================================================================
 *   
 * 
 * ============================================================================
 * $Author: Bingle $
 * $Id: question_model.php 17171 2014-03-11 10:29:00Z Bingle $
*/
class Question_model extends K_Model {
	private $model_data = '';
	const TYPE_QUESTION = 1, TYPE_MESSAGE = 2, TYPE_FEEDBACK = 3;//提问：1  留言 ：2
	
	/**
	* 构造函数
	*
	* @access  public
	* @return  mix
	*/	
	function __construct(){
		parent::__construct();
		$this->model_name = "sk_question";	
	}
	
	/**
	 * 提交问题
	 *
	 * @access  public
	 * @param   int     $uid           用户ID
	 * @param   int     $title         问题标题
	 * @param   int     $content       问题内容
	 * @param   int     $url           问题来源页面
	 *
	 * @return  int                    返回 问题ID
	 */
	public function save_question($uid, $title, $content, $url = '') {
		if($uid>0) {
			$this->db = K_Model::getInstanceDb(true);			
			$data = array('title'=>$title,
					      'content'=>$content,
					      'uid'=>$uid,
					      'refer'=>$url,
					      'q_type'=>Question_model::TYPE_QUESTION,
					      'record_time'=>time()
			             );
			
			$qid = $this->add($data, 'qid');
			return $qid;
		}else {
			return 0;
		}		
	}

	/**
	 * 提交留言
	 *
	 * @access  public
	 * @param   int     $uid           用户ID
	 * @param   int     $content       问题内容
	 * @param   int     $url           问题来源页面
	 *
	 * @return  array                 返回 评论ID
	 */
	public function save_message($uid, $content, $url = '') {
	    if($uid>0) {
			$this->db = K_Model::getInstanceDb(true);			
			$data = array('title'=>'',
					      'content'=>$content,
					      'uid'=>$uid,
					      'refer'=>$url,
					      'q_type'=>Question_model::TYPE_MESSAGE,
					      'record_time'=>time()
			             );
			
			$qid = $this->add($data, 'qid');
			return $qid;
		}else {
			return 0;
		}
	}
	
	/**
	 * 提交反馈
	 *
	 * @access  public
	 * @param   array     $data           用户ID
	 *
	 * @return  array                 返回 评论ID
	 */	
	public function save_feedback($data) {
		$this->db = K_Model::getInstanceDb(true);			
		$qid = $this->add($data, 'qid');
		return $qid;
	}
	
	/**
	 * 获取反馈分类
	 *
	 * @access  public
	 * @param   array     $data           用户ID
	 *
	 * @return  array                 返回 评论ID
	 */
	public function get_feedback_cate() {
		$this->db = K_Model::getInstanceDb(true);
		
		return $this->getAll('','sort asc, id asc', 'sk_question_class');
	}
	
	/**
	 * 判断标题是否重复
	 *
	 * @access  public
	 * @param   int     $uid           用户ID
	 * @param   int     $content       标题或内容
	 * @param   int     $type          判断类型
	 *
	 * @return  bool                   
	 */
	public function exist_message($uid, $content, $type) {
		$where = array();
		if($type == self::TYPE_MESSAGE) {
			$where = array('uid'=>$uid, 'content'=>$content);
		}else {
			$where = array('uid'=>$uid, 'title'=>$content);
		}
		
		if(!empty($where)) {
			$this->db = K_Model::getInstanceDb(true);
			$qid = $this->getOne($where, 'qid');
			if($qid>0) {
				return true;
			}else {
				return false;
			}
		}else {
			return false;
		}		
	}
	
	/**
	 * 获取问题留言(不含回复)
	 *
	 * @access  public
	 * @param   int     $uid          用户ID
	 * @param   int     $type         问题类型（1
	 * @param   int     $page         当前页数
	 * @param   int     $size         页面大小
	 * @param   int     $is_count     是否返回总数
	 *
	 * @return  array                 返回列表
	 */
	public function get_list_by_type($uid, $type, $page = 1, $size = 10, $is_count = FALSE) {
		$this->db = K_Model::getInstanceDb(true);
		
		$offset = ($page-1)*$size;
		$limit = $size;
		$where = ' where q.uid = '.$uid.' and q.status =1 and q.is_answer = 0 and q.q_type='.$type;		
		$sql = 'select q.qid, q.title, q.content, q.parent_qid, q.uid, q.is_reply, q.record_time, m.username, m.avatar from '.$this->model_name.' as q '.
			   'left join sk_member as m on q.uid=m.uid'.
		       $where.
		       ' order by q.record_time desc limit '.$offset.', '.$limit;
		$query = $this->db->query($sql);
		$result['list'] = $query->result_array();
		if($is_count) {
			$sql = 'select count(*) as c from '.$this->model_name.' as q '.$where;
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
	 * 获取回答
	 *
	 * @access  public
	 * @param   int     $parent_qid   父ID
	 * @param   int     $page         当前页数
	 * @param   int     $size         页面大小
	 * @param   int     $is_count     是否返回总数
	 *
	 * @return  array                 返回列表
	 */	
	public function get_reply_by_qid($parent_qid = 0, $page = 1, $size = 10, $is_count = FALSE) {
		$this->db = K_Model::getInstanceDb(true);
		
		$offset = ($page-1)*$size;
		$limit = $size;
		$where = ' where q.is_answer = 1 and q.parent_qid='.$parent_qid;
		$sql = 'select q.qid, q.content, q.record_time, m.admin_name from '.$this->model_name.' as q '.
				'left join sk_manager as m on q.uid=m.id'.
				$where.
				' order by q.record_time desc limit '.$offset.', '.$limit;
		$query = $this->db->query($sql);
		$result['list'] = $query->result_array();
		if($is_count) {
			$sql = 'select count(*) as c from '.$this->model_name.' as q '.$where;
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
}
?>