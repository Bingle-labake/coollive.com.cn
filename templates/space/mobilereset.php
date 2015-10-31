<?php $this->load->view('public/common_head.php'); ?>
<div class="my_phone">
    <div class="phone_title"><h2>手机设置</h2></div>
    <div class="phone_cont">
        <dl>
            <?php if (!empty($space['mobile']) && $space['mobilestatus']) { ?>
            <dt><span>您绑定的手机是：  <?php echo $space['mobile']; ?></span><a href="/space/set/mobilemodify">修改号码</a></dt>
            <dd><span>如果不想继续使用该手机，可以</span><a href="/space/set/mobileunbind">解除绑定</a></dd>
            <?php } elseif (!empty($space['mobile']) && !$space['mobilestatus']) { ?>
            <dt><span>您绑定的手机是： <input type="button" value="修改号码" /></dt>
            <?php } else { ?>
            <dt><span>您绑定的手机是： </span><input type="button" value="修改号码" /></dt>
            <!--<dd><span>如果不想继续使用该手机，可以</span><input type="button" value="解除绑定" /></dd>-->
            <?php } ?>
         
        </dl>
    </div>
    <div class="phone_bott" id="phone_bott2">
        <ul class="phone_sjxg">
        	<li style="width:280px;"></li>
        </ul>
    	<dl>
        	<dt class="w94"><i class="cRed">*</i>新手机号码：</dt>
            <dd><input class="sjh" name="mobile" id="mobile" type="text" /><i class="cRed" id="tip_mobile" style="display:none">此手机号码跟当前绑定的手机号码一致，请更换</i></dd>
        </dl>
        <dl>
        	<dt class="w94"><i class="cRed">*</i>验证码：</dt>
            <dd>
                <p><input id="hQuyzma" type="button" value="免费获取验证码" onclick="sendMessage()" /><input class="yzm" name="sms" id="sms" type="text" /><i class="cRed" id="tip_sms" style="display:none">验证码超时未输入，请重新获取</i></p>
            </dd>
        </dl>
        <dl>
        	<dt class="w94">&nbsp;</dt>
            <dd>
                <input onClick="mobilereset()" class="confirm" type="button" value="确定" />
            </dd>
        </dl>
    </div>
    
</div>
<!--content end-->
<script type="text/javascript">
function mobilereset(){
	 initial();
	 $.ajax({
				type: "post",
				url: "/space/set/mobilereset",
				dataType:"json",
				data:{mobile:$("#mobile").val(),sms:$("#sms").val()},
				success: function(data){
					 if(!data['result']){
						 $("#tip_"+data['tip_type']).html(data['msg']);
					     $("#tip_"+data['tip_type']).css("display","block");
					 }else{
						 $.layer($('#phone_success').html());
					 }
				}
	  });
}
function sendsms(){
	 initial();
	 $.ajax({
				type: "post",
				url: "/space/set/send_set_sms",
				dataType:"json",
				data:{mobile:$("#mobile").val(),source:'mobilereset_set'},
				success: function(data){
					 $("#tip_"+data['tip_type']).html(data['msg']);
				     $("#tip_"+data['tip_type']).css("display","block");
				}
	  });
}

function initial(){
	$("#tip_sms").html("");
	$("#tip_mobile").html("");
}
</script>
<script type="text/javascript">
/*-------------------------------------------*/
var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
var code = ""; //验证码
var codeLength = 6;//验证码长度
var but_hq = $("#hQuyzma");//按钮
function sendMessage() {
	curCount = count;
	var dealType; //验证方式
var uid=$("#uid").val();//用户uid
if ($("#phone").attr("checked") == true) {
		dealType = "phone";
	}
	else {
		dealType = "email";
	}
	//产生验证码
for (var i = 0; i < codeLength; i++) {
		code += parseInt(Math.random() * 9).toString();
	}

		//手机有效性验证
		$.ajax({
			type: "post",
			url: "/space/set/is_mobile_validate",
			dataType:"json",
			data:{mobile:$("#mobile").val()},
			success: function(data){
			      if(!data['result']){
				     $("#tip_mobile").html(data['msg']);
				     $("#tip_mobile").css("display","block");
					 return false;
				  }else{
					//设置button效果，开始计时
					but_hq.attr("disabled", "true");
					but_hq.val("请在" + curCount + "秒内输入验证码");
					InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
					sendsms();//发送短信验证码
				  }
			    
			}
		});
	}
//timer处理函数
function SetRemainTime() {
	if (curCount == 0) {                
		window.clearInterval(InterValObj);//停止计时器
		but_hq.removeAttr("disabled");//启用按钮
		but_hq.val("重新发送验证码");
		code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效    
	}
	else {
		curCount--;
		but_hq.val("请在" + curCount + "秒内输入验证码");
	}
}
</script>

<script type="text/tmpl" id="phone_success">
<div class="phone-tan">
	<h2><a class="win-close" href="/u/set"></a></h2>
    <dl>
    	<dt class="fY f14px">手机号码修改成功！</dt>
        <dd><a href="/u/set" >继续编辑个人资料</a></dd>
    </dl>
</div>
</script>
<?php $this->load->view('public/footer.php'); ?>
