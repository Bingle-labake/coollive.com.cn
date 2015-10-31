<?php
/**
 * 赛酷 微信回调服务
 * ============================================================================
 *   
 * 
 * ============================================================================
 * $Author: Bingle $
 * $Id: Weixin.php 17171 2014-07-08 17:37:00Z Bingle $
*/
class Weixin extends CI_Controller {
	public $token = 'CHzowsNpz-qgJrJQZn3kobKd-VvKWAiikFlFPquj4QAKxQoHFol_VDKigRNjfW2WbNadHboXdpSbm32MEb8dvA';//token
	const TOKEN      = "saikucom_public_weixin";
	const URL        = "http://i.saiku.com.cn/service/weixin";
	const AppId      = "wxe7c7feb3665d4d63";
	const AppSecret  = "149189746b0250d17cbee58198fa5d86";
	public $weixin = null;
	
	/**
	* 构造函数
	*
	* @access  public
	* @return  mix
	*/	
	function __construct(){
		parent::__construct();
		$this->load->library('weixin/weixin_lib');
		$this->weixin = $this->weixin_lib;
	}
	
	public function test() {
		$keyword = "青山";
	$this->load->helper('sphinxapi_helper');
				$cl = new SphinxClient();
				
				$cl->SetServer( SPHINX_HOST, SPHINX_PORT );	
				$cl->SetMatchMode(SPH_MATCH_BOOLEAN);#设置全文检索模式
				
				$word = $keyword;#关键词
				$result = array();	
				
				$cl->SetFilter('is_del',array(0));#false允许true拒绝
                $cl->SetFilter('type',array(1));   
				$cl->SetFilterRange( 'addtime', $min=0, time(), $exclude=false );
				$cl->SetLimits(0,5,100);				
				$ret = $cl->Query( "@(tag,title,description) $word ", "works_index");
              
				$content = array();
				if($ret['total']) {	
					$this->load->model('video_mod');
					
				    $idarr = array();
					foreach($ret['matches'] as $id=>$info) {
					    array_push($idarr,$info['attrs']['wid']);
				    }				    
				    $ids = implode("','",$idarr);
				    $where = " WHERE v.id in ('$ids')";
				    $video = $this->video_mod->getDataAll($where,0,5,' v.`adddate` desc ');
				    if(!empty($video)) {
				    	foreach($video as $v) {
				    		$params = array('id'=>$v['id']);
				    		if(isset($v['path']))
				    			$params['path']=$v['path'];
				    		
				    		$img_params = array('pic_name'=>'1.jpg','pic_path'=>$v['pic_path'],'w'=>220,'h'=>150);
				    		$content[] = array("Title"=>$v['title'].".".$v['longtitle'],
				    				           "Description"=>$v['description'],
				    				           "PicUrl"=>img_url_path('video',$img_params),
				    				           "Url" =>$this->config->item("base_url").build_uri('video',$params));
				    	}
				    }
				    
				}
		var_export($content);
		exit;
	}
	
	public function index() {
		//$this->responseMsg();
		$this->valid();
	}
	
	//提交意见反馈
	public function valid() {
		$signature = $this->input->get_post('signature');
		$timestamp = $this->input->get_post('timestamp');
		$nonce     = $this->input->get_post('nonce');
		
		
		$echoStr = $this->input->get_post('echostr');
		if($this->weixin->checkSignature($signature, $timestamp, $nonce)) {
			echo $echoStr;
			exit; 
		}
	}
	
	//新建菜单
	public function create_menu() {
		$r_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".self::AppId."&secret=".self::AppSecret;
		$token_info = rcurl($r_url, '', 'get');
		$token_info = json_decode($token_info, true);
		echo 1;
		var_export($token_info['access_token']);
		echo 2;
		$r_url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=".$token_info['access_token'];
		$paras = $this->weixin->create_menu();
		echo 3;
	    $body  = urldecode(json_encode($paras));
	    var_export($body);
	    
	    $menu = rcurl($r_url, $body, 'post');
	    var_export($menu);
	}
	
