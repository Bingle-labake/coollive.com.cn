<?php $this->load->view('public/common_head.php'); ?>
<!--content begin-->
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

<script type="text/javascript" src="/public/data/assets/js/ajaxfileupload.js"></script>
<script type="text/javascript" src="/public/data/assets/js/rili/WdatePicker.js"></script>
<script type="text/javascript">
var pubbtnstatus = true;
//上传图片
function UploadShareImg(id){
    pubbtnstatus = false; 
    $("#pub-btn").css("background","none repeat scroll 0% 0% rgb(204, 204, 204)");
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
}

function sign(){
	initial();
	$.ajax({
		type: "post",
		url: "/space/sign/ladder/"+$("#gid").val(),
		dataType:"json",
		data:{
		   realname:$("#realname").val(),
		   email:$("#email").val(),
           mobile:$("#mobile").val(),
           idcard:$("#idcard").val(),
           gender:$('input[name="gender"]:checked').val(),
           birthday:$("#birthday").val(),
           colid:$("#colid").val(),
           orgimg:$("#orgimg_school").val(),
           thumbimg:$("#thumbimg_school").val(),
           cate_id:$("#enfid").val(),//参赛形式
           entryname:$("#gid").val(),
           stype:$('input[name="stype"]:checked').val(),
           tid:tid,
           uids:uids,//社团成员
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
				 return false;
			  }else{
				  var url = '/space/video/upvideo?gid='+data['gid']+'&cate_id='+data['cate_id']+'&sid='+data['sid'];
				  window.location.href = url;
				  
			  }
		    
		}
	});
}

