
<!DOCTYPE html>
<html>
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# spreecast: http://ogp.me/ns/fb/coollive#">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!--[if lte IE 9]>
    <script type="text/javascript">
      window.location.href = '/upgrade';
    </script>
    <![endif]-->
  <meta content="酷Live" name="title" />
  <meta content="酷Live-中国最好玩的直播视频网站,提供比赛、娱乐、PK等直播娱乐平台." name="description" />
  <meta content="社交,视频,媒体,在线,面对面,聊天，直播，脱口秀,相声，PK,网络,平台" name="keywords" />
  <meta property="qc:admins" content="12057612476377441656375636" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" >
  <meta http-equiv="X-UA-Compatible" content="requiresActiveX=true" />
  <link rel="stylesheet" type="text/css" href="http://coollive.labake.cn/templates/spree/production/css.css" />
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
 
 a.src= 'http://coollive.labake.cn/templates/spree/production/assets/mixpanel-2.2.min.js';
 
 f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f);b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==
      typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");for(g=0;g<i.length;g++)f(c,i[g]);
      b._i.push([a,e,d])};b.__SV=1.2}})(document,window.mixpanel||[]);
      mixpanel.init('8a4bf66750e51c33486283d1a219e032');

</script>

  <script type="text/javascript" charset="utf-8">
  window.deferLoad.register("mobile_detect", null, function() {

    $.getScript('http://coollive.labake.cn/templates/spree/production/assets/mobile-detect.min.js', function() {
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

    <meta content="coollive" property="og:type" />
    <meta content="Coollive" property="og:site_name" />
    <meta content="酷Live是一个与人交流的社交视频直播平台." property="og:description" />
    <meta content="Coollive" property="og:title" />
    <meta content="http://coollive.labake.cn/templates/spree/production/images/fb_default_logo.png" property="og:image" />
    <meta content="http://coollive.labake.cn/" property="og:url" />
    <meta content="image/jpeg" property="og:image:type" />
  <title>
    酷Live
  </title>
  <link href="http://coollive.labake.cn/templates/spree/production/images/favicon.ico" rel="shortcut icon" type="image/vnd.microsoft.icon" />
  <link href="http://coollive.labake.cn/templates/spree/production/assets/common.css" media="screen" rel="stylesheet" type="text/css" />  
  
  <meta content="authenticity_token" name="csrf-param" />
<meta content="QloNu7Q1wbpaRGA91eyGoEus6iEw+rJDZu6n4FiN6aY=" name="csrf-token" />
  <script src="http://coollive.labake.cn/templates/spree/production/assets/home_common.js" type="text/javascript"></script>
  <script type="text/javascript" src="http://coollive.labake.cn/templates/spree/production/assets/stripe.js"></script>
  <script type="text/javascript" src='http://coollive.labake.cn/templates/spree/production/assets/ecmamin.js'></script>
  

  
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

    var digest_to_parse = "<?php echo $user_profile;?>";
    var opts = decode(digest_to_parse);	
    var queryHash = queryHash();

    opts.error = false

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
    spree.mixpanelPageType = 'undefined';
    spree.modalMgr = new ModalManager();
    spree.bannerMgr = new BannerManager();
    spree.loginMgr = new LoginManager();

    $(document).on('spree:loaded', function() {
      if (!spree.hasSpreecastUserCookie() &&
        (spree.event &&
        !spree.is_embed &&
        !spree.isMobile() &&
        (!spree.event.ads_enabled || !spree.event.event_enabled)) &&
        !window.eventLanding ) {
          spree.loginMgr.showSignup('auto pop', false, null, {signUpText: 'Sign up to chat, ask questions, or join on camera'});
      }
    });

    spree.sha = 'a0856bdb41f6f6';
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


    spree.cdn_prefix = 'https://d35ncmvcdy3liz.cloudfront.net/production/201505011855_f7d6400';


    var spreecastOpts = { event_show_url: location.href };

      $(document).trigger('spree:init');
  });

</script>

  
  
  
  
  
<script type="text/javascript">
var NREUMQ=NREUMQ||[];NREUMQ.push(["mark","firstbyte",new Date().getTime()]);</script></head>

  <body class="welcome_logged_in_index welcome_page">
      <div class="rapper">
    <div id="fb-root"></div>
  
</head>

  <body class="welcome_logged_in_index welcome_page">
      <div class="rapper">
    <div id="fb-root"></div>
          <div id="site-channels" data-user-channel="1cbddd43349c30c27847b0c5d7491d4d" data-user-channel-last-message-id="0" data-everyone-channel="3bf5b67abf2ae25d010cc3fb7c4972c2" data-everyone-channel-last-message-id="0"></div>
      <!-- AEB_EVENT_CHANNELS_REPLACE -->
      <div id="user-cache-elements-replacement" data-profile="" data-buddy-list="W10=" data-friend-requests="W10=" data-friend-accepts="W10=" data-following="eyJmb2xsb3dpbmciOlszNDIxMDQsMzQ4ODcxLDM1NTI5NCw0MDM0OTEsNDE0ODU2LDUyMTAyN119"></div>
      <div id="presence-replacement" data-online="e30=" data-idle="W10="></div>
      <div id="site-notification-replacement" data-current="e30="></div>
      <div id="ip-address-replacement" data-ip-address="60.194.194.0"></div>
      <div id="firebase-token-replacement" data-token=""></div>
    
<?php $this->load->view('spree/header.tpl'); ?>  

    <div id="watch-menu-banner" data-type="WatchMenuBanner" class="banner hidden">

  <div class="watch-banner-content banner-content">
    <div class="watch-banner-content-wrapper">
      <div class="listing-headers">

        <h4 title="Live Spreecasts" class="listing-header animated" data-status="1">
          直播
          <span class='see-all'>
            <a href="/events/list?upcoming_all=all">所有</a>
          </span>
        </h4>

        <h4 title="Trending Spreecasts" class="listing-header animated" data-status="2">
          预告
          <span class='see-all'>
            <a href="/events/list?featured=all">所有</a>
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


        <div class="subhead">
  <div class="links">
    <h4>
      <a href="/events/upcoming?upcoming_all=all" class="upcoming-all">即将播出</a>
      <span class="separator">|</span>
      <a href="/events/featured?featured=all" class="featured-all">热门</a>
    </h4>
  </div>
</div>

  <div class="section" data-section="featured" id="section-featured">
    <div class="subsection-wrapper" data-subsection="featured">
    <div class="subsection promo-unit" data-subsection="featured">
      <!-- CSS STYLES  -->


<style type="text/css">

 /* GENERAL CSS  */
.section .subsection[data-subsection=featured] { float: left;  height: 340px; position: absolute; }
body .container .section .subsection[data-subsection=featured] h2 { margin-top: 0px; }
.section .subsection[data-subsection=featured] .indicators { position: absolute; left: 267px; bottom: 15px; }

.section .subsection[data-subsection=featured] .indicators div {display: inline-block; width: 10px; height: 10px; border-radius: 50%; -webkit-border-radius:50%; -moz-border-radius:50%; margin: 1px 5px; cursor: pointer; background: #BBB; background: rgba(240, 240, 240, .5); }
.section .subsection[data-subsection=featured] .indicators div[data-selected] {background: white;}
body .container .section .subsection[data-subsection=featured] [data-rotate] { display: none; width: 660px; height: 340px; position: relative; }

.section .subsection[data-subsection=featured] [data-rotate] .box { width: 400px; color: white; border: solid 2px black; position: absolute; bottom: 26px; left: 20px; padding: 5px 30px 5px 5px; background: black transparent; background: rgba(0, 0, 0, 0.4); }

.section .subsection[data-subsection=featured] [data-rotate] .box .logo { width: 25px; height: 25px; position: absolute; right: 5px; top: 5px; background: url("http://coollive.labake.cn/templates/spree/production/images/sprite.png") no-repeat -5px -464px; }

.section .subsection[data-subsection=featured] [data-rotate] .box h1 {font-size: 28px; margin: 0px; }

.section .subsection[data-subsection=featured] [data-rotate] .box p {font-size: 14px; margin: 0px; }

a.slider-rsvp {
  display: block;
  position: absolute;
  bottom: 77px;
  right: 15px;
  width: 70px;
  height: 25px;
  border: 1px solid #368bd0;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  line-height: 26px;
  text-decoration: none;
  font-family: "Open Sans";
  font-weight: 700;
  background-color: #368bd0;
}
a.slider-rsvp:hover {
  background-color: transparent;
  color: #368bd0;
}

a.slider-rsvp:active {
  background-color: rgba(255,255,255,0.25);
  color: #368bd0;
}

</style>

<!-- IPHONE SLIDE -->
<div data-rotate="0">
<div class='iphone-banner-promo'>
  <div class='get_link'>
    <input type="text" placeholder="(555) 555-5555" class="common-input"></input>
    <input type="button" value="GO" class="btn-blue"></input>
    <p>Enter your number, and we will text a link to your phone. Or, visit the <a target="_blank" href='http://sprc.st/g0I12'>iTunes App Store.</a></p>
  </div>
</div>
<script type='text/javascript'>
  $(function(){
    $('.get_link input[type=text]').keyup(function(e){
      if (e.keyCode == 13){
        e.stopPropagation();
        $('.get_link input[type=button]').click();
      }
    });
    $('.get_link input[type=button]').click(function(){
      var number = $(".get_link input[type=text]").val();
      $.ajax({
        url: '/sms/send',
        type: 'POST',
        data: {number : number},
        success: function(){
          new GeneralConfirm({
           question: "Text message sent"
          , text: "We sent a text message to " + number + " with a link to download the app."
          , confirmText: 'Ok'
          });
        },
        error: function(){
          new GeneralConfirm({
           question: "An error occurred"
          , text: "We are sorry, but there was an error sending your text. Please try again."
          , confirmText: 'Ok'
          });
        }
      });
    });
  });
</script>
</div>

<!-- NEW Pay Per View -->
<div data-rotate="1">
  <div style="width: 630px; height: 330px;">
    <a href="http://blog.spreecast.com/the-new-improved-pay-per-view-experience/?promounit">
      <img alt="Introducing the New & Improved Pay Per View" src="http://coollive.labake.cn/templates/spree/production/images/PPVPromo.jpg">
    </a>
  </div>
</div>

<!-- UNLISTED SPREECAST  -->

<div data-rotate="2">
       <a href="#" onClick="$('.spreecast_now').click()" title="Spreecasting from Home to Work">
       <img alt="Spreecasting from Home to Work?" src="http://coollive.labake.cn/templates/spree/production/images/UnlistedNEW.png">
</a>
</div>

<!-- Product Improvements  -->

<div data-rotate="3">
       <a href="http://blog.spreecast.com/spreecast-improvements-and-new-features/"> 
       <img alt="Product Improvements" src="http://coollive.labake.cn/templates/spree/production/images/Improvements.png">
</a>
</div>

<!-- INDICATORS. -->

<div class="indicators"></div>


<!-- ROTATION SCRIPT  -->


<script type="text/javascript">
      $(document).ready( function () {
        var count = $('[data-rotate]').length;
        _.times(count, function () { $('.indicators').append($('<div>'));});
        var contentRotator = Class.extend({
          init: function () {
            this.currDiv = Math.floor((Math.random()*(count-1)) + 1);
            $('[data-rotate] .box').append($('<div class="logo">'));
            this.bindEvents();
            this.showDiv();
          }
          , bindEvents: function () {
            var self = this;
             $('.indicators div').on('click', function () {
               self.currDiv = $('.indicators div').index($(this));
               self.showDiv();
             });
          }
          , setTimer: function () {
            var self = this;
            clearTimeout(this.timer);
            delete this.timer;
            this.timer =  setTimeout(function () {
              self.showDiv();
              self.currDiv++;
            }, 5000);
          }
          , showDiv: function () {
            if (this.currDiv > ($('[data-rotate]').length - 1)) this.currDiv = 0;
            $('[data-rotate=' + this.currDiv + ']').show().siblings('[data-rotate]').hide();
            $('.indicators div:nth-child(' + (this.currDiv + 1 ) + ')').attr('data-selected', true).siblings().removeAttr('data-selected');
            this.setTimer();
          }
        });
        new contentRotator();
      });
    </script>
  </div>


  <div id="upcoming-guide" class="subsection event-list scroll-wrapper pull-right vertical" data-subsection="upcoming">

  <!-- "previous page" action -->
  <i class="prev browse up-caret-icon"></i>
  <!-- root element for scrollable -->
  <div class="scrollable vertical">
    <div class="scroll-items">
        <ul>
              <li class="event-listing event clearfix mb-10" data-event-id="163143" data-position="0" data-status="0">
                <a href="/events/find-your-voice-book-reading" class="pull-left">
                  <div class="event-image-container">
  <img alt="Find Your Voice Book Reading" class="event-image" src="//s3.amazonaws.com/spreecast-photos/production/users/713661/tile_120x90/713661_photo.jpg?1426016415" title="Find Your Voice Book Reading" />
</div>
</a>
                <div class="event-info pull-left">
                  <a href="/events/find-your-voice-book-reading">
  <h4 title="Find Your Voice Book Reading" class="event-name">Find Your Voice Book Reading</h4>
</a><h4>
    <a href="/users/sahar--4" class="user-name" title="Sahar Paz">Sahar Paz</a>

</h4>

<div class="event-meta">
    <span class="start-date invisible " minutes="112">
      1426953600000
    </span>
</div>


                    <button data-rsvps="12 RSVPs" class='btn-blue event-reminder-button' data-event-id='163143'>RSVP</button>
</div>
</li>              <li class="event-listing event clearfix mb-10" data-event-id="163217" data-position="1" data-status="0">
                <a href="/events/gibbsrules-live-mar-21-2015" class="pull-left">
                  <div class="event-image-container">
  <img alt="GibbsRules LIVE - MAR 21 2015  " class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163217/tile_120x90/img20150311-1258-1ccfme2.jpg?1426113984" title="GibbsRules LIVE - MAR 21 2015  " />
</div>
</a>
                <div class="event-info pull-left">
                  <a href="/events/gibbsrules-live-mar-21-2015">
  <h4 title="GibbsRules LIVE - MAR 21 2015  " class="event-name">GibbsRules LIVE - MAR 21 2015</h4>
</a><h4>
    <a href="/users/sam--391" class="user-name" title="Sam">Sam</a>

</h4>

<div class="event-meta">
    <span class="start-date invisible " minutes="292">
      1426964400000
    </span>
</div>


                    <button data-rsvps="4 RSVPs" class='btn-blue event-reminder-button' data-event-id='163217'>RSVP</button>
</div>
</li>              <li class="event-listing event clearfix" data-event-id="163602" data-position="2" data-status="0">
                <a href="/events/live-streaming-21-03-2015" class="pull-left">
                  <div class="event-image-container">
  <img alt="Β. Λεβέντης Live Streaming 21/03/2015" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163602/tile_120x90/img20150320-7682-1ozkzyw.jpg?1426884350" title="Β. Λεβέντης Live Streaming 21/03/2015" />
</div>
</a>
                <div class="event-info pull-left">
                  <a href="/events/live-streaming-21-03-2015">
  <h4 title="Β. Λεβέντης Live Streaming 21/03/2015" class="event-name">Β. Λεβέντης Live Streaming 21/03/2015</h4>
</a><h4>
    <a href="/users/--5088" class="user-name" title="Βασίλης Λεβέντης">Βασίλης Λεβέντης</a>

</h4>

<div class="event-meta">
    <span class="start-date invisible " minutes="382">
      1426969800000
    </span>
</div>


                    <button data-rsvps="11 RSVPs" class='btn-blue event-reminder-button' data-event-id='163602'>RSVP</button>
</div>
</li>        </ul>
        <ul>
              <li class="event-listing event clearfix mb-10" data-event-id="163613" data-position="3" data-status="0">
                <a href="/events/caller-chad" class="pull-left">
                  <div class="event-image-container">
  <img alt="Caller Chad" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163613/tile_120x90/img20150320-22309-1o5h9uh.jpg?1426918612" title="Caller Chad" />
</div>
</a>
                <div class="event-info pull-left">
                  <a href="/events/caller-chad">
  <h4 title="Caller Chad" class="event-name">Caller Chad</h4>
</a><h4>
    <a href="/users/kermit-and-friends" class="user-name" title="Kermit and Friends">Kermit and Friends</a>

</h4>

<div class="event-meta">
    <span class="start-date invisible " minutes="532">
      1426978800000
    </span>
</div>


                    <button data-rsvps="13 RSVPs" class='btn-blue event-reminder-button' data-event-id='163613'>RSVP</button>
</div>
</li>              <li class="event-listing event clearfix mb-10" data-event-id="163505" data-position="4" data-status="0">
                <a href="/events/treasure-hunting-with-katharyne--23" class="pull-left">
                  <div class="event-image-container">
  <img alt="Treasure Hunting with Katharyne" class="event-image" src="//s3.amazonaws.com/spreecast-photos/production/users/648047/tile_120x90/648047_photo.jpg?1416532039" title="Treasure Hunting with Katharyne" />
</div>
</a>
                <div class="event-info pull-left">
                  <a href="/events/treasure-hunting-with-katharyne--23">
  <h4 title="Treasure Hunting with Katharyne" class="event-name">Treasure Hunting with Katharyne</h4>
</a><h4>
    <a href="/users/katharyne" class="user-name" title="Katharyne Shelton">Katharyne Shelton</a>

</h4>

<div class="event-meta">
    <span class="start-date invisible " minutes="592">
      1426982400000
    </span>
</div>


                    <button data-rsvps="62 RSVPs" class='btn-blue event-reminder-button' data-event-id='163505'>RSVP</button>
</div>
</li>              <li class="event-listing event clearfix" data-event-id="161956" data-position="5" data-status="0">
                <a href="/events/can-you-beat-uncle-sam" class="pull-left">
                  <div class="event-image-container">
  <img alt="Can You Beat Uncle Sam?" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/161956/tile_120x90/161956_photo.jpg?1426167830" title="Can You Beat Uncle Sam?" />
</div>
</a>
                <div class="event-info pull-left">
                  <a href="/events/can-you-beat-uncle-sam">
  <h4 title="Can You Beat Uncle Sam?" class="event-name">Can You Beat Uncle Sam?</h4>
</a><h4>
    <a href="/users/oxygen-financial--2" class="user-name" title="oXYGen Financial">oXYGen Financial</a>

</h4>

<div class="event-meta">
    <span class="start-date invisible " minutes="2992">
      1427126400000
    </span>
</div>


                    <button data-rsvps="5 RSVPs" class='btn-blue event-reminder-button' data-event-id='161956'>RSVP</button>
</div>
</li>        </ul>
        <ul>
              <li class="event-listing event clearfix mb-10" data-event-id="163442" data-position="6" data-status="0">
                <a href="/events/debate-on-u-s-fee-for-service-medicine" class="pull-left">
                  <div class="event-image-container">
  <img alt="Debate on U.S. Fee-for-Service Medicine" class="event-image" src="//s3.amazonaws.com/spreecast-photos/production/users/319720/tile_120x90/319720_photo.jpg?1392837228" title="Debate on U.S. Fee-for-Service Medicine" />
</div>
</a>
                <div class="event-info pull-left">
                  <a href="/events/debate-on-u-s-fee-for-service-medicine">
  <h4 title="Debate on U.S. Fee-for-Service Medicine" class="event-name">Debate on U.S. Fee-for-Service Medicine</h4>
</a><h4>
    <a href="/users/wall-street-journal" class="user-name" title="Wall Street Journal">Wall Street Journal</a>

</h4>

<div class="event-meta">
    <span class="start-date invisible " minutes="3172">
      1427137200000
    </span>
</div>


                    <button data-rsvps="5 RSVPs" class='btn-blue event-reminder-button' data-event-id='163442'>RSVP</button>
</div>
</li>              <li class="event-listing event clearfix mb-10" data-event-id="163592" data-position="7" data-status="0">
                <a href="/events/cooking-vamp-21-less-is-more--2" class="pull-left">
                  <div class="event-image-container">
  <img alt="Cooking Vamp 21 &#x27;Less is More&#x27;" class="event-image" src="//s3.amazonaws.com/spreecast-photos/production/users/715587/tile_120x90/715587_photo.jpg?1422385057" title="Cooking Vamp 21 &#x27;Less is More&#x27;" />
</div>
</a>
                <div class="event-info pull-left">
                  <a href="/events/cooking-vamp-21-less-is-more--2">
  <h4 title="Cooking Vamp 21 &#x27;Less is More&#x27;" class="event-name">Cooking Vamp 21 &#x27;Less is More&#x27;</h4>
</a><h4>
    <a href="/users/robert--211" class="user-name" title="Robert Heffernan">Robert Heffernan</a>

</h4>

<div class="event-meta">
    <span class="start-date invisible " minutes="3442">
      1427153400000
    </span>
</div>


                    <button data-rsvps="3 RSVPs" class='btn-blue event-reminder-button' data-event-id='163592'>RSVP</button>
</div>
</li>              <li class="event-listing event clearfix" data-event-id="163597" data-position="8" data-status="0">
                <a href="/events/my-biggest-mistake-of-2014" class="pull-left">
                  <div class="event-image-container">
  <img alt="My biggest mistake of 2014" class="event-image" src="//s3.amazonaws.com/spreecast-photos/production/users/643666/tile_120x90/643666_photo.jpg?1394476710" title="My biggest mistake of 2014" />
</div>
</a>
                <div class="event-info pull-left">
                  <a href="/events/my-biggest-mistake-of-2014">
  <h4 title="My biggest mistake of 2014" class="event-name">My biggest mistake of 2014</h4>
</a><h4>
    <a href="/users/todd-lammi" class="user-name" title="Todd Lammi http://www.wholesaleintel.com/">Todd Lammi http://www.wholesaleintel.com/</a>

</h4>

<div class="event-meta">
    <span class="start-date invisible " minutes="3472">
      1427155200000
    </span>
</div>


                    <button data-rsvps="33 RSVPs" class='btn-blue event-reminder-button' data-event-id='163597'>RSVP</button>
</div>
</li>        </ul>
        <ul>
              <li class="event-listing event clearfix mb-10" data-event-id="163257" data-position="9" data-status="0">
                <a href="/events/the-mouth-on-sports--2" class="pull-left">
                  <div class="event-image-container">
  <img alt="The Mouth On Sports " class="event-image" src="//s3.amazonaws.com/spreecast-photos/production/users/258281/tile_120x90/258281_photo.jpg?1385758194" title="The Mouth On Sports " />
</div>
</a>
                <div class="event-info pull-left">
                  <a href="/events/the-mouth-on-sports--2">
  <h4 title="The Mouth On Sports " class="event-name">The Mouth On Sports</h4>
</a><h4>
    <a href="/users/joel-the-mouth" class="user-name" title="Joel The Mouth McGuirk">Joel The Mouth McGuirk</a>

</h4>

<div class="event-meta">
    <span class="start-date invisible " minutes="3532">
      1427158800000
    </span>
</div>


                    <button data-rsvps="2 RSVPs" class='btn-blue event-reminder-button' data-event-id='163257'>RSVP</button>
</div>
</li>              <li class="event-listing event clearfix mb-10" data-event-id="162201" data-position="10" data-status="0">
                <a href="/events/it-all-began-with-a-blank-canvas" class="pull-left">
                  <div class="event-image-container">
  <img alt="It All Began With A Blank Canvas" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/162201/tile_120x90/img20150225-26641-zvbkkv.jpg?1424917970" title="It All Began With A Blank Canvas" />
</div>
</a>
                <div class="event-info pull-left">
                  <a href="/events/it-all-began-with-a-blank-canvas">
  <h4 title="It All Began With A Blank Canvas" class="event-name">It All Began With A Blank Canvas</h4>
</a><h4>
    <a href="/users/nikki--17" class="user-name" title="Nikki McGonigal">Nikki McGonigal</a>

</h4>

<div class="event-meta">
    <span class="start-date invisible " minutes="4402">
      1427211000000
    </span>
</div>


                    <button data-rsvps="26 RSVPs" class='btn-blue event-reminder-button' data-event-id='162201'>RSVP</button>
</div>
</li>              <li class="event-listing event clearfix" data-event-id="163508" data-position="11" data-status="0">
                <a href="/events/ask-the-archbishop" class="pull-left">
                  <div class="event-image-container">
  <img alt="Ask The Archbishop " class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163508/tile_120x90/163508_photo.jpg?1426780913" title="Ask The Archbishop " />
</div>
</a>
                <div class="event-info pull-left">
                  <a href="/events/ask-the-archbishop">
  <h4 title="Ask The Archbishop " class="event-name">Ask The Archbishop</h4>
</a><h4>
    <a href="/users/the-archdiocese-of-port-of-spain" class="user-name" title="The Archdiocese of Port of Spain">The Archdiocese of Port of Spain</a>

</h4>

<div class="event-meta">
    <span class="start-date invisible " minutes="4432">
      1427212800000
    </span>
</div>


                    <button data-rsvps="5 RSVPs" class='btn-blue event-reminder-button' data-event-id='163508'>RSVP</button>
</div>
</li>        </ul>
    </div> <!-- scroll-items -->
  </div> <!-- scrollable -->

  <!-- "next page" action -->
  <i class="next browse down-caret-icon"></i>
</div>

<script type="text/javascript">
  Time.localizeDOM('[data-subsection=upcoming]', {timezone: false});
</script>

</div>

<script type='text/javascript'>
  $(document).on('spree:loaded', function () {
    spree.homePageScroll = new SpreeHomePageScroll([{"about":"Remember us? It's the eBay vs. Amazon show! Normally 2 PM EST on Mondays, travels plans have thrown us off again so tune in at a new time and new date: Saturday at 4 PM EST!","broadcasters_enabled":true,"coproducable":true,"display_questions":0,"embed_share_url":null,"name":"eBay vs. Amazon - Round 16","not_startable_by_coproducers":false,"questions_enabled":true,"visibility":0,"start_at":"2015-05-02T20:00:00Z","start_at_epoch":1430596800000.0,"playback_start":0,"times":[null,null],"channel_name":"ScanPower","now_broadcasting":false,"status":0,"event_id":164976,"image_url":"http://s3.amazonaws.com/spreecast-production/events/164976/tile_480x360/img20150501-21776-u7wygr.jpg?1430494273","twitter":{"search":null,"include":null},"host":{"about_me":"www.facebook.com/CHRIS &amp; www.facebook.com/HUSTLE \r\n\r\nMy NEW book/course, Online Arbitrage, on Amazon: http://www.amazon.com/dp/1500333824 (includes FREE Kindle copy)\r\n\r\nHusband to my beautiful wife and father to my awesome kids! Author, speaker, hustler, entrepreneur, online seller, and co-founder and director of www.ScanPower.com, the premier suite of pricing and data tools for Amazon sellers. \r\n\r\nMy book, Arbitrage, on Amazon: www.amazon.com/dp/1478251891\r\n\r\nScanPower Facebook Group: www.facebook.com/groups/scanpower\r\n\r\nLego Investing Facebook Group:  www.facebook.com/groups/legoinvesting","first_name":"ChrisGreen","has_been_authenticated":true,"last_name":"","needs_to_confirm_email":false,"user_id":"chrisgreen","alt":342104,"admin":false,"content_mod":false,"profile_photo_thumb_url":"//s3.amazonaws.com/spreecast-photos/production/users/342104/tile_30x30/342104_photo.jpg?1349323494","is_fb":true,"ppv_approved":false,"is_affiliate":false,"following_events":[164933,164934,164935,164976],"is_locked":true,"plan_name":"Silver","can_create_spreecast":true,"allow_friend_requests":true,"vcat":null},"num_viewers":0,"friendly_id":"ebay-vs-amazon-round-16","event_enabled":false,"views":193,"stitch_urls":{},"pre_event_extended_time":"30 minutes","questions_throttled":false,"broadcasters_throttled":false,"ad_on_air":false,"ads_enabled":false,"banner_ads_enabled":false,"recommended_content":[{"id":163837,"slug":"scanpower-radio-03-27-15","owner_name":"ChrisGreen","owner_slug":"chrisgreen","name":"ScanPower Radio - 03/27/15","logo":"http://s3.amazonaws.com/spreecast-production/events/163837/tile_240x180/img20150327-1707-zd93do.jpg?1427470759","url":"http://www.spreecast.com/events/scanpower-radio-03-27-15","type":"event","about":"The ScanPower Facebook Group hits 10,000 members today! Come celebrate and learn THREE awesome Amazon SEARCH HACKS on this episode of ScanPower Radio on SpreeCast!","views":1143,"length":"40:31"},{"id":164936,"slug":"scanpower-radio-05-01-15","owner_name":"ChrisGreen","owner_slug":"chrisgreen","name":"ScanPower Radio - 05/01/15","logo":"http://s3.amazonaws.com/spreecast-production/events/164936/tile_240x180/img20150430-17224-17i59dk.jpg?1430404306","url":"http://www.spreecast.com/events/scanpower-radio-05-01-15","type":"event","about":"The ScanPower Conference is July 14-15 in Orlando, Florida! Details at scanpower.com/conference\r\nSpeakers include:\r\nJohn Lawson, Jason Smith, Karin Bergsagel, Dale Lenz, Steve Sawyer, Greg Murphy, Duane Malek, Chris Green, Andy Slamans, Irma Dehoyos-Rojas, Jay Bayne, Sam Cohen and more! Also join in with the $100,000/month crew of Harvey Spektor, Matt Kelly, and Todd Forster! This lineup is incredible so come network with these successful sellers and find out what it takes to get your business to the next level. \r\n\r\n$1995 single or $2995 couple (spouses, business partners)\r\n\r\nIncludes TWO FULL DAYS of speakers and discussions.\r\n\r\nTHREE NIGHTS HOTEL in downtown Disney.\r\n\r\n(If you are local and will not be staying at the hotel, please contact us for a partial refund)\r\n\r\nLunch on site both days.\r\n\r\nAll Inclusive Party of the Year on the 14th!","views":539,"length":"55:43"},{"id":164931,"slug":"scanpower-conference-preview-4-30-15","owner_name":"ChrisGreen","owner_slug":"chrisgreen","name":"ScanPower Conference Preview 4/30/15","logo":"http://s3.amazonaws.com/spreecast-production/events/164931/tile_240x180/img20150430-29299-1u05ewe.jpg?1430403108","url":"http://www.spreecast.com/events/scanpower-conference-preview-4-30-15","type":"event","about":"The ScanPower Conference is July 14-15 in Orlando, Florida! Details at scanpower.com/conference\r\nSpeakers include:\r\nJohn Lawson, Jason Smith, Karin Bergsagel, Dale Lenz, Steve Sawyer, Greg Murphy, Duane Malek, Chris Green, Andy Slamans, Irma Dehoyos-Rojas, Jay Bayne, Sam Cohen and more! Also join in with the $100,000/month crew of Harvey Spektor, Matt Kelly, and Todd Forster! This lineup is incredible so come network with these successful sellers and find out what it takes to get your business to the next level. \r\n\r\n$1995 single or $2995 couple (spouses, business partners)\r\n\r\nIncludes TWO FULL DAYS of speakers and discussions.\r\n\r\nTHREE NIGHTS HOTEL in downtown Disney.\r\n\r\n(If you are local and will not be staying at the hotel, please contact us for a partial refund)\r\n\r\nLunch on site both days.\r\n\r\nAll Inclusive Party of the Year on the 14th!","views":409,"length":"32:27"},{"id":164932,"slug":"scanpower-conference-preview-5-1-15","owner_name":"ChrisGreen","owner_slug":"chrisgreen","name":"ScanPower Conference Preview 5/1/15","logo":"http://s3.amazonaws.com/spreecast-production/events/164932/tile_240x180/img20150430-29564-vhurer.jpg?1430403318","url":"http://www.spreecast.com/events/scanpower-conference-preview-5-1-15","type":"event","about":"The ScanPower Conference is July 14-15 in Orlando, Florida! Details at scanpower.com/conference\r\nSpeakers include:\r\nJohn Lawson, Jason Smith, Karin Bergsagel, Dale Lenz, Steve Sawyer, Greg Murphy, Duane Malek, Chris Green, Andy Slamans, Irma Dehoyos-Rojas, Jay Bayne, Sam Cohen and more! Also join in with the $100,000/month crew of Harvey Spektor, Matt Kelly, and Todd Forster! This lineup is incredible so come network with these successful sellers and find out what it takes to get your business to the next level. \r\n\r\n$1995 single or $2995 couple (spouses, business partners)\r\n\r\nIncludes TWO FULL DAYS of speakers and discussions.\r\n\r\nTHREE NIGHTS HOTEL in downtown Disney.\r\n\r\n(If you are local and will not be staying at the hotel, please contact us for a partial refund)\r\n\r\nLunch on site both days.\r\n\r\nAll Inclusive Party of the Year on the 14th!","views":251,"length":"24:34"},{"id":164128,"slug":"private-label-your-biz-to-75k-per-month","owner_name":"Andy Slamans","owner_slug":"andy--108","name":"Private Label Your biz to 75k per Month ","logo":"//s3.amazonaws.com/spreecast-photos/production/users/641675/tile_240x180/641675_photo.jpg?1399943906","url":"http://www.spreecast.com/events/private-label-your-biz-to-75k-per-month","type":"event","about":"I will share the top reasons I have been able to scale my amazon business to $75k per month selling Private Label products I import from China and India.  My goal is to hit 100k per month by August of 2015 by continuing to add new imported products every month.  ","views":4439,"length":"01:12:50"},{"id":164378,"slug":"pl-products-under-2000-rank","owner_name":"Andy Slamans","owner_slug":"andy--108","name":"PL products under 2000 rank=$$$$","logo":"//s3.amazonaws.com/spreecast-photos/production/users/641675/tile_240x180/641675_photo.jpg?1399943906","url":"http://www.spreecast.com/events/pl-products-under-2000-rank","type":"event","about":"Join me tonight as I share a new Private Label service I will be offering.  I have been working with a software developer who has come up with a program that can identify each product  in every Amazon category that is under 2,000 rank.  We have looked at all 2000  of these products and hand picked products that can be private labeled.  We have manufacture contact information for each of these products that we will hand to our clients as well.   www.PLsource.com  \r\nI will also be sharing about our current Alibaba to Amazon course and our upcoming new class that begins May 1.  ","views":2444,"length":"57:48"},{"id":164814,"slug":"alibaba-to-amazon-2-0-begins-may-1","owner_name":"Andy Slamans","owner_slug":"andy--108","name":"Alibaba to Amazon 2.0 begins May 1","logo":"//s3.amazonaws.com/spreecast-photos/production/users/641675/tile_240x180/641675_photo.jpg?1399943906","url":"http://www.spreecast.com/events/alibaba-to-amazon-2-0-begins-may-1","type":"event","about":"We will be talking private labeling with current members of our Alibaba to Amazon course tonight.  Join us to hear how we have added sourcing from Alibaba to create our own branded product selling on Amazon.   I promise you will NOT hear words like CRUSH, MASTERMIND, NEXT LEVEL, or THOUGHT LEADER, we will let the internet marketers who are jumping on Amazon use those.   You will hear normal people who are growing their E-commerce business using a old fashioned tactic called WORK.  ","views":2241,"length":"01:11:49"},{"id":162457,"slug":"how-to-gain-momentum-in-2015","owner_name":"Andy Slamans","owner_slug":"andy--108","name":"How to Gain Momentum in 2015 ","logo":"//s3.amazonaws.com/spreecast-photos/production/users/641675/tile_240x180/641675_photo.jpg?1399943906","url":"http://www.spreecast.com/events/how-to-gain-momentum-in-2015","type":"event","about":"Greg Purdy is our special guest tonight.  Greg has had a tremendous influence on my business and has been a fantastic mentor as I have navigated Amazon and Ebay over the last 2 years.   Greg has more knowledge in his belly button about Amazon and Ebay than I have in my entire body.   Greg is hosting a terrific local meet up April 11 in Baltimore.  Sellers are flying in from TX, FL,MA and many other states to be part of it.  We will be giving away prizes every 10 min on tonights spree. :) \r\nhttp://www.eventbrite.com/e/2015-momentum-ecommerce-internet-marketing-conference-tickets-15338499866","views":2912,"length":"01:03:13"},{"id":164498,"slug":"international-and-back-to-school","owner_name":"Barrington McIntosh","owner_slug":"barrington--3","name":"International and Back to School","logo":"http://s3.amazonaws.com/spreecast-production/channels/671032/tile_240x180/671032_photo.jpg?1389101759","url":"http://www.spreecast.com/events/international-and-back-to-school","type":"event","about":"New Amazon Unified North American Account, Are you getting ready for Back to School Selling Season? ","views":1902,"length":"01:02:44"},{"id":164355,"slug":"treasure-hunting-with-katharyne-coffee","owner_name":"Katharyne Shelton","owner_slug":"katharyne","name":"Treasure Hunting with Katharyne- COFFEE!","logo":"//s3.amazonaws.com/spreecast-photos/production/users/648047/tile_240x180/648047_photo.jpg?1429853293","url":"http://www.spreecast.com/events/treasure-hunting-with-katharyne-coffee","type":"event","about":"Back to normal this week, but I have super special coffee! :) \r\n\r\nAll the treasure hunting news - yard sales, selling online and beyond!","views":832,"length":"55:56"}],"category":"Business & Career","is_expired":false,"unlisted_embed_enabled":true,"legacy_rtmp":false,"is_premium":false,"mobile_url":"http://www.spreecast.com/events/ebay-vs-amazon-round-16/mobile","mobile_ecma":"http://www.spreecast.com/events/ebay-vs-amazon-round-16/mobile_ecma_v","rsvp_count":37,"live":[]},{"about":"Gonzo is in town....what do I do???","broadcasters_enabled":true,"coproducable":true,"display_questions":0,"embed_share_url":null,"name":"What Should I Do Tonight?","not_startable_by_coproducers":false,"questions_enabled":true,"visibility":0,"start_at":"2015-05-02T23:00:00Z","start_at_epoch":1430607600000.0,"playback_start":0,"times":[null,null],"channel_name":"Elisa Jordana's Channel","now_broadcasting":false,"status":0,"event_id":164988,"image_url":"http://s3.amazonaws.com/spreecast-production/events/164988/tile_480x360/164988_photo.jpg?1430530661","twitter":{"search":null,"include":null},"host":{"about_me":"A very warm welcome to future fans of Kermit and Friends. I am Elisa Jordana and I am always with my best friend Kermit. I am a former writer of The Howard Stern Show. I also was in the band Cobra Starship. But most importantly, I am the owner of Kermit, the best dog in the whole world. Kermit and Elisa forever. My 2 passions are interviewing and Kermit. The first interview I did was Howard Stern. Thank you Howard for helping me find my passion in life.\r\n","first_name":"Kermit and Friends","has_been_authenticated":true,"last_name":"","needs_to_confirm_email":false,"user_id":"kermit-and-friends","alt":915646,"admin":false,"content_mod":false,"profile_photo_thumb_url":"//s3.amazonaws.com/spreecast-photos/production/users/915646/tile_30x30/915646_photo.jpg?1429593653","is_fb":true,"ppv_approved":true,"is_affiliate":false,"following_events":[164988],"is_locked":true,"plan_name":"Silver","can_create_spreecast":true,"allow_friend_requests":true,"vcat":null},"num_viewers":0,"friendly_id":"what-should-i-do-tonight","event_enabled":false,"views":325,"stitch_urls":{},"pre_event_extended_time":"30 minutes","questions_throttled":false,"broadcasters_throttled":false,"ad_on_air":false,"ads_enabled":false,"banner_ads_enabled":false,"recommended_content":[{"id":164710,"slug":"gonzo-grey","owner_name":"Kermit and Friends","owner_slug":"kermit-and-friends","name":"Gonzo Grey","logo":"http://s3.amazonaws.com/spreecast-production/events/164710/tile_240x180/164710_photo.jpg?1429686724","url":"http://www.spreecast.com/events/gonzo-grey","type":"event","about":"I wonder if Gonzo watched 50 Shades of Grey like I told him to? Or does he consider that Ryan Lever muppet type behavior?","views":5647,"length":"01:53:44"},{"id":164680,"slug":"breaking-up","owner_name":"Kermit and Friends","owner_slug":"kermit-and-friends","name":"Breaking Up","logo":"http://s3.amazonaws.com/spreecast-production/events/164680/tile_240x180/164680_photo.jpg?1429589160","url":"http://www.spreecast.com/events/breaking-up","type":"event","about":"Is there any possible way to make a breakup positive? I want to know YOUR opinion on this. Instead of fighting, let 's help each other's lives.","views":5274,"length":"02:24:10"},{"id":164745,"slug":"what-is-a-friend","owner_name":"Kermit and Friends","owner_slug":"kermit-and-friends","name":"What Is A Friend?","logo":"http://s3.amazonaws.com/spreecast-production/events/164745/tile_240x180/img20150422-29273-1wqr0p3.jpg?1429754719","url":"http://www.spreecast.com/events/what-is-a-friend","type":"event","about":"I've been having LOTS of problems with people recently. Why is there so much negativity going around? Kermit and Friends is supposed to be a positive place. Why does it seem as though everyone is against each other ? Also, I love Chad.","views":5475,"length":"02:14:34"},{"id":164798,"slug":"n50-shades-of-gonzo","owner_name":"Kermit and Friends","owner_slug":"kermit-and-friends","name":"50 Shades Of Gonzo","logo":"http://s3.amazonaws.com/spreecast-production/events/164798/tile_240x180/164798_photo.jpg?1429930351","url":"http://www.spreecast.com/events/n50-shades-of-gonzo","type":"event","about":"Last night, my mom called in and said it's really mean of me to date Gonzo, who is a very public person. So what do you think...Should I not meet up with Gonzo when he comes into NYC? Should I bring friends with me if I DO meet him?? Should my mom come on our date? Should we double date with Benjy and Lori?","views":3864,"length":"01:53:11"},{"id":164902,"slug":"tbgwt-demthrones-with-beauty-jackson","owner_name":"The Black Guy Who Tips","owner_slug":"the-black-guy-who-tips","name":"TBGWT #DemThrones with Beauty Jackson","logo":"//s3.amazonaws.com/spreecast-photos/production/users/355294/tile_240x180/355294_photo.jpg?1352336813","url":"http://www.spreecast.com/events/tbgwt-demthrones-with-beauty-jackson","type":"event","about":"","views":1645,"length":"03:34:17"},{"id":164886,"slug":"tbgwt--333","owner_name":"The Black Guy Who Tips","owner_slug":"the-black-guy-who-tips","name":"TBGWT","logo":"//s3.amazonaws.com/spreecast-photos/production/users/355294/tile_240x180/355294_photo.jpg?1352336813","url":"http://www.spreecast.com/events/tbgwt--333","type":"event","about":"","views":552,"length":"03:12:02"},{"id":164854,"slug":"tbgwt--332","owner_name":"The Black Guy Who Tips","owner_slug":"the-black-guy-who-tips","name":"TBGWT","logo":"//s3.amazonaws.com/spreecast-photos/production/users/355294/tile_240x180/355294_photo.jpg?1352336813","url":"http://www.spreecast.com/events/tbgwt--332","type":"event","about":"","views":645,"length":"02:39:27"},{"id":164812,"slug":"tbgwt--331","owner_name":"The Black Guy Who Tips","owner_slug":"the-black-guy-who-tips","name":"TBGWT","logo":"//s3.amazonaws.com/spreecast-photos/production/users/355294/tile_240x180/355294_photo.jpg?1352336813","url":"http://www.spreecast.com/events/tbgwt--331","type":"event","about":"","views":584,"length":"02:58:21"},{"id":164453,"slug":"espn-nba-live-chat-episode-121","owner_name":"@TrueHoopTV","owner_slug":"truehooptv--2","name":"ESPN NBA Live Chat Episode 121","logo":"http://s3.amazonaws.com/spreecast-production/events/164453/tile_240x180/img20150414-24932-u59tpu.jpg?1429023987","url":"http://www.spreecast.com/events/espn-nba-live-chat-episode-121","type":"event","about":"Amin, Tom, Ethan, Bobby Kennedy, and YOU talking all things NBA. ","views":364859,"length":"01:15:35"},{"id":164651,"slug":"espn-nba-live-chat-episode-123","owner_name":"@TrueHoopTV","owner_slug":"truehooptv--2","name":"ESPN NBA Live Chat Episode 123","logo":"http://s3.amazonaws.com/spreecast-production/events/164651/tile_240x180/img20150420-17074-1xqs1j6.jpg?1429543452","url":"http://www.spreecast.com/events/espn-nba-live-chat-episode-123","type":"event","about":"Amin, maybe Tom, maybe Ethan...NBA Playoffs. ","views":678112,"length":"01:15:25"}],"category":"Comedy","is_expired":false,"unlisted_embed_enabled":true,"legacy_rtmp":false,"is_premium":false,"mobile_url":"http://www.spreecast.com/events/what-should-i-do-tonight/mobile","mobile_ecma":"http://www.spreecast.com/events/what-should-i-do-tonight/mobile_ecma_v","rsvp_count":12,"live":[]},{"about":"The ScanPower Conference is July 14-15 in Orlando, Florida! Details at scanpower.com/conference\r\nSpeakers include:\r\nJohn Lawson, Jason Smith, Karin Bergsagel, Dale Lenz, Steve Sawyer, Greg Murphy, Duane Malek, Chris Green, Andy Slamans, Irma Dehoyos-Rojas, Jay Bayne, Sam Cohen and more! Also join in with the $100,000/month crew of Harvey Spektor, Matt Kelly, and Todd Forster! This lineup is incredible so come network with these successful sellers and find out what it takes to get your business to the next level. \r\n\r\n$1995 single or $2995 couple (spouses, business partners)\r\n\r\nIncludes TWO FULL DAYS of speakers and discussions.\r\n\r\nTHREE NIGHTS HOTEL in downtown Disney.\r\n\r\n(If you are local and will not be staying at the hotel, please contact us for a partial refund)\r\n\r\nLunch on site both days.\r\n\r\nAll Inclusive Party of the Year on the 14th!","broadcasters_enabled":true,"coproducable":true,"display_questions":0,"embed_share_url":null,"name":"ScanPower Conference Preview 5/2/15","not_startable_by_coproducers":false,"questions_enabled":true,"visibility":0,"start_at":"2015-05-03T00:30:00Z","start_at_epoch":1430613000000.0,"playback_start":0,"times":[null,null],"channel_name":"ScanPower","now_broadcasting":false,"status":0,"event_id":164933,"image_url":"http://s3.amazonaws.com/spreecast-production/events/164933/tile_480x360/img20150430-17224-1x6vhjm.jpg?1430403441","twitter":{"search":null,"include":null},"host":{"about_me":"www.facebook.com/CHRIS &amp; www.facebook.com/HUSTLE \r\n\r\nMy NEW book/course, Online Arbitrage, on Amazon: http://www.amazon.com/dp/1500333824 (includes FREE Kindle copy)\r\n\r\nHusband to my beautiful wife and father to my awesome kids! Author, speaker, hustler, entrepreneur, online seller, and co-founder and director of www.ScanPower.com, the premier suite of pricing and data tools for Amazon sellers. \r\n\r\nMy book, Arbitrage, on Amazon: www.amazon.com/dp/1478251891\r\n\r\nScanPower Facebook Group: www.facebook.com/groups/scanpower\r\n\r\nLego Investing Facebook Group:  www.facebook.com/groups/legoinvesting","first_name":"ChrisGreen","has_been_authenticated":true,"last_name":"","needs_to_confirm_email":false,"user_id":"chrisgreen","alt":342104,"admin":false,"content_mod":false,"profile_photo_thumb_url":"//s3.amazonaws.com/spreecast-photos/production/users/342104/tile_30x30/342104_photo.jpg?1349323494","is_fb":true,"ppv_approved":false,"is_affiliate":false,"following_events":[164933,164934,164935,164976],"is_locked":true,"plan_name":"Silver","can_create_spreecast":true,"allow_friend_requests":true,"vcat":null},"num_viewers":1,"friendly_id":"scanpower-conference-preview-5-2-15","event_enabled":false,"views":67,"stitch_urls":{},"pre_event_extended_time":"30 minutes","questions_throttled":false,"broadcasters_throttled":false,"ad_on_air":false,"ads_enabled":false,"banner_ads_enabled":false,"recommended_content":[{"id":163837,"slug":"scanpower-radio-03-27-15","owner_name":"ChrisGreen","owner_slug":"chrisgreen","name":"ScanPower Radio - 03/27/15","logo":"http://s3.amazonaws.com/spreecast-production/events/163837/tile_240x180/img20150327-1707-zd93do.jpg?1427470759","url":"http://www.spreecast.com/events/scanpower-radio-03-27-15","type":"event","about":"The ScanPower Facebook Group hits 10,000 members today! Come celebrate and learn THREE awesome Amazon SEARCH HACKS on this episode of ScanPower Radio on SpreeCast!","views":1143,"length":"40:31"},{"id":164936,"slug":"scanpower-radio-05-01-15","owner_name":"ChrisGreen","owner_slug":"chrisgreen","name":"ScanPower Radio - 05/01/15","logo":"http://s3.amazonaws.com/spreecast-production/events/164936/tile_240x180/img20150430-17224-17i59dk.jpg?1430404306","url":"http://www.spreecast.com/events/scanpower-radio-05-01-15","type":"event","about":"The ScanPower Conference is July 14-15 in Orlando, Florida! Details at scanpower.com/conference\r\nSpeakers include:\r\nJohn Lawson, Jason Smith, Karin Bergsagel, Dale Lenz, Steve Sawyer, Greg Murphy, Duane Malek, Chris Green, Andy Slamans, Irma Dehoyos-Rojas, Jay Bayne, Sam Cohen and more! Also join in with the $100,000/month crew of Harvey Spektor, Matt Kelly, and Todd Forster! This lineup is incredible so come network with these successful sellers and find out what it takes to get your business to the next level. \r\n\r\n$1995 single or $2995 couple (spouses, business partners)\r\n\r\nIncludes TWO FULL DAYS of speakers and discussions.\r\n\r\nTHREE NIGHTS HOTEL in downtown Disney.\r\n\r\n(If you are local and will not be staying at the hotel, please contact us for a partial refund)\r\n\r\nLunch on site both days.\r\n\r\nAll Inclusive Party of the Year on the 14th!","views":539,"length":"55:43"},{"id":164931,"slug":"scanpower-conference-preview-4-30-15","owner_name":"ChrisGreen","owner_slug":"chrisgreen","name":"ScanPower Conference Preview 4/30/15","logo":"http://s3.amazonaws.com/spreecast-production/events/164931/tile_240x180/img20150430-29299-1u05ewe.jpg?1430403108","url":"http://www.spreecast.com/events/scanpower-conference-preview-4-30-15","type":"event","about":"The ScanPower Conference is July 14-15 in Orlando, Florida! Details at scanpower.com/conference\r\nSpeakers include:\r\nJohn Lawson, Jason Smith, Karin Bergsagel, Dale Lenz, Steve Sawyer, Greg Murphy, Duane Malek, Chris Green, Andy Slamans, Irma Dehoyos-Rojas, Jay Bayne, Sam Cohen and more! Also join in with the $100,000/month crew of Harvey Spektor, Matt Kelly, and Todd Forster! This lineup is incredible so come network with these successful sellers and find out what it takes to get your business to the next level. \r\n\r\n$1995 single or $2995 couple (spouses, business partners)\r\n\r\nIncludes TWO FULL DAYS of speakers and discussions.\r\n\r\nTHREE NIGHTS HOTEL in downtown Disney.\r\n\r\n(If you are local and will not be staying at the hotel, please contact us for a partial refund)\r\n\r\nLunch on site both days.\r\n\r\nAll Inclusive Party of the Year on the 14th!","views":409,"length":"32:27"},{"id":164932,"slug":"scanpower-conference-preview-5-1-15","owner_name":"ChrisGreen","owner_slug":"chrisgreen","name":"ScanPower Conference Preview 5/1/15","logo":"http://s3.amazonaws.com/spreecast-production/events/164932/tile_240x180/img20150430-29564-vhurer.jpg?1430403318","url":"http://www.spreecast.com/events/scanpower-conference-preview-5-1-15","type":"event","about":"The ScanPower Conference is July 14-15 in Orlando, Florida! Details at scanpower.com/conference\r\nSpeakers include:\r\nJohn Lawson, Jason Smith, Karin Bergsagel, Dale Lenz, Steve Sawyer, Greg Murphy, Duane Malek, Chris Green, Andy Slamans, Irma Dehoyos-Rojas, Jay Bayne, Sam Cohen and more! Also join in with the $100,000/month crew of Harvey Spektor, Matt Kelly, and Todd Forster! This lineup is incredible so come network with these successful sellers and find out what it takes to get your business to the next level. \r\n\r\n$1995 single or $2995 couple (spouses, business partners)\r\n\r\nIncludes TWO FULL DAYS of speakers and discussions.\r\n\r\nTHREE NIGHTS HOTEL in downtown Disney.\r\n\r\n(If you are local and will not be staying at the hotel, please contact us for a partial refund)\r\n\r\nLunch on site both days.\r\n\r\nAll Inclusive Party of the Year on the 14th!","views":251,"length":"24:34"},{"id":164128,"slug":"private-label-your-biz-to-75k-per-month","owner_name":"Andy Slamans","owner_slug":"andy--108","name":"Private Label Your biz to 75k per Month ","logo":"//s3.amazonaws.com/spreecast-photos/production/users/641675/tile_240x180/641675_photo.jpg?1399943906","url":"http://www.spreecast.com/events/private-label-your-biz-to-75k-per-month","type":"event","about":"I will share the top reasons I have been able to scale my amazon business to $75k per month selling Private Label products I import from China and India.  My goal is to hit 100k per month by August of 2015 by continuing to add new imported products every month.  ","views":4439,"length":"01:12:50"},{"id":164378,"slug":"pl-products-under-2000-rank","owner_name":"Andy Slamans","owner_slug":"andy--108","name":"PL products under 2000 rank=$$$$","logo":"//s3.amazonaws.com/spreecast-photos/production/users/641675/tile_240x180/641675_photo.jpg?1399943906","url":"http://www.spreecast.com/events/pl-products-under-2000-rank","type":"event","about":"Join me tonight as I share a new Private Label service I will be offering.  I have been working with a software developer who has come up with a program that can identify each product  in every Amazon category that is under 2,000 rank.  We have looked at all 2000  of these products and hand picked products that can be private labeled.  We have manufacture contact information for each of these products that we will hand to our clients as well.   www.PLsource.com  \r\nI will also be sharing about our current Alibaba to Amazon course and our upcoming new class that begins May 1.  ","views":2444,"length":"57:48"},{"id":164814,"slug":"alibaba-to-amazon-2-0-begins-may-1","owner_name":"Andy Slamans","owner_slug":"andy--108","name":"Alibaba to Amazon 2.0 begins May 1","logo":"//s3.amazonaws.com/spreecast-photos/production/users/641675/tile_240x180/641675_photo.jpg?1399943906","url":"http://www.spreecast.com/events/alibaba-to-amazon-2-0-begins-may-1","type":"event","about":"We will be talking private labeling with current members of our Alibaba to Amazon course tonight.  Join us to hear how we have added sourcing from Alibaba to create our own branded product selling on Amazon.   I promise you will NOT hear words like CRUSH, MASTERMIND, NEXT LEVEL, or THOUGHT LEADER, we will let the internet marketers who are jumping on Amazon use those.   You will hear normal people who are growing their E-commerce business using a old fashioned tactic called WORK.  ","views":2241,"length":"01:11:49"},{"id":162457,"slug":"how-to-gain-momentum-in-2015","owner_name":"Andy Slamans","owner_slug":"andy--108","name":"How to Gain Momentum in 2015 ","logo":"//s3.amazonaws.com/spreecast-photos/production/users/641675/tile_240x180/641675_photo.jpg?1399943906","url":"http://www.spreecast.com/events/how-to-gain-momentum-in-2015","type":"event","about":"Greg Purdy is our special guest tonight.  Greg has had a tremendous influence on my business and has been a fantastic mentor as I have navigated Amazon and Ebay over the last 2 years.   Greg has more knowledge in his belly button about Amazon and Ebay than I have in my entire body.   Greg is hosting a terrific local meet up April 11 in Baltimore.  Sellers are flying in from TX, FL,MA and many other states to be part of it.  We will be giving away prizes every 10 min on tonights spree. :) \r\nhttp://www.eventbrite.com/e/2015-momentum-ecommerce-internet-marketing-conference-tickets-15338499866","views":2912,"length":"01:03:13"},{"id":164498,"slug":"international-and-back-to-school","owner_name":"Barrington McIntosh","owner_slug":"barrington--3","name":"International and Back to School","logo":"http://s3.amazonaws.com/spreecast-production/channels/671032/tile_240x180/671032_photo.jpg?1389101759","url":"http://www.spreecast.com/events/international-and-back-to-school","type":"event","about":"New Amazon Unified North American Account, Are you getting ready for Back to School Selling Season? ","views":1902,"length":"01:02:44"},{"id":164355,"slug":"treasure-hunting-with-katharyne-coffee","owner_name":"Katharyne Shelton","owner_slug":"katharyne","name":"Treasure Hunting with Katharyne- COFFEE!","logo":"//s3.amazonaws.com/spreecast-photos/production/users/648047/tile_240x180/648047_photo.jpg?1429853293","url":"http://www.spreecast.com/events/treasure-hunting-with-katharyne-coffee","type":"event","about":"Back to normal this week, but I have super special coffee! :) \r\n\r\nAll the treasure hunting news - yard sales, selling online and beyond!","views":832,"length":"55:56"}],"category":"Business & Career","is_expired":false,"unlisted_embed_enabled":true,"legacy_rtmp":false,"is_premium":false,"mobile_url":"http://www.spreecast.com/events/scanpower-conference-preview-5-2-15/mobile","mobile_ecma":"http://www.spreecast.com/events/scanpower-conference-preview-5-2-15/mobile_ecma_v","rsvp_count":21,"live":[]},{"about":"In this episode of Liberty Classics, Jeffrey Tucker reviews <a href=\"https://liberty.me/library/the-god-of-the-machine/\" target=\"_blank\"><em>The God of the Machine</em></a> by Isabel Paterson:\r\n\r\n\"Isabel Paterson (1886\u20131961) was one of the most erudite and widely educated thinkers to ever grace the libertarian world. This book is her masterwork. Its contents have not been sufficiently absorbed into the current intellectual world. It is one of those lost treasures, a book that you begin and your whole world stops. It is wise. It is prophetic. It has stood the test of time.\"\r\n\r\nFor more by Jeffrey Tucker, read his <a href=\"http://tucker.liberty.me/2015/04/29/baltimore-a-failed-experiment-in-central-planning/\" target=\"_blank\">latest article</a>.","broadcasters_enabled":true,"coproducable":true,"display_questions":0,"embed_share_url":null,"name":"Liberty Classics: The God of the Machine","not_startable_by_coproducers":false,"questions_enabled":true,"visibility":0,"start_at":"2015-05-04T00:00:00Z","start_at_epoch":1430697600000.0,"playback_start":0,"times":[null,null],"channel_name":"Liberty.Me's Channel","now_broadcasting":false,"status":0,"event_id":164960,"image_url":"http://s3.amazonaws.com/spreecast-production/events/164960/tile_480x360/img20150430-21745-6hsx0w.jpg?1430459937","twitter":{"search":null,"include":null},"host":{"about_me":"The global liberty community.\r\nhttps://liberty.me","first_name":"Liberty.me","has_been_authenticated":true,"last_name":"","needs_to_confirm_email":false,"user_id":"liberty-me","alt":912929,"admin":false,"content_mod":false,"profile_photo_thumb_url":"//s3.amazonaws.com/spreecast-photos/production/users/912929/tile_30x30/912929_photo.jpg?1417562291","is_fb":false,"ppv_approved":false,"is_affiliate":false,"following_events":[161694,164909,164960,164992],"is_locked":true,"plan_name":"Silver","can_create_spreecast":true,"allow_friend_requests":true,"vcat":null},"num_viewers":0,"friendly_id":"liberty-classics-the-god-of-the-machine","event_enabled":false,"views":48,"stitch_urls":{},"pre_event_extended_time":"30 minutes","questions_throttled":false,"broadcasters_throttled":false,"ad_on_air":false,"ads_enabled":false,"banner_ads_enabled":false,"recommended_content":[{"id":164628,"slug":"jeffrey-tucker-s-liberty-classics","owner_name":"Liberty.me","owner_slug":"liberty-me","name":"Jeffrey Tucker's Liberty Classics","logo":"http://s3.amazonaws.com/spreecast-production/events/164628/tile_240x180/img20150419-10179-2rtqh.jpg?1429457125","url":"http://www.spreecast.com/events/jeffrey-tucker-s-liberty-classics","type":"event","about":"Join Jeffrey Tucker for his Liberty Classics series featuring Pictures of the Socialistic Future by Eugene Richter.","views":899,"length":"01:07:23"},{"id":163340,"slug":"beer-bastards-ep-8","owner_name":"Liberty.me","owner_slug":"liberty-me","name":"Beer & Bastards Ep. 8","logo":"http://s3.amazonaws.com/spreecast-production/events/163340/tile_240x180/img20150314-29052-16ngvc3.jpg?1426385342","url":"http://www.spreecast.com/events/beer-bastards-ep-8","type":"event","about":"Tonight the Bastards take on Carl Gibson, founder of <a href=\"https://www.facebook.com/usauncut\" target=\"_blank\">US Uncut</a> -- one of the biggest \u201cliberal\u201d Facebook pages today. And the Bastards\u2019 own Matt Palumbo is one of his biggest critics.\r\n\r\nThe Bastards:\r\n\r\nMatt Palumbo of <a href=\"https://www.facebook.com/Being-Classically-Liberal/592589870775439\" target=\"_blank\">Being Classically Liberal</a>\r\n\r\nMike Lee of <a href=\"https://www.facebook.com/beingliberallogic\" target=\"_blank\">Being Liberal Logic</a>\r\n\r\nWill Ricciardella of <a href=\"https://www.facebook.com/MontPelerinSociety\" target=\"_blank\">The Analytical Conservative</a>\r\n\r\nKevin Ryan of <a href=\"https://www.facebook.com/UnbiasedAmerica?ref=br_tf\" target=\"_blank\">Unbiased America</a>\r\n\r\nTell us, <a href=\"http://liberty.me/groups/the-watering-hole/forum/topic/favorite-beers/\" target=\"_blank\">what's your favorite beer?</a>","views":1971,"length":"01:28:18"},{"id":163540,"slug":"beer-bastards-ep-9","owner_name":"Liberty.me","owner_slug":"liberty-me","name":"Beer & Bastards Ep. 9","logo":"http://s3.amazonaws.com/spreecast-production/events/163540/tile_240x180/img20150319-29731-1sdv9m5.jpg?1426749852","url":"http://www.spreecast.com/events/beer-bastards-ep-9","type":"event","about":"Welcome to another episode of Beer & Bastards, hosted by the admins of some of the most popular liberty-minded pages on Facebook!\r\n\r\n<a href=\"https://tucker.liberty.me/2015/03/24/yik-yak-suddenly-blasts-into-the-mainstream/\" target=\"_blank\">Ted Cruz is in the news</a>. This should be fun!\r\n\r\nThe Bastards:\r\n\r\nMatt Palumbo of <a href=\"https://www.facebook.com/Being-Classically-Liberal/592589870775439\" target=\"_blank\">Being Classically Liberal</a>\r\n\r\nMike Lee of <a href=\"https://www.facebook.com/beingliberallogic\" target=\"_blank\">Being Liberal Logic</a>\r\n\r\nWill Ricciardella of <a href=\"https://www.facebook.com/MontPelerinSociety\" target=\"_blank\">The Analytical Conservative</a>\r\n\r\nKevin Ryan of <a href=\"https://www.facebook.com/UnbiasedAmerica?ref=br_tf\" target=\"_blank\">Unbiased America</a>\r\n\r\n\r\nOnce you sober up, check out Jeffrey Tucker's new book, <a href=\"https://liberty.me/library/bit-by-bit/\" target=\"_blank\"><em>Bit by Bit: How P2P Is Freeing the World</em></a>.","views":915,"length":"01:14:34"},{"id":164799,"slug":"liberty-classics-the-law","owner_name":"Liberty.me","owner_slug":"liberty-me","name":"Liberty Classics: The Law","logo":"http://s3.amazonaws.com/spreecast-production/events/164799/tile_240x180/img20150424-17224-19bcsoj.jpg?1429930547","url":"http://www.spreecast.com/events/liberty-classics-the-law","type":"event","about":"This time on <em>Liberty Classics</em>, Jeffrey breaks down <a href=\"https://liberty.me/library/the-law/\" target=\"_blank\"><em>The Law</em></a> by <a href=\"https://liberty.me/authors/frederic-bastiat/\" target=\"_blank\">Fr\u00e9d\u00e9ric Bastiat</a>:\r\n\r\n\"<p class=\"noindent\">Most people accept the law as a given, a fundamental fact. As a member of society, you obey or face the consequences. It is safe not to question why. This is because the enforcement arm of the law is the state, that peculiar agency with a unique power in society to use legal force against life and property. The state says what the law is \u2014 however this decision was made \u2014 and that settles it.</p>\r\n<p class=\"indent\">Fr\u00e9d\u00e9ric Bastiat (1801\u20131850) could not accept this.</p>\"\r\n\r\n<p class=\"indent\">For more by Fr\u00e9d\u00e9ric Bastiat, check out <a href=\"http://bastiatinstitute.liberty.me/\" target=\"_blank\"><em>The Bastiat Institute</em></a>.</p>","views":603,"length":"01:13:03"},{"id":164453,"slug":"espn-nba-live-chat-episode-121","owner_name":"@TrueHoopTV","owner_slug":"truehooptv--2","name":"ESPN NBA Live Chat Episode 121","logo":"http://s3.amazonaws.com/spreecast-production/events/164453/tile_240x180/img20150414-24932-u59tpu.jpg?1429023987","url":"http://www.spreecast.com/events/espn-nba-live-chat-episode-121","type":"event","about":"Amin, Tom, Ethan, Bobby Kennedy, and YOU talking all things NBA. ","views":364859,"length":"01:15:35"},{"id":164651,"slug":"espn-nba-live-chat-episode-123","owner_name":"@TrueHoopTV","owner_slug":"truehooptv--2","name":"ESPN NBA Live Chat Episode 123","logo":"http://s3.amazonaws.com/spreecast-production/events/164651/tile_240x180/img20150420-17074-1xqs1j6.jpg?1429543452","url":"http://www.spreecast.com/events/espn-nba-live-chat-episode-123","type":"event","about":"Amin, maybe Tom, maybe Ethan...NBA Playoffs. ","views":678112,"length":"01:15:25"},{"id":164687,"slug":"espn-nba-live-chat-episode-124","owner_name":"@TrueHoopTV","owner_slug":"truehooptv--2","name":"ESPN NBA Live Chat Episode 124","logo":"http://s3.amazonaws.com/spreecast-production/events/164687/tile_240x180/img20150421-21288-49ip6c.jpg?1429634693","url":"http://www.spreecast.com/events/espn-nba-live-chat-episode-124","type":"event","about":"Amin, Ethan...maybe Tom. NBA Playoffs and YOU. Do it. ","views":110838,"length":"01:19:44"},{"id":164300,"slug":"espn-nba-live-chat-episode-120","owner_name":"@TrueHoopTV","owner_slug":"truehooptv--2","name":"ESPN NBA Live Chat Episode 120","logo":"http://s3.amazonaws.com/spreecast-production/events/164300/tile_240x180/img20150409-15203-1f8ffht.jpg?1428606478","url":"http://www.spreecast.com/events/espn-nba-live-chat-episode-120","type":"event","about":"","views":103669,"length":"01:06:06"},{"id":164710,"slug":"gonzo-grey","owner_name":"Kermit and Friends","owner_slug":"kermit-and-friends","name":"Gonzo Grey","logo":"http://s3.amazonaws.com/spreecast-production/events/164710/tile_240x180/164710_photo.jpg?1429686724","url":"http://www.spreecast.com/events/gonzo-grey","type":"event","about":"I wonder if Gonzo watched 50 Shades of Grey like I told him to? Or does he consider that Ryan Lever muppet type behavior?","views":5647,"length":"01:53:44"},{"id":163734,"slug":"commitcast-no-5-olb-rahshaun-smith","owner_name":"RecruitingNation","owner_slug":"recruitingnation","name":"CommitCast: No. 5 OLB Rahshaun Smith","logo":"http://s3.amazonaws.com/spreecast-production/events/163734/tile_240x180/img20150324-18416-bwv6lg.jpg?1427250191","url":"http://www.spreecast.com/events/commitcast-no-5-olb-rahshaun-smith","type":"event","about":"","views":232276,"length":"06:16"}],"category":"Books & Authors","is_expired":false,"unlisted_embed_enabled":true,"legacy_rtmp":false,"is_premium":false,"mobile_url":"http://www.spreecast.com/events/liberty-classics-the-god-of-the-machine/mobile","mobile_ecma":"http://www.spreecast.com/events/liberty-classics-the-god-of-the-machine/mobile_ecma_v","rsvp_count":7,"live":[]},{"about":"The ScanPower Conference is July 14-15 in Orlando, Florida! Details at scanpower.com/conference\r\nSpeakers include:\r\nJohn Lawson, Jason Smith, Karin Bergsagel, Dale Lenz, Steve Sawyer, Greg Murphy, Duane Malek, Chris Green, Andy Slamans, Irma Dehoyos-Rojas, Jay Bayne, Sam Cohen and more! Also join in with the $100,000/month crew of Harvey Spektor, Matt Kelly, and Todd Forster! This lineup is incredible so come network with these successful sellers and find out what it takes to get your business to the next level. \r\n\r\n$1995 single or $2995 couple (spouses, business partners)\r\n\r\nIncludes TWO FULL DAYS of speakers and discussions.\r\n\r\nTHREE NIGHTS HOTEL in downtown Disney.\r\n\r\n(If you are local and will not be staying at the hotel, please contact us for a partial refund)\r\n\r\nLunch on site both days.\r\n\r\nAll Inclusive Party of the Year on the 14th!","broadcasters_enabled":true,"coproducable":true,"display_questions":0,"embed_share_url":null,"name":"ScanPower Conference Preview 5/3/15","not_startable_by_coproducers":false,"questions_enabled":true,"visibility":0,"start_at":"2015-05-04T00:30:00Z","start_at_epoch":1430699400000.0,"playback_start":0,"times":[null,null],"channel_name":"ScanPower","now_broadcasting":false,"status":0,"event_id":164934,"image_url":"http://s3.amazonaws.com/spreecast-production/events/164934/tile_480x360/img20150430-18975-44ifuw.jpg?1430403569","twitter":{"search":null,"include":null},"host":{"about_me":"www.facebook.com/CHRIS &amp; www.facebook.com/HUSTLE \r\n\r\nMy NEW book/course, Online Arbitrage, on Amazon: http://www.amazon.com/dp/1500333824 (includes FREE Kindle copy)\r\n\r\nHusband to my beautiful wife and father to my awesome kids! Author, speaker, hustler, entrepreneur, online seller, and co-founder and director of www.ScanPower.com, the premier suite of pricing and data tools for Amazon sellers. \r\n\r\nMy book, Arbitrage, on Amazon: www.amazon.com/dp/1478251891\r\n\r\nScanPower Facebook Group: www.facebook.com/groups/scanpower\r\n\r\nLego Investing Facebook Group:  www.facebook.com/groups/legoinvesting","first_name":"ChrisGreen","has_been_authenticated":true,"last_name":"","needs_to_confirm_email":false,"user_id":"chrisgreen","alt":342104,"admin":false,"content_mod":false,"profile_photo_thumb_url":"//s3.amazonaws.com/spreecast-photos/production/users/342104/tile_30x30/342104_photo.jpg?1349323494","is_fb":true,"ppv_approved":false,"is_affiliate":false,"following_events":[164933,164934,164935,164976],"is_locked":true,"plan_name":"Silver","can_create_spreecast":true,"allow_friend_requests":true,"vcat":null},"num_viewers":0,"friendly_id":"scanpower-conference-preview-5-3-15","event_enabled":false,"views":53,"stitch_urls":{},"pre_event_extended_time":"30 minutes","questions_throttled":false,"broadcasters_throttled":false,"ad_on_air":false,"ads_enabled":false,"banner_ads_enabled":false,"recommended_content":[{"id":163837,"slug":"scanpower-radio-03-27-15","owner_name":"ChrisGreen","owner_slug":"chrisgreen","name":"ScanPower Radio - 03/27/15","logo":"http://s3.amazonaws.com/spreecast-production/events/163837/tile_240x180/img20150327-1707-zd93do.jpg?1427470759","url":"http://www.spreecast.com/events/scanpower-radio-03-27-15","type":"event","about":"The ScanPower Facebook Group hits 10,000 members today! Come celebrate and learn THREE awesome Amazon SEARCH HACKS on this episode of ScanPower Radio on SpreeCast!","views":1143,"length":"40:31"},{"id":164936,"slug":"scanpower-radio-05-01-15","owner_name":"ChrisGreen","owner_slug":"chrisgreen","name":"ScanPower Radio - 05/01/15","logo":"http://s3.amazonaws.com/spreecast-production/events/164936/tile_240x180/img20150430-17224-17i59dk.jpg?1430404306","url":"http://www.spreecast.com/events/scanpower-radio-05-01-15","type":"event","about":"The ScanPower Conference is July 14-15 in Orlando, Florida! Details at scanpower.com/conference\r\nSpeakers include:\r\nJohn Lawson, Jason Smith, Karin Bergsagel, Dale Lenz, Steve Sawyer, Greg Murphy, Duane Malek, Chris Green, Andy Slamans, Irma Dehoyos-Rojas, Jay Bayne, Sam Cohen and more! Also join in with the $100,000/month crew of Harvey Spektor, Matt Kelly, and Todd Forster! This lineup is incredible so come network with these successful sellers and find out what it takes to get your business to the next level. \r\n\r\n$1995 single or $2995 couple (spouses, business partners)\r\n\r\nIncludes TWO FULL DAYS of speakers and discussions.\r\n\r\nTHREE NIGHTS HOTEL in downtown Disney.\r\n\r\n(If you are local and will not be staying at the hotel, please contact us for a partial refund)\r\n\r\nLunch on site both days.\r\n\r\nAll Inclusive Party of the Year on the 14th!","views":539,"length":"55:43"},{"id":164931,"slug":"scanpower-conference-preview-4-30-15","owner_name":"ChrisGreen","owner_slug":"chrisgreen","name":"ScanPower Conference Preview 4/30/15","logo":"http://s3.amazonaws.com/spreecast-production/events/164931/tile_240x180/img20150430-29299-1u05ewe.jpg?1430403108","url":"http://www.spreecast.com/events/scanpower-conference-preview-4-30-15","type":"event","about":"The ScanPower Conference is July 14-15 in Orlando, Florida! Details at scanpower.com/conference\r\nSpeakers include:\r\nJohn Lawson, Jason Smith, Karin Bergsagel, Dale Lenz, Steve Sawyer, Greg Murphy, Duane Malek, Chris Green, Andy Slamans, Irma Dehoyos-Rojas, Jay Bayne, Sam Cohen and more! Also join in with the $100,000/month crew of Harvey Spektor, Matt Kelly, and Todd Forster! This lineup is incredible so come network with these successful sellers and find out what it takes to get your business to the next level. \r\n\r\n$1995 single or $2995 couple (spouses, business partners)\r\n\r\nIncludes TWO FULL DAYS of speakers and discussions.\r\n\r\nTHREE NIGHTS HOTEL in downtown Disney.\r\n\r\n(If you are local and will not be staying at the hotel, please contact us for a partial refund)\r\n\r\nLunch on site both days.\r\n\r\nAll Inclusive Party of the Year on the 14th!","views":409,"length":"32:27"},{"id":164932,"slug":"scanpower-conference-preview-5-1-15","owner_name":"ChrisGreen","owner_slug":"chrisgreen","name":"ScanPower Conference Preview 5/1/15","logo":"http://s3.amazonaws.com/spreecast-production/events/164932/tile_240x180/img20150430-29564-vhurer.jpg?1430403318","url":"http://www.spreecast.com/events/scanpower-conference-preview-5-1-15","type":"event","about":"The ScanPower Conference is July 14-15 in Orlando, Florida! Details at scanpower.com/conference\r\nSpeakers include:\r\nJohn Lawson, Jason Smith, Karin Bergsagel, Dale Lenz, Steve Sawyer, Greg Murphy, Duane Malek, Chris Green, Andy Slamans, Irma Dehoyos-Rojas, Jay Bayne, Sam Cohen and more! Also join in with the $100,000/month crew of Harvey Spektor, Matt Kelly, and Todd Forster! This lineup is incredible so come network with these successful sellers and find out what it takes to get your business to the next level. \r\n\r\n$1995 single or $2995 couple (spouses, business partners)\r\n\r\nIncludes TWO FULL DAYS of speakers and discussions.\r\n\r\nTHREE NIGHTS HOTEL in downtown Disney.\r\n\r\n(If you are local and will not be staying at the hotel, please contact us for a partial refund)\r\n\r\nLunch on site both days.\r\n\r\nAll Inclusive Party of the Year on the 14th!","views":251,"length":"24:34"},{"id":164128,"slug":"private-label-your-biz-to-75k-per-month","owner_name":"Andy Slamans","owner_slug":"andy--108","name":"Private Label Your biz to 75k per Month ","logo":"//s3.amazonaws.com/spreecast-photos/production/users/641675/tile_240x180/641675_photo.jpg?1399943906","url":"http://www.spreecast.com/events/private-label-your-biz-to-75k-per-month","type":"event","about":"I will share the top reasons I have been able to scale my amazon business to $75k per month selling Private Label products I import from China and India.  My goal is to hit 100k per month by August of 2015 by continuing to add new imported products every month.  ","views":4439,"length":"01:12:50"},{"id":164378,"slug":"pl-products-under-2000-rank","owner_name":"Andy Slamans","owner_slug":"andy--108","name":"PL products under 2000 rank=$$$$","logo":"//s3.amazonaws.com/spreecast-photos/production/users/641675/tile_240x180/641675_photo.jpg?1399943906","url":"http://www.spreecast.com/events/pl-products-under-2000-rank","type":"event","about":"Join me tonight as I share a new Private Label service I will be offering.  I have been working with a software developer who has come up with a program that can identify each product  in every Amazon category that is under 2,000 rank.  We have looked at all 2000  of these products and hand picked products that can be private labeled.  We have manufacture contact information for each of these products that we will hand to our clients as well.   www.PLsource.com  \r\nI will also be sharing about our current Alibaba to Amazon course and our upcoming new class that begins May 1.  ","views":2444,"length":"57:48"},{"id":164814,"slug":"alibaba-to-amazon-2-0-begins-may-1","owner_name":"Andy Slamans","owner_slug":"andy--108","name":"Alibaba to Amazon 2.0 begins May 1","logo":"//s3.amazonaws.com/spreecast-photos/production/users/641675/tile_240x180/641675_photo.jpg?1399943906","url":"http://www.spreecast.com/events/alibaba-to-amazon-2-0-begins-may-1","type":"event","about":"We will be talking private labeling with current members of our Alibaba to Amazon course tonight.  Join us to hear how we have added sourcing from Alibaba to create our own branded product selling on Amazon.   I promise you will NOT hear words like CRUSH, MASTERMIND, NEXT LEVEL, or THOUGHT LEADER, we will let the internet marketers who are jumping on Amazon use those.   You will hear normal people who are growing their E-commerce business using a old fashioned tactic called WORK.  ","views":2241,"length":"01:11:49"},{"id":162457,"slug":"how-to-gain-momentum-in-2015","owner_name":"Andy Slamans","owner_slug":"andy--108","name":"How to Gain Momentum in 2015 ","logo":"//s3.amazonaws.com/spreecast-photos/production/users/641675/tile_240x180/641675_photo.jpg?1399943906","url":"http://www.spreecast.com/events/how-to-gain-momentum-in-2015","type":"event","about":"Greg Purdy is our special guest tonight.  Greg has had a tremendous influence on my business and has been a fantastic mentor as I have navigated Amazon and Ebay over the last 2 years.   Greg has more knowledge in his belly button about Amazon and Ebay than I have in my entire body.   Greg is hosting a terrific local meet up April 11 in Baltimore.  Sellers are flying in from TX, FL,MA and many other states to be part of it.  We will be giving away prizes every 10 min on tonights spree. :) \r\nhttp://www.eventbrite.com/e/2015-momentum-ecommerce-internet-marketing-conference-tickets-15338499866","views":2912,"length":"01:03:13"},{"id":164498,"slug":"international-and-back-to-school","owner_name":"Barrington McIntosh","owner_slug":"barrington--3","name":"International and Back to School","logo":"http://s3.amazonaws.com/spreecast-production/channels/671032/tile_240x180/671032_photo.jpg?1389101759","url":"http://www.spreecast.com/events/international-and-back-to-school","type":"event","about":"New Amazon Unified North American Account, Are you getting ready for Back to School Selling Season? ","views":1902,"length":"01:02:44"},{"id":164355,"slug":"treasure-hunting-with-katharyne-coffee","owner_name":"Katharyne Shelton","owner_slug":"katharyne","name":"Treasure Hunting with Katharyne- COFFEE!","logo":"//s3.amazonaws.com/spreecast-photos/production/users/648047/tile_240x180/648047_photo.jpg?1429853293","url":"http://www.spreecast.com/events/treasure-hunting-with-katharyne-coffee","type":"event","about":"Back to normal this week, but I have super special coffee! :) \r\n\r\nAll the treasure hunting news - yard sales, selling online and beyond!","views":832,"length":"55:56"}],"category":"Business & Career","is_expired":false,"unlisted_embed_enabled":true,"legacy_rtmp":false,"is_premium":false,"mobile_url":"http://www.spreecast.com/events/scanpower-conference-preview-5-3-15/mobile","mobile_ecma":"http://www.spreecast.com/events/scanpower-conference-preview-5-3-15/mobile_ecma_v","rsvp_count":18,"live":[]},{"about":"Bob (1/2 mangia) vamps on food, food prep, party ideas, and Sunday Dinner.  Always an AMA session!! Lets talk all things Mothers Day and why the Mum is so great!","broadcasters_enabled":true,"coproducable":true,"display_questions":0,"embed_share_url":null,"name":"Cooking Vamp 26 'Best advice from Mom'","not_startable_by_coproducers":false,"questions_enabled":true,"visibility":0,"start_at":"2015-05-04T23:30:00Z","start_at_epoch":1430782200000.0,"playback_start":0,"times":[null,null],"channel_name":"Robert Heffernan's Channel","now_broadcasting":false,"status":0,"event_id":164965,"image_url":"//s3.amazonaws.com/spreecast-photos/production/users/715587/tile_480x360/715587_photo.jpg?1422385057","twitter":{"search":null,"include":null},"host":{"about_me":"Hi, I'm Bob.. @1halfmangiatv . Follow us as we fry, bake, and grill our way through the internet and into your heart. We\u2019ll explore the best tools, methods, and ingredients for eating, cooking, and cocktailing. From amuse-bouche to zymology, Mangia.tv is your ticket to the internet\u2019s temple of tasty.","first_name":"Robert","has_been_authenticated":true,"last_name":"Heffernan","needs_to_confirm_email":false,"user_id":"robert--211","alt":715587,"admin":false,"content_mod":false,"profile_photo_thumb_url":"//s3.amazonaws.com/spreecast-photos/production/users/715587/tile_30x30/715587_photo.jpg?1422385057","is_fb":false,"ppv_approved":true,"is_affiliate":false,"following_events":[164965],"is_locked":true,"plan_name":"Bronze","can_create_spreecast":true,"allow_friend_requests":true,"vcat":null},"num_viewers":0,"friendly_id":"cooking-vamp-26-best-advice-from-mom","event_enabled":false,"views":136,"stitch_urls":{},"pre_event_extended_time":"30 minutes","questions_throttled":false,"broadcasters_throttled":false,"ad_on_air":false,"ads_enabled":false,"banner_ads_enabled":false,"recommended_content":[{"id":164750,"slug":"cooking-vamp-25-taste-of-therapy","owner_name":"Robert Heffernan","owner_slug":"robert--211","name":"Cooking Vamp 25 'Taste of Therapy'","logo":"//s3.amazonaws.com/spreecast-photos/production/users/715587/tile_240x180/715587_photo.jpg?1422385057","url":"http://www.spreecast.com/events/cooking-vamp-25-taste-of-therapy","type":"event","about":"Bob (1/2 mangia) vamps on food, food prep, party ideas, and Sunday Dinner. Always an AMA session!! Join me with family therapist Allison Carver.  ","views":1030,"length":"34:58"},{"id":164288,"slug":"cooking-vamp-24-biloxi-food-golf","owner_name":"Robert Heffernan","owner_slug":"robert--211","name":"Cooking Vamp 24 'Biloxi Food & Golf'","logo":"//s3.amazonaws.com/spreecast-photos/production/users/715587/tile_240x180/715587_photo.jpg?1422385057","url":"http://www.spreecast.com/events/cooking-vamp-24-biloxi-food-golf","type":"event","about":"\r\nBob (1/2 mangia) vamps on food, food prep, party ideas, and Sunday Dinner.  Always an AMA session!! Lets Vamp on Biloxi MS.  Great golf, and Better FOOD!","views":930,"length":"24:35"},{"id":164013,"slug":"cooking-vamp-23-game-of-thrones-menu","owner_name":"Robert Heffernan","owner_slug":"robert--211","name":"Cooking Vamp 23 'Game of Thrones Menu'","logo":"//s3.amazonaws.com/spreecast-photos/production/users/715587/tile_240x180/715587_photo.jpg?1422385057","url":"http://www.spreecast.com/events/cooking-vamp-23-game-of-thrones-menu","type":"event","about":"Bob (1/2 mangia) vamps on food, food prep, party ideas, and Sunday Dinner.  Always an AMA session!! Its 'Game of Thrones' Premier time.  Whats on your party menu? ","views":1341,"length":"31:37"},{"id":163839,"slug":"cooking-vamp-22-rub-yer-fruits","owner_name":"Robert Heffernan","owner_slug":"robert--211","name":"Cooking Vamp 22 'Rub yer Fruits'","logo":"//s3.amazonaws.com/spreecast-photos/production/users/715587/tile_240x180/715587_photo.jpg?1422385057","url":"http://www.spreecast.com/events/cooking-vamp-22-rub-yer-fruits","type":"event","about":"\r\nBob (1/2 mangia) vamps on food, food prep, party ideas, and Sunday Dinner.  Always an AMA session!! What are the best fruits to grill? Lets talk about it!","views":1210,"length":"21:22"},{"id":164453,"slug":"espn-nba-live-chat-episode-121","owner_name":"@TrueHoopTV","owner_slug":"truehooptv--2","name":"ESPN NBA Live Chat Episode 121","logo":"http://s3.amazonaws.com/spreecast-production/events/164453/tile_240x180/img20150414-24932-u59tpu.jpg?1429023987","url":"http://www.spreecast.com/events/espn-nba-live-chat-episode-121","type":"event","about":"Amin, Tom, Ethan, Bobby Kennedy, and YOU talking all things NBA. ","views":364859,"length":"01:15:35"},{"id":164651,"slug":"espn-nba-live-chat-episode-123","owner_name":"@TrueHoopTV","owner_slug":"truehooptv--2","name":"ESPN NBA Live Chat Episode 123","logo":"http://s3.amazonaws.com/spreecast-production/events/164651/tile_240x180/img20150420-17074-1xqs1j6.jpg?1429543452","url":"http://www.spreecast.com/events/espn-nba-live-chat-episode-123","type":"event","about":"Amin, maybe Tom, maybe Ethan...NBA Playoffs. ","views":678112,"length":"01:15:25"},{"id":164687,"slug":"espn-nba-live-chat-episode-124","owner_name":"@TrueHoopTV","owner_slug":"truehooptv--2","name":"ESPN NBA Live Chat Episode 124","logo":"http://s3.amazonaws.com/spreecast-production/events/164687/tile_240x180/img20150421-21288-49ip6c.jpg?1429634693","url":"http://www.spreecast.com/events/espn-nba-live-chat-episode-124","type":"event","about":"Amin, Ethan...maybe Tom. NBA Playoffs and YOU. Do it. ","views":110838,"length":"01:19:44"},{"id":164300,"slug":"espn-nba-live-chat-episode-120","owner_name":"@TrueHoopTV","owner_slug":"truehooptv--2","name":"ESPN NBA Live Chat Episode 120","logo":"http://s3.amazonaws.com/spreecast-production/events/164300/tile_240x180/img20150409-15203-1f8ffht.jpg?1428606478","url":"http://www.spreecast.com/events/espn-nba-live-chat-episode-120","type":"event","about":"","views":103669,"length":"01:06:06"},{"id":161971,"slug":"live-q-a-call-with-chef-frank","owner_name":"Frank Giglio","owner_slug":"frank--153","name":"Live Q&A Call with Chef Frank!","logo":"http://s3.amazonaws.com/spreecast-production/events/161971/tile_240x180/img20150223-9512-jzdix8.jpg?1424721707","url":"http://www.spreecast.com/events/live-q-a-call-with-chef-frank","type":"event","about":"Q&A and Demo Call with Chef Frank, answering your questions about Chef Frank's Traditional Cookery Training - www.threelilyfarm.com","views":1110,"length":"01:11:37"},{"id":164710,"slug":"gonzo-grey","owner_name":"Kermit and Friends","owner_slug":"kermit-and-friends","name":"Gonzo Grey","logo":"http://s3.amazonaws.com/spreecast-production/events/164710/tile_240x180/164710_photo.jpg?1429686724","url":"http://www.spreecast.com/events/gonzo-grey","type":"event","about":"I wonder if Gonzo watched 50 Shades of Grey like I told him to? Or does he consider that Ryan Lever muppet type behavior?","views":5647,"length":"01:53:44"}],"category":"Food & Cooking","is_expired":false,"unlisted_embed_enabled":true,"legacy_rtmp":false,"is_premium":false,"mobile_url":"http://www.spreecast.com/events/cooking-vamp-26-best-advice-from-mom/mobile","mobile_ecma":"http://www.spreecast.com/events/cooking-vamp-26-best-advice-from-mom/mobile_ecma_v","rsvp_count":2,"live":[]},{"about":"The ScanPower Conference is July 14-15 in Orlando, Florida! Details at scanpower.com/conference\r\nSpeakers include:\r\nJohn Lawson, Jason Smith, Karin Bergsagel, Dale Lenz, Steve Sawyer, Greg Murphy, Duane Malek, Chris Green, Andy Slamans, Irma Dehoyos-Rojas, Jay Bayne, Sam Cohen and more! Also join in with the $100,000/month crew of Harvey Spektor, Matt Kelly, and Todd Forster! This lineup is incredible so come network with these successful sellers and find out what it takes to get your business to the next level. \r\n\r\n$1995 single or $2995 couple (spouses, business partners)\r\n\r\nIncludes TWO FULL DAYS of speakers and discussions.\r\n\r\nTHREE NIGHTS HOTEL in downtown Disney.\r\n\r\n(If you are local and will not be staying at the hotel, please contact us for a partial refund)\r\n\r\nLunch on site both days.\r\n\r\nAll Inclusive Party of the Year on the 14th!","broadcasters_enabled":true,"coproducable":true,"display_questions":0,"embed_share_url":null,"name":"ScanPower Conference Preview 5/4/15","not_startable_by_coproducers":false,"questions_enabled":true,"visibility":0,"start_at":"2015-05-05T00:30:00Z","start_at_epoch":1430785800000.0,"playback_start":0,"times":[null,null],"channel_name":"ScanPower","now_broadcasting":false,"status":0,"event_id":164935,"image_url":"http://s3.amazonaws.com/spreecast-production/events/164935/tile_480x360/img20150430-18950-xjx5zu.jpg?1430403683","twitter":{"search":null,"include":null},"host":{"about_me":"www.facebook.com/CHRIS &amp; www.facebook.com/HUSTLE \r\n\r\nMy NEW book/course, Online Arbitrage, on Amazon: http://www.amazon.com/dp/1500333824 (includes FREE Kindle copy)\r\n\r\nHusband to my beautiful wife and father to my awesome kids! Author, speaker, hustler, entrepreneur, online seller, and co-founder and director of www.ScanPower.com, the premier suite of pricing and data tools for Amazon sellers. \r\n\r\nMy book, Arbitrage, on Amazon: www.amazon.com/dp/1478251891\r\n\r\nScanPower Facebook Group: www.facebook.com/groups/scanpower\r\n\r\nLego Investing Facebook Group:  www.facebook.com/groups/legoinvesting","first_name":"ChrisGreen","has_been_authenticated":true,"last_name":"","needs_to_confirm_email":false,"user_id":"chrisgreen","alt":342104,"admin":false,"content_mod":false,"profile_photo_thumb_url":"//s3.amazonaws.com/spreecast-photos/production/users/342104/tile_30x30/342104_photo.jpg?1349323494","is_fb":true,"ppv_approved":false,"is_affiliate":false,"following_events":[164933,164934,164935,164976],"is_locked":true,"plan_name":"Silver","can_create_spreecast":true,"allow_friend_requests":true,"vcat":null},"num_viewers":0,"friendly_id":"scanpower-conference-preview-5-4-15","event_enabled":false,"views":86,"stitch_urls":{},"pre_event_extended_time":"30 minutes","questions_throttled":false,"broadcasters_throttled":false,"ad_on_air":false,"ads_enabled":false,"banner_ads_enabled":false,"recommended_content":[{"id":163837,"slug":"scanpower-radio-03-27-15","owner_name":"ChrisGreen","owner_slug":"chrisgreen","name":"ScanPower Radio - 03/27/15","logo":"http://s3.amazonaws.com/spreecast-production/events/163837/tile_240x180/img20150327-1707-zd93do.jpg?1427470759","url":"http://www.spreecast.com/events/scanpower-radio-03-27-15","type":"event","about":"The ScanPower Facebook Group hits 10,000 members today! Come celebrate and learn THREE awesome Amazon SEARCH HACKS on this episode of ScanPower Radio on SpreeCast!","views":1143,"length":"40:31"},{"id":164936,"slug":"scanpower-radio-05-01-15","owner_name":"ChrisGreen","owner_slug":"chrisgreen","name":"ScanPower Radio - 05/01/15","logo":"http://s3.amazonaws.com/spreecast-production/events/164936/tile_240x180/img20150430-17224-17i59dk.jpg?1430404306","url":"http://www.spreecast.com/events/scanpower-radio-05-01-15","type":"event","about":"The ScanPower Conference is July 14-15 in Orlando, Florida! Details at scanpower.com/conference\r\nSpeakers include:\r\nJohn Lawson, Jason Smith, Karin Bergsagel, Dale Lenz, Steve Sawyer, Greg Murphy, Duane Malek, Chris Green, Andy Slamans, Irma Dehoyos-Rojas, Jay Bayne, Sam Cohen and more! Also join in with the $100,000/month crew of Harvey Spektor, Matt Kelly, and Todd Forster! This lineup is incredible so come network with these successful sellers and find out what it takes to get your business to the next level. \r\n\r\n$1995 single or $2995 couple (spouses, business partners)\r\n\r\nIncludes TWO FULL DAYS of speakers and discussions.\r\n\r\nTHREE NIGHTS HOTEL in downtown Disney.\r\n\r\n(If you are local and will not be staying at the hotel, please contact us for a partial refund)\r\n\r\nLunch on site both days.\r\n\r\nAll Inclusive Party of the Year on the 14th!","views":539,"length":"55:43"},{"id":164931,"slug":"scanpower-conference-preview-4-30-15","owner_name":"ChrisGreen","owner_slug":"chrisgreen","name":"ScanPower Conference Preview 4/30/15","logo":"http://s3.amazonaws.com/spreecast-production/events/164931/tile_240x180/img20150430-29299-1u05ewe.jpg?1430403108","url":"http://www.spreecast.com/events/scanpower-conference-preview-4-30-15","type":"event","about":"The ScanPower Conference is July 14-15 in Orlando, Florida! Details at scanpower.com/conference\r\nSpeakers include:\r\nJohn Lawson, Jason Smith, Karin Bergsagel, Dale Lenz, Steve Sawyer, Greg Murphy, Duane Malek, Chris Green, Andy Slamans, Irma Dehoyos-Rojas, Jay Bayne, Sam Cohen and more! Also join in with the $100,000/month crew of Harvey Spektor, Matt Kelly, and Todd Forster! This lineup is incredible so come network with these successful sellers and find out what it takes to get your business to the next level. \r\n\r\n$1995 single or $2995 couple (spouses, business partners)\r\n\r\nIncludes TWO FULL DAYS of speakers and discussions.\r\n\r\nTHREE NIGHTS HOTEL in downtown Disney.\r\n\r\n(If you are local and will not be staying at the hotel, please contact us for a partial refund)\r\n\r\nLunch on site both days.\r\n\r\nAll Inclusive Party of the Year on the 14th!","views":409,"length":"32:27"},{"id":164932,"slug":"scanpower-conference-preview-5-1-15","owner_name":"ChrisGreen","owner_slug":"chrisgreen","name":"ScanPower Conference Preview 5/1/15","logo":"http://s3.amazonaws.com/spreecast-production/events/164932/tile_240x180/img20150430-29564-vhurer.jpg?1430403318","url":"http://www.spreecast.com/events/scanpower-conference-preview-5-1-15","type":"event","about":"The ScanPower Conference is July 14-15 in Orlando, Florida! Details at scanpower.com/conference\r\nSpeakers include:\r\nJohn Lawson, Jason Smith, Karin Bergsagel, Dale Lenz, Steve Sawyer, Greg Murphy, Duane Malek, Chris Green, Andy Slamans, Irma Dehoyos-Rojas, Jay Bayne, Sam Cohen and more! Also join in with the $100,000/month crew of Harvey Spektor, Matt Kelly, and Todd Forster! This lineup is incredible so come network with these successful sellers and find out what it takes to get your business to the next level. \r\n\r\n$1995 single or $2995 couple (spouses, business partners)\r\n\r\nIncludes TWO FULL DAYS of speakers and discussions.\r\n\r\nTHREE NIGHTS HOTEL in downtown Disney.\r\n\r\n(If you are local and will not be staying at the hotel, please contact us for a partial refund)\r\n\r\nLunch on site both days.\r\n\r\nAll Inclusive Party of the Year on the 14th!","views":251,"length":"24:34"},{"id":164128,"slug":"private-label-your-biz-to-75k-per-month","owner_name":"Andy Slamans","owner_slug":"andy--108","name":"Private Label Your biz to 75k per Month ","logo":"//s3.amazonaws.com/spreecast-photos/production/users/641675/tile_240x180/641675_photo.jpg?1399943906","url":"http://www.spreecast.com/events/private-label-your-biz-to-75k-per-month","type":"event","about":"I will share the top reasons I have been able to scale my amazon business to $75k per month selling Private Label products I import from China and India.  My goal is to hit 100k per month by August of 2015 by continuing to add new imported products every month.  ","views":4439,"length":"01:12:50"},{"id":164378,"slug":"pl-products-under-2000-rank","owner_name":"Andy Slamans","owner_slug":"andy--108","name":"PL products under 2000 rank=$$$$","logo":"//s3.amazonaws.com/spreecast-photos/production/users/641675/tile_240x180/641675_photo.jpg?1399943906","url":"http://www.spreecast.com/events/pl-products-under-2000-rank","type":"event","about":"Join me tonight as I share a new Private Label service I will be offering.  I have been working with a software developer who has come up with a program that can identify each product  in every Amazon category that is under 2,000 rank.  We have looked at all 2000  of these products and hand picked products that can be private labeled.  We have manufacture contact information for each of these products that we will hand to our clients as well.   www.PLsource.com  \r\nI will also be sharing about our current Alibaba to Amazon course and our upcoming new class that begins May 1.  ","views":2444,"length":"57:48"},{"id":164814,"slug":"alibaba-to-amazon-2-0-begins-may-1","owner_name":"Andy Slamans","owner_slug":"andy--108","name":"Alibaba to Amazon 2.0 begins May 1","logo":"//s3.amazonaws.com/spreecast-photos/production/users/641675/tile_240x180/641675_photo.jpg?1399943906","url":"http://www.spreecast.com/events/alibaba-to-amazon-2-0-begins-may-1","type":"event","about":"We will be talking private labeling with current members of our Alibaba to Amazon course tonight.  Join us to hear how we have added sourcing from Alibaba to create our own branded product selling on Amazon.   I promise you will NOT hear words like CRUSH, MASTERMIND, NEXT LEVEL, or THOUGHT LEADER, we will let the internet marketers who are jumping on Amazon use those.   You will hear normal people who are growing their E-commerce business using a old fashioned tactic called WORK.  ","views":2241,"length":"01:11:49"},{"id":162457,"slug":"how-to-gain-momentum-in-2015","owner_name":"Andy Slamans","owner_slug":"andy--108","name":"How to Gain Momentum in 2015 ","logo":"//s3.amazonaws.com/spreecast-photos/production/users/641675/tile_240x180/641675_photo.jpg?1399943906","url":"http://www.spreecast.com/events/how-to-gain-momentum-in-2015","type":"event","about":"Greg Purdy is our special guest tonight.  Greg has had a tremendous influence on my business and has been a fantastic mentor as I have navigated Amazon and Ebay over the last 2 years.   Greg has more knowledge in his belly button about Amazon and Ebay than I have in my entire body.   Greg is hosting a terrific local meet up April 11 in Baltimore.  Sellers are flying in from TX, FL,MA and many other states to be part of it.  We will be giving away prizes every 10 min on tonights spree. :) \r\nhttp://www.eventbrite.com/e/2015-momentum-ecommerce-internet-marketing-conference-tickets-15338499866","views":2912,"length":"01:03:13"},{"id":164498,"slug":"international-and-back-to-school","owner_name":"Barrington McIntosh","owner_slug":"barrington--3","name":"International and Back to School","logo":"http://s3.amazonaws.com/spreecast-production/channels/671032/tile_240x180/671032_photo.jpg?1389101759","url":"http://www.spreecast.com/events/international-and-back-to-school","type":"event","about":"New Amazon Unified North American Account, Are you getting ready for Back to School Selling Season? ","views":1902,"length":"01:02:44"},{"id":164355,"slug":"treasure-hunting-with-katharyne-coffee","owner_name":"Katharyne Shelton","owner_slug":"katharyne","name":"Treasure Hunting with Katharyne- COFFEE!","logo":"//s3.amazonaws.com/spreecast-photos/production/users/648047/tile_240x180/648047_photo.jpg?1429853293","url":"http://www.spreecast.com/events/treasure-hunting-with-katharyne-coffee","type":"event","about":"Back to normal this week, but I have super special coffee! :) \r\n\r\nAll the treasure hunting news - yard sales, selling online and beyond!","views":832,"length":"55:56"}],"category":"Business & Career","is_expired":false,"unlisted_embed_enabled":true,"legacy_rtmp":false,"is_premium":false,"mobile_url":"http://www.spreecast.com/events/scanpower-conference-preview-5-4-15/mobile","mobile_ecma":"http://www.spreecast.com/events/scanpower-conference-preview-5-4-15/mobile_ecma_v","rsvp_count":21,"live":[]},{"about":"Our breathing patterns are programmed by prenatal, neo-natal, and life-long experiences, often becoming less than efficient.  Learn how these patterns can be reset for optimal health.","broadcasters_enabled":true,"coproducable":true,"display_questions":0,"embed_share_url":null,"name":"Ep 39 Laynee. Restoring your breath.","not_startable_by_coproducers":false,"questions_enabled":true,"visibility":0,"start_at":"2015-05-05T01:30:00Z","start_at_epoch":1430789400000.0,"playback_start":0,"times":[null,null],"channel_name":"Airway and Facial Devo Collaborative","now_broadcasting":false,"status":0,"event_id":164917,"image_url":"http://s3.amazonaws.com/spreecast-production/channels/438551/tile_480x360/438551_photo.jpg?1359272646","twitter":{"search":null,"include":null},"host":{"about_me":"An ongoing series of interviews and discussion about the relationship between the airway and facial growth.  We look at the etiology of facial and dental problems.  The seminar is free to all those who have an invitation.","first_name":"The Airway","has_been_authenticated":true,"last_name":"and Facial Development Collaboration","needs_to_confirm_email":false,"user_id":"the-airway","alt":373540,"admin":false,"content_mod":false,"profile_photo_thumb_url":"//s3.amazonaws.com/spreecast-photos/production/users/373540/tile_30x30/373540_photo.jpg?1361151093","is_fb":false,"ppv_approved":true,"is_affiliate":false,"following_events":[164917],"is_locked":true,"plan_name":"Bronze","can_create_spreecast":true,"allow_friend_requests":true,"vcat":null},"num_viewers":1,"friendly_id":"ep-39-laynee-restoring-your-breath","event_enabled":false,"views":89,"stitch_urls":{},"pre_event_extended_time":"30 minutes","questions_throttled":false,"broadcasters_throttled":false,"ad_on_air":false,"ads_enabled":false,"banner_ads_enabled":false,"recommended_content":[{"id":164535,"slug":"ep38-no-turning-back-vol-2","owner_name":"The Airway and Facial Development Collaboration","owner_slug":"the-airway","name":"Ep38 No Turning Back: Vol.2","logo":"http://s3.amazonaws.com/spreecast-production/channels/438551/tile_240x180/438551_photo.jpg?1359272646","url":"http://www.spreecast.com/events/ep38-no-turning-back-vol-2","type":"event","about":"Oral Surgeon Bob Wheeler talks about how \"Airway\" has changed his thinking and practice of maxillofacial surgery.","views":710,"length":"01:08:10"},{"id":163814,"slug":"ep-37-recap-of-aapmd-annual-session","owner_name":"The Airway and Facial Development Collaboration","owner_slug":"the-airway","name":"Ep 37 Recap of AAPMD annual session","logo":"http://s3.amazonaws.com/spreecast-production/channels/438551/tile_240x180/438551_photo.jpg?1359272646","url":"http://www.spreecast.com/events/ep-37-recap-of-aapmd-annual-session","type":"event","about":"The American Academy of Physiologic Medicine and Dentistry is having it's symposium in NYC this weekend. Mark and I will be there to report.","views":1135,"length":"01:09:50"},{"id":162711,"slug":"ep-36-ron-harper-osa-and-the-brain","owner_name":"The Airway and Facial Development Collaboration","owner_slug":"the-airway","name":"Ep 36 Ron Harper: OSA and the Brain","logo":"http://s3.amazonaws.com/spreecast-production/channels/438551/tile_240x180/438551_photo.jpg?1359272646","url":"http://www.spreecast.com/events/ep-36-ron-harper-osa-and-the-brain","type":"event","about":"Poor breathing at night affects many parts of our body...including the brain.  It's absolutely frightening what a lack of oxygen can do....especially if you DO wake up the next morning.","views":1952,"length":"01:39:00"},{"id":162508,"slug":"ep-35-phil-mollica-on-ozone-in-dentistry","owner_name":"The Airway and Facial Development Collaboration","owner_slug":"the-airway","name":"Ep 35 Phil Mollica on Ozone in Dentistry","logo":"http://s3.amazonaws.com/spreecast-production/channels/438551/tile_240x180/438551_photo.jpg?1359272646","url":"http://www.spreecast.com/events/ep-35-phil-mollica-on-ozone-in-dentistry","type":"event","about":"Ozone is finding many uses in medicine and dentistry.  Phil Mollica, a dentist and naturopath, is one of the world's leading teachers on it's use.","views":808,"length":"01:13:24"},{"id":161498,"slug":"swallowing-disorders-treatment","owner_name":"Cleveland Clinic","owner_slug":"cleveland-clinic--2","name":"Swallowing Disorders &Treatment","logo":"//s3.amazonaws.com/spreecast-photos/production/users/521133/tile_240x180/521133_photo.jpg?1380112891","url":"http://www.spreecast.com/events/swallowing-disorders-treatment","type":"event","about":"Swallowing  and esophageal disorders, such as esophagitis, gastroesophageal reflux disease (GERD), Barrett\u2019s esophagus and achalasia  affect more than 15 million Americans, and range in severity and be chronic concerns that plague daily life. However, disorders can be treated successfully before long-term damage occurs. Join Dr. Gabbard and Dr. Raja, along with the Achalasia\r\nAwareness Organization as we answer your questions.\r\n","views":2043,"length":"01:04:22"},{"id":162274,"slug":"dialysis-vascular-access","owner_name":"Cleveland Clinic","owner_slug":"cleveland-clinic--2","name":"Dialysis Vascular Access","logo":"//s3.amazonaws.com/spreecast-photos/production/users/521133/tile_240x180/521133_photo.jpg?1380112891","url":"http://www.spreecast.com/events/dialysis-vascular-access","type":"event","about":"Cleveland Clinic vascular surgeon, Dr. Lee Kirksey will present creative options to reduce dialysis catheter use and understanding the systems approach to vascular assess.  This spreecast is geared toward medical professionals who work with dialysis. ","views":805,"length":"55:59"},{"id":162538,"slug":"heart-rhythm-care-in-adults-and-children","owner_name":"Cleveland Clinic","owner_slug":"cleveland-clinic--2","name":"Heart Rhythm Care in Adults and Children","logo":"//s3.amazonaws.com/spreecast-photos/production/users/521133/tile_240x180/521133_photo.jpg?1380112891","url":"http://www.spreecast.com/events/heart-rhythm-care-in-adults-and-children","type":"event","about":"Abnormal heart beats (arrhythmias) can occur in adults and children, including inherited arrhythmia disorders such as Long QT syndrome, short QT syndrome, and Brugada syndrome.  Ask Cleveland Clinic doctors your questions about arrhythmias","views":1249,"length":"01:02:28"},{"id":160068,"slug":"lyme-disease-what-you-need-to-know","owner_name":"Cleveland Clinic","owner_slug":"cleveland-clinic--2","name":"Lyme Disease: What You Need To Know","logo":"//s3.amazonaws.com/spreecast-photos/production/users/521133/tile_240x180/521133_photo.jpg?1380112891","url":"http://www.spreecast.com/events/lyme-disease-what-you-need-to-know","type":"event","about":"Lyme disease is the 5th most nationally reported disease in the U.S. It is also the most commonly reported tick-borne disease in the U.S. Each year, approximately 30,000 cases of Lyme disease are reported to CDC by state health departments. And yet this data does not reflect every case that occurs on a yearly basis. \r\n\r\nIn 2013, 95% of the confirmed cases were reported from 14 different states being concentrated heavily in the northeast and upper Midwest.  Outdoor workers and individuals that have recreational exposure to woods and fields in high risk areas may become infected.  During late spring, summer and early fall when the young ticks are most active it is important take precaution to prevent tick bites, recognize the signs and symptoms of Lyme disease and seek treatment.\r\n\r\nJoin Dr. Daniel Sullivan, Medical Director and Internal Medicine Specialist at Cleveland Clinic in an interactive video webinar for answers to your questions about Lyme disease. \r\n","views":741,"length":"38:34"},{"id":164191,"slug":"live-q-a-with-haylie-april-27","owner_name":"Haylie Pomroy Group","owner_slug":"haylie-pomroy-group","name":"Live Q& A with Haylie - April 27 ","logo":"http://s3.amazonaws.com/spreecast-production/events/164191/tile_240x180/img20150407-22239-1wrfhya.jpg?1428426255","url":"http://www.spreecast.com/events/live-q-a-with-haylie-april-27","type":"event","about":"Hello! Welcome to our bi-monthly Haylie Pomroy Spreecasts! \r\n\r\nDon't forget to scroll down to ask Haylie questions BEFORE the live session! Also, cast a vote for your favorite questions, she will be answering the ones with the most votes!\r\n\r\nDue to space limitations, please keep your questions down to 1-2 sentences. \r\n\r\nThank you, \r\nHaylie Pomroy Team ","views":2664,"length":"37:55"},{"id":164841,"slug":"body-forward-fat-loss-challenge-call-3","owner_name":"Erica Willick","owner_slug":"erica--110","name":"Body Forward Fat Loss Challenge Call #3","logo":"http://s3.amazonaws.com/spreecast-production/events/164841/tile_240x180/img20150427-29584-1jn1vjv.jpg?1430141444","url":"http://www.spreecast.com/events/body-forward-fat-loss-challenge-call-3","type":"event","about":"Let's start talking about \"what's next\"?!\r\n\r\nBODY FORWARD FOR LONG-TERM SUCCESS\r\n\r\nFor Body Forward Challenge Participants.  More info www.sisinshape.com","views":116,"length":"36:51"}],"category":"Fitness & Health","is_expired":false,"unlisted_embed_enabled":true,"legacy_rtmp":false,"is_premium":false,"mobile_url":"http://www.spreecast.com/events/ep-39-laynee-restoring-your-breath/mobile","mobile_ecma":"http://www.spreecast.com/events/ep-39-laynee-restoring-your-breath/mobile_ecma_v","rsvp_count":22,"live":[]},{"about":"Did you know that sugar is as, if not MORE addictive than destructive drugs like cocaine and heroine?\r\n\r\nDid you know that your entire nervous system has a physiological response when you consume sugar and that issues like depression, anxiety, no energy, obesity, insulin resistance, PCOS, ADHD and ADD, migraines, cravings, cellulite, joint pain and inflammation, digestive issues and those of the skin as well are linked to the amount and types of sugar we are feeding our bodies?\r\n\r\nJoin me to learn how to properly read your labels, how to reduce NOT replace your sugar and free yourself from our crazy sugar addictions!","broadcasters_enabled":true,"coproducable":true,"display_questions":0,"embed_share_url":null,"name":"Sugar ~ The NEW drug in town","not_startable_by_coproducers":false,"questions_enabled":true,"visibility":0,"start_at":"2015-05-05T16:00:00Z","start_at_epoch":1430841600000.0,"playback_start":0,"times":[null,null],"channel_name":"Jenn's Channel","now_broadcasting":false,"status":0,"event_id":164229,"image_url":"http://s3.amazonaws.com/spreecast-production/events/164229/tile_480x360/img20150408-24958-ug8po9.jpg?1428492281","twitter":{"search":null,"include":null},"host":{"about_me":"Jenn Pike is the proud Owner of Simplicity Yoga &amp; Fitness Therapy Studio. She is a Nationally sought after Yoga and Pilates instructor plus Master Personal Trainer, Medical Exercise Specialist, &amp; lead Holistic Nutritionist to world-wide yoga Rock Star Sadie Nardini. \r\nJenn is the host &amp; producer to two local television shows 'Simplicity Fusion Flow' &amp; Living Simpliciously as well as Spokesperson &amp; Brand Ambassador to Genuine Health, Lululemon and Juice Matters. She is also a regular contributor to Rogers Daytime, Georgina Life and City TV\u2019s Breakfast Television. Jenn is the Co-Founder of SHIFT Women\u2019s Life Coaching events and retreats with Dr. Laura Foster. \r\n\r\nShe is also the author of  \r\n'The Simplicity Project - A Simple, No-Nonsense Approach to Losing Weight &amp; Changing Your Body Forever and it\u2019s accompany DVD, The Simplicity Project: A Core Revival To Transform Your Body.\r\n\r\nwww.simplicityyoga.ca\r\nwww.jennpike.com\r\nhttp://www.amazon.ca/books/dp/099175302X \r\nTwitter @simplicityjenn\r\nFacebook.com/jennpike\r\n","first_name":"Jenn","has_been_authenticated":true,"last_name":"Pike","needs_to_confirm_email":false,"user_id":"jenn--40","alt":478530,"admin":false,"content_mod":false,"profile_photo_thumb_url":"//s3.amazonaws.com/spreecast-photos/production/users/478530/tile_30x30/478530_photo.jpg?1394137867","is_fb":true,"ppv_approved":false,"is_affiliate":false,"following_events":[164229],"is_locked":true,"plan_name":"Bronze","can_create_spreecast":true,"allow_friend_requests":true,"vcat":null},"num_viewers":0,"friendly_id":"sugar-the-new-drug-in-town","event_enabled":false,"views":451,"stitch_urls":{},"pre_event_extended_time":"30 minutes","questions_throttled":false,"broadcasters_throttled":false,"ad_on_air":false,"ads_enabled":false,"banner_ads_enabled":false,"recommended_content":[{"id":155219,"slug":"boost-immunity-now","owner_name":"Jenn Pike","owner_slug":"jenn--40","name":"Boost Immunity Now!!","logo":"//s3.amazonaws.com/spreecast-photos/production/users/478530/tile_240x180/478530_photo.jpg?1394137867","url":"http://www.spreecast.com/events/boost-immunity-now","type":"event","about":"Join Jenn Pike to learn about natural immunity this cold and flu season","views":789,"length":"49:00"},{"id":146363,"slug":"beautiful-radiant-skin-naturally","owner_name":"Jenn Pike","owner_slug":"jenn--40","name":"Beautiful, Radiant Skin Naturally!","logo":"//s3.amazonaws.com/spreecast-photos/production/users/478530/tile_240x180/478530_photo.jpg?1394137867","url":"http://www.spreecast.com/events/beautiful-radiant-skin-naturally","type":"event","about":"Do you suffer from acne, eczema, dry patches, rosacea, oily T-zone, melasma, rashes, or lack-luster skin that leaves you feeling uninspired and frustrated when you look in the mirror?\r\n\r\nHave you spent hundreds, maybe even thousands of $$$ on products and services that made promises to be the answer for you and now they just take up space on your counter and in your cupboards?\r\n\r\nI have the SOLUTIONS for you!\r\n\r\nJoin me in the seminar as I teach you about the different issues affecting your skin, why its happening and what you can start to do RIGHT AWAY to help heal your skin and purify your body's largest organ from the inside out NOT the outside in!\r\n\r\nI will inspire you with very selective food and hydration choices, natural washes, exfoliants, masks, nourishing oils and essential oils as well as give you the hormone 101 lowdown as to why your skin may be doing what it is. \r\n\r\n","views":2342,"length":"58:51"},{"id":141879,"slug":"cellulite-be-gone","owner_name":"Jenn Pike","owner_slug":"jenn--40","name":"Cellulite Be GONE!!","logo":"http://s3.amazonaws.com/spreecast-production/events/141879/tile_240x180/141879_photo.jpg?1405511838","url":"http://www.spreecast.com/events/cellulite-be-gone","type":"event","about":"Join Jenn Pike, a passionate holistic health and wellness educator and mentor as she schools you on everything there is to know about cellulite and how to get rid of it for good!\r\n\r\nJenn is the founder of Simplicity Yoga & Fitness Therapy Studio, creator/host of two great shows, and the author of The Simplicity Project ~ A Simple, No-Nonsense Approach To Losing Weight & Keeping It Off Forever! She firmly believes we are all destined to live our best lives ever and has made it her life\u2019s work to inspire you to get there.\r\n\r\nWebsite/Blog: www.jennpike.com\r\nTwitter: @simplicityjenn ","views":2653,"length":"01:02:14"},{"id":164191,"slug":"live-q-a-with-haylie-april-27","owner_name":"Haylie Pomroy Group","owner_slug":"haylie-pomroy-group","name":"Live Q& A with Haylie - April 27 ","logo":"http://s3.amazonaws.com/spreecast-production/events/164191/tile_240x180/img20150407-22239-1wrfhya.jpg?1428426255","url":"http://www.spreecast.com/events/live-q-a-with-haylie-april-27","type":"event","about":"Hello! Welcome to our bi-monthly Haylie Pomroy Spreecasts! \r\n\r\nDon't forget to scroll down to ask Haylie questions BEFORE the live session! Also, cast a vote for your favorite questions, she will be answering the ones with the most votes!\r\n\r\nDue to space limitations, please keep your questions down to 1-2 sentences. \r\n\r\nThank you, \r\nHaylie Pomroy Team ","views":2664,"length":"37:55"},{"id":161498,"slug":"swallowing-disorders-treatment","owner_name":"Cleveland Clinic","owner_slug":"cleveland-clinic--2","name":"Swallowing Disorders &Treatment","logo":"//s3.amazonaws.com/spreecast-photos/production/users/521133/tile_240x180/521133_photo.jpg?1380112891","url":"http://www.spreecast.com/events/swallowing-disorders-treatment","type":"event","about":"Swallowing  and esophageal disorders, such as esophagitis, gastroesophageal reflux disease (GERD), Barrett\u2019s esophagus and achalasia  affect more than 15 million Americans, and range in severity and be chronic concerns that plague daily life. However, disorders can be treated successfully before long-term damage occurs. Join Dr. Gabbard and Dr. Raja, along with the Achalasia\r\nAwareness Organization as we answer your questions.\r\n","views":2043,"length":"01:04:22"},{"id":164841,"slug":"body-forward-fat-loss-challenge-call-3","owner_name":"Erica Willick","owner_slug":"erica--110","name":"Body Forward Fat Loss Challenge Call #3","logo":"http://s3.amazonaws.com/spreecast-production/events/164841/tile_240x180/img20150427-29584-1jn1vjv.jpg?1430141444","url":"http://www.spreecast.com/events/body-forward-fat-loss-challenge-call-3","type":"event","about":"Let's start talking about \"what's next\"?!\r\n\r\nBODY FORWARD FOR LONG-TERM SUCCESS\r\n\r\nFor Body Forward Challenge Participants.  More info www.sisinshape.com","views":116,"length":"36:51"},{"id":164742,"slug":"the-3-greatest-myths-of-weight-loss","owner_name":"Bridget Jane Thompson","owner_slug":"bridget-jane","name":"The 3 GREATEST Myths of Weight Loss","logo":"http://s3.amazonaws.com/spreecast-production/events/164742/tile_240x180/img20150422-16100-1wf69c.jpg?1429753013","url":"http://www.spreecast.com/events/the-3-greatest-myths-of-weight-loss","type":"event","about":"Join me as I share with you the TOP 3 GREATEST Myths of Weight Loss!\r\n\r\nEmail me on bridget@newleafnutrition.com.au for more\r\n\r\nVisit www.newleafnutrition.com.au\r\n\r\nFree 5 Day Training and Resource :\r\nwww.theglowproject.com.au\r\n\r\nFacebook - https://www.facebook.com/NewLeafNutrition","views":107,"length":"39:55"},{"id":163969,"slug":"jenskii-krug","owner_name":"Nadya Andreeva","owner_slug":"nadya-andreeva","name":"Jenskii Krug","logo":"//s3.amazonaws.com/spreecast-photos/production/users/479974/tile_240x180/479974_photo.jpg?1363785111","url":"http://www.spreecast.com/events/jenskii-krug","type":"event","about":"","views":2583,"length":"01:17:57"},{"id":164535,"slug":"ep38-no-turning-back-vol-2","owner_name":"The Airway and Facial Development Collaboration","owner_slug":"the-airway","name":"Ep38 No Turning Back: Vol.2","logo":"http://s3.amazonaws.com/spreecast-production/channels/438551/tile_240x180/438551_photo.jpg?1359272646","url":"http://www.spreecast.com/events/ep38-no-turning-back-vol-2","type":"event","about":"Oral Surgeon Bob Wheeler talks about how \"Airway\" has changed his thinking and practice of maxillofacial surgery.","views":710,"length":"01:08:10"},{"id":163989,"slug":"live-q-a-with-haylie-april-10","owner_name":"Haylie Pomroy Group","owner_slug":"haylie-pomroy-group","name":"Live Q&A with Haylie - April 10","logo":"http://s3.amazonaws.com/spreecast-production/events/163989/tile_240x180/img20150331-15259-shjhq3.jpg?1427839814","url":"http://www.spreecast.com/events/live-q-a-with-haylie-april-10","type":"event","about":"Hello! Welcome to our bi-monthly Haylie Pomroy Spreecasts! \r\n\r\nDon't forget to scroll down to ask Haylie questions about the FMD or her new book, the Burn BEFORE the live session! \r\n\r\nDue to space limitations, please keep your questions down to 1-2 sentences. \r\n\r\nCast a vote for your favorite questions, she will be answering the ones with the most votes!\r\n\r\nThank you, \r\nHaylie Pomroy Team ","views":2940,"length":"37:40"}],"category":"Fitness & Health","is_expired":false,"unlisted_embed_enabled":true,"legacy_rtmp":false,"is_premium":false,"mobile_url":"http://www.spreecast.com/events/sugar-the-new-drug-in-town/mobile","mobile_ecma":"http://www.spreecast.com/events/sugar-the-new-drug-in-town/mobile_ecma_v","rsvp_count":13,"live":[]},{"about":"Join Kiala Givehand, Ho'o Brown, and Grace Howes for a follow up to the 30-day Vision Board Experience. Bring your favorite beverage, favorite pen, and something to write on -- we have a challenge for you!!! See you on air. ","broadcasters_enabled":true,"coproducable":true,"display_questions":0,"embed_share_url":null,"name":"The Creative View LIVE -- Check In","not_startable_by_coproducers":false,"questions_enabled":true,"visibility":0,"start_at":"2015-05-05T18:00:00Z","start_at_epoch":1430848800000.0,"playback_start":0,"times":[null,null],"channel_name":"Kiala Givehand's Channel","now_broadcasting":false,"status":0,"event_id":164773,"image_url":"http://s3.amazonaws.com/spreecast-production/events/164773/tile_480x360/img20150423-29205-kg4sv7.jpg?1429827492","twitter":{"search":null,"include":null},"host":{"about_me":"Mixed media book artist, creativity coach, publisher, and writer. Creator of the Mixed Media Inspiration Deck\u2122 and the Book-in-a-Day YouTube series. ","first_name":"Kiala","has_been_authenticated":true,"last_name":"Givehand","needs_to_confirm_email":false,"user_id":"kiala","alt":795804,"admin":false,"content_mod":false,"profile_photo_thumb_url":"//s3.amazonaws.com/spreecast-photos/production/users/795804/tile_30x30/795804_photo.jpg?1393873835","is_fb":false,"ppv_approved":false,"is_affiliate":false,"following_events":[164773,164901],"is_locked":true,"plan_name":"Plus","can_create_spreecast":true,"allow_friend_requests":true,"vcat":null},"num_viewers":0,"friendly_id":"the-creative-view-live-check-in","event_enabled":false,"views":154,"stitch_urls":{},"pre_event_extended_time":"30 minutes","questions_throttled":false,"broadcasters_throttled":false,"ad_on_air":false,"ads_enabled":true,"banner_ads_enabled":false,"recommended_content":[{"id":164453,"slug":"espn-nba-live-chat-episode-121","owner_name":"@TrueHoopTV","owner_slug":"truehooptv--2","name":"ESPN NBA Live Chat Episode 121","logo":"http://s3.amazonaws.com/spreecast-production/events/164453/tile_240x180/img20150414-24932-u59tpu.jpg?1429023987","url":"http://www.spreecast.com/events/espn-nba-live-chat-episode-121","type":"event","about":"Amin, Tom, Ethan, Bobby Kennedy, and YOU talking all things NBA. ","views":364859,"length":"01:15:35"},{"id":164651,"slug":"espn-nba-live-chat-episode-123","owner_name":"@TrueHoopTV","owner_slug":"truehooptv--2","name":"ESPN NBA Live Chat Episode 123","logo":"http://s3.amazonaws.com/spreecast-production/events/164651/tile_240x180/img20150420-17074-1xqs1j6.jpg?1429543452","url":"http://www.spreecast.com/events/espn-nba-live-chat-episode-123","type":"event","about":"Amin, maybe Tom, maybe Ethan...NBA Playoffs. ","views":678112,"length":"01:15:25"},{"id":164687,"slug":"espn-nba-live-chat-episode-124","owner_name":"@TrueHoopTV","owner_slug":"truehooptv--2","name":"ESPN NBA Live Chat Episode 124","logo":"http://s3.amazonaws.com/spreecast-production/events/164687/tile_240x180/img20150421-21288-49ip6c.jpg?1429634693","url":"http://www.spreecast.com/events/espn-nba-live-chat-episode-124","type":"event","about":"Amin, Ethan...maybe Tom. NBA Playoffs and YOU. Do it. ","views":110838,"length":"01:19:44"},{"id":164300,"slug":"espn-nba-live-chat-episode-120","owner_name":"@TrueHoopTV","owner_slug":"truehooptv--2","name":"ESPN NBA Live Chat Episode 120","logo":"http://s3.amazonaws.com/spreecast-production/events/164300/tile_240x180/img20150409-15203-1f8ffht.jpg?1428606478","url":"http://www.spreecast.com/events/espn-nba-live-chat-episode-120","type":"event","about":"","views":103669,"length":"01:06:06"},{"id":164757,"slug":"espn-daily-fantasy-live-ep4","owner_name":"ESPN","owner_slug":"espn","name":"ESPN Daily Fantasy Live Ep4","logo":"http://s3.amazonaws.com/spreecast-production/events/164757/tile_240x180/img20150423-29273-1nvfoso.jpg?1429804968","url":"http://www.spreecast.com/events/espn-daily-fantasy-live-ep4","type":"event","about":"Fantasy analysts Derek Carty and Tristan H. Cockcroft get you ready for daily fantasy baseball on Monday. You'll get advice and your questions answered before first pitch of the night games.","views":167288,"length":"42:36"},{"id":164457,"slug":"espn-nfl-nation-tv-episode-52-2","owner_name":"ESPN","owner_slug":"espn","name":"ESPN NFL Nation TV - Episode 52 (2)","logo":"http://s3.amazonaws.com/spreecast-production/channels/403865/tile_240x180/403865_photo.jpg?1397578606","url":"http://www.spreecast.com/events/espn-nfl-nation-tv-episode-52-2","type":"event","about":"Join ESPN NFL reporters to chat about the latest news from around the league.","views":359815,"length":"01:01:55"},{"id":164670,"slug":"espn-daily-fantasy-live-ep3","owner_name":"ESPN","owner_slug":"espn","name":"ESPN Daily Fantasy Live Ep3","logo":"http://s3.amazonaws.com/spreecast-production/events/164670/tile_240x180/img20150420-6402-g0875q.jpg?1429571318","url":"http://www.spreecast.com/events/espn-daily-fantasy-live-ep3","type":"event","about":"Fantasy analysts Tristan H. Cockcroft and Derek Carty get you ready for daily fantasy baseball on Wednesday and answer your DFS questions.","views":108025,"length":"41:35"},{"id":164668,"slug":"espn-nfl-nation-tv-episode-53","owner_name":"ESPN","owner_slug":"espn","name":"ESPN NFL Nation TV - Episode 53","logo":"http://s3.amazonaws.com/spreecast-production/events/164668/tile_240x180/img20150420-10179-8lcrxx.jpg?1429562176","url":"http://www.spreecast.com/events/espn-nfl-nation-tv-episode-53","type":"event","about":"Join ESPN NFL reporters to chat about the latest news from around the league. Special guest NFL Draft prospect Leonard Williams.","views":503181,"length":"01:10:55"},{"id":160371,"slug":"tony-robbins-spreecast","owner_name":"Team Tony","owner_slug":"team-tony","name":"Tony Robbins Spreecast","logo":"http://s3.amazonaws.com/spreecast-production/events/160371/tile_240x180/160371_photo.jpg?1422997102","url":"http://www.spreecast.com/events/tony-robbins-spreecast","type":"event","about":"Join Tony and Sage Robbins for an intimate Valentine's Day, lasting-love-and-passion-themed relationship fireside chat from there home in Sun Valley...\r\n","views":160038,"length":"01:03:35"}],"category":"How-to","is_expired":false,"unlisted_embed_enabled":false,"legacy_rtmp":false,"is_premium":false,"mobile_url":"http://www.spreecast.com/events/the-creative-view-live-check-in/mobile","mobile_ecma":"http://www.spreecast.com/events/the-creative-view-live-check-in/mobile_ecma_v","rsvp_count":3,"live":[]},{"about":"How does hard science influence science fiction--and vice versa?  How did the latest in theoretical physics help shape the film Interstellar? Did the Star Trek Communicator really inspire the cellphone?\r\n \r\nWe might still be waiting for our jetpacks, but the stories we create about the future can affect how we create it in the laboratory. Join Star Trek screenwriter and science consultant Andre Bormanis and SETI astronomer and Big Picture Science host Seth Shostak as they discuss the intersections between science fiction and science fact.\r\n\r\nThis free webcast is part of the celebration of the Interstellar Day of Science and Story, put on by the Chabot Space & Science Center, National Novel Writing Month, and the radio show Big Picture Science. ","broadcasters_enabled":true,"coproducable":true,"display_questions":0,"embed_share_url":null,"name":"Science Fact and Science Fiction","not_startable_by_coproducers":false,"questions_enabled":true,"visibility":0,"start_at":"2015-05-05T21:00:00Z","start_at_epoch":1430859600000.0,"playback_start":0,"times":[null,null],"channel_name":"NaNoWriMo Video Chats","now_broadcasting":false,"status":0,"event_id":164878,"image_url":"http://s3.amazonaws.com/spreecast-production/events/164878/tile_480x360/164878_photo.jpg?1430502466","twitter":{"search":null,"include":null},"host":{"about_me":"Dive into the literary mayhem! Pen a novel in a month with NaNoWriMo, Camp NaNoWriMo, the Young Writers Program, and the world\u2019s largest writing community.","first_name":"NaNoWriMo","has_been_authenticated":true,"last_name":"","needs_to_confirm_email":false,"user_id":"nanowrimo","alt":702529,"admin":false,"content_mod":false,"profile_photo_thumb_url":"//s3.amazonaws.com/spreecast-photos/production/users/702529/tile_30x30/702529_photo.jpg?1381946805","is_fb":false,"ppv_approved":false,"is_affiliate":false,"following_events":[164878,164950],"is_locked":true,"plan_name":"Bronze","can_create_spreecast":true,"allow_friend_requests":true,"vcat":null},"num_viewers":1,"friendly_id":"science-fact-and-science-fiction","event_enabled":false,"views":1085,"stitch_urls":{},"pre_event_extended_time":"30 minutes","questions_throttled":false,"broadcasters_throttled":false,"ad_on_air":false,"ads_enabled":false,"banner_ads_enabled":false,"recommended_content":[{"id":161604,"slug":"enchanting-an-editor--2","owner_name":"NaNoWriMo","owner_slug":"nanowrimo","name":"Enchanting an Editor","logo":"http://s3.amazonaws.com/spreecast-production/events/161604/tile_240x180/img20150218-26906-1ccftpf.jpg?1424288054","url":"http://www.spreecast.com/events/enchanting-an-editor--2","type":"event","about":"The process of finding an agent and editor for your novel can be a daunting one. Join us as we speak to NaNo-novelist M. Anjelais, whose debut novel (Breaking Butterflies) was shortlisted for the London Times/Chicken House Children\u2019s Fiction Competition; and her editor Barry Cunningham, perhaps most famous for being the acquisitions editor who greenlit Harry Potter.\r\n\r\nWe\u2019ll talk to M about the process of finding a home for her NaNo-novel and how she pitched her story, and we\u2019ll hear from Barry about the acquisitions and publishing process from the business side.\r\n\r\nAnd we\u2019ll probably ask a few questions about a certain boy wizard while we\u2019re at it.","views":18145,"length":"01:05:01"},{"id":153220,"slug":"talking-nanowrimo-with-scott-westerfeld--2","owner_name":"NaNoWriMo","owner_slug":"nanowrimo","name":"Talking NaNoWriMo with Scott Westerfeld","logo":"//s3.amazonaws.com/spreecast-photos/production/users/702529/tile_240x180/702529_photo.jpg?1381946805","url":"http://www.spreecast.com/events/talking-nanowrimo-with-scott-westerfeld--2","type":"event","about":"Join NaNoWriMo for our first pep talk via webcast! Noted YA author Scott Westerfeld will talk about the \"write-ins\" he's done with John Green, Maureen Johnson, and other YA authors. He'll tell the back story of AFTERWORLDS, his novel about a teen who writes a NaNo novel and then sells it to a big publisher. And then he'll answer your questions about writing and succeeding in this year's NaNoWriMo!","views":12611,"length":"01:16:46"},{"id":164453,"slug":"espn-nba-live-chat-episode-121","owner_name":"@TrueHoopTV","owner_slug":"truehooptv--2","name":"ESPN NBA Live Chat Episode 121","logo":"http://s3.amazonaws.com/spreecast-production/events/164453/tile_240x180/img20150414-24932-u59tpu.jpg?1429023987","url":"http://www.spreecast.com/events/espn-nba-live-chat-episode-121","type":"event","about":"Amin, Tom, Ethan, Bobby Kennedy, and YOU talking all things NBA. ","views":364859,"length":"01:15:35"},{"id":164651,"slug":"espn-nba-live-chat-episode-123","owner_name":"@TrueHoopTV","owner_slug":"truehooptv--2","name":"ESPN NBA Live Chat Episode 123","logo":"http://s3.amazonaws.com/spreecast-production/events/164651/tile_240x180/img20150420-17074-1xqs1j6.jpg?1429543452","url":"http://www.spreecast.com/events/espn-nba-live-chat-episode-123","type":"event","about":"Amin, maybe Tom, maybe Ethan...NBA Playoffs. ","views":678112,"length":"01:15:25"},{"id":164687,"slug":"espn-nba-live-chat-episode-124","owner_name":"@TrueHoopTV","owner_slug":"truehooptv--2","name":"ESPN NBA Live Chat Episode 124","logo":"http://s3.amazonaws.com/spreecast-production/events/164687/tile_240x180/img20150421-21288-49ip6c.jpg?1429634693","url":"http://www.spreecast.com/events/espn-nba-live-chat-episode-124","type":"event","about":"Amin, Ethan...maybe Tom. NBA Playoffs and YOU. Do it. ","views":110838,"length":"01:19:44"},{"id":164300,"slug":"espn-nba-live-chat-episode-120","owner_name":"@TrueHoopTV","owner_slug":"truehooptv--2","name":"ESPN NBA Live Chat Episode 120","logo":"http://s3.amazonaws.com/spreecast-production/events/164300/tile_240x180/img20150409-15203-1f8ffht.jpg?1428606478","url":"http://www.spreecast.com/events/espn-nba-live-chat-episode-120","type":"event","about":"","views":103669,"length":"01:06:06"},{"id":164757,"slug":"espn-daily-fantasy-live-ep4","owner_name":"ESPN","owner_slug":"espn","name":"ESPN Daily Fantasy Live Ep4","logo":"http://s3.amazonaws.com/spreecast-production/events/164757/tile_240x180/img20150423-29273-1nvfoso.jpg?1429804968","url":"http://www.spreecast.com/events/espn-daily-fantasy-live-ep4","type":"event","about":"Fantasy analysts Derek Carty and Tristan H. Cockcroft get you ready for daily fantasy baseball on Monday. You'll get advice and your questions answered before first pitch of the night games.","views":167288,"length":"42:36"},{"id":164457,"slug":"espn-nfl-nation-tv-episode-52-2","owner_name":"ESPN","owner_slug":"espn","name":"ESPN NFL Nation TV - Episode 52 (2)","logo":"http://s3.amazonaws.com/spreecast-production/channels/403865/tile_240x180/403865_photo.jpg?1397578606","url":"http://www.spreecast.com/events/espn-nfl-nation-tv-episode-52-2","type":"event","about":"Join ESPN NFL reporters to chat about the latest news from around the league.","views":359815,"length":"01:01:55"},{"id":164670,"slug":"espn-daily-fantasy-live-ep3","owner_name":"ESPN","owner_slug":"espn","name":"ESPN Daily Fantasy Live Ep3","logo":"http://s3.amazonaws.com/spreecast-production/events/164670/tile_240x180/img20150420-6402-g0875q.jpg?1429571318","url":"http://www.spreecast.com/events/espn-daily-fantasy-live-ep3","type":"event","about":"Fantasy analysts Tristan H. Cockcroft and Derek Carty get you ready for daily fantasy baseball on Wednesday and answer your DFS questions.","views":108025,"length":"41:35"},{"id":164668,"slug":"espn-nfl-nation-tv-episode-53","owner_name":"ESPN","owner_slug":"espn","name":"ESPN NFL Nation TV - Episode 53","logo":"http://s3.amazonaws.com/spreecast-production/events/164668/tile_240x180/img20150420-10179-8lcrxx.jpg?1429562176","url":"http://www.spreecast.com/events/espn-nfl-nation-tv-episode-53","type":"event","about":"Join ESPN NFL reporters to chat about the latest news from around the league. Special guest NFL Draft prospect Leonard Williams.","views":503181,"length":"01:10:55"}],"category":"Books & Authors","is_expired":false,"unlisted_embed_enabled":true,"legacy_rtmp":false,"is_premium":false,"mobile_url":"http://www.spreecast.com/events/science-fact-and-science-fiction/mobile","mobile_ecma":"http://www.spreecast.com/events/science-fact-and-science-fiction/mobile_ecma_v","rsvp_count":104,"live":[]},{"about":"","broadcasters_enabled":true,"coproducable":true,"display_questions":0,"embed_share_url":null,"name":"BYOP","not_startable_by_coproducers":false,"questions_enabled":true,"visibility":0,"start_at":"2015-05-06T19:00:00Z","start_at_epoch":1430938800000.0,"playback_start":0,"times":[null,null],"channel_name":"Lucy Pearce's Channel","now_broadcasting":false,"status":0,"event_id":164541,"image_url":"//s3.amazonaws.com/spreecast-photos/production/users/727218/tile_480x360/727218_photo.jpg?1385327834","twitter":{"search":null,"include":null},"host":{"about_me":"Lucy H. Pearce is a multi-passionate creative. Best known as the author of four books: \r\n\r\n\u2022\tHer most recent, The Rainbow Way: Cultivating Creativity in the Midst of Motherhood was an Amazon #1 best seller in multiple categories in the US and UK.\r\n\u2022\tMoon Time: a guide to celebrating your menstrual cycle, has been called \u201clife changing\u201d by hundreds of women around the world and is the leading title in its field.\r\n\u2022\tReaching for the Moon is her popular, soulful guide to the menstrual cycle for girls aged 9-14. \r\n\u2022\tMoods of Motherhood: the inner journey of mothering is a compelling, honest reflection on the complex inner terrain of motherhood.\r\n\r\nThe founding publisher at Womancraft Publishing, she loves supporting other creatives to find and share their voices \u2013 through her editing work at Lucent Word, mentoring and teaching blogging and self-publishing.\r\n\r\n A former editor of JUNO magazine, creator of The Happy Womb.com, she blogs at Dreaming Aloud.net on creativity and self-expression. She is a vibrant painter of lost archetypes of the feminine.\r\n","first_name":"Lucy Pearce","has_been_authenticated":true,"last_name":"","needs_to_confirm_email":false,"user_id":"lucy-pearce--2","alt":727218,"admin":false,"content_mod":false,"profile_photo_thumb_url":"//s3.amazonaws.com/spreecast-photos/production/users/727218/tile_30x30/727218_photo.jpg?1385327834","is_fb":true,"ppv_approved":false,"is_affiliate":false,"following_events":[164541],"is_locked":true,"plan_name":"Plus","can_create_spreecast":true,"allow_friend_requests":true,"vcat":null},"num_viewers":0,"friendly_id":"byop","event_enabled":false,"views":100,"stitch_urls":{},"pre_event_extended_time":"30 minutes","questions_throttled":false,"broadcasters_throttled":false,"ad_on_air":false,"ads_enabled":true,"banner_ads_enabled":false,"recommended_content":[{"id":164453,"slug":"espn-nba-live-chat-episode-121","owner_name":"@TrueHoopTV","owner_slug":"truehooptv--2","name":"ESPN NBA Live Chat Episode 121","logo":"http://s3.amazonaws.com/spreecast-production/events/164453/tile_240x180/img20150414-24932-u59tpu.jpg?1429023987","url":"http://www.spreecast.com/events/espn-nba-live-chat-episode-121","type":"event","about":"Amin, Tom, Ethan, Bobby Kennedy, and YOU talking all things NBA. ","views":364859,"length":"01:15:35"},{"id":164651,"slug":"espn-nba-live-chat-episode-123","owner_name":"@TrueHoopTV","owner_slug":"truehooptv--2","name":"ESPN NBA Live Chat Episode 123","logo":"http://s3.amazonaws.com/spreecast-production/events/164651/tile_240x180/img20150420-17074-1xqs1j6.jpg?1429543452","url":"http://www.spreecast.com/events/espn-nba-live-chat-episode-123","type":"event","about":"Amin, maybe Tom, maybe Ethan...NBA Playoffs. ","views":678112,"length":"01:15:25"},{"id":164687,"slug":"espn-nba-live-chat-episode-124","owner_name":"@TrueHoopTV","owner_slug":"truehooptv--2","name":"ESPN NBA Live Chat Episode 124","logo":"http://s3.amazonaws.com/spreecast-production/events/164687/tile_240x180/img20150421-21288-49ip6c.jpg?1429634693","url":"http://www.spreecast.com/events/espn-nba-live-chat-episode-124","type":"event","about":"Amin, Ethan...maybe Tom. NBA Playoffs and YOU. Do it. ","views":110838,"length":"01:19:44"},{"id":164300,"slug":"espn-nba-live-chat-episode-120","owner_name":"@TrueHoopTV","owner_slug":"truehooptv--2","name":"ESPN NBA Live Chat Episode 120","logo":"http://s3.amazonaws.com/spreecast-production/events/164300/tile_240x180/img20150409-15203-1f8ffht.jpg?1428606478","url":"http://www.spreecast.com/events/espn-nba-live-chat-episode-120","type":"event","about":"","views":103669,"length":"01:06:06"},{"id":164757,"slug":"espn-daily-fantasy-live-ep4","owner_name":"ESPN","owner_slug":"espn","name":"ESPN Daily Fantasy Live Ep4","logo":"http://s3.amazonaws.com/spreecast-production/events/164757/tile_240x180/img20150423-29273-1nvfoso.jpg?1429804968","url":"http://www.spreecast.com/events/espn-daily-fantasy-live-ep4","type":"event","about":"Fantasy analysts Derek Carty and Tristan H. Cockcroft get you ready for daily fantasy baseball on Monday. You'll get advice and your questions answered before first pitch of the night games.","views":167288,"length":"42:36"},{"id":164457,"slug":"espn-nfl-nation-tv-episode-52-2","owner_name":"ESPN","owner_slug":"espn","name":"ESPN NFL Nation TV - Episode 52 (2)","logo":"http://s3.amazonaws.com/spreecast-production/channels/403865/tile_240x180/403865_photo.jpg?1397578606","url":"http://www.spreecast.com/events/espn-nfl-nation-tv-episode-52-2","type":"event","about":"Join ESPN NFL reporters to chat about the latest news from around the league.","views":359815,"length":"01:01:55"},{"id":164670,"slug":"espn-daily-fantasy-live-ep3","owner_name":"ESPN","owner_slug":"espn","name":"ESPN Daily Fantasy Live Ep3","logo":"http://s3.amazonaws.com/spreecast-production/events/164670/tile_240x180/img20150420-6402-g0875q.jpg?1429571318","url":"http://www.spreecast.com/events/espn-daily-fantasy-live-ep3","type":"event","about":"Fantasy analysts Tristan H. Cockcroft and Derek Carty get you ready for daily fantasy baseball on Wednesday and answer your DFS questions.","views":108025,"length":"41:35"},{"id":164668,"slug":"espn-nfl-nation-tv-episode-53","owner_name":"ESPN","owner_slug":"espn","name":"ESPN NFL Nation TV - Episode 53","logo":"http://s3.amazonaws.com/spreecast-production/events/164668/tile_240x180/img20150420-10179-8lcrxx.jpg?1429562176","url":"http://www.spreecast.com/events/espn-nfl-nation-tv-episode-53","type":"event","about":"Join ESPN NFL reporters to chat about the latest news from around the league. Special guest NFL Draft prospect Leonard Williams.","views":503181,"length":"01:10:55"},{"id":160371,"slug":"tony-robbins-spreecast","owner_name":"Team Tony","owner_slug":"team-tony","name":"Tony Robbins Spreecast","logo":"http://s3.amazonaws.com/spreecast-production/events/160371/tile_240x180/160371_photo.jpg?1422997102","url":"http://www.spreecast.com/events/tony-robbins-spreecast","type":"event","about":"Join Tony and Sage Robbins for an intimate Valentine's Day, lasting-love-and-passion-themed relationship fireside chat from there home in Sun Valley...\r\n","views":160038,"length":"01:03:35"}],"category":"Books & Authors","is_expired":false,"unlisted_embed_enabled":false,"legacy_rtmp":false,"is_premium":false,"mobile_url":"http://www.spreecast.com/events/byop/mobile","mobile_ecma":"http://www.spreecast.com/events/byop/mobile_ecma_v","rsvp_count":3,"live":[]}]);

    if (spree.user && spree.user.has_been_authenticated) {
      var $rsvps = $('.event-reminder-button');
      _.each($rsvps, function(button) {
        var $rsvpButton = $(button);
        var eventId = parseInt($rsvpButton.attr('data-event-id'));
        var rsvp = $.inArray(eventId, spree.user.following_events) >= 0;
        if(rsvp) {
          var rsvpCount = parseInt($rsvpButton.data('rsvps').trim().split(/\s/)[0]);
          $rsvpButton.removeClass('btn-blue').text('' + rsvpCount + ' RSVP' + (rsvpCount > 1 ? 's' : '')).css('border', 'none').css('background', 'none');
        }
      });
    }
  });
</script>
</div>

</div>  <div class="section" data-section="follow" id="section-follow">
    <h4 class="recommended-header">
  <span class="select selected" data-select-option="clips">推荐剪辑</span>
  <span class="separator">|</span>
  <span class="select link" data-select-option="people">推荐用户</span>
</h4>

<div class="recommended-content scroll-wrapper horizontal">
  
<div class="clips selected" data-select-list="clips"> <!-- to allow multiple scrollables -->

  <!-- "previous page" action -->
  <i class="prev browse left-caret-icon"></i>

  <!-- root element for scrollable -->
  <div class="scrollable horizontal">

    <div class="scroll-items">
      <!-- clips -->
        <ul class="pull-left">
            
<li class="bubble event medium trending recommended-clips" data-id="112262" data-position="0" data-status="2" data-type="clip">
  <a href="/events/date-night--2/clips/very-special-song"><img alt="Very Special Song" class="clip-thumb" src="https://d1dmw53f30zpgm.cloudfront.net/events/163585/tile_120x90/img20150319-8635-1gbeczx.jpg?1426834478" /></a>
<a href="/events/date-night--2/clips/very-special-song">
  <h4 title="Very Special Song" class="event-name">Very Special Song</h4>
</a><script type="text/javascript">
  $('.bubble.event[data-id=112262] .clip-thumb').bind('load', function() {
    $('.bubble.event[data-id=112262] .event-name').ellipsis();
  });
</script>

</li>

            
<li class="bubble event medium trending recommended-clips" data-id="112233" data-position="1" data-status="2" data-type="clip">
  <a href="/events/espn-nba-live-chat-after-dark-ep-31/clips/thtv-real-after-dark-amin-reacts-to-harden-s-50-pt-game"><img alt="THTV Real After Dark: Amin Reacts to Harden&#x27;s 50 pt game" class="clip-thumb" src="https://d1dmw53f30zpgm.cloudfront.net/events/163559/tile_120x90/img20150319-9313-1syp4kn.jpg?1426791182" /></a>
<a href="/events/espn-nba-live-chat-after-dark-ep-31/clips/thtv-real-after-dark-amin-reacts-to-harden-s-50-pt-game">
  <h4 title="THTV Real After Dark: Amin Reacts to Harden&#x27;s 50 pt game" class="event-name">THTV Real After Dark: Amin Reacts to Harden&#x27;s 50 pt game</h4>
</a><script type="text/javascript">
  $('.bubble.event[data-id=112233] .clip-thumb').bind('load', function() {
    $('.bubble.event[data-id=112233] .event-name').ellipsis();
  });
</script>

</li>

            
<li class="bubble event medium trending recommended-clips" data-id="112086" data-position="2" data-status="2" data-type="clip">
  <a href="/events/fed-rate-increase-patient-still/clips/what-next-if-fed-drops-patient-guidance"><img alt="What Next If Fed Drops &#x27;Patient&#x27; Guidance?" class="clip-thumb" src="//s3.amazonaws.com/spreecast-photos/production/users/319720/tile_120x90/319720_photo.jpg?1392837228" /></a>
<a href="/events/fed-rate-increase-patient-still/clips/what-next-if-fed-drops-patient-guidance">
  <h4 title="What Next If Fed Drops &#x27;Patient&#x27; Guidance?" class="event-name">What Next If Fed Drops &#x27;Patient&#x27; Guidance?</h4>
</a><script type="text/javascript">
  $('.bubble.event[data-id=112086] .clip-thumb').bind('load', function() {
    $('.bubble.event[data-id=112086] .event-name').ellipsis();
  });
</script>

</li>

            
<li class="bubble event medium trending recommended-clips" data-id="112097" data-position="3" data-status="2" data-type="clip">
  <a href="/events/ebay-vs-amazon-round-11/clips/best-of-ebay-vs-amazon-round-11"><img alt="Best of eBay vs. Amazon - Round 11" class="clip-thumb" src="https://d1dmw53f30zpgm.cloudfront.net/events/163374/tile_120x90/img20150315-24987-1piqqi0.jpg?1426468224" /></a>
<a href="/events/ebay-vs-amazon-round-11/clips/best-of-ebay-vs-amazon-round-11">
  <h4 title="Best of eBay vs. Amazon - Round 11" class="event-name">Best of eBay vs. Amazon - Round 11</h4>
</a><script type="text/javascript">
  $('.bubble.event[data-id=112097] .clip-thumb').bind('load', function() {
    $('.bubble.event[data-id=112097] .event-name').ellipsis();
  });
</script>

</li>

            
<li class="bubble event medium trending recommended-clips" data-id="112237" data-position="4" data-status="2" data-type="clip">
  <a href="/events/crying/clips/crying--2"><img alt=" Crying " class="clip-thumb" src="https://d1dmw53f30zpgm.cloudfront.net/events/163581/tile_120x90/img20150319-12945-1p2i75g.jpg?1426815467" /></a>
<a href="/events/crying/clips/crying--2">
  <h4 title=" Crying " class="event-name">Crying</h4>
</a><script type="text/javascript">
  $('.bubble.event[data-id=112237] .clip-thumb').bind('load', function() {
    $('.bubble.event[data-id=112237] .event-name').ellipsis();
  });
</script>

</li>

            
<li class="bubble event medium trending recommended-clips" data-id="112257" data-position="5" data-status="2" data-type="clip">
  <a href="/events/music-astrology-predictions-for-2015/clips/awesome-moment-of-music-astrology-predictions-for-2015"><img alt="Awesome moment of Music, Astrology, Predictions for 2015" class="clip-thumb" src="https://d1dmw53f30zpgm.cloudfront.net/events/163331/tile_120x90/img20150314-29168-11pwitt.jpg?1426353621" /></a>
<a href="/events/music-astrology-predictions-for-2015/clips/awesome-moment-of-music-astrology-predictions-for-2015">
  <h4 title="Awesome moment of Music, Astrology, Predictions for 2015" class="event-name">Awesome moment of Music, Astrology, Predictions for 2015</h4>
</a><script type="text/javascript">
  $('.bubble.event[data-id=112257] .clip-thumb').bind('load', function() {
    $('.bubble.event[data-id=112257] .event-name').ellipsis();
  });
</script>

</li>

        </ul>
        <ul class="pull-left">
            
<li class="bubble event medium trending recommended-clips" data-id="111806" data-position="6" data-status="2" data-type="clip">
  <a href="/events/interview-with-the-bachelor-girls/clips/how-much-time-do-contestants-get-to-spend-with-the-bachelor"><img alt="How much time do contestants get to spend with The Bachelor?" class="clip-thumb" src="https://d1dmw53f30zpgm.cloudfront.net/events/163158/tile_120x90/img20150310-22666-zrbubv.jpg?1426026617" /></a>
<a href="/events/interview-with-the-bachelor-girls/clips/how-much-time-do-contestants-get-to-spend-with-the-bachelor">
  <h4 title="How much time do contestants get to spend with The Bachelor?" class="event-name">How much time do contestants get to spend with The Bachelor?</h4>
</a><script type="text/javascript">
  $('.bubble.event[data-id=111806] .clip-thumb').bind('load', function() {
    $('.bubble.event[data-id=111806] .event-name').ellipsis();
  });
</script>

</li>

            
<li class="bubble event medium trending recommended-clips" data-id="112091" data-position="7" data-status="2" data-type="clip">
  <a href="/events/mentormonday-build-a-personal-brand/clips/rob-hill-gives-advice-on-using-twitter"><img alt="Rob Hill gives Advice on Using Twitter " class="clip-thumb" src="https://d1dmw53f30zpgm.cloudfront.net/events/162598/tile_120x90/img20150302-16222-1vy7wak.jpg?1425336754" /></a>
<a href="/events/mentormonday-build-a-personal-brand/clips/rob-hill-gives-advice-on-using-twitter">
  <h4 title="Rob Hill gives Advice on Using Twitter " class="event-name">Rob Hill gives Advice on Using Twitter</h4>
</a><script type="text/javascript">
  $('.bubble.event[data-id=112091] .clip-thumb').bind('load', function() {
    $('.bubble.event[data-id=112091] .event-name').ellipsis();
  });
</script>

</li>

            
<li class="bubble event medium trending recommended-clips" data-id="112240" data-position="8" data-status="2" data-type="clip">
  <a href="/events/founder-institute-global-demo-day-i/clips/best-of-founder-institute-global-demo-day-i"><img alt="Best of Founder Institute Global Demo Day I" class="clip-thumb" src="https://d1dmw53f30zpgm.cloudfront.net/events/161862/tile_120x90/img20150221-26754-1f34xst.jpg?1424564067" /></a>
<a href="/events/founder-institute-global-demo-day-i/clips/best-of-founder-institute-global-demo-day-i">
  <h4 title="Best of Founder Institute Global Demo Day I" class="event-name">Best of Founder Institute Global Demo Day I</h4>
</a><script type="text/javascript">
  $('.bubble.event[data-id=112240] .clip-thumb').bind('load', function() {
    $('.bubble.event[data-id=112240] .event-name').ellipsis();
  });
</script>

</li>

            
<li class="bubble event medium trending recommended-clips" data-id="112194" data-position="9" data-status="2" data-type="clip">
  <a href="/events/the-evening-jones-03-16-15/clips/best-of-the-evening-jones-03-16-15"><img alt="Best of The Evening Jones 03.16.15" class="clip-thumb" src="https://d1dmw53f30zpgm.cloudfront.net/channels/349679/tile_120x90/349679_photo.jpg?1350224125" /></a>
<a href="/events/the-evening-jones-03-16-15/clips/best-of-the-evening-jones-03-16-15">
  <h4 title="Best of The Evening Jones 03.16.15" class="event-name">Best of The Evening Jones 03.16.15</h4>
</a><script type="text/javascript">
  $('.bubble.event[data-id=112194] .clip-thumb').bind('load', function() {
    $('.bubble.event[data-id=112194] .event-name').ellipsis();
  });
</script>

</li>

            
<li class="bubble event medium trending recommended-clips" data-id="112248" data-position="10" data-status="2" data-type="clip">
  <a href="/events/n7-ways-to-flourish-as-a-teacher/clips/jen-louden-best-of-7-ways-to-flourish-as-a-teacher"><img alt="Jen Louden: Best of 7 Ways To Flourish As A Teacher" class="clip-thumb" src="//s3.amazonaws.com/spreecast-photos/production/users/600504/tile_120x90/600504_photo.jpg?1373406908" /></a>
<a href="/events/n7-ways-to-flourish-as-a-teacher/clips/jen-louden-best-of-7-ways-to-flourish-as-a-teacher">
  <h4 title="Jen Louden: Best of 7 Ways To Flourish As A Teacher" class="event-name">Jen Louden: Best of 7 Ways To Flourish As A Teacher</h4>
</a><script type="text/javascript">
  $('.bubble.event[data-id=112248] .clip-thumb').bind('load', function() {
    $('.bubble.event[data-id=112248] .event-name').ellipsis();
  });
</script>

</li>

            
<li class="bubble event medium trending recommended-clips" data-id="112185" data-position="11" data-status="2" data-type="clip">
  <a href="/events/the-gold-patrol-jodi-ghost-town-more/clips/best-of-the-gold-patrol-jodi-ghost-town-more"><img alt="Best of The Gold Patrol: Jodi Ghost Town &amp; more!" class="clip-thumb" src="https://d1dmw53f30zpgm.cloudfront.net/events/163530/tile_120x90/img20150318-14730-1dkqrrv.jpg?1426724569" /></a>
<a href="/events/the-gold-patrol-jodi-ghost-town-more/clips/best-of-the-gold-patrol-jodi-ghost-town-more">
  <h4 title="Best of The Gold Patrol: Jodi Ghost Town &amp; more!" class="event-name">Best of The Gold Patrol: Jodi Ghost Town &amp; more!</h4>
</a><script type="text/javascript">
  $('.bubble.event[data-id=112185] .clip-thumb').bind('load', function() {
    $('.bubble.event[data-id=112185] .event-name').ellipsis();
  });
</script>

</li>

        </ul>
        <ul class="pull-left">
            
<li class="bubble event medium trending recommended-clips" data-id="112191" data-position="12" data-status="2" data-type="clip">
  <a href="/events/the-new-narrative-episode-4/clips/nn4-deo-s-perseverance"><img alt="NN4: Deo&#x27;s Perseverance" class="clip-thumb" src="//s3.amazonaws.com/spreecast-photos/production/users/900861/tile_120x90/900861_photo.jpg?1414781147" /></a>
<a href="/events/the-new-narrative-episode-4/clips/nn4-deo-s-perseverance">
  <h4 title="NN4: Deo&#x27;s Perseverance" class="event-name">NN4: Deo&#x27;s Perseverance</h4>
</a><script type="text/javascript">
  $('.bubble.event[data-id=112191] .clip-thumb').bind('load', function() {
    $('.bubble.event[data-id=112191] .event-name').ellipsis();
  });
</script>

</li>

            
<li class="bubble event medium trending recommended-clips" data-id="112116" data-position="13" data-status="2" data-type="clip">
  <a href="/events/chat-with-katee-robert-tessa-bailey/clips/best-of-chat-with-katee-robert-tessa-bailey"><img alt="Best of Chat with Katee Robert &amp; Tessa Bailey! " class="clip-thumb" src="//s3.amazonaws.com/spreecast-photos/production/users/805071/tile_120x90/805071_photo.jpg?1395763383" /></a>
<a href="/events/chat-with-katee-robert-tessa-bailey/clips/best-of-chat-with-katee-robert-tessa-bailey">
  <h4 title="Best of Chat with Katee Robert &amp; Tessa Bailey! " class="event-name">Best of Chat with Katee Robert &amp; Tessa Bailey!</h4>
</a><script type="text/javascript">
  $('.bubble.event[data-id=112116] .clip-thumb').bind('load', function() {
    $('.bubble.event[data-id=112116] .event-name').ellipsis();
  });
</script>

</li>

            
<li class="bubble event medium trending recommended-clips" data-id="111244" data-position="14" data-status="2" data-type="clip">
  <a href="/events/enchanting-an-editor--2/clips/jk-rowling-s-editor-on-deciding-to-publish-harry-potter"><img alt="JK Rowling&#x27;s Editor on Deciding to Publish Harry Potter" class="clip-thumb" src="https://d1dmw53f30zpgm.cloudfront.net/events/161604/tile_120x90/img20150218-26906-1ccftpf.jpg?1424288054" /></a>
<a href="/events/enchanting-an-editor--2/clips/jk-rowling-s-editor-on-deciding-to-publish-harry-potter">
  <h4 title="JK Rowling&#x27;s Editor on Deciding to Publish Harry Potter" class="event-name">JK Rowling&#x27;s Editor on Deciding to Publish Harry Potter</h4>
</a><script type="text/javascript">
  $('.bubble.event[data-id=111244] .clip-thumb').bind('load', function() {
    $('.bubble.event[data-id=111244] .event-name').ellipsis();
  });
</script>

</li>

            
<li class="bubble event medium trending recommended-clips" data-id="111723" data-position="15" data-status="2" data-type="clip">
  <a href="/events/treasure-hunting-w-guest-andy-slamans/clips/launching-a-pl-product-on-amazon"><img alt="Launching a PL Product on Amazon" class="clip-thumb" src="//s3.amazonaws.com/spreecast-photos/production/users/648047/tile_120x90/648047_photo.jpg?1416532039" /></a>
<a href="/events/treasure-hunting-w-guest-andy-slamans/clips/launching-a-pl-product-on-amazon">
  <h4 title="Launching a PL Product on Amazon" class="event-name">Launching a PL Product on Amazon</h4>
</a><script type="text/javascript">
  $('.bubble.event[data-id=111723] .clip-thumb').bind('load', function() {
    $('.bubble.event[data-id=111723] .event-name').ellipsis();
  });
</script>

</li>

            
<li class="bubble event medium trending recommended-clips" data-id="112150" data-position="16" data-status="2" data-type="clip">
  <a href="/events/wholesale-q-a-with-barrington-mcintosh/clips/best-of-wholesale-q-a-with-barrington-mcintosh"><img alt="Best of Wholesale Q &amp; A with Barrington McIntosh" class="clip-thumb" src="https://d1dmw53f30zpgm.cloudfront.net/events/163355/tile_120x90/163355_photo.jpg?1426446281" /></a>
<a href="/events/wholesale-q-a-with-barrington-mcintosh/clips/best-of-wholesale-q-a-with-barrington-mcintosh">
  <h4 title="Best of Wholesale Q &amp; A with Barrington McIntosh" class="event-name">Best of Wholesale Q &amp; A with Barrington McIntosh</h4>
</a><script type="text/javascript">
  $('.bubble.event[data-id=112150] .clip-thumb').bind('load', function() {
    $('.bubble.event[data-id=112150] .event-name').ellipsis();
  });
</script>

</li>

            
<li class="bubble event medium trending recommended-clips" data-id="110723" data-position="17" data-status="2" data-type="clip">
  <a href="/events/tony-robbins-spreecast/clips/tony-sage-robbins-on-conflict-resolution-in-a-relationship"><img alt="Tony &amp; Sage Robbins on Conflict Resolution in a Relationship" class="clip-thumb" src="https://d1dmw53f30zpgm.cloudfront.net/events/160371/tile_120x90/160371_photo.jpg?1422997102" /></a>
<a href="/events/tony-robbins-spreecast/clips/tony-sage-robbins-on-conflict-resolution-in-a-relationship">
  <h4 title="Tony &amp; Sage Robbins on Conflict Resolution in a Relationship" class="event-name">Tony &amp; Sage Robbins on Conflict Resolution in a Relationship</h4>
</a><script type="text/javascript">
  $('.bubble.event[data-id=110723] .clip-thumb').bind('load', function() {
    $('.bubble.event[data-id=110723] .event-name').ellipsis();
  });
</script>

</li>

        </ul>
    </div>
  </div>

  <!-- "next page" action -->
  <i class="next browse right-caret-icon"></i>
</div>

  <div class="people" data-select-list="people">
  <i class="prev browse left-caret-icon"></i>

  <div class="scrollable horizontal">
    <div class="scroll-items">
      <!-- users -->
        <ul class="pull-left">
            
<li class='bubble user trending recommended-users' data-position='0'>
    <a href="/users/kermit-and-friends" class="user-tag"><img alt="Kermit and Friends" src="//s3.amazonaws.com/spreecast-photos/production/users/915646/tile_70x70/915646_photo.jpg?1424438103" /></a>

    <a href="/users/kermit-and-friends" class="user-name" title="Kermit and Friends">Kermit and Friends</a>

</li>

            
<li class='bubble user trending recommended-users' data-position='1'>
    <a href="/users/truehooptv--2" class="user-tag"><img alt="@TrueHoopTV" src="//s3.amazonaws.com/spreecast-photos/production/users/414856/tile_70x70/414856_photo.jpg?1355868415" /></a>

    <a href="/users/truehooptv--2" class="user-name" title="@TrueHoopTV">@TrueHoopTV</a>

</li>

            
<li class='bubble user trending recommended-users' data-position='2'>
    <a href="/users/the-black-guy-who-tips" class="user-tag"><img alt="The Black Guy Who Tips" src="//s3.amazonaws.com/spreecast-photos/production/users/355294/tile_70x70/355294_photo.jpg?1352336813" /></a>

    <a href="/users/the-black-guy-who-tips" class="user-name" title="The Black Guy Who Tips">The Black Guy Who Tips</a>

</li>

            
<li class='bubble user trending recommended-users' data-position='3'>
    <a href="/users/espn" class="user-tag"><img alt="ESPN" src="//s3.amazonaws.com/spreecast-photos/production/users/403491/tile_70x70/403491_photo.jpg?1370964519" /></a>

    <a href="/users/espn" class="user-name" title="ESPN">ESPN</a>

</li>

            
<li class='bubble user trending recommended-users' data-position='4'>
    <a href="/users/chrisgreen" class="user-tag"><img alt="ChrisGreen" src="//s3.amazonaws.com/spreecast-photos/production/users/342104/tile_70x70/342104_photo.jpg?1349323494" /></a>

    <a href="/users/chrisgreen" class="user-name" title="ChrisGreen">ChrisGreen</a>

</li>

            
<li class='bubble user trending recommended-users' data-position='5'>
    <a href="/users/the-gold-patrol" class="user-tag"><img alt="THE GOLD PATROL™ with Jeff Gold" src="//s3.amazonaws.com/spreecast-photos/production/users/519375/tile_70x70/519375_photo.jpg?1423693118" /></a>

    <a href="/users/the-gold-patrol" class="user-name" title="THE GOLD PATROL™ with Jeff Gold">THE GOLD PATROL™ with Jeff Gold</a>

</li>

            
<li class='bubble user trending recommended-users' data-position='6'>
    <a href="/users/bomani" class="user-tag"><img alt="Bomani Jones" src="//s3.amazonaws.com/spreecast-photos/production/users/348871/tile_70x70/348871_photo.jpg?1350088000" /></a>

    <a href="/users/bomani" class="user-name" title="Bomani Jones">Bomani Jones</a>

</li>

            
<li class='bubble user trending recommended-users' data-position='7'>
    <a href="/users/liberty-me" class="user-tag"><img alt="Liberty.me" src="//s3.amazonaws.com/spreecast-photos/production/users/912929/tile_70x70/912929_photo.jpg?1417562291" /></a>

    <a href="/users/liberty-me" class="user-name" title="Liberty.me">Liberty.me</a>

</li>

        </ul>
        <ul class="pull-left">
            
<li class='bubble user trending recommended-users' data-position='8'>
    <a href="/users/snckpck" class="user-tag"><img alt="SNCKPCK" src="//s3.amazonaws.com/spreecast-photos/production/users/231098/tile_70x70/231098_photo.jpg?1423179026" /></a>

    <a href="/users/snckpck" class="user-name" title="SNCKPCK">SNCKPCK</a>

</li>

            
<li class='bubble user trending recommended-users' data-position='9'>
    <a href="/users/affiliate-funnel--2" class="user-tag"><img alt="Affiliate Funnel" src="//s3.amazonaws.com/spreecast-photos/production/users/922025/tile_70x70/922025_photo.jpg?1420255388" /></a>

    <a href="/users/affiliate-funnel--2" class="user-name" title="Affiliate Funnel">Affiliate Funnel</a>

</li>

            
<li class='bubble user trending recommended-users' data-position='10'>
    <a href="/users/espn-college-basketball--2" class="user-tag"><img alt="ESPN College Basketball" src="//s3.amazonaws.com/spreecast-photos/production/users/473084/tile_70x70/473084_photo.jpg?1418763981" /></a>

    <a href="/users/espn-college-basketball--2" class="user-name" title="ESPN College Basketball">ESPN College Basketball</a>

</li>

            
<li class='bubble user trending recommended-users' data-position='11'>
    <a href="/users/paul-carrick" class="user-tag"><img alt="Paul Carrick Brunson" src="//s3.amazonaws.com/spreecast-photos/production/users/68057/tile_70x70/68057_photo.jpg?1322269962" /></a>

    <a href="/users/paul-carrick" class="user-name" title="Paul Carrick Brunson">Paul Carrick Brunson</a>

</li>

            
<li class='bubble user trending recommended-users' data-position='12'>
    <a href="/users/deanna-kosaraju" class="user-tag"><img alt="Deanna Kosaraju" src="//s3.amazonaws.com/spreecast-photos/production/users/527486/tile_70x70/527486_photo.jpg?1367982022" /></a>

    <a href="/users/deanna-kosaraju" class="user-name" title="Deanna Kosaraju">Deanna Kosaraju</a>

</li>

            
<li class='bubble user trending recommended-users' data-position='13'>
    <a href="/users/jen-louden" class="user-tag"><img alt="Jen Louden" src="//s3.amazonaws.com/spreecast-photos/production/users/600504/tile_70x70/600504_photo.jpg?1373406908" /></a>

    <a href="/users/jen-louden" class="user-name" title="Jen Louden">Jen Louden</a>

</li>

            
<li class='bubble user trending recommended-users' data-position='14'>
    <a href="/users/reality-steve" class="user-tag"><img alt="Reality Steve" src="//s3.amazonaws.com/spreecast-photos/production/users/142781/tile_70x70/142781_photo.jpg?1389908748" /></a>

    <a href="/users/reality-steve" class="user-name" title="Reality Steve">Reality Steve</a>

</li>

            
<li class='bubble user trending recommended-users' data-position='15'>
    <a href="/users/founder-institute" class="user-tag"><img alt="Founder Institute" src="//s3.amazonaws.com/spreecast-photos/production/users/531098/tile_70x70/531098_photo.jpg?1368465261" /></a>

    <a href="/users/founder-institute" class="user-name" title="Founder Institute">Founder Institute</a>

</li>

        </ul>
        <ul class="pull-left">
            
<li class='bubble user trending recommended-users' data-position='16'>
    <a href="/users/wall-street-journal" class="user-tag"><img alt="Wall Street Journal" src="//s3.amazonaws.com/spreecast-photos/production/users/319720/tile_70x70/319720_photo.jpg?1392837228" /></a>

    <a href="/users/wall-street-journal" class="user-name" title="Wall Street Journal">Wall Street Journal</a>

</li>

            
<li class='bubble user trending recommended-users' data-position='17'>
    <a href="/users/recruitingnation" class="user-tag"><img alt="RecruitingNation" src="//s3.amazonaws.com/spreecast-photos/production/users/422619/tile_70x70/422619_photo.jpg?1357225285" /></a>

    <a href="/users/recruitingnation" class="user-name" title="RecruitingNation">RecruitingNation</a>

</li>

            
<li class='bubble user trending recommended-users' data-position='18'>
    <a href="/users/barrington--3" class="user-tag"><img alt="Barrington McIntosh" src="//s3.amazonaws.com/spreecast-photos/production/users/674106/tile_70x70/674106_photo.jpg?1378407817" /></a>

    <a href="/users/barrington--3" class="user-name" title="Barrington McIntosh">Barrington McIntosh</a>

</li>

            
<li class='bubble user trending recommended-users' data-position='19'>
    <a href="/users/team-tony" class="user-tag"><img alt="Team Tony" src="//s3.amazonaws.com/spreecast-photos/production/users/932791/tile_70x70/932791_photo.jpg?1422915028" /></a>

    <a href="/users/team-tony" class="user-name" title="Team Tony">Team Tony</a>

</li>

            
<li class='bubble user trending recommended-users' data-position='20'>
    <a href="/users/premiers-team-training" class="user-tag"><img alt="Premiers Team Training Jesi~Darlean~Shawna~Laura" src="//s3.amazonaws.com/spreecast-photos/production/users/670144/tile_70x70/670144_photo.jpg?1411572601" /></a>

    <a href="/users/premiers-team-training" class="user-name" title="Premiers Team Training Jesi~Darlean~Shawna~Laura">Premiers Team Training Jesi~Darlean~S...</a>

</li>

            
<li class='bubble user trending recommended-users' data-position='21'>
    <a href="/users/haylie-pomroy-group" class="user-tag"><img alt="Haylie Pomroy Group" src="//s3.amazonaws.com/spreecast-photos/production/users/676669/tile_70x70/676669_photo.jpg?1417726375" /></a>

    <a href="/users/haylie-pomroy-group" class="user-name" title="Haylie Pomroy Group">Haylie Pomroy Group</a>

</li>

            
<li class='bubble user trending recommended-users' data-position='22'>
    <a href="/users/pixie--3" class="user-tag"><img alt="Pixie Lighthorse" src="//s3.amazonaws.com/spreecast-photos/production/users/460718/tile_70x70/460718_photo.jpg?1361414288" /></a>

    <a href="/users/pixie--3" class="user-name" title="Pixie Lighthorse">Pixie Lighthorse</a>

</li>

            
<li class='bubble user trending recommended-users' data-position='23'>
    <a href="/users/lockedonsports" class="user-tag"><img alt="@Lockedonsports" src="//s3.amazonaws.com/spreecast-photos/production/users/346278/tile_70x70/346278_photo.jpg?1349976863" /></a>

    <a href="/users/lockedonsports" class="user-name" title="@Lockedonsports">@Lockedonsports</a>

</li>

        </ul>
    </div>
  </div>

  <i class="next browse right-caret-icon"></i>
</div>

</div>


</div>  <div class="section" data-section="trending" id="section-trending">
    <div class="subsection-wrapper" data-subsection="trending">

  <div id="trending" class="subsection box clearfix" data-subsection="trending">
    <h1 class="trending-header">热门</h1>
    <div class="clearfix">
      
      <ul class='event-previews popular-home'>
      <?php
      if($hot_prog_videos) {
          foreach($hot_prog_videos as $k=>$v) {
              if($k>0 && $k%4 == 0) {
      ?>
          </ul>
          <ul class='event-previews popular-home'>
      <?php        
              }
      ?>      
         <li class="bubble event small four-column" data-id="<?php echo $v['rid']; ?>" data-position="<?php echo $k; ?>" data-status="2" data-type="event" title="<?php echo $v['title']; ?> <?php echo $v['rid']; ?>">

  <a href="/events/<?php echo $v['rid']; ?>">
    <div class="event-image-container">
  <img alt="<?php echo $v['title']; ?> <?php echo $v['rid']; ?>" class="event-image" src="<?php echo $v['pic_name']; ?>" title="<?php echo $v['title']; ?> <?php echo $v['rid']; ?>" />
</div>
</a>
  <div>
    <a href="/events/<?php echo $v['rid']; ?>">
  <h4 title="<?php echo $v['title']; ?> <?php echo $v['rid']; ?>" class="event-name"><?php echo $v['title']; ?> <?php echo $v['rid']; ?></h4>
</a><h4>
    <a href="/users/<?php echo $v['uid']; ?>" class="user-name" title="<?php echo $v['username']; ?>"><?php echo $v['username']; ?></a>

</h4>

<div class="event-meta">
    <span>
      <?php echo $v['views']; ?>views
    </span>
    <i class='bullet-icon'></i>
    <span class='start-date invisible'>
      <?php echo $v['record_time']; ?>
    </span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=<?php echo $v['rid']; ?>] .event-image').bind('load', function() {
      $('.bubble.event[data-id=<?php echo $v['rid']; ?>] .event-name').ellipsis();
    });
  </script>
  <span class='hide_from_profile btn-gray'></span>
</li> 
      <?php    
          }      
      }
      ?> 
      </ul>
            

