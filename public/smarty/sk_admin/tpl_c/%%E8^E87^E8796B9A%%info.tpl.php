<?php /* Smarty version 2.6.27, created on 2014-04-11 11:54:49
         compiled from sk_admin/roleNode/info.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'sk_admin/roleNode/info.tpl', 13, false),)), $this); ?>
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
<script type="text/javascript">
var rn_code = "<?php echo ((is_array($_tmp=@$this->_tpl_vars['roleNode']['rn_code'])) ? $this->_run_mod_handler('default', true, $_tmp, "") : smarty_modifier_default($_tmp, "")); ?>
";
var rn_name = "<?php echo ((is_array($_tmp=@$this->_tpl_vars['roleNode']['rn_name'])) ? $this->_run_mod_handler('default', true, $_tmp, "") : smarty_modifier_default($_tmp, "")); ?>
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

<form method="post" name="thevalueform" id="theform" action="<?php echo $this->_tpl_vars['page']['action']; ?>
" onSubmit="return btn_submit(this,'add')" enctype="multipart/form-data">
<div class="colorarea01">
</div>
<a name="base"></a><div class="colorarea02">

<h2>添加项目</h2>

<table cellspacing="0" cellpadding="0" width="100%"  class="maintable">

<tr>
  
  <th>节点类型</th>
  
  <td><input type="radio" name="type" <?php if ($this->_tpl_vars['roleNode']['rn_code']): ?>readonly="readonly"<?php endif; ?> value="2" id="type_0" <?php if ($this->_tpl_vars['roleNode']['type'] == 2): ?>checked="checked"<?php endif; ?> />
      模块 &nbsp;&nbsp;&nbsp;&nbsp;
      <input type="radio" name="type" <?php if ($this->_tpl_vars['roleNode']['rn_code']): ?>readonly="readonly"<?php endif; ?> value="1" id="type_1" <?php if ($this->_tpl_vars['roleNode']['type'] == 1): ?>checked="checked"<?php endif; ?>/>
      链接节点
  </td>
</tr>

 <tr>    
   <th>上级模块</th>    
   <td>
     <select name="parent_rn_code" id="parent_rn_code">    
       <option value="">-选择父级模块-</option>
       <?php echo $this->_tpl_vars['roleNode']['root_options']; ?>

     </select>
   </td>    
 </tr>
<tr>
<th>模块/链接</th>
<td><input name="rn_name" type="text" id="rn_name" value="<?php echo $this->_tpl_vars['roleNode']['rn_name']; ?>
" size="20" maxlength="64" />
  (<font color="red">如:模块授权：goods_crawl、goods、role</font>) </td>
</tr>

<tr>

<th>模块/链接名称</th>

<td><input name="rn_nick" type="text" id="rn_nick" value="<?php echo $this->_tpl_vars['roleNode']['rn_nick']; ?>
" size="20" maxlength="64" />     
             如:商品、抓取商品、角色</td>

</tr>

<tr>
  
  <th>动作授权</th>
  
  <td>
  <?php $_from = $this->_tpl_vars['roleNode']['action_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['action']):
?>   
       <input type="checkbox" name="action[]" value="<?php echo $this->_tpl_vars['action']['act']; ?>
:<?php echo $this->_tpl_vars['action']['name']; ?>
"  /><?php echo $this->_tpl_vars['action']['name']; ?>
&nbsp;&nbsp;&nbsp;&nbsp;
   <?php endforeach; endif; unset($_from); ?> 
  </td>
</tr>

 <tr>    
   <th>所属导航</th>    
   <td><select name="navi_id" id="navi_id">
     <?php echo $this->_tpl_vars['roleNode']['navi_options']; ?>

   </select></td>    
 </tr>
  
<th>排序</th>

<td><span class="require-field">
  <input name="sort" type="text" id="sort" value="<?php echo $this->_tpl_vars['roleNode']['sort']; ?>
" size="20" maxlength="64" />
</span></td>

</tr>

</table>



</div>



	<div class="buttons">
        <input name="rn_code" type="hidden" value="<?php echo $this->_tpl_vars['roleNode']['rn_code']; ?>
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

$(document).ready(function() {
			if(rn_code != "" || rn_name != "") {
				var data = {rn_code:rn_code,rn_name:rn_name, fileds:"action,node"};
				post_api(ADMIN_FOLDER+'/roleNode/get', data, function(res) {
					if(res.roleNode) {	
					    for(var o in res.roleNode.action){  
							$('input[name="action[]"][value="'+res.roleNode.action[o].act+':'+res.roleNode.action[o].name+'"]').attr("checked",true);
						}
					}
				});
			}
});

$('.node_add_btn').live('click', function() {
	var node_url = $('input[name="node_url"]').val();
	var node_name = $('input[name="node_name"]').val();
	if(node_url != "" && node_name != "") {
		$('.ul_node_list').append('<li><input type="checkbox" checked="checked" name="node[]" value="'+node_url+':'+node_name+'" /> <a href="'+node_url+'">'+node_name+'</a></li>');	
		$('input[name="node_url"]').val("");
		$('input[name="node_name"]').val("");
	}	
});

function btn_submit(obj, str_acttype){	
	return true;
}


</script>

</body>

</html>