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
            	<h2 class="fB f14px fl">私信</h2><div class="fr">
            	<form method="get" id="search" action="/space/message">
            	<input id="setvalue" name="keyword" type="text" value="<?php if(!empty($keyword)) {echo $keyword;}else { echo "查找联系人或私信";}?>" initValue="查找联系人或私信" class="cGray" />
            	<input class="ssy" type="hidden" name="type" value="letter">
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
            	<dt><i>发私信</i><em>清空全部</em></dt>
                <dd><div id="demoPinb">已屏蔽用户</div></dd>
            </dl>
            <div class="Pinb_downmenu22 hide" id="Pinb_downmenu22">
                <?php 
                if(!empty($shield_list)) {
                foreach ($shield_list as $k=>$user) { 
                ?>	
                <li data-val="<?php echo $user['fuid'];?>"><?php echo $user['fusername'];?><i></i></li>
                <?php 
                }
                }
                ?>                  
            </div>
            <script>
            $.downMenu($("#demoPinb"),$("#Pinb_downmenu22"),function(element){
                var fuid = $(element).data('val');
            	$.sixing_unshield(fuid, element);                
            });
            </script>
            <div class="x_content" id="demoDel">
                 <?php foreach ($res['list'] as $k=>$v) { ?>	
                 <div class="info" id="msg_<?php echo $v['m_id'];?>">
                	<div class="Img"><a href="<?php echo $this->config->item('q_url');?><?php echo build_uri('u', array('id'=>$v['uid']));?>" target="_blank" alt="<?php echo $v['username'];?>">
                	<img src="<?php echo $this->config->item('img3_url').avatar($v['uid']);?>" alt="<?php echo $v['username'];?>" /></a></div>
                    <dl class="fr">
                    	<dt><b class="f14px fY fB"><a href="<?php echo $this->config->item('q_url');?><?php echo build_uri('u', array('id'=>$v['uid']));?>" target="_blank" alt="<?php echo $v['username'];?>"><?php echo $v['username'];?></a></b>
                    	<i class="outt" data-m_id="<?php echo $v['m_id'];?>" data-fuid="<?php echo $v['uid'];?>" data-act="del">删除</i><span ><?php echo $v['record_time'];?></span></dt>
                        <dd class="f14px"><a href="/space/message?type=letter_chat&fuid=<?php echo $v['uid'];?>" <?php if($v['is_read'] == 0) {echo 'class="fB"';}?>>
                        <?php echo $v['html']['title'];?>,<?php echo mb_strcut($v['html']['content'], 0, 12);?>...
                        </a></dd>
                    </dl>
                </div> 
		       <?php } ?>  
            </div>
            <?php echo $page; ?>            
		</div>
	</div>
</div>
<!-- begin-->

<script type="text/tmpl" id="pk_delel"><div></div>
<div class="pk_player">
	<h2 class="f16px fY cWhite"><span onclick="$.layer()"></span></h2>
    <dl>
    	<dt>
        	<h3 class="f18px fY">你确定要删除该私信吗！</h3>
        </dt>
        <dd class="cWhite"><a href="javascript:;" onclick="$.layer()">取消</a><a href="javascript:void(0);" onclick="$.letter_remove()">确定</a></dd>
    </dl>
</div>
</script>
<div class="Pin_downmenu hide" id="Pinb_down">
    <input type="hidden" name="m_id" value=""/>
    <input type="hidden" name="fuid" value=""/>
    <li data-val="1">删除<i></i></li>
    <li data-val="2">屏蔽<i></i></li>
</div>

<!--content end-->
<?php $this->load->view('public/footer.php'); ?>