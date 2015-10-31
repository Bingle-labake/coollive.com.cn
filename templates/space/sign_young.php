<?php $this->load->view('public/common_head.php'); ?>
<?php $this->load->view('look/block/head.html');  ?>
<script type="text/javascript" src="/public/data/assets/js/ajaxfileupload.js"></script>
<script type="text/javascript" src="/public/data/assets/js/rili/WdatePicker.js"></script>
<script src="http://img2.saiku.com.cn/static/assets/city/location.js"></script>
<script type="text/javascript">
is_have_career();
var is_sign = false;
var pubbtnstatus = true;
function sign(){
   if(!is_sign){
	    is_sign = true;
	    $(".b_form_btn").html('提交表单中...');
	    initial();
		$.ajax({
			type: "post",
			url: "/space/sign/young/<?php echo $gid;?>",
			dataType:"json",
			data:{
			   realname:$("#realname").val(),
			   email:$("#email").val(),
	           mobile:$("#mobile").val(),
	           sms:$("#sms").val(),
	           idcard:$("#idcard").val(),
	           gender:$('input[name="gender"]:checked').val(),
	           birthday:$("#birthday").val(),
	           sign_notice:$('input[name="sign_notice"]:checked').val() ? 1 : 0,
	           is_show_email:$('input[name="is_show_email"]:checked').val() ? 1 : 0,
	           is_show_mobile:$('input[name="is_show_mobile"]:checked').val() ? 1 : 0,
	           school:$("#school").val(),        
	           group_type:$("#group_type").val(),
	           join_type_1:$("#join_type_1").val(),
	           join_type_2:$("#join_type_2").val(),    
	           remark:$("#remark").val(), 
	           province:$("#province").find('option:selected').text(),   
	           city:$("#city").find('option:selected').text(),   
	           area:$("#area").val(),      
	           signsubmit:true
			},
			success: function(data){
				  if(!data['result']){
					 if(data['tip_type'] == 'career'){
						 $.layer($('#phone_wanshan').html());
					 }else{
						 $("#tip_"+data['tip_type']).html(data['msg']);
					     $("#tip_"+data['tip_type']).css("display","");				     
					 }
					 is_sign = false;
					 $(".b_form_btn").html('提交表单');
					 return false;
				  }else{
					  $.layer($('#phone_chengg').html());
					  setTimeout(function(){window.location.href='<?php echo $this->config->item('base_url'); ?>/look/young/<?php echo $gid; ?>';},3000);
					  
				  }
			    
			}
		});
   }else{
	   $(".b_form_btn").html('提交表单中...');
   }
}

function initial(){
	var tips = ['realname','mobile','idcard','birthday',
			    'upload','sign','entryname','sign_notice','sms'
			   ];

	for(var i=0;i<tips.length;i++){
       $("#tip_"+tips[i]).html('');
	}
}

function hideagree(){
	$("#agreement").hide();
	$("#agreementbg").hide();
}

function use_new_email(){
	$("#email").attr("disabled",false);
}


function is_have_career(){
	$.ajax({
		type: "post",
		url: "/api/member/have_career_info",
		dataType:"json",
		data:{uid:<?php echo $space['uid']; ?>},
		success: function(data){
	      if(!data['result']){
	    	 $.layer($('#phone_wanshan').html());
		  }
		}
    });
}

