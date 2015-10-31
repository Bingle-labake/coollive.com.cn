
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
 
 a.src= 'https://d35ncmvcdy3liz.cloudfront.net/production/201503241600_f809ee0/javascripts/libraries/mixpanel-2.2.min.js';
 
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

    <meta content="video.other" property="og:type" />
    <meta content="Spreecast" property="og:site_name" />
    <meta content="Archbishop Harris candidly shares a personal challenge and how he overcame it. " property="og:description" />
    <meta content="251317644900872" property="fb:app_id" />
    <meta content="Best of Ask The Archbishop " property="og:title" />
    <meta content="http://d1dmw53f30zpgm.cloudfront.net/events/163508/play_640x480/163508_photo.jpg?1426780913" property="og:image" />
    <meta content="http://www.spreecast.com/events/ask-the-archbishop/clips/best-of-ask-the-archbishop.html" property="og:url" />
    <meta content="image/jpeg" property="og:image:type" />
    <meta content="photo" property="twitter:card" />
    <meta content="@spreecast" property="twitter:site" />
    <meta content="Archbishop Harris candidly shares a personal challenge and how he overcame it. " property="twitter:description" />
    <meta content="spreecast://" property="twitter:app:url:iphone" />
    <meta content="Best of Ask The Archbishop " property="twitter:title" />
    <meta content="https://d1dmw53f30zpgm.cloudfront.net/events/163508/play_640x480/163508_photo.jpg?1426780913" property="twitter:image" />
    <meta content="http://www.spreecast.com/events/ask-the-archbishop/clips/best-of-ask-the-archbishop.html" property="twitter:url" />
    <meta content="Spreecast" property="twitter:app:name:iphone" />
    <meta content="505358961" property="twitter:app:id:iphone" />
  <title>
    Best of Ask The Archbishop  - Spreecast
  </title>
  <link href="https://d35ncmvcdy3liz.cloudfront.net/production/201503241600_f809ee0/images/favicon.ico" rel="shortcut icon" type="image/vnd.microsoft.icon" />
  <link href="https://d35ncmvcdy3liz.cloudfront.net/production/201503241600_f809ee0/assets/common.css" media="screen" rel="stylesheet" type="text/css" />
  <link href="https://d35ncmvcdy3liz.cloudfront.net/production/201503241600_f809ee0/assets/events.css" media="screen" rel="stylesheet" type="text/css" />
  <link href="https://d35ncmvcdy3liz.cloudfront.net/production/201503241600_f809ee0/assets/event_show.css" media="screen" rel="stylesheet" type="text/css" />
  
  <meta content="authenticity_token" name="csrf-param" />
