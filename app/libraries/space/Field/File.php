<?php

/**
 * Dayrui Website Management System
 *
 * @since		version 2.0.0
 * @author		Dayrui <dayrui@gmail.com>
 * @license     http://www.dayrui.com/license
 * @copyright   Copyright (c) 2011 - 9999, Dayrui.Com, Inc.
 * @filesource	svn://www.dayrui.net/v2/dayrui/libraries/Field/File.php
 */

class F_File extends A_Field {
	
	/**
     * 构造函数
     */
    public function __construct() {
		parent::__construct();
		$this->name = lang('m-111'); // 字段名称
		$this->fieldtype = array('VARCHAR' => '255'); // TRUE表全部可用字段类型,自定义格式为 array('可用字段类型名称' => '默认长度', ... )
		$this->defaulttype = 'VARCHAR'; // 当用户没有选择字段类型时的缺省值
    }
	
	/**
	 * 字段相关属性参数
	 *
	 * @param	array	$value	值
	 * @return  string
	 */
	public function option($option) {
		$option['width'] = isset($option['width']) ? $option['width'] : 200;
		$option['pan'] = isset($option['pan']) ? $option['pan'] : 0;
		$option['fieldtype'] = isset($option['fieldtype']) ? $option['fieldtype'] : '';
		$option['fieldlength'] = isset($option['fieldlength']) ? $option['fieldlength'] : '';
		return '<tr>
                    <th>'.lang('m-113').'：</th>
                    <td>
                    <input id="field_default_value" type="text" class="input-text" size="10" value="'.$option['size'].'" name="data[setting][option][size]">
					<div class="onShow">'.lang('m-114').'</div>
                    </td>
                </tr>
				<tr>
                    <th>'.lang('m-115').'：</th>
                    <td>
                    <input type="text" class="input-text" size="40" name="data[setting][option][ext]" value="'.$option['ext'].'">
					<div class="onShow">'.lang('m-116').'</div>
                    </td>
                </tr>
				<tr>
                    <th>'.lang('m-117').'：</th>
                    <td>
					<input type="radio" '.($option['pan'] == 0 ? 'checked=""' : '').' value="0" name="data[setting][option][pan]" />&nbsp;'.lang('close').'&nbsp;&nbsp;&nbsp;
					<input type="radio" '.($option['pan'] == 1 ? 'checked=""' : '').' value="1" name="data[setting][option][pan]" />&nbsp;'.lang('open').'
					<div class="onShow">'.lang('m-118').'</div>
                    </td>
                </tr>
				';
	}
	
	/**
	 * 字段输出
	 */
	public function output($value) {
		return $value;
	}
	
	/**
	 * 附件处理
	 */
	public function attach($data, $_data) {
		
		// 新旧数据都无附件就跳出
		if (!$data && !$_data) {
			return NULL;
		}
		
		// 新旧数据都一样时表示没做改变就跳出
		if ($data === $_data) {
			return NULL;
		}
		
		// 当无新数据且有旧数据表示删除旧附件
		if (!$data && $_data) {
			return array(
				array(),
				array($_data)
			);
		}
		
		// 当无旧数据且有新数据表示增加新附件
		if ($data && !$_data) {
			return array(
				array($data),
				array()
			);
		}
		
		// 剩下的情况就是删除旧文件增加新文件
		return array(
			array($data),
			array($_data)
		);
	}
	