</script>
<!--content begin-->
<?php if (!$is_info) { ?>
<script type="text/javascript">
$.layer($('#phone_wanshan').html());
</script>
<?php } ?>
<div class="pub-content">
	<div class="pub-w"> 	     
		<!-- 报名信息 -->
		<div class="block_form">
			<div class="b_video_info">
                <dl class="b_form_title"><dt class=" f14px cOrange fY">填写报名信息</dt><dd class="fl cRed">*报名信息填写后不能更改，请您谨慎操作，均为必填项。</dd></dl>
                <div id="b_form_box">
                    <div class="b_video_form b_baoming_form">
                        <dl>
                            <dt><font class="cRed">*</font>真实姓名：</dt>
                            <dd>
                                <input type="text" name="realname" id="realname" class="b_bm_input" value="<?php if (!empty($profile['realname'])) { ?><?php echo $profile['realname'];?><?php } else { ?><?php echo @$sign['realname']; ?><?php } ?>"/>
							    <span style="display:none;color:red" id="tip_realname"></span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>邮箱：</dt>
                            <dd>
                                <input type="text" name="email" id="email" value="<?php echo $space['email']; ?>" <?php if (!empty($space['email'])) { ?> disabled="true" <?php } ?> class="b_bm_input" />
                                <span>
	                                <input type="checkbox" name="is_show_email" <?php if ($space['is_show_email'] == 1) { ?>checked='checked' <?php } ?> />
								         在我的主页显示 
							   </span> 
							   <i onclick="use_new_email()">使用新邮箱</i> <span style="display:none;color:red" id="tip_email"></span>
							</dd>                                                    
                        </dl>
                        <dl>
                            <dt><font class="cRed">*</font>手机号：</dt>
                            <dd>
                                <input type="text" class="b_bm_input" name="mobile" id="mobile" value="<?php echo $space['mobile']; ?>"/>
                                <span>
	                                <input type="checkbox" name="is_show_mobile" <?php if ($space['is_show_mobile'] == 1) { ?>checked='checked' <?php } ?> />
								          在我的主页显示 
							    </span> 
							    <span style="display:none;color:red" id="tip_mobile"></span>
							</dd>
                        </dl>
                        <!--
                        <?php if (!$space['mobilestatus']) { ?>
                        <dl>
                            <dt>验证码：</dt>
                            <dd>
                            	<input id="hQuyzma" type="button" value="免费获取验证码" onclick="sendMessage()" />
                                <input type="text" name="sms" id="sms" class="b_bm_yzm" /><span class="cRed" id="tip_sms" style="display:none"></span>
                            </dd>
                        </dl>
                       <?php } ?>
                        -->
                        <dl>
                            <dt>出生日期：</dt>
                            <dd>
                                <input type="text" class="b_bm_input" readonly name="birthday" id="birthday" value="<?php if (!empty($profile['birthday'])) { ?><?php echo $profile['birthday'];?><?php } else { ?><?php echo @$sign['birthday']; ?><?php } ?>" class="Wdate txt_date fl b_bm_input" type="text" onfocus="WdatePicker({maxDate:'#F{+(\'d5222\')}'})" />
						        <span style="display:none;color:red" id="tip_birthday"></span>
                            </dd>
                        </dl>
                        <dl>
                            <dt><font class="cRed">*</font>身份证号：</dt>
                            <dd>
                                <input type="text" name="idcard" id="idcard" class="b_bm_input" value="<?php echo @$sign['idcard']; ?>"/>
							    <span style="display:none;color:red" id="tip_idcard"></span>
							</dd>
                        </dl>
                        <dl>
                            <dt><font class="cRed">*</font>性别：</dt>
                            <dd>
                                <ul>
								<li>
									<input type="radio" value="1"  name="gender" <?php if (@$sign['gender'] == 1 || @$sign['gender'] == 0) { ?>checked='checked' <?php } ?>/>
									男</li>
								<li>
									<input type="radio" value="2"  name="gender" <?php if (@$sign['gender'] == 2) { ?>checked='checked' <?php } ?>/>
									女</li>
							    <span style="display:none;color:red" id="tip_gender"></span>
							</ul>
                            </dd>
                        </dl>
                        
                        <dl>
                            <dt><font class="cRed">*</font>参赛类别：</dt>
                            <dd>
                                 <select name="join_type_1" id="join_type_1" style="height:32px;">   
                                </select>
                                <select name="join_type_2" id="join_type_2" style="display:none; height:32px;">
                                <option value="">-选择-</option>
                                </select>
                                                                                    备注:<input type="text" name="remark" id="remark" class="b_bm_yzm" value="<?php echo @$sign['remark']; ?>"/>
							     <span style="display:none;color:red" id="tip_join_type_1"></span>
                            </dd>
                        </dl>
                        
                        <dl>
                            <dt><font class="cRed">*</font>参赛组别：</dt>
                            <dd>
                                <select name="group_type" id="group_type" style="height:32px;">
                                <option value="">-选择组别-</option>
                                <option value="1">幼儿组3~6岁</option>
                                <option value="2">小学组7~12岁</option>
                                <option value="3">初中组13~15岁</option>
                                <option value="4">高中组16~18岁</option>
                                </select>
							    <span style="display:none;color:red" id="tip_group_type"></span>
                            </dd>
                        </dl>
                        
                        <dl>
							<dt><font class="cRed">*</font>所在院校：</dt>
							<dd>
								   <input type="text" name="school" id="school" class="b_bm_input" value="<?php echo @$sign['other_colname']; ?>">						           
				                    <span style="display:none;color:red" id="tip_school"></span>
							</dd>
					     </dl>
                        
                        <dl>
                            <dt>家庭住址：</dt>
                            <dd>
                                <select id="province" name="province" style="height:32px;"></select>
                                <select id="city" name="city" style="height:32px;"></select>
                                
                                <!-- <input type="text" name="province" class="b_bm_yzm" id="province" value="<?php echo @$sign['province']; ?>"/>省/市-->
                                <!-- <input type="text" name="city" class="b_bm_yzm" id="city" value="<?php echo @$sign['city']; ?>"/>区-->
                                <input type="text" name="area" class="b_bm_input" id="area" value="<?php echo @$sign['area']; ?>"/>
							    <span style="display:none;color:red" id="tip_area"></span>
                            </dd>
                        </dl>
                        
                        <dl>
                            <dt></dt>
                            <dd>
                                <h3>
                                    <input type="checkbox" name="sign_notice" value="1" checked="true"/>
	                                <a href="javascript:;void(0)" onclick="$.layer($('#wintmpl1').html());" style="color:#009fb9">《报名参赛须知》</a>
	                                <span style="display:none;color:red" id="tip_sign_notice"></span>
                                </h3>
                            </dd>
                        </dl>
                        <div class="b_video_btn"><span class="b_form_btn f14px" onclick="sign()">提交表单</span>
                    </div>
                </div>
			</div>
		</div>
	</div>
