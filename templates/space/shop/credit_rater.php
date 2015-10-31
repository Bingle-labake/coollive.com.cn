<?php $this->load->view('public/common_head.php'); ?>
<!--content begin-->
<div class="pub-w">
	<div class="shop_title fY f14px"><a href="<?php echo $this->config->item("base_url");?>">赛酷网 </a> > <span class="cOrange">积分兑换</span></div>
    <dl class="shop_tip f14px"><dt class="fl">兑换商品<span>排序方式：<i class="orderbycredit <?php if(isset($c) && !empty($c)) { if($c == "desc") {echo "on";}else {echo "down";}}?>" ">积分数量</i></span></dt>
    <dt class="fl"><span style="margin-left:20px;"><i class="orderbyrate <?php if(isset($r) && !empty($r)) { if($r == "desc") {echo "on";}else {echo "down";}}?>" >准确率</i></span></dt>
    <dd class="fr">
    <input type="hidden" name="convert_value" value="<?php if(isset($c) && !empty($c)) { echo $c; }?>" />
    <input type="hidden" name="right_rate" value="<?php if(isset($r) && !empty($r)) { echo $r;}?>" />
    <?php if(isset($my_uid) && $my_uid>0) {
        if($my_rater_rate<=0 && $my_rater_credit<=0) {
    ?>
    你还木有评委积分？赶紧去参加<a href="<?php echo $this->config->item("base_url");?>/look" target="_blank"><span class="cRed">天梯活动</span></a>吧!
    <?php 
        }else {
    ?>
    目前准确率：<span class="cRed"><?php echo $my_rater_rate;?>%</span>,评委积分余额：<span class="cRed"><?php echo $my_rater_credit;?></span>
    <?php
        }
     }else {?>
    你还没有评委积分？赶紧去参加<a href="<?php echo $this->config->item("base_url");?>/look" target="_blank"><span class="cRed">天梯活动</span></a>吧!
    <?php }?>
    
    &nbsp;&nbsp;&nbsp;<a class="cBlue" href="http://www.saiku.com.cn/pk/ladder/credit.html" target="_blank">评委积分及准确率说明</a>
  </dd></dl>
    <div class="pub-w">
    	<div class="shop_list" id="shop_list">
    	    <?php 
    	    if($shop_list) {
    	      foreach($shop_list as $product) {
            ?>
    	      <dl>
                <dt>
                	<h2 class="fY f14px cOrange"><?php echo $product['name'];?></h2>
                    <p>兑换积分：<?php echo abs($product['convert_value']);?>  <span>准确率：<?php if($product['right_rate'] > 0) { echo $product['right_rate']."%";}else {echo "-";}?></span></p>
                    <a href="javascirpt:void(0);" data-val="<?php echo $product['vg_ide'];?>">去兑换</a>
                </dt>
                <dd><img src="<?php echo $this->config->item("img3_url")."/images/prize/".$product['pic_name'];?>" alt="<?php echo $product['name'];?>" /></dd>
            </dl>
    	    <?php 
              }
            } 
            ?>            
        </div>
        <?php echo $page; ?>
    </div>
</div>


<script>
$(function(){
	var list = $("#shop_list");
	list.find("dl").hover(function(){
		var _this = $(this);
		_this.addClass("on");
		},function(){
		var _this = $(this);
		_this.removeClass("on");
		});
	list.find("a").click(function(event){
		event.preventDefault();
		if(SK_UID>0) {
			var ide = $(this).data('val');
			$.ajax({
				url: "/space/credit/check_ratercredit/"+ide+"?callback=?",
				dataType:"jsonp",
				success: function(res){
				      if(res.code>0) {
	                      window.location.href = "/space/credit/exchange/"+ide;
				      }else {
				    	  var tanc = $.layer(res.error);
				      }			    
				}
		   });
		}else {
			$.layer('http://i.saiku.com.cn/api/member/common_login?backurl='+location.href+'&r='+Date.parse(new Date()),{width:765, height:350});
		}
		});

	$('i.orderbycredit').click(function() {
		var para = "k=1";		
		if($('input[name="convert_value"]').val() == "" || $('input[name="convert_value"]').val() == "asc") {
			para += "&c=desc";
		}else {
			para += "&c=asc";
		}
		window.location.href = "/space/eshop?"+para;
	});
	$('i.orderbyrate').click(function() {		
		var para = "k=1";
		if($('input[name="right_rate"]').val() == "" || $('input[name="right_rate"]').val() == "asc") {
			para += "&r=desc";
		}else {
			para += "&r=asc";
		}
		window.location.href = "/space/eshop?"+para;
	});
	
	});
</script>
<script type="text/tcl" id="shop_tanc">
<div class="win-tan">
	<h2 class="f14px fY"><span class="win-close" onClick="$.layer();"></span>兑换锤子 T1（TD-LTE版)</h2>
    <dl>
    	<dt><p class="fY f14px">兑换锤子 T1（TD-LTE版）需要 49999积分</p><span class="cOrange">您当前的积分一共29999，不够兑换，去查看积分说明，</span><a class="cBlue" href="">赚取积分</a></dt>
        <dd class="win-but"><a href="">去查看</a></dd>
    </dl>
</div>
</script>
<a class="bshareDiv" href="http://www.bshare.cn/share">分享按钮</a><script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/buttonLite.js#uuid=317433ee-2548-48e2-88db-f3d46d1f16eb&style=3&fs=4&textcolor=#fff&bgcolor=#F60&text=分享到"></script>
<script type="text/javascript" charset="utf-8">
bShare.addEntry({
	url: document.location.href,
	summary: decodeURIComponent('<?php if(!empty($seo['description'])){echo  $seo['description'];}else{echo '积分商城';}?>'),
	pic: '<?php if($shop_list){echo $this->config->item("img3_url")."/images/prize/".$shop_list[0]['pic_name'];}?>',
    vUid: SK_UID,
    //vEmail: "用户的Email",
    vTag: "eshop"
});
</script> 
<!--content end-->
<?php $this->load->view('public/footer.php'); ?>