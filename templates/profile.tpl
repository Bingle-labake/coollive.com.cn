<?php $this->load->view('public/20141107/head5.php'); ?>
<article class="clear">
    <div class="a_bd">
        <section>
            <ul id="talkList" class="clear">
              <?php if(isset($program) && !empty($program)) {
              ?>
              <script src="http://demo.live.saiku.com.cn/public/data/assets/play/ckplayer/ckplayer.js"></script>
              <li class="mvitem" id="live_<?php echo $program['rid'];?>" data-top="62">
                <div class="mv_user clear"><div class="userPic">
                    <a href="/u/<?php echo $user['uid'];?>" class="avatar" target="_blank">
                    <img src="<?php echo $this->config->item("i_url");?>/space/upload/avatar?uid=<?php echo $user['uid'];?>" title="<?php echo $user['username'];?>">
                    </a>
                </div>
                <div class="panel clear"><div class="userName">
                    <a href="/u/<?php echo $user['uid'];?>" target="_blank" class="name c_tx0"><?php echo $user['username'];?></a>
                </div>
                <div class="mt5 left">
                    <a href="/room/<?php echo $program['rid'];?>" target="_blank" class="time c_tx3"> <?php echo date("H:i", $program['start_time']);?></a>
                    <a class="c_tx3 ml15" href="/room/<?php echo $program['rid'];?>" target="_blank"><strong><?php echo $program['views'];?></strong> 次播放</a>
                </div>
                <div class="selectList2 mt5" style="display: none">
                    <a href="###" class="selectBtn js_selectBtn">
                        <b class="a a4 a_t"></b>
                    </a>
                    <div class="dropList js_dropList" style="display: none">
                      <ul class="clear">
                        <li class="item">
                          <a class="lk js_download" href="###" data-msgid="live_<?php echo $program['rid'];?>" data-vid="1008_d0e999f2225f4ad796eac1efb2cb9a59">下载视频</a>
                        </li>
                      </ul>
                    </div>
                </div>
              </div>
              </div>
              <div class="mv_video vPlay" data-vid="1008_d0e999f2225f4ad796eac1efb2cb9a59" data-oldvid="i1597f3t5a0">
              <div class="vWrap js_img" thumbs="1">
              <a class="btnPlay" style="display: block">
              <em class="canPlay"></em>
              <em class="verror" style="display:none"></em><em class="vloading" style="display:none"></em></a>
              </div>
              <div class="vBox js_player" id="live_d0e999f2225f4ad796eac1efb2cb9a59"> 
              </div>
              <script type="text/javascript">	
              var flashvars={f:"<?php echo $program['live_url']['rtmp'];?>",c:"0",lv:"1",p:1};
              var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:"transparent"};
              var video=['<?php echo $program['live_url']['hls'];?>'];          
	          CKobject.embedSWF('/public/data/assets/play/ckplayer/ckplayer.swf','live_d0e999f2225f4ad796eac1efb2cb9a59','ckplayer_live_d0e999f2225f4ad796eac1efb2cb9a59','458','458',flashvars,params);
	 	
	          var support=['iPad','iPhone','ios','android+false','msie10+false'];
	          CKobject.embedHTML5('vi_video','ckplayer_vi_video',458,458,video,flashvars,support);
	
	
	          function closelights(){//关灯
		          alert(' 本演示不支持开关灯');
	          }
	          function openlights(){//开灯
		          alert(' 本演示不支持开关灯');
	          }	               
              </script>				
					
              </div><div class="mv_msg clear">
              <div class="msgBox"><div class="msgCnt">【<?php echo $program['name'];?>】<?php echo $program['desc'];?></div>
              <div class="pubInfo clear"><div class="left">
              <span class="ic ico_tag"></span>
              <a class="c_tx3 ml5" target="_blank" href="/tag/%E8%80%81%E5%B8%88%E4%B8%8E%E9%93%81%E9%94%A4"><?php echo $program['tags'];?></a></div></div>
              <div class="msgFunc pb10"><div class="funcBtn clear">
              <div class="praise left "><a href="###" class="lk js_praise" digid="" msgid="2002056105192474"><i>赞</i></a></div>
              <div class="relay left"><a href="/room/<?php echo $program['rid'];?>" target="_blank" class="lk js_relay"><i>转播</i></a></div>
              <div class="share left"><a href="###" class="lk js_share_timeline"><i>分享</i></a></div></div></div></div></div><div class="mv_msgList"><ul class="pt10"></ul>
              </div>
              <div class="mv_msgComm"><div class="gb_inputTxt1 e_input_ra"><label for="comment" class="lb tx_14 c_tx2 js_comment_lb">和作者说点啥吧~ 按回车(Enter)键提交</label>
              <input name="comment" maxlength="140" class="dis_b inputTxt tx_14 js_comment" type="text" value="" style="width:516px" vid="2002056105192474">
              </div>
              </div>
              </li>
              <?php
              }
              ?>
              <?php if(!empty($video_list)) { 
                  foreach($video_list as $video) {
               ?>
               <li class="mvitem" id="<?php echo $video['id'];?>" data-top="62">
                <div class="mv_user clear"><div class="userPic">
                    <a href="/u/<?php echo $user['uid'];?>" class="avatar" target="_blank">
                    <img src="<?php echo $this->config->item("i_url");?>/space/upload/avatar?uid=<?php echo $user['uid'];?>" title="<?php echo $user['username'];?>">
                    </a>
                </div>
                <div class="panel clear"><div class="userName">
                    <a href="/u/<?php echo $user['uid'];?>" target="_blank" class="name c_tx0"><?php echo $user['username'];?></a>
                </div>
                <div class="mt5 left">
                    <a href="/v/<?php echo $video['vid'];?>" target="_blank" class="time c_tx3"> <?php echo $video['adddate'];?></a>
                    <a class="c_tx3 ml15" href="/v/<?php echo $video['vid'];?>" target="_blank"><strong><?php echo $video['play'];?></strong> 次播放</a>
                </div>
                <div class="selectList2 mt5" style="display: none">
                    <a href="###" class="selectBtn js_selectBtn">
                        <b class="a a4 a_t"></b>
                    </a>
                    <div class="dropList js_dropList" style="display: none">
                      <ul class="clear">
                        <li class="item">
                          <a class="lk js_download" href="###" data-msgid="<?php echo $video['id'];?>" data-vid="1008_d0e999f2225f4ad796eac1efb2cb9a59">下载视频</a>
                        </li>
                      </ul>
                    </div>
                </div>
              </div>
              </div>
              <div class="mv_video vPlay" data-vid="1008_d0e999f2225f4ad796eac1efb2cb9a59" data-oldvid="i1597f3t5a0">
              <div class="vBox vWrap js_img" thumbs="1">
              <a class="btnPlay" style="display: block">
              <em class="canPlay"></em>
              <em class="verror" style="display:none"></em><em class="vloading" style="display:none"></em></a>
              <img src="<?php echo $this->config->item("img_url")."/images/video/".$video['pic_path']."/1,h_458,w_458.jpg";?>" style="display: inline;" width="458" height="458"></div>
              <div class="js_player" id="1008_d0e999f2225f4ad796eac1efb2cb9a59">              
              </div>
              </div><div class="mv_msg clear">
              <div class="msgBox"><div class="msgCnt">【<?php echo $video['title'];?>】<?php echo $video['description'];?></div>
              <div class="pubInfo clear"><div class="left">
              <span class="ic ico_tag"></span>
              <a class="c_tx3 ml5" target="_blank" href="/tag/%E8%80%81%E5%B8%88%E4%B8%8E%E9%93%81%E9%94%A4"><?php echo $video['tag'];?></a></div></div>
              <div class="msgFunc pb10"><div class="funcBtn clear">
              <div class="praise left "><a href="###" class="lk js_praise" digid="" msgid="2002056105192474"><i>赞</i></a></div>
              <div class="relay left"><a href="/v/<?php echo $video['vid'];?>" target="_blank" class="lk js_relay"><i>转播</i></a></div>
              <div class="share left"><a href="###" class="lk js_share_timeline"><i>分享</i></a></div></div></div></div></div><div class="mv_msgList"><ul class="pt10"></ul>
              <div class="msgNum tx_12"><a href="###" class="c_tx9 js_show_relist"><?php echo $video['vote'];?>赞 和 <?php echo $video['vote'];?>转评</a><a href="###" style="display:none" class="js_more_relist" hasnext="1">加载更多转评</a></div></div>
              <div class="mv_msgComm"><div class="gb_inputTxt1 e_input_ra"><label for="comment" class="lb tx_14 c_tx2 js_comment_lb">和作者说点啥吧~ 按回车(Enter)键提交</label>
              <input name="comment" maxlength="140" class="dis_b inputTxt tx_14 js_comment" type="text" value="" style="width:516px" vid="2002056105192474">
              </div>
              </div>
              </li>
               <?php   
                  }
                }
               ?> 
            </ul>
            <div class="mv_load" id="loading"><a href="#">正在加载...</a></div>
        </section>
        <div class="mv_aside">
            <div class="mv_conBox clear">
                <div class="staticbox">
                <div class="m_profile clear">
   <div class="c1">
      <a href="/u/<?php echo $user['uid'];?>" class="avatar">
         <img id="userpic"
         src="<?php echo $this->config->item("i_url");?>/space/upload/avatar?uid=<?php echo $user['uid'];?>"
         alt=""/>
      </a>
   </div>
   <div class="c2">
      <div class="username">
         <a class="name c_tx6" id="username" href="/u/<?php echo $user['uid'];?>"><?php echo $user['username'];?></a>
                        </div>
               <div class="opt mt10" data-state="1" >
            <a data-type="0" <?php if($relation == 0) { echo 'style="display:inline-block;" '; }else { echo 'style="display:none;"';} ?> href="#" class="btn btn2_l"><i class="ico16 ico_fo"></i><span class="t">关注</span></a>
            <a data-type="-1" <?php if($relation == -1) { echo 'style="display:inline-block;" '; }else { echo 'style="display:none;"';} ?>href="#" class="btn btn1_l"><span class="t">取消关注</span></a>
            <span data-type="2" <?php if($relation == 2) { echo 'style="display: inline-block;" '; }else { echo 'style="display:none;"';} ?>  class="optip dis_inb ml10">已关注我</span>
            <span data-type="1" <?php if($relation == 1 && !$me) { echo 'style="display: inline-block;" '; }else { echo 'style="display:none;"';} ?>  class="btn btn1_l e_btn_disabled"><span class="t">已关注</span></span>
            <span data-type="3" <?php if($relation == 3) { echo 'style="display: inline-block;" '; }else { echo 'style="display:none;"';} ?>  class="btn btn1_l e_btn_disabled"><span class="t">相互关注</span></span>
         </div>
         
         <div class="data mt15">
            <span class="count"><?php echo $works_count;?>作品</span><span class="spacer">|</span><span
               class="count"><?php echo $user['follows'];?>关注</span>
                        <span class="spacer">|</span><span class="count"><?php echo $user['fans'];?>粉丝</span>
                     </div>
      </div>

      <div class="c3">
         <div class="info"><span class="location"><?php echo $user['profile']['province'];?> <?php echo $user['profile']['city'];?></span></div>
         <div class="summary mt10">
            <p><?php echo $user['profile']['bio'];?></p>
            </div>
            <div class="mt15"><a href="###" class="btn btn1 js_recUser"><span class="t">分享名片</span></a></div><!-- 未登录态无推荐用户 -->
         </div>

      </div>
   </div>
            <a data-type="-1" style="display:none;"href="#" class="btn btn2_l"><i class="ico16 ico_fo"></i><span class="t">关注</span></a>
