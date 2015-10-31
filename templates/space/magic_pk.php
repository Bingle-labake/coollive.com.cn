<?php $this->load->view('public/common_head.php'); ?>
<?php $this->load->view('public/space_head.php'); ?>
<!--content begin-->
<div class="pub-content">
	<div class="pub-w usr_content">
		<!-- 左侧导航 START -->
		<?php $this->load->view('public/space_left.php'); ?>
		<!-- 左侧导航 END -->
		<div class="usr_contentR fr">
        	<div class="pk_jiTit">
            	<h2>金币兑换</h2>
            </div>
            <!-- 兑换区域 START -->
		    <?php $this->load->view('space/magic.php'); ?>
		    <!-- 兑换区域 END -->
        	<div class="pk_jiTit2">
            	<h2>我的[跨级PK券]明细</h2>
            </div>
			<div class="usr_filter" id="usr_filter">
				<ul class="cWhite">
				    <li><a href="/space/credit/earn">获取金币</a></li>
					<li><a href="/space/credit/pay">使用金币</a></li>
					
					<li><a href="/space/magic/line">直投票</a></li>
					<li><a href="/space/magic/double">战斗力加成</a></li>
				</ul>
			</div>
            <div class="pk_jiBox" id="pk_jiBox">            	
            	<div class="item">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <th>时间</th>
                        <th>行为</th>
                        <th>张数</th>
                        <th>状态</th>
                      </tr>
                      <?php foreach ($res['list'] as $k=>$v) { ?>
                      <tr>
                        <td><?php echo $v['dateline'];?></td>
                        <td><?php echo "跨级PK券";?></td>
                        <td><?php echo "1";?></td>
                        <td><?php if($v['status'] == 1) { echo "有效"; }else {echo "失效";};?></td>
                      </tr>
		              <?php } ?> 
                    </table>
                    <?php echo $page; ?>
                </div>            	
            </div>
		</div>
	</div>
</div>
<script type="text/tmpl" id="msgtmpl">
	<dl class="pub-confirm">
		<dt>
			<strong class="f16px cOrange fY">直投票兑换成功！</strong>
		</dt>
		<dd><a href="" onclick="$.layer()">关闭</a><a href="">去直投区投票</a></dd>
	</dl>
</script>
<?php $this->load->view('public/footer.php'); ?>