	//删除菜单
	public function remove_menu() {
		$r_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".self::AppId."&secret=".self::AppSecret;
		$token_info = rcurl($r_url, '', 'get');
		$token_info = json_decode($token_info, true);
		echo 1;
		var_export($token_info['access_token']);
		echo 2;
		$r_url = "https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=".$token_info['access_token'];		 
		$res = rcurl($r_url, '', 'get');
		var_export($res);
	}
	
	public function pop_weixin($type) {
		$ids = $this->input->get_post('ids');
		//TYPE_ACTIVITY = 1, TYPE_VIDEO = 2, TYPE_PIC = 3, TYPE_PART = 4, TYPE_TEAM = 5, TYPE_VOTE = 6, TYPE_MEMBER = 7, TYPE_ALBUM = 8; 
		if(!empty($ids)) {
			$ids_arr = explode(",", $ids);
			$ids = '';
			foreach($ids_arr as $m) {
				if(!empty($m) && is_numeric($m)) {
					if($ids == '') {
						$ids = $m;
					}else {
						$ids .= ','.$m;
					}
				}
			}
			$data = array();
			switch($type) {
				case 1:
					   $this->load->model('game_model', 'game_m');
					   $where = " where id in($ids) and status = 2 ";
			           $activity_list = $this->game_m->get_games($where,1, 5);
			           if(!empty($activity_list)) {
			           	    foreach($activity_list as $v) {
			           	    	$data[] = array("title"=>urlencode($v['longtitle']),
				                                "author"=>urlencode($v['undertake']),
                                                "content"=>urlencode($v['introduction']),
                                                "url"=>$this->config->item("base_url")."/look/".$v['path']."/".$v['id'],
                                                "picurl"=>"/public/data/images/activity/".$v['image']
				          		                );
			           	    }
			           }
					   break;//赛事
				case 2:
					   $this->load->model('video_mod', 'video_m');
					   $where = " where v.id in($ids) and v.status = 3 ";
			           $video_list = $this->video_m->getDataAll($where,1, 5);
			           if(!empty($video_list)) {
			               foreach($video_list as $v) {
			               	    $params = array('id'=>$v['id']);
			               	    if(isset($v['path']))
			               		    $params['path']=$v['path'];
			               	
			           		   $data[] = array("title"=>urlencode($v['title']),
			           			   	   "author"=>urlencode($v['username']),
			           				   "content"=>urlencode($v['description']),
			           				   "url"=>$this->config->item("base_url").build_uri('video',$params),
			           				   "picurl"=>"/public/data/images/video/".$v['pic_path']."/1.jpg"
			           		   );
			           	   }
			           }
			           break;//视频
				case 3:
			           break;//图片
				case 7:
			           break;//会员
				case 8:
					   $this->load->model('album_model', 'album_m');
					   $this->load->model('space/member_db', 'member_m');
					   $where = " where album_id in($ids) and status = 1 ";
			           $album_list = $this->album_m->getlist($where,1, 5);
			           if(!empty($album_list)) {
			           	   foreach($album_list as $v) {
			           	   	   $params = array('wd'=>1);
			           	       if(isset($v['path']))
			           	   		   $params['path'] =$v['path'];
			           	   	   $params['album_id'] = $v['album_id'];
			           	   	
			           	   	   $username = $this->member_m->get_username($v['uid']);
			           		   $data[] = array("title"=>urlencode($v['name']),
			           				   "author"=>urlencode($username),
			           				   "content"=>urlencode($v['desc']),
			           				   "url"=>$this->config->item('base_url').build_uri('album',$params),
			           				   "picurl"=>"/public/data/images/photo/".$v['pic_name']
			           		   );
			              	}
			           }
			           break;//专辑
			}
		}

		//推送
		if(!empty($data)) {
			$this->push_weixin($data);
		}else {
			return -1;
		}
	}
	