<div class="fixbox" id="slogan">
            <div class="hdTitle">
            <!-- 
            <div class="mv_tit">
                <img src="http://mat1.gtimg.com/www/mb/images/weishi/zuihuoweishi.jpg">
            </div>

            
            <div class="mv_appPc">
                <div class="c1">
                    <div class="mv_iphone" data-boss="btn_ios_user">
                        <a hidefocus="true" class="mv_iphone_btn" href="http://itunes.apple.com/cn/app/wei-shi-8miao-duan-shi-pin/id691828408?mt=8" target="_blank">
                            <span class="ico_down_iphone"></span>
                            <span class="txt"><span class="tx_ar">iPhone</span><span class="tx_yh">版下载</span></span>
                        </a>
                    </div>
                    <div class="mv_android">
                        <a hidefocus="true" class="mv_android_btn" href="javascript:void(0)" style="cursor:default">
                            <span class="ico_down_android"></span>
                            <span class="txt"><span class="tx_ar">Android</span><span class="tx_yh">版下载</span></span>
                        </a>
                        <div class="mv_btn_sub"> <i class="arr"></i>
                            <div class="hd">
                                <div class="inner"></div>
                            </div>
                            <div class="bd">
                                <ul class="clear">
                                    <li class="item">
                                        <a data-boss="btn_download_index_local" href="/download/index.php?from=android" class="lk" title="下载到本地">
                                            <span class="ico_down_todesktop"></span>
                            <span class="txt">
                                <span class="tx_yh">下载到本地</span>
                            </span>
                                        </a>
                                    </li>
                                    <li class="item bor0" id="btnuppcpush">
                                        <a data-boss="btn_index_pc_push" href="http://ui.ptlogin2.qq.com/cgi-bin/login?appid=46000101&amp;s_url=http://weishi.qq.com?pcpush=1" target="_blank" class="lk" title="通过手机QQ直接安装到手机">
                                            <span class="ico_down_tomobile"></span>
                            <span class="txt">
                                <span class="tx_yh">发送到手机</span>
                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="ft">
                                <div class="inner"></div>
                            </div>
                        </div>
                        <<div class="mv_btn_flag"></div> 
                    </div>
                </div>
                <div class="c2">
                    <p class="mv_2Code">
                        <img src="http://dldir1.qq.com/dlomg/weishi/pic/hongma144.png" />
                    </p>
                    <p>扫一扫，马上下载</p>
                </div>
            </div>
            -->
        </div>
        <div class="sideInfo tx_r">
        <!--
        <a class="c_tx6 js_shareApp" href="#">分享应用</a>
        <span class="spacer">|</span>
        <span class="c_tx6">联系我们：</span>
        <a data-boss="sharetowechat" href="#" id="sharetowechat"><span class="ico25 ico_wechat25"></span></a>
        <a data-boss="sharetomb" class="ml5" target="_blank" href="http://e.t.qq.com/weishi"><span class="ico25 ico_weibo25"></span></a>
        -->
    </div>
