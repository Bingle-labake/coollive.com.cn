
<!DOCTYPE html>
<html>  
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# spreecast: http://ogp.me/ns/fb/spreecast#">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!--[if lte IE 9]>
    <script type="text/javascript">
      window.location.href = '/upgrade';
    </script>
    <![endif]-->
  <meta content="<?php echo $user['username'];?> - Coollive" name="title" />
  <meta content="<?php echo $user['username'];?> 在Coollive平台上" name="description" />
  <meta content="" name="keywords" />
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
    Coollive
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
    spree.mixpanelPageType = 'profile';
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

  
  
  
  
</head>

  <body class="users_show ">
      <div class="rapper">
    <div id="fb-root"></div>



          <div id="site-channels" data-user-channel="1cbddd43349c30c27847b0c5d7491d4d" data-user-channel-last-message-id="0" data-everyone-channel="3bf5b67abf2ae25d010cc3fb7c4972c2" data-everyone-channel-last-message-id="0"></div>
      <!-- AEB_EVENT_CHANNELS_REPLACE -->
      <div id="user-cache-elements-replacement" data-profile="" data-buddy-list="W10=" data-friend-requests="W10=" data-friend-accepts="W10=" data-following="eyJmb2xsb3dpbmciOlszNDIxMDQsMzQ4ODcxLDM1NTI5NCw0MDM0OTEsNDE0ODU2LDUyMTAyNyw5MTU2NDYsOTU2OTE2XX0="></div>
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
            <a href="/events?upcoming_all=all">查看所有</a>
          </span>
        </h4>

        <h4 title="Trending Spreecasts" class="listing-header animated" data-status="2">
          Trending Spreecasts
          <span class='see-all'>
            <a href="/events?featured=all">查看所有</a>
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


        <section id="profile-header-wrapper">
  <div class="profile-header">
    <div class="user-header-main">
      <img alt="<?php echo $user['username'];?>" class="user-header-profile-image" src="<?php echo avatar($user['uid'], "jpg", 'big');?>" />
      <div>
        <h2 title='<?php echo $user['username'];?>'><?php echo $user['username'];?>
          <p class="inline">
            <?php if($me == $user['uid']) { ?>
            <a href="/users/<?php echo $user['uid'];?>/edit_profile">编辑</a>
            <?php } ?>
          </p>
        </h2>
        <?php if($me != $user['uid']) { ?>
          <button class="following_button following profile-social mr-10" data-button-id="follow_button_User_chrisgreen" data-following="true" data-id="chrisgreen" data-item-id="342104" data-item="User" data-off-text="Following" data-on-text="Follow" data-registration-required-reason="follow" data-registration-required="true" onClick="spree.clickFollowItem(&#x27;follow_button_User_chrisgreen&#x27;);">关注</button>
          <div class="friend-action inline">
              <button class="add-friend-btn profile-social" data-button-id="profile_add_friend_342104" data-clicked-state="request_friend" data-friend-state="requested" data-friend-target-id="342104" onClick="spree.addFriend(&#x27;profile_add_friend_342104&#x27;);"></button>
          </div>
        <div id="fb-tw-web-links">
            <a href="http://www.facebook.com/profile.php?id=500625785" class="facebook-icon" target="_blank" title="ChrisGreen on Facebook"></a>
            <a href="http://www.linkedin.com/in/hustle" class="linkedin-icon" target="_blank" title="ChrisGreen on Linkedin"></a>
            <a href="http://www.twitter.com/locomodem" class="twitter-icon" target="_blank" title="ChrisGreen on Twitter"></a>
          <a href="http://scanpower.com" class="www-icon" target="_blank" title="ChrisGreen&#x27;s website at http://scanpower.com"></a>
        </div>
        <?php } ?>
      </div>
    </div>
    <div class="user-header-details">
      <div class="stats">
        <ul class="owner-categories">
          <li class="tab" data-tab="following">
            <div class="user-following">
              <div class="number-of-following"><?php echo $user['following'];?></div>
              <h6>我的关注</h6>
            </div>
          </li>
          <li class="tab" data-tab="followers">
            <div class="user-followers">
              <div class="number-of-followers"><?php echo $user['followers'];?></div>
              <h6>我的粉丝</h6>
            </div>
          </li>
          <li class="tab" data-tab="friends">
            <div class="user-friends">
              <div class="number-of-friends"><?php echo $user['friends'];?></div>
              <h6>好友</h6>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="profile-meta">
    <div class="about-me">
      <?php echo $user['aboutme'];?>
      
    </div>
    <div class="is-visually-hidden full-description">
      <?php echo $user['desc'];?>
    </div>
  </div>
