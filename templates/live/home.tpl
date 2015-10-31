<?php $this->load->view('public/20141107/head.php'); ?>
<!--content begin-->
<script>
var activity_id = <?php echo intval($gid);?>;
</script>
<div class="s_index fY">
    <div id="zSlider">
		<?php echo $frag_index_banner;?>
    </div>
    <dl class="s_buttin">
		<?php
        $now = date("Y-m-d H:i:s");
		if(is_login()){
		/* 根据时间和报名来判断按钮的状态 */
			

			if($now >= $curPeriod['date_start'] && $now <= $curPeriod['upload_end']){ //在报名时间内
				$join_apply = "本轮报名于{$curPeriod['date_start']}开始";

				//判定是否可以上传视频
				if(empty($sign_info)){
					$upClass = 's_button_a';
					$upUrl = "javascript:void(0);";
					$upMsg = '上传视频';
				}
				else if(empty($worksInfo)){
					$upClass = 's_button';
					$upUrl = "/show/video/upload?sid={$sign_info['sid']}&gid={$gid}&period={$period}";
					$upMsg = '上传视频';
				}elseif($worksInfo['status'] != 3){
					$upClass = 's_button_a';
					$upUrl = "javascript:void(0);";
					$upMsg = '上传视频';
				}else{
				    $upClass = 's_button';
					$upUrl = '/show/video/act?wid='.$worksInfo['id'];
					$upMsg = '查看视频';
				}

				//判定是否已报名
				if(empty($sign_info)){
					$joinClass = 's_button';
					$joinUrl	= $this->config->item('i_url').'/space/sign/show/'.$gid;
				}else{
					$joinClass = 's_button_a';
					$joinUrl	= 'javascript:void(0);';
				}
			}else{
				$joinClass	= 's_button_a';
				$joinUrl	= 'javascript:void(0);';
				$join_apply = "本轮报名已于{$curPeriod['upload_end']}结束";
				$upClass = 's_button_a';
				$upMsg = '上传视频';
				$upUrl = 'javascript:void(0);';
			}
            
		?>
				<dt>
                <?php if($joinClass == 's_button'){ ?>
                    <a class="<?php echo $joinClass;?>" href="<?php echo $joinUrl;?>">我要参加</a>
                <?php }else{ ?>
                    <a class="<?php echo $upClass;?>" href="<?php echo $upUrl;?>"><?php echo $upMsg;?></a>
				<?php } ?>	
                <p><?php echo $join_apply;?></p>
                </dt>
				<dd>
                <?php if($curPeriod['vote_start'] <= $now && $now <= $curPeriod['vote_end']){ ?>
                    <?php $join_vote = "本轮投票将于{$curPeriod['vote_end']}结束"; ?>
                    <?php 
                    $redis = new redis();
                   	$redis->connect(REDIS_HOST,REDIS_PORT);
                    $work_list = "show_user_pk_work_".$gid.'_'.$period;
                    if($redis->exists($work_list)){
                        ?>
                        <a class="s_button" href="/show/rand" target="_blank">我要投票</a>
                        <?php
                    }else{
                        ?>
                        <a class="s_button_a" href="javascript:;">我要投票</a>
                        <?php
                    }
                    ?>
                <?php }else{ ?>
                    <?php $join_vote = "本轮投票将于{$curPeriod['vote_start']}开始"; ?>
                    <a class="s_button_a" href="javascript:;">我要投票</a>
                <?php } ?>
                <a href="/show/notice" target="_blank">报名须知</a>
                <p><?php echo $join_vote;?></p>
                </dd>
		<?php
		}else{ //未登录状态按钮
		?>
		<dt>
			<a class="s_button" href="<?php echo $this->config->item('i_url').'/space/sign/show/'.$gid;?>">我要参加</a>
			<a class="s_button_a" href="javascript:void(0);">我要上传</a>
			<p><?php echo "本轮报名于{$curPeriod['date_start']}开始";?></p>
		</dt>
		<dd>
            <?php if($curPeriod['vote_start'] <= $now && $now <= $curPeriod['vote_end']){ 
                    $join_vote = "本轮投票将于{$curPeriod['vote_end']}结束";
			?>
			<a class="s_button" href="<?php echo $this->config->item('base_url').'/show/rand';?>">我要投票</a>
            <a href="/show/notice" target="_blank">报名须知</a><p><?php echo $join_vote;?></p>
            <?php }else{ 
                    $join_vote = "本轮投票将于{$curPeriod['vote_start']}开始";
			?>
            <a class="s_button_a" href="javascript:void(0);">我要投票</a>
            <a href="/show/notice" target="_blank">报名须知</a><p><?php echo $join_vote;?></p>
            <?php } ?>
            
		</dd>
		<?php
		}
		?>
    </dl>
    <div class="sLista">
    	<div class="sLista_lf">
        	<div class="sLista_lf_tit"><b>排名</b><i>参赛者</i><span>战斗力</span><em>参赛视频</em><a class="cOrange" target="_blank" href="/show/top?gid=<?php echo $gid;?>">更多</a></div>
        	<ul>
				<?php foreach($list as $l){
				$user_url = $this->config->item('q_url')."/u/{$l['uid']}";
                if($period ==  1){$l['combat'] = '-';}
				echo <<<LI
				<li><b>{$l['rank']}</b><i><a target="_blank" href="{$user_url}">{$l['realname']}</a></i><span>{$l['combat']}</span><em><a href="/show/video/act?wid={$l['id']}" target="_blank">{$l['title']}</a></em></li>
LI;
				}?>
            </ul>
        </div>
        <div class="sLista_rg">
        	<h2>站内公告</h2>
            <div class="sLista_lead">
            	<div>
                    <ul id="sinfo_list">
						<?php foreach($article_list as $l){?>
						<li><a href=""><?php echo $l['title'];?></a></li>
						<?php }?>
                   </ul>
               	</div>
            </div>
        </div>
        <ul class="sLista_bot" id="sLista_lead_bot" data-val=<?php echo $gid;?>>
        </ul>
    </div>
    <div class="sTheme">
    	<dl class="sTitlev">
        	<dt class="tita"></dt>
            <dd></dd>
        </dl>
        <div class="competi">
        	<ul class="competi_top">
				<?php foreach($theme as $k=>$t){
				$p_s = '';
                if($t['period'] < $period){
                    $p_status = 'class="wj"';
                    $p_s = '<i>已完结</i>';
                }elseif($t['period'] == $period){
                    $p_status = 'class="no"';
                }else{
                    $p_status = '';
                }
				echo <<<LI
				<li {$p_status} ><h3>第{$t['period']}周{$p_s}</h3><span>{$t['date']}</span></li>
LI;
				}
				?>
            </ul>
            <div class="tion">

				<?php foreach($theme as $k=>$t){?>
				<div class="box" <?php if($t['period'] == $period) echo ' style="display:block;"';?>>
                	<dl>
						<dt><b><?php echo $t['title']?></b>
						<a class="cBlue" href="<?php echo $t['href']?>"><?php echo $t['href_title']?></a></dt>
						<dd><?php echo $t['desc']?></dd>
                    </dl>
					<div>
						<?php 
						if(!empty($sign_info)){
							$url = "/show/video/upload?sid={$sign_info['sid']}&gid={$gid}&period={$t['period']}";
							if($t['end'] == 1){
						          if(empty($t['works'])){
						              if($t['period'] > $period){
                                        echo "<a class='onb' href='{$url}'>提前上传该主题作品</a>";
                                        }
                                    }else{ 
                                       echo "<a class='ona' href='{$url}'>替换主题作品</a>";
                                    }
							}
						}
						?>
					</div>
                </div>
				<?php
				}
				?>
            </div>
        </div>

		<!--推荐选手-->
    	<dl class="sTitlev">
        	<dt class="titb"></dt>
			<dd><a href="/show/top?gid=<?php echo $gid;?>" target="_blank">更多</a></dd>
        </dl>
        <div class="recommended css3img">
        	<div class="recom_top cWhite">
				<?php foreach($rankArr as $k=>$top){?>
                <?php if($k <3 ){ ?>
                <dl>
					<dt><a href="<?php echo $top['play_path'];?>" target="_blank"><img src="<?php echo $top['img_path'];?>" /></a></dt>
					<dd class="rtit"><a href="<?php echo $top['play_path'];?>" target="_blank"><?php echo $top['title']?></a></dd>
					<dd class="rname r0<?php echo $k+1;?>">
					<i>用户: <a href="<?php echo $this->config->item('q_url')?>/u/<?php echo $top['userid'];?>"><?php echo $top['username']?></a></i>
						<span>播放: <?php $top['play']?></span>
					</dd>
                </dl>
				<?php }} ?>
            </div>
			<!--排名8位-->
            <div class="recom_end">
				<?php foreach($rankArr as $k=>$rank){?>
                <?php if($k >2 ){ ?>
            	<dl>
					<dt><a href="<?php echo $rank['play_path'];?>" target="_blank"><img src="<?php echo $rank['img_path'];?>" width="210px" /></a></dt>
                    <dd>
					<b class="fl"><span class="icon_ren"></span><a href="<?php echo $this->config->item('q_url')?>/u/<?php echo $rank['userid'];?>"><?php echo $rank['username'];?></a></b>
					<i class="fr"><span class="icon_zhan"></span>战斗力: <?php echo $rank['combat']?></i>
                    </dd>
                </dl>
                <?php }?>
				<?php }?>
            </div>
        </div>
		<!--推荐选手END-->

		<!--最火视频-->
    	<dl class="sTitlev">
        	<dt class="titc"></dt>
            <dd><a href="/show/video/lists?gid=<?php echo $gid;?>&period=<?php echo $period;?>" target="_blank">更多</a></dd>
        </dl>
        <div class="recom_box css3img">
			<?php foreach($hotArr as $arr){?> 
            <dl>
				<dt><a href="<?php echo $arr['play_path'];?>" target="_blank"><img src="<?php echo $arr['img_path'];?>" width="210px"/><i></i></a></dt>
                <dd>
				<h3><a class="cBlack" href="<?php echo $arr['play_path'];?>"><?php echo $arr['title'];?></a></h3>
                    <b>用户: <a href="<?php echo $this->config->item('q_url')?>/u/<?php echo $arr['userid'];?>"><?php echo $arr['username'];?></a></b>
					<span>播放: <?php echo $arr['play']?></span>
                </dd>
			</dl>
			<?php }?>
        </div>
		<!--最火视频End-->

		<!--精彩推荐-->
    	<dl class="sTitlev">
        	<dt class="titd"></dt>
            <dd><a href="/show/video/lists?gid=<?php echo $gid;?>&period=<?php echo $period;?>" target="_blank">更多</a></dd>
        </dl>
        <div class="snapshots css3img">
        	<ul>
			<?php foreach($recommend as $arr){?> 
            	<li><a href="<?php echo $arr['play_path'];?>" target="_blank"><img src="<?php echo $arr['img_path'];?>" width="210px"/><i></i></a></li>
			<?php }?>
            </ul>
        </div>
		<!--精彩推荐End-->
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
<script type="text/tcl" id="saiShizj">
	<div class="index_tcC">
		<dl class="index_tcc_con">
			<dt class="f18px">赛事总结</dt>
        	<dt><b>我</b>&nbsp;挑战&nbsp;<b>张喊打</b><i>获胜</i>获得战斗力【<span>500</span>】&nbsp;&nbsp;道具加成【<span>500</span>】&nbsp;&nbsp;总计获得战斗力【<span>500</span>】</dt>
        	<dt><b>张喊打</b>&nbsp;挑战&nbsp;<b>我</b><em>失败</em>获得战斗力【<span>500</span>】&nbsp;&nbsp;道具加成【<span>500</span>】&nbsp;&nbsp;总计获得战斗力【<span>500</span>】</dt>
        	<dt><b>我</b>&nbsp;挑战&nbsp;<b>张喊打</b><em>失败</em>获得战斗力【<span>500</span>】&nbsp;&nbsp;道具加成【<span>500</span>】&nbsp;&nbsp;总计获得战斗力【<span>500</span>】</dt>
            <dd>上轮排名【<span class="lv">500</span>】名&nbsp;&nbsp;&nbsp;&nbsp;当前战斗力【<span class="lv">500</span>】&nbsp;&nbsp;&nbsp;&nbsp;本轮排名【<span class="lv">500</span>】名</dd>
			<dd><input class="s_button" onclick="$.layer()" type="button" value="关闭" /></dd>
        </dl>
	</div>
</script>
<script>
	//$.layer($("#saiShizj").html());
</script>
<?php $this->load->view('public/20141107/foot.php'); ?>
