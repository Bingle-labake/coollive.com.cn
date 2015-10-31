
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
  // Google Analytics
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-23855332-1']);
  _gaq.push(['_trackPageview']);

  // normally triggered by optimizely loading callback
  window.deferLoad.register('googleanalytics', null, function() {
    var url = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    if (!spree.bucket_manager.serviceEnabled('optimizely')) {
      $.getScript(url);
    }
  });

  // Chartbeat
  var _sf_async_config = { uid:25567, domain:'www.spreecast.com' };
  if (_sf_async_config.domain != 'localhost') {
    window._sf_endpt=(new Date()).getTime();
    window.deferLoad.register('chartbeat', (("https:" == document.location.protocol) ? "https://a248.e.akamai.net/chartbeat.download.akamai.com/102508/" : "http://static.chartbeat.com/") + "js/chartbeat.js", null, null);
  }

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
<meta content="DlInRIT7Gxbb7O1aboU76IVTXoD1/++YauOQ4nCAP6g=" name="csrf-token" />
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

    var digest_to_parse = "eyJ1c2VyX2RhdGEiOnsiZW52IjoicHJvZHVjdGlvbiIsImV2ZW50IjpmYWxzZSwiaXNfZW1iZWQiOmZhbHNlLCJzY21fZW52IjoicHJvZHVjdGlvbiIsInVzZXIiOnsiYWJvdXRfbWUiOiIiLCJmaXJzdF9uYW1lIjoibGFiYWtlIiwiaGFzX2JlZW5fYXV0aGVudGljYXRlZCI6dHJ1ZSwibGFzdF9uYW1lIjpudWxsLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6ImxhYmFrZSIsImFsdCI6OTAwNTQzLCJhZG1pbiI6ZmFsc2UsImNvbnRlbnRfbW9kIjpmYWxzZSwicHJvZmlsZV9waG90b190aHVtYl91cmwiOiIvcHJvZmlsZV9waG90b3MvdGlsZV8zMHgzMC9ub3Byb2ZpbGUucG5nIiwiaXNfZmIiOmZhbHNlLCJwcHZfYXBwcm92ZWQiOmZhbHNlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbXSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJCYXNpYyIsImNhbl9jcmVhdGVfc3ByZWVjYXN0IjpmYWxzZSwiYWxsb3dfZnJpZW5kX3JlcXVlc3RzIjp0cnVlLCJpc19jb25uZWN0ZWQiOnRydWUsInZjYXQiOm51bGx9LCJyZWNvbW1lbmRlZF91c2VycyI6W3siaWQiOjkxNTY0NiwiY2FjaGVkX3NsdWciOiJrZXJtaXQtYW5kLWZyaWVuZHMiLCJuYW1lIjoiS2VybWl0IGFuZCBGcmllbmRzIiwicGhvdG8iOiIvL3MzLmFtYXpvbmF3cy5jb20vc3ByZWVjYXN0LXBob3Rvcy9wcm9kdWN0aW9uL3VzZXJzLzkxNTY0Ni90aWxlXzEwMHgxMDAvOTE1NjQ2X3Bob3RvLmpwZz8xNDI0NDM4MTAzIn0seyJpZCI6NDE0ODU2LCJjYWNoZWRfc2x1ZyI6InRydWVob29wdHYtLTIiLCJuYW1lIjoiQFRydWVIb29wVFYiLCJwaG90byI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvNDE0ODU2L3RpbGVfMTAweDEwMC80MTQ4NTZfcGhvdG8uanBnPzEzNTU4Njg0MTUifSx7ImlkIjozNTUyOTQsImNhY2hlZF9zbHVnIjoidGhlLWJsYWNrLWd1eS13aG8tdGlwcyIsIm5hbWUiOiJUaGUgQmxhY2sgR3V5IFdobyBUaXBzIiwicGhvdG8iOiIvL3MzLmFtYXpvbmF3cy5jb20vc3ByZWVjYXN0LXBob3Rvcy9wcm9kdWN0aW9uL3VzZXJzLzM1NTI5NC90aWxlXzEwMHgxMDAvMzU1Mjk0X3Bob3RvLmpwZz8xMzUyMzM2ODEzIn0seyJpZCI6NDAzNDkxLCJjYWNoZWRfc2x1ZyI6ImVzcG4iLCJuYW1lIjoiRVNQTiIsInBob3RvIjoiLy9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1waG90b3MvcHJvZHVjdGlvbi91c2Vycy80MDM0OTEvdGlsZV8xMDB4MTAwLzQwMzQ5MV9waG90by5qcGc/MTM3MDk2NDUxOSJ9LHsiaWQiOjM0MjEwNCwiY2FjaGVkX3NsdWciOiJjaHJpc2dyZWVuIiwibmFtZSI6IkNocmlzR3JlZW4iLCJwaG90byI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvMzQyMTA0L3RpbGVfMTAweDEwMC8zNDIxMDRfcGhvdG8uanBnPzEzNDkzMjM0OTQifSx7ImlkIjo1MTkzNzUsImNhY2hlZF9zbHVnIjoidGhlLWdvbGQtcGF0cm9sIiwibmFtZSI6IlRIRSBHT0xEIFBBVFJPTFx1MjEyMiB3aXRoIEplZmYgR29sZCIsInBob3RvIjoiLy9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1waG90b3MvcHJvZHVjdGlvbi91c2Vycy81MTkzNzUvdGlsZV8xMDB4MTAwLzUxOTM3NV9waG90by5qcGc/MTQyMzY5MzExOCJ9XX19";
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
    spree.mixpanelPageType = 'popular';
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

  <body class="events_index ">
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



          <div id="site-channels" data-user-channel="1cbddd43349c30c27847b0c5d7491d4d" data-user-channel-last-message-id="0" data-everyone-channel="3bf5b67abf2ae25d010cc3fb7c4972c2" data-everyone-channel-last-message-id="0"></div>
      <!-- AEB_EVENT_CHANNELS_REPLACE -->
      <div id="user-cache-elements-replacement" data-profile="eyJ1c2VyX2lkIjoibGFiYWtlIiwibmFtZSI6ImxhYmFrZSIsImVtYWlsIjoiMTY0NTU5NjUzQHFxLmNvbSIsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJzM19pZCI6OTAwNTQzLCJpc19mYiI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiL3Byb2ZpbGVfcGhvdG9zL3RpbGVfMzB4MzAvbm9wcm9maWxlLnBuZyIsInByb2ZpbGVfcGhvdG9fbWVkaXVtX3VybCI6Ii9wcm9maWxlX3Bob3Rvcy90aWxlXzEwMHgxMDAvbm9wcm9maWxlLnBuZyIsImNyZWF0ZWRfYXQiOjE0MTM4NjE5MDUwMDAsImludml0YXRpb25fY291bnQiOjAsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjp0cnVlLCJhdXRoZW50aWNhdGlvbiI6ImVtYWlsIiwicHJlc2VuY2VfZW5hYmxlZCI6dHJ1ZSwiZm9sbG93aW5nX2V2ZW50cyI6W10sImlzX2xvY2tlZCI6dHJ1ZX0=" data-buddy-list="W10=" data-friend-requests="W10=" data-friend-accepts="W10=" data-following="eyJmb2xsb3dpbmciOlszNDIxMDQsMzQ4ODcxLDM1NTI5NCw0MDM0OTEsNDE0ODU2LDUyMTAyN119"></div>
      <div id="presence-replacement" data-online="e30=" data-idle="W10="></div>
      <div id="site-notification-replacement" data-current="e30="></div>
      <div id="ip-address-replacement" data-ip-address="60.194.194.0"></div>
      <div id="firebase-token-replacement" data-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2IjowLCJkIjp7InNpbXVsYXRvciI6ZmFsc2UsInNwcmVla2V5IjoibGk2YlNNSWYyeUZVcHRXVCJ9LCJpYXQiOjE0MjY5NDc0NjF9.CiWtq8tJdW7fLmGnOc04MedpEBOZxeoi5cKukQGq-7E"></div>

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


        <div class="subhead">
  <div class="links">
    <h4>
      <a href="/events?upcoming_all=all" class="upcoming-all">Upcoming</a>
      <span class="separator">|</span>
      <a href="/events?featured=all" class="featured-all">Trending</a>
    </h4>
  </div>
