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
            	<h2>我的[战斗力加成]明细</h2>
            </div>
			<div class="usr_filter" id="usr_filter">
				<ul class="cWhite">
				    <li><a href="/space/credit/earn">获取金币</a></li>
					<li><a href="/space/credit/pay">使用金币</a></li>
					
					<!-- <li><a href="/space/magic/line">直投票</a></li>  -->
					<!-- <li><a href="/space/magic/double">战斗力加成</a></li>  -->
				</ul>
			</div>
            <div class="pk_jiBox" id="pk_jiBox">
            	<div class="item">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <th>时间</th>
                        <th>名称</th>
                        <th>状态</th>
                      </tr>
                      <?php foreach ($res['list'] as $k=>$v) { ?>
                      <tr>
                        <td><?php echo $v['dateline'];?></td>
                        <td><?php echo "战斗力加成";?></td>
                        <td><span id="status_<?php echo $v['id'];?>"><?php if($v['status'] == 1) { 
                        	if($v['useing'] == 1) {
                                echo '<span class="cOrange">使用中..</span>';
                            }else {
                                echo '<input data-id="'.$v['id'].'" class="magic_double" type="text" value="使用">';
                            }
                         }else {echo "失效";};?></span></td>
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
<script>
function usering_double(id) {
	if(id>0) {
    	$.ajax({
    		url:'/space/magic/open_magic?callback=?',
    		data:{id:id},
    		dataType:'jsonp',
    		success:function(res) {	
    			if(typeof(res.error) == "undefined") {	
    				if(res.code>0) {
    					$('#status_'+id).html('<span class="cOrange">使用中..</span>');						
    				}else {
    					alert(res.error);
    				}
    			}else {
    				alert(res.error);
    			}
    		}
    	});    	
    }
}
$('.magic_double').click(function() {
	var magic_log_id = $(this).data("id");
	if(magic_log_id > 0) {
		usering_double(magic_log_id);
	}
});
</script>
<?php $this->load->view('public/footer.php'); ?>
