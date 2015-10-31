<?php $this->load->view('public/common_head.php'); ?>
<?php $this->load->view('public/space_head.php'); ?>
<!--content begin-->
<div class="pub-content">
	<div class="pub-w usr_content">
		<!-- 左侧导航 START -->
		<?php $this->load->view('public/space_left.php'); ?>
		<!-- 左侧导航 END -->
		<div class="usr_contentR fr">			
		    <div class="pk_jiTit">
            	<h2>金币兑换</h2>
            </div>
            <!-- 兑换区域 START -->
		    <?php $this->load->view('space/in_magic_gold.php'); ?>
		    <!-- 兑换区域 END -->
        	<div class="pk_jiTit2">
            	<h2>我的[使用金币]明细</h2>
            </div>
		    <!-- 兑换区域 END -->
			<div class="usr_filter" id="usr_filter">
				<ul class="cWhite">
					<li><a href="/space/credit/earn">获取金币</a></li>
					<li class="on"><a href="/space/credit/pay">使用金币</a></li>
					
					<!-- <li><a href="/space/magic/line">直投票</a></li>  -->
					<!-- <li><a href="/space/magic/double">战斗力加成</a></li>  -->
				</ul>
			</div>
			<div class="usr_score">
				<ul class="caption fB">
					<li>时间</li>
					<li>行为</li>
					<li>金币分值</li>
					<li class="liw">备注</li>
				</ul>
				
				<?php foreach ($res['list'] as $k=>$v) { ?>		       
		       <ul>
					<li><?php echo $v['record_time'];?>	</li>
					<li><?php echo $v['act_name'];?></li>
					<li><?php echo $v['score'];?></li>
					<li class="liw"><?php echo $v['desc'];?></li>
				</ul>
		       <?php } ?>				
			</div>
			<?php echo $page; ?>
		</div>
	</div>
</div>
<!--content end-->
<?php $this->load->view('public/footer.php'); ?>