<?php /* Smarty version 2.6.27, created on 2014-04-09 11:19:43
         compiled from sk_admin/category/index.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'sk_admin/category/index.tpl', 12, false),)), $this); ?>
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
<script type="text/javascript" src="/public/assets/js/ui/jquery.artDialog.js?skin=default"></script>
<script type="text/javascript" src="/public/assets/js/base.js"></script>
<script> 
var BASE_URL     = "<?php echo ((is_array($_tmp=@$this->_tpl_vars['BASE_URL'])) ? $this->_run_mod_handler('default', true, $_tmp, "") : smarty_modifier_default($_tmp, "")); ?>
";
var ADMIN_FOLDER = "<?php echo ((is_array($_tmp=@$this->_tpl_vars['ADMIN_FOLDER'])) ? $this->_run_mod_handler('default', true, $_tmp, "") : smarty_modifier_default($_tmp, "")); ?>
";

var search_code = "<?php echo ((is_array($_tmp=@$this->_tpl_vars['search']['search_code'])) ? $this->_run_mod_handler('default', true, $_tmp, '') : smarty_modifier_default($_tmp, '')); ?>
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
    分类查询<select id="id_1" name="id[]">
    <option value="">--一级分类--</option>
    </select>
    
     <input type="submit" name="viewsubmit" value="浏览" /></td>
     </tr>
     </table>
</fieldset>
</form>
 
<form method="post" name="listform" id="theform" action="" enctype="multipart/form-data">
 <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "sk_admin/pages.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?> 
<table cellspacing="0" cellpadding="0" width="100%"  class="listtable">
<tr>
  <th  width="100">分类ID</th>
  <th width="160">分类名称</th>
  <th width="160">二级[父类]</th>
  <th width="160">三级[父类]</th>
  <th>分类编码</th>
  <th>类型</th>
  <th>视频数</th>
  <th width="160">操作</th>
</tr>

<?php $_from = $this->_tpl_vars['category_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['category']):
?>
 <tr id="tr_<?php echo $this->_tpl_vars['category']['id']; ?>
">
   <td>&nbsp;<?php echo $this->_tpl_vars['category']['id']; ?>
</td>
   <?php if ($this->_tpl_vars['category']['level'] == 1): ?>
   <td width="160"><?php echo $this->_tpl_vars['category']['category']; ?>
</td>
   <td width="160">&nbsp;</td>
   <td width="160">&nbsp;</td>
   <?php endif; ?>
   
   <?php if ($this->_tpl_vars['category']['level'] == 2): ?>
   <td width="160">&nbsp;</td>   
   <td width="160"><?php echo $this->_tpl_vars['category']['category']; ?>
[<?php echo $this->_tpl_vars['category']['parent_name']; ?>
]</td>
   <td width="160">&nbsp;</td>
   <?php endif; ?>
   
   <?php if ($this->_tpl_vars['category']['level'] == 3): ?>
   <td width="160">&nbsp;</td>
   <td width="160">&nbsp;</td>
   <td width="160"><?php echo $this->_tpl_vars['category']['category']; ?>
[<?php echo $this->_tpl_vars['category']['parent_name']; ?>
]</td>
   <?php endif; ?>
   
   <td>&nbsp;<?php echo $this->_tpl_vars['category']['cid']; ?>
</td>   
   <td>
   <?php if ($this->_tpl_vars['category']['type'] == 1): ?>
   系统
   <?php else: ?>
   编辑
   <?php endif; ?>
   </td>
   <td>&nbsp;<?php echo $this->_tpl_vars['category']['v_num']; ?>
</td>
   <td align="center">
   <?php $_from = $this->_tpl_vars['category']['action_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['action']):
?>
       <?php if ($this->_tpl_vars['action']['ajax']): ?>
       <a href="javascript:void(0);" class="category_<?php echo $this->_tpl_vars['action']['ajax']['act']; ?>
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
<iframe id="phpframe" name="phpframe" width="0" height="0" marginwidth="0" frameborder="0" src="about:blank"></iframe>
<script> 

$('.category_remove').live('click', function() {
	var parent = $(this).parent();
	var _data = $(this).attr("data");	
	_data = eval("("+_data+")");
    if(_data.act == "remove" && confirm("是否确定删除？")) {
		post_api(ADMIN_FOLDER+"/category/remove?re_type=json", {id:_data.id}, function(res) {
			if(res.code>0) {
				$('#tr_'+_data.id).remove();
			}else {
				try {
					if(res.msg.auto_redirect) {
						//弹出浮动
						alert("你没有相应的操作权限!");
					}else {
						alert(res.error);
					}
				}catch(ex) {
					alert(res.error);
				}							
			}			 
		});	
	}	   										 
});


function setViews(bid,views,elm){
	var count=prompt("请输入修改后的浏览数","");
	if(count!=null&&count!="undefined")
	{
		$.ajax({
		type: "post",
		url: ADMIN_FOLDER+"/brand/setviews",
		data: "bid="+bid+"&count="+count+"&"+Math.random(),
		success: function(msg){
			alert("修改成功");
			$("#span"+elm).html(count);
		}
		});
	}
	
}

function optionsChange(obj, id, parent_id) {
	post_api(ADMIN_FOLDER+'/category/get', {id:id,parent_id:parent_id}, function(res) {
	  var cate_options = '<option value="">--商品分类--</option>';
      if(res.category_list) {
		  for(var k in res.category_list) {
			  var curr_id = res.category_list[k].id+","; 
			  if(search_code.indexOf(curr_id)>=0) {
				  cate_options += '<option value="'+res.category_list[k].id+'" selected="selected">'+res.category_list[k].category+'</option>';
				  optionsChange('id_2', "", res.category_list[k].id);
			  }else {
				  cate_options += '<option value="'+res.category_list[k].id+'">'+res.category_list[k].category+'</option>';
			  }			 
          }
	  }
	  $('#'+obj).html(cate_options);
    });
}

$(document).ready(function(){
    optionsChange('id_1', "", "");
    $('#id_1').live('change', function() {
		  var parent_id = $(this).val();
		  optionsChange('id_2', "", parent_id);
	});
});
</script>
</body>
</html>
