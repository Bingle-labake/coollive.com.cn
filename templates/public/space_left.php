<div class="fl usr_menu">
	<dl>
		<dt class="fB <?php if(@$iis_open) { ?>open<?php } else { ?>close<?php } ?>" id="game">比赛中心</dt>
		<dd class="<?php if(!@$iis_open) { ?>hide<?php } ?>" id="game_list">
			<ul class="cGray">
				<li><a  <?php if($app == 'look') { ?>class="on"<?php } ?> href="<?php echo $this->config->item('i_url'); ?>u/look">我的比赛</a></li>
				<li><a <?php if($app == 'work') { ?>class="on"<?php } ?> href="<?php echo $this->config->item('i_url'); ?>u/work/look">作品管理</a></li>
			</ul>
		</dd>
	</dl>
	<dl>
		<dt class="fB"><a href="<?php echo $this->config->item('i_url'); ?>u/point" class="select">积分管理</a></dt>
	</dl>
	<?php if (!$is_team) { ?>
	<dl>
	    <?php 
	      $set_open = in_array($app, array('profile','pwd','upload_avatar','bind'))  ? true : false; 
	    ?>
		<dt class="fB <?php if($set_open) { ?>open<?php } else { ?>close<?php } ?>" id="set">我的设置</dt>
		<dd class="<?php if(!$set_open) { ?>hide<?php } ?>" id="set_list">
			<ul>
			    <li><a href="<?php echo $this->config->item('i_url'); ?>u/set" <?php if($app == 'profile') { ?>class="on"<?php } ?>>编辑资料</a></li>
				<li><a href="<?php echo $this->config->item('i_url'); ?>u/pwd" <?php if($app == 'pwd') { ?>class="on"<?php } ?>>修改密码</a></li>
				<li><a href="<?php echo $this->config->item('i_url'); ?>u/upload" <?php if($app == 'upload_avatar') { ?>class="on"<?php } ?>>修改头像</a></li>
				<li><a href="<?php echo $this->config->item('i_url'); ?>u/oauth" <?php if($app == 'bind') { ?>class="on"<?php } ?>>帐号绑定</a></li>
			</ul>
		</dd>
	</dl>
	<?php } ?>
	<dl>
		<dt class="fB"><a href="<?php echo $this->config->item('i_url'); ?>u/message">站内信</a></dt>
	</dl>
	<dl>
	    <?php 
	      $q_open = $this->uri->segment(2) == 'question' ? true : false; 
	    ?>
		<dt class="fB <?php if($q_open) { ?>open<?php } else { ?>close<?php } ?>" id="q">提问留言</dt>
		<dd class="<?php if(!$q_open) { ?>hide<?php } ?>" id="q_list">
			<ul class="cGray">
				<li><a href="<?php echo $this->config->item('i_url'); ?>u/guestbook" <?php if($this->uri->segment(2) == 'question' && ($this->uri->segment(3) == '' || $this->uri->segment(3) == 'message')) { ?>class="on"<?php } ?>>我的提问留言</a></li>
				<li><a href="<?php echo $this->config->item('i_url'); ?>u/guestbook/add" <?php if($this->uri->segment(2) == 'question' && ($this->uri->segment(3) == 'add' || $this->uri->segment(3) == 'msg_add')) { ?>class="on"<?php } ?>>提问留言区</a></li>
			</ul>
		</dd>
	</dl>
	<?php if ($is_team) { ?>
	<dl>
	   <?php $team_open = in_array($app, array('addmember','work','setoauth','member')) ? true : false; ?>
		<dt class="fB <?php if($team_open) { ?>open<?php } else { ?>close<?php } ?>" id="team">社团管理</dt>
		<dd class="<?php if(!$team_open) { ?>hide<?php } ?>" id="team_list">
			<ul>
				<li><a href="<?php echo $this->config->item('i_url'); ?>u/society" <?php if($app == 'addmember' || $app == 'member') { ?>class="on"<?php } ?>>管理成员</a></li>
				<!--<li><a href="/space/team/work" <?php if($this->uri->segment(3) == 'work') { ?>class="on"<?php } ?>>管理作品</a></li>-->
				<li><a href="<?php echo $this->config->item('i_url'); ?>u/society/setoauth" <?php if($app == 'setoauth') { ?>class="on"<?php } ?>>社团设置</a></li>
			</ul>
		</dd>
	</dl>
	<?php } ?>
</div>
<script type="text/javascript">
$(".fB").click(function(){
	var close = $(this).hasClass('close');
	var open = $(this).hasClass('open');
	if(close || open){
		var list = this.id+'_list';
		if(close){
			$(this).addClass("open");
			$(this).removeClass("close");
			$("#"+list).removeClass("hide");
		}else{
			$(this).addClass("close");
			$(this).removeClass("open");
			$("#"+list).addClass("hide");
		}
	}
	
});
</script>