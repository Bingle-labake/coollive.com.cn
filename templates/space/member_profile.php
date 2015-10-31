<?php $this->load->view('public/common_head.php'); ?>
<?php $this->load->view('public/space_head.php'); ?>
<link rel="stylesheet" href="/public/data/assets/css/school.css" >
<style type="text/css">
.ac_results {
	background-color: white;
	border: 1px solid #CCCCCC;
	font-family: "宋体",Arial,Helvetica,sans-serif;
	overflow: hidden;
	padding: 0;
	z-index: 99999;
	width: 150px;
  }
.provinceSchool {
  padding:1px 10 20px 20px
}
</style>
<script type="text/javascript" src="/public/data/assets/js/rili/WdatePicker.js"></script>
<script>
function saveprofile(){
	 var tags = '';
	 var tagarr = new Array();
	 $("#setTags li em").each(function(i,t){
      tagarr.push($(this).html());
	 });
	 tags = tagarr.join(',');
	 
	 initial();
	var is_run = false;
	if(!is_run){
		is_run = true;
		$(".usr_btn").html("正在处理中...请稍后!");
		$.ajax({
			type: "post",
			url: "/space/set",
			dataType:"json",
			data:{
				realname:$("#realname").val(),
				email:$("#email").val(),
				mobile:$("#mobile").val(),
				sms:$("#sms").val(),
				gender:$('input[name="gender"]:checked').val(),
				birthday:$("#birthday").val(),
				idcard:$("#idcard").val(),
				colid:$("#colid").val(),
				address:$("#address").val(),
				is_show_email:$('input[name="is_show_email"]:checked').val(),
		  		is_show_mobile:$('input[name="is_show_mobile"]:checked').val(),
		  		bio:$("#bio").val(),
		  		tag:tags,
		  		sms:$("#sms").val(),
				profile:true
			},
			success: function(data){
		      if(data['result']){
			     var source = $("#source").val();
			     var rand_refer = $("#rand_refer").val();
			     if(source == 'rand'){
                   $("#profile_msg").html("继续投票");
                   $("#profile_msg").attr("href",rand_refer);
				 }
			     $('#msgtmpl').html($("#profile_layer").html());
			     $.layer($('#msgtmpl').html());
			  }else{
				  if(data['tip_type'] == 'tag'){
					  $("#tip_"+data['tip_type']).addClass("cRed");
				  }
				  $("#tip_"+data['tip_type']).html(data['msg']);
				  $("#tip_"+data['tip_type']).css("display","block");
			  }
			  is_run = false;
			  $(".usr_btn").html("确定");
			}
	    });
	}else{
		$(".usr_btn").html("正在处理中...请稍后!");
   }
}

function initial(){
	$("#tip_realname").css("display","none");
	$("#tip_mobile").css("display","none");
	$("#tip_idcard").css("display","none");
	$("#tip_sms").css("display","none");
	$("#tip_tag").css("display","none");
}
//院校联想
function getschool(){
	 var school = $("#school").val();
	 if(school != ''){
		 $.ajax({
					type: "post",
					url: "/space/sign/getschool",
					dataType:"json",
					data:{wb:school},
					success: function(data){
				      if(data['code']>0){
						 $("#map_result").html(data['html']);
						 $(".ac_results").show();
					     return true;
					  }else{
						  $("#tip_school").html(data['error']);
					  }
					}
			});
	 }
}

//选中院校
function showschool(colid,colname){
	$("#colid").val(colid);
	$("#school").val(colname);
	$(".ac_results").hide();
    $("div[class='provinceSchool']").hide();
}

//更新院校隐藏域
function update_colid(){
	$("#school").val('');
	$("#colid").val(-1);
}

function hidebio(){
	if($("#bio").val() == '字数不多于200字'){
       $("#bio").val('');
	}
}

