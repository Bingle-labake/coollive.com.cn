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
.y1,.y2,.y3{width: 80px;border: 1px solid #B3B3B3;margin: 0 10px 0 0;padding: 5px;height: 22px;}
#loc_province,#loc_city,#loc_town{height:32px;overflow:hidden;width:100px; vertical-align:middle;}
.head_active {background:#ed6d34; text-decoration:none;}
.pub_confirm{background:#fff;width:400px;text-align:center;overflow:hidden;font-size:14px;line-height:30px;}
.pub_confirm p{font-size:12px;padding:20px;text-indent:24px;text-align:left;}
.pub_confirm h3{text-align:right;font-size:12px;padding:20px;}
.pub_confirm h2{width:360px;overflow:hidden;height:26px;padding:12px 20px 0;background:#efa280;line-height:18px;}
</style>

<script type="text/javascript" src="/public/data/assets/js/ajaxfileupload.js"></script>
<script type="text/javascript" src="/public/data/assets/js/rili/WdatePicker.js"></script>
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
        $("#tip_upload_"+id).html('图片正在上传中...');
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
				    $("#tip_upload_"+id).html('上传成功');
				    $("#tip_upload_"+id).css("display","inline");
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
				
			}
			});
    }else{
    	$("#tip_upload_"+id).html('图片正在上传中...');
    	$("#tip_upload_"+id).css("display","inline");
    }
}

/**
 * 上传报名表单
 */
function UploadForm(input_name,sid){
	if(!is_uploading){
		is_uploading = true;
		$("#clickupload").html("图片正在上传中...");
		$.ajaxFileUpload({
			url:"/space/sign/uploadform",
			secureuri:false,
			fileElementId:'signform',
			dataType:'json',
			data:{input_name:input_name,sid:sid},
			success:function(result)
			{
				if(result.status)
				{
				    $("#tip_signform").html('上传成功,本次报名流程已全部结束!');
				}
				else
				{
					$("#tip_signform").html('图片上传失败，请重新上传!');
				}
				$("#tip_signform").show();
				is_uploading = false;
				$("#clickupload").html("点击开始上传");
				setTimeout(function(){$("#tip_signform").hide();},3000);
			},
			error:function ()
			{
				$("#tip_signform").html('图片上传失败，请重新上传!');
				is_uploading = false;
				$("#clickupload").html("点击开始上传");
			}
			});
	}else{
       $("#clickupload").html("图片正在上传中...");
	}
}

