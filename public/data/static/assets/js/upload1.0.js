;function setTags(element,tagtext,number,number2){
    var ul = element.find('ul:first'), 
        input = element.find('input:first'), 
        myTag = tagtext.find("a"), 
        span = element.find('span:first'),
        bakval = span.html();
        number = number || 12;
        number2 = number2 || 5;

    function insert(str,index){
        var tmp = $('<li><em>'+ str +'</em><b title="删除当前标签"></b></li>');
        if(index){
            tmp.attr('index', index)
        }
        tmp.insertBefore(input.parent());
        input.focus();
    }

    function strleng(str) {
        var len = 0;
        for(var i=0;i<str.length;i++){
            len += encodeURI(str[i]).length > 1 ? 2: 1;
        }
        return len;
    };

    function checklength(){
        if(ul.find('li').length>number2){
            span.html('最多添'+ number2 +'标签').addClass('cRed');
            return false;
        }else{
            span.html(bakval).removeClass('cRed');
            return true;
        };
    }

    function check(){
        var arr = input.val().split(" ");
        if(arr.length>1){
            $.each(arr,function(index, element) {
                var len = strleng(element);
                if(len>0){
                    if(len>1&&len<(number+1)){
                        if(!checklength()) return false;
                        insert(element);
                        span.html(bakval).removeClass('cRed');
                        input.val($.trim(input.val().replace(element,'')));
                    }else{
                        span.html(len>(number+1)?('单个标签最多'+number+'个字符，一个汉字算作两个字符'):'单个标签最少2个字符，一个汉字算作两个字符').addClass('cRed');
                        return false;
                    };
                }
            });
        }
    }
    element.delegate('b', 'click', function(event) {
        var _this = $(this).parent(), n = _this.attr('index');
        n&& myTag.eq(n-1).show();
        _this.remove();
        input.focus();
    }).delegate('ul', 'click', function(event) {
        if(event.target.tagName == 'UL'){
            input.focus();
        }
    });
	tagtext.delegate('a', 'click', function(event) {
        if(!checklength()) return false;
        event.preventDefault();
        var _this = $(this).hide();
        insert(_this.html(),_this.attr('index'));
    });
    input
    .bind('keyup', check)
    .bind('blur',function(){
        input.val($.trim(input.val())+" ");
        check();
    })
	.bind('keydown',function(event){
		if(event.keyCode==13){
			input.val($.trim(input.val())+" ");
			check();
			}
		})
    .bind('keydown',function(event){
        if(event.keyCode==8){
            if(input.val()==''){
                var _tmp = input.parent().prev(), val = _tmp.find('em:first').html();
                if(val){
                    var n = _tmp.attr('index');
                    n&& myTag.eq(n-1).show();
                    input.val(val);
                    event.preventDefault();
                    _tmp.remove();
                }
            }
        };
    });
}