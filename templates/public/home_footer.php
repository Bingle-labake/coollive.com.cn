<!--footer begin-->
<?php foreach ($gf_js as $v) { ?>
<script src="<?php echo $this->config->item('img2_url').$v; ?>"></script>
<?php } ?>
<?php foreach ($pf_js as $v) { ?>
<?php if(!empty($v)) { ?>
<script src="<?php echo $this->config->item('img2_url').$v; ?>"></script>
<?php } ?>
<?php } ?>
<!--footer end-->
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
</body>
</html>