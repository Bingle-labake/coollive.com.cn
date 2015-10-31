<?php

    /**
     * 分页 最多显示五页
     * 
     * @param mixed $total 总数
     * @param integer $page 页码
     * @param integer $size 每页数量
     * @param string $url 地址
     * @param mixed $param  GET参数
     * @return html
     */
    function _page_php($total,$page=1,$size=15,$url='',$param=array()){
        if(!$total)return false;
        if($page == 0)
            $page = 1;
        $pagenum = ceil($total/$size);
        if($pagenum < $page)
            $page = $pagenum;
        if($page > 1)
            $on_page = $page-1;
        else
            $on_page = $page;
        if($page+1 > $pagenum)
            $next_page = $pagenum;
        else
            $next_page = ($page+1);
        $returl = $url."?";
        if(isset($param['page']))
            unset($param['page']);
        if(isset($param['size']))
            unset($param['size']);
        if(!empty($param))
        {
            foreach($param as $k=>$v)
                $returl .= $k.'='.$v.'&';
        }
        $on_url = $returl.'page='.$on_page;
        $next_url = $returl.'page='.$next_page;
        $pagestr = '<style>
                    .pub-page{font:14px Arial;text-align:center;padding:20px 0 60px;clear:both;}
                    .pub-page a,.pub-page b,.pub-page i{color: black;display:inline-block;border:1px solid #DEDEDE;padding:4px 7px 0;height:18px;overflow:hidden;margin:0 5px;background:#fff;vertical-align:top}
                    .pub-page b,.pub-page a:hover{color: black;background:#FFB018;color:#FFF;text-decoration:none}
                    .pub-page i{color: black;padding-right:0;padding-left:0;border:0;background:none}
                    </style>';
        $pagestr .= '<div class="pub-page">';
        
        if($page == 1)
        {
            $pagestr .= '<b>首页</b>';       
        }
        else
        {
            $pagestr .= '<a href="'.$returl.'page=1" class="prev">首页</a>'; 
            $pagestr .= '<a href="'.$on_url.'" class="prev">上一页</a>';
        }
        if($pagenum<=5 && $page<5)
        {
            for($i=1;$i<=$pagenum;$i++)
            {
                if($page == $i)
                    $pagestr .= '<b>'.$i.'</b>';
                else
                    $pagestr .= '<a title="" href="'.$returl.'page='.$i.'" >'.$i.'</a>';
            }
        }
        else
        {
            if($page+3 >$pagenum)
            {
                for($i=$pagenum-4 ;$i<=$pagenum;$i++)
                {
                    if($page == $i)
                        $pagestr .= '<b>'.$i.'</b>';
                    else
                        $pagestr .= '<a href="'.$returl.'page='.$i.'">'.$i.'</a>';
                }
            }
            else
            {
                $start = $page <= 2?1:$page-2;
                for($i=$start;$i<=$start+4;$i++)
                {
                    if($page == $i)
                        $pagestr .= '<b>'.$i.'</b>';
                    else
                        $pagestr .= '<a href="'.$returl.'page='.$i.'">'.$i.'</a>';
                }
            }
        }
        if($pagenum == $page)
        {
            $pagestr .= '<b>末页</b>';
        }
        else
        {
            $pagestr .= '<a href="'.$next_url.'" class="next">下一页</a>';
            $pagestr .= '<a href="'.$returl.'page='.$pagenum.'" class="prev">末页</a>';
        }
        
        $pagestr .= '</div>';
        
        return $pagestr;
    }
    /**
     * 分页 最多显示五页
     * 
     * @param mixed $total 总数
     * @param integer $page 页码
     * @param integer $size 每页数量
     * @param string $url 地址
     * @param mixed $param  GET参数
     * @return html
     */
    function new_page_php($total,$page=1,$size=15,$url='',$param=array()){
        if(!$total)return false;
        if($page == 0)
            $page = 1;
        $pagenum = ceil($total/$size);
        if($pagenum < $page)
            $page = $pagenum;
        if($page > 1)
            $on_page = $page-1;
        else
            $on_page = $page;
        if($page+1 > $pagenum)
            $next_page = $pagenum;
        else
            $next_page = ($page+1);
        $returl = $url."?";
        if(isset($param['page']))
            unset($param['page']);
        if(isset($param['size']))
            unset($param['size']);
        if(!empty($param))
        {
            foreach($param as $k=>$v)
                $returl .= $k.'='.$v.'&';
        }
        $on_url = $returl.'page='.$on_page;
        $next_url = $returl.'page='.$next_page;
        
        $pagestr = '<div class="pub-page">';
        if($page == 1)
        {
            $pagestr .= '<b>首页</b>';       
        }
        else
        {
            $pagestr .= '<a href="'.$returl.'page=1">首页</a>'; 
            $pagestr .= '<a href="'.$on_url.'">上一页</a>';
        }
        if($pagenum<=5 && $page<5)
        {
            for($i=1;$i<=$pagenum;$i++)
            {
                if($page == $i)
                    $pagestr .= '<b>'.$i.'</b>';
                else
                    $pagestr .= '<a  href="'.$returl.'page='.$i.'" >'.$i.'</a>';
            }
        }
        else
        {
            if($page+3 >$pagenum)
            {
                for($i=$pagenum-4 ;$i<=$pagenum;$i++)
                {
                    if($page == $i)
                        $pagestr .= '<b>'.$i.'</b>';
                    else
                        $pagestr .= '<a href="'.$returl.'page='.$i.'">'.$i.'</a>';
                }
            }
            else
            {
                $start = $page <= 2?1:$page-2;
                for($i=$start;$i<=$start+4;$i++)
                {
                    if($page == $i)
                        $pagestr .= '<b>'.$i.'</b>';
                    else
                        $pagestr .= '<a href="'.$returl.'page='.$i.'">'.$i.'</a>';
                }
            }
        }
        if($pagenum == $page)
        {
            $pagestr .= '<b>末页</b>';
        }
        else
        {
            $pagestr .= '<a href="'.$next_url.'">下一页</a>';
            $pagestr .= '<a href="'.$returl.'page='.$pagenum.'">末页</a>';
        }
        
        $pagestr .= '</div>';
        
        return $pagestr;
    }
    /**
     * 分页 最多显示五页
     * 
     * @param mixed $total 总数
     * @param integer $page 页码
     * @param integer $size 每页数量
     * @param string $url 地址
     * @return html
     */
    function _page_js($total,$page=1,$size=15,$display = false){
        if(!$total)return false;
        if($page == 0)
            $page = 1;
        $pagenum = ceil($total/$size);
        if($pagenum < $page)
            $page = $pagenum;
        if($page > 1)
            $on_page = $page-1;
        else
            $on_page = $page;
        if($page+1 > $pagenum)
            $next_page = $pagenum;
        else
            $next_page = ($page+1);
        if($display)
            $style = 'style="display:none;"';
        else
            $style = '';
        $pagestr = '<div class="up_bottombor848" '.$style.'>';
        $pagestr .= '<div class="page_sm">';
        $pagestr .= '<a href="javascript:void(0)" title=""  class="foword">上一页</a>';
        if($pagenum<=5 && $page<5)
        {
            for($i=1;$i<=$pagenum;$i++)
            {
                if($page == $i)
                    $pagestr .= '<a href="javascript:void(0)" title=""  class="on">'.$i.'</a>';
                else
                    $pagestr .= '<a href="javascript:void(0)" title="" >'.$i.'</a>';
            }
        }
        else
        {
            if($page+3 >$pagenum)
            {
                for($i=$pagenum-4 ;$i<=$pagenum;$i++)
                {
                    if($page == $i)
                        $pagestr .= '<a href="javascript:void(0)" title="" class="on">'.$i.'</a>';
                    else
                        $pagestr .= '<a href="javascript:void(0)" title="">'.$i.'</a>';
                }
            }
            else
            {
                
                $start = $page <= 2?1:$page-2;
                    
                for($i=$start;$i<=$start+4;$i++)
                {
                    if($page == $i)
                        $pagestr .= '<a href="javascript:void(0)" title="" class="on">'.$i.'</a>';
                    else
                        $pagestr .= '<a href="javascript:void(0)" title="">'.$i.'</a>';
                }
            }
        }
        $pagestr .= '<a href="javascript:void(0)" title="" data="'.$pagenum.'"  class="foword">下一页</a>';
        $pagestr .= '<span >共'.$pagenum.'页到</span>第<input type="text" class="input" value=""  id= "page_input"/>页';
        $pagestr .= '<input type="image"  src="/public/assets/default/images/anniu_sure_sm.jpg" class="anniu_sure" id= "anxiu_page_input"/>';
        $pagestr .= '</div></div>';
        return $pagestr;
    }