<?php $this->load->view('public/common_head.php'); ?>
<?php $this->load->view('public/space_head.php'); ?>
<div class="pub-content">
	<div class="pub-w usr_content">
		<?php $this->load->view('public/space_left.php'); ?>
		<div class="usr_contentR fr">
			<?php $this->load->view('public/common_banner.php'); ?>
			<div class="usr_setup">
				<div class="password">
					<dl>
						<dt>当前密码：</dt>
						<dd><input type="password" name="password" id="password"><em class="cRed" id="tip_cur_password"></em></dd>
					</dl>
					<dl>
						<dt>新密码：</dt>
						<dd>
							<input type="password" name="newpwd" id="newpwd" value="" class="cGray" style="display:none" onblur="hidepwd()">
							<input type="text" name="text_pwd" id="text_pwd" value="6-16位数字、字母和符号，区分大小写" onfocus="showpwd()" class="cGray">
							<em class="cRed" id="tip_newpwd"></em>
						</dd>
					</dl>
					<dl>
						<dt>确认密码：</dt>
						<dd><input type="password" name="confirmpwd" id="confirmpwd" value="" class="cGray"><em class="cRed" id="tip_confirmpwd"></em></dd>
					</dl>
					<div><a href="javascript:;void(0)" onclick="modifypwd()" class="usr_btn">确定</a></div>
				</div>
			</div>
			</div>
		</div>
	</div>
</div>
<script type="text/tmpl" id="msgtmpl">
	<dl class="pub-confirm">
		<dt>
			<strong class="f16px cOrange fY">密码修改成功！</strong>
		</dt>
		<dd><a href="" onclick="$.layer()">关闭</a><a href="">继续编辑社团资料</a></dd>
	</dl>
</script>
<script type="text/javascript">
function modifypwd(){
     initial();
     var is_run = false;
     if(!is_run){
    	 $(".usr_btn").html('正在处理中...请稍后!');
    	 is_run = true;
    	 $.ajax({
  			type: "post",
  			url: "/space/set/pwd",
  			dataType:"json",
  			data:{
                 password:$("#password").val(),
                 newpwd:$("#newpwd").val(),
                 confirmpwd:$("#confirmpwd").val(),
                 modifypwd:true
  			},
  			success: function(data){
  				  if(!data['result']){
  				     $("#tip_"+data['tip_type']).html(data['msg']);
  				  }else{
  					 $.layer($('#msgtmpl').html())
  				  }
  			      is_run = false;
    			  $(".usr_btn").html('确定');
  			}
  		});
     }else{
    	 $(".usr_btn").html('正在处理中...请稍后!');
     }
}


function initial(){
	$("#tip_cur_password").html("");
	$("#tip_newpwd").html("");
	$("#tip_confirmpwd").html("");
}

function showpwd(){
	$("#text_pwd").css("display","none");
	$("#newpwd").css("display","block");
	$("#newpwd").focus();
}

function hidepwd(){
	if($("#newpwd").val() == ''){
		$("#text_pwd").css("display","block");
		$("#newpwd").css("display","none");
	}
}
</script>
<?php $this->load->view('public/footer.php'); ?>