</section>

<div class="profile-tabs-container">
  <div class="profile-tab-menu">
    <ul class="profile-tabs owner-categories">
      <li  data-tab="spreecasts" data-selected="true">
        <a class="tab"><i class="logo-icon tab-selected"></i>酷Live</a>
      </li>
        <li data-tab="channels">
          <a class="tab"><i class="channel-icon"></i>频道</a>
        </li>
      <li data-tab="clips">
        <a class="tab"><i class="clip-icon"></i>剪辑</a>
      </li>
    </ul>
  </div>
</div>

  <section class="info-section" data-tab="spreecasts" data-selected="true" data-loaded="true"><ul class="profile-stats">
    <li data-action="created">
      <h2 class="count">0</h2>
      <h6 class="action">Created</h6>
</li>    <li data-action="produced">
      <h2 class="count">0</h2>
      <h6 class="action">Produced</h6>
</li>    <li data-action="was_on_camera">
      <h2 class="count">0</h2>
      <h6 class="action">On Camera</h6>
</li>    <li data-action="commented">
      <h2 class="count">0</h2>
      <h6 class="action">Commented</h6>
</li>    <li data-action="attended" data-selected="true">
      <h2 class="count">5</h2>
      <h6 class="action">Attended</h6>
</li>    <li data-action="watched">
      <h2 class="count">29</h2>
      <h6 class="action">Watched</h6>
</li></ul>
<div class="profile-grid pull-left" data-section="recent">
    <div class="profile-grid-tab" data-action="created">
      <h2>Created</h2>
      <div class="profile-content">
        <h3><em>Loading ...</em></h3>
      </div>
</div>    <div class="profile-grid-tab" data-action="produced">
      <h2>Produced</h2>
      <div class="profile-content">
        <h3><em>Loading ...</em></h3>
      </div>
</div>    <div class="profile-grid-tab" data-action="was_on_camera">
      <h2><span class="translation_missing" title="translation missing: en.was_on_camera">Was On Camera</span></h2>
      <div class="profile-content">
        <h3><em>Loading ...</em></h3>
      </div>
</div>    <div class="profile-grid-tab" data-action="commented">
      <h2>Commented</h2>
      <div class="profile-content">
        <h3><em>Loading ...</em></h3>
      </div>
</div>    <div class="profile-grid-tab" data-action="attended" data-selected="true" data-loaded="true">
      <h2>Attended</h2>
      <div class="profile-content">  
      <ul class="event-previews ">
    <li class="bubble event small three-column" data-id="162562" data-position="0" data-status="2" data-type="event" title="How To Develop Your Startup Ecosystem">

  <a href="/events/how-to-develop-your-startup-ecosystem--3">
    <div class="event-image-container">
  <img alt="How To Develop Your Startup Ecosystem" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/162562/tile_480x360/img20150302-9399-46g0qa.jpg?1425320338" title="How To Develop Your Startup Ecosystem">
</div>
</a>
  <div>
    <a href="/events/how-to-develop-your-startup-ecosystem--3">
  <h4 title="How To Develop Your Startup Ecosystem" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">How To Develop Your Startup Ecosystem</div></h4>
</a><h4>
    <a href="/users/founder-institute" class="user-name" title="Founder Institute">Founder Institute</a>

</h4>

