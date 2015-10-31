<?php

/**
 * Dayrui Website Management System
 *
 * @since		version 2.0.0
 * @author		Dayrui <dayrui@gmail.com>
 * @license     http://www.dayrui.com/license
 * @copyright   Copyright (c) 2011 - 9999, Dayrui.Com, Inc.
 * @filesource	svn://www.dayrui.net/v2/dayrui/libraries/Field/Files.php
 */

class F_Files extends A_Field {
	
	/**
     * 构造函数
     */
    public function __construct() {
		parent::__construct();
		$this->name = lang('m-112'); // 字段名称
		$this->fieldtype = array('TEXT' => ''); // TRUE表全部可用字段类型,自定义格式为 array('可用字段类型名称' => '默认长度', ... )
		$this->defaulttype = 'TEXT'; // 当用户没有选择字段类型时的缺省值
    }
	
	/**
	 * 字段相关属性参数
	 *
	 * @param	array	$value	值
	 * @return  string
	 */
	public function option($option) {
	
		$option['width'] = isset($option['width']) ? $option['width'] : 200;
		$option['count'] = isset($option['count']) ? $option['count'] : 2;
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
                    <th>'.lang('m-124').'：</th>
                    <td>
                    <input id="field_default_value" type="text" class="input-text" size="10" value="'.$option['count'].'" name="data[setting][option][count]">
					<div class="onShow">'.lang('m-125').'</div>
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
	
		$data = array();
		$value = dr_string2array($value);
		if (!$value) return $data;
		
		foreach ($value['file'] as $i => $file) {
			$data[] = array(
				'file' => $file, // 对应文件或附件id
				'title' => $value['title'][$i] // 对应标题描述
			);
		}
		
		return $data;
	}
	
	/**
	 * 字段入库值
	 */
	public function insert_value($field) {
		$this->ci->data[$field['ismain']][$field['fieldname']] = dr_array2string($this->ci->post[$field['fieldname']]);
	}
	
