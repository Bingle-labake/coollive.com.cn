<?php /* Smarty version 2.6.27, created on 2014-04-11 13:38:31
         compiled from sk_admin/activity/index.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'sk_admin/activity/index.tpl', 13, false),)), $this); ?>
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
  <td>标题：<input name="keyword" type="text" id="keyword" value="<?php echo $this->_tpl_vars['search']['keyword']; ?>
" size="26" />
      &nbsp;&nbsp;&nbsp;
                发布时间：<input type="text" id="push_st" name="push_st" onClick="WdatePicker({dateFmt:'yyyy-MM-dd 00:00'})"  class="Wdate" size="20" value="<?php echo $this->_tpl_vars['search']['push_st']; ?>
" />
      <input type="text" id="push_et" name="push_et" onClick="WdatePicker({dateFmt:'yyyy-MM-dd 23:59'})"  class="Wdate" size="20" value="<?php echo $this->_tpl_vars['search']['push_et']; ?>
" />
      &nbsp;&nbsp;&nbsp;
                赛事类型：   <select name="a_type" id="a_type">
               <option value="">-类型-</option>
               <option value=1 <?php if ($this->_tpl_vars['search']['a_type'] == 1): ?>selected="selected"<?php endif; ?>>视频</option>
               <option value=2 <?php if ($this->_tpl_vars['search']['a_type'] == 2): ?>selected="selected"<?php endif; ?>>图片</option>
             </select>
      &nbsp;&nbsp;&nbsp;
                 状态：   <select name="is_pub" id="is_pub">
               <option value="">-状态-</option>
               <option value=1>-已发布-</option>
               <option value=0>-未发布-</option>
             </select>
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
  &nbsp;<input type="button" name="<?php echo $this->_tpl_vars['all_act']['act']; ?>
" data="{url:'<?php echo $this->_tpl_vars['all_act']['href']; ?>
'}" value="<?php echo $this->_tpl_vars['all_act']['name']; ?>
"/>&nbsp;&nbsp;
  <?php endforeach; endif; unset($_from); ?>
  </td>
</tr>

<tr>
  <th width="50">编号</th> 
  <th width="200">标题</th> 
  <th width="250">主办方</th>  
  <th width="100">比赛地点</th> 
   <th width="100">开始/结束时间</th>
  <th width="100">发布时间</th>  
  <th width="60">参赛人数</th> 
  <th width="60">类型</th> 
  <th width="60">状态</th> 
  <th width="300">操作</th>
</tr>

<?php $_from = $this->_tpl_vars['activity_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['activity']):
?>
 <tr id="tr_<?php echo $this->_tpl_vars['activity']['id']; ?>
">
   <td><input type="checkbox" value=<?php echo $this->_tpl_vars['activity']['id']; ?>
 name="allbox[]" /><?php echo $this->_tpl_vars['activity']['id']; ?>
</td>   

   <td ><a href="<?php echo $this->_tpl_vars['www_domain']; ?>
/look/detail/<?php echo $this->_tpl_vars['activity']['id']; ?>
" target="_blank"><?php echo $this->_tpl_vars['activity']['longtitle']; ?>
</a><?php if ($this->_tpl_vars['activity']['is_best'] >= 1): ?>[<font color=red>荐</font>]<?php endif; ?>
   <br />
   <img alt="" style="width: 30px; height: 30px;" src="<?php echo $this->_tpl_vars['img_path']; ?>
<?php echo $this->_tpl_vars['activity']['image']; ?>
"> 
   <img alt="" style="width: 30px; height: 30px;" src="<?php echo $this->_tpl_vars['img_path']; ?>
<?php echo $this->_tpl_vars['activity']['logo']; ?>
">
   </td>
   
   <td><?php echo $this->_tpl_vars['activity']['host']; ?>
</td>  
   <td><?php echo $this->_tpl_vars['activity']['site']; ?>
</td>  
   <td><?php echo $this->_tpl_vars['activity']['starttime']; ?>
<br /><?php echo $this->_tpl_vars['activity']['endtime']; ?>
</td>  
   <td><?php echo $this->_tpl_vars['activity']['pubtime']; ?>
</td> 
   <td><span align="center"><?php echo $this->_tpl_vars['activity']['join_num']; ?>
</span></td> 
   <td><span align="center"><?php if ($this->_tpl_vars['activity']['a_type'] == 1): ?>视频<?php else: ?>图片<?php endif; ?></span></td> 
   <td ><span id="status_<?php echo $this->_tpl_vars['activity']['id']; ?>
"><?php echo $this->_tpl_vars['activity']['status']; ?>
</span></td>        
   <td align="center">
   <?php $_from = $this->_tpl_vars['activity']['action_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
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

<div id="div_transfer" style="display:none">  
    <div class="div_transfer_body">
    <div style="width:700px;">
      <div class="cla_transfer_activity">
      </div>
      <div class="cla_transfer_category">
                       选择推荐栏目:
                      <select id="topic_id" name="topic_id">
                        <?php echo $this->_tpl_vars['search']['channel_options']; ?>

                       </select>
						  <input name="ids" type="hidden" value="" />
                          <input name="transer_btn" type="button" value="推    荐" /></span>
    </div>
    </div>
</div>
   
</div>

<script> 
function submitTo(url,action){
	var title = "栏目管理";
	if(action == "add") {
		title += "->添加";
	}
	if(action == "edit") {
		title += "->修改";
	}
	if(action == "show") {
		title += "->预览";
	}
	$.ajax({
		type: "post",
		url: url,
		data: {ajax:1},
		dataType: "html",
		success: function(res) {
			var throughBox = $.dialog.through;
            var myDialog = throughBox({title:title,lock:true});
            myDialog.content(res);
		}
		});
}

$('.cla_remove').live('click', function() {
	var parent = $(this).parent();
	var _data = $(this).attr("data");	
	_data = eval("("+_data+")");
    if(_data.act == "remove" && confirm("是否确定删除？")) {
		post_api(ADMIN_FOLDER+"/activity/remove?re_type=json", {id:_data.id}, function(res) {
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

function select_recommend(ids) {
    $('input[name="ids"]').val(ids);
    var html = $('#div_transfer').html();
    show_dialog('赛事推荐', html);
}

//提交推荐
$('input[name="transer_btn"]').live('click', function() {
    var ids = $('input[name="ids"]').val();
    var topic_id = $('select[name="topic_id"]').val();
    if(ids != '' && topic_id>0) {        
         var id_arr = ids.split(',');
        
         for (i=0;i<id_arr.length ;i++ ) {   
             var id = id_arr[i];   
             
             post_api(ADMIN_FOLDER+"/activity/best?re_type=json", {id:id, topic_id:topic_id}, function(res) {
				if(typeof(res.code) != "undefined" && res.code>0) {
				    $('#status_'+id).html($('#status_'+id).html()+',<font color=red>推荐成功</font>');
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
        if(topic_id>0) {
            alert('你还没有选择推荐的赛事！');
        }else {
            alert('你需要推荐到某一个频道！');
        }        
    }
										 
});

function object_push() {
	$('input[name="allbox[]"]').each(function() {
		if ($(this).is(":checked")) {
			var id = $(this).val();
			post_api(ADMIN_FOLDER+"/activity/push?re_type=json", {id:id}, function(res) {
				if(typeof(res.code) != "undefined" && res.code>0) {
					var tdObj = $('#tr_'+id).children().last();
					$('#status_'+id).html("已发布");
				    //tdObj.find('.cla_check').remove();
				    //parent.append('<a href="javascript:void(0);" class="cla_forbid" data="{act:\'forbid\', id:'+id+'}">停止</a>  ');			
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
}

$('input[type="button"]').click(function() {
	var act = $(this).attr("name");
	if(act == "push" && confirm("是否确定批量发布？")) {
		object_push();
	}
	if(act == "best") {
	    var ids = '';
	    $('input[name="allbox[]"]:checked').each(function() {	
	        if(ids == '') {
	            ids = $(this).val();
	        }else {
	            ids += ','+$(this).val();
	        }
	    });
	    if(ids != '') {
	        select_recommend(ids);
	    }else {
	        alert('请选择需要推荐的赛事！');
	    }		
	}
	if(act == "channel_unbest" && confirm("是否确定取消频道推荐？")) {
		$('input[name="allbox[]"]:checked').each(function() {		
			var id = $(this).val();
			post_api(ADMIN_FOLDER+"/activity/unchannel?re_type=json", {id:id}, function(res) {
				if(typeof(res.code) != "undefined" && res.code>0) {
					$('#status_'+id).html("频道取消");
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
	if(act == "all_check") {
		$('input[name="allbox[]"]:checked').each(function() {		
			var id = $(this).val();
			post_api(ADMIN_FOLDER+"/activity/check?re_type=json", {id:id}, function(res) {
				if(typeof(res.code) != "undefined" && res.code>0) {					
					var tdObj = $('#tr_'+id).children().last();
					
					$('#status_'+id).html("已审核");		
					tdObj.find('.cla_check').remove();
				    tdObj.append('<a href="javascript:void(0);" class="cla_forbid" data="{act:\'forbid\', id:'+id+'}">停止</a>  ');				
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
});
</script>
<iframe id="phpframe" name="phpframe" width="0" height="0" marginwidth="0" frameborder="0" src="about:blank"></iframe>
</body>
</html>
