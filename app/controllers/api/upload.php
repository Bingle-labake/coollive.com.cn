<?php

class Upload extends Api_Controller { 
	private $upload_config = array();
	private $api_config = array();
	protected $legal_path = array('com', 'signinfo', 'video');//根目录/public/data/images
	private $video_ext = array('avi', 'mov','wma','rmvb','rm','flash','mp4','mid','3GP','asf','asx','ram','mpg','mpeg','mpe','vob','dat','mp4v','m4v','mkv','f4v','mts', '', '');
	
	function __construct() {
		parent::__construct();			
		$this->load->library('vars_lib');		
		$this->upload_config = $this->vars_lib->variable['upload'];
		$this->api_config = $this->config->item("api");
	}
	
	/*
	 *初始化upload_lib
	*
	*
	*/	
	private function init_upload() {
		$this->load->library('upload_lib');
		
		if(!empty($this->upload_config['allow_upload_exts'])) {
			$this->upload_lib->setFileformat(explode(",", $this->upload_config['allow_upload_exts']));
		}else {
			$upload_config = $this->api_config['upload']['config'];
			$allow_upload_exts = $upload_config['allow_upload_exts'];
			$this->upload_lib->setFileformat(explode(",", $allow_upload_exts));
		}
		if(!empty($this->upload_config['max_upload'])) {
			$max_size = intval($this->upload_config['max_upload']);//M
			$max_size = $max_size*1024*1024; //$max_size M
			$this->upload_lib->setMaxsize($max_size);//3M
		}else {
			$upload_config = $this->api_config['upload']['config'];
			$max_size = intval($upload_config['max_upload']);
			$max_size = $max_size*1024*1024; //$max_size M
			$this->upload_lib->setMaxsize($max_size);//3M
		}
	}
	
	/*
	 *上传图片(jQuery ajaxfileupload.js)
	* @paras string $uploadID   上传文件表单名
	* @paras string $path       保存目录
	*
	*/	
	public function comm($path = "com") {
		$uploadID = $this->input->get_post('uploadID');
		if(in_array($path, $this->legal_path)) {
			if(isset($this->api_config['upload'][$path])) {
				$appPath = $this->api_config['upload'][$path]['path']."/";
			}else {
				$appPath = "/public/data/images/".$path."/";
			}			
			$this->common_upload($uploadID, $appPath);
		}else {
			$this->echo_api(-1, "登录超时或尚未登录.");
		}		
	}
	
	/*
	 *上传图片(jQuery ajaxfileupload.js)
	* @paras string $appPath    保存目录(非必须)
	*
	*/	
	private function common_upload($uploadID, $appPath = "/public/data/images/com/") {		
		//初始化配置
		$this->init_upload();
		$savePath = FCPATH.$appPath;
		if(empty($uploadID)) {
			$this->echo_api(-3, "上传文件的标示为空");	
		}else {
			makeDirectory($savePath); 	
			$this->upload_lib->setSavepath($savePath);
			$up_result = $this->upload_lib->run($uploadID, 1);	

			if($up_result) {
				$img_info = $this->upload_lib->returninfo;				
				$img_info['path'] = $appPath;
				
				$this->echo_api(1, $img_info);				
			}else {
				$this->echo_api(-2, "上传失败.");
			}
		}
	}
	
	
	/*
	 *上传表单图片(一般模式)
	* @paras string $f_filename 表单文件名
	* @paras string $newname    文件重命名(非必须)
	* @paras string $dirname    保存目录(非必须)
	* 
	*/
	public function pic(){
		if(!$this->checkAPI()) {
			$this->echo_api(-1, "无效请求.");
		}
		
		$input_name = $this->input->post('f_filename',true);
		$newName    = $this->input->post('newname',true);
		$dirname    = $this->input->post('dirname',true);
		
		$upload_config = $this->api_config['upload']['config'];
		
		if(!empty($this->upload_config['allow_upload_exts'])) {
			$fileFormat = explode(",", $this->upload_config['allow_upload_exts']);
		}else {			
			$allow_upload_exts = $upload_config['allow_upload_exts'];				
			$fileFormat = explode(",", $allow_upload_exts);
		}
		if(!empty($this->upload_config['max_upload'])) {
			$max_size = intval($this->upload_config['max_upload']);//M
			$maxSize = $max_size*1024*1024; //$max_size M
		}else {			
			$max_size = intval($upload_config['max_upload']);
			$maxSize = $max_size*1024*1024; //$max_size M
		}		
		
		//覆盖原有文件吗？ 0 不允许  1 允许
		$overwrite = 1;		
		if(empty($newName)) {
			$newName = date("YmdHis")."".rand(10000, 99999); 
		}
		//初始化上传类
		$this->load->library('uploadclass');
		if(empty($dirname)) {
			$dirname = "com";
		}
		$baseUrl = $upload_config['root']. '/'.$dirname.'/';
		$this->uploadclass->makeDirectory($baseUrl);
		
		$this->uploadclass->UploadImg($baseUrl, $fileFormat, $maxSize, $overwrite);		
		$result = $this->uploadclass->run($input_name,1,$newName);		
		if ($result == 1){
			$pic = $this->uploadclass->getInfo();
			$this->echo_api(1, $pic);
		}else {
			$this->echo_api(-1, $result);
		}
	}
	
