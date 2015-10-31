var curr_reply = null;
var is_run = false;
SITE_PATH = "http://i.saiku.com.cn";
//评论
(function($){
	$.init_comment = function() {
		if($.Check_Login()) {
			var html = $('#tmpl_comm_textarea').html();
			$('.block_report').html(html);
		}else {
			var html = $('#tmpl_comm_login').html();
			$('.block_report').html(html);
		}
	};
	
	//判断登录
	$.Check_Login = function() {
		if(SK_UID <= 0) {
			return false;
		}else {
			return true;
		}
	};
	
	//登录浮层
	$.Login_layer = function() {
		$.layer('http://www.saiku.com.cn/api/member/common_login?r='+Date.parse(new Date()),{width:765, height:350});
	}

	//添加评论
	$.Add_Comment = function(parentID)
	{
		if(!$.Check_Login())
		    return false;

		var content = $('.b_report_text textarea').val();

		if($.trim(content)=='' || $.trim(content)=='在这里输入评论内容，140字以内')
		{
			alert("评论的内容不能为空！");
			$('.b_report_text textarea').focus();
			return false;
		}
		var query = {type:SK_comments.type, ex_id:SK_comments.ex_id, content:content};
        
		is_run = true;
		$.ajax({
			url: SITE_PATH+"/space/comment/todo?callback=?",
			type: "POST",
			cache:false,
			data:query,
			dataType: "jsonp",
			success: function(result){
				if(result.code > 0)
				{
					$('.b_report_text textarea').val('在这里输入评论内容，140字以内');
					if($(parentID).children().length > 0)
					{
						var item = $(result.msg).css({"display":"none"});
						$('.report_list').prepend(item);
						item.slideDown("slow");
					}else {
						var item = $(result.msg).css({"display":"none"});
						$('.report_list').prepend(item);
						item.slideDown("slow");
					}
				}
				else
				{
					alert(result.error);
				}
				is_run = false;
			}
		});
	}


	//初始化评论列表
	$.Get_Comment_List = function(obj, _page, _pageSize)
	{
		var parent = $(obj);
		var query = {type:SK_comments.type, ex_id:SK_comments.ex_id, page:_page, size:_pageSize};

		$.ajax({
			url: SITE_PATH+"/space/comment?callback=?",
			data:query,
			cache:false,
			type: "POST",
			dataType: "jsonp",
			success: function(result){
				if(result.code > 0) {
					$('.report_list').append($(result.html));
			    	//parent.append(result.html);
				    parent.show();
					
				    if(result.pages != '') {
				    	$('.report_list').append(result.pages);
				    }				    
				}else {
					alert(result.error);
				}
			}
		});
	}

	//评论评论请求
	$.Reply_Comment = function(content, reply_cid, fuid)
	{
		if(!$.Check_Login())
			return false;

		var query = {type:SK_comments.type, ex_id:SK_comments.ex_id, content:content, parent_cid:reply_cid, fuid:fuid};
        
		is_run = true;
		$.ajax({
			url: SITE_PATH+"/space/comment/todo?callback=?",
			type: "POST",
			cache:false,
			data:query,
			dataType: "jsonp",
			success: function(result){
				if(result.code > 0)
				{
					if(curr_reply != null) {
						curr_reply.remove();	
						curr_reply = null;
					}					
					var item = $(result.msg).css({"display":"none"});
					if($('#report_item_'+reply_cid).children(".report_text").children("ul").length>0) {
						$('#report_item_'+reply_cid).children(".report_text").children("ul").prepend(item);
					}else {
						item = $('<ul>'+result.msg+'</ul>').css({"display":"none"});
						$('#report_item_'+reply_cid).children(".report_text").after(item);
					}					
					item.slideDown("slow");
				}
				else
				{
					alert(result.error);
				}
				is_run = false;
			}
		});
	}
	
	//评论分页
	$.Todo_Page = function(_page, _pageSize)
	{
		var parent = $('.report_list');
		var query = {type:SK_comments.type, ex_id:SK_comments.ex_id, page:_page, size:_pageSize};

		$.ajax({
			url: SITE_PATH+"/space/comment?callback=?",
			data:query,
			cache:false,
			type: "POST",
			dataType: "jsonp",
			success: function(result){
				if(result.code > 0) {
					$('.report_list').html('');
					$('.report_list').append($(result.html));
				    parent.show();
					
				    if(result.pages != '') {
				    	$('.report_list').append(result.pages);
				    }				    
				}else {
					alert(result.error);
				}
			}
		});
	}
	
	$.showReportFace = function(element,tip){
		var pos = element.offset();
		tip.css({
			top:pos.top + element.height()+10,
			left:pos.left - tip.width() + element.width()*2
		}).fadeIn();
	}

	/*=====================评论END  =====================*/
	
})(jQuery);

$(document).ready(function() {
	$.init_comment();
    $.Get_Comment_List($('.report_list'),1,10);
    
    /*=====================评论BEGIN=====================*/
	$('.b_report_text textarea').on("focus", function(){
		if(SK_UID <= 0) {
			$.Login_layer();
		}else {
			if ($('.block_report textarea').val() == '在这里输入评论内容，140字以内') {
				$('.block_report textarea').val('');
			}
		}
	});
	
	//点击评论
	$('.b_report_btn').on("click", function() {
		if(!is_run) {
			$.Add_Comment($('.report_list'));
		}else {
			alert("正在发布中....请稍等!");
		}		
	});
	
	//点击评论
	$('.report_list').on("click",'.reply_comments', function() {
		if(!$.Check_Login()) {
			$.Login_layer();
		}else {
			if(curr_reply != null) {
				curr_reply.remove();			
			}
			var value = $(this).data("value");
			var reply_value = eval("("+value+")");
			var node = $('<div class="report_input"><input type="text" value="评论 @'+reply_value.username+' " /><span class="reply_submit" data-value="'+value+'">提交</span></div>');
			$(this).parent().parent().children('.report_text').children('.report_info').after(node);
			
			var t = node.children('input').val();
			node.children('input').val("").focus().val(t);
			curr_reply = node;	
		}			
	})
	
	//提交评论
	$('.report_list').on("click",'.reply_submit', function() {
		if(curr_reply != null) {
			var reply_content = curr_reply.children('input').val();
			var submit_val = eval("("+$(this).data("value")+")");
			var reply_post = "评论 @"+submit_val.username;
			reply_content = reply_content.replace(reply_post, "");
			if(reply_content == " " || reply_content == "") {
				alert("评论的内容不能为空！");
			}else {
				reply_content = " "+ reply_content;				
				if(!is_run) {
					$.Reply_Comment(reply_content, submit_val.c_id, submit_val.uid);	
				}else {
					alert("正在提交中...请稍后！");
				}							
			}			
		}else {
			alert("系统异常！");
		}	
	})
	
	//点击表情
	$('#report_face ul').on("click", 'li', function(element) {
		textarea = $('.block_report textarea').val();
		if(textarea == "在这里输入评论内容，140字以内") {
			textarea = "";
		}
		textarea = textarea+$(this).data('text');
		$('.block_report textarea').val(textarea);
		$(this).parent().parent().parent().fadeOut();
	});
	
});
