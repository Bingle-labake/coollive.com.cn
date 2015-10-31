<?php /* Smarty version 2.6.27, created on 2014-04-08 18:56:04
         compiled from sk_admin/dashboard.tpl */ ?>
       <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Administrator's Control Panel</title>
<link type="text/css" rel="stylesheet" href="/app/views/sk_admin/styles/style.css" />
<link type="text/css" rel="stylesheet" href="/app/views/sk_admin/styles/edit.css" />
<script type="text/javascript" src="/public/assets/js/jquery-1.4.2.min.js"></script>
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
					<td <?php if ($this->_tpl_vars['node']['active']): ?>class="active"<?php endif; ?>><a href="../sk_admin/&lt;!--{$node.href}--&gt;" class="view"><?php echo $this->_tpl_vars['node']['text']; ?>
</a></td>
                    <?php endforeach; endif; unset($_from); ?>
				</tr>
			</table>
		</td>
	</tr>
</table>
<div class="colorarea02">
  <h2>数据统计</h2>
  <table cellspacing="0" cellpadding="0" width="100%"  class="maintable">
    <tr>
      <th>&nbsp;</th>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <th>&nbsp;</th>
      <td>&nbsp;</td>
    </tr>
    <?php $_from = $this->_tpl_vars['role']['roleNode_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['roleNode']):
?>
    <?php endforeach; endif; unset($_from); ?>
  </table>
</div>
<div class="colorarea02">
  <h2>内容审核</h2>
  <table cellspacing="0" cellpadding="0" width="100%"  class="maintable">
    <tr>
      <th>&nbsp;</th>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <th>&nbsp;</th>
      <td>&nbsp;</td>
    </tr>
    <?php $_from = $this->_tpl_vars['role']['roleNode_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['roleNode']):
?>
    <?php endforeach; endif; unset($_from); ?>
  </table>
</div>

<div class="colorarea02">
  <h2>系统信息</h2>
  <table cellspacing="0" cellpadding="0" width="100%"  class="maintable">
    <tr>
      <th>&nbsp;</th>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <th>&nbsp;</th>
      <td>&nbsp;</td>
    </tr>
    <?php $_from = $this->_tpl_vars['role']['roleNode_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['roleNode']):
?>
    <?php endforeach; endif; unset($_from); ?>
  </table>
</div>

<br>
<div id="footer">

</div>
</div>
<script> 

</script>
<iframe id="phpframe" name="phpframe" width="0" height="0" marginwidth="0" frameborder="0" src="about:blank"></iframe>
</body>
</html>