<script type="text/javascript">
  Time.localizeDOM('[data-subsection=trending]');
</script>



    </div>
  </div>

  <div id="trending-more">
    <a href="/events/list?featured=all&page=1" class="home-show-more">
      <input type="button" class="btn-blue" value="显示更多" />
</a>  </div>

</div>

</div>
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
      <a class="mr-5 signout-link" id="header-signout">退出登录</a>
      <img class="{{user.thumbnailClass}}" src="{{ user.profile_thumb_url }}" alt="{{ user.name }}"/>
    {{else}}
      {{#with user}}
        <nav id="nav-menu">
          <a id="user_status">
            <img class="{{thumbnailClass}}" src="{{ profile_thumb_url }}" alt="{{ name }}"/>
          </a>
          <ul class="menu-options">
            <li>
              <a class="menu-option" href="/users/{{ id }}" target="_self">用户中心</a>
            </li>
            <li>
              <a class="menu-option" href="/users/{{ id }}/edit?tab=spreecasts" target="_self">我的酷Live</a>
            </li>
            <li>
              <a class="menu-option" href="/users/{{ id }}/edit?tab=settings" target="_self">账号设置</a>
            </li>
            {{#if admin}}
              <li>
                <a class="menu-option" href="/admin" target="_self">管理员</a>
              </li>
              <li>
                <a class="menu-option" href="/admin/contents" target="_self">内容</a>
              </li>
            {{/if}}
            {{#if content_mod}}
              <li>
                <a class="menu-option" href="/moderation" target="_self">Moderation</a>
              </li>
            {{/if}}
            <li>
              <a class="menu-option" href="http://we.labake.cn/?/topic/square/help" target="_self">帮助</a>
            </li>
            <li>
              <a class="menu-option" id="header-signout">退出登录</a>
            </li>
          </ul>
        </nav>
      {{/with}}
    {{/if}}
  {{else}}
    <a class="login-link" href="#" onclick="LoginManager.showLogin();; return false;">登录</a>
    <input class="signup-button" onclick="spree.loginMgr.showSignup(&quot;signup&quot;);" type="button" value="注册" />
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
    <i class="friend-notifications-icon">
	<img class="small-circle-avatar" src="/templates/spree/production/images/noprofile50.png" alt="">
	</i>
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
      <h4 class="center">查看所有</h4>
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
  <form accept-charset="UTF-8" action="/home" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="DlInRIT7Gxbb7O1aboU76IVTXoD1/++YauOQ4nCAP6g=" /></div>
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
    return Handlebars.compile($('script#hb-modal_header_with_image').html())({src: "/images/coollive-logo-black.png", width: 150, alt: "Spreecast", opts:opts});
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
  {{{ modal_header_with_text "密码重设" opts }}}
</script>

<script id="hb-modal-password-recovery-feedback-body" type="text/x-handlebars-template">
  <p class="with-no-top-margin center">If this address is in our system, an email has been sent with instructions to reset your password</p>
</script>

<script id="hb-modal-password-recovery-feedback-footer" type="text/x-handlebars-template">
  <section class="modal-action pull-right">
    <a class="mr-5" onclick="spree.modalMgr.showNext('login','password-recovery-feedback')">重新登录</a>
    {{{ modal_footer_confirm "Done" opts.modalId }}}
  </section>
</script>


<script id="hb-modal-email-signup-header" type="text/x-handlebars-template">
  {{{ modal_header_with_logo opts }}}
</script>

<script id="hb-modal-email-signup-body" type="text/x-handlebars-template">
  <form accept-charset="UTF-8" action="/users" class="new_user" client-validation="true" data-remote="true" id="new_user" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="DlInRIT7Gxbb7O1aboU76IVTXoD1/++YauOQ4nCAP6g=" /></div>
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
  <form accept-charset="UTF-8" action="/users/reset_password" class="new_user" client-validation="true" data-remote="true" id="reset-password" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="DlInRIT7Gxbb7O1aboU76IVTXoD1/++YauOQ4nCAP6g=" /></div>
    <fieldset>
     <label class="is-visually-hidden" for="user_email">Email Address</label>
     <input class="common-input" data-required="true" id="user_email" name="user[email]" placeholder="Email" size="30" title="Enter Your Registered Email" type="email" />
     <div class="error_field error" id="user_email_error" style="display:none"></div>
    </fieldset>
</form></script>


<script id="hb-modal-forgot-password-footer" type="text/x-handlebars-template">
  <section class="modal-action pull-right">
    <a class="mr-5" onclick="spree.modalMgr.showNext('login', 'forgot-password')">返回</a>
    <input type="submit" class="btn-blue" value="重设密码" onClick="
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
		<button aria-hidden="true" class="auth_link qq-signup" data-site="facebook" data-social-url="/users/auth/facebook" data-tracking-callback="openOauthSite">
	<i class="qq-icon"></i>
  <b>Log in with Facebook</b>
</button>
  </li>
  <li>
		<button aria-hidden="true" class="auth_link sina-signup" data-site="twitter" data-social-url="/users/auth/twitter" data-tracking-callback="openOauthSite">
	<i class="sina-icon"></i>
  <b>Log In with Twitter</b>
</button>
  </li>
    </ul>

    <hr/>

    <form accept-charset="UTF-8" action="/users/sign_in" class="new_user" data-remote="true" id="new_user" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="DlInRIT7Gxbb7O1aboU76IVTXoD1/++YauOQ4nCAP6g=" /></div>
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
		<button aria-hidden="true" class="auth_link qq-signup" data-site="facebook" data-social-url="/users/auth/facebook" data-tracking-callback="openOauthSite">
	<i class="qq-icon"></i>
  <b>QQ授权注册</b>
</button>
  </li>
  <li>
		<button aria-hidden="true" class="auth_link sina-signup" data-site="twitter" data-social-url="/users/auth/twitter" data-tracking-callback="openOauthSite">
	<i class="sina-icon"></i>
  <b>新浪授权注册</b>
</button>
  </li>
    <li>
      <button onclick="spree.modalMgr.showNext('email-signup', 'signup');" id="email-signup-button" type='button' class="email-signup" aria-hidden="true">
        <i class="email-icon"></i>
        <b>用邮箱注册</b>
      </button>
    </li>
  </ul>
</script>

<script id="hb-modal-signup-footer" type="text/x-handlebars-template">
  <section class="modal-action center">
    <a onclick="spree.modalMgr.showNext('login','signup')">已经有一个账号了?</a>
  </section>
</script>

  </body>
</html>
