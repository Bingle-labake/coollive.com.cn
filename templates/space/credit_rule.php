<?php $this->load->view('public/common_head.php'); ?>
<!--content begin-->
<div class="pub-content">
	<div class="pub-w ">
		<div class="usr_head usr_head_level clearfix">
		    <div class="info fl cWhite">
				<dl>
					<dt><span></span><img src="<?php echo $this->config->item('i_url').'/space/upload/avatar?uid='.$user['uid'];?>" alt="<?php echo $user['username']?>"></dt>
					<dd><strong class="fY f14px"><a href="<?php echo $this->config->item('q_url');?><?php echo build_uri('u', array('id'=>$user['uid']));?>"><?php echo $user['username']?></a></strong>（帐号:<?php echo $user['email']?>）</dd>
				</dl>
				<div><a href="/space/credit" class="f14px">查看我的金币详细</a></div>
			</div>

			<div class="exp fr">
				<ul class="exp_level">
					<li>当前等级：<i class="cRed f16px">V<?php echo $level_group['level']?></i></li>
					<li>距离下一个等级还需：<span class="cOrange"><?php echo ($level_group['max_credit']-$user['hcredits'])?>金币</span></li>
					<li>获取金币总额：<span class="cOrange"><?php echo $user['hcredits']?>金币</span></li>
					<li>当前金币总额：<span class="cOrange"><?php echo $user['credits']?>金币</span></li>
					<li>直投票：<span class="cOrange"><?php echo $user['votes']?>张</span></li>
				</ul>
			</div>
		</div>

		<div class="usr_level">
		    <ul>
				<li><em class="fY f14px">V<?php echo $level_group['level']?>专享特权</em></li>
				<li><?php echo $user['votes']?>张直投票和<?php echo $user['lottery']?>次抽奖机会</li>
				<li><a href="#huiyuanjibie">详情参看会员级别</a></li>
			</ul>
			<div class="level">
				<div>
					<dl style="width:<?php if($level_group['level'] == 0) {echo "66";}else {echo ($level_group['level']*66+33);}?>px;"><dt></dt></dl><!-- max-width = 660px , 每级宽66px -->
					<?php foreach($member_level as $k=>$level) {?>
					<a href="javascript:void(0)" class="v<?php echo $level['level']; ?> <?php if($level['level'] == $level_group['level']) { echo "on";}; ?>">
					    <?php if($level['level']>0) {?>
					    <i><?php echo $level['min_credit']; ?></i>
					    <span><?php echo $level['min_credit']; ?>金币</span>
					    <?php }?>
						<em>V<?php echo $level['level']; ?></em>
					</a>
				    <?php }?>				    
				</div>
				<b>(到达3级可获得1张直投票，详情参见<a class="fB cOrange" href="#huiyuanjibie">会员级别</a>）</b>
			</div>			
		</div>



		<div class="usr_levle_info">
			<div class="item">
				<dl>
					<dt>直投票规则</dt>
					<dd><span class="cRed">直投票有效期：获取直投票当日算起，3日内必须使用，否者视为无效票</span></dd>
				</dl>
				<ul class="fY">
					<li>
						<a href="javascript:void(0)">
							<em>试试运气</em>
							抽奖
						</a>
						<span>所有用户专享</span>
					</li>
					<li>
						<a href="javascript:void(0)">
							<em>500金币</em>
							兑换一张直投票
						</a>
						<span>所有用户专享</span>
					</li>
					<li>
						<a href="javascript:void(0)">
							<i>V3以上用户登录</i>
							抽奖
						</a>
						<span>V3以上用户专享</span>
					</li>
				</ul>
			</div>

			<div class="item" id="jinbiguize">
				<dl><dt>金币规则-得金币</dt></dl>
				<?php foreach($get_credit_config as $k=>$credit_group) {?>
				<table>
					<tr>
						<td rowspan="<?php echo count($credit_group['children'])+1; ?>" width="30%"><?php echo $credit_group['name']; ?></td>
						<th><span>金币获得途径</span></th>
						<th><span>金币获得数量</span></th>
					</tr>
					<?php foreach($credit_group['children'] as $credit) {?>
					<tr>
						<td><span><?php echo $credit['name']; ?></span></td>
						<td><span>+<?php echo $credit['act_score']; ?></span></td>
					</tr>					
					<?php }?>
				</table>
				<?php }?>				
			</div>
			<div class="item">
				<dl><dt>金币规则-花金币</dt></dl>
				<?php foreach($post_credit_config as $k=>$credit_group) {?>
				<table>
					<tr>
						<td rowspan="<?php echo count($credit_group['children'])+3; ?>" width="30%"><?php echo $credit_group['name']; ?></td>
						<th><span>金币获得途径</span></th>
						<th><span>金币获得数量</span></th>
					</tr>
					<?php foreach($credit_group['children'] as $credit) {?>
					<tr>
						<td><span><?php echo $credit['name']; ?></span></td>
						<td><span><?php echo $credit['act_score']; ?></span></td>
					</tr>					
					<?php }?>
					
					<tr>
						<td>兑换战斗力加成</td>
						<td width="220">-300</td>
					</tr>
				</table>
				<?php }?>
				

			</div>
			<div class="item" id="huiyuanjibie">
			    <dl><dt>会员级别</dt></dl>
				<table>
					<tr>
						<th>级别划分</th>
						<th>获得金币数量</th>
						<th>登录获得直投票(张)</th>						
					</tr>
					
				<?php foreach($member_level as $k=>$level) {?>
				    <tr>
						<td><?php echo $level['name']; ?></td>
						<td><?php if($level['min_credit'] == 0) { echo "<1000";  }else { echo $level['min_credit'];} ?></td>
						<td><?php echo $level['vote_num']; ?></td>						
					</tr>
				<?php }?>					
				</table>				
			</div>

		</div>

	</div>
	
</div>
<!--content end--> 
<?php $this->load->view('public/footer.php'); ?>
