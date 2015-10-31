<?php /* Smarty version 2.6.27, created on 2014-04-09 11:04:02
         compiled from sk_admin/systemConfig/upload.tpl */ ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Administrator's Control Panel</title>
<link type="text/css" rel="stylesheet" href="<?php echo $this->_tpl_vars['template_style_dir']; ?>
/style.css" />
<link type="text/css" rel="stylesheet" href="<?php echo $this->_tpl_vars['template_style_dir']; ?>
/edit.css" />
<link rel="stylesheet" type="text/css" href="<?php echo $this->_tpl_vars['template_style_dir']; ?>
/jquery-ui-1.8.custom.css"/>

<script type="text/javascript" src="/public/assets/js/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="/public/assets/js_time/jquery-ui-1.8.16.custom.min.js"></script>
<script type="text/javascript" src="/public/assets/js_time/jquery-ui-timepicker-addon.js"></script>
<script type="text/javascript" src="/public/assets/js/ajaxfileupload.js"></script>
</head>
<body id="main">
<table summary="" id="pagehead" cellpadding="0" cellspacing="0" border="0" width="100%">
	<tr>
		<td><h1><?php echo $this->_tpl_vars['page']['title']; ?>
</h1></td>

		<td class="actions">

		<table summary="" cellpadding="0" cellspacing="0" border="0" align="right">

				<tr>
                    <?php $_from = $this->_tpl_vars['page']['navi']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['node']):
?>
					<td <?php if ($this->_tpl_vars['node']['active']): ?>class="active"<?php endif; ?>><a href="<?php echo $this->_tpl_vars['node']['href']; ?>
" class="view"><?php echo $this->_tpl_vars['node']['text']; ?>
</a></td>
                    <?php endforeach; endif; unset($_from); ?>
               </tr>

			</table>

		</td>

	</tr>

</table>

<form method="post" name="thevalueform" id="theform" enctype="multipart/form-data" action="<?php echo $this->_tpl_vars['page']['action']; ?>
" >
<div class="colorarea01">
</div>
<a name="base"></a><div class="colorarea02">

<h2>设置</h2>

<table cellspacing="0" cellpadding="0" width="100%"  class="maintable">

<tr>
  <th>是否开启上传：</th>
  <td>
    <input name="is_upload" type="radio" id="is_upload_1" value="1" <?php if ($this->_tpl_vars['upload']['is_upload'] == 1): ?>checked="checked"<?php endif; ?> />
    是    &nbsp;&nbsp;&nbsp;
    <input type="radio" name="is_upload" value="0" id="is_upload_2" <?php if ($this->_tpl_vars['upload']['is_upload'] != 1): ?>checked="checked"<?php endif; ?> />
    不
</tr>

<tr>
<th>图片背景色：</th>
<td>
<input name="bg_color" value="<?php echo $this->_tpl_vars['upload']['bg_color']; ?>
" onblur="initBrandIndex(this.value)" type="text" size="16" maxlength="64" /></td>
</tr>

<tr>
<th>最大上传限制(MB)：</th>
<td><input name="max_upload" value="<?php echo $this->_tpl_vars['upload']['max_upload']; ?>
" type="text" size="16" maxlength="64" /></td>
</tr>

<tr>

<th>允许上传的文件类型：</th>

<td><input name="allow_upload_exts" value="<?php echo $this->_tpl_vars['upload']['allow_upload_exts']; ?>
" type="text" size="32" maxlength="64" /></td>

</tr>

<tr>
  <th>开启缩略图：</th>
  <td><input name="is_thumb" type="radio" id="is_thumb_2" value="1" <?php if ($this->_tpl_vars['upload']['thumb']['is_thumb'] == 1): ?>checked="checked"<?php endif; ?> />
    是    &nbsp;&nbsp;&nbsp;
    <input type="radio" name="is_thumb" value="0" id="is_thumb_3" <?php if ($this->_tpl_vars['upload']['thumb']['is_thumb'] != 1): ?>checked="checked"<?php endif; ?> />
    不
    </td>
  
</tr>

<tr>
<th>图片生成质量：</th>

<td>
 <input name="image_quality" type="text" id="image_quality" value="<?php echo $this->_tpl_vars['upload']['image_quality']; ?>
" size="12" maxlength="18" /></td>

</tr>
</table>



</div>



	<div class="buttons">
        <input name="app_name" type="hidden" value="upload" />
        <input type="submit" value=" 确定 " class="submit" />
        <input type="reset" value=" 重置 " class="submit" />	

	</div><a name="dir"></a><div class="colorarea03">





<br>

<div id="footer">


</div>

</div>

</form>
<script>

var isUpload = false;
var SITE_PATH= "/api/upload" ;

function ajaxFileUpload(handle, uploadID){
	if(!isUpload) {
		isUpload = true;
		$.ajaxFileUpload({
			url:SITE_PATH+'/waterLogo?ajax=1&re_type=json&uploadID='+uploadID,
			secureuri:false,
			fileElementId:uploadID,
			dataType: 'json',
			success: function(result){
				if(result.code > 0) {
					if(handle == "water_image") {
						$('#water_image_logo').attr("src", result.info.path+result.info.saveName);
						$('input[name="water_image"]').val(result.info.path+result.info.saveName);	
						$('#water_image_logo').css({"display":"block"});					
					}								
				}else {
					alert(result.error);
				}
			},
			error: function(){
				alert(".............");
			}
		});	
		isUpload = false;
	}else {		
	    alert("正在上传中....请稍等！");		
	}
	return false;	
} 

function openDialog() {
    document.getElementById("fileToUpload").click();
	return false;
}

</script>
</body>

</html>