	/**
	 * 字段表单输入
	 *
	 * @param	string	$cname	字段别名
	 * @param	string	$name	字段名称
	 * @param	array	$cfg	字段配置
	 * @param	array	$data	值
	 * @return  string
	 */
	public function input($cname, $name, $cfg, $value = NULL) {
		// 字段显示名称
		$text = (isset($cfg['validate']['required']) && $cfg['validate']['required'] == 1 ? '<font color="red">*</font>' : '').'&nbsp;'.$cname.'：';
		// 表单附加参数
		$attr = isset($cfg['validate']['formattr']) && $cfg['validate']['formattr'] ? $cfg['validate']['formattr'] : '';
		// 字段提示信息
		$tips = isset($cfg['validate']['tips']) && $cfg['validate']['tips'] ? '<div class="onShow" id="dr_'.$name.'_tips">'.$cfg['validate']['tips'].'</div>' : '<div class="onTime" id="dr_'.$name.'_tips"></div>';
		// 当字段必填时，加入html5验证标签
		if (isset($cfg['validate']['required']) && $cfg['validate']['required'] == 1) $attr .= ' required="required"';
		// 上传的URL
		$url = MEMBER_PATH.'index.php?c=api&m=upload&name='.$name.'&size='.$cfg['option']['size'].'&ext='.$cfg['option']['ext'].'&count=1';
		// 文件值
		$file = $info = '';
		if ($value) {
			$file = $value;
			$data = dr_file_info($file);
			if ($data) {
				$fsize = $data['size'] ? ' ('.$data['size'].')' : '';
				$info = '<a href="javascript:;" onclick="dr_show_file_info(\''.$file.'\')"><img align="absmiddle" src="'.$data['icon'].'">'.$data['filename'].$size.'</a>';
			}
			unset($data);
		}
		// 上传按钮与表单值
		$tool = '<span>'.dr_lang('m-138', str_replace('|', '、', $cfg['option']['ext'])).'</span>&nbsp;&nbsp;
		<input type="hidden" id="dr_'.$name.'" name="data['.$name.']" value="'.$file.'" '.$attr.' />
		<input type="button" style="width:60px;cursor:pointer;" class="button" onclick="dr_upload_file(\''.$name.'\', \''.$url.'\')" value="' . lang('m-119') . '" />
		';
		// 文件信息查看
		$finfo = '<span id="show_'.$name.'" />'.$info.'</span>'.$tips;
		// 开启网盘时
		if ($cfg['option']['pan']) {
			
			$str ='
			<script type="text/javascript">
			function dr_wangpan_'.$name.'() {
				var file_id = $("#dr_'.$name.'").val(); // 文件id
				$(".dr_'.$name.'_span_pan").html("<img align=\"absmiddle\" src=\"'.SITE_URL.'dayrui/static/images/onLoad.gif\">");
				$(".' . $name . '_pan").each(function(){
					var pan = $(this).attr("pan"); // 当前列的网盘名称
					$.getJSON("'.MEMBER_PATH.'index.php?c=api&m=wangpan&name="+pan+"&file="+encodeURIComponent(file_id)+"&rand="+Math.random(), function(data){
						if (data.status == 1) {
							$("#dr_'.$name.'_pan_"+pan).val(data.code);
							$("#dr_'.$name.'_pan_span_"+pan).html("<div class=\"onCorrect\">&nbsp;</div>");
						} else {
							$("#dr_'.$name.'_pan_span_"+pan).html(data.code);
						}
					});
				});
			}
			</script>';
			$str.= '<fieldset class="blue pad-10">';
			$str.= '	<legend>'.lang('m-120').'</legend>';
			$str.= '	<table width="100%" border="0" cellspacing="0" cellpadding="0">';
			
			foreach ($pandata as $t) {
				$str.= '<tr class="'.$name.'_pan" pan="'.$t['name'].'">';
				$str.= '	<td style="text-align:left">';
				$str.= '		<img align=\"absmiddle\" src="'.$t['icon'].'" title="'.$t['title'].'" style="cursor:pointer;">&nbsp;&nbsp;';
				$str.= '		<input type="text" class="input-text" style="width:50%;" id="dr_'.$name.'_pan_'.$t['name'].'" value="'.$pan[$t['name']].'" />';
				$str.= '		<span id="dr_'.$name.'_pan_span_'.$t['name'].'" class="dr_'.$name.'_span_pan"></span>';
				$str.= '	</td>';
				$str.= '</tr>';
			}
			
			$str.= '	<tr>';
			$str.= '		<td style="text-align:left;border-bottom:none;">'.$tool;
			$str.= '		<input type="button" style="width:60px;" class="button" id="updatepan_'.$name.'" onclick="dr_wangpan_'.$name.'()" value="'.lang('m-121').'" />';
			$str.= '		&nbsp;&nbsp;'.$finfo;
			$str.= '		</td>';
			$str.= '	</tr>';
			$str.= '	</table>';
			$str.= '</fieldset>';
		} else {
			$str = $tool.$finfo;
		}
		return $this->input_format($name, $text, $str);
	}
}