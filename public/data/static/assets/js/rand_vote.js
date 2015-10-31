function videoplay(vid) {
    return videohtml = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="380" height="300" id="cc_'+vid+'">'
                     +'<param name="movie" value="http://p.bokecc.com/flash/single/'+user_id+'_'+vid+'_false_'+playerid+'_1/player.swf" />'
                     +'<param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" />'
                     +'<param name="autostart" value="true" />'
                     +'<embed src="http://p.bokecc.com/flash/single/'+user_id+'_'+vid+'_false_'+playerid+'_1/player.swf" width="380" height="300" name="cc_'+vid+'"  allowFullScreen="true" allowScriptAccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"/>';
                      
 }
 
(function(){
    $("#option").delegate("input","click",function(){
        $(this).attr("id") == 'c1'?$('#rightdl').removeClass('on').prev().addClass('on'):$('#rightdl').addClass('on').prev().removeClass('on');
    });
    //$.layer('/video/videoplay/<?php echo $works[1]['vid']?>',{width:840, height:530})
    $("#videoplay1").delegate("object","click",function(){
       //$("#cc_<?php echo $works[1]['vid']?>").stop();
    });
    $("#videoplay2").delegate("object","click",function(){
        //$("#cc_<?php echo $works[0]['vid']?>").stop();
    });
    
    //$('#videoplay1').html(videoplay(vid_0));
    //$('#videoplay2').html(videoplay(vid_1)); 
})();       


var voteok = false;
var time = 0;

function reImg(){  
	$('#rand_img_url').attr('src', "http://www.saiku.com.cn/space/member/getnumcapcode?rnd=" + Math.random());
}  

var rand_vote = function() {
	if(SK_UID <= 0) {
        $.layer('/api/member/common_login',{width:765, height:350});
    }else {
        var id = $('input:radio[name="vote"]:checked').val();
        if(id != null)
        {
                $("#videobtntime").addClass('on');
                //$('#videobtntime').removeClass('on');
                if(!voteok)
                {
                	var checkcode = $('input[name="rand_check"]').val();
                    $.get("/vote/video_ticket/"+id+"/1/"+cate_id+"?checkcode="+checkcode,function(data,status){
                        var parsedJson = jQuery.parseJSON(data);                         
                        
                        if(status == 'success')
                        {
                            if(parseInt(parsedJson.status) == 1)
                            {
                            	$.layer();
                                voteok = true;
                                var next_url = parsedJson.next_url;
                                if(next_url == "") {
                                	next_url = "http://www.saiku.com.cn/rand_home";
                                }
                                var msgtmp1 = '<dl class="pub-confirm">';
                                msgtmp1 += '<dt>';
                                msgtmp1 += '<strong class="f16px cOrange fY">投票成功！</strong>';
                                msgtmp1 += '</dt>';
                                msgtmp1 += '<dd><a href="javascript:;" onclick="$.layer();">关闭</a><a href="'+next_url+'">换俩继续投票</a></dd>';
                                msgtmp1 += '</dl>';
                                
                                $.layer(msgtmp1);
                            }
                            else if(parseInt(parsedJson.status) == -1)
                            {
                            	$.layer();
                                voteok = false;
                                $('#videobtntime').removeClass('on');
                                $.layer($('#msgtmp_3').html());
                            }
                            else if(parseInt(parsedJson.status) == -2)
                            {
                            	$.layer();
                                voteok = false;
                                $('#videobtntime').removeClass('on');
                                $.layer($('#msgtmp_4').html());
                            }
                            else if(parseInt(parsedJson.status) == -13)
                            {
                            	$.layer();
                                voteok = false;                                                    
                                $.layer($('#msgtmp_5').html());
                            }
                            else if(parseInt(parsedJson.status) == -14)
                            {
                                voteok = false;     
                                reImg();
                                $('input[name="rand_check"]').val('验证码错误!');
                            }
                        }
                    });
                }
        }
        else
        {
             $.layer($('#msgtmp2').html());
        }
    }
};