function sign(){
    if(!pubbtnstatus){return;}
    var entry = $('input[name="entryform"]:checked').val();
    var yanyuan = yanyuannum = '';
	initial();
	if(entry < 4){//群舞之外的参赛形式
	       yanyuan = check_entryform_yy();
	       if(yanyuan == ''){
	         $("#tip_yanyuan").html('请填写完整演员姓名');
	         $("#tip_yanyuan").css("display","block");
	         return false;
	       }
    }else{//群舞
       if($("#yanyuannum").val() == ''){
    	   $("#tip_yanyuannum").html('请填写演员人数');
           $("#tip_yanyuannum").css("display","block");
           return false;
       }
       
       if(!is_number($("#yanyuannum").val())){
			 $("#tip_yanyuannum").html("演员人数只能是数字");
			 $("#tip_yanyuannum").css("display","block");
			 return false;
	    } 
  }
   var is_expertise = $('input[name="is_expertise"]:checked').val();
   if(typeof is_expertise == 'undefined'){
     $("#tip_expertise").html('请选择院校类型');
     $("#tip_expertise").css("display","inline");
     return false;
   }
   if(!is_sign){
	    is_sign = true;
	    $(".b_form_btn").html('提交表单中...');
		$.ajax({
			type: "post",
			url: "/apply/dance/"+$("#gid").val(),
			dataType:"json",
			data:{
			   realname:$("#realname").val(),
			   is_student:$('input[name="is_student"]:checked').val(),//是否学生
			   is_expertise:is_expertise,//是否专业
			   project:$("#project").val(),//节目名称
			   email:$("#email").val(),
	           mobile:$("#mobile").val(),
	           idcard:$("#idcard").val(),
	           gender:$('input[name="gender"]:checked').val(),
	           birthday:$("#birthday").val(),
	           proid:$("#proid").val(),
	           colid:$("#colid").val(),
	           school:$("#school").val(),
	           other_colname:$("#other_colname").val(),
	           orgimg:$("#orgimg_school").val(),
	           thumbimg:$("#thumbimg_school").val(),
	           orgimg_front:$("#orgimg_front").val(),
	           orgimg_back:$("#orgimg_back").val(),
	           cate_id:entry,//参赛形式
	           actor:yanyuan,
	           actor_num:$("#yanyuannum").val(),
	           entryname:$("#gid").val(),
	           sign_notice:$('input[name="sign_notice"]:checked').val() ? 1 : 0,
	           is_show_email:$('input[name="is_show_email"]:checked').val() ? 1 : 0,
	           is_show_mobile:$('input[name="is_show_mobile"]:checked').val() ? 1 : 0,
	           signsubmit:true
			},
			success: function(data){
				  if(!data['result']){
				     $("#tip_"+data['tip_type']).html(data['msg']);
				     $("#tip_"+data['tip_type']).css("display","");
				     if(data['tip_type'] == 'upvideo'){
	                     var upvideo_url= "<a href='"+data['url']+"'  style='color:red;font-size:20px;font-weight: bolder;'>上传视频</a>";
	                     $("#upvideo_url").html(upvideo_url);
	                     $("#upvideo").show();
					 }
				     is_sign = false;
					 $(".b_form_btn").html('提交表单');
					 return false;
				  }else{
					  var url = '/space/video/upvideo?gid='+data['gid']+'&cate_id='+data['cate_id']+'&sid='+data['sid'];
					  window.location.href = url;
					  
				  }
			    
			}
		});
   }else{
	   $(".b_form_btn").html('提交表单中...');
   }
}

function initial(){
	var tips = ['realname','mobile','idcard','birthday','school',
			        'upload','team','sign','entryname','entryform','sign_notice',
			        'yanyuan','yanyuannum','expertise'
			        ];

	for(var i=0;i<tips.length;i++){
       $("#tip_"+tips[i]).html('');
	}
}

function hideagree(){
	$("#agreement").hide();
	$("#agreementbg").hide();
}

