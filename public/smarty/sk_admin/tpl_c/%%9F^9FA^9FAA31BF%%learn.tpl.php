<?php /* Smarty version 2.6.27, created on 2014-04-09 10:28:32
         compiled from sk_admin/words/learn.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'sk_admin/words/learn.tpl', 12, false),)), $this); ?>
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
  <th width="150">训练词</th>
  <th width="200">属性值</th>
  <th width="70">记录时间</th>  
  <th width="60">操作</th>
</tr>

<?php $_from = $this->_tpl_vars['learn_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['learn']):
?>
 <tr id="tr_<?php echo $this->_tpl_vars['learn']['id']; ?>
">
   <td><input type="checkbox" value=<?php echo $this->_tpl_vars['learn']['id']; ?>
 name="allbox[]" /><?php echo $this->_tpl_vars['learn']['id']; ?>
</td>   
   <td><?php echo $this->_tpl_vars['learn']['word']; ?>
</td>  
   <td><pre><?php echo $this->_tpl_vars['learn']['value']; ?>
</pre></td>   
   <td ><?php echo $this->_tpl_vars['learn']['record_time']; ?>
</td>   
   <td align="center">
   <?php $_from = $this->_tpl_vars['learn']['action_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['action']):
?>
       <?php if ($this->_tpl_vars['action']['ajax']): ?>
       <a href="javascript:void(0);" class="learn_<?php echo $this->_tpl_vars['action']['ajax']['act']; ?>
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
				var data = {id:$(this).val()};
				remove_words(data);
			}
		});
	}
});

$('.words_remove').live('click', function() {
	var parent = $(this).parent();
	var _data = $(this).attr("data");	
	_data = eval("("+_data+")");
    if(_data.act == "remove" && confirm("是否确定删除？")) {
		remove_words(_data);
	}	   										 
});


function remove_words(data) {
	post_api(ADMIN_FOLDER+"/words/remove?re_type=json", data, function(res) {
		if(typeof(res.code) != "undefined" && res.code>0) {
			$('#tr_'+data.id).remove();	
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


$('input[type="button"]').live('click', function() {	
	if($(this).attr("data") != "") {
		if($(this).attr("name") == "spam" && confirm("是否确定选择的关键词为垃圾词？")) {
			$('input[name="allbox[]"]:checked').each(function() {		
			    var id = $(this).val();
			    post_api(ADMIN_FOLDER+"/words/leaning/spam?re_type=json", {id:id}, function(res) {
				    if(typeof(res.code) != "undefined" && res.code>0) {
				        $.dialog.tips('<font color="red">'+res.msg+'</font>');
				    	$('#tr_'+id).remove();
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
	        });	
		}
		if($(this).attr("name") == "ham") {
			$('input[name="allbox[]"]:checked').each(function() {		
			    var id = $(this).val();
			    post_api(ADMIN_FOLDER+"/words/leaning/ham?re_type=json", {id:id}, function(res) {
				    if(typeof(res.code) != "undefined" && res.code>0) {
				        $.dialog.tips(res.msg);
				    	$('#tr_'+id).remove();
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
	        });			   			
		}			
	}								  
})
.css({"cursor":"pointer"});
</script>
<iframe id="phpframe" name="phpframe" width="0" height="0" marginwidth="0" frameborder="0" src="about:blank"></iframe>
</body>
</html>
