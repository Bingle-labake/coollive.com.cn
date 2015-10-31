;function SmoveText(element){
	var maxMove = -element.height(), fn = null, t = 0, up = true, s = 1;
	element
	.html(element.html()+element.html())
	.hover(function() {
		c();
	}, function() {
		m();
	});;
	function m(){
		t = up?(t <= maxMove?-s:t-s):(t >=0 ? maxMove+s : t+s)
		element.css({'marginTop' : t})
		fn = setTimeout(m,80);
	}
	function c(){
		clearTimeout(fn);
		fn = null;
	}
	return m();
};

function Video(element,miny,maxy){
	var Move = element.children("*"),miny = miny || 72,maxy = maxy || 90;
	Move.hover(function(){
		var _this = $(this).find("i img");
		_this.stop().animate({width:maxy,marginTop:'0'},500);
		},function(){
		var _this = $(this).find("i img");
		_this.stop().animate({width:miny,marginTop:'9'},500);
		});
};
function addtags(element,tagtext,number2){
    var ul = element,
		number2 = number2 || 5,
		span = element.parent().find('span:first'),
		bakval = span.html();
    function insert(str,index){
        var tmp = $('<li><em>'+ str +'</em><b title="删除当前标签"></b></li>');
        if(index){
            tmp.attr('index', index)
        }
        ul.append(tmp);
    }
    function checklength(){
        if(ul.find('li').length>=number2){
            span.html('最多选择'+ number2 +'个标签').addClass('cRed');
            return false;
        }else{
            span.html(bakval).removeClass('cRed');
            return true;
        };
    }
    element.delegate('b', 'click', function(event) {
        var _this = $(this).parent(), n = _this.attr('index'),_index = element.index(this),myTag = tagtext.find("a");
        n && myTag.eq(n-1).removeClass("on");
        _this.remove();
		span.html(bakval).removeClass('cRed');
    })
	tagtext.delegate('a', 'click', function(event) {
		if(!checklength()) return false;
        event.preventDefault();
        var _this = $(this);
		(!_this.hasClass('on'))&&insert(_this.addClass('on').html(),_this.attr('index'));
    });
}
