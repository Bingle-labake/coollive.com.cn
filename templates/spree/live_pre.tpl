
<!DOCTYPE html>
<html> 
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# coollive: http://ogp.me/ns/fb/coollive#">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!--[if lte IE 9]>
    <script type="text/javascript">
      window.location.href = '/upgrade';
    </script>
    <![endif]-->
  <meta content="eBay vs. Amazon - Round 12 - Spreecast" name="title" />
  <meta content="Spreecast on 2015-03-23 14:00:00 -0400 created by ChrisGreen - ScanPower - EBay and Amazon are always changing! Updates, fee structure changes, pol..." name="description" />
  <meta content="ebay, amazon, FBA, Fulfillment by Amazon, scanpower, thrift hunters, thifting" name="keywords" />
  
  <meta http-equiv="X-UA-Compatible" content="IE=edge" >
  <meta http-equiv="X-UA-Compatible" content="requiresActiveX=true" />
  <link rel="stylesheet" type="text/css" href="http://coollive.labake.cn/templates/spree/production/css.css" />
  <script src="http://coollive.labake.cn/public/data/assets/play/ckplayer/ckplayer.js"></script>
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
  <meta content="酷Live-Coollive" property="og:site_name" />
  <meta content="<?php echo $seo['description']; ?>" property="og:description" />
  <meta content="<?php echo $seo['title']; ?>" property="og:title" />
  <meta content="http://coollive.labake.cn/templates/spree/production/images/fb_default_logo.png" property="og:image" />
  <meta content="http://coollive.labake.cn/" property="og:url" />
  <meta content="image/jpeg" property="og:image:type" />
  <title>
      <?php echo $seo['title']; ?> - 酷Live-Coollive
  </title>
  <link href="http://coollive.labake.cn/templates/spree/production/images/favicon.ico" rel="shortcut icon" type="image/vnd.microsoft.icon" />
  <link href="http://coollive.labake.cn/templates/spree/production/assets/common.css" media="screen" rel="stylesheet" type="text/css" />
  <link href="http://coollive.labake.cn/templates/spree/production/assets/events.css" media="screen" rel="stylesheet" type="text/css" />
  <link href="http://coollive.labake.cn/templates/spree/production/assets/event_show.css" media="screen" rel="stylesheet" type="text/css" />
  <script src="http://coollive.labake.cn/templates/spree/production/assets/common.js" type="text/javascript"></script>
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


      var digest_to_parse = "<?php echo $data;?>";
      var digest_to_parse = "eyJ1c2VyX2RhdGEiOnsiZW52IjoicHJvZHVjdGlvbiIsImV2ZW50Ijp7ImFib3V0IjoiSXQncyBNb25kYXkgbmlnaHQgZGFpbHkgZmFudGFzeSBiYXNlYmFsbCB0aW1lIGFuZCBEZXJlayBDYXJ0eSwgVHJpc3RhbiBILiBDb2NrY3JvZnQgYW5kIEN5bnRoaWEgRnJlbHVuZCBhcmUgaGVyZSB0byB3aW4geW91ciBuaWdodC4gVGhleSdsbCB0YWxrIHRvcCBwbGF5cyBhbmQgYW5zd2VyIHlvdXIgREZTIHF1ZXN0aW9ucy4gSm9pbiB0aGUgY29udmVyc2F0aW9uISEiLCJicm9hZGNhc3RlcnNfZW5hYmxlZCI6dHJ1ZSwiY29wcm9kdWNhYmxlIjp0cnVlLCJkaXNwbGF5X3F1ZXN0aW9ucyI6MCwiZW1iZWRfc2hhcmVfdXJsIjpudWxsLCJuYW1lIjoiRVNQTiBNTEIgRGFpbHkgRmFudGFzeSBMaXZlIEVwaXNvZGUgMTkiLCJub3Rfc3RhcnRhYmxlX2J5X2NvcHJvZHVjZXJzIjpmYWxzZSwicXVlc3Rpb25zX2VuYWJsZWQiOnRydWUsInZpc2liaWxpdHkiOjAsInN0YXJ0X2F0IjoiMjAxNS0wNi0yMlQxNzo0NTowMC0wNDowMCIsInN0YXJ0X2F0X2Vwb2NoIjoxNDM1MDA5NTAwMDAwLjAsInBsYXliYWNrX3N0YXJ0IjowLCJ0aW1lcyI6W251bGwsbnVsbF0sImNoYW5uZWxfbmFtZSI6Ik1MQiBvbiBFU1BOIiwiYWxsb3dfZG9uYXRpb25zIjpmYWxzZSwibm93X2Jyb2FkY2FzdGluZyI6ZmFsc2UsInN0YXR1cyI6MCwiZXZlbnRfaWQiOjE2NjM4NCwiaW1hZ2VfdXJsIjoiaHR0cDovL3MzLmFtYXpvbmF3cy5jb20vc3ByZWVjYXN0LXByb2R1Y3Rpb24vZXZlbnRzLzE2NjM4NC90aWxlXzQ4MHgzNjAvaW1nMjAxNTA2MTktMTAzOTItMzd4ZnYxLmpwZz8xNDM0NzI2MTAzIiwidHdpdHRlciI6eyJzZWFyY2giOm51bGwsImluY2x1ZGUiOm51bGx9LCJob3N0Ijp7ImFib3V0X21lIjoiIiwiZmlyc3RfbmFtZSI6IkVTUE4iLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjp0cnVlLCJsYXN0X25hbWUiOiIiLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6ImVzcG4iLCJhbHQiOjQwMzQ5MSwiYWRtaW4iOmZhbHNlLCJjb250ZW50X21vZCI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiLy9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1waG90b3MvcHJvZHVjdGlvbi91c2Vycy80MDM0OTEvdGlsZV8zMHgzMC80MDM0OTFfcGhvdG8uanBnPzEzNzA5NjQ1MTkiLCJpc19mYiI6ZmFsc2UsInBwdl9hcHByb3ZlZCI6ZmFsc2UsImlzX2FmZmlsaWF0ZSI6ZmFsc2UsImZvbGxvd2luZ19ldmVudHMiOlsxNjYzODRdLCJpc19sb2NrZWQiOnRydWUsInBsYW5fbmFtZSI6IkdvbGQiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6dHJ1ZSwiYWxsb3dfZnJpZW5kX3JlcXVlc3RzIjp0cnVlLCJ2Y2F0IjpudWxsfSwibnVtX3ZpZXdlcnMiOjEsImZyaWVuZGx5X2lkIjoiZXNwbi1tbGItZGFpbHktZmFudGFzeS1saXZlLWVwaXNvZGUtMTkiLCJldmVudF9lbmFibGVkIjpmYWxzZSwidmlld3MiOjEzNCwic3RpdGNoX3VybHMiOnt9LCJwcmVfZXZlbnRfZXh0ZW5kZWRfdGltZSI6IjMwIG1pbnV0ZXMiLCJxdWVzdGlvbnNfdGhyb3R0bGVkIjpmYWxzZSwiYnJvYWRjYXN0ZXJzX3Rocm90dGxlZCI6ZmFsc2UsImFkX29uX2FpciI6ZmFsc2UsImFkc19lbmFibGVkIjp0cnVlLCJiYW5uZXJfYWRzX2VuYWJsZWQiOmZhbHNlLCJyZWNvbW1lbmRlZF9jb250ZW50IjpbeyJpZCI6MTY2MTg4LCJzbHVnIjoiZXNwbi1uYmEtbGl2ZS1jaGF0LWVwaXNvZGUtMTQyIiwib3duZXJfbmFtZSI6IkBUcnVlSG9vcFRWIiwib3duZXJfc2x1ZyI6InRydWVob29wdHYtLTIiLCJuYW1lIjoiRVNQTiBOQkEgTGl2ZSBDaGF0IEVwaXNvZGUgMTQyIiwibG9nbyI6Imh0dHA6Ly9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1wcm9kdWN0aW9uL2V2ZW50cy8xNjYxODgvdGlsZV8yNDB4MTgwL2ltZzIwMTUwNjExLTIwMDk1LTVzd2pwbi5qcGc/MTQzNDA0MjYxNCIsInVybCI6Imh0dHA6Ly93d3cuc3ByZWVjYXN0LmNvbS9ldmVudHMvZXNwbi1uYmEtbGl2ZS1jaGF0LWVwaXNvZGUtMTQyIiwidHlwZSI6ImV2ZW50IiwiYWJvdXQiOiJUSFRWIExpdmUgZnJvbSB0aGUgRmluYWxzLiAiLCJ2aWV3cyI6NTIxMDI5LCJsZW5ndGgiOiIwMToxMDo1OSJ9LHsiaWQiOjE2NjEzOCwic2x1ZyI6ImVzcG4tbmJhLWxpdmUtY2hhdC1lcGlzb2RlLTE0MSIsIm93bmVyX25hbWUiOiJAVHJ1ZUhvb3BUViIsIm93bmVyX3NsdWciOiJ0cnVlaG9vcHR2LS0yIiwibmFtZSI6IkVTUE4gTkJBIExpdmUgQ2hhdCBFcGlzb2RlIDE0MSIsImxvZ28iOiJodHRwOi8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcHJvZHVjdGlvbi9ldmVudHMvMTY2MTM4L3RpbGVfMjQweDE4MC9pbWcyMDE1MDYwOS0yNDE2Ni0xYzdhb2h3LmpwZz8xNDMzODY1OTU0IiwidXJsIjoiaHR0cDovL3d3dy5zcHJlZWNhc3QuY29tL2V2ZW50cy9lc3BuLW5iYS1saXZlLWNoYXQtZXBpc29kZS0xNDEiLCJ0eXBlIjoiZXZlbnQiLCJhYm91dCI6IlRvbSwgQW1pbiwgRXRoYW4sIFdvcy4gWU9VLiBGaW5hbHMuICIsInZpZXdzIjoxNDcyNDAsImxlbmd0aCI6IjAxOjA1OjExIn0seyJpZCI6MTY1NzU0LCJzbHVnIjoiZXNwbi1uYmEtbGl2ZS1jaGF0LWVwaXNvZGUtMTM4Iiwib3duZXJfbmFtZSI6IkBUcnVlSG9vcFRWIiwib3duZXJfc2x1ZyI6InRydWVob29wdHYtLTIiLCJuYW1lIjoiRVNQTiBOQkEgTGl2ZSBDaGF0IEVwaXNvZGUgMTM4IiwibG9nbyI6Imh0dHA6Ly9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1wcm9kdWN0aW9uL2V2ZW50cy8xNjU3NTQvdGlsZV8yNDB4MTgwL2ltZzIwMTUwNTI3LTEyMzQzLWZwNGZheC5qcGc/MTQzMjczODg0NCIsInVybCI6Imh0dHA6Ly93d3cuc3ByZWVjYXN0LmNvbS9ldmVudHMvZXNwbi1uYmEtbGl2ZS1jaGF0LWVwaXNvZGUtMTM4IiwidHlwZSI6ImV2ZW50IiwiYWJvdXQiOiJBbWluLCBUb20sIFdvcyBtYXliZSBFdGhhbiwgSmFkZSBhbmQgWU9VLiIsInZpZXdzIjo5MDU5NTIsImxlbmd0aCI6IjAxOjIzOjU1In0seyJpZCI6MTY1ODI0LCJzbHVnIjoiZXNwbi1uYmEtbGl2ZS1jaGF0LWVwaXNvZGUtMTQwIiwib3duZXJfbmFtZSI6IkBUcnVlSG9vcFRWIiwib3duZXJfc2x1ZyI6InRydWVob29wdHYtLTIiLCJuYW1lIjoiRVNQTiBOQkEgTGl2ZSBDaGF0IEVwaXNvZGUgMTQwIiwibG9nbyI6Imh0dHA6Ly9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1wcm9kdWN0aW9uL2V2ZW50cy8xNjU4MjQvdGlsZV8yNDB4MTgwL2ltZzIwMTUwNTI5LTMxNjE0LTEzdmI0ejguanBnPzE0MzI5MTMzMTEiLCJ1cmwiOiJodHRwOi8vd3d3LnNwcmVlY2FzdC5jb20vZXZlbnRzL2VzcG4tbmJhLWxpdmUtY2hhdC1lcGlzb2RlLTE0MCIsInR5cGUiOiJldmVudCIsImFib3V0IjoiQW1pbiwgVG9tIGFuZCBFdGhhbi4gIiwidmlld3MiOjcxMjEwLCJsZW5ndGgiOiI1ODo0MyJ9LHsiaWQiOjE2NjI5MSwic2x1ZyI6ImVzcG4tbWxiLWRhaWx5LWZhbnRhc3ktbGl2ZS1lcGlzb2RlLTE4Iiwib3duZXJfbmFtZSI6IkVTUE4iLCJvd25lcl9zbHVnIjoiZXNwbiIsIm5hbWUiOiJFU1BOIE1MQiBEYWlseSBGYW50YXN5IExpdmUgRXBpc29kZSAxOCIsImxvZ28iOiJodHRwOi8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcHJvZHVjdGlvbi9ldmVudHMvMTY2MjkxL3RpbGVfMjQweDE4MC9pbWcyMDE1MDYxNS0xNzU4OS1tcXNzeWYuanBnPzE0MzQ0MDk2MDgiLCJ1cmwiOiJodHRwOi8vd3d3LnNwcmVlY2FzdC5jb20vZXZlbnRzL2VzcG4tbWxiLWRhaWx5LWZhbnRhc3ktbGl2ZS1lcGlzb2RlLTE4IiwidHlwZSI6ImV2ZW50IiwiYWJvdXQiOiJHZXQgcmVhZHkgZm9yIFdlZG5lc2RheSBuaWdodCBERlMgd2l0aCBEZXJlayBDYXJ0eSBhbmQgQ3ludGhpYSBGcmVsdW5kLiBUaGV5J2xsIGdpdmUgeW91IHRvcCBwaWNrcyBmb3IgdGhlIG5pZ2h0IGFuZCBhbnN3ZXIgeW91ciBxdWVzdGlvbnMuIEpvaW4gdGhlIGNvbnZlcnNhdGlvbiBhbmQgdGhlIGZ1biEhIiwidmlld3MiOjEzMzE4OCwibGVuZ3RoIjoiNDI6MDEifSx7ImlkIjoxNjYyODUsInNsdWciOiJlc3BuLW5mbC1uYXRpb24tdHYtZXBpc29kZS01OSIsIm93bmVyX25hbWUiOiJFU1BOIiwib3duZXJfc2x1ZyI6ImVzcG4iLCJuYW1lIjoiRVNQTiBORkwgTmF0aW9uIFRWIC0gRXBpc29kZSA1OSIsImxvZ28iOiJodHRwOi8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcHJvZHVjdGlvbi9ldmVudHMvMTY2Mjg1L3RpbGVfMjQweDE4MC9pbWcyMDE1MDYxNS0yNDE1OS1xZmcyMTYuanBnPzE0MzQzOTkyMTMiLCJ1cmwiOiJodHRwOi8vd3d3LnNwcmVlY2FzdC5jb20vZXZlbnRzL2VzcG4tbmZsLW5hdGlvbi10di1lcGlzb2RlLTU5IiwidHlwZSI6ImV2ZW50IiwiYWJvdXQiOiJKb2luIEVTUE4gTkZMIHJlcG9ydGVycyB0byBjaGF0IGFib3V0IHRoZSBsYXRlc3QgbmV3cyBmcm9tIGFyb3VuZCB0aGUgbGVhZ3VlLiIsInZpZXdzIjoxNTkxODAsImxlbmd0aCI6IjU3OjMyIn0seyJpZCI6MTY2MjY3LCJzbHVnIjoiZXNwbi1tbGItZGFpbHktZmFudGFzeS1saXZlLWVwaXNvZGUtMTciLCJvd25lcl9uYW1lIjoiRVNQTiIsIm93bmVyX3NsdWciOiJlc3BuIiwibmFtZSI6IkVTUE4gTUxCIERhaWx5IEZhbnRhc3kgTGl2ZSBFcGlzb2RlIDE3IiwibG9nbyI6Imh0dHA6Ly9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1wcm9kdWN0aW9uL2V2ZW50cy8xNjYyNjcvdGlsZV8yNDB4MTgwL2ltZzIwMTUwNjE1LTE3NTg5LXgycTA1Ni5qcGc/MTQzNDM3OTQxMyIsInVybCI6Imh0dHA6Ly93d3cuc3ByZWVjYXN0LmNvbS9ldmVudHMvZXNwbi1tbGItZGFpbHktZmFudGFzeS1saXZlLWVwaXNvZGUtMTciLCJ0eXBlIjoiZXZlbnQiLCJhYm91dCI6IkdldCByZWFkeSBmb3IgTW9uZGF5IG5pZ2h0IGRhaWx5IGZhbnRhc3kgYmFzZWJhbGwgd2l0aCBEZXJlayBDYXJ0eSBhbmQgVHJpc3RhbiBILiBDb2NrY3JvZnQuIFRoZXknbGwgZGlzY3VzcyB3aG8gdGhleSBsaWtlIGFuZCBhbnN3ZXIgeW91ciBxdWVzdGlvbnMsIHNvIGpvaW4gdGhlIGNvbnZlcnNhdGlvbi4iLCJ2aWV3cyI6MTIzNjk1LCJsZW5ndGgiOiI0Mzo1MCJ9LHsiaWQiOjE2NTk1MSwic2x1ZyI6ImVzcG4tbWxiLWRhaWx5LWZhbnRhc3ktbGl2ZS1lcGlzb2RlLTE2Iiwib3duZXJfbmFtZSI6IkVTUE4iLCJvd25lcl9zbHVnIjoiZXNwbiIsIm5hbWUiOiJFU1BOIE1MQiBEYWlseSBGYW50YXN5IExpdmUgRXBpc29kZSAxNiIsImxvZ28iOiJodHRwOi8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcHJvZHVjdGlvbi9ldmVudHMvMTY1OTUxL3RpbGVfMjQweDE4MC9pbWcyMDE1MDYwMi0xMTM4NS0xMjdoeTQyLmpwZz8xNDMzMjc0ODc2IiwidXJsIjoiaHR0cDovL3d3dy5zcHJlZWNhc3QuY29tL2V2ZW50cy9lc3BuLW1sYi1kYWlseS1mYW50YXN5LWxpdmUtZXBpc29kZS0xNiIsInR5cGUiOiJldmVudCIsImFib3V0IjoiRGVyZWsgQ2FydHkgYW5kIFRyaXN0YW4gSC4gQ29ja2Nyb2Z0IGdldCB5b3UgcmVhZHkgZm9yIFdlZG5lc2RheSBuaWdodCBkYWlseSBmYW50YXN5IGJhc2ViYWxsLiBKb2luIHRoZSBjb252ZXJzYXRpb24gYXMgdGhleSB3aWxsIGFuc3dlciB5b3VyIERGUyBxdWVzdGlvbnMgYW5kIGdpdmUgeW91IHRoZSBiZXN0IHBsYXlzIG9mIHRoZSBuaWdodC4iLCJ2aWV3cyI6MTg2NzQ5LCJsZW5ndGgiOiI0MzowMCJ9LHsiaWQiOjE2NTIyNSwic2x1ZyI6ImNvbW1pdGNhc3QtMS1uby0yLXFiLXBwLWR3YXluZS1oYXNraW5zIiwib3duZXJfbmFtZSI6IlJlY3J1aXRpbmdOYXRpb24iLCJvd25lcl9zbHVnIjoicmVjcnVpdGluZ25hdGlvbiIsIm5hbWUiOiJDb21taXRDYXN0IDE6IE5vLiAyIFFCLVBQIER3YXluZSBIYXNraW5zIiwibG9nbyI6Imh0dHA6Ly9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1wcm9kdWN0aW9uL2V2ZW50cy8xNjUyMjUvdGlsZV8yNDB4MTgwLzE2NTIyNV9waG90by5qcGc/MTQzMTUzMjExNyIsInVybCI6Imh0dHA6Ly93d3cuc3ByZWVjYXN0LmNvbS9ldmVudHMvY29tbWl0Y2FzdC0xLW5vLTItcWItcHAtZHdheW5lLWhhc2tpbnMiLCJ0eXBlIjoiZXZlbnQiLCJhYm91dCI6IiIsInZpZXdzIjoxMjI4NTMsImxlbmd0aCI6IjA4OjI4In0seyJpZCI6MTU2NzkzLCJzbHVnIjoia2lja29mZi1leHRyYS1ib3dsLXNlbGVjdGlvbi1zaG93Iiwib3duZXJfbmFtZSI6IkVTUE4uY29tIENvbGxlZ2UgRm9vdGJhbGwiLCJvd25lcl9zbHVnIjoiZXNwbi1jb20tY29sbGVnZS1mb290YmFsbCIsIm5hbWUiOiJLaWNrb2ZmIEV4dHJhOiBCb3dsIFNlbGVjdGlvbiBTaG93IiwibG9nbyI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvNTIxMDI3L3RpbGVfMjQweDE4MC81MjEwMjdfcGhvdG8uanBnPzEzNjc1OTM5MjUiLCJ1cmwiOiJodHRwOi8vd3d3LnNwcmVlY2FzdC5jb20vZXZlbnRzL2tpY2tvZmYtZXh0cmEtYm93bC1zZWxlY3Rpb24tc2hvdyIsInR5cGUiOiJldmVudCIsImFib3V0IjoiIiwidmlld3MiOjMxODM4NSwibGVuZ3RoIjoiMjM6MzcifV0sImNhdGVnb3J5IjoiU3BvcnRzIiwiaXNfZXhwaXJlZCI6ZmFsc2UsInVubGlzdGVkX2VtYmVkX2VuYWJsZWQiOnRydWUsImxlZ2FjeV9ydG1wIjpmYWxzZSwiaXNfcHJlbWl1bSI6ZmFsc2UsIm1vYmlsZV91cmwiOiJodHRwOi8vd3d3LnNwcmVlY2FzdC5jb20vZXZlbnRzL2VzcG4tbWxiLWRhaWx5LWZhbnRhc3ktbGl2ZS1lcGlzb2RlLTE5L21vYmlsZSIsIm1vYmlsZV9lY21hIjoiaHR0cDovL3d3dy5zcHJlZWNhc3QuY29tL2V2ZW50cy9lc3BuLW1sYi1kYWlseS1mYW50YXN5LWxpdmUtZXBpc29kZS0xOS9tb2JpbGVfZWNtYV92IiwicnN2cF9jb3VudCI6NH0sImlzX2VtYmVkIjpmYWxzZSwic2NtX2VudiI6InByb2R1Y3Rpb24iLCJ1c2VyIjp7ImFib3V0X21lIjoiIiwiZmlyc3RfbmFtZSI6Ikd1ZXN0VXNlciIsImhhc19iZWVuX2F1dGhlbnRpY2F0ZWQiOmZhbHNlLCJsYXN0X25hbWUiOiIiLCJuZWVkc190b19jb25maXJtX2VtYWlsIjpmYWxzZSwidXNlcl9pZCI6Imd1ZXN0dXNlci0tMiIsImFsdCI6MjE3Mzg2LCJhZG1pbiI6ZmFsc2UsImNvbnRlbnRfbW9kIjpmYWxzZSwicHJvZmlsZV9waG90b190aHVtYl91cmwiOiIvcHJvZmlsZV9waG90b3MvdGlsZV8zMHgzMC92aXNpdG9yLnBuZyIsImlzX2ZiIjpmYWxzZSwicHB2X2FwcHJvdmVkIjpmYWxzZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6W10sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiQmFzaWMiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6ZmFsc2UsImFsbG93X2ZyaWVuZF9yZXF1ZXN0cyI6dHJ1ZSwiaXNfY29ubmVjdGVkIjp0cnVlLCJ2Y2F0IjpudWxsfSwicmVjb21tZW5kZWRfdXNlcnMiOlt7ImlkIjo0MDM0OTEsImNhY2hlZF9zbHVnIjoiZXNwbiIsIm5hbWUiOiJFU1BOIiwicGhvdG8iOiIvL3MzLmFtYXpvbmF3cy5jb20vc3ByZWVjYXN0LXBob3Rvcy9wcm9kdWN0aW9uL3VzZXJzLzQwMzQ5MS90aWxlXzEwMHgxMDAvNDAzNDkxX3Bob3RvLmpwZz8xMzcwOTY0NTE5In0seyJpZCI6MTQyNzgxLCJjYWNoZWRfc2x1ZyI6InJlYWxpdHktc3RldmUiLCJuYW1lIjoiUmVhbGl0eSBTdGV2ZSIsInBob3RvIjoiLy9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1waG90b3MvcHJvZHVjdGlvbi91c2Vycy8xNDI3ODEvdGlsZV8xMDB4MTAwLzE0Mjc4MV9waG90by5qcGc/MTM4OTkwODc0OCJ9LHsiaWQiOjM0ODg3MSwiY2FjaGVkX3NsdWciOiJib21hbmkiLCJuYW1lIjoiQm9tYW5pIEpvbmVzIiwicGhvdG8iOiIvL3MzLmFtYXpvbmF3cy5jb20vc3ByZWVjYXN0LXBob3Rvcy9wcm9kdWN0aW9uL3VzZXJzLzM0ODg3MS90aWxlXzEwMHgxMDAvMzQ4ODcxX3Bob3RvLmpwZz8xMzUwMDg4MDAwIn0seyJpZCI6MzU1Mjk0LCJjYWNoZWRfc2x1ZyI6InRoZS1ibGFjay1ndXktd2hvLXRpcHMiLCJuYW1lIjoiVGhlIEJsYWNrIEd1eSBXaG8gVGlwcyIsInBob3RvIjoiLy9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1waG90b3MvcHJvZHVjdGlvbi91c2Vycy8zNTUyOTQvdGlsZV8xMDB4MTAwLzM1NTI5NF9waG90by5qcGc/MTM1MjMzNjgxMyJ9LHsiaWQiOjQxNDg1NiwiY2FjaGVkX3NsdWciOiJ0cnVlaG9vcHR2LS0yIiwibmFtZSI6IkBUcnVlSG9vcFRWIiwicGhvdG8iOiIvL3MzLmFtYXpvbmF3cy5jb20vc3ByZWVjYXN0LXBob3Rvcy9wcm9kdWN0aW9uL3VzZXJzLzQxNDg1Ni90aWxlXzEwMHgxMDAvNDE0ODU2X3Bob3RvLmpwZz8xMzU1ODY4NDE1In0seyJpZCI6OTU2ODcxLCJjYWNoZWRfc2x1ZyI6InRoZS1kb21pbmEiLCJuYW1lIjoiVGhlIERvbWluYSIsInBob3RvIjoiLy9zMy5hbWF6b25hd3MuY29tL3NwcmVlY2FzdC1waG90b3MvcHJvZHVjdGlvbi91c2Vycy85NTY4NzEvdGlsZV8xMDB4MTAwLzk1Njg3MV9waG90by5qcGc/MTQyNTQzNjYyMSJ9XSwiYXdlc20iOnsia2V5IjoiZTI1MTVmYzFhMDU4NTdhZWY5ZTdjMDNjMjUxYjk1ZDA2ZGRiZDdiODA2OWFkOTlhYzI1ZTZkZWU5YzE1NDYyOSIsInRvb2wiOiJsTVZrZTgifSwiYWQiOnsicGFyYW1zIjp7ImNhdGVnb3J5IjoiU3BvcnRzIiwiY2hhbm5lbF9pZCI6NzIwMDM4LCJvd25lcl9pZCI6NDAzNDkxLCJlbWJlZCI6ZmFsc2UsImV2ZW50X2lkIjoxNjYzODQsImV2ZW50X3N0YXR1cyI6MCwiZXZlbnRfdmlzaWJpbGl0eSI6MCwidGFncyI6IkVTUE4sVHJpc3RhbiBILiBDb2NrY3JvZnQsREZTLERhaWx5IEZhbnRhc3kgU3BvcnRzLERhaWx5IEZhbnRhc3kgQmFzZWJhbGwsQ3ludGhpYSBGcmVsdW5kLERlcmVrLENhcnR5IiwiaXNfcHB2IjpmYWxzZSwiZXZlbnRfbmFtZSI6ImVzcG4tbWxiLWRhaWx5LWZhbnRhc3ktbGl2ZS1lcGlzb2RlLTE5IiwiY2hhbm5lbF9uYW1lIjoibWxiLW9uLWVzcG4iLCJ1c2VyX25hbWUiOiJndWVzdHVzZXItLTIiLCJ1c2VyX2lkIjoyMTczODYsInNjbV9lbnYiOiJwcm9kdWN0aW9uIiwicGxhbiI6IkdvbGQifSwiYmFzZV91cmwiOiJodHRwOi8vcHViYWRzLmcuZG91YmxlY2xpY2submV0L2dhbXBhZC9hZHM/c3o9NDAweDMwMCZpdT0vMjAyNzk3MTMvUHJvZHVjdGlvbl9KdW5lXzE4X0FkVW5pdCZjaXVfc3pzJmltcGw9cyZnZGZwX3JlcT0xJmVudj12cCZvdXRwdXQ9eG1sX3Zhc3QyJnVudmlld2VkX3Bvc2l0aW9uX3N0YXJ0PTEmdXJsPVtyZWZlcnJlcl91cmxdJmNvcnJlbGF0b3I9W3RpbWVzdGFtcF0ifX0sInVzZXJfaWQiOiJndWVzdHVzZXItLTIiLCJpc19tb2RlcmF0b3IiOmZhbHNlLCJkaWdlc3QiOnsibGFzdF9tZXNzYWdlX2lkIjo1NTIsInZpc2libGVfdXNlcnMiOlt7ImFib3V0X21lIjoiVmlzaXRvciIsImZpcnN0X25hbWUiOiJWaXNpdG9yIiwiaGFzX2JlZW5fYXV0aGVudGljYXRlZCI6ZmFsc2UsImxhc3RfbmFtZSI6IiIsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJ1c2VyX2lkIjoiZ3Vlc3RnVTRJWDZxSG81TEpjdTFrIiwiYWx0IjoiZ3Vlc3RnVTRJWDZxSG81TEpjdTFrIiwiYWRtaW4iOmZhbHNlLCJjb250ZW50X21vZCI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiL3Byb2ZpbGVfcGhvdG9zL3RpbGVfMzB4MzAvbm9waWMyLnBuZyIsImlzX2ZiIjpmYWxzZSwicHB2X2FwcHJvdmVkIjpmYWxzZSwiaXNfYWZmaWxpYXRlIjpmYWxzZSwiZm9sbG93aW5nX2V2ZW50cyI6W10sImlzX2xvY2tlZCI6dHJ1ZSwicGxhbl9uYW1lIjoiQmFzaWMiLCJjYW5fY3JlYXRlX3NwcmVlY2FzdCI6ZmFsc2UsImFsbG93X2ZyaWVuZF9yZXF1ZXN0cyI6dHJ1ZSwidmNhdCI6bnVsbCwicHJvcG9zZWRfcHJvbW90aW9uIjowLCJwcm9kdWNlciI6ZmFsc2UsImJyb2FkY2FzdF9zdGF0dXMiOjAsIm93bmVyIjpmYWxzZSwiYWN0aW9uIjpudWxsLCJzdHJlYW1fcXVhbGl0eSI6MCwiaXNfYmFubmVkIjpmYWxzZSwicHJldmlld19sb2NhdGlvbiI6bnVsbCwicm9sZSI6bnVsbH1dLCJjdXJyZW50X3ZpZXdlcnNfY291bnQiOjEsInN0cmVhbV9xdWFsaXRpZXMiOltdLCJwcm9kdWNlcl91c2VycyI6W10sImRvbmF0aW9uX2N1cnJlbnRseV9vbl9haXIiOm51bGwsInF1ZXN0aW9ucyI6W3sicXVlc3Rpb25faWQiOjU5NDA3OSwidGV4dCI6IlN1Ym1pdCB5b3VyIE1vbmRheSBuaWdodCBEYWlseSBGYW50YXN5IGJhc2ViYWxsIHF1ZXN0aW9ucyBpbiB0aGUgYm94IGFib3ZlLiBEZXJlaywgVHJpc3RhbiBhbmQgQ3ludGhpYSB3b3VsZCBsb3ZlIGZvciB5b3UgdG8gam9pbiB0aGUgY29udmVyc2F0aW9uISIsInVzZXJfaWQiOiJlc3BuIiwidXNlciI6eyJhYm91dF9tZSI6IiIsImZpcnN0X25hbWUiOiJFU1BOIiwiaGFzX2JlZW5fYXV0aGVudGljYXRlZCI6dHJ1ZSwibGFzdF9uYW1lIjoiIiwibmVlZHNfdG9fY29uZmlybV9lbWFpbCI6ZmFsc2UsInVzZXJfaWQiOiJlc3BuIiwiYWx0Ijo0MDM0OTEsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJwcm9maWxlX3Bob3RvX3RodW1iX3VybCI6Ii8vczMuYW1hem9uYXdzLmNvbS9zcHJlZWNhc3QtcGhvdG9zL3Byb2R1Y3Rpb24vdXNlcnMvNDAzNDkxL3RpbGVfMzB4MzAvNDAzNDkxX3Bob3RvLmpwZz8xMzcwOTY0NTE5IiwiaXNfZmIiOmZhbHNlLCJwcHZfYXBwcm92ZWQiOmZhbHNlLCJpc19hZmZpbGlhdGUiOmZhbHNlLCJmb2xsb3dpbmdfZXZlbnRzIjpbMTY2Mzg0XSwiaXNfbG9ja2VkIjp0cnVlLCJwbGFuX25hbWUiOiJHb2xkIiwiY2FuX2NyZWF0ZV9zcHJlZWNhc3QiOnRydWUsImFsbG93X2ZyaWVuZF9yZXF1ZXN0cyI6dHJ1ZSwidmNhdCI6bnVsbH0sImFjdGlvbiI6ImFwcHJvdmVkIiwiYWN0aW9uX3R5cGUiOjAsIm9uX2FpciI6bnVsbCwib2ZmX2FpciI6bnVsbCwic3RhcnJlZF9hdCI6bnVsbCwic2NvcmUiOjkwMCwidm90ZV90b3RhbCI6MSwidm90ZXMiOnsiNDAzNDkxIjoxfX1dLCJxdWVzdGlvbl9jdXJyZW50bHlfb25fYWlyIjpudWxsLCJtZWRpYV9pdGVtcyI6W10sIm1lZGlhX2l0ZW1fY3VycmVudGx5X29uX2FpciI6bnVsbCwidmlkZW9fZGlnZXN0Ijp7InByZXZpZXdfbG9jYXRpb24iOiJydG1mcDovL2VjMi0xMDctMjEtMjM3LTExNy5jb21wdXRlLTEuYW1hem9uYXdzLmNvbS9saXZlL3Byb2R1Y3Rpb24uZXNwbi1tbGItZGFpbHktZmFudGFzeS1saXZlLWVwaXNvZGUtMTlfcHJldmlldyIsImlwaG9uZV9wcmV2aWV3X2xvY2F0aW9uIjoicnRzcDovL2VjMi01NC0xNjYtMTg4LTk5LmNvbXB1dGUtMS5hbWF6b25hd3MuY29tL3J0c3AvZm1zMS5wcm9kdWN0aW9uLmVzcG4tbWxiLWRhaWx5LWZhbnRhc3ktbGl2ZS1lcGlzb2RlLTE5X3ByZXZpZXciLCJzdGFydF9ldmVudF90aW1lX3N0cmluZyI6IjAiLCJwbGF5YmFja19zdGFydCI6IjAiLCJhcmNoaXZlX3VybHMiOnt9LCJlbmRfZXZlbnRfdGltZV9zdHJpbmciOiIwIiwiY3VycmVudF90aW1lX3N0cmluZyI6IjE0MzQ4OTI3MTgzMDYiLCJ2aWRlb19zbmFwc2hvdHMiOlt7InZpZGVvX3NuYXBzaG90Ijp7Im1heF90aW1lX3N0cmluZyI6IjE0MzQ4NTQ3MDI5NjIiLCJhY3Rpb24iOiJlbmQiLCJ2aWRlb19mZWVkcyI6W10sInN0YXJ0ZWRfdXNlciI6bnVsbCwiZW5kZWRfdXNlciI6eyJ1c2VyX2lkIjoiZXNwbiIsInZpZGVvX3VpZCI6InhKcXBZYXFRd1dnRW1UenJxN1l4IiwicmVhc29uIjoicHJvZHVjZXIifSwibGF5b3V0IjoiZm91cl9ib3hlcyIsInZpZGVvX3NuYXBzaG90X251bWJlciI6Nzd9fV19LCJjaGF0X2RpZ2VzdCI6eyJ2aWV3ZXIiOltdLCJtb2RlcmF0b3IiOltdfSwibm93X2Jyb2FkY2FzdGluZyI6ZmFsc2UsInN0aXRjaF91cmxzIjp7fSwiYWRfZGlnZXN0IjpbXSwicHJvZHVjZXJfdGFiX2VuYWJsZWQiOmZhbHNlLCJhdnBfY291bnRlciI6MCwiaXNfZXhwaXJlZCI6ZmFsc2UsInVubGlzdGVkX2VtYmVkX2VuYWJsZWQiOnRydWV9fQ==";




      var opts = decode(digest_to_parse);
      //var opts = decode(digest_to_parse);
      //console.log(JSON.stringify(opts));

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
    spree.mixpanelPageType = 'event';
    spree.modalMgr = new ModalManager();
    spree.bannerMgr = new BannerManager();
    spree.loginMgr = new LoginManager();

    if (!spree.hasSpreecastUserCookie() &&
      ((spree.event || spree.clip) &&
      (!spree.is_embed && !spree.isMobile()) &&
      (!spree.event.ads_enabled || !spree.event.event_enabled))
      && !window.eventLanding ) {
        spree.loginMgr.showSignup('auto pop', false, null, {signUpText: '注册去聊天，提个问题或加入到我们的酷Live'});
    }

    spree.sha = 'bed99a2ad0e2bc';
    spree.pending_questions_limit = 50;
    spree.pending_camera_requests_limit = 30;
    spree.broadcast_protocol = 'rtmfp';
    spree.in_event = true;
    if (typeof InviteManager !== 'undefined') {
      var inviteTypesJSON = [{"type":"viewer","text":"Invite to watch","verb":" to Watch"},{"type":"on_screen","text":"Invite on screen","verb":" on Camera"},{"type":"coproducer","text":"Add as coproducer","verb":" to Produce"}];
      if (!spree.user.producer){
        inviteTypesJSON = inviteTypesJSON.slice(0, 1);
      }
      spree.inviteMgr = new InviteManager(inviteTypesJSON);
    }


    spree.cdn_prefix = 'https://d35ncmvcdy3liz.cloudfront.net/production/201503192031_faa2c47';
      opts.auto_play = !!queryHash['autoplay'] || false;
      spree.event.event_url = decodeURIComponent('http://www.spreecast.com/events/ebay-vs-amazon-round-12');


    var spreecastOpts = { event_show_url: location.href };
        _.extend(spreecastOpts, { embed: false });
      //responsible for intializing spreecast object
      spree.registerListeners(spreecastOpts);

      $(document).trigger('spree:init');

      new QuestionTicker(spree);
      new ScreenQueue(spree)
  });