//院校联想
function getschool(){
	 var school = $("#school").val();
	 if(school != ''){
		 $("#proSchool").hide();
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

function checkschool(){
	/*var school = $("#school").val();
	if(school != ''){
		$.ajax({
			type: "post",
			url: "/api/college/collegeByName",
			dataType:"json",
			data:{wb:school},
			success: function(data){
		      if(data['code']>0){
				 if(data['college']['is_expertise'] == 1){
					 $("#tip_school").html("该学校是艺术类院校");
			     }else{
			    	 $("#tip_school").html("该学校是普通高校");
				 }
				 $("#tip_school").show();
			     return true;
			  }
			}
	    });
	}*/
	return;
}

function use_new_email(){
	$("#email").attr("disabled",false);
}

//参赛形式与演员姓名联动判断
function check_entryform_yy(){
	var yanyuan_arra = new Array();
	var yanyuan = '';
	var cnt = 0;
	var entry = $('input[name="entryform"]:checked').val();
	$('input[name="yanyuan[]"]').each(function(i,j){
		if(cnt<entry){
			if($(this).val() != ''){
				yanyuan_arra.push($(this).val());
				cnt++;
			}
		}
	});
	if(yanyuan_arra.length != 0){
		yanyuan = yanyuan_arra.join(',');
	}

	var len = yanyuan_arra.length;
    if(entry == 1 && len<1 || entry == 2 && len<2 || entry == 3 && len<3){
       return '';
    }else{
    	return yanyuan;
    }
}

function is_number(val){
	if(!isNaN(val)){
	  return true;
	}else{
	  return false;	
	}
}
</script>
<div class="pub-content">
	<div class="pub-w"> 
		
		<!-- 头部 --> 
		<!--#include file="block/hd-head.shtml"--> 
		
		<!-- 报名信息 -->
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
        <style>
        .blk_text{border:1px solid #999;margin:10px auto;width:680px;overflow:hidden;line-height:34px;color:red;padding:10px 20px 10px 160px;}
		.blk_lceng{width:980px;margin:10px auto;background:url(<?php echo $this->config->item('img2_url'); ?>/assets/img/icon_liucheng.png) no-repeat top center;overflow:hidden;position:relative;}
		.blk_lceng li{width:182px;text-align:center;line-height:24px;padding:20px 0 0 14px;float:left;height:58px;color:#350410;}
		.blk_lceng li.f18px{padding-top:40px;}
		.blk_lceng li.fxz{padding-top:30px;}
		.blk_lceng div{padding:3px 10px 0 356px;height:40px;overflow:hidden;width:614px;}
		.blk_lceng li a,.blk_lceng li span{width:130px;overflow:hidden;height:28px;background:#f39800;color:#fff;text-align:center;line-height:28px;float:left;margin-right:10px;font-size:14px;}
		.blk_lceng li a{margin:3px 0 0 26px;}
		.blk_lceng li span{position:relative;cursor:pointer;margin-left:28px;}
		.blk_lceng li span input{width:400px;position: absolute;right: 0;height: 31px;filter: alpha(opacity=0);opacity: 0;-moz-opacity: 0;-khtml-opacity: 0;cursor: pointer;}
		.blk_lceng i.shang{display:block;width:350px;height:20px;position:absolute;left:373px;top:118px;color:red;font-size:16px;font-weight:bold;}
        </style>
		<div class="block_form" style="width: 998px;">
			<div class="b_video_info">
			     <div class="blk_lceng">
                	<ul class="fY">
                    	<li class="f18px">填写报名表单</li>
                    	<li class="f18px">上传视频作品</li>
                    	<li class="f18px fxz">下载报名表单<a <?php  if(!isset($sign['sid']) || empty($sign['sid'])){?>style="background-color: #a0a0a0;"<?php }?> href="<?php if(isset($sign['sid']) && !empty($sign['sid'])){ ?>http://www.saiku.com.cn/api/word/upsign?sid=<?php echo @$sign['sid']; }else{ ?>javascript:;void(0)<?php } ?>">下载报名表单</a></li>
                    	<li class="f14px">到所在院校省舞协盖章<br>报名表单方可生效</li>
                    	<li class="f14px fsc">再次上传报名表单<br>予以确认报名成功
                    	<?php  if(!isset($sign['sid']) || empty($sign['sid'])){?>
                    	    <span style="background-color: #a0a0a0;">点击开始上传</span>
                    	<?php } else { ?>
                    	    <span><i id="clickupload">点击开始上传</i><input type="file" name="signform" id="signform"  onchange="UploadForm('signform',<?php echo $sign['sid'] ?>)" /></span>
                    	<?php } ?>
                    	</li>
                    	
                    </ul>
                    <i class="shang fY" style="display:none" id="tip_signform">上传成功</i>
                    <div class="f14px fY cOrange" style="text-align:right;">截止日期：2014年05月30日</div>
                </div>
                <div class="fY f14px blk_text">*该比赛只能由参赛节目的编导进行报名<br>*报名信息填写后不能更改，请您谨慎操作。如有问题，请联系<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1548806465&site=qq&menu=yes"><img border="0" src="http://img2.saiku.com.cn/static/assets/img/icon_QQ.png" alt="在线咨询" title="在线咨询"/></a>或联系电话<br><b class="cBlue">赛酷网联系方式：010-8515 2238   中国舞蹈家协会联系方式：010-59759674,010-59759274</b></div>
				<h2 class="b_form_title f16px cOrange fB" style="padding-left:200px;">填写报名信息</h2>
				<div class="b_video_form b_baoming_form">
					<input type="hidden" name="game" id="game" value="dance">
					<dl>
						<dt><span class="cRed">* </span>编导姓名：</dt>
						<dd>
							<input type="text" name="realname" id="realname" class="b_bm_input" value="<?php echo @$sign['realname']; ?>"/>
							<span style="display:none;color:red" id="tip_realname"></span>
						</dd>
					</dl>
                    <dl>
						<dt><span class="cRed">* </span>编导身份：</dt>
						<dd>
							<ul>
								<li>
									<input type="radio" value="1"  name="is_student" <?php if (empty($sign_ext) || !empty($sign_ext) && $sign_ext[0]['value'] == 1 ) { ?>checked='checked'<?php } ?>/>
									学生</li>
								<li>
									<input type="radio" value="0"  name="is_student" <?php if (!empty($sign_ext) && !$sign_ext[0]['value']) { ?>checked='checked'<?php } ?>/>
									老师</li>
							</ul>
						</dd>
					</dl>
                    <dl>
						<dt><span class="cRed">* </span>节目名称：</dt>
						<dd>
							<input type="text" name="project" id="project" class="b_bm_input" value="<?php echo @$sign_ext[1]['value']; ?>"/>
							<span style="display:none;color:red" id="tip_project"></span>
						</dd>
					</dl>
                    <dl>
						<dt><span class="cRed">* </span>参赛形式：</dt>
						<dd>
							<ul id="butAn">
							  <?php if (!empty($entryform)) { ?>
							   <?php foreach ($entryform as $k=>$v) { ?>
								<li>
									<input type="radio" value="<?php echo $k; ?>"   name="entryform" <?php if (empty($sign) && $k==1 || !empty($sign) && $sign['cate_id'] == $k) { ?>checked="checked"<?php } ?>/>
								<?php echo $v; ?></li>
								<li>
								<?php } ?>
							  <?php } ?>
							</ul>
							<span style="display:none;color:red" id="tip_entryform"></span>
						</dd>
					</dl>
                    <dl id="butBox" <?php if (!empty($sign) && @$sign['cate_id']==12) { ?>class="hide"<?php } ?>>
						<dt><span class="cRed">* </span>演员姓名：</dt>
						<dd>
						  <?php if (!empty($sign)) { ?>
						   <?php if (@$sign['cate_id'] == 1) { ?>
							<input type="text" name="yanyuan[]" class="y1" value="<?php echo @$sign_ext[2]['value']; ?>"/>
							<input type="text" name="yanyuan[]" class="y2 hide" value=""/>
                            <input type="text" name="yanyuan[]" class="y3 hide" value=""/>
						  <?php } elseif (@$sign['cate_id'] == 2) { ?>
						    <?php @list($actor1,$actor2) = explode(',',$sign_ext[2]['value']); ?>
						    <input type="text" name="yanyuan[]" class="y1" value="<?php echo @$actor1; ?>"/>
                            <input type="text" name="yanyuan[]" class="y2" value="<?php echo @$actor2; ?>"/>
                            <input type="text" name="yanyuan[]" class="y3 hide" value=""/>
                         <?php } elseif (@$sign['cate_id'] == 3) { ?>
                            <?php @list($actor1,$actor2,$actor3) = explode(',',$sign_ext[2]['value']); ?>
                            <input type="text" name="yanyuan[]" class="y1" value="<?php echo @$actor1; ?>"/>
                            <input type="text" name="yanyuan[]" class="y2" value="<?php echo @$actor2; ?>"/>
                            <input type="text" name="yanyuan[]" class="y3" value="<?php echo @$actor3; ?>"/>
                         <?php } else { ?>
                            <input type="text" name="yanyuan[]" class="y1 hide" value=""/>
							<input type="text" name="yanyuan[]" class="y2 hide" value=""/>
                            <input type="text" name="yanyuan[]" class="y3 hide" value=""/>
                         <?php } ?>
                        <?php } else { ?>
                            <input type="text" name="yanyuan[]" class="y1" value=""/>
							<input type="text" name="yanyuan[]" class="y2 hide" value=""/>
                            <input type="text" name="yanyuan[]" class="y3 hide" value=""/>
                        <?php } ?>
							<span style="display:none;color:red" id="tip_yanyuan"></span>
						</dd>
					</dl>
                    <dl <?php if (empty($sign) || $sign['cate_id'] != 12) { ?>class="hide"<?php } ?> id="butShu">
						<dt><span class="cRed">* </span>演员人数：</dt>
						<dd>
							<input type="text" name="yanyuannum" id="yanyuannum" style="width:80px" value="<?php echo @$sign_ext[3]['value']; ?>" class="b_bm_input" value=""/>人
							<span style="display:none;color:red" id="tip_yanyuannum"></span>
						</dd>
					</dl>
                    <script>
                    $(function(){
						var tag = $("#butAn"),box=$("#butBox"),shu=$("#butShu");
						tag.find("input").click(function(){
							var _this = $(this).val();
							if(_this==1){box.removeClass("hide");box.find("input.y2").addClass("hide");box.find("input.y3").addClass("hide");shu.addClass("hide");}
							else if(_this==2){box.removeClass("hide");box.find("input.y2").removeClass("hide");box.find("input.y3").addClass("hide");shu.addClass("hide");}
							else if(_this==3){box.removeClass("hide");box.find("input").removeClass("hide");shu.addClass("hide");}
							else if(_this==12){box.addClass("hide");shu.removeClass("hide");}
							})
					})
                    </script>
                    <dl>
						<dt>编导个人信息</dt>
						<dd>&nbsp;</dd>
					</dl>
					<dl>
						<dt><span class="cRed">* </span>邮箱：</dt>
						<dd>
							<input type="text" name="email" id="email" value="<?php echo $space['email']; ?>" disabled="true" class="b_bm_input" />
							<span>
							<input type="checkbox" name="is_show_email" <?php if (@$sign['is_show_email'] == 1) { ?>checked='checked' <?php } ?> />
							在我的主页显示 </span> <i onclick="use_new_email()">使用新邮箱</i> <span style="display:none;color:red" id="tip_email"></span>
						</dd>
					</dl>
					<dl>
						<dt><span class="cRed">* </span>手机号：</dt>
						<dd>
							<input type="text" name="mobile" id="mobile" class="b_bm_input" value="<?php echo @$sign['mobile']; ?>"/>
							<span>
							<input type="checkbox" name="is_show_mobile" <?php if (@$sign['is_show_mobile'] == 1) { ?>checked='checked' <?php } ?> />
							在我的主页显示 </span> <span style="display:none;color:red" id="tip_mobile"></span>
						</dd>
					</dl>
					<dl>
						<dt><span class="cRed">* </span>性别：</dt>
						<dd>
							<ul>
								<li>
									<input type="radio" value="1"  name="gender" <?php if (@$sign['gender'] == 1 || @$sign['gender'] == 0) { ?>checked='checked' <?php } ?>/>
									男</li>
								<li>
									<input type="radio" value="2"  name="gender" <?php if (@$sign['gender'] == 2) { ?>checked='checked' <?php } ?>/>
									女</li>
							</ul>
						</dd>
					</dl>
					<dl>
						<dt>生日：</dt>
						<dd>
							<input type="text" readonly name="birthday" id="birthday" value="<?php echo @$sign['birthday']; ?>" class="Wdate txt_date fl b_bm_input" type="text" onfocus="WdatePicker({maxDate:'#F{+(\'d5222\')}'})" />
						    <span style="display:none;color:red" id="tip_birthday"></span>
						</dd>
					</dl>
                    <dl>
						<dt><span class="cRed">* </span>身份证号：</dt>
						<dd>
							<input type="text" name="idcard" id="idcard" class="b_bm_input" value="<?php echo @$sign['idcard']; ?>"/>
							<span style="display:none;color:red" id="tip_idcard"></span>
						</dd>
					</dl>
					<dl>
						<dt><span class="cRed">* </span>上传身份证电子版正面：</dt>
						<dd>
							<!--<input type="file" />-->
							
							
							<script>
							var orgimg = '<?php echo @$sign[4]['value']; ?>';
                            var imgname = orgimg.slice(orgimg.lastIndexOf('/')+1);
                        </script>
                        <?php if(isset($sign['orgimg']) && !empty($sign['orgimg'])){ ?>
                            <span id="formerimg_front" style="left: 80px;width: 160px;overflow:hidden;"><?php echo str_replace('/','',@$sign_ext[4]['value']);?></span>
                        <?php }else{ ?>
                            <span id="formerimg_front" style="display:none"></span>
                        <?php } ?>
					    <input type="file" name="signimage_front" id="signimage_front" onclick="$('#formerimg_front').hide();" onchange="UploadShareImg('front')" style="width:237px">
					    <input type="hidden" name="orgimg_front" id="orgimg_front" value="<?php echo @$sign_ext[4]['value']; ?>">
					    <input type="hidden" name="thumbimg_front" id="thumbimg_front" value="">
					    <span> 图片大小不超过2M，<a class="cBlue" href="javascript:;"  onclick="$.layer($('#shenfenzhengshili').html());">查看身份证模版</a></span> <span style="display:none;color:red" id="tip_upload_front"></span></dd>
					    
					</dl>
					<dl>
						<dt><span class="cRed">* </span>上传身份证电子版背面：</dt>
						<dd>
							<!--<input type="file" />-->
							
							
							<script>
                            var orgimg = '<?php echo @$sign[5]['value']; ?>';
                            var imgname = orgimg.slice(orgimg.lastIndexOf('/')+1);
                        </script>
                        <?php if(isset($sign['orgimg']) && !empty($sign['orgimg'])){ ?>
                            <span id="formerimg_back" style="left: 80px;width: 160px;overflow:hidden;"><?php echo str_replace('/','',@$sign_ext[5]['value']);?></span>
                        <?php }else{ ?>
                            <span id="formerimg_back" style="display:none"></span>
                        <?php } ?>
					    <input type="file" name="signimage_back" id="signimage_back" onclick="$('#formerimg_back').hide();" onchange="UploadShareImg('back')" style="width:237px">
					    <input type="hidden" name="orgimg_back" id="orgimg_back" value="<?php echo @$sign_ext[5]['value'];?>">
					    <input type="hidden" name="thumbimg_back" id="thumbimg_back" value="">
					    <span> 图片大小不超过2M <span style="display:none;color:red" id="tip_upload_back"></span></dd>
					    
					</dl>
              
					<dl>
						<dt><span class="cRed">* </span>所在院校：</dt>
						<!--<dd>
							<input type="text" class="b_bm_input" />
						</dd>-->
						<dd>
							<span>
							   <input type="text" name="school" id="school" class="b_bm_input" onfocus="update_colid()" onblur="checkschool()" value="<?php echo @$sign['school']; ?>" onkeyup="getschool()">
					           <input type="hidden" name="colid" id="colid" <?php if (@$sign['colid']>0) { ?>value="<?php echo @$sign['colid']; ?>"<?php } else { ?>value="-1"<?php } ?>>
							</span>
							<div style="position: absolute;width:298px;z-index:4;margin-top:30px;display:none" class="ac_results">
				        	<ul id="map_result">
				        	</ul>
			                </div>
			                <span style="display:none;color:red" id="tip_school"></span>
							<!--<i id="tip_school"></i>-->
						</dd>
						
			            <script type="text/javascript" src="/public/data/assets/js/school.js"></script>
			            
					</dl>
                    <dl>
<style>
.y1,.y2,.y3{width: 80px;border: 1px solid #B3B3B3;margin: 0 10px 0 0;padding: 5px;height: 22px;}
#loc_province,#loc_city,#loc_town{height:32px;overflow:hidden;width:100px; vertical-align:middle;}
</style>
                    
						<dt>如果没有您所在院校请选择：</dt>
						<dd>
                            <select id="proid" >
                              <?php if (!empty($province['list'])) { ?>
                               <?php foreach ($province['list'] as $p) { ?>
                              <option value="<?php echo $p['PROID']; ?>" <?php if(@$sign['proid'] == $p['PROID']) { ?>selected<?php } ?>><?php echo $p['PRONAME']; ?></option> 
                               <?php } ?>
                              <?php } ?>
                            </select>
                            <input type="text" name="other_colname" id="other_colname" class="b_bm_input"  value="<?php echo @$sign['other_colname']; ?>">								
                            <input type="hidden" name="location_id" />
						</dd>
                       
					</dl>
					
					<dl>                    
						<dt><span class="cRed">* </span>院校类型：</dt>
						<dd style="margin-top:16px">    <input type="radio" value="1"  name="is_expertise"  />
								艺术类院校
								<input type="radio" value="0"  name="is_expertise" />
								普通高校    
								<span id="tip_expertise" style="display:none;color:red"></span>                        
						</dd>                       
					</dl>
					
					<dl>
						<dt><span class="cRed">* </span>在校证明：</dt>
						<dd>
							<!--<input type="file" />-->
							
							
							<script>
							var orgimg = '<?php echo @$sign['orgimg']; ?>';
                            var imgname = orgimg.slice(orgimg.lastIndexOf('/')+1);
                        </script>
                        <?php if(isset($sign['orgimg']) && !empty($sign['orgimg'])){ ?>
                            <span id="formerimg_school" style="left: 80px;width: 160px;overflow:hidden;"><?php echo str_replace('/','',$sign['orgimg']);?></span>
                        <?php }else{ ?>
                            <span id="formerimg_school" style="display:none"></span>
                        <?php } ?>
                        
					    <input type="file" name="signimage_school" id="signimage_school" onclick="$('#formerimg').hide();" onchange="UploadShareImg('school')" style="width:237px">
					    <input type="hidden" name="orgimg_school" id="orgimg_school" value="<?php echo @$sign['orgimg']; ?>">
					    <input type="hidden" name="thumbimg_school" id="thumbimg_school" value="<?php echo @$sign['thumbimg']; ?>">
					    <span> 图片大小不超过2M，<a class="cBlue" href="<?php echo $this->config->item('img3_url'); ?>/docs/thumbimg.docx">下载在校证明模版</a></span> <span style="display:none;color:red" id="tip_upload_school"></span></dd>
					    
					</dl>
                    
                    <input type="hidden" name="entryname" id="gid" value="1" />
					<dl>
						<dt></dt>
						<dd>
							<h3>
								<input type="checkbox" name="sign_notice" value="1" checked="true"/>
								<a class="cBlue" href="javascript:;" onclick="$.layer($('#wintmplsign').html());">《比赛报名协议》</a>
								<span style="display:none;color:red" id="tip_sign_notice"></span><br>
								<span style="display:none;color:red" id="tip_school"></span>
							</h3>
						</dd>
					</dl>
				</div>
				<div class="b_video_btn"><span class="b_form_btn f14px" onclick="sign()">提交表单</span>
				  <dl class="from" <?php if(isset($sign['video_exist']) && !$sign['video_exist']) { ?>style="display:block;"<?php } else { ?>style="display:none;"<?php } ?> id="upvideo">
				<dt>&nbsp;</dt>
				<dd style="margin-left:350px">
				    <span> 之前已填写过报名信息。如果无误,请直接</span><i id="upvideo_url"><a href="<?php echo @$sign['upvideo_url']; ?>" style="color: red;font-size:16px;font-weight: bolder;">上传视频</a></i>
				</dd>
		       </dl>
				</div>
			</div>
			
		</div>
	</div>
</div>
<div class="pub-downmenu hide" id="pub-downmenu">
    <?php if(isset($entryform)){ foreach ($entryform as $ke=>$va) { ?>
     <li data-val="<?php echo $ke; ?>"><?php echo $va; ?></li>
     <?php }} ?>
</div>

<script>
//参赛形式
$.downMenu($("#entryform"),$("#pub-downmenu"),function(element){
	$('input:hidden[name="entryform"]').val(element.data("val"));
});

</script>
<script type="text/tmpl" id="shenfenzhengshili">
	<dl class="pub_confirm">
        <h2 class="f16px fY cWhite">身份证示例<span class="win-close" onclick="$.layer()"></span></h2>
		<dt>
			<img src="/public/data/assets/img/shili_368.jpg" alt="身份证示例" />
		</dt>
		<dd><a href="javascript:;" onclick="$.layer()">关闭</a></dd>
	</dl>
</script>
<!--初始化协议 begin-->
<script type="text/tmpl" id="wintmplsign">
<div class="pub-win">
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
		<dt><a href="javascript:;" onclick="$.layer()">接受</a></dt>
	</dl>
</div>
</script>
<!--初始化协议 end-->