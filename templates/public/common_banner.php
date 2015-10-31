<div class="usr_filter">
		<ul class="cWhite">
		<li <?php if($app == 'pwd') { ?>class="on"<?php } ?>><a href="<?php echo $this->config->item('i_url'); ?>u/pwd">修改密码</a></li>
		<li <?php if($app == 'profile') { ?>class="on"<?php } ?>><a href="<?php echo $this->config->item('i_url'); ?><?php if($is_team) { ?>u/society/profile<?php } else { ?>u/set<?php } ?>">编辑资料</a></li>
		<li <?php if($app == 'upload_avatar') { ?>class="on"<?php } ?>><a href="<?php echo $this->config->item('i_url'); ?>u/upload">修改头像</a></li>
		<li <?php if($app == 'bind') { ?>class="on"<?php } ?>><a href="<?php echo $this->config->item('i_url'); ?>u/oauth">帐号绑定</a></li>
		<?php if($is_team) { ?>
		<li <?php if($app == 'setoauth') { ?>class="on"<?php } ?>><a href="<?php echo $this->config->item('i_url'); ?>u/society/setoauth">基础设置</a></li>
		<?php } ?>
	</ul>
</div>