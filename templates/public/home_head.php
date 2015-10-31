<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="Bookmark" href="/logo.png" >
<link rel="Shortcut Icon" href="/logo.png" />
<title><?php echo $seo['title']; ?></title>
<meta name="keywords" content="<?php echo $seo['keywords']; ?>" />
<meta name="description" content="<?php echo $seo['description']; ?>" />
<meta property="qc:admins" content="235501606211356375636" />
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
		<div class="pub-logo fl"><a href="<?php echo base_url(); ?>">赛酷</a></div>
		<ul class="pub-menu f16px">
			<?php echo get_naviHtml_by_position($app);?>
		</ul>

		<div class="pub-usr">			
		</div>

	</div>
</div>