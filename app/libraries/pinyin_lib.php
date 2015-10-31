<?php
// +----------------------------------------------------------------------
// | 
// +----------------------------------------------------------------------

/**  
 * pinyin_lib.php
 *
 * 拼音处理类
 *
 * @package class
 * @author Bingle <bingle@qq.com>
 */
class Pinyin_lib {
	public function __construct(){
	}
	/**  
	 * 数字拼音对照表
	 */
	private $numpy = array(
		'0'=>'ling',
		'1'=>'yi',
		'2'=>'er',
		'3'=>'san',
		'4'=>'si',
		'5'=>'wu',
		'6'=>'liu',
		'7'=>'qi',
		'8'=>'ba',
		'9'=>'jiu'
	);

    public function say() {
	    echo "################";	
	}
	/**  
	 * 获取字符串拼音
	 * @param string $str 要获取拼音的字符串
	 * @return string
	 */ 
	public function complie($str)
	{
		static $py_list = NULL;
        if($py_list === NULL)
        {
            $py_list = array();
            $py_table = file_get_contents(FCPATH.'./public/table/pinyin-utf8.table');
            $py_table = explode("\r\n", $py_table);
            foreach ($py_table as $py)
            {
                $py_list[mb_substr($py,0,1,'UTF-8')] = mb_substr($py,2,10,'UTF-8');
            }
        }
        $ret="";
		for($i=0;$i<mb_strlen($str);$i++)
		{
			$s = mb_substr($str,$i,1,'UTF-8');
            if(preg_match("/[a-zA-Z]/", $s))
                $ret.= strtolower($s);
			elseif(isset($this->numpy[$s]))
				$ret.=$this->numpy[$s];
			elseif(preg_match("/[\x7f-\xff]/", $s))
                $ret.=$py_list[$s];
		}
		return $ret;
	}
}

?>