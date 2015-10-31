<?php $this->load->view('public/common_head.php'); ?>
<?php $this->load->view('public/space_head.php'); ?>
<div class="pub-content">
	<div class="pub-w usr_content">
		<?php $this->load->view('public/space_left.php'); ?>
		<div class="usr_contentR fr">
			<?php $this->load->view('public/common_banner.php'); ?>
			<div class="usr_setup" id="usr_setup">
			   <?php if (!empty($team['list'])) { ?>
			    <?php $i = 1; ?>
			    <?php foreach ($team['list'] as $t) { ?>
            	<div class="moute" style="margin-left:38px"><b class="fl f14px"><?php echo $i; ?>.<?php echo $t['name']; ?></b><?php if ($i==1) { ?><span>取消</span><?php } else { ?><span class="on">确定</span><?php } ?></div>
				<div class="setup <?php if ($i>1) { ?>hide<?php } ?>">
					<dl>
						<dt>设置权限</dt>
						<dd>
							<ul>
								<li><input type="checkbox" name="allow_rec"  id="allow_rec_<?php echo $t['tid']; ?>" <?php if(!$t['allow_rec']) { ?>checked<?php } ?>><label for="c1">禁止选手推荐作品到社团</label></li>
								<li><input type="checkbox" name="allow_add" id="allow_add_<?php echo $t['tid']; ?>" <?php if(!$t['allow_add']) { ?>checked<?php } ?>><label for="c2">禁止选手主动加入社团</label></li>
							</ul>
						</dd>
					</dl>
					<div><a  href="javascript:;void(0)" onclick="setoauth(<?php echo $t['tid']; ?>)"  class="usr_btn" id="usr_btn_<?php echo $t['tid']; ?>">确定</a></div>
				</div>
				<?php $i++;} ?>
              <?php } ?>
               <script>
                $(function(){
					var oMivs=$("#usr_setup");
					oMivs.find(".moute").delegate("span","click",function(){
					var obj = $("#usr_setup .setup"),omv = oMivs.find(".moute span");
					var _this = $(this);
					obj.addClass("hide");
					omv.addClass("on").text("确定");
					if(_this.hasClass('on')){
						_this.removeClass('on').text("取消").parent().next().removeClass("hide");
					}else{
						_this.addClass('on').text("确定").parent().next().addClass("hide");
					}
					})
					
				});
                </script>
			</div>
			</div>
		</div>
	</div>
</div>
<script type="text/tmpl" id="msgtmpl_success">
	<dl class="pub-confirm">
		<dt>
			<strong class="f16px cOrange fY">设置成功！</strong>
		</dt>
		<dd><a href="javascript:;void(0)" onclick="$.layer()">关闭</a><a href="javascript:;void(0)" onclick="$.layer()">继续管理社团</a></dd>
	</dl>
</script>
<script type="text/tmpl" id="msgtmpl_failed">
	<dl class="pub-confirm">
		<dt>
			<strong class="f16px cOrange fY">设置失败！</strong>
		</dt>
		<dd><a href="javascript:;void(0)" onclick="$.layer()">关闭</a></dd>
	</dl>
</script>
<script type="text/javascript">
function setoauth(id){
     var is_run = false;
     if(!is_run){
    	 $("#usr_btn_"+id).html('正在处理中...请稍后!');
    	 is_run = true;
    	 $.ajax({
  			type: "post",
  			url: "/space/team/setoauth",
  			dataType:"json",
  			data:{
  	  			tid:id,
  				allow_add:document.getElementById("allow_add_"+id).checked ? 0 : 1,
  				allow_rec:document.getElementById("allow_rec_"+id).checked ? 0 : 1,
                setoauth:true
  			},
  			success: function(data){
  			      if(data['result']){
    			     $.layer($('#msgtmpl_success').html());
  	  			  }else{
    	  		     $.layer($('#msgtmpl_failed').html());
  	  	  		  }
    			  is_run = false;
    			  $("#usr_btn_"+id).html('确定');
  			      
  			}
  		});
     }else{
    	 $("#usr_btn_"+id).html('正在处理中...请稍后!');
     }
}
</script>
<?php $this->load->view('public/footer.php'); ?>
