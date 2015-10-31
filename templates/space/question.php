<?php $this->load->view('public/common_head.php'); ?>
<?php $this->load->view('public/space_head.php'); ?>
<!--content begin-->
<div class="pub-content">
	<div class="pub-w usr_content">
		<!-- 左侧导航 START -->
		<?php $this->load->view('public/space_left.php'); ?>
		<!-- 左侧导航 END -->
		<div class="usr_contentR fr">
			<div class="usr_filter">
				<ul class="cWhite">
					<li class="on"><a href="/space/question">我的提问</a></li>
					<li><a href="/space/question/message">我的留言</a></li>
				</ul>
			</div>
			 <?php foreach ($res['list'] as $k=>$v) { ?>		       
		       <div class="usr_question">
				<h3 class="fB"><?php echo $v['title'];?></h3>
				<dl>
					<dt>
						<span class="fr"><?php echo $v['record_time'];?></span>
						<p><?php echo $v['content'];?></p>
					</dt>
					<?php if(isset($v['reply'])) {?>
					<dd class="cOrange">
						<span class="fr"><?php echo $v['reply']['record_time'];?></span>
						<p><?php echo $v['reply']['content'];?></p>
					</dd>
					<?php }?>
				</dl>
			   </div>
		       <?php } ?>
			
			<?php echo $page; ?>
		</div>
	</div>
</div>
<script type="text/tmpl" id="msgtmpl">
	<dl class="pub-confirm">
		<dt>
			<strong class="f16px cOrange fY">直投票兑换成功！</strong>
		</dt>
		<dd><a href="" onclick="$.layer()">关闭</a><a href="">去直投区投票</a></dd>
	</dl>
</script>
<!--content end-->
<?php $this->load->view('public/footer.php'); ?>
