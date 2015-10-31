function focuImg(json) {
    var tip = json.tip,
    img = json.elements,
    cur,
    isdoing = false,
    fn = null;
    function _move(n) {
        if (n == cur || isdoing) return;
        isdoing = true;
        tip.eq(cur).removeClass('on');
        tip.eq(n).addClass('on');
        img.eq(cur).css({
            'z-index': 2
        });
        var tmp = img.eq(n);
        if (!tmp.attr('src')) tmp.attr('src', tmp.attr("__src"));
        img.eq(n).css({
            'opacity': 0,
            'z-index': 3
        }).animate({
            'opacity': 1
        },
        function() {
            img.eq(cur).css({
                'z-index': 0
            });
            cur = n;
            isdoing = false;
            fn = setTimeout(function() {
               add(1);
            },
            5000)
        })
    }
    tip.click(function() {
        clearTimeout(fn);
        _move($(this).index())
    });

    function add(s){
        if(!isdoing){
            clearTimeout(fn);
            var newN = cur;
            s?newN++:newN--;
            (newN == tip.length) && (newN = 0);
            0 > newN && (newN = tip.length-1);
            _move(newN);
        }
    }

    json.right.click(function(event) {
        event.preventDefault();
        add(1);
    });
    json.left.click(function(event) {
        event.preventDefault();
        add();
    });
    _move(0)
};


function srcrllBar(json){
	var tag = json.element.children(), starX, pos, isMove = false, barMaxMove, elementMaxMove, curpos = 0;

	function getSize(){
		var p = json.element.offset(), p2 = json.element.parent().offset();
		barMaxMove = json.bar.parent().width() - json.bar.width();
		elementMaxMove = tag.eq(0).width()*tag.length - json.element.parent().width();
		_move(barMaxMove*curpos);
	}

	json.bar.bind('mousedown',function(event){
		starX = event.pageX;
		isMove = true;
		pos = json.bar.position();
	})

	$G.doc.bind('mouseup',function(){
		if(isMove){
			isMove=false;
		}
	})
	.bind('mousemove',function(event){
		if(isMove){
			var x = event.pageX - starX + pos.left;
			_move(x);
			return false;
		}
	});

	function _move(x){
		x<0&&(x=0);
		x>barMaxMove&&(x=barMaxMove);
		var cur = x*elementMaxMove/barMaxMove;
		json.element.css({'margin-left' : cur*(-1)});
		json.bar.css({'left': x});
		curpos = cur/elementMaxMove;
	}

	$G.win.resize(getSize);

	getSize();

}


(function(){
    function setStyle(){
        var w = $G.win.width(), element = document.getElementById("hom_wrap");
        if(w > 1260){
            if(w>1680){
                element.className = "hom_big";
            }else{
                element.className = "hom_mid";
            }
        }else{
             element.className = "hom_sml";
        }
    }
    setStyle();
    $G.win.resize(setStyle);
})();