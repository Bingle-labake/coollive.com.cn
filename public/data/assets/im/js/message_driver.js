var webim = {
    //'server' : 'ws://58.68.243.243:9503'
    'server' : 'ws://58.68.243.232:9503'
}


var ws = {};
var client_id = 0;
var userlist = {};
var GET = getRequest();
var sk_name = "sk_" + Date.parse(new Date());
var sk_avatar = 'http://demo.i.saiku.com.cn/space/upload/avatar?uid=0';

$(document).ready(function () {
    if (window.WebSocket || window.MozWebSocket) {
        ws = new WebSocket(webim.server);
        listenEvent();        
    } else {
        WEB_SOCKET_SWF_LOCATION = "/public/data/assets/im/flash-websocket/WebSocketMain.swf";
        $.getScript("/public/data/assets/im/flash-websocket/swfobject.js", function(){
            $.getScript("/public/data/assets/im/flash-websocket/web_socket.js", function(){
                ws = new WebSocket(webim.server);
                listenEvent();
            });
        });
    }
});

function listenEvent() {
    /**
     * 连接建立时触发
     */
    ws.onopen = function (e) {    	
        //发送登录信息
    	msg = new Object();
        msg.cmd = 'login';
        msg.name = sk_name;
        msg.avatar = sk_avatar;
        ws.send($.toJSON(msg));
    };

    //有消息到来时触发
    ws.onmessage = function (e) {
        var message = $.evalJSON(e.data);
        var cmd = message.cmd;
        if (cmd == 'login')
        {
            client_id = $.evalJSON(e.data).fd;   
            
        }else if(cmd == 'pk_success') {//广播
        	var msg = message.data;
        	var head_str = message.head;
            console.log(head_str+":"+msg);
        	
        	if(head_str != "" && gid != "") {
				var head = head_str.split("#");
				var msg_gid = parseInt(head[0]);
				var gid = $('#sLista_lead_bot').data("val");
				gid = parseInt(gid);
				
				switch(msg_gid) {
					case 9:					        
							if(gid == msg_gid) {
								var item = $('#sLista_lead_bot').css({"display":"none"});
								item.html(msg);
        			            item.slideDown("slow");
							}   
							break;
					case 10:					        
					        if(gid == msg_gid) {								
        		                var mov = $("#movListP");
							    var wid = parseInt(mov.data("val"));
								console.log("#######: head[2]:"+head[2]+" ,wid:"+wid);
							    if(parseInt(head[2]) == wid) {
								    mov.append(msg);
								    if(mov.find("li").length > 10) {
								    	mov.find("li").eq(0).remove();
								    }
						        }else if(parseInt(head[2]) == 0 && isNaN(wid)) {
									var item = $('#sLista_lead_bot');
								    item.html('<div class="sLista_bot">'+msg+'</div>');
        			                item.slideDown("slow");
							    } 
							}
							break;
					default:
					        var item = $('#sLista_lead_bot').css({"display":"none"}); 
        		            if(msg_gid == gid) {
        			            item.html(msg);
        			            item.slideDown("slow");
        		            }
                            else if(head[0] != '' && head[1] != '' && head[2] != ''){
                               $("#movListP").prepend(msg);
                            }
				}
        	}
            else {
            	var item = $('#sLista_lead_bot').css({"display":"none"});
        		item.html(msg);
    			item.slideDown("slow");
        	}
        }
    };

    /**
     * 连接关闭事件
     */
    ws.onclose = function (e) {
    	console.log("通信服务器已断开..."); 
    	/*
        if (confirm("聊天服务器已关闭")) {
            //alert('您已退出聊天室');        	            
        }
        */
    };

    /**
     * 异常事件
     */
    ws.onerror = function (e) {
    	console.log("异常:" + e.data); 
        console.log("onerror");
    };
}

$(window).unload( function () { if(SK_UID > 0) { ws.close();} } );

function xssFilter(val) {
    val = val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\x22/g, '&quot;').replace(/\x27/g, '&#39;');
    return val;
}

function parseXss(val) {
    val = val.replace(/#(\d*)/g, '<img src="/static/img/face/$1.gif" />');
    val = val.replace('&amp;', '&');
    return val;
}


function GetDateT(time_stamp) {
    var d;
    d = new Date();

    if (time_stamp) {
        d.setTime(time_stamp * 1000);
    }
    var h, i, s;
    h = d.getHours();
    i = d.getMinutes();
    s = d.getSeconds();

    h = ( h < 10 ) ? '0' + h : h;
    i = ( i < 10 ) ? '0' + i : i;
    s = ( s < 10 ) ? '0' + s : s;
    return h + ":" + i + ":" + s;
}

function getRequest() {
    var url = location.search; // 获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);

        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            var decodeParam = decodeURIComponent(strs[i]);
            var param = decodeParam.split("=");
            theRequest[param[0]] = param[1];
        }

    }
    return theRequest;
}