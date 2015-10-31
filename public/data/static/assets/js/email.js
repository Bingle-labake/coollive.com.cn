var emailList = ['@163.com','@qq.com','@126.com','@hotmail.com','@gmail.com','@sohu.com','@yahoo.com','@sina.com','@msn.com','@live.com','@live.cn'];
$suggestList = $('#email-suggest-list');
$suggestList.width($("#passport").outerWidth() - parseInt($suggestList.css('padding-left')) - parseInt($suggestList.css('padding-right')) -2);
$suggestList.css({'left':$("#passport").offset().left,'top':$("#passport").offset().top + $("#passport").outerHeight()});;	
$(document).bind('click',function(){
	$suggestList.hide();
});

function show_email_suggest(value){
	if(value == '' || value == '昵称/邮箱'){
		$("#email-suggest-list").css("display","none");
	}else{
		var index = value.indexOf("@");
		var afterText = "@";
		if(index != -1){
			beforeText = value.substring(0,index);
			afterText = value.substring(index);
			value = beforeText;
		}
		$("#email-suggest-list").html('');
		$.each(emailList,function(i,mail){
			if(index!=-1){
				if(mail.indexOf(afterText) != -1){
					obj = $('<li data-info=' + mail+'>');
					obj.append($('<a href="javascript:void(0)" />').html(mail)).appendTo($suggestList);
				 }
			}else{
				obj = $('<li data-info=' + mail+'>');
				obj.append($('<a href="javascript:void(0)" />').html(mail)).appendTo($suggestList);
			}
			
		});	
		$('.email-suggest-list li').each(function(i,mail){
			$(this).children('a').click(function() {
				$("#passport").val($(this).html());
				$("#email-suggest-list").css("display","none");
			});
		});
		$('#email-suggest-list').css("display","block");
		$('#email-suggest-list li').each(function(i,mail){
			$(this).children('a').html(value+$(this).data("info"));
		});		
		$('#email-suggest-list li a:first').addClass("active");

	}
}