</div>


  <script type="text/javascript">
    $(document).ready(function () {
      $('.subhead .links a[href="/events?featured=all"]').addClass('unlink').removeAttr('href');
      Time.localizeDOM('.section');
    });
  </script>

<section class="info-section">
  <div class="full">
        <h2 id="upcoming-featured-header">Trending</h2>
      <div class="section clearfix">
      
      <ul class='event-previews '>
    <li class="bubble event small four-column" data-id="163590" data-position="0" data-status="2" data-type="event" title="ESPN NBA Live Chat Episode 114">

  <a href="/events/espn-nba-live-chat-episode-114">
    <div class="event-image-container">
  <img alt="ESPN NBA Live Chat Episode 114" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163590/tile_480x360/img20150320-8746-y01jkz.jpg?1426860004" title="ESPN NBA Live Chat Episode 114" />
</div>
</a>
  <div>
    <a href="/events/espn-nba-live-chat-episode-114">
  <h4 title="ESPN NBA Live Chat Episode 114" class="event-name">ESPN NBA Live Chat Episode 114</h4>
</a><h4>
    <a href="/users/truehooptv--2" class="user-name" title="@TrueHoopTV">@TrueHoopTV</a>

</h4>

<div class="event-meta">
    <span>
      161,258 views
    </span>
    <i class='bullet-icon'></i>
    <span class='start-date invisible'>
      1426879000335
    </span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163590] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163590] .event-name').ellipsis();
    });
  </script>
  <span class='hide_from_profile btn-gray'></span>
