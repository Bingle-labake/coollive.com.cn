<?php $this->load->view('public/common_head.php'); ?>
<?php $this->load->view('public/space_head.php'); ?>
<!--content begin-->
<div class="pub-content">
	<div class="pub-w usr_content">
	     <?php $this->load->view('public/space_left.php'); ?>
		<div class="usr_contentR fr">
			<div class="usr_filter">
				<ul class="cWhite">
					<li class="on"><a href="/u/society/add">添加成员</a></li>
					<li><a href="/u/society">删除成员</a></li>
				</ul>
			</div>
			<div class="usr_adduser">
				<dl>
					<dt class="fl">成员昵称：</dt>
					<dd class="fl"><input type="text" class="fl" name="username" id="username"><a href="javascript:;" onclick="addmember()" class="fr cWhite" id="addmember">加他/她入社团</a></dd>
				</dl>
				<div class="cRed" id="tip_addmember" style="display:none"></div>
			</div>
			</div>
		</div>
	</div>
</div>
<script type="text/tmpl" id="msgtmpl">
	<dl class="pub-confirm">
		<dt>
			<strong class="f16px cOrange fY">邀请发送成功！</strong>
		</dt>
		<dd><a href="" onclick="$.layer()">关闭</a><a href="">继续添加</a></dd>
	</dl>
</script>
<script type="text/javascript">
function addmember(){
	$("#tip_addmember").css("display","none");
	var username = $("#username").val();
	if(username == ''){
       $("#tip_addmember").html('请输入要添加的成员昵称');
       $("#tip_addmember").css("display","block");
	}else{
		var is_run = false;
		 if(!is_run){
			 $("#addmember").html('正在处理中...请稍后!');
			 is_run = true;
			 $.ajax({
					type: "post",
					url: "/space/team/addmember",
					dataType:"json",
					data:{username:username,addsubmit:true},
					success: function(data){
					      if(data['result']){
					    	  $.layer($('#msgtmpl').html())
						  }else{
							  $("#tip_addmember").html(data['msg']);
						      $("#tip_addmember").css("display","block");
						  }
					      $("#addmember").html('加他/她入社团');
					      is_run = false;    
					}
				}); 
		 }else{
			 $("#addmember").html('正在处理中...请稍后!');
		 }
	}
}
</script>
<!--content end-->
<?php $this->load->view('public/footer.php'); ?>