</script>

    <script src="http://coollive.labake.cn/templates/spree/production/assets/event_common.js" type="text/javascript"></script>
    <script src="http://coollive.labake.cn/templates/spree/production/assets/event_show.js" type="text/javascript"></script> 
    <script src="http://coollive.labake.cn/templates/spree/production/assets/isq.js" type="text/javascript"></script>
</head>

  <body class="events_show full_experience">
      <div class="rapper">
    <div id="fb-root"></div>
          <div id="site-channels" data-user-channel="1cbddd43349c30c27847b0c5d7491d4d" data-user-channel-last-message-id="0" data-everyone-channel="3bf5b67abf2ae25d010cc3fb7c4972c2" data-everyone-channel-last-message-id="0"></div>
      <div id="event-channels" data-user-channel="d55b868109665320e6b82ff0925ecb4b" data-user-channel-last-message-id="1" data-everyone-channel="413aa26d703b909ffe2d7ef25e6ed7d3"></div>
      <div id="user-cache-elements-replacement" data-profile="eyJ1c2VyX2lkIjoibGFiYWtlIiwibmFtZSI6ImxhYmFrZSIsImVtYWlsIjoiMTY0NTU5NjUzQHFxLmNvbSIsImFkbWluIjpmYWxzZSwiY29udGVudF9tb2QiOmZhbHNlLCJzM19pZCI6OTAwNTQzLCJpc19mYiI6ZmFsc2UsInByb2ZpbGVfcGhvdG9fdGh1bWJfdXJsIjoiL3Byb2ZpbGVfcGhvdG9zL3RpbGVfMzB4MzAvbm9wcm9maWxlLnBuZyIsInByb2ZpbGVfcGhvdG9fbWVkaXVtX3VybCI6Ii9wcm9maWxlX3Bob3Rvcy90aWxlXzEwMHgxMDAvbm9wcm9maWxlLnBuZyIsImNyZWF0ZWRfYXQiOjE0MTM4NjE5MDUwMDAsImludml0YXRpb25fY291bnQiOjAsIm5lZWRzX3RvX2NvbmZpcm1fZW1haWwiOmZhbHNlLCJoYXNfYmVlbl9hdXRoZW50aWNhdGVkIjp0cnVlLCJhdXRoZW50aWNhdGlvbiI6ImVtYWlsIiwicHJlc2VuY2VfZW5hYmxlZCI6dHJ1ZSwiZm9sbG93aW5nX2V2ZW50cyI6W10sImlzX2xvY2tlZCI6dHJ1ZX0=" data-buddy-list="W10=" data-friend-requests="W10=" data-friend-accepts="W10=" data-following="eyJmb2xsb3dpbmciOlszNDIxMDQsMzQ4ODcxLDM1NTI5NCw0MDM0OTEsNDE0ODU2LDUyMTAyNyw5MTU2NDYsOTU2OTE2XX0="></div>
      <div id="presence-replacement" data-online="e30=" data-idle="W10="></div>
      <div id="site-notification-replacement" data-current="e30="></div>
      <div id="ip-address-replacement" data-ip-address="60.194.194.0"></div>
      <div id="firebase-token-replacement" data-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2IjowLCJkIjp7InNpbXVsYXRvciI6ZmFsc2UsInNwcmVla2V5IjoibGk2YlNNSWYyeUZVcHRXVCJ9LCJpYXQiOjE0MjcxMTYzNzh9.waqTw4sEeOXBXJLDNPhV98bDERLqNG82fiixzoKtv6c"></div>

    <!--<div id="blocker"><div class="blocker-content"><h1>Loading Spreecast™</h1><i class="logo-waiting-icon large m-20 spin"></i></div></div>-->

