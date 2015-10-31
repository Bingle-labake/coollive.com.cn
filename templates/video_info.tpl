<?php $this->load->view('public/common_head.php'); ?>
<!--header end--> 

<!--content begin-->
<div class="pub-content">
	<div class="pub-w">
		<!-- 面包屑 -->
        <?php $this->load->view('block/hd-path.shtml'); ?>
		<!-- 视频 -->
        <?php $this->load->view('block/hd-shipin.shtml'); ?>
		<!-- 投票 -->
        <?php $this->load->view('block/hd-xq-vote.shtml'); ?>
		<!-- 回复列表 -->       
        <div id="SOHUCS" sid="2_<?php echo $video['id'];?>"></div>
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
<!--content end--> 
<?php $this->load->view('public/footer.php'); ?>
<script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/buttonLite.js#style=-1&amp;uuid=317433ee-2548-48e2-88db-f3d46d1f16eb&amp;pophcol=2&amp;lang=zh"></script><script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/bshareC0.js"></script> 
<script type="text/javascript" charset="utf-8">
bShare.addEntry({
	url: document.location.href,
	summary: decodeURIComponent('<?php echo $video['description'];?>'),
	pic: '<?php $img_params = array('pic_name'=>'1.jpg','pic_path'=>$video['pic_path'],'w'=>600,'h'=>450); echo  img_url_path('video',$img_params);?>',
    vUid: SK_UID,
    vTag: "videoplay"
});
</script> 
