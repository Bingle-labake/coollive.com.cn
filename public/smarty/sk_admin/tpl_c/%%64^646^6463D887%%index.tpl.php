<?php /* Smarty version 2.6.27, created on 2014-04-09 11:54:33
         compiled from sk_admin/sign/index.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'sk_admin/sign/index.tpl', 15, false),)), $this); ?>
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
<script type="text/javascript" src="/public/assets/js/utils.js"></script>
<script type="text/javascript" src="/public/assets/js/template.min.js"></script>
<script type="text/javascript">
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
    <table cellspacing="0" cellpadding="0" width="100%"  class="topsearch"> 
        <tr><td>
    用户姓名:<input type="text" name="realname" size="20" value="<?php echo $this->_tpl_vars['search']['realname']; ?>
" />     
    用户ID/昵称:<input type="text" name="username" size="20" value="<?php echo $this->_tpl_vars['search']['username']; ?>
" /> 
    手机号:<input type="text" name="mobile" size="20" value="<?php echo $this->_tpl_vars['search']['mobile']; ?>
" /> 
    
    <select id="order" name="order">
    <option value="">默认排序</option>
    <option value="adddate" >上传时间</option>
    <option value="duration" >播放时间</option>
    </select>
    
    <select id="sc" name="sc">
    <option value="DESC" >降序</option>
    <option value="ASC" >升序</option>
    </select>
    <input type="submit" name="viewsubmit" value="浏览" />
          </td></tr>
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
  <td><input type="checkbox" name="chkall" onclick="checkAll('checklist','allGoodsbox')" />全部</td>
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
  <th  width="50">ID</th>
  <th width="300">真实姓名<br />在校证明</th>
  <th width="160">用户昵称</th>
  <th width="160">手机号</th>  
  <th width="160">身份证号 </th>
  <th width="160">性别</th>
  <th width="160">出生年月</th> 
  <th width="160">院校</th> 
  <th width="160">参赛形式</th> 
  <th width="160">参赛名称</th> 
  <th width="160">团队名称</th> 
  <th width="160">报名时间</th> 
  <th width="160">操作</th>
</tr>

<?php $_from = $this->_tpl_vars['sign_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['sign']):
?>
 <tr class="tr_<?php echo $this->_tpl_vars['sign']['id']; ?>
">
   <td><input type="checkbox" value=<?php echo $this->_tpl_vars['sign']['id']; ?>
 name="allGoodsbox[]" />&nbsp;<?php echo $this->_tpl_vars['sign']['id']; ?>

</td>
   
   <td><a href="#<?php echo $this->_tpl_vars['sign']['vid']; ?>
" target="_blank" ><?php echo $this->_tpl_vars['sign']['realname']; ?>
<a><br /><img src="<?php echo $this->_tpl_vars['sign']['thumbimg']; ?>
" height="120px" width="120px" /></td>
   <td><span id="span2"><?php echo $this->_tpl_vars['sign']['username']; ?>
</span></td>
   <td width="160"><span id="span2"><?php echo $this->_tpl_vars['sign']['mobile']; ?>
</span></td>
   <td><span><?php echo $this->_tpl_vars['sign']['idcard']; ?>
</td>
   <td><span><?php echo $this->_tpl_vars['sign']['gender']; ?>
</span></td>
   <td><span><?php echo $this->_tpl_vars['sign']['birthyear']; ?>
-<?php echo $this->_tpl_vars['sign']['birthmonth']; ?>
-<?php echo $this->_tpl_vars['sign']['birthday']; ?>
</span></td>
   <td><span><?php echo $this->_tpl_vars['sign']['colname']; ?>
</span></td>
   <td><span><?php echo $this->_tpl_vars['sign']['efname']; ?>
</span></td>
   <td><span><?php echo $this->_tpl_vars['sign']['enname']; ?>
</span></td>
   <td><span><?php echo $this->_tpl_vars['sign']['tname']; ?>
</span></td>
   <td><span><?php echo $this->_tpl_vars['sign']['dateline']; ?>
</span></td>
   <td align="center">
   <?php $_from = $this->_tpl_vars['sign']['action_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['action']):
?>
       <?php if ($this->_tpl_vars['action']['ajax']): ?>
       <a href="javascript:void(0);" class="sign_<?php echo $this->_tpl_vars['action']['ajax']['act']; ?>
" data="<?php echo $this->_tpl_vars['action']['ajax']['data']; ?>
"><?php echo $this->_tpl_vars['action']['name']; ?>
</a> <br />  
       
       <?php else: ?>
        <a href="<?php echo $this->_tpl_vars['action']['href']; ?>
"><?php echo $this->_tpl_vars['action']['name']; ?>
</a> <br /> 
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

<script> 
//重置按钮
$('input[name="sign_reset"]').click(function() {
    reset_search();
});

var max_level = 0;
var split_arr = new Array(2,2,2,3);
var throughBox = $.dialog.through;
 var myDialog = null;

function show_div(handleID) {
    $("#"+handleID).css("left",($(window).width()-500)/2);
	$("#"+handleID).css("top",($(document).height()-300)/2+$(document).scrollTop());
	$("#"+handleID).css("display","block");	
}

$('.close_div').click(function() {
	var handle = $(this).attr("data");
	hide_div("div_"+handle)
});

function hide_div(handleID) {
	$("#"+handleID).css("display","none");	
}

$('.sign_check').live('click', function() {
	var sign_data = $(this).attr("data");	
	sign_data = eval("("+sign_data+")");
	var html = ' <div id="div_check"><input name="check_access" onclick="signCheck(\'access\', '+sign_data.sign_id+')" type="button" value="审核通过" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name="check_noaccess" onclick="signCheck(\'noaccess\', '+sign_data.sign_id+')" type="button" value="审核不通过" /></div> ';
	show_dialog("商品审核", html);
});

function signCheck(act, sign_id) {
    var data = {};
    if(act == "access") {
		data = {sign_id:sign_id, access:1};		
	}else {
		data = {sign_id:sign_id, access:-1};
	}
	post_api(ADMIN_FOLDER+"/sign/check?re_type=json", data, function(res) {
		if(res.code>0) {
			if(data.access == 1) {
				$('.tr_'+sign_id).remove();	
			}else {
				var parent = $('.tr_'+sign_id).children().last();
				//$('.sign_push', parent).remove();
				//$('.sign_remove', parent).remove();				
				$('#status_'+sign_id).html('审核未通过');
			}
			$.dialog.tips("审核操作成功！");			
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
		close_dialog();			 
	});		
}

$('.sign_push').live('click', function() {
    var parent = $(this).parent();
	var sign_data = $(this).attr("data");	
	sign_data = eval("("+sign_data+")");
    if(sign_data.act == "push" && confirm("是否确定发布？")) {
		post_api(ADMIN_FOLDER+"/sign/push?re_type=json", {sign_id:sign_data.sign_id}, function(res) {
			if(res.result) {
				var s_i = 0;
				var e_i = 0;
				for(var i in res.result){
					var sign_id = i;
					if(res.result[i]>0) {
						s_i++;
						$('.sign_push', parent).remove();
						$('.sign_remove', parent).remove();
						
						$('#status_'+sign_id).html('已发布');
						parent.append('<a href="javascript:void(0);" class="sign_soldout" data="{act:\'soldout\', sign_id:'+sign_id+'}">下架</a> <br /> ');						
					}else {
						e_i++;
						if(res.result[i] == -1) {
						    $('#status_'+sign_id).html('发布失败！');	
						}
						if(res.result[i] == -2) {
						    $('#status_'+sign_id).html('该商品已经下架');	
						}
						if(res.result[i] == -3) {
						    $('#status_'+sign_id).html('该商品还未通过审核');	
						}
						if(res.result[i] == -4) {
						    $('#status_'+sign_id).html('该商品已经发布');	
						}
					}
					alert("发布完成,你有"+s_i+"发布成功，"+e_i+"个商品发布失败！");												
				}
			}				 
		});	
	}	   										 
});

$('.sign_remove').live('click', function() {
	var sign_data = $(this).attr("data");	
	sign_data = eval("("+sign_data+")");
    if(sign_data.act == "remove" && confirm("是否确定删除？")) {
		post_api(ADMIN_FOLDER+"/sign/remove?re_type=json", {sign_id:sign_data.sign_id}, function(res) {
			if(res.code>0) {
				$('.tr_'+sign_data.sign_id).remove();	
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

$('.sign_unpush').live('click', function() {
	var sign_data = $(this).attr("data");	
	sign_data = eval("("+sign_data+")");
    if(sign_data.act == "unpush" && confirm("是否确定取消发布？")) {
		post_api(ADMIN_FOLDER+"/sign/unpush?re_type=json", {sign_id:sign_data.sign_id}, function(res) {
			if(res.result) {
				for(var i in res.result){
					var sign_id = i;
					var parent = $('.tr_'+sign_id).children().last();					
					if(res.result[i]>0) {
						$('.sign_unpush', parent).remove();
						parent.append('<a href="javascript:void(0);" class="sign_push" data="{act:\'push\', sign_id:'+sign_id+'}">发布</a> <br /> ');							
					}
				}	
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

$('.sign_recovery').live('click', function() {
	var sign_data = $(this).attr("data");	
	sign_data = eval("("+sign_data+")");
    if(sign_data.act == "recovery" && confirm("是否确定恢复？")) {
		post_api(ADMIN_FOLDER+"/sign/RecycleBin?re_type=json", {act:"recovery", sign_id:sign_data.sign_id}, function(res) {
			if(res.code>0) {
				$('.tr_'+sign_data.sign_id).remove();	
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

$('.sign_submitcheck').live('click', function() {
	var sign_data = $(this).attr("data");	
	sign_data = eval("("+sign_data+")");
    if(sign_data.act == "submitcheck" && confirm("是否提交审核？")) {
		post_api(ADMIN_FOLDER+"/sign/submitcheck?re_type=json", {sign_id:sign_data.sign_id}, function(res) {
			if(res.code>0) {
				$('#status_'+sign_data.sign_id).html('审核中');
				parent.append('<a href="javascript:void(0);" class="sign_check" data="{act:\'check\', sign_id:'+sign_id+'}">审核</a> <br /> ');						
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

$('input[type="button"]').live('click', function() {	
	if($(this).attr("data") != "") {
		if($(this).attr("name") == "push") {
			var data = eval("("+$(this).attr("data")+")");
			var form = $("#theform").serialize();
			post_api(data.url+"?re_type=json&"+form, {}, function(res) {
				if(res.result) {
					var s_i = 0;
					var e_i = 0;
					for(var i in res.result){
						var sign_id = i;
						var tdObj = $('.tr_'+i).children().last();
						if(res.result[i]>0) {
							s_i++;
							tdObj.find('.sign_push').remove();
							tdObj.find('.sign_remove').remove();
							
							$('#status_'+sign_id).html('已发布');
							tdObj.append('<a href="javascript:void(0);" class="sign_soldout" data="{act:\'soldout\', sign_id:'+sign_id+'}">下架</a> <br /> ');						
						}else {
							e_i++;
							if(res.result[i] == -1) {
								$('#status_'+sign_id).html('发布失败！');	
							}
							if(res.result[i] == -2) {
								$('#status_'+sign_id).html('该商品已经下架');	
							}
							if(res.result[i] == -3) {
								$('#status_'+sign_id).html('该商品还未通过审核');	
							}
							if(res.result[i] == -4) {
								$('#status_'+sign_id).html('该商品已经发布');	
							}
						}
						alert("发布完成,你有"+s_i+"发布成功，"+e_i+"个商品发布失败！");												
					}
				}else {
				    if(typeof(res.error) != "undefined") {
						alert(res.error);
					}
				}
			});		
		}
		if($(this).attr("name") == "transfer") {
			var sign_ids = '';
			$('input[name="allGoodsbox[]"]:checked').each(function() {
				    sign_ids += ","+$(this).val();	
			})
			if(sign_ids != '') {
				var data = {sign_ids:""};
			    data.sign_ids = sign_ids;
				$('input[name="sign_ids"]').val(sign_ids);
				
				post_api(ADMIN_FOLDER+"/sign/get/sign?re_type=json", data, function(res) {
					if(res.sign_list) {
						$('.cla_transfer_sign').html('');
						for(var i in res.sign_list){
							var ul = '<ul><li class="item-id">'+res.sign_list[i].sign_id+'</li><li class="item-title">'+res.sign_list[i].sign_name+'</li><li class="item-category">'+res.sign_list[i].category.cate_name+'</li></ul>';
							$('.cla_transfer_sign').append(ul);										
						}
					}					
				});

	            myDialog = throughBox({title:"转移商品",lock:true});
		        var html = $('.div_transfer_body').html();
	            myDialog.content(html);
			}		
			
		}
		if($(this).attr("name") == "check") {
			var data = eval("("+$(this).attr("data")+")");
			var form = $("#theform").serialize();
           
		   var html = ' <div id="div_check"><input name="check_access" onclick="checkAllGoods(\'access\', \''+form+'\')" type="button" value="全部通过" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name="check_noaccess" onclick="checkAllGoods(\'noaccess\', \''+form+'\')" type="button" value="全部不通过" /></div> ';
	       show_dialog("批量商品审核", html);		   			
		}		
	}								  
})
.css({"cursor":"pointer"});

function checkAllGoods(act, form) {
	var url = ADMIN_FOLDER+"/sign/check?re_type=json";
	if(act == "access") {
		url += "&access=1";
	}else {
		url += "&access=-1";
	}
	url += "&"+form;
	post_api(url, {}, function(res) {
		if(res.result) {
			for(var i in res.result){
				var sign_id = i;
				if(res.result[i]>0) {					
				    var node = $('.tr_'+i);
				    node.remove();	
				}else {
					var parent = $('.tr_'+sign_id).children().last();			
				   $('#status_'+sign_id).html('审核未通过');
				}															
			}
		}else {
			if(typeof(res.error) != "undefined") {
				alert(res.error);
			}
		}
		close_dialog();
	});	
}

$(document).ready(function() {

});

//myDialog
function debugging(tobj,url,XMLHttpRequest,textStatus,errorThrown,jsfunc){
	var msg = '<table class="content_view"><tr><td width="110">Js Function:</td><td>function '+jsfunc+'(){}</td></tr>';
	msg += '<tr><td width="110">URL:</td><td>'+url+'</td></tr>';
	msg += '<tr><td>HTTP Status:</td><td>'+XMLHttpRequest.status+'</td></tr>';
	msg += '<tr><td>readyStatus:</td><td>'+XMLHttpRequest.readyState+'</td></tr>';
	msg += '<tr><td>textStatus:</td><td>'+textStatus+'</td></tr>';
	msg += '<tr><td>errorThrown:</td><td>'+errorThrown+'</td></tr>';
	msg += '<tr><td>help:</td><td>http://bbs.x6cms.com</td></tr>';
	tobj.title('error');
	tobj.content(msg);
}


function paras_replace(paras_str, key, value) {
	var path, paraes;
	if(paras_str.indexOf("?")>=0) {
		path = paras_str.substring(0,paras_str.indexOf("?")); 
		paraes = paras_str.substring(paras_str.indexOf("?")+1, paras_str.length);
		if(paraes.indexOf(key+"=")>=0) {
			var para_arr = paraes.split("&");
			paraes = "";
			for(var i=0;i<para_arr.length;i++) {
				if(para_arr[i].indexOf(key+"=")==0) {
					var kv = para_arr[i].split("=");					
					para_arr[i] = kv[0]+"="+value;
				}
				if(paraes == "") {
					paraes = para_arr[i];
				}else {
					paraes += "&"+para_arr[i];
				}				
			}
		}else {
			paraes += "&"+key+"="+value;
		}	
		return path+"?"+paraes;	
	}else {
		paras_str = paras_str+"?"+key+"="+value;
	}	
	return paras_str;
}
</script>
<iframe id="phpframe" name="phpframe" width="0" height="0" marginwidth="0" frameborder="0" src="about:blank"></iframe>
</body>
</html>
