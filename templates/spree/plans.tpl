
<!DOCTYPE html>
<html>
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# spreecast: http://ogp.me/ns/fb/spreecast#">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />


    <!--[if lte IE 9]>

    <script type="text/javascript">
      window.location.href = '/upgrade';
    </script>

    <![endif]-->


  <meta content="Spreecast" name="title" /><meta content="Spreecast is the social video platform that connects people through conversation." name="description" /><meta content="social, video, media, online, face-to-face, chat, broadcast, talk show, news, network, platform" name="keywords" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" >
  <meta http-equiv="X-UA-Compatible" content="requiresActiveX=true" />
	<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans:600,400,300" />
  <script type="text/javascript">


/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  this.Class = function(){};

  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init ){
        this.init.apply(this, arguments);

        if (this.mixinInitializations){
          for (index in this.mixinInitializations){
            this.mixinInitializations[index](this);
          }
        }
      }
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    //Chris: mixin instance methods
    Class.addMixin = function(mixin) {
      var self = this;
      for (var prop in mixin) {
        if (!mixin.hasOwnProperty(prop) || prop === 'init') { continue; }
        //augment existing functions of the same name
        if (this.prototype[prop] && (typeof(mixin[prop] === 'function') && typeof(this.prototype[prop] === 'function'))) {
          (function() {
            var funcName = prop;
            var classFunction = self.prototype[funcName];
            var mixinFunction = mixin[funcName];
            self.prototype[funcName] = function() {
              mixinFunction.apply(this, arguments);
              classFunction.apply(this, arguments);
            };
          })();
        }
        else {
          this.prototype[prop] = mixin[prop];
        }
      }
      if (mixin.init) {
        if (!this.prototype.mixinInitializations){ this.prototype.mixinInitializations = []; }
        this.prototype.mixinInitializations.push(mixin.init);
      }
    }

    return Class;
  };
})();


/// Remember blocks of code that need to get executed once the page is fully ready.
var DeferLoad = Class.extend({
  init: function() {
    this.data = {};
    this.excludes = {};
    this.loading = {};
    this.loaded = {};
  }
  ,exclude: function(name) {
    this.excludes[name] = 1;
  }
  ,include: function(name) {
    delete this.excludes[name];
  }
  ,register: function(name, url, initter, tester) {
    if (!this.data[name]) {
      this.data[name] = [];
    }
    this.data[name].push({
      url: url,
    initter: initter,
    tester: tester == null ? function() { return true; } : tester
    });
  }
  ,trigger: function(name) {
    if (this.data[name] && !this.excludes[name]) {
      for (var i = 0; i < this.data[name].length; i++) {
        var d = this.data[name][i];

        // If the script is already loaded, or if there's no url, just run the initter.
        if (!d.url || this.loaded[d.url]) {

          if (d.initter) {
            var runtest = function() {
              if (d.tester()) {
                d.initter();
              }
              else {
                window.setTimeout(runtest, 1000);
              }
            }
            runtest();
          }
        }
        // If the script isn't yet loading, start loading it. Save away the initter.
        else {
          if (!this.loading[d.url]) {
            this.loading[d.url] = true;
            var self = this;
            $.getScript(d.url, function() {
              for (var j = 0; j < self.data[name].length; j++) {
                if (self.data[name][j].initter) {
                  if (self.data[name][j].tester()) {
                    self.data[name][j].initter();
                  }
                  else {
                    window.setTimeout(runtest, 1000);
                  }
                }
              }
              delete self.loading[d.url];
              self.loaded[d.url] = true;
            });
          }
        }
      }
    }
  }
  ,triggerAll: function() {
    for (var name in this.data) {
      this.trigger(name);
    }
  }
});
window.deferLoad = new DeferLoad();


// Disable the console.
try {
    console.log('Initializing console ... done');
} catch(e) {
    console = {};
    var methods_to_kill = ['dir', 'error', 'info', 'log', 'warn'];
    for (i in methods_to_kill) {
      console[methods_to_kill[i]] = function(){};
    }
}

// Initialize Chartbeat.
var _sf_startpt = (new Date()).getTime();

(function(){var excludes = JSON.parse('[]');for(var i=0;i<excludes.length;i++){window.deferLoad.exclude(excludes[i])}})();

</script>

  <script type="text/javascript">

(function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;a=e.createElement("script");a.type="text/javascript";a.async=!0;
 
 a.src= 'https://d35ncmvcdy3liz.cloudfront.net/production/201503192031_faa2c47/javascripts/libraries/mixpanel-2.2.min.js';
 
 f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f);b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==
      typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");for(g=0;g<i.length;g++)f(c,i[g]);
      b._i.push([a,e,d])};b.__SV=1.2}})(document,window.mixpanel||[]);
      mixpanel.init('8a4bf66750e51c33486283d1a219e032');

</script>

  <script type="text/javascript" charset="utf-8">
  window.deferLoad.register("mobile_detect", null, function() {
    $.getScript('//cdnjs.cloudflare.com/ajax/libs/mobile-detect/0.4.3/mobile-detect.min.js', function() {
      // generate a cookie for AEB to know if device is a tablet
      var hasDeviceCookie = $.cookie('device-detection');
      var mobileDetect = new MobileDetect(window.navigator.userAgent);
      var isTablet = mobileDetect && mobileDetect.tablet() !== null;
      $.cookie('device-detection', JSON.stringify({isTablet: isTablet}), {expires: 3650, path: '/'});
      if(!hasDeviceCookie && (window.navigator.userAgent.indexOf("Android 4") != -1 || window.navigator.userAgent.indexOf("Android 5") != -1)) {
        var url = window.location.href;
        if (url.match(/\/m$/) !== null) {
          window.location.href = "/";
        }
        else {
          window.location.reload();
        }
      }
    });
  });
</script>

    <meta content="spreecast" property="og:type" />
    <meta content="Spreecast" property="og:site_name" />
    <meta content="Spreecast is the social video platform that connects people through conversation." property="og:description" />
    <meta content="251317644900872" property="fb:app_id" />
    <meta content="Spreecast" property="og:title" />
    <meta content="http://www.spreecast.com/images/fb_default_logo.png" property="og:image" />
    <meta content="http://www.spreecast.com/" property="og:url" />
    <meta content="image/jpeg" property="og:image:type" />
    <meta content="photo" property="twitter:card" />
    <meta content="@spreecast" property="twitter:site" />
    <meta content="Spreecast is the social video platform that connects people through conversation." property="twitter:description" />
    <meta content="spreecast://" property="twitter:app:url:iphone" />
    <meta content="Spreecast" property="twitter:title" />
    <meta content="http://www.spreecast.com/images/fb_default_logo.png" property="twitter:image" />
    <meta content="http://www.spreecast.com/" property="twitter:url" />
    <meta content="Spreecast" property="twitter:app:name:iphone" />
    <meta content="505358961" property="twitter:app:id:iphone" />
  <title>
    Spreecast
  </title>
  <link href="https://d35ncmvcdy3liz.cloudfront.net/production/201503192031_faa2c47/images/favicon.ico" rel="shortcut icon" type="image/vnd.microsoft.icon" />
  <link href="https://d35ncmvcdy3liz.cloudfront.net/production/201503192031_faa2c47/assets/common.css" media="screen" rel="stylesheet" type="text/css" />
  
  
  
  <meta content="authenticity_token" name="csrf-param" />
