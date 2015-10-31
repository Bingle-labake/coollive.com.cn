<?php /* Smarty version 2.6.27, created on 2014-04-09 10:36:25
         compiled from sk_admin/role/info.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'sk_admin/role/info.tpl', 13, false),)), $this); ?>
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
<script type="text/javascript" src="/public/assets/js/base.js"></script>
<script>
var role_id = <?php echo ((is_array($_tmp=@$this->_tpl_vars['role']['role_id'])) ? $this->_run_mod_handler('default', true, $_tmp, 0) : smarty_modifier_default($_tmp, 0)); ?>
;

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
" onSubmit="return btn_submit(this,'add')">
<div class="colorarea01">
</div>
<a name="base"></a><div class="colorarea02">

<h2>添加角色</h2>

<table cellspacing="0" cellpadding="0" width="100%"  class="maintable">
<tr>
<th>角色名称</th>
<td><input name="role_name" value="<?php echo $this->_tpl_vars['role']['role_name']; ?>
" type="text" size="30" maxlength="64"/>
             <span class="require-field">*             
             </span>
             上级角色：
             <select name="parent_id" id="parent_id">
               <?php echo $this->_tpl_vars['role']['options']; ?>

             </select></td>
</tr>

<tr>
  <th>启用私有</th>  
  <td>
      <input type="radio" name="is_private" value="1" id="isprivate_0" <?php if ($this->_tpl_vars['role']['is_private'] == 1): ?>checked="checked"<?php endif; ?> />
      是
      <input name="is_private" type="radio" id="isprivate_1" value="0" <?php if ($this->_tpl_vars['role']['is_private'] == 0): ?>checked="checked"<?php endif; ?> />
      不是
  </td>  
</tr>

<tr>
  <th>模块</th>
  
  <td>操作管理</td>
  
</tr>
<?php $_from = $this->_tpl_vars['role']['roleNode_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['roleNode']):
?>   
      <tr class="access-item">
        <td class="first tr" style="border-right:solid 1px #CCC;"><p><label>
        <input class="module-item" type="checkbox" name="access_model[]" value="<?php echo $this->_tpl_vars['roleNode']['rn_name']; ?>
" style="display:none"  /><span>&nbsp;<?php echo $this->_tpl_vars['roleNode']['rn_nick']; ?>
&nbsp;</span></label></p></td>
        
        <td><p>
        <label><input class="select-all" type="checkbox" />&nbsp;<span>全选</span></label>&nbsp;
        <?php $_from = $this->_tpl_vars['roleNode']['action']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['action']):
?> 
         <label><input class="action-item" type="checkbox" name="<?php echo $this->_tpl_vars['roleNode']['rn_name']; ?>
[]" value="<?php echo $this->_tpl_vars['action']['act']; ?>
" /><span>&nbsp;<?php echo $this->_tpl_vars['action']['name']; ?>
</span></label>&nbsp;&nbsp;
        <?php endforeach; endif; unset($_from); ?> 
			</p>
         </td>
       </tr>
            
<?php endforeach; endif; unset($_from); ?> 

</table>



</div>



	<div class="buttons">
        <input name="role_id" type="hidden" value="<?php echo $this->_tpl_vars['role']['role_id']; ?>
" />
        <input type="submit" value=" 确定 " class="submit" />
        <input type="reset" value=" 重置 " class="submit" />	

	</div><a name="dir"></a><div class="colorarea03">





<br>

<div id="footer">


	<!--P>Processed in 0.055780 second(s), 2 queries, Gzip enabled<br /></P-->

</div>

</div>

</form>

<script>

function btn_submit(obj, str_acttype){	
   
	return true;
}

jQuery(function($){
	$(".module-item").change(function(){
		var parent = $(this).parent().parent().parent().parent();
		if(this.checked)
		{
			$('.select-all,.action-item',parent).attr({'disabled':true,'checked':false});
		}
		else
		{
			$('.select-all,.action-item',parent).attr({'disabled':false});
		}
	});
	
	$(".select-all").change(function(){
		var parent = $(this).parent().parent().parent();
		var prev   = parent.prev();
		if(this.checked)
		{
			$('.module-item',prev).attr({'checked':true});
			$('.action-item',parent).attr({'checked':true});
		}
		else
		{
			$('.module-item',prev).attr({'checked':false});
			$('.action-item',parent).attr({'checked':false});
		}
	});
	
	$(".action-item").change(function(){
		var parent = $(this).parent().parent().parent();
		var prev   = parent.prev();
		if($(".action-item:not([checked])",parent).length == 0)
		{
			$('.module-item',prev).attr({'checked':true});
			$('.select-all',parent).attr({'checked':true});
		}
		else
		{
			if($(".action-item:[checked]",parent).length == 0) {
				$('.module-item',prev).attr({'checked':false});
			}else {			
				$('.module-item',prev).attr({'checked':true});
			}			
			$('.select-all',parent).attr({'checked':false});
		}
	});
});

$(document).ready(function() {
			if(role_id > 0) {
				var data = {role_id:role_id};
				post_api('/sk_admin/role/get', data, function(res) {
					if(res.actionNode) {
						for(var o in res.actionNode){  
						    $('.module-item').each(function() {
								if($(this).val() == o) {
									model = $(this);
									$(this).attr({'checked':true});
								}
							});
							var act_list = res.actionNode[o];
							for(var i in act_list){ 							    
								$('input[name="'+o+'[]"]').each(function() {
								    if($(this).val() == act_list[i]) {
										$(this).attr({'checked':true});
									}
								});
							}
						}
					}
				});
			}
});
			
</script>

</body>

</html>