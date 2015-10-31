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
            	<h2>评委积分兑换明细</h2>
            </div>		
        	<dl class="pk_pingwei">
            	<dt>评委积分</dt>
                <dd>目前评委积分数量：<span class="cRed"><?php echo $my_rater_credit;?></span>积分，<span class="cRed"><?php echo $my_rater_rate;?></span>准确率。    <a class="cBlue" href="http://www.saiku.com.cn/pk/ladder/credit.html" target="_blank">评委积分说明</a></dd>
            </dl>
            <div class="pk_jiBox" id="pk_jiBox">            	
            	<div class="item">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <th>时间</th>
                        <th>行为</th>   
                        <th>积分/准确率</th>                 
                        <th>状态</th>
                      </tr>
                      <?php foreach ($res['list'] as $k=>$v) { ?>
                      <tr>
                        <td><?php echo $v['record_time'];?></td>
                        <td>兑换<?php echo $v['ide_name'];?></td>                          
                       <td><?php echo abs($v['convert_value'])."/".$v['right_rate']."%";?></td>        
                                             
                       <td>兑换成功</td>
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