<meta content="MTNFY6CeAg95ij2X8BvIIRcdbfz0j3bd8uoqRr7b4Nk=" name="csrf-token" />
  <script src="https://d35ncmvcdy3liz.cloudfront.net/production/201503241600_f809ee0/assets/common.js" type="text/javascript"></script>
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

  <script type="text/javascript" src='https://d35ncmvcdy3liz.cloudfront.net/production/201503241600_f809ee0/javascripts/typedecma/ecmamin.js'></script>
  

  
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

    var digest_to_parse = "eyJ1c2VyX2RhdGEiOnsiZW52IjoicHJvZHVjdGlvbiIsImV2ZW50Ijp7ImFib3V0IjoiRXZlciB3YW50ZWQgdG8gYXNrIHRoZSBBcmNoYmlzaG9wIGEgcXVlc3Rpb24/IEhlcmUncyB5b3VyIGNoYW5jZSFcclxuXHJcblRoYW5rJ3MgdG8gZXZlcnlvbmUgd2hvIHBhcnRpY2lwYXRlZCBpbiBUb2RheSdzIFNwcmVlY2FzdCFcclxuXHJcblN0YXkgdHVuZWQgZm9yIG91ciBuZXh0IExJVkUgY2hhdCBzZXNzaW9uIHdpdGggQXJjaGJpc2hvcCBIYXJyaXMsIGNvbWluZyBzb29uIVxyXG5cclxuIiwiYnJvYWRjYXN0ZXJzX2VuYWJsZWQiOnRydWUsImNvcHJvZHVjYWJsZSI6dHJ1ZSwiZGlzcGxheV9xdWVzdGlvbnMiOjAsImVtYmVkX3NoYXJlX3VybCI6bnVsbCwibmFtZSI6IkFzayBUaGUgQXJjaGJpc2hvcCAiLCJub3Rfc3RhcnRhYmxlX2J5X2NvcHJvZHVjZXJzIjpmYWxzZSwicXVlc3Rpb25zX2VuYWJsZWQiOnRydWUsInZpc2liaWxpdHkiOjAsInN0YXJ0X2F0IjoiMjAxNS0wMy0yNFQxMTowMDowMC0wNTowMCIsInN0YXJ0X2F0X2Vwb2NoIjoxNDI3MjEyODAwMDAwLjAsInRpbWVzIjpbMTQyNzIxMzE0MjE4OSwxNDI3MjE0OTk5NTY5XSwiY2hhbm5lbF9uYW1lIjoiVGhlIEFyY2hkaW9jZXNlIE9mIFBvcnQgT2YgU3BhaW4ncyBDaGFubmVsIiwibm93X2Jyb2FkY2FzdGluZyI6ZmFsc2UsInN0YXR1cyI6MiwibWVkaWFfZmVlZHMiOltdLCJldmVudF9pZCI6MTYzNTA4LCJpbWFnZV91cmwiOiJodHRwOi8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcHJvZHVjdGlvbi9ldmVudHMvMTYzNTA4L3RpbGVfNDgweDM2MC8xNjM1MDhfcGhvdG8uanBnPzE0MjY3ODA5MTMiLCJ0d2l0dGVyIjp7InNlYXJjaCI6bnVsbCwiaW5jbHVkZSI6bnVsbH0sImhvc3QiOnsiYWJvdXRfbWUiOiJUaGUgQ2F0aG9saWMgQ2h1cmNoIHdhcyBpbnRyb2R1Y2VkIHRvIFRyaW5pZGFkIHdpdGggdGhlIGNvbWluZyBvZiBDb2x1bWJ1cyBpbiAxNDk4IGFuZCB0aGUgc3Vic2VxdWVudCBTcGFuaXNoIHNldHRsZW1lbnQgYW5kIGVzdGFibGlzaG1lbnQgb2YgdGhlIFBhcmlzaCBhbmQgQ2h1cmNoIG9mIFN0LiBKb3NlcGggYnkgQW50b25pbyBkZSBCZXJyaW8gaW4gMTU5Mi4gVGhlIENodXJjaCB3YXMgZnVydGhlciBhc3N1cmVkIG9mIGl0cyBjb250aW51aXR5IGFmdGVyIHRoZSBpc2xhbmQgd2FzIGxvc3QgdG8gdGhlIEJyaXRpc2ggYXMgQXJ0aWNsZSBFbGV2ZW4gb2YgdGhlIENhcGl0dWxhdGlvbiBvZiAxNzk3IGd1YXJhbnRlZWQgdGhlIGluaGFiaXRhbnRzLCBtb3N0IG9mIHdob20gd2VyZSBDYXRob2xpYywgZnJlZWRvbSB0byBwcmFjdGljZSB0aGVpciByZWxpZ2lvbi4gVHJpbmlkYWQgd2FzIHRoZW4gdW5kZXIgdGhlIGp1cmlzZGljdGlvbiBvZiB0aGUgRGlvY2VzZSBvZiBHdXlhbmEgYmFzZWQgYXQgU2FuIFRvbWUgZGUgQW5nb3N0dXJhIChWZW5lenVlbGEpIHdoaWNoIHdhcyBlcmVjdGVkIGluIDE3OTAuIFRoZSBpc2xhbmQgd2FzIHByZXZpb3VzbHkgcGFydCBvZiB0aGUgRGlvY2VzZSBvZiBQdWVydG8gUmljbywgZm91bmRlZCBpbiAxNTMyLlxyXG5cclxuT24gMzB0aCBBcHJpbCwgMTg1MCBQb3BlIFBpdXMgSVggdHJhbnNmb3JtZWQgdGhlIFZpY2FyaWF0ZSBpbnRvIHRoZSBBcmNoZGlvY2VzZSBvZiBQb3J0LW9mLVNwYWluIHdpdGgganVyaXNkaWN0aW9uIG92ZXIgU3QuIEx1Y2lhLCBTdC4gVmluY2VudCwgR3JlbmFkYSBhbmQgVG9iYWdvIGFuZCB3aXRoIFJvc2VhdSwgRG9taW5pY2EgYXMgaXRzIHN1ZmZyYWdhbiBzZWUuIEluIDE4NTAsIHRoZSBDYXRob2xpYyBwb3B1bGF0aW9uIG9mIFRyaW5pZGFkIHN0b29kIGF0IDQ0LDAwMCBvdXQgb2YgYSB0b3RhbCBvZiA3MCwwMDAgcGVyc29ucy4gVGhlcmUgd2VyZSBzaXh0ZWVuIHBhcmlzaGVzIHNlcnZlZCBieSB0d2VudHkgcmVzaWRlbnQgcHJpZXN0cywgd2l0aCB0aGlydGVlbiBwcmltYXJ5IHNjaG9vbHMgYWxvbmcgd2l0aCBTdC4gSm9zZXBoXHUyMDE5cyBDb252ZW50LCBQb3J0LW9mLVNwYWluICgxODM2KSBhbmQgU3QuIEdlb3JnZVx1MjAxOXMgQ29sbGVnZSAoMTgzOCkuIFRoZSBDaHVyY2hcdTIwMTlzIG5ldyBzdGF0dXMgd2FzIG9mIGFkZGVkIHNpZ25pZmljYW5jZSBhcyBpdCB3YXMgbWFkZSBtb250aHMgYmVmb3JlIHRoZSBoaWVyYXJjaHkgd2FzIHJlc3RvcmVkIGluIEVuZ2xhbmQgb24gMjR0aCBTZXB0ZW1iZXIgMTg1MC4gSW5kZWVkIHRoZSBDaHVyY2ggb2YgUG9ydC1vZi1TcGFpbiBsYXlzIGNsYWltIHRvIGJlIG9uZSBvZiB0aGUgb2xkZXN0IGluIHRoZSBFbmdsaXNoLXNwZWFraW5nIHdvcmxkLiIsImZpcnN0X25hbWUiOiJUaGUgQXJjaGRpb2Nlc2Ugb2YgUG9ydCBvZiBTcGFpbiAiLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjp0cnVlLCJsYXN0X25hbWUiOiIiLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6InRoZS1hcmNoZGlvY2VzZS1vZi1wb3J0LW9mLXNwYWluIiwiYWx0Ijo5NjQ1MzYsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvOTY0NTM2L3RpbGVfMzB4MzAvOTY0NTM2X3Bob3RvLmpwZz8xNDI2NjA0NDkwIiwiaXNfZmIiOmZhbHNlLCJwcHZfYXBwcm92ZWQiOmZhbHNlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbXSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJCcm9uemUiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6dHJ1ZSwiYWxsb3dfZnJpZW5kX3JlcXVlc3RzIjp0cnVlLCJ2Y2F0IjpudWxsfSwibnVtX3ZpZXdlcnMiOjIyLCJmcmllbmRseV9pZCI6ImFzay10aGUtYXJjaGJpc2hvcCIsImV2ZW50X2VuYWJsZWQiOnRydWUsInZpZXdzIjo3NjQsInN0aXRjaF91cmxzIjp7ImFyY2hpdmVfaGxzIjp7ImhpZ2giOnsiaDI2NCI6eyJhYWMiOiJodHRwOi8vZDE0b21lYmRuZ2RmdWEuY2xvdWRmcm9udC5uZXQvcHJvZHVjdGlvbi8xNjM1MDgvYXZwL2FyY2hpdmVfMjAxNTAzMjRfYzRhZTU0NzFhODA2L2FyY2hpdmVfaGlnaC5tM3U4In19LCJtZWRpdW0iOnsiaDI2NCI6eyJhYWMiOiJodHRwOi8vc3ByZWVjYXN0LWFyY2hpdmVzLnMzLmFtYXpvbmF3cy5jb20vcHJvZHVjdGlvbi8xNjM1MDgvYXZwL2xpdmVfMDAxL2FyY2hpdmVfbWVkaXVtLm0zdTgifX0sImF1ZGlvIjp7ImgyNjQiOnsiYWFjIjoiaHR0cDovL2QxNG9tZWJkbmdkZnVhLmNsb3VkZnJvbnQubmV0L3Byb2R1Y3Rpb24vMTYzNTA4L2F2cC9hcmNoaXZlXzIwMTUwMzI0X2M0YWU1NDcxYTgwNi9hcmNoaXZlX2F1ZGlvLm0zdTgifX19LCJhcmNoaXZlX21vdiI6eyJoaWdoIjp7ImgyNjQiOnsiYWFjIjoiaHR0cDovL2QxNG9tZWJkbmdkZnVhLmNsb3VkZnJvbnQubmV0L3Byb2R1Y3Rpb24vMTYzNTA4L2F2cC9hcmNoaXZlXzIwMTUwMzI0X2M0YWU1NDcxYTgwNi9oaWdoLm1vdiJ9fSwiYXVkaW8iOnsiaDI2NCI6eyJhYWMiOiJodHRwOi8vZDE0b21lYmRuZ2RmdWEuY2xvdWRmcm9udC5uZXQvcHJvZHVjdGlvbi8xNjM1MDgvYXZwL2FyY2hpdmVfMjAxNTAzMjRfYzRhZTU0NzFhODA2L2F1ZGlvLm1vdiJ9fX0sImFyY2hpdmVfbXA0Ijp7ImhpZ2giOnsiaDI2NCI6eyJhYWMiOiJodHRwOi8vZDE0b21lYmRuZ2RmdWEuY2xvdWRmcm9udC5uZXQvcHJvZHVjdGlvbi8xNjM1MDgvYXZwL2FyY2hpdmVfMjAxNTAzMjRfYzRhZTU0NzFhODA2L2hpZ2gubXA0In19LCJtZWRpdW0iOnsiaDI2NCI6eyJhYWMiOiJodHRwOi8vZDE0b21lYmRuZ2RmdWEuY2xvdWRmcm9udC5uZXQvcHJvZHVjdGlvbi8xNjM1MDgvYXZwL2FyY2hpdmVfMjAxNTAzMjRfZTdhNzNlMzNiNGExL21lZGl1bS5tcDQifX0sImxvdyI6eyJoMjY0Ijp7ImFhYyI6Imh0dHA6Ly9kMTRvbWViZG5nZGZ1YS5jbG91ZGZyb250Lm5ldC9wcm9kdWN0aW9uLzE2MzUwOC9hdnAvYXJjaGl2ZV8yMDE1MDMyNF9jNGFlNTQ3MWE4MDYvbG93Lm1wNCJ9fSwiYXVkaW8iOnsiaDI2NCI6eyJhYWMiOiJodHRwOi8vZDE0b21lYmRuZ2RmdWEuY2xvdWRmcm9udC5uZXQvcHJvZHVjdGlvbi8xNjM1MDgvYXZwL2FyY2hpdmVfMjAxNTAzMjRfYzRhZTU0NzFhODA2L2F1ZGlvLm1wNCJ9fX0sImFyY2hpdmVfcnRtcCI6eyJoaWdoIjp7ImgyNjQiOnsiYWFjIjoicnRtcDovL3MzaTlyeWdxbjIyMmd1LmNsb3VkZnJvbnQubmV0L2NmeC9zdC9tcDQ6cHJvZHVjdGlvbi8xNjM1MDgvYXZwL2FyY2hpdmVfMjAxNTAzMjRfYzRhZTU0NzFhODA2L2hpZ2gubXA0In19LCJtZWRpdW0iOnsiaDI2NCI6eyJhYWMiOiJydG1wOi8vczNpOXJ5Z3FuMjIyZ3UuY2xvdWRmcm9udC5uZXQvY2Z4L3N0L21wNDpwcm9kdWN0aW9uLzE2MzUwOC9hdnAvYXJjaGl2ZV8yMDE1MDMyNF9lN2E3M2UzM2I0YTEvbWVkaXVtLm1wNCJ9fX19LCJwcmVfZXZlbnRfZXh0ZW5kZWRfdGltZSI6IjMwIG1pbnV0ZXMiLCJxdWVzdGlvbnNfdGhyb3R0bGVkIjpmYWxzZSwiYnJvYWRjYXN0ZXJzX3Rocm90dGxlZCI6ZmFsc2UsImFkX29uX2FpciI6ZmFsc2UsImFkc19lbmFibGVkIjpmYWxzZSwiYmFubmVyX2Fkc19lbmFibGVkIjpmYWxzZSwicmVjb21tZW5kZWRfY29udGVudCI6W3siaWQiOjExMjI0Niwic2x1ZyI6ImF1cmEtYWxjaGVteS13aXRoLXBhbWVsYS1hYXJhbHluIiwib3duZXJfbmFtZSI6IlBhbWVsYSIsIm93bmVyX3NsdWciOiJwYW1lbGEtLTE5MyIsIm5hbWUiOiJBdXJhIEFsY2hlbXkgd2l0aCBQYW1lbGEgQWFyYWx5biIsImxvZ28iOiJodHRwczovL2QxZG13NTNmMzB6cGdtLmNsb3VkZnJvbnQubmV0L2V2ZW50cy8xNjM0ODYvdGlsZV8yNDB4MTgwL2ltZzIwMTUwMzE3LTEwOTE2LTFsYnBjdWMuanBnPzE0MjY2NDI3NzIiLCJ1cmwiOiJodHRwOi8vd3d3LnNwcmVlY2FzdC5jb20vZXZlbnRzL2F1cmEtYWxjaGVteS13aXRoLXBhbWVsYS1hYXJhbHluIiwidHlwZSI6ImNsaXAiLCJhYm91dCI6bnVsbCwidmlld3MiOjUxNCwibGVuZ3RoIjoiMDE6Mzk6NTcifSx7ImlkIjoxMTE4MjIsInNsdWciOiJwYW1lbGEtYW5kLWtpcmEtcmF3LXEtYSIsIm93bmVyX25hbWUiOiJQYW1lbGEiLCJvd25lcl9zbHVnIjoicGFtZWxhLS0xOTMiLCJuYW1lIjoiUGFtZWxhIGFuZCBLaXJhIFJBVyBRJkEiLCJsb2dvIjoiaHR0cHM6Ly9kMWRtdzUzZjMwenBnbS5jbG91ZGZyb250Lm5ldC9ldmVudHMvMTYzMTI2L3RpbGVfMjQweDE4MC9pbWcyMDE1MDMxMC0xNjk3Ny0xbTYwZnFsLmpwZz8xNDI2MDA0MTcxIiwidXJsIjoiaHR0cDovL3d3dy5zcHJlZWNhc3QuY29tL2V2ZW50cy9wYW1lbGEtYW5kLWtpcmEtcmF3LXEtYSIsInR5cGUiOiJjbGlwIiwiYWJvdXQiOm51bGwsInZpZXdzIjo5OTcsImxlbmd0aCI6IjAyOjA3OjI5In0seyJpZCI6MTExNTgxLCJzbHVnIjoiaW50ZXJ2aWV3LXdpdGgtdGhlLWF1cmEtcmVhZGVyIiwib3duZXJfbmFtZSI6IlBhbWVsYSIsIm93bmVyX3NsdWciOiJwYW1lbGEtLTE5MyIsIm5hbWUiOiJJbnRlcnZpZXcgV2l0aCBUSEUgQXVyYSBSZWFkZXIhIiwibG9nbyI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvOTE3MTA4L3RpbGVfMjQweDE4MC85MTcxMDhfcGhvdG8uanBnPzE0MjU0MzQ5NjUiLCJ1cmwiOiJodHRwOi8vd3d3LnNwcmVlY2FzdC5jb20vZXZlbnRzL2ludGVydmlldy13aXRoLXRoZS1hdXJhLXJlYWRlciIsInR5cGUiOiJjbGlwIiwiYWJvdXQiOm51bGwsInZpZXdzIjoxNjExLCJsZW5ndGgiOiIwMTo1NjoyOCJ9LHsiaWQiOjExMjE0Nywic2x1ZyI6IndsaWUtNTQwYW0iLCJvd25lcl9uYW1lIjoiV0xJRSA1NDBBTSIsIm93bmVyX3NsdWciOiJ3bGllLTU0MGFtIiwibmFtZSI6IldMSUUgNTQwQU0iLCJsb2dvIjoiL2ltYWdlcy9sb2dvcy90aWxlXzI0MHgxODAvbWlzc2luZ190aWxlXzI0MHgxODAucG5nIiwidXJsIjoiaHR0cDovL3d3dy5zcHJlZWNhc3QuY29tL2V2ZW50cy93bGllLTU0MGFtLS00OSIsInR5cGUiOiJjbGlwIiwiYWJvdXQiOm51bGwsInZpZXdzIjoyMTgsImxlbmd0aCI6IjMwOjEzIn0seyJpZCI6MTExOTQwLCJzbHVnIjoid2xpZS01NDBhbSIsIm93bmVyX25hbWUiOiJXTElFIDU0MEFNIiwib3duZXJfc2x1ZyI6IndsaWUtNTQwYW0iLCJuYW1lIjoiV0xJRSA1NDBBTSAiLCJsb2dvIjoiL2ltYWdlcy9sb2dvcy90aWxlXzI0MHgxODAvbWlzc2luZ190aWxlXzI0MHgxODAucG5nIiwidXJsIjoiaHR0cDovL3d3dy5zcHJlZWNhc3QuY29tL2V2ZW50cy93bGllLTU0MGFtLS00NyIsInR5cGUiOiJjbGlwIiwiYWJvdXQiOm51bGwsInZpZXdzIjozNzMsImxlbmd0aCI6IjMwOjE4In0seyJpZCI6MTA5NjEyLCJzbHVnIjoiaG93aXJldmlldy1vbmxpbmUiLCJvd25lcl9uYW1lIjoiSE9XaVJldmlldy5jb20gQ29tbXVuaXR5Iiwib3duZXJfc2x1ZyI6Imhvd2lyZXZpZXctY29tIiwibmFtZSI6IkhPV2lSZXZpZXcgT05MSU5FISIsImxvZ28iOiJodHRwczovL2QxZG13NTNmMzB6cGdtLmNsb3VkZnJvbnQubmV0L2V2ZW50cy8xNjAyNDQvdGlsZV8yNDB4MTgwL2ltZzIwMTUwMTMxLTE3NzExLTF0emwxNm8uanBnPzE0MjI3Njc4NjYiLCJ1cmwiOiJodHRwOi8vd3d3LnNwcmVlY2FzdC5jb20vZXZlbnRzL2hvd2lyZXZpZXctb25saW5lLS0zIiwidHlwZSI6ImNsaXAiLCJhYm91dCI6bnVsbCwidmlld3MiOjQ2NiwibGVuZ3RoIjoiMDI6MTI6MTcifSx7ImlkIjoxMTA1NjcsInNsdWciOiJuZXctbW9vbi1pbi1hcXVhcml1cy0yMDE1Iiwib3duZXJfbmFtZSI6Ikxpc2EgTWFyaWUgUm9zYXRpIChHb2RkZXNzIExpZmVzdHlsZSBUVikiLCJvd25lcl9zbHVnIjoibGlzYS1tYXJpZS1yb3NhdGktLTMiLCJuYW1lIjoiTmV3IE1vb24gSW4gQXF1YXJpdXMgMjAxNSIsImxvZ28iOiIvL3MzLmFtYXpvbmF3cy5jb20vc3ByZWVjYXN0LXBob3Rvcy9wcm9kdWN0aW9uL3VzZXJzLzY1Mzk1OS90aWxlXzI0MHgxODAvNjUzOTU5X3Bob3RvLmpwZz8xNDI1MjI1MTg5IiwidXJsIjoiaHR0cDovL3d3dy5zcHJlZWNhc3QuY29tL2V2ZW50cy9uZXctbW9vbi1pbi1hcXVhcml1cy0yMDE1IiwidHlwZSI6ImNsaXAiLCJhYm91dCI6bnVsbCwidmlld3MiOjgxNiwibGVuZ3RoIjoiNTY6MzkifSx7ImlkIjoxMTIyNDUsInNsdWciOiJlc3BuLW5iYS1saXZlLWNoYXQtZXBpc29kZS0xMTQiLCJvd25lcl9uYW1lIjoiQFRydWVIb29wVFYiLCJvd25lcl9zbHVnIjoidHJ1ZWhvb3B0di0tMiIsIm5hbWUiOiJFU1BOIE5CQSBMaXZlIENoYXQgRXBpc29kZSAxMTQiLCJsb2dvIjoiaHR0cHM6Ly9kMWRtdzUzZjMwenBnbS5jbG91ZGZyb250Lm5ldC9ldmVudHMvMTYzNTkwL3RpbGVfMjQweDE4MC9pbWcyMDE1MDMyMC04NzQ2LXkwMWprei5qcGc/MTQyNjg2MDAwNCIsInVybCI6Imh0dHA6Ly93d3cuc3ByZWVjYXN0LmNvbS9ldmVudHMvZXNwbi1uYmEtbGl2ZS1jaGF0LWVwaXNvZGUtMTE0IiwidHlwZSI6ImNsaXAiLCJhYm91dCI6bnVsbCwidmlld3MiOjI0OTAxMCwibGVuZ3RoIjoiMDE6MDQ6NTYifSx7ImlkIjoxMTAxNTIsInNsdWciOiJ0b255LXJvYmJpbnMtc3ByZWVjYXN0Iiwib3duZXJfbmFtZSI6IlRlYW0gVG9ueSIsIm93bmVyX3NsdWciOiJ0ZWFtLXRvbnkiLCJuYW1lIjoiVG9ueSBSb2JiaW5zIFNwcmVlY2FzdCIsImxvZ28iOiJodHRwczovL2QxZG13NTNmMzB6cGdtLmNsb3VkZnJvbnQubmV0L2V2ZW50cy8xNjAzNzEvdGlsZV8yNDB4MTgwLzE2MDM3MV9waG90by5qcGc/MTQyMjk5NzEwMiIsInVybCI6Imh0dHA6Ly93d3cuc3ByZWVjYXN0LmNvbS9ldmVudHMvdG9ueS1yb2JiaW5zLXNwcmVlY2FzdCIsInR5cGUiOiJjbGlwIiwiYWJvdXQiOm51bGwsInZpZXdzIjoxNTUyNTcsImxlbmd0aCI6IjAxOjAzOjI5In0seyJpZCI6MTEyMTQ4LCJzbHVnIjoiZXNwbi1uYmEtbGl2ZS1jaGF0LWVwaXNvZGUtMTEzIiwib3duZXJfbmFtZSI6IkBUcnVlSG9vcFRWIiwib3duZXJfc2x1ZyI6InRydWVob29wdHYtLTIiLCJuYW1lIjoiRVNQTiBOQkEgTGl2ZSBDaGF0IEVwaXNvZGUgMTEzIiwibG9nbyI6Imh0dHBzOi8vZDFkbXc1M2YzMHpwZ20uY2xvdWRmcm9udC5uZXQvZXZlbnRzLzE2MzQ0Ny90aWxlXzI0MHgxODAvaW1nMjAxNTAzMTctMTQ3NzYtZzloZnZ4LmpwZz8xNDI2NjA2MzY2IiwidXJsIjoiaHR0cDovL3d3dy5zcHJlZWNhc3QuY29tL2V2ZW50cy9lc3BuLW5iYS1saXZlLWNoYXQtZXBpc29kZS0xMTMiLCJ0eXBlIjoiY2xpcCIsImFib3V0IjpudWxsLCJ2aWV3cyI6MTY5ODQ4LCJsZW5ndGgiOiIwMToxOTo0MyJ9XSwiY2F0ZWdvcnkiOiJSZWxpZ2lvbiAmIFNwaXJpdHVhbGl0eSIsImlzX2V4cGlyZWQiOmZhbHNlLCJ1bmxpc3RlZF9lbWJlZF9lbmFibGVkIjp0cnVlLCJsZWdhY3lfcnRtcCI6ZmFsc2UsInBsYXliYWNrX3N0YXJ0X29mZnNldCI6MCwic3RhcnRUaW1lIjoxNDI3MjEzMTQyMTg5LCJtb2JpbGVfdXJsIjoiaHR0cDovL3d3dy5zcHJlZWNhc3QuY29tL2V2ZW50cy9hc2stdGhlLWFyY2hiaXNob3AvbW9iaWxlIiwibW9iaWxlX2VjbWEiOiJodHRwOi8vd3d3LnNwcmVlY2FzdC5jb20vZXZlbnRzL2Fzay10aGUtYXJjaGJpc2hvcC9tb2JpbGVfZWNtYV92IiwicnN2cF9jb3VudCI6MTIsInBsYXliYWNrX3N0YXJ0Ijo2OTIwMDB9LCJpc19lbWJlZCI6ZmFsc2UsInNjbV9lbnYiOiJwcm9kdWN0aW9uIiwidXNlciI6eyJhYm91dF9tZSI6IiIsImZpcnN0X25hbWUiOiJHdWVzdFVzZXIiLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjpmYWxzZSwibGFzdF9uYW1lIjoiIiwibmVlZHNfdG9fY29uZmlybV9lbWFpbCI6ZmFsc2UsInVzZXJfaWQiOiJndWVzdHVzZXItLTIiLCJhbHQiOjIxNzM4NiwiYWRtaW4iOmZhbHNlLCJjb250ZW50X21vZCI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiL3Byb2ZpbGVfcGhvdG9zL3RpbGVfMzB4MzAvdmlzaXRvci5wbmciLCJpc19mYiI6ZmFsc2UsInBwdl9hcHByb3ZlZCI6ZmFsc2UsImlzX2FmZmlsaWF0ZSI6ZmFsc2UsImZvbGxvd2luZ19ldmVudHMiOltdLCJpc19sb2NrZWQiOnRydWUsInBsYW5fbmFtZSI6IkJhc2ljIiwiY2FuX2NyZWF0ZV9zcHJlZWNhc3QiOmZhbHNlLCJhbGxvd19mcmllbmRfcmVxdWVzdHMiOnRydWUsImlzX2Nvbm5lY3RlZCI6dHJ1ZSwidmNhdCI6bnVsbH0sInJlY29tbWVuZGVkX3VzZXJzIjpbeyJpZCI6OTY0NTM2LCJjYWNoZWRfc2x1ZyI6InRoZS1hcmNoZGlvY2VzZS1vZi1wb3J0LW9mLXNwYWluIiwibmFtZSI6IlRoZSBBcmNoZGlvY2VzZSBvZiBQb3J0IG9mIFNwYWluIiwicGhvdG8iOiIvL3MzLmFtYXpvbmF3cy5jb20vc3ByZWVjYXN0LXBob3Rvcy9wcm9kdWN0aW9uL3VzZXJzLzk2NDUzNi90aWxlXzEwMHgxMDAvOTY0NTM2X3Bob3RvLmpwZz8xNDI2NjA0NDkwIn0seyJpZCI6MzQyMTA0LCJjYWNoZWRfc2x1ZyI6ImNocmlzZ3JlZW4iLCJuYW1lIjoiQ2hyaXNHcmVlbiIsInBob3RvIjoiLy9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1waG90b3MvcHJvZHVjdGlvbi91c2Vycy8zNDIxMDQvdGlsZV8xMDB4MTAwLzM0MjEwNF9waG90by5qcGc/MTM0OTMyMzQ5NCJ9LHsiaWQiOjM1NTI5NCwiY2FjaGVkX3NsdWciOiJ0aGUtYmxhY2stZ3V5LXdoby10aXBzIiwibmFtZSI6IlRoZSBCbGFjayBHdXkgV2hvIFRpcHMiLCJwaG90byI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvMzU1Mjk0L3RpbGVfMTAweDEwMC8zNTUyOTRfcGhvdG8uanBnPzEzNTIzMzY4MTMifSx7ImlkIjo0MDM0OTEsImNhY2hlZF9zbHVnIjoiZXNwbiIsIm5hbWUiOiJFU1BOIiwicGhvdG8iOiIvL3MzLmFtYXpvbmF3cy5jb20vc3ByZWVjYXN0LXBob3Rvcy9wcm9kdWN0aW9uL3VzZXJzLzQwMzQ5MS90aWxlXzEwMHgxMDAvNDAzNDkxX3Bob3RvLmpwZz8xMzcwOTY0NTE5In0seyJpZCI6NDE0ODU2LCJjYWNoZWRfc2x1ZyI6InRydWVob29wdHYtLTIiLCJuYW1lIjoiQFRydWVIb29wVFYiLCJwaG90byI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvNDE0ODU2L3RpbGVfMTAweDEwMC80MTQ4NTZfcGhvdG8uanBnPzEzNTU4Njg0MTUifSx7ImlkIjo5MTU2NDYsImNhY2hlZF9zbHVnIjoia2VybWl0LWFuZC1mcmllbmRzIiwibmFtZSI6Iktlcm1pdCBhbmQgRnJpZW5kcyIsInBob3RvIjoiLy9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1waG90b3MvcHJvZHVjdGlvbi91c2Vycy85MTU2NDYvdGlsZV8xMDB4MTAwLzkxNTY0Nl9waG90by5qcGc/MTQyNDQzODEwMyJ9XX0sImNsaXAiOnsiZGVzY3JpcHRpb24iOiJBcmNoYmlzaG9wIEhhcnJpcyBjYW5kaWRseSBzaGFyZXMgYSBwZXJzb25hbCBjaGFsbGVuZ2UgYW5kIGhvdyBoZSBvdmVyY2FtZSBpdC4gIiwiaW1hZ2VfdXJsIjoiaHR0cHM6Ly9kMWRtdzUzZjMwenBnbS5jbG91ZGZyb250Lm5ldC9ldmVudHMvMTYzNTA4L3RpbGVfNDgweDM2MC8xNjM1MDhfcGhvdG8uanBnPzE0MjY3ODA5MTMiLCJwbGF5YmFja19lbmQiOjE0MjcyMTM5NTUxODksInBsYXliYWNrX3N0YXJ0IjoxNDI3MjEzODM0MTg5LCJ0aXRsZSI6IkJlc3Qgb2YgQXNrIFRoZSBBcmNoYmlzaG9wICIsInRhZ3MiOltdLCJjbGlwX2lkIjoxMTIzNjgsInVzZXJfaWQiOiJ0aGUtYXJjaGRpb2Nlc2Utb2YtcG9ydC1vZi1zcGFpbiJ9LCJkaWdlc3QiOnsibGFzdF9tZXNzYWdlX2lkIjoxMTYwLCJ2aXNpYmxlX3VzZXJzIjpbXSwiY3VycmVudF92aWV3ZXJzX2NvdW50IjowLCJwcm9kdWNlcl91c2VycyI6W10sImV2ZW50X3BhcnRpY2lwYXRpb25zIjpbeyJhY3Rpb24iOm51bGwsImJyb2FkY2FzdF9zdGF0dXMiOjIsImNyZWF0ZWRfYXQiOjE0MjY3MDA3OTMuMCwiaXNfY29ubmVjdGVkIjpmYWxzZSwiaXNfbW9kZXJhdG9yIjp0cnVlLCJpc19vd25lciI6dHJ1ZSwiaXNfcHVibGlzaGluZyI6ZmFsc2UsIm1pY3JvcGhvbmVfZ2Fpbl9sZXZlbCI6NzEsInByZXZpZXdfbG9jYXRpb24iOm51bGwsInJvbGUiOiJCQWg3Q0VraURXVjJaVzUwWDJsa0Jqb0dSVVpKSWdzeE5qTTFNRGdHT3dCR1NTSU1kWE5sY2w5cFpBWTdBRVpwQTdpM0Rra2lDMmx6WDNacGNBWTdBRVpVLS1hNGE4M2Q4ZjE2NTYzZWNhY2VlZDZhMTcxM2I3MjkyNzExOGNjMjBkIiwic3RhcnJlZF9hdCI6bnVsbCwic3RyZWFtX3F1YWxpdHkiOm51bGwsInVzZXIiOnsiYWJvdXRfbWUiOiJUaGUgQ2F0aG9saWMgQ2h1cmNoIHdhcyBpbnRyb2R1Y2VkIHRvIFRyaW5pZGFkIHdpdGggdGhlIGNvbWluZyBvZiBDb2x1bWJ1cyBpbiAxNDk4IGFuZCB0aGUgc3Vic2VxdWVudCBTcGFuaXNoIHNldHRsZW1lbnQgYW5kIGVzdGFibGlzaG1lbnQgb2YgdGhlIFBhcmlzaCBhbmQgQ2h1cmNoIG9mIFN0LiBKb3NlcGggYnkgQW50b25pbyBkZSBCZXJyaW8gaW4gMTU5Mi4gVGhlIENodXJjaCB3YXMgZnVydGhlciBhc3N1cmVkIG9mIGl0cyBjb250aW51aXR5IGFmdGVyIHRoZSBpc2xhbmQgd2FzIGxvc3QgdG8gdGhlIEJyaXRpc2ggYXMgQXJ0aWNsZSBFbGV2ZW4gb2YgdGhlIENhcGl0dWxhdGlvbiBvZiAxNzk3IGd1YXJhbnRlZWQgdGhlIGluaGFiaXRhbnRzLCBtb3N0IG9mIHdob20gd2VyZSBDYXRob2xpYywgZnJlZWRvbSB0byBwcmFjdGljZSB0aGVpciByZWxpZ2lvbi4gVHJpbmlkYWQgd2FzIHRoZW4gdW5kZXIgdGhlIGp1cmlzZGljdGlvbiBvZiB0aGUgRGlvY2VzZSBvZiBHdXlhbmEgYmFzZWQgYXQgU2FuIFRvbWUgZGUgQW5nb3N0dXJhIChWZW5lenVlbGEpIHdoaWNoIHdhcyBlcmVjdGVkIGluIDE3OTAuIFRoZSBpc2xhbmQgd2FzIHByZXZpb3VzbHkgcGFydCBvZiB0aGUgRGlvY2VzZSBvZiBQdWVydG8gUmljbywgZm91bmRlZCBpbiAxNTMyLlxyXG5cclxuT24gMzB0aCBBcHJpbCwgMTg1MCBQb3BlIFBpdXMgSVggdHJhbnNmb3JtZWQgdGhlIFZpY2FyaWF0ZSBpbnRvIHRoZSBBcmNoZGlvY2VzZSBvZiBQb3J0LW9mLVNwYWluIHdpdGgganVyaXNkaWN0aW9uIG92ZXIgU3QuIEx1Y2lhLCBTdC4gVmluY2VudCwgR3JlbmFkYSBhbmQgVG9iYWdvIGFuZCB3aXRoIFJvc2VhdSwgRG9taW5pY2EgYXMgaXRzIHN1ZmZyYWdhbiBzZWUuIEluIDE4NTAsIHRoZSBDYXRob2xpYyBwb3B1bGF0aW9uIG9mIFRyaW5pZGFkIHN0b29kIGF0IDQ0LDAwMCBvdXQgb2YgYSB0b3RhbCBvZiA3MCwwMDAgcGVyc29ucy4gVGhlcmUgd2VyZSBzaXh0ZWVuIHBhcmlzaGVzIHNlcnZlZCBieSB0d2VudHkgcmVzaWRlbnQgcHJpZXN0cywgd2l0aCB0aGlydGVlbiBwcmltYXJ5IHNjaG9vbHMgYWxvbmcgd2l0aCBTdC4gSm9zZXBoXHUyMDE5cyBDb252ZW50LCBQb3J0LW9mLVNwYWluICgxODM2KSBhbmQgU3QuIEdlb3JnZVx1MjAxOXMgQ29sbGVnZSAoMTgzOCkuIFRoZSBDaHVyY2hcdTIwMTlzIG5ldyBzdGF0dXMgd2FzIG9mIGFkZGVkIHNpZ25pZmljYW5jZSBhcyBpdCB3YXMgbWFkZSBtb250aHMgYmVmb3JlIHRoZSBoaWVyYXJjaHkgd2FzIHJlc3RvcmVkIGluIEVuZ2xhbmQgb24gMjR0aCBTZXB0ZW1iZXIgMTg1MC4gSW5kZWVkIHRoZSBDaHVyY2ggb2YgUG9ydC1vZi1TcGFpbiBsYXlzIGNsYWltIHRvIGJlIG9uZSBvZiB0aGUgb2xkZXN0IGluIHRoZSBFbmdsaXNoLXNwZWFraW5nIHdvcmxkLiIsImZpcnN0X25hbWUiOiJUaGUgQXJjaGRpb2Nlc2Ugb2YgUG9ydCBvZiBTcGFpbiAiLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjp0cnVlLCJsYXN0X25hbWUiOiIiLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6InRoZS1hcmNoZGlvY2VzZS1vZi1wb3J0LW9mLXNwYWluIiwiYWx0Ijo5NjQ1MzYsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvOTY0NTM2L3RpbGVfMzB4MzAvOTY0NTM2X3Bob3RvLmpwZz8xNDI2NjA0NDkwIiwiaXNfZmIiOmZhbHNlLCJwcHZfYXBwcm92ZWQiOmZhbHNlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbXSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJCcm9uemUiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6dHJ1ZSwiYWxsb3dfZnJpZW5kX3JlcXVlc3RzIjp0cnVlLCJwcm9wb3NlZF9wcm9tb3Rpb24iOjAsInByb2R1Y2VyIjp0cnVlLCJicm9hZGNhc3Rfc3RhdHVzIjoyLCJpc19wdWJsaXNoaW5nIjpmYWxzZSwiaXNfY29ubmVjdGVkIjpmYWxzZSwib3duZXIiOnRydWUsImFjdGlvbiI6bnVsbCwiaXNfYmFubmVkIjpmYWxzZSwicHJldmlld19sb2NhdGlvbiI6bnVsbCwicm9sZSI6IkJBaDdDRWtpRFdWMlpXNTBYMmxrQmpvR1JVWkpJZ3N4TmpNMU1EZ0dPd0JHU1NJTWRYTmxjbDlwWkFZN0FFWnBBN2kzRGtraUMybHpYM1pwY0FZN0FFWlUtLWE0YTgzZDhmMTY1NjNlY2FjZWVkNmExNzEzYjcyOTI3MTE4Y2MyMGQiLCJtaWNyb3Bob25lX2dhaW5fbGV2ZWwiOjcxLCJzdGFycmVkX2F0IjpudWxsLCJ2Y2F0IjpudWxsLCJjYXBhYmlsaXRpZXMiOnsicHJlc2VuY2UiOiJ0cnVlIiwiYnJvYWRjYXN0IjoidHJ1ZSJ9LCJkZXZpY2UiOiJ3ZWIifX0seyJhY3Rpb24iOm51bGwsImJyb2FkY2FzdF9zdGF0dXMiOjIsImNyZWF0ZWRfYXQiOjE0MjY3MDQxNDguMCwiaXNfY29ubmVjdGVkIjpmYWxzZSwiaXNfbW9kZXJhdG9yIjp0cnVlLCJpc19vd25lciI6ZmFsc2UsImlzX3B1Ymxpc2hpbmciOmZhbHNlLCJtaWNyb3Bob25lX2dhaW5fbGV2ZWwiOjUwLCJwcmV2aWV3X2xvY2F0aW9uIjpudWxsLCJyb2xlIjoiQkFoN0NFa2lEV1YyWlc1MFgybGtCam9HUlVaSklnc3hOak0xTURnR093QkdTU0lNZFhObGNsOXBaQVk3QUVacEE4ODNBMGtpQzJselgzWnBjQVk3QUVaVS0tOThiZTMyODQwMjE0NDk3OWQwOTdiYzVlMDE5Y2E0YTFiMTEyYzdlYyIsInN0YXJyZWRfYXQiOm51bGwsInN0cmVhbV9xdWFsaXR5IjpudWxsLCJ1c2VyIjp7ImFib3V0X21lIjoiQmF5IEFyZWEgTmF0aXZlIHx8IFdhcnJpb3JzLzQ5ZXJzIEZhbiB8fCBNdXNpYy9UZWNoIEVudGh1c2lhc3QgfHwgQ29udGVudCAmYW1wOyBDb21tdW5pdHkgQXNzb2NpYXRlIDxhIGhyZWY9XCJodHRwOi8vd3d3LnR3aXR0ZXIuY29tL3NwcmVlY2FzdFwiPkBzcHJlZWNhc3Q8L2E+ICIsImZpcnN0X25hbWUiOiJBc2hyYWYiLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjp0cnVlLCJsYXN0X25hbWUiOiJFbCBHYW1hbCIsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJ1c2VyX2lkIjoiYXNocmFmIiwiYWx0IjoyMTA4OTUsImFkbWluIjp0cnVlLCJjb250ZW50X21vZCI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiLy9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1waG90b3MvcHJvZHVjdGlvbi91c2Vycy8yMTA4OTUvdGlsZV8zMHgzMC8yMTA4OTVfcGhvdG8uanBnPzEzOTU0MTQ0NzQiLCJpc19mYiI6dHJ1ZSwicHB2X2FwcHJvdmVkIjp0cnVlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbMTYzNTExXSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJQbHVzIiwiY2FuX2NyZWF0ZV9zcHJlZWNhc3QiOnRydWUsImFsbG93X2ZyaWVuZF9yZXF1ZXN0cyI6dHJ1ZSwicHJvcG9zZWRfcHJvbW90aW9uIjowLCJwcm9kdWNlciI6dHJ1ZSwiYnJvYWRjYXN0X3N0YXR1cyI6MiwiaXNfcHVibGlzaGluZyI6ZmFsc2UsImlzX2Nvbm5lY3RlZCI6ZmFsc2UsIm93bmVyIjpmYWxzZSwiYWN0aW9uIjpudWxsLCJpc19iYW5uZWQiOmZhbHNlLCJwcmV2aWV3X2xvY2F0aW9uIjpudWxsLCJyb2xlIjoiQkFoN0NFa2lEV1YyWlc1MFgybGtCam9HUlVaSklnc3hOak0xTURnR093QkdTU0lNZFhObGNsOXBaQVk3QUVacEE4ODNBMGtpQzJselgzWnBjQVk3QUVaVS0tOThiZTMyODQwMjE0NDk3OWQwOTdiYzVlMDE5Y2E0YTFiMTEyYzdlYyIsIm1pY3JvcGhvbmVfZ2Fpbl9sZXZlbCI6NTAsInN0YXJyZWRfYXQiOm51bGwsInZjYXQiOm51bGwsImNhcGFiaWxpdGllcyI6e30sImRldmljZSI6IndlYiJ9fSx7ImFjdGlvbiI6bnVsbCwiYnJvYWRjYXN0X3N0YXR1cyI6MCwiY3JlYXRlZF9hdCI6MTQyNjc5NDExNi4wLCJpc19jb25uZWN0ZWQiOmZhbHNlLCJpc19tb2RlcmF0b3IiOmZhbHNlLCJpc19vd25lciI6ZmFsc2UsImlzX3B1Ymxpc2hpbmciOmZhbHNlLCJtaWNyb3Bob25lX2dhaW5fbGV2ZWwiOjQwLCJwcmV2aWV3X2xvY2F0aW9uIjpudWxsLCJyb2xlIjoiQkFoN0NFa2lEV1YyWlc1MFgybGtCam9HUlVaSklnc3hOak0xTURnR093QkdTU0lNZFhObGNsOXBaQVk3QUVacEF6MjdEa2tpQzJselgzWnBjQVk3QUVaRy0tYmFiOWM1ZmU1ODczZGZlOWMyM2EyZWE4MWE5MzY1Njg4YTA1MjMwNSIsInN0YXJyZWRfYXQiOm51bGwsInN0cmVhbV9xdWFsaXR5IjpudWxsLCJ1c2VyIjp7ImFib3V0X21lIjpudWxsLCJmaXJzdF9uYW1lIjoiSmVyZWxsZSIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IkpvcmRhbiIsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJ1c2VyX2lkIjoiamVyZWxsZSIsImFsdCI6OTY1NDM3LCJhZG1pbiI6ZmFsc2UsImNvbnRlbnRfbW9kIjpmYWxzZSwicHJvZmlsZV9waG90b190aHVtYl91cmwiOiIvL3MzLmFtYXpvbmF3cy5jb20vc3ByZWVjYXN0LXBob3Rvcy9wcm9kdWN0aW9uL3VzZXJzLzk2NTQzNy90aWxlXzMweDMwLzk2NTQzN19waG90by5qcGc/MTQyNjc5NDEwOSIsImlzX2ZiIjp0cnVlLCJwcHZfYXBwcm92ZWQiOmZhbHNlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbXSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJCYXNpYyIsImNhbl9jcmVhdGVfc3ByZWVjYXN0IjpmYWxzZSwiYWxsb3dfZnJpZW5kX3JlcXVlc3RzIjp0cnVlLCJwcm9wb3NlZF9wcm9tb3Rpb24iOjAsInByb2R1Y2VyIjpmYWxzZSwiYnJvYWRjYXN0X3N0YXR1cyI6MCwiaXNfcHVibGlzaGluZyI6ZmFsc2UsImlzX2Nvbm5lY3RlZCI6ZmFsc2UsIm93bmVyIjpmYWxzZSwiYWN0aW9uIjpudWxsLCJpc19iYW5uZWQiOmZhbHNlLCJwcmV2aWV3X2xvY2F0aW9uIjpudWxsLCJyb2xlIjoiQkFoN0NFa2lEV1YyWlc1MFgybGtCam9HUlVaSklnc3hOak0xTURnR093QkdTU0lNZFhObGNsOXBaQVk3QUVacEF6MjdEa2tpQzJselgzWnBjQVk3QUVaRy0tYmFiOWM1ZmU1ODczZGZlOWMyM2EyZWE4MWE5MzY1Njg4YTA1MjMwNSIsIm1pY3JvcGhvbmVfZ2Fpbl9sZXZlbCI6NDAsInN0YXJyZWRfYXQiOm51bGwsInZjYXQiOm51bGwsImNhcGFiaWxpdGllcyI6e30sImRldmljZSI6IndlYiJ9fSx7ImFjdGlvbiI6bnVsbCwiYnJvYWRjYXN0X3N0YXR1cyI6MCwiY3JlYXRlZF9hdCI6MTQyNjgxNTc5Ny4wLCJpc19jb25uZWN0ZWQiOmZhbHNlLCJpc19tb2RlcmF0b3IiOmZhbHNlLCJpc19vd25lciI6ZmFsc2UsImlzX3B1Ymxpc2hpbmciOmZhbHNlLCJtaWNyb3Bob25lX2dhaW5fbGV2ZWwiOjQwLCJwcmV2aWV3X2xvY2F0aW9uIjpudWxsLCJyb2xlIjoiQkFoN0NFa2lEV1YyWlc1MFgybGtCam9HUlVaSklnc3hOak0xTURnR093QkdTU0lNZFhObGNsOXBaQVk3QUVacEE1YThEa2tpQzJselgzWnBjQVk3QUVaRy0tMzczMDYwZjc2NGVhODYzY2NlNDVmNDE2NDhlZWUxOGRiNzVhNGY5MCIsInN0YXJyZWRfYXQiOm51bGwsInN0cmVhbV9xdWFsaXR5IjpudWxsLCJ1c2VyIjp7ImFib3V0X21lIjpudWxsLCJmaXJzdF9uYW1lIjoiVGlzaGFubmEiLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjp0cnVlLCJsYXN0X25hbWUiOiJDaHVuaWVzaW5naCIsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJ1c2VyX2lkIjoidGlzaGFubmEtLTIiLCJhbHQiOjk2NTc4MiwiYWRtaW4iOmZhbHNlLCJjb250ZW50X21vZCI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiLy9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1waG90b3MvcHJvZHVjdGlvbi91c2Vycy85NjU3ODIvdGlsZV8zMHgzMC85NjU3ODJfcGhvdG8uanBnPzE0MjY4MTU3OTEiLCJpc19mYiI6dHJ1ZSwicHB2X2FwcHJvdmVkIjpmYWxzZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6W10sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiQmFzaWMiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6ZmFsc2UsImFsbG93X2ZyaWVuZF9yZXF1ZXN0cyI6dHJ1ZSwicHJvcG9zZWRfcHJvbW90aW9uIjowLCJwcm9kdWNlciI6ZmFsc2UsImJyb2FkY2FzdF9zdGF0dXMiOjAsImlzX3B1Ymxpc2hpbmciOmZhbHNlLCJpc19jb25uZWN0ZWQiOmZhbHNlLCJvd25lciI6ZmFsc2UsImFjdGlvbiI6bnVsbCwiaXNfYmFubmVkIjpmYWxzZSwicHJldmlld19sb2NhdGlvbiI6bnVsbCwicm9sZSI6IkJBaDdDRWtpRFdWMlpXNTBYMmxrQmpvR1JVWkpJZ3N4TmpNMU1EZ0dPd0JHU1NJTWRYTmxjbDlwWkFZN0FFWnBBNWE4RGtraUMybHpYM1pwY0FZN0FFWkctLTM3MzA2MGY3NjRlYTg2M2NjZTQ1ZjQxNjQ4ZWVlMThkYjc1YTRmOTAiLCJtaWNyb3Bob25lX2dhaW5fbGV2ZWwiOjQwLCJzdGFycmVkX2F0IjpudWxsLCJ2Y2F0IjpudWxsLCJjYXBhYmlsaXRpZXMiOnt9LCJkZXZpY2UiOiJ3ZWIifX0seyJhY3Rpb24iOm51bGwsImJyb2FkY2FzdF9zdGF0dXMiOjAsImNyZWF0ZWRfYXQiOjE0MjY5NDA4NjIuMCwiaXNfY29ubmVjdGVkIjpmYWxzZSwiaXNfbW9kZXJhdG9yIjpmYWxzZSwiaXNfb3duZXIiOmZhbHNlLCJpc19wdWJsaXNoaW5nIjpmYWxzZSwibWljcm9waG9uZV9nYWluX2xldmVsIjo0MCwicHJldmlld19sb2NhdGlvbiI6bnVsbCwicm9sZSI6IkJBaDdDRWtpRFdWMlpXNTBYMmxrQmpvR1JVWkpJZ3N4TmpNMU1EZ0dPd0JHU1NJTWRYTmxjbDlwWkFZN0FFWnBBK1M5RGtraUMybHpYM1pwY0FZN0FFWkctLTRiYWM4NDVmNmI3MThiNzhlMmE4YTU4YmI4YWYyZDgzNTc2NzMxMmIiLCJzdGFycmVkX2F0IjpudWxsLCJzdHJlYW1fcXVhbGl0eSI6bnVsbCwidXNlciI6eyJhYm91dF9tZSI6bnVsbCwiZmlyc3RfbmFtZSI6IkpvaG4iLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjp0cnVlLCJsYXN0X25hbWUiOiJHaW9hbm5ldHRpIiwibmVlZHNfdG9fY29uZmlybV9lbWFpbCI6ZmFsc2UsInVzZXJfaWQiOiJqb2huLS0xNDA2IiwiYWx0Ijo5NjYxMTYsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvOTY2MTE2L3RpbGVfMzB4MzAvOTY2MTE2X3Bob3RvLmpwZz8xNDI2OTQwODMwIiwiaXNfZmIiOnRydWUsInBwdl9hcHByb3ZlZCI6ZmFsc2UsImlzX2FmZmlsaWF0ZSI6ZmFsc2UsImZvbGxvd2luZ19ldmVudHMiOltdLCJpc19sb2NrZWQiOnRydWUsInBsYW5fbmFtZSI6IkJhc2ljIiwiY2FuX2NyZWF0ZV9zcHJlZWNhc3QiOmZhbHNlLCJhbGxvd19mcmllbmRfcmVxdWVzdHMiOnRydWUsInByb3Bvc2VkX3Byb21vdGlvbiI6MCwicHJvZHVjZXIiOmZhbHNlLCJicm9hZGNhc3Rfc3RhdHVzIjowLCJpc19wdWJsaXNoaW5nIjpmYWxzZSwiaXNfY29ubmVjdGVkIjpmYWxzZSwib3duZXIiOmZhbHNlLCJhY3Rpb24iOm51bGwsImlzX2Jhbm5lZCI6ZmFsc2UsInByZXZpZXdfbG9jYXRpb24iOm51bGwsInJvbGUiOiJCQWg3Q0VraURXVjJaVzUwWDJsa0Jqb0dSVVpKSWdzeE5qTTFNRGdHT3dCR1NTSU1kWE5sY2w5cFpBWTdBRVpwQStTOURra2lDMmx6WDNacGNBWTdBRVpHLS00YmFjODQ1ZjZiNzE4Yjc4ZTJhOGE1OGJiOGFmMmQ4MzU3NjczMTJiIiwibWljcm9waG9uZV9nYWluX2xldmVsIjo0MCwic3RhcnJlZF9hdCI6bnVsbCwidmNhdCI6bnVsbCwiY2FwYWJpbGl0aWVzIjp7fSwiZGV2aWNlIjoiaXBhZCJ9fSx7ImFjdGlvbiI6bnVsbCwiYnJvYWRjYXN0X3N0YXR1cyI6MCwiY3JlYXRlZF9hdCI6MTQyNzA3MjQwMC4wLCJpc19jb25uZWN0ZWQiOmZhbHNlLCJpc19tb2RlcmF0b3IiOmZhbHNlLCJpc19vd25lciI6ZmFsc2UsImlzX3B1Ymxpc2hpbmciOmZhbHNlLCJtaWNyb3Bob25lX2dhaW5fbGV2ZWwiOjQwLCJwcmV2aWV3X2xvY2F0aW9uIjpudWxsLCJyb2xlIjoiQkFoN0NFa2lEV1YyWlc1MFgybGtCam9HUlVaSklnc3hOak0xTURnR093QkdTU0lNZFhObGNsOXBaQVk3QUVacEF3cS9Ea2tpQzJselgzWnBjQVk3QUVaRy0tZDcxMTkxNjI2MDhlMDA5ZjBjOTQ4YmNjZDExNzUzZmExOTJhZmUzMiIsInN0YXJyZWRfYXQiOm51bGwsInN0cmVhbV9xdWFsaXR5IjpudWxsLCJ1c2VyIjp7ImFib3V0X21lIjpudWxsLCJmaXJzdF9uYW1lIjoiTWFyaW9uIiwiaGFzX2JlZW5fYXV0aGVudGljYXRlZCI6dHJ1ZSwibGFzdF9uYW1lIjoiU2ltb24iLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6Im1hcmlvbi0tNTQiLCJhbHQiOjk2NjQxMCwiYWRtaW4iOmZhbHNlLCJjb250ZW50X21vZCI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiLy9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1waG90b3MvcHJvZHVjdGlvbi91c2Vycy85NjY0MTAvdGlsZV8zMHgzMC85NjY0MTBfcGhvdG8uanBnPzE0MjcwNzIzNzYiLCJpc19mYiI6dHJ1ZSwicHB2X2FwcHJvdmVkIjpmYWxzZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6W10sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiQmFzaWMiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6ZmFsc2UsImFsbG93X2ZyaWVuZF9yZXF1ZXN0cyI6dHJ1ZSwicHJvcG9zZWRfcHJvbW90aW9uIjowLCJwcm9kdWNlciI6ZmFsc2UsImJyb2FkY2FzdF9zdGF0dXMiOjAsImlzX3B1Ymxpc2hpbmciOmZhbHNlLCJpc19jb25uZWN0ZWQiOmZhbHNlLCJvd25lciI6ZmFsc2UsImFjdGlvbiI6bnVsbCwiaXNfYmFubmVkIjpmYWxzZSwicHJldmlld19sb2NhdGlvbiI6bnVsbCwicm9sZSI6IkJBaDdDRWtpRFdWMlpXNTBYMmxrQmpvR1JVWkpJZ3N4TmpNMU1EZ0dPd0JHU1NJTWRYTmxjbDlwWkFZN0FFWnBBd3EvRGtraUMybHpYM1pwY0FZN0FFWkctLWQ3MTE5MTYyNjA4ZTAwOWYwYzk0OGJjY2QxMTc1M2ZhMTkyYWZlMzIiLCJtaWNyb3Bob25lX2dhaW5fbGV2ZWwiOjQwLCJzdGFycmVkX2F0IjpudWxsLCJ2Y2F0IjpudWxsLCJjYXBhYmlsaXRpZXMiOnt9LCJkZXZpY2UiOiJ3ZWIifX0seyJhY3Rpb24iOm51bGwsImJyb2FkY2FzdF9zdGF0dXMiOjAsImNyZWF0ZWRfYXQiOjE0MjcxNDQxODUuMCwiaXNfY29ubmVjdGVkIjpmYWxzZSwiaXNfbW9kZXJhdG9yIjpmYWxzZSwiaXNfb3duZXIiOmZhbHNlLCJpc19wdWJsaXNoaW5nIjpmYWxzZSwibWljcm9waG9uZV9nYWluX2xldmVsIjo0MCwicHJldmlld19sb2NhdGlvbiI6bnVsbCwicm9sZSI6IkJBaDdDRWtpRFdWMlpXNTBYMmxrQmpvR1JVWkpJZ3N4TmpNMU1EZ0dPd0JHU1NJTWRYTmxjbDlwWkFZN0FFWnBBeUxBRGtraUMybHpYM1pwY0FZN0FFWkctLWY5NmE0YzhhYzZjMDYzOWNkMDhlNjc1MTVjZmEyN2JjZTBkZTlmMDciLCJzdGFycmVkX2F0IjpudWxsLCJzdHJlYW1fcXVhbGl0eSI6bnVsbCwidXNlciI6eyJhYm91dF9tZSI6bnVsbCwiZmlyc3RfbmFtZSI6IlRhbmlzaGEiLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjp0cnVlLCJsYXN0X25hbWUiOiJUaG9tcHNvbi1iaGFyYXQiLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6InRhbmlzaGEtLTI2IiwiYWx0Ijo5NjY2OTAsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvOTY2NjkwL3RpbGVfMzB4MzAvOTY2NjkwX3Bob3RvLmpwZz8xNDI3MTQzMjU0IiwiaXNfZmIiOnRydWUsInBwdl9hcHByb3ZlZCI6ZmFsc2UsImlzX2FmZmlsaWF0ZSI6ZmFsc2UsImZvbGxvd2luZ19ldmVudHMiOltdLCJpc19sb2NrZWQiOnRydWUsInBsYW5fbmFtZSI6IkJhc2ljIiwiY2FuX2NyZWF0ZV9zcHJlZWNhc3QiOmZhbHNlLCJhbGxvd19mcmllbmRfcmVxdWVzdHMiOnRydWUsInByb3Bvc2VkX3Byb21vdGlvbiI6MCwicHJvZHVjZXIiOmZhbHNlLCJicm9hZGNhc3Rfc3RhdHVzIjowLCJpc19wdWJsaXNoaW5nIjpmYWxzZSwiaXNfY29ubmVjdGVkIjpmYWxzZSwib3duZXIiOmZhbHNlLCJhY3Rpb24iOm51bGwsImlzX2Jhbm5lZCI6ZmFsc2UsInByZXZpZXdfbG9jYXRpb24iOm51bGwsInJvbGUiOiJCQWg3Q0VraURXVjJaVzUwWDJsa0Jqb0dSVVpKSWdzeE5qTTFNRGdHT3dCR1NTSU1kWE5sY2w5cFpBWTdBRVpwQXlMQURra2lDMmx6WDNacGNBWTdBRVpHLS1mOTZhNGM4YWM2YzA2MzljZDA4ZTY3NTE1Y2ZhMjdiY2UwZGU5ZjA3IiwibWljcm9waG9uZV9nYWluX2xldmVsIjo0MCwic3RhcnJlZF9hdCI6bnVsbCwidmNhdCI6bnVsbCwiY2FwYWJpbGl0aWVzIjp7fSwiZGV2aWNlIjoid2ViIn19LHsiYWN0aW9uIjpudWxsLCJicm9hZGNhc3Rfc3RhdHVzIjowLCJjcmVhdGVkX2F0IjoxNDI3MTYwMjc2LjAsImlzX2Nvbm5lY3RlZCI6ZmFsc2UsImlzX21vZGVyYXRvciI6ZmFsc2UsImlzX293bmVyIjpmYWxzZSwiaXNfcHVibGlzaGluZyI6ZmFsc2UsIm1pY3JvcGhvbmVfZ2Fpbl9sZXZlbCI6NDAsInByZXZpZXdfbG9jYXRpb24iOm51bGwsInJvbGUiOiJCQWg3Q0VraURXVjJaVzUwWDJsa0Jqb0dSVVpKSWdzeE5qTTFNRGdHT3dCR1NTSU1kWE5sY2w5cFpBWTdBRVpwQTVuQURra2lDMmx6WDNacGNBWTdBRVpHLS03OTgyYzNhMjIyZGRmMGNhMWQwNjU4NGEzYmI4ZjJhMjExMDUwZTNiIiwic3RhcnJlZF9hdCI6bnVsbCwic3RyZWFtX3F1YWxpdHkiOm51bGwsInVzZXIiOnsiYWJvdXRfbWUiOm51bGwsImZpcnN0X25hbWUiOiJNaXJhbmRhIiwiaGFzX2JlZW5fYXV0aGVudGljYXRlZCI6dHJ1ZSwibGFzdF9uYW1lIjoiRGFzcyIsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJ1c2VyX2lkIjoibWlyYW5kYS0tOTQiLCJhbHQiOjk2NjgwOSwiYWRtaW4iOmZhbHNlLCJjb250ZW50X21vZCI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiLy9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1waG90b3MvcHJvZHVjdGlvbi91c2Vycy85NjY4MDkvdGlsZV8zMHgzMC85NjY4MDlfcGhvdG8uanBnPzE0MjcxNjAyNTkiLCJpc19mYiI6dHJ1ZSwicHB2X2FwcHJvdmVkIjpmYWxzZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6W10sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiQmFzaWMiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6ZmFsc2UsImFsbG93X2ZyaWVuZF9yZXF1ZXN0cyI6dHJ1ZSwicHJvcG9zZWRfcHJvbW90aW9uIjowLCJwcm9kdWNlciI6ZmFsc2UsImJyb2FkY2FzdF9zdGF0dXMiOjAsImlzX3B1Ymxpc2hpbmciOmZhbHNlLCJpc19jb25uZWN0ZWQiOmZhbHNlLCJvd25lciI6ZmFsc2UsImFjdGlvbiI6bnVsbCwiaXNfYmFubmVkIjpmYWxzZSwicHJldmlld19sb2NhdGlvbiI6bnVsbCwicm9sZSI6IkJBaDdDRWtpRFdWMlpXNTBYMmxrQmpvR1JVWkpJZ3N4TmpNMU1EZ0dPd0JHU1NJTWRYTmxjbDlwWkFZN0FFWnBBNW5BRGtraUMybHpYM1pwY0FZN0FFWkctLTc5ODJjM2EyMjJkZGYwY2ExZDA2NTg0YTNiYjhmMmEyMTEwNTBlM2IiLCJtaWNyb3Bob25lX2dhaW5fbGV2ZWwiOjQwLCJzdGFycmVkX2F0IjpudWxsLCJ2Y2F0IjpudWxsLCJjYXBhYmlsaXRpZXMiOnt9LCJkZXZpY2UiOiJhbmRyb2lkX3QifX0seyJhY3Rpb24iOm51bGwsImJyb2FkY2FzdF9zdGF0dXMiOjAsImNyZWF0ZWRfYXQiOjE0MjcxNjY0MzIuMCwiaXNfY29ubmVjdGVkIjpmYWxzZSwiaXNfbW9kZXJhdG9yIjpmYWxzZSwiaXNfb3duZXIiOmZhbHNlLCJpc19wdWJsaXNoaW5nIjpmYWxzZSwibWljcm9waG9uZV9nYWluX2xldmVsIjo0MCwicHJldmlld19sb2NhdGlvbiI6bnVsbCwicm9sZSI6IkJBaDdDRWtpRFdWMlpXNTBYMmxrQmpvR1JVWkpJZ3N4TmpNMU1EZ0dPd0JHU1NJTWRYTmxjbDlwWkFZN0FFWnBBN0RBRGtraUMybHpYM1pwY0FZN0FFWkctLWNiNzIxYWY1YTM3ZjhjMTU3NWY0MDI2ZTFjMzZiMDJlMWJiYTVlMTUiLCJzdGFycmVkX2F0IjpudWxsLCJzdHJlYW1fcXVhbGl0eSI6bnVsbCwidXNlciI6eyJhYm91dF9tZSI6bnVsbCwiZmlyc3RfbmFtZSI6IkNhcm9sLUFubiIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IkZyb250aW4gRGUgUGVhemEiLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6ImNhcm9sLWFubi0tOCIsImFsdCI6OTY2ODMyLCJhZG1pbiI6ZmFsc2UsImNvbnRlbnRfbW9kIjpmYWxzZSwicHJvZmlsZV9waG90b190aHVtYl91cmwiOiIvL3MzLmFtYXpvbmF3cy5jb20vc3ByZWVjYXN0LXBob3Rvcy9wcm9kdWN0aW9uL3VzZXJzLzk2NjgzMi90aWxlXzMweDMwLzk2NjgzMl9waG90by5qcGc/MTQyNzE2NjQyNCIsImlzX2ZiIjp0cnVlLCJwcHZfYXBwcm92ZWQiOmZhbHNlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbXSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJCYXNpYyIsImNhbl9jcmVhdGVfc3ByZWVjYXN0IjpmYWxzZSwiYWxsb3dfZnJpZW5kX3JlcXVlc3RzIjp0cnVlLCJwcm9wb3NlZF9wcm9tb3Rpb24iOjAsInByb2R1Y2VyIjpmYWxzZSwiYnJvYWRjYXN0X3N0YXR1cyI6MCwiaXNfcHVibGlzaGluZyI6ZmFsc2UsImlzX2Nvbm5lY3RlZCI6ZmFsc2UsIm93bmVyIjpmYWxzZSwiYWN0aW9uIjpudWxsLCJpc19iYW5uZWQiOmZhbHNlLCJwcmV2aWV3X2xvY2F0aW9uIjpudWxsLCJyb2xlIjoiQkFoN0NFa2lEV1YyWlc1MFgybGtCam9HUlVaSklnc3hOak0xTURnR093QkdTU0lNZFhObGNsOXBaQVk3QUVacEE3REFEa2tpQzJselgzWnBjQVk3QUVaRy0tY2I3MjFhZjVhMzdmOGMxNTc1ZjQwMjZlMWMzNmIwMmUxYmJhNWUxNSIsIm1pY3JvcGhvbmVfZ2Fpbl9sZXZlbCI6NDAsInN0YXJyZWRfYXQiOm51bGwsInZjYXQiOm51bGwsImNhcGFiaWxpdGllcyI6e30sImRldmljZSI6IndlYiJ9fSx7ImFjdGlvbiI6bnVsbCwiYnJvYWRjYXN0X3N0YXR1cyI6MCwiY3JlYXRlZF9hdCI6MTQyNzIwNzg3NS4wLCJpc19jb25uZWN0ZWQiOmZhbHNlLCJpc19tb2RlcmF0b3IiOmZhbHNlLCJpc19vd25lciI6ZmFsc2UsImlzX3B1Ymxpc2hpbmciOmZhbHNlLCJtaWNyb3Bob25lX2dhaW5fbGV2ZWwiOjQwLCJwcmV2aWV3X2xvY2F0aW9uIjpudWxsLCJyb2xlIjoiQkFoN0NFa2lEV1YyWlc1MFgybGtCam9HUlVaSklnc3hOak0xTURnR093QkdTU0lNZFhObGNsOXBaQVk3QUVacEF5dTdEa2tpQzJselgzWnBjQVk3QUVaRy0tNGQ0NDJhYzg5MmNjZjlhMzZmZDU0MTYxNDRlOWVkNDliYmRlMzgzNCIsInN0YXJyZWRfYXQiOm51bGwsInN0cmVhbV9xdWFsaXR5IjpudWxsLCJ1c2VyIjp7ImFib3V0X21lIjpudWxsLCJmaXJzdF9uYW1lIjoiSGFsbGUiLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjp0cnVlLCJsYXN0X25hbWUiOiJMZXdpcyIsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJ1c2VyX2lkIjoiaGFsbGUtLTEwIiwiYWx0Ijo5NjU0MTksImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvOTY1NDE5L3RpbGVfMzB4MzAvOTY1NDE5X3Bob3RvLmpwZz8xNDI2NzkwOTgyIiwiaXNfZmIiOnRydWUsInBwdl9hcHByb3ZlZCI6ZmFsc2UsImlzX2FmZmlsaWF0ZSI6ZmFsc2UsImZvbGxvd2luZ19ldmVudHMiOltdLCJpc19sb2NrZWQiOnRydWUsInBsYW5fbmFtZSI6IkJhc2ljIiwiY2FuX2NyZWF0ZV9zcHJlZWNhc3QiOmZhbHNlLCJhbGxvd19mcmllbmRfcmVxdWVzdHMiOnRydWUsInByb3Bvc2VkX3Byb21vdGlvbiI6MCwicHJvZHVjZXIiOmZhbHNlLCJicm9hZGNhc3Rfc3RhdHVzIjowLCJpc19wdWJsaXNoaW5nIjpmYWxzZSwiaXNfY29ubmVjdGVkIjpmYWxzZSwib3duZXIiOmZhbHNlLCJhY3Rpb24iOm51bGwsImlzX2Jhbm5lZCI6ZmFsc2UsInByZXZpZXdfbG9jYXRpb24iOm51bGwsInJvbGUiOiJCQWg3Q0VraURXVjJaVzUwWDJsa0Jqb0dSVVpKSWdzeE5qTTFNRGdHT3dCR1NTSU1kWE5sY2w5cFpBWTdBRVpwQXl1N0Rra2lDMmx6WDNacGNBWTdBRVpHLS00ZDQ0MmFjODkyY2NmOWEzNmZkNTQxNjE0NGU5ZWQ0OWJiZGUzODM0IiwibWljcm9waG9uZV9nYWluX2xldmVsIjo0MCwic3RhcnJlZF9hdCI6bnVsbCwidmNhdCI6bnVsbCwiY2FwYWJpbGl0aWVzIjp7ImJyb2FkY2FzdCI6InRydWUiLCJyb29tIjoidHJ1ZSJ9LCJkZXZpY2UiOiJ3ZWIifX0seyJhY3Rpb24iOm51bGwsImJyb2FkY2FzdF9zdGF0dXMiOjIsImNyZWF0ZWRfYXQiOjE0MjcyMDg5NDUuMCwiaXNfY29ubmVjdGVkIjpmYWxzZSwiaXNfbW9kZXJhdG9yIjpmYWxzZSwiaXNfb3duZXIiOmZhbHNlLCJpc19wdWJsaXNoaW5nIjpmYWxzZSwibWljcm9waG9uZV9nYWluX2xldmVsIjo1NiwicHJldmlld19sb2NhdGlvbiI6bnVsbCwicm9sZSI6IkJBaDdDRWtpRFdWMlpXNTBYMmxrQmpvR1JVWkpJZ3N4TmpNMU1EZ0dPd0JHU1NJTWRYTmxjbDlwWkFZN0FFWnBBL3ZBRGtraUMybHpYM1pwY0FZN0FFWkctLTdjY2RkOTNiNDI5ZWEyNzZmMmM3MzYwYTUzMjUyM2IyN2FmNmY1NmQiLCJzdGFycmVkX2F0IjpudWxsLCJzdHJlYW1fcXVhbGl0eSI6bnVsbCwidXNlciI6eyJhYm91dF9tZSI6IiIsImZpcnN0X25hbWUiOiJBcmNoYmlzaG9wSGFycmlzIiwiaGFzX2JlZW5fYXV0aGVudGljYXRlZCI6dHJ1ZSwibGFzdF9uYW1lIjoiIiwibmVlZHNfdG9fY29uZmlybV9lbWFpbCI6ZmFsc2UsInVzZXJfaWQiOiJhcmNoYmlzaG9waGFycmlzIiwiYWx0Ijo5NjY5MDcsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvOTY2OTA3L3RpbGVfMzB4MzAvOTY2OTA3X3Bob3RvLmpwZz8xNDI3MjExNzUzIiwiaXNfZmIiOmZhbHNlLCJwcHZfYXBwcm92ZWQiOmZhbHNlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbXSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJCYXNpYyIsImNhbl9jcmVhdGVfc3ByZWVjYXN0IjpmYWxzZSwiYWxsb3dfZnJpZW5kX3JlcXVlc3RzIjp0cnVlLCJwcm9wb3NlZF9wcm9tb3Rpb24iOjAsInByb2R1Y2VyIjpmYWxzZSwiYnJvYWRjYXN0X3N0YXR1cyI6MiwiaXNfcHVibGlzaGluZyI6ZmFsc2UsImlzX2Nvbm5lY3RlZCI6ZmFsc2UsIm93bmVyIjpmYWxzZSwiYWN0aW9uIjpudWxsLCJpc19iYW5uZWQiOmZhbHNlLCJwcmV2aWV3X2xvY2F0aW9uIjpudWxsLCJyb2xlIjoiQkFoN0NFa2lEV1YyWlc1MFgybGtCam9HUlVaSklnc3hOak0xTURnR093QkdTU0lNZFhObGNsOXBaQVk3QUVacEEvdkFEa2tpQzJselgzWnBjQVk3QUVaRy0tN2NjZGQ5M2I0MjllYTI3NmYyYzczNjBhNTMyNTIzYjI3YWY2ZjU2ZCIsIm1pY3JvcGhvbmVfZ2Fpbl9sZXZlbCI6NTYsInN0YXJyZWRfYXQiOm51bGwsInZjYXQiOm51bGwsImNhcGFiaWxpdGllcyI6e30sImRldmljZSI6IndlYiJ9fSx7ImFjdGlvbiI6bnVsbCwiYnJvYWRjYXN0X3N0YXR1cyI6MCwiY3JlYXRlZF9hdCI6MTQyNzIwOTU5NS4wLCJpc19jb25uZWN0ZWQiOmZhbHNlLCJpc19tb2RlcmF0b3IiOmZhbHNlLCJpc19vd25lciI6ZmFsc2UsImlzX3B1Ymxpc2hpbmciOmZhbHNlLCJtaWNyb3Bob25lX2dhaW5fbGV2ZWwiOjQwLCJwcmV2aWV3X2xvY2F0aW9uIjpudWxsLCJyb2xlIjoiQkFoN0NFa2lEV1YyWlc1MFgybGtCam9HUlVaSklnc3hOak0xTURnR093QkdTU0lNZFhObGNsOXBaQVk3QUVacEEvM0FEa2tpQzJselgzWnBjQVk3QUVaRy0tOWMxNDE4NmI4ZWQ1MTc1MWY5ZDI0NWI1ZTU2ZmJjZjY0ZjkxOTlhYyIsInN0YXJyZWRfYXQiOm51bGwsInN0cmVhbV9xdWFsaXR5IjpudWxsLCJ1c2VyIjp7ImFib3V0X21lIjpudWxsLCJmaXJzdF9uYW1lIjoiS2F0aGxlZW4iLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjp0cnVlLCJsYXN0X25hbWUiOiJNYWhhcmFqIiwibmVlZHNfdG9fY29uZmlybV9lbWFpbCI6ZmFsc2UsInVzZXJfaWQiOiJrYXRobGVlbi0tMTcxIiwiYWx0Ijo5NjY5MDksImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvOTY2OTA5L3RpbGVfMzB4MzAvOTY2OTA5X3Bob3RvLmpwZz8xNDI3MjA5NTkxIiwiaXNfZmIiOnRydWUsInBwdl9hcHByb3ZlZCI6ZmFsc2UsImlzX2FmZmlsaWF0ZSI6ZmFsc2UsImZvbGxvd2luZ19ldmVudHMiOltdLCJpc19sb2NrZWQiOnRydWUsInBsYW5fbmFtZSI6IkJhc2ljIiwiY2FuX2NyZWF0ZV9zcHJlZWNhc3QiOmZhbHNlLCJhbGxvd19mcmllbmRfcmVxdWVzdHMiOnRydWUsInByb3Bvc2VkX3Byb21vdGlvbiI6MCwicHJvZHVjZXIiOmZhbHNlLCJicm9hZGNhc3Rfc3RhdHVzIjowLCJpc19wdWJsaXNoaW5nIjpmYWxzZSwiaXNfY29ubmVjdGVkIjpmYWxzZSwib3duZXIiOmZhbHNlLCJhY3Rpb24iOm51bGwsImlzX2Jhbm5lZCI6ZmFsc2UsInByZXZpZXdfbG9jYXRpb24iOm51bGwsInJvbGUiOiJCQWg3Q0VraURXVjJaVzUwWDJsa0Jqb0dSVVpKSWdzeE5qTTFNRGdHT3dCR1NTSU1kWE5sY2w5cFpBWTdBRVpwQS8zQURra2lDMmx6WDNacGNBWTdBRVpHLS05YzE0MTg2YjhlZDUxNzUxZjlkMjQ1YjVlNTZmYmNmNjRmOTE5OWFjIiwibWljcm9waG9uZV9nYWluX2xldmVsIjo0MCwic3RhcnJlZF9hdCI6bnVsbCwidmNhdCI6bnVsbCwiY2FwYWJpbGl0aWVzIjp7fSwiZGV2aWNlIjoid2ViIn19LHsiYWN0aW9uIjpudWxsLCJicm9hZGNhc3Rfc3RhdHVzIjowLCJjcmVhdGVkX2F0IjoxNDI3MjExMDI4LjAsImlzX2Nvbm5lY3RlZCI6ZmFsc2UsImlzX21vZGVyYXRvciI6ZmFsc2UsImlzX293bmVyIjpmYWxzZSwiaXNfcHVibGlzaGluZyI6ZmFsc2UsIm1pY3JvcGhvbmVfZ2Fpbl9sZXZlbCI6NDAsInByZXZpZXdfbG9jYXRpb24iOm51bGwsInJvbGUiOiJCQWg3Q0VraURXVjJaVzUwWDJsa0Jqb0dSVVpKSWdzeE5qTTFNRGdHT3dCR1NTSU1kWE5sY2w5cFpBWTdBRVpwQXdUQkRra2lDMmx6WDNacGNBWTdBRVpHLS1hM2Q4M2Q3YTUwNWI3ZTkxNTQ3ZmQ3NGI4NmM2OTVmMTZiYzQxNjE0Iiwic3RhcnJlZF9hdCI6bnVsbCwic3RyZWFtX3F1YWxpdHkiOm51bGwsInVzZXIiOnsiYWJvdXRfbWUiOm51bGwsImZpcnN0X25hbWUiOiJEb25uYU1hZSIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IkdyZWF2ZXMiLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6ImRvbm5hbWFlIiwiYWx0Ijo5NjY5MTYsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvOTY2OTE2L3RpbGVfMzB4MzAvOTY2OTE2X3Bob3RvLmpwZz8xNDI3MjExMDIzIiwiaXNfZmIiOnRydWUsInBwdl9hcHByb3ZlZCI6ZmFsc2UsImlzX2FmZmlsaWF0ZSI6ZmFsc2UsImZvbGxvd2luZ19ldmVudHMiOltdLCJpc19sb2NrZWQiOnRydWUsInBsYW5fbmFtZSI6IkJhc2ljIiwiY2FuX2NyZWF0ZV9zcHJlZWNhc3QiOmZhbHNlLCJhbGxvd19mcmllbmRfcmVxdWVzdHMiOnRydWUsInByb3Bvc2VkX3Byb21vdGlvbiI6MCwicHJvZHVjZXIiOmZhbHNlLCJicm9hZGNhc3Rfc3RhdHVzIjowLCJpc19wdWJsaXNoaW5nIjpmYWxzZSwiaXNfY29ubmVjdGVkIjpmYWxzZSwib3duZXIiOmZhbHNlLCJhY3Rpb24iOm51bGwsImlzX2Jhbm5lZCI6ZmFsc2UsInByZXZpZXdfbG9jYXRpb24iOm51bGwsInJvbGUiOiJCQWg3Q0VraURXVjJaVzUwWDJsa0Jqb0dSVVpKSWdzeE5qTTFNRGdHT3dCR1NTSU1kWE5sY2w5cFpBWTdBRVpwQXdUQkRra2lDMmx6WDNacGNBWTdBRVpHLS1hM2Q4M2Q3YTUwNWI3ZTkxNTQ3ZmQ3NGI4NmM2OTVmMTZiYzQxNjE0IiwibWljcm9waG9uZV9nYWluX2xldmVsIjo0MCwic3RhcnJlZF9hdCI6bnVsbCwidmNhdCI6bnVsbCwiY2FwYWJpbGl0aWVzIjp7ImJyb2FkY2FzdCI6InRydWUiLCJyb29tIjoidHJ1ZSJ9LCJkZXZpY2UiOiJ3ZWIifX0seyJhY3Rpb24iOm51bGwsImJyb2FkY2FzdF9zdGF0dXMiOjAsImNyZWF0ZWRfYXQiOjE0MjcyMTE0OTAuMCwiaXNfY29ubmVjdGVkIjpmYWxzZSwiaXNfbW9kZXJhdG9yIjpmYWxzZSwiaXNfb3duZXIiOmZhbHNlLCJpc19wdWJsaXNoaW5nIjpmYWxzZSwibWljcm9waG9uZV9nYWluX2xldmVsIjo0MCwicHJldmlld19sb2NhdGlvbiI6bnVsbCwicm9sZSI6IkJBaDdDRWtpRFdWMlpXNTBYMmxrQmpvR1JVWkpJZ3N4TmpNMU1EZ0dPd0JHU1NJTWRYTmxjbDlwWkFZN0FFWnBBd2pCRGtraUMybHpYM1pwY0FZN0FFWkctLTYxYzVkYzlmZTczZTJiY2Q2Zjk5Zjk5M2M4Mzc4Mjg3YzViN2VjMzgiLCJzdGFycmVkX2F0IjpudWxsLCJzdHJlYW1fcXVhbGl0eSI6bnVsbCwidXNlciI6eyJhYm91dF9tZSI6bnVsbCwiZmlyc3RfbmFtZSI6IkRhcnJlbGwiLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjp0cnVlLCJsYXN0X25hbWUiOiJCZXJlYXV4IiwibmVlZHNfdG9fY29uZmlybV9lbWFpbCI6ZmFsc2UsInVzZXJfaWQiOiJkYXJyZWxsLS0yNCIsImFsdCI6OTY2OTIwLCJhZG1pbiI6ZmFsc2UsImNvbnRlbnRfbW9kIjpmYWxzZSwicHJvZmlsZV9waG90b190aHVtYl91cmwiOiIvL3MzLmFtYXpvbmF3cy5jb20vc3ByZWVjYXN0LXBob3Rvcy9wcm9kdWN0aW9uL3VzZXJzLzk2NjkyMC90aWxlXzMweDMwLzk2NjkyMF9waG90by5qcGc/MTQyNzIxMTQ4NiIsImlzX2ZiIjp0cnVlLCJwcHZfYXBwcm92ZWQiOmZhbHNlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbXSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJCYXNpYyIsImNhbl9jcmVhdGVfc3ByZWVjYXN0IjpmYWxzZSwiYWxsb3dfZnJpZW5kX3JlcXVlc3RzIjp0cnVlLCJwcm9wb3NlZF9wcm9tb3Rpb24iOjAsInByb2R1Y2VyIjpmYWxzZSwiYnJvYWRjYXN0X3N0YXR1cyI6MCwiaXNfcHVibGlzaGluZyI6ZmFsc2UsImlzX2Nvbm5lY3RlZCI6ZmFsc2UsIm93bmVyIjpmYWxzZSwiYWN0aW9uIjpudWxsLCJpc19iYW5uZWQiOmZhbHNlLCJwcmV2aWV3X2xvY2F0aW9uIjpudWxsLCJyb2xlIjoiQkFoN0NFa2lEV1YyWlc1MFgybGtCam9HUlVaSklnc3hOak0xTURnR093QkdTU0lNZFhObGNsOXBaQVk3QUVacEF3akJEa2tpQzJselgzWnBjQVk3QUVaRy0tNjFjNWRjOWZlNzNlMmJjZDZmOTlmOTkzYzgzNzgyODdjNWI3ZWMzOCIsIm1pY3JvcGhvbmVfZ2Fpbl9sZXZlbCI6NDAsInN0YXJyZWRfYXQiOm51bGwsInZjYXQiOm51bGwsImNhcGFiaWxpdGllcyI6eyJicm9hZGNhc3QiOiJ0cnVlIiwicm9vbSI6InRydWUifSwiZGV2aWNlIjoid2ViIn19LHsiYWN0aW9uIjpudWxsLCJicm9hZGNhc3Rfc3RhdHVzIjowLCJjcmVhdGVkX2F0IjoxNDI3MjEyODYzLjAsImlzX2Nvbm5lY3RlZCI6ZmFsc2UsImlzX21vZGVyYXRvciI6ZmFsc2UsImlzX293bmVyIjpmYWxzZSwiaXNfcHVibGlzaGluZyI6ZmFsc2UsIm1pY3JvcGhvbmVfZ2Fpbl9sZXZlbCI6NDAsInByZXZpZXdfbG9jYXRpb24iOm51bGwsInJvbGUiOiJCQWg3Q0VraURXVjJaVzUwWDJsa0Jqb0dSVVpKSWdzeE5qTTFNRGdHT3dCR1NTSU1kWE5sY2w5cFpBWTdBRVpwQXhEQkRra2lDMmx6WDNacGNBWTdBRVpHLS01MTkxN2RhMTBmOGMxOWJkNjVjZGFjNjllMTNhODY3YmMxMzYzZTcxIiwic3RhcnJlZF9hdCI6bnVsbCwic3RyZWFtX3F1YWxpdHkiOm51bGwsInVzZXIiOnsiYWJvdXRfbWUiOm51bGwsImZpcnN0X25hbWUiOiJQYXVsaW5lIiwiaGFzX2JlZW5fYXV0aGVudGljYXRlZCI6dHJ1ZSwibGFzdF9uYW1lIjoiUGhlbHBzIiwibmVlZHNfdG9fY29uZmlybV9lbWFpbCI6ZmFsc2UsInVzZXJfaWQiOiJwYXVsaW5lLS00MyIsImFsdCI6OTY2OTI4LCJhZG1pbiI6ZmFsc2UsImNvbnRlbnRfbW9kIjpmYWxzZSwicHJvZmlsZV9waG90b190aHVtYl91cmwiOiIvL3MzLmFtYXpvbmF3cy5jb20vc3ByZWVjYXN0LXBob3Rvcy9wcm9kdWN0aW9uL3VzZXJzLzk2NjkyOC90aWxlXzMweDMwLzk2NjkyOF9waG90by5qcGc/MTQyNzIxMjg1NyIsImlzX2ZiIjp0cnVlLCJwcHZfYXBwcm92ZWQiOmZhbHNlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbXSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJCYXNpYyIsImNhbl9jcmVhdGVfc3ByZWVjYXN0IjpmYWxzZSwiYWxsb3dfZnJpZW5kX3JlcXVlc3RzIjp0cnVlLCJwcm9wb3NlZF9wcm9tb3Rpb24iOjAsInByb2R1Y2VyIjpmYWxzZSwiYnJvYWRjYXN0X3N0YXR1cyI6MCwiaXNfcHVibGlzaGluZyI6ZmFsc2UsImlzX2Nvbm5lY3RlZCI6ZmFsc2UsIm93bmVyIjpmYWxzZSwiYWN0aW9uIjpudWxsLCJpc19iYW5uZWQiOmZhbHNlLCJwcmV2aWV3X2xvY2F0aW9uIjpudWxsLCJyb2xlIjoiQkFoN0NFa2lEV1YyWlc1MFgybGtCam9HUlVaSklnc3hOak0xTURnR093QkdTU0lNZFhObGNsOXBaQVk3QUVacEF4REJEa2tpQzJselgzWnBjQVk3QUVaRy0tNTE5MTdkYTEwZjhjMTliZDY1Y2RhYzY5ZTEzYTg2N2JjMTM2M2U3MSIsIm1pY3JvcGhvbmVfZ2Fpbl9sZXZlbCI6NDAsInN0YXJyZWRfYXQiOm51bGwsInZjYXQiOm51bGwsImNhcGFiaWxpdGllcyI6e30sImRldmljZSI6IndlYiJ9fSx7ImFjdGlvbiI6bnVsbCwiYnJvYWRjYXN0X3N0YXR1cyI6MiwiY3JlYXRlZF9hdCI6MTQyNzIxMjk2Ni4wLCJpc19jb25uZWN0ZWQiOmZhbHNlLCJpc19tb2RlcmF0b3IiOmZhbHNlLCJpc19vd25lciI6ZmFsc2UsImlzX3B1Ymxpc2hpbmciOmZhbHNlLCJtaWNyb3Bob25lX2dhaW5fbGV2ZWwiOjQwLCJwcmV2aWV3X2xvY2F0aW9uIjpudWxsLCJyb2xlIjoiQkFoN0NFa2lEV1YyWlc1MFgybGtCam9HUlVaSklnc3hOak0xTURnR093QkdTU0lNZFhObGNsOXBaQVk3QUVacEE2dS9Ea2tpQzJselgzWnBjQVk3QUVaRy0tNTI5ODQ3YjNkOGM3YzJmMTQyNTE0Y2IwYmU5ZjcxMDQ3NWQ2OWRkMyIsInN0YXJyZWRfYXQiOm51bGwsInN0cmVhbV9xdWFsaXR5IjpudWxsLCJ1c2VyIjp7ImFib3V0X21lIjpudWxsLCJmaXJzdF9uYW1lIjoiRW5vcyIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IkFuZGVyc29uIiwibmVlZHNfdG9fY29uZmlybV9lbWFpbCI6ZmFsc2UsInVzZXJfaWQiOiJlbm9zIiwiYWx0Ijo5NjY1NzEsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvOTY2NTcxL3RpbGVfMzB4MzAvOTY2NTcxX3Bob3RvLmpwZz8xNDI3MTIyODI3IiwiaXNfZmIiOnRydWUsInBwdl9hcHByb3ZlZCI6ZmFsc2UsImlzX2FmZmlsaWF0ZSI6ZmFsc2UsImZvbGxvd2luZ19ldmVudHMiOltdLCJpc19sb2NrZWQiOnRydWUsInBsYW5fbmFtZSI6IkJhc2ljIiwiY2FuX2NyZWF0ZV9zcHJlZWNhc3QiOmZhbHNlLCJhbGxvd19mcmllbmRfcmVxdWVzdHMiOnRydWUsInByb3Bvc2VkX3Byb21vdGlvbiI6MCwicHJvZHVjZXIiOmZhbHNlLCJicm9hZGNhc3Rfc3RhdHVzIjoyLCJpc19wdWJsaXNoaW5nIjpmYWxzZSwiaXNfY29ubmVjdGVkIjpmYWxzZSwib3duZXIiOmZhbHNlLCJhY3Rpb24iOm51bGwsImlzX2Jhbm5lZCI6ZmFsc2UsInByZXZpZXdfbG9jYXRpb24iOm51bGwsInJvbGUiOiJCQWg3Q0VraURXVjJaVzUwWDJsa0Jqb0dSVVpKSWdzeE5qTTFNRGdHT3dCR1NTSU1kWE5sY2w5cFpBWTdBRVpwQTZ1L0Rra2lDMmx6WDNacGNBWTdBRVpHLS01Mjk4NDdiM2Q4YzdjMmYxNDI1MTRjYjBiZTlmNzEwNDc1ZDY5ZGQzIiwibWljcm9waG9uZV9nYWluX2xldmVsIjo0MCwic3RhcnJlZF9hdCI6bnVsbCwidmNhdCI6bnVsbCwiY2FwYWJpbGl0aWVzIjp7fSwiZGV2aWNlIjoid2ViIn19LHsiYWN0aW9uIjpudWxsLCJicm9hZGNhc3Rfc3RhdHVzIjowLCJjcmVhdGVkX2F0IjoxNDI3MjEzNDIzLjAsImlzX2Nvbm5lY3RlZCI6ZmFsc2UsImlzX21vZGVyYXRvciI6ZmFsc2UsImlzX293bmVyIjpmYWxzZSwiaXNfcHVibGlzaGluZyI6ZmFsc2UsIm1pY3JvcGhvbmVfZ2Fpbl9sZXZlbCI6NDAsInByZXZpZXdfbG9jYXRpb24iOm51bGwsInJvbGUiOiJCQWg3Q0VraURXVjJaVzUwWDJsa0Jqb0dSVVpKSWdzeE5qTTFNRGdHT3dCR1NTSU1kWE5sY2w5cFpBWTdBRVpwQXhiQkRra2lDMmx6WDNacGNBWTdBRVpHLS0xMjA5ZGIwNGI5YWRkNDlkN2ZjOGQ2NjE5MjllYzA1ZGE1NTgzN2JjIiwic3RhcnJlZF9hdCI6bnVsbCwic3RyZWFtX3F1YWxpdHkiOm51bGwsInVzZXIiOnsiYWJvdXRfbWUiOiIiLCJmaXJzdF9uYW1lIjoiRHJld1BlYWNvY2siLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjp0cnVlLCJsYXN0X25hbWUiOiIiLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6ImRyZXdwZWFjb2NrIiwiYWx0Ijo5NjY5MzQsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii9wcm9maWxlX3Bob3Rvcy90aWxlXzMweDMwL25vcHJvZmlsZS5wbmciLCJpc19mYiI6ZmFsc2UsInBwdl9hcHByb3ZlZCI6ZmFsc2UsImlzX2FmZmlsaWF0ZSI6ZmFsc2UsImZvbGxvd2luZ19ldmVudHMiOltdLCJpc19sb2NrZWQiOnRydWUsInBsYW5fbmFtZSI6IkJhc2ljIiwiY2FuX2NyZWF0ZV9zcHJlZWNhc3QiOmZhbHNlLCJhbGxvd19mcmllbmRfcmVxdWVzdHMiOnRydWUsInByb3Bvc2VkX3Byb21vdGlvbiI6MCwicHJvZHVjZXIiOmZhbHNlLCJicm9hZGNhc3Rfc3RhdHVzIjowLCJpc19wdWJsaXNoaW5nIjpmYWxzZSwiaXNfY29ubmVjdGVkIjpmYWxzZSwib3duZXIiOmZhbHNlLCJhY3Rpb24iOm51bGwsImlzX2Jhbm5lZCI6ZmFsc2UsInByZXZpZXdfbG9jYXRpb24iOm51bGwsInJvbGUiOiJCQWg3Q0VraURXVjJaVzUwWDJsa0Jqb0dSVVpKSWdzeE5qTTFNRGdHT3dCR1NTSU1kWE5sY2w5cFpBWTdBRVpwQXhiQkRra2lDMmx6WDNacGNBWTdBRVpHLS0xMjA5ZGIwNGI5YWRkNDlkN2ZjOGQ2NjE5MjllYzA1ZGE1NTgzN2JjIiwibWljcm9waG9uZV9nYWluX2xldmVsIjo0MCwic3RhcnJlZF9hdCI6bnVsbCwidmNhdCI6bnVsbCwiY2FwYWJpbGl0aWVzIjp7ImJyb2FkY2FzdCI6InRydWUiLCJyb29tIjoidHJ1ZSJ9LCJkZXZpY2UiOiJ3ZWIifX0seyJhY3Rpb24iOm51bGwsImJyb2FkY2FzdF9zdGF0dXMiOjAsImNyZWF0ZWRfYXQiOjE0MjcyMTM0NDMuMCwiaXNfY29ubmVjdGVkIjpmYWxzZSwiaXNfbW9kZXJhdG9yIjpmYWxzZSwiaXNfb3duZXIiOmZhbHNlLCJpc19wdWJsaXNoaW5nIjpmYWxzZSwibWljcm9waG9uZV9nYWluX2xldmVsIjo0MCwicHJldmlld19sb2NhdGlvbiI6bnVsbCwicm9sZSI6IkJBaDdDRWtpRFdWMlpXNTBYMmxrQmpvR1JVWkpJZ3N4TmpNMU1EZ0dPd0JHU1NJTWRYTmxjbDlwWkFZN0FFWnBBeUsrRGtraUMybHpYM1pwY0FZN0FFWkctLWQyMjA2OTVmOTZjMTE2NDhlMGJkYTNmZjhiZWE5MWQ1NjhmMWRiYzUiLCJzdGFycmVkX2F0IjpudWxsLCJzdHJlYW1fcXVhbGl0eSI6bnVsbCwidXNlciI6eyJhYm91dF9tZSI6bnVsbCwiZmlyc3RfbmFtZSI6Illhc21pbiIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IkRhdmlzIiwibmVlZHNfdG9fY29uZmlybV9lbWFpbCI6ZmFsc2UsInVzZXJfaWQiOiJ5YXNtaW4tLTM0IiwiYWx0Ijo5NjYxNzgsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvOTY2MTc4L3RpbGVfMzB4MzAvOTY2MTc4X3Bob3RvLmpwZz8xNDI2OTcyMDI5IiwiaXNfZmIiOnRydWUsInBwdl9hcHByb3ZlZCI6ZmFsc2UsImlzX2FmZmlsaWF0ZSI6ZmFsc2UsImZvbGxvd2luZ19ldmVudHMiOltdLCJpc19sb2NrZWQiOnRydWUsInBsYW5fbmFtZSI6IkJhc2ljIiwiY2FuX2NyZWF0ZV9zcHJlZWNhc3QiOmZhbHNlLCJhbGxvd19mcmllbmRfcmVxdWVzdHMiOnRydWUsInByb3Bvc2VkX3Byb21vdGlvbiI6MCwicHJvZHVjZXIiOmZhbHNlLCJicm9hZGNhc3Rfc3RhdHVzIjowLCJpc19wdWJsaXNoaW5nIjpmYWxzZSwiaXNfY29ubmVjdGVkIjpmYWxzZSwib3duZXIiOmZhbHNlLCJhY3Rpb24iOm51bGwsImlzX2Jhbm5lZCI6ZmFsc2UsInByZXZpZXdfbG9jYXRpb24iOm51bGwsInJvbGUiOiJCQWg3Q0VraURXVjJaVzUwWDJsa0Jqb0dSVVpKSWdzeE5qTTFNRGdHT3dCR1NTSU1kWE5sY2w5cFpBWTdBRVpwQXlLK0Rra2lDMmx6WDNacGNBWTdBRVpHLS1kMjIwNjk1Zjk2YzExNjQ4ZTBiZGEzZmY4YmVhOTFkNTY4ZjFkYmM1IiwibWljcm9waG9uZV9nYWluX2xldmVsIjo0MCwic3RhcnJlZF9hdCI6bnVsbCwidmNhdCI6bnVsbCwiY2FwYWJpbGl0aWVzIjp7InJvb20iOiJ0cnVlIn0sImRldmljZSI6ImlvcyJ9fSx7ImFjdGlvbiI6bnVsbCwiYnJvYWRjYXN0X3N0YXR1cyI6MCwiY3JlYXRlZF9hdCI6MTQyNzIxMzQ5My4wLCJpc19jb25uZWN0ZWQiOmZhbHNlLCJpc19tb2RlcmF0b3IiOmZhbHNlLCJpc19vd25lciI6ZmFsc2UsImlzX3B1Ymxpc2hpbmciOmZhbHNlLCJtaWNyb3Bob25lX2dhaW5fbGV2ZWwiOjQwLCJwcmV2aWV3X2xvY2F0aW9uIjpudWxsLCJyb2xlIjoiQkFoN0NFa2lEV1YyWlc1MFgybGtCam9HUlVaSklnc3hOak0xTURnR093QkdTU0lNZFhObGNsOXBaQVk3QUVacEF4akJEa2tpQzJselgzWnBjQVk3QUVaRy0tOGQ3MmE3ODQ0NWQyNGI1YTQ0NjY5YjRlMjFjOGE2ZWQ5MmM4MmUyNiIsInN0YXJyZWRfYXQiOm51bGwsInN0cmVhbV9xdWFsaXR5IjpudWxsLCJ1c2VyIjp7ImFib3V0X21lIjpudWxsLCJmaXJzdF9uYW1lIjoiQ2FtaWxsZSIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IkNhcmFzcXVlcm8iLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6ImNhbWlsbGUtLTEwMyIsImFsdCI6OTY2OTM2LCJhZG1pbiI6ZmFsc2UsImNvbnRlbnRfbW9kIjpmYWxzZSwicHJvZmlsZV9waG90b190aHVtYl91cmwiOiIvL3MzLmFtYXpvbmF3cy5jb20vc3ByZWVjYXN0LXBob3Rvcy9wcm9kdWN0aW9uL3VzZXJzLzk2NjkzNi90aWxlXzMweDMwLzk2NjkzNl9waG90by5qcGc/MTQyNzIxMzQ5MCIsImlzX2ZiIjp0cnVlLCJwcHZfYXBwcm92ZWQiOmZhbHNlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbXSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJCYXNpYyIsImNhbl9jcmVhdGVfc3ByZWVjYXN0IjpmYWxzZSwiYWxsb3dfZnJpZW5kX3JlcXVlc3RzIjp0cnVlLCJwcm9wb3NlZF9wcm9tb3Rpb24iOjAsInByb2R1Y2VyIjpmYWxzZSwiYnJvYWRjYXN0X3N0YXR1cyI6MCwiaXNfcHVibGlzaGluZyI6ZmFsc2UsImlzX2Nvbm5lY3RlZCI6ZmFsc2UsIm93bmVyIjpmYWxzZSwiYWN0aW9uIjpudWxsLCJpc19iYW5uZWQiOmZhbHNlLCJwcmV2aWV3X2xvY2F0aW9uIjpudWxsLCJyb2xlIjoiQkFoN0NFa2lEV1YyWlc1MFgybGtCam9HUlVaSklnc3hOak0xTURnR093QkdTU0lNZFhObGNsOXBaQVk3QUVacEF4akJEa2tpQzJselgzWnBjQVk3QUVaRy0tOGQ3MmE3ODQ0NWQyNGI1YTQ0NjY5YjRlMjFjOGE2ZWQ5MmM4MmUyNiIsIm1pY3JvcGhvbmVfZ2Fpbl9sZXZlbCI6NDAsInN0YXJyZWRfYXQiOm51bGwsInZjYXQiOm51bGwsImNhcGFiaWxpdGllcyI6eyJicm9hZGNhc3QiOiJ0cnVlIiwicm9vbSI6InRydWUifSwiZGV2aWNlIjoid2ViIn19LHsiYWN0aW9uIjpudWxsLCJicm9hZGNhc3Rfc3RhdHVzIjowLCJjcmVhdGVkX2F0IjoxNDI3MjE0MzI1LjAsImlzX2Nvbm5lY3RlZCI6ZmFsc2UsImlzX21vZGVyYXRvciI6ZmFsc2UsImlzX293bmVyIjpmYWxzZSwiaXNfcHVibGlzaGluZyI6ZmFsc2UsIm1pY3JvcGhvbmVfZ2Fpbl9sZXZlbCI6NDAsInByZXZpZXdfbG9jYXRpb24iOm51bGwsInJvbGUiOiJCQWg3Q0VraURXVjJaVzUwWDJsa0Jqb0dSVVpKSWdzeE5qTTFNRGdHT3dCR1NTSU1kWE5sY2w5cFpBWTdBRVpwQXg3QkRra2lDMmx6WDNacGNBWTdBRVpHLS01Njc4ODZkYTkxZmFlYTgyNjFiMWIzMjAzOTFhM2I0ZGFjM2NjOWMxIiwic3RhcnJlZF9hdCI6bnVsbCwic3RyZWFtX3F1YWxpdHkiOm51bGwsInVzZXIiOnsiYWJvdXRfbWUiOm51bGwsImZpcnN0X25hbWUiOiJNYXJpZSIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IkRpYXoiLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6Im1hcmllLS0yNDYiLCJhbHQiOjk2Njk0MiwiYWRtaW4iOmZhbHNlLCJjb250ZW50X21vZCI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiLy9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1waG90b3MvcHJvZHVjdGlvbi91c2Vycy85NjY5NDIvdGlsZV8zMHgzMC85NjY5NDJfcGhvdG8uanBnPzE0MjcyMTQzMjIiLCJpc19mYiI6dHJ1ZSwicHB2X2FwcHJvdmVkIjpmYWxzZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6W10sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiQmFzaWMiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6ZmFsc2UsImFsbG93X2ZyaWVuZF9yZXF1ZXN0cyI6dHJ1ZSwicHJvcG9zZWRfcHJvbW90aW9uIjowLCJwcm9kdWNlciI6ZmFsc2UsImJyb2FkY2FzdF9zdGF0dXMiOjAsImlzX3B1Ymxpc2hpbmciOmZhbHNlLCJpc19jb25uZWN0ZWQiOmZhbHNlLCJvd25lciI6ZmFsc2UsImFjdGlvbiI6bnVsbCwiaXNfYmFubmVkIjpmYWxzZSwicHJldmlld19sb2NhdGlvbiI6bnVsbCwicm9sZSI6IkJBaDdDRWtpRFdWMlpXNTBYMmxrQmpvR1JVWkpJZ3N4TmpNMU1EZ0dPd0JHU1NJTWRYTmxjbDlwWkFZN0FFWnBBeDdCRGtraUMybHpYM1pwY0FZN0FFWkctLTU2Nzg4NmRhOTFmYWVhODI2MWIxYjMyMDM5MWEzYjRkYWMzY2M5YzEiLCJtaWNyb3Bob25lX2dhaW5fbGV2ZWwiOjQwLCJzdGFycmVkX2F0IjpudWxsLCJ2Y2F0IjpudWxsLCJjYXBhYmlsaXRpZXMiOnsiYnJvYWRjYXN0IjoidHJ1ZSIsInJvb20iOiJ0cnVlIn0sImRldmljZSI6IndlYiJ9fSx7ImFjdGlvbiI6bnVsbCwiYnJvYWRjYXN0X3N0YXR1cyI6MiwiY3JlYXRlZF9hdCI6MTQyNzIxNDU5Ni4wLCJpc19jb25uZWN0ZWQiOmZhbHNlLCJpc19tb2RlcmF0b3IiOmZhbHNlLCJpc19vd25lciI6ZmFsc2UsImlzX3B1Ymxpc2hpbmciOmZhbHNlLCJtaWNyb3Bob25lX2dhaW5fbGV2ZWwiOjQwLCJwcmV2aWV3X2xvY2F0aW9uIjpudWxsLCJyb2xlIjoiQkFoN0NFa2lEV1YyWlc1MFgybGtCam9HUlVaSklnc3hOak0xTURnR093QkdTU0lNZFhObGNsOXBaQVk3QUVacEF4L0JEa2tpQzJselgzWnBjQVk3QUVaRy0tY2VlMTI5M2YwMzE2ZjU1NDYxMzk0YzZiZDA4ZTZmY2FiM2FjMjIyMyIsInN0YXJyZWRfYXQiOm51bGwsInN0cmVhbV9xdWFsaXR5IjpudWxsLCJ1c2VyIjp7ImFib3V0X21lIjpudWxsLCJmaXJzdF9uYW1lIjoiU2VhbiIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IkNyZXBpbiIsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJ1c2VyX2lkIjoic2Vhbi0tMjkwIiwiYWx0Ijo5NjY5NDMsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvOTY2OTQzL3RpbGVfMzB4MzAvOTY2OTQzX3Bob3RvLmpwZz8xNDI3MjE0NTkxIiwiaXNfZmIiOnRydWUsInBwdl9hcHByb3ZlZCI6ZmFsc2UsImlzX2FmZmlsaWF0ZSI6ZmFsc2UsImZvbGxvd2luZ19ldmVudHMiOltdLCJpc19sb2NrZWQiOnRydWUsInBsYW5fbmFtZSI6IkJhc2ljIiwiY2FuX2NyZWF0ZV9zcHJlZWNhc3QiOmZhbHNlLCJhbGxvd19mcmllbmRfcmVxdWVzdHMiOnRydWUsInByb3Bvc2VkX3Byb21vdGlvbiI6MCwicHJvZHVjZXIiOmZhbHNlLCJicm9hZGNhc3Rfc3RhdHVzIjoyLCJpc19wdWJsaXNoaW5nIjpmYWxzZSwiaXNfY29ubmVjdGVkIjpmYWxzZSwib3duZXIiOmZhbHNlLCJhY3Rpb24iOm51bGwsImlzX2Jhbm5lZCI6ZmFsc2UsInByZXZpZXdfbG9jYXRpb24iOm51bGwsInJvbGUiOiJCQWg3Q0VraURXVjJaVzUwWDJsa0Jqb0dSVVpKSWdzeE5qTTFNRGdHT3dCR1NTSU1kWE5sY2w5cFpBWTdBRVpwQXgvQkRra2lDMmx6WDNacGNBWTdBRVpHLS1jZWUxMjkzZjAzMTZmNTU0NjEzOTRjNmJkMDhlNmZjYWIzYWMyMjIzIiwibWljcm9waG9uZV9nYWluX2xldmVsIjo0MCwic3RhcnJlZF9hdCI6bnVsbCwidmNhdCI6bnVsbCwiY2FwYWJpbGl0aWVzIjp7fSwiZGV2aWNlIjoid2ViIn19XSwidmlkZW9fZGlnZXN0Ijp7InZpZGVvX3NuYXBzaG90cyI6W10sInBsYXliYWNrX3N0YXJ0Ijo2OTIwMDB9LCJjaGF0X2RpZ2VzdCI6eyJ2aWV3ZXIiOlt7InVzZXJfaWQiOiJ0aGUtYXJjaGRpb2Nlc2Utb2YtcG9ydC1vZi1zcGFpbiIsInVzZXIiOnsiYWJvdXRfbWUiOiJUaGUgQ2F0aG9saWMgQ2h1cmNoIHdhcyBpbnRyb2R1Y2VkIHRvIFRyaW5pZGFkIHdpdGggdGhlIGNvbWluZyBvZiBDb2x1bWJ1cyBpbiAxNDk4IGFuZCB0aGUgc3Vic2VxdWVudCBTcGFuaXNoIHNldHRsZW1lbnQgYW5kIGVzdGFibGlzaG1lbnQgb2YgdGhlIFBhcmlzaCBhbmQgQ2h1cmNoIG9mIFN0LiBKb3NlcGggYnkgQW50b25pbyBkZSBCZXJyaW8gaW4gMTU5Mi4gVGhlIENodXJjaCB3YXMgZnVydGhlciBhc3N1cmVkIG9mIGl0cyBjb250aW51aXR5IGFmdGVyIHRoZSBpc2xhbmQgd2FzIGxvc3QgdG8gdGhlIEJyaXRpc2ggYXMgQXJ0aWNsZSBFbGV2ZW4gb2YgdGhlIENhcGl0dWxhdGlvbiBvZiAxNzk3IGd1YXJhbnRlZWQgdGhlIGluaGFiaXRhbnRzLCBtb3N0IG9mIHdob20gd2VyZSBDYXRob2xpYywgZnJlZWRvbSB0byBwcmFjdGljZSB0aGVpciByZWxpZ2lvbi4gVHJpbmlkYWQgd2FzIHRoZW4gdW5kZXIgdGhlIGp1cmlzZGljdGlvbiBvZiB0aGUgRGlvY2VzZSBvZiBHdXlhbmEgYmFzZWQgYXQgU2FuIFRvbWUgZGUgQW5nb3N0dXJhIChWZW5lenVlbGEpIHdoaWNoIHdhcyBlcmVjdGVkIGluIDE3OTAuIFRoZSBpc2xhbmQgd2FzIHByZXZpb3VzbHkgcGFydCBvZiB0aGUgRGlvY2VzZSBvZiBQdWVydG8gUmljbywgZm91bmRlZCBpbiAxNTMyLlxyXG5cclxuT24gMzB0aCBBcHJpbCwgMTg1MCBQb3BlIFBpdXMgSVggdHJhbnNmb3JtZWQgdGhlIFZpY2FyaWF0ZSBpbnRvIHRoZSBBcmNoZGlvY2VzZSBvZiBQb3J0LW9mLVNwYWluIHdpdGgganVyaXNkaWN0aW9uIG92ZXIgU3QuIEx1Y2lhLCBTdC4gVmluY2VudCwgR3JlbmFkYSBhbmQgVG9iYWdvIGFuZCB3aXRoIFJvc2VhdSwgRG9taW5pY2EgYXMgaXRzIHN1ZmZyYWdhbiBzZWUuIEluIDE4NTAsIHRoZSBDYXRob2xpYyBwb3B1bGF0aW9uIG9mIFRyaW5pZGFkIHN0b29kIGF0IDQ0LDAwMCBvdXQgb2YgYSB0b3RhbCBvZiA3MCwwMDAgcGVyc29ucy4gVGhlcmUgd2VyZSBzaXh0ZWVuIHBhcmlzaGVzIHNlcnZlZCBieSB0d2VudHkgcmVzaWRlbnQgcHJpZXN0cywgd2l0aCB0aGlydGVlbiBwcmltYXJ5IHNjaG9vbHMgYWxvbmcgd2l0aCBTdC4gSm9zZXBoXHUyMDE5cyBDb252ZW50LCBQb3J0LW9mLVNwYWluICgxODM2KSBhbmQgU3QuIEdlb3JnZVx1MjAxOXMgQ29sbGVnZSAoMTgzOCkuIFRoZSBDaHVyY2hcdTIwMTlzIG5ldyBzdGF0dXMgd2FzIG9mIGFkZGVkIHNpZ25pZmljYW5jZSBhcyBpdCB3YXMgbWFkZSBtb250aHMgYmVmb3JlIHRoZSBoaWVyYXJjaHkgd2FzIHJlc3RvcmVkIGluIEVuZ2xhbmQgb24gMjR0aCBTZXB0ZW1iZXIgMTg1MC4gSW5kZWVkIHRoZSBDaHVyY2ggb2YgUG9ydC1vZi1TcGFpbiBsYXlzIGNsYWltIHRvIGJlIG9uZSBvZiB0aGUgb2xkZXN0IGluIHRoZSBFbmdsaXNoLXNwZWFraW5nIHdvcmxkLiIsImZpcnN0X25hbWUiOiJUaGUgQXJjaGRpb2Nlc2Ugb2YgUG9ydCBvZiBTcGFpbiAiLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjp0cnVlLCJsYXN0X25hbWUiOiIiLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6InRoZS1hcmNoZGlvY2VzZS1vZi1wb3J0LW9mLXNwYWluIiwiYWx0Ijo5NjQ1MzYsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvOTY0NTM2L3RpbGVfMzB4MzAvOTY0NTM2X3Bob3RvLmpwZz8xNDI2NjA0NDkwIiwiaXNfZmIiOmZhbHNlLCJwcHZfYXBwcm92ZWQiOmZhbHNlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbXSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJCcm9uemUiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6dHJ1ZSwiYWxsb3dfZnJpZW5kX3JlcXVlc3RzIjp0cnVlLCJ2Y2F0IjpudWxsLCJwcm9kdWNlciI6dHJ1ZX0sImlkIjo4NjgzMDIyLCJ0ZXh0IjoiVGhhbmtzIGZvciBKb2luaW5nIGV2ZXJ5b25lIHdlJ2xsIGJlIGxpdmUgaW4gMiBtaW5zISIsImFjdGlvbiI6InZpZXdlciIsInJlY2lwaWVudF9pZCI6bnVsbCwiY3JlYXRlZF9hdCI6MTQyNzIxMzA2MS4wfSx7InVzZXJfaWQiOiJkb25uYW1hZSIsInVzZXIiOnsiYWJvdXRfbWUiOm51bGwsImZpcnN0X25hbWUiOiJEb25uYU1hZSIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IkdyZWF2ZXMiLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6ImRvbm5hbWFlIiwiYWx0Ijo5NjY5MTYsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvOTY2OTE2L3RpbGVfMzB4MzAvOTY2OTE2X3Bob3RvLmpwZz8xNDI3MjExMDIzIiwiaXNfZmIiOnRydWUsInBwdl9hcHByb3ZlZCI6ZmFsc2UsImlzX2FmZmlsaWF0ZSI6ZmFsc2UsImZvbGxvd2luZ19ldmVudHMiOltdLCJpc19sb2NrZWQiOnRydWUsInBsYW5fbmFtZSI6IkJhc2ljIiwiY2FuX2NyZWF0ZV9zcHJlZWNhc3QiOmZhbHNlLCJhbGxvd19mcmllbmRfcmVxdWVzdHMiOnRydWUsInZjYXQiOm51bGwsInByb2R1Y2VyIjpmYWxzZX0sImlkIjo4NjgzMDIzLCJ0ZXh0IjoiR29vZCBhZnRlcm5vb24gWW91ciBHcmFjZS4gIEJsZXNzaW5ncyIsImFjdGlvbiI6InZpZXdlciIsInJlY2lwaWVudF9pZCI6bnVsbCwiY3JlYXRlZF9hdCI6MTQyNzIxMzIxMi4wfSx7InVzZXJfaWQiOiJhc2hyYWYiLCJ1c2VyIjp7ImFib3V0X21lIjoiQmF5IEFyZWEgTmF0aXZlIHx8IFdhcnJpb3JzLzQ5ZXJzIEZhbiB8fCBNdXNpYy9UZWNoIEVudGh1c2lhc3QgfHwgQ29udGVudCAmYW1wOyBDb21tdW5pdHkgQXNzb2NpYXRlIDxhIGhyZWY9XCJodHRwOi8vd3d3LnR3aXR0ZXIuY29tL3NwcmVlY2FzdFwiPkBzcHJlZWNhc3Q8L2E+ICIsImZpcnN0X25hbWUiOiJBc2hyYWYiLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjp0cnVlLCJsYXN0X25hbWUiOiJFbCBHYW1hbCIsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJ1c2VyX2lkIjoiYXNocmFmIiwiYWx0IjoyMTA4OTUsImFkbWluIjp0cnVlLCJjb250ZW50X21vZCI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiLy9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1waG90b3MvcHJvZHVjdGlvbi91c2Vycy8yMTA4OTUvdGlsZV8zMHgzMC8yMTA4OTVfcGhvdG8uanBnPzEzOTU0MTQ0NzQiLCJpc19mYiI6dHJ1ZSwicHB2X2FwcHJvdmVkIjp0cnVlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbMTYzNTExXSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJQbHVzIiwiY2FuX2NyZWF0ZV9zcHJlZWNhc3QiOnRydWUsImFsbG93X2ZyaWVuZF9yZXF1ZXN0cyI6dHJ1ZSwidmNhdCI6bnVsbCwicHJvZHVjZXIiOnRydWV9LCJpZCI6ODY4MzAyNiwidGV4dCI6IklmIHlvdSdkIGxpa2UgdG8gYXNrIHlvdXIgcXVlc3Rpb24gdmlhIHdlYmNhbSwgY2xpY2sgdGhlIGJsdWUgY2FtZXJhIGJ1dHRvbiBhbmQgd2UnbGwgYmUgaW4gdG91Y2ggdG8gZ2V0IHlvdXIgcXVlc3Rpb24hIiwiYWN0aW9uIjoidmlld2VyIiwicmVjaXBpZW50X2lkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDI3MjEzNDQ0LjB9LHsidXNlcl9pZCI6ImRyZXdwZWFjb2NrIiwidXNlciI6eyJhYm91dF9tZSI6IiIsImZpcnN0X25hbWUiOiJEcmV3UGVhY29jayIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IiIsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJ1c2VyX2lkIjoiZHJld3BlYWNvY2siLCJhbHQiOjk2NjkzNCwiYWRtaW4iOmZhbHNlLCJjb250ZW50X21vZCI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiL3Byb2ZpbGVfcGhvdG9zL3RpbGVfMzB4MzAvbm9wcm9maWxlLnBuZyIsImlzX2ZiIjpmYWxzZSwicHB2X2FwcHJvdmVkIjpmYWxzZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6W10sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiQmFzaWMiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6ZmFsc2UsImFsbG93X2ZyaWVuZF9yZXF1ZXN0cyI6dHJ1ZSwidmNhdCI6bnVsbCwicHJvZHVjZXIiOmZhbHNlfSwiaWQiOjg2ODMwMzEsInRleHQiOiJoZWxsbz8iLCJhY3Rpb24iOiJ2aWV3ZXIiLCJyZWNpcGllbnRfaWQiOm51bGwsImNyZWF0ZWRfYXQiOjE0MjcyMTM2OTQuMH0seyJ1c2VyX2lkIjoiYXNocmFmIiwidXNlciI6eyJhYm91dF9tZSI6IkJheSBBcmVhIE5hdGl2ZSB8fCBXYXJyaW9ycy80OWVycyBGYW4gfHwgTXVzaWMvVGVjaCBFbnRodXNpYXN0IHx8IENvbnRlbnQgJmFtcDsgQ29tbXVuaXR5IEFzc29jaWF0ZSA8YSBocmVmPVwiaHR0cDovL3d3dy50d2l0dGVyLmNvbS9zcHJlZWNhc3RcIj5Ac3ByZWVjYXN0PC9hPiAiLCJmaXJzdF9uYW1lIjoiQXNocmFmIiwiaGFzX2JlZW5fYXV0aGVudGljYXRlZCI6dHJ1ZSwibGFzdF9uYW1lIjoiRWwgR2FtYWwiLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6ImFzaHJhZiIsImFsdCI6MjEwODk1LCJhZG1pbiI6dHJ1ZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvMjEwODk1L3RpbGVfMzB4MzAvMjEwODk1X3Bob3RvLmpwZz8xMzk1NDE0NDc0IiwiaXNfZmIiOnRydWUsInBwdl9hcHByb3ZlZCI6dHJ1ZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6WzE2MzUxMV0sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiUGx1cyIsImNhbl9jcmVhdGVfc3ByZWVjYXN0Ijp0cnVlLCJhbGxvd19mcmllbmRfcmVxdWVzdHMiOnRydWUsInZjYXQiOm51bGwsInByb2R1Y2VyIjp0cnVlfSwiaWQiOjg2ODMwMzMsInRleHQiOiJoZXkgRHJldyEgYXJlIHlvdSBoYXZpbmcgdHJvdWJsZSBzZWVpbmcgdGhlIEFyY2hiaXNob3A/IiwiYWN0aW9uIjoidmlld2VyIiwicmVjaXBpZW50X2lkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDI3MjEzNzExLjB9LHsidXNlcl9pZCI6ImRyZXdwZWFjb2NrIiwidXNlciI6eyJhYm91dF9tZSI6IiIsImZpcnN0X25hbWUiOiJEcmV3UGVhY29jayIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IiIsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJ1c2VyX2lkIjoiZHJld3BlYWNvY2siLCJhbHQiOjk2NjkzNCwiYWRtaW4iOmZhbHNlLCJjb250ZW50X21vZCI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiL3Byb2ZpbGVfcGhvdG9zL3RpbGVfMzB4MzAvbm9wcm9maWxlLnBuZyIsImlzX2ZiIjpmYWxzZSwicHB2X2FwcHJvdmVkIjpmYWxzZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6W10sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiQmFzaWMiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6ZmFsc2UsImFsbG93X2ZyaWVuZF9yZXF1ZXN0cyI6dHJ1ZSwidmNhdCI6bnVsbCwicHJvZHVjZXIiOmZhbHNlfSwiaWQiOjg2ODMwMzQsInRleHQiOiJteSBuYW1lIGlzIGRyZXdwZWFjb2NrIiwiYWN0aW9uIjoidmlld2VyIiwicmVjaXBpZW50X2lkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDI3MjEzNzI4LjB9LHsidXNlcl9pZCI6ImthdGhsZWVuLS0xNzEiLCJ1c2VyIjp7ImFib3V0X21lIjpudWxsLCJmaXJzdF9uYW1lIjoiS2F0aGxlZW4iLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjp0cnVlLCJsYXN0X25hbWUiOiJNYWhhcmFqIiwibmVlZHNfdG9fY29uZmlybV9lbWFpbCI6ZmFsc2UsInVzZXJfaWQiOiJrYXRobGVlbi0tMTcxIiwiYWx0Ijo5NjY5MDksImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvOTY2OTA5L3RpbGVfMzB4MzAvOTY2OTA5X3Bob3RvLmpwZz8xNDI3MjA5NTkxIiwiaXNfZmIiOnRydWUsInBwdl9hcHByb3ZlZCI6ZmFsc2UsImlzX2FmZmlsaWF0ZSI6ZmFsc2UsImZvbGxvd2luZ19ldmVudHMiOltdLCJpc19sb2NrZWQiOnRydWUsInBsYW5fbmFtZSI6IkJhc2ljIiwiY2FuX2NyZWF0ZV9zcHJlZWNhc3QiOmZhbHNlLCJhbGxvd19mcmllbmRfcmVxdWVzdHMiOnRydWUsInZjYXQiOm51bGwsInByb2R1Y2VyIjpmYWxzZX0sImlkIjo4NjgzMDM1LCJ0ZXh0IjoiSGksIEknbSBzZWVpbmcgb2theSBidXQgdGhlcmUgaXMgYW4gJ2VjaG8nIGluIHRoZSBhdWRpby4iLCJhY3Rpb24iOiJ2aWV3ZXIiLCJyZWNpcGllbnRfaWQiOm51bGwsImNyZWF0ZWRfYXQiOjE0MjcyMTM3NTAuMH0seyJ1c2VyX2lkIjoiYXNocmFmIiwidXNlciI6eyJhYm91dF9tZSI6IkJheSBBcmVhIE5hdGl2ZSB8fCBXYXJyaW9ycy80OWVycyBGYW4gfHwgTXVzaWMvVGVjaCBFbnRodXNpYXN0IHx8IENvbnRlbnQgJmFtcDsgQ29tbXVuaXR5IEFzc29jaWF0ZSA8YSBocmVmPVwiaHR0cDovL3d3dy50d2l0dGVyLmNvbS9zcHJlZWNhc3RcIj5Ac3ByZWVjYXN0PC9hPiAiLCJmaXJzdF9uYW1lIjoiQXNocmFmIiwiaGFzX2JlZW5fYXV0aGVudGljYXRlZCI6dHJ1ZSwibGFzdF9uYW1lIjoiRWwgR2FtYWwiLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6ImFzaHJhZiIsImFsdCI6MjEwODk1LCJhZG1pbiI6dHJ1ZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvMjEwODk1L3RpbGVfMzB4MzAvMjEwODk1X3Bob3RvLmpwZz8xMzk1NDE0NDc0IiwiaXNfZmIiOnRydWUsInBwdl9hcHByb3ZlZCI6dHJ1ZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6WzE2MzUxMV0sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiUGx1cyIsImNhbl9jcmVhdGVfc3ByZWVjYXN0Ijp0cnVlLCJhbGxvd19mcmllbmRfcmVxdWVzdHMiOnRydWUsInZjYXQiOm51bGwsInByb2R1Y2VyIjp0cnVlfSwiaWQiOjg2ODMwMzcsInRleHQiOiIyIHRoaW5ncyB0byB0cnkgMSkgbWFrZSBzdXJlIHlvdSBkb24ndCBoYXZlIHRoZSBzcHJlZWNhc3Qgb3BlbiBpbiB0d28gcGxhY2VzIDIpIHRyeSByZWxvYWRpbmcgdGhlIHBhZ2UgaWYgbm90ISIsImFjdGlvbiI6InZpZXdlciIsInJlY2lwaWVudF9pZCI6bnVsbCwiY3JlYXRlZF9hdCI6MTQyNzIxMzc4NS4wfSx7InVzZXJfaWQiOiJ0aGUtYXJjaGRpb2Nlc2Utb2YtcG9ydC1vZi1zcGFpbiIsInVzZXIiOnsiYWJvdXRfbWUiOiJUaGUgQ2F0aG9saWMgQ2h1cmNoIHdhcyBpbnRyb2R1Y2VkIHRvIFRyaW5pZGFkIHdpdGggdGhlIGNvbWluZyBvZiBDb2x1bWJ1cyBpbiAxNDk4IGFuZCB0aGUgc3Vic2VxdWVudCBTcGFuaXNoIHNldHRsZW1lbnQgYW5kIGVzdGFibGlzaG1lbnQgb2YgdGhlIFBhcmlzaCBhbmQgQ2h1cmNoIG9mIFN0LiBKb3NlcGggYnkgQW50b25pbyBkZSBCZXJyaW8gaW4gMTU5Mi4gVGhlIENodXJjaCB3YXMgZnVydGhlciBhc3N1cmVkIG9mIGl0cyBjb250aW51aXR5IGFmdGVyIHRoZSBpc2xhbmQgd2FzIGxvc3QgdG8gdGhlIEJyaXRpc2ggYXMgQXJ0aWNsZSBFbGV2ZW4gb2YgdGhlIENhcGl0dWxhdGlvbiBvZiAxNzk3IGd1YXJhbnRlZWQgdGhlIGluaGFiaXRhbnRzLCBtb3N0IG9mIHdob20gd2VyZSBDYXRob2xpYywgZnJlZWRvbSB0byBwcmFjdGljZSB0aGVpciByZWxpZ2lvbi4gVHJpbmlkYWQgd2FzIHRoZW4gdW5kZXIgdGhlIGp1cmlzZGljdGlvbiBvZiB0aGUgRGlvY2VzZSBvZiBHdXlhbmEgYmFzZWQgYXQgU2FuIFRvbWUgZGUgQW5nb3N0dXJhIChWZW5lenVlbGEpIHdoaWNoIHdhcyBlcmVjdGVkIGluIDE3OTAuIFRoZSBpc2xhbmQgd2FzIHByZXZpb3VzbHkgcGFydCBvZiB0aGUgRGlvY2VzZSBvZiBQdWVydG8gUmljbywgZm91bmRlZCBpbiAxNTMyLlxyXG5cclxuT24gMzB0aCBBcHJpbCwgMTg1MCBQb3BlIFBpdXMgSVggdHJhbnNmb3JtZWQgdGhlIFZpY2FyaWF0ZSBpbnRvIHRoZSBBcmNoZGlvY2VzZSBvZiBQb3J0LW9mLVNwYWluIHdpdGgganVyaXNkaWN0aW9uIG92ZXIgU3QuIEx1Y2lhLCBTdC4gVmluY2VudCwgR3JlbmFkYSBhbmQgVG9iYWdvIGFuZCB3aXRoIFJvc2VhdSwgRG9taW5pY2EgYXMgaXRzIHN1ZmZyYWdhbiBzZWUuIEluIDE4NTAsIHRoZSBDYXRob2xpYyBwb3B1bGF0aW9uIG9mIFRyaW5pZGFkIHN0b29kIGF0IDQ0LDAwMCBvdXQgb2YgYSB0b3RhbCBvZiA3MCwwMDAgcGVyc29ucy4gVGhlcmUgd2VyZSBzaXh0ZWVuIHBhcmlzaGVzIHNlcnZlZCBieSB0d2VudHkgcmVzaWRlbnQgcHJpZXN0cywgd2l0aCB0aGlydGVlbiBwcmltYXJ5IHNjaG9vbHMgYWxvbmcgd2l0aCBTdC4gSm9zZXBoXHUyMDE5cyBDb252ZW50LCBQb3J0LW9mLVNwYWluICgxODM2KSBhbmQgU3QuIEdlb3JnZVx1MjAxOXMgQ29sbGVnZSAoMTgzOCkuIFRoZSBDaHVyY2hcdTIwMTlzIG5ldyBzdGF0dXMgd2FzIG9mIGFkZGVkIHNpZ25pZmljYW5jZSBhcyBpdCB3YXMgbWFkZSBtb250aHMgYmVmb3JlIHRoZSBoaWVyYXJjaHkgd2FzIHJlc3RvcmVkIGluIEVuZ2xhbmQgb24gMjR0aCBTZXB0ZW1iZXIgMTg1MC4gSW5kZWVkIHRoZSBDaHVyY2ggb2YgUG9ydC1vZi1TcGFpbiBsYXlzIGNsYWltIHRvIGJlIG9uZSBvZiB0aGUgb2xkZXN0IGluIHRoZSBFbmdsaXNoLXNwZWFraW5nIHdvcmxkLiIsImZpcnN0X25hbWUiOiJUaGUgQXJjaGRpb2Nlc2Ugb2YgUG9ydCBvZiBTcGFpbiAiLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjp0cnVlLCJsYXN0X25hbWUiOiIiLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6InRoZS1hcmNoZGlvY2VzZS1vZi1wb3J0LW9mLXNwYWluIiwiYWx0Ijo5NjQ1MzYsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvOTY0NTM2L3RpbGVfMzB4MzAvOTY0NTM2X3Bob3RvLmpwZz8xNDI2NjA0NDkwIiwiaXNfZmIiOmZhbHNlLCJwcHZfYXBwcm92ZWQiOmZhbHNlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbXSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJCcm9uemUiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6dHJ1ZSwiYWxsb3dfZnJpZW5kX3JlcXVlc3RzIjp0cnVlLCJ2Y2F0IjpudWxsLCJwcm9kdWNlciI6dHJ1ZX0sImlkIjo4NjgzMDM4LCJ0ZXh0IjoiVGhhbmtzIGZvciB5b3VyIGZlZWRiYWNrIEthdGhsZWVuIiwiYWN0aW9uIjoidmlld2VyIiwicmVjaXBpZW50X2lkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDI3MjEzODAyLjB9LHsidXNlcl9pZCI6ImthdGhsZWVuLS0xNzEiLCJ1c2VyIjp7ImFib3V0X21lIjpudWxsLCJmaXJzdF9uYW1lIjoiS2F0aGxlZW4iLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjp0cnVlLCJsYXN0X25hbWUiOiJNYWhhcmFqIiwibmVlZHNfdG9fY29uZmlybV9lbWFpbCI6ZmFsc2UsInVzZXJfaWQiOiJrYXRobGVlbi0tMTcxIiwiYWx0Ijo5NjY5MDksImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvOTY2OTA5L3RpbGVfMzB4MzAvOTY2OTA5X3Bob3RvLmpwZz8xNDI3MjA5NTkxIiwiaXNfZmIiOnRydWUsInBwdl9hcHByb3ZlZCI6ZmFsc2UsImlzX2FmZmlsaWF0ZSI6ZmFsc2UsImZvbGxvd2luZ19ldmVudHMiOltdLCJpc19sb2NrZWQiOnRydWUsInBsYW5fbmFtZSI6IkJhc2ljIiwiY2FuX2NyZWF0ZV9zcHJlZWNhc3QiOmZhbHNlLCJhbGxvd19mcmllbmRfcmVxdWVzdHMiOnRydWUsInZjYXQiOm51bGwsInByb2R1Y2VyIjpmYWxzZX0sImlkIjo4NjgzMDQwLCJ0ZXh0IjoicHJvYmxlbSBmaXghIHRoYW5rcy4iLCJhY3Rpb24iOiJ2aWV3ZXIiLCJyZWNpcGllbnRfaWQiOm51bGwsImNyZWF0ZWRfYXQiOjE0MjcyMTM4MjEuMH0seyJ1c2VyX2lkIjoiYXNocmFmIiwidXNlciI6eyJhYm91dF9tZSI6IkJheSBBcmVhIE5hdGl2ZSB8fCBXYXJyaW9ycy80OWVycyBGYW4gfHwgTXVzaWMvVGVjaCBFbnRodXNpYXN0IHx8IENvbnRlbnQgJmFtcDsgQ29tbXVuaXR5IEFzc29jaWF0ZSA8YSBocmVmPVwiaHR0cDovL3d3dy50d2l0dGVyLmNvbS9zcHJlZWNhc3RcIj5Ac3ByZWVjYXN0PC9hPiAiLCJmaXJzdF9uYW1lIjoiQXNocmFmIiwiaGFzX2JlZW5fYXV0aGVudGljYXRlZCI6dHJ1ZSwibGFzdF9uYW1lIjoiRWwgR2FtYWwiLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6ImFzaHJhZiIsImFsdCI6MjEwODk1LCJhZG1pbiI6dHJ1ZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvMjEwODk1L3RpbGVfMzB4MzAvMjEwODk1X3Bob3RvLmpwZz8xMzk1NDE0NDc0IiwiaXNfZmIiOnRydWUsInBwdl9hcHByb3ZlZCI6dHJ1ZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6WzE2MzUxMV0sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiUGx1cyIsImNhbl9jcmVhdGVfc3ByZWVjYXN0Ijp0cnVlLCJhbGxvd19mcmllbmRfcmVxdWVzdHMiOnRydWUsInZjYXQiOm51bGwsInByb2R1Y2VyIjp0cnVlfSwiaWQiOjg2ODMwNDEsInRleHQiOiJncmVhdCEiLCJhY3Rpb24iOiJ2aWV3ZXIiLCJyZWNpcGllbnRfaWQiOm51bGwsImNyZWF0ZWRfYXQiOjE0MjcyMTM4MjUuMH0seyJ1c2VyX2lkIjoiZHJld3BlYWNvY2siLCJ1c2VyIjp7ImFib3V0X21lIjoiIiwiZmlyc3RfbmFtZSI6IkRyZXdQZWFjb2NrIiwiaGFzX2JlZW5fYXV0aGVudGljYXRlZCI6dHJ1ZSwibGFzdF9uYW1lIjoiIiwibmVlZHNfdG9fY29uZmlybV9lbWFpbCI6ZmFsc2UsInVzZXJfaWQiOiJkcmV3cGVhY29jayIsImFsdCI6OTY2OTM0LCJhZG1pbiI6ZmFsc2UsImNvbnRlbnRfbW9kIjpmYWxzZSwicHJvZmlsZV9waG90b190aHVtYl91cmwiOiIvcHJvZmlsZV9waG90b3MvdGlsZV8zMHgzMC9ub3Byb2ZpbGUucG5nIiwiaXNfZmIiOmZhbHNlLCJwcHZfYXBwcm92ZWQiOmZhbHNlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbXSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJCYXNpYyIsImNhbl9jcmVhdGVfc3ByZWVjYXN0IjpmYWxzZSwiYWxsb3dfZnJpZW5kX3JlcXVlc3RzIjp0cnVlLCJ2Y2F0IjpudWxsLCJwcm9kdWNlciI6ZmFsc2V9LCJpZCI6ODY4MzA0NCwidGV4dCI6Im1obSIsImFjdGlvbiI6InZpZXdlciIsInJlY2lwaWVudF9pZCI6bnVsbCwiY3JlYXRlZF9hdCI6MTQyNzIxMzg1NC4wfSx7InVzZXJfaWQiOiJkcmV3cGVhY29jayIsInVzZXIiOnsiYWJvdXRfbWUiOiIiLCJmaXJzdF9uYW1lIjoiRHJld1BlYWNvY2siLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjp0cnVlLCJsYXN0X25hbWUiOiIiLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6ImRyZXdwZWFjb2NrIiwiYWx0Ijo5NjY5MzQsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii9wcm9maWxlX3Bob3Rvcy90aWxlXzMweDMwL25vcHJvZmlsZS5wbmciLCJpc19mYiI6ZmFsc2UsInBwdl9hcHByb3ZlZCI6ZmFsc2UsImlzX2FmZmlsaWF0ZSI6ZmFsc2UsImZvbGxvd2luZ19ldmVudHMiOltdLCJpc19sb2NrZWQiOnRydWUsInBsYW5fbmFtZSI6IkJhc2ljIiwiY2FuX2NyZWF0ZV9zcHJlZWNhc3QiOmZhbHNlLCJhbGxvd19mcmllbmRfcmVxdWVzdHMiOnRydWUsInZjYXQiOm51bGwsInByb2R1Y2VyIjpmYWxzZX0sImlkIjo4NjgzMDQ1LCJ0ZXh0IjoidGhlIHZpZGVvIGlzIGxhZ2dpbmciLCJhY3Rpb24iOiJ2aWV3ZXIiLCJyZWNpcGllbnRfaWQiOm51bGwsImNyZWF0ZWRfYXQiOjE0MjcyMTM4NjMuMH0seyJ1c2VyX2lkIjoiYXNocmFmIiwidXNlciI6eyJhYm91dF9tZSI6IkJheSBBcmVhIE5hdGl2ZSB8fCBXYXJyaW9ycy80OWVycyBGYW4gfHwgTXVzaWMvVGVjaCBFbnRodXNpYXN0IHx8IENvbnRlbnQgJmFtcDsgQ29tbXVuaXR5IEFzc29jaWF0ZSA8YSBocmVmPVwiaHR0cDovL3d3dy50d2l0dGVyLmNvbS9zcHJlZWNhc3RcIj5Ac3ByZWVjYXN0PC9hPiAiLCJmaXJzdF9uYW1lIjoiQXNocmFmIiwiaGFzX2JlZW5fYXV0aGVudGljYXRlZCI6dHJ1ZSwibGFzdF9uYW1lIjoiRWwgR2FtYWwiLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6ImFzaHJhZiIsImFsdCI6MjEwODk1LCJhZG1pbiI6dHJ1ZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvMjEwODk1L3RpbGVfMzB4MzAvMjEwODk1X3Bob3RvLmpwZz8xMzk1NDE0NDc0IiwiaXNfZmIiOnRydWUsInBwdl9hcHByb3ZlZCI6dHJ1ZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6WzE2MzUxMV0sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiUGx1cyIsImNhbl9jcmVhdGVfc3ByZWVjYXN0Ijp0cnVlLCJhbGxvd19mcmllbmRfcmVxdWVzdHMiOnRydWUsInZjYXQiOm51bGwsInByb2R1Y2VyIjp0cnVlfSwiaWQiOjg2ODMwNDYsInRleHQiOiJ0cnkgcmVsb2FkaW5nIHRoZSBwYWdlIiwiYWN0aW9uIjoidmlld2VyIiwicmVjaXBpZW50X2lkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDI3MjEzODgwLjB9LHsidXNlcl9pZCI6ImRyZXdwZWFjb2NrIiwidXNlciI6eyJhYm91dF9tZSI6IiIsImZpcnN0X25hbWUiOiJEcmV3UGVhY29jayIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IiIsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJ1c2VyX2lkIjoiZHJld3BlYWNvY2siLCJhbHQiOjk2NjkzNCwiYWRtaW4iOmZhbHNlLCJjb250ZW50X21vZCI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiL3Byb2ZpbGVfcGhvdG9zL3RpbGVfMzB4MzAvbm9wcm9maWxlLnBuZyIsImlzX2ZiIjpmYWxzZSwicHB2X2FwcHJvdmVkIjpmYWxzZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6W10sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiQmFzaWMiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6ZmFsc2UsImFsbG93X2ZyaWVuZF9yZXF1ZXN0cyI6dHJ1ZSwidmNhdCI6bnVsbCwicHJvZHVjZXIiOmZhbHNlfSwiaWQiOjg2ODMwNDcsInRleHQiOiIuXy4gb2theSIsImFjdGlvbiI6InZpZXdlciIsInJlY2lwaWVudF9pZCI6bnVsbCwiY3JlYXRlZF9hdCI6MTQyNzIxMzkzMC4wfSx7InVzZXJfaWQiOiJkb25uYW1hZSIsInVzZXIiOnsiYWJvdXRfbWUiOm51bGwsImZpcnN0X25hbWUiOiJEb25uYU1hZSIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IkdyZWF2ZXMiLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6ImRvbm5hbWFlIiwiYWx0Ijo5NjY5MTYsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvOTY2OTE2L3RpbGVfMzB4MzAvOTY2OTE2X3Bob3RvLmpwZz8xNDI3MjExMDIzIiwiaXNfZmIiOnRydWUsInBwdl9hcHByb3ZlZCI6ZmFsc2UsImlzX2FmZmlsaWF0ZSI6ZmFsc2UsImZvbGxvd2luZ19ldmVudHMiOltdLCJpc19sb2NrZWQiOnRydWUsInBsYW5fbmFtZSI6IkJhc2ljIiwiY2FuX2NyZWF0ZV9zcHJlZWNhc3QiOmZhbHNlLCJhbGxvd19mcmllbmRfcmVxdWVzdHMiOnRydWUsInZjYXQiOm51bGwsInByb2R1Y2VyIjpmYWxzZX0sImlkIjo4NjgzMDU2LCJ0ZXh0IjoiVGhhbmsgeW91IFlvdXIgR3JhY2UuLi4iLCJhY3Rpb24iOiJ2aWV3ZXIiLCJyZWNpcGllbnRfaWQiOm51bGwsImNyZWF0ZWRfYXQiOjE0MjcyMTQxOTcuMH0seyJ1c2VyX2lkIjoidGhlLWFyY2hkaW9jZXNlLW9mLXBvcnQtb2Ytc3BhaW4iLCJ1c2VyIjp7ImFib3V0X21lIjoiVGhlIENhdGhvbGljIENodXJjaCB3YXMgaW50cm9kdWNlZCB0byBUcmluaWRhZCB3aXRoIHRoZSBjb21pbmcgb2YgQ29sdW1idXMgaW4gMTQ5OCBhbmQgdGhlIHN1YnNlcXVlbnQgU3BhbmlzaCBzZXR0bGVtZW50IGFuZCBlc3RhYmxpc2htZW50IG9mIHRoZSBQYXJpc2ggYW5kIENodXJjaCBvZiBTdC4gSm9zZXBoIGJ5IEFudG9uaW8gZGUgQmVycmlvIGluIDE1OTIuIFRoZSBDaHVyY2ggd2FzIGZ1cnRoZXIgYXNzdXJlZCBvZiBpdHMgY29udGludWl0eSBhZnRlciB0aGUgaXNsYW5kIHdhcyBsb3N0IHRvIHRoZSBCcml0aXNoIGFzIEFydGljbGUgRWxldmVuIG9mIHRoZSBDYXBpdHVsYXRpb24gb2YgMTc5NyBndWFyYW50ZWVkIHRoZSBpbmhhYml0YW50cywgbW9zdCBvZiB3aG9tIHdlcmUgQ2F0aG9saWMsIGZyZWVkb20gdG8gcHJhY3RpY2UgdGhlaXIgcmVsaWdpb24uIFRyaW5pZGFkIHdhcyB0aGVuIHVuZGVyIHRoZSBqdXJpc2RpY3Rpb24gb2YgdGhlIERpb2Nlc2Ugb2YgR3V5YW5hIGJhc2VkIGF0IFNhbiBUb21lIGRlIEFuZ29zdHVyYSAoVmVuZXp1ZWxhKSB3aGljaCB3YXMgZXJlY3RlZCBpbiAxNzkwLiBUaGUgaXNsYW5kIHdhcyBwcmV2aW91c2x5IHBhcnQgb2YgdGhlIERpb2Nlc2Ugb2YgUHVlcnRvIFJpY28sIGZvdW5kZWQgaW4gMTUzMi5cclxuXHJcbk9uIDMwdGggQXByaWwsIDE4NTAgUG9wZSBQaXVzIElYIHRyYW5zZm9ybWVkIHRoZSBWaWNhcmlhdGUgaW50byB0aGUgQXJjaGRpb2Nlc2Ugb2YgUG9ydC1vZi1TcGFpbiB3aXRoIGp1cmlzZGljdGlvbiBvdmVyIFN0LiBMdWNpYSwgU3QuIFZpbmNlbnQsIEdyZW5hZGEgYW5kIFRvYmFnbyBhbmQgd2l0aCBSb3NlYXUsIERvbWluaWNhIGFzIGl0cyBzdWZmcmFnYW4gc2VlLiBJbiAxODUwLCB0aGUgQ2F0aG9saWMgcG9wdWxhdGlvbiBvZiBUcmluaWRhZCBzdG9vZCBhdCA0NCwwMDAgb3V0IG9mIGEgdG90YWwgb2YgNzAsMDAwIHBlcnNvbnMuIFRoZXJlIHdlcmUgc2l4dGVlbiBwYXJpc2hlcyBzZXJ2ZWQgYnkgdHdlbnR5IHJlc2lkZW50IHByaWVzdHMsIHdpdGggdGhpcnRlZW4gcHJpbWFyeSBzY2hvb2xzIGFsb25nIHdpdGggU3QuIEpvc2VwaFx1MjAxOXMgQ29udmVudCwgUG9ydC1vZi1TcGFpbiAoMTgzNikgYW5kIFN0LiBHZW9yZ2VcdTIwMTlzIENvbGxlZ2UgKDE4MzgpLiBUaGUgQ2h1cmNoXHUyMDE5cyBuZXcgc3RhdHVzIHdhcyBvZiBhZGRlZCBzaWduaWZpY2FuY2UgYXMgaXQgd2FzIG1hZGUgbW9udGhzIGJlZm9yZSB0aGUgaGllcmFyY2h5IHdhcyByZXN0b3JlZCBpbiBFbmdsYW5kIG9uIDI0dGggU2VwdGVtYmVyIDE4NTAuIEluZGVlZCB0aGUgQ2h1cmNoIG9mIFBvcnQtb2YtU3BhaW4gbGF5cyBjbGFpbSB0byBiZSBvbmUgb2YgdGhlIG9sZGVzdCBpbiB0aGUgRW5nbGlzaC1zcGVha2luZyB3b3JsZC4iLCJmaXJzdF9uYW1lIjoiVGhlIEFyY2hkaW9jZXNlIG9mIFBvcnQgb2YgU3BhaW4gIiwiaGFzX2JlZW5fYXV0aGVudGljYXRlZCI6dHJ1ZSwibGFzdF9uYW1lIjoiIiwibmVlZHNfdG9fY29uZmlybV9lbWFpbCI6ZmFsc2UsInVzZXJfaWQiOiJ0aGUtYXJjaGRpb2Nlc2Utb2YtcG9ydC1vZi1zcGFpbiIsImFsdCI6OTY0NTM2LCJhZG1pbiI6ZmFsc2UsImNvbnRlbnRfbW9kIjpmYWxzZSwicHJvZmlsZV9waG90b190aHVtYl91cmwiOiIvL3MzLmFtYXpvbmF3cy5jb20vc3ByZWVjYXN0LXBob3Rvcy9wcm9kdWN0aW9uL3VzZXJzLzk2NDUzNi90aWxlXzMweDMwLzk2NDUzNl9waG90by5qcGc/MTQyNjYwNDQ5MCIsImlzX2ZiIjpmYWxzZSwicHB2X2FwcHJvdmVkIjpmYWxzZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6W10sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiQnJvbnplIiwiY2FuX2NyZWF0ZV9zcHJlZWNhc3QiOnRydWUsImFsbG93X2ZyaWVuZF9yZXF1ZXN0cyI6dHJ1ZSwidmNhdCI6bnVsbCwicHJvZHVjZXIiOnRydWV9LCJpZCI6ODY4MzA1OCwidGV4dCI6IlRoYW5rIHlvdSBIYWxsZSEgOykiLCJhY3Rpb24iOiJ2aWV3ZXIiLCJyZWNpcGllbnRfaWQiOm51bGwsImNyZWF0ZWRfYXQiOjE0MjcyMTQyMTUuMH0seyJ1c2VyX2lkIjoicGF1bGluZS0tNDMiLCJ1c2VyIjp7ImFib3V0X21lIjpudWxsLCJmaXJzdF9uYW1lIjoiUGF1bGluZSIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IlBoZWxwcyIsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJ1c2VyX2lkIjoicGF1bGluZS0tNDMiLCJhbHQiOjk2NjkyOCwiYWRtaW4iOmZhbHNlLCJjb250ZW50X21vZCI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiLy9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1waG90b3MvcHJvZHVjdGlvbi91c2Vycy85NjY5MjgvdGlsZV8zMHgzMC85NjY5MjhfcGhvdG8uanBnPzE0MjcyMTI4NTciLCJpc19mYiI6dHJ1ZSwicHB2X2FwcHJvdmVkIjpmYWxzZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6W10sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiQmFzaWMiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6ZmFsc2UsImFsbG93X2ZyaWVuZF9yZXF1ZXN0cyI6dHJ1ZSwidmNhdCI6bnVsbCwicHJvZHVjZXIiOmZhbHNlfSwiaWQiOjg2ODMwNjIsInRleHQiOiJGYW50YXN0aWMhIFRoYW5rIHlvdSBZb3VyIEdyYWNlISIsImFjdGlvbiI6InZpZXdlciIsInJlY2lwaWVudF9pZCI6bnVsbCwiY3JlYXRlZF9hdCI6MTQyNzIxNDUxNy4wfSx7InVzZXJfaWQiOiJkb25uYW1hZSIsInVzZXIiOnsiYWJvdXRfbWUiOm51bGwsImZpcnN0X25hbWUiOiJEb25uYU1hZSIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IkdyZWF2ZXMiLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6ImRvbm5hbWFlIiwiYWx0Ijo5NjY5MTYsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvOTY2OTE2L3RpbGVfMzB4MzAvOTY2OTE2X3Bob3RvLmpwZz8xNDI3MjExMDIzIiwiaXNfZmIiOnRydWUsInBwdl9hcHByb3ZlZCI6ZmFsc2UsImlzX2FmZmlsaWF0ZSI6ZmFsc2UsImZvbGxvd2luZ19ldmVudHMiOltdLCJpc19sb2NrZWQiOnRydWUsInBsYW5fbmFtZSI6IkJhc2ljIiwiY2FuX2NyZWF0ZV9zcHJlZWNhc3QiOmZhbHNlLCJhbGxvd19mcmllbmRfcmVxdWVzdHMiOnRydWUsInZjYXQiOm51bGwsInByb2R1Y2VyIjpmYWxzZX0sImlkIjo4NjgzMDY3LCJ0ZXh0IjoiR3JlYXQgcXVlc3Rpb24gUGF1bGluZSIsImFjdGlvbiI6InZpZXdlciIsInJlY2lwaWVudF9pZCI6bnVsbCwiY3JlYXRlZF9hdCI6MTQyNzIxNDcwMS4wfSx7InVzZXJfaWQiOiJwYXVsaW5lLS00MyIsInVzZXIiOnsiYWJvdXRfbWUiOm51bGwsImZpcnN0X25hbWUiOiJQYXVsaW5lIiwiaGFzX2JlZW5fYXV0aGVudGljYXRlZCI6dHJ1ZSwibGFzdF9uYW1lIjoiUGhlbHBzIiwibmVlZHNfdG9fY29uZmlybV9lbWFpbCI6ZmFsc2UsInVzZXJfaWQiOiJwYXVsaW5lLS00MyIsImFsdCI6OTY2OTI4LCJhZG1pbiI6ZmFsc2UsImNvbnRlbnRfbW9kIjpmYWxzZSwicHJvZmlsZV9waG90b190aHVtYl91cmwiOiIvL3MzLmFtYXpvbmF3cy5jb20vc3ByZWVjYXN0LXBob3Rvcy9wcm9kdWN0aW9uL3VzZXJzLzk2NjkyOC90aWxlXzMweDMwLzk2NjkyOF9waG90by5qcGc/MTQyNzIxMjg1NyIsImlzX2ZiIjp0cnVlLCJwcHZfYXBwcm92ZWQiOmZhbHNlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbXSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJCYXNpYyIsImNhbl9jcmVhdGVfc3ByZWVjYXN0IjpmYWxzZSwiYWxsb3dfZnJpZW5kX3JlcXVlc3RzIjp0cnVlLCJ2Y2F0IjpudWxsLCJwcm9kdWNlciI6ZmFsc2V9LCJpZCI6ODY4MzA2OCwidGV4dCI6IkhpIERvbm5hTWFlISA6KSIsImFjdGlvbiI6InZpZXdlciIsInJlY2lwaWVudF9pZCI6bnVsbCwiY3JlYXRlZF9hdCI6MTQyNzIxNDczMi4wfSx7InVzZXJfaWQiOiJkb25uYW1hZSIsInVzZXIiOnsiYWJvdXRfbWUiOm51bGwsImZpcnN0X25hbWUiOiJEb25uYU1hZSIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IkdyZWF2ZXMiLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6ImRvbm5hbWFlIiwiYWx0Ijo5NjY5MTYsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvOTY2OTE2L3RpbGVfMzB4MzAvOTY2OTE2X3Bob3RvLmpwZz8xNDI3MjExMDIzIiwiaXNfZmIiOnRydWUsInBwdl9hcHByb3ZlZCI6ZmFsc2UsImlzX2FmZmlsaWF0ZSI6ZmFsc2UsImZvbGxvd2luZ19ldmVudHMiOltdLCJpc19sb2NrZWQiOnRydWUsInBsYW5fbmFtZSI6IkJhc2ljIiwiY2FuX2NyZWF0ZV9zcHJlZWNhc3QiOmZhbHNlLCJhbGxvd19mcmllbmRfcmVxdWVzdHMiOnRydWUsInZjYXQiOm51bGwsInByb2R1Y2VyIjpmYWxzZX0sImlkIjo4NjgzMDcwLCJ0ZXh0IjoiOikgaGkgaG9uZXkiLCJhY3Rpb24iOiJ2aWV3ZXIiLCJyZWNpcGllbnRfaWQiOm51bGwsImNyZWF0ZWRfYXQiOjE0MjcyMTQ3NjIuMH0seyJ1c2VyX2lkIjoiY2FtaWxsZS0tMTAzIiwidXNlciI6eyJhYm91dF9tZSI6bnVsbCwiZmlyc3RfbmFtZSI6IkNhbWlsbGUiLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjp0cnVlLCJsYXN0X25hbWUiOiJDYXJhc3F1ZXJvIiwibmVlZHNfdG9fY29uZmlybV9lbWFpbCI6ZmFsc2UsInVzZXJfaWQiOiJjYW1pbGxlLS0xMDMiLCJhbHQiOjk2NjkzNiwiYWRtaW4iOmZhbHNlLCJjb250ZW50X21vZCI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiLy9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1waG90b3MvcHJvZHVjdGlvbi91c2Vycy85NjY5MzYvdGlsZV8zMHgzMC85NjY5MzZfcGhvdG8uanBnPzE0MjcyMTM0OTAiLCJpc19mYiI6dHJ1ZSwicHB2X2FwcHJvdmVkIjpmYWxzZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6W10sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiQmFzaWMiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6ZmFsc2UsImFsbG93X2ZyaWVuZF9yZXF1ZXN0cyI6dHJ1ZSwidmNhdCI6bnVsbCwicHJvZHVjZXIiOmZhbHNlfSwiaWQiOjg2ODMwNzEsInRleHQiOiJ0aGFuayB5b3UgWW91ciBHcmFjZSIsImFjdGlvbiI6InZpZXdlciIsInJlY2lwaWVudF9pZCI6bnVsbCwiY3JlYXRlZF9hdCI6MTQyNzIxNDc3OC4wfSx7InVzZXJfaWQiOiJ0aGUtYXJjaGRpb2Nlc2Utb2YtcG9ydC1vZi1zcGFpbiIsInVzZXIiOnsiYWJvdXRfbWUiOiJUaGUgQ2F0aG9saWMgQ2h1cmNoIHdhcyBpbnRyb2R1Y2VkIHRvIFRyaW5pZGFkIHdpdGggdGhlIGNvbWluZyBvZiBDb2x1bWJ1cyBpbiAxNDk4IGFuZCB0aGUgc3Vic2VxdWVudCBTcGFuaXNoIHNldHRsZW1lbnQgYW5kIGVzdGFibGlzaG1lbnQgb2YgdGhlIFBhcmlzaCBhbmQgQ2h1cmNoIG9mIFN0LiBKb3NlcGggYnkgQW50b25pbyBkZSBCZXJyaW8gaW4gMTU5Mi4gVGhlIENodXJjaCB3YXMgZnVydGhlciBhc3N1cmVkIG9mIGl0cyBjb250aW51aXR5IGFmdGVyIHRoZSBpc2xhbmQgd2FzIGxvc3QgdG8gdGhlIEJyaXRpc2ggYXMgQXJ0aWNsZSBFbGV2ZW4gb2YgdGhlIENhcGl0dWxhdGlvbiBvZiAxNzk3IGd1YXJhbnRlZWQgdGhlIGluaGFiaXRhbnRzLCBtb3N0IG9mIHdob20gd2VyZSBDYXRob2xpYywgZnJlZWRvbSB0byBwcmFjdGljZSB0aGVpciByZWxpZ2lvbi4gVHJpbmlkYWQgd2FzIHRoZW4gdW5kZXIgdGhlIGp1cmlzZGljdGlvbiBvZiB0aGUgRGlvY2VzZSBvZiBHdXlhbmEgYmFzZWQgYXQgU2FuIFRvbWUgZGUgQW5nb3N0dXJhIChWZW5lenVlbGEpIHdoaWNoIHdhcyBlcmVjdGVkIGluIDE3OTAuIFRoZSBpc2xhbmQgd2FzIHByZXZpb3VzbHkgcGFydCBvZiB0aGUgRGlvY2VzZSBvZiBQdWVydG8gUmljbywgZm91bmRlZCBpbiAxNTMyLlxyXG5cclxuT24gMzB0aCBBcHJpbCwgMTg1MCBQb3BlIFBpdXMgSVggdHJhbnNmb3JtZWQgdGhlIFZpY2FyaWF0ZSBpbnRvIHRoZSBBcmNoZGlvY2VzZSBvZiBQb3J0LW9mLVNwYWluIHdpdGgganVyaXNkaWN0aW9uIG92ZXIgU3QuIEx1Y2lhLCBTdC4gVmluY2VudCwgR3JlbmFkYSBhbmQgVG9iYWdvIGFuZCB3aXRoIFJvc2VhdSwgRG9taW5pY2EgYXMgaXRzIHN1ZmZyYWdhbiBzZWUuIEluIDE4NTAsIHRoZSBDYXRob2xpYyBwb3B1bGF0aW9uIG9mIFRyaW5pZGFkIHN0b29kIGF0IDQ0LDAwMCBvdXQgb2YgYSB0b3RhbCBvZiA3MCwwMDAgcGVyc29ucy4gVGhlcmUgd2VyZSBzaXh0ZWVuIHBhcmlzaGVzIHNlcnZlZCBieSB0d2VudHkgcmVzaWRlbnQgcHJpZXN0cywgd2l0aCB0aGlydGVlbiBwcmltYXJ5IHNjaG9vbHMgYWxvbmcgd2l0aCBTdC4gSm9zZXBoXHUyMDE5cyBDb252ZW50LCBQb3J0LW9mLVNwYWluICgxODM2KSBhbmQgU3QuIEdlb3JnZVx1MjAxOXMgQ29sbGVnZSAoMTgzOCkuIFRoZSBDaHVyY2hcdTIwMTlzIG5ldyBzdGF0dXMgd2FzIG9mIGFkZGVkIHNpZ25pZmljYW5jZSBhcyBpdCB3YXMgbWFkZSBtb250aHMgYmVmb3JlIHRoZSBoaWVyYXJjaHkgd2FzIHJlc3RvcmVkIGluIEVuZ2xhbmQgb24gMjR0aCBTZXB0ZW1iZXIgMTg1MC4gSW5kZWVkIHRoZSBDaHVyY2ggb2YgUG9ydC1vZi1TcGFpbiBsYXlzIGNsYWltIHRvIGJlIG9uZSBvZiB0aGUgb2xkZXN0IGluIHRoZSBFbmdsaXNoLXNwZWFraW5nIHdvcmxkLiIsImZpcnN0X25hbWUiOiJUaGUgQXJjaGRpb2Nlc2Ugb2YgUG9ydCBvZiBTcGFpbiAiLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjp0cnVlLCJsYXN0X25hbWUiOiIiLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6InRoZS1hcmNoZGlvY2VzZS1vZi1wb3J0LW9mLXNwYWluIiwiYWx0Ijo5NjQ1MzYsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvOTY0NTM2L3RpbGVfMzB4MzAvOTY0NTM2X3Bob3RvLmpwZz8xNDI2NjA0NDkwIiwiaXNfZmIiOmZhbHNlLCJwcHZfYXBwcm92ZWQiOmZhbHNlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbXSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJCcm9uemUiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6dHJ1ZSwiYWxsb3dfZnJpZW5kX3JlcXVlc3RzIjp0cnVlLCJ2Y2F0IjpudWxsLCJwcm9kdWNlciI6dHJ1ZX0sImlkIjo4NjgzMDczLCJ0ZXh0IjoiS2VlcCB0aGUgcXVlc3Rpb25zIGNvbWluZyBldmVyeW9uZSEiLCJhY3Rpb24iOiJ2aWV3ZXIiLCJyZWNpcGllbnRfaWQiOm51bGwsImNyZWF0ZWRfYXQiOjE0MjcyMTQ3OTkuMH0seyJ1c2VyX2lkIjoiaGFsbGUtLTEwIiwidXNlciI6eyJhYm91dF9tZSI6bnVsbCwiZmlyc3RfbmFtZSI6IkhhbGxlIiwiaGFzX2JlZW5fYXV0aGVudGljYXRlZCI6dHJ1ZSwibGFzdF9uYW1lIjoiTGV3aXMiLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6ImhhbGxlLS0xMCIsImFsdCI6OTY1NDE5LCJhZG1pbiI6ZmFsc2UsImNvbnRlbnRfbW9kIjpmYWxzZSwicHJvZmlsZV9waG90b190aHVtYl91cmwiOiIvL3MzLmFtYXpvbmF3cy5jb20vc3ByZWVjYXN0LXBob3Rvcy9wcm9kdWN0aW9uL3VzZXJzLzk2NTQxOS90aWxlXzMweDMwLzk2NTQxOV9waG90by5qcGc/MTQyNjc5MDk4MiIsImlzX2ZiIjp0cnVlLCJwcHZfYXBwcm92ZWQiOmZhbHNlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbXSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJCYXNpYyIsImNhbl9jcmVhdGVfc3ByZWVjYXN0IjpmYWxzZSwiYWxsb3dfZnJpZW5kX3JlcXVlc3RzIjp0cnVlLCJ2Y2F0IjpudWxsLCJwcm9kdWNlciI6ZmFsc2V9LCJpZCI6ODY4MzA4MSwidGV4dCI6IlRoYW5rIHlvdSBhbGwiLCJhY3Rpb24iOiJ2aWV3ZXIiLCJyZWNpcGllbnRfaWQiOm51bGwsImNyZWF0ZWRfYXQiOjE0MjcyMTQ5NzUuMH0seyJ1c2VyX2lkIjoiZHJld3BlYWNvY2siLCJ1c2VyIjp7ImFib3V0X21lIjoiIiwiZmlyc3RfbmFtZSI6IkRyZXdQZWFjb2NrIiwiaGFzX2JlZW5fYXV0aGVudGljYXRlZCI6dHJ1ZSwibGFzdF9uYW1lIjoiIiwibmVlZHNfdG9fY29uZmlybV9lbWFpbCI6ZmFsc2UsInVzZXJfaWQiOiJkcmV3cGVhY29jayIsImFsdCI6OTY2OTM0LCJhZG1pbiI6ZmFsc2UsImNvbnRlbnRfbW9kIjpmYWxzZSwicHJvZmlsZV9waG90b190aHVtYl91cmwiOiIvcHJvZmlsZV9waG90b3MvdGlsZV8zMHgzMC9ub3Byb2ZpbGUucG5nIiwiaXNfZmIiOmZhbHNlLCJwcHZfYXBwcm92ZWQiOmZhbHNlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbXSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJCYXNpYyIsImNhbl9jcmVhdGVfc3ByZWVjYXN0IjpmYWxzZSwiYWxsb3dfZnJpZW5kX3JlcXVlc3RzIjp0cnVlLCJ2Y2F0IjpudWxsLCJwcm9kdWNlciI6ZmFsc2V9LCJpZCI6ODY4MzA4NCwidGV4dCI6IldBSElUIiwiYWN0aW9uIjoidmlld2VyIiwicmVjaXBpZW50X2lkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDI3MjE0OTgyLjB9LHsidXNlcl9pZCI6ImRyZXdwZWFjb2NrIiwidXNlciI6eyJhYm91dF9tZSI6IiIsImZpcnN0X25hbWUiOiJEcmV3UGVhY29jayIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IiIsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJ1c2VyX2lkIjoiZHJld3BlYWNvY2siLCJhbHQiOjk2NjkzNCwiYWRtaW4iOmZhbHNlLCJjb250ZW50X21vZCI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiL3Byb2ZpbGVfcGhvdG9zL3RpbGVfMzB4MzAvbm9wcm9maWxlLnBuZyIsImlzX2ZiIjpmYWxzZSwicHB2X2FwcHJvdmVkIjpmYWxzZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6W10sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiQmFzaWMiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6ZmFsc2UsImFsbG93X2ZyaWVuZF9yZXF1ZXN0cyI6dHJ1ZSwidmNhdCI6bnVsbCwicHJvZHVjZXIiOmZhbHNlfSwiaWQiOjg2ODMwODUsInRleHQiOiJ3YWl0IiwiYWN0aW9uIjoidmlld2VyIiwicmVjaXBpZW50X2lkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDI3MjE0OTgzLjB9LHsidXNlcl9pZCI6ImRyZXdwZWFjb2NrIiwidXNlciI6eyJhYm91dF9tZSI6IiIsImZpcnN0X25hbWUiOiJEcmV3UGVhY29jayIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IiIsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJ1c2VyX2lkIjoiZHJld3BlYWNvY2siLCJhbHQiOjk2NjkzNCwiYWRtaW4iOmZhbHNlLCJjb250ZW50X21vZCI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiL3Byb2ZpbGVfcGhvdG9zL3RpbGVfMzB4MzAvbm9wcm9maWxlLnBuZyIsImlzX2ZiIjpmYWxzZSwicHB2X2FwcHJvdmVkIjpmYWxzZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6W10sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiQmFzaWMiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6ZmFsc2UsImFsbG93X2ZyaWVuZF9yZXF1ZXN0cyI6dHJ1ZSwidmNhdCI6bnVsbCwicHJvZHVjZXIiOmZhbHNlfSwiaWQiOjg2ODMwODYsInRleHQiOiJ3YWl0IiwiYWN0aW9uIjoidmlld2VyIiwicmVjaXBpZW50X2lkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDI3MjE0OTg0LjB9LHsidXNlcl9pZCI6ImRyZXdwZWFjb2NrIiwidXNlciI6eyJhYm91dF9tZSI6IiIsImZpcnN0X25hbWUiOiJEcmV3UGVhY29jayIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IiIsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJ1c2VyX2lkIjoiZHJld3BlYWNvY2siLCJhbHQiOjk2NjkzNCwiYWRtaW4iOmZhbHNlLCJjb250ZW50X21vZCI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiL3Byb2ZpbGVfcGhvdG9zL3RpbGVfMzB4MzAvbm9wcm9maWxlLnBuZyIsImlzX2ZiIjpmYWxzZSwicHB2X2FwcHJvdmVkIjpmYWxzZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6W10sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiQmFzaWMiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6ZmFsc2UsImFsbG93X2ZyaWVuZF9yZXF1ZXN0cyI6dHJ1ZSwidmNhdCI6bnVsbCwicHJvZHVjZXIiOmZhbHNlfSwiaWQiOjg2ODMwODcsInRleHQiOiJ3YWl0IiwiYWN0aW9uIjoidmlld2VyIiwicmVjaXBpZW50X2lkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDI3MjE0OTg2LjB9LHsidXNlcl9pZCI6ImRyZXdwZWFjb2NrIiwidXNlciI6eyJhYm91dF9tZSI6IiIsImZpcnN0X25hbWUiOiJEcmV3UGVhY29jayIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IiIsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJ1c2VyX2lkIjoiZHJld3BlYWNvY2siLCJhbHQiOjk2NjkzNCwiYWRtaW4iOmZhbHNlLCJjb250ZW50X21vZCI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiL3Byb2ZpbGVfcGhvdG9zL3RpbGVfMzB4MzAvbm9wcm9maWxlLnBuZyIsImlzX2ZiIjpmYWxzZSwicHB2X2FwcHJvdmVkIjpmYWxzZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6W10sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiQmFzaWMiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6ZmFsc2UsImFsbG93X2ZyaWVuZF9yZXF1ZXN0cyI6dHJ1ZSwidmNhdCI6bnVsbCwicHJvZHVjZXIiOmZhbHNlfSwiaWQiOjg2ODMwODgsInRleHQiOiJ3YWl0IiwiYWN0aW9uIjoidmlld2VyIiwicmVjaXBpZW50X2lkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDI3MjE0OTg3LjB9LHsidXNlcl9pZCI6ImRyZXdwZWFjb2NrIiwidXNlciI6eyJhYm91dF9tZSI6IiIsImZpcnN0X25hbWUiOiJEcmV3UGVhY29jayIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IiIsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJ1c2VyX2lkIjoiZHJld3BlYWNvY2siLCJhbHQiOjk2NjkzNCwiYWRtaW4iOmZhbHNlLCJjb250ZW50X21vZCI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiL3Byb2ZpbGVfcGhvdG9zL3RpbGVfMzB4MzAvbm9wcm9maWxlLnBuZyIsImlzX2ZiIjpmYWxzZSwicHB2X2FwcHJvdmVkIjpmYWxzZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6W10sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiQmFzaWMiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6ZmFsc2UsImFsbG93X2ZyaWVuZF9yZXF1ZXN0cyI6dHJ1ZSwidmNhdCI6bnVsbCwicHJvZHVjZXIiOmZhbHNlfSwiaWQiOjg2ODMwODksInRleHQiOiJ3YWl0IiwiYWN0aW9uIjoidmlld2VyIiwicmVjaXBpZW50X2lkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDI3MjE0OTg4LjB9LHsidXNlcl9pZCI6ImRyZXdwZWFjb2NrIiwidXNlciI6eyJhYm91dF9tZSI6IiIsImZpcnN0X25hbWUiOiJEcmV3UGVhY29jayIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IiIsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJ1c2VyX2lkIjoiZHJld3BlYWNvY2siLCJhbHQiOjk2NjkzNCwiYWRtaW4iOmZhbHNlLCJjb250ZW50X21vZCI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiL3Byb2ZpbGVfcGhvdG9zL3RpbGVfMzB4MzAvbm9wcm9maWxlLnBuZyIsImlzX2ZiIjpmYWxzZSwicHB2X2FwcHJvdmVkIjpmYWxzZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6W10sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiQmFzaWMiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6ZmFsc2UsImFsbG93X2ZyaWVuZF9yZXF1ZXN0cyI6dHJ1ZSwidmNhdCI6bnVsbCwicHJvZHVjZXIiOmZhbHNlfSwiaWQiOjg2ODMwOTAsInRleHQiOiJ3YWl0IiwiYWN0aW9uIjoidmlld2VyIiwicmVjaXBpZW50X2lkIjpudWxsLCJjcmVhdGVkX2F0IjoxNDI3MjE0OTkwLjB9LHsidXNlcl9pZCI6ImRvbm5hbWFlIiwidXNlciI6eyJhYm91dF9tZSI6bnVsbCwiZmlyc3RfbmFtZSI6IkRvbm5hTWFlIiwiaGFzX2JlZW5fYXV0aGVudGljYXRlZCI6dHJ1ZSwibGFzdF9uYW1lIjoiR3JlYXZlcyIsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJ1c2VyX2lkIjoiZG9ubmFtYWUiLCJhbHQiOjk2NjkxNiwiYWRtaW4iOmZhbHNlLCJjb250ZW50X21vZCI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiLy9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1waG90b3MvcHJvZHVjdGlvbi91c2Vycy85NjY5MTYvdGlsZV8zMHgzMC85NjY5MTZfcGhvdG8uanBnPzE0MjcyMTEwMjMiLCJpc19mYiI6dHJ1ZSwicHB2X2FwcHJvdmVkIjpmYWxzZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6W10sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiQmFzaWMiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6ZmFsc2UsImFsbG93X2ZyaWVuZF9yZXF1ZXN0cyI6dHJ1ZSwidmNhdCI6bnVsbCwicHJvZHVjZXIiOmZhbHNlfSwiaWQiOjg2ODMwOTEsInRleHQiOiJWZXJ5IGVuam95YWJsZSB0aGFuayB5b3UiLCJhY3Rpb24iOiJ2aWV3ZXIiLCJyZWNpcGllbnRfaWQiOm51bGwsImNyZWF0ZWRfYXQiOjE0MjcyMTQ5OTIuMH0seyJ1c2VyX2lkIjoiZHJld3BlYWNvY2siLCJ1c2VyIjp7ImFib3V0X21lIjoiIiwiZmlyc3RfbmFtZSI6IkRyZXdQZWFjb2NrIiwiaGFzX2JlZW5fYXV0aGVudGljYXRlZCI6dHJ1ZSwibGFzdF9uYW1lIjoiIiwibmVlZHNfdG9fY29uZmlybV9lbWFpbCI6ZmFsc2UsInVzZXJfaWQiOiJkcmV3cGVhY29jayIsImFsdCI6OTY2OTM0LCJhZG1pbiI6ZmFsc2UsImNvbnRlbnRfbW9kIjpmYWxzZSwicHJvZmlsZV9waG90b190aHVtYl91cmwiOiIvcHJvZmlsZV9waG90b3MvdGlsZV8zMHgzMC9ub3Byb2ZpbGUucG5nIiwiaXNfZmIiOmZhbHNlLCJwcHZfYXBwcm92ZWQiOmZhbHNlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbXSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJCYXNpYyIsImNhbl9jcmVhdGVfc3ByZWVjYXN0IjpmYWxzZSwiYWxsb3dfZnJpZW5kX3JlcXVlc3RzIjp0cnVlLCJ2Y2F0IjpudWxsLCJwcm9kdWNlciI6ZmFsc2V9LCJpZCI6ODY4MzA5MiwidGV4dCI6IndhaXQiLCJhY3Rpb24iOiJ2aWV3ZXIiLCJyZWNpcGllbnRfaWQiOm51bGwsImNyZWF0ZWRfYXQiOjE0MjcyMTQ5OTIuMH0seyJ1c2VyX2lkIjoiZHJld3BlYWNvY2siLCJ1c2VyIjp7ImFib3V0X21lIjoiIiwiZmlyc3RfbmFtZSI6IkRyZXdQZWFjb2NrIiwiaGFzX2JlZW5fYXV0aGVudGljYXRlZCI6dHJ1ZSwibGFzdF9uYW1lIjoiIiwibmVlZHNfdG9fY29uZmlybV9lbWFpbCI6ZmFsc2UsInVzZXJfaWQiOiJkcmV3cGVhY29jayIsImFsdCI6OTY2OTM0LCJhZG1pbiI6ZmFsc2UsImNvbnRlbnRfbW9kIjpmYWxzZSwicHJvZmlsZV9waG90b190aHVtYl91cmwiOiIvcHJvZmlsZV9waG90b3MvdGlsZV8zMHgzMC9ub3Byb2ZpbGUucG5nIiwiaXNfZmIiOmZhbHNlLCJwcHZfYXBwcm92ZWQiOmZhbHNlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbXSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJCYXNpYyIsImNhbl9jcmVhdGVfc3ByZWVjYXN0IjpmYWxzZSwiYWxsb3dfZnJpZW5kX3JlcXVlc3RzIjp0cnVlLCJ2Y2F0IjpudWxsLCJwcm9kdWNlciI6ZmFsc2V9LCJpZCI6ODY4MzA5MywidGV4dCI6IndhaXQiLCJhY3Rpb24iOiJ2aWV3ZXIiLCJyZWNpcGllbnRfaWQiOm51bGwsImNyZWF0ZWRfYXQiOjE0MjcyMTQ5OTQuMH0seyJ1c2VyX2lkIjoiZHJld3BlYWNvY2siLCJ1c2VyIjp7ImFib3V0X21lIjoiIiwiZmlyc3RfbmFtZSI6IkRyZXdQZWFjb2NrIiwiaGFzX2JlZW5fYXV0aGVudGljYXRlZCI6dHJ1ZSwibGFzdF9uYW1lIjoiIiwibmVlZHNfdG9fY29uZmlybV9lbWFpbCI6ZmFsc2UsInVzZXJfaWQiOiJkcmV3cGVhY29jayIsImFsdCI6OTY2OTM0LCJhZG1pbiI6ZmFsc2UsImNvbnRlbnRfbW9kIjpmYWxzZSwicHJvZmlsZV9waG90b190aHVtYl91cmwiOiIvcHJvZmlsZV9waG90b3MvdGlsZV8zMHgzMC9ub3Byb2ZpbGUucG5nIiwiaXNfZmIiOmZhbHNlLCJwcHZfYXBwcm92ZWQiOmZhbHNlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbXSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJCYXNpYyIsImNhbl9jcmVhdGVfc3ByZWVjYXN0IjpmYWxzZSwiYWxsb3dfZnJpZW5kX3JlcXVlc3RzIjp0cnVlLCJ2Y2F0IjpudWxsLCJwcm9kdWNlciI6ZmFsc2V9LCJpZCI6ODY4MzA5NCwidGV4dCI6IndhaSIsImFjdGlvbiI6InZpZXdlciIsInJlY2lwaWVudF9pZCI6bnVsbCwiY3JlYXRlZF9hdCI6MTQyNzIxNDk5NS4wfV19LCJ2aXNpYmxlX3VzZXJzX2RpZ2VzdCI6W10sImluaXRpYWxfdmlzaWJsZV91c2VycyI6eyJhY3Rpb24iOiJ1cGRhdGUiLCJjdXJyZW50X3ZpZXdlcnNfY291bnQiOjEzLCJ2aXNpYmxlX3VzZXJzIjpbeyJhYm91dF9tZSI6IlRoZSBDYXRob2xpYyBDaHVyY2ggd2FzIGludHJvZHVjZWQgdG8gVHJpbmlkYWQgd2l0aCB0aGUgY29taW5nIG9mIENvbHVtYnVzIGluIDE0OTggYW5kIHRoZSBzdWJzZXF1ZW50IFNwYW5pc2ggc2V0dGxlbWVudCBhbmQgZXN0YWJsaXNobWVudCBvZiB0aGUgUGFyaXNoIGFuZCBDaHVyY2ggb2YgU3QuIEpvc2VwaCBieSBBbnRvbmlvIGRlIEJlcnJpbyBpbiAxNTkyLiBUaGUgQ2h1cmNoIHdhcyBmdXJ0aGVyIGFzc3VyZWQgb2YgaXRzIGNvbnRpbnVpdHkgYWZ0ZXIgdGhlIGlzbGFuZCB3YXMgbG9zdCB0byB0aGUgQnJpdGlzaCBhcyBBcnRpY2xlIEVsZXZlbiBvZiB0aGUgQ2FwaXR1bGF0aW9uIG9mIDE3OTcgZ3VhcmFudGVlZCB0aGUgaW5oYWJpdGFudHMsIG1vc3Qgb2Ygd2hvbSB3ZXJlIENhdGhvbGljLCBmcmVlZG9tIHRvIHByYWN0aWNlIHRoZWlyIHJlbGlnaW9uLiBUcmluaWRhZCB3YXMgdGhlbiB1bmRlciB0aGUganVyaXNkaWN0aW9uIG9mIHRoZSBEaW9jZXNlIG9mIEd1eWFuYSBiYXNlZCBhdCBTYW4gVG9tZSBkZSBBbmdvc3R1cmEgKFZlbmV6dWVsYSkgd2hpY2ggd2FzIGVyZWN0ZWQgaW4gMTc5MC4gVGhlIGlzbGFuZCB3YXMgcHJldmlvdXNseSBwYXJ0IG9mIHRoZSBEaW9jZXNlIG9mIFB1ZXJ0byBSaWNvLCBmb3VuZGVkIGluIDE1MzIuXHJcblxyXG5PbiAzMHRoIEFwcmlsLCAxODUwIFBvcGUgUGl1cyBJWCB0cmFuc2Zvcm1lZCB0aGUgVmljYXJpYXRlIGludG8gdGhlIEFyY2hkaW9jZXNlIG9mIFBvcnQtb2YtU3BhaW4gd2l0aCBqdXJpc2RpY3Rpb24gb3ZlciBTdC4gTHVjaWEsIFN0LiBWaW5jZW50LCBHcmVuYWRhIGFuZCBUb2JhZ28gYW5kIHdpdGggUm9zZWF1LCBEb21pbmljYSBhcyBpdHMgc3VmZnJhZ2FuIHNlZS4gSW4gMTg1MCwgdGhlIENhdGhvbGljIHBvcHVsYXRpb24gb2YgVHJpbmlkYWQgc3Rvb2QgYXQgNDQsMDAwIG91dCBvZiBhIHRvdGFsIG9mIDcwLDAwMCBwZXJzb25zLiBUaGVyZSB3ZXJlIHNpeHRlZW4gcGFyaXNoZXMgc2VydmVkIGJ5IHR3ZW50eSByZXNpZGVudCBwcmllc3RzLCB3aXRoIHRoaXJ0ZWVuIHByaW1hcnkgc2Nob29scyBhbG9uZyB3aXRoIFN0LiBKb3NlcGhcdTIwMTlzIENvbnZlbnQsIFBvcnQtb2YtU3BhaW4gKDE4MzYpIGFuZCBTdC4gR2VvcmdlXHUyMDE5cyBDb2xsZWdlICgxODM4KS4gVGhlIENodXJjaFx1MjAxOXMgbmV3IHN0YXR1cyB3YXMgb2YgYWRkZWQgc2lnbmlmaWNhbmNlIGFzIGl0IHdhcyBtYWRlIG1vbnRocyBiZWZvcmUgdGhlIGhpZXJhcmNoeSB3YXMgcmVzdG9yZWQgaW4gRW5nbGFuZCBvbiAyNHRoIFNlcHRlbWJlciAxODUwLiBJbmRlZWQgdGhlIENodXJjaCBvZiBQb3J0LW9mLVNwYWluIGxheXMgY2xhaW0gdG8gYmUgb25lIG9mIHRoZSBvbGRlc3QgaW4gdGhlIEVuZ2xpc2gtc3BlYWtpbmcgd29ybGQuIiwiZmlyc3RfbmFtZSI6IlRoZSBBcmNoZGlvY2VzZSBvZiBQb3J0IG9mIFNwYWluICIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOnRydWUsImxhc3RfbmFtZSI6IiIsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJ1c2VyX2lkIjoidGhlLWFyY2hkaW9jZXNlLW9mLXBvcnQtb2Ytc3BhaW4iLCJhbHQiOjk2NDUzNiwiYWRtaW4iOmZhbHNlLCJjb250ZW50X21vZCI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiLy9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1waG90b3MvcHJvZHVjdGlvbi91c2Vycy85NjQ1MzYvdGlsZV8zMHgzMC85NjQ1MzZfcGhvdG8uanBnPzE0MjY2MDQ0OTAiLCJpc19mYiI6ZmFsc2UsInBwdl9hcHByb3ZlZCI6ZmFsc2UsImlzX2FmZmlsaWF0ZSI6ZmFsc2UsImZvbGxvd2luZ19ldmVudHMiOlsxNjM1MDhdLCJpc19sb2NrZWQiOnRydWUsInBsYW5fbmFtZSI6IkJyb256ZSIsImNhbl9jcmVhdGVfc3ByZWVjYXN0Ijp0cnVlLCJhbGxvd19mcmllbmRfcmVxdWVzdHMiOnRydWUsInByb3Bvc2VkX3Byb21vdGlvbiI6MCwicHJvZHVjZXIiOnRydWUsImJyb2FkY2FzdF9zdGF0dXMiOjIsImlzX3B1Ymxpc2hpbmciOnRydWUsImlzX2Nvbm5lY3RlZCI6dHJ1ZSwib3duZXIiOnRydWUsImFjdGlvbiI6bnVsbCwiaXNfYmFubmVkIjpmYWxzZSwicHJldmlld19sb2NhdGlvbiI6InJ0bWZwOi8vZWMyLTEwNy0yMS0yMzctMTE3LmNvbXB1dGUtMS5hbWF6b25hd3MuY29tL2xpdmUvNDIyNWE4NzMuNTUxMThkOGIuNTA4LlN1ZEtqajJ4R1JRVjZWTms2dlM2LjAiLCJyb2xlIjoiQkFoN0NFa2lEV1YyWlc1MFgybGtCam9HUlVaSklnc3hOak0xTURnR093QkdTU0lNZFhObGNsOXBaQVk3QUVacEE3aTNEa2tpQzJselgzWnBjQVk3QUVaVS0tYTRhODNkOGYxNjU2M2VjYWNlZWQ2YTE3MTNiNzI5MjcxMThjYzIwZCIsIm1pY3JvcGhvbmVfZ2Fpbl9sZXZlbCI6NzEsInN0YXJyZWRfYXQiOm51bGwsIm9uYWlyIjp0cnVlLCJ2Y2F0Ijoib25haXIiLCJwb3NpdGlvbiI6MH0seyJhYm91dF9tZSI6IiIsImZpcnN0X25hbWUiOiJBcmNoYmlzaG9wSGFycmlzIiwiaGFzX2JlZW5fYXV0aGVudGljYXRlZCI6dHJ1ZSwibGFzdF9uYW1lIjoiIiwibmVlZHNfdG9fY29uZmlybV9lbWFpbCI6ZmFsc2UsInVzZXJfaWQiOiJhcmNoYmlzaG9waGFycmlzIiwiYWx0Ijo5NjY5MDcsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvOTY2OTA3L3RpbGVfMzB4MzAvOTY2OTA3X3Bob3RvLmpwZz8xNDI3MjExNzUzIiwiaXNfZmIiOmZhbHNlLCJwcHZfYXBwcm92ZWQiOmZhbHNlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbMTYzNTA4XSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJCYXNpYyIsImNhbl9jcmVhdGVfc3ByZWVjYXN0IjpmYWxzZSwiYWxsb3dfZnJpZW5kX3JlcXVlc3RzIjp0cnVlLCJwcm9wb3NlZF9wcm9tb3Rpb24iOjAsInByb2R1Y2VyIjpmYWxzZSwiYnJvYWRjYXN0X3N0YXR1cyI6MiwiaXNfcHVibGlzaGluZyI6dHJ1ZSwiaXNfY29ubmVjdGVkIjp0cnVlLCJvd25lciI6ZmFsc2UsImFjdGlvbiI6bnVsbCwiaXNfYmFubmVkIjpmYWxzZSwicHJldmlld19sb2NhdGlvbiI6InJ0bWZwOi8vZWMyLTEwNy0yMS0yMzctMTk1LmNvbXB1dGUtMS5hbWF6b25hd3MuY29tL2xpdmUvYTQ4MTBjNDQuNTUxMTg4NmIuNTA4LmFtRWdnb214czFpcUdLejJrREhhLjAiLCJyb2xlIjoiQkFoN0NFa2lEV1YyWlc1MFgybGtCam9HUlVaSklnc3hOak0xTURnR093QkdTU0lNZFhObGNsOXBaQVk3QUVacEEvdkFEa2tpQzJselgzWnBjQVk3QUVaRy0tN2NjZGQ5M2I0MjllYTI3NmYyYzczNjBhNTMyNTIzYjI3YWY2ZjU2ZCIsIm1pY3JvcGhvbmVfZ2Fpbl9sZXZlbCI6NzMsInN0YXJyZWRfYXQiOm51bGwsIm9uYWlyIjp0cnVlLCJ2Y2F0Ijoib25haXIiLCJwb3NpdGlvbiI6MX1dLCJzdHJlYW1fcXVhbGl0aWVzIjp7Ijk2NDUzNiI6eyJzdHJlYW1fcXVhbGl0eSI6IjY0IiwicGluZyI6IjE0NiIsImJpdHJhdGUiOiIyNjMiLCJwYWNrZXRfbG9zcyI6IjMuNyIsImRpc3BsYXlfcXVhbGl0eSI6IjQwIn0sIjIxMDg5NSI6eyJzdHJlYW1fcXVhbGl0eSI6Ijg2IiwicGluZyI6Ijk0IiwiYml0cmF0ZSI6IjM0NSIsInBhY2tldF9sb3NzIjoiMC44IiwiZGlzcGxheV9xdWFsaXR5IjoiNzYifSwiOTY2OTA3Ijp7InN0cmVhbV9xdWFsaXR5IjoiNzYiLCJwaW5nIjoiODciLCJiaXRyYXRlIjoiMzAyIiwicGFja2V0X2xvc3MiOiIyLjMiLCJkaXNwbGF5X3F1YWxpdHkiOiI0NCJ9fX0sIm5vd19icm9hZGNhc3RpbmciOmZhbHNlLCJhcmNoaXZlX2NodW5rX2luZGV4Ijp7ImJhc2VfdXJsIjoiaHR0cHM6Ly9zcHJlZWNhc3QtYXJjaGl2ZXMuczMuYW1hem9uYXdzLmNvbS9wcm9kdWN0aW9uLzIwMTUwMzE4MTc0NjMyXzE2MzUwOC9tZXNzYWdlcy8iLCJiYW5uZWRfdXNlcnMiOltdLCJiYW5uZWRfY2hhdHMiOls4NjgzMDIxXSwiYWRzIjpbXSwiY2hhdHMiOlt7InRpbWVzdGFtcCI6MTQyNzIxMzIxMiwidXJsIjoiY2hhdHMvY2h1bmstMTQyNzIxMzIxMi5qc29uIiwiY2FsbGJhY2siOiJzcHJlZWNhc3RfY2h1bmtfMTYzNTA4XzE0MjcyMTMyMTIiLCJzaXplIjoyNX0seyJ0aW1lc3RhbXAiOjE0MjcyMTQ5ODQsInVybCI6ImNoYXRzL2NodW5rLTE0MjcyMTQ5ODQuanNvbiIsImNhbGxiYWNrIjoic3ByZWVjYXN0X2NodW5rXzE2MzUwOF8xNDI3MjE0OTg0Iiwic2l6ZSI6OX1dLCJxdWVzdGlvbnMiOlt7InRpbWVzdGFtcCI6MTQyNzIxMzIxNywidXJsIjoicXVlc3Rpb25zL2NodW5rLTE0MjcyMTMyMTcuanNvbiIsImNhbGxiYWNrIjoic3ByZWVjYXN0X2NodW5rXzE2MzUwOF8xNDI3MjEzMjE3Iiwic2l6ZSI6MjV9LHsidGltZXN0YW1wIjoxNDI3MjE0NjkyLCJ1cmwiOiJxdWVzdGlvbnMvY2h1bmstMTQyNzIxNDY5Mi5qc29uIiwiY2FsbGJhY2siOiJzcHJlZWNhc3RfY2h1bmtfMTYzNTA4XzE0MjcyMTQ2OTIiLCJzaXplIjo5fV0sInZpZGVvX3NuYXBzaG90cyI6W3sidGltZXN0YW1wIjoxNDI3MjEzMTEwLCJ1cmwiOiJ2aWRlb19zbmFwc2hvdHMvY2h1bmstMTQyNzIxMzExMC5qc29uIiwiY2FsbGJhY2siOiJzcHJlZWNhc3RfY2h1bmtfMTYzNTA4XzE0MjcyMTMxMTAiLCJzaXplIjo1fV0sInZpc2libGVfdXNlcnMiOlt7InRpbWVzdGFtcCI6MTQyNzIxMzEyOSwidXJsIjoidmlzaWJsZV91c2Vycy9jaHVuay0xNDI3MjEzMTI5Lmpzb24iLCJjYWxsYmFjayI6InNwcmVlY2FzdF9jaHVua18xNjM1MDhfMTQyNzIxMzEyOSIsInNpemUiOjI1fSx7InRpbWVzdGFtcCI6MTQyNzIxNDExMCwidXJsIjoidmlzaWJsZV91c2Vycy9jaHVuay0xNDI3MjE0MTEwLmpzb24iLCJjYWxsYmFjayI6InNwcmVlY2FzdF9jaHVua18xNjM1MDhfMTQyNzIxNDExMCIsInNpemUiOjI1fSx7InRpbWVzdGFtcCI6MTQyNzIxNDk1NCwidXJsIjoidmlzaWJsZV91c2Vycy9jaHVuay0xNDI3MjE0OTU0Lmpzb24iLCJjYWxsYmFjayI6InNwcmVlY2FzdF9jaHVua18xNjM1MDhfMTQyNzIxNDk1NCIsInNpemUiOjN9XSwibWVkaWFfaXRlbXMiOltdLCJtYXhfaWRzIjp7InZpc2libGVfdXNlcnMiOjU4NDU2ODQ4LCJxdWVzdGlvbnMiOjU4NDU2ODQ1LCJjaGF0cyI6ODY4MzA5NCwidmlkZW9fc25hcHNob3RzIjo1ODQ1Njg0Nn19LCJzdGl0Y2hfdXJscyI6eyJhcmNoaXZlX2hscyI6eyJoaWdoIjp7ImgyNjQiOnsiYWFjIjoiaHR0cDovL2QxNG9tZWJkbmdkZnVhLmNsb3VkZnJvbnQubmV0L3Byb2R1Y3Rpb24vMTYzNTA4L2F2cC9hcmNoaXZlXzIwMTUwMzI0X2M0YWU1NDcxYTgwNi9hcmNoaXZlX2hpZ2gubTN1OCJ9fSwibWVkaXVtIjp7ImgyNjQiOnsiYWFjIjoiaHR0cDovL3NwcmVlY2FzdC1hcmNoaXZlcy5zMy5hbWF6b25hd3MuY29tL3Byb2R1Y3Rpb24vMTYzNTA4L2F2cC9saXZlXzAwMS9hcmNoaXZlX21lZGl1bS5tM3U4In19LCJhdWRpbyI6eyJoMjY0Ijp7ImFhYyI6Imh0dHA6Ly9kMTRvbWViZG5nZGZ1YS5jbG91ZGZyb250Lm5ldC9wcm9kdWN0aW9uLzE2MzUwOC9hdnAvYXJjaGl2ZV8yMDE1MDMyNF9jNGFlNTQ3MWE4MDYvYXJjaGl2ZV9hdWRpby5tM3U4In19fSwiYXJjaGl2ZV9tb3YiOnsiaGlnaCI6eyJoMjY0Ijp7ImFhYyI6Imh0dHA6Ly9kMTRvbWViZG5nZGZ1YS5jbG91ZGZyb250Lm5ldC9wcm9kdWN0aW9uLzE2MzUwOC9hdnAvYXJjaGl2ZV8yMDE1MDMyNF9jNGFlNTQ3MWE4MDYvaGlnaC5tb3YifX0sImF1ZGlvIjp7ImgyNjQiOnsiYWFjIjoiaHR0cDovL2QxNG9tZWJkbmdkZnVhLmNsb3VkZnJvbnQubmV0L3Byb2R1Y3Rpb24vMTYzNTA4L2F2cC9hcmNoaXZlXzIwMTUwMzI0X2M0YWU1NDcxYTgwNi9hdWRpby5tb3YifX19LCJhcmNoaXZlX21wNCI6eyJoaWdoIjp7ImgyNjQiOnsiYWFjIjoiaHR0cDovL2QxNG9tZWJkbmdkZnVhLmNsb3VkZnJvbnQubmV0L3Byb2R1Y3Rpb24vMTYzNTA4L2F2cC9hcmNoaXZlXzIwMTUwMzI0X2M0YWU1NDcxYTgwNi9oaWdoLm1wNCJ9fSwibWVkaXVtIjp7ImgyNjQiOnsiYWFjIjoiaHR0cDovL2QxNG9tZWJkbmdkZnVhLmNsb3VkZnJvbnQubmV0L3Byb2R1Y3Rpb24vMTYzNTA4L2F2cC9hcmNoaXZlXzIwMTUwMzI0X2U3YTczZTMzYjRhMS9tZWRpdW0ubXA0In19LCJsb3ciOnsiaDI2NCI6eyJhYWMiOiJodHRwOi8vZDE0b21lYmRuZ2RmdWEuY2xvdWRmcm9udC5uZXQvcHJvZHVjdGlvbi8xNjM1MDgvYXZwL2FyY2hpdmVfMjAxNTAzMjRfYzRhZTU0NzFhODA2L2xvdy5tcDQifX0sImF1ZGlvIjp7ImgyNjQiOnsiYWFjIjoiaHR0cDovL2QxNG9tZWJkbmdkZnVhLmNsb3VkZnJvbnQubmV0L3Byb2R1Y3Rpb24vMTYzNTA4L2F2cC9hcmNoaXZlXzIwMTUwMzI0X2M0YWU1NDcxYTgwNi9hdWRpby5tcDQifX19LCJhcmNoaXZlX3J0bXAiOnsiaGlnaCI6eyJoMjY0Ijp7ImFhYyI6InJ0bXA6Ly9zM2k5cnlncW4yMjJndS5jbG91ZGZyb250Lm5ldC9jZngvc3QvbXA0OnByb2R1Y3Rpb24vMTYzNTA4L2F2cC9hcmNoaXZlXzIwMTUwMzI0X2M0YWU1NDcxYTgwNi9oaWdoLm1wNCJ9fSwibWVkaXVtIjp7ImgyNjQiOnsiYWFjIjoicnRtcDovL3MzaTlyeWdxbjIyMmd1LmNsb3VkZnJvbnQubmV0L2NmeC9zdC9tcDQ6cHJvZHVjdGlvbi8xNjM1MDgvYXZwL2FyY2hpdmVfMjAxNTAzMjRfZTdhNzNlMzNiNGExL21lZGl1bS5tcDQifX19fSwiYmFzZV91cmwiOiJodHRwczovL3NwcmVlY2FzdC1hcmNoaXZlcy5zMy5hbWF6b25hd3MuY29tL3Byb2R1Y3Rpb24vMjAxNTAzMTgxNzQ2MzJfMTYzNTA4L21lc3NhZ2VzLyIsImFkX2RpZ2VzdCI6W10sImlzX2V4cGlyZWQiOmZhbHNlLCJ1bmxpc3RlZF9lbWJlZF9lbmFibGVkIjp0cnVlfSwiZXh0ZW5kZWQiOmZhbHNlfQ==";
    var opts = decode(digest_to_parse);

    var queryHash = queryHash();

    opts.error = false

    if (opts.clip) {
      opts.digest.video_digest.end_event_time_string = opts.clip.playback_end.toString();
      opts.digest.video_digest.start_event_time_string = opts.clip.playback_start.toString();
      opts.digest.video_digest.playback_start = 0
      opts.digest.video_digest.playback_offset = parseInt(opts.clip.playback_start) - parseInt(opts.digest.video_digest.start_event_time_string);
        opts.clip.clip_url = decodeURIComponent('http://www.spreecast.com/events/ask-the-archbishop/clips/best-of-ask-the-archbishop.html');
        opts.clip.childClip = true;
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
    spree.mixpanelPageType = 'event';
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


    spree.cdn_prefix = 'https://d35ncmvcdy3liz.cloudfront.net/production/201503241600_f809ee0';
      opts.auto_play = !!queryHash['autoplay'] || true;
      spree.event.event_url = decodeURIComponent('http://www.spreecast.com/events/ask-the-archbishop');
      spree.event.parent_clip_id = 112365;


    var spreecastOpts = { event_show_url: location.href };
        _.extend(spreecastOpts, { embed: false });
      //responsible for intializing spreecast object
      spree.registerListeners(spreecastOpts);

      $(document).trigger('spree:init');
  });

