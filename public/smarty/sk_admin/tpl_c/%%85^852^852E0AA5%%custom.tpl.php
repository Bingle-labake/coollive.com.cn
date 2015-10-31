<?php /* Smarty version 2.6.27, created on 2014-04-09 11:03:14
         compiled from sk_admin/fileCache/custom.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'sk_admin/fileCache/custom.tpl', 12, false),)), $this); ?>
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
<script> 
var navi_id = "<?php echo ((is_array($_tmp=@$this->_tpl_vars['search']['navi_id'])) ? $this->_run_mod_handler('default', true, $_tmp, 0) : smarty_modifier_default($_tmp, 0)); ?>
";
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

 
<table cellspacing="2" cellpadding="2" class="helptable">
  <tr>
    <td>
      <ul>
      <li>当站点进行了数据修改、恢复、升级或者工作出现异常的时候，你可以使用本功能重新生成缓存。更新缓存的时候，可能让服务器负载升高，请尽量避开会员访问的高峰时间</li>
      <li>后台数据缓存：更新站点的后台数据缓存</li>
      </ul>
    </td>
  </tr>
</table>
            
<form method="post" name="listform" id="theform" action="" >            
<table cellspacing="0" cellpadding="0" width="100%" id="checklist"  class="listtable">
 
<tr>
  <th width="600">文件名称</th>
  <th width="160">类型</th> 
  <th width="160">创建时间</th>  
  <th width="160">操作</th>
</tr>

<?php $_from = $this->_tpl_vars['file_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['file']):
?>
   <td>
   <?php if ($this->_tpl_vars['file']['is_dir'] == 1): ?>
   <a href="<?php echo $this->_tpl_vars['file']['path_url']; ?>
" ><span id="span2"><?php echo $this->_tpl_vars['file']['path']; ?>
</span><a>
   <?php else: ?>
   <span id="span2"><?php echo $this->_tpl_vars['file']['path']; ?>
</span>
   <?php endif; ?>
   </td>
   <td width="160"><a href="javascript:void(0)" ><span id="span2"><?php echo $this->_tpl_vars['file']['file_type']; ?>
</span><a></td>
  <td width="160"><a href="javascript:void(0)" ><span id="span3"><?php echo $this->_tpl_vars['file']['m_time']; ?>
</span><a></td>
   <td align="center">
   <?php $_from = $this->_tpl_vars['file']['action_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['action']):
?>
       <?php if ($this->_tpl_vars['action']['ajax']): ?>
       <a href="javascript:void(0);" class="custom_<?php echo $this->_tpl_vars['action']['ajax']['act']; ?>
" data="<?php echo $this->_tpl_vars['action']['ajax']['data']; ?>
"><?php echo $this->_tpl_vars['action']['name']; ?>
</a> &nbsp;&nbsp; 
       
       <?php else: ?>
        <a href="<?php echo $this->_tpl_vars['action']['href']; ?>
"><?php echo $this->_tpl_vars['action']['name']; ?>
</a> &nbsp;&nbsp; 
       <?php endif; ?>       
   <?php endforeach; endif; unset($_from); ?>
    </td>
 </tr>
<?php endforeach; endif; unset($_from); ?>
 <tr>
   <td colspan="4"><span><a href="<?php echo $this->_tpl_vars['clean_all']['url']; ?>
"><?php echo $this->_tpl_vars['clean_all']['name']; ?>
</a></span></td>
 </tr>
</table> 
</form>

<br>
<div id="footer">
	<!--P>Processed in 0.950347 second(s), 3 queries, Gzip enabled<br /></P-->
</div>
</div>
<script>

$(document).ready(function(){
	
});



</script>
<iframe id="phpframe" name="phpframe" width="0" height="0" marginwidth="0" frameborder="0" src="about:blank"></iframe>
</body>
</html>