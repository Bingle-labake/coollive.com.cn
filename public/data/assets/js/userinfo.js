function moreImg(element,arr){
	var img = element.find("img:first"), 
		mask = element.find("dl:first"), 
		number = element.find("span.number"),
		left = element.find("span.btnl"), 
		right = element.find("span.btnr"), 
		view = element.find("span.view"), 
		cur = 0;
	function show(){
		cur > 0 ? left.show() : left.hide();
		cur > arr.length? right.hide() : right.show();
		if(cur>=arr.length){
			cur = arr.length-1;
			mask.show();
		}
		img.attr('src',arr[cur].sml);
		number.html('<i class="cOrange">'+ (cur+1) +'</i> / '+ arr.length);
	}

	function add(s){
		s ? cur++ : cur--;
		show();
	}

	mask.delegate('span', 'click', function(event) {
		mask.hide();
	}).delegate('a', 'click', function(event) {
		event.preventDefault();
		if(!$(this).hasClass('next')){
			mask.hide();
			cur = 0;
			show();
		}
	});;

	left.click(function(){add(0)});
	right.click(function(){add(1)});
	view.click(function(event) {
		$.layer('<div class="usr_bigImgWin" onclick="$.layer()"><div><img src="'+ arr[cur].big +'"></div></div>')
	});
	show();
}