<?php $this->load->view('spree/header_pre.tpl'); ?>
    <div id="main-content">        
<div id="follow-prompt-banner" data-type="PageFollowBanner" class="nu-banner hidden">
  <div class="follow-banner-wrapper stage-width">
    <div id="follow-prompt">
  <h3 class="message">
	  <span>关注</span> <a href="/users/<?php echo $user['uid']; ?>" class="creator" target="_blank"><?php echo $user['username']; ?></a> <span>即将收到的酷Live通知</span>
</h3>  <h5 class="submessage">如果你遵循一个用户，我们会通知你他们即将 酷Live 所以你总是可以的生活经验的一部分。在现场直播可以聊天，问问题，共享媒体，甚至加入相机。漂亮整洁的，是吧？</h5>
  <i class="close-large-icon"></i>
</div>

  </div>
</div>

<div id="upgrade-prompt-banner" data-type="UpgradeBanner" class="banner hidden">
  <div class="upgrade-banner-wrapper stage-width">
    <div id="upgrade-prompt">
      <a href="/users/guestuser--2/edit?tab=settings&amp;tab_action=payments" class="upgrade-link" target="_blank">
        <button class="upgrade-button">升级</button>
</a>      <h4 class="message">升级到spreecast金计划今天你可以选择没有广告对你的spreecasts甚至运行您自己的视频广告。</h4>
      <i class="close-large-icon"></i>
    </div>
  </div>
</div>

<div class="event_content stage-width">
  <section id="event_main">
      <div id="event-header">
  <div id="event-header-card">
    <div id="event-header-avatar">
      <a href="/users/<?php echo $user['uid']; ?>"><img alt="<?php echo $user['username']; ?>" class="large-circle-avatar" src="<?php echo avatar($user['uid']);?>" title="<?php echo $user['username']; ?>&#x27;s profile photo" /></a>
      <button class="following_button header-follow-btn" data-button-id="follow_button_User_chrisgreen" data-following="false" data-id="<?php echo $user['username']; ?>" data-item-id="<?php echo $user['uid']; ?>" data-item="User" data-off-text="Following" data-on-text="Follow" data-registration-required-reason="follow" data-registration-required="true" onClick="spree.clickFollowItem(&#x27;follow_button_User_chrisgreen&#x27;);" title="关注或取消关注<?php echo $user['username']; ?>">关注</button>
    </div>

    <section id="event-header-information">
      <section role="event-header-title">
        <h1 id="event-header-title" title="eBay vs. Amazon - Round 12">
          <a href="/events/<?php echo $program['rid']; ?>"><?php echo $program['name']; ?>-<?php echo $program['rid']; ?></a>
        </h1>
      </section>
      <section role="event-header-meta">
          <a href="/users/<?php echo $user['uid']; ?>" class="user-name" title="发布者: <?php echo $user['username']; ?>"><?php echo $user['username']; ?></a>

        <div id="event-date">
          <a class='calendar-icon' target='_blank' href="#" title="Add to my calendar"></a>
          <span class="event-header-time invisible" data-field="date" title="On Air date">
            <?php echo $program['start_time']; ?>
          </span>
        </div>
        <div id="event-time">
          <i class='clock-icon'></i>
          <span class="event-header-time invisible" data-field="time" title="On Air date">
            <?php echo $program['end_time']; ?>
          </span>
        </div>
        <div data-state="more" id="description-toggle">
          <span class="expand-arrow-wrapper">
            <i id="description-arrow" class="expand-arrow-icon"></i>
          </span>
          <span class="expand-arrow-text" data-state="详情">
            <span class="description-toggle-text">详情</span>
