<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>注册-赛酷</title>
<?php foreach ($g_css as $css) { ?>
<link rel="stylesheet" href="<?php echo $css;?>" >
<?php } 
foreach ($g_js as $gjs) { ?>
<script src="<?php echo $gjs;?>"></script>	
<?php } ?>		
</head>
<body>
<!--header begin-->
<?php $this->load->view('public/space_head.php'); ?>
<!--header end-->
<style>
#goemail {
	display: inline-block;
	width: 66px;
	height: 24px;
	line-height: 24px;
	text-align: center;
	border: 1px solid #DDD;
	margin: 0 7px;
	background: url(../img/bg04.png);
}
</style>
<!--content begin-->
<div class="pub-c pub-content"><div class="pub-c pub-w">
	<div class="login">
	    <?php foreach ($res['list'] as $k=>$v) { ?>
		<dl class="sys_msg">
			<dt><?php echo $k+1;?>：</dt>
			<dd data-value="{mi_id:<?php echo $v['id'];?>, is_read:<?php echo $v['is_read'];?>}">
			<?php echo $v['title'];?>	
			</dd>
		</dl>
		<?php } ?>		
	</div>
	</div>
</div></div>
<!--content end-->
<?php foreach ($p_js as $pjs) { ?>
<script src="<?php echo $pjs;?>"></script>	
<?php } ?>	
<!--footer begin-->
<?php $this->load->view('public/foot.html'); ?>
<!--footer end-->
</body>
</html>