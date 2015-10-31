<?php $this->load->view('public/20141107/head.php'); ?>
<script type="text/javascript" src="/public/data/assets/js/ajaxfileupload.js"></script>
<script type="text/javascript" src="/public/data/assets/js/rili/WdatePicker.js"></script>
<script src="http://img2.saiku.com.cn/static/assets/city/location.js"></script>
<script type="text/javascript">
var is_uploading = false;
var isUpload = false;
var is_sign = false;
var pubbtnstatus = true;
//上传图片
function UploadShareImg(id){
    pubbtnstatus = false; 
    $("#pub-btn").css("background","none repeat scroll 0% 0% rgb(204, 204, 204)");
    if(!isUpload){
    	isUpload = true;
        $("#tip_upload_"+id).html('图片加载中...');
        $("#tip_upload_"+id).css("display","inline");
		$.ajaxFileUpload({
			url:"/space/sign/upload",
			secureuri:false,
			fileElementId:'signimage_'+id,
			dataType:'json',
			data:{id:id},
			success:function(result)
			{
				if(result.status)
				{
					var orgimg = result.src;
					var thumbimg = 'thumb_'+result.src;
				    $("#orgimg_"+id).val(orgimg);
				    $("#thumbimg_"+id).val(thumbimg);
				    $("#image_cut").val(orgimg);
					//放到裁剪区
				    source_object.image.source = '<?php echo $this->config->item('img2_url'); ?>/images/sign/'+orgimg;
				    source_object.image.width = result.width;
				    source_object.image.height = result.height;
				    $('#cropzoom_container').cropzoom(source_object);
				    $("#img_to_crop").attr('href','<?php echo $this->config->item('img2_url'); ?>/images/sign/'+orgimg);
				    
				    
		            $("#tc_register").show();
			  		$(".WINBG").show();	   
				    $("#tip_upload_"+id).html('上传成功');
				    $("#tip_upload_"+id).css("display","inline");
				    $("#maxsize").css("display","none");
				    $("#generated").attr("src", "<?php echo $this->config->item('img2_url'); ?>/zhuanti/show/img/head.gif");
				    $("#image_cut_filepath").val('');
		            pubbtnstatus = true;
		            $("#pub-btn").css("background","none repeat scroll 0% 0% rgb(252, 142, 44)");
				}
				else
				{
				   $("#orgimg_"+id).val('');
				   $("#thumbimg_"+id).val('');
				   $("#tip_upload_"+id).html(result.msg);
				}
				isUpload = false;
			},
			error:function ()
			{
				$("#tip_upload_"+id).html('网络错误,请重新上传!');
				$("#maxsize").css("display","inline");
				isUpload = false;
			}
			});
    }else{
    	$("#tip_upload_"+id).html('图片加载中...');
    	$("#tip_upload_"+id).css("display","inline");
    }
}

function sign(){
   if(!is_sign){
	    is_sign = true;
	    $("#over").css("display","inline");
	    initial();
		$.ajax({
			type: "post",
			url: "/space/sign/show/<?php echo $gid;?>",
			dataType:"json",
			data:{
			   realname:$("#realname").val(),
			   email:$("#email").val(),
	           mobile:$("#mobile").val(),
	           sms:$("#sms").val(),
	           idcard:$("#idcard").val(),
	           gender:$('input[name="gender"]:checked').val(),
	           career:$('input[name="career"]:checked').val(),
	           province:$("#province").find('option:selected').text(),   
	           city:$("#city").find('option:selected').text(),   
	           area:$("#area").val(),
	           sign_notice:$('input[name="sign_notice"]:checked').val() ? 1 : 0,
	           is_show_email:$('input[name="is_show_email"]:checked').val() ? 1 : 0,     
	           orgimg:$("#orgimg_life").val(),
	           thumbimg:$("#thumbimg_life").val(),     
	           signsubmit:true
			},
			success: function(data){
				  if(!data['result']){
					  $("#tip_"+data['tip_type']).html(data['msg']);
					  $("#tip_"+data['tip_type']).css("display","");
					 is_sign = false;
					 $("#over").css("display","none");
					 return false;
				  }else{
					  window.location.href = '<?php echo $this->config->item('base_url'); ?>/show/home';
				  }
			    
			}
		});
   }else{
	   $("#over").css("display","inline");
   }
}

