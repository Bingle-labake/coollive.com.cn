<?php $this->load->view('public/common_head.php'); ?>
<!--content begin-->
<div class="pub-content">

	<div class="pub-w clearfix">
		
		<div class="descriptionBox">
			<div class="description">
				<p class="cOrange"><?php echo $msg; ?></p>
				<span>3</span>秒后跳转到首页，也可以手动跳转<a href="/">首页</a>
			</div>
		</div>
		
	</div>
	
</div>
<!--content end-->
<script>setTimeout("location.href='/'",3000);</script>
<?php $this->load->view('public/footer.php'); ?>