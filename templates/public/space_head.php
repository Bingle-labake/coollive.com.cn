<div class="pub-w usr_head">
	<div class="info fl cWhite">
		<dl>
			<dt><span></span><a href="<?php echo $this->config->item('i_url'); ?>space/upload"><img src="<?php echo $this->config->item('i_url'); ?>space/upload/avatar?uid=<?php echo $user['uid']; ?>" alt=""></a></dt>
			<dd><strong class="fY f14px"><a href="<?php echo $this->config->item('i_url'); ?>u/home"><?php echo $user['username']; ?></a><br>[<font size="2px">UID:<?php echo $user['uid']; ?></font>]</strong></dd>
		</dl>
		<ul>
		   <?php if (!$is_team) { ?>
		   <li style="margin-left:70px;border-left:0px;border-right:0px"><a href="<?php echo $this->config->item('i_url'); ?>u/<?php echo $user['uid']; ?>" >个人主页</a></li>
		   <?php } else { ?>
			<li class="set" style="margin-left:70px;border-left:0px;border-right:0px"><a href="<?php echo $this->config->item('i_url'); ?>t/<?php echo $tid; ?>">社团主页</a></li>
			<?php } ?>
		</ul>
	</div>
	<div class="exp fr">
		<div class="score fl">
			<ul>
				<li><em class="cOrange fY fB" id="credits"><?php echo $space['credits']; ?></em>我的积分</li>
				<li><em class="cOrange fY fB" id="votes"><?php echo $space['votes']; ?></em>我的直投票</li>
			</ul>
			<dl>
				<dt><a href="<?php echo $this->config->item('i_url'); ?>u/point" target="_blank" class="cWhite">积分兑换直投票</a></dt>
			</dl>
		</div>

		<div class="level fl">
			<strong>我的等级：<em class="fA fB cOrange f18px">V<?php echo $space['g']['level']; ?></em></strong>
			<dl>
				<dt class="fl"><i style="width:<?php echo $space['g']['percent']; ?>%" title="离下一级还差<?php echo $space['g']['next_credit']; ?>分"></i></dt>
				<dd class="fl fA fB cOrange f14px">V<?php echo $space['g']['level']+1; ?></dd>
			</dl>
			<div><a href="<?php echo $this->config->item('i_url'); ?>u/point/rule" class="cWhite">等级记录回顾</a></div>
		</div>

		<div class="date fr">
			<dl class="cWhite">
				<dt><?php echo $cur_calender['month']; ?><strong class="fA fB"><?php echo $cur_calender['day']; ?></strong></dt>
				<dd>
				  <?php if($checkin_ok) { ?>
				  <a href="javascript:;void(0)" id="checkin" onclick="checkin()" >每日签到</a>
				  <?php } else { ?>
				  <a href="javascript:;void(0)" id="checkin" >已签到</a>
				  <?php } ?>
				</dd>
			</dl>
			<dl class="lottery cWhite">
				<dt></dt>
				<dd><i style="color:#ccc">积分抽奖</i></dd>
			</dl>
			<div id="dateTip"><span>◆</span><em>◆</em>已签到+10积分</div>
		</div>
		
		<div class="clear"></div>
		<div class="upload"><?php if(isset($app) && $app == 'uploadwork'){ ?><a href="<?php echo @$reurl;?>" class="fr">返回</a><?php }else{ ?><a href="/space/up/photo" class="fr">上传图集</a>&nbsp;<a href="/space/video" class="fr">上传视频</a><?php } ?></div>
	</div>
</div>