</li>

    <li class="bubble event small four-column" data-id="163585" data-position="1" data-status="2" data-type="event" title="Date Night">

  <a href="/events/date-night--2">
    <div class="event-image-container">
  <img alt="Date Night" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163585/tile_480x360/img20150319-8635-1gbeczx.jpg?1426834478" title="Date Night" />
</div>
</a>
  <div>
    <a href="/events/date-night--2">
  <h4 title="Date Night" class="event-name">Date Night</h4>
</a><h4>
    <a href="/users/kermit-and-friends" class="user-name" title="Kermit and Friends">Kermit and Friends</a>

</h4>

<div class="event-meta">
    <span>
      2,479 views
    </span>
    <i class='bullet-icon'></i>
    <span class='start-date invisible'>
      1426900177799
    </span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163585] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163585] .event-name').ellipsis();
    });
  </script>
  <span class='hide_from_profile btn-gray'></span>
</li>

    <li class="bubble event small four-column" data-id="163419" data-position="2" data-status="2" data-type="event" title="NFL Nation TV - Episode 48">

  <a href="/events/nfl-nation-tv-episode-48">
    <div class="event-image-container">
  <img alt="NFL Nation TV - Episode 48" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163419/tile_480x360/img20150316-29108-1ic02si.jpg?1426539469" title="NFL Nation TV - Episode 48" />
</div>
</a>
  <div>
    <a href="/events/nfl-nation-tv-episode-48">
  <h4 title="NFL Nation TV - Episode 48" class="event-name">NFL Nation TV - Episode 48</h4>
</a><h4>
    <a href="/users/espn" class="user-name" title="ESPN">ESPN</a>

</h4>

<div class="event-meta">
    <span>
      1,356,790 views
    </span>
    <i class='bullet-icon'></i>
    <span class='start-date invisible'>
      1426616568493
    </span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163419] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163419] .event-name').ellipsis();
    });
  </script>
  <span class='hide_from_profile btn-gray'></span>
