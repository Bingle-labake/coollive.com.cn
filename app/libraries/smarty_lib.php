<?php 
defined('BASEPATH') or die('Access restricted!');  
/* 
 * author: Bingle 
 */  
require(APPPATH.'libraries/smarty/Smarty.class.php'); 
 
class Smarty_lib extends Smarty  
{  
    public $ext = 'php';  
    public $dir = '';  
    public $layout = 'layout/main';  
	public $compile_check = true;
	public $debugging     = false;
	public $caching       = 0;
	public $cache_lefetime = 6000;//缓存时间s  
/** 
  * 构造函数 
  * 
  * @access public 
  * @param array/string $template_dir 
  * @return obj  smarty obj 
*/  
    public function __construct($template_dir = '', $compile_dir = '', $config_dir = '', $cache_dir = '')  
    {  
         $this->Smarty();  
         if(is_array($template_dir)){  
          foreach ($template_dir as $key => $value) {  
           $this->$key = $value;  
          }  
         }  
         else {  
            $this->cache_dir    = $cache_dir    ? $cache_dir    : FCPATH . 'public/smarty/sk_admin/cache/';  
            $this->template_dir  =   $template_dir ? $template_dir : APPPATH . 'views/';  
            $this->compile_dir   =   $compile_dir  ? $compile_dir  : FCPATH . 'public/smarty/sk_admin/tpl_c/';  
            $this->compile_check =   true;  
            $this->debugging     =   false;  //debug模式  
            $this->caching       =   0;  //启用缓存  
            $this->cache_lefetime=   6000;//缓存时间s  
            $this->left_delimiter=   '<!--{';  
            $this->right_delimiter=  '}-->';  
			$this->ext = "tpl";
         }  
    } 
	      
    /** 
     * 显示输出页面 
     * @access public 
     * @return string 
     */  
    public function show($tpl, $cache_id = ""){  
        $this->assign('jsFiles',$this->getJsHtml());  
        $this->assign('jsFiles1',$this->getJsHtml(1));  
        $this->assign('LAYOUT', $this->dir ? $this->dir.'/'.$tpl.'.'.$this->ext : $tpl.'.'.$this->ext);  
		if(empty($cache_id)) {
			$this->display($this->layout.'.'.$this->ext);  
		}else {
			$this->display($this->layout.'.'.$this->ext, $cache_id);  
		}        
    }  
    /** 
     * 添加一个CSS文件包含 
     * @param string $file 文件名 
     * @access public 
     * @return void 
     */  
    public function addCss($file) {  
        if (strpos($file,'/')==false) {  
            $file = config_item('css') . $file;  
        }  
        $GLOBALS['cssFiles'][$file] = $file;  
    }  
    /** 
     * 添加一个JS文件包含 
     * @param string $file 文件名 
     * @access public 
     * @return void 
     */  
    public function addJs($file,$btm=NULL) {  
        if (strpos($file,'/')==false) {  
            $file = config_item('js') . $file;  
        }  
        if ($btm==NULL) {  
            $GLOBALS['jsfiles'][$file] = $file;  
        } else {  
            $GLOBALS['jsbtmfiles'][$file] = $file;  
        }  
    }  
    /** 
     * 取生成的包含JS HTML 
     * @access public 
     * @return string 
     */  
    public function getJsHtml($btm=NULL) {  
        $html = '';  
        if (isset($GLOBALS['jsfiles']) && !$GLOBALS['jsfiles']) {  
            return;  
        }  
        $jsFile = $btm?'jsbtmfiles':'jsfiles';  
        if (@$GLOBALS[$jsFile]) {  
            foreach ($GLOBALS[$jsFile] as $value) {  
                $html .= $this->jsInclude($value,true)."/n";  
            }  
            return $html;  
        } else {  
            return ;  
        }  
    }  
    /** 
     * 添加html标签 
     * @param string $tag 标签名 
     * @param mixed $attribute 属性 
     * @param string $content 内容 
     * @return string 
     */  
    public function addTag($tag, $attribute = NULL, $content = NULL) {  
        $this->js();  
        $html = '';  
        $tag = strtolower($tag);  
        $html .= '<'.$tag;  
        if ($attribute!=NULL) {  
            if (is_array($attribute)) {  
                foreach ($attribute as $key=>$value) {  
                    $html .= ' '.strtolower($key).'="'.$value.'"';  
                }  
            } else {  
                $html .= ' '.$attribute;  
            }  
        }  
        if ($content) {  
            $html .= '>'.$content.'</'.$tag.'>';  
        } else {  
            $html .= ' />';  
        }  
        $this->output .= $html;  
        return $html;  
    }  
    /** 
     * 添加html文本 
     * @param string $content 内容 
     * @return string 
     */  
    public function addText($content) {  
        $this->js();  
        $content = htmlentities($content);  
        $this->output .= $content;  
        return $content;  
    }  
    /** 
     * 添加js代码 
     * @param string $jscode js代码 
     * @param bool $end 是否关闭js 代码块 
     * @return void 
     */  
    public function js($jscode = NULL, $end = false) {  
        if (!$this->inJsArea && $jscode) {  
            $this->output .= "/n<mce:script language='JavaScript' type='text/javascript'><!--  
/n//<!--[CDATA[/n";  
            $this->inJsArea = true;  
        }  
        if ($jscode==NULL && $this->inJsArea==true) {  
            $this->output .= "/n//]]-->/n  
// --></mce:script>/n";  
            $this->inJsArea = false;  
        } else {  
            $this->output .= "/t$jscode/n";  
            if ($end) {  
                $this->js();  
            }  
        }  
        return;  
    }  
    /** 
     * 添加js提示代码 
     * @param string $message 提示内容 
     * @param bool $end 是否关闭js 代码块 
     * @return void 
     */  
    public function jsAlert($message, $end = false) {  
        $this->js('alert("' . strtr($message, '"', '//"') . '");', $end);  
    }  
    /** 
     * 添加js文件包含 
     * @param string $fileName 文件名 
     * @param bool $defer 是否添加defer标记 
     * @return string 
     */  
    public function jsInclude($fileName,$return = false, $defer = false) {  
        if (!$return) {  
            $this->js();  
        }  
        $html = '<mce:script language="JavaScript" type="text/javascript" src="'  
                . $fileName . '" mce_src="'  
                . $fileName . '"' . ( ($defer) ? ' defer' : '' )  
                . '></mce:script>';  
        if (!$return) {  
            $this->output .= $html;  
        } else {  
            return $html;  
        }  
    }  
    /** 
     * 添加css文件包含 
     * @param string $fileName 文件名 
     * @return string 
     */  
    public function cssInclude($fileName,$return = false) {  
        if (!$return) {  
            $this->js();  
        }  
        $html = '<LINK href="' . $fileName . '" mce_href="' . $fileName . '" rel=stylesheet>' . chr(13);  
        if (!$return) {  
            $this->output .= $html;  
        } else {  
            return $html;  
        }  
    }  
    /** 
     * 输出html内容 
     * @param bool $print 是否直接输出，可选，默认返回 
     * @return void 
     */  
    public function output($print = false) {  
        $this->js();  
        if ($print) {  
            echo $this->output;  
            $this->output = '';  
            return;  
        } else {  
            $output = $this->output;  
            $this->output = '';  
            return $output;  
        }  
    }  
}  

?>