function initial(){
	var tips = ['realname','mobile','idcard','career','area',
	        	'upload','sign','sign_notice','sms'
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
</script>
<!--content begin-->
<div class="s_index fY">
	<div class="s_reg"><h2>填写报名信息</h2></div>
    <div class="s_regbox">
    	<h2>*报名信息填写后不能更改，请您谨慎操作。</h2>
        <div class="b_video_form">
            <dl class="bg">
                <dt>真实姓名：</dt>
                <dd>
                     <input type="text" name="realname" id="realname" class="b_bm_input" value="<?php if (!empty($profile['realname'])) { ?><?php echo $profile['realname'];?><?php } else { ?><?php echo @$sign['realname']; ?><?php } ?>"/>
				  	<span style="display:none;color:red" id="tip_realname"></span>
                </dd>
            </dl>
            <dl>
                <dt class="no">邮箱：</dt>
                <dd>
                        <input type="text" name="email" id="email" value="<?php echo $space['email']; ?>" <?php if (!empty($space['email'])) { ?> disabled="true" <?php } ?> class="b_bm_input" />
                         	<b>
	                        <input type="checkbox" name="is_show_email" <?php if ($space['is_show_email'] == 1) { ?>checked='checked' <?php } ?> />
						         在我的主页显示 </b>
					   <i onclick="use_new_email()">使用新邮箱</i> <span style="display:none;color:red" id="tip_email"></span>
                   </dd>
            </dl>
            <dl class="bg">
                <dt>身份证号：</dt>
                <dd>
                        <input type="text" name="idcard" id="idcard" class="b_bm_input" value="<?php echo @$sign['idcard']; ?>"/>
						<span style="display:none;color:red" id="tip_idcard"></span>
                   </dd>
            </dl>
            <dl>
                <dt>性别：</dt>
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
            <dl class="bg">
              <dt>职业：</dt>
                <dd>
                    <!--<input class="b_bm_duan" type="text" name="career" id="career" value="" />-->
                    <ul>
					<li>
						<input type="radio" value="专业演员"  name="career" />
						专业演员</li>
					<li>
						<input type="radio" value="在校学生"  name="career" />
						在校学生</li>
					<li>
						<input type="radio" value="业余爱好者"  name="career" />
						业余爱好者</li>
				    <span style="display:none;color:red" id="tip_career"></span>
				</ul>
                </dd>
            </dl>
            <!--<dl>
                <dt>所在院校：</dt>
                <dd>
                    <input type="text" name="school" id="school" class="b_bm_input" value="<?php echo @$sign['other_colname']; ?>">						           
				    <span style="display:none;color:red" id="tip_school"></span>
            </dl>-->
            <dl>
              <dt class="no">家庭住址：</dt>
                <dd>
                        
                        <select id="province" name="province"></select><em class="sanjiao"></em>
                        <select id="city" name="city"></select><em class="sanjiao"></em>
                        <input type="text" name="area" class="b_bm_duan2" id="area" value="<?php echo @$sign['area']; ?>" style="float:left;width:122px" />
					    <span style="display:none;color:red" id="tip_area"></span>
                    </dd>
                    
            </dl>
            <dl class="bg">
              <dt>上传生活照：</dt>
                <dd class="uploader">
                    <!--<input type="text" class="filename" readonly/><input type="button" name="file" class="button" value="选择照片"/><input type="file" size="30"/>
                    <span style="display:none;color:red" id="tip_upload_life"></span>-->
                    
                    
                    	<script>
							var orgimg = '<?php echo @$sign[4]['value']; ?>';
                            var imgname = orgimg.slice(orgimg.lastIndexOf('/')+1);
                        </script>
                    	<input type="text" class="filename" id="image_cut" value="" /><input type="button" name="file" class="button" value="选择照片"/><i id="maxsize">(图片最大5M)</i>
                    	<input type="hidden" name="image_cut_filepath" id="image_cut_filepath" value="">
                        <?php if(isset($sign['orgimg']) && !empty($sign['orgimg'])){ ?>
                            <span id="formerimg_life" style="left: 80px;width: 160px;overflow:hidden;"><?php echo str_replace('/','',@$sign_ext[4]['value']);?></span>
                        <?php }else{ ?>
                            <span id="formerimg_life" style="display:none"></span>
                        <?php } ?>
					    <input type="file" size="30" name="signimage_life" id="signimage_life" onclick="$('#formerimg_front').hide();" onchange="UploadShareImg('life')">
					    <input type="hidden" name="orgimg_life" id="orgimg_life" value="<?php echo @$sign_ext[4]['value']; ?>">
					    <input type="hidden" name="thumbimg_life" id="thumbimg_life" value="">
					    <span style="display:none;color:red" id="tip_upload_life"></span>
					    
                </dd>
            </dl>
            <dl>
                <dt>手机号：</dt>
                <dd>
                        <?php if (!$space['mobilestatus']) { ?>
                            <input type="text" class="b_bm_input" name="mobile" id="mobile" value="<?php echo $space['mobile']; ?>"/>
	                        <input id="hQuyzma" type="button" value="获取验证码" onclick="sendMessage()" />
	                        <input class="b_bm_yzm" type="text" name="sms" id="sms" value="填写验证码" initvalue="填写验证码" onfocus="hidesms();" onblur="showsms();" />
                        <?php } else { ?>
                         	<input type="text" class="b_bm_input" name="mobile" id="mobile" disabled="true" value="<?php echo $space['mobile']; ?>"/>
                        <?php } ?>
                        <br />
					    <span style="display:none;color:red" id="tip_mobile"></span>
					    <span class="cRed" id="tip_sms" style="display:none"></span>
                    </dd>
                
            </dl>
            <div class="b_video_ford">
                <h3><input class="fl" style="margin-top:2px;" type="checkbox" name="sign_notice" id="sign_notice" value="1" checked="true" />
	                        &nbsp;&nbsp;<a href="javascript:;void(0)" onClick="$.layer($('#wintmpl1').html());">我同意《报名参赛须知》里的所有内容</a>
	                        <span id="tip_sign_notice" style="display:none;color:red"></span>
                        </h3>
            </div>
            <div class="b_video_btn"><span class="s_button" onClick="sign()" title="我填好了">提交表单</span><span id="over" style="display:none;">处理中，请稍后...</span></div>
        </div>
    </div>
</div>
<!--content end-->
<div class="crop" id="tc_register" style="display:none">
   <div id="cropzoom_container"></div>
   <span id="cut"></span>
   <div id="preview"><img id="generated" src="<?php echo $this->config->item('img2_url'); ?>/zhuanti/show/img/head.gif"  /></div>
   <div class="page_btn">
      <input type="button" class="btn" id="crop" value="剪切照片" />
      <input type="button" class="btn" id="restore" value="照片复位" />
   </div>
   <div class="page_btn">
      <input type="button" class="s_button" id="s_button" value="提交照片" />&nbsp;<span id="tip_s_button" style="color:red;display:none"></span>
   </div>
   <div class="clear"></div>
</div>
<div class="WINBG" style="display:none; opacity:0.6;"></div>
<script type="text/tmpl" id="wintmpl1">
<div class="pub-win tcbg" style="background:#fff">
	<h2 class="f16px fY cWhite">比赛报名协议</h2>
	<dl>
		<dd>
			<div>
				<p class="fB">协议双方：</p>
                <p></p>
                <p class="fB">1.	甲方：____________________比赛组委会</p>
                <p class="fB"></p>
                <p class="fB">2.	乙方：____________________用户</p>
                <p></p>
                <p></p>
                <p>鉴于：</p>
                <p></p>
                <p>1.	甲方系一家依照中华人民共和国法律在中国境内合法设立的有限公司，尚处于正常运营状态。</p>
                <p></p>
                <p>2.	乙方系自愿参加甲方举办的本次比赛的选手，并愿意按照本协议的约定报名参加本次比赛。</p>
                <p></p>
                <p>3.	甲方作为本次比赛的举办者，愿意本着“公开、公平、公正”的原则举办本次比赛，并为乙方提供一个良好的竞争平台。</p>
                <p></p>
                <p>4.	甲乙双方一致同意按照《中华人民共和国合同法》和相关的法律法规，根据平等互利的原则达成如下协议：</p>
                <p></p>
                <p class="fB">一、	合同目的</p>
                <p></p>
                <p>甲乙双方为保证本次比赛的顺利进行而订立本协议。</p>
                <p></p>
                <p class="fB">二、	双方的权利与义务</p>
                <p></p>
                <p>2.1	甲方的权利和义务</p>
                <p></p>
                <p>2.1.1	甲方及/或其关联公司对本活动的编排、设计、内容（包括但不限于专有内容、原创内容以及其他通过授权取得的内容等）享有完全的知识产权。乙方不得以任何形式侵犯该知识产权；否则，乙方需承担法律责任。</p>
                <p></p>
                <p>2.1.2	本活动所有设计图样以及其他图样、产品及服务名称，均为甲方及/或其关联公司享有相关知识产权的商标、商号和标识。除非甲方以书面形式表示同意，否则任何人不得使用、复制或用作其他用途。</p>
                <p></p>
                <p>2.1.3	甲方有权将乙方为参加本次比赛提交的全部资料（包括但不限于报名信息和参赛作品）用于与本次比赛相关的宣传、征集、推广等活动。</p>
                <p></p>
                <p>2.1.4	乙方的参赛作品一经提交，甲方无义务退还。</p>
                <p></p>
                <p>2.1.5	甲方将视乙方为其所提交的参赛作品的知识产权权利人。乙方的参赛作品一经提交，即表明乙方同意向甲方授予其参赛作品在全球范围内的免费的、不可撤销的、无限期的信息网络传播权和汇编权。甲方有权传播和使用该参赛作品，包括但不限于对该参赛作品进行网络传播、网络宣传、制作比赛作品集锦和比赛评选等。</p>
                <p></p>
                <p>2.1.6	为确保本次比赛的顺利进行，甲方有权在必要的范围内披露乙方的相关个人信息，包括但不限于姓名、性别、学校、作品信息等。</p>
                <p></p>
                <p>2.1.7	甲方有权对本活动的全部流程进行审查和监督。若甲方收到第三方关于乙方参赛作品的举报，甲方有权要求乙方协助甲方对举报进行的调查，并有权要求乙方提供相应文件进行核实；甲方也有权直接采取必要的措施以制止或纠正乙方的行为，这些措施包括但不限于拒绝接受乙方的参赛作品或取消乙方的参赛资格等。</p>
                <p></p>
                <p>2.1.8	若乙方的参赛作品引起甲方或其他相关方的反感，甲方有权拒绝接受该参赛作品或取消乙方的参赛资格。</p>
                <p></p>
                <p>2.2	乙方的权利与义务</p>
                <p></p>
                <p>2.2.1	乙方通过本次比赛指定的官方渠道报名参赛并提交作品即视为其已同意本协议的全部条款，并愿意受其约束。</p>
                <p></p>
                <p>2.2.2	本活动所包含的所有元素（如他人的参赛作品、活动中包含的商标、商号和标识等）均受法律（包括但不限于著作权法、商标法、专利法等）保护。未经相关权利人同意以及甲方明示书面授权许可，乙方不得以任何形式进行使用，包括但不限于以复制、发行、出租、展览、表演、放映、广播、通过信息网络传播、摄制、改编、翻译或汇编、反向工程等形式的使用。</p>
                <p></p>
                <p>2.2.3	除非经甲方同意，否则乙方不得利用本次比赛做任何商业宣传或以任何商业目的参加本次比赛。</p>
                <p></p>
                <p>2.2.4	乙方须保证其报名参赛所填写的姓名、性别、学校、身份证号码、住所、联系方式等信息真实、准确、完整。乙方需承担因提交的信息不真实、不准确、不完整所造成的无法参赛或比赛成绩被取消等后果。除非经甲方同意，否则，乙方提交的报名信息及参赛作品一经确认便不可再修改。</p>
                <p></p>
                <p>2.2.5	乙方有义务保证其参赛作品的内容完整、积极向上并符合我国的法律、法规。乙方参赛作品的内容不得包含下列任何内容：</p>
                <p></p>
                <p>i)	违反中国法律、法规、规章等规定的内容，包括但不限于危害国家安全、泄露国家秘密、颠覆国家政权、破坏国家统一、破坏民族团结、损害国家荣誉和利益、煽动民族仇恨、民族歧视、破坏民族团结、破坏国家宗教政策、宣扬邪教和封建迷信、淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪、侮辱或者诽谤他人、侵害他人合法权益等内容；</p>
                <p>ii)	危害未成年人的内容；</p>
                <p>iii)	乙方无权包含的内容，包括但不限于商业秘密、第三方隐私等；</p>
                <p>iv)	侵犯其他任何第三方合法权利的内容；</p>
                <p>v)	损害甲方商业利益的内容，包括但不限于发布的未经甲方许可的商业广告等。</p>
                <p>每一个参赛作品均需经本次赛事的组委会审核后，方可确定是否可以参赛。</p>
                <p></p>
                <p>2.2.6	乙方应保证其享有参赛作品的完整知识产权，且作品中的内容不存在知识产权权属纠纷，并保证其有权使用其参赛作品中所涉及的所有元素，包括但不限于音乐、编舞、剧本、背景等。</p>
                <p></p>
                <p>2.2.7	乙方应保证参赛作品不侵犯任何第三方的合法权利，包括但不限于知识产权、姓名权、名誉权、肖像权、隐私权等。若甲方收到第三方关于乙方参赛作品的举报，乙方有义务协助甲方对举报进行的调查。甲方要求乙方提供相应文件进行核实的，乙方应予以配合。</p>
                <p></p>
                <p>2.2.8	乙方应就其参赛作品所涉及的任何法律纠纷承担一切法律责任。若因乙方提供的作品导致任何第三方与甲方之间发生纠纷，包括但不限于知识产权、姓名权、名誉权、肖像权、隐私权等纠纷，乙方有义务配合甲方处理纠纷案，并向甲方提供必要的协助。在此种情况下，甲方还保留要求乙方承担法律责任的权利（包括但不限于要求乙方承担对甲方及其分公司、关联公司、代理人、其他合作伙伴及员工的损害赔偿责任等）。</p>
                <p></p>
                <p>2.2.9	对于每个具体的比赛项目，乙方只能提交一个作品（由于赛制安排需提交多个作品的情况除外）。若乙方重复提交，甲方将有权取消乙方的参赛资格或从乙方提交的多份作品中择其一份作为乙方的参赛作品。</p>
                <p></p>
                <p>2.2.10	若比赛规定或允许乙方以在甲方及/或其关联公司网站进行用户注册的方式参加比赛，则乙方在遵守本协议的同时还应遵守《网站用户注册协议》中的全部规定。</p>
                <p></p>
                <p>2.2.11	若比赛规定或允许乙方以上传视频的方式提交参赛作品，则乙方在遵守本协议的同时还应遵守《视频上传协议》中的全部规定。</p>
                <p></p>
                <p>2.2.12	若根据比赛规定，乙方可以在甲方以外的其他网站或网络平台上，以上传作品的方式提交参赛作品，乙方有义务保证其为比赛目的而分享到其他网站上的作品内容与上传至甲方网站上的作品内容完全相同；否则一经发现，甲方有权立即取消乙方的参赛资格。</p>
                <p></p>
                <p>2.2.13	乙方可自愿配合甲方完成与本次比赛相关的宣传推广和后期制作等活动，包括但不限于培训、彩排、论坛、典礼、采访及拍摄等。</p>
                <p></p>
                <p>2.2.14	在网络评选过程中，乙方不得恶意注册多个账号进行投票，或以其他不当方式干扰或影响比赛结果。</p>
                <p></p>
                <p>2.2.15	本次比赛各项奖励都未缴纳各种所得税和政府税费，获得奖励的乙方应自行缴纳与奖项有关的各种税费，但法律法规另有规定的除外。</p>
                <p></p>
                <p>2.2.16	本次比赛所有奖项的设置以甲方的规定为准，除非甲乙双方另有约定，否则乙方无权替换或交换任何奖品。</p>
                <p></p>
                <p class="fB">三、	违约责任</p>
                <p></p>
                <p>甲方有权判断乙方是否违反了本协议的约定。若乙方违约，甲方有权采取适当的应对措施，这些措施包括但不限于向乙方发出通知，要求其补正和/或改正相应的行为、拒绝接受乙方的参赛作品、直接取消乙方的参赛资格等，且甲方不因采取上述措施而对乙方或任何第三方承担任何法律责任。若乙方违约行为给甲方造成损失的，甲方还有权要求乙方赔偿相应的损失。</p>
                <p></p>
                <p class="fB">四、	不可抗力</p>
                <p></p>
                <p>若因以下任一原因导致甲方暂停、中断、推迟或终止履行本协议，不视为甲方违反本协议的约定，且甲方不对因此产生的后果负责：</p>
                <p></p>
                <p>i)	自然灾害：如地震、台风、水灾、火灾等；</p>
                <p>ii)	社会事件：如战争、武装冲突、罢工、骚乱、暴动等；</p>
                <p>iii)	法律法规的修改或政府禁令的下达；</p>
                <p>iv)	在通过网络提交参赛作品的情况下，互联网络服务不稳定、计算机遭遇病毒或黑客攻击；</p>
                <p>v)	其他甲方不能预见并且对其发生和后果不能防止或避免的不可抗力。</p>
                <p></p>
                <p class="fB">五、	免责条款</p>
                <p></p>
                <p>5.1	若乙方的参赛作品的评选工作因第三方行为（包括但不限于破坏投票、评分过程等）而受到影响，甲方不承担责任。</p>
                <p></p>
                <p>5.2	若比赛规则允许乙方在甲方统一安排的场所以外进行比赛（如线下自行录制视频等），乙方应对其人身或财产负责。若乙方在准备参赛作品过程中受到任何人身或财产损害，甲方不承担任何责任。</p>
                <p></p>
                <p>5.3	对于任何因第三方使用乙方的参赛作品（包括但不限于复制、发行、出租、展览、表演、放映、广播、通过信息网络传播、摄制、改编、翻译或汇编）而导致的侵犯乙方合法权利的行为，甲方不承担任何责任。</p>
                <p></p>
                <p>5.4	对于乙方未经相关权利人同意，而以任何形式使用了本活动所包含的元素（如他人的参赛作品、活动中包含的商标、商号和标识等）的行为，甲方不承担任何责任。</p>
                <p></p>
                <p class="fB">六、	协议变更、终止与解除</p>
                <p></p>
                <p>6.1	甲方有权修改本协议。甲方可通过适当方式向乙方通知其所做的修改。乙方有权因不同意甲方所做的修改而退赛。若乙方继续参加比赛，则视为乙方完全接受甲方所做的修改。</p>
                <p></p>
                <p>6.2	若出现本协议第三条和第四条所规定的情形，甲方有权单方面终止或解除本协议。</p>
                <p></p>
                <p>6.3	本协议解除或者因其他原因终止后，不影响甲方追究乙方的赔偿责任。</p>
                <p></p>
                <p class="fB">七、	本合同的可分割性</p>
                <p></p>
                <p>如果本协议中的任何条款被认为无效或不可执行，其余部分仍应继续有效。</p>
                <p></p>
                <p class="fB">八、	法律管辖和争议解决</p>
                <p></p>
                <p>本协议适用中华人民共和国法律。凡因本协议引起的或与本协议有关的任何争议，由双方友好协商解决。协商不成时，双方任何一方均有权向甲方所在地具有管辖权的人民法院提起诉讼。</p>
                <p></p>
                <p class="fB">九、	甲方对本协议拥有最终解释权。</p>
			</div>
		</dd>
		<dt><a href="javascript:;" onclick="accept();">接受</a></dt>
	</dl>