<meta content="XuOcM3zDpfmoq0MpvvkEhUdZuDPnQls9DwyjEVDSZj4=" name="csrf-token" />
  <script src="https://d35ncmvcdy3liz.cloudfront.net/production/201503192031_faa2c47/assets/common.js" type="text/javascript"></script>
  <script type="text/javascript" src="https://js.stripe.com/v1/"></script>
  <script type="text/javascript" charset="utf-8">

  window.deferLoad.register("optimizely", null, function() {
    if (spree.bucket_manager.serviceEnabled('optimizely')) {
      $.getScript('//cdn.optimizely.com/js/145939497.js', function() {
        // force GA to load after optimizely
        $.getScript(('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js');
      });
    }
  });

</script>

  <script type="text/javascript" src='https://d35ncmvcdy3liz.cloudfront.net/production/201503192031_faa2c47/javascripts/typedecma/ecmamin.js'></script>
  

  
<script type="text/javascript">
  // whenever any ajax request returns a 417 the browser will be redirected to the maintenance page
  // this will occur when an entire bank of servers (e.g. video, redis) is down
  $(document).ajaxError(function serverDownHandler(event, xhr, ajaxOptions, thrownError) {
    if (xhr.status == 417) {
      window.location.href = '/maintenance.html';
    }
  });


  // this event is emitted at the end of the document ready handler (below)
  $(document).bind('spree:init', function () {

    var runModTest = function(name, failed, tests) {
      if ( !(tests[name] = Modernizr[name]) ) {
        failed.push(name)
      }
    }

    //don't ever check on mobile, nor embed event pages
    if ($('body').hasClass('events_show') && !(spree.isMobile() || spree.is_embed)) {
      var tests = {};
      var failed = [];

      runModTest('hsla', failed, tests);
      runModTest('flexboxlegacy', failed, tests);
      runModTest('flexbox', failed, tests);
      runModTest('flexboxtweener', failed, tests);
      runModTest('cssvhunit', failed, tests);
      runModTest('cssvwunit', failed, tests);

      if ( tests['hsla'] && (tests['flexboxlegacy'] || tests['flexbox'] || tests['flexboxtweener']) && (tests['cssvhunit'] || tests['cssvwunit']) )
        return;

      window.location.href = '/upgrade?tests=' + failed.join();
    }

     spree.failed_login = true; $('#login_anchor').click(); 
      $(document).trigger('spree:loaded');
  });


  var blocker, spree;
  $(document).ready(function () {


    var decode = function(encoded_string) {
      var str = Base64.decode(encoded_string);
      if (str == '') {
        return str;
      } else {
        return JSON.parse(str);
      }
    }

    var queryHash = function()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    var digest_to_parse = "eyJ1c2VyX2RhdGEiOnt9fQ==";
    var opts = decode(digest_to_parse);

    var queryHash = queryHash();

    opts.error = false

    if (opts.clip) {
      opts.digest.video_digest.end_event_time_string = opts.clip.playback_end.toString();
      opts.digest.video_digest.start_event_time_string = opts.clip.playback_start.toString();
      opts.digest.video_digest.playback_start = 0
      opts.digest.video_digest.playback_offset = parseInt(opts.clip.playback_start) - parseInt(opts.digest.video_digest.start_event_time_string);
    }
    opts.login_trap_pct = -1;
    opts.fb_follow_all_pct = 100;

    var $user_cache_elements = $('#user-cache-elements-replacement');
    if (!opts.error) {
      opts.user_profile = decode($user_cache_elements.data('profile'));
      opts.buddy_list = decode($user_cache_elements.data('buddy-list'));
      opts.friend_requests = decode($user_cache_elements.data('friend-requests'));
      opts.friend_accepts = decode($user_cache_elements.data('friend-accepts'));
      opts.following = decode($user_cache_elements.data('following')).following;
    }

    var $presence = $('#presence-replacement');
    if (!opts.error) {
      opts.online_buddies = decode($presence.data('online'));
      opts.idle_buddies = decode($presence.data('idle'));
    }

    opts.channel_embed = queryHash['spree_embed'] == 'true'
    opts.device = 'web';
    window.deferLoad.trigger('mobile_detect');

    opts.hide_presence = opts.device === "iphone" || opts.device === "android" || opts.channel_embed || queryHash['hide_presence'];

    var $site_notification = $('#site-notification-replacement');
    if (!opts.error) {
      opts.site_notification = decode($site_notification.data('current'));
    }

    opts.embed_preload = false;

    if (typeof(Blocker) !== 'undefined' && $('#blocker').length > 0){
      blocker = new Blocker("blocker");
      $(blocker).one('spree:show-blocker', function(e, message){
        this.block();
      });
      $(blocker).on('spree:hide-blocker', function(e){
        this.remove();
      });
    }

    opts.bucket_json = {"mixpanel":{"bucket_count":1000,"allowed_buckets":200.0},"optimizely":{"bucket_count":1000,"allowed_buckets":1052.6315789473683}};
    spree = new Spree(opts);
    spree.mixpanelPageType = 'plans';
    spree.modalMgr = new ModalManager();
    spree.bannerMgr = new BannerManager();
    spree.loginMgr = new LoginManager();

    if (!spree.hasSpreecastUserCookie() &&
      ((spree.event || spree.clip) &&
      (!spree.is_embed && !spree.isMobile()) &&
      (!spree.event.ads_enabled || !spree.event.event_enabled))
      && !window.eventLanding ) {
        spree.loginMgr.showSignup('auto pop', false, null, {signUpText: 'Sign up to chat, ask questions, or join on camera'});
    }

    spree.sha = 'bed99a2ad0e2bc';
    spree.pending_questions_limit = 50;
    spree.pending_camera_requests_limit = 25;
    spree.broadcast_protocol = 'rtmfp';
    spree.in_event = false;
    if (typeof InviteManager !== 'undefined') {
      var inviteTypesJSON = [{"type":"viewer","text":"Invite to watch","verb":" to Watch"},{"type":"on_screen","text":"Invite on screen","verb":" on Camera"},{"type":"coproducer","text":"Add as coproducer","verb":" to Produce"}];
      if (!spree.user.producer){
        inviteTypesJSON = inviteTypesJSON.slice(0, 1);
      }
      spree.inviteMgr = new InviteManager(inviteTypesJSON);
    }


    spree.cdn_prefix = 'https://d35ncmvcdy3liz.cloudfront.net/production/201503192031_faa2c47';


    var spreecastOpts = { event_show_url: location.href };

      $(document).trigger('spree:init');
  });

</script>

  
  
  
  <script type="text/javascript">
  window.deferLoad.register("facebook_analytics", null, function() {
    // Facebook analytics
    (function() {
      var _fbq = window._fbq || (window._fbq = []);
      if (!_fbq.loaded) {
        var fbds = document.createElement('script');
        fbds.async = true;
        fbds.src = '//connect.facebook.net/en_US/fbds.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(fbds, s);
        _fbq.loaded = true;
      }
      _fbq.push(['addPixelId', '776978939034728']);
    })();
    window._fbq = window._fbq || [];
    window._fbq.push(['track', 'PixelInitialized', {}]);
  });
</script>
<noscript><img height="1" width="1" alt="" style="display:none" src="https://www.facebook.com/tr?id=776978939034728&amp;ev=PixelInitialized" /></noscript>


  
</head>

  <body class="subscriptions_demo ">
      <div class="rapper">
    <div id="fb-root"></div>
<script type="text/javascript">
  window.fbAsyncInit = function() {
    FB.init({
      appId: '251317644900872'
    , status: true
    , cookie: true
    , xfbml: true
    , version:  'v2.2'
    , frictionlessRequests: true
    });
    $(document).trigger('fb:init');
  }

  window.deferLoad.register('facebook', '//connect.facebook.net/en_US/sdk.js#xfbml=1', null, null);
</script>



          <div id="site-channels" data-user-channel="" data-user-channel-last-message-id="0" data-everyone-channel="3bf5b67abf2ae25d010cc3fb7c4972c2" data-everyone-channel-last-message-id="0"></div>
      <!-- AEB_EVENT_CHANNELS_REPLACE -->
      <div id="user-cache-elements-replacement" data-profile="" data-buddy-list="" data-friend-requests="" data-friend-accepts="" data-following=""></div>
      <div id="presence-replacement" data-online="" data-idle=""></div>
      <div id="site-notification-replacement" data-current="e30="></div>
      <div id="ip-address-replacement" data-ip-address="60.194.194.0"></div>
      <div id="firebase-token-replacement" data-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2IjowLCJkIjp7InNpbXVsYXRvciI6ZmFsc2UsInNwcmVla2V5IjoiemlzckIwTlN5aGR0ZWU5WSJ9LCJpYXQiOjE0MjcxMjUwMTN9.Kuj2sLAupr5cP80m7ZzeG58NU8zX2f6YHIH4JTjD_3Y"></div>
    
<?php $this->load->view('spree/header.tpl'); ?>  

    <div id="watch-menu-banner" data-type="WatchMenuBanner" class="banner hidden">

  <div class="watch-banner-content banner-content">
    <div class="watch-banner-content-wrapper">
      <div class="listing-headers">

        <h4 title="Live Spreecasts" class="listing-header animated" data-status="1">
          Live Spreecasts
          <span class='see-all'>
            <a href="/events?upcoming_all=all">see all</a>
          </span>
        </h4>

        <h4 title="Trending Spreecasts" class="listing-header animated" data-status="2">
          Trending Spreecasts
          <span class='see-all'>
            <a href="/events?featured=all">see all</a>
          </span>
        </h4>
      </div>
      <div id="watch-menu" class="scroll-wrapper event-list center horizontal clearfix" data-subsection="upcoming">
        <i class="logo-waiting-icon large spin"></i>
      </div>
      <i class="close-large-icon"></i>
    </div>
  </div>
</div>

    <div id="main-content">


        <section id="spreecast-intro">
  <div class="creator-subject">
    <iframe src="//player.vimeo.com/video/102789306" frameborder="0" width="720px" height="400px" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    <h1 class="spreecast-intro-header">让你的观众前所未有</h1>
    <button class="request-demo-btn large" alt="Request a demo">演 示</button>
  </div>
</section>
<section id="spreecast-functionality">
  <div id="spreecast-functionality-arrow"></div>
  <div class="functionality-container">
    <ul class="functionalities">
      <li class="functionality-item">
        <i class="camera-icon"></i>
        <div class="functionality-info">
          <h3 class="functionality-header">轻松直播</h3>
          <p class="functionality-text">
            直播，从您的浏览器连上互联网和一个摄像头开始。.
          </p>
        </div>
      </li>
      <li class="functionality-item">
        <i class="privacy-settings-icon"></i>
        <div class="functionality-info">
          <h3 class="functionality-header">公共和私人的活动</h3>
          <p class="functionality-text">
            从三种隐私选项里设置你的隐私：公共的、未发布的以及私人的.
          </p>
        </div>
      </li>
    </ul>
    <ul class="functionalities">
      <li class="functionality-item">
        <i class="record-icon"></i>
        <div class="functionality-info">
          <h3 class="functionality-header">记录你的活动</h3>
          <p class="functionality-text">
            记录你的活动让人们可以稍后看到它。如果你想让它失效，只需要删除或者停用你的活动。
          </p>
        </div>
      </li>
      <li class="functionality-item">
        <i class="engagement-icon"></i>
        <div class="functionality-info">
          <h3 class="functionality-header">最大限度的参与</h3>
          <p class="functionality-text">
            参与者可申请加入摄像机，分享视频，照片和幻灯片，或文字聊天。
          </p>
        </div>
      </li>
    </ul>
    <ul class="functionalities">
      <li class="functionality-item">
        <i class="embeddable-icon"></i>
        <div class="functionality-info">
          <h3 class="functionality-header">嵌入式和移动</h3>
          <p class="functionality-text">
            嵌入酷Live到你自己的网站或移动网站。酷Live也有一个移动应用程序。
          </p>
        </div>
      </li>
      <li class="functionality-item">
        <i class="producer-controls-icon"></i>
        <div class="functionality-info">
          <h3 class="functionality-header">发起人强大的控制功能</h3>
          <p class="functionality-text">
            决定谁加入摄像机和选择问题，照片，视频和幻灯片显示。
          </p>
        </div>
      </li>
    </ul>
  </div>
</section>


<section id="spreecast-features">
  <h1>强大的功能</h1>
  <h1>定制您的需求。</h1>
  <div class="feature-container">
    <ul class="features">
      <li class="feature-item">
        <h3 class="feature-header">下载您的酷Live视频文件</h3>
        <p class="feature-text">
          可以下载自己的视频文件，有权在任何播发器上播放并且赚钱。
        </p>
      </li>
      <li class="feature-item">
        <h3 class="feature-header">投放你自己的广告。</h3>
        <p class="feature-text">
          你可以在我们的播放器上投放自己的广告。我们使用的是VAST-compliant广告服务。
        </p>
      </li>
    </ul>
    <ul class="features">
      <li class="feature-item">
        <h3 class="feature-header">报告 & 分析</h3>
        <p class="feature-text">
          酷Live生成两组报告: 直播观看数和回放观看数。
        </p>
      </li>
      <li class="feature-item">
        <h3 class="feature-header">专门的客户经理</h3>
        <p class="feature-text">
          你可以得到一个专用账户管理人，并可以直接联系TA。
        </p>
      </li>
    </ul>
    <ul class="features">
      <li class="feature-item">
        <h3 class="feature-header">付费</h3>
        <p class="feature-text">
          加入你的酷Live或观看回放的付费用户。
        </p>
      </li>
      <li class="feature-item">
        <h3 class="feature-header">直播，远程支持</h3>
        <p class="feature-text">
          我们的专家可以根据酷Live的特性来远程帮助你，以便得到发布活动支持。
        </p>
      </li>
    </ul>
  </div>
  <button class="request-demo-btn large" alt="Request a demo">演 示</button>
</section>

<script type="text/javascript">
  $(document).on('spree:loaded', function () {
    window.deferLoad.trigger('facebook_analytics');
  });
</script>



    </div>
      </div>
    <?php $this->load->view('spree/footer.tpl'); ?>     
    <div id="popin"><div id="popin_content"></div></div>
    <div id="cropin"><div id="cropin_content"></div></div>
    
    <script id="hb-follow-button" type="text/x-handlebars-template">
  <button
    class="following_button {{#if following}}following{{/if}}"
    data-item-id="{{itemId}}"
    onclick="spree.clickFollowItem('follow_button_{{itemType}}_{{cachedSlug}}');"
    data-on-text="Follow"
    data-off-text="Following"
    data-item="User"
    data-id="{{cachedSlug}}"
    data-following="{{following}}"
    data-button-id="follow_button_{{itemType}}_{{cachedSlug}}">
      {{#if following}}Following{{else}}Follow{{/if}}
    </button>
</script>
<script type="text/javascript">
  Handlebars.registerHelper('follow_button', function(following, itemId, cachedSlug, itemType) {
    var template = Handlebars.compile($('script#hb-follow-button').html());
    return template({following: following, itemId: itemId, cachedSlug: cachedSlug, itemType: itemType});
  });
</script>

<script id="hb-user-name" type="text/x-handlebards-template">
  <span class="user-name"  data-user-id="{{id}}">{{{ name }}}</span>
</script>
<script type="text/javascript">
 Handlebars.registerHelper('user_name', function(id, options) {
    var template = Handlebars.compile($('script#hb-user-name').html());
    return template({id: id, name: options.fn(this)});
  });
</script>

<script id="hb-user-avatar" type="text/x-handlebards-template">
  <img class="user-avatar {{size}}-circle-avatar {{classList}}" data-user-id="{{id}}" src="{{url}}" alt="{{id}}"/>
</script>
<script type="text/javascript">
 Handlebars.registerHelper('user_avatar', function(id, url, size, classList) {
    var template = Handlebars.compile($('script#hb-user-avatar').html());
    return template({id: id, url: url, size: size, classList: classList});
  });
</script>

<script id="hb-tooltip" type="text/x-handlebars-template">
  <div class="tooltip">
    <span class="tooltip-content"></span>
  </div>
</script>

<script id="hb-site-header" type="text/x-handlebars-template">
  {{#if user}}
    {{#if is_mobile }}
      <a class="mr-5 signout-link" id="header-signout">Sign out</a>
      <img class="{{user.thumbnailClass}}" src="{{ user.profile_thumb_url }}" alt="{{ user.name }}"/>
    {{else}}
      {{#with user}}
        <nav id="nav-menu">
          <a id="user_status">
            <img class="{{thumbnailClass}}" src="{{ profile_thumb_url }}" alt="{{ name }}"/>
          </a>
          <ul class="menu-options">
            <li>
              <a class="menu-option" href="/users/{{ id }}" target="_self">Profile</a>
            </li>
            <li>
              <a class="menu-option" href="/users/{{ id }}/edit?tab=spreecasts" target="_self">My Spreecasts</a>
            </li>
            <li>
              <a class="menu-option" href="/users/{{ id }}/edit?tab=settings" target="_self">Account settings</a>
            </li>
            {{#if admin}}
              <li>
                <a class="menu-option" href="/admin" target="_self">Admin</a>
              </li>
              <li>
                <a class="menu-option" href="/admin/contents" target="_self">Content</a>
              </li>
            {{/if}}
            {{#if content_mod}}
              <li>
                <a class="menu-option" href="/moderation" target="_self">Moderation</a>
              </li>
            {{/if}}
            <li>
              <a class="menu-option" href="https://spreecast.zendesk.com/hc/en-us" target="_self">Help</a>
            </li>
            <li>
              <a class="menu-option" id="header-signout">Sign out</a>
            </li>
          </ul>
        </nav>
      {{/with}}
    {{/if}}
  {{else}}
    <a class="login-link" href="#" onclick="LoginManager.showLogin();; return false;">Log in</a>
    <input class="signup-button" onclick="spree.loginMgr.showSignup(&quot;signup&quot;);" type="button" value="Sign up" />
  {{/if}}
</script>

<script id="hb-image-crop" type="text/x-handlebars-template">
  <h3>Crop your image</h3>
  <div id="crop_controls">
    <div class="instructions">
      Move the transparent box to select which part of the image to use. Resize by clicking and dragging the lower right corner.
    </div>
    <input type="button" value="Cancel" class="cancel" />
    <input type="button" value="Crop Image" class="submit"/>
  </div>
  <div id="crop_container">
    <img src="{{ src }}" onload="spree.cropper.setup();" />
    <div class="overlay"></div>
    <div class="pane"></div>
  </div>
</script>


<script id="hb-general-confirm" type="text/x-handlebars-template">
  {{#if wrapperClass}}
    <div class='{{ wrapperClass}}'>
  {{/if}}
    {{#if other}}
      {{{ other }}}
    {{/if}}
    <div class="modal-header">
    <h2>{{{ question }}}</h2>
    </div>
    <div class="general-modal-body center">
    {{#if text}}
      <p>{{{ text }}}</p>
    {{/if}}
      {{#if cancelText}}
      <input type="button" class="cancel btn-gray" value="{{ cancelText }}" />
      {{/if}}
      {{#if confirmText}}
        <input type="button" class={{#if onAir}} 'confirm btn-red' {{else}} 'confirm btn-blue' {{/if}}value="{{ confirmText }}" />
      {{/if}}
    </div>
  {{#if wrapperClass}}
    </div>
  {{/if}}
  <div class="modal-footer">
  </div>
</script>

<script id="hb-friend-notification-nav"  type="text/x-handlebars-template">
  <div id="friend-notification-nav">
    <i class="friend-notifications-icon"></i>
    <span class="notification-count"></span>
  </div>
  <div id="friend-notification-container"></div>
</script>

<script id="hb-friend-notification-container"  type="text/x-handlebars-template">
  <div id="friend-notification-box" class="hidden">
  <div id="friend-notification-arrow"></div>
    <div id="friend-requests-header"></div>
    <ul class="friend-requests"></ul>
    <div id="friend-accepts-header"></div>
    <ul class="friend-accepts"></ul>
    <a class ="go-to-friends">
      <h4 class="center">See all</h4>
    </a>
  </div>
</script>

<script id="hb-friend-notifications-header"  type="text/x-handlebars-template">
  <div class="friend-notifications-header" class="hidden">
    <a href="{{headerUrl}}" target="_blank">
      <h4 class="friend-headline">{{headerText}} ({{numNotifications}})</h4>
    </a>
      {{#if hasSettings}}
        <a href="{{settingsUrl}}" target="_blank" class="go-to-privacy">
          <i class="settings-icon"></i><span class="ml-5">Settings</span>
        </a>
      {{/if}}
  </div>
</script>

<script id="hb-no-friend-requests"  type="text/x-handlebars-template">
  <div class="no-friend-requests">
    <h5 class="center">You have no new friend requests.</h5>
    <h5 class="center">Attend <a href="/events?upcoming_all=all" target="_blank">live spreecasts</a> to meet new people.</h5>
  </div>
</script>

<script id="hb-friend-accept-user"  type="text/x-handlebars-template">
 <li data-friend-id="{{ friendId }}" data-user-seen="{{ hasUserSeen }}" class="friend-request">
  <div class="request-header">
    <a href='{{ profile_link }}' title="{{ name }}" target="_blank" class="friend-image">
      {{{ user_avatar id pic "medium" "" }}}
    </a>
    <div class="request-header-info ml-10">
      <a href='{{ profile_link }}' class="user-name" title="{{ name }}" target="_blank">{{ name }}</a>
      <div class="friend-status-wrapper">
        {{{ friend_status "friend-status" friendId "accept" }}}
      </div>
      <h6 class="friendship-notification-time">{{ time }}</h6>
    </div>
  </div>
  <div class="request-actions">
    {{#if isOnline}}
      <button class="private-message friend-notification" data-user-id="{{id}}" data-friend-id="{{friendId}}">Private message</button>
    {{else}}
      {{{ friend_action_button "friend-accept-btn" friendId id (join_string str1="unfriend_friend_" str2=friendId) "unfriend" "add_friend" (join_string str1="spree.handleFriendAction('unfriend_friend_" str2=friendId str3="');") }}}
    {{/if}}
  </div>
 </li>
</script>

<script id="hb-friend-request-user"  type="text/x-handlebars-template">
 <li data-friend-id="{{ friendId }}" data-user-seen="{{ hasUserSeen }}" class="friend-request">
  <div class="request-header">
    <a href='{{ profile_link }}' title="{{ name }}" target="_blank" class="friend-image">
      {{{ user_avatar id pic "medium" "" }}}
    </a>
    <div class="request-header-info ml-10">
      <a href='{{ profile_link }}' class="user-name" title="{{ name }}" target="_blank">{{ name }}</a>
      <div class="friend-status-wrapper">
        {{{ friend_status "friend-status" friendId "requested" "true" }}}
      </div>
      <h6 class="friendship-notification-time">{{ time }}</h6>
    </div>
  </div>
  <div class="friend-action">
    {{{ friend_action_button "confirm-friend-btn mr-5"  friendId id (join_string str1="accept_friend_" str2=friendId) "accept" "friend_accept" (join_string str1="spree.handleFriendAction('accept_friend_" str2=friendId str3="');") }}}
    {{{ friend_action_button "reject-friend-btn"        friendId id (join_string str1="reject_friend_" str2=friendId) "reject" "request_block" (join_string str1="spree.handleFriendAction('reject_friend_" str2=friendId str3="');") }}}
  </div>
 </li>
</script>

<script type="text/javascript">
  Handlebars.registerHelper('facecard_friend_button', function(friendId, friendRelationship, targetId) {
    var classes = ['facecard-social'];
    var buttonId = 'facecard_';
    var friendState;
    var clickedState;
    var onClick;

    if (friendRelationship === 'none') {
      classes.push("add-friend-btn");
      buttonId += "add_friend_"+targetId;
      friendState = 'requested';
      clickedState = 'request_friend';
      onClick = "spree.addFriend('" + buttonId + "');";
    }
    else if (friendRelationship === 'friends') {
      classes.push("friend-accept-btn");
      buttonId += "unfriend_friend_"+friendId;
      friendState = 'unfriend';
      clickedState = 'add_friend';
      onClick = "spree.handleFriendAction('" + buttonId + "');";
    }
    else if (friendRelationship === 'outbound_pending') {
      classes.push("friend-req-sent-btn");
      buttonId += "retract_friend_"+friendId;
      friendState = 'retract';
      clickedState = 'add_friend';
      onClick = "spree.handleFriendAction('" + buttonId + "');";
    }
    else if (friendRelationship === 'inbound_blocked') {
      classes.push("friend-block-btn");
      buttonId += "unblock_friend_"+friendId;
      friendState = 'unblock';
      clickedState = 'add_friend';
      onClick = "spree.handleFriendAction('" + buttonId + "');";
    }
    else {
      return;
    }

    return Handlebars.helpers.friend_action_button(classes.join(' '), friendId, targetId, buttonId, friendState, clickedState, onClick);
  });
</script>

<script type="text/javascript">
  Handlebars.registerHelper('join_string', function(options) {
    var attrs = [];
    for (var prop in options.hash) {
      attrs.push(options.hash[prop]);
    }
    return new Handlebars.SafeString(attrs.join(''));
  });
</script>

<script id="hb-friend-action-button"  type="text/x-handlebars-template">
  <button class="{{classes}}" data-button-id="{{friendButtonId}}" data-friend-id="{{ friendId }}" data-friend-target-id="{{ targetId }}" data-friend-state="{{ friendState }}" data-clicked-state="{{clickedState}}" onclick="{{onClick}}"></button>
</script>
<script type="text/javascript">
 Handlebars.registerHelper('friend_action_button', function(classes, friendId, targetId, friendButtonId, friendState, clickedState, onClick) {
    var template = Handlebars.compile($('script#hb-friend-action-button').html());
    return template({classes: classes, friendId: friendId, targetId: targetId, friendButtonId: friendButtonId, friendState: friendState, clickedState: clickedState, onClick: onClick });
  });
</script>

<script id="hb-friend-status"  type="text/x-handlebars-template">
  {{#if hasText}}
    <h5 class="{{classes}}" data-friend-id="{{ friendId }}" data-friend-state="{{ friendState }}">
      {{text}}
    </h5>
  {{else}}
    <span class="empty"></span>
  {{/if}}
</script>
<script type="text/javascript">
  Handlebars.registerHelper('friend_status', function(classes, friendId, friendState) {
    var text = '';

    switch (friendState) {
      case 'requested':
        text = 'wants to add you as a friend.';
        break;
      case 'accept':
        text = 'and you are now friends.';
        break;
      case 'reject':
        text = 'Friend request ignored.';
        break;
      case 'request_block':
        text = 'has been blocked.';
        break;
      default:
        break;
    }

    var template = Handlebars.compile($('script#hb-friend-status').html());
    return template({classes: classes, friendId: friendId, friendState: friendState, text: text, hasText: text !== '' });
  });
</script>


<script id="hb-presence-user"  type="text/x-handlebars-template">
 <li data-id="{{ id }}" data-idle="{{ idle }}" class="{{ class }}" data-online="{{ online }}">
   {{{ user_avatar id pic "small" "" }}}
   <p>{{ name }}</p>
   {{#if on_air}}
     <div class='on_air'>
       <p class='event'>{{ event }}
      </div>
   {{/if}}
   <div class='status'></div>
 </li>
</script>

<script id="hb-presence-im" type="text/x-handlebars-template">
  <li class="chat-block">
    <div class="im-user-image-wrapper">
      {{{ user_avatar id imageUrl "small" "chat-user-image" }}}
    </div>
    <div class="im_message">
      <span class="mr-5">{{{ body }}}</span>
      <span class="quiet mr-5">-</span><span class="timestamp quiet">{{ time }}</span>
    </div>
  </li>
</script>

<script id="hb-presence-im-room-invite"  type="text/x-handlebars-template">
  <li class="chat-block">
    <div class="im-user-image-wrapper">
      {{{ user_avatar id imageUrl "small" "chat-user-image" }}}
    </div>
    <div class="im_message">
    {{#if isRoomCapable}}
      <span class="mr-5">{{name}} started a Room video call. <a href="{{roomLink}}" title="Room" target="_blank" class="join-room">Join now</a></span>
    {{else}}
      <span class="mr-5">{{name}} started a Room video call, but your current browser is unable to use Room. Please visit <a href="{{roomLink}}" title="Room" target="_blank" class="discover-room">Room</a> for more details.</span>
    {{/if}}
      <span class="quiet mr-5">-</span><span class="timestamp quiet">{{ time }}</span>
    </div>
  </li>
</script>

<script id="hb-presence-container" type="text/x-handlebars-template">
  <div id='im_container'>
    <div class='tall presence'>
      <div id='presence_box' class='box' data-enabled="{{#if enabled}}true{{else}}false{{/if}}" data-idle="{{ idle }}" data-noFriends="{{ noFriends }}">
        <section class='im-header'>
          <div class="im-info">
            <div class='state'></div>
            <div class='name'>Online (<span class='count'>{{#if enabled}}0{{else}}-{{/if}}</span>)</div>
          </div>
          <div class="settings-wrapper">
            <i class='settings-icon'></i>
            <div class='menu'>
              <a>Turn <span></span> Presence and Chat</a>
            </div>
          </div>
        </section>
        <div class='main'>
          <ul class="friends-list"></ul>
          <div class='emptyInf'>
            <div class='inf no_friends'>
              <h3>You don&#x27;t have any logged-in friends</h3>
              <p>Attend <a href="/events?upcoming_all=all" target="_blank">live spreecasts</a> to meet new people.</p>
              <input type='button' value='See upcoming spreecasts' class='btn-blue'/>
            </div>

            <div class='inf noone_online'>
              <h3>None online</h3>
              <p><span class="translation_missing" title="translation missing: en.follow_them_back">Follow Them Back</span></p>
            </div>
          </div>

          <div class='inf disabled'>
            <h3>Your presence is OFF</h3>
            <p>Turn it On to see your friends and chat with them</p>
            <input type='button' value='Turn ON Presence' class='btn-blue'/>

          </div>
        </div>
      </div>
    </div>
  </div>
</script>

<script id="hb-im-container" type="text/x-handlebars-template">
  <div class='tall chatboxContainer' data-id='{{ alt }}'>
    <div class='chatbox box' data-idle="{{ idle }}" data-online="{{ online }}">
      <section class='im-header'>
        <div class="im-info">
          <div class='state'></div>
          <div class='name'>{{ name }}</div>
        </div>
        <div class="im-actions">
          <div class='room disabled has-tooltip'></div>
          <div class='close-icon'></div>
        </div>
      </section>

      <div class='main'>
        <div class='scroller'>
          <div class='wrapper'>
            <ul class="chat_content">
            </ul>
          </div>
        </div>
        <div class="im-input-container">
          <input type="text" placeholder="{{placeholderText}}" class="im-input"></input>
          <span class="im-arrow"></span>
        </div>
      </div>
    </div>
   </div>
</script>


<script type="text/javascript">
  Handlebars.registerHelper('ifBoth', function(cond1, cond2, options) {
    if (cond1 && cond2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
</script>

    <script id="hb-modal-general-attributes" type="text/x-handlebars-template">
  {{opts.dialogClass}}
</script>
<script id="hb-modal-general-header" type="text/x-handlebars-template">
  {{{ modal_header_with_text opts.question opts }}}
</script>
<script id="hb-modal-general-body" type="text/x-handlebars-template">
  {{#with opts}}
    {{#if text}}
      <p>{{{ text }}}</p>
    {{/if}}
    {{#if cancelText}}
      <input type="button" class="cancel btn-gray" value="{{ cancelText }}" />
    {{/if}}
    {{#if confirmText}}
      <input type="button" class={{#if onAir}} 'confirm btn-red' {{else}} 'confirm btn-blue' {{/if}}value="{{ confirmText }}" />
    {{/if}}
  {{/with}}
</script>
<script id="hb-modal-general-footer" type="text/x-handlebars-template">
</script>

<script id="hb-modal-create-spreecast-header" type="text/x-handlebars-template">
  {{{ modal_header_with_text "Create Spreecast" opts }}}
</script>

<script id="hb-modal-create-spreecast-body" type="text/x-handlebars-template">
  {{> _modal_body_loading }}
</script>

<script id="hb-modal-create-spreecast-footer" type="text/x-handlebars-template">
  <section class="modal-action pull-right">
    {{{ modal_footer_cancel "Cancel" opts.modalId }}}
    {{{ modal_footer_submit "Create" opts }}}
  </section>
</script>

<script id="hb-modal-demo-contact-header" type="text/x-handlebars-template">
  {{{ modal_header_with_text opts.header opts }}}
</script>

<script id="hb-modal-feature-request-header" type="text/x-handlebars-template">
  {{{ modal_header_with_text opts.header opts }}}
</script>

<script id="hb-modal-feature-request-body" type="text/x-handlebars-template">
  <p class="with-no-top-margin">
    {{opts.bodyText}}
  </p>
  <form id="feature-request-form">
    <label class="is-visually-hidden" for="info-contact">Additional Information</label>
    <textarea id="info-contact" name="infocontact" rows="8" placeholder="Tell us how you would like to use Spreecast" title="Additional Information" class="common-input" tabindex="1" />
    <div class="clear error_field" id="top_error"></div>
  </form>
</script>

<script id="hb-modal-feature-request-footer" type="text/x-handlebars-template">
  <section class="modal-action pull-right">
    {{{ modal_footer_submit "Submit" }}}
  </section>
</script>

<script id="hb-modal-feature-request-thank-you-header" type="text/x-handlebars-template">
  {{{ modal_header_with_text "Thank you" opts }}}
</script>

<script id="hb-modal-feature-request-thank-you-body" type="text/x-handlebars-template">
  <div class="feature-request-thanks-container">
    <i class='check-icon'></i>
    <p>One of our account managers will contact you soon with more information.</p>
  </div>
</script>

<script id="hb-modal-feature-request-thank-you-footer" type="text/x-handlebars-template">
  <section class="modal-action pull-right">
    {{{ modal_footer_confirm "Done" opts.modalId }}}
  </section>
</script>

<script id="hb-modal-auto-follow-fbfriends-header" type="text/x-handlebars-template">
  {{{ modal_header_with_text "Friends on Spreecast" opts }}}
</script>

<script id="hb-modal-auto-follow-fbfriends-body" type="text/x-handlebars-template">
  {{#with opts}}
    <h3>These friends of yours are already members of the Spreecast community!</h3>
    <div class="friendblock clearfix">
      {{#each friends}}
        <div class="avatar pull-left mr-5">
          <a href="/users/{{ this.user_id }}" target="_new">
            <img src="{{ this.profile_photo_thumb_url }}" alt="{{ this.first_name }}" title="{{ this.first_name }}"/>
          </a>
        </div>
      {{/each}}
    </div>
    {{#if description_of_undisplayed_friends}}
      <p class="quiet">{{ description_of_undisplayed_friends }}</p>
    {{/if}}
    <p>To improve your experience on Spreecast, we&#x27;ve set up your account so you are now friends on Spreecast with your Facebook friends. To change you&#x27;re friends on Spreecast, visit your profile page.</p>
  {{/with}}
</script>

<script id="hb-modal-auto-follow-fbfriends-footer" type="text/x-handlebars-template">
  <section class="modal-action pull-right">
    <input type="button" class="btn-blue" value="Continue"></input>
  </section>
</script>

<script type="text/javascript">
  Handlebars.registerHelper('recommended_user_card', function(user) {
    return Handlebars.compile($('script#hb-recommended_user_card').html())({user: user});
  });
</script>

<script id="hb-recommended_user_card" type="text/x-handlebars-template">
{{#with user}}
  <li class="recommended-user-card">
    <a href="/users/{{ cached_slug }}" target="_new">
      <img src="{{ photo }}" class="recommended-user-profile" alt="{{ name }}" title="{{ name }}"/>
    </a>
    <a href="/users/{{cached_slug}}" target="_new" class="user-name" data-user-id="{{id}}">{{name}}</a>
    {{{follow_button following id cached_slug "User"}}}
  </li>
 {{/with}}
</script>

<script id="hb-modal-display-recommended-users-header" type="text/x-handlebars-template">
  {{{ modal_header_with_text "Users you might enjoy following" opts }}}
</script>

<script id="hb-modal-display-recommended-users-body" type="text/x-handlebars-template">
  {{#with opts}}
    <ul class="contains-recommended-user-cards">
      {{#each recommended_users}}
        {{{recommended_user_card this}}}
      {{/each}}
    </ul>
  {{/with}}
</script>

<script id="hb-modal-display-recommended-users-footer" type="text/x-handlebars-template">
  <section class="modal-action pull-right">
    {{{ modal_footer_confirm "Done" opts.modalId }}}
  </section>
</script>

<script id="hb-modal-add-email-address-header" type="text/x-handlebars-template">
  {{#if opts.signup}}
    {{{ modal_header_with_text "Almost there" opts }}}
  {{else}}
    {{{ modal_header_with_text "Add an email address" opts }}}
  {{/if}}
</script>

<script id="hb-modal-add-email-address-body" type="text/x-handlebars-template">
{{#with opts}}
  <form accept-charset="UTF-8" action="/plans" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="XuOcM3zDpfmoq0MpvvkEhUdZuDPnQls9DwyjEVDSZj4=" /></div>
    <label class="is-visually-hidden" for="email_address_email">Email</label>
    {{#if signup}}
      <h4 class='modal-prompt'>Please enter your email address to get started.</h4>
    {{/if}}
    <input id="email_address_email" name="email_address[email]" placeholder="New Email" type="email" class="common-input"/>
    <div id="email_error" class="error_field"></div>
    {{#if promptFollowSpreecast}}
      <div class="mt-5">
        <input type="checkbox" checked="checked" id="follow_spreecast_input" name="follow_spreecast_input"/>
        <label for="follow_spreecast_input">follow @spreecast</label>
      </div>
    {{/if}}
</form>{{/with}}
</script>

<script id="hb-modal-add-email-address-footer" type="text/x-handlebars-template">
  <section class="modal-action pull-right">
    {{{ modal_footer_submit "Continue" }}}
  </section>
</script>

<script id="hb-modal-attributes" type="text/x-handlebars-template">
  flyin
</script>

<script id="hb-modal_header_with_text" type="text/x-handlebars-template">
  <h3>
    {{#if text}}
      {{text}}
    {{/if}}
  </h3>
  {{#unless opts.noEscape}}
    {{> _modal_header_close}}
  {{/unless}}
</script>

<script id="hb-modal_header_with_image" type="text/x-handlebars-template">
  <img
    {{#if src}}src={{src}}{{/if}}
    {{#if alt}}alt={{alt}}{{/if}} width="{{width}}"/>
  {{#unless opts.noEscape}}
    {{> _modal_header_close}}
  {{/unless}}
</script>

<script type="text/javascript">
  Handlebars.registerHelper('modal_header_with_text', function(text, opts) {
    return Handlebars.compile($('script#hb-modal_header_with_text').html())({text: text, opts: opts});
  });
  Handlebars.registerHelper('modal_header_with_logo', function(opts) {
    return Handlebars.compile($('script#hb-modal_header_with_image').html())({src: "/images/spreecast-logo-black.png", width: 150, alt: "Spreecast", opts:opts});
  });
</script>


<script id="hb-modal_header_close" type="text/x-handlebars-template">
  <a class="nu-close close-icon" onclick="spree.modalMgr.hide('{{opts.modalId}}')"></a>
</script>

<script id="hb-modal_body_loading" type="text/x-handlebars-template">
  <div class="center">
    <span>Please Wait, Loading</span>
    <br/><i class="logo-waiting-icon modal-wait-logo"/></i>
  </div>
</script>

<script type="text/javascript">
  Handlebars.registerPartial('_modal_header_close', $('script#hb-modal_header_close').html());
  Handlebars.registerPartial('_modal_body_loading', $('script#hb-modal_body_loading').html());
</script>


<script id="hb-modal_footer_cancel" type="text/x-handlebars-template">
  <a href="#" class="mr-5" onclick="spree.modalMgr.hide('{{modalId}}')">{{text}}</a>
</script>
<script id="hb-modal_footer_confirm" type="text/x-handlebars-template">
  <button onclick="spree.modalMgr.hide('{{modalId}}')" class="btn-blue">{{text}}</button>
</script>
<script id="hb-modal_footer_submit" type="text/x-handlebars-template">
  {{#if opts.submitId}}
    <input type="submit" class="btn-blue" id="{{opts.submitId}}" value="{{text}}"></input>
  {{else}}
    <input type="submit" class="btn-blue" value="{{text}}"></input>
  {{/if}}
</script>
<script type="text/javascript">
  Handlebars.registerHelper("modal_footer_confirm", function(text, modalId) {
    var template =  Handlebars.compile($("script#hb-modal_footer_confirm").html());
    return template({text: text, modalId: modalId});
  });
  Handlebars.registerHelper("modal_footer_cancel", function(text, modalId) {
    var template =  Handlebars.compile($("script#hb-modal_footer_cancel").html());
    return template({text: text, modalId: modalId});
  });
  Handlebars.registerHelper('modal_footer_submit', function(text, opts) {
    var template =  Handlebars.compile($('script#hb-modal_footer_submit').html());
    return template({text: text, opts: opts});
  });
</script>

<script id="hb-modal" type="text/x-handlebars-template">
  <div class="modal {{{ modal_attributes identifier opts}}}" id="{{identifier}}">
    <header class="modal-header">
      {{{ modal_header identifier opts }}}
    </header>

    <div class="modal-body">
      {{{ modal_body identifier opts }}}
    </div>

    <footer class="modal-footer">
      {{{ modal_footer identifier opts }}}
    </footer>
  </div>
</script>

<script type="text/javascript">
  Handlebars.registerHelper('modal_attributes', function(hbClass, opts) {
    var $template = $('script#hb-modal-' + hbClass + '-attributes');
    if ($template.length > 0){
      return Handlebars.compile($template.html())({identifier:hbClass, opts:opts});
    }
    else {
      return Handlebars.compile($('script#hb-modal-attributes').html())();
    }
  });

  Handlebars.registerHelper('modal_header', function(hbClass, opts) {
    return Handlebars.compile($('script#hb-modal-' + hbClass + '-header').html())({identifier:hbClass, opts: opts});
  });

  Handlebars.registerHelper('modal_body', function(hbClass, opts) {
    return Handlebars.compile($('script#hb-modal-' + hbClass + '-body').html())({identifier:hbClass, opts: opts});
  });

  Handlebars.registerHelper('modal_footer', function(hbClass, opts) {
    return Handlebars.compile($('script#hb-modal-' + hbClass + '-footer').html())({identifier:hbClass, opts: opts});
  });

  Handlebars.registerHelper('modal', function(identifier, opts) {
    return Handlebars.compile($('script#hb-modal').html())({identifier: identifier, opts: opts});
  });
</script>

    <script id="hb-modal-password-recovery-feedback-header" type="text/x-handlebars-template">
  {{{ modal_header_with_text "Password reset" opts }}}
</script>

<script id="hb-modal-password-recovery-feedback-body" type="text/x-handlebars-template">
  <p class="with-no-top-margin center">If this address is in our system, an email has been sent with instructions to reset your password</p>
</script>

<script id="hb-modal-password-recovery-feedback-footer" type="text/x-handlebars-template">
  <section class="modal-action pull-right">
    <a class="mr-5" onclick="spree.modalMgr.showNext('login','password-recovery-feedback')">Back to Log in</a>
    {{{ modal_footer_confirm "Done" opts.modalId }}}
  </section>
</script>


<script id="hb-modal-email-signup-header" type="text/x-handlebars-template">
  {{{ modal_header_with_logo opts }}}
</script>

<script id="hb-modal-email-signup-body" type="text/x-handlebars-template">
  <form accept-charset="UTF-8" action="/users" class="new_user" client-validation="true" data-remote="true" id="new_user" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="XuOcM3zDpfmoq0MpvvkEhUdZuDPnQls9DwyjEVDSZj4=" /></div>
    <div class="clear error_field" id="top_error"></div>
      <fieldset>
        <ul>
          <li>
            <label class="is-visually-hidden" for="user_first_name">Your Name</label>
            <input class="common-input" id="user_first_name" name="user[first_name]" placeholder="Name" size="30" title="Enter Your Name" type="text" />
            <div class="clear error_field" id="first_name_error"></div>
          </li>
          <li>
            <label class="is-visually-hidden" for="user_email">Email Address</label>
            <input class="common-input" id="user_email" name="user[email]" placeholder="Email" size="30" title="Enter an Email" type="email" />
            <div class="clear error_field" id="email_error"></div>
          </li>
          <li>
            <label class="is-visually-hidden" for="user_password">Password</label>
            <input class="common-input" id="user_password" name="user[password]" placeholder="Password" size="30" title="Choose a Password" type="password" />
            <div class="clear error_field" id="password_error"></div>
          </li>
          <li>
            <label class="is-visually-hidden" for="user_password_confirmation">Confirm Password</label>
            <input class="common-input" id="user_password_confirmation" name="user[password_confirmation]" placeholder="Confirm Password" size="30" title="Confirm Your Password" type="password" />
          </li>
          <li class='quiet left sign-up'>
            <span><input name="user[tos_version]" type="hidden" value="0" /><input id="user_tos_version" name="user[tos_version]" type="checkbox" value="1" /></span>
            <span class="sign-up-terms">
              I agree to the Spreecast <a href='http://about.spreecast.com/terms-of-service/' target='_blank'>Terms of Service</a>
 <br> <div class="ml-20">and <a href="http://about.spreecast.com/privacy" target="_blank">Privacy Policy</a>.</div>
            </span>
          </li>
        </ul>
      </fieldset>
</form></script>

<script id="hb-modal-email-signup-footer" type="text/x-handlebars-template">
  <section class="modal-action pull-right">
    <a class="mr-5" onclick="spree.modalMgr.showNext('signup', 'email-signup')">Back</a>
    <input type='submit' id='user_join_submit' class="btn-blue" data-tracking-event='click' data-tracking-action='user-create-submit' data-tracking-category='create-account' data-tracking-intent='ca' data-site='spreecast_create' value="Sign up" disabled='true'/>
  </section>
</script>

<script id="hb-modal-forgot-password-header" type="text/x-handlebars-template">
  {{{ modal_header_with_text "Forgot your password?" opts }}}
</script>

<script id="hb-modal-forgot-password-body" type="text/x-handlebars-template">
  <p class="with-no-top-margin nowrap">Tell us where to send password reset instructions:</p>
  <form accept-charset="UTF-8" action="/users/reset_password" class="new_user" client-validation="true" data-remote="true" id="reset-password" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="XuOcM3zDpfmoq0MpvvkEhUdZuDPnQls9DwyjEVDSZj4=" /></div>
    <fieldset>
     <label class="is-visually-hidden" for="user_email">Email Address</label>
     <input class="common-input" data-required="true" id="user_email" name="user[email]" placeholder="Email" size="30" title="Enter Your Registered Email" type="email" />
     <div class="error_field error" id="user_email_error" style="display:none"></div>
    </fieldset>
</form></script>


<script id="hb-modal-forgot-password-footer" type="text/x-handlebars-template">
  <section class="modal-action pull-right">
    <a class="mr-5" onclick="spree.modalMgr.showNext('login', 'forgot-password')">Back</a>
    <input type="submit" class="btn-blue" value="Reset Password" onClick="
      $('#{{identifier}}').find('form').on('ajax:success', function() {
        spree.modalMgr.showNext('password-recovery-feedback', '{{identifier}}');
      });"/>
  </section>
</script>


<script id="hb-modal-login-attributes" type="text/x-handlebars-template">
  {{#if opts.ppv}}
    ppv
  {{/if}}
</script>
<script id="hb-modal-login-header" type="text/x-handlebars-template">
  {{{ modal_header_with_logo opts }}}
</script>

<script id="hb-modal-login-body"  type="text/x-handlebars-template">
  <div>
    <p class="with-no-top-margin">
      {{#if opts.loginText}}
        {{ opts.loginText }}
      {{/if}}
    </p>
    <ul>
        <li>
		<button aria-hidden="true" class="auth_link facebook-signup" data-site="facebook" data-social-url="/users/auth/facebook" data-tracking-callback="openOauthSite">
	<i class="facebook-icon"></i>
  <b>Log in with Facebook</b>
</button>
  </li>
  <li>
		<button aria-hidden="true" class="auth_link twitter-signup" data-site="twitter" data-social-url="/users/auth/twitter" data-tracking-callback="openOauthSite">
	<i class="twitter-icon"></i>
  <b>Log In with Twitter</b>
</button>
  </li>
  <li>
		<button aria-hidden="true" class="auth_link linkedin-signup" data-site="linkedin" data-social-url="/users/auth/linkedin" data-tracking-callback="openOauthSite">
	<i class="linkedin-icon"></i>
  <b>Log In with LinkedIn</b>
</button>
  </li>

    </ul>

    <hr/>

    <form accept-charset="UTF-8" action="/users/sign_in" class="new_user" data-remote="true" id="new_user" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="XuOcM3zDpfmoq0MpvvkEhUdZuDPnQls9DwyjEVDSZj4=" /></div>
      <fieldset>
        <label class="is-visually-hidden" for="user_email">Email</label>
        <input class="common-input mb-5" id="user_email" name="user[email]" placeholder="Email" size="30" title="Enter Your Email" type="email" />
        <div class="clear error_field" id="email_error"></div>
        <label class="is-visually-hidden" for="user_password">Password</label>
        <input class="common-input" id="user_password" name="user[password]" placeholder="Password" size="30" title="Enter Your Password" type="password" />
        <div class="clear error_field" id="password_error"></div>
        <div id="top_error" class="error_field"></div>
      </fieldset>
</form>  </div>
</script>

<script id="hb-modal-login-footer" type="text/x-handlebars-template">
  <section class="modal-action pull-left">
    <a class="block mb-5" onclick="spree.modalMgr.showNext('forgot-password', 'login');">Forgot your password?</a>
    <span class="mr-5">Don&#x27;t have an account?</span>
    <a onclick="spree.modalMgr.showNext('signup', 'login');">Sign up</a>
  </section>
  <section class="modal-action pull-right">
    <input value="Log in" type="submit" data-tracking-event="click" data-tracking-action="user_login_submit" data-tracking-category="create_account" data-tracking-intent="si" class="btn-blue" value="{{text}}"></input>
  </section>
</script>


<script id="hb-modal-signup-attributes" type="text/x-handlebars-template">
  {{#if opts.ppv}}
    ppv
  {{/if}}
</script>
<script id="hb-modal-signup-header" type="text/x-handlebars-template">
  {{{ modal_header_with_logo opts }}}
</script>

<script id="hb-modal-signup-body" type="text/x-handlebars-template">
  {{#if opts.signUpText}}
    <p class="with-no-top-margin">{{ opts.signUpText }}</p>
  {{/if}}
  <ul>
      <li>
		<button aria-hidden="true" class="auth_link facebook-signup" data-site="facebook" data-social-url="/users/auth/facebook" data-tracking-callback="openOauthSite">
	<i class="facebook-icon"></i>
  <b>Sign up with Facebook</b>
</button>
  </li>
  <li>
		<button aria-hidden="true" class="auth_link twitter-signup" data-site="twitter" data-social-url="/users/auth/twitter" data-tracking-callback="openOauthSite">
	<i class="twitter-icon"></i>
  <b>Sign up with Twitter</b>
</button>
  </li>
  <li>
		<button aria-hidden="true" class="auth_link linkedin-signup" data-site="linkedin" data-social-url="/users/auth/linkedin" data-tracking-callback="openOauthSite">
	<i class="linkedin-icon"></i>
  <b>Sign up with LinkedIn</b>
</button>
  </li>

    <li>
      <button onclick="spree.modalMgr.showNext('email-signup', 'signup');" id="email-signup-button" type='button' class="email-signup" aria-hidden="true">
        <i class="email-icon"></i>
        <b>Sign up with Email</b>
      </button>
    </li>
  </ul>
</script>

<script id="hb-modal-signup-footer" type="text/x-handlebars-template">
  <section class="modal-action center">
    <a onclick="spree.modalMgr.showNext('login','signup')">Already have an account?</a>
  </section>
</script>


    <script type="text/javascript">
      window.deferLoad.register('filepicker', '//api.filepicker.io/v1/filepicker.js',
        function() {
          filepicker.setKey('AU8NtOCS0TDKsNDTKEvEnz');
        },
        function() {
          return typeof filepicker !== 'undefined';
        });

      window.deferLoad.register('firebase', '//cdn.firebase.com/js/client/1.0.2/firebase.js',
        function() {
          if (!spree.hide_presence) {
            spree.firebase = new FirebaseManager('spreecast-big', false);
          }
        },
        function() {
          return typeof Firebase != 'undefined';
        });

      window.scm_env = 'production';
    </script>
  </body>
</html>