</span></div>      </section>
    </section>
    <section id="event-state">
      <div id="event-status-state">
        <div id="event_clock">
          00:00
</div>        	<div class="on_air">
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
			  <span class="attendee-count">
					           热心的观众
            </div>
		<!-- archive -->
</div>

    </section>
  </div>

  <section role="event-description">
    <div id="event-date">
      <a class='calendar-icon' target='_blank' href="http://www.coollive.com.cn/events/<?php echo $program['rid']; ?>/ics" title="添加到我的日程表"></a>
      <span class="event-header-time invisible" data-field="date" title="播出时间">
        <?php echo $program['start_time']; ?>
      </span>
    </div>
    <div id="event-time">
      <i class='clock-icon'></i>
      <span class="event-header-time invisible" data-field="time" title="播出时间">
        <?php echo $program['ent_time']; ?>
      </span>
    </div>

    <div class="event-description">
        <?php echo $program['desc']; ?>
</div>    <div class="is-visually-hidden full-description">
          <?php echo $program['desc']; ?>
    </div>
    <ul id="event-details">
      <li class="event-detail">
        <label class="event-detail-label" title="Category">分类:</label>
        <span>商业/职业</span>
</li>
      <li class="event-detail">
        <label class="event-detail-label" title="Tags">标签:</label>
        <ul id="event-tags" data-count="7"><li class='single-tag'>ebay,</li> <li class='single-tag'>amazon,</li> <li class='single-tag'>FBA,</li> <li class='single-tag'>Fulfillment by Amazon,</li> <li class='single-tag'>scanpower,</li> <li class='single-tag'>thrift hunters,</li> <li class='single-tag'>thifting</li> </ul>
</li>
      <li class="event-detail">
        <label class="event-detail-label" title="Event visibility">是否可见:</label>
        <span>公开</span>
      </li>
    </ul>
</section></div>