</li>

    <li class="bubble event small four-column" data-id="163564" data-position="3" data-status="2" data-type="event" title="ScanPower Radio - 03/20/15">

  <a href="/events/scanpower-radio-03-20-15">
    <div class="event-image-container">
  <img alt="ScanPower Radio - 03/20/15" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163564/tile_480x360/img20150319-9341-7rd0sq.jpg?1426800063" title="ScanPower Radio - 03/20/15" />
</div>
</a>
  <div>
    <a href="/events/scanpower-radio-03-20-15">
  <h4 title="ScanPower Radio - 03/20/15" class="event-name">ScanPower Radio - 03/20/15</h4>
</a><h4>
    <a href="/users/chrisgreen" class="user-name" title="ChrisGreen">ChrisGreen</a>

</h4>

<div class="event-meta">
    <span>
      496 views
    </span>
    <i class='bullet-icon'></i>
    <span class='start-date invisible'>
      1426878212667
    </span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163564] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163564] .event-name').ellipsis();
    });
  </script>
  <span class='hide_from_profile btn-gray'></span>
</li>

      </ul>
      <ul class='event-previews '>
    <li class="bubble event small four-column" data-id="163530" data-position="4" data-status="2" data-type="event" title="The Gold Patrol: Jodi Ghost Town &amp; more!">

  <a href="/events/the-gold-patrol-jodi-ghost-town-more">
    <div class="event-image-container">
  <img alt="The Gold Patrol: Jodi Ghost Town &amp; more!" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163530/tile_480x360/img20150318-14730-1dkqrrv.jpg?1426724569" title="The Gold Patrol: Jodi Ghost Town &amp; more!" />
</div>
</a>
  <div>
    <a href="/events/the-gold-patrol-jodi-ghost-town-more">
  <h4 title="The Gold Patrol: Jodi Ghost Town &amp; more!" class="event-name">The Gold Patrol: Jodi Ghost Town &amp; more!</h4>
</a><h4>
    <a href="/users/the-gold-patrol" class="user-name" title="THE GOLD PATROL™ with Jeff Gold">THE GOLD PATROL™ with Jeff Gold</a>

</h4>

<div class="event-meta">
    <span>
      6,141 views
    </span>
    <i class='bullet-icon'></i>
    <span class='start-date invisible'>
      1426729050766
    </span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163530] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163530] .event-name').ellipsis();
    });
  </script>
  <span class='hide_from_profile btn-gray'></span>
</li>

    <li class="bubble event small four-column" data-id="163600" data-position="5" data-status="2" data-type="event" title="SMH...Daily!">

  <a href="/events/smh-daily--2">
    <div class="event-image-container">
  <img alt="SMH...Daily!" class="event-image" src="http://s3.amazonaws.com/spreecast-production/channels/295457/tile_480x360/295457_photo.jpg?1364940315" title="SMH...Daily!" />
</div>
</a>
  <div>
    <a href="/events/smh-daily--2">
  <h4 title="SMH...Daily!" class="event-name">SMH...Daily!</h4>
</a><h4>
    <a href="/users/jon--42" class="user-name" title="Jon Olson">Jon Olson</a>

</h4>

<div class="event-meta">
    <span>
      2,132 views
    </span>
    <i class='bullet-icon'></i>
    <span class='start-date invisible'>
      1426885364768
    </span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163600] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163600] .event-name').ellipsis();
    });
  </script>
  <span class='hide_from_profile btn-gray'></span>
</li>

    <li class="bubble event small four-column" data-id="161862" data-position="6" data-status="2" data-type="event" title="Founder Institute Global Demo Day I">

  <a href="/events/founder-institute-global-demo-day-i">
    <div class="event-image-container">
  <img alt="Founder Institute Global Demo Day I" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/161862/tile_480x360/img20150221-26754-1f34xst.jpg?1424564067" title="Founder Institute Global Demo Day I" />
