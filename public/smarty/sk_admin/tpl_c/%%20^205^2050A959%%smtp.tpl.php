<?php /* Smarty version 2.6.27, created on 2014-04-09 11:03:58
         compiled from sk_admin/systemConfig/smtp.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'sk_admin/systemConfig/smtp.tpl', 49, false),)), $this); ?>
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
<script type="text/javascript" src="/public/assets/js/pinyin.js"></script>
<style type="text/css"> 
	  /* css for timepicker */
	  .ui-timepicker-div .ui-widget-header {margin-bottom: 8px;}
	  .ui-timepicker-div dl {text-align: left;}
	  .ui-timepicker-div dl dt {height: 25px; margin-bottom: -25px;}
	  .ui-timepicker-div dl dd {margin: 0 10px 10px 65px;}
	  .ui-timepicker-div td {font-size: 90%;}
	  .ui-tpicker-grid-label {background: none; border: none; margin: 0; padding: 0;}
  </style> 
<script type="text/javascript">
jQuery(function($){
     $.datepicker.regional['zh-CN'] = {
                closeText: '关闭',
                prevText: '<上月',
                nextText: '下月>',
                currentText: '今天',
                monthNames: ['一月','二月','三月','四月','五月','六月',
                '七月','八月','九月','十月','十一月','十二月'],
                monthNamesShort: ['一','二','三','四','五','六',
                '七','八','九','十','十一','十二'],
                dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
                dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
                dayNamesMin: ['日','一','二','三','四','五','六'],
                weekHeader: '周',
                dateFormat: 'yy-mm-dd',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: true,
                yearSuffix: '年'};
        $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
});

var brandIndex = 0;

var BASE_URL     = "<?php echo ((is_array($_tmp=@$this->_tpl_vars['BASE_URL'])) ? $this->_run_mod_handler('default', true, $_tmp, "") : smarty_modifier_default($_tmp, "")); ?>
";
var ADMIN_FOLDER = "<?php echo ((is_array($_tmp=@$this->_tpl_vars['ADMIN_FOLDER'])) ? $this->_run_mod_handler('default', true, $_tmp, "") : smarty_modifier_default($_tmp, "")); ?>
";
</script>
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

<form method="post" name="thevalueform" id="theform" action="<?php echo $this->_tpl_vars['page']['action']; ?>
" onSubmit="return btn_submit(this,'add')" enctype="multipart/form-data">
<div class="colorarea01">
</div>
<a name="base"></a><div class="colorarea02">

<h2>设置</h2>

<table cellspacing="0" cellpadding="0" width="100%"  class="maintable">
<tr>
<th>邮件服务器：</th>
<td>
<input name="smtp_host" value="<?php echo $this->_tpl_vars['smtp']['smtp_host']; ?>
" type="text" size="30" maxlength="64" /></td>
</tr>

<tr>
<th>邮件服务器端口：</th>
<td><input name="smtp_port" value="<?php echo $this->_tpl_vars['smtp']['smtp_port']; ?>
" type="text" size="12" maxlength="18" /></td>
</tr>

<tr>

<th>邮件帐号：</th>

<td><input name="smtp_accout" value="<?php echo $this->_tpl_vars['smtp']['smtp_accout']; ?>
" type="text" size="32" maxlength="64" /></td>

</tr>

<tr>

<th>邮件密码：</th>

<td>
<input name="smtp_password" value="########" type="password" size="20" maxlength="64" />
(<font color="red">* 默认密码为 ########</font>) </td>

</tr> 
<tr>

<th>SSL连接加密：</th>

<td><input name="smtp_is_ssl" type="radio" id="smtp_is_ssl_2" value="1" <?php if ($this->_tpl_vars['smtp']['smtp_is_ssl'] == 1): ?>checked="checked"<?php endif; ?> />
是    &nbsp;&nbsp;&nbsp;
<input name="smtp_is_ssl" type="radio" id="smtp_is_ssl_3" value="0" <?php if ($this->_tpl_vars['smtp']['smtp_is_ssl'] == 0): ?>checked="checked"<?php endif; ?> />
不
    (<font color="red">*</font>) </td>


</tr>
<tr>

<th>SMTP验证</th>

<td><input name="smtp_auth" type="radio" id="smtp_auth_1" value="1" <?php if ($this->_tpl_vars['smtp']['smtp_auth'] == 1): ?>checked="checked"<?php endif; ?> />
是    &nbsp;&nbsp;&nbsp;
<input type="radio" name="smtp_auth" value="0" id="smtp_auth_2" <?php if ($this->_tpl_vars['smtp']['smtp_auth'] == 0): ?>checked="checked"<?php endif; ?> />
不
    (<font color="red">*</font>) </td>
</tr>    
<script type="text/javascript">		  
$('#create_date').datepicker();
</script>

</table>



</div>



	<div class="buttons">
        <input name="app_name" type="hidden" value="smtp" />
        <input type="submit" value=" 确定 " class="submit" />
        <input type="reset" value=" 重置 " class="submit" />	

	</div><a name="dir"></a><div class="colorarea03">





<br>

<div id="footer">


</div>

</div>

</form>

<script>

function btn_submit(obj, str_acttype){	
	return true;
}


</script>
<script>

var isUpload = false;
var SITE_PATH= BASE_URL+"api/upload" ;

function ajaxFileUpload(handle, uploadID){
	if(!isUpload) {
		isUpload = true;
		$.ajaxFileUpload({
			url:SITE_PATH+'/brand?ajax=1&re_type=json&uploadID='+uploadID,
			secureuri:false,
			fileElementId:uploadID,
			dataType: 'json',
			success: function(result){
				if(result.code > 0) {
					if(handle == "logo") {
						$('#img_logo').attr("src", result.info.path+'/'+result.info.saveName);
						$('input[name="logo"]').val(result.info.saveName);	
						$('#img_logo').css({"display":"block"});					
					}else {
						$('#img_logo_image').attr("src", result.info.path+'/'+result.info.saveName);
						$('input[name="logo_image"]').val(result.info.saveName);
						$('#img_logo_image').css({"display":"block"});								
					}									
				}else {
					alert(result.msg);
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

$(document).ready(function() {
			for(var i= 65;i<91;i++) {
				var realkey  = String.fromCharCode(i);
				$('#brandIndex').append('<option value="'+realkey+'">'+realkey+'</option>');
			}
});

function initBrandIndex(brandName) {
	var pinyin = CC2PY(brandName);
	if(null != pinyin && pinyin.length>0) {
		$('#brandIndex option[value="'+pinyin.substring(0,1)+'"]').attr("selected","selected");
	}
}
</script>
</body>

</html>