<script type="text/javascript">
  _.each($('.event-header-time'), function(el) {
    var $startTime = $(el);
    var dateTimestamp = Number($startTime.text()) * 1000;
    var eventStatus = 0;
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
        <section data-attendees="true" data-rsvp="true" data-timer="true" id="question-on-air-container">

            <div id="current-topic-container">
                <span class="current-topic" title="Current Topic">Current Topic</span>
            </div>

            <div id="current-question-container">
                <div id="previous-question-wrapper" class="animated"></div>
                <div id="current-question-wrapper" class="animated"></div>
            </div>

            <div id="pre-event-content-container">
                <div id="countdown-timer">
                    <span class="countdown-timer-label">倒计时:</span>
                    <span class="countdown-time plural" data-interval="天 " id="countdown-days">0</span>
                    <span class="countdown-time plural" data-interval="小时" id="countdown-hours">8</span>
                    <span class="countdown-time plural" data-interval="分" id="countdown-minutes">50</span>
                    <span class="countdown-time plural" data-interval="秒" id="countdown-seconds">28</span>
                </div>

                <button class="following_button rsvp" data-button-id="follow_button_Event_the-creative-view-live-vision-boards" data-following="false" data-id="the-creative-view-live-vision-boards" data-item-id="164061" data-item="Event" data-off-text="Cancel reminder" data-on-text="Remind me" data-registration-required-reason="rsvp" data-registration-required="true" onClick="spree.clickFollowItem('follow_button_Event_the-creative-view-live-vision-boards');">Remind me</button>
                <div class="attendees-info">
                    <div class="rsvp-count-container">
                        <i class="user-outline-icon"></i>
		  <!--<span class="attendee-count" data-rsvps="14">
		    plan to attend
</span>--></div>
                    <!-- live/scheduled -->
                    <div class="viewer-count-container">
                        <i class="viewer-count-icon"></i>
			  <span class="attendee-count plural" data-viewers="2">
					viewer
</span>			</div>
                    <!-- archive -->
                </div>

            </div>          <span id="viewer-questions-prompt" class="onair-prompt">
            <span class="onair-prompt-text">
              What should we talk about on air? Submit your questions below.
            </span>
          </span>
        </section>
        <div class="remove-on-air-question-wrapper has-tooltip">
            <i class="close-icon"></i>
        </div>

    </div>

      <div id="broadcast_wrapper" class="broadcast_component initial">
  <div id="questions">
	<div id="question-prompt" class="question-prompt">
		<div class="question-action close"></div>
		<textarea id="question" placeholder="Comment or question for people on camera?" class="question-text" ></textarea>
    <input type="button" value="Submit" data-registration-required="true" data-registration-required-reason = "question" class="btn-blue" id="ask" />
	</div>

	<div id="question-feedback" class="question-prompt">
		<div class="question-action close"></div>
		<h3 class="center">谢谢你!<br> 你的问题已提交。</h3>
	</div>
</div>
          <script type="text/javascript">
              var flashvars={
                  f:"<?php echo $stream_url;?>",
                  c:"0",
                  i:'http://coollive.labake.cn/public/data/images/coollive/355294_photo.jpg',
                  my_url:encodeURIComponent(window.location.href),
                  my_title:encodeURIComponent(document.title),
                  lv:"1",
                  p:0
              };
              var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:"transparent"};
              var video=['<?php echo $stream_url;?>'];
              CKobject.embedSWF('/public/data/assets/play/ckplayer/ckplayer.swf','broadcast_wrapper','broadcast','100%','100%',flashvars,params);

              var support=['iPad','iPhone','ios','android+false','msie10+false'];
              CKobject.embedHTML5('broadcast_wrapper','broadcast','100%','100%',video,flashvars,support);


              function closelights(){//关灯
		   alert(' 本演示不支持开关灯');
	   }
              function openlights(){//开灯
		    alert(' 本演示不支持开关灯');
	   }
          </script>
          <div id='flash_focus'></div>
    <div id="social-share">
        <div> 
        <!-- 分享标签 -->     
        </div>
    </div>
</div>


        <div data-selected="viewers" id="screen_queue">
    <h3>
      <div id="queue-title">
        <span>
            问题与建议
        </span>
        <a id="new-question-title" class="ml-10" href="#question-list-new">新的问题</a>
      </div>
      <div id="question-toggle-wrapper">
          <a class="user-question-help" target="_blank" href="https://spreecast.zendesk.com/hc/en-us/articles/202017173-Interactive-Screen-Queue">这是如何工作的？</a>
      </div>
    </h3>
    <div id="viewer-queue" data-tab="viewers" class="empty">
      <div id="queue-input-container">
        <div id="queue-input-disabled-overlay"><p>我们现在不能答复问题。请加入我们，在右边的聊天室。</p></div>
        <div id="queue-input-user-wrapper">
          <img id="queue-input-user" class="small-circle-avatar" />
        </div>
        <input class="queue-input" placeholder="问一个新问题，提出建议或者共享媒体要播出的画面…" type="text" />
        <div id="preview-container"></div>
        <div id="queue-input-hidden">
          <div id="queue-info">
            <span id="queue-input-guide">
              <span id="queue-input-help">
                通过将上述URL添加外部媒体。
                <span class="queue-input-providers"> (check our <a href="http://embed.ly/embed/features/providers" id="supported-providers" title="supported providers">支持供应商</a>)
                </span>
              </span>
              <span id="queue-input-loading">
                加载媒体预览
              </span>
            </span>
          </div>
          <div id="queue-submit">
            <span id="queue-input-length" class="mr-5">0/420</span>
            <a class="queue-cancel">取消</a>
            <button type="submit" class="btn-blue queue-submit">提交</button>
          </div>
        </div>
      </div>
      <ul id="question-list" style="">

          <li class="question-listing" data-position="0">

  <div class="queue-content-wrapper" id="Question_573740" data-type="Question" data-id="573740">

    <div class="queue-content" data-viewer-rank="01">
      <span class="new-question-indicator">new</span>
      <div class="ranking-controls">

        <a class="vote-button vote-up has-tooltip voted" data-vote="1">
          <i class="up-vote-icon"></i>
        </a>
        <span class="vote-scoring">
          <span class="vote" data-score="94">95</span>
          <span class="vote-feedback" data-vote="-1">- 1</span>
          <span class="vote-feedback" data-vote="1">+1</span>
        </span>
        <a class="vote-button vote-down has-tooltip" data-vote="-1">
          <i class="down-vote-icon"></i>
        </a>
      </div>


      <div class="question-container">
        <div class="question-wrapper">
          <p class="question-content">In Italy,as well as in other countries,there are different types of ancient grains that were never exposed to contamination or <a href="http://radiation.Saragolla" target="_blank">radiation.Saragolla</a> is a Khorasan wheat,Sen.Cappelli,Timilia and others,are all varieties of precious durum wheat containing less gluten than the Creso <a href="http://wheat.Many" target="_blank">wheat.Many</a> people are wondering if it is possible to consume these ancient grains on the FMD,maybe after the first full <a href="http://round.Many" target="_blank">round.Many</a> Thanks.</p>
        </div>
        <span class="question-show-more" data-type="Question" data-id="573740"><a>show more</a></span>
      </div>



        <div class="question-owner">

  <span class="user-name" data-user-id="904746">
            Cinzia Brignone
          </span>

          <div class="question-avatar-wrapper">
            <div class="reaction-wrapper" data-user-id="904746">
              <i class="reaction-icon"></i>
            </div>

  <img class="user-avatar medium-circle-avatar " data-user-id="904746" src="//spreecast-photos.s3.amazonaws.com/production/users/904746/tile_100x100/904746_photo.jpg?71823878935538230" alt="904746">

          </div>
        </div>

    </div>
    <div class="trash-can-wrapper">
      <div class="tooltip-helper">
        <div class="trash-can-tooltip has-tooltip">

  <svg class="trash-can-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="185 181 205 236">
      <g id="can">
        <g>
          <g>
            <path class="trash-can-base" d="M364.2,411.6H211.1V248h153.1V411.6z"></path>
          </g>
        </g>
      </g>
      <g id="lid">
        <g>
          <g>
            <polygon class="trash-lid-top" points="313.3,206.9 262,206.9 190.8,206.9
              190.8,247.8 384.6,247.8 384.6,206.9       "></polygon>
          </g>
          <g>
            <polygon class="trash-lid-bottom" points="293.3,186.5 280.3,186.5 262.2,186.5
              262.2,206.9 311.3,206.9 311.3,186.5       "></polygon>
          </g>
        </g>
      </g>
      <g id="ribs">
        <g>
          <rect class="trash-rib" x="252" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="282.6" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="313.1" y="284.5" width="10" height="90"></rect>
        </g>
      </g>
  </svg>

        </div>
      </div>
    </div>
  </div></li>


          <li class="question-listing" data-position="1">
  <div class="queue-content-wrapper" id="Question_573759" data-type="Question" data-id="573759">

    <div class="queue-content" data-viewer-rank="02">
      <span class="new-question-indicator">new</span>
      <div class="ranking-controls">

        <a class="vote-button vote-up has-tooltip" data-vote="1">
          <i class="up-vote-icon"></i>
        </a>
        <span class="vote-scoring">
          <span class="vote" data-score="50">50</span>
          <span class="vote-feedback" data-vote="-1">- 1</span>
          <span class="vote-feedback" data-vote="1">+1</span>
        </span>
        <a class="vote-button vote-down has-tooltip" data-vote="-1">
          <i class="down-vote-icon"></i>
        </a>
      </div>


      <div class="question-container">
        <div class="question-wrapper">
          <p class="question-content">Dear Doc Pomroy, I am 53 years old and very sporty. I run something like 250 km a week on my bike and I am vegetarian. P2 is really heavy for me and makes me feel weak. How can I plan my fmd week to get and keep in balance and what kinda snack should I use when I workout? Thank you</p>
        </div>
        <span class="question-show-more" data-type="Question" data-id="573759"><a>show more</a></span>
      </div>



        <div class="question-owner">

  <span class="user-name" data-user-id="970496">
            Sara Nese
          </span>

          <div class="question-avatar-wrapper">
            <div class="reaction-wrapper" data-user-id="970496">
              <i class="reaction-icon"></i>
            </div>

  <img class="user-avatar medium-circle-avatar " data-user-id="970496" src="//spreecast-photos.s3.amazonaws.com/production/users/970496/tile_100x100/970496_photo.jpg?27838113158941268" alt="970496">

          </div>
        </div>

    </div>
    <div class="trash-can-wrapper">
      <div class="tooltip-helper">
        <div class="trash-can-tooltip has-tooltip">

  <svg class="trash-can-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="185 181 205 236">
      <g id="can">
        <g>
          <g>
            <path class="trash-can-base" d="M364.2,411.6H211.1V248h153.1V411.6z"></path>
          </g>
        </g>
      </g>
      <g id="lid">
        <g>
          <g>
            <polygon class="trash-lid-top" points="313.3,206.9 262,206.9 190.8,206.9
              190.8,247.8 384.6,247.8 384.6,206.9       "></polygon>
          </g>
          <g>
            <polygon class="trash-lid-bottom" points="293.3,186.5 280.3,186.5 262.2,186.5
              262.2,206.9 311.3,206.9 311.3,186.5       "></polygon>
          </g>
        </g>
      </g>
      <g id="ribs">
        <g>
          <rect class="trash-rib" x="252" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="282.6" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="313.1" y="284.5" width="10" height="90"></rect>
        </g>
      </g>
  </svg>

        </div>
      </div>
    </div>
  </div></li>



          <li class="question-listing" data-position="2">
  <div class="queue-content-wrapper" id="Question_574049" data-type="Question" data-id="574049">

    <div class="queue-content" data-viewer-rank="03">
      <span class="new-question-indicator">new</span>
      <div class="ranking-controls">

        <a class="vote-button vote-up has-tooltip" data-vote="1">
          <i class="up-vote-icon"></i>
        </a>
        <span class="vote-scoring">
          <span class="vote" data-score="43">43</span>
          <span class="vote-feedback" data-vote="-1">- 1</span>
          <span class="vote-feedback" data-vote="1">+1</span>
        </span>
        <a class="vote-button vote-down has-tooltip" data-vote="-1">
          <i class="down-vote-icon"></i>
        </a>
      </div>


      <div class="question-container">
        <div class="question-wrapper">
          <p class="question-content">Dear doc Pomroy, what kind of work out is the best on maintainance, once we are on balance?</p>
        </div>
        <span class="question-show-more" data-type="Question" data-id="574049"><a>show more</a></span>
      </div>



        <div class="question-owner">

  <span class="user-name" data-user-id="962842">
            Raffaella Grimaldi
          </span>

          <div class="question-avatar-wrapper">
            <div class="reaction-wrapper" data-user-id="962842">
              <i class="reaction-icon"></i>
            </div>

  <img class="user-avatar medium-circle-avatar " data-user-id="962842" src="//spreecast-photos.s3.amazonaws.com/production/users/962842/tile_100x100/962842_photo.jpg?78381032869219780" alt="962842">

          </div>
        </div>

    </div>
    <div class="trash-can-wrapper">
      <div class="tooltip-helper">
        <div class="trash-can-tooltip has-tooltip">

  <svg class="trash-can-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="185 181 205 236">
      <g id="can">
        <g>
          <g>
            <path class="trash-can-base" d="M364.2,411.6H211.1V248h153.1V411.6z"></path>
          </g>
        </g>
      </g>
      <g id="lid">
        <g>
          <g>
            <polygon class="trash-lid-top" points="313.3,206.9 262,206.9 190.8,206.9
              190.8,247.8 384.6,247.8 384.6,206.9       "></polygon>
          </g>
          <g>
            <polygon class="trash-lid-bottom" points="293.3,186.5 280.3,186.5 262.2,186.5
              262.2,206.9 311.3,206.9 311.3,186.5       "></polygon>
          </g>
        </g>
      </g>
      <g id="ribs">
        <g>
          <rect class="trash-rib" x="252" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="282.6" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="313.1" y="284.5" width="10" height="90"></rect>
        </g>
      </g>
  </svg>

        </div>
      </div>
    </div>
  </div></li><li class="question-listing" data-position="3">
  <div class="queue-content-wrapper" id="Question_573772" data-type="Question" data-id="573772">

    <div class="queue-content" data-viewer-rank="04">
      <span class="new-question-indicator">new</span>
      <div class="ranking-controls">

        <a class="vote-button vote-up has-tooltip" data-vote="1">
          <i class="up-vote-icon"></i>
        </a>
        <span class="vote-scoring">
          <span class="vote" data-score="39">39</span>
          <span class="vote-feedback" data-vote="-1">- 1</span>
          <span class="vote-feedback" data-vote="1">+1</span>
        </span>
        <a class="vote-button vote-down has-tooltip" data-vote="-1">
          <i class="down-vote-icon"></i>
        </a>
      </div>


      <div class="question-container">
        <div class="question-wrapper">
          <p class="question-content">Do you plan to translate your very useful app into Italian any soon?</p>
        </div>
        <span class="question-show-more" data-type="Question" data-id="573772"><a>show more</a></span>
      </div>



        <div class="question-owner">

  <span class="user-name" data-user-id="977586">
            Silvia Piccolo
          </span>

          <div class="question-avatar-wrapper">
            <div class="reaction-wrapper" data-user-id="977586">
              <i class="reaction-icon"></i>
            </div>

  <img class="user-avatar medium-circle-avatar " data-user-id="977586" src="//spreecast-photos.s3.amazonaws.com/production/users/977586/tile_100x100/977586_photo.jpg?42245322768576440" alt="977586">

          </div>
        </div>

    </div>
    <div class="trash-can-wrapper">
      <div class="tooltip-helper">
        <div class="trash-can-tooltip has-tooltip">

  <svg class="trash-can-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="185 181 205 236">
      <g id="can">
        <g>
          <g>
            <path class="trash-can-base" d="M364.2,411.6H211.1V248h153.1V411.6z"></path>
          </g>
        </g>
      </g>
      <g id="lid">
        <g>
          <g>
            <polygon class="trash-lid-top" points="313.3,206.9 262,206.9 190.8,206.9
              190.8,247.8 384.6,247.8 384.6,206.9       "></polygon>
          </g>
          <g>
            <polygon class="trash-lid-bottom" points="293.3,186.5 280.3,186.5 262.2,186.5
              262.2,206.9 311.3,206.9 311.3,186.5       "></polygon>
          </g>
        </g>
      </g>
      <g id="ribs">
        <g>
          <rect class="trash-rib" x="252" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="282.6" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="313.1" y="284.5" width="10" height="90"></rect>
        </g>
      </g>
  </svg>

        </div>
      </div>
    </div>
  </div></li><li class="question-listing" data-position="4">
  <div class="queue-content-wrapper" id="Question_571859" data-type="Question" data-id="571859">

    <div class="queue-content" data-viewer-rank="05">
      <span class="new-question-indicator">new</span>
      <div class="ranking-controls">

        <a class="vote-button vote-up has-tooltip" data-vote="1">
          <i class="up-vote-icon"></i>
        </a>
        <span class="vote-scoring">
          <span class="vote" data-score="35">35</span>
          <span class="vote-feedback" data-vote="-1">- 1</span>
          <span class="vote-feedback" data-vote="1">+1</span>
        </span>
        <a class="vote-button vote-down has-tooltip" data-vote="-1">
          <i class="down-vote-icon"></i>
        </a>
      </div>


      <div class="question-container">
        <div class="question-wrapper">
          <p class="question-content">Hi, I am on the second cycle and loosing weight while feeling better. I have seen new and updated Masterfood lists on Facebook, officially approved by you. When is the list on the iPhone app going to be updated (adding rye, for example)?</p>
        </div>
        <span class="question-show-more" data-type="Question" data-id="571859"><a>show more</a></span>
      </div>



        <div class="question-owner">

  <span class="user-name" data-user-id="974011">
            Ornella
          </span>

          <div class="question-avatar-wrapper">
            <div class="reaction-wrapper" data-user-id="974011">
              <i class="reaction-icon"></i>
            </div>

  <img class="user-avatar medium-circle-avatar " data-user-id="974011" src="//spreecast-photos.s3.amazonaws.com/production/users/974011/tile_100x100/974011_photo.jpg?45690470631234344" alt="974011">

          </div>
        </div>

    </div>
    <div class="trash-can-wrapper">
      <div class="tooltip-helper">
        <div class="trash-can-tooltip has-tooltip">

  <svg class="trash-can-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="185 181 205 236">
      <g id="can">
        <g>
          <g>
            <path class="trash-can-base" d="M364.2,411.6H211.1V248h153.1V411.6z"></path>
          </g>
        </g>
      </g>
      <g id="lid">
        <g>
          <g>
            <polygon class="trash-lid-top" points="313.3,206.9 262,206.9 190.8,206.9
              190.8,247.8 384.6,247.8 384.6,206.9       "></polygon>
          </g>
          <g>
            <polygon class="trash-lid-bottom" points="293.3,186.5 280.3,186.5 262.2,186.5
              262.2,206.9 311.3,206.9 311.3,186.5       "></polygon>
          </g>
        </g>
      </g>
      <g id="ribs">
        <g>
          <rect class="trash-rib" x="252" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="282.6" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="313.1" y="284.5" width="10" height="90"></rect>
        </g>
      </g>
  </svg>

        </div>
      </div>
    </div>
  </div></li><li class="question-listing" data-position="5">
  <div class="queue-content-wrapper" id="Question_574622" data-type="Question" data-id="574622">

    <div class="queue-content" data-viewer-rank="06">
      <span class="new-question-indicator">new</span>
      <div class="ranking-controls">

        <a class="vote-button vote-up has-tooltip" data-vote="1">
          <i class="up-vote-icon"></i>
        </a>
        <span class="vote-scoring">
          <span class="vote" data-score="3">3</span>
          <span class="vote-feedback" data-vote="-1">- 1</span>
          <span class="vote-feedback" data-vote="1">+1</span>
        </span>
        <a class="vote-button vote-down has-tooltip" data-vote="-1">
          <i class="down-vote-icon"></i>
        </a>
      </div>


      <div class="question-container">
        <div class="question-wrapper">
          <p class="question-content">Can you talk about decreasing hot flashes. They have reduced in quantity since doing the 10 day cleanse and going immediately onto FMD. Still having issues with night sweats.</p>
        </div>
        <span class="question-show-more" data-type="Question" data-id="574622"><a>show more</a></span>
      </div>



        <div class="question-owner">

  <span class="user-name" data-user-id="978049">
            Laurie Johnston
          </span>

          <div class="question-avatar-wrapper">
            <div class="reaction-wrapper" data-user-id="978049">
              <i class="reaction-icon"></i>
            </div>

  <img class="user-avatar medium-circle-avatar " data-user-id="978049" src="//spreecast-photos.s3.amazonaws.com/production/users/978049/tile_100x100/978049_photo.jpg?94040542095899580" alt="978049">

          </div>
        </div>

    </div>
    <div class="trash-can-wrapper">
      <div class="tooltip-helper">
        <div class="trash-can-tooltip has-tooltip">

  <svg class="trash-can-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="185 181 205 236">
      <g id="can">
        <g>
          <g>
            <path class="trash-can-base" d="M364.2,411.6H211.1V248h153.1V411.6z"></path>
          </g>
        </g>
      </g>
      <g id="lid">
        <g>
          <g>
            <polygon class="trash-lid-top" points="313.3,206.9 262,206.9 190.8,206.9
              190.8,247.8 384.6,247.8 384.6,206.9       "></polygon>
          </g>
          <g>
            <polygon class="trash-lid-bottom" points="293.3,186.5 280.3,186.5 262.2,186.5
              262.2,206.9 311.3,206.9 311.3,186.5       "></polygon>
          </g>
        </g>
      </g>
      <g id="ribs">
        <g>
          <rect class="trash-rib" x="252" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="282.6" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="313.1" y="284.5" width="10" height="90"></rect>
        </g>
      </g>
  </svg>

        </div>
      </div>
    </div>
  </div></li><li class="question-listing" data-position="6">
  <div class="queue-content-wrapper" id="Question_574513" data-type="Question" data-id="574513">

    <div class="queue-content" data-viewer-rank="07">
      <span class="new-question-indicator">new</span>
      <div class="ranking-controls">

        <a class="vote-button vote-up has-tooltip" data-vote="1">
          <i class="up-vote-icon"></i>
        </a>
        <span class="vote-scoring">
          <span class="vote" data-score="11">11</span>
          <span class="vote-feedback" data-vote="-1">- 1</span>
          <span class="vote-feedback" data-vote="1">+1</span>
        </span>
        <a class="vote-button vote-down has-tooltip" data-vote="-1">
          <i class="down-vote-icon"></i>
        </a>
      </div>


      <div class="question-container">
        <div class="question-wrapper">
          <p class="question-content">Dear doc Pomroy, I am 39 and have done a few 28 fmd rounds. After 3 28 rounds my period started being irregular. On some months it totally disappears. Then I practise f4 for a week (eating fmd food,using healthy fats daily) and my period arrives. I have lost around 30 pounds and have other 30 to loose. Do you think my period is irregural because of the weight loss or the lack of healthy fats on p1 and p2? Thank you!</p>
        </div>
        <span class="question-show-more" data-type="Question" data-id="574513"><a>show more</a></span>
      </div>



        <div class="question-owner">

  <span class="user-name" data-user-id="968055">
            Valentina Penzo
          </span>

          <div class="question-avatar-wrapper">
            <div class="reaction-wrapper" data-user-id="968055">
              <i class="reaction-icon"></i>
            </div>

  <img class="user-avatar medium-circle-avatar " data-user-id="968055" src="//spreecast-photos.s3.amazonaws.com/production/users/968055/tile_100x100/968055_photo.jpg?4141866858117282.5" alt="968055">

          </div>
        </div>

    </div>
    <div class="trash-can-wrapper">
      <div class="tooltip-helper">
        <div class="trash-can-tooltip has-tooltip">

  <svg class="trash-can-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="185 181 205 236">
      <g id="can">
        <g>
          <g>
            <path class="trash-can-base" d="M364.2,411.6H211.1V248h153.1V411.6z"></path>
          </g>
        </g>
      </g>
      <g id="lid">
        <g>
          <g>
            <polygon class="trash-lid-top" points="313.3,206.9 262,206.9 190.8,206.9
              190.8,247.8 384.6,247.8 384.6,206.9       "></polygon>
          </g>
          <g>
            <polygon class="trash-lid-bottom" points="293.3,186.5 280.3,186.5 262.2,186.5
              262.2,206.9 311.3,206.9 311.3,186.5       "></polygon>
          </g>
        </g>
      </g>
      <g id="ribs">
        <g>
          <rect class="trash-rib" x="252" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="282.6" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="313.1" y="284.5" width="10" height="90"></rect>
        </g>
      </g>
  </svg>

        </div>
      </div>
    </div>
  </div></li><li class="question-listing" data-position="7">
  <div class="queue-content-wrapper" id="Question_575154" data-type="Question" data-id="575154">

    <div class="queue-content" data-viewer-rank="08">
      <span class="new-question-indicator">new</span>
      <div class="ranking-controls">

        <a class="vote-button vote-up has-tooltip" data-vote="1">
          <i class="up-vote-icon"></i>
        </a>
        <span class="vote-scoring">
          <span class="vote" data-score="1">1</span>
          <span class="vote-feedback" data-vote="-1">- 1</span>
          <span class="vote-feedback" data-vote="1">+1</span>
        </span>
        <a class="vote-button vote-down has-tooltip" data-vote="-1">
          <i class="down-vote-icon"></i>
        </a>
      </div>


      <div class="question-container">
        <div class="question-wrapper">
          <p class="question-content">Please, please, please! What can I use as an egg substitute? I am allergic to egg whites and egg yolks. Many thanks:)</p>
        </div>
        <span class="question-show-more" data-type="Question" data-id="575154"><a>show more</a></span>
      </div>



        <div class="question-owner">

  <span class="user-name" data-user-id="967756">
            Ann
          </span>

          <div class="question-avatar-wrapper">
            <div class="reaction-wrapper" data-user-id="967756">
              <i class="reaction-icon"></i>
            </div>

  <img class="user-avatar medium-circle-avatar " data-user-id="967756" src="/profile_photos/tile_100x100/noprofile.png" alt="967756">

          </div>
        </div>

    </div>
    <div class="trash-can-wrapper">
      <div class="tooltip-helper">
        <div class="trash-can-tooltip has-tooltip">

  <svg class="trash-can-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="185 181 205 236">
      <g id="can">
        <g>
          <g>
            <path class="trash-can-base" d="M364.2,411.6H211.1V248h153.1V411.6z"></path>
          </g>
        </g>
      </g>
      <g id="lid">
        <g>
          <g>
            <polygon class="trash-lid-top" points="313.3,206.9 262,206.9 190.8,206.9
              190.8,247.8 384.6,247.8 384.6,206.9       "></polygon>
          </g>
          <g>
            <polygon class="trash-lid-bottom" points="293.3,186.5 280.3,186.5 262.2,186.5
              262.2,206.9 311.3,206.9 311.3,186.5       "></polygon>
          </g>
        </g>
      </g>
      <g id="ribs">
        <g>
          <rect class="trash-rib" x="252" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="282.6" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="313.1" y="284.5" width="10" height="90"></rect>
        </g>
      </g>
  </svg>

        </div>
      </div>
    </div>
  </div></li><li class="question-listing" data-position="8">
  <div class="queue-content-wrapper" id="Question_575161" data-type="Question" data-id="575161">

    <div class="queue-content" data-viewer-rank="09">
      <span class="new-question-indicator">new</span>
      <div class="ranking-controls">

        <a class="vote-button vote-up has-tooltip" data-vote="1">
          <i class="up-vote-icon"></i>
        </a>
        <span class="vote-scoring">
          <span class="vote" data-score="1">1</span>
          <span class="vote-feedback" data-vote="-1">- 1</span>
          <span class="vote-feedback" data-vote="1">+1</span>
        </span>
        <a class="vote-button vote-down has-tooltip" data-vote="-1">
          <i class="down-vote-icon"></i>
        </a>
      </div>


      <div class="question-container">
        <div class="question-wrapper">
          <p class="question-content">Hello,Hayle I Just Completed FMD(Four Weeks). I Needed To Lose Thirty Pounds I Lost About Half <a href="http://That.My" target="_blank">That.My</a> Gallbladder Was Taken Out In Ninety <a href="http://Four.Can" target="_blank">Four.Can</a> You Make Any Suggestion To Help Me Lose More?</p>
        </div>
        <span class="question-show-more" data-type="Question" data-id="575161"><a>show more</a></span>
      </div>



        <div class="question-owner">

  <span class="user-name" data-user-id="978280">
            Kenneth  Henson
          </span>

          <div class="question-avatar-wrapper">
            <div class="reaction-wrapper" data-user-id="978280">
              <i class="reaction-icon"></i>
            </div>

  <img class="user-avatar medium-circle-avatar " data-user-id="978280" src="/profile_photos/tile_100x100/noprofile.png" alt="978280">

          </div>
        </div>

    </div>
    <div class="trash-can-wrapper">
      <div class="tooltip-helper">
        <div class="trash-can-tooltip has-tooltip">

  <svg class="trash-can-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="185 181 205 236">
      <g id="can">
        <g>
          <g>
            <path class="trash-can-base" d="M364.2,411.6H211.1V248h153.1V411.6z"></path>
          </g>
        </g>
      </g>
      <g id="lid">
        <g>
          <g>
            <polygon class="trash-lid-top" points="313.3,206.9 262,206.9 190.8,206.9
              190.8,247.8 384.6,247.8 384.6,206.9       "></polygon>
          </g>
          <g>
            <polygon class="trash-lid-bottom" points="293.3,186.5 280.3,186.5 262.2,186.5
              262.2,206.9 311.3,206.9 311.3,186.5       "></polygon>
          </g>
        </g>
      </g>
      <g id="ribs">
        <g>
          <rect class="trash-rib" x="252" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="282.6" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="313.1" y="284.5" width="10" height="90"></rect>
        </g>
      </g>
  </svg>

        </div>
      </div>
    </div>
  </div></li><li class="question-listing" data-position="9">
  <div class="queue-content-wrapper" id="Question_573373" data-type="Question" data-id="573373">

    <div class="queue-content" data-viewer-rank="10">
      <span class="new-question-indicator">new</span>
      <div class="ranking-controls">

        <a class="vote-button vote-up has-tooltip" data-vote="1">
          <i class="up-vote-icon"></i>
        </a>
        <span class="vote-scoring">
          <span class="vote" data-score="7">7</span>
          <span class="vote-feedback" data-vote="-1">- 1</span>
          <span class="vote-feedback" data-vote="1">+1</span>
        </span>
        <a class="vote-button vote-down has-tooltip" data-vote="-1">
          <i class="down-vote-icon"></i>
        </a>
      </div>


      <div class="question-container">
        <div class="question-wrapper">
          <p class="question-content">I have a question about using balsamic vinegar. Some aged balsamic vinegars contain 4 or 5 g. of "sugars" per Tbs., even though their only ingredient is "grape must."  Is this OK to use in phase 2 of the FMD?</p>
        </div>
        <span class="question-show-more" data-type="Question" data-id="573373"><a>show more</a></span>
      </div>



        <div class="question-owner">

  <span class="user-name" data-user-id="970413">
            Mary
          </span>

          <div class="question-avatar-wrapper">
            <div class="reaction-wrapper" data-user-id="970413">
              <i class="reaction-icon"></i>
            </div>

  <img class="user-avatar medium-circle-avatar " data-user-id="970413" src="/profile_photos/tile_100x100/noprofile.png" alt="970413">

          </div>
        </div>

    </div>
    <div class="trash-can-wrapper">
      <div class="tooltip-helper">
        <div class="trash-can-tooltip has-tooltip">

  <svg class="trash-can-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="185 181 205 236">
      <g id="can">
        <g>
          <g>
            <path class="trash-can-base" d="M364.2,411.6H211.1V248h153.1V411.6z"></path>
          </g>
        </g>
      </g>
      <g id="lid">
        <g>
          <g>
            <polygon class="trash-lid-top" points="313.3,206.9 262,206.9 190.8,206.9
              190.8,247.8 384.6,247.8 384.6,206.9       "></polygon>
          </g>
          <g>
            <polygon class="trash-lid-bottom" points="293.3,186.5 280.3,186.5 262.2,186.5
              262.2,206.9 311.3,206.9 311.3,186.5       "></polygon>
          </g>
        </g>
      </g>
      <g id="ribs">
        <g>
          <rect class="trash-rib" x="252" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="282.6" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="313.1" y="284.5" width="10" height="90"></rect>
        </g>
      </g>
  </svg>

        </div>
      </div>
    </div>
  </div></li><li class="question-listing" data-position="10">
  <div class="queue-content-wrapper" id="Question_574036" data-type="Question" data-id="574036">

    <div class="queue-content" data-viewer-rank="11">
      <span class="new-question-indicator">new</span>
      <div class="ranking-controls">

        <a class="vote-button vote-up has-tooltip" data-vote="1">
          <i class="up-vote-icon"></i>
        </a>
        <span class="vote-scoring">
          <span class="vote" data-score="4">4</span>
          <span class="vote-feedback" data-vote="-1">- 1</span>
          <span class="vote-feedback" data-vote="1">+1</span>
        </span>
        <a class="vote-button vote-down has-tooltip" data-vote="-1">
          <i class="down-vote-icon"></i>
        </a>
      </div>


      <div class="question-container">
        <div class="question-wrapper">
          <p class="question-content">I started the FMD 1 week ago and am loving it, but I am having a hard time finding nitrate free meat because I live on a military base in Japan.  If I purchase the meat available to me that has nitrates how will this affect my progress?</p>
        </div>
        <span class="question-show-more" data-type="Question" data-id="574036"><a>show more</a></span>
      </div>



        <div class="question-owner">

  <span class="user-name" data-user-id="977712">
            Cinda
          </span>

          <div class="question-avatar-wrapper">
            <div class="reaction-wrapper" data-user-id="977712">
              <i class="reaction-icon"></i>
            </div>

  <img class="user-avatar medium-circle-avatar " data-user-id="977712" src="/profile_photos/tile_100x100/noprofile.png" alt="977712">

          </div>
        </div>

    </div>
    <div class="trash-can-wrapper">
      <div class="tooltip-helper">
        <div class="trash-can-tooltip has-tooltip">

  <svg class="trash-can-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="185 181 205 236">
      <g id="can">
        <g>
          <g>
            <path class="trash-can-base" d="M364.2,411.6H211.1V248h153.1V411.6z"></path>
          </g>
        </g>
      </g>
      <g id="lid">
        <g>
          <g>
            <polygon class="trash-lid-top" points="313.3,206.9 262,206.9 190.8,206.9
              190.8,247.8 384.6,247.8 384.6,206.9       "></polygon>
          </g>
          <g>
            <polygon class="trash-lid-bottom" points="293.3,186.5 280.3,186.5 262.2,186.5
              262.2,206.9 311.3,206.9 311.3,186.5       "></polygon>
          </g>
        </g>
      </g>
      <g id="ribs">
        <g>
          <rect class="trash-rib" x="252" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="282.6" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="313.1" y="284.5" width="10" height="90"></rect>
        </g>
      </g>
  </svg>

        </div>
      </div>
    </div>
  </div></li><li class="question-listing" data-position="11">
  <div class="queue-content-wrapper" id="Question_572777" data-type="Question" data-id="572777">

    <div class="queue-content" data-viewer-rank="12">
      <span class="new-question-indicator">new</span>
      <div class="ranking-controls">

        <a class="vote-button vote-up has-tooltip" data-vote="1">
          <i class="up-vote-icon"></i>
        </a>
        <span class="vote-scoring">
          <span class="vote" data-score="3">3</span>
          <span class="vote-feedback" data-vote="-1">- 1</span>
          <span class="vote-feedback" data-vote="1">+1</span>
        </span>
        <a class="vote-button vote-down has-tooltip" data-vote="-1">
          <i class="down-vote-icon"></i>
        </a>
      </div>


      <div class="question-container">
        <div class="question-wrapper">
          <p class="question-content">When is there going to be a teaching seminar?? I want to attend one wherever and whenever you have one. Might there be one this year??</p>
        </div>
        <span class="question-show-more" data-type="Question" data-id="572777"><a>show more</a></span>
      </div>



        <div class="question-owner">

  <span class="user-name" data-user-id="922691">
            priscila
          </span>

          <div class="question-avatar-wrapper">
            <div class="reaction-wrapper" data-user-id="922691">
              <i class="reaction-icon"></i>
            </div>

  <img class="user-avatar medium-circle-avatar " data-user-id="922691" src="/profile_photos/tile_100x100/noprofile.png" alt="922691">

          </div>
        </div>

    </div>
    <div class="trash-can-wrapper">
      <div class="tooltip-helper">
        <div class="trash-can-tooltip has-tooltip">

  <svg class="trash-can-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="185 181 205 236">
      <g id="can">
        <g>
          <g>
            <path class="trash-can-base" d="M364.2,411.6H211.1V248h153.1V411.6z"></path>
          </g>
        </g>
      </g>
      <g id="lid">
        <g>
          <g>
            <polygon class="trash-lid-top" points="313.3,206.9 262,206.9 190.8,206.9
              190.8,247.8 384.6,247.8 384.6,206.9       "></polygon>
          </g>
          <g>
            <polygon class="trash-lid-bottom" points="293.3,186.5 280.3,186.5 262.2,186.5
              262.2,206.9 311.3,206.9 311.3,186.5       "></polygon>
          </g>
        </g>
      </g>
      <g id="ribs">
        <g>
          <rect class="trash-rib" x="252" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="282.6" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="313.1" y="284.5" width="10" height="90"></rect>
        </g>
      </g>
  </svg>

        </div>
      </div>
    </div>
  </div></li><li class="question-listing" data-position="12">
  <div class="queue-content-wrapper" id="Question_575153" data-type="Question" data-id="575153">

    <div class="queue-content" data-viewer-rank="13">
      <span class="new-question-indicator">new</span>
      <div class="ranking-controls">

        <a class="vote-button vote-up has-tooltip" data-vote="1">
          <i class="up-vote-icon"></i>
        </a>
        <span class="vote-scoring">
          <span class="vote" data-score="3">3</span>
          <span class="vote-feedback" data-vote="-1">- 1</span>
          <span class="vote-feedback" data-vote="1">+1</span>
        </span>
        <a class="vote-button vote-down has-tooltip" data-vote="-1">
          <i class="down-vote-icon"></i>
        </a>
      </div>


      <div class="question-container">
        <div class="question-wrapper">
          <p class="question-content">Dear doc Pomroy, I suffer with diverticula. Would one of the burn help me somehow?</p>
        </div>
        <span class="question-show-more" data-type="Question" data-id="575153"><a>show more</a></span>
      </div>



        <div class="question-owner">

  <span class="user-name" data-user-id="967769">
            Federica
          </span>

          <div class="question-avatar-wrapper">
            <div class="reaction-wrapper" data-user-id="967769">
              <i class="reaction-icon"></i>
            </div>

  <img class="user-avatar medium-circle-avatar " data-user-id="967769" src="//spreecast-photos.s3.amazonaws.com/production/users/967769/tile_100x100/967769_photo.jpg?99014853406697500" alt="967769">

          </div>
        </div>

    </div>
    <div class="trash-can-wrapper">
      <div class="tooltip-helper">
        <div class="trash-can-tooltip has-tooltip">

  <svg class="trash-can-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="185 181 205 236">
      <g id="can">
        <g>
          <g>
            <path class="trash-can-base" d="M364.2,411.6H211.1V248h153.1V411.6z"></path>
          </g>
        </g>
      </g>
      <g id="lid">
        <g>
          <g>
            <polygon class="trash-lid-top" points="313.3,206.9 262,206.9 190.8,206.9
              190.8,247.8 384.6,247.8 384.6,206.9       "></polygon>
          </g>
          <g>
            <polygon class="trash-lid-bottom" points="293.3,186.5 280.3,186.5 262.2,186.5
              262.2,206.9 311.3,206.9 311.3,186.5       "></polygon>
          </g>
        </g>
      </g>
      <g id="ribs">
        <g>
          <rect class="trash-rib" x="252" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="282.6" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="313.1" y="284.5" width="10" height="90"></rect>
        </g>
      </g>
  </svg>

        </div>
      </div>
    </div>
  </div></li><li class="question-listing" data-position="13">
  <div class="queue-content-wrapper" id="Question_573426" data-type="Question" data-id="573426">

    <div class="queue-content" data-viewer-rank="14">
      <span class="new-question-indicator">new</span>
      <div class="ranking-controls">

        <a class="vote-button vote-up has-tooltip" data-vote="1">
          <i class="up-vote-icon"></i>
        </a>
        <span class="vote-scoring">
          <span class="vote" data-score="2">2</span>
          <span class="vote-feedback" data-vote="-1">- 1</span>
          <span class="vote-feedback" data-vote="1">+1</span>
        </span>
        <a class="vote-button vote-down has-tooltip" data-vote="-1">
          <i class="down-vote-icon"></i>
        </a>
      </div>


      <div class="question-container">
        <div class="question-wrapper">
          <p class="question-content">I want to start the H Burn but I don't like the texture of the smoothie. Will it have the same effect if I just eat all the ingredients separately? Still raw, of course. </p>
        </div>
        <span class="question-show-more" data-type="Question" data-id="573426"><a>show more</a></span>
      </div>



        <div class="question-owner">

  <span class="user-name" data-user-id="976793">
            Emily Andrews
          </span>

          <div class="question-avatar-wrapper">
            <div class="reaction-wrapper" data-user-id="976793">
              <i class="reaction-icon"></i>
            </div>

  <img class="user-avatar medium-circle-avatar " data-user-id="976793" src="//spreecast-photos.s3.amazonaws.com/production/users/976793/tile_100x100/976793_photo.jpg?89133892767131330" alt="976793">

          </div>
        </div>

    </div>
    <div class="trash-can-wrapper">
      <div class="tooltip-helper">
        <div class="trash-can-tooltip has-tooltip">

  <svg class="trash-can-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="185 181 205 236">
      <g id="can">
        <g>
          <g>
            <path class="trash-can-base" d="M364.2,411.6H211.1V248h153.1V411.6z"></path>
          </g>
        </g>
      </g>
      <g id="lid">
        <g>
          <g>
            <polygon class="trash-lid-top" points="313.3,206.9 262,206.9 190.8,206.9
              190.8,247.8 384.6,247.8 384.6,206.9       "></polygon>
          </g>
          <g>
            <polygon class="trash-lid-bottom" points="293.3,186.5 280.3,186.5 262.2,186.5
              262.2,206.9 311.3,206.9 311.3,186.5       "></polygon>
          </g>
        </g>
      </g>
      <g id="ribs">
        <g>
          <rect class="trash-rib" x="252" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="282.6" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="313.1" y="284.5" width="10" height="90"></rect>
        </g>
      </g>
  </svg>

        </div>
      </div>
    </div>
  </div></li><li class="question-listing" data-position="14">
  <div class="queue-content-wrapper" id="Question_573765" data-type="Question" data-id="573765">

    <div class="queue-content" data-viewer-rank="15">
      <span class="new-question-indicator">new</span>
      <div class="ranking-controls">

        <a class="vote-button vote-up has-tooltip" data-vote="1">
          <i class="up-vote-icon"></i>
        </a>
        <span class="vote-scoring">
          <span class="vote" data-score="2">2</span>
          <span class="vote-feedback" data-vote="-1">- 1</span>
          <span class="vote-feedback" data-vote="1">+1</span>
        </span>
        <a class="vote-button vote-down has-tooltip" data-vote="-1">
          <i class="down-vote-icon"></i>
        </a>
      </div>


      <div class="question-container">
        <div class="question-wrapper">
          <p class="question-content">Hi.  I'm on the FMD, week 3.  In both the 1st &amp; 2nd weeks I lost 3lbs in Phase 1&amp;2.  Then expecting the shedding to really start in Phase 3, instead I gained a pound each time.  I'm following the rules but really expected to see a difference in Phase 3 instead of gaining.  </p>
        </div>
        <span class="question-show-more" data-type="Question" data-id="573765"><a>show more</a></span>
      </div>



        <div class="question-owner">

  <span class="user-name" data-user-id="977518">
            Jamie
          </span>

          <div class="question-avatar-wrapper">
            <div class="reaction-wrapper" data-user-id="977518">
              <i class="reaction-icon"></i>
            </div>

  <img class="user-avatar medium-circle-avatar " data-user-id="977518" src="/profile_photos/tile_100x100/noprofile.png" alt="977518">

          </div>
        </div>

    </div>
    <div class="trash-can-wrapper">
      <div class="tooltip-helper">
        <div class="trash-can-tooltip has-tooltip">

  <svg class="trash-can-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="185 181 205 236">
      <g id="can">
        <g>
          <g>
            <path class="trash-can-base" d="M364.2,411.6H211.1V248h153.1V411.6z"></path>
          </g>
        </g>
      </g>
      <g id="lid">
        <g>
          <g>
            <polygon class="trash-lid-top" points="313.3,206.9 262,206.9 190.8,206.9
              190.8,247.8 384.6,247.8 384.6,206.9       "></polygon>
          </g>
          <g>
            <polygon class="trash-lid-bottom" points="293.3,186.5 280.3,186.5 262.2,186.5
              262.2,206.9 311.3,206.9 311.3,186.5       "></polygon>
          </g>
        </g>
      </g>
      <g id="ribs">
        <g>
          <rect class="trash-rib" x="252" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="282.6" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="313.1" y="284.5" width="10" height="90"></rect>
        </g>
      </g>
  </svg>

        </div>
      </div>
    </div>
  </div></li><li class="question-listing" data-position="15">
  <div class="queue-content-wrapper" id="Question_575120" data-type="Question" data-id="575120">

    <div class="queue-content" data-viewer-rank="16">
      <span class="new-question-indicator">new</span>
      <div class="ranking-controls">

        <a class="vote-button vote-up has-tooltip" data-vote="1">
          <i class="up-vote-icon"></i>
        </a>
        <span class="vote-scoring">
          <span class="vote" data-score="2">2</span>
          <span class="vote-feedback" data-vote="-1">- 1</span>
          <span class="vote-feedback" data-vote="1">+1</span>
        </span>
        <a class="vote-button vote-down has-tooltip" data-vote="-1">
          <i class="down-vote-icon"></i>
        </a>
      </div>


      <div class="question-container">
        <div class="question-wrapper">
          <p class="question-content">Hi Haylie.  It's Jamie again.  Further to my earlier note about not losing but gaining in phase 3, I've also stopped losing in phase 1 this week and phase 2.  I'm down 6 pounds but the last pound keeps going up and down and I haven't moved beyond my 2nd week loses.  Please help, I'm getting discouraged. </p>
        </div>
        <span class="question-show-more" data-type="Question" data-id="575120"><a>show more</a></span>
      </div>



        <div class="question-owner">

  <span class="user-name" data-user-id="977518">
            Jamie
          </span>

          <div class="question-avatar-wrapper">
            <div class="reaction-wrapper" data-user-id="977518">
              <i class="reaction-icon"></i>
            </div>

  <img class="user-avatar medium-circle-avatar " data-user-id="977518" src="/profile_photos/tile_100x100/noprofile.png" alt="977518">

          </div>
        </div>

    </div>
    <div class="trash-can-wrapper">
      <div class="tooltip-helper">
        <div class="trash-can-tooltip has-tooltip">

  <svg class="trash-can-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="185 181 205 236">
      <g id="can">
        <g>
          <g>
            <path class="trash-can-base" d="M364.2,411.6H211.1V248h153.1V411.6z"></path>
          </g>
        </g>
      </g>
      <g id="lid">
        <g>
          <g>
            <polygon class="trash-lid-top" points="313.3,206.9 262,206.9 190.8,206.9
              190.8,247.8 384.6,247.8 384.6,206.9       "></polygon>
          </g>
          <g>
            <polygon class="trash-lid-bottom" points="293.3,186.5 280.3,186.5 262.2,186.5
              262.2,206.9 311.3,206.9 311.3,186.5       "></polygon>
          </g>
        </g>
      </g>
      <g id="ribs">
        <g>
          <rect class="trash-rib" x="252" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="282.6" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="313.1" y="284.5" width="10" height="90"></rect>
        </g>
      </g>
  </svg>

        </div>
      </div>
    </div>
  </div></li><li class="question-listing" data-position="16">
  <div class="queue-content-wrapper" id="Question_573278" data-type="Question" data-id="573278">

    <div class="queue-content" data-viewer-rank="17">
      <span class="new-question-indicator">new</span>
      <div class="ranking-controls">

        <a class="vote-button vote-up has-tooltip" data-vote="1">
          <i class="up-vote-icon"></i>
        </a>
        <span class="vote-scoring">
          <span class="vote" data-score="1">1</span>
          <span class="vote-feedback" data-vote="-1">- 1</span>
          <span class="vote-feedback" data-vote="1">+1</span>
        </span>
        <a class="vote-button vote-down has-tooltip" data-vote="-1">
          <i class="down-vote-icon"></i>
        </a>
      </div>


      <div class="question-container">
        <div class="question-wrapper">
          <p class="question-content">Hi, I am in week two, phase 3. I have broken out in a rash that has extended over the last couple of days and is now to the point that it includes my mucus membranes. Could this be related to detoxing? I already went through the flu-like symptoms. Thanks Haylie!</p>
        </div>
        <span class="question-show-more" data-type="Question" data-id="573278"><a>show more</a></span>
      </div>



        <div class="question-owner">

  <span class="user-name" data-user-id="976653">
            Tondra Bolinger
          </span>

          <div class="question-avatar-wrapper">
            <div class="reaction-wrapper" data-user-id="976653">
              <i class="reaction-icon"></i>
            </div>

  <img class="user-avatar medium-circle-avatar " data-user-id="976653" src="//spreecast-photos.s3.amazonaws.com/production/users/976653/tile_100x100/976653_photo.jpg?49259105464443570" alt="976653">

          </div>
        </div>

    </div>
    <div class="trash-can-wrapper">
      <div class="tooltip-helper">
        <div class="trash-can-tooltip has-tooltip">

  <svg class="trash-can-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="185 181 205 236">
      <g id="can">
        <g>
          <g>
            <path class="trash-can-base" d="M364.2,411.6H211.1V248h153.1V411.6z"></path>
          </g>
        </g>
      </g>
      <g id="lid">
        <g>
          <g>
            <polygon class="trash-lid-top" points="313.3,206.9 262,206.9 190.8,206.9
              190.8,247.8 384.6,247.8 384.6,206.9       "></polygon>
          </g>
          <g>
            <polygon class="trash-lid-bottom" points="293.3,186.5 280.3,186.5 262.2,186.5
              262.2,206.9 311.3,206.9 311.3,186.5       "></polygon>
          </g>
        </g>
      </g>
      <g id="ribs">
        <g>
          <rect class="trash-rib" x="252" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="282.6" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="313.1" y="284.5" width="10" height="90"></rect>
        </g>
      </g>
  </svg>

        </div>
      </div>
    </div>
  </div></li><li class="question-listing" data-position="17">
  <div class="queue-content-wrapper" id="Question_574491" data-type="Question" data-id="574491">

    <div class="queue-content" data-viewer-rank="18">
      <span class="new-question-indicator">new</span>
      <div class="ranking-controls">

        <a class="vote-button vote-up has-tooltip" data-vote="1">
          <i class="up-vote-icon"></i>
        </a>
        <span class="vote-scoring">
          <span class="vote" data-score="1">1</span>
          <span class="vote-feedback" data-vote="-1">- 1</span>
          <span class="vote-feedback" data-vote="1">+1</span>
        </span>
        <a class="vote-button vote-down has-tooltip" data-vote="-1">
          <i class="down-vote-icon"></i>
        </a>
      </div>


      <div class="question-container">
        <div class="question-wrapper">
          <p class="question-content">hi. </p>
        </div>
        <span class="question-show-more" data-type="Question" data-id="574491"><a>show more</a></span>
      </div>



        <div class="question-owner">

  <span class="user-name" data-user-id="962662">
            Cheryl Balsam
          </span>

          <div class="question-avatar-wrapper">
            <div class="reaction-wrapper" data-user-id="962662">
              <i class="reaction-icon"></i>
            </div>

  <img class="user-avatar medium-circle-avatar " data-user-id="962662" src="/profile_photos/tile_100x100/noprofile.png" alt="962662">

          </div>
        </div>

    </div>
    <div class="trash-can-wrapper">
      <div class="tooltip-helper">
        <div class="trash-can-tooltip has-tooltip">

  <svg class="trash-can-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="185 181 205 236">
      <g id="can">
        <g>
          <g>
            <path class="trash-can-base" d="M364.2,411.6H211.1V248h153.1V411.6z"></path>
          </g>
        </g>
      </g>
      <g id="lid">
        <g>
          <g>
            <polygon class="trash-lid-top" points="313.3,206.9 262,206.9 190.8,206.9
              190.8,247.8 384.6,247.8 384.6,206.9       "></polygon>
          </g>
          <g>
            <polygon class="trash-lid-bottom" points="293.3,186.5 280.3,186.5 262.2,186.5
              262.2,206.9 311.3,206.9 311.3,186.5       "></polygon>
          </g>
        </g>
      </g>
      <g id="ribs">
        <g>
          <rect class="trash-rib" x="252" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="282.6" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="313.1" y="284.5" width="10" height="90"></rect>
        </g>
      </g>
  </svg>

        </div>
      </div>
    </div>
  </div></li><li class="question-listing" data-position="18">
  <div class="queue-content-wrapper" id="Question_574492" data-type="Question" data-id="574492">

    <div class="queue-content" data-viewer-rank="19">
      <span class="new-question-indicator">new</span>
      <div class="ranking-controls">

        <a class="vote-button vote-up has-tooltip" data-vote="1">
          <i class="up-vote-icon"></i>
        </a>
        <span class="vote-scoring">
          <span class="vote" data-score="1">1</span>
          <span class="vote-feedback" data-vote="-1">- 1</span>
          <span class="vote-feedback" data-vote="1">+1</span>
        </span>
        <a class="vote-button vote-down has-tooltip" data-vote="-1">
          <i class="down-vote-icon"></i>
        </a>
      </div>


      <div class="question-container">
        <div class="question-wrapper">
          <p class="question-content">I </p>
        </div>
        <span class="question-show-more" data-type="Question" data-id="574492"><a>show more</a></span>
      </div>



        <div class="question-owner">

  <span class="user-name" data-user-id="962662">
            Cheryl Balsam
          </span>

          <div class="question-avatar-wrapper">
            <div class="reaction-wrapper" data-user-id="962662">
              <i class="reaction-icon"></i>
            </div>

  <img class="user-avatar medium-circle-avatar " data-user-id="962662" src="/profile_photos/tile_100x100/noprofile.png" alt="962662">

          </div>
        </div>

    </div>
    <div class="trash-can-wrapper">
      <div class="tooltip-helper">
        <div class="trash-can-tooltip has-tooltip">

  <svg class="trash-can-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="185 181 205 236">
      <g id="can">
        <g>
          <g>
            <path class="trash-can-base" d="M364.2,411.6H211.1V248h153.1V411.6z"></path>
          </g>
        </g>
      </g>
      <g id="lid">
        <g>
          <g>
            <polygon class="trash-lid-top" points="313.3,206.9 262,206.9 190.8,206.9
              190.8,247.8 384.6,247.8 384.6,206.9       "></polygon>
          </g>
          <g>
            <polygon class="trash-lid-bottom" points="293.3,186.5 280.3,186.5 262.2,186.5
              262.2,206.9 311.3,206.9 311.3,186.5       "></polygon>
          </g>
        </g>
      </g>
      <g id="ribs">
        <g>
          <rect class="trash-rib" x="252" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="282.6" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="313.1" y="284.5" width="10" height="90"></rect>
        </g>
      </g>
  </svg>

        </div>
      </div>
    </div>
  </div></li><li class="question-listing" data-position="19">
  <div class="queue-content-wrapper" id="Question_574494" data-type="Question" data-id="574494">

    <div class="queue-content" data-viewer-rank="20">
      <span class="new-question-indicator">new</span>
      <div class="ranking-controls">

        <a class="vote-button vote-up has-tooltip" data-vote="1">
          <i class="up-vote-icon"></i>
        </a>
        <span class="vote-scoring">
          <span class="vote" data-score="1">1</span>
          <span class="vote-feedback" data-vote="-1">- 1</span>
          <span class="vote-feedback" data-vote="1">+1</span>
        </span>
        <a class="vote-button vote-down has-tooltip" data-vote="-1">
          <i class="down-vote-icon"></i>
        </a>
      </div>


      <div class="question-container">
        <div class="question-wrapper">
          <p class="question-content">the </p>
        </div>
        <span class="question-show-more" data-type="Question" data-id="574494"><a>show more</a></span>
      </div>



        <div class="question-owner">

  <span class="user-name" data-user-id="962662">
            Cheryl Balsam
          </span>

          <div class="question-avatar-wrapper">
            <div class="reaction-wrapper" data-user-id="962662">
              <i class="reaction-icon"></i>
            </div>

  <img class="user-avatar medium-circle-avatar " data-user-id="962662" src="/profile_photos/tile_100x100/noprofile.png" alt="962662">

          </div>
        </div>

    </div>
    <div class="trash-can-wrapper">
      <div class="tooltip-helper">
        <div class="trash-can-tooltip has-tooltip">

  <svg class="trash-can-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="185 181 205 236">
      <g id="can">
        <g>
          <g>
            <path class="trash-can-base" d="M364.2,411.6H211.1V248h153.1V411.6z"></path>
          </g>
        </g>
      </g>
      <g id="lid">
        <g>
          <g>
            <polygon class="trash-lid-top" points="313.3,206.9 262,206.9 190.8,206.9
              190.8,247.8 384.6,247.8 384.6,206.9       "></polygon>
          </g>
          <g>
            <polygon class="trash-lid-bottom" points="293.3,186.5 280.3,186.5 262.2,186.5
              262.2,206.9 311.3,206.9 311.3,186.5       "></polygon>
          </g>
        </g>
      </g>
      <g id="ribs">
        <g>
          <rect class="trash-rib" x="252" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="282.6" y="284.5" width="10" height="90"></rect>
          <rect class="trash-rib" x="313.1" y="284.5" width="10" height="90"></rect>
        </g>
      </g>
  </svg>

        </div>
      </div>
    </div>
  </div></li></ul>
      <div id="question-list-new" style="top: -50px;"></div>
      <section class="queue-placeholder-message">
          <p>There are no questions. Go ahead, ask something!</p>
      </section>
    </div>
