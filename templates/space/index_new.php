<?php $this->load->view('public/common_head.php'); ?>
<?php $this->load->view('public/space_head.php'); ?>
<div class="pub-content">
	<div class="pub-w usr_content">
		<?php $this->load->view('public/space_left.php'); ?>
		<div class="usr_contentR fr">
			<div class="usr_filter">
                <?php if(isset($game[0])){ ?><div class="pub-select" id="iisgame"><?php echo $game[0]['longtitle']?></div><?php } ?>
			</div>
			<?php if (!empty($video)) { ?>
			<dl class="usr_video">
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
                            <p id="video<?php echo $k;?>" <?php if($k==0){echo 'class="on"';} ?>><a href="javascript:void(0)" id="video<?php echo $k;?>"><img  width="250px" src="<?php echo $img_url;?>/images/video<?php echo $info['pic_path']?>1,h_184,w_250.jpg" alt=""><strong><?php echo $info['title']?></strong></a></p>
                            <?php } ?>
						</div>
					</div>
					<em id="btnfoot" class="cWhite f18px"><a href="javascript:;">◆</a></em>
				</dd>
				<script>moveHtmlUp({element:$("#usr_videolst"),left:$("#btnTop"),right:$("#btnfoot"),className:"end"});</script>
			</dl>
            <script type="text/javascript">
                var vid = '<?php echo $video[0]['vid'];?>';
                var videonum = 0;
                var videojson='<?php echo json_encode($video);?>';//字符串数组
                var videojsarr=JSON.parse(videojson);//将字符串转化成JS数组
                <?php foreach($video as $k=>$info){ ?>
                $("#video<?php echo $k;?>").delegate("img","click",function(){
                    vid = '<?php echo $info['vid'];?>';
                    videoplay(vid);
                    $('#video<?php echo $k;?>').removeClass('on').prev().addClass('on');
                    $('#usr_videolst p').removeClass('on');
                    $('#video<?php echo $k;?>').addClass('on');
                    videonum = parseInt('<?php echo $k;?>');
                    $(".vote_view").html('<?php echo @$info['vote'];?>');
                    $("#tag_view").html('<?php echo @$info['tag'];?>');
                    $("#title_view").html('<?php echo @$info['title'];?>');
                    $("#description_view").html('<?php echo @$info['description'];?>');
                    $("#title").val('<?php echo @$info['title'];?>');
                    $("#description").val('<?php echo @$info['description'];?>');
                    $("#edit").attr("indexid",videonum);
                    $(".xtag").remove();
                    <?php if(!empty($info['tag'])){ ?>
                    var tagjson= '<?php $tagarr = explode(',',$info['tag']);echo json_encode($tagarr); ?>';
                    var tagjsarr=JSON.parse(tagjson);//将字符串转化成JS数组
                    for(var i=0 ;i<6;i++)
                    {   if(tagjsarr[i] !== undefined )
                            $('#tagul').prepend('<li class="xtag"><em>'+tagjsarr[i]+'</em><b title="删除当前标签"></b></li>');
                        else
                            i=7;
                    }
                    <?php } ?>
                })
                <?php } ?>
                function videoplay(vid)
                {
                    var videohtml = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="530" height="413" id="cc_'+vid+'" autostart="true">'
                    +'<param name="movie" value="http://p.bokecc.com/flash/single/<?php echo $spark_config['user_id']; ?>_'+vid+'_false_<?php echo $spark_config['playerid']; ?>_1/player.swf" />'
                    +'<param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" />'
                    +'<embed src="http://p.bokecc.com/flash/single/<?php echo $spark_config['user_id']; ?>_'+vid+'_true_<?php echo $spark_config['playerid']; ?>_1/player.swf" width="530" height="413" name="cc_'+vid+'" autostart="true" allowFullScreen="true" allowScriptAccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"/>';
                    $('#videojs').html(videohtml);
                }
            </script>
			<div class="usr_txtshow">
            	<dl class="share">
            		<dt class="fl">
            			<!--<div class="bshare-custom icon-medium"><a title="分享到新浪微博" class="bshare-sinaminiblog"></a><a title="分享到微信" class="bshare-weixin"></a><a title="分享到人人网" class="bshare-renren"></a><a title="分享到腾讯微博" class="bshare-qqmb"></a><a title="分享到QQ空间" class="bshare-qzone"></a><a title="更多平台" class="bshare-more bshare-more-icon more-style-addthis"></a><span class="BSHARE_COUNT bshare-share-count">0</span></div>-->
            		</dt>
            		<dd class="fr">投票数: <i class="cOrange vote_view"><?php echo $video[0]['vote'];?></i>&nbsp;&nbsp;&nbsp;&nbsp;<a id="edit" href="javascript:;" indexid="0" onclick="$('.usr_edit').show();$('.usr_txtshow').hide();">编辑</a></dd>
            	</dl>
                <p class="cBlack">标题：<span id="title_view"><?php echo $video[0]['title'];?></span></p>
            	<p class="cBlack">简介：<br><span id="description_view"><?php echo $video[0]['description'];?></span></p>
                <br/>
                <dl class="tag clearfix">
            		<dt class="cOrange fl">标签：<span id="tag_view"><?php echo $video[0]['tag'];?></span></dt>
            	</dl>
            </div>
            <div class="usr_edit hide">
				<dl class="share">
					<dd class="fr">投票数: <i class="cOrange vote_view"><?php echo $video[0]['vote'];?></i>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" onclick="$('.usr_edit').hide();$('.usr_txtshow').show();">取消编辑</a></dd>
				</dl>
                <div class="edit">
    				<dl class="form">
    					<dt>标&nbsp;&nbsp;题：</dt>
    					<dd><input type="text" id="title"  name="title" value="<?php echo $video[0]['title'];?>"></dd>
    				</dl>
                    <dl class="form">
    					<dt>简&nbsp;&nbsp;介：</dt>
    					<dd><textarea id="description"  name="description"><?php echo $video[0]['description'];?></textarea></dd>
    				</dl>
    				<dl>
                        <dt><em class="cRed">* </em>标签：</dt>
						<dd id="setTags">
							<div class="b_form_tags">
								<ul id="tagul">
                                    <?php if(!empty($video[0]['tag'])){$tag_arr = explode(',',$video[0]['tag']);foreach($tag_arr as $v){ ?>
                                    <li class="xtag"><em><?php echo $v ?></em><b title="删除当前标签"></b></li>
                                    <?php }} ?>
									<li class="b_form_tags_input"><input type="text" id="tagid"/></li>
								</ul>
                                <span></span>
                            </div>
							<!--<p class="b_form_tags_all">已添加标签：<a href="" index="1">舞蹈</a><a href="" index="2">舞蹈2</a><a href="" index="3">舞蹈3</a><a href="" index="4">时尚</a></p>-->
						</dd>
						<script>setTags($("#setTags"));//内部节构不要调整。</script>
    				</dl>
    				<dl class="form">
    					<dt>&nbsp;</dt>
    					<dd><a href="javascript:;" onclick="$('.usr_edit').hide();$('.usr_txtshow').show();">取消</a><a id="submita" href="javascript:;">确定</a></dd>
    				</dl>
    			</div>
            </div>
           <?php } ?>
		</div>
	</div>