</div>
</a>
  <div>
    <a href="/events/founder-institute-global-demo-day-i">
  <h4 title="Founder Institute Global Demo Day I" class="event-name">Founder Institute Global Demo Day I</h4>
</a><h4>
    <a href="/users/founder-institute" class="user-name" title="Founder Institute">Founder Institute</a>

</h4>

<div class="event-meta">
    <span>
      4,100 views
    </span>
    <i class='bullet-icon'></i>
    <span class='start-date invisible'>
      1426818566687
    </span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=161862] .event-image').bind('load', function() {
      $('.bubble.event[data-id=161862] .event-name').ellipsis();
    });
  </script>
  <span class='hide_from_profile btn-gray'></span>
</li>

    <li class="bubble event small four-column" data-id="163438" data-position="7" data-status="2" data-type="event" title="ESPN Chalk bracket picks">

  <a href="/events/espn-chalk-bracket-picks">
    <div class="event-image-container">
  <img alt="ESPN Chalk bracket picks" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163438/tile_480x360/img20150317-30876-r07313.jpg?1426596182" title="ESPN Chalk bracket picks" />
</div>
</a>
  <div>
    <a href="/events/espn-chalk-bracket-picks">
  <h4 title="ESPN Chalk bracket picks" class="event-name">ESPN Chalk bracket picks</h4>
</a><h4>
    <a href="/users/espn" class="user-name" title="ESPN">ESPN</a>

</h4>

<div class="event-meta">
    <span>
      368,225 views
    </span>
    <i class='bullet-icon'></i>
    <span class='start-date invisible'>
      1426619721082
    </span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163438] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163438] .event-name').ellipsis();
    });
  </script>
  <span class='hide_from_profile btn-gray'></span>
</li>

      </ul>
      <ul class='event-previews '>
    <li class="bubble event small four-column" data-id="161167" data-position="8" data-status="2" data-type="event" title="7 Ways To Flourish As A Teacher">


  <a href="/events/n7-ways-to-flourish-as-a-teacher">
    <div class="event-image-container">
  <img alt="7 Ways To Flourish As A Teacher" class="event-image" src="//s3.amazonaws.com/spreecast-photos/production/users/600504/tile_480x360/600504_photo.jpg?1373406908" title="7 Ways To Flourish As A Teacher" />
</div>
</a>
  <div>
    <a href="/events/n7-ways-to-flourish-as-a-teacher">
  <h4 title="7 Ways To Flourish As A Teacher" class="event-name">7 Ways To Flourish As A Teacher</h4>
</a><h4>
    <a href="/users/jen-louden" class="user-name" title="Jen Louden">Jen Louden</a>

</h4>

<div class="event-meta">
    <span>
      1,989 views
    </span>
    <i class='bullet-icon'></i>
    <span class='start-date invisible'>
      1426814891807
    </span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=161167] .event-image').bind('load', function() {
      $('.bubble.event[data-id=161167] .event-name').ellipsis();
    });
  </script>
  <span class='hide_from_profile btn-gray'></span>
</li>

    <li class="bubble event small four-column" data-id="163494" data-position="9" data-status="2" data-type="event" title="ESPN Tip Off Live: NCAA Tourney Preview">

  <a href="/events/espn-tip-off-live-ncaa-tourney-preview">
    <div class="event-image-container">
  <img alt="ESPN Tip Off Live: NCAA Tourney Preview" class="event-image" src="//s3.amazonaws.com/spreecast-photos/production/users/473084/tile_480x360/473084_photo.jpg?1418763981" title="ESPN Tip Off Live: NCAA Tourney Preview" />
</div>
</a>
  <div>
    <a href="/events/espn-tip-off-live-ncaa-tourney-preview">
  <h4 title="ESPN Tip Off Live: NCAA Tourney Preview" class="event-name">ESPN Tip Off Live: NCAA Tourney Preview</h4>
