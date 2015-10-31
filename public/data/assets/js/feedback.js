$('input[name="feedbackBtn"]').click(function() {	
	if(SK_UID > 0) {
		var desc  = $('textarea[name="desc"]').val();
		var email = $('input[name="email"]').val();
		if(desc != "" && isEmail(email)) {
			if(!is_run) {
				$('input[name="feedbackBtn"]').val('正在提交中....');
				$.submit_feedback(type, desc, email);
			}else {
				$.layer($('#warnningtmpl').html());
			}		
		}else {
			if(desc == "") {
				$('textarea[name="desc"]').css({"background":"#CCCCCC","border":"#F00 solid 1px"})
				                          .blur(function () { $(this).css({"background":"#FFFFFF","border":""}).next().html('');})
				                          .next().html('<span>描述不能为空！</span>');
				$('textarea[name="desc"]').focus();
			}else {
				$('input[name="email"]').css({"background":"#CCCCCC","border":"#F00 solid 1px"})
				                        .blur(function () { $(this).css({"background":"#FFFFFF","border":""}).next().html('');})
				                        .next().html('<span>邮箱不符合规则！</span>');
				$('input[name="email"]').focus();
			}
		}
	}else {
		$.layer('/api/member/common_login',{width:765, height:350});
	}	
});

$.downMenu($("#feedback_type"),function(element){
	type = element.data("val");
});

(function($){
	var is_run = false;
	var type  = 0;
	
	//提交意见反馈
	$.submit_feedback = function(type, desc, email) {
		desc  = encodeURIComponent(desc);
		email = encodeURIComponent(email);
		var query = {type:type, desc:desc, email:email};
		is_run = true;
		$.ajax({
			url: "/service/feedback/todo",
			data:query,
			cache:false,
			type: "POST",
			dataType: "json",
			success: function(result){
				if(result.code > 0) {
					$.layer($('#msgtmpl').html());
					$.init_feedback();
				}else {
					alert(result.error);
				}
				is_run = false;
				$('input[name="feedbackBtn"]').val('确定');
			}
		});
	}
	
	$.init_feedback = function() {	
		$('textarea[name="desc"]').val('');
		$('input[name="email"]').val('');
		$("#feedback_type").html('选择类型');
	}
})(jQuery);