</div>
</div>

<!-- producer rail -->

      <section data-default="recommended" id="event_social" data-selected="recommended">
      <div id="right-rail-menu">
          <ul>
              <li class="rail-tab" data-tab="chat">
                  聊天
                  <i class="alerts"></i>
              </li>	      <li class="rail-tab" data-tab="viewers">
                  热心观众
                  <i class="alerts"></i>
              </li>	      <li class="rail-tab" data-tab="recommended">
                  推荐
                  <i class="alerts"></i>
              </li>  </ul>
      </div>

      <section id="right-rail">

      <div id="recommended-box" class="social-box">
      <ul id="recommended-tab" style="top: 0px;">

          <!--推荐-->
          <?php
if(isset($recommend_list) && !empty($recommend_list)) {
    foreach($recommend_list as $programe) {
?>
          <li class="preview-block">
              <div class="preview-image">
                  <a href="/events/<?php echo $programe['rid']; ?>"><img alt="Preview Image 185x135" src="<?php echo $programe['pic_name']; ?>" title="Preview Image"></a>
                  <span class="preview-time"><?php echo $programe['duration']; ?> </span>
              </div>
              <div class="preview-card">
                  <h4 class="preview-title"><a href="/events/<?php echo $programe['rid']; ?>"><div style="margin: 0px; padding: 0px; border: 0px;"><?php echo $programe['name']; ?></div></a></h4>
                  <div class="preview-details">
                      <a href="/users/<?php echo $programe['uid']; ?>" class="preview-user-name" title="<?php echo $programe['username']; ?>"><?php echo $programe['username']; ?></a>

      <span class="preview-meta">
        <?php echo $programe['record_time']; ?>
          <i class="bullet-icon"></i>
          <?php echo $programe['views']; ?>
      </span>
                  </div>
              </div>
          </li>
          <?php
    }
}
?>

      </ul>
      <div class="scrollbar" style="display: block;"><div class="handle ui-draggable" style="height: 209px; top: 0px;"></div></div></div>

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

      <div id="chat-box" data-selected="viewers" class="social-box hidden">
          <div class="chat_widget liveViewer_chat hidden" id="liveViewer_chat" style="">
              <div class="chat_container">
                  <div class="chat-placeholder-wrapper">
                  </div>
                  <ul class="chat_content"><li data-user-id="814526" data-chat-id="8742640" class="chat-block is-producer">
                          <div class="chat-user-image-wrapper">
                              <img class="user-avatar small-circle-avatar chat-user-image" data-user-id="814526" src="//s3.amazonaws.com/spreecast-photos/production/users/814526/tile_70x70/814526_photo.jpg?1396250054" alt="814526">

                          </div>
                          <div class="chat_message">
      <span class="chat-user">
  <span class="user-name" data-user-id="814526">
          Ho'omalamalama .com
            <i class="producer-icon"></i>
        </span>
      </span>
                              <div class="user-message">
                                  <span class="text">Hello</span>
                                  <span class="chat-timestamp"> - Fri 3:08 am</span>
                              </div>
                          </div>
                      </li></ul>

              </div>

              <form class="chat-input">

                  <div class="chat-status-helper hidden">Your chat is paused</div>

                  <div class="chat-input-container">
                      <input type="text" placeholder="Chat... starting 30 minutes before" class="chat_text" disabled="disabled">
                      <div class="chat-input-user-wrapper">

                          <img class="user-avatar small-circle-avatar chat-input-user" data-user-id="217386" src="/profile_photos/tile_70x70/visitor.png" alt="217386">

                      </div>

                      <div class="chat-paused hidden" title="Unpause the chat feed">
                          <a class="chat-control">▶ Resume Chat</a>
                      </div>

                  </div>
              </form>

              <div class="scrollbar" style="display: none;"><div class="handle ui-draggable"></div></div></div>
      </div>

      <section class="social-box hidden" data-max-bubbles="35" id="user-viewer-list" style="">
          <!--
          <div class="viewer-list-search-wrapper">
            <input type="text" class="rail-search" placeholder="Search"/>
            <i class="search-icon"></i>
          </div>
          -->
          <ul class="viewer-types-list">
              <li class="viewer-type-listing empty" data-type="onair" id="viewer-type-listing-onair">
                  <ul class="viewer-list"></ul>
                  <h4 class="viewer-list-heading">
                      Off air
                  </h4></li>
              <li class="viewer-type-listing empty" data-type="producer" id="viewer-type-listing-producer">
                  <ul class="viewer-list"></ul>
                  <h4 class="viewer-list-heading">
                      Producers
                  </h4></li>
              <li class="viewer-type-listing empty" data-type="cameraqueue" id="viewer-type-listing-cameraqueue">
                  <ul class="viewer-list"></ul>
                  <h4 class="viewer-list-heading">
                      Camera requests
                  </h4></li>
              <li class="viewer-type-listing" data-type="viewer" id="viewer-type-listing-viewer">
                  <ul class="viewer-list"><li class="viewer-list-listing " data-user-id="674682" id="viewer-list-listing-674682">
                          <div class="viewer-list-avatar-wrapper">

                              <img class="user-avatar medium-circle-avatar viewer-list-avatar" data-user-id="674682" src="//spreecast-photos.s3.amazonaws.com/production/users/674682/tile_70x70/674682_photo.jpg?75205962802283470" alt="674682">


                          </div>
                          <div class="viewer-list-meta">

  <span class="user-name" data-user-id="674682">
          Francine Clouden
        </span>

                              <div class="user-status camera-status"></div>
                              <div class="user-status chat-status"></div>
                          </div>
                          <div class="viewer-list-icons">
                              <i class="notification-icon"></i>
                          </div>
                      </li><li class="viewer-list-listing guest" data-user-id="guestKh0ZMYndh7R5xuo0" id="viewer-list-listing-guestKh0ZMYndh7R5xuo0">
                          <div class="viewer-list-avatar-wrapper">

                              <img class="user-avatar medium-circle-avatar viewer-list-avatar" data-user-id="guestKh0ZMYndh7R5xuo0" src="/profile_photos/tile_70x70/visitor.png" alt="guestKh0ZMYndh7R5xuo0">


                          </div>
                          <div class="viewer-list-meta">

  <span class="user-name" data-user-id="guestKh0ZMYndh7R5xuo0">
          Visitor
        </span>

                              <div class="user-status camera-status"></div>
                              <div class="user-status chat-status"></div>
                          </div>
                          <div class="viewer-list-icons">
                              <i class="notification-icon"></i>
                          </div>
                      </li></ul>
                  <h4 class="viewer-list-heading" data-viewer-count="2">
                      Viewers
                  </h4></li>

              <li class="show-more-viewers-wrapper">
                  <button class="show-more-viewers" style="display: none;">Show More</button>
              </li>
          </ul>

          <div class="scrollbar" style="display: none;"><div class="handle ui-draggable"></div></div></section>

      </section>

      <div id="event_viewers" class="hidden">
          <div class="viewers_wrapper">
              <div id="viewer_section" data-max-bubbles="9">
                  <h3>
                      People watching this spreecast
                  </h3>    <div id="viewer_list_container" class="clearfix">

                      <div id="viewer_list"><div class="face-bubble " id="face-bubble-674682" data-user-id="674682">
                              <img src="//spreecast-photos.s3.amazonaws.com/production/users/674682/tile_100x100/674682_photo.jpg?47457049507647750" alt="Francine Clouden">
                          </div><div class="face-bubble guest" id="face-bubble-guestKh0ZMYndh7R5xuo0" data-user-id="guestKh0ZMYndh7R5xuo0">
                              <img src="/profile_photos/tile_100x100/visitor.png" alt="Visitor">
                          </div></div>

        <span class="face-bubble-more hidden">
	<a id="see-all-users" class="show_more" href="#">
        Show More <span class="count">(-7)</span>
    </a>
