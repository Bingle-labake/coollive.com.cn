<?php
class Thumpic_lib {
    /**
    *主函数 
    */
    public function thupic($image,$maxw=640,$maxh=640)
    {
        $size = getimagesize($image);
        $width = $size[0];
        $height = $size[1];
        //获取缩放比例
        $scale = $this->getScale($width,$height,$maxw,$maxh);//200为缩小小图的最大高宽
        return $this->resizeImage($image,$width,$height,$scale);
    }
    /**
    *缩略图生成
    */
    function resizeImage($image,$width,$height,$scale) 
    {
        list($imagewidth, $imageheight, $imageType) = getimagesize($image);
        //获取原图信息
        $old_img = pathinfo($image);
        $newthumimg = time()."thum_".$old_img['basename'];//新文件命名
        $imageType = image_type_to_mime_type($imageType);
        $newImageWidth = ceil($width * $scale);//小图宽
        $newImageHeight = ceil($height * $scale);//小图高
        $newImage = imagecreatetruecolor($newImageWidth,$newImageHeight);
        
        switch($imageType) {
            case "image/gif":
                $source=imagecreatefromgif($image); 
                break;
            case "image/pjpeg":
            case "image/jpeg":
            case "image/jpg":
                $source=imagecreatefromjpeg($image); 
                break;
            case "image/png":
            case "image/x-png":
                $source=imagecreatefrompng($image); 
                break;
        }
        imagecopyresampled($newImage,$source,0,0,0,0,$newImageWidth,$newImageHeight,$width,$height);
        switch($imageType) {
            case "image/gif":
                imagegif($newImage,$newthumimg); 
                break;
            case "image/pjpeg":
            case "image/jpeg":
            case "image/jpg":
                imagejpeg($newImage,$newthumimg,90); 
                break;
            case "image/png":
            case "image/x-png":
                imagepng($newImage,$newthumimg);  
                break;
        }
        #chmod($newthumimg, 0777);
        imagejpeg($newImage,NULL);//输出图像
        #return $newthumimg;
    }
    //获取缩放比例
    function getScale($width,$height,$max_width,$max_height){
        if($height>$max_height)
            $scale1 = $max_height/$height;
        else
            $scale1 = 1;
        
        if ($width > $max_width)
            $scale2 = $max_width/$width;
        else
             $scale2 = 1;        
        
        if($scale1 <= $scale2)
            $scale = $scale1;
        else
            $scale = $scale2;
        return $scale;
    }
}