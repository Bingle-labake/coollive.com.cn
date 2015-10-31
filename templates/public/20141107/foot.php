<!--footer begin-->
<div class="sk-bot">
	<div class="sk-footw">
    	<div class="sk-foot">
        	<dl>
            	<dt><span class="fl"><a href="http://www.saiku.com.cn">赛酷网</a></span><p class="fr"><a href="http://www.saiku.com.cn/corporation">关于网站</a>|<a href="http://www.saiku.com.cn/copyright">版权声明</a>|<a href="http://www.saiku.com.cn/privacy">隐私保护</a>|<a href="http://www.saiku.com.cn/contact">联系方式</a>|<a href="http://www.saiku.com.cn/jobs">加入我们</a>|<a href="http://www.saiku.com.cn/feedback">意见反馈</a></p>
                </dt>
                <dd>客服  QQ：<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2081657478&site=qq&menu=yes"><img border="0" src="http://img2.saiku.com.cn/static/assets/img/icon_QQ.png" alt="在线咨询" title="在线咨询"/></a>&nbsp;&nbsp;&nbsp;&nbsp;合作邮箱：service@saiku.com.cn</dd>
            </dl>
            <div class="sk-fotbt">Copyright © 2014 Saiku.com.cn,All rights reserved. 京ICP备14012047-1&nbsp;&nbsp;京公网安备11010102001187号</div>
        </div>
    </div>
</div>

<?php foreach ($gf_js as $v) { ?>
<?php if($v == '/assets/js/footer.js'){ continue; }?>
<script src="<?php echo $this->config->item('img2_url').$v; ?>"></script>
<?php } ?>

<!--footer end-->
</body>
</html>