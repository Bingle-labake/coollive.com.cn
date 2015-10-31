<?php $this->load->view('public/common_head.php'); ?>
<?php $this->load->view('public/space_head.php'); ?>
<div class="pub-content">
	<div class="pub-w usr_content">
	    <?php $this->load->view('public/space_left.php'); ?>
		<div class="usr_contentR fr">
			<div class="usr_filter">
				<ul class="cWhite">
					<li><a href="/u/society/add">添加成员</a></li>
					<li class="on"><a href="/u/society">删除成员</a></li>
				</ul>
			</div>
			<div class="usr_deluser">
				<dl class="ctrl">
					<dt><input type="checkbox" id="all"><label for="">全部</label></dt>
					<dd><a href="javascript:;void(0)" onclick="delmember()">删除</a></dd>
				</dl>
				<div class="lst">
					<div>
					    <?php if(!empty($list)) { ?>
						    <?php foreach($list as $t) { ?>
							<dl>
								<dt><input type="checkbox" name="uids[]" value="<?php echo $t['uid']; ?>"><label for="cbx1"><img src="<?php echo $this->config->item('img3_url').avatar($t['uid']);?>" alt=""></label></dt>
								<dd><a href="<?php echo $this->config->item('q_url').build_uri('u', array('id'=>$t['uid']));?>" target="_blank"><?php echo $t['username']; ?></a></dd>
							</dl>
							<?php } ?>
						<?php } ?>
					</div>
				</div>
			</div>
			<?php echo $page; ?>
		</div>
	</div>
</div>
<!--content end-->
<script type="text/javascript">
$(function() {
	$("#all").click(function() {
		if(this.checked){ 
		   $("input[name='uids[]']").each(function(){this.checked=true;}); 
		}else{ 
		   $("input[name='uids[]']").each(function(){this.checked=false;}); 
		}
	}); 
});
function delmember(){
	var arr = [];
	$("input[name='uids[]']").each(function(){
		if(this.checked){
			arr.push(this.value);
		}
	});
	uids = arr.join(',');
	if(uids == ''){
		alert('请选择成员');
		return;
	}else{
		var is_del = confirm('确定要删除吗?');
		if(!is_del){
          return;
		}else{
			 var is_run = false;
			 if(!is_run){
				 is_run = true;
				 $.ajax({
						type: "post",
						url: "/space/team/delmember",
						dataType:"json",
						data:{uids:uids},
						success: function(data){
						      if(data['result']){
                                 alert('删除成功');
							  }else{
                                 alert('删除失败');
							  }
						      is_run = false;
						      window.location.reload();    
						}
					}); 
			 }
		}
	} 
}
</script>
<?php $this->load->view('public/footer.php'); ?>