</div>
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
				data:{mobile:$("#mobile").val(),source:'sign'},
				success: function(data){
					 $("#tip_"+data['tip_type']).html(data['msg']);
				     $("#tip_"+data['tip_type']).css("display","block");
				}
	  });
}

function checkinvitecode(){
	 $("#tip_invitecode").html("");
	 $.ajax({
				type: "post",
				url: "/space/sign/checkinvitecode",
				dataType:"json",
				data:{invitecode:$("#invitecode").val()},
				success: function(data){
					 if(!data['result']){
						 $("#tip_"+data['tip_type']).html(data['msg']);
						 $("#tip_"+data['tip_type']).css("display","inline");
				 	 }
				}
	  });
}

function initial_mobile(){
	$("#tip_sms").html("");
	$("#tip_mobile").html("");
}

function accept(){
	document.getElementById("sign_notice").checked = true;
	$.layer();
}
</script>
<script type="text/javascript">
var source_object = {
        width: 600,
        height: 420,
        bgColor: '#ccc',
        enableRotation: true,
        enableZoom: true,
        selector: {
			   w:300,
			   h:235,
			   showPositionsOnDrag:true,
			   showDimetionsOnDrag:false,
             centered: true,
			   bgInfoLayer:'#fff',
             borderColor: 'blue',
			   animated: false,
			   maxWidth:300,
			   maxHeight:235,
             borderColorHover: 'yellow'
         },
         image: {
             source: '<?php echo $this->config->item('img2_url'); ?>/zhuanti/show/img/head.gif',
             width: 800,
             height: 400,
             minZoom: 5,
             maxZoom: 100
          }
    };
