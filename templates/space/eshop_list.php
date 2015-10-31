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
            	<h2>我的物品</h2>
            </div>           
		    <!-- 明细区域 END -->
			<div class="usr_filter" id="usr_filter">
				<ul class="cWhite">
					<li <?php if($cate == "daoju") {?>class="on"><?php }?>><a href="/space/eshop">道具</a></li>
					<li <?php if($cate == "liwu") {?>class="on"><?php }?>><a href="/space/eshop/gift">礼物</a></li>
					<li <?php if($cate == "chongwu") {?>class="on"><?php }?>><a href="/space/eshop/pet">宠物</a></li>
					<li <?php if($cate == "kongjian") {?>class="on"><?php }?>><a href="/space/eshop/zone">空间装扮</a></li>
				</ul>
			</div>
			<div class="usr_score">
				<ul class="caption fB">
					<li>时间</li>
					<li class="liw">名称[订单号]</li>					
					<li>备注</li>
					<li>状态</li>
				</ul>
				<?php foreach ($res['list'] as $k=>$v) { ?>		       
		       <ul>
					<li><?php echo $v['dateline'];?>	</li>
					<li class="liw"><?php echo $v['ide_name'];?>[<?php echo $v['sn_code'];?>]</li>					
					<li><?php echo $v['remarks'];?></li>
					<li><?php if($v) {if($v['status'] == 1) {if($v['useing'] == 1) {echo "[使用中]";}else{echo "[有效]";}}else{echo "[已使用]";}}?></li>
				</ul>
		       <?php } ?>	
			</div>
			<?php echo $page; ?>
		</div>
	</div>
</div>
<!--content end-->
<?php $this->load->view('public/footer.php'); ?>
