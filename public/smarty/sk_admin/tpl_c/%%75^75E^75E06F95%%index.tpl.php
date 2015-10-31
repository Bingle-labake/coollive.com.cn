<?php /* Smarty version 2.6.27, created on 2014-04-11 13:41:28
         compiled from sk_admin/participant/index.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'sk_admin/participant/index.tpl', 15, false),)), $this); ?>
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
  报名ID:<input type="text" name="sid" size="20" value="<?php echo $this->_tpl_vars['search']['sid']; ?>
" /> 
    用户昵称:<input type="text" name="username" size="20" value="<?php echo $this->_tpl_vars['search']['username']; ?>
" /> 
    团队名称:<input type="text" name="team_name" size="20" value="<?php echo $this->_tpl_vars['search']['team_name']; ?>
" /> 
    赛事活动：<select id="activity_id" name="activity_id">
              <option value="">-选择赛事-</option>
              <?php echo $this->_tpl_vars['search']['activity_options']; ?>

           </select>
 参赛形式：<select id="cate_id" name="cate_id">
              <?php echo $this->_tpl_vars['search']['category_options']; ?>

           </select>  
           
 作品类型：<select id="wtype" name="wtype">
              <option value="">-选择-</option>
              <option value="1">视频</option>
              <option value="2">图片</option>
           </select>
              
    <select id="order" name="order">
    <option value="">默认排序</option>
    <option value="adddate" >上传时间</option>
    <option value="duration" >播放时间</option>
    <option value="r_vote" >随机票</option>
    <option value="d_vote" >直投票</option>
    <option value="vote" >总票数</option>
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
  <th  width="50">ID</th>
  <th width="300">作品</th>
  <th width="160">团队名称[用户昵称]</th>
  <th width="160">报名信息</th>  
  <th width="160">是否推荐</th>
  <th width="160">所属赛事</th>
  <th width="160">参赛类型</th>
  <th width="160">晋级组</th>
  <th width="160">参赛时间</th> 
  <th width="60">直投数</th> 
  <th width="60">随机数</th> 
  <th width="60">总票数</th> 
  <th width="160">操作</th>
</tr>

<?php $_from = $this->_tpl_vars['participant_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['participant']):
?>
 <tr class="tr_<?php echo $this->_tpl_vars['participant']['id']; ?>
">
   <td><input type="checkbox" value=<?php echo $this->_tpl_vars['participant']['id']; ?>
 name="allbox[]" />&nbsp;<?php echo $this->_tpl_vars['participant']['id']; ?>

</td>
   
   <td><a href="<?php echo $this->_tpl_vars['v_domain']; ?>
/video/play/<?php echo $this->_tpl_vars['participant']['words']['wid']; ?>
" target="_blank" ><?php echo $this->_tpl_vars['participant']['words']['title']; ?>
<a>[<?php if ($this->_tpl_vars['participant']['wtype'] == 1): ?>视频<?php else: ?>图片<?php endif; ?>]<br />
   <img src="<?php echo $this->_tpl_vars['participant']['words']['image']; ?>
" height="50px" width="50px" class="participant_thumb" data-info="{vid:'<?php echo $this->_tpl_vars['participant']['words']['vid']; ?>
', id:<?php echo $this->_tpl_vars['participant']['words']['id']; ?>
}" />   
   </td>
   <td width="160"><span id="<?php echo $this->_tpl_vars['participant']['tid']; ?>
"><?php echo $this->_tpl_vars['participant']['t_name']; ?>
</span>[<?php echo $this->_tpl_vars['participant']['username']; ?>
]</td>
   <td><span><?php echo $this->_tpl_vars['participant']['sid']; ?>
</td>
   <td><span id="status_<?php echo $this->_tpl_vars['participant']['id']; ?>
"><?php if ($this->_tpl_vars['participant']['rec'] == 1): ?>是<?php else: ?>不是<?php endif; ?></span></td>   
   
   <td><span><?php echo $this->_tpl_vars['participant']['g_name']; ?>
</span></td>
   
   <td><span><?php echo $this->_tpl_vars['participant']['cate_name']; ?>
</span></td>
   
   <td><span><?php echo $this->_tpl_vars['participant']['prom_name']; ?>
</span></td>
   <td><span><?php echo $this->_tpl_vars['participant']['create_time']; ?>
</span></td>
   <td><span><?php echo $this->_tpl_vars['participant']['d_vote']; ?>
</span></td>
   <td><span><?php echo $this->_tpl_vars['participant']['r_vote']; ?>
</span></td>
   <td><span><?php echo $this->_tpl_vars['participant']['vote']; ?>
</span></td>
   <td align="center">
   <?php $_from = $this->_tpl_vars['participant']['action_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['action']):
?>
       <?php if ($this->_tpl_vars['action']['ajax']): ?>
       <a href="javascript:void(0);" class="participant_<?php echo $this->_tpl_vars['action']['ajax']['act']; ?>
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

$('.sign_info a').bind('click', function() {
    var sid = $(this).data("info");	
    if(sid>0) {
        post_api(ADMIN_FOLDER+"/sign/get?re_type=json", {sid:sid}, function(res) {
			if(res.html) {
				show_dialog("查看报名", res.html);
			}else {
				try {
					if(res.msg.auto_redirect) {
						//弹出浮动
						$.dialog.tips("你没有相应的操作权限!");
					}else {
						$.dialog.tips(res.error);
					}
				}catch(ex) {
					$.dialog.tips(res.error);
				}
			}			 
		});	
    }else {
        $.dialog.tips("参赛异常！");
    }    	  
});

$('.participant_thumb').live('click', function() {
	var data = $(this).attr('data-info');
	participant_data = eval("("+data+")");
	var vid = participant_data.vid;
	//var html = '<div><center><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="600" height="400" id="cc_'+vid+'"><param name="movie" value="http://union.bokecc.com/flash/single/9610FEEDA921B997_'+vid+'"_false_94567D5CE8782BB0_1/player.swf" /><param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" /><embed src="http://union.bokecc.com/flash/single/9610FEEDA921B997_'+vid+'"_false_94567D5CE8782BB0_1/player.swf" width="600" height="400" name="cc_'+vid+'"" allowFullScreen="true" allowScriptAccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"/></object></center>';
	var html = '<div><center><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="490" height="260" id="cc_'+vid+'">    <param name="movie" value="http://union.bokecc.com/flash/single/9610FEEDA921B997_'+vid+'_false_94567D5CE8782BB0_1/player.swf" />    <param name="allowFullScreen" value="true" />    <param name="allowScriptAccess" value="always" />    <embed src="http://union.bokecc.com/flash/single/9610FEEDA921B997_'+vid+'_false_94567D5CE8782BB0_1/player.swf" width="490" height="260" name="cc_'+vid+'" allowFullScreen="true" allowScriptAccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"/></object></center>';
    html += ' <div id="div_check"><input name="check_access" onclick="participantCheck(\'access\', '+participant_data.id+')" type="button" value="审核通过" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name="check_noaccess" onclick="participantCheck(\'noaccess\', '+participant_data.id+')" type="button" value="审核不通过" /></div></div>';
	show_dialog("查看视频", html);
}).css({"cursor":"pointer"});

$('.participant_check').live('click', function() {
	var participant_data = $(this).attr("data");	
	participant_data = eval("("+participant_data+")");
	var html = ' <div id="div_check"><input name="check_access" onclick="participantCheck(\'access\', '+participant_data.id+')" type="button" value="审核通过" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name="check_noaccess" onclick="participantCheck(\'noaccess\', '+participant_data.id+')" type="button" value="审核不通过" /></div> ';
	show_dialog("视频审核", html);
});

$('.participant_remove').live('click', function() {
	var participant_data = $(this).attr("data");	
	participant_data = eval("("+participant_data+")");
    if(participant_data.act == "remove" && confirm("是否确定删除？")) {
		post_api(ADMIN_FOLDER+"/participant/remove?re_type=json", {id:participant_data.id}, function(res) {
			if(res.code>0) {
				$('.tr_'+participant_data.id).remove();	
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

//晋级操作
$('.participant_promotion').live('click', function() {
	var participant_data = $(this).attr("data");	
	participant_data = eval("("+participant_data+")");
    if(participant_data.act == "promotion" && confirm("是否确定晋级？")) {
		post_api(ADMIN_FOLDER+"/participant/promotion?re_type=json", {id:participant_data.id}, function(res) {
			if(res.code>0) {			    
				show_dialog("晋级操作", "晋级成功！");
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

$('.participant_submitcheck').live('click', function() {
	var participant_data = $(this).attr("data");	
	participant_data = eval("("+participant_data+")");
    if(participant_data.act == "submitcheck" && confirm("是否提交审核？")) {
		post_api(ADMIN_FOLDER+"/participant/submitcheck?re_type=json", {id:participant_data.id}, function(res) {
			if(res.code>0) {
				$('#status_'+participant_data.id).html('审核中');
				parent.append('<a href="javascript:void(0);" class="participant_check" data="{act:\'check\', id:'+id+'}">审核</a> <br /> ');						
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

function select_recommend(ids) {
    $('input[name="ids"]').val(ids);
    var html = $('#div_transfer').html();
    show_dialog('参赛推荐', html);
}

//提交推荐
$('input[name="transer_btn"]').live('click', function() {
    var ids = $('input[name="ids"]').val();
    var topic_id = $('select[name="topic_id"]').val();
    if(ids != '' && topic_id>0) {        
         var id_arr = ids.split(',');
        
         for (i=0;i<id_arr.length ;i++ ) {   
             var id = id_arr[i];   
             
             post_api(ADMIN_FOLDER+"/participant/best?re_type=json", {id:id, topic_id:topic_id}, function(res) {
				if(typeof(res.code) != "undefined" && res.code>0) {
				    $('#status_'+id).html('<font color=red>推荐成功</font>');
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

$('input[type="button"]').click(function() {
	var act = $(this).attr("name");
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
	        alert('请选择需要推荐的参赛！');
	    }		
	}
	if(act == "channel_unbest" && confirm("是否确定取消参赛推荐？")) {
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
});
</script>
<iframe id="phpframe" name="phpframe" width="0" height="0" marginwidth="0" frameborder="0" src="about:blank"></iframe>
</body>
</html>
