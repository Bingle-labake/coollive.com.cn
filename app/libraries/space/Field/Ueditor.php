<?php

/**
 * Dayrui Website Management System
 *
 * @since		version 2.0.0
 * @author		Dayrui <dayrui@gmail.com>
 * @license     http://www.dayrui.com/license
 * @copyright   Copyright (c) 2011 - 9999, Dayrui.Com, Inc.
 * @filesource	svn://www.dayrui.net/v2/dayrui/libraries/Field/Ueditor.php
 */

class F_Ueditor extends A_Field {
	
	/**
     * 构造函数
     */
    public function __construct() {
		parent::__construct();
		$this->name = 'Ueditor';	// 字段名称
		$this->fieldtype = array('MEDIUMTEXT' => ''); // TRUE表全部可用字段类型,自定义格式为 array('可用字段类型名称' => '默认长度', ... )
		$this->defaulttype = 'MEDIUMTEXT'; // 当用户没有选择字段类型时的缺省值
    }
	
	/**
	 * 字段相关属性参数
	 *
	 * @param	array	$value	值
	 * @return  string
	 */
	public function option($option) {
		$option['width'] = isset($option['width']) ? $option['width'] : 300;
		$option['height'] = isset($option['height']) ? $option['height'] : 100;
		$option['key'] = isset($option['key']) ? $option['key'] : '';
		$option['value'] = isset($option['value']) ? $option['value'] : '';
		$option['mode'] = isset($option['mode']) ? $option['mode'] : 1;
		$option['tool'] = isset($option['tool']) ? $option['tool'] : '\'bold\', \'italic\', \'underline\'';
		$option['fieldtype'] = isset($option['fieldtype']) ? $option['fieldtype'] : '';
		$option['fieldlength'] = isset($option['fieldlength']) ? $option['fieldlength'] : '';
		return '<tr>
                    <th>'.lang('m-062').'：</th>
                    <td>
                    <input type="text" class="input-text" size="10" name="data[setting][option][width]" value="'.$option['width'].'">
					<div class="onShow">'.lang('m-096').'</div>
                    </td>
                </tr>
				<tr>
                    <th>'.lang('m-063').'：</th>
                    <td>
                    <input type="text" class="input-text" size="10" name="data[setting][option][height]" value="'.$option['height'].'">
					<div class="onShow">px</div>
                    </td>
                </tr>
				<tr>
                    <th>'.lang('m-097').'：</th>
                    <td>
                    <input type="text" class="input-text" size="20" name="data[setting][option][key]" value="'.$option['key'].'">
					<div class="onShow">'.lang('m-098').'</div>
                    </td>
                </tr>
				<tr>
                    <th>'.lang('m-099').'：</th>
                    <td>
                    <input type="radio" value="1" name="data[setting][option][mode]" '.($option['mode'] == 1 ? 'checked' : '').' onclick="$(\'#bjqms\').hide()">&nbsp;'.lang('m-100').'&nbsp;&nbsp;
                    <input type="radio" value="2" name="data[setting][option][mode]" '.($option['mode'] == 2 ? 'checked' : '').' onclick="$(\'#bjqms\').hide()">&nbsp;'.lang('m-101').'&nbsp;&nbsp;
                    <input type="radio" value="3" name="data[setting][option][mode]" '.($option['mode'] == 3 ? 'checked' : '').' onclick="$(\'#bjqms\').show()">&nbsp;'.lang('m-102').'&nbsp;&nbsp;
                    </td>
                </tr>
				<tr id="bjqms" '.($option['mode'] > 0 ? 'style="display:none"' : '').'>
                    <th>'.lang('m-103').'：</th>
                    <td>
                    <textarea name="data[setting][option][tool]" style="width:520px;height:50px;" class="text">'.$option['tool'].'</textarea>
					<div class="onShow">'.lang('m-104').'</div>
                    </td>
                </tr>
				<tr>
                    <th>'.lang('m-087').'：</th>
                    <td>
                    <input id="field_default_value" type="text" class="input-text" size="20" value="'.$option['value'].'" name="data[setting][option][value]">
					'.$this->member_field_select().'
					<div class="onShow">'.lang('m-086').'</div>
                    </td>
                </tr>
				'.$this->field_type($option['fieldtype'], $option['fieldlength']).'
				';
	}
	
