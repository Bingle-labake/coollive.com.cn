<?php

class Pages_lib {
	public function __construct(){
	}
	
	//公共
	public function my_pages($url, $count,$page=1, $pageSize=10) {
		$paras = array_filter($_REQUEST);
		$paras = array_merge($paras, $_GET);
		
		$lastPage = ceil($count/$pageSize); 				  		
		$pages['curr_page'] = $page;
		$pages['last_page'] = $lastPage;
		$pages['page_size']  = $pageSize;	
		$pages['curr_url']   = "";		
		$pages['count'] = $count; 
		
		$pages['curr_url'] = $this->build_url($url, $paras, array("page"=>$page)); 
		
		if($page-1 >0) {
			$pages['prev']  = $this->build_url($url, $paras, array("page"=>($page-1))); 
		}else {
			$pages['prev']  = "#"; 
		}
		
		if($page+1 <=$lastPage) {
			$pages['next']  = $this->build_url($url, $paras, array("page"=>($page+1))); 
		}else {
			$pages['next']  = "#"; 
		}
		
		$pages['first'] = $this->build_url($url, $paras, array("page"=>1)); 
		$pages['last']  = $this->build_url($url, $paras, array("page"=>$lastPage));
		
		return $pages;
	}
	
	public function build_url($url,$paras, $curr_para = array()) {
		$para_str = "";
		if(!empty($curr_para)) {
			$paras = array_merge($paras, $curr_para);
		}	
		foreach($paras as $k=>$p) {
			if(is_array($p)) {
				foreach($p as $v) {
					if($para_str == "") {
						$para_str = $k."[]=".$v;
					}else {
						$para_str .= "&".$k."[]=".$v;
					}
				}
			}else {
				if($para_str == "") {
					$para_str = $k."=".$p;
				}else {
					$para_str .= "&".$k."=".$p;
				}	
			}			
		}
		
		if(stripos($url,"?") === false) {
			return $url."?".$para_str;
		}else {
			return $url."&".$para_str;
		}
	}
	
	
	public function front_page($url, $curr_page, $count, $pageSize = 10, $sagment =2) {
		$count_page = ceil($count/$pageSize);
		
		$min_page = $curr_page - $sagment;
		$max_page = $curr_page + $sagment;
		$prev_point = "";
		$next_point = "";
		if($min_page>1) {
			$prev_point = '<a title="" href="'.$this->url_append_paras($url, "page", 1).'" >1</a>...';
		}
		if($max_page<$count_page) {
			$next_point = '...<a title="" href="'.$this->url_append_paras($url, "page", $count_page).'" >'.$count_page.'</a>';
		}
		
		if($min_page<=0) {
			$max_page = $max_page-$min_page+1;
			$min_page = 1;			
		}
		if($max_page>$count_page) {
			$max_page = $count_page;
		}
		if($curr_page<=1) {
			$curr_page = 1;
		}
		$html = $prev_point;		
		for($i=$min_page;$i<=$max_page;$i++) {
			if($i == $curr_page) {
				$html .= '<a title="" href="'.$this->url_append_paras($url, "page", $i).'" class="on" >'.$i.'</a>';
			}else {
				$html .= '<a title="" href="'.$this->url_append_paras($url, "page", $i).'" >'.$i.'</a>';
			}
		}	
		$html .= $next_point."<span >共".$count_page."页</span>";
		return $html;
	}
	
	public function front_page_ex($url, $curr_page, $count, $pageSize = 10, $sagment =2) {
		$count_page = ceil($count/$pageSize);
		
		$min_page = $curr_page - $sagment;
		$max_page = $curr_page + $sagment;
		
		if($curr_page<=1) {
			$curr_page = 1;
		}
		$html = "";		
		if($min_page>1 && $max_page<$count_page) {
			$html .= '<a title="" href="'.$this->url_append_paras($url, "page", 1).'" >1</a>...';
			for($i=$min_page;$i<=$max_page;$i++) {
				if($i == $curr_page) {
					$html .= '<a title="" href="'.$this->url_append_paras($url, "page", $i).'" class="on" >'.$i.'</a>';
				}else {
					$html .= '<a title="" href="'.$this->url_append_paras($url, "page", $i).'" >'.$i.'</a>';
				}
			}
			$html .= '...<a title="" href="'.$this->url_append_paras($url, "page", $count_page).'" >'.$count_page.'</a>';
		}else {
			if($min_page<=1) {
				if($max_page>=$count_page) {
					for($i=1;$i<=$count_page; $i++) {
						if($curr_page == $i) {
							$html .= '<a title="" href="'.$this->url_append_paras($url, "page", $i).'" class="on" >'.$i.'</a>';
						}else {
							$html .= '<a title="" href="'.$this->url_append_paras($url, "page", $i).'" >'.$i.'</a>';				    
						}						
					}
				}else {
					for($i=1;$i<=($max_page-$min_page); $i++) {
						if($curr_page == $i) {
							$html .= '<a title="" href="'.$this->url_append_paras($url, "page", $i).'" class="on" >'.$i.'</a>';
						}else {
							$html .= '<a title="" href="'.$this->url_append_paras($url, "page", $i).'" >'.$i.'</a>';				    
						}						
					}
					$html .= '...<a title="" href="'.$this->url_append_paras($url, "page", $count_page).'" >'.$count_page.'</a>';
				}
			}else {
				if($max_page>=$count_page) {
					$html .= '<a title="" href="'.$this->url_append_paras($url, "page", 1).'" >1</a>...';
					for($i=$min_page;$i<=$count_page; $i++) {
						if($curr_page == $i) {
							$html .= '<a title="" href="'.$this->url_append_paras($url, "page", $i).'" class="on" >'.$i.'</a>';
						}else {
							$html .= '<a title="" href="'.$this->url_append_paras($url, "page", $i).'" >'.$i.'</a>';				    
						}						
					}
				}
			}
		}		
		$html .= "<span >共".$count_page."页</span>";
		return $html;
	}
	
