if(typeof console === 'undefined'){
	console = { 
		log : function(){}
	};
}
/*
 * 功能	：cookie设置读取、修改、删除。
 *		
 * 函数名	：$.cookie(name, value, options)
 * 
 * 参数	：name 读取，修改，或删除的cookie名。
 *		：value 要修改的cookie值，为null时为删除当前cookie。
 *		：options 扩展选项{expires: 7, path:'/', domain: 'saiku.com.cn'} 有效期(天) 路径 域名。
 */
(function(){
	window.Cookie = {
		read:function(name){
			var value = document.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)');
			return (value) ? decodeURIComponent(value[1]) : null;
		},
		write:function(value){
			var str = value.name + '=' + encodeURIComponent(value.value);
				if(value.domain){ str += '; domain=' + value.domain;}
				if(value.path){ str += '; path=' + value.path;}
				if(value.day){
					var time = new Date();
					time.setTime(time.getTime()+value.day*24*60*60*1000);
					str += '; expires=' + time.toGMTString();
				}
			document.cookie = str;
			return;
		},
		dispose:function(name){
			var str = this.read(name);
			this.write({name:name,value:str,day:-1});
			return;
		}
	};
	jQuery.cookie = function(name, value, options){
		if (typeof value != 'undefined') {
			if(value === null){
				return Cookie.dispose(name);
			}else{
				options = options || {};
				options.name = name;
				options.value = value;
				return Cookie.write(options);
			}
		} else {
			return Cookie.read(name);
		}
	}
})();
/*
 * 功能：页面常用变量缓存容量，提升JQ性能。
 */
window['$G'] = {
    'win': $(window),
    'doc': $(document),
    'ie6': !window.XMLHttpRequest && window.ActiveXObject,
	'webkit' : navigator.userAgent.toLowerCase().match(/webkit/),
	'cookie' : function(){return $.cookie('FAN_MEMBERS')},
	'userinfo' :function(){return this.cookie() ? $.parseJSON(decodeURIComponent(this.cookie())) : null}
};
/*
 * 功能	：模板引擎，可执行代码分别用"<@" "@>"开头结尾，变量值分别用"<$" "$>"开头结尾，变量data[key]，[key]与传进的JSON的[key]对应。可执行代码引用变量时不需要使用"<$" "$>"开头结尾，直接data[key]。
 *		
 * 函数名	：$.Template(template, json, err) => Number
 *
 * 参数	：template [必选] 仅字符串模板。
 * 		：json [必选] json数据，为空时返回当前模板。
 * 		：err [可选] Boolean 为真时，console当前执行代码。报错时打印错误信息。
 */
