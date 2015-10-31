<!--footer begin-->
<div class="pub-top ">
	</div>
<div class="pub-bot">
<div class="pub-footw cWhite"><dl class="pub-copyright fl">
		<dt><span class="fl"><a href="http://www.coollive.com.cn">酷Live</a></span><p class="fr">
			<a href="http://www.coollive.com.cn/corporation">关于网站</a>
			<a href="http://www.coollive.com.cn/copyright">版权声明</a>
			<a href="http://www.coollive.com.cn/privacy">隐私保护</a>
			<a href="http://www.coollive.com.cn/contact">联系方式</a>
			<a href="http://www.coollive.com.cn/jobs">加入我们</a>
			<a href="http://www.coollive.com.cn/feedback">意见反馈</a>
		</p></dt>
		<dd>Copyright &copy; 2014 coollive.com.cn,All rights reserved. 京ICP备10007097号-2  </dd>
	</dl><div class="pub-scan fr"></div>
</div>
</div>

<?php foreach ($pf_js as $v) { ?>
<?php if(!empty($v)) { ?>
<script src="<?php echo $this->config->item('img2_url').$v; ?>"></script>
<?php } ?>
<?php } ?>
</body>
</html>