</script>

    <script src="https://d35ncmvcdy3liz.cloudfront.net/production/201503241600_f809ee0/assets/event_common.js" type="text/javascript"></script>
    <script src="https://d35ncmvcdy3liz.cloudfront.net/production/201503241600_f809ee0/assets/event_show.js" type="text/javascript"></script>
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

  
  
  
  <script src="https://d35ncmvcdy3liz.cloudfront.net/production/201503241600_f809ee0/assets/isq.js" type="text/javascript"></script>

  
</head>

  <body class="events_show full_experience clips_disabled">
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
      <div id="event-channels" data-user-channel="28a20fa2004c5d5f1802b9770ab07e87" data-user-channel-last-message-id="0" data-everyone-channel="2f4aa6a0caf409f30009263db8968ddd"></div>
      <div id="user-cache-elements-replacement" data-profile="eyJ1c2VyX2lkIjoibGFiYWtlIiwibmFtZSI6ImxhYmFrZSIsImVtYWlsIjoiMTY0NTU5NjUzQHFxLmNvbSIsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJzM19pZCI6OTAwNTQzLCJpc19mYiI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiL3Byb2ZpbGVfcGhvdG9zL3RpbGVfMzB4MzAvbm9wcm9maWxlLnBuZyIsInByb2ZpbGVfcGhvdG9fbWVkaXVtX3VybCI6Ii9wcm9maWxlX3Bob3Rvcy90aWxlXzEwMHgxMDAvbm9wcm9maWxlLnBuZyIsImNyZWF0ZWRfYXQiOjE0MTM4NjE5MDUwMDAsImludml0YXRpb25fY291bnQiOjAsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjp0cnVlLCJhdXRoZW50aWNhdGlvbiI6ImVtYWlsIiwicHJlc2VuY2VfZW5hYmxlZCI6dHJ1ZSwiZm9sbG93aW5nX2V2ZW50cyI6W10sImlzX2xvY2tlZCI6dHJ1ZX0=" data-buddy-list="W10=" data-friend-requests="W10=" data-friend-accepts="W10=" data-following="eyJmb2xsb3dpbmciOlszNDIxMDQsMzQ4ODcxLDM1NTI5NCw0MDM0OTEsNDE0ODU2LDUyMTAyNyw5MTU2NDYsOTU2OTE2XX0="></div>
      <div id="presence-replacement" data-online="e30=" data-idle="W10="></div>
      <div id="site-notification-replacement" data-current="e30="></div>
      <div id="ip-address-replacement" data-ip-address="60.194.194.0"></div>
      <div id="firebase-token-replacement" data-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2IjowLCJkIjp7InNpbXVsYXRvciI6ZmFsc2UsInNwcmVla2V5IjoibGk2YlNNSWYyeUZVcHRXVCJ9LCJpYXQiOjE0MjcyOTcyNTh9.kC9PP3ZxmaSiw__vyMoGbRuUjImF--LRen__ncIDgok"></div>

    
