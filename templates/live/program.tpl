<?php $this->load->view('public/20141107/head.php'); ?>
<script src="http://demo.live.saiku.com.cn/public/data/assets/play/ckplayer/ckplayer.js"></script>
<script src="http://timg2.saiku.com.cn/static/assets/js/base.js"></script>
<style type="text/css">

.chat_face {
	text-align:center;
	height:28px;
	line-height:28px;
	color:#333;
	cursor:pointer;
	overflow:hidden;
	display:inline-block;
}

.chat_face_hover {
	color:#f25000;
	height:28px;
	line-height:28px;
	overflow:hidden;
}

.show_face {
	background:#FFFFFF;
	border:#ccc 1px solid;
	width:600px;
	display:none;
	z-index:9999;
}
.show_face_hovers {
	display:block;
	position:absolute;
}

.face {
	width:30px;
	margin-right:1px;
	height:30px;
	line-height:30px;
	font-size:13px;
	text-align:center;
	background:#f6f6f6;
	vertical-align:top;
	margin-bottom:1px;
	display:inline-block;
}

.separator {
	border-bottom: 1px solid #222;
}

#chat-column ul{
	list-style-type: none;
	margin-left: 0px;
}

div.message-container{
	clear: both;
	position:relative;
	line-height: 20px;
	padding: 6px 10px;
}

div#chat-messages {
	overflow: auto;
	height:270px;
}

div.msg-time{
	position:absolute;
	top:7px;
	right:10px;
	font-size: 11px;
	color: #999;
}

#chat-column {
	background-color: whiteSmoke;
	overflow:auto;
	height:398px;
}

#right-column {
	position:fixed;
	right: 10px;
}

#input-box {
	position:fixed;
	bottom: 0px;
	height: 65px;
	background-color: #DDD;
}

.post-form{
	margin: 10px 10px;
}

div.message{
	margin-right:100px;
}

#chat-column .userpic{
	float:left;
	margin-right:5px;
}

li.user-online {
	margin-bottom: 5px;
}

li.user-online img {
	margin-right: 5px;
}

