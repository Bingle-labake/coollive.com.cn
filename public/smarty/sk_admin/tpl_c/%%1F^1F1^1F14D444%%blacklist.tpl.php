<?php /* Smarty version 2.6.27, created on 2014-04-09 11:53:00
         compiled from sk_admin/member/blacklist.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'sk_admin/member/blacklist.tpl', 13, false),)), $this); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Administrator's Control Panel</title>
<link type="text/css" rel="stylesheet" href="<?php echo $this->_tpl_vars['template_style_dir']; ?>
/style.css" />
<link type="text/css" rel="stylesheet" href="<?php echo $this->_tpl_vars['template_style_dir']; ?>
/edit.css" />
<script src="/public/assets/js/jquery-1.8.2.js"></script>
<script language="javascript" type="text/javascript" src="/public/assets/js/datepicker/WdatePicker.js"></script>
<script type="text/javascript" src="/public/assets/js/ui/jquery.artDialog.js?skin=default"></script>
<script type="text/javascript" src="/public/assets/js/base.js"></script>
<script>
var search_role_id = <?php echo ((is_array($_tmp=@$this->_tpl_vars['search']['role_group'])) ? $this->_run_mod_handler('default', true, $_tmp, 0) : smarty_modifier_default($_tmp, 0)); ?>
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
<form method="get" name="searchform" id="theform" action="<?php echo $this->_tpl_vars['page']['action_search']; ?>
">
 <fieldset>
    <legend>条件搜索</legend>
      <table cellspacing="0" cellpadding="0" width="100%"  class="topsearch">
       
      <tr><td> 
      用户<input type="text" name="username" size="16" value="<?php echo $this->_tpl_vars['search']['username']; ?>
" />
      邮箱<input type="text" name="email" size="20" value="<?php echo $this->_tpl_vars['search']['email']; ?>
" />
      会员组：
          <select id="group" name="group">
          <option value="">--全部--</option>
          <?php echo $this->_tpl_vars['search']['group_options']; ?>

      </select>
      
      注册时间：<input type="text" name="st" onClick="WdatePicker({dateFmt:'yyyy-MM-dd 00:00'})"  class="Wdate" size="28" value="<?php echo $this->_tpl_vars['search']['st']; ?>
" />
              ~
              <input type="text" name="et" onClick="WdatePicker({dateFmt:'yyyy-MM-dd 23:59'})"  class="Wdate" size="27" value="<?php echo $this->_tpl_vars['search']['et']; ?>
" />
         
         
         <select id="order" name="order">
           <option value="">默认排序</option>
           <option value="regdate" >上传时间</option>
           <option value="credits" >当前积分</option>
           <option value="hcredits" >总积分</option>
           <option value="work_videos" >视频数</option>
           <option value="work_pics" >图片数</option>
           <option value="votes" >直投数</option>
           <option value="lottery" >抽奖数</option>
       </select>
       <select id="sc" name="sc">
          <option value="DESC" >降序</option>
          <option value="ASC" >升序</option>
       </select>
          <input type="hidden" name="status" value="<?php echo $this->_tpl_vars['search']['status']; ?>
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
  <th width="50">id</th>
  <th width="120">用户名</th>
  <th width="50">头像</th>
  <th width="150">EMAIL</th>
  <th width="100">会员组</th>
  <th width="80">当前/总积分</th>
  <th width="120">视频/图片数</th>   
  <th width="50">直投数</th>
  <th width="50">抽奖数</th>
  <th width="80">状态</th> 
  <th width="140">注册时间</th>    
  <th width="120">操作</th>
</tr>

<?php $_from = $this->_tpl_vars['member_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['member']):
?>
 <tr id="tr_<?php echo $this->_tpl_vars['member']['uid']; ?>
" <?php if ($this->_tpl_vars['member']['status'] < 0): ?>style="background-color:#ccc"<?php endif; ?>>   
   <td><?php if ($this->_tpl_vars['member']['status'] >= 0): ?><input type="checkbox" value=<?php echo $this->_tpl_vars['member']['uid']; ?>
 name="allbox[]" /><?php endif; ?>
   <?php echo $this->_tpl_vars['member']['uid']; ?>
</td>
   <td><?php echo $this->_tpl_vars['member']['username']; ?>

   <?php if ($this->_tpl_vars['member']['tid'] > 0): ?>
   [<font color="#FF0000">团</font>]
   <?php endif; ?>
   </td>
   <td><img src="/space/upload/avatar?uid=<?php echo $this->_tpl_vars['member']['uid']; ?>
&size=small" width="50" height="50" /></td>
   <td><?php echo $this->_tpl_vars['member']['email']; ?>
</td>
   <td><?php echo $this->_tpl_vars['member']['grouptitle']; ?>
</td>
   <td><?php echo $this->_tpl_vars['member']['credits']; ?>
/<?php echo $this->_tpl_vars['member']['hcredits']; ?>
</td>
   <td><?php echo $this->_tpl_vars['member']['work_videos']; ?>
/<?php echo $this->_tpl_vars['member']['work_pics']; ?>
</td>
   
   <td><?php echo $this->_tpl_vars['member']['votes']; ?>
</td>
   <td><?php echo $this->_tpl_vars['member']['lottery']; ?>
</td>
   
   <td><span id="status_<?php echo $this->_tpl_vars['member']['uid']; ?>
"><?php echo $this->_tpl_vars['member']['status_text']; ?>
</span></td>
   <td><?php echo $this->_tpl_vars['member']['regdate']; ?>
</td>
      
   <td align="center">
   <?php $_from = $this->_tpl_vars['member']['action_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['action']):
?>
       <?php if ($this->_tpl_vars['action']['ajax']): ?>
       &nbsp;<a href="javascript:void(0);" class="cla_<?php echo $this->_tpl_vars['action']['ajax']['act']; ?>
" data="<?php echo $this->_tpl_vars['action']['ajax']['data']; ?>
"><?php echo $this->_tpl_vars['action']['name']; ?>
</a> &nbsp;&nbsp; &nbsp;&nbsp;  
       
       <?php else: ?>
       &nbsp; <a href="<?php echo $this->_tpl_vars['action']['href']; ?>
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
var html = '<div class="cla_pushblack"><input name="uids" type="hidden" value="" /><input name="pushBlackbtn" type="button" value="确        定" /></div>';
function show_pushBlack(uids) {	
	show_dialog("拉黑锁定", html);
	$('input[name="uids"]').val(uids);
}

$('.cla_all_pushBlack').click(function() {
	var uids = "";
	$('input[name="allbox[]"]').each(function() {
		if($(this).attr("checked")) {
			if(uids == "") {
				uids = $(this).val();
			}else {
				uids += ","+$(this).val();
			}
		}
	});
	if(uids != "") {
		show_pushBlack(uids);
	}else {
		alert("你还没有选择用户!");
	}	
});

$('input[name="pushBlackbtn"]').live("click", function() {
	var _uids   = $('input[name="uids"]').val();
	
	if(_uids!="") {	    
		var uids_arr = _uids.split(",");
		for(var i=0;i<uids_arr.length;i++) {
			var data = {act:"locking", uid:uids_arr[i]}
			post_api(ADMIN_FOLDER+"/member/black?re_type=json", data, function(res) {
				if(typeof(res.code) != "undefined" && res.code>0) {
				    $('#tr_'+data.uid).css("background-color","#ccc");
					$('#status_'+data.uid).html("锁定");	
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
				close_dialog();			 
			});
		}
	}else {
	    alert("没有选择任何用户");	
	}
});

$('.cla_remove').live('click', function() {
	var parent = $(this).parent();
	var _data = $(this).attr("data");	
	_data = eval("("+_data+")");
    if(_data.act == "remove" && confirm("是否确定删除？")) {
		post_api(ADMIN_FOLDER+"/member/remove?re_type=json", {uid:_data.uid}, function(res) {
			if(typeof(res.code) != "undefined" && res.code>0) {
				$('#tr_'+_data.uid).remove();	
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

$('.cla_unlocking').live('click', function() {
	var parent = $(this).parent();
	var _data = $(this).attr("data");	
	_data = eval("("+_data+")");
    if(_data.act == "unlocking" && confirm("是否确定解锁？")) {
		post_api(ADMIN_FOLDER+"/member/black?re_type=json", {act:"unlocking", uid:_data.uid}, function(res) {
			if(typeof(res.code) != "undefined" && res.code>0) {
				$('#tr_'+_data.uid).css("background-color","");
				$('#status_'+_data.uid).html("正常");	
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