	/**
	 * 字段入库值
	 */
	public function insert_value($field) {
	
		$value = $this->ci->post[$field['fieldname']];
		// 下载远程图片
		if (preg_match_all("/(src)=([\"|']?)([^ \"'>]+\.(gif|jpg|jpeg|png))\\2/i", $value, $imgs)) {
			
			$uid = isset($this->ci->_data['uid']) ? $this->ci->_data['uid'] : $this->ci->uid;
			$down = FALSE;
			// 附件总大小判断
			if ($uid && $uid == $this->ci->uid && !$this->ci->member['adminid'] && $this->ci->member_rule['attachsize']) {
				$data = $this->ci->db
							 ->select_sum('filesize')
							 ->where('uid', $uid)
							 ->get($this->ci->db->dbprefix('attachment'))
							 ->row_array();
				if ($filesize <= $this->ci->member_rule['attachsize'] * 1024 * 1024) $down = TRUE;
			}
			
			// 开始下载远程图片
			if ($down) {
				$this->ci->load->model('attachment_model');
				foreach ($imgs[3] as $i => $img) {
					if ($uid && (strpos($img, SITE_URL) === FALSE || strpos($img, SITE_ATTACH_URL) === FALSE)) {
						$result = $this->ci->attachment_model->catcher($uid, $img);
						if (is_array($result)) {
							list($id, $file, $_ext) = $result;
							$value = str_replace($imgs[0][$i], " id=\"$id\" src=\"".dr_file($file)."\"", $value);
						}
					}
				}
			}
		}
		
		// 第一张作为缩略图
		if (isset($this->ci->post['thumb']) && (!($thumb = dr_string2array($this->ci->data[1]['thumb'])) || !$thumb['file']) 
		&& preg_match("/(src)=([\"|']?)([^ \"'>]+\.(gif|jpg|jpeg|png))\\2/Ui", $value, $img)) {
			$this->ci->data[1]['thumb'] = $img[3];
		}
		
		// 描述截取
	    if (isset($this->ci->post['description']) && !$this->ci->data[1]['description']) {
		    $this->ci->data[1]['description'] = str_replace(array(' ', PHP_EOL, '　　'), '', dr_strcut(dr_clearhtml($value), 200));
		}

		$this->ci->data[$field['ismain']][$field['fieldname']] = $value;
	}
	
	/**
	 * 附件处理
	 */
	public function attach($data, $_data) {
		
		$data1 = $data2 = array();
		
		// 新数据筛选附件
		if (preg_match_all('/<img id="([0-9]+)"/iU', $data, $aid)) {
			foreach ($aid[1] as $i => $id) {
				$data1[] = (int)$id;
			}
		}
		
		// 旧数据筛选附件
		if (preg_match_all('/<img id="([0-9]+)"/iU', $_data, $aid)) {
			foreach ($aid[1] as $i => $id) {
				$data2[] = (int)$id;
			}
		}
	
		// 新旧数据都无附件就跳出
		if (!$data1 && !$data2) {
			return NULL;
		}
		
		// 新旧数据都一样时表示没做改变就跳出
		if ($data1 === $data2) {
			return NULL;
		}
		
		// 当无新数据且有旧数据表示删除旧附件
		if (!$data1 && $data2) {
			return array(
				array(),
				$data2
			);
		}
		
		// 当无旧数据且有新数据表示增加新附件
		if ($data1 && !$data2) {
			return array(
				$data1,
				array()
			);
		}
		
		// 剩下的情况就是删除旧文件增加新文件
		
		// 新旧附件的交集，表示固定的
		$intersect = @array_intersect($data1, $data2);
		
		return array(
			array_diff($data1, $intersect), // 固有的与新文件中的差集表示新增的附件
			array_diff($data2, $intersect), // 固有的与旧文件中的差集表示待删除的附件
		);
	}
	
