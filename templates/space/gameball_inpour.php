<?php $this->load->view('public/common_head.php'); ?>
<?php $this->load->view('public/space_head.php'); ?>
<!--content begin-->
<div class="pub-content">
	<div class="pub-w usr_content">
	    <!-- 左侧导航 START -->
		<?php $this->load->view('public/space_left.php'); ?>
		<!-- 左侧导航 END -->
		<div class="usr_contentR fr">
			<!-- 明细区域 START -->
			<div class="pk_jiTit">
            	<h2>充值明细</h2>
            </div>           
		    <!-- 明细区域 END -->
			<div class="usr_filter" id="usr_filter">
				<ul class="cWhite">
					<li class="on"><a href="/space/gameball/inpour">充值记录</a></li>
					<li ><a href="/space/gameball/pay">使用明细</a></li>					
				</ul>
			</div>
			<div class="usr_score">
				<ul class="caption fB">
					<li>时间</li>
					<li>充值金额</li>
					<li>赛点数量</li>
					<li class="liw">支付方式/备注</li>
				</ul>
				<?php foreach ($res['list'] as $k=>$v) { ?>		       
		       <ul>
					<li><?php echo $v['record_time'];?>	</li>
					<li><?php echo $v['amount'];?></li>
					<li><?php echo $v['gameballs'];?></li>
					<li class="liw"><?php echo $v['pay_type_name']."/".$v['status'];?></li>
				</ul>
		       <?php } ?>	
			</div>
			<?php echo $page; ?>
		</div>
	</div>
</div>
<!--content end-->
<?php $this->load->view('public/footer.php'); ?>
