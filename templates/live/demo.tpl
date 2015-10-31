<?php $this->load->view('public/20141107/head.php'); ?>
<script src="http://demo.live.saiku.com.cn/public/data/assets/play/ckplayer/ckplayer.js"></script>
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
</style>
<!--content begin-->
<div class="s_index fY">
	<div class="i_tit">
    	<h1 class="cBlue" style="font-size:35px;">在线直播</h1>
    </div>
    <div class="videoPlay" style="width:950px;">
    	<div class="vi_player" style="width:950px;">
            <div class="vi_right" style="width:950px;height:530px;">
                <div class="vi_rbox" style="width:950px;background:#fff;">
					<div class="vi_rbox_video" id="vi_video" style="width:600px;height:430px;border:none;">
					</div>
                </div>
            </div>
        </div>
        <!-- /container -->
    </div>
    
</div>
<!--content end-->
<script type="text/javascript">	
     //var flashvars={f:"<?php echo $live_url['rtmp'];?>",c:"0",lv:"1",p:1};
     var flashvars={f:"rtmp://demo.srs.saiku.com.cn:1935/live...vhost...players/demo",c:"0",lv:"1",p:1};
     var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:"transparent"};
     //var video=['<?php echo $live_url['hls'];?>'];   
     var video=['http://demo.srs.saiku.com.cn:8080/live/demo.m3u8'];          
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

<?php $this->load->view('public/20141107/foot.php'); ?>
            
