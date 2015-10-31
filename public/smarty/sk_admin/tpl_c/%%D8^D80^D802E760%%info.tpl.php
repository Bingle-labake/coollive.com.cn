<?php /* Smarty version 2.6.27, created on 2014-04-09 10:28:35
         compiled from sk_admin/navigation/info.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'sk_admin/navigation/info.tpl', 12, false),)), $this); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Administrator's Control Panel</title>
<link type="text/css" rel="stylesheet" href="<?php echo $this->_tpl_vars['template_style_dir']; ?>
/style.css" />
<link type="text/css" rel="stylesheet" href="<?php echo $this->_tpl_vars['template_style_dir']; ?>
/edit.css" />
<script src="http://libs.baidu.com/jquery/1.8.2/jquery.min.js"></script>
<script type="text/javascript" src="/public/assets/js/base.js"></script>
	
<script type="text/javascript">
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

<h2>添加/修改导航</h2>

<table cellspacing="0" cellpadding="0" width="100%"  class="maintable">
<tr>
<th>导航名称</th>
<td><input name="navi_name" type="text" id="navi_name" value="<?php echo $this->_tpl_vars['navigation']['navi_name']; ?>
" size="30" maxlength="64" />
  (<font color="red">*</font>)</td>
</tr>
  
  <th>排序</th>
  
  <td><span class="require-field">
    <input name="sort" type="text" id="sort" value="<?php echo $this->_tpl_vars['navigation']['sort']; ?>
" size="20" maxlength="64" />
  </span></td>
  
  
</tr>

</table>



</div>



	<div class="buttons">
        <input name="navi_id" type="hidden" value="<?php echo $this->_tpl_vars['navigation']['navi_id']; ?>
" />
        <input type="submit" value=" 确定 " class="submit" />
        <input type="reset" value=" 重置 " class="submit" />	

	</div><a name="dir"></a><div class="colorarea03">





<br>

<div id="footer">

</div>

</div>

</form>

<script>
//表单效验
function btn_submit(form, act) {
	var isOk = true;	
	if(form.navi_name.value == "") {
		input_warnning('input', 'navi_name', "请填写后台导航名称！");
		isOk = false;
	}	
	return(isOk);	
}
</script>

</body>

</html>