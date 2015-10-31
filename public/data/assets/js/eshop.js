var my_cart_num = 0;

$(function(){
	var menu = null, lead = $("#scene"),menuA = $("#hpA"),menuB = $("#hpB"),menuC = $("#hpC"),isshow = false, fn = null,openCar =$("#openCar"),bcstBut =$("#bcstBut"),bcstCar =$("#bcstCar"),bcstFd=$("#bcstFd");
	lead.delegate('input.gomi', 'click', function(event) {
		if(SK_UID > 0) {
			var this_obj = $(this);
			var vg_ide = $(this).data("ide");
	        $.ajax({
	    		url:'/eshop/magic/buy_magic',
	    		data:{ide:vg_ide},
	    		dataType:'json',
	    		success:function(res) {	
	    			if(res.code>0) {	    				
	    				show(this_obj, menuB);
	    			}else {        			
	                    if(res.code == -5) {//金币不足	                    	
	                    	show(this_obj, menuA);
	                    }else if(res.code == -1) {//未登录
	                    	$.layer('<?php echo $this->config->item("i_url");?>/api/member/common_login?backurl='+location.href+'&r='+Date.parse(new Date()),{width:765, height:350});                        
	                    }else {
	                    	alert(res.error);
	                    }
	    			} 
	    		}
	    	}); 
		}else {
			$.layer('<?php echo $this->config->item("i_url");?>/api/member/common_login?backurl='+location.href+'&r='+Date.parse(new Date()),{width:765, height:350});                        
		}	
		
	});
	lead.delegate('input.che', 'click', function(event) {
		var this_obj = $(this);
		var vg_ide = $(this).data("val");
		$.ajax({
    		url:'/eshop/mycart/entry',
    		data:{ide:vg_ide},
    		dataType:'json',
    		success:function(res) {	
    			if(res.code>0) {	    				
    				show(this_obj, menuC);
    			}else {        			
    				alert(res.error);
    			} 
    		}
    	});		
	});
	menuA.delegate('a', 'click', function(event) {
		clear();
		menuA.hide();
	});
	menuA.delegate('em', 'click', function(event) {
		clear();
		menuA.hide();
	});
	menuB.delegate('em', 'click', function(event) {
		clear();
		menuB.hide();
	});
	menuC.delegate('em', 'click', function(event) {
		clear();
		menuC.hide();
	});
	function clear(){
		clearTimeout(fn);
		fn = null;
	}
	
	function auto_hide() {
		setTimeout(function(){
			$('#hpB').hide();
			$('#hpC').hide();
		},2000)
	}
	
	function show(el, menu){
		clear();
		var pos = el.offset(), height = menu.height()/2-9, width = menu.width()+15 ;
		menu.css({
			'top' : pos.top - height,
			'left' : pos.left - width,
			'display' : 'block',
		});
		auto_hide();
	}
	function hide(){
		fn = setTimeout(function(){
			menu.css({'display':''})
		},200)
	}
	

$("#bcstLst").on('click', 'dl', function(event){
	event.stopPropagation();
});
	
$("#bcstLst").on('click', 'dl dd u', function(event){
	event.stopPropagation();
	var this_obj = $(this);
	var dl_obj = this_obj.parent().parent();
	var vg_ide = dl_obj.data("val");
	var vg_price = parseInt(dl_obj.data("price"));	
	$.ajax({
		url:'/eshop/mycart/remove',
		data:{ide:vg_ide},
		dataType:'json',
		success:function(res) {	
			if(res.code>0) {	
				if(my_cart_num>0) {
					my_cart_num--;
				}
				var const_price = $('.bcstVia span').html();
				const_price = parseInt(const_price);
				if((const_price - vg_price) >=0) {
					var lot = const_price - vg_price;
					$('.bcstVia span').html(lot);
				}else {
					$('.bcstVia span').html(0);
				}
								
				this_obj.parent().parent().fadeOut(1000);
				setTimeout(function(){
					this_obj.parent().parent().remove();
					},1000);
												
			}else {        			
				alert(res.error);
			} 
		}
	});	
});

//减少数量
$("#bcstLst").on('click', 'dl dd em', function(event){	
	event.stopPropagation();	
	
	var this_obj = $(this);
	var dl_obj = this_obj.parent().parent();
	var vg_ide = dl_obj.data("val");
	var num = parseInt(dl_obj.find("dd input").val());
	num = num - 1;	
	if(num>0) {
		$.ajax({
			url:'/eshop/mycart/update',
			data:{ide:vg_ide, num:num},
			dataType:'json',
			success:function(res) {	
				if(res.code>0) {	
					init_cart();
				}else {        			
					alert(res.error);
				} 
			}
		});
	}else {
		dl_obj.find("dd input").val(1);
	}	
});

//input变化
$("#bcstLst").on('keyup', 'dl dd input', function(event){
	var num = parseInt($(this).val());
	var this_obj = $(this);
	var dl_obj = this_obj.parent().parent();
	var vg_ide = dl_obj.data("val");
	if(num>0) {		
		$.ajax({
			url:'/eshop/mycart/update',
			data:{ide:vg_ide, num:num},
			dataType:'json',
			success:function(res) {	
				if(res.code>0) {	
					init_cart();	
				}else {        			
					alert(res.error);
				} 
			}
		});
	}else {
		$(this).val(1);
	}
});

	
//增加数量
$("#bcstLst").on('click', 'dl dd i', function(event){
	event.stopPropagation();	
	
	var this_obj = $(this);
	var dl_obj = this_obj.parent().parent();
	var vg_ide = dl_obj.data("val");
	var num = parseInt(dl_obj.find("dd input").val());	
	if(num>0) {
		num = num + 1;
		$.ajax({
			url:'/eshop/mycart/update',
			data:{ide:vg_ide, num:num},
			dataType:'json',
			success:function(res) {	
				if(res.code>0) {	
					init_cart();	
				}else {        			
					alert(res.error);
				} 
			}
		});
	}else {
		dl_obj.find("dd input").val(1);
	}
});

function init_cart() {
	$.ajax({
		url:'/eshop/mycart/pop_list',
		data:{},
		dataType:'json',
		success:function(res) {	
			if(res.code>0) {	
				var cart_list_html = '';
				var const_price = 0;
				my_cart_num++;
				$('#bcstLst').html(''); 
				
				$.each(res.info, function(i, item){ 					
					var html = ''; 
					var curr_price = parseInt(item.gameball_price) * parseInt(item.num);
					const_price += curr_price;		
					
					html = '<dl data-val="'+item.vg_ide+'" data-price="'+curr_price+'"><dt class="no1">'+item.name+'</dt><dd class="no2">'+item.cate_name+'</dd>'
				    html += '<dt class="no3"><span>'+item.gameball_price+'</span>赛点</dt>';
					html += '<dd class="no4"><em></em><input type="text" value="'+item.num+'" /><i> </i></dd>';
					html += '<dd><u>删除</u></dd>';
					html += '</dl> '; 
								
					my_cart_num++;
					cart_list_html += html; 
				}); 
				$('#bcstLst').html(cart_list_html);   
				$('.bcstVia span').html(const_price);
								
				//event.stopPropagation();	
				bcstCar.fadeIn(300);
				
				/*
				if(bcstCar.is(":hidden")){
					bcstCar.fadeIn(300);
					return false;
				}else{
					bcstCar.fadeOut(300);
					return false;
				};
				*/
			}else {        			
				alert(res.error);
			} 
		}
	});
}

openCar.click(function(event){	
	init_cart();	
});

//提交订单
bcstBut.click(function(event){
	event.stopPropagation();

	var order = "";
    $('#bcstLst dl').each(function() {
        if(order == "") {
        	order = $(this).data("val")+","+$(this).find("dd input").val();
        }else {
        	order += ";"+$(this).data("val")+","+$(this).find("dd input").val();
        }
    });

    if(order != "") {
    	$.ajax({
			url:'/eshop/magic/order',
			type: 'POST',
			data:{ord:order},
			dataType:'json',
			success:function(res) {	
				if(res.code>0) {
					bcstFd.find("dl:eq(0)").hide();
					bcstFd.find("dl:eq(1)").show();
					bcstFd.fadeIn(300);
					
					setTimeout(function(){
						$('#bcstCar').fadeOut(500);
						bcstFd.fadeOut(500);
					},2000);
					init_cart();	
				}else {        		
					if(res.code == -5) {
						bcstFd.fadeIn(300);
					}else {
						alert(res.error);
					}
				} 
			}
		});
    }
});

bcstCar.click(function(event) {
	event.stopPropagation();
});
$(document).click(function (event) {bcstCar.fadeOut(300);bcstFd.fadeOut(300);});

});