<?php $this->load->view('spree/header.tpl'); ?>  

    
    <div id="main-content">


        
<div id="follow-prompt-banner" data-type="PageFollowBanner" class="nu-banner hidden">
  <div class="follow-banner-wrapper stage-width">
    <div id="follow-prompt">
  <h3 class="message">
	  <span>Follow</span> <a href="http://www.spreecast.com/users/the-archdiocese-of-port-of-spain" class="creator" target="_blank">The Archdiocese of Port of Spain</a> <span>to get notified of upcoming Spreecasts</span>
</h3>  <h5 class="submessage">If you follow a user we'll notify you of their upcoming Spreecasts so you can always be a part of the live experience. During live Spreecasts you can chat, ask questions, share media, and even join on camera. Pretty neat, huh?</h5>
  <i class="close-large-icon"></i>
</div>

  </div>
</div>

<div id="upgrade-prompt-banner" data-type="UpgradeBanner" class="banner hidden">
  <div class="upgrade-banner-wrapper stage-width">
    <div id="upgrade-prompt">
      <a href="/users/guestuser--2/edit?tab=settings&amp;tab_action=payments" class="upgrade-link" target="_blank">
        <button class="upgrade-button">Upgrade</button>
</a>      <h4 class="message">Upgrade to the Spreecast Silver plan and get analytics reports for your future spreecasts and the video download link after your next spreecast ends.</h4>
      <i class="close-large-icon"></i>
    </div>
  </div>
