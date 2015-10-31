<?php $this->load->view('public/20141107/head.php'); ?>
<!--content begin-->
<div class="s_index fY">
	<div class="i_tit">
    	<img src="<?php echo $this->config->item('img2_url');?>/zhuanti/tianti/img/icon_informa05.png" />
    </div>
    <div class="videoPlay">
    	<div class="vi_player">
           <div class="vi_left">
			   <h2 class="f18px"><a target="_blank" href="<?php echo $this->config->item('q_url')?>/u/<?php echo $info['uid']?>"><?php echo $info['username']?></a></h2>
			   <div class="vi_left_pic">
				   <a href="<?php echo $this->config->item('q_url')?>/u/<?php echo $info['uid']?>" target="_blank">
					   <img src="<?php echo $this->config->item('i_url');?>/space/upload/avatar?uid=<?php echo $info['uid']?>" alt="" />
			   </a></div>
              <ul>				  
				  <li><b></b></li>
              </ul>
			  <?php if(is_login() ){
				  if($uid !=$info['uid']){
			  ?>
			  <div class="vi_left_but"><a class="<?php echo ($is_follow == false)? '':'mygz';?>" href="javascript:void(0);" onclick="fllow()" >关注TA</a></div>
			  <?php

				}
			  }else{
			  ?>
			  <div class="vi_left_but"><a class="" href="javascript:void(0);" onclick="$.layer('/api/member/common_login?url='+location.href,{width:765, height:350})" >关注TA</a></div>
			  <?php
			  }
			  ?>
            </div>
            <div class="vi_right">
				<dl class="vi_rtit"><dt class="fl"><?php echo $info['title']?></dt><dd class="fr">ID:<?php echo $info['id'];?></dd></dl>
                <div class="vi_rbox">
					<div class="vi_rbox_video">
						<script src="<?php echo $this->config->item('v_player'); ?>?vid=<?php echo $info['vid']; ?>&siteid=9610FEEDA921B997&autoStart=false&width=490&height=310&playerid=94567D5CE8782BB0&playertype=1" type="text/javascript"></script>
					</div>
                    <div class="vi_rbox_mov">                        
                        <div class="movList" style="height:280px;">
                        	<ul id="movListP" data-val=<?php echo $info['id']?>>
								<?php 
								foreach($gift_msg_list as $gift)
									echo $gift;
								?>
                            	<!-- <li>赵天星哈哈 送:<i class="hamburger"></i></li> -->
                            </ul>
                            <ul style="display:none" id="sLista_lead_bot" data-val=<?php echo $info['id']?>></ul>
                        </div>
                        <div class="movBut" id="movBut">选择礼物</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="vi_vote">
			<div class="vi_votefl">
				<?php if(is_login()){
				echo '<u onclick="$.layer($(\'#vi_report1\').html());">举报该视频</u>';
				}?>
				<i>累计<span class="cOrange"><?php echo $info['vote']?></span>票</i>
				<?php
				//如果登录并获取到了赛票列表则显示，否则不显示
				if(is_login()){
					$display = ($tools_list == false)? 'style="display:none"':'';
				}else{
					$display = '';
				}
				?>
				<input id="TAvi_button" class="vi_button" type="button" value="给TA投票" <?php echo $display;?> />
            </div>
        	<div class="bshare-custom icon-medium fr"><a title="分享到新浪微博" class="bshare-sinaminiblog"></a><a title="分享到微信" class="bshare-weixin"></a><a title="分享到人人网" class="bshare-renren"></a><a title="分享到腾讯微博" class="bshare-qqmb"></a><a title="分享到QQ空间" class="bshare-qzone"></a><a title="更多平台" class="bshare-more bshare-more-icon more-style-addthis"></a><span class="BSHARE_COUNT bshare-share-count">0</span></div>
        </div>
        <!--tishiceng begin-->
        <div class="viFudongc" id="viF01">
        	<div class="viSaip">
				<dl><dt>请选择：</dt>
					<dd id="viPiaod">
					<?php
					if($tools_list != false)
						foreach($tools_list['data'] as $k=>$list){
							$on = ($k == 0)? 'on':'';
							echo "<i class='{$on}' data-price='{$list['gameball_price']}' data-ide='{$list['vg_ide']}'>{$list['name']}</i>";
						}
					?>
					</dd>
				</dl>
				<div class="viSaip_a">
					<select id="tool_num" onchange="getNum()">
                		<option>1</option>
                        <option>2</option>
                        <option>3</option>
                     </select> 份
                </div>
				<p>共计：<span id="tool_pay">0</span> 个赛点</p>
                <div class="viButton"><span onclick="vote()">是</span> | <em>否</em></div>
            </div>
        </div>
        <div class="viFudongc" id="viF02">
        	<dl class="viSaip_b">
            	<dt id="viF02_text">您现在的余额不足<br />是否选择充值？</dt>
				<dd class="viButton"><a href="<?php echo $this->config->item('i_url');?>/eshop" onclick="$('#viF02').hide();" target="_blank">是</a> | <em>否</em></dd>
            </dl>
        </div>
        <div class="viFudongc" id="viF03">
        	<p class="viSaip_c">投票成功</p>
        </div>
        <div class="viFudongc" id="viF04">
        	<p class="viSaip_c">投票失败</p>
        </div>

        <!--tishiceng end-->
        <!--liwu begin-->
        <div class="viliwu" id="viliwu">
        	<div class="viliwuBg"></div>
            <div class="viliwuBox">
                <dl class="viliwuTit">
                    <dt class="fl"><img src="<?php echo $this->config->item('img2_url');?>/zhuanti/tianti/img/icon_informa05_01.png" /></dt>
                    <dd class="fr cBlue f14px"><span id="viOut">X</span></dd>
                </dl>
                <ul class="viliwuList" id="viliwuList">
                	<li class="zhufu"><i>祝福</i></li>
                	<li class="music"><i>音乐</i></li>
                	<li class="vist"><i>VIST</i></li>
                	<li class="virtue"><i>美鞋</i></li>
                	<li class="phone"><i>手机</i></li>
                	<li class="house"><i>房子</i></li>
                	<li class="call"><i>座机</i></li>
                	<li class="plane"><i>飞机</i></li>
                	<li class="computer"><i>电脑</i></li>
                	<li class="letter"><i>情信</i></li>
                	<li class="car"><i>汽车</i></li>
                	<li class="hamburger"><i>汉堡</i></li>
                </ul>
                <dl class="viliwuBot">
                    <dd class="fr"><input id="Visong" class="vi_button" type="button" value="赠送" /></dd>
					<dt class="fr"><span class="fl">送给</span> <i><?php echo $info['username']?></i> 
					<select id="giftNum">
                		<option>1</option>
                        <option>2</option>
                        <option>3</option>
                     </select> 份</dt>
                </dl>
            </div>
        </div>
            <!--tishiceng2 begin-->
            <div class="viFudongc2" id="viDv01">
                <dl class="viSaip_b">
                    <dt>金币不够？<br />是否查看赚取金币？</dt>
					<dd class="viButton"><a href="<?php echo $this->config->item('i_url');?>/u/point/rule#jinbiguize" target="_blank">是</a> | <em>否</em></dd>
                </dl>
            </div>

            <div class="viFudongc2" id="viDv02">
                <p class="viSaip_c">赠送成功</p>
            </div>
            <!--tishiceng2 end-->
        <!--liwu end-->
        <div class="player_vido_pl" id="PlayerBunt1">
            <script>
                var SITE_PATH = "";
                var SK_comments = new Object();
				SK_comments.ex_id = 'demo_<?php echo $info['id']?>';
                SK_comments.type  = 2;
                SK_comments.reply_cid = 0;
                SK_comments.fuid = 0;
            </script>
			<div id="SOHUCS" sid="2_demo_<?php echo $info['id'];?>"></div>
            <script>
              (function(){
                var appid = 'cyrkyaAh9',
                conf = 'prod_d348c639156eebdbd362bb3995781c0d';
                var doc = document,
                s = doc.createElement('script'),
                h = doc.getElementsByTagName('head')[0] || doc.head || doc.documentElement;
                s.type = 'text/javascript';
                s.charset = 'utf-8';
                s.src =  'http://assets.changyan.sohu.com/upload/changyan.js?conf='+ conf +'&appid=' + appid;
                h.insertBefore(s,h.firstChild);
                window.SCS_NO_IFRAME = true;
              })()
            </script> 
        </div>
    </div>
    
    <dl class="sTitlev">
       <dt class="titd"></dt>
       <dd><a href="/show/video/lists?gid=10&period=5" target="_blank">更多</a></dd>
    </dl>
     
    <div class="snapshots css3img">
			<div class="box">	
				<?php foreach($video_list as $video) { ?>
				<dl>
					<dt>
						<a href="/show/video/act?wid=<?php echo $video['wid']; ?>" target="_blank"><img src="<?php echo $video['pic_path']; ?>" width="210px" height="165px"/><i></i></a>
					</dt>
					<dd>
					<a href="/show/video/act?wid=<?php echo $video['wid']; ?>" target="_blank"><?php echo $video['title']; ?></a>
					</dd>
				</dl>
				<?php } ?>	
			</div>
        </div>

    </div>