function showbio(){
	if($("#bio").val() == ''){
       $("#bio").val('字数不多于200字');
	}
}
</script>
<div class="pub-content">
	<div class="pub-w usr_content">
		<?php $this->load->view('public/space_left.php'); ?>
		<div class="usr_contentR fr">
			<?php $this->load->view('public/common_banner.php'); ?>
			<div class="usr_setup">
			    <input type="hidden" name="source" id="source" value="<?php echo $source; ?>">
			    <input type="hidden" name="rand_refer" id="rand_refer" value="<?php echo $rand_refer; ?>">
			    <div id="proSchool" class="provinceSchool">
			                <div class="title">
			                    <span>已选择:</span>
			                </div>
			                <div class="proSelect">
			                    <select></select>
			                    <span></span>
			                    <input type="text" >
			                </div>
			                <div class="schoolList">
			                    <ul>
			                    </ul>
			                </div>
			                <div class="button">
			                    <a href="javascript:;void(0)" flag='0'>取消</a>
			                    <a href="javascript:;void(0)" flag='1'>确定</a>
			                </div>
			            </div>
				<div class="info">
					<dl class="form">
						<dt>真实姓名：</dt>
						<dd><span><input type="text" name="realname" id="realname" value="<?php echo $profile['realname']; ?>"></span><span style="display: none;" id="tip_realname" class="login_error cRed"></span></dd>
					</dl>
					<dl class="form">
						<dt>邮&nbsp;&nbsp;&nbsp;&nbsp;箱：</dt>
						<dd><span><input type="text" name="email" id="email" value="<?php echo $space['email']; ?>" <?php if (!empty($space['email'])) { ?>disabled="true"<?php } ?> class="cGray"></span>
						<em><input type="checkbox" name="is_show_email" id="is_show_email" value="1" <?php if($space['is_show_email']) { ?>checked<?php } ?>><label for="mail">在我的主页显示</label></em>
						<span style="display: none;" id="tip_email" class="login_error cRed"></span>
						</dd>
					</dl>
					<dl class="form">
						<dt>手&nbsp;机&nbsp;号：</dt>
						<dd>
							<span><input type="text" name="mobile" id="mobile" value="<?php echo $space['mobile']; ?>" class="cGray"></span>
							<em><input type="checkbox" name="is_show_mobile" id="is_show_mobile" value="1" <?php if($space['is_show_mobile']) { ?>checked<?php } ?>><label for="phone">&nbsp;在我的主页显示</label></em>
							<?php if (empty($space['mobile']) || !$space['mobilestatus']) { ?><input id="bangDing" type="button" value="绑定手机" /><?php } ?>
							<span style="display: none;" id="tip_mobile" class="login_error cRed"></span>
						</dd>
					</dl>
					<dl class="form yzMa">
						<dt>验&nbsp;证&nbsp;码：</dt><dd><p><input id="hQuyzma" type="button" value="免费获取验证码" onclick="sendMessage()" /></p><span><input type="text" name="sms" id="sms" value=""></span><p class="cRed" id="tip_sms" style="display:none"></p></dd>
					</dl>
					<dl class="sex">
						<dt>性&nbsp;&nbsp;&nbsp;&nbsp;别：</dt>
						<dd>
						<input type="radio" name="gender" value="1" <?php if($profile['gender'] == 1) { ?>checked<?php } ?>><label for="man">男</label>
						<input type="radio" name="gender" value="2" <?php if($profile['gender'] == 2) { ?>checked<?php } ?>><label for="woman">女</label>
						</dd>
					</dl>
					<dl class="form">
						<dt>生&nbsp;&nbsp;&nbsp;&nbsp;日：</dt>
						<dd><span>
						<!--<input type="text" value="1990-06-23">-->
						<input value="<?php echo $profile['birthday']; ?>" readonly="true" name="birthday" id="birthday" class="Wdate txt_date fl" type="text" onfocus="WdatePicker({maxDate:'#F{+(\'d5222\')}'})"//>
						</span></dd>
					</dl>
					<dl class="form">
						<dt>身份证号：</dt>
						<dd><span><input type="text" name="idcard" id="idcard" value="<?php echo $profile['idcard']; ?>" class="cGray"></span><!--<em>身份证修改请联系：0000-000-000</em>-->
						<span style="display: none;" id="tip_idcard" class="login_error cRed"></span>
						</dd>
					</dl>
					<dl class="form">
						<dt>所在院校：</dt>
						<dd>
							<span>
							   <!--<input type="text" name="school" id="school" value="" class="cGray">-->
							   <input type="text" name="school" id="school" class="cGray" onfocus="update_colid()" value="<?php echo $profile['colname']; ?>" onkeyup="getschool()">
					           <input type="hidden" name="colid" id="colid" value="<?php echo $profile['colid']; ?>">
							</span>
							<div style="position: absolute;width:298px;z-index:4;margin-top:30px;display:none" class="ac_results">
				        	<ul id="map_result">
				        	</ul>
			                </div>
							<i id="tip_school"></i>
						</dd>
						
			            <script type="text/javascript" src="/public/data/assets/js/school.js"></script>
					</dl>
					<dl class="form">
						<dt>住&nbsp;&nbsp;&nbsp;&nbsp;址：</dt>
						<dd><span><input type="text" name="address" id="address" value="<?php echo $profile['address']; ?>" class="cGray"></span></dd>
					</dl>
					<dl class="form">
						<dt>自我介绍：</dt>
						<dd><span><textarea name="bio" id="bio" onfocus="hidebio()" onblur="showbio()"><?php if (!empty($profile['bio'])) { ?><?php echo $profile['bio']; ?><?php } else { ?>字数不多于200字<?php } ?></textarea></span></dd>
					</dl>
					<!--<dl class="form">
						<dt>身份标签：</dt>
						<dd class="status_tit" id="status_tit">
						   <?php if (!empty($user_idtag_auto)) { ?>
						       <?php $i=1; ?>
							   <?php foreach ($user_idtag_auto as $k=>$idtag_auto) { ?>
						            <i class="<?php if (!empty($space['idtype'])) { ?><?php if ($space['idtype'] == $k) { ?>on<?php } ?><?php } elseif ($i == 1) { ?>on<?php } ?>"><?php echo $k; ?></i>
						       <?php $i++;} ?>
						   <?php } ?>
						</dd>
					</dl>-->
                    
                    
                    <?php if (!empty($user_idtag_auto)) { ?>
                        <?php 
                          $i=1;
                         ?>
                        <?php foreach ($user_idtag_auto as $k=>$idtag_auto) { ?>
	                    <dl class="form">
							<dt><?php if ($i == 1) { ?>身份标签：<?php } ?></dt>
							<dd class="status_tit"><i class="on"><?php echo $k; ?></i></dd>
						</dl>
	                    <ul class="status_box">
	                        <li class="on">
	                           <?php foreach ($idtag_auto['checkbox'] as $idtag_checkbox) { ?>
		                        <label><input type="checkbox" name="idtag_checkbox" value="<?php echo $idtag_checkbox; ?>:<?php echo $k; ?>" <?php if (!empty($idtag['checkbox']) && isset($idtag['checkbox'][$k]) && in_array($idtag_checkbox, $idtag['checkbox'][$k])) { ?>checked<?php } ?> /><?php echo $idtag_checkbox; ?></label>
		                       <?php } ?>
		                        <br />
		                       <?php foreach ($idtag_auto['radio'] as $idtag_radio) { ?>
		                        <label><input type="radio" name="idtag_radio_<?php echo $i; ?>" value="<?php echo $idtag_radio; ?>:<?php echo $k; ?>" <?php if (!empty($idtag['radio']) && isset($idtag['radio'][$k]) && in_array($idtag_radio, $idtag['radio'][$k])) { ?>checked<?php } ?> /><?php echo $idtag_radio; ?></label>
		                       <?php } ?>
	                        </li>
	                    </ul>
	                   <?php $i++;} ?>
	               <?php } ?>
                    
					<dl>
						<dt>我的标签：</dt>
						<dd>
							<div class="b_form_tags">
								<ul id="setTags">
									<?php if (!empty($tag)) { ?>
								   <?php $tag = explode(',', $tag); ?>
								   <?php foreach ($tag as $t) { ?>
								   <li index="<?php echo array_search($t, $user_tag_auto); ?>"><em><?php echo $t; ?></em><b title="删除当前标签"></b></li>
								   <?php } ?>
								  <?php } ?>
								</ul>
								<span id="tip_tag"></span>
							</div>
						</dd>
					</dl>
                    <dl>
                    	<dt>选择：</dt>
                        <dd class="b_form_tags_all" id="tagtext">
                          <?php $i=1; ?>
                          <?php if (!empty($user_tag_auto)) { ?>
                          <?php $tag = !empty($tag) ? $tag : array(); ?>
                           <?php foreach ($user_tag_auto as $t_auto) { ?>
                            <a href="" index="<?php echo $i; ?>" <?php if (in_array($t_auto, $tag)) { ?>class="on"<?php } ?>><?php echo $t_auto; ?></a>
                           <?php $i++;} ?>
                          <?php } ?>
                        </dd>
                    </dl>
                    <script>addtags($("#setTags"),$("#tagtext"))</script>
					<div class="buttn"><a href="javascript:;void(0)" onclick="saveprofile()" class="usr_btn">确定</a></div>
				</div>
			</div>
			</div>
		</div>
	</div>