	/*
	 * 推送类型仅仅是图文类（如，赛事活动、图集、视频缩略图）
	 */
	public function push_weixin($init_data_list = '', $group_id = "100") {
		$r_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx30c0b02e1cb58e22&secret=4da3c85d19cecba3330ad9aca138b5af";
		$token_info = rcurl($r_url, '', 'get');
		$token_info = json_decode($token_info, true);
		
		/*
		$init_data_list = array(
				               array("title"=>urlencode("视频：忽然之间-莫文蔚"),
				               		 "author"=>urlencode("马晓娟"),
                                     "content"=>urlencode("哈哈第一次进录音棚录制了一首很喜欢的歌：忽然之间。希望大家喜欢~"),
                                     "url"=>"http://www.saiku.com.cn/v/sing/eDn.html",
                                     "picurl"=>"/public/data/images/video/20140701/825/1.jpg")
				               );
	    */
		
		//上传多媒体文件
		$type = "image";
		$url = "http://file.api.weixin.qq.com/cgi-bin/media/upload?access_token=".$token_info['access_token']."&type=$type";
		foreach($init_data_list as $k=>$data) {			
			$filepath = $data['picurl'];
			
			$post_data = array(
					"media"=>"@".FCPATH.$filepath
			);
			
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt($ch, CURLOPT_URL,$url);
			curl_setopt($ch, CURLOPT_POSTFIELDS,$post_data);
			ob_start();
			curl_exec($ch);
			$result = ob_get_contents() ;
			ob_end_clean();				
			$res = json_decode($result, true);			
			$init_data_list[$k]['media_id'] = $res['media_id'];
		}

		//上传图文素材
		$url = "https://api.weixin.qq.com/cgi-bin/media/uploadnews?access_token=".$token_info['access_token'];
		
		$post_arr = array();
		foreach($init_data_list as $data) {
			$post_arr[] = array("thumb_media_id"=>$data['media_id'],
                                                  "author"=>$data['author'],
			                                      "title"=>$data['title'],
			                                      "content_source_url"=>$data['url'],
			                                      "content"=>$data['content'],//内容文本
			                                      "digest"=>$data['content'],//描述
                                                  "show_cover_pic"=>1);//是否作为封面
		}
		
		$post_data = array('articles'=>$post_arr);
		$json_data = json_encode($post_data);
		
		$body  = urldecode($json_data);
		$res = rcurl($url, $body, 'post');
		$res = json_decode($res, true);		

		//群发
		$user_list = array();//用户列表
		
		$url = "https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=".$token_info['access_token'];
		/*
		$url = "https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token=".$token_info['access_token'];
		$post_arr = array('touser'=>$user_list,
				          'mpnews'=>array("mpnews"=>$res['media_id']),
				          'msgtype'=>'mpnews');		
	    */
		$json_data = '';
		$post_arr = array();
		$post_arr = array('filter'=>array('group_id'=>$group_id),
				          'mpnews'=>array('media_id'=>$res['media_id']),
				          'msgtype'=>'mpnews');
		$json_data = json_encode($post_arr);		
		$body  = urldecode($json_data);
		$res = rcurl($url, $body, 'post');
			
		var_export($res);		
	}
	
	//响应消息
	public function responseMsg() {	
		if(!empty($this->weixin->msg)) {
			$type = $this->weixin->msgtype;//消息类型
			$username = $this->weixin->msg->FromUserName;//哪个用户给你发的消息,这个$username是微信加密之后的，但是每个用户都是一一对应的
			//消息类型分离
			switch ($type) {
				case "event":
					$result = $this->receiveEvent($this->weixin->msg);
					break;
				case "text":
					$result = $this->receiveText($this->weixin->msg);
					break;
				case "image":
					$result = $this->receiveImage($this->weixin->msg);
					break;
				case "location":
					$result = $this->receiveLocation($this->weixin->msg);
					break;
				case "voice":
					$result = $this->receiveVoice($this->weixin->msg);
					break;
				case "video":
					$result = $this->receiveVideo($this->weixin->msg);
					break;
				case "link":
					$result = $this->receiveLink($this->weixin->msg);
					break;
				default:
					$result = "unknown msg type: ".$type;
					break;
			}
		}else {
			$result = "empty msg";
		}		
		echo $result;
	}
	
