<?php /* Smarty version 2.6.27, created on 2014-04-09 10:11:10
         compiled from sk_admin/login/index.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'sk_admin/login/index.tpl', 19, false),)), $this); ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>赛酷后台管理系统</title>

<link href="/public/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="/public/assets/css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css" />
<link type="text/css" href="/public/assets/css/jquery-ui.css" rel="stylesheet" />

<script type="text/javascript" src="/public/assets/js/jquery-1.4.2.mini.js"></script>
<script type="text/javascript">
<!--
//指定当前组模块URL地址 
var AJAX_LOADING = '提交请求中，请稍候...';
var AJAX_ERROR = 'AJAX请求发生错误！';
//-->

var BASE_URL     = "<?php echo ((is_array($_tmp=@$this->_tpl_vars['BASE_URL'])) ? $this->_run_mod_handler('default', true, $_tmp, "") : smarty_modifier_default($_tmp, "")); ?>
";
var ADMIN_FOLDER = "<?php echo ((is_array($_tmp=@$this->_tpl_vars['ADMIN_FOLDER'])) ? $this->_run_mod_handler('default', true, $_tmp, "") : smarty_modifier_default($_tmp, "")); ?>
";
</script>
</head>
<body>
<div class="container">
		
	<div id="js_error_container" class="alert alert-error" style="display:none;"> 
		<p id="js_error"></p>
	</div>
	
	<div id="js_note_container" class="alert alert-note" style="display:none;">
		
	</div>
	
	
	</div>		

<div class="container">
		
	
<style type="text/css">
	body {
		margin-top:50px;
	}
</style>

<div class="row">
	
	<div class="span4 offset4 well">
		<div style="text-align:center;">
            <div id="resultMsg"></div>
		</div>
	
	<form action="<?php echo $this->_tpl_vars['login']['action']; ?>
" name="login" id="login" method="post" accept-charset="utf-8">	
    <fieldset>
		<label for="username"><?php echo $this->_tpl_vars['LANG']['username']; ?>
</label>
		<input type="text" name="username" value="" class="span4"  />		
		<label for="password"><?php echo $this->_tpl_vars['LANG']['Password']; ?>
</label>
		<input type="password" name="password" value="" class="span4"  />		
		<label class="checkbox">
			<input type="checkbox" name="remember" value="true"  />			<?php echo $this->_tpl_vars['LANG']['keep_me_login_in']; ?>
		</label>
		
			<input class="btn btn-primary" type="submit" value="<?php echo $this->_tpl_vars['LANG']['login']; ?>
	"/>
		
		
		<input type="hidden" value="" name="redirect"/>
        <input type="hidden" name="ajax" value="0">
		<input type="hidden" value="submitted" name="submitted"/>
		
	</fieldset>
	</form>
<script type="text/javascript">

(function($){
	if(top.location != self.location)
	{
		top.location.href = self.location.href;
		return;
	}
	
	$("#verifyImg").click(function(){
		fleshVerify();
	});
	
	$(document).keypress(function(e){
		if(e.keyCode == 13)
		{
			login()
		}
	});
	
	$("#login").submit(function(){
		login();
		return false;
	});
});

function login()
{
	$("#resultMsg").stop().removeClass('error').addClass('loading').html(AJAX_LOADING).show();
	
	$.ajax({
		url: "<?php echo $this->_tpl_vars['login']['action']; ?>
",
		type:"POST",
		cache: false,
		data:$("#login").serialize(),
		dataType:"json",
		error: function(){
			$("#resultMsg").addClass('error').html(AJAX_ERROR).show().fadeOut(5000);
		},
		success: function(result){
			$("#resultMsg").hide();
			if(result.status==1)
				location.href = '/index';
			else
			{
				$("#resultMsg").addClass('error').html(result.info).show().fadeOut(5000);
				fleshVerify();
			}
		}
	});
}

function fleshVerify()
{
	var time = new Date().getTime();
	$("#verifyImg").attr('src',"/admin/index.php?a=verify&m=Public&type=gif&rand="+time);
}
</script>
</body>
</html>