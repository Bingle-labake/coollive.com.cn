var ws = {};
var client_id = 0;
var userlist = {};
var GET = getRequest();

var uid = SK_UID;
var rid = GET['rid'];
var username = SK_USER_NAME;
var sk_avatar = 'http://demo.i.saiku.com.cn/space/upload/avatar?uid='+uid;

rid = parseInt(rid);
if(rid <= 0 || isNaN(rid)) {
	rid = 100;
}

$(document).ready(function () {
    if (window.WebSocket || window.MozWebSocket) {
        ws = new WebSocket(webim.server);
        listenEvent();
    } else {
        WEB_SOCKET_SWF_LOCATION = "/im/static/flash-websocket/WebSocketMain.swf";
        $.getScript("/im/static/flash-websocket/swfobject.js", function(){
            $.getScript("/im/static/flash-websocket/web_socket.js", function(){
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
    	//必须的输入一个名称和一个图像才可以聊天
    	if(uid >0 && rid > 0 && username != undefined) {
    		//发送登录信息
        	msg = new Object();
            msg.cmd = 'joinRooms';
            msg.uid = uid;
            msg.rid = rid;
            msg.name = username;
            msg.avatar = sk_avatar;
            ws.send($.toJSON(msg)); 
            
            console.log("send: "+$.toJSON(msg));
    	}else {
    		$.layer('http://demo.i.saiku.com.cn/api/member/common_login?backurl='+location.href+'&r='+Date.parse(new Date()),{width:765, height:350});  
            ws.close();
            return false;
    	}

        
    };

    //有消息到来时触发
    ws.onmessage = function (e) {
    	console.log("onmessage:"+e.data);
    	
        var message = $.evalJSON(e.data);
        var cmd = message.cmd;
        if (cmd == 'joinRooms')
        {
            client_id = $.evalJSON(e.data).fd;

            ws.send($.toJSON({cmd : 'getRoomsOnline', rid:rid}));
            console.log("send: {cmd:'getRoomsOnline', rid:"+rid+"}");
            
            ws.send($.toJSON({cmd : 'getRoomsHistory', rid:rid}));
            console.log("send: {cmd:'getRoomsHistory, rid:"+rid+"'}");
        }
        else if (cmd == 'getRoomsOnline') {
            showOnlineList(message);
        }
        else if (cmd == 'getRoomsHistory') {
            showHistory(message);
        }
        else if (cmd == 'newUser') {
            showNewUser(message);
        }
        else if (cmd == 'fromMsg') {
            showNewMsg(message);
        }
        else if (cmd == 'offline') {
            var cid = message.fd;
            delUser(cid);
            showNewMsg(message);
            
        }else if(cmd == 'pk_success') {//广播
        	var msg = message.data;
        	
        	var item = $('#boastcast_msg').css({"display":"none"});
        	item.html("广播:"+msg);
			item.slideDown("slow");        	
        }else if(cmd == 'error') {
        	console.log("error : code["+message.code+"], msg:"+message.msg);
        }
    };

    /**
     * 连接关闭事件
     */
    ws.onclose = function (e) {
        if (confirm("聊天服务器已关闭")) {
        	console.log("聊天服务器已关闭");
        }
    };

    /**
     * 异常事件
     */
    ws.onerror = function (e) {
        console.log("异常:" + e.data);
    };
}

document.onkeydown = function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        sendMsg();
    }
}

function selectUser(userid) {
    $('#userlist').val(userid);
}

/**
 * 显示所有在线列表
 * @param dataObj
 */
function showOnlineList(dataObj) {
    var li = '';
    var option = "<option value='0' id='user_all' >所有人</option>";

    for (var i = 0; i < dataObj.list.length; i++) {
        li = li + "<li id='inroom_" + dataObj.list[i].fd + "'>" +
            "<a href='javascript:selectUser("
            + dataObj.list[i].fd + ")'>" + "<img src='http://demo.i.saiku.com.cn/space/upload/avatar?uid=" + dataObj.list[i].uid
            + "' width='50' height='50'></a></li>"

        userlist[dataObj.list[i].fd] = dataObj.list[i].name;

        if (dataObj.list[i].fd != client_id) {
            option = option + "<option value='" + dataObj.list[i].fd + "' id='user_" + dataObj.list[i].fd + "'>"
                + dataObj.list[i].name + "</option>"
        }
    }
    $('#left-userlist').html(li);
    $('#userlist').html(option);
}

/**
 * 显示所有在线列表
 * @param dataObj
 */
function showHistory(dataObj) {    
	console.dir(dataObj);
    for (var i = 0; i < dataObj.history.length; i++) {
    	var msg = {};
    	var obj = $.evalJSON(dataObj.history[i]);
        msg = obj.msg;
    	if (!msg) continue;    	
    	msg.time = obj.time;
    	msg.user = obj.user; 
        
        showNewMsg(msg);
    }
}

/**
 * 当有一个新用户连接上来时
 * @param dataObj
 */
function showNewUser(dataObj) {
    if (!userlist[dataObj.fd]) {
        userlist[dataObj.fd] = dataObj.name;
        if (dataObj.fd != client_id) {
            $('#userlist').append("<option value='" + dataObj.fd + "' id='user_" + dataObj.fd + "'>" + dataObj.name + "</option>");

        }
        $('#left-userlist').append(
            "<li id='inroom_" + dataObj.fd + "'>" +
                "<a href='javascript:selectUser("
                + dataObj.fd + ")'>" + "<img src='" + dataObj.avatar
                + "' width='50' height='50'></a></li>");

    }
}

/**
 * 显示新消息
 */
function showNewMsg(dataObj) {
    var content = xssFilter(dataObj.data)
    var fromId = dataObj.from;
    var room_id = dataObj.rid;
    
    content = parseXss(content);
    var said = '';
    var time_str;

    if (dataObj.time) {
        time_str = GetDateT(dataObj.time)
    } else {
        time_str = GetDateT()
    }

    $("#msg-template .msg-time").html(time_str);
    if (fromId == 0) {
        $("#msg-template .userpic").html("");
        $("#msg-template .content").html(
            "<span style='color: green'>【系统消息】</span>" + content);
    }
    else {
        var html = '';
        var to = dataObj.to;

        if (client_id == fromId) {
            if (to <= 0) {
                said = '我对大家说:';
            }
            else {
            	if(typeof(userlist[to]) == "undefined") {
            		said = "我悄悄的对" + dataObj.user.name + "说:";
            	}else {
            		said = "我悄悄的对" + userlist[to] + "说:";
            	}                
            }
            html += '<span style="color: orange">' + said + ' </span> ';
        }
        else {
        	if (to <= 0) {
                said = '对大家说:';
            }
            else {
                said = "悄悄的对我说:";
            }

        	if(typeof(userlist[fromId]) == "undefined") {
        		html += '<span style="color: orange"><a href="javascript:selectUser('
                    + fromId + ')">' + dataObj.user.name + said;
        	}else {
        		html += '<span style="color: orange"><a href="javascript:selectUser('
                    + fromId + ')">' + userlist[fromId] + said;
        	}           
            
            html += '</a></span> '
        }
        html += content + '</span>';
        $("#msg-template .content").html(html);
    }
    $("#chat-messages").append($("#msg-template").html());
    $('#chat-messages')[0].scrollTop = 1000000;

}

function xssFilter(val) {
    val = val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\x22/g, '&quot;').replace(/\x27/g, '&#39;');
    return val;
}

function parseXss(val) {
    val = val.replace(/#(\d*)/g, '<img src="/im/static/img/face/$1.gif" />');
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

function selectUser(userid) {
    $('#userlist').val(userid);
}

function delUser(userid) {
    $('#user_' + userid).remove();
    $('#inroom_' + userid).remove();
    delete (userlist[userid]);

}

function sendMsg() {
    var content = $('#msg_content').val();
    var msg = {};
    content = content.replace(" ", "&nbsp;");
    if (!content) {
        return false;
    }

    var to_client_id = $('#userlist').val();
    if (to_client_id == 0) {
        msg.cmd = 'message';
        msg.from = client_id; 
        
        msg.to = 0;
        msg.uid = uid;
        msg.rid = rid;  
        
        msg.data = content;
        ws.send($.toJSON(msg));
    }
    else {
        msg.cmd = 'message';
        msg.from = client_id;
        
        msg.to = to_client_id;
        msg.uid = uid;
        msg.rid = rid; 
        
        msg.data = content;
        ws.send($.toJSON(msg));
    }
    showNewMsg(msg);
    $('#msg_content').val("");
    return true;
}


$(document).ready(function () {
    var a = '';
    for (var i = 1; i < 20; i++) {
        a = a + '<a class="face" href="#" onclick="selectFace(' + i + ');return false;"><img src="/im/static/img/face/' + i + '.gif" /></a>';
    }
    $("#show_face").html(a);
});

(function ($) {
    $.fn.extend({
        insertAtCaret: function (myValue) {
            var $t = $(this)[0];
            if (document.selection) {
                this.focus();
                sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
            }
            else if ($t.selectionStart || $t.selectionStart == '0') {

                var startPos = $t.selectionStart;
                var endPos = $t.selectionEnd;
                var scrollTop = $t.scrollTop;
                $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
                this.focus();
                $t.selectionStart = startPos + myValue.length;
                $t.selectionEnd = startPos + myValue.length;
                $t.scrollTop = scrollTop;
            }
            else {

                this.value += myValue;
                this.focus();
            }
        }
    })
})(jQuery);


function selectFace(id) {
    var img = '<img src="/im/static/img/face/' + id + '.gif" />';
    $("#msg_content").insertAtCaret("#" + id);
    closeChatFace();
}


function showChatFace() {
    $("#chat_face").attr("class", "chat_face chat_face_hover");
    $("#show_face").attr("class", "show_face show_face_hovers");
}

function closeChatFace() {
    $("#chat_face").attr("class", "chat_face");
    $("#show_face").attr("class", "show_face");
}

function toggleFace() {
    $("#chat_face").toggleClass("chat_face_hover");
    $("#show_face").toggleClass("show_face_hovers");
}