function show_checkcode() {
	if(SK_UID<=0 || SK_UID == "") {
		$.layer('http://www.saiku.com.cn/api/member/common_login?r='+Date.parse(new Date()),{width:765, height:350});
	}else {
		var caPtcha = $.layer($('#caPtcha').html());
		caPtcha;
	}	
}

function fresh(element,callback, id_0, id_1){
	if(!element) return;
	var fn = null, tmpl = element.innerHTML;
	time = element.getAttribute('time')*1;
	
	function timer(){
		time-- ;         
		if(time<0){
			$("#c1").attr("date-val",Math.floor(Math.random()*5+3)).val(id_0);
	        $("#c2").attr("date-type",Math.floor(Math.random()*5+3)).val(id_1);
	        
			callback&&callback();
			clearInterval(fn);
		}else{
			var d = parseInt(time/3600/24) , h = parseInt((time/3600)%24) , m = parseInt((time/60)%60), s = parseInt(time%60);
			m = m < 10 ? ( "0" + m ) : m;
			h = h < 10 ? ( "0" + h ) : h;
			s = s < 10 ? ( "0" + s ) : s;
			element.innerHTML = tmpl.replace('&lt;$d$&gt;',d).replace('&lt;$h$&gt;',h).replace('&lt;$m$&gt;',m).replace('&lt;$s$&gt;',s);
		}
	}
	fn = setInterval(timer,1000);
	return timer();
}


$(".videobtn").delegate("span","click",function(){  
    if(time<=0) {
    	show_checkcode();
    }                      	
}); 

if(SK_UID>0) {
	var vote_html = '<span class="cWhite f14px fY" id="videobtntime">我要投票<i id="time"  time="10">倒计时<$m$>:<$s$></i></span>';
	vote_html += '	<b>';
	vote_html += '<em id="ts">倒计时结束马上投票哦！</em>';
	vote_html += '<strong>◆</strong>';
	vote_html += '<i>◆</i>';
	vote_html += '</b>';

	$('.videobtn').html(vote_html);
	
	//初始化投票视频
	$.ajax({
		url: "/rand/video_prom_json/1?callback=?",
		dataType:"jsonp",
		success: function(res){
		      if(res.code>0) { 		
		    	var l_title = res.works[0].title;
	            var r_title = res.works[1].title;
              	var l_vote = parseInt(res.works[0].d_vote) + parseInt(res.works[0].r_vote);
              	var r_vote = parseInt(res.works[1].d_vote) + parseInt(res.works[1].r_vote);
              	var l_tag = res.works[0].tag ;
              	var r_tag = res.works[1].tag;
              	var l_description = res.works[0].description;
              	var r_description = res.works[1].description;
              	
              	$('#l_title').html(l_title);
              	$('#r_title').html(r_title);
              	
              	$('#l_vote').html(l_vote);
              	$('#r_vote').html(r_vote);
              	$('#l_tag').html(l_tag);
              	$('#r_tag').html(r_tag);
              	$('#l_desc').html(l_description);
              	$('#r_desc').html(r_description);
              	
              	$('#videoplay1').html(videoplay(res.works[0].vid));
                $('#videoplay2').html(videoplay(res.works[1].vid));
                  
                  
                 vid_0 = res.works[0].vid;
                 vid_1 = res.works[1].vid;
                 id_0 = res.works[0].id;
                 id_1 = res.works[1].id;
                 
             	fresh(document.getElementById('time'),function(){
            	    $("#ts").html("投票开始了！");
            	    //投票
            	    show_checkcode();                    
            	}, id_0, id_1);
		      }else {
		    	  var tanc = $.layer(res.error);
		      }			    
		}
   });
	

}else {
	$('#videoplay1').html(videoplay(vid_0));
    $('#videoplay2').html(videoplay(vid_1)); 
	
	$('.videobtn').html('<span class="cWhite f14px fY" id="videobtntime">我要投票</span>');
}