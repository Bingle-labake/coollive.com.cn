<?php /* Smarty version 2.6.27, created on 2014-04-08 18:56:04
         compiled from sk_admin/header.tpl */ ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>赛酷</title>
<link type="text/css" rel="stylesheet" href="/app/views/sk_admin/styles/style.css" />
<script> 
function channelNav(Obj, channel) {
	var channelTabs = document.getElementById('topmenu').getElementsByTagName('a');
	for (i=0; i<channelTabs.length; i++) {
		channelTabs[i].className = '';
	}
	Obj.className = 'current';
	Obj.blur();	
}

function reload_main() {
	window.parent.mainframe.location.reload();  
}
</script>
</head>
<body id="header">
<div id="sitetitle">
	<strong>网站管理平台</strong>
	<a href="/sk_admin" target="mainframe">赛酷网</a>
 
</div>
 
<div id="topmenu">
	<ul>
    <?php $_from = $this->_tpl_vars['nav_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['key'] => $this->_tpl_vars['item']):
?>
        <li><a href="<?php echo $this->_tpl_vars['key']; ?>
" target="leftframe" onclick="channelNav(this, 'config,channel,usergroup,announcements,html,ad,edit,cron,cache,else');" class="current"><?php echo $this->_tpl_vars['item']; ?>
</a></li>
    <?php endforeach; endif; unset($_from); ?>
	</ul>
</div>
 
<div id="topinfo">
	<ul>
		<li class="sitehomelink"><a href="/admin/welcome/leftmenu?id=2" target="leftframe">查看网站首页</a></li>
        <li class="sitehomelink"><?php echo $this->_tpl_vars['manager']['admin_name']; ?>
&nbsp;</li>
        <li class="sitehomelink">&nbsp;用户组：<?php echo $this->_tpl_vars['manager']['role']['role_name']; ?>
</li>
		<li class="logout"><a href="<?php echo $this->_tpl_vars['logout']['href']; ?>
" target="_parent"><?php echo $this->_tpl_vars['logout']['name']; ?>
</a></li>
		<li><a href="javascript:void(null);" onclick="reload_main()">刷新</a></li>
		<li></li>
	</ul>
</div>
 
</body>
</html>