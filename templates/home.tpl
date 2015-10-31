<?php $this->load->view('public/20141107/head.php'); ?>
<!--content begin-->
<script>
var activity_id = <?php echo intval($gid);?>;
</script>
<div class="s_index fY">
    <div id="zSlider">
		<?php echo $frag_index_banner;?>
    </div>   
	
    <div class="sTheme">
        <!--最新直播节目-->
    	<dl class="sTitlev">
        	<h1 class="cBlue" style="font-size:35px;">最新直播</h1>    	
            <dd><a href="/show/video/lists?gid=#&period=#" target="_blank">更多</a></dd>
        </dl>
        <div class="recom_box css3img">
			<?php foreach($new_programes as $programes){?> 
            <dl>
				<dt class="<?php if($programes['is_live'] == 1) {echo "is_living";}else if(!empty($programes['time_status'])){echo "un_living";}?>"><a href="http://coollive.labake.cn/room/<?php echo $programes['rid'];?>" target="_blank"><img src="<?php echo $programes['pic_src'];?>" width="210px" height="165px"/><i></i><em><?php if($programes['is_live'] == 1) {echo "";}else{echo $programes['time_status'];}?></em></a></dt>
                <dd>
				<h3><a class="cBlack" href="http://coollive.labake.cn/room/<?php echo $programes['rid'];?>"><?php echo $programes['name'];?></a></h3>
                    <b><a href="<?php echo $this->config->item('l_url')?>/u/<?php echo $programes['uid'];?>" target="_blank"><?php echo $programes['username'];?></a></b>
                </dd>
			</dl>
			<?php }?>
        </div>
		<!--最新直播节目End-->
		
		<!--热点回放-->
    	<dl class="sTitlev">
        	<h1 class="cBlue" style="font-size:35px;">热点直播回放</h1>    	
            <dd><a href="/show/video/lists?gid=#&period=#" target="_blank">更多</a></dd>
        </dl>
        <div class="recom_box css3img">
			<?php foreach($hot_prog_videos as $prog_video){?> 
            <dl>
				<dt><a href="<?php echo $this->config->item("l_url")."/v/".$prog_video['ccvid'];?>" target="_blank"><img src="<?php echo $prog_video['image'];?>" width="210px" height="165px"/><i></i></a></dt>                
				<h3><a class="cBlack" href="<?php echo $this->config->item("l_url")."/v/".$prog_video['ccvid'];?>"><?php echo $prog_video['title'];?></a></h3>  
                <b><?php echo $prog_video['views'];?>次播放<em></em>&nbsp;&nbsp;&nbsp;<?php echo rand(10, 200);?>次评论<em></em>&nbsp;&nbsp;&nbsp;<?php echo date("m-d H:i", $prog_video['record_time']);?><em></em></b>              
			</dl>
			<?php }?>
        </div>
		<!--热点回放End-->
        
        <!--群星闪烁-->
    	<dl class="sTitlev">
        	<h1 class="cBlue" style="font-size:35px;">群星闪烁</h1>    	
            <dd><a href="/show/video/lists?gid=#&period=#" target="_blank">更多</a></dd>
        </dl>
        <div class="recom_box css3img">
			<?php foreach($hot_videos as $video){?> 
            <dl>
				<dt><a href="<?php echo $this->config->item("l_url")."/v/".$video['vid'];?>" target="_blank"><img src="<?php echo $video['img_path'];?>" width="210px" height="165px"/><i></i></a></dt>                
				<h3><a class="cBlack" href="<?php echo $this->config->item("l_url")."/v/".$video['vid'];?>"><?php echo $video['title'];?></a></h3>  
                <b><em></em></b>                 
			</dl>
			<?php }?>
        </div>
		<!--热点回放End-->

		<!--推荐感兴趣的-->
    	<dl class="sTitlev">
        	<h1 class="cBlue" style="font-size:25px;">你可能感兴趣的</h1>  	
            <dd><a onclick="javascript:void(0);" style="vertical-align:middle;cursor:pointer;">看看其他的</a></dd>
        </dl>
        <div class="snapshots css3img">
			<div class="box">
			<?php foreach($recommend as $arr){?> 
				<dl>
					<dt>
						<a href="<?php echo $arr['play_path'];?>" target="_blank"><img src="<?php echo $arr['img_path'];?>" width="210px" height="165px"/><i></i></a>
					</dt>
					<dd>
					<a href="<?php echo $arr['play_path'];?>" target="_blank"><?php echo $arr['title'];?></a>
					</dd>
				</dl>
			<?php }?>
			</div>
        </div>
		<!--最新直播End-->
    </div>
    <div></div>
	<script>
		SmoveText($("#sinfo_list"));
    	function lead(){
			var lead = $("#sLista_lead_bot");
			lead.find("li").animate({marginTop:'-30'},2000);
		};
		$(function(){	
			$('.competi_top li').click(function(){
				$(this).addClass('no').siblings().removeClass('no');
				$('.tion>div:eq('+$(this).index()+')').show().siblings().hide();	
			})
		})
    </script>
</div>
<!--content end-->
<?php $this->load->view('public/20141107/foot.php'); ?>
