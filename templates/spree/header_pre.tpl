    
<header role="main">
  <div class="stage-width" id="main-header-wrapper">
    <div id="main-header-inner">
      <section role="discovery">
        <div id="search">
          <input class="common-input" id="search_term" name="search_term" placeholder="搜索" type="text" />
          <i class="search-icon"></i>
        </div>
          <a href="#" id="watch-nav" class="header-nav-link">
            <span>观看</span><i id="nav-watch-link" class="header-nav-link nav-down-caret-icon"></i>
          </a>
</section>      
        <a href="/" class="full-header-logo" target="_self"><img alt="酷Live" src="/templates/spree/production/images/pub-bg.png" /></a>
      
      <section role="user-action">
          <button class="spreecast_now create-spreecast-btn" alt="创建 酷LIVE">创建酷LIVE</button>
          <a id="friend-notification-nav-wrapper">
          </a>
  
          <div id="nav_parent" class="main-login-control login-control"><nav id="nav-menu">
          <a id="user_status">
            <img class="small-circle-avatar" src="/templates/spree/production/images/noprofile50.png" alt="labake">
          </a>
          <ul class="menu-options">           
          </ul>
        </nav></div>
      </section>
    </div>
    <div id="flash_container" style="display:none;">
  
</div>
</div>
</header>

<script id="hb-modal-live-contact-header" type="text/x-handlebars-template">
    {{{ modal_header_with_text opts.header opts }}}
</script>

<script id="hb-modal-live-contact-body" type="text/x-handlebars-template">
    <p class="with-no-top-margin">
        {{opts.bodyText}}
    </p>
    <form id="contact-live-form">
        <fieldset>
            <ul>
                <li>
                    <label class="is-visually-hidden" for="title-contact">主题</label>
                    <input id="title-contact" type="text" name="title" placeholder="直播的标题" title="直播的标题" class="common-input" tabindex="1"/>
                </li>

                <li>
                    <div >
                        <div >
                            <img id="pic_name" src="/templates/spree/production/images/noprofile150.png" width="150px" style="display:none" height="150px" id="logo" />
                            <input name="pic_name" placeholder="上传预告封面" title="预告封面" class="common-input" tabindex="1" type="text" id="pic_name" value="" />
                        </div>
                    </div>
                    <div>
                        <span>
                            <input id="logoToUpload" name="logoToUpload" size="20" type="file" onchange="return ajaxFileUpload('pic_name', 'logoToUpload');">
                        </span>
                    </div>
                </li>
                <li>
                    <select class="user-time-zone" id="category-contact" name="category" tabindex="0">
                        <option value="">-选择一个分类-</option>
                        <option value="music&dance">音乐和舞蹈</option>
                        <option value="anchor">主播</option>
                        <option value="curious">八卦</option>
                        <option value="art">艺术</option>
                        <option value="comedy">喜剧</option>
                        <option value="style">风格</option>
                        <option value="family">家庭</option>
                        <option value="food">美食</option>
                        <option value="diy">DIY</option>
                        <option value="outdoor">户外</option>
                        <option value="Arizona">相声</option>
                        <option value="animal">动物</option>
                    </select>
                </li>
                <li>
                    <label class="is-visually-hidden" for="start-time-contact">开始时间</label>
                    <input id="start-time-contact" type="text" name="starttime" placeholder="预计直播的开始时间" title="开始时间" class="common-input" tabindex="2"/>
                </li>
                <li>
                    <label class="is-visually-hidden" for="end-time-contact">结束时间</label>
                    <input id="end-time-contact" type="text" name="endtime" placeholder="预计直播的结束时间" title="结束时间" class="common-input" tabindex="3"/>
                </li>
                <li>
                    <label for="privacy-contact">隐私设置:</label><br />
                    <input class="user-gender" id="privacy_public" name="privacy" type="radio" value="public">
                    <label for="user_gender_male">公开的(所有的用户都可以看)</label><br />
                    <input class="user-gender" id="privacy_unlisted" name="privacy" type="radio" value="unlisted">
                    <label for="user_gender_female">未公开的(未发布，仅仅通过链接查看)</label><br />
                    <input class="user-gender" id="privacy_private" name="privacy" type="radio" value="private">
                    <label for="user_gender_female">私密的(好友圈可以看)</label>
                </li>
                <li>
                    <label class="is-visually-hidden" for="desc-contact">直播的描述:</label>
                    <textarea id="desc-contact" name="desc" rows="5" placeholder="直播的描述(可选)" title="其他的信息" class="common-input" tabindex="7" />
                </li>
            </ul>
        </fieldset>
        <div class="clear error_field" id="top_error"></div>
    </form>
</script>

<script id="hb-modal-live-contact-footer" type="text/x-handlebars-template">
    <section class="modal-action pull-right">
        {{{ modal_footer_submit "提交" }}}
    </section>
</script>

<script id="hb-modal-live-thank-you-header" type="text/x-handlebars-template">
    {{{ modal_header_with_text "提交成功" opts }}}
</script>

<script id="hb-modal-live-thank-you-body" type="text/x-handlebars-template">
    <div class="demo-thanks-container">
        <i class='check-icon'></i>
        <p>{{opts.bodyText}}</p>
    </div>
</script>

<script id="hb-modal-live-thank-you-footer" type="text/x-handlebars-template">
    <section class="modal-action pull-right">
        {{{ modal_footer_confirm "完成" opts.modalId }}}
    </section>
</script>

<script id="hb-modal-demo-thank-you-header" type="text/x-handlebars-template">
    {{{ modal_header_with_text "Demo提交" opts }}}
</script>

<script id="hb-modal-demo-thank-you-body" type="text/x-handlebars-template">
    <div class="demo-thanks-container">
        <i class='check-icon'></i>
        <p>我们的客服待会将会联系你尝试一个Demo.</p>
    </div>
</script>

<script id="hb-modal-demo-thank-you-footer" type="text/x-handlebars-template">
    <section class="modal-action pull-right">
        {{{ modal_footer_confirm "完成" opts.modalId }}}
    </section>
</script>

<script type="text/javascript" src="/public/data/assets/js/ajaxfileupload.js"></script>
<script>
    var isUpload = false;
    var SITE_PATH= "/api/upload" ;

    function ajaxFileUpload(handle, uploadID){
        if(!isUpload) {
            isUpload = true;
            $.ajaxFileUpload({
                url:SITE_PATH+'/prototype?ajax=1&re_type=json&uploadID='+uploadID,
                secureuri:false,
                fileElementId:uploadID,
                dataType: 'json',
                success: function(result){
                    if(result.code > 0) {
                        $('#'+handle).attr("src", result.info.path+'/'+result.info.saveName);
                        $('input[name="'+handle+'"]').val(result.info.saveName);
                        $('#'+handle).css({"display":"block"});
                    }else {
                        alert(result.msg);
                    }
                },
                error: function(){
                    alert(".............");
                }
            });
            isUpload = false;
        }else {
            alert("正在上传中....请稍等！");
        }
        return false;
    }
</script>