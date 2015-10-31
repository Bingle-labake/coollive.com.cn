<?php /* Smarty version 2.6.27, created on 2014-04-08 18:56:11
         compiled from sk_admin/recommend/index.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'sk_admin/recommend/index.tpl', 16, false),)), $this); ?>
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
<script type="text/javascript" src="/public/assets/js/ajaxfileupload.js"></script>
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
    栏目：<select id="topic" name="topic">
    <?php echo $this->_tpl_vars['search']['search_options']; ?>

    </select>
    推荐类型：<select id="type" name="type">
    <option value="">-类型-</option>
    <option value=1>赛事</option>
    <option value=2>视频</option>
    <option value=4>参赛</option>
    <option value=3>图片</option>
    <option value=5>社团</option>
    <option value=6>评审</option>
    <option value=7>会员</option>
    </select>
    
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
  <td><input type="checkbox" name="chkall" onclick="checkAll('checklist','allbox')" />全部</td>
  <td colspan="16">
  <?php $_from = $this->_tpl_vars['all_action']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['all_act']):
?>  
  &nbsp;<input type="submit" name="<?php echo $this->_tpl_vars['all_act']['act']; ?>
" data="{url:'<?php echo $this->_tpl_vars['all_act']['href']; ?>
'}" value="<?php echo $this->_tpl_vars['all_act']['name']; ?>
"/>&nbsp;&nbsp;
  <?php endforeach; endif; unset($_from); ?>
  </td>
</tr>
<tr>
  <th  width="50">ID</th>
  <th width="300">标题/类型</th>
  <th width="160">推荐栏目</th>
  <th width="160">排序</th>  
  <th width="160">推荐时间</th> 
  <th width="160">操作</th>
</tr>

<?php $_from = $this->_tpl_vars['recommend_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['recommend']):
?>
 <tr class="tr_<?php echo $this->_tpl_vars['recommend']['id']; ?>
">
   <td><input type="checkbox" value=<?php echo $this->_tpl_vars['recommend']['id']; ?>
 name="allbox[]" />&nbsp;<?php echo $this->_tpl_vars['recommend']['id']; ?>

</td>
   
   <td><?php echo $this->_tpl_vars['recommend']['ex_name']; ?>
 <?php if ($this->_tpl_vars['recommend']['pic_img'] != ""): ?><a href="javascript:show_pic('<?php echo $this->_tpl_vars['img_path']; ?>
/<?php echo $this->_tpl_vars['recommend']['pic_img']; ?>
');"><img src="<?php echo $this->_tpl_vars['img_path']; ?>
/<?php echo $this->_tpl_vars['recommend']['pic_img']; ?>
" width="100" height="100" /></a><?php endif; ?></td>
   <td width="160"><span id="span2"><?php echo $this->_tpl_vars['recommend']['topic_name']; ?>
</span></td>
   <td ><input name="sort[<?php echo $this->_tpl_vars['recommend']['id']; ?>
]" type="text" size="6" value="<?php echo $this->_tpl_vars['recommend']['sort']; ?>
" /></td>
   <td><span><?php echo $this->_tpl_vars['recommend']['record_time']; ?>
</span></td>  

   <td align="center">
   <?php $_from = $this->_tpl_vars['recommend']['action_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['action']):
?>
       <?php if ($this->_tpl_vars['action']['ajax']): ?>
       <a href="javascript:void(0);" class="recommend_<?php echo $this->_tpl_vars['action']['ajax']['act']; ?>
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

<script type="text/tmpl" id="tmpl_upload">
	<div >
      <div >
       <img id="pic_img" src="<?php echo $this->_tpl_vars['img_path']; ?>
<?php echo $this->_tpl_vars['recommend']['pic_img']; ?>
" width="180px" <?php if ($this->_tpl_vars['recommend']['pic_img'] == ""): ?>style="display:none"<?php endif; ?> height="200px" id="image" /><input name="pic_img" type="text" value="<?php echo $this->_tpl_vars['recommend']['pic_img']; ?>
" /></div>
      </div>  
      <div> 
         <span>
         <input id="logoToUpload" name="logoToUpload" size="20" type="file" onchange="return ajaxFileUpload('pic_img', 'logoToUpload');">
         </span>      
      </div>      
      <input type="button" value="确定 " name="upload_submit" class="upload_submit" />      
   </div>
</script>


<script> 
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

$('.recommend_unbest').live('click', function() {
	var recommend_data = $(this).attr("data");	
	recommend_data = eval("("+recommend_data+")");
    if(recommend_data.act == "unbest" && confirm("是否确定取消推荐？")) {
		post_api(ADMIN_FOLDER+"/recommend/unbest?re_type=json", {id:recommend_data.id}, function(res) {
			if(res.code>0) {
				$('.tr_'+recommend_data.id).remove();	
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

$('.recommend_upload').live('click', function() {
	var recommend_data = $(this).attr("data");	
	recommend_data = eval("("+recommend_data+")");
	
	var html = $('#tmpl_upload').html();
	var html = html+'<div><input type="hidden" name="recommend_id" value='+recommend_data.id+' /></div>';
    show_dialog("上传推荐图", html); 										 
});

$('.upload_submit').live('click', function() {
    var rec_id  = $('input[name="recommend_id"]').val();
    var pic_img = $('input[name="pic_img"]').val();
    post_upload_img(rec_id, pic_img); 
});

function show_pic(pic_url) {
    var html = '<div><img src="'+pic_url+'" /></div>';
    show_dialog("查看推荐图", html); 	
}


function post_upload_img(rec_id, pic_img) {
    var data = {};
    data.id = rec_id;
    data.pic_img = pic_img;
    post_api(ADMIN_FOLDER+"/recommend/upload_rec?re_type=json", data, function(res) {
			if(res.code>0) {
				$.dialog.tips("上传成功！");                	
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

var isUpload = false;
var SITE_PATH= "/api/upload" ;

function ajaxFileUpload(handle, uploadID){
	if(!isUpload) {
		isUpload = true;
		$.ajaxFileUpload({
			url:SITE_PATH+'/recommend?ajax=1&re_type=json&uploadID='+uploadID,
			secureuri:false,
			fileElementId:uploadID,
			dataType: 'json',
			success: function(result){
				if(result.code > 0) {
					$('#'+handle).attr("src", result.info.path+'/'+result.info.saveName);
				    $('input[name="'+handle+'"]').val(result.info.saveName);	
					$('#'+handle).css({"display":"block"});										
				}else {
					alert(result.msg);
				}
			},
			error: function(){
				alert(".............");
			}
		});	
		isUpload = false;
	}else {		
	    alert("正在上传中....请稍等！");		
	}
	return false;	
} 

function openDialog() {
    document.getElementById("fileToUpload").click();
	return false;
}
</script>
<iframe id="phpframe" name="phpframe" width="0" height="0" marginwidth="0" frameborder="0" src="about:blank"></iframe>
</body>
</html>
