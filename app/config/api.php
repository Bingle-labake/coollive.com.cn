<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

###################################################################################
###################################################################################
###################################################################################
#接口编码
$config['video']['charset'] = 'utf-8';
#用户id
$config['video']['user_id'] = '9610FEEDA921B997';
#key
$config['video']['key'] = 'AHQfZOzdWc5YO1WRwWIxAOORtxbfbUuh';
#播放器id
$config['video']['playerid'] = '94567D5CE8782BB0';#'94567D5CE8782BB0';
#批量获取视频信息
$config['video']['api_videos'] = 'http://spark.bokecc.com/api/videos';
#获取⽤用户信息
$config['video']['api_user'] = 'http://spark.bokecc.com/api/user';
#获取视频播放代码
$config['video']['api_playcode'] = 'http://spark.bokecc.com/api/video/playcode';
#删除视频
$config['video']['api_deletevideo'] = 'http://spark.bokecc.com/api/video/delete';
#编辑视频信息
$config['video']['api_editvideo'] = 'http://spark.bokecc.com/api/video/update';
#获取视频信息
$config['video']['api_video'] = 'http://spark.bokecc.com/api/video';
#获取视频分类
$config['video']['api_category'] = 'http://spark.bokecc.com/api/video/category';
#callback
#$config['video']['notify_url'] = 'http://42.120.4.50:8080/space/video/notify';
#$config['video']['notify_url'] = 'http://www.saiku.com.cn/space/video/notify';
$config['video']['notify_url'] = 'http://demo.saiku.com.cn/upload/video/notify';
#视频上传flash
$config['video']['uploader_swf'] = 'http://p.bokecc.com/flash/api/uploader.swf';
###################################################################################
###################################################################################
###################################################################################

// GoCart Theme
$config['theme']			= 'default';

// site logo path (for packing slip)
$config['site_logo']		= '/public/assets/img/logo.png';

//change the name of the admin controller folder 
$config['admin_folder']		= '/sk_admin';

//file upload size limit
$config['size_limit']		= intval(ini_get('upload_max_filesize'))*1024;

//are new registrations automatically approved (true/false)
$config['new_customer_status']	= true;

//do we require customers to log in 
$config['require_login']		= false;

//default order status
$config['order_status']			= 'Pending';

//default Admin Model
$config['model_root']			= 'sk_admin/';//管理后台的模型目录

//default Template
$config['template']			= 'sk_admin';//默认模板：sk_admin; 最新模板：go

//关键词过滤系统
$config['filter_storage'] = array (
		'database' => 'saiku2',
		'table_name' => 'sk_b8_wordlist',
		'host' => '58.68.243.232',
		'user' => 'yh_media',
		'pass' => 'zYGE4nZ4H2eAtz46'
);

//接口效验配置
$config['app'] = array(array('api'=>MD5("api@saiku.com")));

//上传文件配置路径
$config['api']['upload']['config'] = array('root'=>'/public/data/images',
		                                   'default'=>'/public/data/images/temp', 
										   'allow_upload_exts'=>'jpg,gif,png,jpeg',
										   'max_upload'=>3);//3M

$config['api']['upload']['website']     = array("path"=>"/public/data/images/website");
$config['api']['upload']['activity']     = array("path"=>"/public/data/images/activity");
$config['api']['upload']['member_group']     = array("path"=>"/public/data/images/group");
$config['api']['upload']['member_level']     = array("path"=>"/public/data/images/level");
$config['api']['upload']['recommend']     = array("path"=>"/public/data/images/recommend");
$config['api']['upload']['video']     = array("path"=>"/public/data/images/video");
$config['api']['upload']['fragment']     = array("path"=>"/public/data/images/fragment");
$config['api']['upload']['photo']     = array("path"=>"/public/data/images/photo");
$config['api']['upload']['prototype']     = array("path"=>"/public/data/images/prototype");
$config['api']['upload']['magic']        = array("path"=>"/public/data/images/magic");
$config['api']['upload']['star']         = array("path"=>"/public/data/images/star");
$config['api']['upload']['com']         = array("path"=>"/public/data/images/com");



//积分配置分类
$config['credit_group'] = array(1=>array('id'=>1, 'name'=>'初始获得金币'),
		                        2=>array('id'=>2, 'name'=>'日常任务获得金币'),
		                        3=>array('id'=>3, 'name'=>'比赛获得金币'),
		                        4=>array('id'=>4, 'name'=>'使用金币'),
		                        5=>array('id'=>5, 'name'=>'道具'));

//关键词过滤配置
//$config['filter_spam_max'] = 0.884615;//SPAM 垃圾词(值越大，垃圾词的概率就越大)
$config['filter_spam_max'] = 1.0;//SPAM 垃圾词(值越大，垃圾词的概率就越大)
$config['filter_ham_min'] = 0.115385;//HAM  正常词(值越小，词性的就越好)

###################################################################################
###################################################################################
###################################################################################
$config['live']['pub_server'] = "srs.labake.cn";
$config['live']['pub_port'] = 1935;
$config['live']['pub_stream'] = "live";

$config['live']['dvr_path'] = "/public/data/video/live";

$config['live']['hls_server'] = "srs.labake.cn";
$config['live']['hls_port'] = 80;
$config['live']['hls_stream'] = "live";
