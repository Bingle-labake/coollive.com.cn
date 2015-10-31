<?php $this->load->view('public/common_head.php'); ?>
<?php $this->load->view('public/space_head.php'); ?>
<!--content begin-->
<div class="pub-content">
	<div class="pub-w usr_content">
		<!-- 左侧导航 START -->
		<?php $this->load->view('public/space_left.php'); ?>
		<!-- 左侧导航 END -->
		<div class="sx_contentR fr">
        	<div class="sx_title">
            	<h2 class="fB f14px fl">与 <?php echo $fusername; ?> 私信的内容</h2>
            	<div class="fr">
            	<form method="get" id="search" action="/space/message">
            	<input id="setvalue" name="keyword" type="text" value="<?php if(!empty($keyword)) {echo $keyword;}else { echo "查找联系人或私信";}?>" initValue="查找联系人或私信" class="cGray" />
            	<input class="ssy" type="hidden" name="type" value="letter_chat">
            	<input class="ssy" type="hidden" name="fuid" value="<?php echo $fuid; ?>">
            	<input class="ssy" type="submit" value="搜索">
            	</div>
            	</form>
            	</div>            
			<script>
            $.setValue($("#setvalue"),function(element){
                alert(element.data("val"))
            });
            </script>
            <dl class="sx_tip">
            	<dt><label><input id="sQuanx" type="checkbox" /> 全选</label> <span onClick="$.layer($('#pk_delel').html())">删除</span></dt>
                <dd><?php if($is_shield) {?> <a href="javascript:void(0);" data-fuid=<?php echo $fuid; ?> data-val="1" >解除屏蔽</a> <?php }else { ?> <a href="javascript:void(0);" data-fuid=<?php echo $fuid; ?> data-val="0" >屏蔽TA</a> <?php }?></dd>
            </dl>
            <dl class="sx_Area">
                <dt><span class="fl">发私信给：<?php echo $fusername; ?></span><em class="fr">还可以输入256字</em></dt>
                <dd id="sAtxt">
                	<textarea></textarea>
                	<input type="hidden" name="fuid" value="<?php echo $fuid; ?>">
                    <input type="button" class="b_chat_btn" value="发送">
                    <i class="hide">发送成功！</i>
                </dd>
                <script>
				$(function(){
					var sata = $("#sAtxt");
					sata.find("input").click(function(){
						sata.find("i").fadeIn();
						setTimeout(function(){sata.find("i").fadeOut();},2000);
						})
					})
                </script>
            </dl>
            <div class="sx_sList" id="sx_sList">
                <?php foreach ($res['list'] as $k=>$v) { ?>		       
		      
		            <?php if($me == $v['uid']) {?>
		            <div class="itemfl" id="msg_<?php echo $v['id'];?>" data-value="<?php echo $v['id'];?>">
                	  <p class="font fA"><?php echo $v['record_time'];?></p>
                      <div class="sx_contd">
                    	  <a class="fl"  href="/q/m/<?php echo $v['uid'];?>"><img src="<?php echo $this->config->item('img3_url').avatar($v['uid']);?>" alt="<?php echo $v['username'];?>" /></a>
                          <div class="sx_txt fl">
                            	<p><?php echo $v['content'];?></p>
                                <div class="cardArr"><i>◆</i><em>◆</em></div>
                          </div>
                       </div>
                    </div>       	
			        <?php }else {?>	
			        <div class="itemfr" id="msg_<?php echo $v['id'];?>" data-value="<?php echo $v['id'];?>">
                	    <p class="font fA"><?php echo $v['record_time'];?></p>
                        <div class="sx_contd">
                        	<input class="fr" type="checkbox" data-val="<?php echo $v['id'];?>" /><a class="fr" href="/q/m/<?php echo $v['uid'];?>"><img src="<?php echo $this->config->item('img3_url').avatar($v['uid']);?>" alt="<?php echo $v['username'];?>" /></a>
                            <div class="sx_txt fr">
                            	<p><?php echo $v['content'];?></p>
                                <div class="cardArr"><i>◆</i><em>◆</em></div>
                            </div>
                         </div>
                    </div>
			       
			        <?php }?>														
		       <?php } ?>            	
            	
            </div>
            </div>
            <?php echo $page; ?>
		</div>
	</div>
</div>
<!-- begin-->
<script type="text/tmpl" id="pk_delel">
<div class="pk_player">
	<h2 class="f16px fY cWhite"><span onclick="$.layer()"></span>删除私信</h2>
    <dl>
    	<dt>
        	<h3 class="f18px fY">你确定要删除该私信吗！</h3>
        </dt>
        <dd class="cWhite"><a href="javascript:;" onclick="$.layer()">取消</a><a href="javascript:void(0)" onclick="$.remove_session(<?php echo $fuid; ?>)">确定</a></dd>
    </dl>
</div>
</script>
<script>
$(function(){
var oquan = $("#sQuanx"),list = $("#sx_sList input");
oquan.click(function(){
	list.prop("checked",oquan.prop("checked")?true:false);
});
})
</script>
				
<script type="text/tmpl" id="msgtmpl">
	<dl class="pub-confirm">
		<dt>
			<strong class="f16px cOrange fY">确定要删除些通知？</strong>
			<p class="cGray">删除后不可恢复，请您慎重操作</p>
		</dt>
		<dd><a href="" onclick="$.layer()">取消</a><a href="" data-action="confirm">确定</a></dd>
	</dl>
</script>
<<script type="text/javascript">
<!--

function chatting(fuid, content) {
	$.ajax({
		url:'/space/message/todo_letter',
		data:{fuid:fuid, content:content},
		dataType:'json',
		success:function(res) {	
			if(typeof(res.error) == "undefined") {	
                if(res.code>0) {
                	$('#sAtxt textarea').val('');

                	var item = $(res.html).css({"display":"none"});   
                    $('#sx_sList').prepend(item);
					item.slideDown("slow");                
				}
			}else {
				alert(res.error);
			}
		}
	});
}

$('.b_chat_btn').click(function() {
	var fuid = $('input[name="fuid"]').val();
	var content = $('#sAtxt textarea').val();
	if(fuid>0 && content != "") {
        chatting(fuid, content);
	}else {
        alert("参数异常");
	}
});

//-->
</script>


<!--content end-->
<?php $this->load->view('public/footer.php'); ?>