(function() {
    var cache = {};
    function tmpl(template) {
        cache[template] = ("if(1){@>" + template + "<@}").replace(/\s+</g, "<").replace(/'/g, "\\'").replace(/<@/g, "';").replace(/@>/g, "html+='").replace(/<\$/g, "';html+=").replace(/\$>/g, ";html+='");
    };
    function Template(template, data, err) {
        var html = "";
        try {
            if (!data) return template;
            if (!cache[template]) tmpl(template);
            eval(cache[template]);
            if (err) console.log(cache[template]);
            return html;
        } catch(e) {
            if (err) console.log(e)
        }
    };
    jQuery.Template = Template;
})();



(function(){
	var isWin =  null, isOpen = null, win, winBg, iframe, htmlCon, getCon, closeBtn, winHeight, winWidth, fn = null, $body, temp;
	function init(){
		isWin = true;
		$body = $('body');
		winBg = $('<div class="WINBG"><iframe src="about:blank"></iframe><div></div></div>');
		win = $('<div class="WIN"><div class="WINCLOSE"></div><div class="WINCON"></div><iframe id="common_login" src="about:blank"></iframe></div>');
		$body.append(winBg);
		$body.append(win);		
		iframe = win.find('iframe:first'); 
		htmlCon = iframe.prev();
		htmlCon.prev().click(close);
		$G.win.resize(resize);
		if($G.ie6) $G.win.scroll(resize);
	}
	function open(txt, closeCallback){
		if(!isWin) init();
		isOpen = true;
		temp = null;
		if(typeof(txt)=="object"||$.trim(txt).match(/\</)){
			temp = $('<div style="position:absolute;top:-10000px"></div>').append(txt);
			$body.append(temp);
			winHeight = temp.height();
			winWidth = temp.width();
			htmlCon.show().html('').append(temp.removeAttr('style'));
			iframe.css({'display':'none'})
		}else{
			iframe.attr('src', txt).css('display', 'block');
			htmlCon.hide();
		}
		fn = closeCallback ? closeCallback : null;
		resize();
		return temp;
	}
	
	function resize(width, height){
		if(!isOpen) return;
		if(height){
			winHeight = height || winHeight;
			winWidth = width || winWidth;
		}
		var left = ($G.win.width() - winWidth)/2, top = ($G.win.height() - winHeight)/2;
		winBg.show(0,function(){
			winBg.css({
				opacity : 0.8,
				'height' : $G.ie6 ?  $('body').height() : '',
				display :'block'
			});
			win.css({
				'top' : $G.ie6 ? top + $G.win.scrollTop() : top,
				'left' : left,
				'width' : winWidth,
				'height' : winHeight
			})
		});
	}
	function close(){
		isOpen = null;
		win.removeAttr('style');
		winBg.css({'opacity':0,'display':'none'});
		fn && fn();
	}
	window['win'] = {
		'open' : open,
		'resize' : resize,
		'close' : close
	};
	function layer(txt, options, callback){
		if(txt){
			if(callback){
				open(txt, callback);
				options.width && options.height && resize(options.width,options.height);
			}else if(options){
				if(typeof(options)=='function'){
					open(txt, options);
				}else if(typeof(options)=='object'){
					open(txt);
					options.width&&options.height&&resize(options.width,options.height);
				}
			}else if(typeof(txt)!='string'&&typeof(txt)!='function'&&typeof(txt.height)!='function'){
				resize(txt.width,txt.height);
			}else{
				open(txt);	
			}
			return temp;
		}else{
			isOpen && close();
		}
	};
	(!jQuery.layer)&&(jQuery.layer = layer);
})();

(function(){
	function alertMsg(html,selector,callback){
		if(typeof(callback==="function")&&selector&&html){
			$.layer(html).delegate(selector, 'click', function(event) {
				event.preventDefault();
				if($(this).data('action')=="confirm"){
					$.layer();
					callback();
				}
			});
		}
	}
	(!jQuery.alertMsg)&&(jQuery.alertMsg = alertMsg);
})();



!function(){
	function downMenu(element,down,callback){
		if(down){
			var menu = $("#pub-downmenu"), isshow = false, fn = null;
			if(typeof(down)=="function"){
				callback = down;
			}else{
				menu = down;
			}
			menu.delegate('li', 'click', function(event) {
				var _this = $(this);
				hide();
				element.html(_this.html());
				callback&&callback(_this);
			}).hover(clear,timer);

			element.click(function(event) {
				isshow = true;
				var pos = element.offset();
				menu.css({
					display: 'block',
					left: pos.left,
					top : pos.top + element.innerHeight(),
					width: element.innerWidth()
				});
				$(this).addClass("on")
			}).hover(clear,timer);
		}
		function clear(){
			clearTimeout(fn);
			fn = null;
		}
		function timer(){
			if(isshow){
				fn = setTimeout(hide,500)
			}
		}
		function hide(){
			menu.hide();
			isshow = false;
			element.removeClass("on");
		}
	}
	(!jQuery.downMenu)&&(jQuery.downMenu=downMenu);
}();

!function(){
	function setValue(element){
		element
		.focusin(function(){
			(!element.val() || element.val() == element.attr('initValue')) && element.val('').removeClass("cGray")
		})
		.focusout(function(){
			!element.val() && element.val(element.attr('initValue')).addClass("cGray")
		});
		(element.val() != element.attr('initValue')) && element.removeClass("cGray");
	}
	(!jQuery.setValue)&&(jQuery.setValue=setValue);
}();


$(function(){
	if($G.noGetTop) return;
	var element = $('<div class="pub-getTop"><a href="javascript:;" title="返回顶部"></a></div>'), oDiv = element.find('a'), winHeight, winWidth, fn = null;
	$('body').append(element);
	function check(){
		$G.ie6&&element.hide();
		clearTimeout(fn);
		fn = null;
		fn = setTimeout(function(){
			var scroTop = $G.doc.scrollTop();
			if($G.ie6){
				element.show().animate({'top' : scroTop + winHeight - element.height()},200);
			}
			scroTop>winHeight*0.5 ? oDiv.fadeIn() : oDiv.fadeOut();
		},300);
	}
	function rest(){
		winHeight = $G.win.height();
		winWidth = $G.win.width();
		element.css({'left': winWidth - 46})
		check();
	}
	rest();
	oDiv.click(function(){$G.doc.scrollTop(0)});
	$G.win.scroll(check).resize(rest);
});