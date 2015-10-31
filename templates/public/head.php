<div class="pub-menu">
	<div class="pub-w cWhite f20px fY pub-menuCon">
		<div class="fr">
            <?php if(isset($user['uid']) && $user['uid'] >0) { ?>
            <!--<a href="/space"><?php echo $user['username']; ?></a>&nbsp;&nbsp;-->
            <?php echo $user['username']; ?></a>&nbsp;&nbsp;<span class="notice"></span>
            |&nbsp;&nbsp;<a href="/space/member/logout">退出</a>
            <?php
            }else {
            ?>
            <a href="/space/member/login">登录</a>&nbsp;&nbsp;
            |&nbsp;&nbsp;<a href="/space/member/register">注册</a>
            <?php
            }
    		?>        
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
	</div>
</div>