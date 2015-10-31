!function(){
	function sxdownMenu(element,down,callback){
		if(down){
			var menu = $("#pub-downmenu"), isshow = false, fn = null , tmp;
			if(typeof(down)=="function"){
				callback = down;
			}else{
				menu = down;
			}
			menu.delegate('li', 'click', function(event) {
				var _this = $(this);
				hide();
				tmp.html(_this.html());
				callback&&callback(_this);
			}).hover(clear,timer);

			element.delegate('i', 'click', function(event) {
				tmp = $(this);
				isshow = true;
				var pos = tmp.offset();
				menu.css({
					display: 'block',
					left: pos.left,
					top : pos.top + tmp.innerHeight(),
					width: tmp.innerWidth()
				});
				tmp.addClass("on").hover(clear,timer);
			});
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
			tmp.removeClass("on");
		}
	}
	(!jQuery.sxdownMenu)&&(jQuery.sxdownMenu=sxdownMenu);
}();