	/**
	 * 附件处理
	 */
	public function attach($data, $_data) {
		
		$_data = dr_string2array($_data);
		
		// 新旧数据都无附件就跳出
		if (!$data['file'] && !$_data['file']) {
			return NULL;
		}
		
		// 新旧数据都一样时表示没做改变就跳出
		if ($data['file'] === $_data['file']) {
			return NULL;
		}
		
		// 当无新数据且有旧数据表示删除旧附件
		if (!$data['file'] && $_data['file']) {
			return array(
				array(),
				$_data['file']
			);
		}
		
		// 当无旧数据且有新数据表示增加新附件
		if ($data['file'] && !$_data['file']) {
			return array(
				$data['file'],
				array()
			);
		}
		
		// 剩下的情况就是删除旧文件增加新文件
		
		// 新旧附件的交集，表示固定的
		$intersect = @array_intersect($data['file'], $_data['file']);
		
		return array(
			array_diff($data['file'], $intersect), // 固有的与新文件中的差集表示新增的附件
			array_diff($_data['file'], $intersect), // 固有的与旧文件中的差集表示待删除的附件
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
		// 字段默认值
		$file_value = '';
		$value && $value = dr_string2array($value);
		if ($value && isset($value['file'])) {
			foreach ($value['file'] as $id => $fileid) {
				$info = dr_file_info($fileid);
				$title = $value['title'][$id];
				$file_value.= '<li id="files_'.$name.'_999'.$id.'" list="999'.$id.'" style="cursor:move;">';
				$file_value.= '    <table width="100%" border="0" cellspacing="0" cellpadding="0">';
				$file_value.= '	   <tr>';
				$file_value.= '        <td width="30" style="text-align:right">';
				$file_value.= '            <a href="javascript:;" onclick="dr_remove_file(\''.$name.'\',\'999'.$id.'\')"><img align=\"absmiddle\" src="'.SITE_URL.'dayrui/static/images/b_drop.png"></a>';
				$file_value.= '        </td>';
				$file_value.= '        <td>';
				$file_value.= '            <input type="hidden" value="'.$fileid.'" name="data['.$name.'][file][]" id="fileid_'.$name.'_999'.$id.'" />';
				$file_value.= '            <input type="text" class="input-text" style="width:300px;" value="'.$title.'" name="data['.$name.'][title][]" />';
				$file_value.= '            <span id="span_'.$name.'_999'.$id.'"><a href="javascript:;" onclick="dr_show_file_info(\''.$fileid.'\')"><img align="absmiddle" src="'.$info['icon'].'">'.$info['size'].'</a></span>';
				$file_value.= '        </td>';
				$file_value.= '    </tr>';
				// 网盘更新
				if ($cfg['option']['pan']) {
					$pandata = dr_wangpan();
					foreach ($pandata as $t) {
						$pan = $value['pan'][$t['name']][$id];
						$file_value.= '<tr class="'.$name.'_999'.$id.'_pan" pan="'.$t['name'].'">';
						$file_value.= '    <td style="text-align:right">';
						$file_value.= '        <img align=\"absmiddle\" src="'.$t['icon'].'" title="'.$t['title'].'" style="cursor:pointer;" />';
						$file_value.= '    </td>';
						$file_value.= '    <td>';
						$file_value.= '        <input id="dr_'.$name.'_pan_'.$t['name'].'_999'.$id.'" type="text" class="input-text" style="width:50%;" value="'.$pan.'" />';
						$file_value.= '        <span id="dr_'.$name.'_pan_span_'.$t['name'].'_999'.$id.'" class="dr_'.$name.'_span_pan"></span>';
						$file_value.= '    </td>';
						$file_value.= '</tr>';
					}
				}
				$file_value.= '    </table>';
				$file_value.= '</li>';
			}
		}
		// 当字段必填时，加入html5验证标签
		if (isset($cfg['validate']['required']) && $cfg['validate']['required'] == 1) $attr .= ' required="required"';
		// 上传的URL
		$url = MEMBER_PATH.'index.php?c=api&m=upload&name='.$name.'&size='.$cfg['option']['size'].'&ext='.$cfg['option']['ext'].'&count='.$cfg['option']['count'];
		// 
		// 加载js
		if (!defined('FINECMS_FILES_LD')) {
			$str.= '<script type="text/javascript" src="'.MEMBER_PATH.'static/js/jquery-ui.min.js"></script>';
			define('FINECMS_FILES_LD', 1);//防止重复加载JS
		}
		$str = '<input type="hidden" value="" name="data['.$name.'_del]" id="dr_'.$name.'_del" />';
		$str.= '<fieldset class="blue pad-10">';
        $str.= '	<legend>'.lang('m-120').'</legend>';
        $str.= '	<div class="picList" id="list_'.$name.'_files">';
		$str.= '		<ul id="'.$name.'-sort-items">';
		$str.= $file_value;
		$str.= '		</ul>';
		$str.= '	</div>';
		$str.= '</fieldset>';
		
		$str.= '<div class="bk10"></div>';
		// 网盘更新
		if ($cfg['option']['pan']) {
			$pan = '';
			$pandata = dr_wangpan();
			foreach ($pandata as $t) {
				$pan.= '<tr class="'.$name.'_{id}_pan" pan="'.$t['name'].'">';
				$pan.= '	<td style="text-align:right">';
				$pan.= '		<img align=\"absmiddle\" src="'.$t['icon'].'" title="'.$t['title'].'" style="cursor:pointer;" />';
				$pan.= '	</td>';
				$pan.= '	<td>';
				$pan.= '		<input type="text" id="dr_'.$name.'_pan_'.$t['name'].'_{id}" class="input-text" style="width:50%;" />';
				$pan.= '		<span id="dr_'.$name.'_pan_span_'.$t['name'].'_{id}" class="dr_'.$name.'_span_pan"></span>';
				$pan.= '	</td>';
				$pan.= '</tr>';
			}
			$pan = urlencode($pan);
			
			$str.= '<div class="picBut cu"><a href="javascript:;" onClick="dr_upload_files(\''.$name.'\',\''.$url.'\', \''.$pan.'\')">'.lang('m-119').'</a></div>';
			$str.= '<div class="picBut cu"><a href="javascript:;" id="updatepan_'.$name.'" onclick="dr_wangpan_'.$name.'()">'.lang('m-121').'</a></div>';
			$str.= '<script type="text/javascript">
			function dr_wangpan_'.$name.'() {
				$(".dr_'.$name.'_span_pan").html("<img align=\"absmiddle\" src=\"'.SITE_URL.'dayrui/static/images/onLoad.gif\" />");
				$("#'.$name.'-sort-items li").each(function(){
					var list_id = $(this).attr("list"); // 多文件列的id号
					var file_id = $("#fileid_'.$name.'_"+list_id).val(); // 文件id
					$(".'.$name.'_"+list_id+"_pan").each(function(){
						var pan = $(this).attr("pan"); // 当前列的网盘名称
						$.getJSON("'.MEMBER_PATH.'index.php?c=api&m=wangpan&name="+pan+"&file="+encodeURIComponent(file_id)+"&rand="+Math.random(), function(data){
							if (data.status == 1) {
								$("#dr_'.$name.'_pan_"+pan+"_"+list_id).val(data.code);
								$("#dr_'.$name.'_pan_span_"+pan+"_"+list_id).html("<div class=\"onCorrect\">&nbsp;</div>");
							} else {
								$("#dr_'.$name.'_pan_span_"+pan+"_"+list_id).html(data.code);
							}
						});
					});
				});
			}
			</script>';
		} else {
			$str.= '<div class="picBut cu">';
			$str.= '	<a href="javascript:;" onClick="dr_upload_files(\''.$name.'\',\''.$url.'\')">'.lang('m-119').'</a>';
			$str.= '</div>';
		}
		$str.= '<script type="text/javascript">$("#'.$name.'-sort-items").sortable();</script>'.$tips;
		return $this->input_format($name, $text, $str);
	}
	
}