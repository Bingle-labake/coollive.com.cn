function moveHtml(json) {
	var tag = json.element.children(), width = tag.eq(0).width(), n = 0, fn = true, className = json.className||'on', cur = n, len = tag.length;

	var  once = Math.ceil(json.element.parent().width()/width), maxSize = len- once;

	var resizeFn = null;

	function move() {
		if(cur == n) return;
		fn = false;
		json.element.animate({
			"marginLeft": -(n * tag.eq(0).width())
		}, 1200,"easeOutBack", function() {
			checkBtn();
			fn = true;
			cur = n;
		});
	}
	function checkBtn(){
		n<=0? json.left.addClass(className):json.left.removeClass(className);
		n>= maxSize?json.right.addClass(className):	json.right.removeClass(className);
	}
	function add(s) {
		if(fn){
			s ? n+=once : n-=once;
			0 > n && (n = 0);
			n > maxSize && (n = maxSize)
			move(n);
		}
	};
	json.right.click(function(event) {
		event.preventDefault();
		add(1);
	});
	json.left.click(function(event) {
		event.preventDefault();
		add();
	});

	$G.win.resize(function(){
		clearTimeout(resizeFn);
		resizeFn = null;
		resizeFn = setTimeout(function(){
			json.element.css({
				"marginLeft": -(n * tag.eq(0).width())
			});
		});
	});
	return checkBtn();
}


function moveHtmlUp(json) {
	var tag = json.element.children(), height = tag.eq(0).outerHeight(true), n = 0, fn = true, className = json.className||'on', cur = n, len = tag.length;

	var  once = Math.ceil(json.element.parent().height()/height), maxSize = len- once;

	var resizeFn = null;

	function move() {
		if(cur == n) return;
		fn = false;
		json.element.animate({
			"marginTop": -(n * height)
		}, 1200,"easeOutBack", function() {
			checkBtn();
			fn = true;
			cur = n;
		});
	}
	function checkBtn(){
		n<=0? json.left.addClass(className):json.left.removeClass(className);
		n>= maxSize?json.right.addClass(className):	json.right.removeClass(className);
	}
	function add(s) {
		if(fn){
			s ? n+=once : n-=once;
			0 > n && (n = 0);
			n > maxSize && (n = maxSize)
			move(n);
		}
	};
	json.right.click(function(event) {
		event.preventDefault();
		add(1);
	});
	json.left.click(function(event) {
		event.preventDefault();
		add();
	});
	return checkBtn();
}


function moveHtml2(json){
	var tag = json.element.children(), 
		width = -tag.eq(0).width(), 
		fn = null, 
		n = 0,
		isMove = false,
		delay = json.delay || 3000;
	json.element.hover(c,auto).html(json.element.html()+json.element.html());
	
	function auto(){
		fn = setTimeout(function(){
			n++;
			m(n);
		},delay);
		if(json.tip){
			json.tip.removeClass('on').eq( n >= tag.length ? n -tag.length : n).addClass('on');
		}
	}
	
	function m(){
		c();
		isMove = true;
		if(n<0){
			json.element.css("margin-left",tag.length*width);
			n = tag.length-1;
		}		
		json.element.animate({'marginLeft' : n*width},'500','linear',function(){
			isMove = false;
			if(n > tag.length){
				json.element.css("margin-left",width);
				n = 1;
			}
		});
		auto();
	};
	
	function c(){
		clearTimeout(fn);
		fn = null;
	};
	
	function add(s){
		if(!isMove){
			s?n++:n--;
			m(n);
		}
	};
	if(json.right){
		json.right.click(function(e){
			e.preventDefault();
			add(1);
		});
	}
	
	if(json.left){
		json.left.click(function(e){
			e.preventDefault();
			add();
		});
	}
	
	if(json.tip){
		json.tip.click(function(){
			n = $(this).index();
			m();
		});
	};
	return auto();
}



function switchImg(json){
	json.small.click(function(){
		show($(this).parent().index());
	})
	function show(n){
		json.big.attr("src",json.small.eq(n).data("source"));
		json.small.removeClass("on").eq(n).addClass("on");
	}
	show(0);
}


function moveText(json){
	var element = json.element, maxMove = -element.height(), fn = null, t = 0, up = true, s = 1;
	element
	.html(element.html()+element.html())
	.hover(function() {
		!json.pa.hasClass('on')&&c();
	}, function() {
		!json.pa.hasClass('on')&&m();
	});;
	function m(){
		t = up?(t <= maxMove?-s:t-s):(t >=0 ? maxMove+s : t+s)
		element.css({'marginTop' : t})
		fn = setTimeout(m,50);
	}
	function c(){
		clearTimeout(fn);
		fn = null;
	}
	json.pa.click(function(event) {
		var _this = $(this);
		if(_this.hasClass('on')){
			m();
			_this.removeClass('on');
		}else{
			c();
			_this.addClass('on')
		};
	});
	json.up.click(function() {up = true});
	json.dw.click(function() {up = false});
	return m();
}