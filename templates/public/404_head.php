<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title><?php echo $seo['title']; ?></title>
<meta name="keywords" content="<?php echo $seo['keywords']; ?>" />
<meta name="description" content="<?php echo $seo['description']; ?>" />
<meta http-equiv="refresh" content="5;url=<?php echo $toward_url; ?>">
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
<script src="<?php echo $this->config->item('img2_url'); ?>/assets/js/base.js"></script>
<div class="pub-head">
  <div class="pub-headc pub-w fY cWhite">
		<div class="pub-logo fl"><a href="http://www.saiku.com.cn">赛酷</a></div>
		<ul class="pub-menu f16px">
			<li><a href="/" class="<?php if($app == "home") { echo "head_active";}?>">首页</a></li>
			<li><a href="<?php echo base_url(); ?>look" class="<?php if($app == "look") { echo "head_active";}?>">比赛专区</a></li>
			<li><a href="<?php echo base_url(); ?>zuopin" class="<?php if($app == "zuopin") { echo "head_active";}?>">参赛作品</a></li>
			<li><a href="<?php echo base_url(); ?>vote" class="<?php if($app == "vote") { echo "head_active";}?>">作品投票</a></li>
			<li><a href="http://jifen.saiku.com.cn" class="<?php if($app == "eshop") { echo "head_active";}?>">积分兑换</a></li>
			<li class="pub-cup"><a href="<?php echo base_url(); ?>worldcup/fixture" class="<?php if($app == "worldcup") { echo "head_active";}?>">世界杯</a></li>
		</ul>

		<div class="pub-usr">			
		</div>

	</div>
</div>