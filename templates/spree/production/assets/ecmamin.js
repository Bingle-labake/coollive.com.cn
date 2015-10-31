"undefined" === typeof EcmaClass &&
function() {
    var a = !1,
        b = /xyz/.test(function() {
            xyz
        }) ? /\b_super\b/ : /.*/;
    this.EcmaClass = function() {};
    EcmaClass.extend = function(c) {
        function d() {
            !a && this.init && this.init.apply(this, arguments)
        }
        var e = this.prototype;
        a = !0;
        var f = new this;
        a = !1;
        for (var g in c) f[g] = "function" == typeof c[g] && "function" == typeof e[g] && b.test(c[g]) ?
            function(a, b) {
                return function() {
                    var c = this._super;
                    this._super = e[a];
                    var d = b.apply(this, arguments);
                    this._super = c;
                    return d
                }
            }(g, c[g]) : c[g];
        d.prototype = f;
        d.constructor = d;
        d.extend = arguments.callee;
        return d
    }
}();
var Facade = EcmaClass.extend({
        init: function() {
            "undefined" !== typeof $ && "undefined" !== typeof $.cookie && (EcmaGlobals.CAPTURE_MESSAGES = "1" == $.cookie("capture_messages"))
        },
        platform: function() {
            return "js"
        },
        json: function() {
            return JSON
        },
        addLogCallback: function(a) {
            this._logCallbacks.push(a)
        },
        reload: function() {
            window.location.reload()
        },
        log: function(a, b) {
            if (a <= EcmaGlobals.logLevel()) {
                console.log(Level.strVal(a), Array.prototype.slice.call(arguments, 1));
                for (i = 0; i < this._logCallbacks.length; i++) this._logCallbacks[i](a, b)
            }
        },
        getCurrentTimestamp: function() {
            return (new Date).getTime()
        },
        trim: function(a) {
            return $.trim(a)
        },
        supportsH264: function() {
            return !0
        },
        _logCallbacks: [],
        extractLinks: function(a) {
            for (var b = [], c = 20, d = /<a href=\"(.*?)\" target=\"_blank\">(.*?)<\/a>/g; c-- && (match = d.exec(a));) b.push({
                url: match[1],
                text: $("<html>" + match[2] + "</html>").text()
            });
            return b
        }
    }),
    JQuery = EcmaClass.extend({
        init: function() {},
        ajaxSetup: function(a) {
            $.ajaxSetup(a)
        },
        getScript: function(a) {
            $.getScript(a)
        },
        ajax: function(a) {
            $.ajax(a)
        },
        get: function(a, b, c, d) {
            $.get(a, b, c, d)
        },
        post: function(a, b, c, d) {
            $.post(a, b, c, d)
        },
        setHeader: function() {},
        setBasicAuth: function() {},
        text: function(a) {
            return $(a).text()
        }
    }),
    EcmaTimer = EcmaClass.extend({
        init: function(a, b, c, d) {
            this._interval = a;
            this._callback = b;
            this._callbackParam = c;
            d && this.start()
        },
        start: function() {
            if (null == this._timerId) {
                var a = this;
                this._timerId = window.setInterval(function() {
                    a._callback(a._callbackParam)
                }, this._interval)
            }
        },
        stop: function() {
            null != this._timerId && (window.clearInterval(this._timerId), this._timerId = null)
        },
        changeInterval: function(a) {
            this.stop();
            this._interval = a;
            this.start()
        }
    }),
    IdleDetection = EcmaClass.extend({
        init: function() {
            var a = this;
            this._idleTime = 0;
            this._lastTimeStamp = (new Date).getTime();
            this._timer = new EcmaTimer(1E3, function() {
                var b = (new Date).getTime(),
                    c = b - a._lastTimeStamp;
                0 <= c && 1E4 > c && (a._idleTime += c);
                a._lastTimeStamp = b
            }, null);
            $(document).mousemove(function() {
                a._idleTime = 0
            });
            $(document).keypress(function() {
                a._idleTime = 0
            })
        },
        idleTime: function() {
            return this._idleTime
        }
    }),
    Base64 = {
        encode: function(a) {
            return "undefined" === typeof btoa ? EcmaBase64.encode(a) : btoa(EcmaBase64.utf8_encode(a))
        },
        decode: function(a) {
            return "undefined" === typeof atob ? EcmaBase64.decode(a) : EcmaBase64.utf8_decode(atob(a))
        }
    },
    DisplayQuestions = {
        init: function() {},
        ALL: 0,
        STARRED: 1,
        NONE: 2
    },
    EventAction = {
        init: function() {},
        APPROVE_BROADCAST: "approve_broadcast",
        BAN: "ban",
        DEMOTE_PRODUCER: "demote_producer",
        INVITE_BROADCASTER: "invite_on_screen",
        INVITE_PRODUCER: "invite_coproducer",
        INVITE_VIEWER: "invite_viewer",
        PROMOTE_BROADCASTER: "promote_broadcaster",
        PROMOTE_PRODUCER: "promote_producer",
        REQUEST_BROADCAST: "request_broadcast",
        WITHDRAW_BROADCAST: "withdraw_broadcast",
        STAR: "star",
        UNSTAR: "unstar"
    },
    EventStatus = {
        init: function() {},
        PLACEHOLDER: -2,
        CANCELLED: -1,
        PRE_START: 0,
        STARTED: 1,
        ENDED: 2,
        DELETED: 3,
        EXTENDED: 4
    },
    FeedQuality = {
        init: function() {},
        HIGH: "high",
        MEDIUM: "medium",
        LOW: "low"
    },
    FeedSource = {
        init: function() {},
        SPREECAST: "Spreecast"
    },
    FeedState = {
        init: function() {},
        PENDING: "pending",
        RECONNECT: "reconnect",
        ACTIVE: "active"
    },
    FeedType = {
        init: function() {},
        BROADCASTER: "broadcaster",
        VIEWER: "viewer",
        ARCHIVE: "archive",
        TRANSCODE_AUDIO: "transcode_audio",
        urlKey: function(a) {
            switch (a) {
                case FeedType.BROADCASTER:
                    return "broadcaster_url";
                case FeedType.VIEWER:
                    return "viewer_url";
                case FeedType.ARCHIVE:
                    return "archive_url";
                case FeedType.TRANSCODE_AUDIO:
                    return "transcode_audio_url";
                default:
                    return null
            }
        }
    },
    Level = {
        init: function() {},
        CRITICAL: 0,
        WARNING: 1,
        INFO: 2,
        DEBUG: 3,
        DEBUGHI: 4,
        strVal: function(a) {
            switch (a) {
                default:
                case Level.CRITICAL:
                    return "Critical";
                case Level.WARNING:
                    return "Warning";
                case Level.INFO:
                    return "Info";
                case Level.DEBUG:
                    return "Debug";
                case Level.DEBUGHI:
                    return "DebugHi"
            }
        },
        fromString: function(a) {
            switch (a) {
                default:
                case "Critical":
                    return Level.CRITICAL;
                case "Warning":
                    return Level.WARNING;
                case "Info":
                    return Level.INFO;
                case "Debug":
                    return Level.DEBUG;
                case "DebugHi":
                    return Level.DEBUGHI
            }
        }
    },
    MediaMode = {
        init: function() {},
        OFF: "off",
        VIEWER: "viewer",
        BROADCASTER: "broadcaster",
        SHUTDOWN: "shutdown"
    },
    PromotionResponse = {
        init: function() {},
        ACCEPTED: "accepted",
        REFUSED: "refused"
    },
    PromotionType = {
        init: function() {},
        BROADCASTER: 1,
        PRODUCER: 2
    },
    Ratio = {
        init: function() {},
        ACTION_CROP: "crop"
    },
    StitchUrlQuality = {
        init: function() {},
        HIGH: "high",
        LOW: "low",
        AUDIO: "audio"
    },
    StitchUrlVariant = {
        init: function() {},
        HLS: "hls",
        HDS: "hds",
        MOV: "mov"
    },
    UserChangeType = {
        init: function() {},
        NONE: -1,
        DELETE: 0,
        INSERT: 1,
        MOVE: 2,
        UPDATE: 3
    },
    VideoLayout = {
        init: function() {},
        FOUR_BOXES: "four_boxes",
        SIDE_BY_SIDE: "side_by_side",
        FEATURED: "featured",
        EXTERNAL_MEDIA: "external_media",
        NINE_BOXES: "nine_boxes",
        DEFAULT_LAYOUT: "four_boxes",
        friendlyName: function(a) {
            switch (a) {
                case VideoLayout.FOUR_BOXES:
                    return "Four Boxes";
                case VideoLayout.SIDE_BY_SIDE:
                    return "Side By Side";
                case VideoLayout.FEATURED:
                    return "Featured";
                case VideoLayout.EXTERNAL_MEDIA:
                    return "External Media";
                case VideoLayout.NINE_BOXES:
                    return "Nine Boxes"
            }
            return "null"
        }
    },
    ViewerCategory = {
        init: function() {},
        ONAIR: "onair",
        PRODUCER: "producer",
        CAMERAQUEUE: "cameraqueue",
        VIEWER: "viewer"
    },
    EcmaBase64 = {
        init: function() {},
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function(a) {
            for (var b = "", c, d, e, f, g, h, j = 0, a = EcmaBase64.utf8_encode(a); j < a.length;) c = a.charCodeAt(j++), d = a.charCodeAt(j++), e = a.charCodeAt(j++), f = c >> 2, c = (c & 3) << 4 | d >> 4, g = (d & 15) << 2 | e >> 6, h = e & 63, isNaN(d) ? g = h = 64 : isNaN(e) && (h = 64), b = b + EcmaBase64._keyStr.charAt(f) + EcmaBase64._keyStr.charAt(c) + EcmaBase64._keyStr.charAt(g) + EcmaBase64._keyStr.charAt(h);
            return b
        },
        decode: function(a) {
            for (var b = "", c, d, e, f, g, h = 0, a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); h < a.length;) c = EcmaBase64._keyStr.indexOf(a.charAt(h++)), d = EcmaBase64._keyStr.indexOf(a.charAt(h++)), f = EcmaBase64._keyStr.indexOf(a.charAt(h++)), g = EcmaBase64._keyStr.indexOf(a.charAt(h++)), c = c << 2 | d >> 4, d = (d & 15) << 4 | f >> 2, e = (f & 3) << 6 | g, b += String.fromCharCode(c), 64 != f && (b += String.fromCharCode(d)), 64 != g && (b += String.fromCharCode(e));
            return b = EcmaBase64.utf8_decode(b)
        },
        utf8_encode: function(a) {
            for (var a = a.replace(/\r\n/g, "\n"), b = "", c = 0; c < a.length; c++) {
                var d = a.charCodeAt(c);
                128 > d ? b += String.fromCharCode(d) : (127 < d && 2048 > d ? b += String.fromCharCode(d >> 6 | 192) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128)), b += String.fromCharCode(d & 63 | 128))
            }
            return b
        },
        utf8_decode: function(a) {
            for (var b = "", c = 0, d = 0, e = 0, f = 0; c < a.length;) d = a.charCodeAt(c), 128 > d ? (b += String.fromCharCode(d), c++) : 191 < d && 224 > d ? (e = a.charCodeAt(c + 1), b += String.fromCharCode((d & 31) << 6 | e & 63), c += 2) : (e = a.charCodeAt(c + 1), f = a.charCodeAt(c + 2), b += String.fromCharCode((d & 15) << 12 | (e & 63) << 6 | f & 63), c += 3);
            return b
        }
    },
    EcmaGlobals = {
        init: function() {},
        PRESENCE_HEARTBEAT_INTERVAL: 7E3,
        EVENT_HEARTBEAT_INTERVAL: 7E3,
        ROOT_URL: "",
        DIRECT_MESSAGING: !1,
        IS_UNIT_TESTER: !1,
        MAX_CHATS: 30,
        LOG_LEVEL: -1,
        MAX_ARCHIVE_CACHED_CHUNKS: 30,
        CAPTURE_MESSAGES: !1,
        EMBARGO_TIMER_TIMEOUT: 1E3,
        HISTORY_MESSAGES: 50,
        MESSAGES_URL: "https://d3uaew8fhdifzm.cloudfront.net/",
        env: "",
        debugMode: function() {
            return "production" != EcmaGlobals.env
        },
        messagesUrl: function(a, b) {
            return EcmaGlobals.MESSAGES_URL + EcmaGlobals.env + "/" + a + "/" + b
        },
        logLevel: function() {
            return -1 < EcmaGlobals.LOG_LEVEL ? EcmaGlobals.LOG_LEVEL : EcmaGlobals.debugMode() ? Level.DEBUG : Level.INFO
        }
    },
    Util = {
        init: function() {},
        convertHashToQuery: function(a) {
            var b = [],
                c;
            for (c in a) b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
            return b.join("&")
        },
        feedAddressToHostName: function(a) {
            a = Util._0(a);
            return null == a ? "" : a.hostName
        },
        feedAddressToStreamName: function(a) {
            a = Util._0(a);
            return null == a ? "" : a.streamName
        },
        feedAddressToVideoUid: function(a) {
            a = Util.feedAddressToStreamName(a).split(".");
            return 5 > a.length ? "" : a[3]
        },
        xor: function(a, b) {
            return (a || b) && !(a && b)
        },
        _0: function(a) {
            var b;
            b = -1 != a.indexOf("cfx/st/") ? 5 : 4;
            for (var c, d = 0; 0 < b;) {
                c = a.indexOf("/", d + 1);
                if (0 > c) return null;
                d = c;
                b--
            }
            b = a.substr(c + 1);
            return {
                hostName: a.replace(b, ""),
                streamName: b
            }
        },
        arrayDeepCopy: function(a) {
            for (var b = [], c = a.length, d = 0; d < c; d++)"object" == typeof a[d] ? (b[d] = {}, Util.simpleObjectDeepCopy(a[d], b[d])) : b[d] = a[d];
            return b
        },
        arrayBinarySearch: function(a, b, c, d, e) {
            if (!a.length) return -1;
            var f;
            null == e ? (f = a.length - 1, e = 0) : (f = e[1], e = e[0]);
            for (var g, h; e <= f;) if (g = Math.floor((e + f) / 2), h = c(a[g], b), 0 < h) f = g - 1;
            else if (0 > h) e = g + 1;
            else return g;
            return d ? 0 < h ? g - 1 : g : -1
        },
        simpleObjectDeepCopy: function(a, b) {
            for (var c in a) b[c] = a[c]
        },
        sortedStringify: function(a) {
            var b = typeof a;
            if ("object" != b || null === a) return "string" == b && (a = '"' + a + '"'), String(a);
            var c, d, e = [],
                f = a && a.constructor == Array;
            if (f) {
                for (c in a) d = a[c], b = typeof d, "string" == b ? d = '"' + d + '"' : "object" == b && null !== d && (d = Util.sortedStringify(d)), e.push((f ? "" : '"' + c + '":') + String(d));
                return "[" + String(e) + "]"
            }
            for (var g = Util.sortedKeys(a), h = 0; h < g.length; h++) c = g[h], d = a[c], b = typeof d, "string" == b ? d = '"' + d + '"' : "object" == b && null !== d && (d = Util.sortedStringify(d)), e.push((f ? "" : '"' + c + '":') + String(d));
            return "{" + String(e) + "}"
        },
        sortedKeys: function(a) {
            var b = [],
                c;
            for (c in a) a.hasOwnProperty(c) && b.push(c);
            b.sort();
            return b
        }
    },
    Ecma = EcmaClass.extend({
        init: function(a, b) {
            this._4 = a;
            this._1 = new Facade(this);
            this._2 = new JQuery(this);
            this._3 = new LoggingController(this, {
                rootUrl: EcmaGlobals.ROOT_URL
            });
            this._5 = (new Date).getTime().toString(16) + Math.floor(2E9 * Math.random()).toString(16);
            this._6 = b
        },
        facade: function() {
            return this._1
        },
        $: function() {
            return this._2
        },
        loggingController: function() {
            return this._3
        },
        id: function() {
            return this._4
        },
        sessionId: function() {
            return this._5
        },
        device: function() {
            return this._6
        }
    }),
    BaseModel = EcmaClass.extend({
        init: function() {},
        mobileData: function() {
            throw "Inheritor must implement";
        }
    }),
    BaseVideoLayout = EcmaClass.extend({
        init: function(a, b, c, d, e) {
            this._7 = a;
            this._9 = b;
            this._a = c;
            this._b = d;
            this._c = e;
            this._8 = this._d(b, c, d)
        },
        layoutPane: function() {
            this._7.facade().log(Level.CRITICAL, "You must override this method");
            return null
        },
        layoutName: function(a, b) {
            return new Rectangle(b / 2, b / 4, a.width() - 20, 35)
        },
        layoutCloseBox: function(a, b) {
            return new Rectangle(a.width() - b / 2 - 10, 0, 20, 35)
        },
        screenWidth: function() {
            return this._9
        },
        screenHeight: function() {
            return this._a
        },
        heightFactor: function() {
            return this._c
        },
        desiredRatio: function() {
            return this._b
        },
        optimalRect: function() {
            return this._8
        },
        nameFontSize: function() {
            return 12
        },
        closeBoxFontSize: function() {
            return 16
        },
        producerMicRect: function() {
            return new Rectangle(10, 30, 18, 60)
        },
        signalBoxRect: function() {
            return new Rectangle(30, 30, 42, 35)
        },
        maxBoxes: function() {
            return 0
        },
        _d: function(a, b, c) {
            this._7.facade().log(Level.DEBUG, "VideoLayout#_computeOptimalRect", a, b, c, _heightFactor);
            var d = b / _heightFactor,
                e = d / c,
                f, g;
            e > a && (f = e - a, d -= f * c, e -= f);
            d < b && e < a && (g = b - d, f = a - e, g * c > f && (g = f * c), d += g, e += f);
            return new Rectangle((a - e) / 2, (b - d) / 2, e, d)
        }
    }),
    Rectangle = EcmaClass.extend({
        init: function(a, b, c, d) {
            this._e = a;
            this._f = b;
            this._g = c;
            this._h = d
        },
        x: function() {
            return this._e
        },
        y: function() {
            return this._f
        },
        width: function() {
            return this._g
        },
        height: function() {
            return this._h
        }
    }),
    SignalEmitter = EcmaClass.extend({
        init: function(a, b, c) {
            this.signals = {};
            this.signalNames = [];
            this._i = {};
            this._j = 0;
            if (c) for (var d = 0; d < c.length; d++) this.signals[c[d]] = c[d], this._i[c[d]] = [];
            this._k = a;
            this._l = b;
            this._m = a.facade();
            this._n = a.$()
        },
        ecma: function() {
            return this._k
        },
        facade: function() {
            return this._m
        },
        $: function() {
            return this._n
        },
        emit: function(a, b) {
            this.facade().log(Level.DEBUG, "SignalEmitter#emit", a, b, this._l);
            if (this._i[a]) for (var c = 0; c < this._i[a].length; c++) this._i[a][c].callback(b);
            else this.facade().log(Level.CRITICAL, "SignalEmitter#emit", "Emission of non-existent signal", a, b)
        },
        subscribe: function(a, b) {
            this.facade().log(Level.DEBUG, "SignalEmitter#subscribe", a);
            if (!this._i[a]) return this.facade().log(Level.CRITICAL, "SignalEmitter#subscribe", "Subscribe to non-existent signal", a), -1;
            this._j++;
            this._i[a].push({
                id: this._j,
                callback: b
            });
            return this._j
        },
        subscribeMobile: function(a, b, c) {
            this.facade().log(Level.DEBUG, "SignalEmitter#subscribeMobile", a);
            var d = this;
            return this.subscribe(a, function(e) {
                d._o({
                    data: e
                });
                c(d.facade().json().stringify({
                    emitterName: b,
                    signal: a,
                    data: e
                }))
            })
        },
        _o: function(a) {
            var b, c, d;
            for (c in a) a.hasOwnProperty(c) && (d = a[c], b = typeof d, "object" == b && (d.mobileData ? a[c] = d.mobileData() : null != d && this._o(d)))
        },
        unsubscribe: function(a, b) {
            this.facade().log(Level.DEBUG, "SignalEmitter#unsubscribe", a, b);
            if (this._i[a]) {
                for (var c = 0; c < this._i[a].length; c++) if (this._i[a][c].id == b) {
                    this._i[a].splice(c, 1);
                    return
                }
                this.facade().log(Level.CRITICAL, "SignalEmitter#unsubscribe", "Called with non-existent id", a, b)
            } else this.facade().log(Level.CRITICAL, "SignalEmitter#unsubscribe", "Unsubscribe from non-existent signal", a)
        },
        unsubscribeAll: function() {
            this.facade().log(Level.INFO, "SignalEmitter#unsubscribeAll");
            for (var a in this._i) this._i[a] = []
        }
    }),
    ExternalMediaVideoLayout = BaseVideoLayout.extend({
        init: function(a, b, c, d) {
            this._super(a, b, c, d, 1)
        },
        layoutPane: function(a) {
            return new Rectangle(this.optimalRect().width() * (0.1 + 0.2 * a), 0.8 * this.optimalRect().height(), 0.2 * this.optimalRect().width(), 0.2 * this.optimalRect().width() * this.desiredRatio())
        },
        nameFontSize: function() {
            return 8
        },
        maxBoxes: function() {
            return 4
        }
    }),
    FeaturedVideoLayout = BaseVideoLayout.extend({
        init: function(a, b, c, d) {
            this._super(a, b, c, d, 1)
        },
        layoutPane: function(a, b) {
            var c = this.optimalRect().x() + 0.75 * this.optimalRect().width(),
                d = 0.2 * this.optimalRect().width();
            switch (b) {
                case 0:
                    return null;
                default:
                case 1:
                    return this.optimalRect();
                case 2:
                    switch (a) {
                        default:
                        case 0:
                            return this.optimalRect();
                        case 1:
                            return new Rectangle(c, 0.1 * this.optimalRect().height(), d, d * this.desiredRatio())
                    }
                case 3:
                    switch (a) {
                        default:
                        case 0:
                            return this.optimalRect();
                        case 1:
                            return new Rectangle(c, 0.1 * this.optimalRect().height(), d, d * this.desiredRatio());
                        case 2:
                            return new Rectangle(c, 0.4 * this.optimalRect().height(), d, d * this.desiredRatio())
                    }
                case 4:
                    switch (a) {
                        default:
                        case 0:
                            return this.optimalRect();
                        case 1:
                            return new Rectangle(c, 0.1 * this.optimalRect().height(), d, d * this.desiredRatio());
                        case 2:
                            return new Rectangle(c, 0.4 * this.optimalRect().height(), d, d * this.desiredRatio());
                        case 3:
                            return new Rectangle(c, 0.7 * this.optimalRect().height(), d, d * this.desiredRatio())
                    }
            }
        },
        nameFontSize: function(a) {
            switch (a) {
                default:
                case 0:
                    return 16;
                case 1:
                case 2:
                case 3:
                    return 8
            }
        },
        maxBoxes: function() {
            return 4
        }
    }),
    FourBoxesVideoLayout = BaseVideoLayout.extend({
        init: function(a, b, c, d, e) {
            this._super(a, b, c, d, e);
            this._p = Math.floor(this.optimalRect().width() / 2);
            this._q = Math.floor(this.optimalRect().height() / 2);
            this._r = Math.floor(this.optimalRect().width() / 4);
            this._s = Math.floor(this.optimalRect().height() / 4)
        },
        layoutPane: function(a, b) {
            switch (b) {
                case 0:
                    return null;
                default:
                case 1:
                    return this.optimalRect();
                case 2:
                    switch (a) {
                        default:
                        case 0:
                            return new Rectangle(this.optimalRect().x(), this._s + this.optimalRect().y(), this._p, this._q);
                        case 1:
                            return new Rectangle(this._p + this.optimalRect().x(), this._s + this.optimalRect().y(), this._p, this._q)
                    }
                case 3:
                    switch (a) {
                        default:
                        case 0:
                            return new Rectangle(this._r + this.optimalRect().x(), this.optimalRect().y(), this._p, this._q);
                        case 1:
                            return new Rectangle(this.optimalRect().x(), this._q + this.optimalRect().y(), this._p, this._q);
                        case 2:
                            return new Rectangle(this._p + this.optimalRect().x(), this._q + this.optimalRect().y(), this._p, this._q)
                    }
                case 4:
                    switch (a) {
                        default:
                        case 0:
                            return new Rectangle(this.optimalRect().x(), this.optimalRect().y(), this._p, this._q);
                        case 1:
                            return new Rectangle(this._p + this.optimalRect().x(), this.optimalRect().y(), this._p, this._q);
                        case 2:
                            return new Rectangle(this.optimalRect().x(), this._q + this.optimalRect().y(), this._p, this._q);
                        case 3:
                            return new Rectangle(this._p + this.optimalRect().x(), this._q + this.optimalRect().y(), this._p, this._q)
                    }
            }
        },
        producerMicRect: function(a, b) {
            switch (b) {
                default:
                case 1:
                    return new Rectangle(10, 30, 18, 60);
                case 2:
                    return 0 == a ? new Rectangle(10, 30, 18, 60) : new Rectangle(this._p - 28, 30, 18, 60);
                case 3:
                    return 0 == a || 1 == a ? new Rectangle(10, 30, 18, 60) : new Rectangle(this._p - 28, 30, 18, 60);
                case 4:
                    return 0 == a || 2 == a ? new Rectangle(10, 30, 18, 60) : new Rectangle(this._p - 28, 30, 18, 60)
            }
        },
        signalBoxRect: function(a, b) {
            switch (b) {
                default:
                case 1:
                    return new Rectangle(40, 30, 42, 35);
                case 2:
                    return 0 == a ? new Rectangle(40, 30, 42, 35) : new Rectangle(this._p - 82, 30, 42, 35);
                case 3:
                    return 0 == a || 1 == a ? new Rectangle(40, 30, 42, 35) : new Rectangle(this._p - 82, 30, 42, 35);
                case 4:
                    return 0 == a || 2 == a ? new Rectangle(40, 30, 42, 35) : new Rectangle(this._p - 82, 30, 42, 35)
            }
        },
        maxBoxes: function() {
            return 4
        }
    }),
    LayoutManager = EcmaClass.extend({
        init: function(a) {
            this._t = a;
            this._u = [VideoLayout.FOUR_BOXES, VideoLayout.FEATURED, VideoLayout.SIDE_BY_SIDE, VideoLayout.EXTERNAL_MEDIA, VideoLayout.NINE_BOXES];
            this._v = !0
        },
        get: function(a, b, c, d) {
            switch (a) {
                default:
                case VideoLayout.FOUR_BOXES:
                    return new FourBoxesVideoLayout(this._t, b, c, d, _fitToHeight ? 1 : 0.5);
                case VideoLayout.SIDE_BY_SIDE:
                    return new SideBySideVideoLayout(this._t, b, c, d);
                case VideoLayout.FEATURED:
                    return new FeaturedVideoLayout(this._t, b, c, d);
                case VideoLayout.EXTERNAL_MEDIA:
                    return new ExternalMediaVideoLayout(this._t, b, c, d);
                case VideoLayout.NINE_BOXES:
                    return new NineBoxesVideoLayout(this._t, b, c, d)
            }
        },
        layouts: function() {
            return this._u
        },
        fitToHeight: function(a) {
            this._v = a
        }
    }),
    NineBoxesVideoLayout = BaseVideoLayout.extend({
        init: function(a, b, c, d) {
            this._super(a, b, c, d, 1)
        },
        layoutPane: function(a) {
            return new Rectangle(this.optimalRect().x() + a % 3 * this.optimalRect().width() / 3, this.optimalRect().y() + Math.floor(a / 3) * this.optimalRect().height() / 3, this.optimalRect().width() / 3, this.optimalRect().height() / 3)
        },
        nameFontSize: function() {
            return 12
        },
        maxBoxes: function() {
            return 9
        }
    }),
    SideBySideVideoLayout = BaseVideoLayout.extend({
        init: function(a, b, c, d) {
            this._super(a, b, c, d, 1)
        },
        layoutPane: function(a, b) {
            var c;
            switch (b) {
                case 0:
                    return null;
                default:
                case 1:
                    return this.optimalRect();
                case 2:
                    switch (c = Math.floor(this.screenWidth() / 2), a) {
                        default:
                        case 0:
                            return new Rectangle(0, 0, c, this.screenHeight());
                        case 1:
                            return new Rectangle(c, 0, c, this.screenHeight())
                    }
                case 3:
                    switch (c = Math.floor(this.screenWidth() / 3), a) {
                        default:
                        case 0:
                            return new Rectangle(0, 0, c, this.screenHeight());
                        case 1:
                            return new Rectangle(c, 0, c, this.screenHeight());
                        case 2:
                            return new Rectangle(2 * c, 0, c, this.screenHeight())
                    }
                case 4:
                    switch (c = Math.floor(this.screenWidth() / 4), a) {
                        default:
                        case 0:
                            return new Rectangle(0, 0, c, this.screenHeight());
                        case 1:
                            return new Rectangle(c, 0, c, this.screenHeight());
                        case 2:
                            return new Rectangle(2 * c, 0, c, this.screenHeight());
                        case 3:
                            return new Rectangle(3 * c, 0, c, this.screenHeight())
                    }
            }
        },
        nameFontSize: function(a, b) {
            switch (b) {
                default:
                case 1:
                case 2:
                    return 16;
                case 3:
                    return 12;
                case 4:
                    return 10
            }
        },
        maxBoxes: function() {
            return 4
        }
    }),
    Heartbeater = SignalEmitter.extend({
        init: function(a, b, c, d, e, f) {
            this._super(a, "Heartbeater", ["REFRESH", "REDIRECT", "SESSION_CAPABILITIES"]);
            var g = this;
            !EcmaGlobals.IS_UNIT_TESTER && 0 < b && (this._w = new EcmaTimer(b, function() {
                g._H(!g._F, !1)
            }, null, !0));
            this._y = c;
            this._z = d;
            this._A = e;
            this._B = f;
            this._E = 0;
            this._C = this.ecma().facade().getCurrentTimestamp();
            this._D = new IdleDetection;
            this._F = !1
        },
        close: function() {
            this.ecma().facade().log(Level.DEBUG, "Heartbeater#close");
            this._w.stop()
        },
        sendHeartbeat: function(a) {
            this.ecma().facade().log(Level.DEBUG, "Heartbeater#sendHeartbeat", a);
            EcmaGlobals.IS_UNIT_TESTER || (this._w.stop(), this._w.start());
            this._H(!0, a)
        },
        setConnected: function() {
            this._F = !0
        },
        _G: function(a) {
            if (a.cmd && "refresh" == a.cmd) this.ecma().facade().log(Level.DEBUG, "Heartbeater#_ajaxCallback", "Refresh requested"), this.emit(this.signals.REFRESH, {});
            else if (a.cmd && "redirect" == a.cmd) this.ecma().facade().log(Level.DEBUG, "Heartbeater#_ajaxCallback", "Redirect requested"), this.emit(this.signals.REDIRECT, a.redirect_url);
            else {
                if (a.messages) for (var b in a.messages) {
                    this.ecma().facade().log(Level.DEBUG, "Heartbeater#_ajaxCallback", "Messages received on heartbeat for channel", b);
                    for (var c = 0; c < a.messages[b].length; c++) a.messages[b][c].hasOwnProperty("m") ? this._y[b].messageReceived(a.messages[b][c]) : this._y[b].processMessage(a.messages[b][c])
                }
                a.capabilities && (this.ecma().facade().log(Level.DEBUG, "Heartbeater#_ajaxCallback", "Capabilities received on heartbeat", a.capabilities), this.emit(this.signals.SESSION_CAPABILITIES, a.capabilities))
            }
        },
        _H: function(a, b) {
            var c = {},
                d = [];
            this._E && 6E4 < this.ecma().facade().getCurrentTimestamp() - this._E && this.emit(this.signals.REFRESH, {});
            for (var e in this._y) {
                var f = this._y[e],
                    g = f.channel();
                (a || f.messageHoleExists()) && d.push(g);
                c[g] = f.lastProcessedMessageId()
            }
            this.ecma().facade().log(2, "[Heartbeater] Making heartbeat request");
            c = {
                channels: c,
                session_id: this.ecma().sessionId(),
                dwell_time: this.ecma().facade().getCurrentTimestamp() - this._C,
                idle_time: this._D.idleTime(),
                update_all: a
            };
            72E5 < c.idle_time ? this.close() : (0 < d.length && (c.channels_missing_msgs = d), this._z && (c.first = b, c.event_id = this._z, c.device = this.ecma().device()), this._A && (c.clip_id = this._A), this._I(c, 0))
        },
        _I: function(a, b) {
            var c = this;
            if (this._E) {
                var d = this.ecma().facade().getCurrentTimestamp();
                this.ecma().facade().log(Level.INFO, "Heartbeater#_doHeartbeat", "Heartbeating. Ecma id:" + this.ecma().id() + " Since last heartbeat:" + (d - this._E));
                this._E = d
            } else this._E = this.ecma().facade().getCurrentTimestamp();
            this.ecma().$().ajax({
                type: "GET",
                url: this._B + "/rt/heartbeat/ping",
                data: a,
                success: function(a) {
                    c._G(a)
                },
                error: function() {
                    0 == b ? (c.ecma().facade().log(Level.INFO, "Heartbeater#callback", "Retrying heartbeat"), c._I(a, b + 1)) : c.ecma().facade().log(Level.INFO, "Heartbeater#callback", "Not retrying heartbeat because retryCount reached limit")
                },
                dataType: "json"
            })
        },
        TEST_ajaxCallback: function(a) {
            this._G(a)
        }
    }),
    MessageConsistency = SignalEmitter.extend({
        init: function(a, b, c) {
            this._super(a, "MessageConsistency", ["MESSAGE"]);
            this._J = a.loggingController();
            this._K = b;
            this._L = {};
            this._M = {};
            this._O = this._N = c
        },
        messageReceived: function(a) {
            var b = a.i,
                c = a.s,
                d = a.c,
                e = "";
            if (1 < d) {
                this._L.hasOwnProperty(b) || (this._L[b] = []);
                this._L[b][c] = a.m;
                if (!this._P(this._L[b], d)) return;
                for (a = 0; a < d; a++) e += this._L[b][a]
            } else e = a.m;
            delete this._L[b];
            b = Base64.decode(e);
            b = this.facade().json().parse(b);
            this.processMessage(b)
        },
        lastProcessedMessageId: function() {
            return this._N
        },
        messageHoleExists: function() {
            return this._N != this._O
        },
        channel: function() {
            return this._K
        },
        processMessage: function(a) {
            if (a.hasOwnProperty("i")) {
                var b = a.i,
                    c;
                for (c in this._L) if (this._L.hasOwnProperty(c)) {
                    var d = parseInt(c);
                    d <= b && delete this._L[d]
                }
            }
            if (a.hasOwnProperty("message_number")) {
                if (b = a.message_number, a.channel = this._K, b > this._O && (this._O = b), !(b <= this._N)) if (this._M[b] = a, !(b > this._N + 1)) for (a = this._N + 1; this._M.hasOwnProperty(a); a++) if (b = this._M[a], delete this._M[a], this._N = a, EcmaGlobals.debugMode()) this.emit(this.signals.MESSAGE, {
                    channel: this._K,
                    message: b
                });
                else try {
                        this.emit(this.signals.MESSAGE, {
                            channel: this._K,
                            message: b
                        })
                    } catch (e) {
                        b.error = e, this.facade().log(Level.CRITICAL, "Exception processing message: ", this.facade().json().stringify(b))
                    }
            } else if (EcmaGlobals.debugMode()) this.emit(this.signals.MESSAGE, {
                channel: this._K,
                message: a
            });
            else try {
                    this.emit(this.signals.MESSAGE, {
                        channel: this._K,
                        message: a
                    })
                } catch (f) {
                    a.error = f, this.facade().log(Level.CRITICAL, "Exception processing message: ", this.facade().json().stringify(a))
                }
        },
        _P: function(a, b) {
            for (var c = b - 1; 0 <= c; c--) if (!a[c]) return !1;
            return !0
        }
    }),
    MobileFacade = EcmaClass.extend({
        init: function(a, b, c) {
            this._Q = a;
            this._R = a.facade();
            this._S = a.$();
            this._T = [];
            this._U = !1;
            this._V = b;
            this._W = c;
            this._X = new SignalEmitter(this._Q, "MobileController", ["USER_IS_VIEWER", "USER_IS_BROADCASTER"]);
            this._1j();
            this._U = !0
        },
        ecma: function() {
            return this._Q
        },
        facade: function() {
            return this._R
        },
        $: function() {
            return this._S
        },
        messageController: function() {
            return this._V
        },
        eventController: function() {
            return this._W
        },
        isReady: function() {
            return this._U
        },
        getMessages: function() {
            var a = this._T.slice();
            this._T = [];
            return this.facade().json().stringify(a)
        },
        getEventStatus: function() {
            return this.eventController().event().status()
        },
        getEventChatEnabled: function() {
            return this.eventController().event().eventEnabled()
        },
        getEventAdEnabled: function() {
            return this.eventController().event().eventEnabled()
        },
        getStitchUrls: function() {
            return this.eventController().mediaController().stitchUrls()
        },
        getUserRole: function() {
            return this.eventController().user().role()
        },
        getPreviewLocation: function() {
            return this.eventController().user().previewLocation()
        },
        rsvp: function() {
            this.eventController().rsvp()
        },
        getMessageEmbargoTime: function() {
            return this.messageController().embargoTime()
        },
        setArchiveTimestamp: function(a) {
            this.eventController().setArchiveTimestamp(a)
        },
        updateEmbargoTime: function(a) {
            this.messageController().updateEmbargoTime(a)
        },
        generateShareId: function(a) {
            return this.eventController().shareId(a)
        },
        registerShare: function(a, b, c) {
            this.eventController().registerShare(a, b, c)
        },
        submitChat: function(a, b, c) {
            this.eventController().chatController().submit(a, b, c)
        },
        submitCameraRequest: function() {
            var a = this;
            this.eventController().broadcastController().request(function() {
                a._10('{"emitterName":"InteractionController","signal":"CAMERA_ERROR","data":{"throttled":false,"set":true}}', function(a) {
                    a.data.setting = a.set;
                    return !0
                })
            })
        },
        withdrawCameraRequest: function() {
            this.eventController().broadcastController().withdraw()
        },
        submitQuestion: function(a, b) {
            var c = {
                event_id: this.eventController().id(),
                text: a,
                role: b,
                embed: !1
            };
            this.eventController().questionController().submit(c, "/rt/questions/create", null)
        },
        _Y: function(a) {
            var b = [],
                b = this.facade().extractLinks(a),
                c = this.$().text("<html>" + a + "</html>");
            return {
                raw: a,
                text: c,
                links: b
            }
        },
        _Z: function(a) {
            return a.replace(/@{"id":\d+,.*,"full_name":"(.*)","slug":"([\w|-]+)"}/g, "@$1")
        },
        _10: function(a, b) {
            var c = this.facade().json().parse(a),
                d = !0;
            null != b && (d = b(c));
            d && this._T.push(c)
        },
        _11: function() {
            var a = this;
            this._V.subscribeMobile(this._V.signals.READY, "MessageController", function() {
                a._V.heartbeater().subscribeMobile(a._V.heartbeater().signals.REFRESH, "EventController", function(b) {
                    a._10(b, function(a) {
                        a.data.test = "nil";
                        return !0
                    })
                })
            })
        },
        _12: function() {
            var a = this;
            this._W.subscribeMobile(this._W.signals.STITCH_AVAILABLE, "InteractionController", function(b) {
                a._10(b, function(a) {
                    return a.data && (a.data.live_hls || a.data.archive_hls) ? (a.data = {
                        stitch_urls: a.data
                    }, !0) : !1
                })
            })
        },
        _13: function() {
            var a = this;
            this._W.subscribeMobile(this._W.signals.END, "EventController", function(b) {
                a._10(b, null)
            })
        },
        _14: function() {
            var a = this;
            this._W.subscribeMobile(this._W.signals.USER_BANNED, "EventController", function(b) {
                a._10(b, null)
            })
        },
        _15: function() {
            var a = this;
            this._W.chatController().subscribeMobile(this._W.chatController().signals.ENABLED, "InteractionController", function(b) {
                a._10(b, function(a) {
                    a.data.test = "nil";
                    return !0
                })
            })
        },
        _16: function() {
            var a = this;
            this._W.chatController().subscribeMobile(this._W.chatController().signals.INSERT, "ChatController", function(b) {
                a._10(b, function(b) {
                    b.data.data && (b.data = b.data.data);
                    b.data.position = b.position;
                    try {
                        var d = a._Y(b.data.text);
                        b.data.text = a._Z(d.text);
                        b.data.links = d.links
                    } catch (e) {
                        a.facade().log(Level.WARNING, "{MobileFacade::_subscribeForChatInsert::transform_callback} EXCEPTION", e)
                    }
                    return !0
                })
            })
        },
        _17: function() {
            var a = this;
            this._W.chatController().subscribeMobile(this._W.chatController().signals.REMOVE, "ChatController", function(b) {
                a._10(b, null)
            })
        },
        _18: function() {
            var a = this;
            this._W.chatController().subscribeMobile(this._W.chatController().signals.PRIVATE_CHAT, "ChatController", function(b) {
                a._10(b, function(a) {
                    a.data.data && (a.data = a.data.data);
                    return !0
                })
            })
        },
        _19: function() {
            var a = this;
            this._W.questionController().subscribeMobile(this._W.questionController().signals.ON_AIR, "QuestionController", function(b) {
                a._10(b, function(b) {
                    if (b.data) {
                        if (b.data.question) {
                            b.data = b.data.question;
                            try {
                                var d = a._Y(b.data.text);
                                b.data.text = d.text;
                                b.data.links = d.links;
                                b.data.type = "question"
                            } catch (e) {
                                a.facade().log(Level.WARNING, "{MobileFacade::_subscribeForQuestionOnAir::transform_callback} EXCEPTION", e)
                            }
                            return !0
                        }
                        if (b.data.media_item) {
                            b.data = b.data.media_item;
                            try {
                                b.data.links = [{
                                    url: b.data.url,
                                    text: b.data.url
                                }], b.data.type = "media_item"
                            } catch (f) {
                                a.facade().log(Level.WARNING, "{MobileFacade::_subscribeForQuestionOnAir::transform_callback} EXCEPTION", f)
                            }
                            return !0
                        }
                    }
                    return !1
                })
            })
        },
        _1a: function() {
            var a = this;
            this._W.questionController().subscribeMobile(this._W.questionController().signals.OFF_AIR, "QuestionController", function(b) {
                a._10(b, function(a) {
                    return "question" === a.data.type || "media_item" === a.data.type ? !0 : !1
                })
            })
        },
        _1b: function() {
            var a = this;
            this._W.subscribeMobile(this._W.signals.QUESTIONS_ALLOWED, "InteractionController", function(b) {
                a._10(b, function(a) {
                    a.data.setting = a.set;
                    return !0
                })
            })
        },
        _1c: function() {
            var a = this;
            this._W.subscribeMobile(this._W.signals.BROADCASTERS_ALLOWED, "InteractionController", function(b) {
                a._10(b, function(a) {
                    a.data.setting = a.set;
                    return !0
                })
            })
        },
        _1d: function() {
            var a = this;
            this._W.subscribeMobile(this._W.signals.EVENT_PARTICIPATION, "InteractionController", function(b) {
                a._10(b, null)
            })
        },
        _1e: function() {
            var a = this;
            this._W.subscribeMobile(this._W.signals.CAMERA_ACTIVATED, "InteractionController", function(b) {
                a._10(b, function(a) {
                    a.data.setting = a.set;
                    return !0
                })
            })
        },
        _1f: function() {
            var a = this;
            a._W.subscribe(a._W.signals.MY_EP_NEW, function(b) {
                2 == b.broadcast_status ? a._X.emit(a._X.signals.USER_IS_BROADCASTER, {
                    previewLocation: b.user.preview_location
                }) : a._X.emit(a._X.signals.USER_IS_VIEWER, {})
            })
        },
        _1g: function() {
            var a = this;
            this._X.subscribeMobile(this._X.signals.USER_IS_BROADCASTER, "InteractionController", function(b) {
                a._10(b, null)
            })
        },
        _1h: function() {
            var a = this;
            this._X.subscribeMobile(this._X.signals.USER_IS_VIEWER, "InteractionController", function(b) {
                a._10(b, null)
            })
        },
        _1i: function() {
            var a = this;
            this._W.visibleUsersController().subscribeMobile(this._W.visibleUsersController().signals.PARTICIPANT_COUNT, "EventController", function(b) {
                a._10(b, null)
            })
        },
        _1j: function() {
            this._11();
            this._12();
            this._13();
            this._14();
            this._15();
            this._16();
            this._17();
            this._18();
            this._19();
            this._1a();
            this._1b();
            this._1c();
            this._1e();
            this._1g();
            this._1h();
            this._1f();
            this._1d();
            this._1i()
        }
    }),
    AdModel = BaseModel.extend({
        init: function(a) {
            this._1k = a.url;
            this._1l = a.duration;
            this._1m = a.state;
            this._1o = a.base_url;
            this._1p = a.params
        },
        url: function() {
            var a = this._1p,
                b = "&cust_params=";
            this._1l ? (a.duration = this._1l, a.videopos = "mid", b += escape(Util.convertHashToQuery(a)) + "&ad_rule=1") : (a.videopos = "pre", b += escape(Util.convertHashToQuery(a)));
            return this._1o + b
        },
        duration: function() {
            return this._1l
        },
        state: function() {
            return this._1m
        },
        setDuration: function(a) {
            this._1l = a
        }
    }),
    ArchiveChunkIndexItemModel = BaseModel.extend({
        init: function(a, b, c, d, e, f) {
            this._super();
            this._1q = a;
            this._1r = b;
            this._1s = c;
            this._1t = d;
            this._1u = e;
            this._1v = f
        },
        chunkId: function() {
            return this._1q
        },
        callback: function() {
            return this._1r
        },
        url: function() {
            return this._1s
        },
        startIndex: function() {
            return this._1t
        },
        numItems: function() {
            return this._1u
        },
        data: function() {
            return this._1v
        }
    }),
    ArchiveChunkIndexModel = BaseModel.extend({
        init: function(a) {
            this._super();
            var b = 0;
            this._1w = [];
            this._1x = {};
            if (a) for (var c = 0; c < a.length; c++) this._1w.push(a[c].timestamp), this._1x[a[c].timestamp] = new ArchiveChunkIndexItemModel(c, a[c].callback, a[c].url, b, a[c].size, a[c].data), b += a[c].size
        },
        findChunk: function(a) {
            return Util.arrayBinarySearch(this._1w, a, function(a, c) {
                return a - c
            }, !0, null)
        },
        itemModel: function(a) {
            return this._1x[this._1w[a]]
        }
    }),
    ChatModel = BaseModel.extend({
        init: function(a) {
            this._super();
            this._1y = a.action;
            this._1z = a.created_at;
            this._1A = a.id;
            this._1B = a.recipient_id;
            this._1C = a.text;
            this._1D = a.unfriendly_id;
            this._1E = new UserModel(a.user)
        },
        mobileData: function() {
            return {
                id: this.id(),
                text: this.text(),
                user: this.user().mobileData()
            }
        },
        action: function() {
            return this._1y
        },
        createdAt: function() {
            return this._1z
        },
        id: function() {
            return this._1A
        },
        recipientId: function() {
            return this._1B
        },
        text: function() {
            return this._1C
        },
        unfriendlyId: function() {
            return this._1D
        },
        user: function() {
            return this._1E
        }
    }),
    EventModel = BaseModel.extend({
        init: function(a) {
            this._super();
            var b = a.user_data.event,
                c = a.digest,
                d = a.clip;
            this._1F = b.about;
            this._1G = b.channel_name;
            this._1H = b.event_enabled;
            this._1I = b.coproducable;
            this._1J = Number(b.display_questions);
            this._1K = b.embed_share_url;
            this._1L = b.event_id;
            this._1M = b.event_url;
            this._1N = b.friendly_id;
            this._1O = b.image_url;
            this._1P = b.broadcasters_enabled;
            this._1Q = b.name;
            this._1R = b.questions_enabled;
            this._1T = Number(b.status);
            this._1S = Number(b.start_at_epoch);
            this._1U = Number(b.visibility);
            this._1V = b.questions_throttled;
            this._1W = b.broadcasters_throttled;
            this._21 = Number(b.playback_start);
            this._27 = a.auto_play;
            this._20 = !1;
            d && (this._22 = d.clip_id);
            b.ads_enabled && (this._24 = new AdModel(a.user_data.ad), this._26 = b.ad_on_air, this._25 = !0);
            c && (c.video_digest && (c.video_digest.start_event_time_string && c.video_digest.end_event_time_string) && (this._1X = c.video_digest.end_event_time_string - c.video_digest.start_event_time_string, this._23 = Number(c.video_digest.start_event_time_string)), c.stitch_urls && this.setStitchUrls(c.stitch_urls))
        },
        about: function() {
            return this._1F
        },
        midrollOnAir: function() {
            return this._26
        },
        prerollOnAir: function() {
            return this._25
        },
        channelName: function() {
            return this._1G
        },
        eventEnabled: function() {
            return this._1H
        },
        coProducable: function() {
            return this._1I
        },
        displayQuestions: function() {
            return this._1J
        },
        embedShareUrl: function() {
            return this._1K
        },
        id: function() {
            return this._1L
        },
        url: function() {
            return this._1M
        },
        friendlyId: function() {
            return this._1N
        },
        imageUrl: function() {
            return this._1O
        },
        broadcastersEnabled: function() {
            return this._1P
        },
        name: function() {
            return this._1Q
        },
        questionsEnabled: function() {
            return this._1R
        },
        questionsThrottled: function() {
            return this._1V
        },
        broadcastersThrottled: function() {
            return this._1W
        },
        archiveDuration: function() {
            return this._1X
        },
        archiveDurationInSeconds: function() {
            return this.archiveDuration() / 1E3
        },
        hdsStitchUrl: function() {
            return this._1Y
        },
        isHighQuality: function() {
            return this._20
        },
        rtmpStitchUrl: function() {
            return this._1Z
        },
        playbackStart: function() {
            return this._21
        },
        clipId: function() {
            return this._22
        },
        setMidrollOnAir: function(a) {
            this._26 = a
        },
        setPrerollOnAir: function(a) {
            this._25 = a
        },
        setEventEnabled: function(a) {
            this._1H = a
        },
        setDisplayQuestions: function(a) {
            this._1J = a
        },
        setBroadcastersEnabled: function(a) {
            this._1P = a
        },
        setQuestionsEnabled: function(a) {
            this._1R = a
        },
        setQuestionsThrottled: function(a) {
            this._1V = a
        },
        setBroadcastersThrottled: function(a) {
            this._1W = a
        },
        setStatus: function(a) {
            this._1T = a
        },
        setStitchUrls: function(a) {
            var b = 2 > this.status() ? "live_rtmp" : "archive_rtmp";
            if (a = a[b]) a.high && a.high.h264 && a.high.h264.aac ? (this._1Z = a.high.h264.aac, "archive_rtmp" == b && (this._20 = !0)) : a.medium && a.medium.h264 && a.medium.h264.aac ? this._1Z = a.medium.h264.aac : a.low && (a.low.h264 && a.low.h264.aac) && (this._1Z = a.low.h264.aac)
        },
        startAtEpoch: function() {
            return this._1S
        },
        status: function() {
            return this._1T
        },
        visibility: function() {
            return this._1U
        },
        startTime: function() {
            return this._23
        },
        startTimeInSeconds: function() {
            return this.startTime() / 1E3
        },
        questionsAllowed: function() {
            return this.questionsEnabled() ? !this.questionsThrottled() : !1
        },
        broadcastersAllowed: function() {
            return this.broadcastersEnabled() ? !this.broadcastersThrottled() : !1
        },
        adModel: function() {
            return this._24
        },
        isAutoPlay: function() {
            return this._27
        },
        adOnAir: function() {
            return this.prerollOnAir() || this.midrollOnAir()
        }
    }),
    EventParticipationModel = BaseModel.extend({
        init: function(a, b) {
            this._super();
            this._29 = a;
            this._2a = b
        },
        action: function() {
            return this._29
        },
        user: function() {
            return this._2a
        },
        mobileData: function() {
            return {
                action: this.action(),
                user: this.user()
            }
        }
    }),
    FriendshipModel = BaseModel.extend({
        init: function(a) {
            this._super();
            null != a && (this._2b = a.id, this._2c = new UserModel(a.user), this._2d = a.state, this._2e = a.has_user_seen, this._2f = a.time)
        },
        deepCopy: function(a) {
            this._2b = a._2b;
            this._2c = a._2c;
            this._2d = a._2d;
            this._2e = a._2e;
            this._2f = a._2f
        },
        setUserSeen: function(a) {
            this._2e = a
        },
        id: function() {
            return this._2b
        },
        user: function() {
            return this._2c
        },
        state: function() {
            return this._2d
        },
        has_user_seen: function() {
            return this._2e
        },
        timestamp: function() {
            return this._2f
        }
    }),
    InstantMessageModel = BaseModel.extend({
        init: function(a) {
            this._super();
            this._2g = Number(a.from);
            this._2h = Number(a.to);
            this._2i = a.body;
            this._2j = Number(a.ts);
            this._2k = a.type;
            this._2l = a.room_link
        },
        fromUserAlt: function() {
            return this._2g
        },
        toUserAlt: function() {
            return this._2h
        },
        body: function() {
            return this._2i
        },
        timestamp: function() {
            return this._2j
        },
        type: function() {
            return this._2k
        },
        roomLink: function() {
            return this._2l
        }
    }),
    QuestionModel = BaseModel.extend({
        init: function(a) {
            null != a && (this._id = a.question_id, this._action = a.action, this._actionType = a.action_type, this._text = a.text, this._user = new UserModel(a.user), this._starTimestamp = a.starred_at, this._onAirTimestamp = a.on_air, this._offAirTimestamp = a.off_air, this._submittedTimestamp = a.submitted_at, this._score = a.score, this._votes = a.votes, this._voteTotal = a.vote_total)
        },
        action: function() {
            return this._action
        },
        actionType: function() {
            return 0 == this._actionType ? "explicit" : "implicit"
        },
        equals: function(a) {
            return !(this.lessThan(a) || a.lessThan(this))
        },
        id: function() {
            return this._id
        },
        lessThan: function(a) {
            return this._score != a._score ? this._score < a._score : this._submittedTimestamp == a._submittedTimestamp ? this.modelName() == a.modelName() ? this._id < a._id : "media_item" == this.modelName() : this._submittedTimestamp < a._submittedTimestamp
        },
        mobileData: function() {
            return {
                id: this.id(),
                text: this.text(),
                user: this.user().mobileData()
            }
        },
        modelName: function() {
            return "question"
        },
        myVote: function(a) {
            return this._votes[a]
        },
        starTimestamp: function() {
            return this._starTimestamp
        },
        offAirTimestamp: function() {
            return this._offAirTimestamp
        },
        onAirTimestamp: function() {
            return this._onAirTimestamp
        },
        same: function(a) {
            return this.id() == a.id() && this.modelName() == a.modelName()
        },
        score: function() {
            return this._score
        },
        submittedTimestamp: function() {
            return this._submittedTimestamp
        },
        text: function() {
            return this._text
        },
        user: function() {
            return this._user
        },
        voteTotal: function() {
            return this._voteTotal
        }
    }),
    RatioModel = BaseModel.extend({
        init: function(a) {
            this._2m = Ratio.ACTION_CROP;
            this._2n = a
        },
        action: function() {
            return this._2m
        },
        fitToHight: function() {
            return this._2n
        }
    }),
    StreamQualityModel = BaseModel.extend({
        init: function(a, b) {
            this._super();
            this._2o = Number(a.bitrate);
            this._2p = Number(a.display_quality);
            this._2q = Number(a.packet_loss);
            this._2r = Number(a.ping);
            this._2s = Number(a.stream_quality);
            this._2t = b
        },
        bitrate: function() {
            return this._2o
        },
        displayQuality: function() {
            return this._2p
        },
        packetLoss: function() {
            return this._2q
        },
        ping: function() {
            return this._2r
        },
        streamQuality: function() {
            return this._2s
        },
        userId: function() {
            return this._2t
        }
    }),
    UserModel = BaseModel.extend({
        init: function(a) {
            this._super();
            null != a && (this._2u = a.about_me, this._2v = a.action, this._2w = a.admin, this._2x = a.alt, this._2y = null == a.broadcast_status ? 0 : a.broadcast_status, this._2z = null == a.created_at ? 0 : a.created_at, this._2A = a.current_user, this._2B = a.email, this._2C = a.events, this._37(a.first_name), this._2E = a.flagged_users, this._2G = a.following_users, this._2F = a.followers, this._2H = a.has_been_authenticated, this._2J = a.idle, this._2K = a.is_banned, this._2L = a.is_connected, this._2M = a.is_followed, this._2N = a.online, this._2O = a.is_publishing, this._38(a.last_name), this._33 = null == a.starred_at ? -1 : a.starred_at, this._2R = null == a.microphone_gain_level ? 0 : a.microphone_gain_level / 100, this._2S = a.needs_to_confirm_email, this._2T = a.owner, this._2U = -1, this._2W = a.preview_location, null != a.preview_location && (this._2W = a.preview_location.replace("rtsp://", "rtmp://")), this._2X = a.producer, this._32 = a.role, this._39(a.profile_photo_thumb_url), this._31 = a.proposed_promotion, this._34 = a.stream_quality, this._35 = a.twitter_screen_name, this._2I = a.user_id, this._2V = a.presence_enabled, this._2P = a.device, this._36 = a.capabilities)
        },
        deepCopy: function(a) {
            this._2u = a._2u;
            this._2v = a._2v;
            this._2w = a._2w;
            this._2x = a._2x;
            this._2y = a._2y;
            this._2z = a._2z;
            this._2A = a._2A;
            this._2B = a._2B;
            this._2C = a._2C;
            this._37(a._2D);
            this._2E = a._2E;
            this._2G = a._2G;
            this._2F = a._2F;
            this._2H = a._2H;
            this._2I = a._2I;
            this._2J = a._2J;
            this._2K = a._2K;
            this._2L = a._2L;
            this._2M = a._2M;
            this._2O = a._2O;
            this._33 = a._33;
            this._38(a._2Q);
            this._2S = a._2S;
            this._2T = a._2T;
            this._2U = a._2U;
            this._2W = a._2W;
            this._2X = a._2X;
            this._31 = a._31;
            this._32 = a._32;
            this._39(a._2Y);
            this._34 = a._34;
            this._35 = a._35;
            this._2P = a._2P;
            this._36 = a._36
        },
        mobileData: function() {
            return {
                id: this.id(),
                name: this.name(),
                profilePhoto: this.profilePhotoThumbUrl_100x100()
            }
        },
        isPriority: function() {
            return 0 <= this.starredAt() || 0 < this.broadcastStatus() || 0 < this.proposedPromotion() || this.isPublishing()
        },
        isPublishing: function() {
            return this._2O
        },
        applyVideoSnapshot: function(a) {
            a && (a = a.userFeed(this.id()), this.setPane(null == a ? -1 : a.videoPane()))
        },
        setPane: function(a) {
            this._2U = a
        },
        aboutMe: function() {
            return this._2u
        },
        admin: function() {
            return this._2w
        },
        alt: function() {
            return this._2x
        },
        broadcastStatus: function() {
            return this._2y
        },
        createdAt: function() {
            return this._2z
        },
        email: function() {
            return this._2B
        },
        events: function() {
            return this._2C
        },
        firstName: function() {
            return this._2D
        },
        followers: function() {
            return this._2F
        },
        hasBeenAuthenticated: function() {
            return this._2H
        },
        id: function() {
            return this._2I
        },
        idle: function() {
            return this._2J
        },
        isBanned: function() {
            return this._2K
        },
        isConnected: function() {
            return this._2L
        },
        isFollowed: function() {
            return this._2M
        },
        isPresenceEnabled: function() {
            return this._2V
        },
        isGuest: function() {
            return !this._2H
        },
        capabilities: function() {
            return this._36
        },
        device: function() {
            return this._2P
        },
        lastName: function() {
            return this._2Q
        },
        microphoneGainLevel: function() {
            return this._2R
        },
        name: function() {
            return this._2D + ("" != this._2Q ? " " + this._2Q : "")
        },
        online: function() {
            return this._2N
        },
        owner: function() {
            return this._2T
        },
        isOnAir: function() {
            return -1 != this._2U
        },
        pane: function() {
            return this._2U
        },
        previewLocation: function() {
            return this._2W
        },
        validPreviewLocation: function() {
            return null != this.previewLocation() && "" != this.previewLocation()
        },
        profilePhotoThumbUrl: function() {
            return this._2Y
        },
        profilePhotoThumbUrl_70x70: function() {
            return this._2Z
        },
        profilePhotoThumbUrl_100x100: function() {
            return this._30
        },
        producer: function() {
            return this._2X
        },
        proposedPromotion: function() {
            return this._31
        },
        role: function() {
            return this._32
        },
        needsToConfirmEmail: function() {
            return this._2S
        },
        starredAt: function() {
            return this._33
        },
        setCapabilities: function(a) {
            this._36 = a
        },
        setIdle: function(a) {
            this._2J = a
        },
        setOnline: function(a) {
            this._2N = a
        },
        setPresenceEnabled: function(a) {
            this._2V = a
        },
        setRole: function(a) {
            this._32 = a
        },
        hasProfilePhoto: function() {
            return -1 == this.profilePhotoThumbUrl().indexOf("/noprofile") && -1 == this.profilePhotoThumbUrl().indexOf("/nopic") && this.hasBeenAuthenticated()
        },
        _37: function(a) {
            this._2D = null == a ? "" : a
        },
        _38: function(a) {
            this._2Q = null == a ? "" : a
        },
        _39: function(a) {
            this._2Y = a ? a : "";
            null != a && (this._2Z = a.replace("30x30", "70x70"), this._30 = a.replace("30x30", "100x100"))
        }
    }),
    VideoFeedModel = BaseModel.extend({
        init: function(a, b) {
            this._super();
            this._3a = a.facade();
            null != b && (this._3b = b.archive_buffer, this._3c = b.broadcaster_buffer, this._3d = b.broadcaster_prefix, this._3e = b.end_time_string, this._3f = b.source, this._3g = b.start_time_string, this._3h = b.state, this._3i = new UserModel(b.user), this._3i.setPane(b.video_pane), this._3j = b.video_pane, this._3k = b.video_uid, this._3l = b.video_uid_index, this._3m = b.viewer_buffer, this._3n = b.video_urls)
        },
        feedUrl: function(a, b) {
            if (null == this.videoUrls()) return this._3a.log(Level.WARNING, "VideoFeedModel#feedUrl: No video urls found at all"), null;
            var c = FeedType.urlKey(a);
            return !this.videoUrls().hasOwnProperty(c) ? (this._3a.log(Level.WARNING, "VideoFeedModel#feedUrl: No url for feed type", a, this.videoUrls()), null) : !this.videoUrls()[c].hasOwnProperty(b) ? (this._3a.log(Level.WARNING, "VideoFeedModel#feedUrl: No url for feed quality", a, b, this.videoUrls()), null) : this.videoUrls()[c][b].hasOwnProperty("NONE") ? this.videoUrls()[c][b].NONE.speex : this.videoUrls()[c][b].hasOwnProperty("h264") ? this.videoUrls()[c][b].h264.speex : this.videoUrls()[c][b].h263.speex
        },
        broadcastFeedUrl: function() {
            return this._3a.supportsH264() ? this.broadcasterPrefix() + ".h264_speex_medium" : this.broadcasterPrefix() + ".h263_speex_medium"
        },
        uniqueVideoUid: function() {
            return this._3k + "." + this._3l
        },
        broadcasterBuffer: function() {
            return this._3c
        },
        broadcasterPrefix: function() {
            return this._3d
        },
        archiveBuffer: function() {
            return this._3b
        },
        endTime: function() {
            return this._3e
        },
        source: function() {
            return this._3f
        },
        startTime: function() {
            return this._3g
        },
        state: function() {
            return this._3h
        },
        user: function() {
            return this._3i
        },
        videoPane: function() {
            return this._3j
        },
        setVideoPane: function(a) {
            this._3j = a
        },
        videoUid: function() {
            return this._3k
        },
        videoUidIndex: function() {
            return this._3l
        },
        videoUrls: function() {
            return this._3n
        },
        viewerBuffer: function() {
            return this._3m
        }
    }),
    VideoSnapshotModel = BaseModel.extend({
        init: function(a, b) {
            this._super();
            this._3s = [];
            if (null != b) {
                this._3o = b.action;
                this._3u = b.hasOwnProperty("layout") ? b.layout : VideoLayout.DEFAULT_LAYOUT;
                for (var c = 0; c < b.video_feeds.length; c++) this._3s.push(new VideoFeedModel(a, b.video_feeds[c]));
                this._3t = b.video_snapshot_number;
                this._3q = b.max_time_string
            }
        },
        userFeed: function(a) {
            for (var b = 0; b < this.numVideoFeeds(); b++) {
                var c = this.videoFeed(b);
                if (c.user().id() == a) return c
            }
            return null
        },
        audioUrls: function() {
            for (var a = {}, b = 0; b < this.numVideoFeeds(); b++) {
                var c = this.videoFeed(b),
                    d = c.feedUrl(FeedType.urlKey(FeedType.TRANSCODE_AUDIO), FeedQuality.MEDIUM);
                null != d && (a[c.user().id()] = d)
            }
            return a
        },
        action: function() {
            return this._3o
        },
        layout: function() {
            return this._3u
        },
        maxTimeString: function() {
            return this._3q
        },
        number: function() {
            return this._3t
        },
        videoFeeds: function() {
            return this._3s
        },
        numVideoFeeds: function() {
            return this._3s.length
        },
        videoFeed: function(a) {
            return this._3s[a]
        }
    }),
    VisibleUserChange = BaseModel.extend({
        init: function(a, b, c) {
            this._3E = b;
            this._3z = c;
            a && (this._3v = a.user().broadcastStatus(), this._3w = a.category(), this._3x = a.categoryPosition(), this._3y = a.globalPosition(), this._3A = a.user().isPublishing(), this._3B = 0 <= a.user().starredAt(), this._3C = a.user().pane(), this._3D = a.user().producer(), this._3F = a.user().proposedPromotion(), this._3G = a.userId())
        },
        changeType: function(a) {
            return !this._3G && !a ? UserChangeType.NONE : !a ? this._3z || this._3w === ViewerCategory.ONAIR ? UserChangeType.DELETE : UserChangeType.NONE : !this._3G ? this._3z || a.category() == ViewerCategory.ONAIR ? UserChangeType.INSERT : UserChangeType.NONE : !this._3z && this._3w != ViewerCategory.ONAIR && a.category() != ViewerCategory.ONAIR ? UserChangeType.NONE : this._3w != a.category() || this._3x != a.categoryPosition() || this._3y != a.globalPosition() ? this._3z ? UserChangeType.MOVE : this._3w === ViewerCategory.ONAIR ? a.category() === ViewerCategory.ONAIR ? UserChangeType.MOVE : UserChangeType.DELETE : UserChangeType.INSERT : this._3D != a.user().producer() || this._3C != a.user().pane() ? UserChangeType.UPDATE : !this._3E ? UserChangeType.NONE : this._3v != a.user().broadcastStatus() || this._3A != a.user().isPublishing() || this._3B != 0 <= a.user().starredAt() || this._3F != a.user().proposedPromotion() ? UserChangeType.UPDATE : UserChangeType.NONE
        },
        userId: function() {
            return this._3G
        }
    }),
    VisibleUserList = BaseModel.extend({
        init: function(a) {
            this._3H = [];
            this._3I = a
        },
        findUser: function(a) {
            for (var b = 0; b < this._3H.length; ++b) if (this._3H[b].userId() == a) return this._3H[b];
            return null
        },
        deleteUser: function(a) {
            for (var b = 0; b < this._3H.length; ++b) if (this._3H[b].userId() == a) {
                this._3H.splice(b, 1);
                this.reindex();
                break
            }
        },
        push: function(a) {
            a = new VisibleUserModel(a, this._3I);
            this._3H.push(a);
            return a
        },
        reindex: function() {
            var a, b = 0,
                c = null;
            for (a = 0; a < this._3H.length; a++, b++) {
                var d = this._3H[a];
                d.category() != c && (b = 0);
                d.setPositions(b, a);
                c = d.category()
            }
        },
        sort: function() {
            this._3H.sort(function(a, b) {
                return a.compare(b)
            });
            this.reindex()
        },
        userAt: function(a) {
            return a >= this._3H.length ? null : this._3H[a]
        },
        users: function(a) {
            if (null == a) return this._3H;
            for (var b = [], c = 0; c < this._3H.length; ++c) this._3H[c].category() === a && b.push(this._3H[c]);
            return b
        }
    }),
    VisibleUserListState = BaseModel.extend({
        init: function(a, b) {
            this._3J = [];
            for (var c = a.users(b), d = 0; d < c.length; ++d) this._3J.push(new VisibleUserState(c[d]))
        },
        equals: function(a) {
            if (this._3J.length != a._3J.length) return !1;
            for (var b = 0; b < this._3J.length; ++b) if (!this._3J[b].equals(a._3J[b])) return !1;
            return !0
        }
    }),
    VisibleUserModel = BaseModel.extend({
        init: function(a, b) {
            this._super();
            this._3O = a;
            this._3N = b;
            this.computeCategory();
            this._3M = this._3L = -1
        },
        category: function() {
            return this._3K
        },
        categoryPosition: function() {
            return this._3L
        },
        compare: function(a) {
            if (this._3K != a._3K) return this._3K === ViewerCategory.ONAIR ? -1 : a._3K === ViewerCategory.ONAIR ? 1 : this._3K === ViewerCategory.PRODUCER ? -1 : a._3K === ViewerCategory.PRODUCER ? 1 : this._3K === ViewerCategory.CAMERAQUEUE ? -1 : 1;
            if (!this._3N && this._3K == ViewerCategory.VIEWER && this._3O.broadcastStatus() != a._3O.broadcastStatus()) {
                if (2 == this._3O.broadcastStatus()) return -1;
                if (2 == a._3O.broadcastStatus()) return 1
            }
            return -1 != this._3O.starredAt() ? -1 != a._3O.starredAt() ? this._3O.starredAt() - a._3O.starredAt() : -1 : -1 != a._3O.starredAt() ? 1 : this._3O.hasProfilePhoto() ? a._3O.hasProfilePhoto() ? this._3O.alt() - a._3O.alt() : -1 : a._3O.hasProfilePhoto() ? 1 : this._3O.alt() - a._3O.alt()
        },
        computeCategory: function() {
            this._3K = -1 != this._3O.pane() ? ViewerCategory.ONAIR : this._3O.producer() ? ViewerCategory.PRODUCER : 2 == this._3O.broadcastStatus() && this._3N ? ViewerCategory.CAMERAQUEUE : ViewerCategory.VIEWER
        },
        globalPosition: function() {
            return this._3M
        },
        setPane: function(a) {
            this._3O.setPane(a);
            this.computeCategory()
        },
        setPositions: function(a, b) {
            this._3L = a;
            this._3M = b
        },
        setUser: function(a) {
            this._3O = a;
            this.computeCategory();
            this._3M = this._3L = -1
        },
        takeOffAir: function() {
            this._3O.setPane(-1);
            this.computeCategory()
        },
        user: function() {
            return this._3O
        },
        userId: function() {
            return this._3O.alt()
        }
    }),
    VisibleUserState = BaseModel.extend({
        init: function(a) {
            this._3P = a.category();
            this._3S = a.userId();
            this._3Q = a.user().hasProfilePhoto();
            this._3R = -1 != a.user().starredAt()
        },
        equals: function(a) {
            return this._3S != a._3S || this._3P != a._3P || this._3Q != a._3Q || this._3R != a._3R ? !1 : !0
        }
    }),
    VoteModel = BaseModel.extend({
        init: function(a) {
            this._super();
            this._3T = a.vote;
            this._3U = a.votable_id;
            this._3V = a.type
        },
        voteDirection: function() {
            return this._3T
        },
        votableId: function() {
            return this._3U
        },
        votableType: function() {
            return this._3V
        }
    }),
    ArchiveChunkController = SignalEmitter.extend({
        init: function(a, b, c, d, e) {
            this._3W = "ArchiveChunkController." + b;
            this._super(a, this._3W, ["INSERT", "REMOVE", "UPDATE"]);
            this.facade().log(Level.DEBUG, this._3W + "#init", d, e);
            this._3X = d;
            this._3Y = new ArchiveChunkIndexModel(e);
            this._40 = this._3Z = -1;
            this._41 = [];
            this._42 = -1;
            this._44 = {};
            this._45 = {};
            this._46 = {};
            this._48 = this._47 = 0;
            this._43 = c;
            this._49 = EcmaGlobals.MAX_ARCHIVE_CACHED_CHUNKS
        },
        checkTimestamp: function(a) {
            this.facade().log(Level.DEBUG, this._3W + "#checkTimestamp", a);
            this._42 = a;
            var b = this._3Y.findChunk(a);
            if (0 > b) this._4d();
            else {
                for (var c = this._4a(b), d = this._3X - 1, e = b - 1; 0 < e && 0 < d; e--) this._4a(e), d -= this._3Y.itemModel(e).numItems();
                if (c) this.facade().log(Level.DEBUG, this._3W + "#_updateView", "Last chunk not yet available");
                else if (d = this._3Y.itemModel(b), this._4e(d), b = this._3Z, c = this._40, this._40 = Util.arrayBinarySearch(this._41, {
                    timestamp: a
                }, function(a, b) {
                    return a.timestamp - b.timestamp
                }, !0, [d.startIndex(), d.startIndex() + d.numItems() - 1]), this._3Z = this._40 - this._3X + 1, 0 > this._3Z && (this._3Z = 0), !(this._3Z == b && this._40 == c)) if (this._3Z > c || this._40 < b) {
                    if (-1 < b) for (a = b; a <= c; a++) this.emit(this.signals.REMOVE, {
                        id: a
                    });
                    for (a = this._3Z; a <= this._40; a++) this.emit(this.signals.INSERT, {
                        id: a,
                        data: this._4c(a)
                    })
                } else {
                    for (a = this._40 + 1; a <= c; a++) this.emit(this.signals.REMOVE, {
                        id: a
                    });
                    for (a = c + 1; a <= this._40; a++) this.emit(this.signals.INSERT, {
                        id: a,
                        data: this._4c(a)
                    });
                    for (a = b; a < this._3Z; a++) this.emit(this.signals.REMOVE, {
                        id: a
                    });
                    for (a = b - 1; a >= this._3Z; a--) this.emit(this.signals.INSERT, {
                        id: a,
                        data: this._4c(a)
                    })
                }
            }
        },
        _4a: function(a) {
            this.facade().log(Level.DEBUG, this._3W + "#_requestChunkIfNeeded", a);
            var b = this._3Y.itemModel(a);
            if (this._41.hasOwnProperty(b.startIndex())) return this.facade().log(Level.DEBUG, this._3W + "#_requestChunkIfNeeded", a, "Data already loaded"), !1;
            if (this._44.hasOwnProperty(a)) return this.facade().log(Level.DEBUG, this._3W + "#_requestChunkIfNeeded", a, "Chunk already requested"), !0;
            if (null != b.data()) return this._4b(b, b.data()), !1;
            if (!EcmaGlobals.IS_UNIT_TESTER) {
                this._44[a] = !0;
                var c = this;
                this.$().ajax({
                    url: this._43 + b.url(),
                    dataType: "jsonp",
                    jsonpCallback: b.callback(),
                    success: function(a) {
                        c._4e(b);
                        c._4b(b, a)
                    }
                })
            }
            return !0
        },
        _4b: function(a, b) {
            this.facade().log(Level.DEBUG, this._3W + "#_handleChunk", a, b);
            delete this._44[a.chunkId()];
            if (this._41.hasOwnProperty(a.startIndex())) this.facade().log(Level.WARNING, this._3W + "#_handleChunk", "Data loaded but was already in memory", a, b);
            else {
                for (var c = 0; c < a.numItems(); c++) {
                    var d = c + a.startIndex();
                    d >= this._3Z && d <= this._40 && this.emit(this.signals.UPDATE, {
                        id: d,
                        data: b[c]
                    });
                    this._41[d] = b[c]
                }
                this.checkTimestamp(this._42)
            }
        },
        _4c: function(a) {
            return this._41.hasOwnProperty(a) ? this._41[a] : null
        },
        _4d: function() {
            this.facade().log(Level.DEBUG, this._3W + "#_reset");
            if (!(0 > this._3Z)) {
                for (var a = this._3Z; a <= this._40; a++) this.emit(this.signals.REMOVE, {
                    id: a
                });
                this._40 = this._3Z = -1
            }
        },
        _4e: function(a) {
            var b = a.startIndex();
            this._45.hasOwnProperty(b) || (this._48++, this._4f());
            this._45[b] = a;
            this._46[b] = this._47;
            this._47++
        },
        _4f: function() {
            for (; this._48 > this._49;) {
                var a, b = -1,
                    c;
                for (c in this._46) {
                    var d = this._46[c];
                    if (0 > b || d < b) a = c, b = d
                }
                b = this._45[a];
                for (d = 0; d < b.numItems(); d++) delete this._41[d + b.startIndex()];
                delete this._45[a];
                delete this._46[a];
                this._48--
            }
        },
        TEST_handleChunk: function(a, b) {
            this._4b(this._3Y.itemModel(this._3Y.findChunk(a)), b)
        },
        TEST_setMaxCachedChunks: function(a) {
            this._49 = a
        },
        TEST_arrayItems: function() {
            return this._41
        }
    }),
    BaseController = SignalEmitter.extend({
        init: function(a, b, c) {
            this._super(a, b, c)
        },
        _sendCommand: function(a, b, c, d, e, f) {
            var g = this;
            this.$().ajax({
                url: EcmaGlobals.ROOT_URL + b + ".json",
                type: c,
                data: d,
                dataType: "json",
                success: function(b) {
                    g.facade().log(Level.INFO, "BaseController#_sendCommand success", a);
                    null != e && e(b)
                },
                error: function(a, b, c) {
                    g.facade().log(Level.WARNING, "BaseController#_sendCommand ajax error");
                    null != f && f(a, b, c)
                }
            })
        }
    }),
    BroadcastController = BaseController.extend({
        init: function(a, b) {
            this._super(a, "BroadcastController", ["VIDEO_SNAPSHOT", "STREAM_QUALITY"]);
            this._4g = b;
            this._4h = null
        },
        initLive: function(a) {
            this.facade().log(Level.DEBUG, "BroadcastController#initLive");
            var b = this;
            null != this._4g.messageController() && (this._4g.messageController().subscribe(this._4g.messageController().signals.MESSAGE_VIDEO_SNAPSHOT, function(a) {
                b._4j(a)
            }), this._4g.messageController().subscribe(this._4g.messageController().signals.MESSAGE_STREAM_QUALITY, function(a) {
                b._4k(a)
            }));
            0 < a.length && this._4j(a[a.length - 1].video_snapshot)
        },
        initArchive: function(a, b) {
            this.facade().log(Level.DEBUG, "BroadcastController#setArchiveData", a, b);
            var c = this;
            this._4g.subscribe(this._4g.signals.ARCHIVE_TIMESTAMP, function(a) {
                c._4l(a.timestamp)
            });
            this._4i = new ArchiveChunkController(this.ecma(), "Broadcast", a, 1, b);
            this._4i.subscribe(this._4i.signals.INSERT, function(a) {
                c._4j(a.data.video_snapshot)
            })
        },
        broadcasters: function() {
            var a = [];
            if (null != this.videoSnapshotModel()) for (var b = 0; b < this.videoSnapshotModel().numVideoFeeds(); b++) a.push(this.videoSnapshotModel().videoFeed(b).user());
            return a
        },
        getPane: function(a) {
            for (var b = this.broadcasters(), c = 0; c < b.length; c++) if (b[c].id() == a) return c;
            return -1
        },
        getUserByPane: function(a) {
            return this.broadcasters()[a]
        },
        start: function(a) {
            this._sendCommand("BRoadcastController#start", "/event_participations/start_broadcast", "POST", {
                event_id: this._4g.id(),
                user_id: a
            }, null)
        },
        end: function(a) {
            if (null == this.videoSnapshotModel()) this.facade().log(Level.WARNING, "End broadcast called when current snapshot is null");
            else {
                var b = this.videoSnapshotModel().userFeed(a);
                null == b ? this.facade().log(Level.WARNING, "End broadcast called for user not in snapshot", a) : this._sendCommand("BroadcastController#end", "/event_participations/end_broadcast", "POST", {
                    event_id: this._4g.id(),
                    user_id: a,
                    video_uid: b.videoUid(),
                    video_uid_index: b.videoUidIndex()
                }, null)
            }
        },
        thumbs: function(a, b) {
            this._sendCommand("BroadcastController#thumb", "/event_actions", "POST", {
                "event_action[action]": "thumbs",
                "event_action[value]": b,
                "event_action[event_id]": this._4g.id(),
                "event_action[user_id]": this.broadcasters()[a].alt()
            }, null)
        },
        micGain: function(a) {
            this._sendCommand("BroadcastController#micGain", "/event_participations/set_microphone_gain_level", "POST", {
                event_id: this._4g.id(),
                microphone_gain_level: Math.floor(100 * a)
            }, null)
        },
        promotionAccept: function() {
            this._sendCommand("BroadcastController#promotionAccept", "/event_participations/respond_to_promotion", "POST", {
                event_id: this._4g.id(),
                promotion: PromotionType.BROADCASTER,
                response: PromotionResponse.ACCEPTED
            }, null)
        },
        promotionRefuse: function() {
            this._sendCommand("BroadcastController#promotionRefuse", "/event_participations/respond_to_promotion", "POST", {
                event_id: this._4g.id(),
                promotion: PromotionType.BROADCASTER,
                response: PromotionResponse.REFUSED
            }, null)
        },
        request: function(a) {
            this._sendCommand("BroadcastController#request", "/rt/streams/create", "POST", {
                event_id: this._4g.id()
            }, null, a)
        },
        withdraw: function(a) {
            this.facade().log(Level.DEBUG, "BroadcastController#withdraw", a);
            if (null == this.videoSnapshotModel()) this.facade().log(Level.WARNING, "BroadcastController#withdraw", a, "Received when video snapshot is null");
            else {
                null == a && (a = this._4g.user().id());
                var b = this.videoSnapshotModel().userFeed(a);
                null == b ? (this.facade().log(Level.DEBUG, "BroadcastController#withdraw", a, "Called on user who is not on air"), this._sendCommand("BroadcastController#withdraw", "/event_actions", "POST", {
                    "event_action[event_id]": this._4g.id(),
                    "event_action[user_id]": a,
                    "event_action[action]": EventAction.WITHDRAW_BROADCAST
                }, null)) : (this.facade().log(Level.DEBUG, "BroadcastController#withdraw", a, "Called on user who is on air"), this._sendCommand("BroadcastController#withdraw", "/event_actions", "POST", {
                    "event_action[event_id]": this._4g.id(),
                    "event_action[user_id]": a,
                    "event_action[action]": EventAction.WITHDRAW_BROADCAST,
                    "event_action[video_uid]": b.videoUid(),
                    "event_action[video_uid_index]": b.videoUidIndex()
                }, null))
            }
        },
        videoSnapshotModel: function() {
            return this._4h
        },
        _4j: function(a) {
            this.facade().log(Level.DEBUG, "BroadcastController#_handleVideoSnapshotMessage", a);
            this._4h = new VideoSnapshotModel(this.ecma(), a);
            this.emit(this.signals.VIDEO_SNAPSHOT, this._4h)
        },
        _4k: function(a) {
            this.facade().log(Level.DEBUG, "BroadcastController#_handleStreamQualityMessage", a);
            this.emit(this.signals.STREAM_QUALITY, new StreamQualityModel(a, this._4g.user().alt()))
        },
        _4l: function(a) {
            this.facade().log(Level.DEBUG, "BroadcastController#_handleArchiveTimestamp", a);
            this._4i.checkTimestamp(a);
            0 == a && this._4j(null)
        },
        TEST_handleVideoSnapshotMessage: function(a) {
            this._4j(a)
        },
        TEST_handleStreamQualityMessage: function(a) {
            this._4k(a)
        }
    }),
    ChatController = BaseController.extend({
        init: function(a, b, c) {
            this._super(a, "ChatController", "INSERT REMOVE ENABLED FORBIDDEN PRIVATE_CHAT PRODUCER_CHAT MODERATOR_CHAT".split(" "));
            this._4m = b;
            this._4n = c;
            this._4p = [];
            this._4o = [];
            this._4q = null;
            this._4r = {};
            this._4s = {};
            this._4u = [];
            this._4v = {};
            this._4t = !1;
            var d = this;
            b.subscribe(b.signals.ARCHIVE_TIMESTAMP, function(a) {
                d._4B(a.timestamp)
            })
        },
        initLive: function(a) {
            this.facade().log(Level.DEBUG, "ChatController#initLive");
            var b = this;
            null != this._4m.messageController() && (this._4m.messageController().subscribe(this._4m.messageController().signals.MESSAGE_CHAT, function(a) {
                b._4w(a)
            }), this._4m.subscribe(this._4m.signals.EVENT_ENABLED, function() {
                b.emit(b.signals.ENABLED, {})
            }));
            for (var c = 0; c < a.length; c++) this._4w(a[c])
        },
        initArchive: function(a, b, c, d) {
            this.facade().log(Level.DEBUG, "ChatController#setArchiveData", a, b, c, d);
            var e = this;
            this._4q = new ArchiveChunkController(this.ecma(), "Chat", a, EcmaGlobals.MAX_CHATS, b);
            this._4q.subscribe(this._4q.signals.INSERT, function(a) {
                e._4C(a)
            });
            this._4q.subscribe(this._4q.signals.REMOVE, function(a) {
                e._4D(a)
            });
            this._4q.subscribe(this._4q.signals.UPDATE, function(a) {
                e._4E(a)
            });
            for (a = 0; a < c.length; a++) this._4r[c[a]] = !0;
            for (a = 0; a < d.length; a++) this._4s[d[a]] = !0
        },
        play: function() {
            if (this._4t) {
                for (this._4t = !1; this._4u.length;) {
                    var a = this._4u.shift();
                    this._4v[a.id()] || this._4A(a)
                }
                this._4v = {}
            } else this.facade().log(Level.WARNING, "Chats are already playing")
        },
        pause: function() {
            this._4t ? this.facade().log(Level.WARNING, "Chats have already been paused") : (this._4t = !0, this._4u = [])
        },
        submit: function(a, b, c) {
            a = {
                "chat[event_id]": this._4m.id(),
                "chat[action]": b,
                "chat[text]": a
            };
            this._4m.user().role() && (a["chat[role]"] = this._4m.user().role());
            null != c && (a["chat[recipient_friendly_id]"] = c);
            var d = this;
            this._sendCommand("ChatController#submit", "/rt/chats/create", "POST", a, null, function() {
                d.emit(d.signals.FORBIDDEN, {})
            })
        },
        _4w: function(a) {
            this.facade().log(Level.DEBUG, "chatController#handleChatMessage", a);
            var b;
            switch (a.action) {
                case "viewer":
                    a = new ChatModel(a);
                    this._4A(a);
                    break;
                case "delete_viewer":
                    this._4t && (this._4v[a.id] = !0);
                    for (b = 0; b < this._4o.length; b++) if (this._4o[b].id() == a.id) {
                        this.emit(this.signals.REMOVE, {
                            id: a.id
                        });
                        this._4o.splice(b, 1);
                        break
                    }
                    break;
                case "delete_all":
                    for (b = this._4o.length - 1; 0 <= b; b--) this._4o[b].user().id() == a.user_id && (this.emit(this.signals.REMOVE, {
                        id: this._4o[b].id()
                    }), this._4o.splice(b, 1));
                    break;
                case "producer-to-user":
                    a = new ChatModel(a);
                    this._4z(a);
                    break;
                case "producer":
                    a = new ChatModel(a);
                    this._4x(a);
                    break;
                case "moderator":
                    a = new ChatModel(a), this._4y(a)
            }
        },
        _4x: function(a) {
            this.facade().log(Level.DEBUG, "chatController#handleProducerChat", a);
            this.emit(this.signals.PRODUCER_CHAT, a)
        },
        _4y: function(a) {
            this.facade().log(Level.DEBUG, "chatController#handleModeratorChat", a);
            this.emit(this.signals.MODERATOR_CHAT, a)
        },
        _4z: function(a) {
            this.facade().log(Level.DEBUG, "chatController#handlePrivateChat", a);
            this.emit(this.signals.PRIVATE_CHAT, a)
        },
        _4A: function(a) {
            this.facade().log(Level.DEBUG, "chatController#handleViewerChat", a);
            if (this._4t) for (this._4u.push(a); this._4u.length > this._4n;) this._4u.shift();
            else this._4o.length >= this._4n && this.emit(this.signals.REMOVE, {
                id: this._4o.pop().id()
            }), this.emit(this.signals.INSERT, {
                data: a,
                position: 0
            }), this._4o.unshift(a)
        },
        _4B: function(a) {
            this.facade().log(Level.DEBUG, "ChatController#_handleArchiveTimestamp", a);
            this._4q && this._4q.checkTimestamp(a)
        },
        _4C: function(a) {
            this.facade().log(Level.DEBUG, "ChatController#_handleInsert", a);
            if (null != a.data) {
                var b = new ChatModel(a.data);
                if (!this._4r.hasOwnProperty(b.user().id()) && !this._4s.hasOwnProperty(b.id())) {
                    var c = Util.arrayBinarySearch(this._4p, a.id, function(a, b) {
                        return b - a
                    }, !0, null);
                    c++;
                    this._4p.splice(c, 0, a.id);
                    this._4o[a.id] = b;
                    this.emit(this.signals.INSERT, {
                        position: c,
                        data: b
                    })
                }
            }
        },
        _4D: function(a) {
            this.facade().log(Level.DEBUG, "ChatController#_handleRemove", a);
            var b = Util.arrayBinarySearch(this._4p, a.id, function(a, b) {
                return b - a
            }, !1, null); - 1 == b ? this.facade().log(Level.INFO, "ChatController#_handleRemove", "Invalid position. Maybe a deleted message?", a) : (a = this._4p[b], this._4p.splice(b, 1), this.emit(this.signals.REMOVE, {
                id: this._4o[a].id()
            }), delete this._4o[a])
        },
        _4E: function(a) {
            this.facade().log(Level.DEBUG, "ChatController#_handleUpdate", a);
            var b = new ChatModel(a.data);
            if (!this._4r.hasOwnProperty(b.user().id()) && !this._4s.hasOwnProperty(b.id())) {
                var c = Util.arrayBinarySearch(this._4p, a.id, function(a, b) {
                    return b - a
                }, !0, null);
                this._4p[c] == a.id ? this.facade().log(Level.WARNING, "ChatController#_handleUpdate", "Chat already exists") : (c++, this._4p.splice(c, 0, a.id), this._4o[a.id] = b, this.emit(this.signals.INSERT, {
                    position: c,
                    data: b
                }))
            }
        },
        TEST_handleChatMessage: function(a) {
            this._4w(a)
        },
        TEST_setMaxChats: function(a) {
            this._4n = a
        },
        TEST_handleInsert: function(a) {
            this._4C(a)
        },
        TEST_handleRemove: function(a) {
            this._4D(a)
        },
        TEST_handleUpdate: function(a) {
            this._4E(a)
        },
        TEST_handleArchiveTimestamp: function(a) {
            this._4B(a)
        }
    }),
    EventController = BaseController.extend({
        init: function(a, b, c, d, e, f, g, h) {
            this._super(a, "EventController", "ARCHIVE_TIMESTAMP MY_USER_UPDATED CAMERA_ACTIVATED START END MY_EP_NEW EVENT_PARTICIPATION STITCH_AVAILABLE USER_BANNED BROADCASTERS_ALLOWED QUESTIONS_ALLOWED DISPLAY_QUESTIONS EVENT_ENABLED SCORE_RECEIVED".split(" "));
            this._4G = c;
            this._4J = f;
            this._4K = g;
            this._4L = h;
            this._4N = new BroadcastController(a, this);
            this._4P = new ChatController(a, this, EcmaGlobals.MAX_CHATS);
            this._4O = new VoteController(a, this);
            this._4R = a.loggingController();
            this._4S = new MediaController(a, this);
            this._4U = new ProducerController(a, this);
            this._4V = new QuestionController(a, this);
            this._4W = new UserController(a, this);
            this._4M = new AdController(a, this);
            this._4I = !1;
            if (null == b) this._4I = !0, this.facade().log(Level.DEBUG, "EventController#EventController", "Skipping messageController. This better be a tester");
            else if (this._4T = b, null != d) this._4Y(d, e);
            else {
                var j = this;
                this.$().ajax({
                    url: "/events/" + c + ".json",
                    type: "GET",
                    dataType: "json",
                    success: function(a) {
                        j._4Y(a, e)
                    }
                })
            }
        },
        close: function() {
            this.mediaController().unsubscribeAll();
            this.broadcastController().unsubscribeAll();
            this.questionController().unsubscribeAll();
            this.chatController().unsubscribeAll();
            this.visibleUsersController().unsubscribeAll();
            this.producerController().unsubscribeAll();
            this.unsubscribeAll()
        },
        setArchiveTimestamp: function(a) {
            this.isArchive() ? this.emit(this.signals.ARCHIVE_TIMESTAMP, {
                timestamp: a
            }) : this.facade().log(Level.WARNING, "EventController#setArchiveTimestamp", "Event not in archive mode")
        },
        user: function() {
            return this._4H
        },
        event: function() {
            return this._4F
        },
        isTester: function() {
            return this._4I
        },
        isProducer: function() {
            return this.user().producer()
        },
        isPreStart: function() {
            return this._4F.status() == EventStatus.PRE_START
        },
        isLive: function() {
            return this._4J
        },
        isStarted: function() {
            return this._4F.status() == EventStatus.STARTED
        },
        isEnded: function() {
            return this._4F.status() == EventStatus.ENDED || this._4F.status() == EventStatus.EXTENDED
        },
        isArchive: function() {
            return !this.isLive()
        },
        id: function() {
            return null == this._4F ? this._4G : this._4F.id()
        },
        adController: function() {
            return this._4M
        },
        broadcastController: function() {
            return this._4N
        },
        chatController: function() {
            return this._4P
        },
        voteController: function() {
            return this._4O
        },
        visibleUsersController: function() {
            return this._4Q
        },
        loggingController: function() {
            return this._4R
        },
        mediaController: function() {
            return this._4S
        },
        messageController: function() {
            return this._4T
        },
        producerController: function() {
            return this._4U
        },
        questionController: function() {
            return this._4V
        },
        userController: function() {
            return this._4W
        },
        create: function(a, b, c, d, e, f, g, h) {
            this._sendCommand("EventController#create", "/events", "POST", {
                "event[channel_id]": a,
                "event[date]": b,
                "event[visibility]": c,
                "event[name]": d,
                "event[start_time]": e,
                "event[starts_now]": f,
                "event[time_zone]": g
            }, h)
        },
        cancel: function(a) {
            this._sendCommand("EventController#cancel", "/events/" + this.id() + "/cancel", "PUT", {}, a)
        },
        start: function(a) {
            this._sendCommand("EventController#start", "/events/" + this.id() + "/event_status_update", "PUT", {
                event_action: "start"
            }, a)
        },
        end: function(a) {
            this._sendCommand("EventController#end", "/events/" + this.id() + "/event_status_update", "PUT", {
                event_action: "end"
            }, a)
        },
        rsvp: function() {
            this._sendCommand("EventController#rsvp", "/following", "POST", {
                item: "Event",
                id: this.id()
            }, null)
        },
        shareId: function(a) {
            return "facebook" == a ? a : this._4X(a)
        },
        _4X: function(a) {
            return a + "_" + this.ecma().sessionId()
        },
        registerShare: function(a, b, c) {
            a = {
                uuid: this._4X(b),
                shared_url: a,
                social_network: b,
                state: c
            };
            this._sendCommand("EventController#registerShare", "/shares/register", "POST", a, null)
        },
        _4Y: function(a, b) {
            this._4R.setServerResponse(a);
            this._4F = new EventModel(a);
            this._4K && (a.user_data.user.broadcast_status = 0, a.user_data.user.producer = !1);
            this._4H = new UserModel(a.user_data.user);
            this._4Q = new VisibleUsersController(this.ecma(), this);
            null != b && b(this);
            var c = this;
            this.isLive() ? (this.adController().initLive(), this.mediaController().initLive(a.digest.stitch_urls), this.broadcastController().initLive(a.digest.video_digest.video_snapshots), this.questionController().initLive(a.digest.question_currently_on_air, a.digest.questions, a.digest.media_item_currently_on_air, a.digest.media_items, this.event().questionsAllowed()), this.event().status() == EventStatus.EXTENDED ? "flash" != this.ecma().device() && (this.chatController().initLive(a.digest.extended_chat_digest), this.visibleUsersController().initLive(a.digest.extended_visible_users)) : "flash" != this.ecma().device() && (this.chatController().initLive(a.digest.chat_digest.viewer), this.visibleUsersController().initLive(a.digest.visible_users)), this.isProducer() && this.producerController().initLive(a.digest, this.event()), this.emit(this.signals.BROADCASTERS_ALLOWED, {
                set: this.event().broadcastersAllowed()
            }), this.emit(this.signals.QUESTIONS_ALLOWED, {
                set: this.event().questionsAllowed()
            }), this.emit(this.signals.DISPLAY_QUESTIONS, {
                set: this.event().displayQuestions()
            }), this.event().eventEnabled() && this.emit(this.signals.EVENT_ENABLED, {}), this.messageController().subscribe(this.messageController().signals.MESSAGE_EVENT, function(a) {
                switch (a.action) {
                    case "start":
                        c._4F.setStatus(EventStatus.STARTED);
                        c.emit(c.signals.START, {});
                        break;
                    case "end":
                        c._4F.setStatus(a.extended ? EventStatus.EXTENDED : EventStatus.ENDED);
                        c.emit(c.signals.END, a);
                        break;
                    case "producer_users":
                        c._4Z(a.producer_users);
                        break;
                    case "broadcast_settings":
                        c._51(a);
                        break;
                    case "stitch_available":
                        c.event().setStitchUrls(a.urls);
                        c.emit(c.signals.STITCH_AVAILABLE, a.urls);
                        break;
                    case "enabled":
                        c.event().setEventEnabled(true);
                        c.emit(c.signals.EVENT_ENABLED, {});
                        break;
                    default:
                        c.facade().log(Level.WARNING, "EventController#_handleServerResponse", "Unrecognized message received", a)
                }
            }), this.messageController().subscribe(this.messageController().signals.MESSAGE_EVENT_PARTICIPATION, function(a) {
                c._52(a)
            }), "flash" != this.ecma().device() && this.messageController().subscribe(this.messageController().signals.MESSAGE_VOTES, function(a) {
                c.emit(c.signals.SCORE_RECEIVED, a.data)
            }), this.broadcastController().subscribe(this.broadcastController().signals.VIDEO_SNAPSHOT, function(a) {
                for (var b = -1, f = 0; f < a.numVideoFeeds(); f++) if (a.videoFeed(f).user().id() == c._4H.id()) {
                    b = a.videoFeed(f).videoPane();
                    break
                }
                if (b != c._4H.pane()) {
                    a = new UserModel(null);
                    a.deepCopy(c._4H);
                    c._4H.setPane(b);
                    c.emit(c.signals.MY_USER_UPDATED, {
                        oldUser: a,
                        newUser: c._4H
                    })
                }
            }), this._50(), this._4Z(a.digest.producer_users)) : this.isArchive() && a.digest.archive_chunk_index && (this.messageController().subscribe(this.messageController().signals.MESSAGE_EVENT, function(a) {
                if (a.action == "stitch_available") {
                    c.event().setStitchUrls(a.urls);
                    c.emit(c.signals.STITCH_AVAILABLE, a.urls)
                }
            }), this.adController().initArchive(a.digest.archive_chunk_index.base_url, a.digest.archive_chunk_index.ads), this.broadcastController().initArchive(a.digest.archive_chunk_index.base_url, a.digest.archive_chunk_index.video_snapshots), this.chatController().initArchive(a.digest.archive_chunk_index.base_url, a.digest.archive_chunk_index.chats, a.digest.archive_chunk_index.banned_users, a.digest.archive_chunk_index.banned_chats), this.questionController().initArchive(a.digest.archive_chunk_index.base_url, a.digest.archive_chunk_index.questions, a.digest.archive_chunk_index.media_items), this.visibleUsersController().initArchive(a.digest.archive_chunk_index.base_url, a.digest.archive_chunk_index.visible_users, a.digest.initial_visible_users), this.mediaController().initArchive(a.digest.stitch_urls), this.setArchiveTimestamp(0))
        },
        _4Z: function(a) {
            for (var b = 0; b < a.length; b++) {
                var c = new UserModel(a[b]);
                c.applyVideoSnapshot(this.broadcastController().videoSnapshotModel());
                this.emit(this.signals.EVENT_PARTICIPATION, new EventParticipationModel("new", c))
            }
        },
        _50: function() {
            var a = this;
            null != this._4T && (this._4T.subscribe(this._4T.signals.MESSAGE_PARTICIPANT_LIFECYCLE, function() {
                a.facade().log(Level.WARNING, "Not implemented")
            }), this._4T.subscribe(this._4T.signals.MESSAGE_USER, function() {
                a.facade().log(Level.WARNING, "Not implemented")
            }), this._4T.subscribe(this._4T.signals.MESSAGE_DESTINATION_USER_ID, function() {
                a.facade().log(Level.WARNING, "Not implemented")
            }))
        },
        _51: function(a) {
            switch (a.feature) {
                case "feature_throttled":
                    this._57(a);
                    break;
                case "questions_enabled":
                    this._58(a);
                    break;
                case "broadcasters_enabled":
                    this._59(a);
                    break;
                case "display_questions":
                    this._5a(a);
                    break;
                default:
                    this.facade().log(Level.WARNING, "EventController#_handleBroadcastSettings", "Unrecognized setting received", a)
            }
        },
        _52: function(a) {
            this._4K && (a.user.broadcast_status = 0, a.user.producer = !1);
            var b = this._53(a);
            if (this._54(a.action, b.user())) this.facade().log(Level.INFO, "EventController#callback", "Empty preview location but I should be broadcasting. Sending first heartbeat."), this._4T.sendFirstHeartbeat();
            else {
                if (b.user().id() == this.user().id()) {
                    var c = {
                        newUser: b.user(),
                        oldUser: this._4H
                    };
                    this._55(a, c);
                    this._4H = b.user();
                    this.emit(this.signals.MY_USER_UPDATED, c)
                }
                "update" == a.action && b.user().isBanned() && this.emit(this.signals.USER_BANNED, {
                    user_id: b.user().id()
                });
                this.emit(this.signals.EVENT_PARTICIPATION, b)
            }
        },
        _53: function(a) {
            this.facade().log(Level.DEBUG, "EventController#_eventParticipationModelFor", a);
            var b = new UserModel(a.user);
            b.applyVideoSnapshot(this.broadcastController().videoSnapshotModel());
            return new EventParticipationModel(a.action, b)
        },
        _54: function(a, b) {
            var c = this.isLive() && 0 < b.broadcastStatus() && !b.validPreviewLocation();
            return "new" == a && b.id() == this.user().id() && c
        },
        _55: function(a, b) {
            "new" == a.action ? this.emit(this.signals.MY_EP_NEW, a) : ("update" == a.action || "reconnect" == a.action) && !this.isEnded() && this._56(b, a.user.preview_location)
        },
        _56: function(a, b) {
            2 == a.newUser.broadcastStatus() && a.newUser.validPreviewLocation() ? (0 == a.oldUser.broadcastStatus() || a.oldUser.previewLocation() != a.newUser.previewLocation()) && this.emit(this.signals.CAMERA_ACTIVATED, {
                set: !0,
                previewLocation: b
            }) : 0 == a.newUser.broadcastStatus() && 2 == a.oldUser.broadcastStatus() && this.emit(this.signals.CAMERA_ACTIVATED, {
                set: !1
            })
        },
        _57: function(a) {
            "broadcasters" == a.setting ? (this.event().setBroadcastersThrottled(a.value), this.emit(this.signals.BROADCASTERS_ALLOWED, {
                throttled: a.value,
                set: this.event().broadcastersAllowed()
            })) : "questions" == a.setting ? (this.event().setQuestionsThrottled(a.value), this.emit(this.signals.QUESTIONS_ALLOWED, {
                throttled: a.value,
                set: this.event().questionsAllowed()
            })) : this.facade().log(Level.WARNING, "EventController#_handleFeatureThrottled", "Unrecognized setting received", a)
        },
        _58: function(a) {
            0 == a.value ? (this.event().setQuestionsEnabled(!1), this.emit(this.signals.QUESTIONS_ALLOWED, {
                throttled: !1,
                set: this.event().questionsAllowed()
            })) : 1 == a.value ? (this.event().setQuestionsEnabled(!0), this.emit(this.signals.QUESTIONS_ALLOWED, {
                throttled: !1,
                set: this.event().questionsAllowed()
            })) : this.facade().log(Level.WARNING, "EventController#_handleQuestionsEnabled", "Unrecognized value received", a)
        },
        _59: function(a) {
            0 == a.value ? (this.event().setBroadcastersEnabled(!1), this.emit(this.signals.BROADCASTERS_ALLOWED, {
                set: !1
            })) : 1 == a.value ? (this.event().setBroadcastersEnabled(!0), this.emit(this.signals.BROADCASTERS_ALLOWED, {
                set: !0
            })) : this.facade().log(Level.WARNING, "EventController#_handleJoinable", "Unrecognized value received", a)
        },
        _5a: function(a) {
            this.emit(this.signals.DISPLAY_QUESTIONS, {
                set: a.value
            });
            this.event().setDisplayQuestions(a.value)
        },
        TEST_handleServerResponse: function(a) {
            this._4Y(a, null)
        },
        TEST_setEventModel: function(a) {
            this._4F = a
        },
        TEST_handleBroadcastSettings: function(a) {
            this._51(a)
        },
        TEST_handleEventParticipationMessage: function(a) {
            this._52(a)
        },
        TEST_startEvent: function() {
            this._4F.setStatus(EventStatus.STARTED);
            this.emit(this.signals.START, {})
        },
        TEST_endEvent: function() {
            this._4F.setStatus(EventStatus.ENDED);
            this.emit(this.signals.END, {})
        },
        TEST_setUser: function(a) {
            this._4H = a
        }
    }),
    FriendshipController = BaseController.extend({
        init: function(a, b, c, d, e, f, g) {
            var h = this;
            this._super(a, "FriendshipController", ["UPDATE_FRIEND_LISTS", "UPDATE_FRIEND_NOTIFICATION"]);
            this._5c = b;
            this._buddyList = [];
            this._5e = [];
            this._5d = [];
            this._notificationCount = 0;
            null != f && (this._5b = new UserModel(f));
            null != g && g(this);
            for (a = 0; a < d.length; a++) this._5e[a] = new FriendshipModel(d[a]);
            for (a = 0; a < e.length; a++) {
                this._5d[a] = new FriendshipModel(e[a]);
                for (d = 0; d < c.length; d++) f = new UserModel(c[a]), this._5d[a].user().alt() === f.alt() && this._5d[a].user().setOnline(!0)
            }
            this._5p();
            this._5q();
            null != this._5c && (this._5c.subscribe(this._5c.signals.MESSAGE_FRIENDSHIP, function(a) {
                h._5m(a)
            }), this._5c.subscribe(this._5c.signals.MESSAGE_PRESENCE, function(a) {
                h._5n(a)
            }))
        },
        close: function() {
            this.unsubscribeAll()
        },
        messageController: function() {
            return this._5c
        },
        user: function() {
            return this._5b
        },
        getNumFriendRequests: function() {
            return this._5e.length
        },
        getNumFriendAccepts: function() {
            return this._5d.length
        },
        _5f: function(a, b) {
            return a.timestamp() == b.timestamp() ? a.user().name().localeCompare(b.user().name()) : a.timestamp() > b.timestamp() ? -1 : 1
        },
        _5g: function(a) {
            var a = new FriendshipModel(a),
                b = Util.arrayBinarySearch(this._5d, a, this._5f, !0, null);
            b++;
            this._5d.splice(b, 0, a);
            a = this._5d.slice(0, Math.min(this._5d.length, 3));
            b = this._5e.slice(0, Math.min(this._5e.length, 6 - a.length));
            this.emit(this.signals.UPDATE_FRIEND_LISTS, {
                friendRequests: b,
                friendAccepts: a
            });
            this._5q()
        },
        _5h: function(a) {
            var a = new FriendshipModel(a),
                b = Util.arrayBinarySearch(this._5e, a, this._5f, !0, null);
            b++;
            this._5e.splice(b, 0, a);
            a = this._5d.slice(0, Math.min(this._5d.length, 3));
            b = this._5e.slice(0, Math.min(this._5e.length, 6 - a.length));
            this.emit(this.signals.UPDATE_FRIEND_LISTS, {
                friendRequests: b,
                friendAccepts: a
            });
            this._5q()
        },
        _5i: function(a) {
            for (var b = -1, c = 0; c < this._5d.length; c++) if (this._5d[c].id() == a) {
                b = c;
                break
            } - 1 != b && (this._5d.splice(b, 1), a = this._5d.slice(0, Math.min(this._5d.length, 3)), b = this._5e.slice(0, Math.min(this._5e.length, 6 - a.length)), this.emit(this.signals.UPDATE_FRIEND_LISTS, {
                friendRequests: b,
                friendAccepts: a
            }), this._5q())
        },
        _5j: function(a) {
            for (var b = -1, c = 0; c < this._5e.length; c++) if (this._5e[c].id() == a) {
                b = c;
                break
            } - 1 != b && (this._5e.splice(b, 1), a = this._5d.slice(0, Math.min(this._5d.length, 3)), b = this._5e.slice(0, Math.min(this._5e.length, 6 - a.length)), this.emit(this.signals.UPDATE_FRIEND_LISTS, {
                friendRequests: b,
                friendAccepts: a
            }), this._5q())
        },
        _5k: function(a) {
            for (var b = -1, c = 0; c < this._5d.length; c++) if (this._5d[c].id() == a) {
                b = c;
                break
            } - 1 != b && (this._5d[b].setUserSeen(!0), this._5q())
        },
        _5l: function(a) {
            for (var b = -1, c = 0; c < this._5e.length; c++) if (this._5e[c].id() == a) {
                b = c;
                break
            } - 1 != b && (this._5e[b].setUserSeen(!0), this._5q())
        },
        _5m: function(a) {
            this.ecma().facade().log(Level.DEBUG, "FriendshipController#_handleMessage", a);
            switch (a.action) {
                case "add_request":
                    this._5h(a.friendship);
                    break;
                case "add_accept":
                    this._5g(a.friendship);
                    break;
                case "remove_accept":
                    this._5i(a.id);
                    break;
                case "remove_request":
                    this._5j(a.id);
                    break;
                case "saw_accept":
                    this._5k(a.id);
                    break;
                case "saw_request":
                    this._5l(a.id);
                    break;
                default:
                    this.ecma().facade().log(Level.WARNING, "FriendshipController#_handleMessage", "Unrecognized message received", a)
            }
        },
        _5n: function(a) {
            this.ecma().facade().log(Level.DEBUG, "FriendshipController#_handlePresence", a);
            switch (a.action) {
                case "login":
                    this._5r(a.user, !0);
                    break;
                case "logout":
                    this._5r(a.user, !1);
                    break;
                case "presence_state_changed":
                    this._5o(a)
            }
        },
        _5o: function(a) {
            for (var b = 0; b < this._5d.length; b++) {
                var c = this._5d[b].user(); - 1 < a.current_state.online.indexOf(c.alt()) ? this._5d[-1].user().setOnline(!0) : this._5d[-1].user().setOnline(!1)
            }
            a = this._5d.slice(0, Math.min(this._5d.length, 3));
            b = this._5e.slice(0, Math.min(this._5e.length, 6 - a.length));
            this.emit(this.signals.UPDATE_FRIEND_LISTS, {
                friendRequests: b,
                friendAccepts: a
            })
        },
        _5p: function() {
            var a = this._5d.slice(0, Math.min(this._5d.length, 3)),
                b = this._5e.slice(0, Math.min(this._5e.length, 6 - a.length));
            this.emit(this.signals.UPDATE_FRIEND_LISTS, {
                friendRequests: b,
                friendAccepts: a
            })
        },
        _5q: function() {
            for (var a = this._notificationCount = 0; a < this._5e.length; a++) this._5e[a].has_user_seen() || this._notificationCount++;
            for (a = 0; a < this._5d.length; a++) this._5d[a].has_user_seen() || this._notificationCount++;
            this.emit(this.signals.UPDATE_FRIEND_NOTIFICATION, {
                notificationCount: this._notificationCount
            })
        },
        _5r: function(a, b) {
            for (var c = -1, d = new UserModel(a), e = 0; e < this._5d.length; e++) if (this._5d[e].user().alt() === d.alt()) {
                c = e;
                break
            } - 1 != c && (this._5d[c].user().setOnline(b), c = this._5d.slice(0, Math.min(this._5d.length, 3)), d = this._5e.slice(0, Math.min(this._5e.length, 6 - c.length)), this.emit(this.signals.UPDATE_FRIEND_LISTS, {
                friendRequests: d,
                friendAccepts: c
            }))
        }
    }),
    InstantMessageController = BaseController.extend({
        init: function(a, b, c) {
            this._super(a, "InstantMessageController", "INSERT REMOVE OPEN CLOSE SHOW HIDE USER_UPDATE".split(" "));
            this._5s = b;
            this._5w = {};
            this._5u = {};
            this._5x = c;
            this._5y = null;
            this._5v = !1;
            var d = this;
            null != b.messageController() && b.messageController().subscribe(b.messageController().signals.MESSAGE_INSTANT_MESSAGE, function(a) {
                d._5z(new InstantMessageModel(a))
            });
            b.subscribe(b.signals.ON, function(a) {
                d._5B(a)
            });
            b.subscribe(b.signals.OFF, function(a) {
                d._5C(a)
            });
            b.subscribe(b.signals.BUDDY_LIST_INSERT, function(a) {
                d._5D(a)
            })
        },
        close: function(a) {
            delete this._5w[a];
            this.emit(this.signals.CLOSE, this._5s.lookupUserByAlt(a))
        },
        open: function(a, b, c) {
            this._5w[a] = !0;
            this.emit(this.signals.OPEN, {
                user: this._5s.lookupUserByAlt(a),
                userInitiated: b
            });
            if (this._5v) this._5H(a, c);
            else if (this._5v = !0, null == this._5y) {
                this._5y = [a];
                for (a = 0; a < this._5y.length; a++) this._5G(this._5y[a]);
                null != c && this._5A(c, this.otherUser(c));
                this._5y = null
            } else this._5y.push(a)
        },
        otherUser: function(a) {
            return a.fromUserAlt() == this._5s.user().alt() ? this._5s.lookupUserByAlt(a.toUserAlt()) : this._5s.lookupUserByAlt(a.fromUserAlt())
        },
        submit: function(a, b, c) {
            this._sendCommand("InstantMessageController#submit", "/rt/instant_message/create", "POST", {
                to: a,
                type: b,
                message: c
            }, null)
        },
        _5z: function(a) {
            this.ecma().facade().log(Level.DEBUG, "InstantMessageController#_handleIMMessage", a);
            var b = this.otherUser(a);
            this._5w.hasOwnProperty(b.alt()) ? this._5A(a, b) : this.open(b.alt(), !1, a)
        },
        _5A: function(a, b) {
            var c = this._5F(a) + 1;
            null == this._5u[b.alt()] && (this._5u[b.alt()] = []);
            this._5u[b.alt()].splice(c, 0, a);
            this.emit(this.signals.INSERT, {
                position: c,
                data: a
            })
        },
        _5B: function(a) {
            this.ecma().facade().log(Level.DEBUG, "InstantMessageController#_handleOnMessage", a);
            this.emit(this.signals.SHOW, null)
        },
        _5C: function(a) {
            this.ecma().facade().log(Level.DEBUG, "InstantMessageController#_handleOffMessage", a);
            this.emit(this.signals.HIDE, null)
        },
        _5D: function(a) {
            this.ecma().facade().log(Level.DEBUG, "InstantMessageController#_handleBuddyListInsertMessage", a);
            a = a.data;
            this._5w.hasOwnProperty(a.alt()) && this.emit(this.signals.USER_UPDATE, a)
        },
        _5E: function(a, b) {
            return a.timestamp() < b.timestamp() ? -1 : a.timestamp() == b.timestamp() ? 0 : 1
        },
        _5F: function(a) {
            null == this._5u[this.otherUser(a).alt()] && (this._5u[this.otherUser(a).alt()] = []);
            return Util.arrayBinarySearch(this._5u[this.otherUser(a).alt()], a, this._5E, !0, null)
        },
        _5G: function(a) {
            for (var b = 0; b < this._5x.length; b++) if ("instant_message" == this._5x[b].type) {
                var c = new InstantMessageModel(this._5x[b].data),
                    d = this.otherUser(c).alt();
                null == this._5u[d] && (this._5u[d] = []);
                this._5u[d].push(c)
            }
            this._5H(a, null)
        },
        _5H: function(a, b) {
            if (null != this._5u[a]) for (var c = 0; c < this._5u[a].length; c++) this.emit(this.signals.INSERT, {
                position: c,
                data: this._5u[a][c]
            });
            null != b && this._5A(b, this.otherUser(b))
        },
        TEST_handleIMMessage: function(a) {
            this._5z(new InstantMessageModel(a))
        },
        TEST_handleOnMessage: function(a) {
            this._5B(a)
        },
        TEST_handleOffMessage: function(a) {
            this._5C(a)
        },
        TEST_handleBuddyListInsertMessage: function(a) {
            this._5D(a)
        },
        TEST_setHistory: function(a) {
            this._5x = a
        },
        TEST_handleHistory: function(a) {
            this._5G(a)
        }
    }),
    LoggingController = BaseController.extend({
        init: function(a, b) {
            this._super(a, "LoggingController", []);
            this._5I = "http://master.spreecast.com";
            b.user_ipv4_address && (this._5J = b.user_ipv4_address);
            b.user_ipv6_address && (this._5K = b.user_ipv6_address);
            b.hasOwnProperty("rootUrl") && (this._5I = b.rootUrl);
            this._5L = {
                time: "time",
                operation_name: "A",
                user_id: "B",
                user_ipv4_address: "C",
                user_ipv6_address: "D",
                spreecast_id: "E",
                stream_id: "F",
                source_host: "G",
                source_host_id: "H",
                duration: "I",
                user_agent: "J",
                referer: "K",
                clip_id: "L",
                session_id: "M",
                time_viewed: "a",
                event_page_url: "b"
            };
            this._5N = [];
            var c = this;
            this.facade().addLogCallback(function(a, b) {
                for (c._5N.push({
                    ts: Math.floor(c.facade().getCurrentTimestamp() / 1E3),
                    level: a,
                    args: b
                }); c._5N.length > 1E3;) c._5N.shift()
            });
            this._5O = {};
            this._5P = 0
        },
        setIPV4: function(a) {
            a && (this._5J = a)
        },
        setIPV6: function(a) {
            a && (this._5K = a)
        },
        setRootURL: function(a) {
            a && (this._5I = a)
        },
        subKeys: function(a) {
            var b = {},
                c;
            for (c in a) a[c] && (this._5L.hasOwnProperty(c) ? b[this._5L[c]] = a[c] : b[c] = a[c]);
            return b
        },
        logMessage: function(a) {
            a = this.subKeys(a);
            this._5Q(a)
        },
        logIncident: function(a, b, c, d) {
            var e = {};
            e.ts = Math.floor(this.facade().getCurrentTimestamp() / 1E3);
            e.id = "ecma.client";
            e.category = b;
            e.context = c;
            e.channel = "ecma:" + a;
            e.text = d;
            this._5R(e)
        },
        logLogs: function() {
            var a = {
                    server_response: this._5M,
                    logs: this._5N,
                    messages: this._5O,
                    session_id: this.ecma().sessionId()
                },
                b = {};
            b.ts = Math.floor(this.facade().getCurrentTimestamp() / 1E3);
            b.id = "ecma.client";
            b.channel = "ecma:logs";
            b.category = "LOG_UPLOAD";
            b.context = "LoggingController.logLogs";
            b.text = a;
            this._5S(b)
        },
        setServerResponse: function(a) {
            this._5M = a
        },
        addMessageLog: function(a) {
            this._5O.hasOwnProperty(a) || (this._5O[a] = []);
            this._5O[a].push(this._5P);
            this._5P++
        },
        _5Q: function(a) {
            a[this._5L.time] = 0;
            a[this._5L.session_id] = this.ecma().sessionId();
            this.$().ajax({
                type: "POST",
                url: this._5I + "/log/transaction",
                data: {
                    data: this.facade().json().stringify(a)
                },
                success: function() {}
            })
        },
        _5R: function(a) {
            this.$().ajax({
                type: "POST",
                url: this._5I + "/log/incident",
                data: {
                    data: this.facade().json().stringify(a)
                },
                success: function() {}
            })
        },
        _5S: function(a) {
            this.$().ajax({
                type: "POST",
                url: this._5I + "/log/logs",
                data: {
                    data: this.facade().json().stringify(a)
                },
                success: function() {}
            })
        }
    }),
    MediaController = SignalEmitter.extend({
        init: function(a, b) {
            this._super(a, "MediaController", "START UPDATE END MODE LAYOUT TRANSCODE_AVAILABLE STITCH_AVAILABLE RATIO_CHANGED".split(" "));
            this._5U = [];
            this._5V = 0;
            this._5W = null;
            this._5T = b;
            this._5X = VideoLayout.DEFAULT_LAYOUT;
            this._5Y = {};
            this._5Z = !1;
            this._60 = !0;
            var c = this;
            b.broadcastController().subscribe(b.broadcastController().signals.VIDEO_SNAPSHOT, function(a) {
                c._64(a)
            });
            b.subscribe(b.signals.START, function() {
                c._61()
            });
            b.subscribe(b.signals.MY_USER_UPDATED, function() {
                c._61()
            });
            b.subscribe(b.signals.STITCH_AVAILABLE, function(a) {
                c._5Y = a;
                c._5Z = !0;
                c._61()
            })
        },
        initLive: function(a) {
            this._61();
            this._5Y = a
        },
        initArchive: function(a) {
            this._5Y = a
        },
        changeRatio: function(a) {
            this.emit(this.signals.RATIO_CHANGED, a)
        },
        stitchUrls: function() {
            return this.facade().json().stringify(this._5Y)
        },
        stitchUrl: function(a, b) {
            if (null == this._5Y) return null;
            var c = null;
            switch (a) {
                case StitchUrlVariant.HDS:
                    c = this._5Y.archive_hds;
                    break;
                case StitchUrlVariant.HLS:
                    c = this._5Y.archive_hls;
                    null == c && (c = this._5Y.live_hls);
                    break;
                case StitchUrlVariant.MOV:
                    c = this._5Y.archive_mov
            }
            if (null == c) return null;
            var d = null;
            switch (b) {
                case StitchUrlQuality.HIGH:
                    d = c.high;
                    break;
                case StitchUrlQuality.LOW:
                    d = c.low;
                    break;
                case StitchUrlQuality.AUDIO:
                    d = c.audio
            }
            return null == d || null == d.h264 ? null : d.h264.aac
        },
        numFeeds: function() {
            return this._5V
        },
        mode: function() {
            return this._5W
        },
        shutdown: function() {
            this.emit(this.signals.MODE, MediaMode.SHUTDOWN)
        },
        _61: function() {
            var a = this._5T.user(),
                a = this._62() ? 0 < a.broadcastStatus() ? MediaMode.BROADCASTER : MediaMode.VIEWER : MediaMode.OFF;
            if (null == this._5W) this._5W = a, this.emit(this.signals.MODE, a);
            else {
                if (this._5Z) {
                    this._5Z = !1;
                    var b = this._63();
                    b && this.emit(this.signals.STITCH_AVAILABLE, b)
                }
                a != this._5W && (b = this._5W, this._5W = a, this.emit(this.signals.MODE, a), b == MediaMode.OFF && a != MediaMode.OFF ? (a = this._5T.broadcastController().videoSnapshotModel(), null != a && this._64(a)) : a == MediaMode.OFF && this._64(new VideoSnapshotModel(this.ecma(), null)))
            }
        },
        _62: function() {
            return this._5T.isTester() || this._5T.isArchive() || this._5T.isStarted() || this._5T.isProducer() || this._5T.user().admin() || 0 < this._5T.user().broadcastStatus()
        },
        _63: function() {
            var a = this._5T.event().rtmpStitchUrl();
            return null == a || 0 == a.length ? null : new VideoFeedModel(this._5T.ecma(), {
                archive_buffer: "",
                broadcaster_buffer: 0,
                broadcaster_prefix: "",
                end_time_string: "",
                source: FeedSource.SPREECAST,
                start_time_string: this._5T.event().startTime(),
                state: FeedState.ACTIVE,
                user: {
                    user_id: "",
                    alt: 0,
                    first_name: "",
                    last_name: ""
                },
                video_pane: 0,
                video_uid: "",
                video_uid_index: 1,
                viewer_buffer: 5E3,
                video_urls: {
                    broadcaster_url: {
                        medium: {
                            h264: {
                                speex: a
                            }
                        }
                    },
                    viewer_url: {
                        medium: {
                            h264: {
                                speex: a
                            }
                        }
                    }
                }
            })
        },
        _64: function(a) {
            if (!(0 < a.numVideoFeeds()) || this._62()) {
                var b, c = this._5V,
                    d, e, f = this._5U,
                    g = {};
                this._5V = a.numVideoFeeds();
                this._5U = a.videoFeeds();
                var h = {};
                for (b = 0; b < this._5U.length; b++) h[this._5U[b].uniqueVideoUid()] = b;
                var j = {};
                for (b = 0; b < f.length; b++) j[f[b].uniqueVideoUid()] = b;
                for (b = 0; b < this._5U.length; b++) e = this._5U[b], j.hasOwnProperty(e.uniqueVideoUid()) ? (d = f[j[e.uniqueVideoUid()]], d.videoPane() != e.videoPane() && (g[e.uniqueVideoUid()] = 1, this.emit(this.signals.UPDATE, e))) : (g[e.uniqueVideoUid()] = 1, this.emit(this.signals.START, e), this._60 && (this._60 = !1, (d = this._63()) && this.emit(this.signals.STITCH_AVAILABLE, d)));
                for (b = 0; b < f.length; b++) d = f[b], h.hasOwnProperty(d.uniqueVideoUid()) ? (e = this._5U[h[d.uniqueVideoUid()]], !g.hasOwnProperty(d.uniqueVideoUid()) && d.state() != e.state() && (g[e.uniqueVideoUid()] = 1, this.emit(this.signals.UPDATE, e))) : this.emit(this.signals.END, d);
                if (this._5V != c) for (b = 0; b < this._5U.length; b++) e = this._5U[b], g.hasOwnProperty(e.uniqueVideoUid()) || this.emit(this.signals.UPDATE, e);
                this._5X != a.layout() && (this._5X = a.layout(), this.emit(this.signals.LAYOUT, this._5X));
                "transcode_available" == a.action() && this.emit(this.signals.TRANSCODE_AVAILABLE, a.audioUrls())
            }
        }
    }),
    PresenceController = BaseController.extend({
        init: function(a, b, c, d, e, f) {
            var g = this;
            this._super(a, "PresenceController", ["BUDDY_LIST_INSERT", "ON", "OFF", "BUDDY_LIST_MY_USER_IS_ACTIVE", "BUDDY_LIST_MY_USER_IS_ONLINE"]);
            this._66 = b;
            this._67 = new InstantMessageController(a, this, c);
            this._68 = [];
            null != e && (this._65 = new UserModel(e), this._6a = this._65.isPresenceEnabled());
            null != f && f(this);
            for (a = 0; a < d.length; a++) this._68[a] = new UserModel(d[a]);
            this._6b();
            null != this._66 && this._66.subscribe(this._66.signals.MESSAGE_PRESENCE, function(a) {
                g._6g(a)
            })
        },
        close: function() {
            this.instantMessageController().unsubscribeAll();
            this.unsubscribeAll()
        },
        getPresenceStatus: function() {
            return this._6a
        },
        setPresence: function(a) {
            this._sendCommand("PresenceController#setPresenceStatus", "/users/set_presence", "PUT", {
                status: a
            }, null)
        },
        messageController: function() {
            return this._66
        },
        instantMessageController: function() {
            return this._67
        },
        user: function() {
            return this._65
        },
        getOnlineUserCount: function() {
            for (var a = 0, b = 0; b < this._68.length; b++) if (this._68[b].online()) a += 1;
            else break;
            return a
        },
        lookupUserByAlt: function(a) {
            return this._6n(a) ? this.user() : this._68[this._69[a]]
        },
        _6b: function() {
            var a = this;
            this._68 = this._68.sort(function(b, c) {
                return a._6e(b, c)
            });
            this._6c(!0)
        },
        _6c: function(a) {
            this._69 = {};
            for (var b = 0; b < this._68.length; b++) this._69[this._68[b].alt()] = b, a && this.emit(this.signals.BUDDY_LIST_INSERT, {
                data: this._68[b],
                position: b
            })
        },
        _6d: function(a) {
            return Util.arrayBinarySearch(this._68, a, this._6e, !0, null)
        },
        _6e: function(a, b) {
            return a.online() == b.online() ? a.idle() == b.idle() ? a.name().localeCompare(b.name()) : a.idle() ? 1 : -1 : a.online() ? -1 : 1
        },
        _6f: function(a) {
            var b = this._69[a.alt()];
            this._68.splice(b, 1);
            b = this._6d(a) + 1;
            this._68.splice(b, 0, a);
            this._6c(!1);
            this.emit(this.signals.BUDDY_LIST_INSERT, {
                position: b,
                data: a
            })
        },
        _6g: function(a) {
            this.ecma().facade().log(Level.DEBUG, "PresenceController#_handleMessage", a);
            switch (a.action) {
                case "active":
                    this._6h(a.user);
                    break;
                case "capabilities":
                    this._6i(a.user, a.capabilities);
                    break;
                case "idle":
                    this._6j(a.user);
                    break;
                case "login":
                    this._6k(a.user, a.capabilities);
                    break;
                case "logout":
                    this._6l(a.user);
                    break;
                case "presence_state_changed":
                    this._6m(a);
                    break;
                default:
                    this.ecma().facade().log(Level.WARNING, "PresenceController#_handleMessage", "Unrecognized message received", a)
            }
        },
        _6h: function(a) {
            var b = this.lookupUserByAlt(a);
            b.setIdle(!1);
            b.setCapabilities(capabilities);
            this._6n(a) ? this._65.isPresenceEnabled() && this.emit(this.signals.BUDDY_LIST_MY_USER_IS_ACTIVE, !0) : this._6f(b)
        },
        _6i: function(a, b) {
            var c = this.lookupUserByAlt(a);
            c.setCapabilities(b);
            this._6n(c.alt()) ? this.ecma().facade().log(Level.WARNING, "PresenceController#_capabilities", "Received a capabilities notification for myself!", c) : this._6f(c)
        },
        _6j: function(a) {
            var b = this.lookupUserByAlt(a);
            b.setIdle(!0);
            this._6n(a) ? this._65.isPresenceEnabled() && this.emit(this.signals.BUDDY_LIST_MY_USER_IS_ACTIVE, !1) : this._6f(b)
        },
        _6k: function(a, b) {
            var c = new UserModel(a);
            c.setOnline(!0);
            c.setCapabilities(b);
            if (this._6n(c.alt())) this.ecma().facade().log(Level.WARNING, "PresenceController#_login", "Received a login notification for myself!", c);
            else {
                if (null == this._69[c.alt()]) {
                    var d = this._68.push(c);
                    this._69[c.alt()] = d - 1
                }
                this._6f(c)
            }
        },
        _6l: function(a) {
            var b = this.lookupUserByAlt(a.alt);
            b.setOnline(!1);
            this._6n(a.alt) ? this.ecma().facade().log(Level.WARNING, "PresenceController#_logout", "Received a logout notification for myself!", a) : this._6f(b)
        },
        _6m: function(a) {
            this._6a = a.enabled;
            this.emit(a.enabled ? this.signals.ON : this.signals.OFF, {});
            if (this._6a) {
                for (var b = 0; b < this._68.length; b++) {
                    var c = this._68[b]; - 1 < a.current_state.online.indexOf(c.alt()) ? c.setOnline(!0) : c.setOnline(!1); - 1 < a.current_state.idle.indexOf(c.alt()) ? c.setIdle(!0) : c.setIdle(!1)
                }
                this._6b()
            }
        },
        _6n: function(a) {
            return this._65 && a == this._65.alt() ? !0 : !1
        },
        TEST_getBuddyList: function() {
            return this._68
        },
        TEST_getPositionHash: function() {
            return this._69
        },
        TEST_handleMessage: function(a) {
            this._6g(a)
        },
        TEST_searchPosition: function(a) {
            return this._6d(a)
        }
    }),
    ProducerController = BaseController.extend({
        init: function(a, b) {
            this._super(a, "ProducerController", ["BROADCASTER_UPDATE", "STREAM_QUALITY", "QUESTIONS_ENABLED", "BROADCASTERS_ENABLED"]);
            this._6o = b
        },
        initLive: function(a, b) {
            this._6p = b;
            var c = this;
            this._6o.subscribe(this._6o.signals.EVENT_PARTICIPATION, function(a) {
                c._6r(a)
            });
            this._6o.messageController().subscribe(this._6o.messageController().signals.MESSAGE_VISIBLE_USERS, function(a) {
                c._6s(a.stream_qualities)
            });
            this._6o.messageController().subscribe(this._6o.messageController().signals.MESSAGE_VIEWER_STATS, function(a) {
                c._6s(a.stream_qualities)
            });
            this._6o.messageController().subscribe(this._6o.messageController().signals.MESSAGE_EVENT, function(a) {
                c._6q(a)
            });
            this._6s(a.stream_qualities)
        },
        ban: function(a) {
            this._sendCommand("ProducerController#ban", "/event_actions", "POST", {
                "event_action[event_id]": this._6o.id(),
                "event_action[user_id]": a,
                "event_action[action]": EventAction.BAN
            }, null)
        },
        changeEventSetting: function(a, b) {
            this._sendCommand("ProducerController#changeEventSetting", "/events/" + this._6o.id() + "/toggle", "PUT", {
                feature: a,
                value: b
            }, null)
        },
        deleteChat: function(a, b) {
            this._sendCommand("ProducerController#deleteChat", "/chats/delete", "POST", {
                "chat[event_id]": this._6o.id(),
                "chat[id]": a
            }, b)
        },
        turnChatIntoQuestion: function(a, b, c, d) {
            this._sendCommand("ProducerController#turnChatIntoQuestion", "/chats/" + (c ? "onscreen" : "queue"), "PUT", {
                id: a,
                text: b
            }, d, null)
        },
        demoteFromProducer: function(a, b) {
            this._sendCommand("ProducerController#demoteFromProducer", "/event_actions", "POST", {
                "event_action[event_id]": this._6o.id(),
                "event_action[user_id]": a,
                "event_action[action]": EventAction.DEMOTE_PRODUCER
            }, b)
        },
        mediaItemOnAir: function(a, b, c) {
            this._sendCommand("ProducerController#mediaItemOnAir", "/media_items/" + a + "/make_on_air", "POST", null, b, c)
        },
        mediaItemOffAir: function() {
            this._sendCommand("ProducerController#mediaItemOffAir", "/media_items/" + this._6o.questionController().mediaItemOnAir().id() + "/make_off_air", "POST", {}, null)
        },
        mediaItemStar: function(a, b, c) {
            this._sendCommand("ProducerController#mediaItemStar", "/media_items/" + a + "/star", "POST", null, b, c)
        },
        mediaItemUnstar: function(a, b, c) {
            this._sendCommand("ProducerController#mediaItemUnstar", "/media_items/" + a + "/unstar", "POST", null, b, c)
        },
        mediaItemWithdraw: function(a, b) {
            this._sendCommand("ProducerController#mediaItemWithdraw", "/media_items/" + a, "PUT", {
                "media_item[status]": "withdrawn"
            }, b)
        },
        promoteToProducer: function(a, b) {
            this._sendCommand("ProducerController#promoteToProducer", "/event_actions", "POST", {
                "event_action[event_id]": this._6o.id(),
                "event_action[user_id]": a,
                "event_action[action]": EventAction.PROMOTE_PRODUCER
            }, b)
        },
        promoteToBroadcaster: function(a) {
            this._sendCommand("ProducerController#promoteToBroadcaster", "/event_actions", "POST", {
                "event_action[event_id]": this._6o.id(),
                "event_action[user_id]": a,
                "event_action[action]": EventAction.PROMOTE_BROADCASTER
            }, null)
        },
        promotionAccept: function() {
            this._sendCommand("ProducerController#accept", "/event_participations/respond_to_promotion", "POST", {
                event_id: this._6o.id(),
                promotion: PromotionType.PRODUCER,
                response: PromotionResponse.ACCEPTED
            }, null)
        },
        promotionRefuse: function() {
            this._sendCommand("ProducerController#refuse", "/event_participations/respond_to_promotion", "POST", {
                event_id: this._6o.id(),
                promotion: PromotionType.PRODUCER,
                response: PromotionResponse.REFUSED
            }, null)
        },
        questionOnAir: function(a, b, c) {
            this._sendCommand("ProducerController#questionOnAir", "/questions/" + a + "/make_on_air", "POST", null, b, c)
        },
        questionOffAir: function() {
            this._sendCommand("ProducerController#questionOffAir", "/questions/" + this._6o.questionController().questionOnAir().id() + "/make_off_air", "POST", {}, null)
        },
        questionWithdraw: function(a) {
            this._sendCommand("ProducerController#questionWithdraw", "/questions/" + a, "PUT", {
                "question[question_status]": "withdrawn"
            }, null)
        },
        questionStar: function(a, b, c) {
            this._sendCommand("ProducerController#questionStar", "/questions/" + a + "/star", "POST", null, b, c)
        },
        questionUnstar: function(a, b, c) {
            this._sendCommand("ProducerController#questionUnstar", "/questions/" + a + "/unstar", "POST", null, b, c)
        },
        setMicGain: function(a, b) {
            this._sendCommand("ProducerController#setMicGain", "/event_participations/set_microphone_gain_level", "POST", {
                event_id: this._6o.id(),
                user_id: a,
                microphone_gain_level: Math.floor(100 * b)
            }, null)
        },
        setLayout: function(a) {
            this._sendCommand("ProducerController#setLayout", "/event_actions", "POST", {
                "event_action[action]": "layout",
                "event_action[event_id]": this._6o.id(),
                "event_action[layout]": a
            }, null)
        },
        startBroadcast: function(a) {
            this._sendCommand("ProducerController#startBroadcast", "/event_participations/start_broadcast", "POST", {
                event_id: this._6o.id(),
                user_id: a
            }, null)
        },
        userStar: function(a) {
            this._sendCommand("ProducerController#userStar", "/event_actions", "POST", {
                "event_action[action]": "star",
                "event_action[event_id]": this._6o.id(),
                "event_action[user_id]": a
            }, null)
        },
        userUnstar: function(a) {
            this._sendCommand("ProducerController#userUnstar", "/event_actions", "POST", {
                "event_action[action]": "unstar",
                "event_action[event_id]": this._6o.id(),
                "event_action[user_id]": a
            }, null)
        },
        _6q: function(a) {
            "broadcast_settings" == a.action && ("questions_enabled" == a.feature ? this.emit(this.signals.QUESTIONS_ENABLED, {
                set: !! a.value
            }) : "broadcasters_enabled" == a.feature && this.emit(this.signals.BROADCASTERS_ENABLED, {
                set: !! a.value
            }))
        },
        _6r: function(a) {
            0 < a.user().broadcastStatus() && -1 != this._6o.broadcastController().getPane(a.user().id()) && this.emit(this.signals.BROADCASTER_UPDATE, a.user())
        },
        _6s: function(a) {
            var b = {},
                c = !1,
                d;
            for (d in a) c = Number(d), b[c] = new StreamQualityModel(a[d], c), c = !0;
            c && this.emit(this.signals.STREAM_QUALITY, b)
        },
        TEST_handleStreamQualities: function(a) {
            this._6s(a)
        }
    }),
    QuestionController = BaseController.extend({
        init: function(a, b) {
            this._super(a, "QuestionController", "INSERT UPDATE REMOVE ON_AIR OFF_AIR ALLOWED".split(" "));
            this._6t = b;
            this._6u = {};
            this._6v = null;
            this._6w = {};
            this._6x = null;
            this._6y = [];
            var c = this;
            b.subscribe(b.signals.ARCHIVE_TIMESTAMP, function(a) {
                c._6C(a.timestamp)
            });
            this._6t.subscribe(this._6t.signals.START, function() {
                null != c._6x && (c.facade().log(Level.DEBUG, "QuestionController#callback", "Emitting media item on air because event started", c._6x), c.emit(c.signals.ON_AIR, {
                    mediaItem: c._6x
                }));
                null != c._6v && (c.facade().log(Level.DEBUG, "QuestionController#callback", "Emitting question on air because event started", c._6v), c.emit(c.signals.ON_AIR, {
                    question: c._6v
                }))
            })
        },
        initLive: function(a, b, c, d) {
            this.facade().log(Level.DEBUG, "QuestionController#initLive");
            var e = this;
            null != this._6t.messageController() && (this._6t.messageController().subscribe(this._6t.messageController().signals.MESSAGE_QUESTION, function(a) {
                e._6B(a, "question")
            }), this._6t.messageController().subscribe(this._6t.messageController().signals.MESSAGE_MEDIA_ITEM, function(a) {
                e._6B(a, "media_item")
            }));
            null != c && this._6B(c, "media_item");
            null != a && this._6B(a, "question");
            if (null != b) for (a = 0; a < b.length; a++) this._6B(b[a], "question");
            if (null != d) for (a = 0; a < d.length; a++) this._6B(d[a], "media_item")
        },
        initArchive: function(a, b, c) {
            this.facade().log(Level.DEBUG, "QuestionController#setArchiveData", a, b);
            var d = this;
            this._6z = new ArchiveChunkController(this.ecma(), "Questions", a, 1, b);
            this._6z.subscribe(this._6z.signals.INSERT, function(a) {
                d._6B(a.data.question, "question")
            });
            this._6A = new ArchiveChunkController(this.ecma(), "MediaItems", a, 1, c);
            this._6A.subscribe(this._6A.signals.INSERT, function(a) {
                d._6B(a.data.media_item, "media_item")
            });
            this._6A.subscribe(this._6A.signals.REMOVE, function() {
                d._6H()
            })
        },
        submit: function(a, b, c, d) {
            a.event_id = this._6t.id();
            this._6t.user().role() && (a.role = this._6t.user().role());
            this._sendCommand("QuestionController#submit", b, "POST", a, c, d)
        },
        getFullList: function() {
            return this._6y
        },
        hasQuestion: function(a) {
            return this._6u.hasOwnProperty(a)
        },
        hasMediaItem: function(a) {
            return this._6w.hasOwnProperty(a)
        },
        mediaItemOnAir: function() {
            return this._6x
        },
        questionOnAir: function() {
            return this._6v
        },
        _6B: function(a, b) {
            this.facade().log(Level.DEBUG, "QuestionController#_handleQuestionMessage", a);
            var c, d;
            "question" == b ? (c = new QuestionModel(a), d = this._6u) : (c = new MediaItemModel(a), d = this._6w);
            switch (c.action()) {
                case "approved":
                    d.hasOwnProperty(c.id()) ? "question" == b ? this._6E(c) : this._6F(c) : this._6D(c, b);
                    break;
                case "on_air":
                    "question" == b ? (this._6v = c, (this._6t.isTester() || this._6t.isArchive() || this._6t.isStarted() || this._6t.isProducer() || this._6t.user().admin()) && this.emit(this.signals.ON_AIR, {
                        question: c
                    })) : (this._6x = c, (this._6t.isTester() || this._6t.isArchive() || this._6t.isStarted() || this._6t.isProducer() || this._6t.user().admin()) && this.emit(this.signals.ON_AIR, {
                        media_item: c
                    }));
                case "withdrawn":
                    this._6G(c.id(), b, !0);
                    break;
                case "off_air":
                    this.emit(this.signals.OFF_AIR, {
                        type: b,
                        action: c.actionType()
                    }), "question" == b ? this._6v = null : this._6x = null
            }
        },
        _6C: function(a) {
            this.facade().log(Level.DEBUG, "QuestionController#_handleArchiveTimestamp", a);
            this._6z && this._6z.checkTimestamp(a);
            this._6A && this._6A.checkTimestamp(a)
        },
        _6D: function(a, b) {
            "question" == b ? (this.emit(this.signals.INSERT, {
                question: a
            }), this._6u[a.id()] = a) : (this.emit(this.signals.INSERT, {
                mediaItem: a
            }), this._6w[a.id()] = a);
            this._6y.push(a)
        },
        _6E: function(a) {
            this.emit(this.signals.UPDATE, {
                question: a
            })
        },
        _6F: function(a) {
            this.emit(this.signals.UPDATE, {
                mediaItem: a
            })
        },
        _6G: function(a, b, c) {
            for (var d = "question" == b ? this._6u : this._6w, e = 0; e < this._6y.length; e++) if (a == this._6y[e].id()) {
                c && ("question" == b ? this.emit(this.signals.REMOVE, {
                    question: this._6y[e]
                }) : this.emit(this.signals.REMOVE, {
                    mediaItem: this._6y[e]
                }));
                delete d[a];
                this._6y.splice(e, 1);
                break
            }
        },
        _6H: function() {
            this.facade().log(Level.DEBUG, "QuestionController#_handleMediaItemRemove");
            this.emit(this.signals.OFF_AIR, {
                type: "media_item",
                action: "explicit"
            })
        },
        TEST_handleQuestionMessage: function(a) {
            this._6B(a, "question")
        }
    }),
    SiteNotificationController = BaseController.extend({
        init: function(a, b, c, d) {
            var e = this;
            this._super(a, "SiteNotificationController", ["ON", "OFF"]);
            this._6J = b;
            null != d && d(this);
            null != c && null != c.type && this._6K({
                action: "update",
                notification: c
            });
            null != this._6J && this._6J.subscribe(this._6J.signals.MESSAGE_SITE_NOTIFICATION, function(a) {
                e._6K(a)
            })
        },
        messageController: function() {
            return this._6J
        },
        _6K: function(a) {
            this.ecma().facade().log(Level.DEBUG, "SiteNotificationController#_handleMessage", a);
            switch (a.action) {
                case "update":
                    this.emit(this.signals.ON, a.notification);
                    break;
                case "remove":
                    this.emit(this.signals.OFF, {});
                    break;
                default:
                    this.ecma().facade().log(Level.WARNING, "SiteNotificationController#_handleMessage", "Unrecognized message received", a)
            }
        },
        TEST_handleMessage: function(a) {
            this._6K(a)
        }
    }),
    UserController = BaseController.extend({
        init: function(a, b) {
            this._super(a, "UserController", []);
            this._6L = b
        },
        get: function(a, b) {
            var c = this;
            this._sendCommand("UserController#get", "/users/" + a, "GET", null == this._6L ? null : {
                event_id: this._6L.id(),
                send_capabilities: !0
            }, function(a) {
                var e = [];
                if (a.moderator_chat) for (var f = 0; f < a.moderator_chat.length; f++) e.push(new ChatModel(a.moderator_chat[f]));
                var f = new UserModel(a),
                    g = a.friendship_id,
                    a = a.friendship_state;
                f.applyVideoSnapshot(c._6L.broadcastController().videoSnapshotModel());
                b(f, e, g, a)
            })
        },
        getFollowInfo: function(a, b) {
            this._sendCommand("UserController#getFollowInfo", "/following/" + a + "/follow_info", "GET", null, function(a) {
                b(a.followers, a.followees)
            })
        },
        follow: function(a, b) {
            this._sendCommand("UserController#follow", "/following", "POST", {
                item: "user",
                bulk_ids: a
            }, b)
        },
        unfollow: function(a, b) {
            this._sendCommand("UserController#unfollow", "/unfollow", "POST", {
                item: "user",
                bulk_ids: a
            }, b)
        }
    }),
    VisibleUsersController = BaseController.extend({
        init: function(a, b) {
            this._super(a, "VisibleUsersController", ["USER_DELETE", "USER_INSERT", "USER_MOVE", "USER_SET_LIST", "USER_UPDATE"]);
            var c = this;
            this.facade().log(Level.DEBUG, "VisibleUsersController");
            this._6N = b;
            this._6Q = new VisibleUserList(this._6N.isProducer());
            b.broadcastController().subscribe(b.broadcastController().signals.VIDEO_SNAPSHOT, function(a) {
                c._6X(a)
            })
        },
        initArchive: function(a, b, c) {
            this.facade().log(Level.DEBUG, "VisibleUsersController#setArchiveData", a, b);
            var d = this;
            this._6M = new ArchiveChunkController(this.ecma(), "VisibleUsers", a, 1, b);
            this._6M.subscribe(this._6M.signals.INSERT, function(a) {
                d._6Z(a.data.visible_users.visible_users)
            });
            this._6O = c;
            this._6N.subscribe(this._6N.signals.ARCHIVE_TIMESTAMP, function(a) {
                d._6T(a.timestamp)
            })
        },
        initLive: function(a) {
            this.facade().log(Level.DEBUG, "VisibleUsersController#initLive");
            if (null != this._6N.messageController()) {
                var b = this;
                this._6N.subscribe(this._6N.signals.EVENT_PARTICIPATION, function(a) {
                    b._6W(a)
                });
                this._6N.messageController().subscribe(this._6N.messageController().signals.MESSAGE_VISIBLE_USERS, function(a) {
                    b._6Z(a.visible_users)
                })
            }
            this._6Z(a)
        },
        userAt: function(a) {
            return this._6Q.userAt(a)
        },
        _6R: function() {
            var a = this._6N.isLive() ? null : ViewerCategory.ONAIR,
                b = new VisibleUserListState(this._6Q, a);
            (!this._6P || !this._6P.equals(b)) && this.emit(this.signals.USER_SET_LIST, this._6Q.users(a))
        },
        _6S: function(a, b) {
            this.facade().log(Level.DEBUG, "VisibleUsersController#_doSingleEmit", a, b);
            switch (a.changeType(b)) {
                case UserChangeType.INSERT:
                    this.emit(this.signals.USER_INSERT, b);
                    break;
                case UserChangeType.MOVE:
                    this.emit(this.signals.USER_MOVE, b);
                    break;
                case UserChangeType.DELETE:
                    this.emit(this.signals.USER_DELETE, a.userId());
                    break;
                case UserChangeType.UPDATE:
                    this.emit(this.signals.USER_UPDATE, b)
            }
        },
        _6T: function(a) {
            this.facade().log(Level.DEBUG, "VisibleUsersController#_handleArchiveTimestamp", a);
            this._6M && this._6M.checkTimestamp(a);
            0 == a && this._6O && this._6Z(this._6O.visible_users)
        },
        _6U: function(a) {
            this.facade().log(Level.DEBUG, "VisibleUsersController#_handleEPDestroy", a);
            var b = this._6Q.findUser(a.alt()),
                c = new VisibleUserChange(b, this._6N.isProducer(), this._6N.isLive());
            b ? (this._6Q.deleteUser(a.alt()), this._6S(c, null)) : this.facade().log(Level.WARNING, "Received EP Destroy for a user not in the users array", a)
        },
        _6V: function(a) {
            this.facade().log(Level.DEBUG, "VisibleUsersController#_handleEPUpdate", a);
            var b = this._6Q.findUser(a.alt()),
                c = new VisibleUserChange(b, this._6N.isProducer(), this._6N.isLive());
            this.facade().log(Level.DEBUG, "VisibleUsersController#_handleEPUpdate, before =", b, this._6Q);
            b ? b.setUser(a) : b = this._6Q.push(a);
            this._6Q.sort();
            this.facade().log(Level.DEBUG, "VisibleUsersController#_handleEPUpdate, after =", b, this._6Q);
            this._6S(c, b)
        },
        _6W: function(a) {
            this.facade().log(Level.DEBUG, "VisibleUsersController#_handleEventParticipationMessage", a);
            switch (a.action()) {
                case "new":
                    a.user().id() == this._6N.user().id() && this._6N.user().setRole(a.user().role());
                    a.user().isBanned() || this._6V(a.user());
                    break;
                case "update":
                    a.user().isBanned() || this._6V(a.user());
                    break;
                case "destroy":
                    this._6U(a.user())
            }
        },
        _6X: function(a) {
            this.facade().log(Level.DEBUG, "VisibleUsersController#_handleVideoSnapshotMessage", a);
            var b = this._6N.isLive() ? null : ViewerCategory.ONAIR;
            this._6P = new VisibleUserListState(this._6Q, b);
            for (var c = this._6Q.users(ViewerCategory.ONAIR), b = {}, d = 0, e, d = 0; d < c.length; ++d) e = c[d], b[e.userId()] = e;
            for (d = 0; d < a.numVideoFeeds(); ++d) {
                var c = a.videoFeed(d).videoPane(),
                    f = a.videoFeed(d).user().alt();
                b[f] && delete b[f];
                (e = this._6Q.findUser(f)) ? e.setPane(c) : this.facade().log(Level.DEBUG, "Video Snapshot received for user not in faceblock. Waiting for VU update...", f)
            }
            for (var g in b) b.hasOwnProperty(g) && b[g].setPane(-1);
            this._6Q.sort();
            this._6R()
        },
        _6Y: function(a) {
            this.facade().log(Level.DEBUG, "VisibleUsersController#handleVisibleUsers", a);
            var b = this._6N.isLive() ? null : ViewerCategory.ONAIR;
            this._6P = new VisibleUserListState(this._6Q, b);
            b = this._6N.broadcastController().videoSnapshotModel();
            this._6Q = new VisibleUserList(this._6N.isProducer());
            for (var c = 0; c < a.length; ++c) {
                var d = new UserModel(a[c]);
                d.applyVideoSnapshot(b);
                this._6Q.push(d)
            }
            this._6Q.sort();
            this._6R()
        },
        _6Z: function(a) {
            this.facade().log(Level.DEBUG, "VisibleUsersController#_handleVisibleUsersMessage", a);
            this._6Y(a)
        },
        TEST_handleEventParticipationMessage: function(a) {
            var b = new UserModel(a.user);
            b.applyVideoSnapshot(this._6N.broadcastController().videoSnapshotModel());
            this._6W(new EventParticipationModel(a.action, b))
        },
        TEST_handleVisibleUsersMessage: function(a) {
            this._6Z(a.visible_users)
        },
        TEST_handleArchiveTimestamp: function(a) {
            this._6T(a)
        }
    }),
    VoteController = BaseController.extend({
        init: function(a, b) {
            this._super(a, "VoteController", ["INSERT", "UPDATE"]);
            this._70 = b;
            var c = this;
            this._70.subscribe(this._70.signals.SCORE_RECEIVED, function(a) {
                c.emit(c.signals.UPDATE, a)
            })
        },
        submit: function(a, b, c, d, e, f) {
            a = {
                id: a,
                type: b,
                vote: c,
                status: d,
                role: this._70.user().role()
            };
            this._sendCommand("VoteController#submit", "/rt/votes/create", "POST", a, e, f)
        },
        _72: function() {
            var a = this;
            this._sendCommand("VoteController#getMyVotes", "/rt/votes/get", "GET", {
                role: this._70.user().role(),
                status: this._70.event().status()
            }, function(b) {
                for (var c = 0; c < b.length; c++) {
                    var d = new VoteModel(b[c]);
                    a._73(d)
                }
            })
        },
        _73: function(a) {
            this.facade().log(Level.DEBUG, "VoteController#handleVote", a);
            ("Question" == a.votableType() && this._70.questionController().hasQuestion(a.votableId()) || "MediaItem" == a.votableType() && this._70.questionController().hasMediaItem(a.votableId())) && this.emit(this.signals.INSERT, a)
        }
    }),
    MessageInterface = SignalEmitter.extend({
        init: function(a, b) {
            this._super(a, b, "READY MESSAGE MESSAGE_EVENT MESSAGE_LAYOUT MESSAGE_PARTICIPANT_LIFECYCLE MESSAGE_VIDEO_SNAPSHOT MESSAGE_EVENT_PARTICIPATION MESSAGE_CHAT MESSAGE_VOTES MESSAGE_USER MESSAGE_QUESTION MESSAGE_VISIBLE_USERS MESSAGE_VIEWER_STATS MESSAGE_DESTINATION_USER_ID MESSAGE_MEDIA_ITEM MESSAGE_STREAM_QUALITY MESSAGE_PRESENCE MESSAGE_FRIENDSHIP MESSAGE_INSTANT_MESSAGE BUDDY_LIST_MY_USER_IS_ACTIVE BUDDY_LIST_MY_USER_IS_ONLINE MESSAGE_SITE_NOTIFICATION MESSAGE_AD MESSAGE_PERSONALIZATION".split(" "))
        },
        sendFirstHeartbeat: function() {},
        getHistory: function() {}
    }),
    MessageController = MessageInterface.extend({
        init: function(a, b, c, d, e, f, g, h) {
            this._super(a, "MessageController");
            var j = this;
            this._74 = e;
            this._75 = {};
            this._76 = {};
            this._77 = g;
            this._78 = e.length;
            this._79 = b;
            this._7a = c;
            this._7b = d;
            this._7c = !1;
            this._7e = [];
            this._7f = {
                VIDEO_SNAPSHOT: !0,
                EVENT: !0,
                QUESTION: !0,
                MEDIA_ITEM: !0
            };
            this._7g = f;
            this._7h = [];
            EcmaGlobals.IS_UNIT_TESTER || (this._7i = new EcmaTimer(EcmaGlobals.EMBARGO_TIMER_TIMEOUT, function() {
                j._7m()
            }, null, 0 < this._7g));
            this._7j = 0;
            null != h && h(j);
            for (a = 0; a < this._74.length; a++) b = j._74[a].channel, c = j._74[a].last_message_id, j._75[b] = new MessageConsistency(j.ecma(), b, c), j._75[b].subscribe(j._75[b].signals.MESSAGE, function(a) {
                j._7n(a.message)
            });
            this._7l()
        },
        close: function() {
            var a;
            this._7c = !0;
            this.heartbeater() && (this.facade().log(Level.INFO, "MessageController#close", "Closing heartbeater"), this.heartbeater().close());
            for (a = 0; a < this._74.length; a++) this.messageConsistency(this._74[a].channel).unsubscribeAll();
            this.heartbeater().unsubscribeAll();
            this.unsubscribeAll()
        },
        capturedMessages: function() {
            return this._7e
        },
        sendFirstHeartbeat: function() {
            this.facade().log(Level.DEBUG, "MessageController#sendFirstHeartbeat");
            this._7d.sendHeartbeat(!0)
        },
        messageConsistency: function(a) {
            return this._75[a]
        },
        heartbeater: function() {
            return this._7d
        },
        embargoTime: function() {
            return this._7g
        },
        updateEmbargoTime: function(a) {
            EcmaGlobals.IS_UNIT_TESTER || (0 == this._7g && 0 != a ? this._7i.start() : 0 != this._7g && 0 == a && this._7i.stop());
            this._7g = a
        },
        inputMessage: function(a, b) {
            var c;
            c = "string" == typeof b ? this.facade().json().parse(b) : b;
            var d = c.x;
            if (!this._7c && this._75.hasOwnProperty(d)) if (c.hasOwnProperty("q")) {
                var e = this;
                this.ecma().$().ajax({
                    url: EcmaGlobals.messagesUrl(d, c.q),
                    dataType: "jsonp",
                    jsonpCallback: "spreecast_message_" + d + "_" + c.q,
                    success: function(a) {
                        e._75[d].processMessage(a)
                    }
                })
            } else c.hasOwnProperty("i") ? this._75[d].messageReceived(c) : this._75[d].processMessage(c);
            else this.facade().log(Level.WARNING, "MessageController#inputMessage", "Message received after close or on bad channel", d, c)
        },
        _7k: function(a) {
            "event" == a.scope && this._7a != a.event_id ? this.facade().log(Level.DEBUG, "MessageController#_outputMessage", "Filtered message", a) : (EcmaGlobals.CAPTURE_MESSAGES && this._7e.push(a), this.emit("MESSAGE", a), this.emit("MESSAGE_" + a.type.toUpperCase(), a.data))
        },
        _7l: function() {
            this._7d = new Heartbeater(this.ecma(), null == this._79 ? EcmaGlobals.PRESENCE_HEARTBEAT_INTERVAL : EcmaGlobals.EVENT_HEARTBEAT_INTERVAL, this._75, this._79, this._7b, EcmaGlobals.ROOT_URL, !0);
            this.emit(this.signals.READY, {})
        },
        _7m: function() {
            for (var a = this.ecma().facade().getCurrentTimestamp() + this._7j; 0 < this._7h.length;) if (this.ecma().facade().log(Level.DEBUG, "Current: " + a), this.ecma().facade().log(Level.DEBUG, "Msg: " + this._7h[0].ts), this.ecma().facade().log(Level.DEBUG, "Delta: " + (a - this._7h[0].ts)), this._7h[0].ts + this._7g < a) {
                this.ecma().facade().log(Level.DEBUG, "Emitting msg");
                this.ecma().facade().log(Level.DEBUG, "-------------------------");
                var b = this._7h.shift();
                this._7k(b.message)
            } else {
                this.ecma().facade().log(Level.DEBUG, "Holding msg");
                this.ecma().facade().log(Level.DEBUG, "-------------------------");
                break
            }
        },
        _7n: function(a) {
            0 < this._7g && this._7f.hasOwnProperty(a.type.toUpperCase()) ? this._7h.push({
                ts: this.ecma().facade().getCurrentTimestamp() + this._7j,
                message: a
            }) : this._7k(a)
        },
        TEST_inputMessage: function(a, b) {
            this.inputMessage(a, b)
        },
        TEST_fromMessageConsistency: function(a) {
            this._7n(a)
        },
        TEST_releaseEmbargoes: function() {
            this._7m()
        },
        TEST_advanceClock: function(a) {
            this._7j += a
        }
    }),
    MediaItemModel = QuestionModel.extend({
        init: function(a) {
            this._super(a);
            null != a && (this._7r = a.url, this._7q = a.image_url, this._7o = a.type, this._7p = a.title, this._7s = a.embed, this._7t = a.description)
        },
        mobileData: function() {
            return {
                id: this.id(),
                text: this.text(),
                url: this.url(),
                title: this.title(),
                user: this.user().mobileData()
            }
        },
        title: function() {
            return this._7p
        },
        url: function() {
            return this._7r
        },
        imageURL: function() {
            return this._7q
        },
        embed: function() {
            return this._7s
        },
        description: function() {
            return this._7t
        },
        modelName: function() {
            return "media_item"
        }
    }),
    AdController = BaseController.extend({
        init: function(a, b) {
            this._super(a, "AdController", ["AD_BUFFER", "AD_START", "AD_FINISHED", "ENABLED"]);
            this._7u = a;
            this._7v = b;
            var c = this;
            this._7v.subscribe(this._7v.signals.ARCHIVE_TIMESTAMP, function(a) {
                c._7x(a.timestamp)
            })
        },
        initLive: function() {
            if (null != this._7v && this._7v.event().adModel()) {
                var a = this;
                this._7v.messageController().subscribe(this._7v.messageController().signals.MESSAGE_AD, function(b) {
                    a._7y(b)
                });
                this._7v.subscribe(this._7v.signals.EVENT_ENABLED, function() {
                    a._7v.event().setPrerollOnAir(!0);
                    a.emit(a.signals.ENABLED, {})
                })
            }
        },
        initArchive: function(a, b) {
            this.facade().log(Level.DEBUG, "AdController#initArchive", b);
            var c = this;
            this._7w = new ArchiveChunkController(this._7u, "AdController", a, 1, b);
            this._7w.subscribe(this._7w.signals.INSERT, function(a) {
                c._7u.facade().log(Level.DEBUG, "Handling ad message", a);
                c._7y(a.data.ad)
            })
        },
        _7x: function(a) {
            this.facade().log(Level.DEBUG, "AdController#_handleArchiveTimestamp", a);
            this._7w && this._7w.checkTimestamp(a)
        },
        _7y: function(a) {
            switch (a.action) {
                case "buffered":
                    this._7v.event().setMidrollOnAir(!0);
                    this._7v.event().adModel().setDuration(a.duration);
                    this.emit(this.signals.AD_BUFFER, a);
                    break;
                case "started":
                    this.emit(this.signals.AD_START, a);
                    break;
                case "ended":
                    this._7v.event().setMidrollOnAir(!1);
                    this.emit(this.signals.AD_FINISHED, a);
                    break;
                default:
                    this.facade().log(Level.WARNING, "AdController#_handleAdMessage", "Unrecognized setting received", a)
            }
        }
    });