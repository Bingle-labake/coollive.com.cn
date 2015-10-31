/*
var swfobject = function() {
    var aq = "undefined",
        aD = "object",
        ab = "Shockwave Flash",
        X = "ShockwaveFlash.ShockwaveFlash",
        aE = "application/x-shockwave-flash",
        ac = "SWFObjectExprInst",
        ax = "onreadystatechange",
        af = window,
        aL = document,
        aB = navigator,
        aa = false,
        Z = [aN],
        aG = [],
        ag = [],
        al = [],
        aJ, ad, ap, at, ak = false,
        aU = false,
        aH, an, aI = true,
        ah = function() {
            var a = typeof aL.getElementById != aq && typeof aL.getElementsByTagName != aq && typeof aL.createElement != aq,
                e = aB.userAgent.toLowerCase(),
                c = aB.platform.toLowerCase(),
                h = c ? /win/.test(c) : /win/.test(e),
                j = c ? /mac/.test(c) : /mac/.test(e),
                g = /webkit/.test(e) ? parseFloat(e.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
                d = !+"\v1",
                f = [0, 0, 0],
                k = null;
            if (typeof aB.plugins != aq && typeof aB.plugins[ab] == aD) {
                k = aB.plugins[ab].description;
                if (k && !(typeof aB.mimeTypes != aq && aB.mimeTypes[aE] && !aB.mimeTypes[aE].enabledPlugin)) {
                    aa = true;
                    d = false;
                    k = k.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    f[0] = parseInt(k.replace(/^(.*)\..*$/, "$1"), 10);
                    f[1] = parseInt(k.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                    f[2] = /[a-zA-Z]/.test(k) ? parseInt(k.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
                }
            } else {
                if (typeof af.ActiveXObject != aq) {
                    try {
                        var i = new ActiveXObject(X);
                        if (i) {
                            k = i.GetVariable("$version");
                            if (k) {
                                d = true;
                                k = k.split(" ")[1].split(",");
                                f = [parseInt(k[0], 10), parseInt(k[1], 10), parseInt(k[2], 10)]
                            }
                        }
                    } catch (b) {}
                }
            }
            return {
                w3: a,
                pv: f,
                wk: g,
                ie: d,
                win: h,
                mac: j
            }
        }(),
        aK = function() {
            if (!ah.w3) {
                return
            }
            if ((typeof aL.readyState != aq && aL.readyState == "complete") || (typeof aL.readyState == aq && (aL.getElementsByTagName("body")[0] || aL.body))) {
                aP()
            }
            if (!ak) {
                if (typeof aL.addEventListener != aq) {
                    aL.addEventListener("DOMContentLoaded", aP, false)
                }
                if (ah.ie && ah.win) {
                    aL.attachEvent(ax, function() {
                        if (aL.readyState == "complete") {
                            aL.detachEvent(ax, arguments.callee);
                            aP()
                        }
                    });
                    if (af == top) {
                        (function() {
                            if (ak) {
                                return
                            }
                            try {
                                aL.documentElement.doScroll("left")
                            } catch (a) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            aP()
                        })()
                    }
                }
                if (ah.wk) {
                    (function() {
                        if (ak) {
                            return
                        }
                        if (!/loaded|complete/.test(aL.readyState)) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        aP()
                    })()
                }
                aC(aP)
            }
        }();

    function aP() {
        if (ak) {
            return
        }
        try {
            var b = aL.getElementsByTagName("body")[0].appendChild(ar("span"));
            b.parentNode.removeChild(b)
        } catch (a) {
            return
        }
        ak = true;
        var d = Z.length;
        for (var c = 0; c < d; c++) {
            Z[c]()
        }
    }
    function aj(a) {
        if (ak) {
            a()
        } else {
            Z[Z.length] = a
        }
    }
    function aC(a) {
        if (typeof af.addEventListener != aq) {
            af.addEventListener("load", a, false)
        } else {
            if (typeof aL.addEventListener != aq) {
                aL.addEventListener("load", a, false)
            } else {
                if (typeof af.attachEvent != aq) {
                    aM(af, "onload", a)
                } else {
                    if (typeof af.onload == "function") {
                        var b = af.onload;
                        af.onload = function() {
                            b();
                            a()
                        }
                    } else {
                        af.onload = a
                    }
                }
            }
        }
    }
    function aN() {
        if (aa) {
            Y()
        } else {
            am()
        }
    }
    function Y() {
        var d = aL.getElementsByTagName("body")[0];
        var b = ar(aD);
        b.setAttribute("type", aE);
        var a = d.appendChild(b);
        if (a) {
            var c = 0;
            (function() {
                if (typeof a.GetVariable != aq) {
                    var e = a.GetVariable("$version");
                    if (e) {
                        e = e.split(" ")[1].split(",");
                        ah.pv = [parseInt(e[0], 10), parseInt(e[1], 10), parseInt(e[2], 10)]
                    }
                } else {
                    if (c < 10) {
                        c++;
                        setTimeout(arguments.callee, 10);
                        return
                    }
                }
                d.removeChild(b);
                a = null;
                am()
            })()
        } else {
            am()
        }
    }
    function am() {
        var g = aG.length;
        if (g > 0) {
            for (var h = 0; h < g; h++) {
                var c = aG[h].id;
                var l = aG[h].callbackFn;
                var a = {
                    success: false,
                    id: c
                };
                if (ah.pv[0] > 0) {
                    var i = aS(c);
                    if (i) {
                        if (ao(aG[h].swfVersion) && !(ah.wk && ah.wk < 312)) {
                            ay(c, true);
                            if (l) {
                                a.success = true;
                                a.ref = av(c);
                                l(a)
                            }
                        } else {
                            if (aG[h].expressInstall && au()) {
                                var e = {};
                                e.data = aG[h].expressInstall;
                                e.width = i.getAttribute("width") || "0";
                                e.height = i.getAttribute("height") || "0";
                                if (i.getAttribute("class")) {
                                    e.styleclass = i.getAttribute("class")
                                }
                                if (i.getAttribute("align")) {
                                    e.align = i.getAttribute("align")
                                }
                                var f = {};
                                var d = i.getElementsByTagName("param");
                                var k = d.length;
                                for (var j = 0; j < k; j++) {
                                    if (d[j].getAttribute("name").toLowerCase() != "movie") {
                                        f[d[j].getAttribute("name")] = d[j].getAttribute("value")
                                    }
                                }
                                ae(e, f, c, l)
                            } else {
                                aF(i);
                                if (l) {
                                    l(a)
                                }
                            }
                        }
                    }
                } else {
                    ay(c, true);
                    if (l) {
                        var b = av(c);
                        if (b && typeof b.SetVariable != aq) {
                            a.success = true;
                            a.ref = b
                        }
                        l(a)
                    }
                }
            }
        }
    }
    function av(b) {
        var d = null;
        var c = aS(b);
        if (c && c.nodeName == "OBJECT") {
            if (typeof c.SetVariable != aq) {
                d = c
            } else {
                var a = c.getElementsByTagName(aD)[0];
                if (a) {
                    d = a
                }
            }
        }
        return d
    }
    function au() {
        return !aU && ao("6.0.65") && (ah.win || ah.mac) && !(ah.wk && ah.wk < 312)
    }
    function ae(f, d, h, e) {
        aU = true;
        ap = e || null;
        at = {
            success: false,
            id: h
        };
        var a = aS(h);
        if (a) {
            if (a.nodeName == "OBJECT") {
                aJ = aO(a);
                ad = null
            } else {
                aJ = a;
                ad = h
            }
            f.id = ac;
            if (typeof f.width == aq || (!/%$/.test(f.width) && parseInt(f.width, 10) < 310)) {
                f.width = "310"
            }
            if (typeof f.height == aq || (!/%$/.test(f.height) && parseInt(f.height, 10) < 137)) {
                f.height = "137"
            }
            aL.title = aL.title.slice(0, 47) + " - Flash Player Installation";
            var b = ah.ie && ah.win ? "ActiveX" : "PlugIn",
                c = "MMredirectURL=" + af.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + b + "&MMdoctitle=" + aL.title;
            if (typeof d.flashvars != aq) {
                d.flashvars += "&" + c
            } else {
                d.flashvars = c
            }
            if (ah.ie && ah.win && a.readyState != 4) {
                var g = ar("div");
                h += "SWFObjectNew";
                g.setAttribute("id", h);
                a.parentNode.insertBefore(g, a);
                a.style.display = "none";
                (function() {
                    if (a.readyState == 4) {
                        a.parentNode.removeChild(a)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            }
            aA(f, d, h)
        }
    }
    function aF(a) {
        if (ah.ie && ah.win && a.readyState != 4) {
            var b = ar("div");
            a.parentNode.insertBefore(b, a);
            b.parentNode.replaceChild(aO(a), b);
            a.style.display = "none";
            (function() {
                if (a.readyState == 4) {
                    a.parentNode.removeChild(a)
                } else {
                    setTimeout(arguments.callee, 10)
                }
            })()
        } else {
            a.parentNode.replaceChild(aO(a), a)
        }
    }
    function aO(b) {
        var d = ar("div");
        if (ah.win && ah.ie) {
            d.innerHTML = b.innerHTML
        } else {
            var e = b.getElementsByTagName(aD)[0];
            if (e) {
                var a = e.childNodes;
                if (a) {
                    var f = a.length;
                    for (var c = 0; c < f; c++) {
                        if (!(a[c].nodeType == 1 && a[c].nodeName == "PARAM") && !(a[c].nodeType == 8)) {
                            d.appendChild(a[c].cloneNode(true))
                        }
                    }
                }
            }
        }
        return d
    }
    function aA(e, g, c) {
        var d, a = aS(c);
        if (ah.wk && ah.wk < 312) {
            return d
        }
        if (a) {
            if (typeof e.id == aq) {
                e.id = c
            }
            if (ah.ie && ah.win) {
                var f = "";
                for (var i in e) {
                    if (e[i] != Object.prototype[i]) {
                        if (i.toLowerCase() == "data") {
                            g.movie = e[i]
                        } else {
                            if (i.toLowerCase() == "styleclass") {
                                f += ' class="' + e[i] + '"'
                            } else {
                                if (i.toLowerCase() != "classid") {
                                    f += " " + i + '="' + e[i] + '"'
                                }
                            }
                        }
                    }
                }
                var h = "";
                for (var j in g) {
                    if (g[j] != Object.prototype[j]) {
                        h += '<param name="' + j + '" value="' + g[j] + '" />'
                    }
                }
                a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + f + ">" + h + "</object>";
                ag[ag.length] = e.id;
                d = aS(e.id)
            } else {
                var b = ar(aD);
                b.setAttribute("type", aE);
                for (var k in e) {
                    if (e[k] != Object.prototype[k]) {
                        if (k.toLowerCase() == "styleclass") {
                            b.setAttribute("class", e[k])
                        } else {
                            if (k.toLowerCase() != "classid") {
                                b.setAttribute(k, e[k])
                            }
                        }
                    }
                }
                for (var l in g) {
                    if (g[l] != Object.prototype[l] && l.toLowerCase() != "movie") {
                        aQ(b, l, g[l])
                    }
                }
                a.parentNode.replaceChild(b, a);
                d = b
            }
        }
        return d
    }
    function aQ(b, d, c) {
        var a = ar("param");
        a.setAttribute("name", d);
        a.setAttribute("value", c);
        b.appendChild(a)
    }
    function aw(a) {
        var b = aS(a);
        if (b && b.nodeName == "OBJECT") {
            if (ah.ie && ah.win) {
                b.style.display = "none";
                (function() {
                    if (b.readyState == 4) {
                        aT(a)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            } else {
                b.parentNode.removeChild(b)
            }
        }
    }
    function aT(a) {
        var b = aS(a);
        if (b) {
            for (var c in b) {
                if (typeof b[c] == "function") {
                    b[c] = null
                }
            }
            b.parentNode.removeChild(b)
        }
    }
    function aS(a) {
        var c = null;
        try {
            c = aL.getElementById(a)
        } catch (b) {}
        return c
    }
    function ar(a) {
        return aL.createElement(a)
    }
    function aM(a, c, b) {
        a.attachEvent(c, b);
        al[al.length] = [a, c, b]
    }
    function ao(a) {
        var b = ah.pv,
            c = a.split(".");
        c[0] = parseInt(c[0], 10);
        c[1] = parseInt(c[1], 10) || 0;
        c[2] = parseInt(c[2], 10) || 0;
        return (b[0] > c[0] || (b[0] == c[0] && b[1] > c[1]) || (b[0] == c[0] && b[1] == c[1] && b[2] >= c[2])) ? true : false
    }
    function az(b, f, a, c) {
        if (ah.ie && ah.mac) {
            return
        }
        var e = aL.getElementsByTagName("head")[0];
        if (!e) {
            return
        }
        var g = (a && typeof a == "string") ? a : "screen";
        if (c) {
            aH = null;
            an = null
        }
        if (!aH || an != g) {
            var d = ar("style");
            d.setAttribute("type", "text/css");
            d.setAttribute("media", g);
            aH = e.appendChild(d);
            if (ah.ie && ah.win && typeof aL.styleSheets != aq && aL.styleSheets.length > 0) {
                aH = aL.styleSheets[aL.styleSheets.length - 1]
            }
            an = g
        }
        if (ah.ie && ah.win) {
            if (aH && typeof aH.addRule == aD) {
                aH.addRule(b, f)
            }
        } else {
            if (aH && typeof aL.createTextNode != aq) {
                aH.appendChild(aL.createTextNode(b + " {" + f + "}"))
            }
        }
    }
    function ay(a, c) {
        if (!aI) {
            return
        }
        var b = c ? "visible" : "hidden";
        if (ak && aS(a)) {
            aS(a).style.visibility = b
        } else {
            az("#" + a, "visibility:" + b)
        }
    }
    function ai(b) {
        var a = /[\\\"<>\.;]/;
        var c = a.exec(b) != null;
        return c && typeof encodeURIComponent != aq ? encodeURIComponent(b) : b
    }
    var aR = function() {
        if (ah.ie && ah.win) {
            window.attachEvent("onunload", function() {
                var a = al.length;
                for (var b = 0; b < a; b++) {
                    al[b][0].detachEvent(al[b][1], al[b][2])
                }
                var d = ag.length;
                for (var c = 0; c < d; c++) {
                    aw(ag[c])
                }
                for (var e in ah) {
                    ah[e] = null
                }
                ah = null;
                for (var f in swfobject) {
                    swfobject[f] = null
                }
                swfobject = null
            })
        }
    }();
    return {
        registerObject: function(a, e, c, b) {
            if (ah.w3 && a && e) {
                var d = {};
                d.id = a;
                d.swfVersion = e;
                d.expressInstall = c;
                d.callbackFn = b;
                aG[aG.length] = d;
                ay(a, false)
            } else {
                if (b) {
                    b({
                        success: false,
                        id: a
                    })
                }
            }
        },
        getObjectById: function(a) {
            if (ah.w3) {
                return av(a)
            }
        },
        embedSWF: function(k, e, h, f, c, a, b, i, g, j) {
            var d = {
                success: false,
                id: e
            };
            if (ah.w3 && !(ah.wk && ah.wk < 312) && k && e && h && f && c) {
                ay(e, false);
                aj(function() {
                    h += "";
                    f += "";
                    var q = {};
                    if (g && typeof g === aD) {
                        for (var o in g) {
                            q[o] = g[o]
                        }
                    }
                    q.data = k;
                    q.width = h;
                    q.height = f;
                    var n = {};
                    if (i && typeof i === aD) {
                        for (var p in i) {
                            n[p] = i[p]
                        }
                    }
                    if (b && typeof b === aD) {
                        for (var l in b) {
                            if (typeof n.flashvars != aq) {
                                n.flashvars += "&" + l + "=" + b[l]
                            } else {
                                n.flashvars = l + "=" + b[l]
                            }
                        }
                    }
                    if (ao(c)) {
                        var m = aA(q, n, e);
                        if (q.id == e) {
                            ay(e, true)
                        }
                        d.success = true;
                        d.ref = m
                    } else {
                        if (a && au()) {
                            q.data = a;
                            ae(q, n, e, j);
                            return
                        } else {
                            ay(e, true)
                        }
                    }
                    if (j) {
                        j(d)
                    }
                })
            } else {
                if (j) {
                    j(d)
                }
            }
        },
        switchOffAutoHideShow: function() {
            aI = false
        },
        ua: ah,
        getFlashPlayerVersion: function() {
            return {
                major: ah.pv[0],
                minor: ah.pv[1],
                release: ah.pv[2]
            }
        },
        hasFlashPlayerVersion: ao,
        createSWF: function(a, b, c) {
            if (ah.w3) {
                return aA(a, b, c)
            } else {
                return undefined
            }
        },
        showExpressInstall: function(b, a, d, c) {
            if (ah.w3 && au()) {
                ae(b, a, d, c)
            }
        },
        removeSWF: function(a) {
            if (ah.w3) {
                aw(a)
            }
        },
        createCSS: function(b, a, c, d) {
            if (ah.w3) {
                az(b, a, c, d)
            }
        },
        addDomLoadEvent: aj,
        addLoadEvent: aC,
        getQueryParamValue: function(b) {
            var a = aL.location.search || aL.location.hash;
            if (a) {
                if (/\?/.test(a)) {
                    a = a.split("?")[1]
                }
                if (b == null) {
                    return ai(a)
                }
                var c = a.split("&");
                for (var d = 0; d < c.length; d++) {
                    if (c[d].substring(0, c[d].indexOf("=")) == b) {
                        return ai(c[d].substring((c[d].indexOf("=") + 1)))
                    }
                }
            }
            return ""
        },
        expressInstallCallback: function() {
            if (aU) {
                var a = aS(ac);
                if (a && aJ) {
                    a.parentNode.replaceChild(aJ, a);
                    if (ad) {
                        ay(ad, true);
                        if (ah.ie && ah.win) {
                            aJ.style.display = "block"
                        }
                    }
                    if (ap) {
                        ap(at)
                    }
                }
                aU = false
            }
        }
    }
}();
*/
var SpreeScroll = Class.extend({
    init: function(f, c, d) {
        var e = {
            topOffset: 0,
            bottomOffset: 0
        };
        var b = jQuery.extend(true, {}, e);
        d = $.extend(b, d);
        this.topOffset = d.topOffset;
        this.bottomOffset = d.bottomOffset;
        var a = this;
        this.$container = f;
        this.$list = SpreeScroll.getList(c);
        this.addHandle();
        this.handleVisible = false;
        this.handleHeight = 0;
        this.contentPosition = 0;
        this.touchStartY = this.$container.offset().top;
        this.updateHandle(function() {
            a.move(-1, "max")
        });
        $(window).on("resize", function() {
            a.updateHandle(function() {
                a.jump(a.handlePosition())
            })
        });
        this.bindScrollbar();
        this.bindWheelEvents();
        this.bindKeystrokes();
        this.bindMouseovers();
        this.bindTouchEvents()
    },
    addHandle: function() {
        this.$scroll = $('<div class="scrollbar"></div>');
        this.$handle = $('<div class="handle"></div>');
        this.$container.append(this.$scroll.append(this.$handle))
    },
    bindMouseovers: function() {
        var a = this;
        this.$container.mouseover(function() {
            a.inBounds = true
        }).mouseout(function() {
            delete a.inBounds
        })
    },
    bindKeystrokes: function() {
        var a = this;
        $(document).keydown(function(b) {
            if (a.inBounds) {
                if (((b.which == 38) || (b.which == 40))) {
                    return a.move(39 - b.which, a.handleHeight)
                } else {
                    if ((b.which == 33) || (b.which == 34)) {
                        return a.move(33 - b.which, 5)
                    } else {
                        if ((b.which == 35) || (b.which) == 36) {
                            return a.move(b.which - 36, "max")
                        }
                    }
                }
            }
        })
    },
    bindScrollbar: function() {
        var a = this;
        this.$handle.draggable({
            axis: "y",
            containment: "parent",
            revert: false,
            scroll: true,
            drag: function(b) {
                b.stopPropagation();
                a.setContentPosition()
            }
        });
        this.$scroll.click(function(d) {
            d.stopPropagation();
            var b = $(this).offset();
            var c = (d.pageY - b.top);
            c -= (a.handleHeight / 2);
            a.jump(c)
        })
    },
    bindTouchEvents: function() {
        var a = this;
        this.$container[0].addEventListener("touchstart", function(b) {
            a.touchStartY = b.touches[0].pageY
        });
        this.$container[0].addEventListener("touchmove", function(f) {
            f.preventDefault();
            var d = a.touchStartY - f.touches[0].pageY;
            var b = d < 0 ? -1 : 1;
            var c = Math.abs(d);
            a.move(b, c);
            return false
        })
    },
    bindWheelEvents: function() {
        var a = this;
        var b = function(g) {
            g.preventDefault ? g.preventDefault() : g.returnValue = false;
            var f = g.detail || g.deltaY || g.wheelDelta;
            var c = f < 0 ? -1 : 1;
            var d = Math.abs(f);
            a.move(c, d);
            return false
        };
        if ("onwheel" in this.$container[0]) {
            this.$container[0].onwheel = b
        } else {
            if ("onmousewheel" in this.$container[0]) {
                this.$container[0].onmousewheel = function(c) {
                    c = c || window.event;
                    b(c)
                }
            } else {
                this.$container[0].addEventListener("DOMMouseScroll", b)
            }
        }
    },
    updateWithPercentage: function(a) {
        var b = this;
        this.updateHandle(function() {
            b.jumpToPercent(a)
        })
    },
    handlePercentage: function() {
        if (!this.handleVisible) {
            return 0
        }
        var a = this.containerHeight() - this.handleHeight;
        return 1 - ((a - this.handlePosition()) / a)
    },
    handlePosition: function() {
        return parseInt(this.$handle.css("top")) - this.minTop()
    },
    setHandlePosition: function(a) {
        this.$handle.css("top", a + this.minTop());
        this.setContentPosition()
    },
    setContentPosition: function() {
        var a = this.computeContentPos(this.handlePosition());
        this.$list.css("top", a);
        this.contentPosition = a
    },
    computeContentPos: function(c) {
        var a = this.containerHeight() - this.handleHeight;
        var b = c == 0 ? 0 : (c / a);
        var d = Math.floor(b * (this.containerHeight() - this.contentHeight()));
        return d
    },
    destroy: function() {
        this.$scroll.remove();
        this.$list.css("top", "")
    },
    move: function(a, b) {
        if (typeof(b) == "number") {
            var c = b * a
        } else {
            if (b === "max") {
                var c = a * this.containerHeight()
            }
        }
        this.jump(this.handlePosition() + c);
        return false
    },
    jump: function(b) {
        if (!this.handleVisible) {
            return
        }
        var a = Math.max(0, Math.min(this.maxTop(), b));
        this.setHandlePosition(Math.floor(a))
    },
    jumpToPercent: function(a) {
        if (!this.handleVisible) {
            return
        }
        var b = this.containerHeight() - this.handleHeight;
        var c = a * b;
        this.setHandlePosition(Math.floor(c))
    },
    reset: function() {
        this.$list.css("top", 0);
        this.move(-1, "max")
    },
    updateHandleWork: function(d) {
        var c = this.containerHeight(),
            a = this.contentHeight();
        if (c <= 0 || a < c) {
            this.$scroll.hide();
            this.handleVisible = false
        } else {
            var b = Math.floor(c * c / a);
            this.$handle.height(b);
            this.handleHeight = b;
            this.$scroll.show();
            this.handleVisible = true
        }
        if (d) {
            d()
        }
    },
    updateHandle: function(b) {
        var a = this;
        if (this.updateScheduled) {
            clearTimeout(this.updateScheduled)
        }
        this.updateScheduled = setTimeout(function() {
            delete a.updateScheduled;
            a.updateHandleWork(b)
        }, 500)
    },
    minTop: function() {
        return this.topOffset
    },
    maxTop: function() {
        return this.containerHeight() - this.handleHeight
    },
    contentHeight: function() {
        return this.$list[0].scrollHeight
    },
    containerHeight: function() {
        return this.$container.outerHeight() - (this.topOffset + this.bottomOffset)
    }
});
SpreeScroll.wheelDistance = function(h) {
    var d = h.detail || h.deltaY,
        c = h.wheelDelta;
    var j = 0;
    if (d) {
        var f = c / d;
        if (c && f) {
            j = d / f
        } else {
            j = -d / 1.35
        }
    } else {
        j = c / 120
    }
    var i = 225,
        g = i - 1;
    if (j < 1) {
        if (j < -1) {
            j = (-Math.pow(j, 2) - g) / i
        }
    } else {
        j = (Math.pow(j, 2) + g) / i
    }
    return Math.min(Math.max(j / 2, -1), 1)
};
SpreeScroll.getList = function(b) {
    var a = b.filter("ul");
    if (a.length == 0) {
        a = b.find("ul");
        if (a.length == 0) {
            a = b
        }
    }
    return $(a[0])
};
var Spreecast = PageController.extend({
    defaults: function() {
        var d = !! (getHashParams()["legacy"]);
        var b = "qb";
        if (d || getHashParams()["control"] == "bb") {
            b = "bb"
        }
        var a = (d ? 320 : 640);
        var c = (b == "qb" ? 0 : (d ? 40000 : 50000));
        var e = (b == "qb" ? 82 : 0);
        return {
            legacyCaptureWidth: 320,
            legacyInitialByterate: 40000,
            captureWidth: a,
            initialByterate: c,
            initialQuality: e,
            flashParams: {
                quality: "best",
                allowfullscreen: true,
                wmode: "opaque"
            },
            flashVars: {
                debugMode: false,
                useStitchedRtmp: true,
                highQuality: (d ? false : true),
                nVideoGutterX: 0,
                nVideoGutterY: 0,
                nCamQuality: 0,
                nCamQualityLow: 0,
                nCamBandwidthLow: 40000,
                nSoundFramesPerPacket: 1,
                nSoundRate: 11,
                sSoundCodec: "Speex",
                nSoundEncodeQuality: 10,
                nSoundGain: 40,
                nSilenceLevel: 0,
                bSoundEchoSuppresion: false,
                bSoundLoopBack: false,
                sEchoMode: "fullDuplex",
                bAutoGain: false,
                nEchoPath: 128,
                bNonLinearProcessing: true,
                nMaximumDesync: 500,
                bEnableAkamaiPlugin: false,
                origin: [window.location.protocol, window.location.hostname].join("//"),
                event_id: spree.event.event_id,
                event_friendly_id: spree.event.friendly_id,
                clip_id: (spree.clip ? spree.clip.clip_id : null),
                event_status: spree.event.status,
                strPlayerMode: (spree.event.status == 2 || spree.event.status == 4) ? "archive" : "live",
                notificationLevel: (spree.scm_env == "production" ? null : "DebugHi")
            },
            framesPerSecond: 30,
            latestVideoSnapshot: {},
            micGain: 50,
            minimumFlashVersion: "10.3.0",
            securityOpened: false,
            volume: 100,
            $col: $(".column.sidebar aside"),
            $videoControls: $("#video_controls"),
            $eventStage: $("#event_stage"),
            block_duplicate_user_redirects: false,
            received_my_event_participation_new: false,
            request_maxed_message_shown: []
        }
    },
    init: function(b) {
        this._super();
        Spreecast.viewerURLs = {};
        Spreecast.viewerURLs.viewers = "/" + ["events", spree.event.friendly_id, "users"].join("/");
        Spreecast.viewerURLs.producers = "/" + ["events", spree.event.friendly_id, "producers"].join("/");
        Spreecast.viewerURLs.onair = "/" + ["events", spree.event.friendly_id, "users"].join("/");
        Spreecast.viewerURLs.pending = "/" + ["events", spree.event.friendly_id, "users"].join("/");
        $.embedly.defaults.key = "2d260af208c341219b75e06077adaafd";
        var c = {
            category: "privacy",
            action: spree.event.visibility == 0 ? "public" : spree.event.visibility == 1 ? "private" : "unlisted"
        };
        spree.analytics.log(c);
        if (!getHashParams()["logging"] && spree.scm_env != "development" && !$.cookie("debug")) {
            console.log = function() {}
        }
        if (!spree.user) {
            spree.user = {}
        }
        var a = spree.spreecast = spree.pageController = this;
        _.each(_.extend(this.defaults(), b), function(e, d) {
            a[d] = e
        });
        spree.user = User.createOrUpdate(_.extend(spree.user, {
            current_user: true
        }));
        this.flashAppsToInstantiate = (spree.user.producer && spree.event.status < 2 && !spree.is_embed) ? 2 : 1;
        //this.flashVersion = swfobject.getFlashPlayerVersion()["major"];
        this.bindClickMethods();
        //this.bindFlashMethods();
        if (spree.event) {
            this.decrementFollowPromptCookie()
        }
        /*
        if (spree.event && spree.event.legacy_rtmp) {
            this.flashVars.useStitchedRtmp = false;
            this.flashVars.highQuality = false;
            this.captureWidth = this.legacyCaptureWidth;
            this.initialByterate = legacyInitialByterate;
            this.initialQuality = 0
        }
        */
        this.producer = new Producer();
        spree.recommended = new Recommended();
        this.playback = !! (spree.event.status == 2 || spree.event.status == 4);
        this.chatsDisplayed = false;
        this.rendered = false;
        this.url = "http://www.coollive.com.cn/events/" + spree.event.event_id;
        if (spree.serverResponse.digest && !spree.eventIsScheduledOrLive()) {
            if (spree.serverResponse.digest.stitch_urls.archive_rtmp) {
                $("#event_main .overlay").addClass("stitch_available")
            } else {
                $("#event_main .overlay").addClass("stitch_unavailable")
            }
        }
        if (!spree.isMobile() && $("body").hasClass("events_show")) {
            new FacecardContainer(spree.user.producer)
        }
        if (spree.event.status == 2) {
            this.getDigest()
        } else {
            if (spree.event.status != 4) {
                if ($("body").hasClass("events_show")) {
                    if (!(spree.isMobile() || spree.isTablet())) {
                        $(blocker).trigger("spree:show-blocker");
                        this.startFlashApps()
                    } else {
                        $(blocker).trigger("spree:hide-blocker");
                        this.getDigest()
                    }
                }
            }
        }
        if (spree.event.startTime && spree.event.status == 1) {
            this.startTime = spree.event.startTime;
            this.startClock()
        }
        if (spree.user.producer || spree.user.broadcast_status == 2 || spree.user.admin) {
            this.setWallpassCookie()
        }
        $(document).trigger("spree:loaded");
        if (spree.event.status == 4) {
            this.getDigest()
        }
        if (spree.event.archive_unavailable) {
            $("#event_social li.info").click();
            $(".overlay").removeClass("stitch_unavailable");
            $("#broadcast_wrapper").html(spree.hbTemplate("archives-unavailable"))
        }
    },
    bindClickMethods: function() {
        var a = this;
        _.each(Spreecast.clickMethods, function(c, b) {
            $(document).on("click", b, function(d) {
                c.apply(this, [d])
            })
        })
    },
    bindFlashMethods: function() {
        var a = this;
        _.each(Spreecast.flashMethods, function(c, b) {
            window["flash" + b] = function() {
                try {
                    c.apply(a, arguments)
                } catch (d) {
                    console.log(d, c, b)
                }
            }
        })
    },
    startFlashApps: function() {
        $(document).trigger("app:loading", "Checking flash version");
        var a = this;
        /*
        if (!swfobject.hasFlashPlayerVersion(this.minimumFlashVersion)) {
            $("#toggle-broadcast").attr("disabled", true);
            $(blocker).trigger("spree:hide-blocker");
            spree.modalMgr.create("flash-upgrade")
        }
        this.instantiateFlashApp("broadcast")
        */
    },
    setupPushService: function() {
        var a = this;
        $(window).bind("beforeunload", function() {
            a.block_duplicate_user_redirects = true;
            if (spree.user.broadcast_status != 0) {
                var b = spree.ecma.eventController;
                if (b && b.messageController()) {
                    b.messageController().close()
                }
            }
        });
        this.getDigest()
    },
    cancelEvent: function() {
        new GeneralConfirm({
            question: "Wait... Do you really want to cancel the spreecast for everyone?",
            text: "If you just want to change the Date and Time or privacy settings click the Edit link above the Spreecast screen.",
            confirmText: "Cancel Spreecast",
            confirmCB: function() {
                spree.user.cancel_click = true;
                spree.ecma.eventController.cancel(function() {
                    window.location = "/"
                })
            },
            cancelText: "No, don't cancel",
            width: 480
        })
    },
    displayPromotionDialog: function(c) {
        var a = function(d) {
            if (d == 1) {
                spree.ecma.eventController.broadcastController().promotionRefuse()
            } else {
                spree.ecma.eventController.producerController().promotionRefuse()
            }
        };
        var b = function(d) {
            if (d == 1) {
                spree.ecma.eventController.broadcastController().promotionAccept()
            } else {
                spree.ecma.eventController.producerController().promotionAccept()
            }
        };
        if (!(spree.isTablet() || spree.isMobile())) {
            new GeneralConfirm({
                question: (c == 1 ? "Would you like to join on camera?" : "Want to be a producer of this Spreecast?"),
                text: (c == 1 ? 'One of the producers of this spreecast has invited you to join on camera. To do so, click "Yes", then follow the instructions on screen.' : 'A producer would like you to help them produce this spreecast. Your webcam will be turned on in order to communicate with others involved in this spreecast. After you say "Yes", your page will automatically be refreshed.'),
                confirmText: (c == 1 ? "Yes, I'll join on camera" : "Yes, I'll be a producer"),
                width: (c == 1 ? 460 : 560),
                confirmCB: function() {
                    b(c)
                },
                cancelText: (c == 1 ? "No, thanks" : "No thanks, I'll pass"),
                cancelCB: function() {
                    a(c)
                },
                dialogClass: "promotion"
            });
            $(".ui-dialog-titlebar-close").click(function() {
                a(c)
            })
        }
    },
    formatTime: function(b) {
        var a = b.getHours() % 12;
        if (a == 0) {
            a = 12
        }
        return (this.isToday(b) ? "" : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][b.getDay()] + " ") + [a, ("0" + b.getMinutes()).slice(-2)].join(":") + (b.getHours() > 11 ? " 下午" : " 上午")
    },
    isToday: function(b) {
        var a = new Date();
        return (b.getDate() == a.getDate()) && (b.getMonth() == a.getMonth()) && (b.getFullYear() == a.getFullYear())
    },
    showEvent: function(c, b) {
        $(document).trigger("event:status:live");
        if (c) {
            $(document).trigger("event:broadcast-status", "on");
            this.startClock();
            this.videoDigest.start_event_time_string = c.actual_start_time.toString()
        }
        $(".broadcast_component").show();
        if (this.securityOpened) {
            this.$videoControls.hide()
        }
        var a = this;
        a.startForViewer = function() {
            a.videoIsReady = true;
            if (a.videoDigest && a.videoDigest.video_snapshots) {
                a.latestVideoSnapshot = _.last(a.videoDigest.video_snapshots)
            } else {
                a.latestVideoSnapshot = {}
            }
            a.drawVideoControls();
            a.render();
            spree.setupEcma();
            if (b && b.callback) {
                b.callback()
            }
            $(document).trigger("event:show:done")
        }
    },
    updateViewerCount: function(b) {
        var a = $(".viewer-count-container .attendee-count");
        a.attr("data-viewers", numberWithCommas(b));
        if (b > 1) {
            a.addClass("plural")
        }
        if (this.faceblock) {
            this.faceblock.setViewerCount(b)
        }
        if (this.viewerRail) {
            this.viewerRail.setViewerCount(b)
        }
    },
    shouldAutoStart: function() {
        return ((!this.hasAutoStarted) && (spree.event.status == 0) && (spree.user.owner) && (this.paneCount() == 0))
    },
    paneCount: function() {
        return (this.latestVideoSnapshot.video_snapshot ? _.reject(this.latestVideoSnapshot.video_snapshot.video_feeds, function(a) {
            return (a.video_pane < 0)
        }).length : 0)
    },
    mediaFeeds: function() {
        return this.latestVideoSnapshot.video_snapshot ? _.map(this.latestVideoSnapshot.video_snapshot.video_feeds, function(a) {
            if (a.media) {
                return a.media
            }
        }) : []
    },
    getPreviewLocation: function() {
        return (getHashParams()["rtmp"] ? spree.user.preview_location.replace("rtmfp://", "rtmp://") : spree.user.preview_location)
    },
    showChatAwarenessTip: function() {
        var a = spree.hbTemplate("chat-awareness-tip");
        $("#event_stage").append(a)
    },
    updateOnAirNotice: function(a) {
        var b = ViewerListing.getClasses(a);
        if (b.indexOf("onair") != -1) {
            $("#producer-status").attr("class", b);
            $(".spreecast_now").addClass("is-visually-hidden")
        } else {
            $("#producer-status").attr("class", "is-visually-hidden");
            $(".spreecast_now").removeClass("is-visually-hidden")
        }
    },
    putProducerOnAirIfPreSpreecast: function() {
        if (this.shouldAutoStart()) {
            console.log("put producer on air");
            this.hasAutoStarted = true;
            spree.user.startBroadcast();
            return true
        }
        return false
    },
    launchFullEvent: function() {
        window.open(spree.event.event_url, "_blank");
        window.location = spree.event.event_url + "/unavailable/" + this.embed_size
    },
    startBroadcast: function(c, a, d, e) {
        this.hasAutoStarted = true;
        var b = User.find(a);
        if (b && b.$queueItem) {
            b.$queueItem.addClass("now_broadcasting")
        }
        if (e != null) {
            return
        }
        spree.ecma.eventController.producerController().startBroadcast(a);
        if (b) {
            $(document).trigger("broadcast_request:started", b)
        }
    },
    end: function() {
        spree.ecma.eventController.end(function() {
            $("#toggle-broadcast").remove()
        })
    },
    start: function() {
        spree.ecma.eventController.start(function() {
            $("#toggle-broadcast").attr("data-state", "end")
        })
    },
    startClock: function() {
        if (!this.startTime) {
            this.startTime = new Date().getTime()
        }
        var a = this;
        this.eventClock = setInterval(function() {
            var e = parseInt((new Date().getTime() - a.startTime) / 1000),
                d = 0,
                b = 0,
                c;
            if (e > 59) {
                var d = (e - e % 60) / 60;
                e = (e % 60)
            }
            if (d > 59) {
                var b = (d - d % 60) / 60;
                c = [b, d, e];
                d = (d % 60)
            }
            if (e < 10) {
                e = "0" + e
            }
            if (d < 10) {
                d = "0" + d
            }
            c = [d, e];
            if (b > 0) {
                c.unshift(b)
            }
            $("#event_clock").text(c.join(":"))
        }, 1000)
    },
    decrementFollowPromptCookie: function() {
        var a = $.cookie("follow-prompts");
        a = a ? JSON.parse(a) : {};
        if (a[spree.event.host.user_id]) {
            a[spree.event.host.user_id] = a[spree.event.host.user_id] - 1;
            if (a[spree.event.host.user_id] == 0) {
                delete a[spree.event.host.user_id]
            }
            if (_.isEmpty(a)) {
                $.removeCookie("follow-prompts", {
                    path: "/"
                })
            } else {
                $.cookie("follow-prompts", JSON.stringify(a), {
                    path: "/",
                    expires: 7
                })
            }
        }
    },
    shouldShowFollowPrompt: function() {
        var a = true;
        if (spree.user.id === spree.event.host.user_id) {
            a = false
        }
        if (spree.user.following && spree.user.following.indexOf(spree.event.host.alt) >= 0) {
            a = false
        }
        var c = $.cookie("follow-prompts");
        c = c ? JSON.parse(c) : {};
        if (c[spree.event.host.user_id]) {
            a = false
        }
        var b = spree.is_embed ? "EmbedFollowBanner" : "PageFollowBanner";
        if (spree.spreecast.promptToFollowTask || !$("[data-type=" + b + "]").hasClass("hidden")) {
            a = false
        }
        return a
    },
    showFollowPrompt: function() {
        if (!this.shouldShowFollowPrompt()) {
            return
        }
        var a = spree.is_embed ? "EmbedFollowBanner" : "PageFollowBanner";
        spree.bannerMgr.show(a)
    },
    queueFollowPrompt: function(b) {
        var a = this;
        b = (b !== undefined) ? b : 180000;
        if (this.promptToFollowTask) {
            clearTimeout(this.promptToFollowTask)
        }
        this.promptToFollowTask = setTimeout(function() {
            delete a.promptToFollowTask;
            a.showFollowPrompt()
        }, b)
    },
    shouldShowUpgradePrompt: function() {
        var b = true;
        if (spree.user.id !== spree.event.host.user_id) {
            b = false
        }
        if (spree.user.plan_name !== "Basic") {
            b = false
        }
        var a = $.cookie("upgrade-prompts");
        a = a ? JSON.parse(a) : {};
        if (a[spree.user.plan_name]) {
            b = false
        }
        if (spree.is_embed) {
            b = false
        }
        var c = "UpgradeBanner";
        if (spree.spreecast.promptToUpgradeTask || !$("[data-type=" + c + "]").hasClass("hidden")) {
            b = false
        }
        return b
    },
    showUpgradePrompt: function() {
        if (!this.shouldShowUpgradePrompt()) {
            return
        }
        spree.bannerMgr.show("UpgradeBanner")
    },
    queueUpgradePrompt: function(b) {
        var a = this;
        b = (b !== undefined) ? b : 180000;
        if (this.promptToUpgradeTask) {
            clearTimeout(this.promptToUpgradeTask)
        }
        this.promptToUpgradeTask = setTimeout(function() {
            delete a.promptToUpgradeTask;
            a.showUpgradePrompt()
        }, b)
    },
    toggleProducerControls: function() {
        var a = $("#producer-nav");
        if (a.hasClass("active")) {
            spree.bannerMgr.hide("ProducerSettingsBanner", false)
        } else {
            a.addClass("active");
            spree.bannerMgr.show("ProducerSettingsBanner")
        }
    },
    performRenderActions: function() {
        this._super();
        $(".preview-title a").ellipsis();
        if (!spree.user.producer && spree.event.status == 0) {
            this.expandDescription()
        }
    },
    performActions: function(a) {
        this._super(a);
        if (a) {
            if (a.events && a.events.rsvp) {
                spree.toggleFollowItem("follow_button_Event_" + spree.event.friendly_id, true)
            } else {
                if (a.profile) {
                    spree.toggleFollowItem("follow_button_User_" + spree.event.host.user_id, true, 0)
                }
            }
        }
    },
    instantiateFlashApp: function(b) {
        if (window.location.href.indexOf("use_stitched=false") > -1) {
            console.log("use_stitched=false");
            this.flashVars.useStitchedRtmp = false
        } else {
            console.log("use_stitched=true")
        }
        var f = getHashParams()["faa"],
            c = {
                id: b,
                name: b,
                align: "middle"
            },
            e, a, d = this.flashAppUrl(b);
        _.extend(this.flashVars, {
            nCamWidth: this.captureWidth,
            nCamFps: this.framesPerSecond,
            nCamKeyFrameInterval: this.framesPerSecond * (getHashParams()["kfi"] ? getHashParams()["kfi"] : 1),
            appName: b,
            currentUserID: spree.user.user_id,
            nCamQuality: this.initialQuality,
            nCamBandwidth: this.initialByterate,
            isProducer: spree.user.producer,
            isEmbed: spree.is_embed
        });
        this.flashParams.allowscriptaccess = "always";
        /*
        if (b == "pending_preview") {
            this.flashVars.mute = true;
            swfobject.embedSWF(d, b, "100%", "100%", this.minimumFlashVersion, spree.cdn_prefix + "/flash/expressInstall.swf", {
                appName: "pending_preview"
            }, {}, {})
        } else {
            if (!this.videoIsReady) {
                swfobject.embedSWF(f ? f : d, b, "100%", "100%", this.minimumFlashVersion, spree.cdn_prefix + "/flash/expressInstall.swf", this.flashVars, this.flashParams, c, function(g) {
                    if (g.success) {
                        console.info("Flash embedded successfully")
                    } else {
                        console.error("Unable to embed flash object (bad version?)")
                    }
                })
            }
        }
        */
        if (b == "broadcast") {
            $(window).bind("beforeunload", function(g) {
                document.broadcast.shutdown()
            })
        }
        $(document).trigger(b + ":started")
    },
    paneCount: function() {
        return ((this.latestVideoSnapshot && this.latestVideoSnapshot.video_snapshot) ? _.reject(this.latestVideoSnapshot.video_snapshot.video_feeds, function(a) {
            return (a.video_pane < 0)
        }).length : 0)
    },
    mediaFeeds: function() {
        return this.latestVideoSnapshot.video_snapshot ? _.map(this.latestVideoSnapshot.video_snapshot.video_feeds, function(a) {
            if (a.media) {
                return a.media
            }
        }) : []
    },
    setBroadcastingStatus: function(b) {
        if (b.started_user) {
            var a = User.find(b.started_user.user_id);
            if (a) {
                a.startBroadcastComplete()
            }
        }
        if (b.ended_user) {
            var a = User.find(b.ended_user.user_id);
            if (a) {
                a.stopBroadcastComplete()
            }
        }
    },
    drawVideoControls: function() {
        var c = this,
            d = this.paneCount(),
            b = {
                "0": "initial",
                "1": "fullscreen",
                "2": "splitscreen",
                "3": "triscreen",
                "4": "quadscreen"
            },
            a = b[d];
        if (this.$videoControls) {
            this.$videoControls.add(c.$eventStage).removeClass("initial fullscreen splitscreen triscreen quadscreen").removeClass("owns_0 owns_1 owns_2 owns_3").removeClass("broadcasting").addClass(a).addClass(spree.user.broadcast_status == 2 ? "broadcasting" : " ")
        }
    },
    getDigest: function() {
        if (!spree.user.user_id) {
            var a = spree.event.user_data;
            if (a && a.user) {
                _.extend(spree.user, a.user)
            }
            spree.user = User.createOrUpdate(_.extend(spree.user, {
                current_user: true
            }))
        }
        $(document).trigger("app:loading", "Getting event digest");
        if (spree.serverResponse.digest) {
            this.parseDigest(spree.serverResponse.digest)
        }
    },
    parseDigest: function(c) {
        console.log("The Digest", c);
        this.videoDigest = c.video_digest;
        var b = c.questions,
            a = this;
        this.chatDigest = c.chat_digest;
        this.latestVideoSnapshot = (this.videoDigest.video_snapshots.length) ? this.videoDigest.video_snapshots[this.videoDigest.video_snapshots.length - 1] : {};
        if (!c.producer_tab_enabled) {
            spree.event.producer_tab_enabled = false;
            $("#chat-type").hide()
        }
        $(document).trigger("app:loading", "Digest parsed.");
        if (spree.event.status == 2 || spree.event.status == 4) {
            this.startPlayback();
            if (!(spree.isMobile() || spree.isTablet())) {
                this.instantiateFlashApp("broadcast")
            }
        } else {
            this.render()
        }
        spree.setupEcma();
        if (spree.event.status == 0) {
            $(document).trigger("app:ready")
        }
        $(document).trigger("digest:parse:done")
    },
    endBroadcast: function() {
        this.drawVideoControls();
        $(document).trigger("event:status:finished")
    },
    startPlayback: function() {
        $(document).trigger("app:loading", "Starting Playback");
        $("#event_details").addClass("playback");
        if (spree.event.status == 4) {
            $(document).trigger("event:status:extended")
        }
        _.each(EventChat.allChats, function(b) {
            b.reset()
        });
        var a = !(spree.spreecast.embed || spree.serverResponse.extended) || (window.location.search.indexOf("autoplay=true") > -1);
        this.playbacker = new Playbacker({
            autoPlay: a,
            clip: spree.clip
        })
    },
    videoReady: function() {
        if (spree.user.producer) {
            spree.spreecast.$videoControls.addClass("moderator")
        }
    },
    getUserPaneByPane: function(b) {
        var a = this.latestVideoSnapshot && this.latestVideoSnapshot.video_snapshot && this.latestVideoSnapshot.video_snapshot.video_feeds;
        return a[b]
    },
    receiveDigestChats: function() {
        if (this.chatsDisplayed) {
            return
        }
        var b = this,
            a = _.pluck(User.find({
                is_banned: true,
                all: true
            }), "id");
        _.each(this.chatDigest, function(d, c) {
            if (c == "viewer") {
                return
            }
            _.each(d, function(e) {
                if (_.contains(a, e.user_id)) {
                    return
                }
                EventChat.allChats[c].receiveEcmaChat(new ChatModel(e))
            })
        });
        this.chatsDisplayed = true
    },
    render: function() {
        $(document).trigger("app:loading", "Rendering ...");
        this.drawVideoControls();
        if (!spree.user.has_been_authenticated) {
            $(blocker).trigger("spree:hide-blocker");
            this.videoReady()
        }
        $(document).trigger("app:loading", "All done.");
        $(document).trigger("app:ready");
        this.rendered = true;
        if (SitePref.shouldShowPrompt("chat-tooltip") && (spree.is_embed && this.embed_size == "medium")) {
            this.showChatAwarenessTip()
        }
        if (spree.user.broadcast_status == 2) {
            this.showEvent()
        }
        if (spree.event.status == 1) {
            spree.spreecast.fireWatchTimer()
        }
        $("#question-section .user_icon").html('<img height="30" width="30" src=' + spree.generateProfilePhotoAddress(new UserModel(spree.user), "small") + "></img>");
        $(document).trigger("app:render:done")
    },
    rsvp: function() {
        var a = $(".rsvp-count-container .attendee-count");
        var b = Number(a.attr("data-rsvps"));
        if (isNaN(b)) {
            return
        }
        b++;
        $(".rsvp-count-container").removeClass("is-there-but-isnt");
        a.attr("data-rsvps", b)
    },
    cancelRsvp: function() {
        var a = $(".rsvp-count-container .attendee-count");
        var b = Number(a.attr("data-rsvps"));
        if (isNaN(b)) {
            return
        }
        b--;
        if (b === 0) {
            $(".rsvp-count-container").addClass("is-there-but-isnt")
        }
        a.attr("data-rsvps", b)
    },
    expandDescription: function() {
        $("#description-toggle, .expand-arrow-text").attr("data-state", "less");
        $('[role="event-description"]').addClass("showing-all");
        if (!this.descHasOpened) {
            $("#event-tags").itemToggle();
            $(".event-description").multiLineToggle({
                row: 3
            })
        }
        this.descHasOpened = true
    },
    contractDescription: function() {
        $("#description-toggle, .expand-arrow-text").attr("data-state", "more");
        $('[role="event-description"]').removeClass("showing-all")
    },
    setWallpassCookie: function() {
        $.cookie("wallpass", 1, {
            expires: 7
        })
    },
    setBroadcastVideoDigest: function(b, a) {
        if (!window.document.broadcast || !window.document.broadcast.setVideoDigest || this.securityOpened) {
            return
        }
        console.log("setBroadcastVideoDigest", b, a);
        window.document.broadcast.setVideoDigest(b, a)
    },
    fireWatchTimer: function() {
        if (spree.user.owner) {
            return
        }
        if (spree.event.visibility != 0) {
            return
        }
        if (this.firedWatchTimer) {
            return
        }
        this.firedWatchTimer = true;
        var b, c, a;
        if (spree.clip && spree.clip.childClip) {
            b = spree.clip.clip_url;
            c = spree.clip.clip_id;
            a = "Clip"
        } else {
            if (spree.event.status == 2 || spree.event.status == 4) {
                b = spree.event.event_url;
                c = spree.event.parent_clip_id;
                a = "Clip"
            } else {
                b = spree.event.event_url;
                c = spree.event.event_id;
                a = "Event"
            }
        }
        c = parseInt(c);
        if (c && c !== NaN) {
            setTimeout(function() {
                $.ajax({
                    url: "/fbwatch",
                    type: "POST",
                    data: {
                        url: b,
                        object_type: a,
                        type_id: c
                    },
                    error: function() {
                        spree.spreecast.firedWatchTimer = false;
                        spree.spreecast.fireWatchTimer()
                    }
                })
            }, 10000)
        }
    },
    hideControls: function() {
        $("body").addClass("hide_controls")
    },
    showControls: function() {
        $("body").removeClass("hide_controls")
    },
    flashAppUrl: function(b) {
        var d;
        var c = "#use_flash=";
        if (!b || b != "broadcast") {
            d = "/flash/SpreecastPreviewApp.swf?" + spree.sha
        } else {
            if (window.location.href.indexOf(c) == -1) {
                if (this.flashVersion < 11) {
                    return
                }
                d = "/flash/SpreecastPlayer";
                if (window.location.href.indexOf("debug_assets=true") > 0) {
                    d += "_debug"
                }
                d += ".swf?" + spree.sha
            } else {
                var a = window.location.href.indexOf(c) + c.length;
                d = window.location.href.substring(a)
            }
        }
        console.log("Flash URL", d);
        return d
    },
    playAgainUrl: function(a) {
        return UrlUtils.addParams(window.location.href, {
            referring_sid: a
        })
    }
});
Spreecast.clickMethods = {
    "#not_yet": function(a) {
        a.preventDefault();
        $("#start_popover").animate({
            opacity: 0,
            left: "+=175",
            top: "-=180"
        }, 500, function() {
            $("#start_popover").remove()
        })
    },
    "#description-toggle": function() {
        if ($(this).attr("data-state") == "more") {
            spree.spreecast.expandDescription()
        } else {
            spree.spreecast.contractDescription()
        }
    },
    ".comment-icon, #right-rail-menu .close-icon": function() {
        $(".comment-icon").toggleClass("active");
        $("#broadcast_wrapper").toggleClass("blur");
        $("#event_social").toggleClass("up")
    },
    ".comment-icon": function() {
        SitePref.shouldShowPrompt("chat-tooltip", false)
    },
    "#cancel_broadcast": function(a) {
        spree.spreecast.cancelEvent()
    },
    "#questions .close": function() {
        $("#question-prompt, #question-feedback").hide();
        $("#question-prompt textarea#question").val("")
    },
    ".embed.medium #medium-embed-menu": function() {
        spree.spreecast.launchFullEvent()
    },
    ".embed-block .full-view": function() {
        spree.spreecast.launchFullEvent()
    },
    "#embed-code-button": function() {
        spree.modalMgr.create("get-embed-code")
    },
    "#toggle-broadcast": function(a) {
        if ($(this).attr("data-state") == "end") {
            new GeneralConfirm({
                question: "Wait... Do you really want to end the spreecast for everyone?",
                text: "If you are on camera and just want to get off, click the little X in the top right corner of your video feed.",
                confirmText: "End spreecast for everyone",
                confirmCB: spree.spreecast.end,
                cancelText: "No, I don't want to end this",
                width: 480
            })
        } else {
            if (spree.spreecast.paneCount() == 0) {
                new GeneralConfirm({
                    question: "Do you want to start without a person on camera?",
                    confirmText: "Yes, get started",
                    confirmCB: spree.spreecast.start,
                    cancelText: "No, put person on camera first",
                    text: "Just click on yourself on the right to bring you on screen.",
                    dialogClass: "start-no-camera"
                })
            } else {
                new GeneralConfirm({
                    question: "It's time to go ON AIR!",
                    confirmText: "Start Spreecast",
                    confirmCB: spree.spreecast.start,
                    cancelText: "No, don't start yet",
                    text: "Click the 'Start Spreecast' button if you're ready to go live.",
                    onAir: true
                })
            }
        }
    },
    ".invite_subsection p": function(a) {
        $(this).parent(".invite_subsection").toggleClass("min")
    }
};
Spreecast.flashMethods = {
    AdFinished: function(a) {
        spree.ad_finished = true;
        if (!spree.spreecast.embed && !spree.user.has_been_authenticated) {
            spree.loginMgr.showSignup("auto pop", false, null, {
                signUpText: "Sign up to chat, ask questions, or join on camera"
            })
        }
        if (spree.event.status == 0) {
            $("#info-overlay-block").removeClass("hide")
        }
    },
    AdStarted: function() {
        spree.ad_finished = false;
        if (spree.spreecast.embed) {
            $("#info-box").hide()
        }
        if (!spree.event.startTime) {
            $("#info-overlay-block").addClass("hide")
        }
        spree.firebase.eventAction("adstart")
    },
    Blocker: function(a, b) {
        spree.genericBlocker(b)
    },
    Modal: function(a, b) {
        spree.createTextModal(b)
    },
    HideOverlay: function(a) {
        spree.spreecast.securityOpened = true;
        $("body").addClass("flash_focus");
        spree.spreecast.hideControls()
    },
    ShowOverlay: function(a) {
        spree.spreecast.securityOpened = false;
        $("body").removeClass("flash_focus");
        spree.spreecast.videoReady();
        if (spree.spreecast.onAirQuestion) {
            $(document).trigger("question:after-on_air", spree.spreecast.onAirQuestion)
        }
        spree.spreecast.showControls();
        $(document).trigger("flash:securityDialogClosed")
    },
    Loaded: function(a) {
        if (spree.eventIsFinished()) {
            return
        }
        $(document).trigger("app:loading", "Loaded Flash " + a + ". " + (--this.flashAppsToInstantiate) + " remaining");
        if (this.flashAppsToInstantiate == 0) {
            window.document.broadcast.setServerResponse(spree.serverResponse);
            if (this.startForViewer) {
                this.startForViewer()
            }
            $(document).trigger("flash:videoReady")
        }
    },
    Notification: function() {
        console.log("Flash Notification: ", JSON.stringify(arguments))
    },
    SubmitQuestionComment: function(a) {
        $("#question-prompt").toggle();
        $("#question-prompt #question").focus()
    },
    ReloadRequest: function(a) {
        window.location.href = spree.spreecast.playAgainUrl(spree.ecma.ecma.sessionId())
    },
    StopBroadcast: function(a) {
        spree.ecma.eventController.broadcastController().end(a)
    },
    ShowFacecard: function(b, a) {
        Facecard.create(a, {
            flash: true
        })
    },
    Message: function(b, a, c) {
        Spreecast.socketMethods.message_callback(c, a)
    },
    ShowLogin: function(a, b) {
        spree.loginMgr.showSignup(b, true, null, {
            signUpText: "Sign up to chat, ask questions, or join on camera"
        })
    },
    NeedsUpgrade: function() {
        spree.spreecast.displayFlashUpgradeModal()
    },
    VideoStarted: function() {
        if (spree.firebase) {
            spree.firebase.eventAction("vstart")
        } else {
            spree.firebase_queue.push("vstart")
        }
    }
};
Spreecast.messageMethods = {
    chat: {
        delete_viewer: function(a) {
            $(document).trigger("chat:delete_viewer", a)
        },
        delete_all: function(a) {
            $(document).trigger("chat:delete_all", a)
        },
        producer: function(a) {},
        "producer-to-user": function(a) {},
        moderator: function(a) {},
        viewer: function(a) {}
    },
    event: {
        start: function(a) {
            spree.event.status = 1;
            spree.event.startTime = a.actual_start_time;
            spree.spreecast.showEvent(a);
            spree.setBodyClass();
            spree.firebase.eventAction("vstart");
            spree.spreecast.fireWatchTimer()
        },
        broadcast_settings: function(a) {},
        cancel: function() {
            if (!spree.user.cancel_click) {
                location.href = "/?c=1"
            }
        },
        end: function(a) {
            spree.event_just_ended = true;
            spree.event.status = 2;
            spree.spreecast.videoDigest.end_event_time_string = a.actual_end_time.toString();
            if (!(spree.user.owner)) {
                spree.setBodyClass();
                $("body").removeClass("event_archive").addClass("event_ended");
                if (!spree.is_embed) {
                    $("#screen_queue").remove()
                }
                setTimeout(function() {
                    spree.recommended.displayRecommendedContent()
                }, 10000)
            }
            spree.firebase.moveEventToSite();
            spree.firebase.eventAction("vpause")
        },
        ban: function(a) {
            window.location.href = "/?c=2"
        },
        embed_share_url: function(a) {
            spree.event.embed_share_url = a.set;
            $("#embed_share_url").val(spree.event.embed_share_url)
        },
        include_in_tweets: function(a) {
            spree.event.twitter.include = a.set;
            $("#include_in_tweets").val(spree.event.twitter.include)
        },
        stream_tweets_with: function(a) {
            spree.event.twitter.widget.destroy();
            $("#spreecast-tweets").html("").attr("class", "");
            spree.event.twitter.widget = spree.event.twitter.createWidget(a.set);
            $("#stream_tweets_with").val(a.set)
        },
        enabled: function(a) {
            $(document).trigger("event:status:pending", a)
        },
        stitch_available: function(a) {}
    },
    stream_quality: {
        update: function(a) {}
    },
    event_participation: {
        "new": function(a) {
            $(document).trigger("user:new", a)
        },
        update: function(a) {
            $(document).trigger("user:update", a)
        },
        destroy: function(a) {
            $(document).trigger("user:destroy", a)
        },
        reconnect: function(a) {
            console.log("Reconnect EP")
        },
        producer: function(a) {}
    },
    question: {
        update: function(a) {},
        on_air: function(a) {},
        off_air: function(a) {},
        approved: function(a) {},
        withdrawn: function(a) {}
    },
    user: {
        logged_out: function(b) {
            var a = spree.spreecast;
            if (User.find(b.user).current_user) {
                setTimeout(function() {
                    window.location.reload()
                }, 5000)
            }
        },
        refused_promotion: function(b) {
            var a = User.find(b.user);
            if (a && a.$bubble) {
                a.proposed_promotion = 0;
                a.updateBubble()
            }
        },
        proposed_promotion: function(a) {
            if (a.user.user_id == spree.user.id) {
                promotion = a.promotion;
                spree.spreecast.displayPromotionDialog(promotion, a.moderator)
            }
        }
    },
    video_snapshot: {
        start: function(a) {
            $(document).trigger("snapshot:new", a);
            spree.spreecast.setBroadcastingStatus(a)
        },
        reconnect: function(a) {
            $(document).trigger("snapshot:new", a)
        },
        update_start_time: function(a) {
            $(document).trigger("snapshot:new", a)
        },
        replace: function(a) {
            $(document).trigger("snapshot:new", a);
            spree.spreecast.setBroadcastingStatus(a)
        },
        end: function(a) {
            $(document).trigger("snapshot:new", a);
            spree.spreecast.setBroadcastingStatus(a)
        },
        end_event: function(b) {
            var a = {
                video_snapshot: b
            };
            spree.spreecast.latestVideoSnapshot = a;
            spree.spreecast.videoDigest.video_snapshots.push(a);
            if (spree.user.owner) {
                spree.spreecast.setBroadcastStatus = function(c) {};
                document.pending_preview && document.pending_preview.stopVideo && document.pending_preview.stopVideo();
                window.location.href = spree.event.event_url + "/edit"
            } else {
                if (spree.user.producer) {
                    window.location.reload(true)
                } else {
                    spree.spreecast.endBroadcast()
                }
            }
        },
        buffer_media: function(a) {
            $(document).trigger("snapshot:new", a)
        }
    },
    viewer_stats: {
        update: function(a) {
            spree.spreecast.updateViewerCount(a.current_viewers_count)
        }
    },
    visible_users: {
        update: function(a) {
            spree.spreecast.updateViewerCount(a.current_viewers_count)
        }
    },
    ad: {
        buffered: function(a) {},
        started: function(a) {},
        ended: function(a) {}
    },
    vote: {
        update: function() {}
    }
};
$(document).on({
    "user:new": function(c, b) {
        var a = User.createOrUpdate(b.user_id ? b : b.user);
        if (a) {
            a.role = b.role
        }
        if (a && a.$bubble) {
            a.updateBubble()
        }
        if (b.user && b.user.user_id == spree.user.user_id) {
            $(document).trigger("user:producer-evaluation", b);
            spree.spreecast.received_my_event_participation_new = true;
            $(blocker).trigger("spree:hide-blocker");
            spree.spreecast.videoReady();
            if (spree.user.proposed_promotion) {
                spree.spreecast.displayPromotionDialog(spree.user.proposed_promotion)
            }
            spree.spreecast.putProducerOnAirIfPreSpreecast();
            $(document).trigger("user:loaded", a)
        }
        $(document).trigger("user:after-create", a)
    },
    "user:producer-evaluation": function(b, a) {
        if (a.user.producer) {
            $("#moderator_chat").hide();
            $("body").removeClass("muggle").addClass("producer");
            if (!window.document.pending_preview && !spree.spreecast.previewFlashAppLoadedAfterPromotion) {
                spree.spreecast.previewFlashAppLoadedAfterPromotion = true;
                spree.spreecast.instantiateFlashApp("pending_preview")
            }
        } else {
            if ($("body.producer").length) {
                $("li.info").click();
                spree.producerChat.reset()
            }
            $("body").removeClass("producer").addClass("muggle")
        }
    },
    "user:update": function(d, b) {
        if (b.user.user_id == spree.user.user_id && !spree.spreecast.received_my_event_participation_new) {
            return
        }
        var c = User.find(b.user.user_id);
        var h = c.is_publishing;
        var k = c.broadcast_status;
        var a = c.preview_location;
        var g = c.proposed_promotion;
        var f = c.producer;
        var i = User.createOrUpdate(b.user_id ? b : b.user);
        i.role = b.role;
        if (b.user && b.user.user_id == spree.user.user_id) {
            if (b.user.producer != f) {
                spree.stopProcessingMessages = true;
                window.location.reload(true)
            }
        }
        if (g != b.user.proposed_promotion) {
            if (b.user.user_id == spree.user.id && b.user.proposed_promotion > 0) {
                spree.spreecast.displayPromotionDialog(b.user.proposed_promotion)
            }
        }
        if (b.preview_location && (b.preview_location != a)) {
            $(document).trigger("user:preview-update", i)
        }
        if (b.user && b.user.is_banned) {
            if (b.user.user_id == spree.user.user_id) {
                window.location.href = "/?c=2"
            } else {
                var j = this;
                _.each(EventChat.allChats, function(l) {
                    var e = l.$content.find("li[data-user-id=" + b.user.user_id + "]");
                    if (e.length) {
                        e.remove();
                        l.scroller.reset()
                    }
                })
            }
        }
        if (k != i.broadcast_status) {
            $(document).trigger("user:broadcast-status-changed", i)
        }
        $(document).trigger("user:after-update", i)
    },
    "user:reconnect": function(b, a) {},
    "user:preview-update": function(b, a) {},
    "user:delist": function(c, b) {
        var a = User.find(b.user_id ? b : b.user);
        if (a) {
            a.removeListing && a.removeListing();
            a.removeBubble && a.removeBubble();
            $(document).trigger("user:after-delist", a)
        }
    },
    "user:destroy": function(b, a) {},
    "user:end-broadcast": function(b, a) {},
    "user:start-broadcast": function(b, a) {},
    "user:producer": function(c, b) {
        var a = User.find(b.user.user_id);
        if (a) {
            a.role = b.role
        }
        if (a && a.current_user && spree.spreecast.embed && b.moderator) {
            window.open(spree.event.event_url);
            window.location = spree.event.event_url + "/unavailable/" + spree.spreecast.embed_size
        }
    },
    "spree:init": function() {
        $(document).trigger("listener:loaded", "user")
    }
});
var FacecardContainer = Class.extend({
    init: function(b) {
        var a = this;
        spree.spreecast.facecardContainer = this;
        this.$div = spree.hbTemplate("facecard-wrapper", {
            isProducer: spree.user.producer
        });
        $("body").append(this.$div);
        if (b) {
            spree.spreecast.instantiateFlashApp("pending_preview")
        }
        this.$div.draggable({
            containment: "body",
            revert: false,
            scroll: false
        });
        this.bindListeners()
    },
    bindListeners: function() {
        var a = this;
        $("#facecard-close").click(function(b) {
            b.preventDefault();
            a.hide()
        });
        $("#facecard-disable-camera").click(function(c) {
            var b = a.facecard.user.id();
            spree.ecma.eventController.broadcastController().withdraw(b)
        })
    },
    computeFlashPosition: function(d) {
        var a = this.$div.width();
        var c = this.$div.height();
        var b = $("#broadcast_wrapper");
        var e = b.offset();
        return {
            left: e.left + (b.width() - a) / 2,
            top: e.top + (b.height() - c) / 2
        }
    },
    isOpen: function() {
        return parseInt(this.$div.css("left")) !== -10000
    },
    show: function(c, d) {
        this.updatePreviewVisibility(c);
        var a;
        if (d.coords) {
            a = this.computePosition(d.coords)
        } else {
            if (d.rail) {
                var e = (d.y - (this.$div.height() / 2));
                a = this.computeRailPosition(d.rail, e)
            } else {
                if (d.flash) {
                    a = this.computeFlashPosition()
                }
            }
        }
        this.$div.css(a);
        this.$div.attr("data-user-id", c.id());
        if (this.controls) {
            var b = this;
            this.controls.chat.scroller.updateHandle(function() {
                b.controls.chat.scroller.move(1, "max")
            });
            this.controls.chat.$text.focus()
        }
        if (spree.user.producer && spree.streamQualities) {
            this.updateQualityScore(spree.streamQualities[c.alt()])
        }
    },
    hide: function() {
        this.$div.removeAttr("style").css({
            left: -10000
        });
        FacecardContainer.hidePreview()
    },
    updateQualityScore: function(f) {
        var d = "...";
        var g = "...";
        var a = "...";
        var c = "--";
        if (f != null) {
            if (isNaN(d = f.bitrate())) {
                d = "..."
            }
            if (isNaN(g = f.ping())) {
                g = "..."
            }
            if (isNaN(a = f.packetLoss())) {
                a = "..."
            }
            if (isNaN(c = f.displayQuality())) {
                c = "--"
            }
        }
        var b = this.$div.find(".preview-stats");
        b.find("[data-unit=kbps]").text(d);
        b.find("[data-unit=ms]").text(g);
        b.find("[data-unit=percent]").text(a);
        var e = this.$div.find(".status-panel, .total-connection-percentage");
        e.attr("data-display-quality", c)
    },
    update: function(a) {
        this.$div.attr("class", Facecard.getClasses(a).join(" "));
        if (this.facecard) {
            this.facecard.update(a)
        }
        if (this.controls) {
            this.controls.update(a)
        }
    },
    updatePreviewVisibility: function(a) {
        if (spree.user.producer && !(a.alt() == spree.user.alt) && a.isConnected() && (spree.event.status == 0 || spree.event.status == 1)) {
            if (a.broadcastStatus() > 0 && (a.pane() < 0)) {
                FacecardContainer.showPreview(a)
            } else {
                FacecardContainer.hidePreview()
            }
        } else {
            FacecardContainer.hidePreview()
        }
    },
    setFacecard: function(a) {
        this.facecard = a;
        var b = this.$div.find(".facecard-wrapper");
        b.empty();
        b.append(a.$div);
        this.update(this.facecard.user)
    },
    setControls: function(a) {
        this.controls = a;
        var b = this.$div.find(".facecard-controls-wrapper");
        b.empty();
        b.append(a.$div);
        this.update(this.facecard.user)
    }
});
FacecardContainer.showPreview = function(a) {
    if (this.previewUser && (this.previewUser.alt() == a.alt())) {
        return
    }
    $("#pending_preview").removeClass("hidden");
    document.pending_preview.startVideo(a.previewLocation());
    this.previewUser = a
};
FacecardContainer.hidePreview = function() {
    delete this.previewUser;
    if (document.pending_preview) {
        document.pending_preview.stopVideo()
    }
    $("#pending_preview").addClass("hidden")
};
FacecardContainer.addMixin(FloatingContent);
var SpreeObj = Class.extend({
    init: function(d, b) {
        if (d != "Media" && d != "Question" && d != "User") {
            throw ("" + d + " is not a valid Spree object")
        }
        window[d].idField = d.toLowerCase() + "_id";
        for (var a in b) {
            window[d][a] = b[a]
        }
        window[d].register = [];
        window[d].all = function() {
            return window[d].register
        };
        window[d].count = function() {
            return window[d].register.length
        };
        window[d].createOrUpdate = function(e) {
            var f = window[d].findOrCreate(e);
            for (var c in e) {
                if (c != "id" && c != window[d].idField) {
                    f[c] = e[c]
                }
            }
            return f
        };
        window[d].find = function(g) {
            if (!g) {
                return false
            }
            if (g.id) {
                g = g.id
            }
            if (g[window[d].idField]) {
                g = g[window[d].idField]
            }
            if (typeof(g) == "number") {
                g = g.toString()
            }
            if (typeof(g) == "string") {
                for (var e in window[d].register) {
                    if (window[d].register[e].id == g) {
                        return window[d].register[e]
                    }
                }
                return false
            }
            var f = [];
            for (var e in window[d].register) {
                var h = window[d].register[e];
                f.push(h);
                for (var c in g) {
                    if ((c != "all") && (g[c]) && (g[c] != h[c])) {
                        f.pop();
                        break
                    }
                }
            }
            return g.all ? f : f[0]
        };
        window[d].findOrCreate = function(c) {
            var e = window[d].find(c);
            return (e ? e : new window[d](c))
        };
        window[d].first = function() {
            return window[d].register[0]
        };
        window[d].last = function() {
            return window[d].register[window[d].count() - 1]
        };
        window[d].destroy = function(c) {
            window[d].register = _.difference(window[d].register, [c])
        };
        window[d].valid = function(c) {
            if (!c.id) {
                c.id = c[window[d].idField]
            }
            if (!c.id) {
                return false
            }
            window[d].register.push(c);
            return c
        }
    }
});
SpreeObj.validObjects = ["User", "Question", "Media"];
SpreeObj.dStr = function(a) {
    return a.toLowerCase() + "-id"
};
SpreeObj.getFromElement = function(a) {
    var b = _.detect(SpreeObj.validObjects, function(c) {
        return a.attr("data-" + SpreeObj.dStr(c))
    });
    return b ? window[b].find(a.attr("data-" + SpreeObj.dStr(b))) : false
};
SpreeObj.stripData = function(a) {
    _.each(SpreeObj.validObjects, function(b) {
        a.removeAttr("data-" + SpreeObj.dStr(b))
    })
};
var Recommended = Class.extend({
    init: function() {
        this.recommended_content = spree.event.recommended_content
    },
    displayRecommendedContent: function() {
        var a = spree.is_embed ? spree.spreecast.questions : spree.spreecast.screenQueue;
        a.offAir({
            type: "media_item"
        });
        var c = [];
        var b = this;
        _.each(this.recommended_content, function(e, d) {
            if (d < 4) {
                var f = e;
                f.url = b.generateUrl(f.url, "web.player");
                c.push(f)
            }
        });
        this.sendSuggestedTxLogs("web.player", c);
        if (this.shouldNotDisplay()) {
            return
        }
        $("#broadcast_wrapper").append(spree.hbTemplate("more-spreecasts", {
            content: c,
            pa: spree.spreecast.playAgainUrl(spree.ecma.ecma.sessionId())
        }));
        $(".suggested-spreecast-about").ellipsis();
        $("body").addClass("recommended-content")
    },
    hideRecommendedContent: function() {
        $(".suggested-spreecast-group").remove()
    },
    generateUrl: function(b, c) {
        var a = spree.ecma.ecma.sessionId() + ":" + c;
        return UrlUtils.addParams(b, {
            referring_sid: a
        })
    },
    sendSuggestedTxLogs: function(b, a) {
        var c = {
            A: "rails.suggested",
            E: spree.event.event_id,
            M: spree.ecma.ecma.sessionId(),
            l: b,
            m: this.outputHash(a),
            z: spree.event.status
        };
        if (spree.clip && spree.clip.childClip) {
            c.L = spree.clip.clip_id
        }
        spree.analytics.send(c)
    },
    outputHash: function(b) {
        var a = {};
        _.each(b, function(d, c) {
            a[c + 1] = d.id
        });
        return a
    },
    shouldNotDisplay: function() {
        return (this.recommended_content.length < 4 || (spree.clipMgr && spree.clipMgr.editingClip()) || spree.hide_presence || spree.isTablet())
    },
    linkify: function(a, b) {
        a.attr("href", this.generateUrl(a.attr("href"), b))
    }
});
var Producer = Class.extend({
    init: function() {},
    filterQuestions: function(c) {
        $("#event_display_questions_" + c.set).prop("checked", true);
        spree.event.questions_display = c.set;
        if (spree.user.producer) {
            return
        }
        var b = $("#question-list");
        var a = $("#new-question-title");
        switch (c.set) {
            case spree.QUESTIONS.ALL:
                b.removeClass("hide-all-questions hide-unstarred-questions");
                break;
            case spree.QUESTIONS.STARRED:
                b.removeClass("hide-all-questions").addClass("hide-unstarred-questions");
                a.removeClass("new-questions");
                break;
            case spree.QUESTIONS.NONE:
                b.removeClass("hide-unstarred-questions").addClass("hide-all-questions");
                a.removeClass("new-questions");
                break
        }
        this.updateUI()
    },
    questionsAllowed: function(a) {
        console.log("questionsAllowed");
        spree.event.questions_enabled = a.set;
        if (spree.spreecast.screenQueue) {
            spree.spreecast.screenQueue.input.setEnabledState(spree.event.questions_enabled);
            spree.spreecast.screenQueue.toggleEmptyQuestions(spree.event.questions_enabled)
        }
        if (!a.set && a.throttled) {
            spree.showThrottledNotice("questions")
        }
        this.updateUI()
    },
    broadcastersAllowed: function(a) {
        spree.event.broadcasters_enabled = a.set;
        if (!a.set && a.throttled) {
            spree.showThrottledNotice("camera")
        }
    },
    broadcastersEnabled: function(a) {
        $("#camera-requests-switch").prop("checked", a.set)
    },
    questionsEnabled: function(a) {
        $("#questions-switch").prop("checked", a.set)
    },
    updateUI: function() {
        if (spree.spreecast.screenQueue) {
            spree.spreecast.screenQueue.repaint()
        }
        if (spree.spreecast.questions) {
            spree.spreecast.questions.adjustCounter()
        }
    }
});
var User = Class.extend({
    STATES: {
        onair: "On Air",
        offair: "Off Air",
        waiting: "Waiting",
        "": ""
    },
    init: function(b) {
        for (var a in b) {
            this[a] = b[a]
        }
        this.setProfilePhoto();
        if (this.owner) {
            this.producer = true
        }
        if (spree.event) {
            this.setupUser()
        }
        return User.valid(this)
    },
    destroy: function() {
        window[this.itemType()].destroy(this)
    },
    itemType: function() {
        var a = this;
        return _.detect(SpreeObj.validObjects, function(b) {
            return (a instanceof window[b])
        })
    },
    broadcasterInit: function() {
        spree.spreecast.setWallpassCookie()
    },
    avatar: function() {
        var a = $("<img>", {
            src: this.profile_photo,
            alt: this.stringify(),
            title: this.stringify(),
            "data-user-id": this.id
        });
        if (this.has_been_authenticated) {
            return this.link().html(a)
        }
        return a
    },
    link: function() {
        if (this.has_been_authenticated) {
            return $("<a>", {
                href: "/users/" + this.id,
                target: "_blank",
                "class": "user_profile_link",
                "data-user-id": this.id
            }).text(this.stringify())
        }
        return this.stringify()
    },
    request: function() {},
    setupUser: function() {},
    startBroadcast: function(a) {
        this.$queueItem && this.$queueItem.addClass("now_broadcasting");
        spree.ecma.eventController.producerController().startBroadcast(this.alt)
    },
    startBroadcastComplete: function() {
        this.broadcast_status = 2;
        spree.spreecast.drawVideoControls()
    },
    stopBroadcastComplete: function() {
        if (spree.event.status == 2) {
            return
        }
        spree.spreecast.drawVideoControls()
    },
    changeH264Settings: function(b, a) {
        document.broadcast.changeH264Settings(b, a)
    },
    stringify: function() {
        if (!this.has_been_authenticated) {
            return "guest"
        }
        var a = "";
        if (this.first_name) {
            a = this.first_name;
            if (this.last_name) {
                a += " " + this.last_name
            }
        } else {
            a = this.email
        }
        return a
    },
    update: function(b) {
        delete b.id;
        delete b.user_id;
        for (var a in b) {
            this[a] = b[a]
        }
        this.setProfilePhoto()
    },
    setProfilePhoto: function() {
        if (this.profile_photo_thumb_url) {
            this.profile_photo = this.profile_photo_thumb_url;
            if (this.alt && this.profile_photo_thumb_url && !(/nopic/.test(this.profile_photo_thumb_url))) {
                var a = Math.random() * 10000000000000000;
                this.profile_photo = "//s3.amazonaws.com/spreecast-photos/" + spree.scm_env + "/users/" + this.alt + "/tile_30x30/" + this.alt + "_photo.jpg?" + a
            }
        }
    }
});
new SpreeObj("User", {
    approved: function() {
        return User.find({
            broadcast_status: 2,
            all: true
        })
    },
    pending: function() {
        return User.find({
            broadcast_status: 1,
            all: true
        })
    },
    producer: function() {
        return User.find({
            producer: true,
            all: true
        })
    },
    validates: []
});
$(document).on("spree:init", function() {
    var g = function(m, n) {
        m.text(n);
        if (n !== 1) {
            m.addClass("plural")
        } else {
            m.removeClass("plural")
        }
    };
    var j = 0,
        i = 0,
        e = 0,
        k = 0;
    var h = $("#countdown-timer");
    var f = h.find("#countdown-seconds");
    var l = h.find("#countdown-minutes");
    var c = h.find("#countdown-hours");
    var b = h.find("#countdown-days");
    if (spree.event.status == 0 && (!spree.event.ads_enabled || !spree.event.event_enabled)) {
        $("#info-overlay-block").removeClass("hide")
    }
    var a = Math.ceil((spree.event.start_at_epoch - new Date()) / 1000);
    var d = setInterval(function() {
        a--;
        if (spree.event.startTime || a < 0) {
            clearInterval(d);
            $("#event-reminder-button").remove();
            if (spree.event.status == 0) {
                $("#countdown-timer").addClass("iminent").html("请稍等,该节目马上就会开始.")
            }
        } else {
            if (j == 0) {
                if (e == 0) {
                    if (i == 0) {
                        k = Math.floor(a / 86400);
                        g(b, k)
                    }
                    i = !spree.is_embed ? Math.floor((a % 86400) / 3600) : Math.floor(a / 3600);
                    g(c, i)
                }
                e = Math.floor((a % 3600) / 60);
                g(l, e)
            }
            j = a % 60;
            g(f, j)
        }
    }, 1000)
});
var PayPerView = Payment.extend({
    init: function() {
        window.ppvLanding = true;
        this.sourcePageType = spree.mixpanelPageType;
        this.reloadUrl = window.location.href;
        this.bindEvents();
        var a = UrlUtils.getParams().query;
        if (spree.user.has_been_authenticated && a && a.showPayment) {
            this.ppvTicketModal(this);
            this.reloadUrl = UrlUtils.removeParams(window.location.href, ["showPayment"])
        }
    },
    bindEvents: function() {
        var a = this;
        $("#ppv-ticket").on("click", function() {
            if (spree.bucket_manager.serviceEnabled("mixpanel")) {
                var b = {
                    action: "purchase modal",
                    "page type": a.sourcePageType
                };
                if (spree.event) {
                    b.visibility = Spree.VISIBILITY[spree.event.visibility].toLowerCase()
                }
                mixpanel.track("ppv", b)
            }
            if (!spree.user.has_been_authenticated) {
                spree.loginMgr.showSignup("ppv", true, {
                    showPayment: true
                }, {
                    signUpText: "Sign up to purchase a ticket for this spreecast"
                })
            } else {
                a.ppvTicketModal(a)
            }
        })
    },
    ppvTicketModal: function(a) {
        spree.modalMgr.create("purchase-ppv-ticket", function(b) {
            a.bindErrorEvents(true);
            if (spree.user && spree.user.email) {
                $email = $("#email-billing");
                $email.attr("placeholder", spree.user.email);
                $email.val(spree.user.email);
                $email.blur();
                $email.attr("disabled", true)
            }
            b.on("submit", function(c) {
                c.preventDefault();
                $("#submit-payment-billing").attr("disabled", true);
                a.purchaseTicket(b)
            })
        })
    },
    purchasePPV: function(b, c) {
        var a = this;
        if (b && b.error) {
            $(".stripe-errors").removeAttr("hidden").text(b.error.message);
            $(".payment-processing-overlay").removeAttr("data-processing");
            $("#submit-payment-billing").removeAttr("disabled")
        } else {
            params = {
                name: $("#full-name-billing").val(),
                email: $("#email-billing").val()
            };
            if (b && b.id) {
                params.cc_token = b.id
            }
            $.ajax({
                type: "POST",
                url: "/events/" + spree.event.event_id + "/charge",
                data: params,
                success: function(f, g, e) {
                    if (spree.bucket_manager.serviceEnabled("mixpanel")) {
                        var d = {
                            action: "purchase complete",
                            "page type": a.sourcePageType
                        };
                        if (spree.event) {
                            d.visibility = Spree.VISIBILITY[spree.event.visibility].toLowerCase()
                        }
                        mixpanel.track("ppv", d)
                    }
                    opts = {
                        is_scheduled: spree.event.status === 0,
                        is_live: spree.event.status === 1,
                        email: spree.user.email || params.email
                    };
                    $(".modal").on("hidden", function() {
                        spree.modalMgr.create("purchase-ppv-ticket-complete", function(h) {
                            $("#ticket-purchased").on("click", function() {
                                window.location.href = a.reloadUrl
                            })
                        }, null, opts)
                    });
                    c.modal("hide")
                },
                error: function(f, d, e) {
                    $(".payment-processing-overlay").removeAttr("data-processing");
                    $(".stripe-errors").removeAttr("hidden").text(JSON.parse(f.responseText).response)
                },
                complete: function() {
                    $("#submit-payment-billing").removeAttr("disabled")
                }
            })
        }
    },
    purchaseTicket: function(b) {
        var a = this;
        $(".payment-processing-overlay").attr("data-processing", true);
        if ($("#card-billing").data("has-card") && !$("#card-billing").val()) {
            a.purchasePPV()
        } else {
            Stripe.createToken({
                name: $("#full-name-billing").val(),
                number: $("#card-billing").val(),
                cvc: $("#cvc-billing").val(),
                exp_month: $("#expiration-month-billing").val(),
                exp_year: $("#expiration-year-billing").val()
            }, function(c, d) {
                a.purchasePPV(d, b)
            })
        }
    }
});