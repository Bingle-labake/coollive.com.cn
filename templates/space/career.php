<?php $this->load->view('public/common_head.php'); ?>
<?php $this->load->view('public/space_head.php'); ?>
<script>
function savecareer(){
	 var idtags = '';
	 var idtags_checkbox = '';
	 var idtags_radio = '';
	 var tagarr = new Array();
	 var idtagarr_checkbox = new Array();
	 var idtagarr_radio = new Array();
	 //身份标签
	 $(".status_box input").each(function(m,n){
		 if($(this).parents("li").hasClass("on")){
             if($(this).is(':checked')){
                 if($(this).attr('name') == 'idtag_checkbox'){
            	    idtagarr_checkbox.push($(this).val());
                 }else{
                	idtagarr_radio.push($(this).val());
                 }
                 
             }
	     }
	 });
	 idtags_checkbox = idtagarr_checkbox.join(',');
	 idtags_radio = idtagarr_radio.join(',');
	 if(idtags_checkbox != '' || idtags_radio != ''){
        idtags = idtags_checkbox+'|'+idtags_radio;
	 }
	 
	 initial();
	var is_run = false;
	if(!is_run){
		is_run = true;
		$(".usr_btn").html("正在处理中...请稍后!");
		$.ajax({
			type: "post",
			url: "/space/set/career",
			dataType:"json",
			data:{
		  		idtag:idtags,
				career:true
			},
			success: function(data){
		      if(data['result']){
			      var fr = $("#fr").val();
			      var gid = $("#gid").val();
			      var url = '';
			      if(fr != '' && gid != 0){
			    	  url = '/space/sign/'+fr+'/'+gid;
			    	  $("#url").html("继续报名");
				  }else{
					  $("#url").html("继续编辑个人资料");
				  }
				  $("#url").attr("href",url);
				  $('#msgtmpl').html($("#layer_success").html());
			     $.layer($('#msgtmpl').html());
			  }else{
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
}
</script>
<div class="pub-content">
	<div class="pub-w usr_content">
		<?php $this->load->view('public/space_left.php'); ?>
		<div class="usr_contentR fr">
			<?php $this->load->view('public/common_banner.php'); ?>
			<div class="usr_setup">
			    <input type="hidden" name="fr" id="fr" value="<?php echo $fr; ?>">
			    <input type="hidden" name="gid" id="gid" value="<?php echo $gid; ?>">
				<!--<div class='f14px fY cRed' style="padding:20px 0 10px 130px;line-height:30px;">完善职业信息，可以获得两张直投票！千载难逢的机会千万不要错过！<br>一张直投票需要500金币才能兑换哦！	</div>-->
				<div class="info">
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
							<dt></dt>
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
                    <script>addtags($("#setTags"),$("#tagtext"))</script>
					<div class="buttn"><a href="javascript:;void(0)" onclick="savecareer()" class="usr_btn">确定</a></div>
				</div>
			</div>
			</div>
		</div>
	</div>
</div>

<div id="layer_success" style="display:none">
<dl class="pub-confirm">
		<dt>
			<strong class="f16px cOrange fY">修改成功！</strong>
		</dt>
		<dd><a href="" onclick="$.layer()">关闭</a><a href="" id="url"></a></dd>
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
<?php $this->load->view('public/footer.php'); ?>