</a><h4>
    <a href="/users/espn-college-basketball--2" class="user-name" title="ESPN College Basketball">ESPN College Basketball</a>

</h4>

<div class="event-meta">
    <span>
      10,823 views
    </span>
    <i class='bullet-icon'></i>
    <span class='start-date invisible'>
      1426705438734
    </span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163494] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163494] .event-name').ellipsis();
    });
  </script>
  <span class='hide_from_profile btn-gray'></span>
</li>

    <li class="bubble event small four-column" data-id="163340" data-position="10" data-status="2" data-type="event" title="Beer &amp; Bastards Ep. 8">

  <a href="/events/beer-bastards-ep-8">
    <div class="event-image-container">
  <img alt="Beer &amp; Bastards Ep. 8" class="event-image" src="http://s3.amazonaws.com/spreecast-production/events/163340/tile_480x360/img20150314-29052-16ngvc3.jpg?1426385342" title="Beer &amp; Bastards Ep. 8" />
</div>
</a>
  <div>
    <a href="/events/beer-bastards-ep-8">
  <h4 title="Beer &amp; Bastards Ep. 8" class="event-name">Beer &amp; Bastards Ep. 8</h4>
</a><h4>
    <a href="/users/liberty-me" class="user-name" title="Liberty.me">Liberty.me</a>

</h4>

<div class="event-meta">
    <span>
      1,417 views
    </span>
    <i class='bullet-icon'></i>
    <span class='start-date invisible'>
      1426724926495
    </span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163340] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163340] .event-name').ellipsis();
    });
  </script>
  <span class='hide_from_profile btn-gray'></span>
</li>

    <li class="bubble event small four-column" data-id="163324" data-position="11" data-status="2" data-type="event" title="Seasonal Sourcing w/ Lance Wolf">

  <a href="/events/seasonal-sourcing-w-lance-wolf">
    <div class="event-image-container">
  <img alt="Seasonal Sourcing w/ Lance Wolf" class="event-image" src="http://s3.amazonaws.com/spreecast-production/channels/671032/tile_480x360/671032_photo.jpg?1389101759" title="Seasonal Sourcing w/ Lance Wolf" />
</div>
</a>
  <div>
    <a href="/events/seasonal-sourcing-w-lance-wolf">
  <h4 title="Seasonal Sourcing w/ Lance Wolf" class="event-name">Seasonal Sourcing w/ Lance Wolf</h4>
</a><h4>
    <a href="/users/barrington--3" class="user-name" title="Barrington McIntosh">Barrington McIntosh</a>

</h4>

<div class="event-meta">
    <span>
      1,153 views
    </span>
    <i class='bullet-icon'></i>
    <span class='start-date invisible'>
      1426723397787
    </span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163324] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163324] .event-name').ellipsis();
    });
  </script>
  <span class='hide_from_profile btn-gray'></span>
</li>

      </ul>
      <ul class='event-previews '>
    <li class="bubble event small four-column" data-id="163520" data-position="12" data-status="2" data-type="event" title="TBGWT #DeyWalking with Kriss">

  <a href="/events/tbgwt-deywalking-with-kriss">
    <div class="event-image-container">
  <img alt="TBGWT #DeyWalking with Kriss" class="event-image" src="//s3.amazonaws.com/spreecast-photos/production/users/355294/tile_480x360/355294_photo.jpg?1352336813" title="TBGWT #DeyWalking with Kriss" />
</div>
</a>
  <div>
    <a href="/events/tbgwt-deywalking-with-kriss">
  <h4 title="TBGWT #DeyWalking with Kriss" class="event-name">TBGWT #DeyWalking with Kriss</h4>
</a><h4>
    <a href="/users/the-black-guy-who-tips" class="user-name" title="The Black Guy Who Tips">The Black Guy Who Tips</a>

</h4>