<div class="event-meta">
    <span>
      6,450 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">1 month ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=162562] .event-image').bind('load', function() {
      $('.bubble.event[data-id=162562] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

    <li class="bubble event small three-column" data-id="163589" data-position="1" data-status="2" data-type="event" title="It's Party Time!">

  <a href="/events/it-s-party-time">
    <div class="event-image-container">
  <img alt="It's Party Time!" class="event-image" src="//s3.amazonaws.com/spreecast-photos/production/users/922025/tile_480x360/922025_photo.jpg?1420255388" title="It's Party Time!">
</div>
</a>
  <div>
    <a href="/events/it-s-party-time">
  <h4 title="It's Party Time!" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">It's Party Time!</div></h4>
</a><h4>
    <a href="/users/affiliate-funnel--2" class="user-name" title="Affiliate Funnel">Affiliate Funnel</a>

</h4>

<div class="event-meta">
    <span>
      1,864 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">1 month ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163589] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163589] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

    <li class="bubble event small three-column" data-id="155035" data-position="2" data-status="2" data-type="event" title="Free For Everyone Balls Deep Sports ">

  <a href="/events/free-for-everyone-balls-deep-sports">
    <div class="event-image-container">
  <img alt="Free For Everyone Balls Deep Sports " class="event-image" src="//s3.amazonaws.com/spreecast-photos/production/users/355294/tile_480x360/355294_photo.jpg?1352336813" title="Free For Everyone Balls Deep Sports ">
</div>
</a>
  <div>
    <a href="/events/free-for-everyone-balls-deep-sports">
  <h4 title="Free For Everyone Balls Deep Sports " class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">Free For Everyone Balls Deep Sports</div></h4>
</a><h4>
    <a href="/users/the-black-guy-who-tips" class="user-name" title="The Black Guy Who Tips">The Black Guy Who Tips</a>

</h4>

<div class="event-meta">
    <span>
      1,508 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">5 months ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=155035] .event-image').bind('load', function() {
      $('.bubble.event[data-id=155035] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

      </ul>
      <ul class="event-previews ">
    <li class="bubble event small three-column" data-id="153789" data-position="3" data-status="2" data-type="event" title="ESPN NBA Live Chat - Episode 81">

  <a href="/events/espn-nba-live-chat-episode-81">
    <div class="event-image-container">
  <img alt="ESPN NBA Live Chat - Episode 81" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/153789/tile_480x360/img20141030-26350-7z484g.jpg?1414687297" title="ESPN NBA Live Chat - Episode 81">
</div>
</a>
  <div>
    <a href="/events/espn-nba-live-chat-episode-81">
  <h4 title="ESPN NBA Live Chat - Episode 81" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">ESPN NBA Live Chat - Episode 81</div></h4>
</a><h4>
    <a href="/users/truehooptv--2" class="user-name" title="@TrueHoopTV">@TrueHoopTV</a>

</h4>

<div class="event-meta">
    <span>
      47,087 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">6 months ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=153789] .event-image').bind('load', function() {
      $('.bubble.event[data-id=153789] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

    <li class="bubble event small three-column" data-id="152848" data-position="4" data-status="2" data-type="event" title="TBGWT with Breakfast For Dinner">

  <a href="/events/tbgwt-with-breakfast-for-dinner--2">
    <div class="event-image-container">
  <img alt="TBGWT with Breakfast For Dinner" class="event-image" src="//s3.amazonaws.com/spreecast-photos/production/users/355294/tile_480x360/355294_photo.jpg?1352336813" title="TBGWT with Breakfast For Dinner">
</div>
</a>
  <div>
    <a href="/events/tbgwt-with-breakfast-for-dinner--2">
  <h4 title="TBGWT with Breakfast For Dinner" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">TBGWT with Breakfast For Dinner</div></h4>
</a><h4>
    <a href="/users/the-black-guy-who-tips" class="user-name" title="The Black Guy Who Tips">The Black Guy Who Tips</a>

</h4>

<div class="event-meta">
    <span>
      1,092 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">6 months ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=152848] .event-image').bind('load', function() {
      $('.bubble.event[data-id=152848] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

      </ul>

<script type="text/javascript">
  Time.localizeDOM('[data-subsection=trending]');
</script>


  <div class="center">
  </div>
</div>
</div>    <div class="profile-grid-tab" data-action="watched">
      <h2>Watched</h2>
      <div class="profile-content">  
      <ul class="event-previews ">
    <li class="bubble event small three-column" data-id="165089" data-position="0" data-status="2" data-type="event" title="Ivy's Skirt">

  <a href="/events/ivy-s-skirt">
    <div class="event-image-container">
  <img alt="Ivy's Skirt" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/165089/tile_480x360/img20150504-3888-18hrms8.jpg?1430789539" title="Ivy's Skirt">
</div>
</a>
  <div>
    <a href="/events/ivy-s-skirt">
  <h4 title="Ivy's Skirt" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">Ivy's Skirt</div></h4>
</a><h4>
    <a href="/users/kermit-and-friends" class="user-name" title="Kermit and Friends">Kermit and Friends</a>

</h4>

<div class="event-meta">
    <span>
      3,207 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">12 hours ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=165089] .event-image').bind('load', function() {
      $('.bubble.event[data-id=165089] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

    <li class="bubble event small three-column" data-id="164174" data-position="1" data-status="2" data-type="event" title="Benjy and Domina">

  <a href="/events/benjy-and-domina">
    <div class="event-image-container">
  <img alt="Benjy and Domina" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/164174/tile_480x360/img20150406-22290-trtw7k.jpg?1428370396" title="Benjy and Domina">
</div>
</a>
  <div>
    <a href="/events/benjy-and-domina">
  <h4 title="Benjy and Domina" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">Benjy and Domina</div></h4>
</a><h4>
    <a href="/users/kermit-and-friends" class="user-name" title="Kermit and Friends">Kermit and Friends</a>

</h4>

<div class="event-meta">
    <span>
      4,619 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">about a month ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=164174] .event-image').bind('load', function() {
      $('.bubble.event[data-id=164174] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

    <li class="bubble event small three-column" data-id="164125" data-position="2" data-status="2" data-type="event" title="TBGWT with Impossible White Man Jae">

  <a href="/events/tbgwt-with-impossible-white-man-jae">
    <div class="event-image-container">
  <img alt="TBGWT with Impossible White Man Jae" class="event-image" src="//s3.amazonaws.com/spreecast-photos/production/users/355294/tile_480x360/355294_photo.jpg?1352336813" title="TBGWT with Impossible White Man Jae">
</div>
</a>
  <div>
    <a href="/events/tbgwt-with-impossible-white-man-jae">
  <h4 title="TBGWT with Impossible White Man Jae" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">TBGWT with Impossible White Man Jae</div></h4>
</a><h4>
    <a href="/users/the-black-guy-who-tips" class="user-name" title="The Black Guy Who Tips">The Black Guy Who Tips</a>

</h4>

<div class="event-meta">
    <span>
      1,691 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">about a month ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=164125] .event-image').bind('load', function() {
      $('.bubble.event[data-id=164125] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

      </ul>
      <ul class="event-previews ">
    <li class="bubble event small three-column" data-id="163969" data-position="3" data-status="2" data-type="event" title="Jenskii Krug">

  <a href="/events/jenskii-krug">
    <div class="event-image-container">
  <img alt="Jenskii Krug" class="event-image" src="//s3.amazonaws.com/spreecast-photos/production/users/479974/tile_480x360/479974_photo.jpg?1363785111" title="Jenskii Krug">
</div>
</a>
  <div>
    <a href="/events/jenskii-krug">
  <h4 title="Jenskii Krug" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">Jenskii Krug</div></h4>
</a><h4>
    <a href="/users/nadya-andreeva" class="user-name" title="Nadya Andreeva">Nadya Andreeva</a>

</h4>

<div class="event-meta">
    <span>
      2,606 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">about a month ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163969] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163969] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

    <li class="bubble event small three-column" data-id="163912" data-position="4" data-status="2" data-type="event" title="Katharyne's BIG LIVE Yard Sale Special!">

  <a href="/events/katharyne-s-big-live-yard-sale-special">
    <div class="event-image-container">
  <img alt="Katharyne's BIG LIVE Yard Sale Special!" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163912/tile_480x360/img20150329-18983-1qtu1p1.jpg?1427694675" title="Katharyne's BIG LIVE Yard Sale Special!">
</div>
</a>
  <div>
    <a href="/events/katharyne-s-big-live-yard-sale-special">
  <h4 title="Katharyne's BIG LIVE Yard Sale Special!" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">Katharyne's BIG LIVE Yard Sale Special!</div></h4>
</a><h4>
    <a href="/users/katharyne" class="user-name" title="Katharyne Shelton">Katharyne Shelton</a>

</h4>

<div class="event-meta">
    <span>
      2,288 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">about a month ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163912] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163912] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

    <li class="bubble event small three-column" data-id="163999" data-position="5" data-status="2" data-type="event" title="Thank You Eytan">

  <a href="/events/thank-you-eytan">
    <div class="event-image-container">
  <img alt="Thank You Eytan" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163999/tile_480x360/163999_photo.jpg?1427857782" title="Thank You Eytan">
</div>
</a>
  <div>
    <a href="/events/thank-you-eytan">
  <h4 title="Thank You Eytan" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">Thank You Eytan</div></h4>
</a><h4>
    <a href="/users/kermit-and-friends" class="user-name" title="Kermit and Friends">Kermit and Friends</a>

</h4>

<div class="event-meta">
    <span>
      2,774 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">about a month ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163999] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163999] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

      </ul>
      <ul class="event-previews ">
    <li class="bubble event small three-column" data-id="163434" data-position="6" data-status="2" data-type="event" title="Live More Weigh Less Launch Party">

  <a href="/events/live-more-weigh-less-launch-party--2">
    <div class="event-image-container">
  <img alt="Live More Weigh Less Launch Party" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163434/tile_480x360/img20150316-10848-10btsno.jpg?1426566169" title="Live More Weigh Less Launch Party">
</div>
</a>
  <div>
    <a href="/events/live-more-weigh-less-launch-party--2">
  <h4 title="Live More Weigh Less Launch Party" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">Live More Weigh Less Launch Party</div></h4>
</a><h4>
    <a href="/users/sarah--463" class="user-name" title="Sarah Jenks">Sarah Jenks</a>

</h4>

<div class="event-meta">
    <span>
      7,689 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">about a month ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163434] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163434] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

    <li class="bubble event small three-column" data-id="163826" data-position="7" data-status="2" data-type="event" title="Superstar Ryan Lever">

  <a href="/events/superstar-ryan-lever">
    <div class="event-image-container">
  <img alt="Superstar Ryan Lever" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163826/tile_480x360/img20150326-27590-lfscl6.jpg?1427425071" title="Superstar Ryan Lever">
</div>
</a>
  <div>
    <a href="/events/superstar-ryan-lever">
  <h4 title="Superstar Ryan Lever" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">Superstar Ryan Lever</div></h4>
</a><h4>
    <a href="/users/kermit-and-friends" class="user-name" title="Kermit and Friends">Kermit and Friends</a>

</h4>

<div class="event-meta">
    <span>
      3,210 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">1 month ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163826] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163826] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

    <li class="bubble event small three-column" data-id="163711" data-position="8" data-status="2" data-type="event" title="ESPN NBA Live Chat Episode 115">

  <a href="/events/espn-nba-live-chat-episode-115">
    <div class="event-image-container">
  <img alt="ESPN NBA Live Chat Episode 115" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163711/tile_480x360/img20150324-28500-jsfecn.jpg?1427218727" title="ESPN NBA Live Chat Episode 115">
</div>
</a>
  <div>
    <a href="/events/espn-nba-live-chat-episode-115">
  <h4 title="ESPN NBA Live Chat Episode 115" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">ESPN NBA Live Chat Episode 115</div></h4>
</a><h4>
    <a href="/users/truehooptv--2" class="user-name" title="@TrueHoopTV">@TrueHoopTV</a>

</h4>

<div class="event-meta">
    <span>
      92,304 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">1 month ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163711] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163711] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

      </ul>
      <ul class="event-previews ">
    <li class="bubble event small three-column" data-id="163697" data-position="9" data-status="2" data-type="event" title="The Incredible Ian">

  <a href="/events/the-incredible-ian">
    <div class="event-image-container">
  <img alt="The Incredible Ian" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163697/tile_480x360/163697_photo.jpg?1427209536" title="The Incredible Ian">
</div>
</a>
  <div>
    <a href="/events/the-incredible-ian">
  <h4 title="The Incredible Ian" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">The Incredible Ian</div></h4>
</a><h4>
    <a href="/users/kermit-and-friends" class="user-name" title="Kermit and Friends">Kermit and Friends</a>

</h4>

<div class="event-meta">
    <span>
      2,675 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">1 month ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163697] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163697] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

    <li class="bubble event small three-column" data-id="163701" data-position="10" data-status="2" data-type="event" title="ESPN Chalk college basketball betting">

  <a href="/events/espn-chalk-college-basketball-betting">
    <div class="event-image-container">
  <img alt="ESPN Chalk college basketball betting" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163701/tile_480x360/img20150324-8766-jjodsb.jpg?1427204106" title="ESPN Chalk college basketball betting">
</div>
</a>
  <div>
    <a href="/events/espn-chalk-college-basketball-betting">
  <h4 title="ESPN Chalk college basketball betting" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">ESPN Chalk college basketball betting</div></h4>
</a><h4>
    <a href="/users/espn" class="user-name" title="ESPN">ESPN</a>

</h4>

<div class="event-meta">
    <span>
      64,272 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">1 month ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163701] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163701] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

    <li class="bubble event small three-column" data-id="163508" data-position="11" data-status="2" data-type="event" title="Ask The Archbishop ">

  <a href="/events/ask-the-archbishop">
    <div class="event-image-container">
  <img alt="Ask The Archbishop " class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163508/tile_480x360/163508_photo.jpg?1426780913" title="Ask The Archbishop ">
</div>
</a>
  <div>
    <a href="/events/ask-the-archbishop">
  <h4 title="Ask The Archbishop " class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">Ask The Archbishop</div></h4>
</a><h4>
    <a href="/users/the-archdiocese-of-port-of-spain" class="user-name" title="The Archdiocese of Port of Spain">The Archdiocese of Port of Spain</a>

</h4>

<div class="event-meta">
    <span>
      1,177 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">1 month ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163508] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163508] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

      </ul>
      <ul class="event-previews ">
    <li class="bubble event small three-column" data-id="163623" data-position="12" data-status="2" data-type="event" title="Working All Day!!">

  <a href="/events/working-all-day">
    <div class="event-image-container">
  <img alt="Working All Day!!" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163623/tile_480x360/163623_photo.jpg?1427077663" title="Working All Day!!">
</div>
</a>
  <div>
    <a href="/events/working-all-day">
  <h4 title="Working All Day!!" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">Working All Day!!</div></h4>
</a><h4>
    <a href="/users/kermit-and-friends" class="user-name" title="Kermit and Friends">Kermit and Friends</a>

</h4>

<div class="event-meta">
    <span>
      2,638 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">1 month ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163623] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163623] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

    <li class="bubble event small three-column" data-id="163585" data-position="13" data-status="2" data-type="event" title="Date Night">

  <a href="/events/date-night--2">
    <div class="event-image-container">
  <img alt="Date Night" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163585/tile_480x360/img20150319-8635-1gbeczx.jpg?1426834478" title="Date Night">
</div>
</a>
  <div>
    <a href="/events/date-night--2">
  <h4 title="Date Night" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">Date Night</div></h4>
</a><h4>
    <a href="/users/kermit-and-friends" class="user-name" title="Kermit and Friends">Kermit and Friends</a>

</h4>

<div class="event-meta">
    <span>
      3,483 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">1 month ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163585] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163585] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

    <li class="bubble event small three-column" data-id="163590" data-position="14" data-status="2" data-type="event" title="ESPN NBA Live Chat Episode 114">

  <a href="/events/espn-nba-live-chat-episode-114">
    <div class="event-image-container">
  <img alt="ESPN NBA Live Chat Episode 114" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163590/tile_480x360/img20150320-8746-y01jkz.jpg?1426860004" title="ESPN NBA Live Chat Episode 114">
</div>
</a>
  <div>
    <a href="/events/espn-nba-live-chat-episode-114">
  <h4 title="ESPN NBA Live Chat Episode 114" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">ESPN NBA Live Chat Episode 114</div></h4>
</a><h4>
    <a href="/users/truehooptv--2" class="user-name" title="@TrueHoopTV">@TrueHoopTV</a>

</h4>

<div class="event-meta">
    <span>
      257,406 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">1 month ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163590] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163590] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

      </ul>
      <ul class="event-previews ">
    <li class="bubble event small three-column" data-id="161862" data-position="15" data-status="2" data-type="event" title="Founder Institute Global Demo Day I">

  <a href="/events/founder-institute-global-demo-day-i">
    <div class="event-image-container">
  <img alt="Founder Institute Global Demo Day I" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/161862/tile_480x360/img20150221-26754-1f34xst.jpg?1424564067" title="Founder Institute Global Demo Day I">
</div>
</a>
  <div>
    <a href="/events/founder-institute-global-demo-day-i">
  <h4 title="Founder Institute Global Demo Day I" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">Founder Institute Global Demo Day I</div></h4>
</a><h4>
    <a href="/users/founder-institute" class="user-name" title="Founder Institute">Founder Institute</a>

</h4>

<div class="event-meta">
    <span>
      5,440 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">1 month ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=161862] .event-image').bind('load', function() {
      $('.bubble.event[data-id=161862] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

    <li class="bubble event small three-column" data-id="163530" data-position="16" data-status="2" data-type="event" title="The Gold Patrol: Jodi Ghost Town &amp; more!">

  <a href="/events/the-gold-patrol-jodi-ghost-town-more">
    <div class="event-image-container">
  <img alt="The Gold Patrol: Jodi Ghost Town &amp; more!" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163530/tile_480x360/img20150318-14730-1dkqrrv.jpg?1426724569" title="The Gold Patrol: Jodi Ghost Town &amp; more!">
</div>
</a>
  <div>
    <a href="/events/the-gold-patrol-jodi-ghost-town-more">
  <h4 title="The Gold Patrol: Jodi Ghost Town &amp; more!" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">The Gold Patrol: Jodi Ghost Town &amp; more!</div></h4>
</a><h4>
    <a href="/users/the-gold-patrol" class="user-name" title="THE GOLD PATROL™ with Jeff Gold">THE GOLD PATROL™ with Jeff Gold</a>

</h4>

<div class="event-meta">
    <span>
      7,090 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">1 month ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163530] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163530] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

    <li class="bubble event small three-column" data-id="163487" data-position="17" data-status="2" data-type="event" title="Very Sad That Jonah Left">

  <a href="/events/very-sad-that-jonah-left">
    <div class="event-image-container">
  <img alt="Very Sad That Jonah Left" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163487/tile_480x360/img20150317-10916-1ihmboz.jpg?1426644227" title="Very Sad That Jonah Left">
</div>
</a>
  <div>
    <a href="/events/very-sad-that-jonah-left">
  <h4 title="Very Sad That Jonah Left" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;">Very Sad That Jonah Left</div></h4>
</a><h4>
    <a href="/users/kermit-and-friends" class="user-name" title="Kermit and Friends">Kermit and Friends</a>

</h4>

<div class="event-meta">
    <span>
      3,615 views
    </span>
    <i class="bullet-icon"></i>
    <span class="start-date">1 month ago</span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163487] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163487] .event-name').ellipsis();
    });
  </script>
  <span class="hide_from_profile btn-gray"></span>
</li>

      </ul>

<script type="text/javascript">
  Time.localizeDOM('[data-subsection=trending]');
</script>


  <div class="center">
      <input type="button" class="show-more" data-page="1" data-total-pages="2" value="Show more">
  </div>
</div>
</div></div>
<div class="upcoming-events pull-right">
    <h2>即将开始</h2>
    <div class="upnext">
        <?php
        if($my_advance) {
            echo '<ul>';
            foreach($my_advance as $k=>$v) {
        ?>
        <li class="section event_preview" data-id="<?php echo $v['rid'];?>">

            <a href="/events/<?php echo $v['rid'];?>"><img alt="<?php echo $v['name'];?>" class="side-bar-event-preview-images" src="http://s3.amazonaws.com/spreecast-production/events/165131/tile_480x360/165131_photo.jpg?1430880037"></a>

            <h4><a href="/events/<?php echo $v['rid'];?>" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;"><?php echo $v['name'];?></div></a></h4>

            <h5><a href="/users/live/<?php echo $v['rid'];?>">立刻直播</a></h5>

            <h5 class="start-date"><?php echo date("m-d H:i ", $v['start_time']);?> </h5>

            <script type="text/javascript">
                $('.event_preview[data-id=<?php echo $v['rid'];?>] .side-bar-event-preview-images').bind('load', function() {
                    $('.event_preview[data-id=165131] .event-name').ellipsis();
                });
            </script>

        </li>
        <?php
            }
            echo '</ul>';
        }else {
        ?>
        <div class="placeholder">
            当你发布直播预告的时候就会在这儿显示.
        </div>
        <?php
        }
        ?>
    </div>
    <h2>我的订阅</h2>
    <div class="rsvps">
        <?php
        if($my_rsvps) {
            echo '<ul>';
        foreach($my_rsvps as $k=>$v) {
        ?>
        <li class="section event_preview" data-id="<?php echo $v['rid'];?>">

            <a href="/events/<?php echo $v['rid'];?>"><img alt="<?php echo $v['name'];?>" class="side-bar-event-preview-images" src="http://s3.amazonaws.com/spreecast-production/events/165131/tile_480x360/165131_photo.jpg?1430880037"></a>

            <h4><a href="/events/<?php echo $v['rid'];?>" class="event-name"><div style="margin: 0px; padding: 0px; border: 0px;"><?php echo $v['name'];?></div></a></h4>

            <h5>11 RSVPs</h5>

            <h5 class="start-date"><?php echo date("Y-m-d H:i:s", $v['start_time']);?></h5>



            <script type="text/javascript">
                $('.event_preview[data-id=165131] .side-bar-event-preview-images').bind('load', function() {
                    $('.event_preview[data-id=165131] .event-name').ellipsis();
                });
            </script>

        </li>
        <?php
            }
            echo '</ul>';
        }else {
        ?>
        <div class="placeholder">
            现在还没有订阅.
        </div>
        <?php
        }
        ?>
    </div>
  <script type="text/javascript">
    Time.localizeDOM('.upcoming-events');
  </script>
</div>

<script type="text/javascript">
  $(document).ready(function() {
    spree.profile.selectAction("attended");
  });
</script>
</section>

  <section class="info-section" data-tab="channels">
</section>  <section class="info-section" data-tab="followers">
</section>  <section class="info-section" data-tab="following">
</section>  <section class="info-section" data-tab="friends">
</section>  <section class="info-section" data-tab="clips">
</section><script type="text/javascript">
  $(document).on('spree:init', function () {
    var profile = new SpreeProfile(spree.profile, "spreecasts");
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
              <a class="menu-option" href="http://we.labake.cn/?/topic/square/hot" target="_self">帮助</a>
            </li>
            <li>
              <a class="menu-option" id="header-signout">退出登录</a>
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
    <h5 class="center">你还没有新的好友请求.</h5>
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

<script id="hb-modal-demo-contact-footer" type="text/x-handlebars-template">
  <section class="modal-action pull-right">
    {{{ modal_footer_submit "Submit" }}}
  </section>
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
  <form accept-charset="UTF-8" action="/users/chrisgreen" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="/frwWBywzK6A4xezGqPvaPKXJO5sTfCZNQ8RDFiEWbc=" /></div>
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
  <form accept-charset="UTF-8" action="/users" class="new_user" client-validation="true" data-remote="true" id="new_user" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="/frwWBywzK6A4xezGqPvaPKXJO5sTfCZNQ8RDFiEWbc=" /></div>
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
  <form accept-charset="UTF-8" action="/users/reset_password" class="new_user" client-validation="true" data-remote="true" id="reset-password" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="/frwWBywzK6A4xezGqPvaPKXJO5sTfCZNQ8RDFiEWbc=" /></div>
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

    <form accept-charset="UTF-8" action="/users/sign_in" class="new_user" data-remote="true" id="new_user" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="/frwWBywzK6A4xezGqPvaPKXJO5sTfCZNQ8RDFiEWbc=" /></div>
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
