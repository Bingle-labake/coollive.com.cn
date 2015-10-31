<?php $this->load->view('public/common_head.php'); ?>
<?php $this->load->view('public/space_head.php'); ?>
<script type="text/javascript" src="http://open.web.meitu.com/sources/xiuxiu.js"></script>
<div class="pub-content">
	<div class="pub-w usr_content">
		<?php $this->load->view('public/space_left.php'); ?>
		<div class="usr_contentR fr">
			<?php $this->load->view('public/common_banner.php'); ?>
			<div class="usr_setup" style="width:790px;height:600px;">
				<div class="face" id="altContent"></div>
			</div>
			<script type="text/javascript">
			;(function(){
				xiuxiu.setLaunchVars("maxFinalWidth", 400);
				xiuxiu.setLaunchVars("maxFinalHeight", 400);
				xiuxiu.embedSWF("altContent",5,"100%","100%");
				/*第1个参数是加载编辑器div容器，第2个参数是编辑器类型，第3个参数是div容器宽，第4个参数是div容器高*/
				xiuxiu.setUploadURL("<?php echo $this->config->item('i_url'); ?>/space/upload/uploadhead");//修改为上传接收图片程序地址
				xiuxiu.onBeforeUpload = function(data, id) {
                    
				}
				xiuxiu.setUploadType(2);
				xiuxiu.onInit = function (){
			    	xiuxiu.loadPhoto("<?php echo $this->config->item('i_url'); ?>/space/upload/avatar?uid=<?php echo $uid;  ?>");//修改为要处理的图片url;初始化的URL
				}
				xiuxiu.onUploadResponse = function (data){
			    	if(data == 'true'){
			    		$.layer($('#msgtmpl').html());
					}
				}
			})()
			</script>
		</div>
	</div>
</div>
<script type="text/tmpl" id="msgtmpl">
	<dl class="pub-confirm">
		<dt>
			<strong class="f16px cOrange fY">头像修改成功！</strong>
		</dt>
		<dd><a href="" onclick="$.layer()">关闭</a></dd>
	</dl>
</script>
<?php $this->load->view('public/footer.php'); ?>
