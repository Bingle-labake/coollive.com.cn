var SITE_PATH = "http://i.saiku.com.cn";
var is_run = false;

//评论
(function($){	
	$.get_letter_tpl = function(fuid, fusername) {
		var html = '<div class="siXin">';
		html += '<div class="siXintit cWhite"><h2 class="fl">';
		if(fusername != "") {
			html += '发私信给:'+fusername;
		}else {
			html += '发私信给:';
		}		
		html += '</h2><span class="win-close fr" onClick="$.layer()"></span></div>';
		if(fuid == '' || fuid<=0) {
			html += '<dl class="fgei">';
			html += '<dt>发给：</dt>';
			html += '	<dd><input type="text" name="siXin_username"/></dd>';
			html += '</dl>';
		}
		
		html += '<dl>';
		html += '<dt>私信内容：</dt>';
		html += '<dd><textarea name="siXin_text">最多输入300字</textarea><input type="hidden" name="siXin_fuid" value="'+fuid+'"/></dd>';
		html += '<dd class="cWhite" id="sAtxt"><span></span><input class="button" onclick="$.sixing_send()" type="button" value="发送">    <em class="cg cOrange f14px" style="display:none;">发送成功！</em>';
		html += '</dd>';
		html += '    </dl>';
		html += '</div>';
		
		return html;
	}
	
	$.sixing_display = function (fuid, fusername) {
		var html = $.get_letter_tpl(fuid, fusername);
		$.layer(html);
		$('textarea[name="siXin_text"]').focus(function(){
			  if($('textarea[name="siXin_text"]').val() == '最多输入300字') {
				  $('textarea[name="siXin_text"]').val('');
			  }
		});
		$('textarea[name="siXin_text"]').blur(function(){
			  if($('textarea[name="siXin_text"]').val() == '') {
				  $('textarea[name="siXin_text"]').val('最多输入300字');
			  }
		});
	}

	$.sixing_send = function() {
		if(SK_UID<=0)
			$.layer('/api/member/common_login',{width:765, height:350});

		var content   = $('textarea[name="siXin_text"]').val();
		var fuid      = $('input[name="siXin_fuid"]').val();
		var fusername = '';
		
		if(fuid == 0 || fuid == "" || fuid == null) {
			fusername = $('input[name="siXin_username"]').val();
		}	

		if(fuid == 0 && fusername == '') {
			alert("你发送的对象或昵称为空！");
			return false;
		}	

		if($.trim(content)=='' || $.trim(content)=='最多输入300字')
		{
			alert("私信的内容不能为空！");
			$('textarea[name="siXin_text"]').focus();
			return false;
		}
		var query = {fuid:fuid, fusername:fusername, content:content};
	    
		is_run = true;
		$.ajax({
			url: SITE_PATH+"/space/message/todo_letter",
			type: "POST",
			cache:false,
			data:query,
			dataType: "jsonp",
			success: function(result){
				if(result.code > 0) {
					var html = '<div style="width:148px;height:54px;line-height:54px;text-align:center;background:#fff;" class="cOrange f14px">发送成功！</div>';
					$.layer(html);
				    $(html).fadeIn();
					setTimeout(function(){$(html).fadeOut();$.layer();},3000);	
				}else{
					alert(result.error);
				}
				is_run = false;
			}
		});
	}
	
	$.letter_remove = function () {
		var m_id = $('input[name="m_id"]').val();
		$.sixing_remove(m_id);
	}

	$.sixing_remove = function (m_id) {
		if(SK_UID<=0)
			$.layer('/api/member/common_login',{width:765, height:350});

		var query = {m_id:m_id};    
		is_run = true;
		$.ajax({
			url: SITE_PATH+"/space/message/remove_letter",
			type: "POST",
			cache:false,
			data:query,
			dataType: "jsonp",
			success: function(result){
				if(result.code > 0) {	
					$('#msg_'+m_id).remove();	
					$('input[name="m_id"]').val(0);
					$('input[name="fuid"]').val(0);		
					$.layer();
				}else{
					$.layer(result.error);
				}
				is_run = false;
			}
		});
	}

	$.sixing_shield = function (fuid) {
		if(SK_UID<=0)
			$.layer('/api/member/common_login',{width:765, height:350});
		
		var query = {fuid:fuid};    
		is_run = true;
		$.ajax({
			url: SITE_PATH+"/space/message/shield_letter",
			type: "POST",
			cache:false,
			data:query,
			dataType: "jsonp",
			success: function(result){
				if(result.code > 0) {
					$('.sx_tip dd a').html('解除屏蔽');
					$('.sx_tip dd a').attr('data-val', 1);
					$('.sx_tip dd a').unbind().bind('click', function() {
						$.sixing_unshield(fuid, $('.sx_tip dd a'));
					});
					$('input[name="m_id"]').val(0);
					$('input[name="fuid"]').val(0);		
				}else{
					$.layer(result.error);
				}
				is_run = false;
			}
		});
	}
	
	$.sixing_unshield = function (fuid, element) {
		if(SK_UID<=0)
			$.layer('/api/member/common_login',{width:765, height:350});
		
		var query = {fuid:fuid};    
		is_run = true;
		$.ajax({
			url: SITE_PATH+"/space/message/unshield_letter",
			type: "POST",
			cache:false,
			data:query,
			dataType: "jsonp",
			success: function(result){
				if(result.code > 0) {	
					if(typeof(element.attr("href")) != "undefined") {
						$('.sx_tip dd a').html('屏蔽TA');
						$('.sx_tip dd a').attr('data-val', 0);
						$('.sx_tip dd a').unbind().bind('click', function() {
							$.sixing_shield(fuid, $('.sx_tip dd a'));
						});
					}else {
						element.remove();	
					}					
				}else{
					$.layer(result.error);
				}
				is_run = false;
			}
		});
	}
	
	//删除会话私信
	$.remove_session = function (fuid) {
		var ids = '';
		$('input[type="checkbox"]').each(function() {			
			var id = $(this).attr("data-val");
			if(typeof(id) != "undefined") {
				if($(this).prop("checked")) {
					$.remove_sixing_chat(fuid, id);
				}
			}
		})
	}
	
	$.remove_sixing_chat = function (fuid, id) {
		if(SK_UID<=0)
			$.layer('/api/member/common_login',{width:765, height:350});
		
		var query = {fuid:fuid, id:id};    
		$.ajax({
			url: SITE_PATH+"/space/message/remove_letter_chat",
			type: "POST",
			cache:false,
			data:query,
			dataType: "jsonp",
			success: function(result){
				if(result.code > 0) {				
					$('#msg_'+id).remove();	
					$.layer();
				}else{
					$.layer(result.error);
				}
			}
		});
	}
})(jQuery);