</div>

<div class="event_content stage-width">
  <section id="event_main">
      <div id="event-header">
  <div id="event-header-card">
    <div id="event-header-avatar">
      <a href="/users/the-archdiocese-of-port-of-spain"><img alt="The Archdiocese of Port of Spain" class="large-circle-avatar" src="//s3.amazonaws.com/spreecast-photos/production/users/964536/tile_100x100/964536_photo.jpg?1426604490" title="The Archdiocese of Port of Spain&#x27;s profile photo" /></a>
      <button class="following_button header-follow-btn" data-button-id="follow_button_User_the-archdiocese-of-port-of-spain" data-following="false" data-id="the-archdiocese-of-port-of-spain" data-item-id="964536" data-item="User" data-off-text="Following" data-on-text="Follow" data-registration-required-reason="follow" data-registration-required="true" onclick="spree.clickFollowItem(&#x27;follow_button_User_the-archdiocese-of-port-of-spain&#x27;);" title="Follow or unfollow The Archdiocese of Port of Spain">Follow</button>
    </div>

    <section id="event-header-information">
      <section role="event-header-title">
        <h1 id="event-header-title" title="Best of Ask The Archbishop ">
          <a href="/events/ask-the-archbishop/clips/best-of-ask-the-archbishop">Best of Ask The Archbishop </a>
        </h1>
      </section>
        <div class="clip-origin">
          <span class="clipped-from">Clipped from</span>
          <a href="/events/ask-the-archbishop" title="Ask The Archbishop ">Ask The Archbishop</a>
          <span class="clipped-by">by</span>
            <a href="/users/the-archdiocese-of-port-of-spain" class="user-name" title="The Archdiocese of Port of Spain">The Archdiocese of Port of Spain</a>

        </div>
      <section role="event-header-meta">
          <a href="/users/the-archdiocese-of-port-of-spain" class="user-name" title="Created by: The Archdiocese of Port of Spain">The Archdiocese of Port of Spain</a>

        <div id="event-date">
          <a class='calendar-icon' target='_blank' href="http://www.spreecast.com/events/ask-the-archbishop/ics" title="Add to my calendar"></a>
          <span class="event-header-time invisible" data-field="date" title="On Air date">
            1427212800
          </span>
        </div>
        <div id="event-time">
          <i class='clock-icon'></i>
          <span class="event-header-time invisible" data-field="time" title="On Air date">
            1427212800
          </span>
        </div>
        <div data-state="more" id="description-toggle">
          <span class="expand-arrow-wrapper">
            <i id="description-arrow" class="expand-arrow-icon"></i>
          </span>
          <span class="expand-arrow-text" data-state="more">
            <span class="description-toggle-text">details</span>