	/**
	 * 客户端视频上传
	 * 上传文件大小,需修改以下参数
	 * max_input_time=60
	 * max_execution_time=0
	 * post_max_size=100M
	 * upload_max_filesize=100M
	 */
	public function video(){
		set_time_limit(0);
		
		$upload_config = $this->api_config['upload']['config'];
		$video_save_dir = $upload_config['root'].DIRECTORY_SEPARATOR.'apicloud'.DIRECTORY_SEPARATOR;		
		$video_save_dir = FCPATH.$video_save_dir;
		if (!is_dir($video_save_dir)) {
			mkdir($video_save_dir,0777,true);
			chmod($video_save_dir, 0777);
		}
		
		list($filename,$ext) = explode('.', $_FILES['file']['name']);//解决中文文件名乱码问题
		$rename_file = md5($filename).'_'.time().'.'.$ext;
		$filepath = $video_save_dir.$rename_file;
		if (move_uploaded_file($_FILES['file']['tmp_name'], $filepath)) {
			$this->echo_api(1,array('file'=>$rename_file,'msg'=>'上传成功'));
		}else {
			$this->echo_api(-1,'上传失败.');
		}
	}
	
	/**
	 * 客户端视频上传
	 * 上传文件大小,需修改以下参数
	 * max_input_time=60
	 * max_execution_time=0
	 * post_max_size=100M
	 * upload_max_filesize=100M
	 */
	function input_video($ext = "3gp") {
		$base_path = FCPATH.DIRECTORY_SEPARATOR ."public".DIRECTORY_SEPARATOR ."data".DIRECTORY_SEPARATOR ."apicloud"; //接收文件目录
	
		if(!file_exists($base_path)) {
			mkdir($base_path);
			chmod($base_path,0777);
		}
		$xmlstr = file_get_contents('php://input');
		if(empty($ext)) {
			$ext = "3gp";
		}
		$filename = date("ymdHis") . "_". mt_rand(1000, 9999). ".$ext";
	
		$flag = false;
		$data = $xmlstr;
		$file = fopen($base_path . DIRECTORY_SEPARATOR  . $filename, "w");
		$flag = fwrite($file, $xmlstr);
		fclose($file);	
		if ($flag) {
			$array = array ("code" => "1", "message" => $base_path . DIRECTORY_SEPARATOR  . $filename);
			$this->echo_api(1,$array);
		} else {
			$this->echo_api(-2,"上传失败.");
		}		
	}
	
	/*
	 *将网络图片下载到临时目录
	*src:string 网络图片路径
	*return:array()
	*/
	public function temp() {
		$appPath  = $this->api_config['upload']['temp']['path']."/";
		$savePath = FCPATH.$appPath;
		makeDirectory($savePath);
	
		$img_src = urldecode($this->input->get('src'));
		$save_name = "tbk_".mktime()."_".mt_rand (1000,9999);
		$savePath = $savePath.$save_name;
	
		$download_info = downloadImage($img_src, $savePath);
	
		if(is_array($download_info)) {
			$images = $this->ImageServers_model->getDataModel();
				
			$save_name = $download_info['filename'];
			$images['filename'] = $save_name;
			$images['path'] = $appPath;
			$images['w'] = $download_info['width'];
			$images['h'] = $download_info['height'];
			$images['size'] = $download_info['size'];
			$images['type'] = $download_info['mime'];
			$images['time'] = mktime();
				
			$this->my_result(1, "上传成功");
			$this->code['info'] = $images;
		}else {
			$this->my_result(-1, "上传失败");
		}
		$data = $this->code;
		$this->echo_api(1, $data);
	}
}

?>