</div>
<!--content end-->
<!--footer begin-->
<!--footer end-->
<?php
if(is_login()){
?>
<script type="text/tcl" id="vi_report1">
<div class="vi_report">
	<h3 class="cBlue">我要举报的是【<?php echo $info['username'];?>】</h3>
    <p>选择举报类型：</p>
    <ul>
        <li><input name='msg' type="radio" value="5" /> 冒充我</li>
        <li><input name='msg' type="radio" value="6" /> 虚假视频</li>
        <li><input name='msg' type="radio" value="7" /> 不实信息</li>
        <li><input name='msg' type="radio" value="8" /> 淫秽色情视频/图片</li>
        <li><input name='msg' type="radio" value="9" /> 垃圾营销视频/图片</li>
        <li><input name='msg' type="radio" value="10" /> 人身攻击我</li>
        <li><input name='msg' type="radio" value="11" /> 抄袭我的视频/图片</li>
    </ul>
    <div><input class="vi_button" type="button" value="提交" onclick="report();" /><span onclick="$.layer()" class="vi_button">取消</span></div>
</div>
</script>
<script type="text/tcl" id="vi_report2">
<div class="vi_report">
    <h4 style="padding-top:50px;">举报成功</h4>
    <h4><span class="vi_button" onclick="$.layer()">关闭</span></h4>
</div>
</script>
<?php
}
?>
<script>
$(function(){
	var giftMap =  new Array();
	giftMap['zhufu'] = 'jinbidaoju_zhufu';
	giftMap['music'] = 'jinbidaoju_yinle';
	giftMap['vist'] = 'jinbidaoju_visa';
	giftMap['virtue']  =  'jinbidaoju_meixie';
	giftMap['phone'] = 'jinbidaoju_shouji';
	giftMap['call'] = 'jinbidaoju_zuoji';
	giftMap['plane'] = 'jinbidaoju_feiji';
	giftMap['computer'] = 'jinbidaoju_diannao';
	giftMap['letter'] = 'jinbidaoju_qingxin';
	giftMap['car'] = 'jinbidaoju_qiche';
	giftMap['hamburger'] = 'jinbidaoju_hanbao';
	giftMap['house'] = 'jinbidaoju_fangzi';

	var list = $("#viliwuList"),liwu = $("#viliwu"),movBut = $("#movBut");
	list.find("i").click(function(){
		if($(this).hasClass('on')){
			$(this).removeClass("on");
			}else{
			$(this).addClass("on");
			}
	});

	$("#viOut").click(function(){giftClose()})
	movBut.click(function(){
		if(liwu.css('display') == 'block')
			giftClose();
		else
			liwu.show(500);
	})

	//赠送
	$("#Visong").click(function(){
		if(SK_UID > 0) {
			var num = $("#giftNum").val();

		$(".viliwuList > li > .on").each(function(i,item){
			 var name = $(item).parent().attr('class');
			$.ajax({
				url:'<?php echo $this->config->item('i_url');?>/eshop/magic/exchange_magic?',
				dataType:"jsonp",
				jsonp:"callback",
				async:false,
				data:{'ide':giftMap[name],'num':num},
				success:function(res){
					if(res.code < 0){
						if(res.code == -1) {
							$.layer('<?php echo $this->config->item('i_url');?>/api/member/common_login?backurl='+location.href+'&r='+Date.parse(new Date()),{width:765, height:350});
						}else {
							giftMsg(res.error,'error');
						}						
					}else{
						code = present({'num':num,'gid':res.code,'ide':giftMap[name]});
						giftMsg('赠送成功','success');
					}
				}
			});
		})

		$("body").data('success',0);
		$("body").data('error',0);
		}else {
			$.layer('<?php echo $this->config->item('i_url');?>/api/member/common_login?backurl='+location.href+'&r='+Date.parse(new Date()),{width:765, height:350});
		}		
	})

	$("#TAvi_button").click(function(){
		if(SK_UID > 0)
			$("#viF01").show(200);
		else
			$.layer('/api/member/common_login?url='+location.href,{width:765, height:350})
	})

	$(".viButton").find("em").click(function(){
		$(this).parent().parent().parent().hide();
	})

	//绑定事件
	$("#viPiaod").find("i").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		getNum();
	});
	getNum();
	})

	function giftClose(){
		$("#viliwu").hide(500);$("#viliwuList .on").removeClass('on');
		$("body").data('success',0);
		$("body").data('error',0);
	}

	function giftMsg(msg,t){
		if(!$("body").data(t)){
			$("#viDv02").fadeIn(200);
			$("#viDv02 > .viSaip_c").text(msg);
			setTimeout(function(){
				$("#viDv02").fadeOut(200);},1000)

			$("body").data(t,1)
			setTimeout(giftClose,1300)
		}
	}

	//赠送
	function present(obj){
		$.ajax({
			url:'<?php echo $this->config->item('i_url');?>/eshop/gift/present/<?php echo $info['uid'];?>?',
			dataType:"jsonp",
			jsonp:"callback",
			async:false,
			data:{'ide':obj.ide,'num':obj.num,'gid':obj.gid,'vid':<?php echo $info['id']?>},
			success:function(res){
			}
		});
	}

	//投票动作
	function vote(){
<?php if(is_login()){
?>
		var obj = getNum();
		if(obj.price == 0){
			alert('投票错误!');
			return false;
		}
		var tools = new Array();
		$.ajax({
			'url':'/show/video/user_tools/<?php echo $space['uid'];?>',
			'async':false,
			'cache':false,
			'dataType':'json',
			'success':function(ret){
				if(ret.code == 1)
					$.each(ret.data,function(k,item){
						tools[k] = item
					});
			}
		});


		if(tools[obj.ide] == undefined){
			$("#viF01").hide();
			$("#viF02_text").html('去商城兑换'+obj.name+'<br />是否选择兑换？');
			$("#viF02").show();
		}else{
			if(parseInt(tools[obj.ide].length) >= parseInt(obj.num)){
				$.getJSON('/show/video/use_tool/<?php echo $space['uid'];?>?num='+obj.num+'&ide='+obj.ide,function(ret){
					if(ret.code == 1){
						$("#viF01").hide();
						$("#viF03").show();
						setTimeout(function(){
							$("#viF03").fadeOut(200);},1000)

						//增加票
						$.getJSON('<?php echo $this->config->item('base_url');?>/show/vote/incre?id=<?php echo $info['id'];?>&ide='+obj.ide+'&t=1&n='+obj.num,function(ret){
							if(ret.code == 1){
								$("#viF01").hide();
								var voteNum = parseInt($(".cOrange").text()) + parseInt(ret.num);
								$(".cOrange").text(voteNum);
							}
						});
					}else{
						$("#viF04").show();
						setTimeout(function(){
							$("#viF04").fadeOut(200);},1000)
					}
				});
			}else{
				$("#viF01").hide();
				$("#viF02_text").html('去商城兑换'+obj.name+'<br />是否选择兑换？');
				$("#viF02").show();

			}
		}
		return false;

		$.ajax({
			url:'<?php echo $this->config->item('i_url');?>/eshop/magic/buy_magic',
			data:{'ide':obj.ide,'using':1,'num':obj.num},
			dataType:"jsonp",
			jsonp:"callback",
			success:function(res){
				if(res.code <= 0){
					if(res.code == -5){
						$("#viF01").hide();
						$("#viF02").show();
					}else{
						alert(res.error);
					}
				}else{
				}
			}
		});
<?php
}
?>
}

	//获取投票数据
	function getNum(){
		var obj = {price:0,ide:'','num':0};
		var num = $("#tool_num").val();
		obj.num = num;
		$('#viPiaod>i').each(function (i, item) {
			if ($(item).attr('class') == 'on'){
				var p = $(item).data('price');
				$("#tool_pay").text(num * p);
				obj.price = p;
				obj.ide = $(item).data('ide');
				obj.name = $(item).text();
				return false;
			}
		})
		return obj;
	}

	function report(){
		var type = $('.vi_report input:radio[name="msg"]:checked').val();
		type = parseInt(type);
		if(type>0) {
			$.getJSON('<?php echo $this->config->item('base_url');?>/service/feedback/report',{'type':type,'wtype':1,'wid':<?php echo $info['id']?>},function(ret){																																						            if(ret.code > 0) {																																										                $.layer($('#vi_report2').html());																													            }else {																																					
				alert(ret.error);																																					            }			
		    });
		}else {
			alert("请选择一个举报类型.");
		}
	}

	<?php
	if(is_login()){
	?>
	function fllow(){
		$.ajax({
			url:'<?php echo $this->config->item('q_url');?>/api/relation/follow',
			data:{'uid':<?php echo $user['uid'];?>,'fuid':<?php echo $info['uid'];?>},
			dataType:"jsonp",
			jsonp:"callback",
			success:function(res){
				if(res.status == 0){
					$(".vi_left_but > a").attr('class','mygz');
					$(".vi_left_but > a").attr('onclick','');
				}else{
					alert(res.msg);
				}
			}
		})
	}
	<?php
	}
	?>
</script>
<?php $this->load->view('public/20141107/foot.php'); ?>
<script type="text/javascript">
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fbb3b9c2847a5f9fba73bc3d6c7500647' type='text/javascript'%3E%3C/script%3E"));

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-48109933-1', 'saiku.com.cn');
ga('send', 'pageview');
</script>
<script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/buttonLite.js#style=-1&amp;uuid=317433ee-2548-48e2-88db-f3d46d1f16eb&amp;pophcol=2&amp;lang=zh"></script>
<script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/bshareC0.js"></script>
