<?php $this->load->view('public/common_head.php'); ?>
<div class="my_phone">
    <div class="phone_title"><h2>手机设置</h2></div>
    <div class="phone_cont">
        <dl>
          <?php if (!empty($space['mobile']) && $space['mobilestatus']) { ?>
            <dt><span>您绑定的手机是：  <?php echo $space['mobile']; ?></span><a href="/space/set/mobilemodify">修改号码</a></dt>
            <dd><span>如果不想继续使用该手机，可以</span><a href="/space/set/mobileunbind">解除绑定</a></dd>
         <?php } elseif (!empty($space['mobile']) && !$space['mobilestatus']) { ?>
            <dt><span>您绑定的手机是： </span><input type="button" value="修改号码" /></dt>
         <?php } else { ?>
            <dt><span>您绑定的手机是： </span><input type="button" value="修改号码" /></dt>
            <!--<dd><span>如果不想继续使用该手机，可以</span><input type="button" value="解除绑定" /></dd>-->
         <?php } ?>
        </dl>
    </div>
    
</div>
<!--content end-->
<?php $this->load->view('public/footer.php'); ?>