	//接收事件消息
	private function receiveEvent($object) {
		$content = "";
		switch ($object->Event)
		{
			case "subscribe"://订阅
				$content = "你好,欢迎关注赛酷网[saikuwang] ";
				$content .= (!empty($object->EventKey))?("\n来自二维码场景 ".str_replace("qrscene_","",$object->EventKey)):"";
				break;
			case "unsubscribe"://取消订阅
				$content = "取消订阅";
				break;
			case "SCAN":
				$content = "扫描场景 ".$object->EventKey;
				break;
			case "CLICK":
				switch ($object->EventKey)
				{
					case "COMPANY":
						$content = "赛酷网提供互联网相关产品与服务。";
						break;
					case "WORKS_VIDEO_NEW"://$content = "赛酷网将提供最新的视频。";
						$this->load->model("works_index_model", "works_index_m");
						$where = " where i.status = 1 ";
						$works_list = $this->works_index_m->get_works($where,1,5,' v.adddate DESC ');
						if($works_list) {
							foreach($works_list as $v) {
								$params = array('id'=>$v['id']);
								if(isset($v['path']))
									$params['path']=$v['path'];
								
								$img_params = array('pic_name'=>'1.jpg','pic_path'=>$v['pic_path'],'w'=>220,'h'=>150); 								
								$content[] = array("Title"=>$v['title'],
										           "Description"=>$v['description'],
										           "PicUrl"=>img_url_path('video',$img_params),
										           "Url" =>$this->config->item("base_url").build_uri('video',$params));
							}
						}						
						break;
					case "WORKS_VIDEO_HOT"://$content = "赛酷网将提供最热的视频。";
						$content = array();
						$this->load->model("works_index_model", "works_index_m");
						$where = " where i.status = 1 ";
						$works_list = $this->works_index_m->get_works($where,1,5,' i.vote DESC ');
						
						if($works_list) {
							foreach($works_list as $v) {
								$params = array('id'=>$v['id']);
								if(isset($v['path']))
									$params['path']=$v['path'];
								
								$img_params = array('pic_name'=>'1.jpg','pic_path'=>$v['pic_path'],'w'=>220,'h'=>150);
								$content[] = array("Title"=>$v['title'],
										           "Description"=>$v['description'],
										           "PicUrl"=>img_url_path('video',$img_params),
										           "Url" =>$this->config->item("base_url").build_uri('video',$params));
							}
						}						
						break;
					case "ACTIVITY_PASS"://$content = "赛酷网提供往期的活动。";
						$content = array();
						$this->load->model('game_model','game_m');
						$where = "WHERE  status = '2'";					
						$order = ' id desc ';
						$game = $this->game_m->get_games($where,1,5,$order); 
						if($game) {
							foreach($game as $g) {
								$img_params = array('pic_name'=>$g['logo'],'w'=>510,'h'=>230);
								
								$content[] = array("Title"=>$g['longtitle'],
						                           "Description"=>mb_substr(strip_tags($g['introduction']), 0, 56),
						                           "PicUrl"=>img_url_path('activity',$img_params),
						                           "Url" =>$this->config->item("base_url")."/look/".$g['path']."/".$g['id']);
							}
						}	
						break;
					case "VIDEO_BEST"://$content = "视频推荐。";		
						$content = array();
				        $this->load->model('recommend_model','recommend_m');
						$video_list = $this->recommend_m->get(8, 1, 5);
						
						if($video_list) {
							foreach($video_list as $v) {
								$params = array('id'=>$v['id']);
								if(isset($v['path']))
									$params['path']=$v['path'];
								
								$pic_url = '';
								if(isset($v['recom_pic'])) {
									$pic_url = $v['recom_pic'];
								}else {
									$pic_url = $this->config->item("img1_url")."/images/video".$v['pic_path']. "1,h_150,w_220.jpg";
								}
								$content[] = array("Title"=>$v['title'],
										"Description"=>$v['description'],
										"PicUrl"=>$pic_url,
										"Url" =>$this->config->item("base_url").build_uri('video',$params));
							}
						}
						break;
					case "ALBUM_BEST"://$content = "图集推荐。";						
						$this->load->model('recommend_model','recommend_m');
						$album_list = $this->recommend_m->get(15, 1, 5);
						$content = array();
						foreach($album_list as $k=>$v) {
							$row = array();
							if($v['best_type'] == Recommend_model::TYPE_ALBUM) {
								$row['title']   = $v['name'];
								if(!empty($v['recom_pic'])) {
									$row['pic_src'] = $v['recom_pic'];
								}else {
									$row['pic_src'] = img_url_path('photo', array('pic_name'=>$v['pic_name'], 'w'=>350, 'h'=>240));;
								}
								 
								$params = array('album_id'=>$v['album_id'],'wd'=>1);
								$row['url']     = $this->config->item('base_url').build_uri('album',$params);
								
								$content[] = array("Title"=>$v['name'],
										           "Description"=>$v['description'],
										           "PicUrl"=>$row['pic_src'],
									               "Url" =>$row['url']);
							}
						}
						break;
					case "MEMBER_BEST"://$content = "达人推荐。";
							$this->load->model('recommend_model','recommend_m');
							$this->load->helper('function_helper');
							$member_list = $this->recommend_m->get(11, 1, 5);
							$content = array();
							foreach($member_list as $k=>$v) {										        
								if($v['type'] == 1) {						
									$content[] = array("Title"=>$v['team']['name'],
											"Description"=>$v['team']['name'],
											"PicUrl"=>$this->config->item('img3_url').avatar($v['uid']),
											"Url" =>$this->config->item('q_url')."/t/".$v['team']['tid']);
								}else {
									$content[] = array("Title"=>$v['username'],
											"Description"=>$v['username'],
											"PicUrl"=>$this->config->item('img3_url').avatar($v['uid']),
											"Url" =>$this->config->item('q_url')."/u/".$v['uid']);
								}
							}
							break;
					default:
						$content = "点击菜单：".$object->EventKey;
						break;
				}
				break;
			case "LOCATION":
				$content = "上传位置：纬度 ".$object->Latitude.";经度 ".$object->Longitude;
				break;
			case "VIEW":
				$content = "跳转链接 ".$object->EventKey;
				break;
			case "MASSSENDJOBFINISH":
				$content = "消息ID：".$object->MsgID."，结果：".$object->Status."，粉丝数：".$object->TotalCount."，过滤：".$object->FilterCount."，发送成功：".$object->SentCount."，发送失败：".$object->ErrorCount;
				break;
			default:
				$content = "receive a new event: ".$object->Event;
				break;
		}
		if(is_array($content)){
			if (isset($content[0]['PicUrl'])){
				$result = $this->transmitNews($object, $content);
			}else if (isset($content['MusicUrl'])){
				$result = $this->transmitMusic($object, $content);
			}
		}else{
			$result = $this->transmitText($object, $content);
		}
		return $result;
	}
	