</div>
<script type="text/tmpl" id="wintmpl1">
<div class="pub-win tcbg">
	<h2 class="f16px fY cWhite"><span onclick="$.layer()"></span>活动要求</h2>
	<dl>
		<dd>
			<div>
				<h3 class="fB">活动的整体要求：</h3>
				1、着装要求：
					<p>（1）  外表：青春、健康、积极向上、整洁大方。</p>
					<p>（2）  服饰：参赛选手应根据自己舞蹈种类来挑选相应风格的服装，不得有不健康内容的图案、文字、饰物和道具，否则视具体情况扣分。</p>
				2、成套编排：
					<p>（1）艺术性：</p>
					<p>①  充满活力，积极向上，有创造性，具有流畅的过渡动作，丰富的队型变化</p>
					<p>②  必须显示身体全面的协调能力和活力而应避免重复。</p>
					<p>动作设计中应包含有一种或多种类型的舞蹈动作和技巧动作，成套动作中的舞蹈、技巧、造型和队型变化应始终保持完整性。</p>
					<p>③  舞蹈的动作设计要遵循健康和安全的原则，并体现项目特点。不提倡做力所不能及的难度动作。</p>
					<p>④  表现力丰富，富有激情、感染力强，有良好的团队配合和交流，并能充分体现团队精神。</p>
					<p>(2）完成：　</p>
					<p>成套动作的完成应符合所选舞蹈种类的特色，动作优美。</p>
					<p>动作完成能体现所选择动作类型的风格和特点。</p>
					<p>动作完成轻松流畅，技术高超，没有失误。</p>
				1、着装要求：
					<p>（1）  外表：青春、健康、积极向上、整洁大方。</p>
					<p>（2）  服饰：参赛选手应根据自己舞蹈种类来挑选相应风格的服装，不得有不健康内容的图案、文字、饰物和道具，否则视具体情况扣分。</p>
				2、成套编排：
					<p>（1）艺术性：</p>
					<p>①  充满活力，积极向上，有创造性，具有流畅的过渡动作，丰富的队型变化</p>
					<p>②  必须显示身体全面的协调能力和活力而应避免重复。</p>
					<p>动作设计中应包含有一种或多种类型的舞蹈动作和技巧动作，成套动作中的舞蹈、技巧、造型和队型变化应始终保持完整性。</p>
					<p>③  舞蹈的动作设计要遵循健康和安全的原则，并体现项目特点。不提倡做力所不能及的难度动作。</p>
					<p>④  表现力丰富，富有激情、感染力强，有良好的团队配合和交流，并能充分体现团队精神。</p>
					<p>(2）完成：　</p>
					<p>成套动作的完成应符合所选舞蹈种类的特色，动作优美。</p>
					<p>动作完成能体现所选择动作类型的风格和特点。</p>
					<p>动作完成轻松流畅，技术高超，没有失误。</p>
			</div>
		</dd>
		<dt><a href="javascript:;" onclick="$.layer()">接受</a></dt>
	</dl>
</div>
</script>
<script type="text/tmpl" id="phone_wanshan">
<div class="phone-tan">
	<h2><span onClick="$.layer()" class="win-close" href=""></span>完善职业信息</h2>
    <dl>
    	<dt class="fY f14px">完善<a class='cRed' href="">职业信息</a>！<p class="f12px">可以获得两张直投票哦！不要错过机会，赶紧去完善吧！</p></dt>
        <dd></dd>
    </dl>
</div>
</script>
<script type="text/tmpl" id="phone_chengg">
<div class="phone-tan" style="width:200px;">
	<h2><span onClick="$.layer()" class="win-close" href=""></span>报名成功</h2>
    <dl>
    	<dt class="fY f14px">报名成功！</dt>
        <dd></dd>
    </dl>
</div>
</script>

<!--content end--> 
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
        initial_mobile();
		$.ajax({
			type: "post",
			url: "/space/set/is_mobile_binded",
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
	 initial_mobile();
	 $.ajax({
				type: "post",
				url: "/space/set/send_set_sms",
				dataType:"json",
				data:{mobile:$("#mobile").val(),source:'signup_mobile'},
				success: function(data){
					 $("#tip_"+data['tip_type']).html(data['msg']);
				     $("#tip_"+data['tip_type']).css("display","block");
				}
	  });
}

function initial_mobile(){
	$("#tip_sms").html("");
	$("#tip_mobile").html("");
}

function get_subcate(id, level){
	 $.ajax({
				type: "post",
				url: "/api/category/subcate/"+id,
				dataType:"json",
				data:{},
				success: function(res){
					 if(res.code>0) {
                         var node = res.list;
                         var html = '<option value="">-选择-</option>';
                         var is_children = false;
                         for(var i in node.children){
                        	 is_children = true;
                        	 html += '<option value="'+node.children[i].id+'">'+node.children[i].category+'</option>';
                         }
                         if(is_children) {
                             $('#join_type_2').show();
                         }else {
                        	 $('#join_type_2').hide();
                         }                         
                         $('#join_type_'+level).html(html);
					 }
				}
	  });
}

$('#join_type_1').change(function() {
	var id=$(this).children('option:selected').val();
	get_subcate(id, 2);

	$('#tip_join_type_1').html('');
	$('#tip_join_type_1').hide(); 
});

$('#join_type_2').change(function() {
	var id=$(this).children('option:selected').val();
	$.ajax({
		type: "post",
		url: "/api/category/getdesc/"+id,
		dataType:"json",
		data:{},
		success: function(res){
			 if(res.code>0) { 
				 $('#tip_join_type_1').show();                
                 $('#tip_join_type_1').html(res.desc);
			 }
		}
});
});

$(document).ready(function(){
	get_subcate(<?php echo $game['cid'];?>, 1);
	$('#tip_join_type_2').hide();  

	showLocation();
});

function showLocation(province , city) {
	
	var loc	= new Location();
	var title	= ['省份' , '地级市'];
	$.each(title , function(k , v) {
		title[k]	= '<option value="">'+v+'</option>';
	})
	
	$('#province').append(title[0]);
	$('#city').append(title[1]);
	
	
	$('#province').change(function() {
		$('#city').empty();
		$('#city').append(title[1]);
		loc.fillOption('city' , '0,'+$('#province').val());
	})
	
	if (province) {
		loc.fillOption('province' , '0' , province);
	
		if (city) {
			loc.fillOption('city' , '0,'+province , city);
		}
		
	} else {
		loc.fillOption('province' , '0');
	}
		
}
</script>
<?php $this->load->view('public/footer.php'); ?>
