<?php /* Smarty version 2.6.27, created on 2014-04-09 11:03:08
         compiled from sk_admin/systemConfig/website.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'sk_admin/systemConfig/website.tpl', 12, false),)), $this); ?>
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

<form method="post" name="thevalueform" id="theform" action="<?php echo $this->_tpl_vars['page']['action']; ?>
" onSubmit="return btn_submit(this,'add')" enctype="multipart/form-data">
<div class="colorarea01">
</div>
<a name="base"></a><div class="colorarea02">

<h2>设置</h2>

<table cellspacing="0" cellpadding="0" width="100%"  class="maintable">
<tr>
<th>站点名称</th>
<td>
<input name="site_name" type="text" id="site_name" onblur="initBrandIndex(this.value)" value="<?php echo $this->_tpl_vars['website']['site_name']; ?>
" size="30" maxlength="64" /></td>
</tr>

<tr>    
    <th>网站LOGO</th>    
    <td>
    <div>
      <div >
      <div ><img id="img_logo" src="<?php echo $this->_tpl_vars['img']['path']['brand']; ?>
<?php echo $this->_tpl_vars['website']['site_logo']; ?>
" width="180px" <?php if ($this->_tpl_vars['website']['site_logo'] == ""): ?>style="display:none"<?php endif; ?> height="200px" id="img_logo" /><input name="site_logo" type="text" id="site_logo" value="<?php echo $this->_tpl_vars['website']['site_logo']; ?>
" /></div>
      </div>  
      <div> 
       <span>
      <input id="logoToUpload" name="logoToUpload" size="20" type="file" onchange="return ajaxFileUpload('site_logo', 'logoToUpload');">
      </span></div>
    </td>    
    </tr>

<tr>
  <th>站点标题</th>
  <td><input name="site_title" type="text" id="site_title" value="<?php echo $this->_tpl_vars['website']['site_title']; ?>
" size="80" maxlength="64" /></td>
</tr>

<tr>

<th>SEO关键词</th>
<td><span class="require-field">
  <input name="site_keywords" type="text" id="site_keywords" value="<?php echo $this->_tpl_vars['website']['site_keywords']; ?>
" size="80" maxlength="128" />
</span></td>
</tr>

<tr>
<th>SEO描述</th>
<td><span class="require-field">
  <textarea name="site_description" cols="80" rows="5" id="site_description"><?php echo $this->_tpl_vars['website']['site_description']; ?>

  </textarea>
</span></td>
</tr>
  <th>静态资源域</th>
  <td><span class="require-field">
    <input name="jscss_domains" type="text" id="jscss_domain" value="<?php echo $this->_tpl_vars['website']['jscss_domains']; ?>
" size="80" maxlength="128" />
(默认为空，与网站同域;多个域之间用&quot;,&quot;号隔开)</span></td>
</tr>
<th>图片域</th>
  <td><span class="require-field">
    <input name="images_domains" type="text" id="images_domain" value="<?php echo $this->_tpl_vars['website']['images_domains']; ?>
" size="80" maxlength="128" />
  (默认为空，与网站同域;多个域之间用&quot;,&quot;号隔开)</span></td>
</tr>

<tr>  
  <th>联系邮箱</th>  
  <td><span class="require-field">
    <input name="manager_email" type="text" id="manager_email" value="<?php echo $this->_tpl_vars['website']['manager_email']; ?>
" size="30" maxlength="64" />
  </span></td>  
</tr>

<tr>  
  <th>URL重写</th>
  <td><input type="radio" name="url_rewrite" value="1" id="url_rewrite_0" <?php if ($this->_tpl_vars['website']['url_rewrite'] == 1): ?>checked="checked"<?php endif; ?> /> 是 <input name="url_rewrite" type="radio" id="url_rewrite_1" value="0" <?php if ($this->_tpl_vars['website']['url_rewrite'] == 0): ?>checked="checked"<?php endif; ?> /> 否
    </td>
</tr>

<tr>

<th>开启后台日志</th>

<td><span class="require-field">
  <input type="radio" name="manager_log" value="1" id="manager_log_2" <?php if ($this->_tpl_vars['website']['manager_log'] == 1): ?>checked="checked"<?php endif; ?> />
是
<input name="manager_log" type="radio" id="manager_log_3" value="0" <?php if ($this->_tpl_vars['website']['manager_log'] == 0): ?>checked="checked"<?php endif; ?> />
否 </span></td>


</tr>

<tr>
  
  <th>开启评论</th>
  <td><input type="radio" name="open_comments" value="1" id="open_comments_0" <?php if ($this->_tpl_vars['website']['open_comments'] == 1): ?>checked="checked"<?php endif; ?> /> 是 <input name="open_comments" type="radio" id="open_comments_1" value="0" <?php if ($this->_tpl_vars['website']['open_comments'] == 0): ?>checked="checked"<?php endif; ?> /> 否
    </td>
</tr>

<tr>

<th>开启注册</th>

<td><span class="require-field">
  <input type="radio" name="open_regist" value="1" id="open_regist_2" <?php if ($this->_tpl_vars['website']['open_regist'] == 1): ?>checked="checked"<?php endif; ?> />
是
<input name="open_regist" type="radio" id="open_regist_3" value="0" <?php if ($this->_tpl_vars['website']['open_regist'] == 0): ?>checked="checked"<?php endif; ?> />
否 </span>
<p>
限制条件：同一IP多长时间<input name="regist_t" type="text" id="regist_t" value="<?php echo $this->_tpl_vars['website']['regist_t']; ?>
" size="8" maxlength="10" />(小时)最多注册<input name="regist_count" type="text" id="regist_count" value="<?php echo $this->_tpl_vars['website']['regist_count']; ?>
" size="8" maxlength="10" />次.
</p>
</td>
</tr>

<tr>
<th>ip黑名单</th>
<td>
<textarea name="ip_blacklist" cols="80" rows="5" ><?php echo $this->_tpl_vars['website']['ip_blacklist']; ?>
</textarea> 逗号隔开
</td>
</tr>

<tr>
<th>分享审核设置</th>
<td><span class="require-field">
  <input type="radio" name="share_firstcheck" value="1" id="share_firstcheck_2" <?php if ($this->_tpl_vars['website']['share_firstcheck'] == 1): ?>checked="checked"<?php endif; ?> />
先审后发
<input name="share_firstcheck" type="radio" id="share_firstcheck_3" value="0" <?php if ($this->_tpl_vars['website']['share_firstcheck'] == 0): ?>checked="checked"<?php endif; ?> />
先发后审 </span></td>
</tr>

<tr>
<th>评论审核设置</th>
<td><span class="require-field">
  <input type="radio" name="comment_firstcheck" value="1" id="comment_firstcheck_2" <?php if ($this->_tpl_vars['website']['comment_firstcheck'] == 1): ?>checked="checked"<?php endif; ?> />
先审后发
<input name="comment_firstcheck" type="radio" id="comment_firstcheck_3" value="0" <?php if ($this->_tpl_vars['website']['comment_firstcheck'] == 0): ?>checked="checked"<?php endif; ?> />
先发后审 </span></td>
</tr>

<tr>
  
  <th>页面底部内容</th>
  
  <td><span class="require-field">
    <!-- 编辑器 -->
    <script type="text/javascript" src="/raylisay/views/Static/Ckeditor/ckeditor.js"></script>
    <script type="text/javascript" src="/raylisay/views/Static/Ckfinder/ckfinder.js"></script>
    <textarea id="FOOTER_HTML_editor" name="FOOTER_HTML"><?php echo $this->_tpl_vars['website']['FOOTER_HTML']; ?>
</textarea>
    <script type="text/javascript">var FOOTER_HTML_editor =CKEDITOR.replace("FOOTER_HTML_editor",{"width":"96%","height":"130px","toolbar":"Default"}) ;CKFinder.setupCKEditor(FOOTER_HTML_editor,"/raylisay/views/Static/Ckfinder") ;</script></span></td>
  
  
</tr>
</table>



</div>



	<div class="buttons">
        <input name="app_name" type="hidden" value="website" />
        <input name="site_tmpl" type="hidden" value="<?php echo $this->_tpl_vars['website']['site_tmpl']; ?>
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

function btn_submit(obj, str_acttype){	
	return true;
}


</script>
<script>

var isUpload = false;
var SITE_PATH= "/api/upload" ;

function ajaxFileUpload(handle, uploadID){
	if(!isUpload) {
		isUpload = true;
		$.ajaxFileUpload({
			url:SITE_PATH+'/website?ajax=1&re_type=json&uploadID='+uploadID,
			secureuri:false,
			fileElementId:uploadID,
			dataType: 'json',
			success: function(result){
				if(result.code > 0) {
					if(handle == "site_logo") {
						$('#img_logo').attr("src", result.info.path+'/'+result.info.saveName);
						$('input[name="site_logo"]').val(result.info.path+'/'+result.info.saveName);	
						$('#img_logo').css({"display":"block"});					
					}								
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