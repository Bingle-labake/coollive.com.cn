<!DOCTYPE>
<html>
<head>
	<title>视频</title>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" href="/public/assets/css/style.css" type="text/css" media="all" />
	<!--[if IE 6]>
		<link rel="stylesheet" href="/public/assets/css/ie6.css" type="text/css" media="all" />
	<![endif]-->
	<script type="text/javascript" src="/public/assets/js/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="/public/assets/js/jquery-func.js"></script>
</head>
<body>
<!-- Shell -->
<div id="shell">
	<!-- Header -->
	<div id="header">
		<h1 id="logo"><a href="#">主页</a></h1>
		<div class="social">
			<span>订阅:</span>
			<ul>
			    <li><a class="rss" href="#">rss</a></li>
                <li><a class="rss" href="#">rss</a></li>
                <li><a class="rss" href="#">rss</a></li>
                <li><a class="rss" href="#">rss</a></li>
			</ul>
		</div>
		
		<!-- Navigation -->
		<div id="navigation">
			<ul>
			    <li><a class="active" href="/">主页</a></li>
			    <li><a href="/space/video/upvideo">上传视频</a></li>
			</ul>
		</div>
		<!-- end Navigation -->
		
		<!-- Sub-menu -->
		<div id="sub-navigation">
			<ul>
			    <li><a href="/space/video/index">视频首页</a></li>
			    <li><a href="#">最新视频</a></li>
			    <li><a href="#">最热</a></li>
			    <li><a href="#">最多评论</a></li>
			</ul>
			<div id="search">
				<form action="" method="get" accept-charset="utf-8">
					<label for="search-field">搜索</label>					
					<input type="text" name="search field" value="标题/标签" id="search-field" title="Enter search here" class="blink search-field"  />
					<input type="submit" value="查询" class="search-button" />
				</form>
			</div>
		</div>
		<!-- end Sub-Menu -->
		
	</div>
	<!-- end Header -->
	
	<!-- Main -->
	<div id="main">
		<!-- Content -->
		<div id="content">
            <?php if($category) foreach($category as $k=>$v){ ?>
			<!-- Box -->
			<div class="box">
				<div class="head">
					<h2><?php echo $v['category'];?></h2>
					<p class="text-right"><a href="/space/video/videolist/<?php echo $v['category'];?>/<?php echo $v['cid'];?>">更多</a></p>
				</div>

				<!-- Movie -->
                <?php if($video)foreach($video[$v['cid']] as $key=>$value){ ?>
				<div class="movie">
					<div class="movie-image">
						<a href="/video/play/<?php echo $value['vid']?>" target="_blank"><span class="play"></span><img src="<?php echo $value['image']?>" alt="movie" /></a>
					</div>
					<div class="rating">
						<p><a href="/video/play/<?php echo $value['vid']?>" target="_blank"><?php echo $value['title']?></a></p>
					</div>	
					<div class="rating">
						<p>得分</p>
						<div class="stars">
							<div class="stars-in"></div>
						</div>
						<!--<span class="comments">12</span>-->
					</div>
				</div>
                <?php } ?>
				<!-- end Movie -->
				<div class="cl">&nbsp;</div>
			</div>
            <?php } ?>
			<!-- end Box -->
		</div>
		<!-- end Content -->


	<!-- Footer -->
	<div id="footer">
		<p>
			<a href="#">首页</a> <span>|</span>
			<a href="#">最新</a> <span>|</span>
		</p>
		<p> &copy; 2013 京ICP证030173号<a href="/" title="网站首页">首页</a></p>
	</div>
	<!-- end Footer -->
</div>
<!-- end Shell -->
</body>
</html>