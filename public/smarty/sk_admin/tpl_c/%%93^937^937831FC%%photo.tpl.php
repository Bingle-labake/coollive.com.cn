<?php /* Smarty version 2.6.27, created on 2014-04-09 11:19:46
         compiled from sk_admin/comment/photo.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'sk_admin/comment/photo.tpl', 12, false),)), $this); ?>
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
 
<form method="get" name="searchform" id="theform" action="<?php echo $this->_tpl_vars['page']['search_action']; ?>
">
 <fieldset>
    <legend>条件搜索</legend>
    <table cellspacing="0" cellpadding="0" width="100%"  class="toptable">
 
    <tr><td> 
     关键词：<input type="text" name="keyword" size="20" value="<?php echo $this->_tpl_vars['search']['keyword']; ?>
" />   
    用户ID/昵称：<input type="text" name="username" size="20" value="" />    
   作品ID： <input type="text" name="ex_id" size="20" value="<?php echo $this->_tpl_vars['search']['ex_id']; ?>
" /> 
     状态：<select name="status">
         <option>---</option>
         <option value=1>正常</option>
         <option value=-1>被举报</option>
         <option value=a>审核中</option>  
       </select>
    <input name="type" type="hidden" value="2" />
    <input type="submit" name="viewsubmit" value="浏览" />
    </td>
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
  &nbsp;<input type="button" class="cla_all_<?php echo $this->_tpl_vars['all_act']['act']; ?>
" name="<?php echo $this->_tpl_vars['all_act']['act']; ?>
" data="{url:'<?php echo $this->_tpl_vars['all_act']['href']; ?>
'}" value="<?php echo $this->_tpl_vars['all_act']['name']; ?>
"/>&nbsp;&nbsp;
  <?php endforeach; endif; unset($_from); ?>
  </td>
</tr>

<tr>
  <th  width="50">ID</th> 
  <th width="200">评论内容</th>
  <th width="70">用户昵称</th>
  <th width="70">主题</th>
  <th width="70">回复数</th>
  <th width="80">评论时间</th>  
  <th width="80">状态</th>  
  <th width="60">操作</th>
</tr>

<?php $_from = $this->_tpl_vars['comments_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['comments']):
?>
 <tr id="tr_<?php echo $this->_tpl_vars['comments']['c_id']; ?>
">
   <td><input type="checkbox" value=<?php echo $this->_tpl_vars['comments']['c_id']; ?>
 name="allbox[]" /><?php echo $this->_tpl_vars['comments']['c_id']; ?>
</td>   
   <td><?php echo $this->_tpl_vars['comments']['content']; ?>
<?php if ($this->_tpl_vars['comments']['parent_cid'] > 0): ?>[回复了:<a href="#" target="_blank"><?php echo $this->_tpl_vars['comments']['p_content']; ?>
</a>]<?php endif; ?></td>  
   <td><?php echo $this->_tpl_vars['comments']['username']; ?>
</td>  
   <td><?php echo $this->_tpl_vars['comments']['ex_name']; ?>
[<?php echo $this->_tpl_vars['comments']['ex_type']; ?>
]</td>  
   <td ><?php echo $this->_tpl_vars['comments']['reply_num']; ?>
</td>      
   <td ><?php echo $this->_tpl_vars['comments']['record_time']; ?>
</td>
   <td ><span id="status_<?php echo $this->_tpl_vars['comments']['c_id']; ?>
"><?php if ($this->_tpl_vars['comments']['status'] == 0): ?>失效<?php elseif ($this->_tpl_vars['comments']['status'] == -1): ?>被举报<?php else: ?>正常<?php endif; ?></span></td>     
   <td align="center">
   <?php $_from = $this->_tpl_vars['comments']['action_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['action']):
?>
       <?php if ($this->_tpl_vars['action']['ajax']): ?>
       <a href="javascript:void(0);" class="comments_<?php echo $this->_tpl_vars['action']['ajax']['act']; ?>
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
 <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "sk_admin/pages.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
</table> 
</form>
<br>
<div id="footer">

</div>
</div>

<script> 
$('.cla_all_remove').live("click", function() {
	if(confirm("是否确定批量删除？")) {
		$('input[name="allbox[]"]').each(function() {
			if($(this).attr("checked")) {
				var data = {_id:$(this).val()};
				remove_comments(data);
			}
		});
	}
});

$('.comments_remove').live('click', function() {
	var parent = $(this).parent();
	var _data = $(this).attr("data");	
	_data = eval("("+_data+")");
    if(_data.act == "remove" && confirm("是否确定删除？")) {
		remove_comments(_data);
	}	   										 
});

$('.comments_check').live('click', function() {
	var parent = $(this).parent();
	var _data = $(this).attr("data");	
	_data = eval("("+_data+")");
    if(_data.act == "check" && confirm("是否确定通过？")) {
		post_api(ADMIN_FOLDER+"/comment/check?re_type=json", _data, function(res) {
		    if(typeof(res.code) != "undefined" && res.code>0) {
		    	$('#status_'+_data.c_id).html('正常');	
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

function remove_comments(data) {
	post_api(ADMIN_FOLDER+"/comment/remove?re_type=json", data, function(res) {
		if(typeof(res.code) != "undefined" && res.code>0) {
			$('#tr_'+data._id).remove();	
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
</script>
<iframe id="phpframe" name="phpframe" width="0" height="0" marginwidth="0" frameborder="0" src="about:blank"></iframe>
</body>
</html>