	//接收文本消息
	private function receiveText($object) {
		$keyword = trim($object->Content);
		//多客服人工回复模式
		if (strstr($keyword, "您好") || strstr($keyword, "你好") || strstr($keyword, "在吗")){
		//	$result = $this->transmitService($object);
			$content = $this->get_rebot($keyword);
			$content = $content." [跟我说话的时候，请加上 @赛酷 ]";
		}
		//自动回复模式
		else{
			if (strstr($keyword, "@赛酷")){
				//接入机器人
				$keyword = str_replace("@赛酷", "", $keyword);
				$content = $this->get_rebot($keyword);	
			}else if (strstr($keyword, "多图文")){
				$content = array();			
				$content[] = array("Title"=>"视频：门里门外", 
						           "Description"=>"常言道：家家有本难念的经", 
						           "PicUrl"=>"http://img1.saiku.com.cn/static/images/recommend/20140707093925_764.jpg", 
						           "Url" =>"http://www.saiku.com.cn/v/Ja3.html");
				$content[] = array("Title"=>"视频：《寻梅》", 
						           "Description"=>"梅飘香，雪皑皑，寻香觅花花未开，伫立风中默等待", 
						           "PicUrl"=>"http://img1.saiku.com.cn/static/images/recommend/20140707094122_926.jpg", 
						           "Url" =>"http://www.saiku.com.cn/v/nqa.html");
				$content[] = array("Title"=>"忽然之间-莫文蔚- 天梯：赛酷'唱'响未来歌唱大赛",
						           "Description"=>"哈哈第一次进录音棚录制了一首很喜欢的歌：忽然之间。希望大家喜欢~",
						           "PicUrl"=>"http://img1.saiku.com.cn/thumb/d/images/video/20140701/825/1,h_150,w_220.jpg",
					               "Url" =>"http://www.saiku.com.cn/v/sing/eDn.html");
			}else if (strstr($keyword, "图文") || strstr($keyword, "单图文")){
				$content = array();
				$content[] = array("Title"=>"忽然之间-莫文蔚- 天梯：赛酷'唱'响未来歌唱大赛 ",  
						           "Description"=>"哈哈第一次进录音棚录制了一首很喜欢的歌：忽然之间。希望大家喜欢~", 
						           "PicUrl"=>"http://img1.saiku.com.cn/thumb/d/images/video/20140701/825/1,h_150,w_220.jpg", 
						           "Url" =>"http://www.saiku.com.cn/v/sing/eDn.html");
			}else{
				//作品搜索				
			    $this->load->helper('sphinxapi_helper');
				$cl = new SphinxClient();
				
				$cl->SetServer( SPHINX_HOST, SPHINX_PORT );
				$cl->SetMatchMode(SPH_MATCH_BOOLEAN);#设置全文检索模式
				
				$word = $keyword;#关键词
				$result = array();	
				
				$cl->SetFilter('is_del',array(0));#false允许true拒绝					
				$cl->SetFilter('type',array(1));
				$cl->SetFilterRange( 'addtime', $min=0, time(), $exclude=false );
				$cl->SetLimits(0,5,100);				
				$ret = $cl->Query( "@(title,description) $word ", "works_index");

				$content = array();
				if($ret['total']) {	
					$this->load->model('video_mod');
					
				    $idarr = array();
					foreach($ret['matches'] as $id=>$info) {
						array_push($idarr,$info['attrs']['wid']);
				    }				    
				    $ids = implode("','",$idarr);
				    $where = " WHERE v.id in ('$ids')";
				    $video = $this->video_mod->getDataAll($where,0,5,' v.`adddate` desc ');
				    if(!empty($video)) {
				    	foreach($video as $v) {
				    		$params = array('id'=>$v['id']);
				    		if(isset($v['path']))
				    			$params['path']=$v['path'];
				    		
				    		$img_params = array('pic_name'=>'1.jpg','pic_path'=>$v['pic_path'],'w'=>220,'h'=>150);
				    		$content[] = array("Title"=>$v['title'].".".$v['longtitle'],
				    				           "Description"=>$v['description'],
				    				           "PicUrl"=>img_url_path('video',$img_params),
				    				           "Url" =>$this->config->item("base_url").build_uri('video',$params));
				    	}
				    }				    
				}
			}
			 
			if(is_array($content)){
				if (isset($content[0]['PicUrl'])){
					$result = $this->transmitNews($object, $content);
				}else if (isset($content['MusicUrl'])){
					$result = $this->transmitMusic($object, $content);
				}
			}else{
				$result = $this->transmitText($object, $content);
			}
		}
	
		return $result;
	}
	