	private function url_append_paras($url, $pname, $pvalue) {
		if(empty($pname)) {
		    return $url;	
		}else {
			if(stripos($url, "?") === false) {
				$url .= "?";
			}			
			if(stripos($url, "=") === false) {
				$url .= $pname."=".$pvalue;
			}else {
				$url .= "&".$pname."=".$pvalue;
			}
			return $url;	
		}			
	}
	
	/**
	 *	前台商品 库 专用分页 (如要用, 加上你的名字, 如要修改, 联系我)
	 *	user luyanming
	 *	@param int count 数据总数
	 *	@param int curr_page 当前页
	 *	@param pageSize 每页多少数据
	 *	@param sagment int 分页显示多少个按钮, 我这里因为要用ajax方式, 所以都是按钮, 触发js事件用
	 *	
	 *	return string html
	 * */
	public function goods_get_page($count, $curr_page, $pageSize = 10, $sagment =2) {
		
		$count_page = ceil($count/$pageSize);
	
        if($count_page < 2){
            $html = '';
        }else{
            $min_page = $curr_page - $sagment;
    		$max_page = $curr_page + $sagment;
    
    		if($curr_page<=1) {
    			$curr_page = 1;
    		}
    		
    		$html = '<a title="" href="javascript:void(0);" class="foword" onclick="page_prev();" >上一页</a><span id="page_list">';
    		
    		//如果最小页大于1, 最大页小于总页数, 就是居中的情况
    		if($min_page>1 && $max_page<$count_page) {
    
    			for($i=$min_page;$i<=$max_page;$i++) {
    				if($i == $curr_page) {
    					$html .= '<a title="" href="javascript:void(0);" onclick="page_show('.$i.');" class="on" >'.$i.'</a>';
    				}else {
    					$html .= '<a title="" href="javascript:void(0);" onclick="page_show('.$i.');" >'.$i.'</a>';
    				}
    			}
    			
    		//最小页数小于1, 或者,  最大页数 大于 总页数		
    		}else {
    			//最小页数小于1
    			if($min_page<=1) {
    				//最大页数大于总页数
    				if($max_page>=$count_page) {	//页数很少的情况
    					
    					for($i=1;$i<=$count_page; $i++) {
    						if($curr_page == $i) {
    							$html .= '<a title="" href="javascript:void(0);" onclick="page_show('.$i.');" class="on" >'.$i.'</a>';
    						}else {
    							$html .= '<a title="" href="javascript:void(0);" onclick="page_show('.$i.');" >'.$i.'</a>';
    						}
    					}
    				//最大页数小于总页数
    				}else {
    					for($i=1;$i<=($max_page-$min_page); $i++) {
    						if($curr_page == $i) {
    							$html .= '<a title="" href="javascript:void(0);" onclick="page_show('.$i.');" class="on" >'.$i.'</a>';
    						}else {
    							$html .= '<a title="" href="javascript:void(0);" onclick="page_show('.$i.');" >'.$i.'</a>';
    						}
    					}
    					
    				}
    			}else {
    				if($max_page>=$count_page) {
    					for($i=$min_page;$i<=$count_page; $i++) {
    						if($curr_page == $i) {
    							$html .= '<a title="" href="javascript:void(0);" onclick="page_show('.$i.');" class="on" >'.$i.'</a>';
    						}else {
    							$html .= '<a title="" href="javascript:void(0);" onclick="page_show('.$i.');" >'.$i.'</a>';
    						}
    					}
    				}
    			}
    		}
    		
    		$html .= '</span><a title="" href="javascript:void(0);" class="foword" onclick="page_next();">下一页</a>';
    		$html .= '<span >共<label id="count_page" >'.$count_page.'</label>页</span>';
    		$html .= '到第<input type="text" class="input" id="page_curret" />页<input type="image" src="/public/assets/default/images/anniu_sure_sm.jpg" class="anniu_sure" onclick="page_input()"/>';

        }
    				
		return $html;
	}
	
}

?>