</div>                </div>
            </div>
        </div>
    </div>
</article>

<div class="floatopt">
    <div class="bd">
        <div class="dr">
            <ul class="drbtn">
                                <li class="item" style="display:none" id="gotoTop">
                    <a class="lk" href="#" title="返回顶部"><i class="ico_dr ico_drReturn"></i><span class="txt">返回顶部</span></a>
                </li>
                                <li class="item"  id="js_playType">
                                            <a class="lk" href="###" title="自动播放" id="auto_play"><i class="ico_dr ico_drPlay"></i><span
                                class="txt">自动播放</span></a>

                        <div class="subitem e_subitem2" style="display: none">
                            <a class="lk" href="###" title="手动播放" id="manual_play"><i
                                    class="ico_dr ico_drHand"></i><span
                                    class="txt">手动播放</span></a>
                                                        <a class="lk" href="###" title="上墙模式" style="display: none"><i
                                    class="ico_dr ico_drWall"></i><span
                                    class="txt">上墙模式</span></a>
                        </div>
                </li>
                            </ul>
        </div>

    </div>
<script type="text/javascript">
    var uid = '6298791';
    var tws = {};
</script>
<script type="text/javascript">QosSS.t[1] = (new Date()).getTime();</script>
<script type="text/javascript" src="http://timg2.saiku.com.cn/static/live/js/pc/lib/sea.js"></script>
<script type="text/javascript">
   seajs.config({
      'base' : 'http://timg2.saiku.com.cn/static/live/js/pc',
      'alias' : {
         'jquery' : 'lib/jquery_140108.js',
         'tws' : 'lib/tws_141222.js',
         'tws.login' : 'module/tws.login_140108.js',
         'tws.fall' : 'module/tws.fall_141014.js',
         'tws.talklist' : 'module/tws.talklist_141126.js',
         'channel.page' : 'page/channel.page_140917b.js',
         'login.page' : 'page/login.page_140116.js',
         'registry.page' : 'page/registry.page_140922.js',
         'share.page' : 'page/share.page_141015.js',
         'search.page' : 'page/search.page_140827c.js',
         'user.page' : 'page/user.page_140306a.js',
         'upload.page' : 'page/upload.page_140108.js',
         'wall.page':'page/wall.page_140108.js',
         'tag.page':'page/tag.page_140429.js',
         'index.page':'page/index.page_141117.js',
         'saoLogin.css':'css/saoLogin.css_140116.js',
         'manageWall.page':'page/manageWall.page_140121.js',
         'openwall.page':'page/openwall.page_140116d.js',
         'homedemo.page':'page/homedemo.page_140410.js'
      }
   });
   var tws = window.tws || {};
   tws.flashPlayer = 'http://timg2.saiku.com.cn/static/live/player/TPweishi.swf';
   tws.flashSimple = 'http://timg2.saiku.com.cn/static/live/player/weishiplayerIn.swf';
   tws.account = {};
   tws.guest = {};
   tws.sloganWroding = '微视';
   tws.followToken = '227cf02';
   tws.account.uid = '22867576';
   tws.account.name = '千寻鸟';
   tws.account.hasDownload = false;   
   tws.guest.uid = '6298791';
   tws.guest.name = '鑫儿baby';
   
var baseDepend = ['jquery', 'tws'];

</script>
<script type="text/javascript">
  seajs.use('user.page');
</script>

<?php $this->load->view('public/20141107/foot.php'); ?>