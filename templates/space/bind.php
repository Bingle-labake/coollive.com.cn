<?php $this->load->view('public/common_head.php'); ?>
<?php $this->load->view('public/space_head.php'); ?>
<div class="pub-content">
	<div class="pub-w usr_content">
	    <?php $this->load->view('public/space_left.php'); ?>
		<div class="usr_contentR fr">
	        <?php $this->load->view('public/common_banner.php'); ?>
			<div class="usr_setup">
				<div class="bind">
				  <?php $i=0; ?>
				   <?php foreach ($bind as $k=>$v) { ?>
				   <?php $i++; ?>
				    <?php if ($k != 'taobao') { ?>
					<dl>
						<dt class="dt<?php echo $i; ?>"><?php echo $bind[$k]['name']; ?></dt>
						<?php if(!$bind[$k]['is_bind']) { ?>
						<dd class="f14px fY cWhite"><a href="/u/oauth?site=<?php echo $k; ?>">绑定</a></dd>
						<?php } else { ?>
						<dd class="f14px fY"><a href="javascript:;void(0)" onclick="unbind('<?php echo $k; ?>')" class="on">取消绑定</a></dd>
						<?php } ?>
					</dl>
				   <?php } ?>
					<?php } ?>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/tmpl" id="msgtmp_success">
	<dl class="pub-confirm">
		<dt>
			<strong class="f16px cOrange fY">解绑成功！</strong>
		</dt>
		<dd><a href="" onclick="$.layer()">关闭</a></dd>
	</dl>
</script>
<script type="text/tmpl" id="msgtmp_failed">
	<dl class="pub-confirm">
		<dt>
			<strong class="f16px cOrange fY">解绑成功！</strong>
		</dt>
		<dd><a href="" onclick="$.layer()">关闭</a></dd>
	</dl>
</script>
<script type="text/javascript">
function unbind(oauth){
	$.ajax({
		type: "post",
		url: "/space/oauth/unbind",
		dataType:"json",
		data:{oauth:oauth},
		success: function(data){
	      if(data['result']){
	    	  $.layer($('#msgtmp_success').html());
		  }else{
			  $.layer($('#msgtmp_failed').html());
		  }
		}
});
}
</script>
<?php $this->load->view('public/footer.php'); ?>