	//接收图片消息
	private function receiveImage($object) {
		$content = array("MediaId"=>$object->MediaId);
		$result = $this->transmitImage($object, $content);
		return $result;
	}
	
	//接收位置消息
	private function receiveLocation($object) {
		$content = "你发送的是位置，纬度为：".$object->Location_X."；经度为：".$object->Location_Y."；缩放级别为：".$object->Scale."；位置为：".$object->Label;
		$result = $this->transmitText($object, $content);
		return $result;
	}
	
	//接收语音消息
	private function receiveVoice($object) {
		if (isset($object->Recognition) && !empty($object->Recognition)){
			$content = "你刚才说的是：".$object->Recognition;
			$result = $this->transmitText($object, $content);
		}else{
			$content = array("MediaId"=>$object->MediaId);
			$result = $this->transmitVoice($object, $content);
		}
	
		return $result;
	}
	
	//接收视频消息
	private function receiveVideo($object) {
		$content = array("MediaId"=>$object->MediaId, "ThumbMediaId"=>$object->ThumbMediaId, "Title"=>"", "Description"=>"");
		$result = $this->transmitVideo($object, $content);
		return $result;
	}
	
	//接收链接消息
	private function receiveLink($object) {
		$content = "你发送的是链接，标题为：".$object->Title."；内容为：".$object->Description."；链接地址为：".$object->Url;
		$result = $this->transmitText($object, $content);
		return $result;
	}
	
