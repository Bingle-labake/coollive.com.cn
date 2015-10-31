<?php $this->load->view('public/common_head.php'); ?>
<!--content begin-->
<div class="pub-w">
	<div class="shop_title fY f14px">赛酷网 > <span class="cOrange"><a href="<?php echo $this->config->item['i_url'];?>/space/eshop">积分商城</a></span></div>
    <dl class="shop_tip f14px"><dt class="fl">兑换商品</dl>
    <div class="shop_duih">
    	<ul class="f14px fl">
        	<li>商品名称：<span><?php echo $prize['name'];?></span></li>
            <li>兑换所需积分：<span><?php echo abs($prize['convert_value']);?>积分</span></li>
            <?php 
            if(!empty($prize['right_rate'])) {
            ?>
            <li>准确率：<span><?php echo $prize['right_rate'];?>%</span></li>
            <?php 
            }
            ?>            
            <li>目前积分数量：<span><?php echo $my_rater_credit;?>积分</span></li>
        </ul>
        <div class="fr"><img src="<?php echo $this->config->item("img3_url")."/images/prize/".$prize['pic_name'];?>" height="280" alt="<?php echo $prize['name'];?>" ></div>
    </div>
    <div class="shop_tel f14px">
    	<h2>填写邮寄地址：(<font color="red">该收货信息和联系方式请如实填写，我们会按照您填写的信息进行发货。</font>)</h2> 
    	<dl class="exp_title">
        	<dt>收货人信息</dt>
            <dd></dd>
        </dl>   	
        <?php 
        if($exp_addr_list) {       
            foreach($exp_addr_list as $exp_arr) {?>
        <dl id="exp_<?php echo $exp_arr['id'];?>">
        	<dt><label><input type="radio" name="exp_addr_id" value="<?php echo $exp_arr['id'];?>"  /> <?php echo $exp_arr['exp_username'];?></label></dt>
            <dd><span><?php echo $exp_arr['city'];?><?php echo $exp_arr['area'];?><?php echo $exp_arr['address'];?>  <?php echo $exp_arr['mobile'];?></span><a class="cBlue edit" href="javascript:void(0);" data-val="<?php echo $exp_arr['id'];?>">编辑</a><a class="cBlue remove" href="javascript:void(0);" data-val="<?php echo $exp_arr['id'];?>">删除</a></dd>
        </dl>
        <?php 
            }
        }?>
    	
    </div>
    <div class="shop_edit">
    	<dl>
        	<dt><span class="cRed">*</span>收货人：</dt>
            <dd><input type="text" name="username" style="width:240px;" /></dd>
        </dl>
    	<dl>
        	<dt><span class="cRed">*</span>所在地区：</dt>
            <dd>
                <select id="loc_province" name="province" style="width:80px;"></select>
                <select id="loc_city" name="city" style="width:100px;"></select>
                <select id="loc_town" name="area" style="width:120px;"></select>                
            </dd>
        </dl>
    	<dl>
        	<dt><span class="cRed">*</span>详细地址：</dt>
            <dd class="address"><span class="c_province">北京市 </span><span class="c_city">北京市 </span><span class="c_area">北京市 </span><input type="text" name="address" style="width:328px;" /></dd>
        </dl>
    	<dl>
        	<dt><span class="cRed">*</span>手机号码：</dt>
            <dd><input type="text" name="mobile" /> 或 固定电话： <input type="text" name="phone" /></dd>
        </dl>
    	<dl>
        	<dt>邮箱：</dt>
            <dd><input type="text" name="email" /></dd>
        </dl>
        
        <dl>
        	<dt>&nbsp;</dt>
            <dd><input type="hidden" name="exp_id" value=0 /><a class="cBlue save_exp" href="javascript:void(0);">保存收货人信息</a></dd>
        </dl>
    </div>
    
    <div class="win-but" style="width:480px;text-align:center;height:80px;margin:0 auto;"><input type="hidden"  name="ex_prize" value="<?php echo $prize['vg_ide'];?>" /><a href="javascript:void(0)" id="tijiao" class="ex_prize_btn">提交</a></div>