<div class="event-meta">
    <span>
      1,636 views
    </span>
    <i class='bullet-icon'></i>
    <span class='start-date invisible'>
      1426729069341
    </span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163520] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163520] .event-name').ellipsis();
    });
  </script>
  <span class='hide_from_profile btn-gray'></span>
</li>

    <li class="bubble event small four-column" data-id="163408" data-position="13" data-status="2" data-type="event" title="Fed rate increase: ‘Patient’ still?">

  <a href="/events/fed-rate-increase-patient-still">
    <div class="event-image-container">
  <img alt="Fed rate increase: ‘Patient’ still?" class="event-image" src="//s3.amazonaws.com/spreecast-photos/production/users/319720/tile_480x360/319720_photo.jpg?1392837228" title="Fed rate increase: ‘Patient’ still?" />
</div>
</a>
  <div>
    <a href="/events/fed-rate-increase-patient-still">
  <h4 title="Fed rate increase: ‘Patient’ still?" class="event-name">Fed rate increase: ‘Patient’ still?</h4>
</a><h4>
    <a href="/users/wall-street-journal" class="user-name" title="Wall Street Journal">Wall Street Journal</a>

</h4>

<div class="event-meta">
    <span>
      5,363 views
    </span>
    <i class='bullet-icon'></i>
    <span class='start-date invisible'>
      1426606967830
    </span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163408] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163408] .event-name').ellipsis();
    });
  </script>
  <span class='hide_from_profile btn-gray'></span>
</li>

    <li class="bubble event small four-column" data-id="163583" data-position="14" data-status="2" data-type="event" title="POSTCAST - Jazz fight off the Lakers ">

  <a href="/events/postcast-jazz-fight-off-the-lakers">
    <div class="event-image-container">
  <img alt="POSTCAST - Jazz fight off the Lakers " class="event-image" src="//s3.amazonaws.com/spreecast-photos/production/users/346278/tile_480x360/346278_photo.jpg?1349976863" title="POSTCAST - Jazz fight off the Lakers " />
</div>
</a>
  <div>
    <a href="/events/postcast-jazz-fight-off-the-lakers">
  <h4 title="POSTCAST - Jazz fight off the Lakers " class="event-name">POSTCAST - Jazz fight off the Lakers</h4>
</a><h4>
    <a href="/users/lockedonsports" class="user-name" title="@Lockedonsports">@Lockedonsports</a>

</h4>

<div class="event-meta">
    <span>
      4,093 views
    </span>
    <i class='bullet-icon'></i>
    <span class='start-date invisible'>
      1426828649522
    </span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163583] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163583] .event-name').ellipsis();
    });
  </script>
  <span class='hide_from_profile btn-gray'></span>
</li>

    <li class="bubble event small four-column" data-id="163382" data-position="15" data-status="2" data-type="event" title="The Evening Jones 03.16.15">

  <a href="/events/the-evening-jones-03-16-15">
    <div class="event-image-container">
  <img alt="The Evening Jones 03.16.15" class="event-image" src="http://s3.amazonaws.com/spreecast-production/channels/349679/tile_480x360/349679_photo.jpg?1350224125" title="The Evening Jones 03.16.15" />
</div>
</a>
  <div>
    <a href="/events/the-evening-jones-03-16-15">
  <h4 title="The Evening Jones 03.16.15" class="event-name">The Evening Jones 03.16.15</h4>
</a><h4>
    <a href="/users/bomani" class="user-name" title="Bomani Jones">Bomani Jones</a>

</h4>

<div class="event-meta">
    <span>
      8,685 views
    </span>
    <i class='bullet-icon'></i>
    <span class='start-date invisible'>
      1426552275161
    </span>
</div>


</div>
  <script type="text/javascript">
    $('.bubble.event[data-id=163382] .event-image').bind('load', function() {
      $('.bubble.event[data-id=163382] .event-name').ellipsis();
    });
  </script>
  <span class='hide_from_profile btn-gray'></span>
</li>

      </ul>

<script type="text/javascript">
  Time.localizeDOM('[data-subsection=trending]');