</span></div>      </section>
    </section>
    <section id="event-state">
      <div id="event-status-state">
                	<div class="on_air">
			<div class="event-status-symbol"></div>
</div>	<div class="off_air">
			<div class="event-status-symbol"></div>
</div>	<div class="archive-indicator">
			<div class="event-status-symbol"></div>
</div>
      </div>
      <div class="attendees-info">

		<!-- live/scheduled -->
			<div class="viewer-count-container">
				<i class="viewer-count-icon"></i>
			  <span class="attendee-count plural" data-viewers="117">
					view
</span>			</div>
</div>

    </section>
  </div>

  <section role="event-description">
    <div id="event-date">
      <a class='calendar-icon' target='_blank' href="http://www.spreecast.com/events/ask-the-archbishop/ics" title="Add to my calendar"></a>
      <span class="event-header-time invisible" data-field="date" title="On Air date">
        1427212800
      </span>
    </div>
    <div id="event-time">
      <i class='clock-icon'></i>
      <span class="event-header-time invisible" data-field="time" title="On Air date">
        1427212800
      </span>
    </div>

    <div class="event-description">
      Archbishop Harris candidly shares a personal challenge and how he overcame it. 
</div>    <div class="is-visually-hidden full-description">
      Archbishop Harris candidly shares a personal challenge and how he overcame it. 
    </div>
    <ul id="event-details">
      <li class="event-detail">
        <label class="event-detail-label" title="Category">Category:</label>
        <span>Religion &amp; Spirituality</span>
