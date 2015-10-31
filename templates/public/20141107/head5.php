<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<title><?php echo @$seo['title']; ?></title>
<script type="text/javascript">document.domain = ( (document.domain == 'live.saiku.com.cn'||document.domain=='saiku.com.cn') ? "saiku.com.cn":"saiku.com.cn");var QosSS=new Object();QosSS.t=new Array([0,0,0,0,0,0]);QosSS.t[0]=(new Date()).getTime();QosSS.t[5]=QosSS.t[4]=QosSS.t[3]=QosSS.t[2]=QosSS.t[1]=QosSS.t[0];</script>
<script type="text/javascript">
document.createElement('header');
document.createElement('section');
document.createElement('article');
document.createElement('aside');
</script>
<link rel="Bookmark" href="/logo.png" >
<link rel="Shortcut Icon" href="/logo.png" />
<meta name="keywords" content="<?php echo @$seo['keywords']; ?>" />
<meta name="description" content="<?php echo @$seo['description']; ?>" />
<?php foreach ($gh_css as $v) { ?>
<link rel="stylesheet" href="<?php echo $this->config->item('img2_url').$v; ?>" >
<?php } ?>
<?php foreach ($ph_css as $v) { ?>
<?php if(!empty($v)) { ?>
<link rel="stylesheet" href="<?php echo $this->config->item('img2_url').$v; ?>" >
<?php } ?>
<?php } ?>
<?php foreach ($gh_js as $v) { ?>
<script src="<?php echo $this->config->item('img2_url').$v; ?>"></script>
<?php } ?>
<?php foreach ($ph_js as $v) { ?>
<?php if(!empty($v)) { ?>
<script src="<?php echo $this->config->item('img2_url').$v; ?>"></script>
<?php } ?>
<?php } ?>
<?php 
if(!isset($app)) {
    $app = "";
}
?>
<script type="text/javascript">
document.createElement('header');
document.createElement('section');
document.createElement('article');
document.createElement('aside');
</script>

<style type="text/css">
.head_active {background: #ed6d34; text-decoration: none;}
.topnav .nav .n_item_texiao:hover .txt{ background:none;}
.topnav .nav .item .ico_hot{ background:url(http://mat1.gtimg.com/www/mb/images/weishi/sp/effects/ico_hot.gif) 0 0 no-repeat; width:23px; height:11px; display:inline-block; *display:inline; *zoom:1; margin-top:-3px; vertical-align:top;}
</style>

</head>
<body>

<!--header begin-->
<div class="sk-head">
	<dl class="sk-logo">
    	<dt><a title="赛酷网" href="">赛酷网</a></dt>
        <dd class="sk-Blogin hide"></dd>
        <dd class="sk-Alogin hide"></dd>
    </dl>
	<div class="sk-menu f14px"><?php echo get_naviHtml_by_position_20141107($app);?></div>
</div>
<!--header end-->