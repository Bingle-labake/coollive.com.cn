<?php /* Smarty version 2.6.27, created on 2014-04-09 10:28:36
         compiled from sk_admin/dashboard/profile.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'sk_admin/dashboard/profile.tpl', 14, false),)), $this); ?>
<?php if ($this->_tpl_vars['ajax'] != 1): ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Administrator's Control Panel</title>
<link type="text/css" rel="stylesheet" href="<?php echo $this->_tpl_vars['template_style_dir']; ?>
/style.css" />
<link type="text/css" rel="stylesheet" href="<?php echo $this->_tpl_vars['template_style_dir']; ?>
/edit.css" />

<script type="text/javascript" src="/public/assets/js/jquery-1.4.2.min.js"></script>
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
<?php endif; ?>
<form method="post" name="thevalueform" id="theform" action="<?php echo $this->_tpl_vars['page']['action']; ?>
" onSubmit="return btn_submit(this,'add')">
<div class="colorarea01">
</div>
<a name="base"></a><div class="colorarea02">

<h2>编辑</h2>

<table cellspacing="0" cellpadding="0" width="100%"  class="maintable">
<tr>
<th>用户名：</th>
<td>
<input name="admin_name" type="text" value="<?php echo $this->_tpl_vars['manager']['admin_name']; ?>
" size="32" maxlength="64" readonly="readonly" />
(<font color="red">*</font> 不可修改) </td>
</tr>

<tr>
<th>原密码：</th>
<td>
<input name="password" value="<?php echo $this->_tpl_vars['manager']['password']; ?>
" type="password" size="32" maxlength="64" /></td>
</tr>

<tr>
<th>新密码：</th>
<td>
<input name="new_password" value="<?php echo $this->_tpl_vars['manager']['new_password']; ?>
" type="password" size="32" maxlength="64" />
(<font color="red">* 若输入的新密码为空，则不会变更原来的密码</font>) </td>
</tr>

<tr>
<th>输入新密码：</th>
<td>
<input name="new_repassword" value="<?php echo $this->_tpl_vars['manager']['new_repassword']; ?>
" type="password" size="32" maxlength="64" />
(<font color="red">*</font>) </td>
</tr>

<tr>
<th>邮箱：</th>
<td>
<input name="email" value="<?php echo $this->_tpl_vars['manager']['email']; ?>
" type="text" size="32" maxlength="64" /></td>
</tr>

<tr>
<th>联系电话：</th>
<td>
<input name="phone" value="<?php echo $this->_tpl_vars['manager']['phone']; ?>
" type="text" size="32" maxlength="64" /></td>
</tr>

</table>



</div>
注：(* <font color="red">修改用户信息后，系统会自动退出重新登录！</font>) 


	<div class="buttons">
        <input name="_id" type="hidden" value="<?php echo $this->_tpl_vars['manager']['id']; ?>
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
function btn_submit(obj, str_acttype){	
	return true;
}
</script>
<?php if ($this->_tpl_vars['ajax'] != 1): ?>
</body>

</html>
<?php endif; ?>