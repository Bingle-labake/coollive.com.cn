var ws = {};
var client_id = 0;
var userlist = {};
var GET = getRequest();

$(document).ready(function () {
    if (window.WebSocket || window.MozWebSocket) {
        ws = new WebSocket(webtest.server);
        listenEvent();
    } else {
        WEB_SOCKET_SWF_LOCATION = "/static/flash-websocket/WebSocketMain.swf";
        $.getScript("/static/flash-websocket/swfobject.js", function(){
            $.getScript("/static/flash-websocket/web_socket.js", function(){
                ws = new WebSocket(webtest.server);
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
    	/*
        msg = new Object();
        msg.cmd = 'login';
        msg.name = "bingle";
        msg.avatar = "http://www.baidu.com/";
        ws.send($.toJSON(msg));
        */
    	//ws.send("hello, world!");
    };

    //有消息到来时触发
    ws.onmessage = function (e) {
    	alert(e.data);
    	/*
        var message = $.evalJSON(e.data);
        var cmd = message.cmd;
        if (cmd == 'login')
        {
            client_id = $.evalJSON(e.data).fd;
            //获取在线列表
            ws.send($.toJSON({cmd : 'getOnline'}));
            //获取历史记录
            ws.send($.toJSON({cmd : 'getHistory'}));
            //alert( "收到消息了:"+e.data );
        }
        else if (cmd == 'getOnline')
        {
            showOnlineList(message);
        }
        else if (cmd == 'getHistory')
        {
            showHistory(message);
        }
        else if (cmd == 'newUser')
        {
            showNewUser(message);
        }
        else if (cmd == 'fromMsg')
        {
            showNewMsg(message);
        }
        else if (cmd == 'offline')
        {
            var cid = message.fd;
            delUser(cid);
            showNewMsg(message);
        }
        */
    };

    /**
     * 连接关闭事件
     */
    ws.onclose = function (e) {
        if (confirm("聊天服务器已关闭")) {
            //alert('您已退出聊天室');
            //location.href = 'http://i.saiku.com.cn/login';
        }
    };

    /**
     * 异常事件
     */
    ws.onerror = function (e) {
        
        var s = "";  
        for (var property in e) {  
         s = s + "\n "+property +": " + e[property] ;  
        }  
        alert("异常:" + s);
        console.log("onerror");
    };
}

document.onkeydown = function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        sendMsg();
    }
}


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

function sendMsg() {
    var content = $('#msg_content').val();
    var msg = {};
    content = content.replace(" ", "&nbsp;");
    if (!content) {
        return false;
    }

    /*
    if ($('#userlist').val() == 0) {
        msg.cmd = 'message';
        msg.from = client_id;
        msg.channal = 0;
        msg.data = content;
        ws.send($.toJSON(msg));
    }
    else {
        msg.cmd = 'message';
        msg.from = client_id;
        msg.to = $('#userlist').val();
        msg.channal = 1;
        msg.data = content;
        ws.send($.toJSON(msg));
    }    
    showNewMsg(msg);
    */
    
    ws.send(content);
    $('#msg_content').val("");
    return true;
}


$(document).ready(function () {
    
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