	//回复文本消息
	private function transmitText($object, $content) {
		$xmlTpl = "<xml>".
				  "<ToUserName><![CDATA[%s]]></ToUserName>".
				  "<FromUserName><![CDATA[%s]]></FromUserName>".
				  "<CreateTime>%s</CreateTime>".
				  "<MsgType><![CDATA[text]]></MsgType>".
				  "<Content><![CDATA[%s]]></Content>".
				  "</xml>";
		$result = sprintf($xmlTpl, $object->FromUserName, $object->ToUserName, time(), $content);
		return $result;
	}
	
	//回复图片消息
	private function transmitImage($object, $imageArray) {
		$itemTpl = "<Image>".
                   "<MediaId><![CDATA[%s]]></MediaId>".
                   "</Image>";
	
		$item_str = sprintf($itemTpl, $imageArray['MediaId']);
	
		$xmlTpl = "<xml>".
		           "<ToUserName><![CDATA[%s]]></ToUserName>".
		           "<FromUserName><![CDATA[%s]]></FromUserName>".
		           "<CreateTime>%s</CreateTime>".
		           "<MsgType><![CDATA[image]]></MsgType>".
		           $item_str.
		           "</xml>";
	
		$result = sprintf($xmlTpl, $object->FromUserName, $object->ToUserName, time());
		return $result;
	}
	
	//回复语音消息
	private function transmitVoice($object, $voiceArray) {
		$itemTpl = "<Voice>".
	               "<MediaId><![CDATA[%s]]></MediaId>".
                   "</Voice>";
	
        $item_str = sprintf($itemTpl, $voiceArray['MediaId']);	
	    $xmlTpl = "<xml>".
                   "<ToUserName><![CDATA[%s]]></ToUserName>".
	               "<FromUserName><![CDATA[%s]]></FromUserName>".
	               "<CreateTime>%s</CreateTime>".
	               "<MsgType><![CDATA[voice]]></MsgType>".
	               $item_str.
	               "</xml>";
	
	    $result = sprintf($xmlTpl, $object->FromUserName, $object->ToUserName, time());
	    return $result;
	}
	
	//回复视频消息
	private function transmitVideo($object, $videoArray) {
	    $itemTpl = "<Video>".
	                "<MediaId><![CDATA[%s]]></MediaId>".
	                "<ThumbMediaId><![CDATA[%s]]></ThumbMediaId>".
                    "<Title><![CDATA[%s]]></Title>".
                    "<Description><![CDATA[%s]]></Description>".
                    "</Video>";
	
        $item_str = sprintf($itemTpl, $videoArray['MediaId'], $videoArray['ThumbMediaId'], $videoArray['Title'], $videoArray['Description']);
	
	    $xmlTpl = "<xml>".
                   "<ToUserName><![CDATA[%s]]></ToUserName>".
	               "<FromUserName><![CDATA[%s]]></FromUserName>".
	               "<CreateTime>%s</CreateTime>".
	               "<MsgType><![CDATA[video]]></MsgType>".
	               $item_str.
	               "</xml>";
	
	    $result = sprintf($xmlTpl, $object->FromUserName, $object->ToUserName, time());
	    return $result;
	}
	