</span>

                  </div>
              </div>
          </div>

      </div></section>

  </section>
  <div id="viewer_details_wrapper">
  <section id="viewer_details">
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
            <input checked="checked" data-embed-code="&lt;iframe id=&quot;spreecast-player&quot; type=&quot;text/html&quot; width=&quot;100%&quot; height=&quot;470px&quot; src=&quot;http://www.spreecast.com/events/ebay-vs-amazon-round-12/embed-large&quot; frameborder=&quot;0&quot;&gt;&lt;/iframe&gt;
    &lt;p style=&quot;font-family: &#x27;Open Sans&#x27;, &#x27;Trebuchet MS&#x27;, Tahoma, Arial, sans-serif; font-size: 12px; line-height: 18px; font-weight: normal; text-align: left; color: #404040; margin: 5px 0 10px 0; padding: 0;&quot;&gt;
    &lt;a href=&quot;http://www.spreecast.com/&quot; style=&quot;color: #358AD0&quot; target=&quot;_blank&quot;&gt;Spreecast&lt;/a&gt; is the social video platform that connects people.
    &lt;br&gt;
    Check out &lt;a href=&quot;http://www.spreecast.com/events/ebay-vs-amazon-round-12&quot; style=&quot;color: #358AD0&quot; target=&quot;_blank&quot;&gt;eBay vs. Amazon - Round 12&lt;/a&gt; on Spreecast.&lt;/p&gt;" id="popin_embed_size_large" name="popin_embed_size" type="radio" value="large" />
            <label for="popin_embed_size_large">Large (790+ x 470)</label>
          </li>
          <li>
            <input data-embed-code="&lt;iframe id=&quot;spreecast-player&quot; type=&quot;text/html&quot; width=&quot;100%&quot; height=&quot;470px&quot; src=&quot;http://www.spreecast.com/events/ebay-vs-amazon-round-12/embed-medium&quot; frameborder=&quot;0&quot;&gt;&lt;/iframe&gt;
    &lt;p style=&quot;font-family: &#x27;Open Sans&#x27;, &#x27;Trebuchet MS&#x27;, Tahoma, Arial, sans-serif; font-size: 12px; line-height: 18px; font-weight: normal; text-align: left; color: #404040; margin: 5px 0 10px 0; padding: 0;&quot;&gt;
    &lt;a href=&quot;http://www.spreecast.com/&quot; style=&quot;color: #358AD0&quot; target=&quot;_blank&quot;&gt;Spreecast&lt;/a&gt; is the social video platform that connects people.
    &lt;br&gt;
    Check out &lt;a href=&quot;http://www.spreecast.com/events/ebay-vs-amazon-round-12&quot; style=&quot;color: #358AD0&quot; target=&quot;_blank&quot;&gt;eBay vs. Amazon - Round 12&lt;/a&gt; on Spreecast.&lt;/p&gt;" id="popin_embed_size_medium" name="popin_embed_size" type="radio" value="medium" />
            <label for="popin_embed_size_medium">Medium (500 x 470)</label>
          </li>
          <li>
            <input data-embed-code="&lt;iframe id=&quot;spreecast-player&quot; type=&quot;text/html&quot; width=&quot;100%&quot; height=&quot;470px&quot; src=&quot;http://big.spreecast.com/ebay-vs-amazon-round-12/embed-medium-preload&quot; frameborder=&quot;0&quot;&gt;&lt;/iframe&gt;
    &lt;p style=&quot;font-family: &#x27;Open Sans&#x27;, &#x27;Trebuchet MS&#x27;, Tahoma, Arial, sans-serif; font-size: 12px; line-height: 18px; font-weight: normal; text-align: left; color: #404040; margin: 5px 0 10px 0; padding: 0;&quot;&gt;
    &lt;a href=&quot;http://www.spreecast.com/&quot; style=&quot;color: #358AD0&quot; target=&quot;_blank&quot;&gt;Spreecast&lt;/a&gt; is the social video platform that connects people.
    &lt;br&gt;
    Check out &lt;a href=&quot;http://www.spreecast.com/events/ebay-vs-amazon-round-12&quot; style=&quot;color: #358AD0&quot; target=&quot;_blank&quot;&gt;eBay vs. Amazon - Round 12&lt;/a&gt; on Spreecast.&lt;/p&gt;" id="popin_embed_size_medium_preload" name="popin_embed_size" type="radio" value="medium_preload" />
            <label for="popin_embed_size_medium_preload">Medium: click-to-play (500 x 470)</label>
          </li>
      <li>
        <textarea class="common-input" id="popin_embed_code" name="popin_embed_code">
