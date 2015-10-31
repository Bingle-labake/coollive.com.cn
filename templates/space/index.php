<?php $this->load->view('public/common_head.php'); ?>
<?php $this->load->view('public/space_head.php'); ?>
<!--content begin-->
<div class="pub-content">
	<div class="pub-w usr_content">
		<?php $this->load->view('public/space_left.php'); ?>
		<div class="usr_contentR fr">
			<div class="usr_filter">
                <?php if(isset($game[0])){ ?><div class="pub-select" id="iisgame"><?php echo $game[0]['longtitle']?></div><?php } ?>
			</div>
			<dl class="usr_video">
            <?php if(isset($video[0])){?>
				<dt class="fl" id="videojs">
                <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="530" height="413" id="cc_<?php echo $video[0]['vid'];?>">
                <param name="movie" value="http://p.bokecc.com/flash/single/<?php echo $spark_config['user_id']; ?>_<?php echo $video[0]['vid'];?>_false_<?php echo $spark_config['playerid']; ?>_1/player.swf" />
                <param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" />
                <embed src="http://p.bokecc.com/flash/single/<?php echo $spark_config['user_id']; ?>_<?php echo $video[0]['vid'];?>_false_<?php echo $spark_config['playerid']; ?>_1/player.swf" width="530" height="413" name="cc_<?php echo $video[0]['vid'];?>" allowFullScreen="true" allowScriptAccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"/>
                </object>
                </dt>
				<dd class="fr cWhite css3img">
                    <span id="btnTop" class="cWhite f18px"><a href="javascript:;">◆</a></span>
					<div class="usr_videolst">
						<div id="usr_videolst">
                            <?php foreach($video as $k=>$info){ ?>
							<p id="video<?php echo $k+1;?>" <?php if($k==0){echo 'class="on"';} ?> ><a href="javascript:void(0)" id="video<?php echo $k+1;?>"><img  width="250px" src="<?php echo $img_url;?>/images/video<?php echo $info['pic_path']?>1,h_184,w_250.jpg"  alt=""></a><strong><?php echo $info['title']?></strong></p>
                            <?php } ?>
                        </div>
                    </div>
                    <em id="btnfoot" class="cWhite f18px"><a href="javascript:;">◆</a></em>
                    <!--<div class="on" id="video1">
                        <a href="javascript:void(0)" id="video1"><img width="244px"  height="184px" src="<?php echo $video[0]['imagepath']?>-1/0.jpg" alt=""></a><strong><a href="">参赛活动：<?php echo $video[0]['longtitle']?></a></strong>
                    </div>
					<?php if(isset($video[1])){ ?>
                    <div id="video2">
                        <a href="javascript:void(0)" ><img width="244px"  height="184px" src="<?php echo $video[1]['imagepath']?>-1/0.jpg" alt=""></a><strong><a href="">参赛活动：<?php echo $video[1]['longtitle']?></a></strong>
                    </div>
                    <?php } ?>
                    -->
				    
                </dd>
			</dl>
            <script type="text/javascript">
            var vid = '<?php echo $video[1]['vid'];?>';
            $("#video2").delegate("img","click",function(){
                  videoplay('<?php echo $video[1]['vid'];?>');
                  $("#showvote").html('<?php echo $video[1]['vote']?>');
                  $("#showtag").html('<?php echo $video[1]['tag']?>');
                  $("#showdescription").html('<?php echo $video[1]['description']?>');
                  $("#hidevote").html('<?php echo $video[1]['vote']?>');
                  $("#tag").val('<?php echo $video[1]['tag']?>');
                  $("#description").val('<?php echo $video[1]['description']?>');
                  vid = '<?php echo $video[1]['vid'];?>';
                  $('#video2').addClass('on').prev().removeClass('on');
                  $('#team2').show();
                  $('#tea,1').hide();
            })
            $("#video1").delegate("img","click",function(){
                  videoplay('<?php echo $video[0]['vid'];?>');
                  $("#showvote").html('<?php echo $video[0]['vote']?>');
                  $("#showtag").html('<?php echo $video[0]['tag']?>');
                  $("#showdescription").html('<?php echo $video[0]['description']?>');
                  $("#hidevote").html('<?php echo $video[0]['vote']?>');
                  $("#tag").val('<?php echo $video[0]['tag']?>');
                  $("#description").val('<?php echo $video[0]['description']?>');
                  vid = '<?php echo $video[0]['vid'];?>';
                  $('#video2').removeClass('on').prev().addClass('on');
                  $('#team1').show();
                  $('#team2').hide();
            })
            function videoplay(vid)
            {
                var videohtml = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="530" height="413" id="cc_'+vid+'" autostart="true">'
                +'<param name="movie" value="http://p.bokecc.com/flash/single/<?php echo $spark_config['user_id']; ?>_'+vid+'_false_<?php echo $spark_config['playerid']; ?>_1/player.swf" />'
                +'<param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" />'
                +'<embed src="http://p.bokecc.com/flash/single/<?php echo $spark_config['user_id']; ?>_'+vid+'_false_<?php echo $spark_config['playerid']; ?>_1/player.swf" width="530" height="413" name="cc_'+vid+'" autostart="true" allowFullScreen="true" allowScriptAccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"/>';
                $('#videojs').html(videohtml);
            }
            </script>
			<div class="usr_txtshow">
				<dl class="share">
					<dd class="fr">投票数: <i class="cOrange" id="showvote"><?php echo $video[0]['vote'];?></i><?php if($video[0]['status'] == 3 ){?>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" onclick="$('.edit').show();$('.usr_txtshow').hide();">编辑</a><?php } ?></dd>
				</dl>
				<dl class="tag clearfix">
					<dt class="cOrange fl" id="vote">标签：<span id="showtag"><?php echo $video[0]['tag'];?></span></dt>
                    <?php if(!empty($team) && isset($team[$video[0]['id']])){ ?><li class="fr" id="team1">视频推荐到：<a href="/q/t/<?php echo $team[$video[0]['id']]['tid'];?>"><?php echo $team[$video[0]['id']]['name'];?></a></li><?php } ?>
				    <?php if(!empty($team) && isset($team[$video[1]['id']])){ ?><li class="fr hide" id="team1">视频推荐到：<a id="teamid" href="/q/t/<?php echo $team[$video[1]['id']]['tid'];?>"><?php echo $team[$video[1]['id']]['name'];?></a></li><?php } ?>
                </dl>
				<p class="cBlack">简介：<br><span id="showdescription"><?php echo $video[0]['description'];?></span></p>
		  </div>
          <?php if(@$video[0]['status'] == 3){?>
            <div class="edit hide">
            	<dl class="share">
            		<dt class="fl">
            			<div class="bshare-custom icon-medium"><a title="分享到" href="http://www.bShare.cn/" id="bshare-shareto" class="bshare-more">分享</a><a title="分享到QQ空间" class="bshare-qzone"></a><a title="分享到新浪微博" class="bshare-sinaminiblog"></a><a title="分享到人人网" class="bshare-renren"></a><a title="分享到腾讯微博" class="bshare-qqmb"></a><a title="分享到网易微博" class="bshare-neteasemb"></a><a title="更多平台" class="bshare-more bshare-more-icon more-style-addthis"></a></div>
            		</dt>
            		<dd class="fr">投票数: <i class="cOrange" id="hidevote"><?php echo $video[0]['vote'];?></i>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" onclick="$('.usr_edit').hide();$('.usr_txtshow').show();">取消编辑</a></dd>
            	</dl>
                <div class="edit">
            		<dl>
            			<dt>简&nbsp;&nbsp;介：</dt>
            			<dd><textarea id="description"  name="description"><?php echo $video[0]['description'];?></textarea></dd>
            		</dl>
            		<dl>
            			<dt>标&nbsp;&nbsp;签：</dt>
            			<dd><input id="tag" name="tag" type="text" value="<?php echo $video[0]['tag'];?>"></dd>
            		</dl>
            		<dl>
            			<dt>&nbsp;</dt>
            			<dd><a href="javascript:;" onclick="$('.usr_edit').hide();$('.usr_txtshow').show();">取消</a><a id="submita" href="javascript:;">确定</a></dd>
            		</dl>
            	</div>
            </div>
            <script>
            $("#submita").click(function(){
                var tag = encodeURIComponent($("#tag").val(), "utf-8");
                var description = encodeURIComponent($("#description").val(), "utf-8");
                $.get('/space/video/submitvideoinfo?tag='+tag+'&description='+description+'&vid='+vid, function(data){
                    var jsondata = jQuery.parseJSON(data);
                    if(jsondata.status)
                    {
                        alert('编辑成功');
                        $("#showtag").html($("#tag").val());
                        $("#showdescription").html($("#description").val());
                        $("#tag").val($("#tag").val());
                        $("#description").val($("#description").val());
                        $('.usr_edit').hide();$('.usr_txtshow').show();
                    }
                    else
                    {
                        alert('编辑失败');
                        $('.usr_edit').show();$('.usr_txtshow').hide();
                    }
                });
            });
            </script>
            <?php } ?>
            <?php } ?>
	</div>
</div>
<div class="pub-downmenu hide" id="pub-downmenu">
<?php foreach($game as $k => $info){ 
    if($info['id'] == $gid ){ ?>
    <script>
        $('#iisgame').html('<?php echo $info['longtitle']?>');
    </script>    
    <?php }else{ ?>
    <li data-val="<?php echo $info['id']?>"><?php echo $info['longtitle']?></li>
<?php } } ?>
</div>
<script>
$.downMenu($("#iisgame"),$("#pub-downmenu"),function(element){
    location.href='/space/member?gid='+element.data("val");
});
</script>
<!--content end-->
<?php $this->load->view('public/footer.php'); ?>