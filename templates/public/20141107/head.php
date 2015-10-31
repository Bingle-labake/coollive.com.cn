<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title><?php echo @$seo['title']; ?></title>
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
<style type="text/css">
.head_active {background: #ed6d34; text-decoration: none;}
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