	//回复图文消息
	private function transmitNews($object, $newsArray) {
	    if(!is_array($newsArray)){
	        return;
	    }
	    $itemTpl = "<item>".
	                "<Title><![CDATA[%s]]></Title>".
	                "<Description><![CDATA[%s]]></Description>".
	                "<PicUrl><![CDATA[%s]]></PicUrl>".
		            "<Url><![CDATA[%s]]></Url>".
		            "</item>";
        $item_str = "";
        foreach ($newsArray as $item){
            $item_str .= sprintf($itemTpl, $item['Title'], $item['Description'], $item['PicUrl'], $item['Url']);
        }
		$xmlTpl = "<xml>".
		           "<ToUserName><![CDATA[%s]]></ToUserName>".
		           "<FromUserName><![CDATA[%s]]></FromUserName>".
		           "<CreateTime>%s</CreateTime>".
                   "<MsgType><![CDATA[news]]></MsgType>".
                   "<ArticleCount>%s</ArticleCount>".
	               "<Articles>$item_str</Articles>".
	               "</xml>";
	    $result = sprintf($xmlTpl, $object->FromUserName, $object->ToUserName, time(), count($newsArray));
	    return $result;
	}
	
	//回复音乐消息
	private function transmitMusic($object, $musicArray) {
	    $itemTpl = "<Music>".
	                "<Title><![CDATA[%s]]></Title>".
	                "<Description><![CDATA[%s]]></Description>".
	                "<MusicUrl><![CDATA[%s]]></MusicUrl>".
	                "<HQMusicUrl><![CDATA[%s]]></HQMusicUrl>".
	                "</Music>";
	
	    $item_str = sprintf($itemTpl, $musicArray['Title'], $musicArray['Description'], $musicArray['MusicUrl'], $musicArray['HQMusicUrl']);
	
        $xmlTpl = "<xml>".
                   "<ToUserName><![CDATA[%s]]></ToUserName>".
                   "<FromUserName><![CDATA[%s]]></FromUserName>".
                   "<CreateTime>%s</CreateTime>".
	               "<MsgType><![CDATA[music]]></MsgType>".
	               $item_str.
	               "</xml>";
	
		$result = sprintf($xmlTpl, $object->FromUserName, $object->ToUserName, time());
		return $result;
	}
	
	//回复多客服消息
	private function transmitService($object) {
	    $xmlTpl = "<xml>".
	              "<ToUserName><![CDATA[%s]]></ToUserName>".
	               "<FromUserName><![CDATA[%s]]></FromUserName>".
	               "<CreateTime>%s</CreateTime>".
	               "<MsgType><![CDATA[transfer_customer_service]]></MsgType>".
	               "</xml>";
	    $result = sprintf($xmlTpl, $object->FromUserName, $object->ToUserName, time());
	    return $result;
	}
	
	
	//日志记录
	private function logger($log_content) {
		if(isset($_SERVER['HTTP_APPNAME'])){   //SAE
			sae_set_display_errors(false);
			sae_debug($log_content);
			sae_set_display_errors(true);
		}else if($_SERVER['REMOTE_ADDR'] != "127.0.0.1"){ //LOCAL
			$max_size = 10000;
			$log_filename = "log.xml";
			if(file_exists($log_filename) and (abs(filesize($log_filename)) > $max_size)){unlink($log_filename);}
			file_put_contents($log_filename, date('H:i:s')." ".$log_content."\r\n", FILE_APPEND);
		}
	}
	
	private function get_rebot($word) {
		$appkey = "4374c255d2a9bc4b336c4e040a741465";
		$reply = "";
		if(!empty($word)) {
			$r_url = "http://dev.skjqr.com/api/weixin.php?email=164559653@qq.com&appkey=".$appkey."&msg=".$word;
			$reply = rcurl($r_url, '', 'get');
		}
		$regex = "/\[msg\](.*)\[\/msg\]/i";
		if(preg_match($regex, $reply, $matches)){
			if(isset($matches[1])) {
				return $matches[1];
			}
		}
		return "";
	}
}
?>