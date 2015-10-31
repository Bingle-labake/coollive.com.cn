<?php /* Smarty version 2.6.27, created on 2014-04-08 18:56:04
         compiled from sk_admin/menu.tpl */ ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Sidemenu</title>
<link type="text/css" rel="stylesheet" href="/app/views/sk_admin/styles/style.css" />
<base target="mainframe" />
</head>
 
<body id="side">
<?php if ($this->_tpl_vars['navi_nid'] == 'shangpinku'): ?>

 <div style="display: block;">
    <h3>商品库管理</h3>
    <?php $_from = $this->_tpl_vars['menus']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['k'] => $this->_tpl_vars['menu']):
?>
    <?php if ($this->_tpl_vars['menu']['children']): ?>
      <ul>
      <?php $_from = $this->_tpl_vars['menu']['children']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['child']):
?>
        <li><a href="<?php echo $this->_tpl_vars['child']['url']; ?>
" target="mainframe"><?php echo $this->_tpl_vars['child']['text']; ?>
</a></li>
      <?php endforeach; endif; unset($_from); ?>      
      </ul>
    <?php endif; ?>
    <?php endforeach; endif; unset($_from); ?>
  </div>
<?php else: ?>
<?php $_from = $this->_tpl_vars['menus']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['k'] => $this->_tpl_vars['menu']):
?>
<?php if ($this->_tpl_vars['menu']['title']): ?>
  <li class="explode"><a href="{$menu.title.url}" target="main-frame"></a></li>
  <div style="display: block;">
    <h3><?php echo $this->_tpl_vars['menu']['title']['text']; ?>
</h3>
    <?php if ($this->_tpl_vars['menu']['children']): ?>
      <ul>
      <?php $_from = $this->_tpl_vars['menu']['children']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['child']):
?>
        <li><a href="<?php echo $this->_tpl_vars['child']['url']; ?>
" target="mainframe"><?php echo $this->_tpl_vars['child']['text']; ?>
</a></li>
      <?php endforeach; endif; unset($_from); ?>      
      </ul>
    <?php endif; ?>
  </div>
<?php endif; ?>
<?php endforeach; endif; unset($_from); ?>
<?php endif; ?>
<script type="text/javascript"> 
window.parent.document.getElementById("mainframe").src='<?php echo $this->_tpl_vars['default_mail_href']; ?>
';
</script>
</body>
</html>