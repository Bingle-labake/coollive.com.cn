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
            	<div class="moute"><b class="fl f14px"><?php echo $i; ?>.<?php echo $t['name']; ?></b><?php if ($i==1) { ?><span>取消</span><?php } else { ?><span class="on">确定</span><?php } ?></div>
				<div class="info <?php if ($i>1){ ?>hide<?php } ?>">
					<dl class="form">
						<dt>真实姓名：</dt>
						<dd><span><input type="text" name="realname" id="realname_<?php echo $t['tid']; ?>" value="<?php echo $t['realname']; ?>"></span></dd>
					</dl>
					<dl class="form">
						<dt>邮&nbsp;&nbsp;&nbsp;&nbsp;箱：</dt>
						<dd><span><input type="text" name="email" id="email_<?php echo $t['tid']; ?>" disabled="true" value="<?php echo $space['email']; ?>" class="cGray"></span>
						<em><input type="checkbox" name="is_show_email_<?php echo $t['tid']; ?>" value="1" id="is_show_email_<?php echo $t['tid']; ?>" <?php if($t['is_show_email']) { ?>checked<?php } ?>><label for="mail" >在我的主页显示</label></em>
						</dd>
					</dl>
					<dl class="form">
						<dt>手&nbsp;机&nbsp;号：</dt>
						<dd><span><input type="text" name="mobile" id="mobile_<?php echo $t['tid']; ?>" value="<?php echo $t['mobile']; ?>" class="cGray"></span>
						<em><input type="checkbox" name="is_show_mobile_<?php echo $t['tid']; ?>" value="1" id="is_show_mobile_<?php echo $t['tid']; ?>" <?php if($t['is_show_mobile']) { ?>checked<?php } ?>><label for="phone">在我的主页显示</label></em>
						<span style="display: none;" id="tip_mobile_<?php echo $t['tid']; ?>" class="login_error cRed"></span>
						</dd>
					</dl>
					<dl class="form">
						<dt>QQ号：</dt>
						<dd><span><input type="text" name="qq" id="qq_<?php echo $t['tid']; ?>" value="<?php echo $t['qq']; ?>" class="cGray"></span></dd>
					</dl>
					<dl class="form">
						<dt>社团名称：</dt>
						<dd>
						<span><input type="text" name="name" id="name_<?php echo $t['tid']; ?>" value="<?php echo $t['name']; ?>" class="cGray"></span>
						<span style="display: none;" id="tip_name_<?php echo $t['tid']; ?>" class="login_error cRed"></span>
						</dd>
					</dl>
					<dl class="sex">
						<dt>社团人数：</dt><dd><?php echo $t['team_num']; ?>人</dd>
					</dl>
					<dl>
						<dt>我的标签：</dt>
						<dd>
							<div class="b_form_tags">
								<ul id="setTags<?php echo $i; ?>">
								  <?php if (!empty($t['tag'])) { ?>
								   <?php $t['tag'] = explode(',', $t['tag']); ?>
								   <?php foreach ($t['tag'] as $tag) { ?>
								   <li index="<?php echo array_search($tag, $team_tag_auto); ?>"><em><?php echo $tag; ?></em><b title="删除当前标签"></b></li>
								   <?php } ?>
								  <?php } ?>
								</ul>
							</div>
						</dd>
					</dl>
                    <dl>
                    	<dt>选择：</dt>
                        <dd class="b_form_tags_all" id="tagtext<?php echo $i; ?>">
                          <?php if (!empty($team_tag_auto)) { ?>
                           <?php $t['tag'] = !empty($t['tag']) ? $t['tag'] : array(); ?>
                           <?php foreach ($team_tag_auto as $k=>$tag) { ?>
                            <a href="" index="<?php echo $k; ?>" <?php if (in_array($tag, $t['tag'])) { ?>class="on"<?php } ?>><?php echo $tag; ?></a>
                           <?php } ?>
                          <?php } ?>
                        </dd>
                    </dl>
					<script>addtags($("#setTags<?php echo $i; ?>"),$("#tagtext<?php echo $i; ?>"));//内部节构不要调整。</script>
					<dl class="form">
						<dt>社团简介：</dt>
						<dd>
						<span>
						<textarea class="cGray" name="desc" id="desc_<?php echo $t['tid']; ?>" onfocus="hidedesc(<?php echo $t['tid']; ?>)" onblur="showdesc(<?php echo $t['tid']; ?>)"><?php if(!empty($t['desc'])) { ?><?php echo $t['desc']; ?><?php } else { ?>请输入社团简介,内容不超过300字<?php } ?></textarea>
						</span>
						<span style="display: none;" id="tip_desc_<?php echo $t['tid']; ?>" class="login_error cRed"></span>
						</dd>
					</dl>
					<div class="buttn"><a href="javascript:;void(0)" onclick="editprofile(<?php echo $t['tid']; ?>,<?php echo $i; ?>)" class="usr_btn" id="usr_btn_<?php echo $t['tid']; ?>">确定</a></div>
				</div>
				<?php $i++; ?>
				<?php } ?>
				<?php } ?>
            	
                <script>
                $(function(){
					var oMivs=$("#usr_setup");
					oMivs.find(".moute").delegate("span","click",function(){
					var obj = $("#usr_setup .info"),omv = oMivs.find(".moute span");
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
<script type="text/tmpl" id="msgtmpl">
	<dl class="pub-confirm">
		<dt>
			<strong class="f16px cOrange fY">编辑资料成功！</strong>
		</dt>
		<dd><a href="javascript:;void(0)" onclick="$.layer()">关闭</a><a href="javascript:;void(0)">继续编辑社团资料</a></dd>
	</dl>
</script>
<script type="text/javascript">
function editprofile(id,tag_index){
	 var tags = '';
	 var tagarr = new Array();
	 $("#setTags"+tag_index+" li em").each(function(i,t){
        tagarr.push($(this).html());
	 });
	 tags = tagarr.join(',');
	 initial(id);
	 var is_run = false;
	 if(!is_run){
		 $("#usr_btn_"+id).html('正在处理中...请稍后!');
		 is_run = true;
		 $.ajax({
				type: "post",
				url: "/space/team/profile",
				dataType:"json",
				data:{
					tid:id,
					realname:$("#realname_"+id).val(),
					mobile:$("#mobile_"+id).val(),
					qq:$("#qq_"+id).val(),
					name:$("#name_"+id).val(),
					desc:$("#desc_"+id).val(),
					is_show_email:document.getElementById("is_show_email_"+id).checked ? 1 : 0,
					is_show_mobile:document.getElementById("is_show_mobile_"+id).checked ? 1 : 0,
				    tag:tags,
					profilesubmit:true
				},
				success: function(data){
				      if(data['result']){ 
				    	  $.layer($('#msgtmpl').html());
					  }else{
						  $("#tip_"+data['tip_type']).html(data['msg']);
						  $("#tip_"+data['tip_type']).css("display","block");
					  }
				      $("#usr_btn_"+id).html('确定');
				      is_run = false;    
				}
			}); 
	 }else{
		 $("#usr_btn_"+id).html('正在处理中...请稍后!');
	 }
}

function initial(id){
	$("#tip_mobile_"+id).css("display","none");
	$("#tip_name_"+id).css("display","none");
	$("#tip_desc_"+id).css("display","none");
}

function hidedesc(id){
	if($("#desc_"+id).val() == '请输入社团简介,内容不超过300字'){
		$("#desc_"+id).val('');
    }

}

function showdesc(id){
	if($("#desc_"+id).val() == ''){
		$("#desc_"+id).val('请输入社团简介,内容不超过300字');
    }
}
</script>
<?php $this->load->view('public/footer.php'); ?>