</li>
      
      <li class="event-detail">
        <label class="event-detail-label" title="Event visibility">Visibility:</label>
        <span>Public</span>
      </li>
    </ul>
</section></div>

<script type="text/javascript">
  _.each($('.event-header-time'), function(el) {
    var $startTime = $(el);
    var dateTimestamp = Number($startTime.text()) * 1000;
    var eventStatus = 2;
    var timeHTML;
    if ($startTime.data('field') == "time") {
      timeHTML = Time.formatStartDate(dateTimestamp, eventStatus, {time: true, timezone: true, date: false});
    }
    else if ($startTime.data('field') == "date") {
      timeHTML = Time.formatStartDate(dateTimestamp, eventStatus, {time: false, timezone: false, date: true});
    }
    $startTime.text(timeHTML).removeClass('invisible');
  });
</script>

    <div id="event_stage">
    <div id="the-real-rapper">
      <section data-prev="true" data-prompt="true" data-questions="none" id="question-on-air-container">

        <div id="current-topic-container">
          <span class="current-topic" title="Current Topic">Current Topic</span>
        </div>

        <div id="current-question-container">
          <div id="previous-question-wrapper" class="animated"></div>
          <div id="current-question-wrapper" class="animated"></div>
        </div>

        <div id="pre-event-content-container">
          <div id='countdown-timer'>
	<span class="countdown-timer-label">Starts in:</span>
	<span class="countdown-time" data-interval="day" id="countdown-days"></span>
	<span class="countdown-time" data-interval="hour" id="countdown-hours"></span>
	<span class="countdown-time" data-interval="min" id="countdown-minutes"></span>
	<span class="countdown-time" data-interval="sec" id="countdown-seconds"></span>
</div>

          <button class="following_button rsvp" data-button-id="follow_button_Event_ask-the-archbishop" data-following="false" data-id="ask-the-archbishop" data-item-id="163508" data-item="Event" data-off-text="Cancel reminder" data-on-text="Remind me" data-registration-required-reason="rsvp" data-registration-required="true" onclick="spree.clickFollowItem(&#x27;follow_button_Event_ask-the-archbishop&#x27;);">Remind me</button>
          <div class="attendees-info">
		<div class="rsvp-count-container">
		  <i class="user-outline-icon"></i>
		  <span class="attendee-count" data-rsvps="12">
		    plan to attend
</span></div>
		<!-- live/scheduled -->
			<div class="viewer-count-container">
				<i class="viewer-count-icon"></i>
			  <span class="attendee-count plural" data-viewers="117">
					view
</span>			</div>
</div>

</div>          <span id="viewer-questions-prompt" class="onair-prompt">
            <span class="onair-prompt-text">
              What should we talk about on air? Submit your questions below.
            </span>
          </span>
</section>

    </div>
      <div id="broadcast_wrapper" class="broadcast_component initial">
    <div class= 'overlay center'>
      <h1>Processing...</h1>
      <h3>We are preparing the archive which will be available shortly.</h3>
      <i class="logo-waiting-icon spin"></i>
    </div>
    <div id="broadcast">
      <p>
        <a href="http://www.adobe.com/go/getflashplayer"><img alt="Get Adobe Flash player" src="https://d35ncmvcdy3liz.cloudfront.net/production/201503241600_f809ee0/images/icons/get_flash_player.gif" /></a>
      </p>
    </div>
  <div id="questions">
	<div id="question-prompt" class="question-prompt">
		<div class="question-action close"></div>
		<textarea id="question" placeholder="Comment or question for people on camera?" class="question-text" ></textarea>
    <input type="button" value="Submit" data-registration-required="true" data-registration-required-reason = "question" class="btn-blue" id="ask" />
	</div>

	<div id="question-feedback" class="question-prompt">
		<div class="question-action close"></div>
		<h3 class="center">Thank you!<br> Your question has been submitted.</h3>
	</div>
</div>

  <div id='flash_focus'></div>
    <div id="social-share">
        <script type="text/javascript">
  $(document).bind('spree:loaded', function () {
    $('#email-invite-button').click(function(event) {
      spree.eventMgr.showEmailInvites('event', 'ask-the-archbishop')
    });
    $('#invite-share-button').click(function(event) {
      spree.inviteMgr.show();
    });
  });
  </script>

<div>

    <i class="share-button facebook-icon" id="fb-share-button" aria-hidden="true" title="Share on Facebook"></i>
    <script type="text/javascript" charset="utf-8">
	$(function(){
	  new FbSharer({
	    url         : 'http://www.spreecast.com/events/ask-the-archbishop/clips/best-of-ask-the-archbishop.html',
	    name        : 'Best of Ask The Archbishop ',
	    imageUrl    : 'http://s3.amazonaws.com/spreecast-production/events/163508/play_640x480/163508_photo.jpg?1426780913',
	    description : 'Archbishop Harris candidly shares a personal challenge and how he overcame it. ',
	    $button     : $("#fb-share-button")
	  });
	});
</script>



    <a target="_blank" class="share-button twitter-icon" id="twitter-share-button" aria-hidden="true" title="Share on Twitter"></a>
    
<script type="text/javascript" charset="utf-8">
  window.deferLoad.register("twitter", "//platform.twitter.com/widgets.js", function() {
    twttr.ready(function (twttr) {
      twttr.events.bind('tweet', function(event) {
        spree.registerShare(spree.twitterShareUrl, 'twitter', 1);
       });
    });
  });
</script>

<script type="text/javascript">
  $(document).on('spree:loaded', function(){
    var shareId = spree.shareId('twitter');
    spree.twitterShareUrl = "http://www.spreecast.com/events/ask-the-archbishop/clips/best-of-ask-the-archbishop?t=tweet_box&ts=1427294314" + "&share=" + shareId;
    if (!spree.event.twitter) spree.event.twitter = {};

    $('#twitter-share-button').click(function(e) {
      var $button = $(this);
      var twitterURL = $button.attr('href');
      if (!twitterURL) {
        // Must open the popup window immmediately in response to the click or else it will be blocked
        // Will redirect it to the appropriate twitter share page after we get the shortened URL via awe.sm
        var shareWindow = window.open('', '', 'width=450,height=500');
        $.ajax({
          url: '//api.awe.sm/url.json',
          data: {
            v: 3,
            url: spree.twitterShareUrl,
            key: 'e2515fc1a05857aef9e7c03c251b95d06ddbd7b8069ad99ac25e6dee9c154629',
            tool: 'lMVke8',
            channel: 'twitter'
          },
          dataType: 'jsonp',
          crossDomain: true,
          error: function () {
            console.log('awesm shorturl error', arguments);
          },
          success: function (data) {
            // Got the short URL
            var awesm_url = data && data.awesm_url;
            if (awesm_url && awesm_url.length) {
              twitterURL = 'https://twitter.com/intent/tweet?' + $.param({'text':spree.event.name, 'url':awesm_url, 'via':'Spreecast'});
              $button.attr("href", twitterURL);
              // This listens for the intent action fired by the window as it completes the tweet
              // Snippet is pulled from the twitter JS source
              // We cannot use the usual intent system since the window opening is done custom, rather than depending on the twitter widget.js code to wire this up
              $(window).bind("message", function(event) {
                event = event.originalEvent;
                if (event.source == shareWindow && event.data != "__ready__") {
                  shareWindow.close();
                  spree.registerShare(spree.twitterShareUrl, 'twitter', 1);
                }
              });
              spree.registerShare(spree.twitterShareUrl, 'twitter', 0);
              // Redirect popup to twitter share page
              shareWindow.location.href = twitterURL;
            }
          }
        });
      }
      else {
        spree.registerShare(spree.twitterShareUrl, 'twitter', 0);
      }
    });
  });
</script>


      <i class='share-button email-icon' id='email-invite-button' title='Email'></i>

    <i class='share-button google-icon' id="google-share-button" title="Share on Google+" onclick="javascript:window.open('https://plus.google.com/share?url=http://www.spreecast.com/events/ask-the-archbishop/clips/best-of-ask-the-archbishop', '', 'menubar=no, toolbar=no, resizable=yes, scrollbars=yes, height=600, width=600');return false;"></i>
    <i class='share-button linkedin-icon' id="linkedin-share-button" title="Share on Linkedin" onclick="javascript:window.open('http://www.linkedin.com/shareArticle?mini=true&amp;url=http://www.spreecast.com/events/ask-the-archbishop/clips/best-of-ask-the-archbishop&amp;title=Best of Ask The Archbishop &amp;summary=Archbishop Harris candidly shares a personal challenge and how he overcame it. &amp;source=Spreecast', '', 'menubar=no, toolbar=no, resizable=yes, scrollbars=yes, height=400, width=600');return false;"></i>

      <i class="share-button invite-share-icon" id='invite-share-button' title="Invite people to this Spreecast"></i>
</div>
    </div>
</div>

<script type="text/javascript">
  $(document).ready(function() {
    if ( spree.device && spree.device !== "web") {
      var player = document.getElementById('spreecast_video');
      spree.event.mobileQuality = new MobileEventQuality(player);
    }
  });
</script>

  </div>

<!-- producer rail -->


<section data-default="recommended" id="event_social">
  <div id="right-rail-menu">
  <ul>
	      <li class="rail-tab" data-tab="chat">
	        Chat
	        <i class='alerts'></i>
</li>	      <li class="rail-tab" data-tab="recommended">
	        Recommended
	        <i class='alerts'></i>
</li>  </ul>
</div>

  <section id="right-rail">
    
    <div id="recommended-box" class="social-box">
  <ul id='recommended-tab'>
      
<li class="preview-block">
  <div class="preview-image">
    <a href="http://www.spreecast.com/events/aura-alchemy-with-pamela-aaralyn"><img alt="Preview Image" src="https://d1dmw53f30zpgm.cloudfront.net/events/163486/tile_180x135/img20150317-10916-1lbpcuc.jpg?1426642772" title="Preview Image" /></a>
      <span class="preview-time">1:39:57 </span>
  </div>
  <div class="preview-card">
    <h4 class="preview-title"><a href="http://www.spreecast.com/events/aura-alchemy-with-pamela-aaralyn">Aura Alchemy with Pamela Aaralyn</a></h4>
    <div class="preview-details">
        <a href="/users/pamela--193" class="preview-user-name" title="Pamela">Pamela</a>

      <span class="preview-meta">
        5 days ago
          <i class="bullet-icon"></i>
          514 views
      </span>
    </div>
  </div>
</li>

      
<li class="preview-block">
  <div class="preview-image">
    <a href="http://www.spreecast.com/events/pamela-and-kira-raw-q-a"><img alt="Preview Image" src="https://d1dmw53f30zpgm.cloudfront.net/events/163126/tile_180x135/img20150310-16977-1m60fql.jpg?1426004171" title="Preview Image" /></a>
      <span class="preview-time">2:07:29 </span>
  </div>
  <div class="preview-card">
    <h4 class="preview-title"><a href="http://www.spreecast.com/events/pamela-and-kira-raw-q-a">Pamela and Kira RAW Q&amp;A</a></h4>
    <div class="preview-details">
        <a href="/users/pamela--193" class="preview-user-name" title="Pamela">Pamela</a>

      <span class="preview-meta">
        14 days ago
          <i class="bullet-icon"></i>
          997 views
      </span>
    </div>
  </div>
</li>

      
<li class="preview-block">
  <div class="preview-image">
    <a href="http://www.spreecast.com/events/interview-with-the-aura-reader"><img alt="Preview Image" src="//s3.amazonaws.com/spreecast-photos/production/users/917108/tile_180x135/917108_photo.jpg?1425434965" title="Preview Image" /></a>
      <span class="preview-time">1:56:28 </span>
  </div>
  <div class="preview-card">
    <h4 class="preview-title"><a href="http://www.spreecast.com/events/interview-with-the-aura-reader">Interview With THE Aura Reader!</a></h4>
    <div class="preview-details">
        <a href="/users/pamela--193" class="preview-user-name" title="Pamela">Pamela</a>

      <span class="preview-meta">
        19 days ago
          <i class="bullet-icon"></i>
          1,611 views
      </span>
    </div>
  </div>
</li>

      
<li class="preview-block">
  <div class="preview-image">
    <a href="http://www.spreecast.com/events/wlie-540am--49"><img alt="Preview Image" src="https://d35ncmvcdy3liz.cloudfront.net/production/201503241600_f809ee0/images/logos/tile_180x135/missing_tile_180x135.png" title="Preview Image" /></a>
      <span class="preview-time">30:13 </span>
  </div>
  <div class="preview-card">
    <h4 class="preview-title"><a href="http://www.spreecast.com/events/wlie-540am--49">WLIE 540AM</a></h4>
    <div class="preview-details">
        <a href="/users/wlie-540am" class="preview-user-name" title="WLIE 540AM">WLIE 540AM</a>

      <span class="preview-meta">
        7 days ago
          <i class="bullet-icon"></i>
          218 views
      </span>
    </div>
  </div>
</li>

      
<li class="preview-block">
  <div class="preview-image">
    <a href="http://www.spreecast.com/events/wlie-540am--47"><img alt="Preview Image" src="https://d35ncmvcdy3liz.cloudfront.net/production/201503241600_f809ee0/images/logos/tile_180x135/missing_tile_180x135.png" title="Preview Image" /></a>
      <span class="preview-time">30:18 </span>
  </div>
  <div class="preview-card">
    <h4 class="preview-title"><a href="http://www.spreecast.com/events/wlie-540am--47">WLIE 540AM </a></h4>
    <div class="preview-details">
        <a href="/users/wlie-540am" class="preview-user-name" title="WLIE 540AM">WLIE 540AM</a>

      <span class="preview-meta">
        12 days ago
          <i class="bullet-icon"></i>
          373 views
      </span>
    </div>
  </div>
</li>

      
<li class="preview-block">
  <div class="preview-image">
    <a href="http://www.spreecast.com/events/howireview-online--3"><img alt="Preview Image" src="https://d1dmw53f30zpgm.cloudfront.net/events/160244/tile_180x135/img20150131-17711-1tzl16o.jpg?1422767866" title="Preview Image" /></a>
      <span class="preview-time">2:12:17 </span>
  </div>
  <div class="preview-card">
    <h4 class="preview-title"><a href="http://www.spreecast.com/events/howireview-online--3">HOWiReview ONLINE!</a></h4>
    <div class="preview-details">
        <a href="/users/howireview-com" class="preview-user-name" title="HOWiReview.com Community">HOWiReview.com Community</a>

      <span class="preview-meta">
        1 month ago
          <i class="bullet-icon"></i>
          466 views
      </span>
    </div>
  </div>
</li>

      
<li class="preview-block">
  <div class="preview-image">
    <a href="http://www.spreecast.com/events/new-moon-in-aquarius-2015"><img alt="Preview Image" src="//s3.amazonaws.com/spreecast-photos/production/users/653959/tile_180x135/653959_photo.jpg?1425225189" title="Preview Image" /></a>
      <span class="preview-time">56:39 </span>
  </div>
  <div class="preview-card">
    <h4 class="preview-title"><a href="http://www.spreecast.com/events/new-moon-in-aquarius-2015">New Moon In Aquarius 2015</a></h4>
    <div class="preview-details">
        <a href="/users/lisa-marie-rosati--3" class="preview-user-name" title="Lisa Marie Rosati (Goddess Lifestyle TV)">Lisa Marie Rosati (Goddess Lifestyle TV)</a>

      <span class="preview-meta">
        1 month ago
          <i class="bullet-icon"></i>
          816 views
      </span>
    </div>
  </div>
</li>

      
<li class="preview-block">
  <div class="preview-image">
    <a href="http://www.spreecast.com/events/espn-nba-live-chat-episode-114"><img alt="Preview Image" src="https://d1dmw53f30zpgm.cloudfront.net/events/163590/tile_180x135/img20150320-8746-y01jkz.jpg?1426860004" title="Preview Image" /></a>
      <span class="preview-time">1:04:56 </span>
  </div>
  <div class="preview-card">
    <h4 class="preview-title"><a href="http://www.spreecast.com/events/espn-nba-live-chat-episode-114">ESPN NBA Live Chat Episode 114</a></h4>
    <div class="preview-details">
        <a href="/users/truehooptv--2" class="preview-user-name" title="@TrueHoopTV">@TrueHoopTV</a>

      <span class="preview-meta">
        5 days ago
          <i class="bullet-icon"></i>
          249,010 views
      </span>
    </div>
  </div>
</li>

      
<li class="preview-block">
  <div class="preview-image">
    <a href="http://www.spreecast.com/events/tony-robbins-spreecast"><img alt="Preview Image" src="https://d1dmw53f30zpgm.cloudfront.net/events/160371/tile_180x135/160371_photo.jpg?1422997102" title="Preview Image" /></a>
      <span class="preview-time">1:03:29 </span>
  </div>
  <div class="preview-card">
    <h4 class="preview-title"><a href="http://www.spreecast.com/events/tony-robbins-spreecast">Tony Robbins Spreecast</a></h4>
    <div class="preview-details">
        <a href="/users/team-tony" class="preview-user-name" title="Team Tony">Team Tony</a>

      <span class="preview-meta">
        1 month ago
          <i class="bullet-icon"></i>
          155,257 views
      </span>
    </div>
  </div>
</li>

      
<li class="preview-block">
  <div class="preview-image">
    <a href="http://www.spreecast.com/events/espn-nba-live-chat-episode-113"><img alt="Preview Image" src="https://d1dmw53f30zpgm.cloudfront.net/events/163447/tile_180x135/img20150317-14776-g9hfvx.jpg?1426606366" title="Preview Image" /></a>
      <span class="preview-time">1:19:43 </span>
  </div>
  <div class="preview-card">
    <h4 class="preview-title"><a href="http://www.spreecast.com/events/espn-nba-live-chat-episode-113">ESPN NBA Live Chat Episode 113</a></h4>
    <div class="preview-details">
        <a href="/users/truehooptv--2" class="preview-user-name" title="@TrueHoopTV">@TrueHoopTV</a>

      <span class="preview-meta">
        7 days ago
          <i class="bullet-icon"></i>
          169,848 views
      </span>
    </div>
  </div>
</li>

  </ul>
</div>

<script>
  $(document).on('digest:parse:done', function() {
    _.each($('.preview-title a'), function(a) {
      spree.recommended.linkify($(a), 'web.tab');
    });

    _.each($('.preview-image a'), function(a) {
      spree.recommended.linkify($(a), 'web.tab');
    });

    spree.recommended.sendSuggestedTxLogs('web.tab', spree.event.recommended_content);
  });
</script>


    <div id="chat-box" data-selected="viewers" class="social-box">
      
        <div data-chat-type="archiveViewer"></div>
    </div>

    
    
  </section>

  <div id="event_viewers">
    <div class='viewers_wrapper'>
  <div id="viewer_section" data-max-bubbles="9">
    <h3>
      On air
</h3>    <div id="viewer_list_container" class="clearfix">

      <div id="viewer_list">
      </div>

        <span class='face-bubble-more hidden'>
	<a id="see-all-users" class="show_more" href="#">
		Show More <span class="count"></span>
	</a>
</span>

    </div>
  </div>
</div>

</div></section>

  </section>
  <div id="viewer_details_wrapper">
  <section id="viewer_details">
      <div id="event-fb-comments" class="fb-comment-box">
        <h3>Comments</h3>
        <div class="section">
          <div class="fb-comments" data-colorscheme="light" data-href="http://www.spreecast.com/events/ask-the-archbishop/clips/best-of-ask-the-archbishop.html" data-num-posts="2" data-width="614"> </div>
        </div>
      </div>
  </section>
</div>

  <script id="hb-archives-unavailable" type="text/x-handlebars-template">
<div id="archives_unavailable" class="center">
  <h2>Hmmm, this Spreecast<br>is currently unavailable</h2>
  <div id="sorry-satellite">
    <span id="sorry-unavailable">sorry...</span>
    <i class="satellite-icon"></i>
  </div>
  <h4>Our superduper satellites did <br> their best, but they can&apos;t find it</h4>
  <h4 class="mt-40"><a target="_blank" href="/">Take me home</a></h4>
</div>
</script>

<script id="hb-faceblock" type="text/x-handlebars-template">
  <div class="{{classList}}" id="face-bubble-{{id}}" data-user-id="{{id}}">
    <img src="{{thumb_src}}" alt="{{name}}">
  </div>
</script>