</div>

<div id="profile_layer" style="display:none">
   <dl class="pub-confirm">
		<dt>
			<strong class="f16px cOrange fY">修改成功！</strong>
		</dt>
		<dd><a href="" onclick="$.layer()">关闭</a><a href="" id="profile_msg">继续编辑个人资料</a></dd>
	</dl>
</div>
<script type="text/tmpl" id="msgtmpl">
	
</script>
<script>
$(function(){
	var status_tit = $("#status_tit").find("i"),status_box = $("#status_box").find("li"),bangDing = $("#bangDing");
	status_tit.click(function(){
		var _this = $(this);
		_this.addClass("on").siblings().removeClass("on");
		var activeindex = status_tit.index(this);
		status_box.eq(activeindex).addClass("on").siblings().removeClass("on");
		});
	bangDing.click(function(){
		$(this).parents("dl").next().show();
		});
});
</script>
<script type="text/javascript">
$(function(){
	var bangDing = $("#bangDing");
	bangDing.click(function(){
		$(this).parents("dl").next().show();
		});
});
/*-------------------------------------------*/
var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
var code = ""; //验证码
var codeLength = 6;//验证码长度
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
			url: "/space/set/is_mobile_binded",
			dataType:"json",
			data:{mobile:$("#mobile").val()},
			success: function(data){
			      if(!data['result']){
				     $("#tip_mobile").html(data['msg']);
				     $("#tip_mobile").css("display","block");
				     $("#bangDing").css("display","none");
					 return false;
				  }else{
					//设置button效果，开始计时
					$("#hQuyzma").attr("disabled", "true");
					$("#hQuyzma").val("请在" + curCount + "秒内输入验证码");
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
		$("#hQuyzma").removeAttr("disabled");//启用按钮
		$("#hQuyzma").val("重新发送验证码");
		code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效    
	}
	else {
		curCount--;
		$("#hQuyzma").val("请在" + curCount + "秒内输入验证码");
	}
}

function sendsms(){
	 initial();
	 $.ajax({
				type: "post",
				url: "/space/set/send_set_sms",
				dataType:"json",
				data:{mobile:$("#mobile").val(),source:'mobilebind'},
				success: function(data){
					 $("#tip_"+data['tip_type']).html(data['msg']);
				     $("#tip_"+data['tip_type']).css("display","block");
				}
	  });
}
</script>
<?php $this->load->view('public/footer.php'); ?>
