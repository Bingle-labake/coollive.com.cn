<?php $this->load->view('public/common_head.php'); ?>
<?php $this->load->view('public/space_head.php'); ?>
<div class="pub-content">
	<div class="pub-w usr_content">
		<?php $this->load->view('public/space_left.php'); ?>
		<div class="usr_contentR fr">
			<div class="usr_filter">
				<div class="pub-select" id="demo">第二届全国校园舞蹈大赛</div>
				<ul class="cWhite">
					<li <?php if($s == 1 || empty($s)) { ?>class="on" <?php } ?>><a href="/space/team/work?s=1">参赛作品</a></li>
					<li <?php if($s == 2) { ?>class="on" <?php } ?>><a href="/space/team/work?s=2">其它</a></li>
				</ul>
			</div>
			<div class="usr_manageOther">
			   <?php if(!empty($works)) { ?>
			   <?php foreach ($works as $w) { ?>
				<dl>
					<dt class="cWhite">
						<a href="/video/play/<?php echo $w['id']; ?>" target="_blank"><img src="<?php echo $w['image']; ?>" alt=""></a>
						<strong><a href="/video/play/<?php echo $w['id']; ?>" target="_blank"><?php echo $w['title']; ?></a></strong>
					</dt>
					<dd><a href="javascript:;void(0)" onclick="hidden_works(<?php echo $w['id']; ?>)">取消显示</a></dd>
				</dl>
				<?php } ?>
				<?php } ?>
			</div>
			<?php echo $page; ?>
		</div>
	</div>
</div>
<script type="text/javascript">
function hidden_works(wids){
    $.ajax({
		type: "post",
		url: "/space/team/hidden_works",
		dataType:"json",
		data:{wids:wids},
		success: function(data){
			  if(data['result']){
				 alert('取消成功');
			  }else{
				 alert('取消失败');
			  }
			  window.location.reload();    
		}
	}); 
}
</script>
<?php $this->load->view('public/footer.php'); ?>