</script>


    </div>
    <div class="section">
      <div class="pagination"><span class="previous_page disabled"><img alt="Scroll-left" src="https://d35ncmvcdy3liz.cloudfront.net/production/201503192031_faa2c47/images/v2/scroll-left.png" /><p>Previous</p></span> <em class="current">1</em> <a rel="next" href="/events?featured=all&amp;page=2">2</a> <a href="/events?featured=all&amp;page=3">3</a> <a href="/events?featured=all&amp;page=4">4</a> <a href="/events?featured=all&amp;page=5">5</a> <a href="/events?featured=all&amp;page=6">6</a> <a href="/events?featured=all&amp;page=7">7</a> <a href="/events?featured=all&amp;page=8">8</a> <a href="/events?featured=all&amp;page=9">9</a> <a href="/events?featured=all&amp;page=10">10</a> <a href="/events?featured=all&amp;page=11">11</a> <a href="/events?featured=all&amp;page=12">12</a> <a class="next_page" rel="next" href="/events?featured=all&amp;page=2"><p>Next</p><img alt="Scroll-right" src="https://d35ncmvcdy3liz.cloudfront.net/production/201503192031_faa2c47/images/v2/scroll-right.png" /></a></div>
    </div>
  </div>
</section>



    </div>
      </div>
    <footer id="main-footer">
  <div class="footer-inner">
    <section role="site-map">
      <article id="about" class="first">
        <h5>
          About
        </h5>
        <ul>
          <li>
          <a href="http://about.spreecast.com" rel="nofollow">Spreecast</a>
          </li>
          <li>
          <a href="http://about.spreecast.com/jobs" rel="nofollow">Careers</a>
          </li>
          <li>
          <a href="http://about.spreecast.com/our-team" rel="nofollow">Our Team</a>
          </li>
          <li>
          <a href="http://about.spreecast.com/contact" rel="nofollow">Contact</a>
          </li>
        </ul>
      </article>

      <article id="store">
        <h5>
          Store
        </h5>
        <ul>
          <li>
            <a href="/plans" rel="nofollow">Pricing &amp; plans</a>
          </li>
          <li>
          <a href="http://store.spreecast.com/collections/spreecast-t-shirts-and-hoodies" rel="nofollow">Apparel</a>
          </li>
        </ul>
      </article>
      <article id="help">
        <h5>
          Help
        </h5>
        <ul>
          <li>
          <a href="https://spreecast.zendesk.com/hc/en-us" rel="nofollow">Help center</a>
          </li>
          <li>
          <a href="https://spreecast.zendesk.com/hc/en-us/requests/new" rel="nofollow">Submit a help request</a>
          </li>
        </ul>
      </article>
      </section>
      <section role="copyright">
        <article class="copyright">
          © 2014 Spreecast, Inc. All rights reserved.<span class="copyright-divider">|</span><a href="http://about.spreecast.com/privacy" rel="nofollow">Privacy Policy</a> <span class="copyright-divider">|</span><a href="http://about.spreecast.com/terms-of-service" rel="nofollow">Terms of Service</a>
        </article>
      </section>
      <section role="social-footer">
        <article>
          <ul>
            <li class="social-footer-button">
              <a class="blog-icon" title="Blog" target="_blank" href="http://blog.spreecast.com"></a>
            </li>
            <li class="social-footer-button">
              <a class="facebook-icon" title="Facebook" target="_blank" href="https://www.facebook.com/spreecast"></a>
            </li>
            <li class="social-footer-button">
              <a class="twitter-icon" title="Twitter" target="_blank" href="http://twitter.com/spreecast"></a>
            </li>
          </ul>
        </article>
      </section>
      <span data-optimizely-experiment="2">&nbsp;</span>
  </div>
</footer>

    
    
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
  <form accept-charset="UTF-8" action="/events" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="DlInRIT7Gxbb7O1aboU76IVTXoD1/++YauOQ4nCAP6g=" /></div>
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