&lt;iframe id=&quot;spreecast-player&quot; type=&quot;text/html&quot; width=&quot;100%&quot; height=&quot;470px&quot; src=&quot;http://www.spreecast.com/events/ebay-vs-amazon-round-12/embed-large&quot; frameborder=&quot;0&quot;&gt;&lt;/iframe&gt;
    &lt;p style=&quot;font-family: &#x27;Open Sans&#x27;, &#x27;Trebuchet MS&#x27;, Tahoma, Arial, sans-serif; font-size: 12px; line-height: 18px; font-weight: normal; text-align: left; color: #404040; margin: 5px 0 10px 0; padding: 0;&quot;&gt;
    &lt;a href=&quot;http://www.spreecast.com/&quot; style=&quot;color: #358AD0&quot; target=&quot;_blank&quot;&gt;Spreecast&lt;/a&gt; is the social video platform that connects people.
    &lt;br&gt;
    Check out &lt;a href=&quot;http://www.spreecast.com/events/ebay-vs-amazon-round-12&quot; style=&quot;color: #358AD0&quot; target=&quot;_blank&quot;&gt;eBay vs. Amazon - Round 12&lt;/a&gt; on Spreecast.&lt;/p&gt;</textarea>
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
    <a href="http://www.spreecast.com/events/ebay-vs-amazon-round-12"><img alt="Preview Image" src="http://s3.amazonaws.com/spreecast-production/events/163652/tile_180x135/img20150322-22322-u75q0w.jpg?1427076570" title="Preview Image" /></a>
  </div>
  <div class="preview-card">
    <h4 class="preview-title"><a href="http://www.spreecast.com/events/ebay-vs-amazon-round-12">eBay vs. Amazon - Round 12</a></h4>
    <div class="preview-details">
        <a href="/users/chrisgreen" class="preview-user-name" title="ChrisGreen">ChrisGreen</a>

      <span class="preview-meta">
        5 hours ago
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
    <?php $this->load->view('spree/footer.tpl'); ?>         
    
    <div id="popin"><div id="popin_content"></div></div>
    <div id="cropin"><div id="cropin_content"></div></div>
    
        <div data-chat-type='moderator'></div>

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
              <a class="menu-option" href="/users/{{ id }}" target="_blank">Profile</a>
            </li>
            <li>
              <a class="menu-option" href="/users/{{ id }}/edit?tab=spreecasts" target="_blank">My Spreecasts</a>
            </li>
            <li>
              <a class="menu-option" href="/users/{{ id }}/edit?tab=settings" target="_blank">Account settings</a>
            </li>
            {{#if admin}}
              <li>
                <a class="menu-option" href="/admin" target="_blank">Admin</a>
              </li>
              <li>
                <a class="menu-option" href="/admin/contents" target="_blank">Content</a>
              </li>
            {{/if}}
            {{#if content_mod}}
              <li>
                <a class="menu-option" href="/moderation" target="_blank">Moderation</a>
              </li>
            {{/if}}
            <li>
              <a class="menu-option" href="https://spreecast.zendesk.com/hc/en-us" target="_blank">Help</a>
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
  <form accept-charset="UTF-8" action="/events/ebay-vs-amazon-round-12" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="fr0RNZEZjHNxVyEV5JUUWUqzENLlGzLqmVWNdUUKP/k=" /></div>
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
    return Handlebars.compile($('script#hb-modal_header_with_image').html())({src: "/templates/spree/production/images/coollive-logo-black.png", width: 150, alt: "Spreecast", opts:opts});
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
  <form accept-charset="UTF-8" action="/users" class="new_user" client-validation="true" data-remote="true" id="new_user" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="fr0RNZEZjHNxVyEV5JUUWUqzENLlGzLqmVWNdUUKP/k=" /></div>
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
  <form accept-charset="UTF-8" action="/users/reset_password" class="new_user" client-validation="true" data-remote="true" id="reset-password" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="fr0RNZEZjHNxVyEV5JUUWUqzENLlGzLqmVWNdUUKP/k=" /></div>
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
