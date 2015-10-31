<?php 
error_reporting(E_ALL & ~E_NOTICE & ~E_STRICT);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" charset="UTF-8" content="text/html; charset=<?php echo $spark_config['charset']?>">
<title>上传视频 demo</title>
<style type="text/css">
.fla_btn {
	position: relative;
}
.fla_btn embed {
	position: absolute;
	z-index: 1;
}
.input{
    vertical-align: middle;
    padding: 4px 8px;
    margin: 0px;
    font-size: 14px;
    color: rgb(85, 85, 85);
    background: none repeat scroll 0% 0% rgb(255, 255, 255);
    outline: medium none;
    border: 1px solid rgb(153, 153, 153);
    box-shadow: 1px 1px 3px rgb(195, 195, 195) inset;
    margin: 10px 5px;
    width: 300px; 
}
.category{
    border: 1px solid rgb(153, 153, 153);
    color: rgb(85, 85, 85);
    background: none repeat scroll 0% 0% rgb(255, 255, 255);
    margin: 10px 5px;
}
#description{
    border: 1px solid rgb(153, 153, 153);
    color: rgb(85, 85, 85);
    background: none repeat scroll 0% 0% rgb(255, 255, 255);
    margin: 10px 5px;
}
#swfDiv{*position:absolute; z-index:2;}
.upbody{margin: 0 auto;width:600px;height: 520px;}
</style>
<link rel="stylesheet" href="/public/assets/css/style.css" type="text/css" media="all" />
	<!--[if IE 6]>
		<link rel="stylesheet" href="/public/assets/css/ie6.css" type="text/css" media="all" />
	<![endif]-->
<script type="text/javascript" src="/public/assets/js/swfobject.js"></script>
<script type="text/javascript" src="/public/assets/js/jquery-1.7.2.min.js"></script>
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
		<div class="social">
			<span>用户名:<a  href="/space/member"><?php echo $uname; ?></a></span>
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
<div class="upbody">
<h1>上传视频</h1>
<hr />

<form id="addvform" name="addvform" action="" method="get"	onsubmit="alert('提交视频');">
<div class="fla_btn"><span style="float:left;">选择视频：<input class="input" id="videofile" name="videofile" type="text" /></span> 
<div style="float:left; position:relative; width:80px; height:25px;">
	<div id="swfDiv" style="width:80px;height:25px;position:absolute;z-index:2;"></div>
	<input type="button" class="input"  value="选择视频"	id="btn_width" style="width:80px;height:25px;position:absolute;z-index:1;" />
</div>
<div style="clear:both;">视频标题：<input class="input" id="title" name="title" type="text" /></div> 
<div>视频标签：<input class="input" id="tag" name="tag" type="text" /></div> 
<div>视频分类：
    <select style="width: 100px;" name="categoryid" id="categoryid" class="category">
    <?php foreach($category as $key=>$value)
    {
        ?>
        <option value="<?php echo $value["id"]?>"><?php echo $value["name"]?></option>
        <?php
    }
    ?>
    </select>
</div>
<div><div style=" float: left;padding-right: 35px;">简介:</div> <div style="float: left;"><textarea id="description" name="description" rows="5" cols="55"></textarea></div></div> 
<br />
<div style="width: 600px; float: left;">
<input id="videoid" name="videoid" type="hidden" value="" /> 
<input id="uid" type="hidden" name="uid" value="<?php echo $uid; ?>"/>
<input id="uname" type="hidden" name="uname" value="<?php echo $uname; ?>"/>
<div style="padding-left: 240px;"><input style="width: 100px;height: 40px;" type="button" value="提交" onclick="submitvideo();" /></div> 

<br />
<hr />
<div><div id="upview" style="width: 0px; height: 30px;background-color: #0080C0;">&nbsp;</div></div>
<div>上传进度：<div id="up" style="width: 600px; height: 30px;padding-left: 270px;"></div></div>
<div>文件大小：<span id="videosize"></span></div>
<div>消息：<span id="add_data"></span></div>

<!--<div>请求地址：<span id="request_params"></span></div>
videoid:<div id="videoidshow"></div>
<div id="upload_progress" style="display: none;">
  	<div class="progress">
        <div id="inner" style="width: 0%;" aria-valuemax="100" aria-valuemin="0" aria-valuenow="40" role="progressbar" class="progress-bar progress-bar-success">
        </div>
    </div>
</div>
-->
</div>
</form>
</div>
<script type="text/javascript">
// 加载上传flash ------------- start
var swfobj=new SWFObject('<?php echo $spark_config['uploader_swf']; ?>', 'uploadswf', '80', '25', '8');
swfobj.addVariable( "progress_interval" , 1);	//	上传进度通知间隔时长（单位：s）
swfobj.addVariable( "notify_url" , '<?php echo $spark_config['notify_url']; ?>');	//	上传视频后回调接口
swfobj.addParam('allowFullscreen','true');
swfobj.addParam('allowScriptAccess','always');
swfobj.addParam('wmode','transparent');
swfobj.write('swfDiv');
// 加载上传flash ------------- end

