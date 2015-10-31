<?php /* Smarty version 2.6.27, created on 2014-04-09 10:34:14
         compiled from sk_admin/prototype/index.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'sk_admin/prototype/index.tpl', 13, false),)), $this); ?>
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
<script language="javascript" type="text/javascript" src="/public/assets/js/datepicker/WdatePicker.js"></script>
<script type="text/javascript" src="/public/assets/js/base.js"></script>
<script type="text/javascript" src="/public/assets/js/ui/jquery.artDialog.js?skin=default"></script>
<script>
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

<form method="get" name="searchform" id="searchForm" action="<?php echo $this->_tpl_vars['page']['action_search']; ?>
"> 
<fieldset>
    <legend>条件搜索</legend>
<table cellspacing="2" cellpadding="2" class="topsearch">
<tr>
  <td>名字：<input name="name" type="text" id="name" value="<?php echo $this->_tpl_vars['search']['name']; ?>
" size="26" />
      &nbsp;&nbsp;&nbsp;
               分类：<select id="p_cid" name="p_cid">
           <?php echo $this->_tpl_vars['search']['cate_options']; ?>

           </select>
       &nbsp;&nbsp;&nbsp;        
  </td>  
</tr>

<tr>
  <td colspan="4" style="text-align:center">
    <input name="id" type="hidden" value="<?php echo $this->_tpl_vars['search']['id']; ?>
" />
    <input type="submit" name="search_submit" value="查   询"/></td>
</tr>
</table>
</fieldset>           
</form>

<form method="post" name="listform" id="theform" action="">
 <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "sk_admin/pages.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?> 
<table cellspacing="0" cellpadding="0" width="100%" id="checklist"  class="listtable">
 <tr>
  <td><input type="checkbox" name="chkall" onclick="checkAll('checklist','allbox')" />全部</td>
  <td colspan="16">
  <?php $_from = $this->_tpl_vars['all_action']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['all_act']):
?>  
  <?php if ($this->_tpl_vars['all_act']): ?>
  &nbsp;<input type="button" name="<?php echo $this->_tpl_vars['all_act']['act']; ?>
" data="{url:'<?php echo $this->_tpl_vars['all_act']['href']; ?>
'}" value="<?php echo $this->_tpl_vars['all_act']['name']; ?>
"/>&nbsp;&nbsp;
  <?php endif; ?>  
  <?php endforeach; endif; unset($_from); ?>
  </td>
</tr>

<tr>
  <th width="50">编号</th> 
  <th width="120">名字</th> 
  <th width="120">分类</th>  
  <th width="100">描述</th> 
   <th width="80">原型图片</th>
  <th width="300">操作</th>
</tr>

<?php $_from = $this->_tpl_vars['prototype_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['prototype']):
?>
 <tr id="tr_<?php echo $this->_tpl_vars['prototype']['id']; ?>
">
   <td><input type="checkbox" value=<?php echo $this->_tpl_vars['prototype']['id']; ?>
 name="allbox[]" /><?php echo $this->_tpl_vars['prototype']['id']; ?>
</td>  
   <td ><a href="/star/show/<?php echo $this->_tpl_vars['prototype']['id']; ?>
" target="_blank"><?php echo $this->_tpl_vars['prototype']['name']; ?>
</a>  </td>
   <td><?php echo $this->_tpl_vars['prototype']['cate_name']; ?>
</td>  
   <td><pre><?php echo $this->_tpl_vars['prototype']['desc']; ?>
</pre></td>  
   <td><img src="<?php echo $this->_tpl_vars['img_path']; ?>
<?php echo $this->_tpl_vars['prototype']['pic_name']; ?>
" width="100" height="100" /></td>     
   <td align="center">
   <?php $_from = $this->_tpl_vars['prototype']['action_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['action']):
?>
       <?php if ($this->_tpl_vars['action']['ajax']): ?>
       <a href="javascript:void(0);" class="cla_<?php echo $this->_tpl_vars['action']['ajax']['act']; ?>
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
</table>
 <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "sk_admin/pages.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>  
</form>
<br>
<div id="footer">

</div>
</div>

<script> 
$('.cla_remove').live('click', function() {
	var parent = $(this).parent();
	var _data = $(this).attr("data");	
	_data = eval("("+_data+")");
    if(_data.act == "remove" && confirm("是否确定删除？")) {
		post_api(ADMIN_FOLDER+"/prototype/remove?re_type=json", {id:_data.id}, function(res) {
			if(typeof(res.code) != "undefined" && res.code>0) {
				$('#tr_'+_data.id).remove();	
			}else {
				try {
					if(res.msg.auto_redirect) {
						$.dialog.tips("你没有相应的操作权限!");
					}else {
						$.dialog.tips(res.error);
					}
				}catch(ex) {
					$.dialog.tips(res.error);
				}			
			}			 
		});	
	}	   										 
});

$('.cla_forbid').live('click', function() {
	var parent = $(this).parent();
	var _data = $(this).attr("data");	
	_data = eval("("+_data+")");
    if(_data.act == "forbid" && confirm("是否确定停用？")) {
		post_api(ADMIN_FOLDER+"/prototype/forbid?re_type=json", {id:_data.id}, function(res) {
			if(typeof(res.code) != "undefined" && res.code>0) {
			    var tdObj = $('#tr_'+_data.id).children().last();
					$('#status_'+_data.id).html("已停用");
				    tdObj.find('.cla_forbid').remove();
				    parent.append('<a href="javascript:void(0);" class="cla_check" data="{act:\'check\', id:'+_data.id+'}">启用</a>  ');	
			}else {
				try {
					if(res.msg.auto_redirect) {
						$.dialog.tips("你没有相应的操作权限!");
					}else {
						$.dialog.tips(res.error);
					}
				}catch(ex) {
					$.dialog.tips(res.error);
				}			
			}			 
		});	
	}	   										 
});

$('.cla_check').live('click', function() {
	var parent = $(this).parent();
	var _data = $(this).attr("data");	
	_data = eval("("+_data+")");
    if(_data.act == "check" && confirm("是否确定启用？")) {
		post_api(ADMIN_FOLDER+"/prototype/check?re_type=json", {id:_data.id}, function(res) {
			if(typeof(res.code) != "undefined" && res.code>0) {
			    var tdObj = $('#tr_'+_data.id).children().last();
					$('#status_'+_data.id).html("有效");
				    tdObj.find('.cla_check').remove();
				    parent.append('<a href="javascript:void(0);" class="cla_forbid" data="{act:\'forbid\', id:'+_data.id+'}">停用</a>  ');	
			}else {
				try {
					if(res.msg.auto_redirect) {
						$.dialog.tips("你没有相应的操作权限!");
					}else {
						$.dialog.tips(res.error);
					}
				}catch(ex) {
					$.dialog.tips(res.error);
				}			
			}			 
		});	
	}	   										 
});

</script>
<iframe id="phpframe" name="phpframe" width="0" height="0" marginwidth="0" frameborder="0" src="about:blank"></iframe>
</body>
</html>