	/**
	 * 字段表单输入
	 *
	 * @param	string	$cname	字段别名
	 * @param	string	$name	字段名称
	 * @param	array	$cfg	字段配置
	 * @param	string	$value	值
	 * @return  string
	 */
	public function input($cname, $name, $cfg, $value = NULL) {
		// 字段显示名称
		$text = (isset($cfg['validate']['required']) && $cfg['validate']['required'] == 1 ? '<font color="red">*</font>' : '').'&nbsp;'.$cname.'：';
		// 表单宽度设置
		$width = isset($cfg['option']['width']) && $cfg['option']['width'] ? $cfg['option']['width'] : '90%';
		// 表单高度设置
		$height = isset($cfg['option']['height']) && $cfg['option']['height'] ? $cfg['option']['height'] : '300';
		$key = isset($cfg['option']['key']) && $cfg['option']['key'] ? $cfg['option']['key'] : 'jOO2lnXtordIGcyrOMvZUbfp';
		// 字段提示信息
		$tips = isset($cfg['validate']['tips']) && $cfg['validate']['tips'] ? '<div class="onShow" id="dr_'.$name.'_tips">'.$cfg['validate']['tips'].'</div>' : '<div class="onTime" id="dr_'.$name.'_tips"></div>';
		// 字段默认值
		$value = $value ? $value : $this->get_default_value($cfg['option']['value']);
		// 输出
		$str = '';
		if (!defined('DAYRUI_UEDITOR_LD')) {
			$str .= '
			<script type="text/javascript" src="'.MEMBER_PATH.'static/js/ueditor/editor_config.js"></script>
			<script type="text/javascript" src="'.MEMBER_PATH.'static/js/ueditor/editor_all.js"></script>';
			define('DAYRUI_UEDITOR_LD', 1); // 防止重复加载JS
		}
		$tool = IS_ADMIN ? "'fullscreen', 'source', '|', " : ''; // 后台引用时显示html工具栏
		$pagebreak = $name == 'content' ? ', \'pagebreak\'' : '';
		switch ($cfg['option']['mode']) {
			case 3: // 自定义
				$tool .= $cfg['option']['tool'];
				break;
			case 2: // 精简
				$tool .= "'undo', 'redo', '|',
						'bold', 'italic', 'underline', 'strikethrough','|', 'pasteplain', 'forecolor', 'fontfamily', 'fontsize','|',
						'insertimage', 'emotion', 'map', 'gmap'$pagebreak";
				break;
			case 1: // 默认
				$tool .= "'undo', 'redo', '|',
						'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch','autotypeset','blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist','selectall', 'cleardoc', '|',
						'rowspacingtop', 'rowspacingbottom','lineheight','|',
						'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
						'directionalityltr', 'directionalityrtl', 'indent', '|',
						'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|','touppercase','tolowercase','|',
						'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright','imagecenter', '|',
						'insertimage', 'emotion', 'insertvideo','music', 'map', 'gmap', 'insertframe','highlightcode','webapp','template','background', '|',
						'horizontal', 'date', 'time', 'spechars', 'wordimage', '|',
						'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', '|',
						'print', 'preview', 'searchreplace'$pagebreak,'help'";
				break;
		}
		$str .= "
		<textarea name=\"data[$name]\" id=\"dr_$name\">$value</textarea>
		<script type=\"text/javascript\">
			var editorOption = {
				UEDITOR_HOME_URL: \"".MEMBER_PATH."static/js/ueditor/\",
				toolbars: [
					[ $tool ]
				],
				imageUrl:\"".MEMBER_PATH."index.php?c=api&m=ueupload\",
				imagePath:\"\",
				catcherUrl:\"".MEMBER_PATH."index.php?c=api&m=uecatcher\",
				catcherPath:\"\",
				localDomain:[\"".SITE_URL."\",\"".SITE_ATTACH_URL."\"],
				imageManagerUrl:\"".MEMBER_PATH."index.php?c=api&m=uemanager\",
				imageManagerPath:\"\",
				lang: \"".SITE_LANGUAGE."\",
				webAppKey:\"{$key}\",
				initialContent:\"\",
				initialFrameWidth: \"{$width}\",
				initialFrameHeight: \"{$height}\",
				pageBreakTag:\"_page_break_tag_\"
			};
			var editor = new baidu.editor.ui.Editor(editorOption);
			editor.render(\"dr_$name\");
		</script> 
		".$tips;
		return $this->input_format($name, $text, $str);
	}
}