</div>
<script>
    $("#submita").click(function(){
        var tag_i ='';
        var taga  = '';
        var i = 0;
        $('.b_form_tags em').each(function() {
            taga = $(this).html();
            if(i>0)tag_i += ',';
            tag_i += taga;
            i++;
        });
        var tag = encodeURIComponent(tag_i, "utf-8");
        var description = encodeURIComponent($("#description").val(), "utf-8");
        var title = encodeURIComponent($("#title").val(), "utf-8");
        $.get('/space/video/submitvideoinfo?tag='+tag+'&title='+title+'&description='+description+'&vid='+vid, function(data){
            var jsondata = jQuery.parseJSON(data);
            if(jsondata.status === 1)
            {
                alert('编辑成功');
                javascript:window.top.location.reload();
            }
            else
            {
                alert('编辑失败（标题、标签、简介不能为空）');
                $('.usr_edit').show();$('.usr_txtshow').hide();
            }
        });
    });
</script>
<div class="pub-downmenu hide" id="pub-downmenu">
<?php foreach($game as $k => $info){ 
    if($info['id'] == $gid ){ ?>
    <script>
        $('#iisgame').html('<?php echo $info['longtitle']?>');
    </script>    
    <?php }else{ ?>
    <li data-val="<?php echo $info['id']?>"><?php echo $info['longtitle']?></li>
<?php }} ?>
</div>
<script>
$.downMenu($("#iisgame"),$("#pub-downmenu"),function(element){
    location.href='/space/look?gid='+element.data("val");
});
</script>
<!--content end-->
<script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/buttonLite.js#style=-1&amp;uuid=317433ee-2548-48e2-88db-f3d46d1f16eb&amp;pophcol=2&amp;lang=zh"></script><script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/bshareC0.js"></script> 
<script type="text/javascript" charset="utf-8">
bShare.addEntry({
	url: document.location.href,
	summary: decodeURIComponent('<?php echo $video[0]['description'];?>'),
	pic: '<?php echo $video[0]['image'];?>'
});
</script> 
<?php $this->load->view('public/footer.php'); ?>