function initial(){
	var tips = ['realname','mobile','idcard','birthday','school',
			        'upload','team','sign','entryname','entryform','sign_notice',
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

function use_new_email(){
	$("#email").attr("disabled",false);
}
</script>
<div class="pub-content">
	<div class="pub-w"> 
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
		<div class="block_form">
			<div class="b_video_info">
                <dl class="b_form_title"><dt class=" f14px cOrange fY">填写报名信息</dt><dd class="fl cRed">*报名信息填写后不能更改，请您谨慎操作，均为必填项。</dd></dl>
                <ul class="b_form_qh" id="b_form_qh"><li><input type="radio" value="1" name="stype" checked /> 个人</li><li><input type="radio" value="2" name="stype" /> 社团</li></ul>
                <div id="b_form_box">
                    <div class="b_video_form b_baoming_form">
                        <dl>
                            <dt id="dl_realname">真实姓名：</dt>
                            <dd>
                                <input type="text" name="realname" id="realname" class="b_bm_input" value="<?php echo @$sign['realname']; ?>"/>
							    <span style="display:none;color:red" id="tip_realname"></span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>邮箱：</dt>
                            <dd>
                                <input type="text" name="email" id="email" value="<?php echo $space['email']; ?>" disabled="true" class="b_bm_input" />
                                <span>
	                                <input type="checkbox" name="is_show_email" <?php if (@$sign['is_show_email'] == 1) { ?>checked='checked' <?php } ?> />
								         在我的主页显示 
							   </span> 
							   <i onclick="use_new_email()">使用新邮箱</i> <span style="display:none;color:red" id="tip_email"></span>
							</dd>                                                    
                        </dl>
                        <dl>
                            <dt>手机号：</dt>
                            <dd>
                                <input type="text" class="b_bm_input" name="mobile" id="mobile" value="<?php echo @$sign['mobile']; ?>"/>
                                <span>
	                                <input type="checkbox" name="is_show_mobile" <?php if (@$sign['is_show_mobile'] == 1) { ?>checked='checked' <?php } ?> />
								          在我的主页显示 
							    </span> 
							    <span style="display:none;color:red" id="tip_mobile"></span>
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
							</ul>
                            </dd>
                        </dl>
                        <dl>
                            <dt>生日：</dt>
                            <dd>
                                <input type="text" class="b_bm_input" readonly name="birthday" id="birthday" value="<?php echo @$sign['birthday']; ?>" class="Wdate txt_date fl b_bm_input" type="text" onfocus="WdatePicker({maxDate:'#F{+(\'d5222\')}'})" />
						        <span style="display:none;color:red" id="tip_birthday"></span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>身份证号：</dt>
                            <dd>
                                <input type="text" name="idcard" id="idcard" class="b_bm_input" value="<?php echo @$sign['idcard']; ?>"/>
							    <span style="display:none;color:red" id="tip_idcard"></span>
							</dd>
                        </dl>
                        <dl>
							<dt>所在院校：</dt>
							<dd>
								<span>
								   <input type="text" name="school" id="school" class="b_bm_input" onfocus="update_colid()" value="<?php echo @$sign['school']; ?>" onkeyup="getschool()">
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
						<dt>在校证明：</dt>
						<dd>
							<script>
                            var orgimg = '<?php echo @$sign['orgimg']; ?>';
                            var imgname = orgimg.slice(orgimg.lastIndexOf('/')+1);
	                        </script>
	                        <?php if(isset($sign['orgimg']) && !empty($sign['orgimg'])){ ?>
	                            <span id="formerimg" style="left: 80px;width: 160px;overflow:hidden;"><?php echo str_replace('/','',$sign['orgimg']);?></span>
	                        <?php }else{ ?>
	                            <span id="formerimg" style="display:none"></span>
	                        <?php } ?>
						    <input type="file" name="signimage_school" id="signimage_school" onclick="$('#formerimg').hide();" onchange="UploadShareImg('school')" style="width:237px">
						    <input type="hidden" name="orgimg_school" id="orgimg_school" value="<?php echo @$sign['orgimg']; ?>">
						    <input type="hidden" name="thumbimg_school" id="thumbimg_school" value="<?php echo @$sign['thumbimg']; ?>">
						    <span> 建议图片尺寸 A4 210*297 </span> <span style="display:none;color:red" id="tip_upload_school"></span></dd>
					    </dl>
                        <dl>
                            <dt>参赛形式：</dt>
                            <dd> 
	                            <em class="b_video_select" id="b_video_select2"><?php if (isset($sign['cate_id']) && $sign['cate_id']) { ?><?php echo $entryform[$sign['cate_id']]; ?><?php } ?></em>
								</span>
								<span style="display:none;color:red" id="tip_entryform"></span> 
                            </dd>
                            <input type="hidden" name="entryform" id="enfid" value="<?php echo @$sign['cate_id']; ?>" />
                        </dl>
                        <input type="hidden" name="entryname" id="gid" value="1" />
                        <dl class="hide" id="dl_entryteam">
                            <dt>选择参赛社团：</dt>
                            <dd> 
                                <em class="b_video_select" id="b_video_select3"><?php if (isset($sign_team)) { ?><?php echo $sign_team['name'];?><?php } ?></em> <span id="tip_team" style="color: red;display:none;"></span>
                                <?php if (empty($allteams['list'])) { ?>
	                                <input type="hidden" value="劲舞团" /><a class="cjst" href="">创建社团</a>
	                                <span class="cRed">您还没有创建社团，创建社团后再来报名参赛吧</span>
                                <?php } ?> 
                            </dd>
                        </dl>
                        <?php if (!empty($allteams['list'])) { ?>
                        <dl id="dl_entrymember" class="hide">
                            <dt>选择参赛人员：</dt>
                            <dd class="b_canSai" id="mdList">
                                <div <?php if (!isset($sign_team) || empty($sign['team_members'])) { ?>class="hide"<?php } ?> id="memberslist">
                                 <?php if(isset($sign_team)) { ?>
                                   <?php if (!empty($sign['team_members'])) { ?>
                                      <?php $members = explode(',', $sign['team_members']); ?>
                                      <?php foreach ($members as $m) { ?>
                                         <?php $user = $this->member_m->get_user(array('username'),array('uid'=>$m)); ?>
                                         <a href="javascript:;"><?php echo $user['username']; ?><i data-value="<?php echo $m; ?>"></i></a>
                                      <?php } ?>
                                   <?php } ?>
                                 <?php } ?>
                                </div>
                                <span class="b_Tianja">添加</span>
                            </dd>
                        </dl>
                        <?php } ?>
                        <dl>
							<dt></dt>
							<dd>
								<h3>
									<input type="checkbox" name="sign_notice" value="1" checked="true"/>
									<i onclick="$.layer($('#wintmplsign').html());">《比赛报名协议》</i>
									<span style="display:none;color:red" id="tip_sign_notice"></span>
								</h3>
							</dd>
						</dl>
                        <div class="b_video_btn"><span class="b_form_btn f14px" onclick="sign()">我要报名</span>
						  <dl class="from" <?php if(isset($sign['video_exist']) && !$sign['video_exist']) { ?>style="display:block;"<?php } else { ?>style="display:none;"<?php } ?> id="upvideo">
							<dt>&nbsp;</dt>
							<dd style="margin-left:400px">
							    <span> 之前已填写过报名信息。如果无误,请直接</span><i id="upvideo_url"><a href="<?php echo @$sign['upvideo_url']; ?>" style="color: red;font-size:16px;font-weight: bolder;">上传视频</a></i>
							</dd>
					       </dl>
						</div>
                    </div>
                	
                </div>
			</div>
		</div>
	</div>
</div>
<div class="pub-downmenu hide" id="pub-downmenu">
    <li data-val="1">个人民共和国1</li>
    <li data-val="2">个人华人民共和国2</li>
</div>
<div class="pub-downmenu hide" id="pub-downmenu2">
    <?php foreach ($entryform as $k=>$v) { ?>
     <li data-val="<?php echo $k; ?>"><?php echo $v; ?></li>
     <?php } ?>
</div>
<div class="pub-downmenu hide" id="pub-downmenu3">
  <?php if (!empty($allteams['list'])) { ?>
    <?php foreach ($allteams['list'] as $t) { ?>
    <li data-val="<?php echo $t['tid']; ?>"><?php echo $t['name']; ?></li>
    <?php } ?>
  <?php } ?>
</div>

<div id="layer_team_members" style="display:none">
	<div class="s_sheTuan">
		<h2 class="f16px fY cWhite"><span onclick="$.layer()"></span>社团所有成员</h2>
	    <div class="s_boxc" id="team_members">
	    	
	    </div>
	</div>
</div>
<script>
var tid = <?php if (isset($sign['tid'])) { ?><?php echo $sign['tid']; ?><?php } else { ?>0<?php } ?>;
$.downMenu($("#b_video_select"),$("#pub-downmenu"),function(element){
    alert(element.data("val"))
});
$.downMenu($("#b_video_select2"),$("#pub-downmenu2"),function(element){
    $("#enfid").val(element.data("val"));
});
$.downMenu($("#b_video_select3"),$("#pub-downmenu3"),function(element){
    tid = element.data("val");
    text = uids = '';
    $("#memberslist").html("");
    $("#memberslist").addClass("hide");
    $("#dl_entrymember").removeClass("hide");
});
$(function(){
	var tag = $("#b_form_qh"),box=$("#b_form_box > div");
	tag.find("input").click(function(){
		var _this = $(this).val();
		if(_this==1){
			$("#dl_entrymember").addClass("hide");
			$("#dl_entryteam").addClass("hide");
			$("#dl_realname").html("真实姓名：");
		}else if(_this==2){
			<?php if (isset($sign['tid']) && $sign['tid']) { ?>
			$("#dl_entrymember").removeClass("hide");
			<?php } ?>
			$("#dl_entryteam").removeClass("hide");
			$("#dl_realname").html("团长姓名：");
		  }
		})
})
</script>
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
<script type="text/tmpl" id="s_sheTuan">

</script>
<script>
$(function(){
	var element = $("#mdList");
    function insert(str,uid,index){
        var tmp = $('<a href=\"javascript:;\">'+ str +'<i data-value=\"'+uid+'\"></i></a>');
        if(index){
            tmp.attr('index', index)
        }
        element.find("div:first").append(tmp);
    }
	element.find("span.b_Tianja").click(function(){
		//ajax异步加载数据
		get_team_members(tid);
	});
	element.delegate('i', 'click', function(event) {
        var _this = $(this).parent();
        _this.remove();
		
		if(text != ''){
			text = text.replace(_this.text(), "");
			uids = uids.replace($(this).data("value"), "");
			}
		if(element.find("a").length==0){element.find("div:first").addClass("hide");}
    })
})

var text = '<?php echo @$sign_team_members; ?>',uids = '<?php echo @$sign['team_members']; ?>';
function get_team_members(tid,page = 1){
	var element = $("#mdList");
    function insert(str,uid,index){
        var tmp = $('<a href=\"javascript:;\">'+ str +'<i data-value=\"'+uid+'\"></i></a>');
        if(index){
            tmp.attr('index', index)
        }
        element.find("div:first").append(tmp);
    }
	$.ajax({
		type: "post",
		url: "/space/sign/get_team_member",
		dataType:"html",
		data:{tid:tid,page:page},
		success: function(data){
	      $("#team_members").html(data);
	      $("#s_sheTuan").html($("#layer_team_members").html());
	      $.layer($("#s_sheTuan").html());
	      var muenv = $.layer($("#s_sheTuan").html());
		  muenv.delegate('input', 'click', function(event) {
	        var _this = $(this);
			if(text == '') {
				text = _this.parent().text();
				uids = _this.val();
				insert(_this.parent().text(),_this.val(),_this.attr('index'));
			}else {
				if(text.indexOf(_this.parent().text())<0) {
					
					text += ","+_this.parent().text();
					uids += ","+_this.val();
					insert(_this.parent().text(),_this.val(),_this.attr('index'));			
				}
				
			}
			muenv.find("input:button").click(function(){			
				element.find("div:first").removeClass("hide");//添加内容按钮
				$.layer();
			});
		  });
		}

   });
	    element.delegate('i', 'click', function(event) {
	        var _this = $(this).parent();
	        _this.remove();
			
			if(text != ''){
				text = text.replace(_this.text(), "");
				uids = uids.replace($(this).data("value"), "");
				}
			if(element.find("a").length==0){element.find("div:first").addClass("hide");}
	    })
}
</script>
<?php $this->load->view('public/footer.php'); ?>