.xq_vote_box {height:83px;overflow:hidden;margin-bottom:10px}
.xq_vote_box dt {height:74px;overflow:hidden;float:left;padding:20px 10px 0 0}
.xq_vote_box dt img {border-radius:40px}
.xq_vote_box dd {width:870px;float:left;overflow:hidden}
.xq_vote_box_noicon dd {width:1000px}
.xq_vote {padding:10px 0 0;height:33px;overflow:hidden;}
.xq_vote span {float:right;display:inline-block;padding-top:15px;}
.xq_vote span i {font-size:24px}
.xq_vote span em {display:inline-block;padding:7px 10px 0;height:20px;background:#ed6d34;color:#fff;cursor:pointer;border-radius:5px;margin:0 0 0 15px}
.xq_vote span em:hover {background:#D2542C}
.xq_vote h2 {font-size:14px;float:left;padding-top:1px}

.xq {padding:10px 0 0;height:33px}
.xq_base {float:left;display:inline-block;padding-left:-200px;height:22px}

.xq_share {}
.xq_info {margin:0 0 55px;line-height:24px}
.xq_info p {margin:0 0 10px}
.bshare-custom{height:30px;width:230px;overflow:hidden;}
.xq_path{width:990px;margin:0 auto;line-height:32px;overflow:hidden;padding-top:6px;}
</style>
<div class="xq_path"> <a href="<?php echo $this->config->item("base_url"); ?>" class="cBlue">首页</a> > <a href="<?php echo $this->config->item("l_url"); ?>" class="cBlue">赛酷直播</a> > <?php echo $program['name'];?> </div>
<!--content begin-->
<div class="s_index fY">    
	<div class="i_tit">
    	<h1 class="cBlue" style="font-size:35px;">在线直播</h1>    	
    </div>
    <div class="videoPlay" style="width:950px;">
    	<div class="vi_player" style="width:950px;">
            <div class="vi_right" style="width:950px;height:530px;">
                <dl class="xq_vote_box">
	                <dt><a target="_blank" href="http://demo.q.saiku.com.cn/u/<?php echo $user['uid']; ?>"><img src="http://demo.i.saiku.com.cn/space/upload/avatar?uid=<?php echo $user['uid']; ?>" style="width:50px;height:50px;"></a></dt>
	                <dd>
		            <div class="xq_vote">		 
    		                <span>直播数 ：<i class="cOrange fA" id="vote"><?php echo $program['views'];?></i></span>    						
		            <h2 class="cBlue">直播节目：<?php echo $program['name']?>[<?php echo $program['rid'];?>]</h2>		 
		           </div>
		           <div class="xq">
		               <div class="xq_base"><a target="_blank" href="http://demo.q.saiku.com.cn/u/<?php echo $user['uid']; ?>"><?php echo $user['username']; ?></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;开始时间:<?php if($program['is_live'] == 1) { ?><?php echo $program['record_time']; ?><?php }else { ?>你猜...<?php } ?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标签：<?php echo $program['tags']; ?> </div>
		               <div class="xq_share cOrange">
			             <div class="bshare-custom fr"><div class="bsPromo bsPromo2"></div>
                         <div class="bshare-custom icon-medium"><div class="bsPromo bsPromo2"></div><a title="分享到新浪微博" class="bshare-sinaminiblog"></a><a title="分享到微信" class="bshare-weixin"></a><a title="分享到人人网" class="bshare-renren"></a><a title="分享到腾讯微博" class="bshare-qqmb"></a><a title="分享到QQ空间" class="bshare-qzone"></a><a title="更多平台" class="bshare-more bshare-more-icon more-style-addthis"></a><span class="BSHARE_COUNT bshare-share-count" style="float: none;">0</span></div>
                       </div>                   
                   </div>                    
	               </dd>
                </dl>
                <div class="vi_rbox" style="width:950px;background:#fff;">
					<?php if($program['is_live'] == 1) { ?>
					<div class="vi_rbox_video" id="vi_video" style="width:600px;height:430px;border:none;">
					</div>
					<script type="text/javascript">	
     var flashvars={f:"<?php echo $live_url['rtmp'];?>",c:"0",lv:"1",p:1};
     var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:"transparent"};
     var video=['<?php echo $live_url['hls'];?>'];          
	 CKobject.embedSWF('/public/data/assets/play/ckplayer/ckplayer.swf','vi_video','ckplayer_vi_video','600','400',flashvars,params);
	 	
	 var support=['iPad','iPhone','ios','android+false','msie10+false'];
	 CKobject.embedHTML5('vi_video','ckplayer_vi_video',600,400,video,flashvars,support);
	
	
	function closelights(){//关灯
		alert(' 本演示不支持开关灯');
	}
	function openlights(){//开灯
		alert(' 本演示不支持开关灯');
	}	               
                   </script>					
					<?php }else{ ?>	
					<div class="vi_rbox_video" id="vi_video" style="width:600px;height:430px;border:none;">
					</div>	
					<script type="text/javascript">   
                    var flashvars={
                                  f:'http://movie.ks.js.cn/flv/other/1_0.flv',
                                  c:0,
                                  i:'<?php echo $live_url;?>'
                                  };
                   var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'};
                   CKobject.embedSWF('/public/data/assets/play/ckplayer/ckplayer.swf','vi_video','ckplayer_vi_video','600','400',flashvars,params);                   
                   </script>
					<?php } ?>	
                    <div class="vi_rbox_mov" style="width:335px;height:398px;border:1px solid #ddd;" >                     
                        <!--主聊天区-->
                        <div id="chat-column">

                        <!--消息显示区-->
                        <div id="chat-messages" style="border:0px solid #ccc; height:300px;">
                          <div class="message-container"></div>
                        </div>


                        <!--工具栏区-->
                        <div id="chat-tool" style="padding-left:10px;height:30px;border:0px solid #ccc;background-color:#F5F5F5;">
                        <select id="userlist" style="float: left; width: 90px;">
                            <option value=0>所有人</option>
                        </select>

                        <!-- 聊天表情 -->
                        <a onclick="toggleFace()" id="chat_face" class="chat_face">
                            <img src="/public/data/chat/static/img/face/15.gif"/>
                        </a>
                        <a onclick="toggleGift()" id="chat_face" class="chat_face">
                            <img src="/public/data/chat/static/img/gift/gift.jpg"/>
                        </a>
                        </div>
                        <!--工具栏结束-->


                        <!--聊天表情弹出层-->
                        <div id="show_face" class="show_face">
                        </div>
                        <!--聊天表情弹出层结束-->


                       <!--发送消息区-->
                       <div id="input-msg" style="height:35px;border:0px solid #ccc;">
                           <form id="msgform" class="form-horizontal post-form">
                               <div class="input-append">
                                    <textarea id="msg_content" style="width:250px;height:30px;" rows="1" cols="250" contentEditable="true"></textarea>
                                   <img style="width:40px;height:40px;" onclick="sendMsg()" style="" src="/public/data/chat/static/img/button.gif"/>
                               </div>
                           </form>
                       </div>
                       </div>
                       <!--主聊天区结束-->
                    </div>
                </div>
            </div>
        </div>
        <!-- /container -->
    <div id="msg-template" style="display: none">
        <div class="message-container">
            <div class="userpic"></div>
            <div class="message">
                <span class="user"></span>

                <div class="cloud cloudText">
                    <div style="" class="cloudPannel">
                        <div class="sendStatus"></div>
                        <div class="cloudBody">
                            <div class="content"></div>
                        </div>
                        <div class="cloudArrow "></div>
                    </div>
                </div>
            </div>
            <div class="msg-time"></div>
        </div>
    </div>
    <!-- / -->      
    
    <!--liwu begin-->
        <div class="viliwu" id="viliwu">
        	<div class="viliwuBg"></div>
            <div class="viliwuBox">
                <dl class="viliwuTit">
                    <dt class="fl"><img src="http://timg2.saiku.com.cn/static/zhuanti/tianti/img/icon_informa05_01.png" /></dt>
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
					<dt class="fr"><span class="fl">送给</span> <i>阿may</i> 
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
					<dd class="viButton"><a href="http://demo.i.saiku.com.cn/u/point/rule#jinbiguize" target="_blank">是</a> | <em>否</em></dd>
                </dl>
            </div>

            <div class="viFudongc2" id="viDv02">
                <p class="viSaip_c">赠送成功</p>
            </div>
            <!--tishiceng2 end-->
        <!--liwu end-->
      
        <div class="player_vido_pl" id="PlayerBunt1">
        </div>
    </div>
    
    <dl class="sTitlev">
       <h1 class="cBlue" style="font-size:35px;">精彩回顾</h1>
       <dd><a href="/show/video/lists?gid=10&period=5" target="_blank">更多</a></dd>
    </dl>
     
    <div class="snapshots css3img">
			<div class="box">	
				<?php foreach($video_list as $video) { ?>
				<dl>
					<dt>
						<a href="<?php echo $this->config->item("l_url"); ?>/v/<?php echo $video['ccvid']; ?>" target="_blank"><img src="<?php echo $video['pic_path']; ?>" width="210px" height="165px"/><i></i></a>
					</dt>
					<dd>
					<a href="<?php echo $this->config->item("l_url"); ?>/v/<?php echo $video['ccvid']; ?>" target="_blank"><?php echo $video['title']; ?></a>
					</dd>
				</dl>
				<?php } ?>	
			</div>
        </div>

    <div style="padding-top:25px;text-align:center;">
    <span style="text-align:center;"><img src="http://demo.live.saiku.com.cn/public/data/images/coollive.png" width="120" height="120" /><br />coollive beta1.0<br/>android版</span>
    </div> 
    </div>
	
</div>
<!--content end-->
<script>
rid = <?php echo isset($program['rid'])?$program['rid']:0;?>;
fuid = <?php echo isset($program['uid'])?$program['uid']:0;?>;

function toggleGift(){
    if($("#viliwu").css('display') == 'block') {
	    $("#viliwu").hide(500);$("#viliwuList .on").removeClass('on');
	    $("body").data('success',0);
		$("body").data('error',0);
	}else {
	    $("#viliwu").show(500);
	}
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
function present(fuid, obj){
	$.ajax({
		url:'http://demo.i.saiku.com.cn/eshop/gift/present/152979?',
		dataType:"jsonp",
		jsonp:"callback",
		async:false,
		data:{'fuid':1, 'ide':obj.ide,'num':obj.num,'gid':obj.gid,'vid':935},
		success:function(res){}
	});
}
	
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

	var list = $("#viliwuList"),liwu = $("#viliwu");
	list.find("i").click(function(){
		if($(this).hasClass('on')){
		    $(this).removeClass("on");
		}else{
		    $(this).addClass("on");
		}
	});

	$("#viOut").click(function(){toggleGift()})
	$("#movBut").click(function(){toggleGift()})
	
	


	//赠送
	$("#Visong").click(function(){
		if(SK_UID > 0) {
			var num = $("#giftNum").val();
            var gifts = '';        
		    $(".viliwuList > li > .on").each(function(i,item){
			    var name = $(item).parent().attr('class');
			    if(gifts == '') {
			        gifts = giftMap[name];
			    }else {
			        gifts += "," + giftMap[name];
			    }
			 });
			 
			 if(gifts != '' && num > 0) {
			     sendGift(fuid, gifts, num);		
			 }			 	 
		}else {
			$.layer('http://demo.i.saiku.com.cn/api/member/common_login?backurl='+location.href+'&r='+Date.parse(new Date()),{width:765, height:350});
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
});	
</script>
<!--footer begin-->
<!--footer end-->
<?php $this->load->view('public/20141107/foot.php'); ?>           
<script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/buttonLite.js#style=-1&amp;uuid=317433ee-2548-48e2-88db-f3d46d1f16eb&amp;pophcol=2&amp;lang=zh"></script>
<script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/bshareC0.js"></script> 
            
