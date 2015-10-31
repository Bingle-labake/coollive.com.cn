<ul class="pk_jiList">
   <li>我的金币总额：<span class="cRed cla_hcredits"><?php echo $space['hcredits'];?></span> 金币&nbsp;&nbsp;&nbsp;&nbsp;目前金币余额：<span class="cRed cla_credits"><?php echo $space['credits'];?></span> 金币&nbsp;&nbsp;&nbsp;&nbsp;</li>
   
   <li class="cRed"><a class="blue" href="/space/credit/rule">我要赚取金币</a></li>
</ul>

<!-- begin-->
<script type="text/tmpl" id="msgtmpl">
	<dl class="pub-confirm">
		<dt>
			<strong class="f16px cOrange fY">直投票兑换成功！</strong>
		</dt>
		<dd><a href="" onclick="$.layer()">关闭</a><a href="">去直投区投票</a></dd>
	</dl>
</script>

<script type="text/tmpl" id="pk_zhitou">
<div class="pk_player">
	<h2 class="f16px fY cWhite"><span class="win-close" onclick="$.layer()"></span></h2>
    <dl>
    	<dt>
        	<h3 class="f18px fY">兑换直投票成功！</h3>
            您现在可以使用直投票了
        </dt>
        <dd class="cWhite"><a href="javascript:;" onclick="$.layer()">取消</a><a href="">去挑战</a></dd>
    </dl>
</div>
</script>
<script type="text/tmpl" id="dialog_stride_pk">
<div class="pk_player">
	<h2 class="f16px fY cWhite"><span class="win-close" onclick="$.layer()"></span></h2>
    <dl>
    	<dt>
        	<h3 class="f18px fY">兑换跨级PK卷成功！</h3>
            您现在可以在PK专区，挑战前20名之前的用户了
        </dt>
        <dd class="cWhite"><a href="javascript:;" onclick="$.layer()">取消</a><a href="">去挑战</a></dd>
    </dl>
</div>
</script>
<script type="text/tmpl" id="dialog_double_fighting">
<div class="pk_player">
	<h2 class="f16px fY cWhite"><span class="win-close" onclick="$.layer()"></span></h2>
    <dl>
    	<dt>
        	<h3 class="f18px fY">兑换战斗力加成成功！</h3>
        </dt>
        <dd class="cWhite"><a href="javascript:;" onclick="$.layer()">取消</a><a href="">去看我的战斗力排行</a></dd>
    </dl>
</div>
</script>


<script>
$('input[type="text"]').keyup(function(){
	var credit_info = eval("("+$(this).data('info')+")");
	var num = $(this).val();
	if(credit_info.hcredits>0) {
		if(!$.isNumeric(num)) {
			$('input[name="'+credit_info.ide+'_num"]').val(0);
		}else {
			num = parseInt(num);
			if(num>0) {
				var pay_sorce = Math.abs(parseInt($('i.'+credit_info.ide).data("value")));
				
				var count_sorce = num*pay_sorce;
				if(count_sorce>credit_info.credits) {
					num = Math.floor(credit_info.credits/pay_sorce);				
				}
				if(num>0) {
					count_sorce = num*pay_sorce;
					$(this).val(num);
					$('li.cRed').html('&nbsp;&nbsp;兑换'+num+'次需要'+count_sorce+'金币');
				}else {
					$(this).val(num);
					$('li.cRed').html('&nbsp;&nbsp;你的金币不够兑换！');
				}			
			}else {
				$('li.cRed').html('&nbsp;&nbsp;请输入大于0的兑换数量');
			}		
		}
	}	
});

//兑换直投票
$('i.vote_ticket_ex').click(function() {
	var ex_num = parseInt($('input[name="vote_ticket_ex_num"]').val());
    if(ex_num>0) {
    	$.ajax({
    		url:'/space/credit/ex_vote',
    		data:{ex_num:ex_num},
    		dataType:'json',
    		success:function(res) {	
    			if(typeof(res.error) == "undefined") {	
    				if(res.code>0) {
    					init_credit(res.user, 'vote_ticket_ex');
    					$.layer($('#msgtmpl').html())						
    				}
    			}else {
    				$('li.cRed').html('兑换1次直投票需要500金币，您的金币余额不足，请赚取后再来兑换.<a class="blue" href="/space/credit/rule">我要赚取金币</a>');
    				alert(res.error);
    			}
    		}
    	});    	
    }else {
    	$('li.cRed').html('&nbsp;&nbsp;你的金币不够兑换直投票！');
    }
});

//兑换PK券
$('i.stride_pk').click(function() {
	var ex_num = parseInt($('input[name="stride_pk_num"]').val());
	var ide    = $(this).data("ide");
    if(ex_num>0) {
    	$.ajax({
    		url:'/space/magic/buy_magic?callback=?',
    		data:{num:ex_num, ide:ide},
    		dataType:'jsonp',
    		success:function(res) {	
    			if(typeof(res.error) == "undefined") {	
    				if(res.code>0) {  
    					init_credit(res.user, 'stride_pk');      				
    					$.layer($("#dialog_stride_pk").html())	
    				}
    			}else {
        			$('li.cRed').html('兑换1次跨级PK券需要500金币，您的金币余额不足，请赚取后再来兑换.<a class="blue" href="/space/credit/rule">我要赚取金币</a>');
    				alert(res.error);
    			}
    		}
    	});    	
    }else {
    	$('li.cRed').html('&nbsp;&nbsp;你的金币不够兑换直投票！');
    }
});

//兑换战斗力加成
$('i.double_fighting').click(function() {
	var ex_num = parseInt($('input[name="double_fighting_num"]').val());
	var ide    = $(this).data("ide");	
    if(ex_num>0) {
    	$.ajax({
    		url:'/space/magic/buy_magic?callback=?',
    		data:{num:ex_num, ide:ide},
    		dataType:'jsonp',
    		success:function(res) {	
    			if(typeof(res.error) == "undefined") {	
    				if(res.code>0) {
    					init_credit(res.user, 'double_fighting');     
    					$.layer($("#dialog_double_fighting").html())							
    				}
    			}else {
    				$('li.cRed').html('兑换1次战斗力加成特权需要300金币，您的金币余额不足，请赚取后再来兑换.<a class="blue" href="/space/credit/rule">我要赚取金币</a>');
    				alert(res.error);
    			}
    		}
    	});    	
    }else {
    	$('li.cRed').html('&nbsp;&nbsp;你的金币不够兑换直投票！');
    }
});

function init_credit(user, ide) {
    //更新总金币
	$('.cla_hcredits').html(user.hcredits);
	//更新目前金币
	$('.cla_credits').html(user.credits);
	//更新直通票
	$('.cla_votes').html(user.votes);

    //兑换input的data-info
    $('input[name="'+ide+'_num"]').attr("data-info", '{hcredits:'+user.hcredits+', credits:'+user.credits+'}');
    $('input[name="'+ide+'_num"]').val(0);
    
    $('li.cRed').html('<a class="blue" href="/space/credit/rule">我要赚取金币</a>');
}
</script>