<script id="hb-on-air-question" type="text/x-handlebars-template">
  {{#isMedia type}}
    <div class="media-container"
      data-type="{{type}}"
      data-id="{{id}}"
      data-url="{{url}}"
      data-title="{{title}}"
      data-embed= "{{embed}}"
      data-profile-image="{{profileImage}}"
      data-owner-id="{{ownerId}}"
      data-owner-name="{{ownerName}}"
      data-owner-locked="{{ownerLocked}}">
      <div class='media-thumbnail'>
        <a href="{{text}}" target="_blank">
          <img class='media-image' src='{{imageURL}}'/>
        </a>
      </div>
      <div class='media-info'>
        <h4 class="media-title">
          <a href="{{text}}" target="_blank" title="{{title}}">{{title}}</a>
        </h4>
        <div class='media-description'>{{description}}</div>
      </div>
    </div>
  {{else}}
    <p class="current-question">{{{text}}}</p>
    <p class="is-visually-hidden full-description">{{{text}}}</p>
  {{/isMedia}}
  {{#with user}}
  <div class="question-owner">
    {{#user_name id}}
      {{name}}
    {{/user_name}}
    {{{ user_avatar id thumbUrl "medium" "" }}}
  </div>
  {{/with}}
</script>

<script id="hb-queue-input-submitted" type="text/x-handlebars-template">
  <div id="queue-input-submitted">
    {{#if question_submitted}}
      <i class="check-filled-icon"></i><span>Your question was submitted.</span>
    {{else}}
      <i class="error-icon"></i><span>{{{error_message}}}</span>
    {{/if}}
  </div>
</script>

<script id="hb-queue-slot" type="text/x-handlebars-template">
  <li class="question-listing" data-position="{{position}}">
  </li>
</script>

<script id="hb-star-icon" type="text/x-handlebars-template">
  <div class="star-field has-tooltip">
    <i class="star-icon"></i>
  </div>
</script>
<script type="text/javascript">
  Handlebars.registerPartial("_star_icon", $("script#hb-star-icon").html());
</script>

<script id="hb-queue-item" type="text/x-handlebars-template">
  <div class="{{classList}}" id="{{type}}_{{id}}" data-type="{{type}}" data-id="{{id}}"
      {{#isMedia type}}
        data-url="{{url}}"
        data-title="{{title}}"
        data-embed= "{{embed}}"
        data-profile-image="{{profileImage}}"
        data-owner-id="{{ownerId}}"
        data-owner-name="{{ownerName}}"
      {{/isMedia}}>
    {{#if user.isProducer}}
      <div class="star-field-wrapper">
        {{> _star_icon }}
      </div>
    {{/if}}
    <div class="queue-content" data-viewer-rank="{{viewerRank}}">
      <span class="new-question-indicator">new</span>
      <div class="ranking-controls">
        {{#if user.isProducer}}
          <button class="put-on-screen" type="submit">Put on air</button>
        {{/if}}
        <a class="vote-button vote-up has-tooltip" data-vote="1">
          <i class="up-vote-icon"></i>
        </a>
        <span class="vote-scoring">
          <span class="vote" data-score="{{voteScore}}">{{{vote voteScore}}}</span>
          <span class="vote-feedback" data-vote="-1">- 1</span>
          <span class="vote-feedback" data-vote="1">+1</span>
        </span>
        <a class="vote-button vote-down has-tooltip" data-vote="-1">
          <i class="down-vote-icon"></i>
        </a>
      </div>

      {{#isMedia type}}
        <div class="media-container">
          <div class='media-thumbnail'>
            <a href="{{text}}" target="_blank">
              <img class='media-image' src='{{imageURL}}'/>
            </a>
          </div>
          <div class='media-info'>
            <h4 class="media-title">
              <a href="{{text}}" target="_blank" title="{{title}}">{{title}}</a>
            </h4>
            <div class='media-description'>{{description}}</div>
          </div>
        </div>
      {{else}}
      <div class="question-container">
        <div class="question-wrapper">
          <p class="question-content">{{{text}}}</p>
        </div>
        <span class="question-show-more" data-type="{{type}}" data-id="{{id}}"><a>show more</a></span>
      </div>
      {{/isMedia}}

      {{#with user}}
        <div class="question-owner">
          {{#user_name id}}
            {{name}}
          {{/user_name}}
          <div class="question-avatar-wrapper">
            <div class="reaction-wrapper" data-user-id="{{id}}">
              <i class="reaction-icon"></i>
            </div>
            {{{ user_avatar id thumb "medium" "" }}}
          </div>
        </div>
      {{/with}}
    </div>
    <div class="trash-can-wrapper">
      <div class="tooltip-helper">
        <div class="trash-can-tooltip has-tooltip">
          {{> _trash_can}}
        </div>
      </div>
    </div>
  </div>
</script>

<script id="hb-trash-svg" type="text/x-handlebars-template">
  <svg class="trash-can-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="185 181 205 236">
      <g id="can">
        <g>
          <g>
            <path class="trash-can-base" d="M364.2,411.6H211.1V248h153.1V411.6z"/>
          </g>
        </g>
      </g>
      <g id="lid">
        <g>
          <g>
            <polygon class="trash-lid-top" points="313.3,206.9 262,206.9 190.8,206.9
              190.8,247.8 384.6,247.8 384.6,206.9       "/>
          </g>
          <g>
            <polygon class="trash-lid-bottom" points="293.3,186.5 280.3,186.5 262.2,186.5
              262.2,206.9 311.3,206.9 311.3,186.5       "/>
          </g>
        </g>
      </g>
      <g id="ribs">
        <g>
          <rect class="trash-rib" x="252" y="284.5"  width="10" height="90"/>
          <rect class="trash-rib" x="282.6" y="284.5"  width="10" height="90"/>
          <rect class="trash-rib" x="313.1" y="284.5" width="10" height="90"/>
        </g>
      </g>
  </svg>
</script>
<script type="text/javascript">
  Handlebars.registerPartial("_trash_can", $("script#hb-trash-svg").html());
</script>


<script id="hb-question" type="text/x-handlebars-template">
  <li class="{{classList}}" data-type="{{type}}" data-id="{{id}}"
    {{#isMedia type}}
      data-url="{{ url }}"
      data-title="{{ title }}"
      data-embed= "{{ embed }}"
      {{#with user}}
        data-owner-id="{{id}}"
        data-owner-name="{name}}"
        data-profile-image="{{thumb}}"
      {{/with}}
    {{/isMedia}}
    >
    {{#with user}}
    <img class="question-queue-user pull-left" src="{{thumb}}"/>
    <div class="question-message">
      {{#user_name id}}
        {{name}}
      {{/user_name}}
    {{/with}}
      <div class="question-text clearfix">
        {{#isMedia type}}
          <img class='media-thumbnail' src='{{imageURL}}'/>
          <div class='media-info'>
            <h4 class="media-title">
              <a href="{{text}}" target="_blank" title="{{title}}">{{title}}</a>
            </h4>
            <div class="media-description">{{description}}</div>
          </div>
        {{else}}
          <span class="question" title="{{{ text }}}">{{{ question }}}</span>
        {{/isMedia}}
      </div>
    </div>
  </li>
</script>

<script id="hb-media-item-preview" type="text/x-handlebars-template">
  <div class="media-preview">
    <i class='close-icon'></i>
    <div class="media-thumbnail">
      <img class="media-preview-image" src='{{ image_url }}'/>
    </div>
    <div class="media-preview-info">
      <h4 class="media-preview-title" ><a href="{{ link }}" target="_blank">{{ title }}</a></h4>
      <p class="media-preview-desc">{{ description }}</p>
    </div>
  </div>
</script>

<!-- chat helpers -->
<script type="text/javascript">
  Handlebars.registerHelper('chat_content', function(placeholder) {
    var template = Handlebars.compile($('script#hb-chat-widget-content').html());
    return template({placeholder: placeholder});
  });
  Handlebars.registerHelper('chat_input', function(chatType, user, placeholderText) {
    var template = Handlebars.compile($('script#hb-chat-widget-input').html());
    return template({id: user.alt(), thumbUrl: spree.generateProfilePhotoAddress(user, 'medium'), showPlayPause: (chatType === "liveViewer"), placeholderText: placeholderText});
  });
  Handlebars.registerHelper('chat-producer-actions_row', function(arg) {
    var template = Handlebars.compile($('script#hb-chat-actions-row').html());
    return template({onscreen_or_in_queue: arg});
  });
</script>

<script id="hb-chat-actions-row" type="text/x-handlebars-template">
  <span class="chat-producer-actions">
    {{#if onscreen_or_in_queue}}
          | <a data-action="close">Delete</a>
    {{else}}
      <a data-action="onscreen">Put chat on screen</a> | <a data-action="queue">Add to queue</a> | <a data-action="close">Delete</a>
    {{/if}}
  </span>
</script>

<script id="hb-chat-message" type="text/x-handlebars-template">
  <li data-user-id="{{id}}" data-chat-id="{{chat_id}}" class="chat-block {{#if is-producer}}is-producer{{/if}}">
    {{#if url}}
      <div class="chat-user-image-wrapper">
        {{{ user_avatar id url "small" "chat-user-image" }}}
      </div>
    {{/if}}
    <div class="chat_message">
      <span class="chat-user">
        {{#user_name id}}
          {{user}}
          {{#if is-producer}}
            <i class="producer-icon"></i>
          {{/if}}
        {{/user_name}}
        {{#if show_producer_actions}}
          {{{chat-producer-actions_row onscreen_or_in_queue}}}
        {{/if}}
      </span>
      <div class='user-message'>
        <span class="text"></span>
        <span class="chat-timestamp"> - {{time}}</span>
      </div>
    </div>
  </li>
</script>

<script id="hb-chat-widget-content" type="text/x-handlebars-template">
  <div class="chat-placeholder-wrapper">
    {{#if placeholder}}
      {{#each placeholder}}
        <h3 class="chat-placeholder">{{this}}</h3>
      {{/each}}
    {{/if}}
  </div>
  <ul class="chat_content"></ul>
</script>

<script id="hb-chat-widget-input" type="text/x-handlebars-template">
<form class="chat-input">
  {{#if showPlayPause}}
    <div class="chat-status-helper hidden">Your chat is paused</div>
  {{/if}}
  <div class="chat-input-container">
    <input type="text" placeholder="{{placeholderText}}" class="chat_text"></input>
    <div class="chat-input-user-wrapper">
      {{{ user_avatar id thumbUrl "small" "chat-input-user" }}}
    </div>
    {{#if showPlayPause}}
      <div class="chat-paused hidden" title="Unpause the chat feed">
        <a class="chat-control">▶ Resume Chat</a>
      </div>
    {{/if}}
  </div>
</form>
</script>

<script id="hb-chat-widget" type="text/x-handlebars-template">
  <div class="chat_widget {{chatType}}_chat" id="{{chatType}}_{{#if id}}{{id}}_{{/if}}chat">
    {{#if header}}
      <div class="chat-header">
        <h4>{{header}}</h4>
        {{#if canClose}}
          <a class="close_x"></a>
        {{/if}}
      </div>
    {{/if}}

    <div class="chat_container empty">
      {{#if canPopOut}}
        <svg class="popout-svg" version="1.1" viewBox="0 25 50 50">
          <rect class="popout-box" x="5" y="6.6" width="40" height="40"/>
          <polygon class="popout-border" points="24.4,9 24.4,5 5,5 5,45 45,45 45,25.6 41,25.6 41,41 9,41 9,9 "/>
          <polygon class="popout-arrow" points="29.5,9 38.2,9 21,26.1 23.8,28.9 41,11.8 41,20.5 45,20.5 45,5 29.5,5 "/>
        </svg>
        <svg class="popin-svg" version="1.1" viewBox="0 25 50 50">
          <rect class="popin-box" x="5" y="6.6" width="40" height="40"/>
          <polygon class="popin-border" points="45,46.6 5,46.6 5,27.1 9,27.1 9,42.6 41,42.6 41,10.5 25.6,10.5 25.6,6.6 45,6.6  "/>
          <polygon class="popin-arrow" points="14.1,31.1 14.1,27.1 22.8,27.1 5.6,10 8.4,7.2 25.6,24.3 25.6,15.6 29.5,15.6 29.5,31.1   "/>
        </svg>
      {{/if}}
      {{{ chat_content contentPlaceholder }}}
    </div>
    {{{ chat_input chatType user inputPlaceholder }}}
  </div>
</script>

<script id="hb-invite-action" type="text/x-handlebars-template">
  {{#if showCheckbox}}
    {{#with inviteType}}
      <input type="checkbox" class="invite {{type}}" data-invite-type="{{type}}" title="{{text}}" />
    {{/with}}
  {{/if}}
</script>

<script type="text/javascript">
  Handlebars.registerHelper('inviteAction', function(inviteMethod, inviteType) {
    var show = !(inviteType.type === 'viewer' && inviteMethod === 'viewers');
    var checkboxTemplate = Handlebars.compile($('script#hb-invite-action').html());
    return checkboxTemplate({showCheckbox: show, inviteType: inviteType});
  });
</script>

<script id="hb-viewer-rail-listing" type="text/x-handlebars-template">
  {{#with user}}
    <li class="{{../classList}}" data-user-id="{{id}}" id="viewer-list-listing-{{id}}">
      <div class="viewer-list-avatar-wrapper">
        {{{ user_avatar id profile_photo_thumb_url "medium" "viewer-list-avatar" }}}
        {{#if ../renderForProducer}}
          <span class="status-panel score"></span>
          {{> _connection_stats}}
          {{> _star_icon }}
        {{/if}}
      </div>
      <div class="viewer-list-meta">
        {{#user_name id}}
          {{full_name}}
        {{/user_name}}
        <div class="user-status camera-status"></div>
        <div class="user-status chat-status"></div>
      </div>
      <div class="viewer-list-icons">
        <i class="notification-icon"></i>
      </div>
    </li>
  {{/with}}
</script>

<script id="hb-viewer-listing" type="text/x-handlebars-template">
  {{#with user}}
    <li class="viewer-listing" {{#if id}}data-user-id="{{id}}"{{/if}}>
      {{{viewerListing this}}}
    </li>
  {{/with}}
</script>

<script id="hb-viewer-listing-content" type="text/x-handlebars-template">
  {{#with user}}
    <img class="avatar" src="{{profile_thumb_url}}" alt="{{name}}" title="{{name}}" />
    <span class="user-info">
      {{#user_name id}}
        {{name}}
      {{/user_name}}
      {{#ifBoth id fbId}}
        <i class="logo-icon"></i>
      {{/ifBoth}}
    </span>
  {{/with}}
</script>
<script type="text/javascript">
  Handlebars.registerHelper('viewerListing', function(user) {
    return Handlebars.compile($('script#hb-viewer-listing-content').html())({user: user});
  });
</script>

<script id="hb-invite-viewers" type="text/x-handlebars-template">
  <li class="viewer-listing" {{#if user.id}}data-user-id="{{user.id}}" {{/if}}{{#if user.fbId}}data-fb-id="{{user.fbId}}"{{/if}}>
    {{{viewerListing user}}}
    {{#each inviteTypes}}
      {{{inviteAction ../inviteMethod this }}}
    {{/each}}
  </li>
</script>

<script id="hb-connection-stats" type="text/x-handlebars-template">
  <div class="preview-stats">
    <div class="connection-stat-row">
        <label class="connection-stat-label">Bit rate</label>
        <span data-unit="kbps" class="connection-stat">0</span>
    </div>
    <div class="connection-stat-row">
        <label class="connection-stat-label">Ping</label>
        <span data-unit="ms" class="connection-stat">0</span>
    </div>
    <div class="connection-stat-row">
        <label class="connection-stat-label">Packet loss</label>
        <span data-unit="percent" class="connection-stat">0</span>
    </div>
    <hr class="connection-stat-break" />
    <div class="total-connection-stat">
      <label class="total-stat connection-stat-label">Connectivity</label>
    <span class="total-connection-percentage"></span>
    </div>
  </div>
</script>
<script type="text/javascript">
  Handlebars.registerPartial("_connection_stats", $("script#hb-connection-stats").html());
</script>

<script id="hb-facecard-wrapper" type="text/x-handlebars-template">
  <div id="facecard-container">
    <a href="#" id="facecard-close" class="close-icon"></a>
    {{#if isProducer}}
      <div id='preview-app-wrapper'>
        <button id='facecard-disable-camera'>
          <i class="disable-camera-icon"></i>
        </button>
        <div id='pending_preview'><!-- this div is replaced with the flash app --></div>
        <span class="status-panel score"></span>
        {{> _connection_stats}}
      </div>
    {{/if}}
    <div class="facecard-wrapper"></div>
    {{#if isProducer}}
      <div class="facecard-controls-wrapper"></div>
    {{/if}}
  </div>
</script>

<script id="hb-facecard-controls" type="text/x-handlebars-template">
  <div class='broadcaster-actions'>
    <button id="toggle-on-screen" class="broadcaster-action"></button>
    <button id="enable-camera" class="broadcaster-action">Invite On Air</button>
  </div>
  <div class="facecard-controls">
    <button id="star-user"></button>
    <button id="toggle-promote"></button>
    <button id="ban-user">
      <i class="ban-icon"></i>
      Ban
    </button>
  </div>
  <div class='chat_placeholder'></div>
</script>

<script id="hb-facecard" type="text/x-handlebars-template">
  {{#with user}}
    <div class="facecard" data-user-id="{{id}}">
      <div class="facecard-avatar-wrapper">
        <div class="facecard-avatar-overlay jumbo-circle-avatar">On Air</div>
          {{#if locked}}
            {{{ user_avatar id thumbURL "jumbo" "" }}}
          {{else}}
            <a href="/users/{{id}}" target="_blank">
              {{{ user_avatar id thumbURL "jumbo" "" }}}
            </a>
          {{/if}}
        {{#notSelf userId}}
          {{#if locked}}
          {{else}}
            {{{follow_button following userId id "User"}}}
          {{/if}}
        {{/notSelf}}
      </div>
      <div class="facecard-description-wrapper">
        {{#user_name id}}
          {{#if locked}}
            <span>{{name}}</span>
          {{else}}
            <a href="/users/{{id}}" target="_blank">{{name}}</a>
          {{/if}}
        {{/user_name}}
        <p class='facecard-about'>{{{about}}}</p>
      </div>
    </div>
  {{/with}}
  {{#notSelf user.userId}}
    <div class="friend-action">
      {{{ facecard_friend_button friendship.friendId friendship.friendRelationship user.userId }}}
    </div>
  {{/notSelf}}
  <div class="facecard-controls facecard-friends">
  {{#if friendship.isFriend}}
    <button class="private-message" data-user-id="{{../user.userId}}" data-friend-id="{{friendship.friendId}}">Private message</button>
  {{else}}
    {{#notSelf user.userId}}
      <button class="private-message disabled has-tooltip">Private message</button>
    {{else}}
      <button class="private-message disabled">Private message</button>
    {{/notSelf}}
  {{/if}}
    <a class="view-profile" href="/users/{{user.id}}" target="_blank">View profile</a>
  </div>
</script>

<script id="hb-embed-popup" type="text/x-handlebars-template">
  <div id="popin" class="modal">
    <div id="popin_content">

      <div class="modal-header">
        <h2>Embed</h2>
      </div>

      <div class="modal-footer">
        <a href="http://www.spreecast.com/help/embed" class="pull-right" target="_blank">See examples</a>
      </div>

    </div>
  </div>
</script>

<script id="hb-clip-show" type="text/x-handlebars-template">
  <h1>Clip saved -- share it with your friends!</h1>
  <div id="clip-saved">
    <label for="clip_url_&lt;span class=&quot;translation_missing&quot; title=&quot;translation missing: en.clip.url&quot;&gt;Url&lt;/span&gt;">&lt;span class=&quot;translation missing&quot; title=&quot;translation missing: en.clip.url&quot;&gt;url&lt;/span&gt;</label>
    <input type="text" value="{{ clips.url }}" id="clip_url" />
      <div class="clip-share" data-share-type="facebook"></div>
      <div class="clip-share" data-share-type="twitter"></div>
      <div class="clip-share" data-share-type="linkedin"></div>
      <div class="clip-share" data-share-type="email"></div>
    <div id="clip-done-button">Done</div>
  </div>
</script>

<script id="hb-small-embed-question" type="text/x-handlebars-template">
  <div id='on_air_question'>
    <div class='title'>{{ name }} commented.<div class='icon'></div></div>
    <div class='line'></div>
    <div class='text'>{{{ text }}}</div>
</script>

<script id="hb-more-spreecasts" type="text/x-handlebars-template">
  <div class="suggested-spreecast-group">
  <div class="suggested-spreecast-group-wrapper">
    {{#each content}}
      {{{moreSpreecast this}}}
    {{/each}}
    <a href='{{ pa }}'>
      <button type="button" class="btn-gray" id='replay'>
          <i class="replay-icon"></i>
          <span>Replay</span>
      </button>
    </a>
  </div>
  </div>
</script>

<script id="hb-more-spreecast" type="text/x-handlebars-template">
  <div class='suggested-spreecast'>
    <a href="{{ content.url }}"  >
      <img class="suggested-spreecast-image" src="{{ content.logo }}"/>
      <div class='suggested-spreecast-wrapper'>
        <h4 class="suggested-spreecast-title">{{ content.name }}</h4>
        {{#if content.about}}
          <div class="suggested-spreecast-about mt-10">{{ content.about }}</div>
        {{/if}}
        <section class="suggested-spreecast-meta">
          <h5>{{ content.owner_name }}</h5>
          <span>{{ content.views }} views</span>
          <i class="bullet-icon"></i>
          <span>{{ content.length }}</span>
        </section>
      </div>
    </a>
  </div>
</script>

<script id="hb-chat-awareness-tip" type="text/x-handlebars-template">
  <div class="embed-chat-info">
    <span class="vert-middle">Hey there, you can chat with other viewers</span>
  </div>
</script>

<script type='text/javascript'>
  Handlebars.registerHelper('moreSpreecast', function(content) {
    var more_spreecast_template = Handlebars.compile($('script#hb-more-spreecast').html());
    return more_spreecast_template({ content: content });
  });

  Handlebars.registerHelper('notSelf', function(userId, options) {
    if (userId !== spree.user.alt) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  Handlebars.registerHelper('isMedia', function(type, options) {
    if (type == "MediaItem") {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  Handlebars.registerHelper('vote', function(score, options) {
    return Math.max(0, score);
  });
</script>

</div>
  <script type="text/javascript">
    $(document).on('user:loaded', function () {
      if (spree.user && spree.user.has_been_authenticated) {
        var followSelector = '[data-item="User"]', $el = $(followSelector);
        $el.ready(function() {
          var item_id = parseInt($el.attr('data-item-id'));
          var following = $.inArray(item_id, spree.user.following) >= 0;
          spree.toggleFollowButton(followSelector, following);
        });

        var rsvpSelector = '[data-item="Event"]', $el = $(rsvpSelector);
        $el.ready(function() {
          var item_id = parseInt($el.attr('data-item-id'));
          var rsvp = $.inArray(item_id, spree.user.following_events) >= 0;
          spree.toggleFollowButton(rsvpSelector, rsvp);
        });
      }
    });
  </script>

<script id="hb-modal-external-media-attributes" type="text/x-handlebars-template">
  {{#if opts.preview}}preview{{/if}}
</script>

<script id="hb-modal-external-media-header" type="text/x-handlebars-template">
  {{#if opts.infoHeader.closable}}
    {{> _modal_header_close}}
  {{/if}}
  {{#with opts.infoHeader}}
    <div class='external-media-title clearfix'>
      {{#if is_locked}}
        <img class="pull-left mr-10" width='50' height='50' src='{{ image_url }}'/>
      {{else}}
        <a href="{{ profile_link }}" target="_blank">
          <img class="pull-left mr-10" width='50' height='50' src='{{ image_url }}'/>
        </a>
      {{/if}}
      <ul class="pull-left media-header-title">
        <li>
          {{#if is_locked}}
            <span class="user-name">{{ owner_name }}</a>
          {{else}}
            <a class="user-name" href='{{ profile_link }}' target="_blank">{{ owner_name }}</a>
          {{/if}}
        </li>
        <li>
          <a href="{{ url }}" target="_blank">{{ title }}</a>
        </li>
      </ul>
    </div>
  {{/with}}
</script>

<script id="hb-modal-external-media-body" type="text/x-handlebars-template">
  <div id="external_media">
    {{#with opts.content}}
      {{{mediaHTML}}}
    {{/with}}
    <div class='drag' style='display:none'>Drag window here.</div>
  </div>
</script>

<script id="hb-modal-external-media-footer" type="text/x-handlebars-template">
  {{#if opts.producer}}
    {{#with opts.controls}}
    <section class="modal-action pull-right">
      {{#if live_event}}
        <div class='controls' data-url="{{ url }}" data-media-id="{{ id }}" {{#if media_on_air}}data-on-air="true"{{/if}}>
          {{#if media_on_air}}
            <input type="button" class='remove_from_air pull-right' value="Take off air"/>
          {{else}}
            <input type="button" class='add_to_screen pull-right' value="Put on air"/>
          {{/if}}
        </div>
      {{/if}}
    </section>
    {{/with}}
  {{/if}}
</script>

<script id="hb-modal-preview-external-media-attributes" type="text/x-handlebars-template">
  {{#if opts.preview}}preview{{/if}}
</script>

<script id="hb-modal-preview-external-media-header" type="text/x-handlebars-template">
  {{#if opts.infoHeader.closable}}
    {{> _modal_header_close}}
  {{/if}}
  {{#with opts.infoHeader}}
    <div class='external-media-title clearfix'>
      {{#if is_locked}}
        <img class="pull-left mr-10" width='50' height='50' src='{{ image_url }}'/>
      {{else}}
        <a href="{{ profile_link }}" target="_blank">
          <img class="pull-left mr-10" width='50' height='50' src='{{ image_url }}'/>
        </a>
      {{/if}}
      <ul class="pull-left media-header-title">
        <li>
          {{#if is_locked}}
            <span class="user-name">{{ owner_name }}</a>
          {{else}}
            <a class="user-name" href='{{ profile_link }}' target="_blank">{{ owner_name }}</a>
          {{/if}}
        </li>
        <li>
          <a href="{{ url }}" target="_blank">{{ title }}</a>
        </li>
      </ul>
    </div>
  {{/with}}
</script>

<script id="hb-modal-preview-external-media-body" type="text/x-handlebars-template">
  <div id="external_media">
    {{#with opts.content}}
      {{{mediaHTML}}}
    {{/with}}
    <div class='drag' style='display:none'>Drag window here.</div>
  </div>
</script>

<script id="hb-modal-preview-external-media-footer" type="text/x-handlebars-template">
  {{#if opts.producer}}
    {{#with opts.controls}}
    <section class="modal-action pull-right">
      {{#if live_event}}
        <div class='controls' data-url="{{ url }}" data-media-id="{{ id }}" {{#if media_on_air}}data-on-air="true"{{/if}}>
          {{#if media_on_air}}
            <input type="button" class='remove_from_air pull-right' value="Take off air"/>
          {{else}}
            <input type="button" class='add_to_screen pull-right' value="Put on air"/>
          {{/if}}
        </div>
      {{/if}}
    </section>
    {{/with}}
  {{/if}}
</script>

<script id="hb-modal-email-share-header" type="text/x-handlebars-template">
  {{{ modal_header_with_text opts.header_text opts}}}
</script>

<script id="hb-modal-email-share-body" type="text/x-handlebars-template">
  {{#with opts}}
    <h5>Enter email addresses, separated by commas, to invite them to {{copy}}</h5>
    <div id="email_shares_error" class="error_field error" style="display:none;"></div>
    <textarea id="email_shares"/>
  {{/with}}
</script>

<script id="hb-modal-email-share-footer" type="text/x-handlebars-template">
  <section class="modal-action pull-right">
    {{{ modal_footer_submit "Send" }}}
  </section>
</script>

<script id="hb-modal-flash-upgrade-header" type="text/x-handlebars-template">
  {{{ modal_header_with_text "Almost there" opts }}}
</script>

<script id="hb-modal-flash-upgrade-body" type="text/x-handlebars-template">
  <div class="left">
    <p class="center">
      Please download the <a href="http://get.adobe.com/flashplayer/otherversions/" >latest version of Flash</a> to begin spreecasting! Refresh when complete.
    </p>
  </div>
</script>

<script id="hb-modal-flash-upgrade-footer" type="text/x-handlebars-template">
</script>

<script id="hb-modal-question-popup-header" type="text/x-handlebars-template">
  {{> _modal_header_close}}
  {{#with opts.user}}
  <div class="question-popup-title">
    <div class='question-popup-avatar'>
      {{#if locked}}
        {{{ user_avatar id thumbUrl "large" "" }}}
      {{else}}
        <a href="/users/{{id}}" target="_blank">
          {{{ user_avatar id thumbUrl "large" "" }}}
        </a>
      {{/if}}
    </div>
    <div class="question-user-info">
      {{#user_name id}}
        {{#if locked}}
          <span>{{name}}</span>
        {{else}}
          <a href="/users/{{id}}" target="_blank">{{name}}</a>
        {{/if}}
      {{/user_name}}
      <p class='description-about'>{{{about}}}</p>
    </div>
  </div>
  {{/with}}
</script>

<script id="hb-modal-question-popup-body" type="text/x-handlebars-template">
  <div id="question-description">{{{opts.text}}}</div>
</script>

<script id="hb-modal-question-popup-footer" type="text/x-handlebars-template">
  {{#if opts.user.isProducer}}
    {{#with opts.controls}}
    <section class="modal-action pull-right">
      {{#if live_event}}
        <div class='controls' data-question-id="{{ id }}">
          <button class='question-add-to-screen pull-right'>Put on air</button>
        </div>
      {{/if}}
    </section>
    {{/with}}
  {{/if}}
</script>


<script id="hb-modal-get-embed-code-header" type="text/x-handlebars-template">
  {{{ modal_header_with_text "Embed" opts }}}
</script>

<script id="hb-modal-get-embed-code-body" type="text/x-handlebars-template">
  <fieldset class="left">
    <ul>
          <li>
            <input checked="checked" data-embed-code="&lt;iframe id=&quot;spreecast-player&quot; type=&quot;text/html&quot; width=&quot;100%&quot; height=&quot;470px&quot; src=&quot;http://www.spreecast.com/events/ask-the-archbishop/clips/best-of-ask-the-archbishop/embed-large&quot; frameborder=&quot;0&quot;&gt;&lt;/iframe&gt;
    &lt;p style=&quot;font-family: &#x27;Open Sans&#x27;, &#x27;Trebuchet MS&#x27;, Tahoma, Arial, sans-serif; font-size: 12px; line-height: 18px; font-weight: normal; text-align: left; color: #404040; margin: 5px 0 10px 0; padding: 0;&quot;&gt;
    &lt;a href=&quot;http://www.spreecast.com/&quot; style=&quot;color: #358AD0&quot; target=&quot;_blank&quot;&gt;Spreecast&lt;/a&gt; is the social video platform that connects people.
    &lt;br&gt;
    Check out &lt;a href=&quot;http://www.spreecast.com/events/ask-the-archbishop/clips/best-of-ask-the-archbishop&quot; style=&quot;color: #358AD0&quot; target=&quot;_blank&quot;&gt;Best of Ask The Archbishop &lt;/a&gt; on Spreecast.&lt;/p&gt;" id="popin_embed_size_large" name="popin_embed_size" type="radio" value="large" />
            <label for="popin_embed_size_large">Large (790+ x 470)</label>
          </li>
          <li>
            <input data-embed-code="&lt;iframe id=&quot;spreecast-player&quot; type=&quot;text/html&quot; width=&quot;100%&quot; height=&quot;470px&quot; src=&quot;http://www.spreecast.com/events/ask-the-archbishop/clips/best-of-ask-the-archbishop/embed-medium&quot; frameborder=&quot;0&quot;&gt;&lt;/iframe&gt;
    &lt;p style=&quot;font-family: &#x27;Open Sans&#x27;, &#x27;Trebuchet MS&#x27;, Tahoma, Arial, sans-serif; font-size: 12px; line-height: 18px; font-weight: normal; text-align: left; color: #404040; margin: 5px 0 10px 0; padding: 0;&quot;&gt;
    &lt;a href=&quot;http://www.spreecast.com/&quot; style=&quot;color: #358AD0&quot; target=&quot;_blank&quot;&gt;Spreecast&lt;/a&gt; is the social video platform that connects people.
    &lt;br&gt;
    Check out &lt;a href=&quot;http://www.spreecast.com/events/ask-the-archbishop/clips/best-of-ask-the-archbishop&quot; style=&quot;color: #358AD0&quot; target=&quot;_blank&quot;&gt;Best of Ask The Archbishop &lt;/a&gt; on Spreecast.&lt;/p&gt;" id="popin_embed_size_medium" name="popin_embed_size" type="radio" value="medium" />
            <label for="popin_embed_size_medium">Medium (500 x 470)</label>
          </li>
          <li>
            <input data-embed-code="&lt;iframe id=&quot;spreecast-player&quot; type=&quot;text/html&quot; width=&quot;100%&quot; height=&quot;470px&quot; src=&quot;http://www.spreecast.com/events/ask-the-archbishop/clips/best-of-ask-the-archbishop/embed-medium_preload&quot; frameborder=&quot;0&quot;&gt;&lt;/iframe&gt;
    &lt;p style=&quot;font-family: &#x27;Open Sans&#x27;, &#x27;Trebuchet MS&#x27;, Tahoma, Arial, sans-serif; font-size: 12px; line-height: 18px; font-weight: normal; text-align: left; color: #404040; margin: 5px 0 10px 0; padding: 0;&quot;&gt;
    &lt;a href=&quot;http://www.spreecast.com/&quot; style=&quot;color: #358AD0&quot; target=&quot;_blank&quot;&gt;Spreecast&lt;/a&gt; is the social video platform that connects people.
    &lt;br&gt;
    Check out &lt;a href=&quot;http://www.spreecast.com/events/ask-the-archbishop/clips/best-of-ask-the-archbishop&quot; style=&quot;color: #358AD0&quot; target=&quot;_blank&quot;&gt;Best of Ask The Archbishop &lt;/a&gt; on Spreecast.&lt;/p&gt;" id="popin_embed_size_medium_preload" name="popin_embed_size" type="radio" value="medium_preload" />
            <label for="popin_embed_size_medium_preload">Medium: click-to-play (500 x 470)</label>
          </li>
      <li>
        <textarea class="common-input" id="popin_embed_code" name="popin_embed_code">
&lt;iframe id=&quot;spreecast-player&quot; type=&quot;text/html&quot; width=&quot;100%&quot; height=&quot;470px&quot; src=&quot;http://www.spreecast.com/events/ask-the-archbishop/clips/best-of-ask-the-archbishop/embed-large&quot; frameborder=&quot;0&quot;&gt;&lt;/iframe&gt;
    &lt;p style=&quot;font-family: &#x27;Open Sans&#x27;, &#x27;Trebuchet MS&#x27;, Tahoma, Arial, sans-serif; font-size: 12px; line-height: 18px; font-weight: normal; text-align: left; color: #404040; margin: 5px 0 10px 0; padding: 0;&quot;&gt;
    &lt;a href=&quot;http://www.spreecast.com/&quot; style=&quot;color: #358AD0&quot; target=&quot;_blank&quot;&gt;Spreecast&lt;/a&gt; is the social video platform that connects people.
    &lt;br&gt;
    Check out &lt;a href=&quot;http://www.spreecast.com/events/ask-the-archbishop/clips/best-of-ask-the-archbishop&quot; style=&quot;color: #358AD0&quot; target=&quot;_blank&quot;&gt;Best of Ask The Archbishop &lt;/a&gt; on Spreecast.&lt;/p&gt;</textarea>
      </li>
    <ul>
  </fieldset>
</script>

<script id="hb-modal-get-embed-code-footer" type="text/x-handlebars-template">
  <section class="modal-action pull-right">
    {{{ modal_footer_confirm "Done" opts.modalId }}}
  </section>
</script>

<script id="hb-modal-viewer-list-header" type="text/x-handlebars-template">
  {{{ modal_header_with_text "All Viewers" opts }}}
</script>
<script id="hb-modal-viewer-list-body" type="text/x-handlebars-template">
  <input type="text" class="user-search common-input" placeholder="Search"/>
  {{> _viewer_list this }}
</script>
<script id="hb-modal-viewer-list-footer" type="text/x-handlebars-template">
</script>

<script id="hb-modal-event-invite-header" type="text/x-handlebars-template">
  {{{ modal_header_with_text "Invite" opts }}}
</script>

<script id="hb-modal-event-invite-body" type="text/x-handlebars-template">
  {{#with opts}}
  <div class="picker">
    {{#if user.producer}}
      <div class="invite-viewers">
        <a class = 'picker-item' data-invite-method="viewers" title='Live viewers'><i class='profile-icon'></i>
        <p>Viewers</p>
        </a>
      </div>
    {{/if}}
    {{#if user.authenticated}}
      <div class="invite-spreecast">
        <a class = 'picker-item' data-invite-method="spreecast" title='Spreecast followers'>
        <i class='logo-icon'></i>
        <p>Followers</p>
        </a>
      </div>
      <div class="invite-friends">
        <a class = 'picker-item' data-invite-method="friends" title='Spreecast friends'>
        <i class='friend-notifications-icon'></i>
        <p>Friends</p>
        </a>
      </div>
    {{/if}}
    <div class="invite-email">
      <a class = 'picker-item' data-invite-method="email" title='Email'><i class="email-icon"></i>
      <p>Email</p>
      </a>
    </div>
  </div>

  <div id="invite-tabs">
    {{#if user.producer}}
      {{> _invite_viewers this }}
    {{/if}}
    {{#if user.authenticated}}
      {{> _invite_spreecast this }}
      {{> _invite_friends this }}
    {{/if}}
    {{> _invite_email this }}
  </div>

  <div id="invite-blocker">
    <div class="center">
      <h1 class="sent-invite-total"></h1>
      <h2 data-promote-type="viewers"></h2>
      <h2 data-promote-type="spreecast"></h2>
      <h2 data-promote-type="friends"></h2>
      <h2 data-promote-type="email"></h2>
    </div>
  </div>
  {{/with}}
</script>

<script id="hb-modal-event-invite-footer" type="text/x-handlebars-template">
  <section class="modal-action pull-right">
    <button id="invite-all" class="btn-gray">Invite all followers</button>
    {{{ modal_footer_submit "Invite selected" }}}
  </section>
</script>

<script id="hb-modal-purchase-ppv-ticket-header" type="text/x-handlebars-template">
  {{{ modal_header_with_text "Payment" opts }}}
</script>

<script id="hb-modal-purchase-ppv-ticket-body" type="text/x-handlebars-template">
  
<li class="preview-block">
  <div class="preview-image">
    <a href="http://www.spreecast.com/events/ask-the-archbishop"><img alt="Preview Image" src="http://s3.amazonaws.com/spreecast-production/events/163508/tile_180x135/163508_photo.jpg?1426780913" title="Preview Image" /></a>
      <span class="preview-time">30:57 </span>
  </div>
  <div class="preview-card">
    <h4 class="preview-title"><a href="http://www.spreecast.com/events/ask-the-archbishop">Ask The Archbishop </a></h4>
    <div class="preview-details">
        <a href="/users/the-archdiocese-of-port-of-spain" class="preview-user-name" title="The Archdiocese of Port of Spain">The Archdiocese of Port of Spain</a>

      <span class="preview-meta">
        23 hours ago
          <i class="bullet-icon"></i>
          764 views
      </span>
    </div>
  </div>
</li>

  <h5 class="center">We accept all major credit cards</h5>
  <form id='purchase-form' class="mt-5">
    <ul class="ppv-billing">
      <li class="name-billing-field">
        <label class="billing-label is-visually-hidden" for="full-name-billing">Name on card</label>
        <input id="full-name-billing" type="text" name="fullnamebilling" class="common-input" tabindex="1" data-billing-type="guest" placeholder="Name on card" />
      </li>
      <li class="card-billing-field">
        <label class="billing-label is-visually-hidden" for="card-billing">Card number</label>
        <input id="card-billing" type="text" name="cardbilling" maxlength="19" class="common-input" tabindex="2" data-has-card="false" placeholder="Card number" />
      </li>
      <li class="expiration-billing-field">
        <fieldset>
          <legend class="billing-label is-visually-hidden">Expiration</legend>
          <label class="billing-label is-visually-hidden" for="expiration-month-billing">MM</label>
          <input id="expiration-month-billing" type="text" name="expirationmonthbilling" maxlength="2" class="common-input" tabindex="3" data-has-card="false" placeholder="MM" />
          <label class="billing-label is-visually-hidden" for="expiration-year-billing">YYYY</label>
          <input id="expiration-year-billing" type="text" name="expirationyearbilling" maxlength="2" class="common-input" tabindex="4" data-has-card="false" placeholder="YY" />
          <span class="expiration-info has-tooltip"></span>
        </fieldset>
      </li>
      <li class="cvc-billing-field">
        <label class="billing-label is-visually-hidden" for="cvc-billing">CVC</label>
        <input id="cvc-billing" type="text" name="cvcbilling" maxlength="4" class="common-input" tabindex="5" data-has-card="false" placeholder="CVC" />
        <span class="cvc-info has-tooltip"></span>
      </li>
        <li class="email-billing-field">
          <label class="billing-label is-visually-hidden" for="email-billing">Email</label>
          <input id="email-billing" type="text" name="emailbilling" class="common-input gray-label" tabindex="6" data-billing-type="guest" placeholder="Email" />
        </li>
    </ul>
  </form>
</script>

<script id="hb-modal-purchase-ppv-ticket-footer" type="text/x-handlebars-template">
  <section class="modal-action">
    <span class="ppv-price">Price: </span>
    <input type="submit" id="submit-payment-billing" class="btn-blue ppv-billing-btn" value="Pay now"></input>
  </section>
  <div class='payment-error stripe-errors' hidden></div>
</script>

<script id="hb-modal-purchase-ppv-ticket-complete-header" type="text/x-handlebars-template">
  {{{ modal_header_with_text "Payment" opts }}}
</script>

<script id="hb-modal-purchase-ppv-ticket-complete-body" type="text/x-handlebars-template">
  <i class='check-icon'></i>
  <h3 class="center">Ticket purchased</h3>
  {{#if opts.is_scheduled}}
    <p>Your receipt has been emailed to {{opts.email}}. We will send you an email reminder 30 minutes before the Spreecast starts.</p>
  {{else}}
    {{#if opts.is_live}}
      <p>Note that you can watch an archived version of the spreecast after the live spreecast has ended.</p>
    {{else}}
      <p>You can watch this spreecast as many times as you want.</p>
    {{/if}}
  {{/if}}
  <p>If you have any questions or concerns, please contact us at <a href="mailto:payperview@spreecast.com">payperview@spreecast.com</a> for assistance.</p>
</script>

<script id="hb-modal-purchase-ppv-ticket-complete-footer" type="text/x-handlebars-template">
  <section class="modal-action pull-right">
  {{#if opts.is_scheduled}}
    <button id="ticket-purchased" class="btn-blue">Done</button>
  {{else}}
    <button id="ticket-purchased" class="btn-blue"><i class="play-filled-icon"></i>Watch Spreecast</button>
  {{/if}}
  </section>
</script>

<script id="hb-modal-event-invite-viewers" type="text/x-handlebars-template">
  <div class='invite-section' data-invite-method='viewers'>
    {{> _invite_choices_list this }}
  </div>
</script>
<script type="text/javascript">
  Handlebars.registerPartial("_invite_viewers", $("script#hb-modal-event-invite-viewers").html());
</script>

<script id="hb-modal-event-invite-friends" type="text/x-handlebars-template">
  <div class='invite-section' data-invite-method='friends'>
    {{> _invite_choices_list this }}
  </div>
</script>
<script type="text/javascript">
  Handlebars.registerPartial("_invite_friends", $("script#hb-modal-event-invite-friends").html());
</script>


<script id="hb-modal-event-invite-spreecast" type="text/x-handlebars-template">
  <div class='invite-section' data-invite-method='spreecast'>
    {{> _invite_choices_list this }}
  </div>
</script>
<script type="text/javascript">
  Handlebars.registerPartial("_invite_spreecast", $("script#hb-modal-event-invite-spreecast").html());
</script>

<script id="hb-modal-event-invite-email" type="text/x-handlebars-template">
  <div class='invite-section' data-invite-method='email'>
    <div class="invite-head email">
      <h5 class="email-icons"><i class="channel-icon"></i><span data-invite-type="viewer" class="total">0</span><span> to Watch</span></h5>
    </div>
    <textarea data-invite-type='viewer' placeholder="Enter email addresses, separated by commas." class='email-invite-entry common-input'/>

    {{#if user.producer }}
      <div class="invite-head email">
        <h5><i class="camera-icon"></i><span data-invite-type="on_screen" class="total">0</span><span> on Camera</span></h5>
      </div>
      <textarea data-invite-type='on_screen' placeholder="Enter email addresses, separated by commas." class='email-invite-entry common-input'/>

      <div class="invite-head email">
        <h5><i class="producer-icon"></i><span data-invite-type="coproducer" class="total">0</span><span> to Produce</span></h5>
      </div>
      <textarea data-invite-type='coproducer' placeholder="Enter email addresses, separated by commas." class='email-invite-entry common-input'/>
    {{/if}}
  </div>
</script>
<script type="text/javascript">
  Handlebars.registerPartial("_invite_email", $("script#hb-modal-event-invite-email").html());
</script>

<script id="hb-modal-event-viewers-list" type="text/x-handlebars-template">
  <ul class="viewer-list"></ul>
  <h3 class="viewer-list-loading">
    {{> _modal_body_loading }}
  </h3>
  <div class="paginate">
    <span class="prev left-caret-icon"></span>
    Page <span class="curr"></span> of <span class="pages"></span>
    <span class="next right-caret-icon"></span>
  </div>
</script>
<script type="text/javascript">
  Handlebars.registerPartial("_viewer_list", $("script#hb-modal-event-viewers-list").html());
</script>

<script id="hb-modal-event-invite-searchable-list" type="text/x-handlebars-template">
  <input type="text" class="user-search common-input" placeholder="Search"/>
  <div class="list-container">
    <div class="invite-totals">
      <div class="invite-head viewer">
        <i class="channel-icon"></i><h6><span data-invite-type="viewer" class="total">0</span><span> to Watch</span></h6>
      </div>
      {{#if user.producer }}
        <div class="invite-head">
          <i class="camera-icon"></i><h6><span data-invite-type="on_screen" class="total">0</span><span> on Camera</span></h6>
        </div>
        <div class="invite-head">
          <i class="producer-icon"></i><h6><span data-invite-type="coproducer" class="total">0</span><span> to Produce</span></h6>
        </div>
      {{/if}}
    </div>
    {{> _viewer_list}}
  </div>
</script>
<script type="text/javascript">
  Handlebars.registerPartial("_invite_choices_list", $("script#hb-modal-event-invite-searchable-list").html());
</script>




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
  <form accept-charset="UTF-8" action="/events/ask-the-archbishop/clips/best-of-ask-the-archbishop" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="MTNFY6CeAg95ij2X8BvIIRcdbfz0j3bd8uoqRr7b4Nk=" /></div>
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
  <form accept-charset="UTF-8" action="/users" class="new_user" client-validation="true" data-remote="true" id="new_user" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="MTNFY6CeAg95ij2X8BvIIRcdbfz0j3bd8uoqRr7b4Nk=" /></div>
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
  <form accept-charset="UTF-8" action="/users/reset_password" class="new_user" client-validation="true" data-remote="true" id="reset-password" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="MTNFY6CeAg95ij2X8BvIIRcdbfz0j3bd8uoqRr7b4Nk=" /></div>
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

    <form accept-charset="UTF-8" action="/users/sign_in" class="new_user" data-remote="true" id="new_user" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="MTNFY6CeAg95ij2X8BvIIRcdbfz0j3bd8uoqRr7b4Nk=" /></div>
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
