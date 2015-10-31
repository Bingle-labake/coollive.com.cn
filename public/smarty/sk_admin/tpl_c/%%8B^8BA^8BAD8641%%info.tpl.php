<?php /* Smarty version 2.6.27, created on 2014-04-11 09:22:59
         compiled from sk_admin/activity/info.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'sk_admin/activity/info.tpl', 14, false),)), $this); ?>
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
<script type="text/javascript" src="/public/assets/js/base.js"></script>
<script type="text/javascript" src="/public/assets/js/ui/jquery.artDialog.js?skin=default"></script>
<script type="text/javascript" src="/public/assets/js/ajaxfileupload.js"></script>
<script type="text/javascript">
var BASE_URL     = "<?php echo ((is_array($_tmp=@$this->_tpl_vars['BASE_URL'])) ? $this->_run_mod_handler('default', true, $_tmp, "") : smarty_modifier_default($_tmp, "")); ?>
";
var ADMIN_FOLDER = "<?php echo ((is_array($_tmp=@$this->_tpl_vars['ADMIN_FOLDER'])) ? $this->_run_mod_handler('default', true, $_tmp, "") : smarty_modifier_default($_tmp, "")); ?>
";

var a_type = <?php echo ((is_array($_tmp=@$this->_tpl_vars['activity']['a_type'])) ? $this->_run_mod_handler('default', true, $_tmp, 0) : smarty_modifier_default($_tmp, 0)); ?>
;
var g_type = ',<?php echo ((is_array($_tmp=@$this->_tpl_vars['activity']['g_type'])) ? $this->_run_mod_handler('default', true, $_tmp, '') : smarty_modifier_default($_tmp, '')); ?>
,';
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

<h2>编辑</h2>

<table cellspacing="0" cellpadding="0" width="100%"  class="maintable">
<tr>
<th>赛事标题(<font color=red>*</font>)</th>
<td>
<input name="longtitle" type="text" id="longtitle" value="<?php echo $this->_tpl_vars['activity']['longtitle']; ?>
" size="80" maxlength="64" /></td>
</tr>


<tr>
  <th>短标题</th>
  <td><input name="shorttitle" type="text" id="shorttitle" value="<?php echo $this->_tpl_vars['activity']['shorttitle']; ?>
" size="30" maxlength="30" /></td>
</tr>

<tr>
  <th>访问路径</th>
  <td><input name="path" type="text" id="path" value="<?php echo $this->_tpl_vars['activity']['path']; ?>
" size="30" maxlength="30" /> 注：路径填写方式[如：saiku/video]</td>
</tr>

<tr>
  <th>赛事类型</th>
  <td>
  <select name="a_type">
    <option>-选择类型-</option>
    <option value=1 <?php if ($this->_tpl_vars['activity']['a_type'] == 1): ?>selected="selected"<?php endif; ?>>视频</option>
    <option value=2 <?php if ($this->_tpl_vars['activity']['a_type'] == 2): ?>selected="selected"<?php endif; ?>>图片</option>
  </select>
  </td>
</tr>

<tr>
  <th></th>
  <td>
 <div class="select_type"></div>
  </td>
</tr>

<tr>    
    <th>赛事LOGO(<font color=red>*</font>)</th>    
    <td>
    <div>
      <div >
      <div ><img id="logo" src="<?php echo $this->_tpl_vars['img_path']; ?>
<?php echo $this->_tpl_vars['activity']['logo']; ?>
" width="180px" <?php if ($this->_tpl_vars['activity']['logo'] == ""): ?>style="display:none"<?php endif; ?> height="200px" id="logo" /><input name="logo" type="text" id="logo" value="<?php echo $this->_tpl_vars['activity']['logo']; ?>
" /></div>
      </div>  
      <div> 
       <span>
      <input id="logoToUpload" name="logoToUpload" size="20" type="file" onchange="return ajaxFileUpload('logo', 'logoToUpload');">
      </span></div>
    </td>    
</tr>

<tr>    
    <th>赛事图片(<font color=red>*</font>)</th>    
    <td>
    <div>
      <div >
      <div ><img id="image" src="<?php echo $this->_tpl_vars['img_path']; ?>
<?php echo $this->_tpl_vars['activity']['image']; ?>
" width="180px" <?php if ($this->_tpl_vars['activity']['image'] == ""): ?>style="display:none"<?php endif; ?> height="200px" id="image" /><input name="image" type="text" id="image" value="<?php echo $this->_tpl_vars['activity']['image']; ?>
" /></div>
      </div>  
      <div> 
       <span>
      <input id="logoToUpload1" name="logoToUpload1" size="20" type="file" onchange="return ajaxFileUpload('image', 'logoToUpload1');">
      </span></div>
    </td>    
</tr>

<tr>
<th>赛事描述</th>
<td><span class="require-field">
  <!-- 编辑器-->
    <script type="text/javascript" src="/app/views/Static/Ckeditor/ckeditor.js"></script>
    <script type="text/javascript" src="/app/views/Static/Ckfinder/ckfinder.js"></script>
    <textarea id="introduction_editor" name="introduction"><?php echo $this->_tpl_vars['activity']['introduction']; ?>
</textarea>
    <script type="text/javascript">var introduction_editor =CKEDITOR.replace("introduction_editor",{"width":"96%","height":"130px","toolbar":"Default"}) ;CKFinder.setupCKEditor(introduction_editor,"/app/views/Static/Ckfinder") ;</script></span>
</span></td>
</tr> 

<tr>
<th>附件信息</th>
<td><span class="require-field">
    <!-- 编辑器-->
    <script type="text/javascript" src="/app/views/Static/Ckeditor/ckeditor.js"></script>
    <script type="text/javascript" src="/app/views/Static/Ckfinder/ckfinder.js"></script>
    <textarea id="accessory_editor" name="accessory"><?php echo $this->_tpl_vars['activity']['accessory']; ?>
</textarea>
    <script type="text/javascript">var accessory_editor =CKEDITOR.replace("accessory_editor",{"width":"96%","height":"130px","toolbar":"Default"}) ;CKFinder.setupCKEditor(accessory_editor,"/app/views/Static/Ckfinder") ;</script></span>
</span></td>
</tr> 

<tr>  
  <th>比赛时间(<font color=red>*</font>)</th>  
  <td><span class="require-field">
    <input name="starttime" type="text" id="starttime" onClick="WdatePicker({dateFmt:'yyyy-MM-dd 00:00:00'})"  class="Wdate" value="<?php echo $this->_tpl_vars['activity']['starttime']; ?>
" size="30" maxlength="64" />
    ~
    <input name="endtime" type="text" id="endtime" onClick="WdatePicker({dateFmt:'yyyy-MM-dd 23:59:59'})"  class="Wdate" value="<?php echo $this->_tpl_vars['activity']['endtime']; ?>
" size="30" maxlength="64" />
  </span></td>  
</tr>

<tr>  
  <th>作者</th>
  <td><input name="author" type="text" id="site" value="<?php echo $this->_tpl_vars['activity']['author']; ?>
" size="30" maxlength="64" />
    </td>
</tr>

<tr>  
  <th>主办方(<font color=red>*</font>)</th>
  <td><input name="host" type="text" id="host" value="<?php echo $this->_tpl_vars['activity']['host']; ?>
" size="80" maxlength="128" />
    </td>
</tr>

<tr>  
  <th>承办方(<font color=red>*</font>)</th>
  <td><input name="undertake" type="text" id="undertake" value="<?php echo $this->_tpl_vars['activity']['undertake']; ?>
" size="80" maxlength="128" />
    </td>
</tr>

<tr>  
  <th>比赛地址</th>
  <td><input name="site" type="text" id="site" value="<?php echo $this->_tpl_vars['activity']['site']; ?>
" size="80" maxlength="128" />
    </td>
</tr>
</table>

</div>



	<div class="buttons">
        <input name="id" type="hidden" value="<?php echo $this->_tpl_vars['activity']['id']; ?>
" />
        <input type="submit" value=" 确定 " class="submit" />
        <input type="reset" value=" 重置 " class="submit" />	

	</div><a name="dir"></a><div class="colorarea03">
<br>

<div id="footer">


</div>

</div>

</form>

<script>
$('select[name="a_type"]').change(function() {
    init_options($(this).val());
});


function init_options(type) {
    type = parseInt(type);
    switch(type) {
        case 1:video_category();break;
        case 2:photo_prototype();break;;
        default:$('.select_type').html('');break;
    }
}

function video_category() {
    post_api(ADMIN_FOLDER+"/category/get?re_type=json", {parent_id:10}, function(res) {
		if(typeof(res.category_list) != "undefined") {
			var list = res.category_list;
		    var html = '选择舞蹈类型：';
		    for(var i in list){
		        if(g_type.indexOf(','+list[i].id+',')>=0) {		            
		            html += '<input type="checkbox" name="type[]" value="'+list[i].id+'" checked />  '+list[i].category;
		        }else {
		            html += '<input type="checkbox" name="type[]" value="'+list[i].id+'" />  '+list[i].category;
		        }
            } 
            $('.select_type').html(html);		
            
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

function photo_prototype() {
	post_api(ADMIN_FOLDER+"/prototype_cate/get?re_type=json", {parent_id:0, isChild:1}, function(res) {
		if(typeof(res.prototype_cate_list) != "undefined") {
		    var list = res.prototype_cate_list;
		    var html = '选择COSPLAY：';
		    for(var i in list){
		        if(g_type.indexOf(','+list[i].id+',')>=0) {		            
		            html += '<input type="checkbox" name="type[]" value="'+list[i].id+'" checked />  '+list[i].name;
		        }else {
		            html += '<input type="checkbox" name="type[]" value="'+list[i].id+'" />  '+list[i].name;
		        }
            } 
            $('.select_type').html(html);			
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

function btn_submit(obj, str_acttype){	
	return true;
}

var isUpload = false;
var SITE_PATH= "/api/upload" ;

$(document).ready(function() {
    init_options(a_type);
});

function ajaxFileUpload(handle, uploadID){
	if(!isUpload) {
		isUpload = true;
		$.ajaxFileUpload({
			url:SITE_PATH+'/activity?ajax=1&re_type=json&uploadID='+uploadID,
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
</body>

</html>