</div>


<script>
        
var is_sub = false;
$(document).ready(function() {
	showLocation();
});
        
$(function(){
$('#loc_province').change(function() {
	$('.address .c_province').html($(this).find('option:selected').text());
});
$('#loc_city').change(function() {
	$('.address .c_city').html($(this).find('option:selected').text());
});

$('#loc_town').change(function() {
	$('.address .c_area').html($(this).find('option:selected').text());
});

function clean_form() {
	$('input[name="username"]').val('');
    $('select[name="province"] option:first').attr("selected","selected");
    $('select[name="city"] option:first').attr("selected","selected");
    $('select[name="area"] option:first').attr("selected","selected");
    $('input[name="address"]').val('');
    $('input[name="mobile"]').val('');
    $('input[name="phone"]').val('');
    $('input[name="email"]').val('');
    $('input[name="exp_id"]').val(0);
}

$('dd .remove').click(function() {
	var exp_id = $(this).data('val');
	if(exp_id>0) {
		var url = "/space/credit/exp_addr/remove";    
	    $.ajax({
	  	  type: 'POST',
	  	  url: url,
	  	  data: {exp_id:exp_id},
	  	  success: function(res) {
	          if(res.code>0) {
	              $('#exp_'+exp_id).remove();
	          }else {
	              alert(res.error);
	          }
	  	  },
	  	  dataType: 'json'
	  	});
	}
});

$('dd .edit').click(function() {
	var exp_id = $(this).data('val');
	if(exp_id>0) {
		var url = "/space/credit/exp_addr/edit";    
	    $.ajax({
	  	  type: 'POST',
	  	  url: url,
	  	  data: {exp_id:exp_id},
	  	  success: function(res) {
	          if(res.code>0) {
	        	  $('input[name="username"]').val(res.exp.exp_username);	        	 
	        	  $('input[name="address"]').val(res.exp.address);
	        	  $('input[name="mobile"]').val(res.exp.mobile);
	        	  $('input[name="phone"]').val(res.exp.phone);
	        	  $('input[name="email"]').val(res.exp.email);
	        	  $('input[name="exp_id"]').val(exp_id);

	        	  $('select[name="province"] option:first').text(res.exp.province);
	        	  $('.address .c_province').html(res.exp.province);
	        	  $('select[name="city"] option:first').text(res.exp.city);
	        	  $('.address .c_city').html(res.exp.city);
	        	  $('select[name="area"] option:first').text(res.exp.area);
	        	  $('.address .c_area').html(res.exp.area);
	          }else {
	              alert(res.error);
	          }
	  	  },
	  	  dataType: 'json'
	  	});
	}
});


$('.save_exp').click(function() {
	var param = {};
	var exp_id = $('input[name="exp_id"]').val();

	var name = $('input[name="username"]').val();
    var province = $('select[name="province"]').find('option:selected').text();
    var city = $('select[name="city"]').find('option:selected').text();
    var area = $('select[name="area"]').find('option:selected').text();
    var address = $('input[name="address"]').val();
    var mobile = $('input[name="mobile"]').val();
    var phone = $('input[name="phone"]').val();
    var email = $('input[name="email"]').val();
    
    if(name == '' || name.length >32)
    {
        alert("请填写真实的收货人的姓名！");
        return false;
    }
    if(province == '')
    {
    	alert("请选择省份！");
        return false;
    }
    if(address == ''|| address.length >256)
    {
    	alert("请填写收件人的地址！");
        return false;
    }
    if(mobile == '' && phone == '')
    {
    	alert("请填写一个联系方式！");
        return false;
    }
    param.name = encodeURIComponent(name, "utf-8");
    param.address = encodeURIComponent(address, "utf-8");
    param.province = encodeURIComponent(province, "utf-8");   
    param.city = encodeURIComponent(city, "utf-8"); 
    param.area = encodeURIComponent(area, "utf-8");   
    param.mobile = mobile;   
    param.phone = phone;   
    param.email = email;     
	if(exp_id>0) {
		param.exp_id = exp_id; 
		var url = "/space/credit/exp_addr/update";    
	    $.ajax({
	  	  type: 'POST',
	  	  url: url,
	  	  data: param,
	  	  success: function(res) {
	          if(res.code>0) {	              
	              $('#exp_'+exp_id).html(res.html);
	              clean_form();
	          }else {
	              alert(res.error);
	          }
	  	  },
	  	  dataType: 'json'
	  	});
	}else {
	    var url = "/space/credit/exp_addr/add";    
	    $.ajax({
	  	  type: 'POST',
	  	  url: url,
	  	  data: param,
	  	  success: function(res) {
	          if(res.code>0) {
	              $('input[type="radio"]').attr("checked",false);
	              $(res.html).find('input').attr("checked",true);
	              $('.exp_title').append(res.html);
	              clean_form();
	          }else {
	              alert(res.error);
	          }
	  	  },
	  	  dataType: 'json'
	  	});
	}
	
	
});

function exchange_prize() {
	var param = {};
	var prize_ide = $('input[name="ex_prize"]').val();
	var exp_id = $('input[type="radio"]:checked').val();
	
	if(exp_id !=  "undefined" && exp_id>0) {
		param.exp_id = exp_id;
	}else {
		var name = $('input[name="username"]').val();
	    var province = $('select[name="province"]').find('option:selected').text();
	    var city = $('select[name="city"]').find('option:selected').text();
	    var area = $('select[name="area"]').find('option:selected').text();
	    var address = $('input[name="address"]').val();
	    var mobile = $('input[name="mobile"]').val();
	    var phone = $('input[name="phone"]').val();
	    var email = $('input[name="email"]').val();
	    
	    if(name == '' || name.length >32)
	    {
	        alert("请填写真实的收货人的姓名！");
	        return false;
	    }
	    if(province == '')
	    {
	    	alert("请选择省份！");
	        return false;
	    }
	    if(address == ''|| address.length >256)
	    {
	    	alert("请填写收件人的地址！");
	        return false;
	    }
	    if(mobile == '' && phone == '')
	    {
	    	alert("请填写一个联系方式！");
	        return false;
	    }
	    param.name = encodeURIComponent(name, "utf-8");
	    param.address = encodeURIComponent(address, "utf-8");
	    param.province = encodeURIComponent(province, "utf-8");   
	    param.city = encodeURIComponent(city, "utf-8"); 
	    param.area = encodeURIComponent(area, "utf-8");   
	    param.mobile = mobile;   
	    param.phone = phone;   
	    param.email = email;  
	}

	is_sub = true
	var url = "/space/credit/ex_prize/"+prize_ide;    
    $.ajax({
  	  type: 'POST',
  	  url: url,
  	  data: param,
  	  success: function(res) {
          if(res.code>0) {
              window.location.href = "/space/credit/shoping_list";
          }else {
              alert(res.error);
          }
          is_sub = false;
  	  },
  	  dataType: 'json'
  	});
}

var tijiao = $("#tijiao");
tijiao.click(function(event){
var tanc = $.layer($("#shop_tij").html());

tanc.find("a.quedg").click(function(){
		if(!is_sub) {
			exchange_prize();	
		}else {
            alert("请稍等....或刷新页面之后重新提交.");
		}			
	});
});

})
</script>
<script type="text/tcl" id="shop_tij">
<div class="win-tan" style="width:500px;">
	<h2 style="margin:0px;"><span class="win-close" onClick="$.layer();"></span>兑换并提交邮寄地址</h2>
    <dl>
    	<dt><p class="fY f16px cOrange">您确定要兑换该商品吗？</p><p style="padding:0 20px;">如兑换，将扣除该商品的兑换积分，扣除的积分无法退回，兑换成功后，请您留意我们为您寄出的快递，快递公司是顺丰，快递单号请在个人中心-站内信查询</p></dt>
        <dd class="win-but"><a href="" onClick="$.layer();">取消</a><a class="quedg" href="javascript:void(0);">确定</a></dd>
    </dl>
</div>
</script>

<!--content end-->
<?php $this->load->view('public/footer.php'); ?>