//-------------------
//调用者：flash
//功能：选中上传文件，获取文件名函数
//时间：2010-12-22
//说明：用户可以加入相应逻辑
//-------------------
function on_spark_selected_file(filename,filesize) {
	document.getElementById("videofile").value = filename;
    filesize = parseInt(filesize);
    var videosize = '0B';
    if(filesize >= 1024 && filesize < 1043576)
    {
        videosize = RoundNumber(filesize/1024,2)+'KB';
    }else if(filesize > 1048576 && filesize < 1073741824)
    {
        videosize = RoundNumber(filesize/1048576,2)+'MB';
    }else if(filesize >= 1073741824)
    {
        videosize = RoundNumber(filesize/1073741824,2)+'GB';
    }else{
        videosize = filesize+'B';
    } 
    document.getElementById("videosize").innerHTML = videosize;
}
function RoundNumber(num, pos)  
{  
    return Math.round(num * Math.pow(10, pos)) / Math.pow(10, pos);  
}  

//-------------------
//调用者：flash
//功能：验证上传是否正常进行函数
//时间：2010-12-22
//说明：用户可以加入相应逻辑
//-------------------
function on_spark_upload_validated(status, videoid) {
	if (status == "OK") {
		//alert("上传正常,videoid:" + videoid);
        submitvideoinfo(videoid);
		document.getElementById("videoid").value = videoid;
		//document.getElementById("videoidshow").innerHTML = videoid;
	} else if (status == "NETWORK_ERROR") {
		alert("网络错误");
	} else {
		alert("api错误码：" + status);
	}
}

//-------------------
//调用者：flash
//功能：通知上传进度函数
//时间：2010-12-22
//说明：用户可以加入相应逻辑
//-------------------
function on_spark_upload_progress(progress) {
	var uploadProgress = document.getElementById("up");
	if (progress == -1) {
		uploadProgress.innerHTML = "上传出错：" + progress;
	} else if (progress == 100) {
		uploadProgress.innerHTML = "100% 上传完成";
        document.getElementById("upview").style.width = "600px";
	} else {
		uploadProgress.innerHTML =  progress + "%";
        document.getElementById("upview").style.width = 6*progress+"px";
	}
}
/*
$("#upload_progress").show();
	if(progress==100){
		$("#inner").css({width:"100%"});
		$("#upload_prompt").html("上传完成100%");
	}else if(progress<0){
		$("#upload_prompt").html("上传出错");
	}else if(progress<100){
		$("#upload_prompt").html("进度： " + progress+ "%");
		$("#inner").css({
			width:progress+"%"
		});
	}
*/
function positionUploadSWF() {
	document.getElementById("swfDiv").style.width = document
			.getElementById("btn_width").style.width;
	document.getElementById("swfDiv").style.height = document
			.getElementById("btn_width").style.height;
}
function submitvideo() {
    var videofile = document.getElementById("videofile").value;
	var title = encodeURIComponent(document.getElementById("title").value, "utf-8");
	var tag = encodeURIComponent(document.getElementById("tag").value, "utf-8");
	var description = encodeURIComponent(document.getElementById("description").value, "utf-8");
    var categoryid = encodeURIComponent(document.getElementById("categoryid").value, "utf-8");
	var url = "/space/video/getuploadurl?title=" + title + "&tag=" + tag + "&description=" + description + "&categoryid=" + categoryid;
    $.get(url, function(data){
        var jsondata = jQuery.parseJSON(data);
        {
            document.getElementById("uploadswf").start_upload(jsondata.re); //	调用flash上传函数
            //document.getElementById("request_params").innerHTML = jsondata.re;
        }
        
    });
}
function submitvideoinfo(videoid) {
	var title = encodeURIComponent(document.getElementById("title").value, "utf-8");
	var tag = encodeURIComponent(document.getElementById("tag").value, "utf-8");
	var description = encodeURIComponent(document.getElementById("description").value, "utf-8");
    var categoryid = encodeURIComponent(document.getElementById("categoryid").value, "utf-8");
    var uid = encodeURIComponent(document.getElementById("uid").value, "utf-8");
    var uname = encodeURIComponent(document.getElementById("uname").value, "utf-8");
	var url = "/space/video/submitvideoinfo?title=" + title + "&tag=" + tag + "&description=" + description + "&vid=" + videoid + "&categoryid=" + categoryid+ "&uid=" + uid+ "&uname=" + uname;
    if(title != '' && tag != '' && description != '' && categoryid != '' && uid != '' && uname != '')
    {
        $.get(url, function(data){
            var jsondata = jQuery.parseJSON(data);
            if(jsondata.status)
            {
                document.getElementById("add_data").innerHTML = "添加视频信息成功";
            }
            else
            {
                document.getElementById("add_data").innerHTML = '视频信息入库失败';
            }
        });
    }else{
        document.getElementById("add_data").innerHTML = '视频信息不能为空';
    }
}

function findSize(field_id)
{
    var fileInput = $("#"+field_id)[0];  
    byteSize  = fileInput.files[0].fileSize;
    return ( Math.ceil(byteSize / 1024) ); // Size returned in KB.
}
    


</script>
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