$(document).ready(function() {
	$('.sx_tip em').click(function() {
		is_run = true;
		$.ajax({
			url: SITE_PATH+"/space/message/clean_letter",
			type: "POST",
			cache:false,
			dataType: "jsonp",
			success: function(result){
				if(result.code > 0) {				
					$('.x_content').empty();
					$('.pub-page').empty();
				}else{
					$.layer(result.error);
				}
				is_run = false;
			}
		});
	}); 
	
	$('.sx_tip dt i').click(function() {
		$.sixing_display(0, '');
	}); 
	
	$.sxdownMenu($("#demoDel"),$("#Pinb_down"),function(element){
		if(element.data("val")==1){
			$.layer($("#pk_delel").html())
		}else{
			//屏蔽用户
			var fuid = $('input[name="fuid"]').val();
		    $.sixing_shield(fuid);
		}
	});
	
	$('.outt').click(function() {
		$('input[name="m_id"]').val($(this).data("m_id"));
		$('input[name="fuid"]').val($(this).data("fuid"));
	});
	
	$('.sx_tip dd a').click(function() {
		var fuid = $(this).attr("data-fuid");
		var val = $(this).attr("data-val");
		if(val == 1) {
			$.sixing_unshield(fuid, $('.sx_tip dd a'));
		}else {
			$.sixing_shield(fuid, $('.sx_tip dd a'));
		}
	});

});