$(function() {
	 showLocation();
     var cropzoom = $('#cropzoom_container').cropzoom(source_object);
	 $("#crop").click(function(){
		  cropzoom.send('<?php echo $this->config->item('i_url'); ?>/space/uploadlife', 'POST', {}, function(imgRet) {
               $("#generated").attr("src", imgRet+"?r="+Date.parse(new Date()));
               $("#image_cut_filepath").val(imgRet+"?r="+Date.parse(new Date()));
          });			   
	 });
	 $("#restore").click(function(){
		  $("#generated").attr("src", "<?php echo $this->config->item('img2_url'); ?>/zhuanti/show/img/head.gif");
		  cropzoom.restore();					  
	 });
	 $("#s_button").click(function(){
		  if($("#image_cut_filepath").val() == ''){
				$("#tip_s_button").html("请先剪切照片!");
				$("#tip_s_button").css("display","inline");
		  }else{
			   $("#tip_s_button").html("");
			   $("#tip_s_button").css("display","none");
			   $("#tc_register").hide();
			   $(".WINBG").hide();	
		  }				  
	});
});
</script>
<script>
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

function hidesms(){
	if($("#sms").val() == '填写验证码'){
		$("#sms").val('');
	}
}

function showsms(){
	if($("#sms").val() == ''){
		$("#sms").val('填写验证码');
	}
}

function accept(){
	document.getElementById("sign_notice").checked = true;
	$.layer();
}
</script>
<?php $this->load->view('public/20141107/foot.php'); ?>
