<?php $this->load->view('public/common_head.php'); ?>
<?php $this->load->view('public/space_head.php'); ?>
<!--content begin-->
<div class="pub-content">
	<div class="pub-w usr_content">
		<!-- 左侧导航 START -->
		<?php $this->load->view('public/space_left.php'); ?>
		<!-- 左侧导航 END -->
		<div class="usr_contentR fr">
			<div class="usr_filter">
				<ul class="cWhite">
					<li class="on"><a href="/space/question/add">我要提问</a></li>
					<li><a href="/space/question/msg_add">我要留言</a></li>
				</ul>
			</div>
			<div class="usr_leaveword">
				<dl>
					<dt>我要提问：</dt>
					<dd><input type="text" name="title" value="标题，最长120个字" data-value="标题，最长120个字"></dd>
				</dl>
				<dl>
					<dt>问题详情：</dt>
					<dd><textarea name="content" id="" class="cGray" data-value="对我们有什么建议和意见，请写在这里，最多140字">对我们有什么建议和意见，请写在这里，最多140字</textarea></dd>
				</dl>
				<p>
				<input name="type" value=<?php echo $type;?> type="hidden" />
				<input value="确定" type="submit" name="submit_btn" ></p>
			</div>
		</div>
	</div>
</div>
<script type="text/tmpl" id="msgtmpl">
	<dl class="pub-confirm">
		<dt>
			<strong class="f16px cOrange fY">问题提交成功！</strong>
		</dt>
		<dd><a href="" onclick="$.layer()">关闭</a><a href="">继续提问</a></dd>
	</dl>
</script>
<script>
var is_submit = false;
$('input[name="title"]').focus(function() {
	if($(this).val() == $(this).data("value")) {
		$(this).val("");
	}
}).blur(function() {
	if($(this).val() == "") {
		$(this).val($(this).data("value"));
	}
});

$('textarea[name="content"]').focus(function() {
	if($(this).val() == $(this).data("value")) {
		$(this).val("");
	}
}).blur(function() {
	if($(this).val() == "") {
		$(this).val($(this).data("value"));
	}
});

function clean_form() {
	$('input[name="title"]').val($('input[name="title"]').data("value"));
	$('textarea[name="content"]').val($('textarea[name="content"]').data("value"));

	is_submit = false;
	$('input[name="submit_btn"]').val("确定");
	$('input[name="submit_btn"]').attr("disabled",　false);　
}

function post_question(url, data) {
	$.ajax({
		url:url,
		data:data,
		dataType:'json',
		success:function(res) {	
			if(typeof(res.error) == "undefined") {	
                if(res.code>0) {
                	$.layer($('#msgtmpl').html())                	
  				}
			}else {
				alert(res.error);
			}
			clean_form();
		}
	});
}

$('input[name="submit_btn"]').click(function() {
	var data = {title:'', content:'', type:0};
	data.type    = $('input[name="type"]').val();

	if(data.type == 1) {
		if($('input[name="title"]').val() == "" || $('input[name="title"]').val() == "标题，最长120个字") {
			alert("标题不能为空！");
			return false;
		}else {
			if($('input[name="title"]').val().length>140) {
	        	alert("您的标题，最多为120字！");
	    		return false;
	        }
		}
	}	
	if($('textarea[name="content"]').val() == "" || $('textarea[name="content"]').val() == "请描述您的问题，最多140字") {
		alert("描述不能为空！");
		return false;
	}else {
        if($('textarea[name="content"]').val().length>140) {
        	alert("您的描述，最多140字！");
    		return false;
        }
	}
	data.title   = $('input[name="title"]').val();
	data.content = $('textarea[name="content"]').val();

	if(!is_submit) {
		is_submit = true;		
		$('input[name="submit_btn"]').val("正在提交中....");
		$('input[name="submit_btn"]').attr("disabled",　true);　
		post_question('/space/question/todo', data);
	}else {
        alert("正在提交中....请稍等!");
	}	
});

</script>
<!--content end-->
<?php $this->load->view('public/footer.php'); ?>
