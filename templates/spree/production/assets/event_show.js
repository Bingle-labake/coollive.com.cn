var guiders = (function(c) {
    var b = {};
    b.version = "1.2.8";
    b._defaultSettings = {
        attachTo: null,
        autoFocus: false,
        buttons: [{
            name: "Close"
        }],
        buttonCustomHTML: "",
        classString: null,
        closeOnEscape: false,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        highlight: null,
        isHashable: true,
        offset: {
            top: null,
            left: null
        },
        onClose: null,
        onHide: null,
        onShow: null,
        overlay: false,
        position: 0,
        title: "Sample title goes here",
        width: 400,
        xButton: false
    };
    b._htmlSkeleton = ["<div class='guider'>", "  <div class='guider_content'>", "    <h1 class='guider_title'></h1>", "    <div class='guider_close'></div>", "    <p class='guider_description'></p>", "    <div class='guider_buttons'>", "    </div>", "  </div>", "  <div class='guider_arrow'>", "  </div>", "</div>"].join("");
    b._arrowSize = 42;
    b._backButtonTitle = "Back";
    b._buttonElement = "<a></a>";
    b._buttonAttributes = {
        href: "javascript:void(0);"
    };
    b._closeButtonTitle = "Close";
    b._currentGuiderID = null;
    b._guiders = {};
    b._lastCreatedGuiderID = null;
    b._nextButtonTitle = "Next";
    b._offsetNameMapping = {
        topLeft: 11,
        top: 12,
        topRight: 1,
        rightTop: 2,
        right: 3,
        rightBottom: 4,
        bottomRight: 5,
        bottom: 6,
        bottomLeft: 7,
        leftBottom: 8,
        left: 9,
        leftTop: 10
    };
    b._windowHeight = 0;
    b._addButtons = function(j) {
        var k = j.elem.find(".guider_buttons");
        if (j.buttons === null || j.buttons.length === 0) {
            k.remove();
            return
        }
        for (var g = j.buttons.length - 1; g >= 0; g--) {
            var e = j.buttons[g];
            var h = c(b._buttonElement, c.extend({
                "class": "guider_button",
                html: e.name
            }, b._buttonAttributes, e.html || {}));
            if (typeof e.classString !== "undefined" && e.classString !== null) {
                h.addClass(e.classString)
            }
            k.append(h);
            var d = e.name.toLowerCase();
            if (e.onclick) {
                h.bind("click", e.onclick)
            } else {
                switch (d) {
                    case b._closeButtonTitle.toLowerCase():
                        h.bind("click", function() {
                            b.hideAll();
                            if (j.onClose) {
                                j.onClose(j, false)
                            }
                        });
                        break;
                    case b._nextButtonTitle.toLowerCase():
                        h.bind("click", function() {
                            !j.elem.data("locked") && b.next()
                        });
                        break;
                    case b._backButtonTitle.toLowerCase():
                        h.bind("click", function() {
                            !j.elem.data("locked") && b.prev()
                        });
                        break
                }
            }
        }
        if (j.buttonCustomHTML !== "") {
            var f = c(j.buttonCustomHTML);
            j.elem.find(".guider_buttons").append(f)
        }
        if (j.buttons.length === 0) {
            k.remove()
        }
    };
    b._addXButton = function(f) {
        var e = f.elem.find(".guider_close");
        var d = c("<div></div>", {
            "class": "x_button",
            role: "button"
        });
        e.append(d);
        d.click(function() {
            b.hideAll();
            if (f.onClose) {
                f.onClose(f, true)
            }
        })
    };
    b._wireEscape = function(d) {
        c(document).keydown(function(e) {
            if (e.keyCode == 27 || e.which == 27) {
                b.hideAll();
                if (d.onClose) {
                    d.onClose(d, true)
                }
                return false
            }
        })
    };
    b._unWireEscape = function(d) {
        c(document).unbind("keydown")
    };
    b._attach = function(r) {
        if (typeof r !== "object") {
            return
        }
        var m = c(r.attachTo);
        var e = r.elem.innerHeight();
        var f = r.elem.innerWidth();
        if (r.position === 0 || m.length === 0) {
            r.elem.css("position", "fixed");
            r.elem.css("top", (c(window).height() - e) / 3 + "px");
            r.elem.css("left", (c(window).width() - f) / 2 + "px");
            return
        }
        var d = m.offset();
        var p = d.top;
        var g = d.left;
        var j = c("body").outerHeight(true) - c("body").outerHeight(false);
        p -= j;
        if (b._offsetNameMapping[r.position]) {
            r.position = b._offsetNameMapping[r.position]
        }
        var l = m.innerHeight();
        var q = m.innerWidth();
        var h = 0.9 * b._arrowSize;
        var n = {
            1: [-h - e, q - f],
            2: [0, h + q],
            3: [l / 2 - e / 2, h + q],
            4: [l - e, h + q],
            5: [h + l, q - f],
            6: [h + l, q / 2 - f / 2],
            7: [h + l, 0],
            8: [l - e, -f - h],
            9: [l / 2 - e / 2, -f - h],
            10: [0, -f - h],
            11: [-h - e, 0],
            12: [-h - e, q / 2 - f / 2]
        };
        var k = n[r.position];
        p += k[0];
        g += k[1];
        var o = "absolute";
        if (m.css("position") == "fixed") {
            o = "fixed";
            p -= c(window).scrollTop();
            g -= c(window).scrollLeft()
        }
        if (r.offset.top !== null) {
            p += r.offset.top
        }
        if (r.offset.left !== null) {
            g += r.offset.left
        }
        return r.elem.css({
            position: o,
            top: p,
            left: g
        })
    };
    b._guiderById = function(d) {
        if (typeof b._guiders[d] === "undefined") {
            throw "Cannot find guider with id " + d
        }
        return b._guiders[d]
    };
    b._showOverlay = function() {
        c("#guider_overlay").fadeIn("fast", function() {
            if (this.style.removeAttribute) {
                this.style.removeAttribute("filter")
            }
        })
    };
    b._highlightElement = function(d) {
        c(d).addClass("guider_highlight")
    };
    b._dehighlightElement = function(d) {
        c(d).removeClass("guider_highlight")
    };
    b._hideOverlay = function() {
        c("#guider_overlay").fadeOut("fast")
    };
    b._initializeOverlay = function() {
        if (c("#guider_overlay").length === 0) {
            c('<div id="guider_overlay"></div>').hide().appendTo("body")
        }
    };
    b._styleArrow = function(l) {
        var d = l.position || 0;
        if (!d) {
            return
        }
        var h = c(l.elem.find(".guider_arrow"));
        var k = {
            1: "guider_arrow_down",
            2: "guider_arrow_left",
            3: "guider_arrow_left",
            4: "guider_arrow_left",
            5: "guider_arrow_up",
            6: "guider_arrow_up",
            7: "guider_arrow_up",
            8: "guider_arrow_right",
            9: "guider_arrow_right",
            10: "guider_arrow_right",
            11: "guider_arrow_down",
            12: "guider_arrow_down"
        };
        h.addClass(k[d]);
        var g = l.elem.innerHeight();
        var f = l.elem.innerWidth();
        var e = b._arrowSize / 2;
        var j = {
            1: ["right", e],
            2: ["top", e],
            3: ["top", g / 2 - e],
            4: ["bottom", e],
            5: ["right", e],
            6: ["left", f / 2 - e],
            7: ["left", e],
            8: ["bottom", e],
            9: ["top", g / 2 - e],
            10: ["top", e],
            11: ["left", e],
            12: ["left", f / 2 - e]
        };
        var d = j[l.position];
        h.css(d[0], d[1] + "px")
    };
    b._showIfHashed = function(g) {
        var e = "guider=";
        var f = window.location.hash.indexOf(e);
        if (f !== -1) {
            var d = window.location.hash.substr(f + e.length);
            if (g.id.toLowerCase() === d.toLowerCase()) {
                b.show(g.id)
            }
        }
    };
    b.reposition = function() {
        var d = b._guiders[b._currentGuiderID];
        b._attach(d)
    };
    b.next = function() {
        var e = b._guiders[b._currentGuiderID];
        if (typeof e === "undefined") {
            return
        }
        e.elem.data("locked", true);
        var d = e.next || null;
        if (d !== null && d !== "") {
            var g = b._guiderById(d);
            var f = g.overlay ? true : false;
            b.hideAll(f, true);
            if (e && e.highlight) {
                b._dehighlightElement(e.highlight)
            }
            b.show(d)
        }
    };
    b.prev = function() {
        var d = b._guiders[b._currentGuiderID];
        if (typeof d === "undefined") {
            return
        }
        if (d.prev === null) {
            return
        }
        var e = b._guiders[d.prev];
        e.elem.data("locked", true);
        var g = e.id || null;
        if (g !== null && g !== "") {
            var h = b._guiderById(g);
            var f = h.overlay ? true : false;
            b.hideAll(f, true);
            if (e && e.highlight) {
                b._dehighlightElement(e.highlight)
            }
            b.show(g)
        }
    };
    b.createGuider = function(e) {
        if (e === null || e === undefined) {
            e = {}
        }
        myGuider = c.extend({}, b._defaultSettings, e);
        myGuider.id = myGuider.id || String(Math.floor(Math.random() * 1000));
        var f = c(b._htmlSkeleton);
        myGuider.elem = f;
        if (typeof myGuider.classString !== "undefined" && myGuider.classString !== null) {
            myGuider.elem.addClass(myGuider.classString)
        }
        myGuider.elem.css("width", myGuider.width + "px");
        var d = f.find(".guider_title");
        d.html(myGuider.title);
        f.find(".guider_description").html(myGuider.description);
        b._addButtons(myGuider);
        if (myGuider.xButton) {
            b._addXButton(myGuider)
        }
        f.hide();
        f.appendTo("body");
        f.attr("id", myGuider.id);
        if (typeof myGuider.attachTo !== "undefined" && myGuider !== null) {
            b._attach(myGuider) && b._styleArrow(myGuider)
        }
        b._initializeOverlay();
        b._guiders[myGuider.id] = myGuider;
        if (b._lastCreatedGuiderID != null) {
            myGuider.prev = b._lastCreatedGuiderID
        }
        b._lastCreatedGuiderID = myGuider.id;
        if (myGuider.isHashable) {
            b._showIfHashed(myGuider)
        }
        return b
    };
    b.hideAll = function(f, e) {
        e = e || false;
        c(".guider:visible").each(function(g, h) {
            var j = b._guiderById(c(h).attr("id"));
            if (j.onHide) {
                j.onHide(j, e)
            }
        });
        c(".guider").fadeOut("fast");
        var d = b._guiders[b._currentGuiderID];
        if (d && d.highlight) {
            b._dehighlightElement(d.highlight)
        }
        if (typeof f !== "undefined" && f === true) {} else {
            b._hideOverlay()
        }
        return b
    };
    b.show = function(l) {
        if (!l && b._lastCreatedGuiderID) {
            l = b._lastCreatedGuiderID
        }
        var h = b._guiderById(l);
        if (h.overlay) {
            b._showOverlay();
            if (h.highlight) {
                b._highlightElement(h.highlight)
            }
        }
        if (h.closeOnEscape) {
            b._wireEscape(h)
        } else {
            b._unWireEscape(h)
        }
        if (h.onShow) {
            h.onShow(h)
        }
        b._attach(h);
        h.elem.fadeIn("fast").data("locked", false);
        b._currentGuiderID = l;
        var k = b._windowHeight = c(window).height();
        var e = c(window).scrollTop();
        var d = h.elem.offset();
        var f = h.elem.height();
        var g = (e + k < d.top + f);
        var j = (d.top < e);
        if (h.autoFocus && (g || j)) {
            setTimeout(b.scrollToCurrent, 10)
        }
        c(h.elem).trigger("guiders.show");
        return b
    };
    b.scrollToCurrent = function() {
        var e = b._guiders[b._currentGuiderID];
        if (typeof e === "undefined") {
            return
        }
        var j = b._windowHeight;
        var f = c(window).scrollTop();
        var d = e.elem.offset();
        var h = e.elem.height();
        var g = Math.round(Math.max(d.top + (h / 2) - (j / 2), 0));
        window.scrollTo(0, g)
    };
    var a = undefined;
    c(window).resize(function() {
        if (typeof(a) !== "undefined") {
            clearTimeout(a)
        }
        a = setTimeout(function() {
            a = undefined;
            if (typeof(b) !== "undefined") {
                b.reposition()
            }
        }, 20)
    });
    return b
}).call(this, jQuery);
if (typeof links === "undefined") {
    links = {}
}
if (typeof google === "undefined") {
    google = undefined
}
links.Timeline = function(a) {
    this.dom = {};
    this.conversion = {};
    this.eventParams = {};
    this.groups = [];
    this.groupIndexes = {};
    this.items = [];
    this.selection = undefined;
    this.listeners = {};
    this.size = {
        actualHeight: 0,
        axis: {
            characterMajorHeight: 0,
            characterMajorWidth: 0,
            characterMinorHeight: 0,
            characterMinorWidth: 0,
            height: 0,
            labelMajorTop: 0,
            labelMinorTop: 0,
            line: 0,
            lineMajorWidth: 0,
            lineMinorHeight: 0,
            lineMinorTop: 0,
            lineMinorWidth: 0,
            top: 0
        },
        contentHeight: 0,
        contentLeft: 0,
        contentWidth: 0,
        dataChanged: false,
        frameHeight: 0,
        frameWidth: 0,
        groupsLeft: 0,
        groupsWidth: 0,
        items: {
            top: 0
        }
    };
    this.dom.container = a;
    this.options = {
        width: "100%",
        height: "auto",
        minHeight: 0,
        autoHeight: true,
        eventMargin: 10,
        eventMarginAxis: 20,
        dragAreaWidth: 10,
        min: undefined,
        max: undefined,
        intervalMin: 10,
        intervalMax: 1000 * 60 * 60 * 24 * 365 * 10000,
        moveable: true,
        zoomable: true,
        selectable: true,
        editable: false,
        snapEvents: true,
        groupChangeable: true,
        showCurrentTime: true,
        showCustomTime: false,
        showMajorLabels: true,
        showNavigation: false,
        showButtonAdd: true,
        groupsOnRight: false,
        axisOnTop: false,
        stackEvents: true,
        animate: true,
        animateZoom: true,
        style: "box"
    };
    this.clientTimeOffset = 0;
    var b = this.dom;
    while (b.container.hasChildNodes()) {
        b.container.removeChild(b.container.firstChild)
    }
    this.step = new links.Timeline.StepDate();
    this.data = [];
    this.firstDraw = true;
    this.setVisibleChartRange(undefined, undefined, false);
    this.redrawFrame();
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(d) {
            for (var c = 0; c < this.length; c++) {
                if (this[c] == d) {
                    return c
                }
            }
            return -1
        }
    }
    this.trigger("ready")
};
links.Timeline.prototype.draw = function(b, a) {
    this.setOptions(a);
    this.setData(b);
    if (a && a.start && a.end) {
        this.setVisibleChartRange(a.start, a.end)
    } else {
        if (this.firstDraw) {
            this.setVisibleChartRangeAuto()
        }
    }
    this.firstDraw = false
};
links.Timeline.prototype.setOptions = function(a) {
    if (a) {
        for (var b in a) {
            if (a.hasOwnProperty(b)) {
                this.options[b] = a[b]
            }
        }
    }
    this.options.autoHeight = (this.options.height === "auto");
    if (spree.clipMgr.timeline) {
        spree.clipMgr.timeline.options = this.options
    }
};
links.Timeline.prototype.setData = function(g) {
    this.unselectItem();
    if (!g) {
        g = []
    }
    this.items = [];
    this.data = g;
    var b = this.items;
    var c = this.options;
    this.setGroups(g);
    if (google && google.visualization && g instanceof google.visualization.DataTable) {
        var e = (g.getNumberOfColumns() > 3);
        for (var h = 0, f = g.getNumberOfRows(); h < f; h++) {
            b.push(this.createItem({
                start: g.getValue(h, 0),
                end: g.getValue(h, 1),
                content: g.getValue(h, 2),
                group: (e ? g.getValue(h, 3) : undefined)
            }))
        }
    } else {
        if (links.Timeline.isArray(g)) {
            for (var h = 0, f = g.length; h < f; h++) {
                var a = g[h];
                var d = this.createItem(a);
                b.push(d)
            }
        } else {
            throw "Unknown data type. DataTable or Array expected."
        }
    }
    this.size.dataChanged = true;
    this.redrawFrame();
    this.recalcSize();
    this.stackEvents(false);
    this.redrawFrame();
    this.size.dataChanged = false
};
links.Timeline.prototype.setGroups = function(d) {
    this.deleteGroups();
    var a = this.groups;
    var f = this.groupIndexes;
    if (google && google.visualization && d instanceof google.visualization.DataTable) {
        var b = (d.getNumberOfColumns() > 3);
        if (b) {
            var j = d.getDistinctValues(3);
            for (var e = 0, c = j.length; e < c; e++) {
                this.addGroup(j[e])
            }
        }
    } else {
        if (links.Timeline.isArray(d)) {
            for (var e = 0, c = d.length; e < c; e++) {
                var h = d[e],
                    g = h.group;
                if (g) {
                    this.addGroup(g)
                }
            }
        } else {
            throw "Unknown data type. DataTable or Array expected."
        }
    }
};
links.Timeline.prototype.getData = function() {
    return this.data
};
links.Timeline.prototype.updateData = function(b, a) {
    var d = this.data;
    if (google && google.visualization && d instanceof google.visualization.DataTable) {
        var c = (b + 1) - d.getNumberOfRows();
        if (c > 0) {
            d.addRows(c)
        }
        if (a.start) {
            d.setValue(b, 0, a.start)
        }
        if (a.end) {
            d.setValue(b, 1, a.end)
        }
        if (a.content) {
            d.setValue(b, 2, a.content)
        }
        if (a.group && d.getNumberOfColumns() > 3) {
            d.setValue(b, 3, a.group)
        }
    } else {
        if (links.Timeline.isArray(d)) {
            var e = d[b];
            if (e == undefined) {
                e = {};
                d[b] = e
            }
            if (a.start) {
                e.start = a.start
            }
            if (a.end) {
                e.end = a.end
            }
            if (a.content) {
                e.content = a.content
            }
            if (a.group) {
                e.group = a.group
            }
        } else {
            throw "Cannot update data, unknown type of data"
        }
    }
};
links.Timeline.prototype.getItemIndex = function(f) {
    var g = f,
        h = this.dom,
        b = this.items,
        c = undefined;
    while (g.parentNode && g.parentNode !== h.items.frame) {
        g = g.parentNode
    }
    if (g.parentNode === h.items.frame) {
        for (var d = 0, a = b.length; d < a; d++) {
            if (b[d].dom === g) {
                c = d;
                break
            }
        }
    }
    return c
};
links.Timeline.prototype.setSize = function(b, a) {
    if (b) {
        this.options.width = b;
        this.dom.frame.style.width = b
    }
    if (a) {
        this.options.height = a;
        this.options.autoHeight = (this.options.height === "auto");
        if (a !== "auto") {
            this.dom.frame.style.height = a
        }
    }
    this.recalcSize();
    this.stackEvents(false);
    this.redrawFrame()
};
links.Timeline.prototype.setVisibleChartRange = function(e, b, d) {
    if (e == undefined) {
        e = new Date();
        e.setDate(e.getDate() - 3)
    }
    if (b == undefined) {
        b = new Date();
        b.setDate(e.getDate() + 4)
    }
    if (b.valueOf() <= e.valueOf()) {
        b = new Date(e);
        b.setDate(b.getDate() + 7)
    }
    var c = this.options.min ? this.options.min.valueOf() : undefined;
    if (c && e.valueOf() < c) {
        e = new Date(c)
    }
    var a = this.options.max ? this.options.max.valueOf() : undefined;
    if (a && b.valueOf() > a) {
        b = new Date(a)
    }
    this.applyRange(e, b);
    if (d == undefined || d == true) {
        this.recalcSize();
        this.stackEvents(false);
        this.redrawFrame()
    } else {
        this.recalcConversion()
    }
};
links.Timeline.prototype.setVisibleChartRangeAuto = function() {
    var d = this.items;
    startMin = undefined, endMax = undefined;
    for (var e = 0, b = d.length; e < b; e++) {
        var f = d[e],
            h = f.start ? f.start.valueOf() : undefined,
            c = f.end ? f.end.valueOf() : h;
        if (startMin !== undefined && h !== undefined) {
            startMin = Math.min(startMin, h)
        } else {
            startMin = h
        }
        if (endMax !== undefined && c !== undefined) {
            endMax = Math.max(endMax, c)
        } else {
            endMax = c
        }
    }
    if (startMin !== undefined && endMax !== undefined) {
        var a = (endMax + startMin) / 2,
            g = (endMax - startMin);
        startMin = startMin - g * 0.05;
        endMax = endMax + g * 0.05;
        this.setVisibleChartRange(new Date(startMin), new Date(endMax))
    } else {
        this.setVisibleChartRange(undefined, undefined)
    }
};
links.Timeline.prototype.setVisibleChartRangeNow = function() {
    var a = new Date();
    var b = (this.end.getTime() - this.start.getTime());
    var d = new Date(a.getTime() - b / 2);
    var c = new Date(d.getTime() + b);
    this.setVisibleChartRange(d, c)
};
links.Timeline.prototype.getVisibleChartRange = function() {
    var a = {
        start: new Date(this.start),
        end: new Date(this.end)
    };
    return a
};
links.Timeline.prototype.redrawFrame = function() {
    var c = this.dom,
        a = this.options,
        b = this.size;
    if (!c.frame) {
        c.frame = document.createElement("DIV");
        c.frame.className = "timeline-frame";
        c.frame.style.position = "relative";
        c.frame.style.overflow = "hidden";
        c.container.appendChild(c.frame)
    }
    if (a.autoHeight) {
        c.frame.style.height = b.frameHeight + "px"
    } else {
        c.frame.style.height = a.height || "100%"
    }
    c.frame.style.width = a.width || "100%";
    this.redrawContent();
    this.redrawGroups();
    this.redrawCurrentTime();
    this.redrawCustomTime();
    this.redrawNavigation()
};
links.Timeline.prototype.redrawContent = function() {
    var e = this.dom,
        b = this.size;
    if (!e.content) {
        e.content = document.createElement("DIV");
        e.content.style.position = "relative";
        e.content.style.overflow = "hidden";
        e.frame.appendChild(e.content);
        var a = document.createElement("DIV");
        a.style.position = "absolute";
        a.style.left = "0px";
        a.style.top = "0px";
        a.style.height = "100%";
        a.style.width = "0px";
        e.content.appendChild(a);
        e.contentTimelines = a;
        var d = this.eventParams,
            c = this;
        if (!d.onMouseDown) {
            d.onMouseDown = function(f) {
                c.onMouseDown(f)
            };
            links.Timeline.addEventListener(e.content, "mousedown", d.onMouseDown)
        }
        if (!d.onTouchStart) {
            d.onTouchStart = function(f) {
                c.onTouchStart(f)
            };
            links.Timeline.addEventListener(e.content, "touchstart", d.onTouchStart)
        }
        if (!d.onMouseWheel) {
            d.onMouseWheel = function(f) {
                c.onMouseWheel(f)
            };
            links.Timeline.addEventListener(e.content, "mousewheel", d.onMouseWheel)
        }
        if (!d.onDblClick) {
            d.onDblClick = function(f) {
                c.onDblClick(f)
            };
            links.Timeline.addEventListener(e.content, "dblclick", d.onDblClick)
        }
    }
    e.content.style.left = b.contentLeft + "px";
    e.content.style.top = "0px";
    e.content.style.width = b.contentWidth + "px";
    e.content.style.height = b.frameHeight + "px";
    this.redrawAxis();
    this.redrawItems();
    this.redrawDeleteButton();
    this.redrawDragAreas()
};
links.Timeline.prototype.redrawAxis = function() {
    var h = this.dom,
        o = this.options,
        n = this.size,
        e = this.step;
    var f = h.axis;
    if (!f) {
        f = {};
        h.axis = f
    }
    if (n.axis.properties === undefined) {
        n.axis.properties = {}
    }
    if (f.minorTexts === undefined) {
        f.minorTexts = []
    }
    if (f.minorLines === undefined) {
        f.minorLines = []
    }
    if (f.majorTexts === undefined) {
        f.majorTexts = []
    }
    if (f.majorLines === undefined) {
        f.majorLines = []
    }
    if (!f.frame) {
        f.frame = document.createElement("DIV");
        f.frame.style.position = "absolute";
        f.frame.style.left = "0px";
        f.frame.style.top = "0px";
        h.content.appendChild(f.frame)
    }
    h.content.removeChild(f.frame);
    f.frame.style.width = (n.contentWidth) + "px";
    f.frame.style.height = (n.axis.height) + "px";
    var c = this.screenToTime(0);
    var g = this.screenToTime(n.contentWidth);
    var d = n.contentWidth;
    this.minimumStep = this.screenToTime(n.axis.characterMinorWidth * 6).valueOf() - this.screenToTime(0).valueOf();
    e.setRange(c, g, this.minimumStep);
    this.redrawAxisCharacters();
    this.redrawAxisStartOverwriting();
    e.start();
    var a = undefined;
    while (!e.end()) {
        var m = e.getCurrent(),
            l = this.timeToScreen(m),
            j = e.isMajor();
        this.redrawAxisMinorText(l, e.getLabelMinor());
        if (j && o.showMajorLabels) {
            if (l > 0) {
                if (a === undefined) {
                    a = l
                }
                this.redrawAxisMajorText(l, e.getLabelMajor())
            }
            this.redrawAxisMajorLine(l)
        } else {
            this.redrawAxisMinorLine(l)
        }
        e.next()
    }
    if (o.showMajorLabels) {
        var b = this.screenToTime(0),
            k = this.step.getLabelMajor(b),
            d = k.length * n.axis.characterMajorWidth + 10;
        if (a === undefined || d < a) {
            this.redrawAxisMajorText(0, k, b)
        }
    }
    this.redrawAxisHorizontal();
    this.redrawAxisEndOverwriting();
    h.content.insertBefore(f.frame, h.content.firstChild)
};
links.Timeline.prototype.redrawAxisCharacters = function() {
    var e = this.dom,
        b = e.axis;
    if (!b.characterMinor) {
        var d = document.createTextNode("0");
        var a = document.createElement("DIV");
        a.className = "timeline-axis-text timeline-axis-text-minor";
        a.appendChild(d);
        a.style.position = "absolute";
        a.style.visibility = "hidden";
        a.style.paddingLeft = "0px";
        a.style.paddingRight = "0px";
        b.frame.appendChild(a);
        b.characterMinor = a
    }
    if (!b.characterMajor) {
        var d = document.createTextNode("0");
        var c = document.createElement("DIV");
        c.className = "timeline-axis-text timeline-axis-text-major";
        c.appendChild(d);
        c.style.position = "absolute";
        c.style.visibility = "hidden";
        c.style.paddingLeft = "0px";
        c.style.paddingRight = "0px";
        b.frame.appendChild(c);
        b.characterMajor = c
    }
};
links.Timeline.prototype.redrawAxisStartOverwriting = function() {
    var a = this.size.axis.properties;
    a.minorTextNum = 0;
    a.minorLineNum = 0;
    a.majorTextNum = 0;
    a.majorLineNum = 0
};
links.Timeline.prototype.redrawAxisEndOverwriting = function() {
    var b = this.dom,
        j = this.size.axis.properties,
        a = this.dom.axis.frame;
    var l = b.axis.minorTexts,
        e = j.minorTextNum;
    while (l.length > e) {
        var c = l[e];
        a.removeChild(c);
        l.splice(e, 1)
    }
    var d = b.axis.minorLines,
        e = j.minorLineNum;
    while (d.length > e) {
        var f = d[e];
        a.removeChild(f);
        d.splice(e, 1)
    }
    var m = b.axis.majorTexts,
        e = j.majorTextNum;
    while (m.length > e) {
        var h = m[e];
        a.removeChild(h);
        m.splice(e, 1)
    }
    var g = b.axis.majorLines,
        e = j.majorLineNum;
    while (g.length > e) {
        var k = g[e];
        a.removeChild(k);
        g.splice(e, 1)
    }
};
links.Timeline.prototype.redrawAxisHorizontal = function() {
    var c = this.dom.axis,
        b = this.size;
    if (!c.backgroundLine) {
        var d = document.createElement("DIV");
        d.className = "timeline-axis";
        d.style.position = "absolute";
        d.style.left = "0px";
        d.style.width = "100%";
        d.style.border = "none";
        c.frame.insertBefore(d, c.frame.firstChild);
        c.backgroundLine = d
    }
    c.backgroundLine.style.top = b.axis.top + "px";
    c.backgroundLine.style.height = b.axis.height + "px";
    if (c.line) {
        var a = c.frame.removeChild(c.line);
        c.frame.appendChild(a)
    } else {
        var a = document.createElement("DIV");
        a.className = "timeline-axis";
        a.style.position = "absolute";
        a.style.left = "0px";
        a.style.width = "100%";
        a.style.height = "0px";
        c.frame.appendChild(a);
        c.line = a
    }
    c.line.style.top = b.axis.line + "px"
};
links.Timeline.prototype.redrawAxisMinorText = function(h, j) {
    var k = this.size,
        b = this.dom,
        e = k.axis.properties,
        a = b.axis.frame,
        g = b.axis.minorTexts,
        c = e.minorTextNum,
        f;
    if (c < g.length) {
        f = g[c]
    } else {
        var d = document.createTextNode(""),
            f = document.createElement("DIV");
        f.appendChild(d);
        f.className = "timeline-axis-text timeline-axis-text-minor";
        f.style.position = "absolute";
        a.appendChild(f);
        g.push(f)
    }
    f.childNodes[0].nodeValue = j;
    f.style.left = h + "px";
    f.style.top = k.axis.labelMinorTop + "px";
    e.minorTextNum++
};
links.Timeline.prototype.redrawAxisMinorLine = function(a) {
    var e = this.size.axis,
        h = this.dom,
        d = e.properties,
        g = h.axis.frame,
        f = h.axis.minorLines,
        c = d.minorLineNum,
        b;
    if (c < f.length) {
        b = f[c]
    } else {
        b = document.createElement("DIV");
        b.className = "timeline-axis-grid timeline-axis-grid-minor";
        b.style.position = "absolute";
        b.style.width = "0px";
        g.appendChild(b);
        f.push(b)
    }
    b.style.top = e.lineMinorTop + "px";
    b.style.height = e.lineMinorHeight + "px";
    b.style.left = (a - e.lineMinorWidth / 2) + "px";
    d.minorLineNum++
};
links.Timeline.prototype.redrawAxisMajorText = function(f, h) {
    var j = this.size,
        d = j.axis.properties,
        a = this.dom.axis.frame,
        g = this.dom.axis.majorTexts,
        b = d.majorTextNum,
        e;
    if (b < g.length) {
        e = g[b]
    } else {
        var c = document.createTextNode(h);
        e = document.createElement("DIV");
        e.className = "timeline-axis-text timeline-axis-text-major";
        e.appendChild(c);
        e.style.position = "absolute";
        e.style.top = "0px";
        a.appendChild(e);
        g.push(e)
    }
    e.childNodes[0].nodeValue = h;
    e.style.top = j.axis.labelMajorTop + "px";
    e.style.left = f + "px";
    d.majorTextNum++
};
links.Timeline.prototype.redrawAxisMajorLine = function(a) {
    var e = this.size,
        g = e.axis.properties,
        f = this.size.axis,
        h = this.dom.axis.frame,
        d = this.dom.axis.majorLines,
        c = g.majorLineNum,
        b;
    if (c < d.length) {
        var b = d[c]
    } else {
        b = document.createElement("DIV");
        b.className = "timeline-axis-grid timeline-axis-grid-major";
        b.style.position = "absolute";
        b.style.top = "0px";
        b.style.width = "0px";
        h.appendChild(b);
        d.push(b)
    }
    b.style.left = (a - f.lineMajorWidth / 2) + "px";
    b.style.height = e.frameHeight + "px";
    g.majorLineNum++
};
links.Timeline.prototype.redrawItems = function() {
    var w = this.dom,
        g = this.options,
        q = (g.box && g.box.align) ? g.box.align : undefined;
    size = this.size, contentWidth = size.contentWidth, items = this.items;
    if (!w.items) {
        w.items = {}
    }
    var r = w.items.frame;
    if (!r) {
        r = document.createElement("DIV");
        r.style.position = "relative";
        w.content.appendChild(r);
        w.items.frame = r
    }
    r.style.left = "0px";
    r.style.top = size.items.top + "px";
    r.style.height = (size.frameHeight - size.axis.height) + "px";
    var f = w.items.ranges;
    if (!f) {
        f = [];
        w.items.ranges = f
    }
    var l = w.items.boxes;
    if (!l) {
        l = [];
        w.items.boxes = l
    }
    var m = w.items.dots;
    if (!m) {
        m = [];
        w.items.dots = m
    }
    w.content.removeChild(r);
    if (size.dataChanged) {
        var c = f.length,
            d = l.length,
            j = m.length,
            A = 0,
            t = 0,
            a = 0,
            x = items.length;
        for (var v = 0, u = items.length; v < u; v++) {
            var y = items[v];
            switch (y.type) {
                case "range":
                    if (A < c) {
                        var b = f[A];
                        b.firstChild.innerHTML = y.content;
                        b.style.display = "";
                        y.dom = b;
                        A++
                    } else {
                        var b = this.createEventRange(y.content);
                        f[A] = b;
                        r.appendChild(b);
                        y.dom = b;
                        A++;
                        c++
                    }
                    break;
                case "box":
                    if (t < d) {
                        var b = l[t];
                        b.firstChild.innerHTML = y.content;
                        b.style.display = "";
                        y.dom = b;
                        t++
                    } else {
                        var b = this.createEventBox(y.content);
                        l[t] = b;
                        r.appendChild(b);
                        r.insertBefore(b.line, r.firstChild);
                        r.appendChild(b.dot);
                        y.dom = b;
                        t++;
                        d++
                    }
                    break;
                case "dot":
                    if (a < j) {
                        var b = m[a];
                        b.firstChild.innerHTML = y.content;
                        b.style.display = "";
                        y.dom = b;
                        a++
                    } else {
                        var b = this.createEventDot(y.content);
                        m[a] = b;
                        r.appendChild(b);
                        y.dom = b;
                        a++;
                        j++
                    }
                    break;
                default:
                    break
            }
        }
        for (var v = A; v < c; v++) {
            r.removeChild(f[v])
        }
        f.splice(A, c - A);
        for (var v = t; v < d; v++) {
            var n = l[v];
            r.removeChild(n.line);
            r.removeChild(n.dot);
            r.removeChild(n)
        }
        l.splice(t, d - t);
        for (var v = a; v < j; v++) {
            r.removeChild(m[v])
        }
        m.splice(a, j - a)
    }
    for (var v = 0, u = items.length; v < u; v++) {
        var y = items[v],
            b = y.dom;
        switch (y.type) {
            case "range":
                var h = this.timeToScreen(y.start),
                    z = this.timeToScreen(y.end);
                if (h < -contentWidth) {
                    h = -contentWidth
                }
                if (z > 2 * contentWidth) {
                    z = 2 * contentWidth
                }
                var e = z > -contentWidth && h < 2 * contentWidth;
                if (e || size.dataChanged) {
                    if (y.hidden) {
                        y.hidden = false;
                        b.style.display = ""
                    }
                    b.style.top = y.top + "px";
                    b.style.left = h + "px";
                    b.style.width = Math.max(z - h, 1) + "px"
                } else {
                    if (!y.hidden) {
                        b.style.display = "none";
                        y.hidden = true
                    }
                }
                break;
            case "box":
                var h = this.timeToScreen(y.start);
                var B = g.axisOnTop,
                    p = size.axis.height,
                    k = size.axis.top;
                var e = ((h + y.width / 2 > -contentWidth) && (h - y.width / 2 < 2 * contentWidth));
                if (e || size.dataChanged) {
                    if (y.hidden) {
                        y.hidden = false;
                        b.style.display = "";
                        b.line.style.display = "";
                        b.dot.style.display = ""
                    }
                    b.style.top = y.top + "px";
                    if (q == "right") {
                        b.style.left = (h - y.width) + "px"
                    } else {
                        if (q == "left") {
                            b.style.left = (h) + "px"
                        } else {
                            b.style.left = (h - y.width / 2) + "px"
                        }
                    }
                    var o = b.line;
                    o.style.left = (h - y.lineWidth / 2) + "px";
                    if (B) {
                        o.style.top = "0px";
                        o.style.height = Math.max(y.top, 0) + "px"
                    } else {
                        o.style.top = (y.top + y.height) + "px";
                        o.style.height = Math.max(k - y.top - y.height, 0) + "px"
                    }
                    var s = b.dot;
                    s.style.left = (h - y.dotWidth / 2) + "px";
                    s.style.top = (k - y.dotHeight / 2) + "px"
                } else {
                    if (!y.hidden) {
                        b.style.display = "none";
                        b.line.style.display = "none";
                        b.dot.style.display = "none";
                        y.hidden = true
                    }
                }
                break;
            case "dot":
                var h = this.timeToScreen(y.start);
                var B = g.axisOnTop,
                    p = size.axis.height,
                    k = size.axis.top;
                var e = (h + y.width > -contentWidth) && (h < 2 * contentWidth);
                if (e || size.dataChanged) {
                    if (y.hidden) {
                        y.hidden = false;
                        b.style.display = ""
                    }
                    b.style.top = y.top + "px";
                    b.style.left = (h - y.dotWidth / 2) + "px";
                    b.content.style.marginLeft = (1.5 * y.dotWidth) + "px";
                    b.dot.style.top = ((y.height - y.dotHeight) / 2) + "px"
                } else {
                    if (!y.hidden) {
                        b.style.display = "none";
                        y.hidden = true
                    }
                }
                break;
            default:
                break
        }
    }
    if (this.selection) {
        var y = this.selection.item;
        r.removeChild(y);
        r.appendChild(y)
    }
    w.content.appendChild(r)
};
links.Timeline.prototype.createEventBox = function(e) {
    var c = document.createElement("DIV");
    c.style.position = "absolute";
    c.style.left = "0px";
    c.style.top = "0px";
    c.className = "timeline-event timeline-event-box";
    var b = document.createElement("DIV");
    b.className = "timeline-event-content";
    b.innerHTML = e;
    c.appendChild(b);
    var d = document.createElement("DIV");
    d.style.position = "absolute";
    d.style.width = "0px";
    d.className = "timeline-event timeline-event-line";
    c.line = d;
    var a = document.createElement("DIV");
    a.style.position = "absolute";
    a.style.width = "0px";
    a.style.height = "0px";
    a.className = "timeline-event timeline-event-dot";
    c.dot = a;
    return c
};
links.Timeline.prototype.createEventDot = function(d) {
    var c = document.createElement("DIV");
    c.style.position = "absolute";
    var b = document.createElement("DIV");
    b.className = "timeline-event-content";
    b.innerHTML = d;
    c.appendChild(b);
    var a = document.createElement("DIV");
    a.style.position = "absolute";
    a.className = "timeline-event timeline-event-dot";
    a.style.width = "0px";
    a.style.height = "0px";
    c.appendChild(a);
    c.content = b;
    c.dot = a;
    return c
};
links.Timeline.prototype.createEventRange = function(c) {
    var b = document.createElement("DIV");
    b.style.position = "absolute";
    b.className = "timeline-event timeline-event-range";
    var a = document.createElement("DIV");
    a.className = "timeline-event-content";
    a.innerHTML = c;
    b.appendChild(a);
    return b
};
links.Timeline.prototype.redrawGroups = function() {
    var p = this.dom,
        a = this.options,
        k = this.size,
        s = this.groups;
    if (p.groups === undefined) {
        p.groups = {}
    }
    var r = p.groups.labels;
    if (!r) {
        r = [];
        p.groups.labels = r
    }
    var d = p.groups.labelLines;
    if (!d) {
        d = [];
        p.groups.labelLines = d
    }
    var l = p.groups.itemLines;
    if (!l) {
        l = [];
        p.groups.itemLines = l
    }
    var j = p.groups.frame;
    if (!j) {
        var j = document.createElement("DIV");
        j.className = "timeline-groups-axis";
        j.style.position = "absolute";
        j.style.overflow = "hidden";
        j.style.top = "0px";
        j.style.height = "100%";
        p.frame.appendChild(j);
        p.groups.frame = j
    }
    j.style.left = k.groupsLeft + "px";
    j.style.width = (a.groupsWidth !== undefined) ? a.groupsWidth : k.groupsWidth + "px";
    if (s.length == 0) {
        j.style.display = "none"
    } else {
        j.style.display = ""
    }
    if (k.dataChanged) {
        var m = r.length,
            g = s.length;
        for (var o = 0, n = Math.min(m, g); o < n; o++) {
            var e = s[o];
            var f = r[o];
            f.innerHTML = e.content;
            f.style.display = ""
        }
        for (var o = m; o < g; o++) {
            var e = s[o];
            var f = document.createElement("DIV");
            f.className = "timeline-groups-text";
            f.style.position = "absolute";
            if (a.groupsWidth === undefined) {
                f.style.whiteSpace = "nowrap"
            }
            f.innerHTML = e.content;
            j.appendChild(f);
            r[o] = f;
            var c = document.createElement("DIV");
            c.className = "timeline-axis-grid timeline-axis-grid-minor";
            c.style.position = "absolute";
            c.style.left = "0px";
            c.style.width = "100%";
            c.style.height = "0px";
            c.style.borderTopStyle = "solid";
            j.appendChild(c);
            d[o] = c;
            var b = document.createElement("DIV");
            b.className = "timeline-axis-grid timeline-axis-grid-minor";
            b.style.position = "absolute";
            b.style.left = "0px";
            b.style.width = "100%";
            b.style.height = "0px";
            b.style.borderTopStyle = "solid";
            p.content.insertBefore(b, p.content.firstChild);
            l[o] = b
        }
        for (var o = g; o < m; o++) {
            var f = r[o],
                c = d[o],
                b = l[o];
            j.removeChild(f);
            j.removeChild(c);
            p.content.removeChild(b)
        }
        r.splice(g, m - g);
        d.splice(g, m - g);
        l.splice(g, m - g);
        j.style.borderStyle = a.groupsOnRight ? "none none none solid" : "none solid none none"
    }
    for (var o = 0, n = s.length; o < n; o++) {
        var e = s[o],
            f = r[o],
            c = d[o],
            b = l[o];
        f.style.top = e.labelTop + "px";
        c.style.top = e.lineTop + "px";
        b.style.top = e.lineTop + "px";
        b.style.width = k.contentWidth + "px"
    }
    if (!p.groups.background) {
        var q = document.createElement("DIV");
        q.className = "timeline-axis";
        q.style.position = "absolute";
        q.style.left = "0px";
        q.style.width = "100%";
        q.style.border = "none";
        j.appendChild(q);
        p.groups.background = q
    }
    p.groups.background.style.top = k.axis.top + "px";
    p.groups.background.style.height = k.axis.height + "px";
    if (!p.groups.line) {
        var h = document.createElement("DIV");
        h.className = "timeline-axis";
        h.style.position = "absolute";
        h.style.left = "0px";
        h.style.width = "100%";
        h.style.height = "0px";
        j.appendChild(h);
        p.groups.line = h
    }
    p.groups.line.style.top = k.axis.line + "px"
};
links.Timeline.prototype.redrawCurrentTime = function() {
    var l = this.options,
        e = this.dom,
        k = this.size;
    if (!l.showCurrentTime) {
        if (e.currentTime) {
            e.contentTimelines.removeChild(e.currentTime);
            delete e.currentTime
        }
        return
    }
    if (!e.currentTime) {
        var a = document.createElement("DIV");
        a.className = "timeline-currenttime";
        a.style.position = "absolute";
        a.style.top = "0px";
        a.style.height = "100%";
        e.contentTimelines.appendChild(a);
        e.currentTime = a
    }
    var b = new Date();
    var f = new Date(b.getTime() + this.clientTimeOffset);
    var h = this.timeToScreen(f);
    var d = (h > -k.contentWidth && h < 2 * k.contentWidth);
    e.currentTime.style.display = d ? "" : "none";
    e.currentTime.style.left = h + "px";
    e.currentTime.title = "Current time: " + f;
    if (this.currentTimeTimer != undefined) {
        clearTimeout(this.currentTimeTimer);
        delete this.currentTimeTimer
    }
    var j = this;
    var g = function() {
        j.redrawCurrentTime()
    };
    var c = 1 / this.conversion.factor / 2;
    if (c < 30) {
        c = 30
    }
    this.currentTimeTimer = setTimeout(g, c)
};
links.Timeline.prototype.redrawCustomTime = function() {
    var c = this.options,
        f = this.dom,
        d = this.size;
    if (!c.showCustomTime) {
        if (f.customTime) {
            f.contentTimelines.removeChild(f.customTime);
            delete f.customTime
        }
        return
    }
    if (!f.customTime) {
        var b = document.createElement("DIV");
        b.className = "timeline-customtime";
        b.style.position = "absolute";
        b.style.top = "0px";
        var e = document.createElement("DIV");
        e.style.position = "relative";
        e.style.top = "0px";
        e.style.left = "-10px";
        e.style.height = "100%";
        e.style.width = "20px";
        b.appendChild(e);
        f.contentTimelines.appendChild(b);
        f.customTime = b;
        this.customTime = new Date()
    }
    var a = this.timeToScreen(this.customTime);
    f.customTime.style.left = a + "px"
};
links.Timeline.prototype.redrawDeleteButton = function() {
    var h = this,
        l = this.options,
        c = this.dom,
        k = this.size,
        b = c.items.frame;
    if (!l.editable) {
        return
    }
    var f = c.items.deleteButton;
    if (!f) {
        f = document.createElement("DIV");
        f.className = "timeline-navigation-delete";
        f.style.position = "absolute";
        b.appendChild(f);
        c.items.deleteButton = f
    }
    if (this.selection) {
        var d = this.selection.index,
            j = this.items[d],
            a = this.selection.item,
            g, e = j.top;
        switch (j.type) {
            case "range":
                g = this.timeToScreen(j.end);
                break;
            case "box":
                g = this.timeToScreen(j.start) + j.width / 2;
                break;
            case "dot":
                g = this.timeToScreen(j.start) + j.width;
                break
        }
        if (g < -k.contentWidth) {
            g = -k.contentWidth
        }
        if (g > 2 * k.contentWidth) {
            g = 2 * k.contentWidth
        }
        f.style.left = g + "px";
        f.style.top = e + "px";
        f.style.display = "";
        b.removeChild(f);
        b.appendChild(f)
    } else {
        f.style.display = "none"
    }
};
links.Timeline.prototype.redrawDragAreas = function() {
    var l = this,
        o = this.options,
        e = this.dom,
        n = this.size,
        b = this.dom.items.frame;
    if (!o.editable) {
        return
    }
    var d = e.items.dragLeft;
    if (!d) {
        d = document.createElement("DIV");
        d.style.width = o.dragAreaWidth + "px";
        d.style.position = "absolute";
        d.style.cursor = "w-resize";
        b.appendChild(d);
        e.items.dragLeft = d
    }
    var f = e.items.dragRight;
    if (!f) {
        f = document.createElement("DIV");
        f.style.width = o.dragAreaWidth + "px";
        f.style.position = "absolute";
        f.style.cursor = "e-resize";
        b.appendChild(f);
        e.items.dragRight = f
    }
    if (this.selection) {
        var g = this.selection.index,
            m = this.items[g];
        if (m.type == "range") {
            var a = m.dom,
                c = this.timeToScreen(m.start),
                j = this.timeToScreen(m.end),
                h = m.top,
                k = m.height;
            d.style.left = c + "px";
            d.style.top = h + "px";
            d.style.height = k + "px";
            d.style.display = "";
            b.removeChild(d);
            b.appendChild(d);
            f.style.left = (j - o.dragAreaWidth) + "px";
            f.style.top = h + "px";
            f.style.height = k + "px";
            f.style.display = "";
            b.removeChild(f);
            b.appendChild(f)
        }
    } else {
        d.style.display = "none";
        f.style.display = "none"
    }
};
links.Timeline.prototype.redrawNavigation = function() {
    var j = this,
        k = this.options,
        e = this.dom,
        b = e.frame,
        d = e.navBar;
    if (!d) {
        if (k.editable || k.showNavigation) {
            d = document.createElement("DIV");
            d.style.position = "absolute";
            d.className = "timeline-navigation";
            if (k.groupsOnRight) {
                d.style.left = "10px"
            } else {
                d.style.right = "10px"
            }
            if (k.axisOnTop) {
                d.style.bottom = "10px"
            } else {
                d.style.top = "10px"
            }
            e.navBar = d;
            b.appendChild(d)
        }
        if (k.editable && k.showButtonAdd) {
            d.addButton = document.createElement("DIV");
            d.addButton.className = "timeline-navigation-new";
            d.addButton.title = "Create new event";
            var g = function(r) {
                links.Timeline.preventDefault(r);
                links.Timeline.stopPropagation(r);
                var m = j.size.contentWidth;
                var l = m / 2;
                var n = j.screenToTime(l - m / 10);
                var p = j.screenToTime(l + m / 10);
                if (k.snapEvents) {
                    j.step.snap(n);
                    j.step.snap(p)
                }
                var q = "New";
                var s = j.groups.length ? j.groups[0].content : undefined;
                j.addItem({
                    start: n,
                    end: p,
                    content: q,
                    group: s
                });
                var o = (j.items.length - 1);
                j.selectItem(o);
                j.applyAdd = true;
                j.trigger("add");
                if (!j.applyAdd) {
                    j.deleteItem(o)
                }
                j.redrawDeleteButton();
                j.redrawDragAreas()
            };
            links.Timeline.addEventListener(d.addButton, "mousedown", g);
            d.appendChild(d.addButton)
        }
        if (k.editable && k.showButtonAdd && k.showNavigation) {
            d.addButton.style.borderRightWidth = "1px";
            d.addButton.style.borderRightStyle = "solid"
        }
        if (k.showNavigation) {
            d.moveLeftButton = document.createElement("I");
            d.moveLeftButton.className = "left-caret-icon";
            d.moveLeftButton.title = "Move left";
            var h = function(l) {
                links.Timeline.preventDefault(l);
                links.Timeline.stopPropagation(l);
                j.move(-0.2);
                j.trigger("rangechange");
                j.trigger("rangechanged")
            };
            links.Timeline.addEventListener(d.moveLeftButton, "mousedown", h);
            d.appendChild(d.moveLeftButton);
            d.zoomInButton = document.createElement("I");
            d.zoomInButton.className = "zoom-in-icon mr-5 ml-5";
            d.zoomInButton.title = "Zoom in";
            var c = function(l) {
                links.Timeline.preventDefault(l);
                links.Timeline.stopPropagation(l);
                j.zoom(0.4);
                j.trigger("rangechange");
                j.trigger("rangechanged")
            };
            links.Timeline.addEventListener(d.zoomInButton, "mousedown", c);
            d.appendChild(d.zoomInButton);
            d.zoomOutButton = document.createElement("I");
            d.zoomOutButton.className = "zoom-out-icon mr-5";
            d.zoomOutButton.title = "Zoom out";
            var f = function(l) {
                links.Timeline.preventDefault(l);
                links.Timeline.stopPropagation(l);
                j.zoom(-0.4);
                j.trigger("rangechange");
                j.trigger("rangechanged")
            };
            links.Timeline.addEventListener(d.zoomOutButton, "mousedown", f);
            d.appendChild(d.zoomOutButton);
            d.moveRightButton = document.createElement("I");
            d.moveRightButton.className = "right-caret-icon";
            d.moveRightButton.title = "Move right";
            var a = function(l) {
                links.Timeline.preventDefault(l);
                links.Timeline.stopPropagation(l);
                j.move(0.2);
                j.trigger("rangechange");
                j.trigger("rangechanged")
            };
            links.Timeline.addEventListener(d.moveRightButton, "mousedown", a);
            d.appendChild(d.moveRightButton)
        }
    }
};
links.Timeline.prototype.setCurrentTime = function(b) {
    var a = new Date();
    this.clientTimeOffset = b.getTime() - a.getTime();
    this.redrawCurrentTime()
};
links.Timeline.prototype.getCurrentTime = function() {
    var a = new Date();
    return new Date(a.getTime() + this.clientTimeOffset)
};
links.Timeline.prototype.setCustomTime = function(a) {
    this.customTime = new Date(a);
    this.redrawCustomTime()
};
links.Timeline.prototype.getCustomTime = function() {
    return new Date(this.customTime)
};
links.Timeline.prototype.setScale = function(b, a) {
    this.step.setScale(b, a);
    this.redrawFrame()
};
links.Timeline.prototype.setAutoScale = function(a) {
    this.step.setAutoScale(a);
    this.redrawFrame()
};
links.Timeline.prototype.redraw = function() {
    this.setData(this.data)
};
links.Timeline.prototype.checkResize = function() {
    var a = this.recalcSize();
    if (a) {
        this.redrawFrame()
    }
};
links.Timeline.filterImageUrls = function(b, c) {
    var d = b.firstChild;
    while (d) {
        if (d.tagName == "IMG") {
            var a = d.src;
            if (c.indexOf(a) == -1) {
                c.push(a)
            }
        }
        links.Timeline.filterImageUrls(d, c);
        d = d.nextSibling
    }
};
links.Timeline.prototype.recalcSize = function() {
    var y = false;
    var e = this;
    size = this.size, options = this.options, axisOnTop = options.axisOnTop, dom = this.dom, axis = dom.axis, groups = this.groups, labels = dom.groups.labels, items = this.items;
    groupsWidth = size.groupsWidth, characterMinorWidth = axis.characterMinor ? axis.characterMinor.clientWidth : 0, characterMinorHeight = axis.characterMinor ? axis.characterMinor.clientHeight : 0, characterMajorWidth = axis.characterMajor ? axis.characterMajor.clientWidth : 0, characterMajorHeight = axis.characterMajor ? axis.characterMajor.clientHeight : 0, axisHeight = characterMinorHeight + (options.showMajorLabels ? characterMajorHeight : 0), actualHeight = size.actualHeight || axisHeight;
    if (size.dataChanged) {
        var x = [];
        for (var w = 0, q = items.length; w < q; w++) {
            var z = items[w],
                a = z.dom;
            if (a) {
                links.Timeline.filterImageUrls(a, x)
            }
        }
        if (x.length) {
            for (var w = 0; w < x.length; w++) {
                var c = x[w];
                var d = function(C) {
                    e.redraw()
                };
                var b = false;
                links.imageloader.load(c, d, b)
            }
        }
    }
    if (size.dataChanged) {
        groupsWidth = 0;
        for (var w = 0, q = labels.length; w < q; w++) {
            var h = groups[w];
            h.width = labels[w].clientWidth;
            h.height = labels[w].clientHeight;
            h.labelHeight = h.height;
            groupsWidth = Math.max(groupsWidth, h.width)
        }
        for (var w = 0, q = items.length; w < q; w++) {
            var z = items[w],
                a = z.dom,
                h = z.group;
            var p = a ? a.clientWidth : 0;
            var o = a ? a.clientHeight : 0;
            y = y || (z.width != p);
            y = y || (z.height != o);
            z.width = p;
            z.height = o;
            switch (z.type) {
                case "range":
                    break;
                case "box":
                    z.dotHeight = a.dot.offsetHeight;
                    z.dotWidth = a.dot.offsetWidth;
                    z.lineWidth = a.line.offsetWidth;
                    break;
                case "dot":
                    z.dotHeight = a.dot.offsetHeight;
                    z.dotWidth = a.dot.offsetWidth;
                    z.contentHeight = a.content.offsetHeight;
                    break
            }
            if (h) {
                h.height = h.height ? Math.max(h.height, z.height) : z.height
            }
        }
        actualHeight = axisHeight + 2 * options.eventMarginAxis;
        for (var w = 0, q = groups.length; w < q; w++) {
            actualHeight += groups[w].height + options.eventMargin
        }
    }
    if (groups.length == 0 && options.autoHeight) {
        var r = 0,
            v = 0;
        if (this.animation && this.animation.finalItems) {
            var k = this.animation.finalItems,
                A = k[0];
            if (A && A.top) {
                r = A.top, v = A.top + A.height
            }
            for (var w = 1, q = k.length; w < q; w++) {
                A = k[w];
                r = Math.min(r, A.top);
                v = Math.max(v, A.top + A.height)
            }
        } else {
            var z = items[0];
            if (z && z.top) {
                r = z.top, v = z.top + z.height
            }
            for (var w = 1, q = items.length; w < q; w++) {
                var z = items[w];
                if (z.top) {
                    r = Math.min(r, z.top);
                    v = Math.max(v, (z.top + z.height))
                }
            }
        }
        actualHeight = (v - r) + 2 * options.eventMarginAxis + axisHeight;
        if (size.actualHeight != actualHeight && options.autoHeight && !options.axisOnTop) {
            var l = actualHeight - size.actualHeight;
            if (this.animation && this.animation.finalItems) {
                var k = this.animation.finalItems;
                for (var w = 0, q = k.length; w < q; w++) {
                    k[w].top += l;
                    k[w].item.top += l
                }
            } else {
                for (var w = 0, q = items.length; w < q; w++) {
                    items[w].top += l
                }
            }
        }
    }
    var u = dom.frame ? dom.frame.offsetWidth : 0,
        j = Math.max(options.autoHeight ? actualHeight : (dom.frame ? dom.frame.clientHeight : 0), options.minHeight),
        g = axisOnTop ? 0 : j - axisHeight,
        s = axisOnTop ? axisHeight : g,
        m = axisOnTop ? axisHeight : 0,
        t = Math.max(j - axisHeight, 0);
    if (options.groupsWidth !== undefined) {
        groupsWidth = dom.groups.frame ? dom.groups.frame.clientWidth : 0
    }
    var B = options.groupsOnRight ? u - groupsWidth : 0;
    if (size.dataChanged) {
        var f = options.eventMargin,
            n = axisOnTop ? options.eventMarginAxis + f / 2 : t - options.eventMarginAxis + f / 2;
        for (var w = 0, q = groups.length; w < q; w++) {
            var h = groups[w];
            if (axisOnTop) {
                h.top = n;
                h.labelTop = n + axisHeight + (h.height - h.labelHeight) / 2;
                h.lineTop = n + axisHeight + h.height + f / 2;
                n += h.height + f
            } else {
                n -= h.height + f;
                h.top = n;
                h.labelTop = n + (h.height - h.labelHeight) / 2;
                h.lineTop = n - f / 2
            }
        }
        for (var w = 0, q = items.length; w < q; w++) {
            var z = items[w],
                h = z.group;
            if (h) {
                z.top = h.top
            }
        }
        y = true
    }
    y = y || (size.groupsWidth !== groupsWidth);
    y = y || (size.groupsLeft !== B);
    y = y || (size.actualHeight !== actualHeight);
    size.groupsWidth = groupsWidth;
    size.groupsLeft = B;
    size.actualHeight = actualHeight;
    y = y || (size.frameWidth !== u);
    y = y || (size.frameHeight !== j);
    size.frameWidth = u;
    size.frameHeight = j;
    y = y || (size.groupsWidth !== groupsWidth);
    size.groupsWidth = groupsWidth;
    size.contentLeft = options.groupsOnRight ? 0 : groupsWidth;
    size.contentWidth = Math.max(u - groupsWidth, 0);
    size.contentHeight = t;
    y = y || (size.axis.top !== g);
    y = y || (size.axis.line !== s);
    y = y || (size.axis.height !== axisHeight);
    y = y || (size.items.top !== m);
    size.axis.top = g;
    size.axis.line = s;
    size.axis.height = axisHeight;
    size.axis.labelMajorTop = options.axisOnTop ? 0 : s + characterMinorHeight;
    size.axis.labelMinorTop = options.axisOnTop ? (options.showMajorLabels ? characterMajorHeight : 0) : s;
    size.axis.lineMinorTop = options.axisOnTop ? size.axis.labelMinorTop : 0;
    size.axis.lineMinorHeight = options.showMajorLabels ? j - characterMajorHeight : j;
    size.axis.lineMinorWidth = dom.axis.minorLines.length ? dom.axis.minorLines[0].offsetWidth : 1;
    size.axis.lineMajorWidth = dom.axis.majorLines.length ? dom.axis.majorLines[0].offsetWidth : 1;
    size.items.top = m;
    y = y || (size.axis.characterMinorWidth !== characterMinorWidth);
    y = y || (size.axis.characterMinorHeight !== characterMinorHeight);
    y = y || (size.axis.characterMajorWidth !== characterMajorWidth);
    y = y || (size.axis.characterMajorHeight !== characterMajorHeight);
    size.axis.characterMinorWidth = characterMinorWidth;
    size.axis.characterMinorHeight = characterMinorHeight;
    size.axis.characterMajorWidth = characterMajorWidth;
    size.axis.characterMajorHeight = characterMajorHeight;
    this.recalcConversion();
    return y
};
links.Timeline.prototype.recalcConversion = function() {
    this.conversion.offset = parseFloat(this.start.valueOf());
    this.conversion.factor = parseFloat(this.size.contentWidth) / parseFloat(this.end.valueOf() - this.start.valueOf())
};
links.Timeline.prototype.screenToTime = function(a) {
    return new Date(parseFloat(a) / this.conversion.factor + this.conversion.offset)
};
links.Timeline.prototype.timeToScreen = function(c) {
    var b = this.conversion;
    var a = (c.valueOf() - b.offset) * b.factor;
    return a
};
links.Timeline.prototype.onTouchStart = function(b) {
    var d = this.eventParams,
        c = this.dom,
        a = this;
    if (d.touchDown) {
        return
    }
    d.touchDown = true;
    d.zoomed = false;
    this.onMouseDown(b);
    if (!d.onTouchMove) {
        d.onTouchMove = function(e) {
            a.onTouchMove(e)
        };
        links.Timeline.addEventListener(document, "touchmove", d.onTouchMove)
    }
    if (!d.onTouchEnd) {
        d.onTouchEnd = function(e) {
            a.onTouchEnd(e)
        };
        links.Timeline.addEventListener(document, "touchend", d.onTouchEnd)
    }
};
links.Timeline.prototype.onTouchMove = function(d) {
    var g = this.eventParams;
    if (d.scale && d.scale !== 1) {
        g.zoomed = true
    }
    if (!g.zoomed) {
        this.onMouseMove(d)
    } else {
        if (this.options.zoomable) {
            g.zoomed = true;
            var f = d.scale,
                b = (g.end.valueOf() - g.start.valueOf()),
                c = b / f,
                e = c - b,
                h = new Date(parseInt(g.start.valueOf() - e / 2)),
                a = new Date(parseInt(g.end.valueOf() + e / 2));
            this.setVisibleChartRange(h, a);
            timeline.trigger("rangechange");
            links.Timeline.preventDefault(d)
        }
    }
};
links.Timeline.prototype.onTouchEnd = function(a) {
    var b = this.eventParams;
    b.touchDown = false;
    if (b.zoomed) {
        timeline.trigger("rangechanged")
    }
    if (b.onTouchMove) {
        links.Timeline.removeEventListener(document, "touchmove", b.onTouchMove);
        delete b.onTouchMove
    }
    if (b.onTouchEnd) {
        links.Timeline.removeEventListener(document, "touchend", b.onTouchEnd);
        delete b.onTouchEnd
    }
    this.onMouseUp(a)
};
links.Timeline.prototype.onMouseDown = function(b) {
    b = b || window.event;
    var c = this.eventParams,
        n = this.options,
        d = this.dom;
    var m = b.which ? (b.which == 1) : (b.button == 1);
    if (!m && !c.touchDown) {
        return
    }
    this.recalcSize();
    if (!c.touchDown) {
        c.mouseX = b.clientX;
        c.mouseY = b.clientY
    } else {
        c.mouseX = b.targetTouches[0].clientX;
        c.mouseY = b.targetTouches[0].clientY
    }
    if (c.mouseX === undefined) {
        c.mouseX = 0
    }
    if (c.mouseY === undefined) {
        c.mouseY = 0
    }
    c.frameLeft = links.Timeline.getAbsoluteLeft(this.dom.content);
    c.frameTop = links.Timeline.getAbsoluteTop(this.dom.content);
    c.previousLeft = 0;
    c.previousOffset = 0;
    c.moved = false;
    c.start = new Date(this.start);
    c.end = new Date(this.end);
    c.target = links.Timeline.getTarget(b);
    c.itemDragLeft = (c.target === this.dom.items.dragLeft || $.contains(this.dom.items.dragLeft, c.target));
    c.itemDragRight = (c.target === this.dom.items.dragRight || $.contains(this.dom.items.dragRight, c.target));
    if (c.itemDragLeft || c.itemDragRight) {
        c.itemIndex = this.selection ? this.selection.index : undefined
    } else {
        c.itemIndex = this.getItemIndex(c.target)
    }
    c.customTime = (c.target === d.customTime || c.target.parentNode === d.customTime) ? this.customTime : undefined;
    c.addItem = (n.editable && b.ctrlKey);
    if (c.addItem) {
        var h = c.mouseX - c.frameLeft;
        var g = c.mouseY - c.frameTop;
        var k = this.screenToTime(h);
        if (n.snapEvents) {
            this.step.snap(k)
        }
        var a = new Date(k);
        var e = "New";
        var j = this.getGroupFromHeight(g);
        this.addItem({
            start: k,
            end: a,
            content: e,
            group: j.content
        });
        c.itemIndex = (this.items.length - 1);
        this.selectItem(c.itemIndex);
        c.itemDragRight = true
    }
    c.editItem = n.editable ? this.isSelected(c.itemIndex) : undefined;
    if (c.editItem) {
        var l = this.items[c.itemIndex];
        c.itemStart = l.start;
        c.itemEnd = l.end;
        c.itemType = l.type;
        if (c.itemType == "range") {
            c.itemLeft = this.timeToScreen(l.start);
            c.itemRight = this.timeToScreen(l.end)
        } else {
            c.itemLeft = this.timeToScreen(l.start)
        }
    } else {
        this.dom.frame.style.cursor = "move"
    }
    if (!c.touchDown) {
        var f = this;
        if (!c.onMouseMove) {
            c.onMouseMove = function(o) {
                f.onMouseMove(o)
            };
            links.Timeline.addEventListener(document, "mousemove", c.onMouseMove)
        }
        if (!c.onMouseUp) {
            c.onMouseUp = function(o) {
                f.onMouseUp(o)
            };
            links.Timeline.addEventListener(document, "mouseup", c.onMouseUp)
        }
        links.Timeline.preventDefault(b)
    }
};
links.Timeline.prototype.onMouseMove = function(z) {
    z = z || window.event;
    var E = this.eventParams,
        s = this.size,
        A = this.dom,
        f = this.options;
    if (!E.touchDown) {
        var n = z.clientX;
        var l = z.clientY
    } else {
        var n = z.targetTouches[0].clientX;
        var l = z.targetTouches[0].clientY
    }
    if (n === undefined) {
        n = 0
    }
    if (l === undefined) {
        l = 0
    }
    if (E.mouseX === undefined) {
        E.mouseX = n
    }
    if (E.mouseY === undefined) {
        E.mouseY = l
    }
    var v = parseFloat(n) - E.mouseX;
    var t = parseFloat(l) - E.mouseY;
    E.moved = true;
    if (E.customTime) {
        var p = this.timeToScreen(E.customTime),
            r = p + v,
            u = this.screenToTime(r);
        if (u >= this.options.startTime && u <= this.options.endTime) {
            this.customTime = this.screenToTime(r);
            this.redrawCustomTime();
            this.trigger("timechange")
        }
    } else {
        if (E.editItem) {
            var C = this.items[E.itemIndex],
                c = C.dom,
                g, D;
            if (E.itemDragLeft) {
                g = E.itemLeft + v;
                D = E.itemRight;
                C.start = this.screenToTime(g);
                if (f.snapEvents) {
                    this.step.snap(C.start);
                    g = this.timeToScreen(C.start)
                }
                if (this.options.startTime && (this.screenToTime(g).getTime() < this.options.startTime.getTime())) {
                    g = this.timeToScreen(this.options.startTime);
                    C.start = this.screenToTime(g)
                }
                if (g > D) {
                    g = D;
                    C.start = this.screenToTime(g)
                }
            } else {
                if (E.itemDragRight) {
                    g = E.itemLeft;
                    D = E.itemRight + v;
                    C.end = this.screenToTime(D);
                    if (f.snapEvents) {
                        this.step.snap(C.end);
                        D = this.timeToScreen(C.end)
                    }
                    if (this.options.endTime && (this.screenToTime(D).getTime() > this.options.endTime.getTime())) {
                        D = this.timeToScreen(this.options.endTime);
                        C.end = this.screenToTime(D)
                    }
                    if (D < g) {
                        D = g;
                        C.end = this.screenToTime(D)
                    }
                } else {
                    if (!f.moveable) {
                        return
                    }
                    g = E.itemLeft + v;
                    C.start = this.screenToTime(g);
                    if (f.snapEvents) {
                        this.step.snap(C.start);
                        g = this.timeToScreen(C.start)
                    }
                    if (C.end) {
                        D = g + (E.itemRight - E.itemLeft);
                        C.end = this.screenToTime(D)
                    }
                }
            }
            this.repositionItem(C, g, D);
            if (this.groups.length == 0) {
                this.stackEvents(f.animate);
                if (!f.animate) {
                    this.redrawFrame()
                }
            } else {
                if (f.groupsChangeable) {
                    var o = l - E.frameTop;
                    var k = this.getGroupFromHeight(o);
                    if (C.group !== k) {
                        var h = this.items.indexOf(C);
                        this.changeItem(h, {
                            group: k.content
                        });
                        C.top = k.top;
                        this.repositionItem(C)
                    }
                }
            }
            this.redrawDeleteButton();
            this.redrawDragAreas()
        } else {
            if (f.moveable) {
                var B = (E.end.valueOf() - E.start.valueOf());
                var F = Math.round(parseFloat(-v) / s.contentWidth * B);
                var b = new Date(E.start.valueOf() + F);
                var a = new Date(E.end.valueOf() + F);
                this.applyRange(b, a);
                var m = (this.start.valueOf() - b.valueOf());
                if (m) {
                    F += m
                }
                this.recalcConversion();
                var e = E.previousLeft || 0;
                var w = parseFloat(A.items.frame.style.left) || 0;
                var q = E.previousOffset || 0;
                var d = q + (w - e);
                var j = -F / B * s.contentWidth + d;
                E.previousOffset = d;
                E.previousLeft = j;
                A.items.frame.style.left = (j) + "px";
                this.redrawCurrentTime();
                this.redrawCustomTime();
                this.redrawAxis();
                this.trigger("rangechange")
            }
        }
    }
    links.Timeline.preventDefault(z)
};
links.Timeline.prototype.onMouseUp = function(d) {
    var e = this.eventParams,
        a = this.options;
    d = d || window.event;
    this.dom.frame.style.cursor = "auto";
    if (e.onMouseMove) {
        links.Timeline.removeEventListener(document, "mousemove", e.onMouseMove);
        delete e.onMouseMove
    }
    if (e.onMouseUp) {
        links.Timeline.removeEventListener(document, "mouseup", e.onMouseUp);
        delete e.onMouseUp
    }
    if (e.customTime) {
        this.trigger("timechanged")
    } else {
        if (e.editItem) {
            var c = this.items[e.itemIndex];
            if (e.moved || e.addItem) {
                this.applyChange = true;
                this.applyAdd = true;
                this.updateData(e.itemIndex, {
                    start: c.start,
                    end: c.end
                });
                this.trigger(e.addItem ? "add" : "change");
                if (e.addItem) {
                    if (this.applyAdd) {
                        this.updateData(e.itemIndex, {
                            start: c.start,
                            end: c.end,
                            content: c.content,
                            group: c.group ? c.group.content : undefined
                        })
                    } else {
                        this.deleteItem(e.itemIndex)
                    }
                } else {
                    if (this.applyChange) {
                        this.updateData(e.itemIndex, {
                            start: c.start,
                            end: c.end
                        })
                    } else {
                        delete this.applyChange;
                        delete this.applyAdd;
                        var c = this.items[e.itemIndex],
                            b = c.dom;
                        c.start = e.itemStart;
                        c.end = e.itemEnd;
                        this.repositionItem(c, e.itemLeft, e.itemRight)
                    }
                }
                this.recalcSize();
                this.stackEvents(a.animate);
                if (!a.animate) {
                    this.redrawFrame()
                }
                this.redrawDeleteButton();
                this.redrawDragAreas()
            }
        } else {
            if (!e.moved && !e.zoomed) {
                if (a.editable && (e.target === this.dom.items.deleteButton)) {
                    if (this.selection) {
                        this.confirmDeleteItem(this.selection.index)
                    }
                    this.redrawFrame()
                } else {
                    if (a.selectable) {
                        if (e.itemIndex !== undefined) {
                            if (!this.isSelected(e.itemIndex)) {
                                this.selectItem(e.itemIndex);
                                this.redrawDeleteButton();
                                this.redrawDragAreas();
                                this.trigger("select")
                            }
                        } else {
                            this.unselectItem();
                            this.redrawDeleteButton();
                            this.redrawDragAreas()
                        }
                    }
                }
            } else {
                this.redrawFrame();
                if ((e.moved && a.moveable) || (e.zoomed && a.zoomable)) {
                    this.trigger("rangechanged")
                }
            }
        }
    }
};
links.Timeline.prototype.onDblClick = function(b) {
    var c = this.eventParams,
        l = this.options,
        d = this.dom,
        k = this.size;
    b = b || window.event;
    if (!l.editable) {
        return
    }
    if (c.itemIndex !== undefined) {
        this.trigger("edit")
    } else {
        var g = b.clientX - links.Timeline.getAbsoluteLeft(d.content);
        var f = b.clientY - links.Timeline.getAbsoluteTop(d.content);
        var j = this.screenToTime(g);
        var a = this.screenToTime(g + k.frameWidth / 10);
        if (l.snapEvents) {
            this.step.snap(j);
            this.step.snap(a)
        }
        var e = "New";
        var h = this.getGroupFromHeight(f);
        this.addItem({
            start: j,
            end: a,
            content: e,
            group: h.content
        });
        c.itemIndex = (this.items.length - 1);
        this.selectItem(c.itemIndex);
        this.applyAdd = true;
        this.trigger("add");
        if (!this.applyAdd) {
            this.deleteItem(c.itemIndex)
        }
        this.redrawDeleteButton();
        this.redrawDragAreas()
    }
    links.Timeline.preventDefault(b)
};
links.Timeline.prototype.onMouseWheel = function(c) {
    if (!this.options.zoomable) {
        return
    }
    if (!c) {
        c = window.event
    }
    var d = 0;
    if (c.wheelDelta) {
        d = c.wheelDelta / 120
    } else {
        if (c.detail) {
            d = -c.detail / 3
        }
    }
    if (d) {
        var b = this;
        var a = function() {
            b.recalcSize();
            var f = d / 5;
            var e = links.Timeline.getAbsoluteLeft(b.dom.content);
            var g = (c.clientX != undefined && e != undefined) ? b.screenToTime(c.clientX - e) : undefined;
            b.zoom(f, g);
            b.trigger("rangechange");
            b.trigger("rangechanged")
        };
        a()
    }
    links.Timeline.preventDefault(c)
};
links.Timeline.prototype.zoom = function(f, g) {
    if (g == undefined) {
        g = new Date((this.start.valueOf() + this.end.valueOf()) / 2)
    }
    if (f >= 1) {
        f = 0.9
    }
    if (f <= -1) {
        f = -0.9
    }
    if (f < 0) {
        f = f / (1 + f)
    }
    var d = parseFloat(this.start.valueOf() - g.valueOf());
    var c = parseFloat(this.end.valueOf() - g.valueOf());
    var a = new Date(this.start.valueOf() - d * f);
    var e = new Date(this.end.valueOf() - c * f);
    this.applyRange(a, e, g);
    this.recalcSize();
    var b = this.options.animate ? this.options.animateZoom : false;
    this.stackEvents(b);
    if (!b || this.groups.length > 0) {
        this.redrawFrame()
    }
};
links.Timeline.prototype.move = function(b) {
    var d = parseFloat(this.end.valueOf() - this.start.valueOf());
    var a = new Date(this.start.valueOf() + d * b);
    var c = new Date(this.end.valueOf() + d * b);
    this.applyRange(a, c);
    this.recalcConversion();
    this.redrawFrame()
};
links.Timeline.prototype.repositionItem = function(c, d, a) {
    var b = c.dom;
    switch (c.type) {
        case "range":
            b.style.left = d + "px";
            b.style.width = Math.max(a - d, 1) + "px";
            break;
        case "box":
            b.style.left = (d - c.width / 2) + "px";
            b.line.style.left = (d - c.lineWidth / 2) + "px";
            b.dot.style.left = (d - c.dotWidth / 2) + "px";
            break;
        case "dot":
            b.style.left = (d - c.dotWidth / 2) + "px";
            break
    }
    if (this.groups.length > 0) {
        b.style.top = c.top + "px"
    }
};
links.Timeline.prototype.applyRange = function(c, g, a) {
    var d = c.valueOf();
    var o = g.valueOf();
    var e = (o - d);
    var q = this.options;
    var k = 1000 * 60 * 60 * 24 * 365;
    var n = Number(q.intervalMin) || 10;
    if (n < 10) {
        n = 10
    }
    var b = Number(q.intervalMax) || 10000 * k;
    if (b > 10000 * k) {
        b = 10000 * k
    }
    if (b < n) {
        b = n
    }
    var h = q.min ? q.min.valueOf() : undefined;
    var m = q.max ? q.max.valueOf() : undefined;
    if (h && m) {
        if (h >= m) {
            var l = 1000 * 60 * 60 * 24;
            m = h + l
        }
        if (b > (m - h)) {
            b = (m - h)
        }
        if (n > (m - h)) {
            n = (m - h)
        }
    }
    if (d >= o) {
        o += 1000 * 60 * 60 * 24
    }
    if (e < n) {
        var p = (n - e);
        var j = a ? (a.valueOf() - d) / e : 0.5;
        d -= Math.round(p * j);
        o += Math.round(p * (1 - j))
    }
    if (e > b) {
        var p = (e - b);
        var j = a ? (a.valueOf() - d) / e : 0.5;
        d += Math.round(p * j);
        o -= Math.round(p * (1 - j))
    }
    if (h) {
        var p = (d - h);
        if (p < 0) {
            d -= p;
            o -= p
        }
    }
    if (m) {
        var p = (m - o);
        if (p < 0) {
            d += p;
            o += p
        }
    }
    this.start = new Date(d);
    this.end = new Date(o)
};
links.Timeline.prototype.confirmDeleteItem = function(a) {
    this.applyDelete = true;
    if (!this.isSelected(a)) {
        this.selectItem(a)
    }
    this.trigger("delete");
    if (this.applyDelete) {
        this.deleteItem(a)
    }
    delete this.applyDelete
};
links.Timeline.prototype.deleteItem = function(a) {
    if (a >= this.items.length) {
        throw "Cannot delete row, index out of range"
    }
    this.unselectItem();
    this.items.splice(a, 1);
    if (this.data) {
        if (google && google.visualization && this.data instanceof google.visualization.DataTable) {
            this.data.removeRow(a)
        } else {
            if (links.Timeline.isArray(this.data)) {
                this.data.splice(a, 1)
            } else {
                throw "Cannot delete row from data, unknown data type"
            }
        }
    }
    this.size.dataChanged = true;
    this.redrawFrame();
    this.recalcSize();
    this.stackEvents(this.options.animate);
    if (!this.options.animate) {
        this.redrawFrame()
    }
    this.size.dataChanged = false
};
links.Timeline.prototype.deleteAllItems = function() {
    this.unselectItem();
    this.items = [];
    this.deleteGroups();
    if (this.data) {
        if (google && google.visualization && this.data instanceof google.visualization.DataTable) {
            this.data.removeRows(0, this.data.getNumberOfRows())
        } else {
            if (links.Timeline.isArray(this.data)) {
                this.data.splice(0, this.data.length)
            } else {
                throw "Cannot delete row from data, unknown data type"
            }
        }
    }
    this.size.dataChanged = true;
    this.redrawFrame();
    this.recalcSize();
    this.stackEvents(this.options.animate);
    if (!this.options.animate) {
        this.redrawFrame()
    }
    this.size.dataChanged = false
};
links.Timeline.prototype.getGroupFromHeight = function(b) {
    var a = this.groups,
        c = this.options,
        e = this.size,
        g = b - (c.axisOnTop ? e.axis.height : 0);
    if (a) {
        var f;
        for (var d = a.length - 1; d >= 0; d--) {
            f = a[d];
            if (g > f.top) {
                return f
            }
        }
        return f
    }
    return undefined
};
links.Timeline.prototype.getItem = function(a) {
    if (a >= this.items.length) {
        throw "Cannot get item, index out of range"
    }
    var c = this.items[a];
    var b = {};
    b.start = new Date(c.start);
    if (c.end) {
        b.end = new Date(c.end)
    }
    b.content = c.content;
    if (c.group) {
        b.group = c.group.content
    }
    return b
};
links.Timeline.prototype.addItem = function(a) {
    var b = [a];
    this.addItems(b)
};
links.Timeline.prototype.addItems = function(h) {
    var j = h,
        a = this.items,
        b = this.groups,
        g = this.groupIndexes;
    for (var e = 0, d = j.length; e < d; e++) {
        var c = h[e];
        this.addGroup(c.group);
        a.push(this.createItem(c));
        var f = a.length - 1;
        this.updateData(f, c)
    }
    this.size.dataChanged = true;
    this.redrawFrame();
    this.recalcSize();
    this.stackEvents(false);
    this.redrawFrame();
    this.size.dataChanged = false
};
links.Timeline.prototype.createItem = function(a) {
    var b = {
        start: a.start,
        end: a.end,
        content: a.content,
        type: a.end ? "range" : this.options.style,
        group: this.findGroup(a.group),
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        lineWidth: 0,
        dotWidth: 0,
        dotHeight: 0
    };
    return b
};
links.Timeline.prototype.changeItem = function(b, a) {
    if (b >= this.items.length) {
        throw "Cannot change item, index out of range"
    }
    var c = this.options.style;
    var d = this.items[b];
    if (a.start) {
        d.start = a.start
    }
    if (a.end) {
        d.end = a.end
    }
    if (a.content) {
        d.content = a.content
    }
    if (a.group) {
        d.group = this.addGroup(a.group)
    }
    this.updateData(b, a);
    this.size.dataChanged = true;
    this.redrawFrame();
    this.recalcSize();
    this.stackEvents(false);
    this.redrawFrame();
    this.size.dataChanged = false
};
links.Timeline.prototype.findGroup = function(b) {
    var a = this.groupIndexes[b];
    return (a != undefined) ? this.groups[a] : undefined
};
links.Timeline.prototype.deleteGroups = function() {
    this.groups = [];
    this.groupIndexes = {}
};
links.Timeline.prototype.addGroup = function(g) {
    var b = this.groups,
        c = this.groupIndexes,
        e = undefined;
    var f = c[g];
    if (f === undefined && g !== undefined) {
        e = {
            content: g,
            labelTop: 0,
            lineTop: 0
        };
        b.push(e);
        if (this.options.axisOnTop) {
            b.sort(function(j, h) {
                return j.content > h.content
            })
        } else {
            b.sort(function(j, h) {
                return j.content < h.content
            })
        }
        for (var d = 0, a = b.length; d < a; d++) {
            c[b[d].content] = d
        }
    } else {
        e = b[f]
    }
    return e
};
links.Timeline.prototype.cancelChange = function() {
    this.applyChange = false
};
links.Timeline.prototype.cancelDelete = function() {
    this.applyDelete = false
};
links.Timeline.prototype.cancelAdd = function() {
    this.applyAdd = false
};
links.Timeline.prototype.setSelection = function(g) {
    if (g != undefined && g.length > 0) {
        if (g[0].row != undefined) {
            var e = g[0].row;
            if (this.items[e]) {
                var h = this.items[e];
                this.selectItem(e);
                var a = h.start;
                var c = h.end;
                if (c != undefined) {
                    var j = new Date((c.valueOf() + a.valueOf()) / 2)
                } else {
                    var j = new Date(a)
                }
                var f = (this.end.valueOf() - this.start.valueOf()),
                    d = new Date(j.valueOf() - f / 2),
                    b = new Date(j.valueOf() + f / 2);
                this.setVisibleChartRange(d, b);
                return true
            }
        }
    } else {
        this.unselectItem()
    }
    return false
};
links.Timeline.prototype.getSelection = function() {
    var a = [];
    if (this.selection) {
        a.push({
            row: this.selection.index
        })
    }
    return a
};
links.Timeline.prototype.selectItem = function(a) {
    this.unselectItem();
    this.selection = undefined;
    if (this.items[a] !== undefined) {
        var c = this.items[a],
            b = c.dom;
        this.selection = {
            index: a,
            item: b
        };
        if (this.options.moveable) {
            b.style.cursor = "move"
        }
        switch (c.type) {
            case "range":
                b.className = "timeline-event timeline-event-selected timeline-event-range";
                break;
            case "box":
                b.className = "timeline-event timeline-event-selected timeline-event-box";
                b.line.className = "timeline-event timeline-event-selected timeline-event-line";
                b.dot.className = "timeline-event timeline-event-selected timeline-event-dot";
                break;
            case "dot":
                b.className = "timeline-event timeline-event-selected";
                b.dot.className = "timeline-event timeline-event-selected timeline-event-dot";
                break
        }
    }
};
links.Timeline.prototype.isSelected = function(a) {
    return (this.selection && this.selection.index === a)
};
links.Timeline.prototype.unselectItem = function() {
    if (this.selection) {
        var b = this.items[this.selection.index];
        if (b && b.dom) {
            var a = b.dom;
            a.style.cursor = "";
            switch (b.type) {
                case "range":
                    a.className = "timeline-event timeline-event-range";
                    break;
                case "box":
                    a.className = "timeline-event timeline-event-box";
                    a.line.className = "timeline-event timeline-event-line";
                    a.dot.className = "timeline-event timeline-event-dot";
                    break;
                case "dot":
                    a.className = "";
                    a.dot.className = "timeline-event timeline-event-dot";
                    break
            }
        }
    }
    this.selection = undefined
};
links.Timeline.prototype.stackEvents = function(a) {
    if (this.options.stackEvents == false || this.groups.length > 0) {
        return
    }
    if (a == undefined) {
        a = false
    }
    var f = this.stackOrder(this.items);
    var b = this.stackCalculateFinal(f, a);
    if (a) {
        var e = this.animation;
        if (!e) {
            e = {};
            this.animation = e
        }
        e.finalItems = b;
        var d = this;
        var c = function() {
            var g = d.stackMoveOneStep(f, e.finalItems);
            d.recalcSize();
            d.redrawFrame();
            if (!g) {
                e.timer = setTimeout(c, 30)
            } else {
                delete e.finalItems;
                delete e.timer
            }
        };
        if (!e.timer) {
            e.timer = setTimeout(c, 30)
        }
    } else {
        this.stackMoveToFinal(f, b);
        this.recalcSize()
    }
};
links.Timeline.prototype.stackOrder = function(a) {
    var c = a.concat([]);
    var b = function(e, d) {
        if (e.type == "range" && d.type != "range") {
            return -1
        }
        if (e.type != "range" && d.type == "range") {
            return 1
        }
        return (e.left - d.left)
    };
    c.sort(b);
    return c
};
links.Timeline.prototype.stackCalculateFinal = function(k) {
    var h = this.size,
        d = h.axis.top,
        a = this.options,
        s = a.axisOnTop,
        c = a.eventMargin,
        m = a.eventMarginAxis,
        f = [];
    for (var o = 0, n = k.length; o < n; o++) {
        var q = k[o],
            g, b, r, e, j = q.height,
            l = q.width;
        if (s) {
            g = d + m + c / 2
        } else {
            g = d - j - m - c / 2
        }
        e = g + j;
        switch (q.type) {
            case "range":
            case "dot":
                b = this.timeToScreen(q.start);
                r = q.end ? this.timeToScreen(q.end) : b + l;
                break;
            case "box":
                b = this.timeToScreen(q.start) - l / 2;
                r = b + l;
                break
        }
        f[o] = {
            left: b,
            top: g,
            right: r,
            bottom: e,
            height: j,
            item: q
        }
    }
    for (var o = 0, n = f.length; o < n; o++) {
        var t = f[o];
        var p = null;
        do {
            p = this.stackEventsCheckOverlap(f, o, 0, o - 1);
            if (p != null) {
                if (s) {
                    t.top = p.top + p.height + c
                } else {
                    t.top = p.top - t.height - c
                }
                t.bottom = t.top + t.height
            }
        } while (p)
    }
    return f
};
links.Timeline.prototype.stackMoveOneStep = function(e, j) {
    var c = true;
    for (i = 0, iMax = e.length; i < iMax; i++) {
        var d = j[i],
            k = d.item;
        var h = parseInt(k.top);
        var f = parseInt(d.top);
        var g = (f - h);
        if (g) {
            var a = (f == h) ? 0 : ((f > h) ? 1 : -1);
            if (Math.abs(g) > 4) {
                a = g / 4
            }
            var b = parseInt(h + a);
            if (b != f) {
                c = false
            }
            k.top = b;
            k.bottom = k.top + k.height
        } else {
            k.top = d.top;
            k.bottom = d.bottom
        }
        k.left = d.left;
        k.right = d.right
    }
    return c
};
links.Timeline.prototype.stackMoveToFinal = function(a, b) {
    for (i = 0, iMax = a.length; i < iMax; i++) {
        var c = a[i],
            d = b[i];
        c.left = d.left;
        c.top = d.top;
        c.right = d.right;
        c.bottom = d.bottom
    }
};
links.Timeline.prototype.stackEventsCheckOverlap = function(d, f, b, g) {
    eventMargin = this.options.eventMargin, collision = this.collision;
    var c = d[f];
    for (var e = g; e >= b; e--) {
        var a = d[e];
        if (collision(c, a, eventMargin)) {
            if (e != f) {
                return a
            }
        }
    }
};
links.Timeline.prototype.collision = function(b, a, c) {
    if (c == undefined) {
        c = 0
    }
    return (b.left - c < a.right && b.right + c > a.left && b.top - c < a.bottom && b.bottom + c > a.top)
};
links.Timeline.prototype.trigger = function(b) {
    var a = null;
    switch (b) {
        case "rangechange":
        case "rangechanged":
            a = {
                start: new Date(this.start),
                end: new Date(this.end)
            };
            break;
        case "timechange":
        case "timechanged":
            a = {
                time: new Date(this.customTime)
            };
            break
    }
    links.events.trigger(this, b, a);
    if (google && google.visualization) {
        google.visualization.events.trigger(this, b, a)
    }
};
links.events = links.events || {
    listeners: [],
    indexOf: function(b) {
        var d = this.listeners;
        for (var c = 0, a = this.listeners.length; c < a; c++) {
            var e = d[c];
            if (e && e.object == b) {
                return c
            }
        }
        return -1
    },
    addListener: function(b, d, f) {
        var a = this.indexOf(b);
        var e = this.listeners[a];
        if (!e) {
            e = {
                object: b,
                events: {}
            };
            this.listeners.push(e)
        }
        var c = e.events[d];
        if (!c) {
            c = [];
            e.events[d] = c
        }
        if (c.indexOf(f) == -1) {
            c.push(f)
        }
    },
    removeListener: function(b, f, h) {
        var a = this.indexOf(b);
        var g = this.listeners[a];
        if (g) {
            var e = g.events[f];
            if (e) {
                var a = e.indexOf(h);
                if (a != -1) {
                    e.splice(a, 1)
                }
                if (e.length == 0) {
                    delete g.events[f]
                }
            }
            var d = 0;
            var c = g.events;
            for (var f in c) {
                if (c.hasOwnProperty(f)) {
                    d++
                }
            }
            if (d == 0) {
                delete this.listeners[a]
            }
        }
    },
    removeAllListeners: function() {
        this.listeners = []
    },
    trigger: function(c, g, e) {
        var b = this.indexOf(c);
        var h = this.listeners[b];
        if (h) {
            var f = h.events[g];
            if (f) {
                for (var d = 0, a = f.length; d < a; d++) {
                    f[d](e)
                }
            }
        }
    }
};
links.Timeline.StepDate = function(c, a, b) {
    this.current = new Date();
    this._start = new Date();
    this._end = new Date();
    this.autoScale = true;
    this.scale = links.Timeline.StepDate.SCALE.DAY;
    this.step = 1;
    this.setRange(c, a, b)
};
links.Timeline.StepDate.SCALE = {
    MILLISECOND: 1,
    SECOND: 2,
    MINUTE: 3,
    HOUR: 4,
    DAY: 5,
    MONTH: 6,
    YEAR: 7
};
links.Timeline.StepDate.prototype.setRange = function(c, a, b) {
    if (isNaN(c) || isNaN(a)) {
        return
    }
    this._start = (c != undefined) ? new Date(c) : new Date();
    this._end = (a != undefined) ? new Date(a) : new Date();
    if (this.autoScale) {
        this.setMinimumStep(b)
    }
};
links.Timeline.StepDate.prototype.start = function() {
    this.current = new Date(spree.clipMgr.timeline.options.start);
    this.roundToMinor()
};
links.Timeline.StepDate.prototype.roundToMinor = function() {
    switch (this.scale) {
        case links.Timeline.StepDate.SCALE.YEAR:
            this.current.setFullYear(this.step * Math.floor(this.current.getFullYear() / this.step));
            this.current.setMonth(0);
        case links.Timeline.StepDate.SCALE.MONTH:
            this.current.setDate(1);
        case links.Timeline.StepDate.SCALE.DAY:
            this.current.setHours(0);
        case links.Timeline.StepDate.SCALE.HOUR:
            this.current.setMinutes(0)
    }
    if (this.step != 1) {
        switch (this.scale) {
            case links.Timeline.StepDate.SCALE.MILLISECOND:
                this.current.setMilliseconds(this.current.getMilliseconds() - this.current.getMilliseconds() % this.step);
                break;
            case links.Timeline.StepDate.SCALE.SECOND:
                this.current.setSeconds(this.current.getSeconds() - this.current.getSeconds() % this.step);
                break;
            case links.Timeline.StepDate.SCALE.MINUTE:
                this.current.setMinutes(this.current.getMinutes() - this.current.getMinutes() % this.step);
                break;
            case links.Timeline.StepDate.SCALE.HOUR:
                this.current.setHours(this.current.getHours() - this.current.getHours() % this.step);
                break;
            case links.Timeline.StepDate.SCALE.DAY:
                this.current.setDate((this.current.getDate() - 1) - (this.current.getDate() - 1) % this.step + 1);
                break;
            case links.Timeline.StepDate.SCALE.MONTH:
                this.current.setMonth(this.current.getMonth() - this.current.getMonth() % this.step);
                break;
            case links.Timeline.StepDate.SCALE.YEAR:
                this.current.setFullYear(this.current.getFullYear() - this.current.getFullYear() % this.step);
                break;
            default:
                break
        }
    }
};
links.Timeline.StepDate.prototype.end = function() {
    return (this.current.getTime() > this._end.getTime())
};
links.Timeline.StepDate.prototype.next = function() {
    var b = this.current.getTime();
    if (this.current.getMonth() < 6) {
        switch (this.scale) {
            case links.Timeline.StepDate.SCALE.MILLISECOND:
                this.current = new Date(this.current.getTime() + this.step);
                break;
            case links.Timeline.StepDate.SCALE.SECOND:
                this.current = new Date(this.current.getTime() + this.step * 1000);
                break;
            case links.Timeline.StepDate.SCALE.MINUTE:
                this.current = new Date(this.current.getTime() + this.step * 1000 * 60);
                break;
            case links.Timeline.StepDate.SCALE.HOUR:
                this.current = new Date(this.current.getTime() + this.step * 1000 * 60 * 60);
                var a = this.current.getHours();
                this.current.setHours(a - (a % this.step));
                break;
            case links.Timeline.StepDate.SCALE.DAY:
                this.current.setDate(this.current.getDate() + this.step);
                break;
            case links.Timeline.StepDate.SCALE.MONTH:
                this.current.setMonth(this.current.getMonth() + this.step);
                break;
            case links.Timeline.StepDate.SCALE.YEAR:
                this.current.setFullYear(this.current.getFullYear() + this.step);
                break;
            default:
                break
        }
    } else {
        switch (this.scale) {
            case links.Timeline.StepDate.SCALE.MILLISECOND:
                this.current = new Date(this.current.getTime() + this.step);
                break;
            case links.Timeline.StepDate.SCALE.SECOND:
                this.current.setSeconds(this.current.getSeconds() + this.step);
                break;
            case links.Timeline.StepDate.SCALE.MINUTE:
                this.current.setMinutes(this.current.getMinutes() + this.step);
                break;
            case links.Timeline.StepDate.SCALE.HOUR:
                this.current.setHours(this.current.getHours() + this.step);
                break;
            case links.Timeline.StepDate.SCALE.DAY:
                this.current.setDate(this.current.getDate() + this.step);
                break;
            case links.Timeline.StepDate.SCALE.MONTH:
                this.current.setMonth(this.current.getMonth() + this.step);
                break;
            case links.Timeline.StepDate.SCALE.YEAR:
                this.current.setFullYear(this.current.getFullYear() + this.step);
                break;
            default:
                break
        }
    }
    if (this.step != 1) {
        switch (this.scale) {
            case links.Timeline.StepDate.SCALE.MILLISECOND:
                if (this.current.getMilliseconds() < this.step) {
                    this.current.setMilliseconds(0)
                }
                break;
            case links.Timeline.StepDate.SCALE.SECOND:
                if (this.current.getSeconds() < this.step) {
                    this.current.setSeconds(0)
                }
                break;
            case links.Timeline.StepDate.SCALE.MINUTE:
                if (this.current.getMinutes() < this.step) {
                    this.current.setMinutes(0)
                }
                break;
            case links.Timeline.StepDate.SCALE.HOUR:
                if (this.current.getHours() < this.step) {
                    this.current.setHours(0)
                }
                break;
            case links.Timeline.StepDate.SCALE.DAY:
                if (this.current.getDate() < this.step + 1) {
                    this.current.setDate(1)
                }
                break;
            case links.Timeline.StepDate.SCALE.MONTH:
                if (this.current.getMonth() < this.step) {
                    this.current.setMonth(0)
                }
                break;
            case links.Timeline.StepDate.SCALE.YEAR:
                break;
            default:
                break
        }
    }
    if (this.current.getTime() == b) {
        this.current = new Date(this._end)
    }
};
links.Timeline.StepDate.prototype.getCurrent = function() {
    return this.current
};
links.Timeline.StepDate.prototype.setScale = function(b, a) {
    this.scale = b;
    if (a > 0) {
        this.step = a
    }
    this.autoScale = false
};
links.Timeline.StepDate.prototype.setAutoScale = function(a) {
    this.autoScale = a
};
links.Timeline.StepDate.prototype.setMinimumStep = function(f) {
    if (f == undefined) {
        return
    }
    var b = (1000 * 60 * 60 * 24 * 30 * 12);
    var a = (1000 * 60 * 60 * 24 * 30);
    var e = (1000 * 60 * 60 * 24);
    var g = (1000 * 60 * 60);
    var d = (1000 * 60);
    var h = (1000);
    var c = (1);
    if (b * 1000 > f) {
        this.scale = links.Timeline.StepDate.SCALE.YEAR;
        this.step = 1000
    }
    if (b * 500 > f) {
        this.scale = links.Timeline.StepDate.SCALE.YEAR;
        this.step = 500
    }
    if (b * 100 > f) {
        this.scale = links.Timeline.StepDate.SCALE.YEAR;
        this.step = 100
    }
    if (b * 50 > f) {
        this.scale = links.Timeline.StepDate.SCALE.YEAR;
        this.step = 50
    }
    if (b * 10 > f) {
        this.scale = links.Timeline.StepDate.SCALE.YEAR;
        this.step = 10
    }
    if (b * 5 > f) {
        this.scale = links.Timeline.StepDate.SCALE.YEAR;
        this.step = 5
    }
    if (b > f) {
        this.scale = links.Timeline.StepDate.SCALE.YEAR;
        this.step = 1
    }
    if (a * 3 > f) {
        this.scale = links.Timeline.StepDate.SCALE.MONTH;
        this.step = 3
    }
    if (a > f) {
        this.scale = links.Timeline.StepDate.SCALE.MONTH;
        this.step = 1
    }
    if (e * 5 > f) {
        this.scale = links.Timeline.StepDate.SCALE.DAY;
        this.step = 5
    }
    if (e * 2 > f) {
        this.scale = links.Timeline.StepDate.SCALE.DAY;
        this.step = 2
    }
    if (e > f) {
        this.scale = links.Timeline.StepDate.SCALE.DAY;
        this.step = 1
    }
    if (g * 4 > f) {
        this.scale = links.Timeline.StepDate.SCALE.HOUR;
        this.step = 4
    }
    if (g > f) {
        this.scale = links.Timeline.StepDate.SCALE.HOUR;
        this.step = 1
    }
    if (d * 15 > f) {
        this.scale = links.Timeline.StepDate.SCALE.MINUTE;
        this.step = 15
    }
    if (d * 10 > f) {
        this.scale = links.Timeline.StepDate.SCALE.MINUTE;
        this.step = 10
    }
    if (d * 5 > f) {
        this.scale = links.Timeline.StepDate.SCALE.MINUTE;
        this.step = 5
    }
    if (d > f) {
        this.scale = links.Timeline.StepDate.SCALE.MINUTE;
        this.step = 1
    }
    if (h * 15 > f) {
        this.scale = links.Timeline.StepDate.SCALE.SECOND;
        this.step = 15
    }
    if (h * 10 > f) {
        this.scale = links.Timeline.StepDate.SCALE.SECOND;
        this.step = 10
    }
    if (h * 5 > f) {
        this.scale = links.Timeline.StepDate.SCALE.SECOND;
        this.step = 5
    }
    if (h > f) {
        this.scale = links.Timeline.StepDate.SCALE.SECOND;
        this.step = 1
    }
    if (c * 200 > f) {
        this.scale = links.Timeline.StepDate.SCALE.MILLISECOND;
        this.step = 200
    }
    if (c * 100 > f) {
        this.scale = links.Timeline.StepDate.SCALE.MILLISECOND;
        this.step = 100
    }
    if (c * 50 > f) {
        this.scale = links.Timeline.StepDate.SCALE.MILLISECOND;
        this.step = 50
    }
    if (c * 10 > f) {
        this.scale = links.Timeline.StepDate.SCALE.MILLISECOND;
        this.step = 10
    }
    if (c * 5 > f) {
        this.scale = links.Timeline.StepDate.SCALE.MILLISECOND;
        this.step = 5
    }
    if (c > f) {
        this.scale = links.Timeline.StepDate.SCALE.MILLISECOND;
        this.step = 1
    }
};
links.Timeline.StepDate.prototype.snap = function(a) {
    if (this.scale == links.Timeline.StepDate.SCALE.YEAR) {
        var b = a.getFullYear() + Math.round(a.getMonth() / 12);
        a.setFullYear(Math.round(b / this.step) * this.step);
        a.setMonth(0);
        a.setDate(0);
        a.setHours(0);
        a.setMinutes(0);
        a.setSeconds(0);
        a.setMilliseconds(0)
    } else {
        if (this.scale == links.Timeline.StepDate.SCALE.MONTH) {
            if (a.getDate() > 15) {
                a.setDate(1);
                a.setMonth(a.getMonth() + 1)
            } else {
                a.setDate(1)
            }
            a.setHours(0);
            a.setMinutes(0);
            a.setSeconds(0);
            a.setMilliseconds(0)
        } else {
            if (this.scale == links.Timeline.StepDate.SCALE.DAY) {
                switch (this.step) {
                    case 5:
                    case 2:
                        a.setHours(Math.round(a.getHours() / 24) * 24);
                        break;
                    default:
                        a.setHours(Math.round(a.getHours() / 12) * 12);
                        break
                }
                a.setMinutes(0);
                a.setSeconds(0);
                a.setMilliseconds(0)
            } else {
                if (this.scale == links.Timeline.StepDate.SCALE.HOUR) {
                    switch (this.step) {
                        case 4:
                            a.setMinutes(Math.round(a.getMinutes() / 60) * 60);
                            break;
                        default:
                            a.setMinutes(Math.round(a.getMinutes() / 30) * 30);
                            break
                    }
                    a.setSeconds(0);
                    a.setMilliseconds(0)
                } else {
                    if (this.scale == links.Timeline.StepDate.SCALE.MINUTE) {
                        switch (this.step) {
                            case 15:
                            case 10:
                                a.setMinutes(Math.round(a.getMinutes() / 5) * 5);
                                a.setSeconds(0);
                                break;
                            case 5:
                                a.setSeconds(Math.round(a.getSeconds() / 60) * 60);
                                break;
                            default:
                                a.setSeconds(Math.round(a.getSeconds() / 30) * 30);
                                break
                        }
                        a.setMilliseconds(0)
                    } else {
                        if (this.scale == links.Timeline.StepDate.SCALE.SECOND) {
                            switch (this.step) {
                                case 15:
                                case 10:
                                    a.setSeconds(Math.round(a.getSeconds() / 5) * 5);
                                    a.setMilliseconds(0);
                                    break;
                                case 5:
                                    a.setMilliseconds(Math.round(a.getMilliseconds() / 1000) * 1000);
                                    break;
                                default:
                                    a.setMilliseconds(Math.round(a.getMilliseconds() / 500) * 500);
                                    break
                            }
                        } else {
                            if (this.scale == links.Timeline.StepDate.SCALE.MILLISECOND) {
                                var c = this.step > 5 ? this.step / 2 : 1;
                                a.setMilliseconds(Math.round(a.getMilliseconds() / c) * c)
                            }
                        }
                    }
                }
            }
        }
    }
};
links.Timeline.StepDate.prototype.isMajor = function() {
    switch (this.scale) {
        case links.Timeline.StepDate.SCALE.MILLISECOND:
            return (this.current.getMilliseconds() == 0);
        case links.Timeline.StepDate.SCALE.SECOND:
            return (this.current.getSeconds() == 0);
        case links.Timeline.StepDate.SCALE.MINUTE:
            return (this.current.getHours() == 0) && (this.current.getMinutes() == 0);
        case links.Timeline.StepDate.SCALE.HOUR:
            return (this.current.getHours() == 0);
        case links.Timeline.StepDate.SCALE.DAY:
            return (this.current.getDate() == 1);
        case links.Timeline.StepDate.SCALE.MONTH:
            return (this.current.getMonth() == 0);
        case links.Timeline.StepDate.SCALE.YEAR:
            return false;
        default:
            return false
    }
};
links.Timeline.StepDate.prototype.getLabelMinor = function(a) {
    if (a == undefined) {
        a = this.current
    }
    return spree.stringifyTime(a.getTime() - spree.clipMgr.eventStartTime, 0).replace(/\s+0s$/, "").replace(/\s+0m$/, "").replace(/^0s$/, "0");
    switch (this.scale) {
        case links.Timeline.StepDate.SCALE.MILLISECOND:
            return String(a.getMilliseconds());
        case links.Timeline.StepDate.SCALE.SECOND:
            return String(a.getSeconds());
        case links.Timeline.StepDate.SCALE.MINUTE:
            return this.addZeros(a.getHours(), 2) + ":" + this.addZeros(a.getMinutes(), 2);
        case links.Timeline.StepDate.SCALE.HOUR:
            return this.addZeros(a.getHours(), 2) + ":" + this.addZeros(a.getMinutes(), 2);
        case links.Timeline.StepDate.SCALE.DAY:
            return String(a.getDate());
        case links.Timeline.StepDate.SCALE.MONTH:
            return MONTHS_SHORT[a.getMonth()];
        case links.Timeline.StepDate.SCALE.YEAR:
            return String(a.getFullYear());
        default:
            return ""
    }
};
links.Timeline.StepDate.prototype.getLabelMajor = function(a) {
    return "";
    var c = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var b = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    if (a == undefined) {
        a = this.current
    }
    switch (this.scale) {
        case links.Timeline.StepDate.SCALE.MILLISECOND:
            return this.addZeros(a.getHours(), 2) + ":" + this.addZeros(a.getMinutes(), 2) + ":" + this.addZeros(a.getSeconds(), 2);
        case links.Timeline.StepDate.SCALE.SECOND:
            return a.getDate() + " " + c[a.getMonth()] + " " + this.addZeros(a.getHours(), 2) + ":" + this.addZeros(a.getMinutes(), 2);
        case links.Timeline.StepDate.SCALE.MINUTE:
            return b[a.getDay()] + " " + a.getDate() + " " + c[a.getMonth()] + " " + a.getFullYear();
        case links.Timeline.StepDate.SCALE.HOUR:
            return b[a.getDay()] + " " + a.getDate() + " " + c[a.getMonth()] + " " + a.getFullYear();
        case links.Timeline.StepDate.SCALE.DAY:
            return c[a.getMonth()] + " " + a.getFullYear();
        case links.Timeline.StepDate.SCALE.MONTH:
            return String(a.getFullYear());
        default:
            return ""
    }
};
links.Timeline.StepDate.prototype.addZeros = function(b, a) {
    var c = "" + b;
    while (c.length < a) {
        c = "0" + c
    }
    return c
};
links.imageloader = (function() {
    var e = {};
    var c = {};

    function a(f) {
        if (e[f] == true) {
            return true
        }
        var g = new Image();
        g.src = f;
        if (g.complete) {
            return true
        }
        return false
    }
    function b(f) {
        return (c[f] != undefined)
    }
    function d(f, k, g) {
        if (g == undefined) {
            g = true
        }
        if (a(f)) {
            if (g) {
                k(f)
            }
            return
        }
        if (b(f) && !g) {
            return
        }
        var j = c[f];
        if (!j) {
            var h = new Image();
            h.src = f;
            j = [];
            c[f] = j;
            h.onload = function(m) {
                e[f] = true;
                delete c[f];
                for (var l = 0; l < j.length; l++) {
                    j[l](f)
                }
            }
        }
        if (j.indexOf(k) == -1) {
            j.push(k)
        }
    }
    return {
        isLoaded: a,
        isLoading: b,
        load: d
    }
})();
links.Timeline.addEventListener = function(b, d, c, a) {
    if (b.addEventListener) {
        if (a === undefined) {
            a = false
        }
        if (d === "mousewheel" && navigator.userAgent.indexOf("Firefox") >= 0) {
            d = "DOMMouseScroll"
        }
        b.addEventListener(d, c, a)
    } else {
        b.attachEvent("on" + d, c)
    }
};
links.Timeline.removeEventListener = function(b, d, c, a) {
    if (b.removeEventListener) {
        if (a === undefined) {
            a = false
        }
        if (d === "mousewheel" && navigator.userAgent.indexOf("Firefox") >= 0) {
            d = "DOMMouseScroll"
        }
        b.removeEventListener(d, c, a)
    } else {
        b.detachEvent("on" + d, c)
    }
};
links.Timeline.getTarget = function(a) {
    if (!a) {
        var a = window.event
    }
    var b;
    if (a.target) {
        b = a.target
    } else {
        if (a.srcElement) {
            b = a.srcElement
        }
    }
    if (b.nodeType !== undefined && b.nodeType == 3) {
        b = b.parentNode
    }
    return b
};
links.Timeline.stopPropagation = function(a) {
    if (!a) {
        var a = window.event
    }
    if (a.stopPropagation) {
        a.stopPropagation()
    } else {
        a.cancelBubble = true
    }
};
links.Timeline.preventDefault = function(a) {
    if (!a) {
        var a = window.event
    }
    if (a.preventDefault) {
        a.preventDefault()
    } else {
        a.returnValue = false
    }
};
links.Timeline.getAbsoluteLeft = function(a) {
    var b = 0;
    while (a != null) {
        b += a.offsetLeft;
        b -= a.scrollLeft;
        a = a.offsetParent
    }
    if (!document.body.scrollLeft && window.pageXOffset) {
        b -= window.pageXOffset
    }
    return b
};
links.Timeline.getAbsoluteTop = function(a) {
    var b = 0;
    while (a != null) {
        b += a.offsetTop;
        b -= a.scrollTop;
        a = a.offsetParent
    }
    if (!document.body.scrollTop && window.pageYOffset) {
        b -= window.pageYOffset
    }
    return b
};
links.Timeline.isArray = function(a) {
    if (a instanceof Array) {
        return true
    }
    return (Object.prototype.toString.call(a) === "[object Array]")
};
var Pagination = {
    init: function(a) {},
    updatePaginationUI: function(a, c, b) {
        a.find(".prev")[((c == 1) ? "hide" : "show")]();
        a.find(".next")[((c == b) ? "hide" : "show")]();
        a.find(".curr").text(c);
        a.find(".pages").text(b)
    }
};
var FollowBanner = Banner.extend({
    showCallback: function() {
        this._super();
        var a = this;
        $(".following_button[data-id=" + spree.event.host.user_id + "]").on("click.follow-prompt", function() {
            if (Spree.shouldBlockUser()) {
                return
            }
            setTimeout(function() {
                spree.bannerMgr.hide(a.type)
            }, 2000)
        });
        if (spree.bucket_manager.serviceEnabled("mixpanel")) {
            mixpanel.track("trigger", {
                action: "follow",
                "page type": spree.mixpanelPageType
            })
        }
    },
    closeCallback: function() {
        spree.bannerMgr.hide(this.type);
        var b = $.cookie("follow-prompts");
        b = b ? JSON.parse(b) : {};
        var a = {};
        a[spree.event.host.user_id] = 5;
        if (spree.bucket_manager.serviceEnabled("mixpanel")) {
            mixpanel.track("close", {
                action: "trigger",
                "page type": spree.mixpanelPageType
            })
        }
        _.extend(b, a);
        $.cookie("follow-prompts", JSON.stringify(b), {
            path: "/",
            expires: 7
        })
    },
    destroyCallback: function() {
        this._super();
        $(".following_button[data-id=" + spree.event.host.user_id + "]").off("click.follow-prompt")
    }
});
var UpgradeBanner = Banner.extend({
    showCallback: function() {
        this._super();
        var a = this;
        $(".upgrade-button").on("click.upgrade-prompt", function() {
            setTimeout(function() {
                spree.bannerMgr.hide(a.type)
            }, 2000)
        });
        if (spree.bucket_manager.serviceEnabled("mixpanel")) {
            mixpanel.track("trigger", {
                action: "upgrade",
                "page type": spree.mixpanelPageType
            })
        }
    },
    closeCallback: function() {
        spree.bannerMgr.hide(this.type);
        if (spree.bucket_manager.serviceEnabled("mixpanel")) {
            mixpanel.track("close", {
                action: "trigger",
                "page type": spree.mixpanelPageType
            })
        }
        var b = $.cookie("upgrade-prompts");
        b = b ? JSON.parse(b) : {};
        var a = {};
        a[spree.user.plan_name] = 1;
        _.extend(b, a);
        $.cookie("upgrade-prompts", JSON.stringify(b), {
            path: "/",
            expires: 365
        })
    },
    destroyCallback: function() {
        this._super();
        $(".upgrade_button").off("click.upgrade-prompt")
    }
});
var ProducerSettingsBanner = Banner.extend({
    init: function(a) {
        this._super(a);
        var b = this;
        this.$div.on("mouseover", ".producer-settings-category", function() {
            b.highlightCategory($(this).attr("data-category"))
        });
        this.$div.find("#start-advertisement").click(function() {
            var c = $(this);
            c.attr("disabled", true);
            var d = parseInt($("#advertisement-display-options input:checked").val());
            $.post("/events/" + spree.event.friendly_id + "/send_ad", {
                duration: d
            }).done(function() {
                spree.bannerMgr.hide("ProducerSettingsBanner", false)
            }).always(function() {
                c.attr("disabled", false)
            });
            return false
        });
        this.$div.find("#question-display-options").on("change", ".radio-option input", function() {
            spree.ecma.eventController.producerController().changeEventSetting("display_questions", this.value)
        });
        this.$div.find("#producer-settings-categories").on("change", ".on-off-switch-checkbox", function() {
            var c = this.checked;
            if (c.toString() == "true") {
                c = 1
            } else {
                if (c.toString() == "false") {
                    c = 0
                }
            }
            spree.ecma.eventController.producerController().changeEventSetting($(this).attr("data-setting"), c)
        })
    },
    highlightCategory: function(a) {
        $("#producer-settings").attr("data-category", a)
    },
    showCallback: function() {
        this._super();
        $("#producer-nav").addClass("active");
        $("#producer-nav-link").removeClass("nav-down-caret-icon").addClass("nav-up-caret-icon")
    },
    shownCallback: function() {
        this._super()
    },
    hideCallback: function() {
        this._super();
        $("#producer-nav").removeClass("active");
        $("#producer-nav-link").removeClass("nav-up-caret-icon").addClass("nav-down-caret-icon")
    },
    hiddenCallback: function() {},
    closeCallback: function() {
        spree.bannerMgr.hide("ProducerSettingsBanner", false)
    }
});
var ChatScroll = SpreeScroll.extend({
    init: function(c, a, b) {
        this.chat = b.chat;
        this.pauseRegion = 5;
        _.extend(b, {
            bottomOffset: 40
        });
        this._super(c, a, b)
    },
    setContentPosition: function() {
        this._super();
        if (this.chat.action !== "viewer") {
            return
        }
        var a = this.handlePosition() + this.handleHeight;
        var b = this.containerHeight();
        var c = this.maxTop() + this.handleHeight;
        if (this.handleHeight == 0 || !this.$handle.is(":visible") || ((a + this.pauseRegion) >= c)) {
            this.chat.play()
        } else {
            this.chat.pause()
        }
    }
});
Spreecast.socketMethods = {
    message: function(a) {
        if (a) {
            key = a.type;
            msg = a.data;
            action = (key == "truncate" ? "session" : msg.action);
            if (Spreecast.messageMethods[key] && Spreecast.messageMethods[key][action]) {
                Spreecast.messageMethods[key][action].apply(this, [msg])
            } else {
                console.log("Unexpected socket message type: key = " + key + ", action = " + action + ", data = ", a)
            }
        }
    }
};
$(document).one({
    "app:ready": function() {
        if (spree.is_embed) {
            var a = spree.user.has_been_authenticated ? "arrow-loggedin-icon" : "arrow-loggedout-icon";
            $("#arrow-helper").addClass(a)
        }
    }
});
$(document).on("click", ".chat-tab", function() {
    var a = $(this).data("tab");
    $("#chat-box, #chat-type").attr("data-selected", a);
    if (a == "producers") {
        $("#producer-chat").removeClass("alert");
        spree.viewerChat.hide();
        if (spree.producerChat) {
            spree.producerChat.show()
        }
    } else {
        if (spree.producerChat) {
            spree.producerChat.hide()
        }
        spree.viewerChat.show()
    }
});
$(document).on("click", ".rail-tab", function() {
    $(this).find(".alerts").removeClass("notification-icon");
    var a = $(this).data("tab");
    $("#event_social").attr("data-selected", a);
    $(document).trigger("event:tab:" + a)
});
$(document).on("click", ".queue-tab", function() {
    var a = $(this).data("tab");
    $("#screen_queue").attr("data-selected", a)
});
$(document).on({
    "spree:loaded": function() {
        if (spree.eventIsScheduledOrLive() || spree.is_embed) {
            $("#logo a").not("[target]").attr("target", "_blank")
        }
        if (spree.eventIsLive() && !spree.event.ads_enabled) {
            spree.firebase_queue.push("vstart")
        }
        if (spree.eventIsLive()) {
            spree.spreecast.queueFollowPrompt()
        }
        if (spree.user.producer) {
            if (spree.eventIsScheduledOrLive()) {
                $("body").addClass("producer");
                spree.spreecast.queueUpgradePrompt(60000)
            } else {
                $("body").addClass("archive_producer")
            }
        }
        if (spree.eventIsScheduledOrLive() && !spree.user.has_been_authenticated) {
            $("body").addClass("guest")
        }
        $(".medium #event_main").on("mouseenter mouseleave", function(c) {
            if (spree.ad_finished) {
                $(".embed-chat-info").remove()
            }
        });
        $(".full-experience").on("click", function() {
            window.open($(".full-experience").attr("data-url"));
            window.location = spree.event.event_url + "/unavailable/" + spree.spreecast.embed_size
        });
        if (spree.is_embed) {
            $("#social-share").click(function(c) {
                $(".share-icon").toggleClass("active");
                $(".social-embed-box").toggleClass("up")
            })
        }
        if (spree.event.status == 0) {
            if (spree.event.event_enabled) {
                $(document).trigger("event:status:pending")
            } else {
                $(document).trigger("event:status:scheduled")
            }
        }
        spree.enterKey("#question", function(c) {
            c.preventDefault();
            $("#ask").click()
        });
        var b = $("#question-section");
        var a = $("#new-question-title");
        switch (spree.event.display_questions) {
            case spree.QUESTIONS.ALL:
                b.removeClass("hide-unstarred-questions hide-all-questions");
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
    },
    "app:loading": function(a, b) {
        if (!console.stage) {
            console.stage = 0
        }
        console.log(["app:loading - stage", console.stage, b].join(" "));
        $("#progress").attr({
            "class": "loading" + console.stage,
            title: b
        }).text(console.stage++)
    },
    "event:tab:questions": function() {
        if (!spree.viewerChat.hidden) {
            spree.viewerChat.hide(true)
        }
    },
    "event:tab:info": function() {
        if (!spree.viewerChat.hidden) {
            spree.viewerChat.hide(true)
        }
    },
    "event:tab:chat": function() {
        if (spree.spreecast.viewerRail && !spree.spreecast.viewerRail.hidden) {
            spree.spreecast.viewerRail.hide()
        }
        if (spree.viewerChat.hidden) {
            spree.viewerChat.show(true)
        }
        spree.spreecast.faceblock.show(null, function() {
            spree.viewerChat.show(true)
        })
    },
    "event:tab:viewers": function() {
        if (spree.spreecast.viewerRail && spree.spreecast.viewerRail.hidden) {
            spree.spreecast.viewerRail.show()
        }
        if (!spree.viewerChat.hidden) {
            spree.viewerChat.hide(true)
        }
        spree.spreecast.faceblock.hide(null, function() {
            spree.spreecast.viewerRail.show()
        })
    },
    "event:tab:recommended": function() {
        if (!spree.viewerChat.hidden) {
            spree.viewerChat.hide(true)
        }
        if (spree.spreecast.viewerRail && !spree.spreecast.viewerRail.hidden) {
            spree.spreecast.viewerRail.hide()
        }
        if (!spree.recommendedScroll) {
            spree.recommendedScroll = new SpreeScroll($("#recommended-box"), $("#recommended-tab"))
        }
        spree.spreecast.faceblock.hide(null, function() {
            spree.recommendedScroll.updateHandle()
        })
    },
    "event:broadcast-status": function(b, a) {
        if (a == "off") {
            spree.event.now_broadcasting = false
        } else {
            spree.event.now_broadcasting = true
        }
    },
    "event:status:scheduled": function() {
        $("body").removeClass("pending").addClass("scheduled")
    },
    "event:status:pending": function(a) {
        $("body").removeClass("scheduled").addClass("pending");
        if (spree.viewerChat) {
            spree.viewerChat.enable();
            spree.viewerChat.showPlaceholderMessage();
            $(".rail-tab[data-tab=chat]").click()
        }
        $("#question-on-air-container").removeAttr("data-rsvp data-attendees")
    },
    "event:status:live": function() {
        if (spree.event.status == 1) {
            $("#toggle-broadcast").attr("data-state", "end");
            $("#info-overlay-block").remove();
            $(".viewer-type-listing[data-type=onair] .viewer-list-heading").text("On air");
            spree.spreecast.contractDescription();
            if (spree.viewerChat) {
                spree.viewerChat.showPlaceholderMessage()
            }
            $("#cancel_broadcast").remove();
            if (spree.spreecast.ticker) {
                spree.spreecast.ticker.update()
            }
        }
        spree.spreecast.queueFollowPrompt()
    },
    "event:status:finished": function() {
        $("[role=embed-event-status]").remove();
        $("#question-input, #ask2").attr("disabled", true);
        $("#question-input").attr("placeholder", "You cannot submit any questions because this spreecast has ended.");
        if (spree.liveViewerChat) {
            spree.liveViewerChat.disable();
            spree.liveViewerChat.showPlaceholderMessage("Recorded " + Time.getCalendarDate(spree.event.start_at_epoch) + " at " + Time.getClockTime(spree.event.start_at_epoch))
        }
        setTimeout(function() {
            $(".rail-tab[data-tab=recommended]").click()
        }, 3000)
    },
    "spree:init": function() {
        var a = $("#question");
        a.on("focus", function(d) {
            var c = $(this);
            if (c.hasClass("before_click")) {
                c.removeClass("before_click").val("")
            }
        });
        if (spree.isMobile() || spree.isTablet()) {
            var b = $("video")[0];
            if (b) {
                $(b).one("play", spree.logHTMLPlaybackStart)
            }
        }
        $(document).trigger("listener:loaded", "event")
    }
});
$(document).on("event:status:pending event:status:scheduled", function() {
    $("#event-reminder-button").click(function() {
        if (!spree.user.has_been_authenticated) {
            spree.loginMgr.showSignup("rsvp", true, null, {
                signUpText: "Sign up to set a reminder"
            });
            return false
        } else {
            var a = $(this),
                b = a.attr("data-event-id");
            $.ajax({
                url: "/following",
                type: "POST",
                data: {
                    item: "Event",
                    id: b
                },
                complete: function() {
                    $(".thanks-text").removeClass("hide");
                    a.remove()
                }
            })
        }
    })
});
var ChatBuilder = Class.extend({
    init: function(a) {
        if (spree.unavailable) {
            return
        }
        _.each($("[data-chat-type]"), function(f) {
            var c = $(f),
                b = c.data("chat-type");
            var e = null;
            if (b === "moderator") {
                e = "Chat with Producers"
            }
            if (b === "producer") {
                e = "Producer chat"
            }
            c.replaceWith(spree.hbTemplate("chat-widget", {
                chatType: b,
                contentPlaceholder: EventChat.contentPlaceholderMessages[b],
                inputPlaceholder: EventChat.getInputMessage(b),
                header: e,
                canPopOut: b === "producer",
                canClose: b === "moderator",
                user: a.user()
            }));
            if (b === "archiveViewer") {
                spree.archiveViewerChat = spree.viewerChat = new EventChat({
                    action: "viewer",
                    type: b,
                    eventController: a
                });
                var d = "Recorded " + Time.getCalendarDate(spree.event.start_at_epoch) + " at " + Time.getClockTime(spree.event.start_at_epoch);
                spree.archiveViewerChat.disable();
                spree.archiveViewerChat.showPlaceholderMessage(d)
            } else {
                if (b === "liveViewer") {
                    spree.liveViewerChat = spree.viewerChat = new EventChat({
                        action: "viewer",
                        type: b,
                        eventController: a
                    })
                } else {
                    if (b === "moderator") {
                        spree.moderatorChat = new EventChat({
                            action: "moderator",
                            type: b,
                            eventController: a
                        });
                        spree.moderatorChat.hide()
                    } else {
                        if (b === "producer") {
                            spree.producerChat = new ProducerChat({
                                action: "producer",
                                type: b,
                                eventController: a
                            })
                        }
                    }
                }
            }
        });
        $(".chat-tab[data-tab=" + $("#chat-type").data("default") + "]").click();
        $(".rail-tab[data-tab=" + $("#event_social").data("default") + "]").click()
    }
});
$(document).on({
    "spree:init": function() {
        $(document).trigger("listener:loaded", "chat")
    }
});
$(document).on({
    "flash:videoReady": function() {
        $(document).off("flash:videoReady");
        spree.spreecast.videoIsReady = true;
        spree.spreecast.setupPushService()
    },
    "flash:securityDialogClosed": function() {},
    "spree:init": function() {
        $(document).trigger("listener:loaded", "flash")
    }
});
$(document).on("spree:init", function() {
    $(document).trigger("listener:loaded", "log")
});
$(document).on("spree:init", function() {
    $(document).trigger("listener:loaded", "media")
});
$(document).on({
    "snapshot:new": function(c, b) {
        var a = {
            video_snapshot: b
        };
        spree.spreecast.latestVideoSnapshot = a;
        spree.spreecast.videoDigest.video_snapshots.push(a);
        if (spree.event.status == 0 && !spree.user.admin && spree.user.broadcast_status == 0) {
            return
        }
        if (b.ended_user) {
            $(document).trigger("user:end-broadcast", b.ended_user)
        }
        $(document).trigger("snapshot:after-update")
    },
    "spree:init": function() {
        $(document).trigger("listener:loaded", "snapshot")
    }
});
$(document).on({
    "user:broadcast-status-changed": function(b, a) {
        if (spree.event.status == 2) {
            return
        }
        if (a.current_user) {
            if (a.broadcast_status == 0) {
                $("#moderator_chat").hide()
            } else {
                if (a.broadcast_status == 2) {
                    if (!a.producer) {
                        if (spree.event.status == 0 && window.document.broadcast && spree.spreecast.videoDigest) {
                            spree.spreecast.drawVideoControls()
                        }
                    }
                    a.broadcasterInit()
                }
            }
        }
        spree.spreecast.drawVideoControls()
    },
    "snapshot:after-update": function() {
        spree.spreecast.drawVideoControls()
    },
    "spree:init": function() {
        $(document).trigger("listener:loaded", "video-control")
    }
});
var Blocker = Class.extend({
    init: function(b, a) {
        this.$div = $("#" + b);
        if (a !== undefined) {
            this.$div.find("h1").html(a)
        }
    },
    block: function() {
        $(document.body).css("overflow", "hidden")
    },
    remove: function(b) {
        var a = this;
        $(document.body).css("overflow", "");
        this.$div.addClass("up");
        window.setTimeout(function() {
            a.$div.hide()
        }, 5000)
    }
});
var Facecard = Class.extend({
    init: function(b, c, d) {
        var a = this;
        this.user = b;
        this.$div = spree.hbTemplate("facecard", {
            user: {
                id: b.id(),
                isProducer: b.producer(),
                userId: b.alt(),
                name: b.name(),
                about: (b.aboutMe() || ""),
                following: b.isFollowed(),
                thumbURL: spree.generateProfilePhotoAddress(b, "large"),
                locked: b.is_locked
            },
            friendship: {
                friendId: c,
                friendRelationship: d,
                isFriend: d === "friends"
            }
        })
    },
    update: function(a) {}
});
Facecard.create = function(a, b) {
    spree.ecma.userController.get(a, function(c, e, d, f) {
        Facecard.display(c, e, d, f, b)
    })
};
Facecard.display = function(c, f, d, g, e) {
    var a = new Facecard(c, d, g);
    spree.spreecast.facecardContainer.setFacecard(a);
    if (spree.event && (spree.event.status == 0 || spree.event.status == 1)) {
        var b = new FacecardControls(c, f);
        spree.spreecast.facecardContainer.setControls(b)
    }
    a.$div.find(".facecard-about").multiLine({
        row: 3
    });
    spree.spreecast.facecardContainer.show(c, e)
};
Facecard.getClasses = function(a) {
    var b = [];
    if (spree.event && spree.event.coproducable) {
        b.push("coproducable")
    }
    if (a.device() == "iphone" || a.device() == "small_embed" || a.device() == "ios" || a.device() == "android") {
        b.push("unjoinable")
    }
    if (a.isPublishing()) {
        b.push("publishing")
    }
    if (!a.isConnected()) {
        b.push("disconnected")
    }
    if (a.broadcastStatus() > 0) {
        b.push("broadcaster")
    }
    if (a.pane() > -1) {
        b.push("onair")
    }
    if (!a.owner() && !a.producer()) {
        b.push("viewer")
    }
    if (a.producer()) {
        b.push("producer")
    }
    if (a.owner()) {
        b.push("owner")
    }
    if (a.admin()) {
        b.push("admin")
    }
    if (!a.hasBeenAuthenticated()) {
        b.push("guest")
    }
    if (spree.user.alt == a.alt()) {
        b.push("self")
    }
    if (a.isFollowed()) {
        b.push("following")
    }
    return b
};
var FacecardControls = Class.extend({
    init: function(b, c) {
        var a = this;
        this.$div = spree.hbTemplate("facecard-controls");
        this.user = b;
        this.bindListeners();
        this.createChat(b);
        _.each(c, function(d) {
            a.chat.receiveEcmaChat(d)
        });
        this.update(b)
    },
    bindListeners: function() {
        var a = this.user.id();
        this.$div.on("click", "#enable-camera", function(b) {
            if (!$(this).hasClass("disabled")) {
                spree.ecma.eventController.producerController().promoteToBroadcaster(a)
            }
        });
        this.$div.on("click", "#toggle-on-screen", function(c) {
            var b = $(this).attr("data-state");
            if (b == "on-air") {
                if (spree.ecma.eventController.broadcastController().broadcasters().length < 4) {
                    spree.ecma.eventController.broadcastController().start(a);
                    spree.spreecast.facecardContainer.hide()
                } else {
                    var d = "<section><h1>There are already four people on camera.</h1><p><strong>Please take one off first.</strong></p></section>";
                    spree.createModal(d, 420, "too-many-onair", 200)
                }
            } else {
                if (b == "off-air") {
                    spree.ecma.eventController.broadcastController().end(a);
                    spree.spreecast.facecardContainer.hide()
                }
            }
        });
        this.$div.on("click", "#toggle-promote", function(c) {
            var b = $(this).attr("data-state");
            if (b == "promote") {
                spree.ecma.eventController.producerController().promoteToProducer(a)
            } else {
                if (b == "demote") {
                    spree.ecma.eventController.producerController().demoteFromProducer(a)
                }
            }
        });
        this.$div.on("click", "#ban-user", function(b) {
            new GeneralConfirm({
                question: "Are you sure you want to ban this user?",
                confirmText: "Yes, ban this user",
                confirmCB: function() {
                    spree.ecma.eventController.producerController().ban(a)
                },
                cancelText: "No, do not ban this user",
                cancelCB: function() {},
                width: 460
            })
        });
        this.$div.on("click", "#star-user", function(d) {
            var c = $(this);
            var b = c.attr("data-state");
            if (b === "star") {
                spree.ecma.eventController.producerController().userStar(a)
            } else {
                if (b === "unstar") {
                    spree.ecma.eventController.producerController().userUnstar(a)
                }
            }
            c.attr("data-state", "spinning")
        })
    },
    createChat: function(b) {
        var a = this;
        var d = this.$div.filter(".chat_placeholder");
        var c = spree.hbTemplate("chat-widget", {
            chatType: "producer-to-user",
            id: b.id(),
            contentPlaceholder: "Chat privately with " + b.name(),
            inputPlaceholder: "Chat privately with " + b.name(),
            user: spree.ecma.eventController.user()
        });
        d.empty();
        d.append(c);
        this.chat = new EventChat({
            "$div": c,
            action: "producer-to-user",
            id: b.id(),
            eventController: spree.ecma.eventController
        })
    },
    isBroadcastCapable: function(a) {
        return a.capabilities() && a.capabilities().broadcast
    },
    isProducerCapable: function(a) {
        return a.capabilities() && a.capabilities().produce
    },
    update: function(d) {
        var c = this.$div.find("#enable-camera");
        var e = this.$div.find("#toggle-on-screen");
        var b = this.$div.find("#toggle-promote");
        var a = this.$div.find("#star-user");
        if (d.proposedPromotion() == 1) {
            c.addClass("disabled");
            c.text("Awaiting response")
        } else {
            if (!this.isBroadcastCapable(d)) {
                c.addClass("no-broadcast has-tooltip disabled");
                c.text("Limited Availability")
            } else {
                c.removeClass("disabled no-broadcast has-tooltip");
                c.text("Invite On Air")
            }
        }
        if (d.broadcastStatus() != 0) {
            if (d.pane() > -1) {
                e.attr("data-state", "off-air").text("Take Off Air")
            } else {
                e.attr("data-state", "on-air").text("Put On Air")
            }
        }
        if (d.proposedPromotion() == 2) {
            b.attr("disabled", true);
            b.removeAttr("data-state").text("Making Producer")
        } else {
            b.attr("disabled", false);
            if (d.producer()) {
                b.attr("data-state", "demote").text("Demote Producer")
            } else {
                b.attr("data-state", "promote").text("Make Producer")
            }
        }
        a.attr("data-state", d.starredAt() == -1 ? "star" : "unstar");
        a.text(d.starredAt() == -1 ? "Star" : "Unstar")
    }
});
var MediaParse = {
    customizePreviewData: function(e) {
        var a = this;
        var d = e;
        var b = /twitter\.com\/.+\/status\//.test(e.original_url);
        if (!d.thumbnail_url) {
            d.thumbnail_url = e.url
        }
        if (e.width && e.height) {
            var c = a.normalizeDimensions(e.width, e.height);
            d.width = c[0];
            d.height = c[1]
        } else {
            d.height = 150;
            d.width = 250
        }
        if (e.type == "photo") {
            d.html = "<a href='" + e.url + "' target='_blank' width='" + d.width + "' height='" + d.height + "'><img src='" + e.url + "' width='" + d.width + "' height='" + d.height + "'/></a>"
        } else {
            if (e.html) {
                d.html = e.html.replace(/<!--.*-->/, "");
                d.html = _.map($(d.html), function(f) {
                    return spree.serialize($(f).attr({
                        width: d.width,
                        height: d.height
                    }))
                }).join(" ")
            } else {
                if (b) {
                    d.html = "<blockquote class='twitter-tweet'><a href='" + e.original_url + "'></a></blockquote><script type='text/javascript' async src='https://platform.twitter.com/widgets.js' charset='utf-8'><\/script>"
                }
            }
        }
        return d
    },
    normalizeDimensions: function(b, a) {
        if (b > 490) {
            a = (490 * a) / b;
            b = 490
        }
        if (a > 450) {
            b = (450 * b) / a;
            a = 450
        }
        return [b, a]
    },
    youtubeEmbed: function(c, b) {
        var a = /youtube.+watch\?v=(.+)[?&](autoplay)/.exec(c);
        if (a) {
            var e = a[1];
            var d = "//www.youtube.com/embed/" + e + "?autoplay=1";
            return b.replace(/(src=\")(.+?)(\")/, "$1" + d + "$3")
        }
        return b
    }
};
var MediaInteractions = {
    showExternalMedia: function(b) {
        var a = /^<script/.test(b.content.mediaHTML);
        if (!a && spree.device !== "ipad") {
            this.$externalMediaModal = spree.modalMgr.create(b.hbTemplateName, this.initExternalMediaModal, null, b);
            this.layoutExternalMediaModal(this.$externalMediaModal, $(b.content.mediaHTML))
        }
    },
    openMedia: function(a) {
        $("#external-media").modal("hide");
        var c = a.attr("data-embed");
        var b = {
            noBackdrop: true,
            hbTemplateName: "external-media",
            infoHeader: {
                image_url: a.attr("data-profile-image"),
                profile_link: "/users/" + a.attr("data-owner-id"),
                owner_name: a.attr("data-owner-name"),
                is_locked: a.attr("data-owner-locked"),
                title: a.attr("data-title"),
                url: a.attr("data-url"),
                closable: !(spree.user.producer || spree.is_embed)
            },
            content: {
                mediaHTML: c
            },
            controls: {
                live_event: spree.eventIsScheduledOrLive(),
                id: a.attr("data-id"),
                media_on_air: true,
                url: a.attr("data-url")
            },
            producer: (spree.user.producer && spree.event.status != 2)
        };
        this.showExternalMedia(b)
    },
    previewMedia: function(a) {
        $("#external-media.preview").modal("hide");
        var c = a.attr("data-embed");
        var b = {
            noBackdrop: true,
            preview: true,
            hbTemplateName: "preview-external-media",
            infoHeader: {
                image_url: a.attr("data-profile-image"),
                is_locked: false,
                profile_link: "/users/" + a.attr("data-owner-id"),
                owner_name: a.attr("data-owner-name"),
                title: a.attr("data-title"),
                url: a.attr("data-url"),
                closable: true
            },
            content: {
                mediaHTML: c
            },
            controls: {
                live_event: spree.eventIsScheduledOrLive(),
                id: a.attr("data-id"),
                media_on_air: false,
                url: a.attr("data-url")
            },
            producer: (spree.user.producer && spree.event.status != 2)
        };
        this.showExternalMedia(b)
    },
    forceMediaDeliveryProtocol: function(c) {
        var b = $(c);
        if (b[0].nodeName === "IFRAME" && b.attr("src")) {
            var a = b.attr("src");
            b.attr("src", (document.location.protocol + a.substring(a.indexOf("//"))));
            return b[0].outerHTML
        }
        return c
    },
    onAir: function(b) {
        if (b.media_item) {
            var c = this.forceMediaDeliveryProtocol(b.media_item.embed());
            var a = {
                noBackdrop: true,
                hbTemplateName: "external-media",
                infoHeader: {
                    image_url: b.media_item.user().profilePhotoThumbUrl_100x100(),
                    profile_link: "/users/" + b.media_item.user().alt(),
                    owner_name: b.media_item.user().name(),
                    is_locked: b.media_item.user().is_locked,
                    title: b.media_item.title(),
                    url: b.media_item.text(),
                    closable: !(spree.user.producer || spree.is_embed)
                },
                content: {
                    mediaHTML: c
                },
                controls: {
                    live_event: spree.eventIsScheduledOrLive(),
                    id: b.media_item.id(),
                    media_on_air: true,
                    url: b.media_item.url()
                },
                producer: (spree.user.producer && spree.event.status != 2)
            };
            this.showExternalMedia(a)
        }
        if (window.document.broadcast && window.document.broadcast.showQuestion && spree.spreecast.securityOpened == false && window.document.broadcast.getPlayerMode() != "off" && window.document.broadcast.getPlayerMode() != "uninitialized") {
            spree.spreecast.showQuestion()
        }
    },
    offAir: function(a) {
        if (a.type === "media_item") {
            $("#external-media").modal("hide")
        }
    },
    layoutExternalMediaModal: function(b, c) {
        var d = function(j) {
            var h = parseInt(j.attr("width"));
            var g = parseInt(j.attr("height"));
            if (!h || !g) {
                return null
            } else {
                return {
                    width: h,
                    height: g
                }
            }
        };
        var f = d(c);
        if (f) {
            var e = b.find(".modal-body");
            b.css({
                width: f.width,
                height: f.height
            });
            e.css({
                width: f.width,
                height: f.height
            });
            var a = ($(window).outerWidth() / 2) - (f.width / 2);
            b.css({
                left: a
            });
            e.find(".drag").css("top", ((f.height - 30) / 2 + 16) + "px")
        }
    },
    initExternalMediaModal: function(b) {
        var a = this;
        var d = b.find(".modal-body");
        b.find(".add_to_screen").click(function(g) {
            g.preventDefault();
            var f = $(this).parents("[data-media-id]").attr("data-media-id");
            spree.ecma.eventController.producerController().mediaItemOnAir(f, function() {
                b.modal("hide")
            }, function() {
                b.modal("hide")
            })
        });
        b.find(".remove_from_air").click(function(f) {
            f.preventDefault();
            spree.ecma.eventController.producerController().mediaItemOffAir()
        });
        var e = d.find(".drag");
        b.draggable({
            revert: false,
            scroll: false,
            containment: "body",
            stop: function(g, f) {
                a.dragging = null;
                e.hide()
            },
            start: function(g, f) {
                a.dragging = $(g.target).attr("id")
            },
            handle: ".drag, .modal-header, .modal-footer"
        });
        b.css("position", "");
        var c = null;
        d.find("#external_media").mouseenter(function(f) {
            e.show();
            c = setTimeout(function() {
                if (!a.dragging) {
                    e.hide()
                }
            }, 5000)
        });
        d.find("#external_media").mouseleave(function(f) {
            clearTimeout(c);
            e.hide()
        })
    }
};
var QuestionsAndChatDisplayer = Class.extend({
    clipStartSeconds: 0,
    clipEndSeconds: 0,
    init: function() {
        this.displayInterval = 1900;
        this.displayedQuestion = null;
        this.lastEvaluatedTime = 0
    },
    displayQuestion: function(d) {
        var a = this;
        var c = Question.all();
        var b = c[this.displayQuestionIndex];
        if (this.displayedQuestion && this.displayedQuestion.on_air < d && (this.displayedQuestion.off_air > d || !this.displayedQuestion.off_air)) {
            return
        } else {
            this.displayedQuestion = null
        }
        $.each(c, function(f, e) {
            if (e.on_air && e.on_air < d && (e.off_air > d || !e.off_air)) {
                a.displayedQuestion = c[f];
                $(document).trigger("question:after-on_air", a.displayedQuestion)
            }
        })
    },
    display: function(a) {
        if (!spree.spreecast.hidInfoOverlay && (spree.spreecast.embed && spree.spreecast.embed_size !== "large")) {
            spree.spreecast.hidInfoOverlay = true;
            $("#info-box").hide()
        }
        var b = spree.spreecast.playbacker.startTime + a;
        if (b - this.lastEvaluatedTime > this.displayInterval || b < this.lastEvaluatedTime) {
            this.lastEvaluatedTime = b;
            spree.ecma.eventController.setArchiveTimestamp(b / 1000)
        }
    }
});
var Playbacker = Class.extend({
    init: function(d) {
        var a = this;
        for (var c in d) {
            this[c] = d[c]
        }
        this.started = false;
        $("#video_controls .event_info").show();
        this.displayer = new QuestionsAndChatDisplayer();
        this.playbackStart = spree.clip ? 0 : spree.event.playback_start;
        this.startTime = spree.clip ? spree.clip.playback_start : spree.event.startTime;
        var b = location.href.match(/t=(\d+)s/);
        if (b && b[1]) {
            this.urlTime = b[1] * 1000
        }
        _.each(["Loaded", "TimeStamp", "Notification", "SeekInitiated", "ShowFacecard", "EventEnded", "Play", "Paused"], function(g) {
            var f = "flash" + g;
            window[f] = function() {
                try {
                    a[f].apply(a, arguments)
                } catch (e) {
                    console.log(e, f)
                }
            }
        });
        if (spree.spreecast.playbackTransition) {
            setTimeout(function() {
                a.flashLoaded("broadcast")
            }, 0)
        }
    },
    cancelParentTimer: function() {
        if (window.name == "channel-embed") {
            window.parent.spree.cancelPlayNext && window.parent.spree.cancelPlayNext()
        }
    },
    flashSeekInitiated: function() {
        this.cancelParentTimer()
    },
    flashLoaded: function(a) {
        if (a == "pending_preview") {
            return
        }
        $(blocker).trigger("spree:hide-blocker");
        var b = spree.event.twitter;
        spree.event.twitter = null;
        window.document.broadcast.setServerResponse(spree.serverResponse);
        spree.event.twitter = b;
        document.broadcast.setEventImageUrl && document.broadcast.setEventImageUrl((spree.clip && spree.clip.childClip) ? spree.clip.image_url : spree.event.image_url);
        if (spree.spreecast.playbacker.autoPlay) {
            spree.spreecast.setBroadcastVideoDigest("archive", spree.spreecast.videoDigest);
            document.broadcast.seek && document.broadcast.seek(spree.spreecast.playbacker.urlTime || spree.spreecast.playbacker.playbackStart)
        } else {
            spree.spreecast.setBroadcastVideoDigest("off", spree.spreecast.videoDigest)
        }
        $(document).trigger("app:ready")
    },
    flashTimeStamp: function(b, f, d, g, c) {
        this.cancelParentTimer();
        if (!this.started) {
            this.started = true;
            $("#video_controls .event_info").hide();
            $("#info-overlay-block").addClass("hide");
            spree.spreecast.fireWatchTimer()
        }
        var a = 360000;
        var e = (spree.clip.playback_end - spree.clip.playback_start);
        if (e > a) {
            spree.spreecast.queueFollowPrompt()
        } else {
            var h = (spree.clip.playback_end - spree.clip.playback_start) / 2;
            if (g > h) {
                spree.spreecast.showFollowPrompt()
            }
        }
        this.displayer.display(g)
    },
    flashPlay: function() {
        $("#info-overlay-block").addClass("hide")
    },
    flashPaused: function() {
        $("#info-overlay-block").removeClass("hide");
        spree.firebase.eventAction("vpause")
    },
    flashNotification: function(a, b, c) {
        console.log("Flash Notification: ", JSON.stringify(arguments))
    },
    flashShowFacecard: function(b, a) {
        Facecard.create(a, {
            flash: true
        })
    },
    flashEventEnded: function(a) {
        $("#info-overlay-block").addClass("hide");
        spree.recommended.displayRecommendedContent()
    }
});
var EventChat = Class.extend({
    init: function(d) {
        var a = this;
        _.each(d, function(f, e) {
            a[e] = f
        });
        var b = this.type ? this.type : this.action;
        this.type = b;
        if (!this.$div) {
            this.$div = $("#" + this.type + (this.id ? "_" + this.id : "") + "_chat")
        }
        this.$text = this.$div.find(".chat_text");
        this.$close = this.$div.find(".close_x");
        this.$content = this.$div.find(".chat_content");
        this.$container = this.$div.find(".chat_container");
        this.lastAttemptedMessage = "";
        this.lastScrollPercent = 1;
        this.hidden = false;
        this.scroller = new ChatScroll(this.$div, this.$content, {
            chat: this,
            topOffset: (b == "moderator") ? 48 : 0
        });
        if (b == "liveViewer" && spree.event.status == 0 && !spree.event.event_enabled) {
            if (EventChat.mustWaitForEvent(spree.user)) {
                this.disable();
                var c = EventChat.getInputMessage(this.type);
                this.showPlaceholderMessage("Chat... starting " + spree.event.pre_event_extended_time + " before")
            }
        }
        this.bindEvents();
        this.chatRegister = [];
        EventChat.allChats[this.type] = a
    },
    disable: function() {
        this.$text.attr("disabled", true)
    },
    enable: function() {
        this.$text.attr("disabled", false)
    },
    showPlaceholderMessage: function(a) {
        a = a || EventChat.getInputMessage(this.type);
        this.$text.attr("placeholder", a)
    },
    bindEvents: function() {
        var a = this;
        this.$text.on({
            focus: function(b) {
                var c = $(this);
                if (c.hasClass("before_click")) {
                    c.removeClass("before_click").val("")
                }
            },
            keypress: function(b) {
                if (b.keyCode == 13) {
                    b.preventDefault();
                    b.stopPropagation();
                    a.sendMessage()
                }
            }
        });
        this.$div.find(".chat-control").on("click", function() {
            a.$text.focus();
            a.scroller.move(1, "max");
            a.play()
        });
        this.$div.on("click", ".user-name, .small-circle-avatar", function(c) {
            var b = $(this).data("user-id");
            Facecard.create(b, {
                rail: "chat",
                y: c.pageY
            })
        });
        this.$div.on("click", "[data-action]", function() {
            a["chatAction_" + $(this).data("action")]($(this).parents("[data-chat-id]").data("chat-id"))
        });
        this.$close.click(function() {
            a.hide();
            a.$text.val("")
        });
        if (this.action == "moderator") {
            this.$div.click(function() {
                $("#preview").toggleClass("expanded_chat")
            });
            this.$div.find(".chat_controls").click(function() {
                a.sendMessage()
            });
            this.$div.find("*").click(function(b) {
                b.stopPropagation()
            })
        }
    },
    chatAction_close: function(b) {
        var a = this;
        new GeneralConfirm({
            question: "Delete this chat text?",
            confirmText: "Yes, delete",
            confirmCB: function() {
                a.eventController.producerController().deleteChat(b, function() {
                    if (spree.spreecast.playback) {
                        $("[data-chat-id=" + b + "]").remove();
                        a.scroller.updateHandle()
                    }
                })
            },
            cancelText: "No, don't delete",
            text: "This operation can't be undone; you will remove this chat entry for all eternity."
        })
    },
    chatAction_onscreen: function(b) {
        var a = this;
        var c = $("[data-chat-id=" + b + "]");
        this.eventController.producerController().turnChatIntoQuestion(b, c.find(".text").html(), true, function() {
            c.find(".chat-producer-actions").html(spree.hbTemplate("chat-actions-row", {
                onscreen_or_in_queue: true
            }).html())
        })
    },
    chatAction_queue: function(b) {
        var a = this;
        var c = $("[data-chat-id=" + b + "]");
        this.eventController.producerController().turnChatIntoQuestion(b, c.find(".text").html(), false, function() {
            c.find(".chat-producer-actions").html(spree.hbTemplate("chat-actions-row", {
                onscreen_or_in_queue: true
            }).html())
        })
    },
    chatExpanded: function() {
        return $("#preview").hasClass("expanded_chat")
    },
    deleteChat: function(a) {
        spree.spreecast.chatDigest[this.action] = _.reject(spree.spreecast.chatDigest[this.action], function(b) {
            return b.id == a
        })
    },
    pause: function() {
        this.$div.find(".chat-paused").removeClass("hidden");
        this.$div.find(".chat-status-helper").removeClass("hidden");
        this.eventController.chatController().pause()
    },
    play: function() {
        this.$div.find(".chat-paused").addClass("hidden");
        this.$div.find(".chat-status-helper").addClass("hidden");
        this.eventController.chatController().play()
    },
    isUserTagged: function(b, c) {
        var a;
        while (a = EventChat.userTokenFinder.exec(c)) {
            if (a[2] === b) {
                return true
            }
        }
        return false
    },
    parseIncomingChat: function(b) {
        var a = b.replace(EventChat.userTokenFinder, "<a class='tagged' href='http://" + window.location.host + "/users/$2' target='_blank' data-slug = '$2'>@$1</a>");
        return a
    },
    isProducerActionable: function(a) {
        return ((spree.user.is_admin || spree.user.producer) && a == "viewer")
    },
    receiveEcmaChat: function(c) {
        this.$container.removeClass("empty");
        this.$div.find(".chat-placeholder").remove();
        var d = spree.hbTemplate("chat-message", {
            id: c.user().alt(),
            producer: this.action == "producer",
            time: spree.spreecast.formatTime(new Date(c.createdAt() * 1000)),
            url: c.user().profilePhotoThumbUrl_70x70(),
            user: c.user().name(),
            show_producer_actions: this.isProducerActionable(this.action) && this.action !== "moderator",
            chat_id: c.id(),
            "is-producer": c.user().producer(),
            onscreen_or_in_queue: spree.eventIsFinished()
        });
        var b = this.parseIncomingChat(c.text());
        d.find(".text").html(b);
        if (c.action() != "viewer") {
            this.chatRegister.push(d);
            if (this.chatRegister.length > 49) {
                this.chatRegister.shift().remove()
            }
        }
        this.$content.append(d);
        if (this.action == "moderator") {
            this.show()
        }
        var a = this;
        this.scroller.updateHandle(function() {
            a.scroller.move(1, "max")
        })
    },
    removeEcmaChat: function(a) {
        this.$content.find("[data-chat-id=" + a + "]").remove();
        this.scroller.updateHandle();
        if (this.$content.find(".chat-block").length == 0) {
            this.$container.addClass("empty")
        }
    },
    sendMessage: function() {
        if (!spree.user.has_been_authenticated) {
            spree.loginMgr.showSignup("chat", true, null, {
                signUpText: "Sign up to chat, ask questions, or join on camera"
            });
            return false
        }
        if (spree.user.needs_to_confirm_email) {
            spree.blockWithConfirmEmail();
            return false
        }
        var a = this.$text.val().trim();
        if (a == this.$text.attr("placeholder") || a == "") {
            return
        }
        this.lastAttemptedMessage = a;
        this.$text.val("");
        this.eventController.chatController().submit(a, this.action, this.action == "producer-to-user" ? this.id : null)
    },
    reenable: function() {
        this.$text.attr("data-rejected", "false");
        this.showPlaceholderMessage();
        this.$text.val(this.lastAttemptedMessage);
        this.enable()
    },
    notifyError: function() {
        var a = this;
        this.$text.attr("data-rejected", "true");
        this.disable();
        this.showPlaceholderMessage(EventChat.errorMessages.rejected);
        setTimeout(function() {
            a.reenable()
        }, 5000)
    },
    reset: function() {
        this.$content.empty();
        this.scroller.updateHandle();
        this.$content.parent().find("*").removeAttr("style")
    },
    saveScrollPos: function() {
        if (this.scroller.handleVisible) {
            this.lastScrollPercent = this.scroller.handlePercentage()
        }
    },
    restoreScrollPos: function() {
        this.scroller.updateWithPercentage(this.lastScrollPercent)
    },
    show: function(a) {
        this.hidden = false;
        if (this.$div.hasClass("hidden") && this.action == "moderator") {
            var b = $("#broadcast_wrapper").offset();
            this.$div.css("top", b.top + 48);
            this.$div.css("left", b.left + 100);
            $("#moderator_chat").draggable({
                containment: "body"
            })
        }
        this.restoreScrollPos();
        if (a) {
            this.$div.parents(".social-box").removeClass("hidden")
        }
        this.$div.removeClass("hidden")
    },
    hide: function(a) {
        this.hidden = true;
        this.saveScrollPos();
        if (a) {
            this.$div.parents(".social-box").addClass("hidden")
        }
        this.$div.addClass("hidden")
    }
});
EventChat.getInputMessage = function(a) {
    var b = (spree.event.status == 0 && !spree.event.event_enabled);
    var c;
    if (!spree.user.producer || b) {
        c = "viewer"
    } else {
        c = "producer"
    }
    return EventChat.inputPlaceholderMessages[c][a]
};
EventChat.mustWaitForEvent = function(a) {
    return !a.has_been_authenticated || !(a.producer || a.admin || a.broadcast_status == 2)
};
EventChat.allChats = [];
EventChat.userTokenFinder = /@\{full_name:(.*?),slug:([\w|-]+)\}/g;
EventChat.inputPlaceholderMessages = {
    producer: {
        liveViewer: "Say hi to your viewers",
        producer: "Chat with other producers..."
    },
    viewer: {
        liveViewer: "Chat with other viewers...",
        moderator: "Chat with producers of this spreecast..."
    }
};
EventChat.contentPlaceholderMessages = {
    moderator: ["Private chat with producers"],
    producer: ["Producer chat"],
    liveViewer: ["Say hi", "Saluda", "Salut"],
    archiveViewer: ["Archived chat"]
};
EventChat.errorMessages = {
    rejected: "Oops, your message didn't go through. Please wait a second."
};
var ProducerChat = EventChat.extend({
    init: function(a) {
        this.createdAt = Date.now();
        this._super(a)
    },
    bindEvents: function() {
        this._super();
        var a = this;
        this.$div.on("click", ".popout-svg, .popin-svg", function(b) {
            a.toggleDocked(b.pageY)
        })
    },
    toggleDocked: function(e) {
        var a = this;
        this.hide();
        $("#chat-box").toggleClass("popped-out");
        var d = this.$div.detach();
        if (d.hasClass("ui-draggable")) {
            d.draggable("destroy");
            d.removeAttr("style");
            $("#chat-box").append(d);
            this.scroller.topOffset = 0;
            this.scroller.bottomOffset = 40
        } else {
            $("body").append(d);
            d.draggable({
                containment: "body",
                revert: false,
                scroll: false
            });
            var b = $("body").hasClass("viewer-list-engaged") ? "producer" : "viewer";
            var c = this.computeRailPosition(b, e);
            d.css(c);
            this.scroller.topOffset = 48;
            this.scroller.bottomOffset = 41
        }
        this.show()
    },
    receiveEcmaChat: function(a) {
        this._super(a);
        if (a.user().id() === spree.user.id) {
            return
        }
        if ((parseInt(a.createdAt()) * 1000) > this.createdAt && $("#chat-type").attr("data-selected") != "producers") {
            $("#producer-chat").addClass("alert")
        }
    }
});
ProducerChat.addMixin(FloatingContent);
var SpreeTimeline = Class.extend({
    init: function(b) {
        var a = this;
        spree.clipMgr.timeline = this;
        _.each(b, function(d, c) {
            a[c] = b[c]
        });
        $("input#clip_playback_start").val(spree.clipMgr.startTime);
        $("input#clip_playback_end").val(spree.clipMgr.endTime);
        $(document).click(function() {
            a.selectClip()
        })
    },
    addToolTips: function() {
        _.each($("#clip-timeline div"), function(a) {
            if ($(a).css("cursor") == "e-resize") {
                $(a).addClass("timeline-resize-right")
            }
            if ($(a).css("cursor") == "w-resize") {
                $(a).addClass("timeline-resize-left")
            }
        });
        _.each({
            ".timeline-resize-left": "Click and drag to adjust start time",
            ".timeline-resize-right": "Click and drag to adjust end time",
            ".zoom-in-icon": "Zoom in on the timeline",
            ".zoom-out-icon": "Zoom out on the timeline",
            ".left-caret-icon": "Shift the timeline left",
            ".right-caret-icon": "Shift the timeline right",
            ".timeline-customtime": "Select a thumbnail image",
            "#clip-preview": "Preview your clip"
        }, function(b, a) {
            $(a).attr("title", b)
        });
        _.each($(".timeline-resize-left, .timeline-resize-right"), function(a) {
            $(a).append($("<i class='slide-bar-icon'></i>"))
        })
    },
    bindEvents: function() {
        var a = this;
        links.events.addListener(this.timeline, "timechange", function() {
            spree.clipMgr.showThumb(a.timeline.getCustomTime().getTime())
        });
        links.events.addListener(this.timeline, "change", function() {
            var b = a.timeline.getData()[0];
            var c = {
                start: b.start.getTime(),
                end: b.end.getTime()
            };
            a.updateTimeFields(c);
            spree.clipMgr.populateTimes(c)
        });
        $("#clip-time-inputs input").change(function() {
            var c = spree.clipMgr.eventStartTime + 1000 * (parseInt($("#start_time_hours").val()) * 3600 + parseInt($("#start_time_mins").val()) * 60 + parseInt($("#start_time_seconds").val()));
            var b = spree.clipMgr.eventStartTime + 1000 * (parseInt($("#end_time_hours").val()) * 3600 + parseInt($("#end_time_mins").val()) * 60 + parseInt($("#end_time_seconds").val()));
            var d = {
                start: c,
                end: b
            };
            a.updateTimeFields(d);
            a.timeline.changeItem(0, {
                start: new Date(d.start),
                end: new Date(d.end)
            })
        })
    },
    updateTimeFields: function(a) {
        if (a.start) {
            time = Math.max(a.start, spree.clipMgr.eventStartTime);
            spree.clipMgr.startTime = time;
            $("input#clip_playback_start").val(time);
            spree.clipMgr.seek(time)
        }
        if (a.end) {
            time = Math.min(a.end, spree.clipMgr.eventEndTime);
            spree.clipMgr.endTime = time;
            $("input#clip_playback_end").val(time)
        }
        spree.clipMgr.pause()
    },
    selectClip: function() {
        if (this.timeline) {
            this.timeline.selectItem(0);
            this.timeline.redrawDragAreas();
            this.timeline.trigger("select")
        }
    },
    show: function() {
        this.timeline = new links.Timeline(this.$div[0]);
        this.timeline.draw(this.data, this.options);
        this.timeline.setVisibleChartRange(this.options.min, this.options.max);
        this.bindEvents();
        this.selectClip();
        this.addToolTips();
        spree.clipMgr.getThumbs()
    }
});
var SpreeClipManager = Class.extend({
    init: function(b) {
        var a = this;
        _.each(b, function(d, c) {
            a[c] = d
        });
        this.startTime = this.eventStartTime;
        this.endTime = this.eventEndTime;
        this.spreecastLength = spree.stringifyTime(this.endTime - this.startTime);
        this.maxSeconds = Math.round((this.endTime - this.startTime) / 1000);
        this.$div = $("#new-clip");
        this.bindEvents();
        this.populateTimes({
            start: this.clipStartTime,
            end: this.clipEndTime
        })
    },
    bindEvents: function() {
        var a = this;
        this.bindFormEvents();
        this.bindKeyEvents();
        $("#broadcast_wrapper .notice .remove").on("click", function() {
            a.deselectThumb()
        });
        $("#clip-preview").on("click", function() {
            a.preview()
        });
        $(".toggle-clip").on("click", function() {
            a.toggleClip()
        });
        $(".go-back").on("click", function() {
            history.back()
        });
        $(document).on("click", "#clip-done-button", function() {
            window.location.href = $("#clip_url").attr("href")
        })
    },
    toggleClip: function() {
        if (Spree.shouldBlockUser()) {
            return false
        }
        if ($("#clip_url").val()) {
            return window.location.href = $("#clip_url").val()
        }
        this.$div.toggle();
        this.reset();
        if (!this.channels) {
            this.getChannels()
        }
        this.timeline.show();
        this.toggleEditButton();
        spree.recommended.hideRecommendedContent();
        if (this.editingClip()) {
            window.location.hash = "#broadcast_wrapper"
        }
    },
    toggleEditButton: function() {
        if (this.editingClip()) {
            $(".toggle-clip.create-clip").hide();
            $(".toggle-clip.cancel-clip").show()
        } else {
            $(".toggle-clip.create-clip").show();
            $(".toggle-clip.cancel-clip").hide()
        }
    },
    editingClip: function() {
        return $("#new_clip").is(":visible")
    },
    bindFormEvents: function() {
        var a = this;
        this.$div.find("form").on({
            "ajax:beforeSend": function(b) {
                if (a.timeOutOfRange) {
                    return false
                }
                $("#clip-cancel, #clip_submit, #event_main .notice").hide();
                a.reset()
            },
            "ajax:complete": function() {
                $("#clip-cancel, #clip_submit").show()
            },
            "ajax:error": function(c, b) {
                $("#main_error.error_field").addClass("error").text(b.responseText)
            },
            "ajax:success": function(c, b) {
                $(".toggle-clip").hide();
                $("#new-clip").html(b)
            }
        })
    },
    bindKeyEvents: function() {
        var a = this;
        $("#clip-time-fields input[type=text]").on({
            keydown: function(d) {
                var c = d.keyCode ? d.keyCode : d.which,
                    b = String.fromCharCode(c);
                if ((c > 31 || c > 126) && !b.match(/\d/)) {
                    return d.preventDefault()
                }
            },
            change: function() {
                var c = {
                        start: a.startTime,
                        end: a.endTime
                    },
                    d = $(this).attr("id").split("_")[0],
                    b = function(g, e) {
                        var f = parseInt($("input#" + g + "_time_" + e).val().replace(/^0+/, ""));
                        return isNaN(f) ? 0 : f
                    };
                c[d] = a.eventStartTime + ((b(d, "hours") * 3600) + (b(d, "mins") * 60) + (b(d, "seconds"))) * 1000;
                if ((c.start < 0) || (c.start >= c.end) || (c.end > a.eventEndTime)) {
                    c = {
                        start: a.startTime,
                        end: a.endTime
                    }
                } else {
                    a.seek(c[d]);
                    a.pause()
                }
                a.populateTimes(c);
                a.timeline.timeline.setData([{
                    start: new Date(c.start),
                    end: new Date(c.end),
                    content: "clip"
                }]);
                a.timeline && a.timeline.selectClip()
            }
        })
    },
    getChannels: function() {
        var a = this;
        $.get("/channels", function(b) {
            a.channels = b;
            _.each(a.channels, function(c) {
                $("select#clip_channel_id").append($("<option>", {
                    value: c[1]
                }).html(c[0]))
            });
            a.$div.find("select").selectmenu({
                style: "dropdown"
            });
            if (a.channels.length < 2) {
                $("#clip_channel_id-button").hide()
            }
        })
    },
    getThumbs: function() {
        return;
        var a = this;
        $.get(["", "events", spree.event.friendly_id, "screenshots"].join("/"), function(b) {
            a.thumbData = b;
            a.timeline.timeline.setCustomTime(new Date(spree.clipMgr.eventStartTime))
        })
    },
    pad: function(a) {
        return (((a < 10) ? "0" : "") + a)
    },
    pause: function() {
        delete this.isPlaying;
        $("#clip-preview").removeClass("pause");
        spree.ecma.eventController.unsubscribe("ARCHIVE_TIMESTAMP", this.ecmaSub);
        document.broadcast.pause && document.broadcast.pause()
    },
    populateTimes: function(b) {
        var a = this;
        _.each(b, function(g, c) {
            a[c + "Time"] = g;
            var h = parseInt((g - a.eventStartTime) / 1000),
                d = Math.floor(h / 3600),
                e = Math.floor((h - (d * 3600)) / 60),
                f = "input#" + c + "_time_";
            h -= (d * 3600) + (e * 60);
            $(f + "seconds").val(a.pad(h));
            $(f + "mins").val(a.pad(e));
            $(f + "hours").val(a.pad(d));
            $("input#clip_playback_" + c).val(g)
        });
        this.timeline && this.timeline.selectClip()
    },
    preview: function() {
        var a = this;
        if (this.isPlaying) {
            return this.pause()
        }
        this.isPlaying = true;
        $("#clip-preview").addClass("pause");
        document.broadcast.seek(this.startTime - this.eventStartTime);
        this.ecmaSub = spree.ecma.eventController.subscribe("ARCHIVE_TIMESTAMP", function(b) {
            if ((b.timestamp * 1000) >= a.endTime) {
                a.pause()
            }
        })
    },
    reset: function() {
        this.resetPreview();
        $(".error_field").removeClass("error").empty()
    },
    resetPreview: function() {
        var a = "initial fullscreen splitscreen triscreen quadscreen thumbnail-notice";
        $("#event_stage").removeClass(a);
        $("#broadcast_wrapper").removeClass(a).children("img").remove()
    },
    seek: function(a) {
        spree.spreecast.setBroadcastVideoDigest("archive", spree.spreecast.videoDigest);
        document.broadcast.seek(a - this.eventStartTime)
    },
    setSelect: function(e, a) {
        var b = $("#clip-resizor"),
            d = this.endTime - this.startTime,
            c = b.parent().width();
        b.css({
            left: ((e * 1000) / d) * c,
            width: (((a - e) * 1000) / d) * c
        })
    },
    showThumb: function(c) {
        var b = spree.clipMgr.thumbData;
        var a = spree.binarySearch(b.time_stamps, c / 1000);
        if (a >= b.time_stamps.length) {
            a = b.time_stamps.length - 1
        }
        var d = _.pluck(b.data[b.time_stamps[a]].data, "url")
    }
});
var ViewerListing = Class.extend({
    init: function() {
        this.currentPage = 1;
        this.filteredPageCount = 1;
        this.unfilteredPageCount = 1;
        this.prevSearchText = null
    },
    bindEvents: function(a) {
        var b = this;
        a.find(".prev").on("click", function() {
            b.goToPage(b.currentPage - 1)
        });
        a.find(".next").on("click", function() {
            b.goToPage(b.currentPage + 1)
        });
        a.find(".user-search").on("keyup", function(c) {
            if (b.searchRequest) {
                clearTimeout(b.searchRequest);
                b.searchRequest = null
            }
            if (!b.unfilteredPageCount || $(this).val() === "" || c.keyCode == 27) {
                $(this).val("").attr("placeholder", "Search");
                a.find(".viewer-listing").show();
                b.search();
                return false
            }
            b.searchRequest = setTimeout(function() {
                var d = b.getSearchText();
                b.search(d)
            }, 500)
        })
    },
    getSearchText: function() {
        var a = this.$div.find(".user-search");
        if (a.length) {
            return a.val().toLowerCase().trim()
        } else {
            return null
        }
    },
    search: function(b) {
        var a = this;
        if ((!b || !this.prevSearchText) || (this.prevSearchText.length > b.length) || (this.filteredPageCount && this.filteredPageCount > 1)) {
            this.currentPage = 1;
            this.populateViewers()
        } else {
            this.$div.find(".viewer-listing").each(function() {
                var c = $(this);
                if (c.find(".user-name").text().toLowerCase().match(b) || (c.data("user-id") && c.data("user-id").match(b))) {
                    c.show()
                } else {
                    c.hide()
                }
            })
        }
        this.prevSearchText = b
    },
    populateViewers: function() {
        this.populate_viewers()
    },
    populate_viewers: function() {
        this.getUserList(Spreecast.viewerURLs.viewers)
    },
    goToPage: function(a) {
        this.currentPage = Math.max(0, Math.min(a, this.filteredPageCount));
        this.populate_viewers()
    },
    getUserList: function(e) {
        var a = this;
        var d = {
            page: (this.currentPage || 1),
            per_page: (this.perPage || 250)
        };
        var c = this.getSearchText();
        var b = (!c || c.length === 0);
        if (!b) {
            d.search = c
        }
        this.$list.addClass("waiting");
        $.ajax({
            url: e,
            type: "GET",
            data: d,
            dataType: "json",
            success: function(g, j, h) {
                a.filteredPageCount = parseInt(g.total_pages);
                a.currentPage = parseInt(g.current_page);
                if (a.$div) {
                    var f = a.$div.find(".paginate");
                    if (b) {
                        a.unfilteredPageCount = a.filteredPageCount
                    }
                    a.updatePaginationUI(f, a.currentPage, b ? a.unfilteredPageCount : a.filteredPageCount)
                }
                a.$list.removeClass("waiting");
                a.populateUserList(g.users || g.items)
            }
        })
    },
    populateUserList: function(b) {
        var a = this;
        this.$list.empty();
        _.each(b, function(c) {
            if (!("user_id" in c) || (User.find({
                user_id: c.user_id
            }) !== spree.user)) {
                var d = spree.hbTemplate("viewer-listing", {
                    user: {
                        id: c.user_id,
                        name: c.first_name,
                        profile_thumb_url: c.profile_photo_thumb_url,
                        fbId: c.fb_id
                    }
                });
                d.click(function(g) {
                    var f = $(this).attr("data-user-id");
                    if (!f) {
                        return
                    }
                    Facecard.create(f, {
                        coords: {
                            x: g.pageX,
                            y: g.pageY
                        }
                    })
                });
                a.$list.append(d)
            }
        })
    },
    show: function() {
        var a = this;
        spree.modalMgr.create("viewer-list", function(b) {
            a.$list = b.find(".viewer-list");
            a.$div = b.find(".modal-body");
            a.bindEvents(b.find(".modal-body"));
            a.populateViewers()
        })
    }
});
ViewerListing.getClasses = function(a) {
    var b = [];
    if (a.starredAt() != -1) {
        b.push("starred")
    }
    if (a.isGuest()) {
        b.push("guest")
    }
    if (a.producer()) {
        b.push("producer")
    }
    if (a.isOnAir()) {
        b.push("onair");
        if (a.isPublishing()) {
            b.push("publishing")
        }
    } else {
        if (spree.user.producer) {
            if (a.isPublishing()) {
                b.push("publishing")
            } else {
                if (a.broadcastStatus() > 0) {
                    b.push("connecting")
                }
            }
        }
    }
    return b.join(" ")
};
ViewerListing.addMixin(Pagination);
var Faceblock = Class.extend({
    init: function(b) {
        var a = this;
        this.$container = $("#event_viewers");
        this.$showMore = this.$container.find(".face-bubble-more");
        this.$viewer_list = $("#viewer_list");
        this.count = 0;
        this.visibleCount = 0;
        this.viewerCount = 0;
        $("#see-all-users").click(function(c) {
            c.preventDefault();
            Faceblock.showAll()
        });
        $("#event_viewers").on("click", ".face-bubble", function(d) {
            if ($(this).hasClass("guest")) {
                return
            }
            $(this).removeClass("alert");
            var c = $(this).data("user-id");
            if (spree.is_embed) {
                Facecard.create(c, {
                    coords: {
                        x: d.pageX,
                        y: d.pageY
                    }
                })
            } else {
                Facecard.create(c, {
                    rail: "faceblock",
                    y: d.pageY
                })
            }
        });
        this.maxBubbles = parseInt(this.$viewer_list.parents("[data-max-bubbles]").data("max-bubbles"))
    },
    displayCount: function() {
        if (this.shouldDisplaySeeAll()) {
            this.$showMore.removeClass("hidden")
        } else {
            if (!this.$showMore.hasClass("hidden")) {
                this.$showMore.addClass("hidden")
            }
        }
    },
    getClasses: function(a) {
        var b = ["face-bubble"].concat(ViewerListing.getClasses(a));
        if (spree.eventIsFinished()) {
            b.push("onair")
        }
        return b.join(" ")
    },
    getUser: function(a) {
        return $("#face-bubble-" + a)
    },
    hide: function(a, b) {
        if (a) {
            a()
        }
        if (b) {
            if (this.$container.hasClass("hidden")) {
                b()
            } else {
                performAfterTransition(this.$container, function() {
                    b()
                }, "height")
            }
        }
        this.$container.addClass("hidden")
    },
    insert: function(d) {
        var c = d.user();
        var a = d.globalPosition();
        if (a >= this.maxBubbles) {
            this.count++;
            this.displayCount();
            return
        }
        var e = {
            id: c.alt(),
            thumb_src: spree.generateProfilePhotoAddress(c, "large"),
            name: c.name(),
            classList: this.getClasses(c)
        };
        var b = spree.hbTemplate("faceblock", e);
        if (c.id() === spree.user.id) {
            spree.spreecast.updateOnAirNotice(c)
        }
        if (this.visibleCount === this.maxBubbles) {
            this.$viewer_list.children().last().remove()
        } else {
            this.visibleCount++
        }
        this.displayCount();
        if (a < this.$viewer_list.children().length) {
            this.$viewer_list.children().eq(a).before(b)
        } else {
            this.$viewer_list.append(b)
        }
    },
    move: function(d) {
        var c = d.user();
        var a = d.globalPosition();
        var b = this.getUser(c.alt());
        if (a >= this.maxBubbles) {
            if (b.length) {
                b.remove();
                this.visibleCount--;
                this.insert(spree.ecma.visibleUsersController.userAt(this.maxBubbles - 1))
            }
            return
        }
        if (b.length) {
            b.detach();
            if (a < this.$viewer_list.children().length) {
                this.$viewer_list.children().eq(a).before(b)
            } else {
                this.$viewer_list.append(b)
            }
        }
        this.update(c)
    },
    offset: function() {
        return this.$viewer_list.offset()
    },
    remove: function(b) {
        var a = this.getUser(b);
        if (a.length) {
            a.remove();
            if (this.count > this.maxBubbles) {
                this.insert(spree.ecma.visibleUsersController.userAt(this.maxBubbles - 1))
            } else {
                this.visibleCount--
            }
        }
        this.count--;
        this.displayCount()
    },
    set: function(a) {
        var d = [];
        this.count = a.length;
        if (a.length > 0) {
            var g = Math.min(a.length, this.maxBubbles);
            this.visibleCount = g;
            for (var e = 0; e < g; e++) {
                var c = a[e].user();
                var f = {
                    id: c.alt(),
                    thumb_src: spree.generateProfilePhotoAddress(c, "large"),
                    name: c.name(),
                    classList: this.getClasses(c)
                };
                var b = spree.hbTemplate("faceblock", f);
                if (c.id() === spree.user.id) {
                    spree.spreecast.updateOnAirNotice(c)
                }
                d.push(b)
            }
            this.$viewer_list.html(d)
        }
        this.displayCount()
    },
    setViewerCount: function(a) {
        this.viewerCount = a;
        if (spree.eventIsFinished()) {
            return
        }
        var b = spree.is_embed ? a : ("(" + numberWithCommas(a - this.maxBubbles) + ")");
        this.$container.find(".count").html(b)
    },
    shouldDisplaySeeAll: function() {
        return this.count > this.maxBubbles
    },
    show: function(a, b) {
        if (a) {
            a()
        }
        if (b) {
            if (!this.$container.hasClass("hidden")) {
                b()
            } else {
                performAfterTransition(this.$container, function() {
                    b()
                }, "height")
            }
        }
        this.$container.removeClass("hidden")
    },
    update: function(a) {
        var b = this.getUser(a.alt());
        b.attr("class", this.getClasses(a));
        if (a.id() === spree.user.id) {
            spree.spreecast.updateOnAirNotice(a)
        }
    }
});
Faceblock.showAll = function() {
    var a = new ViewerListing();
    a.show()
};
var Questions = Class.extend({
    init: function(b) {
        var a = this;
        this.eventController = b;
        this.$question_list = $("#question-list");
        $(document).on("click", "#ask2", function(c) {
            if (Spree.shouldBlockUser() || a.checkBlockQuestion()) {
                Spree.blockUser("question", "Sign up or log in to ask questions");
                return false
            }
            c.preventDefault();
            c.stopPropagation();
            a.submitMain()
        });
        $(document).on("keyup", "#question-input", function(c) {
            var d = $(this);
            if (c.keyCode == 13 && !$("#ask2").attr("disabled")) {
                if (Spree.shouldBlockUser() || a.checkBlockQuestion()) {
                    Spree.blockUser("question", "Sign up or log in to ask questions");
                    return false
                }
                c.preventDefault();
                c.stopPropagation();
                a.submitMain();
                return false
            }
            clearTimeout(a.embedCheck);
            a.embedCheck = setTimeout(function() {
                var e = d.val();
                if (!validURL(e)) {
                    return
                }
                $.embedly.oembed(e, {
                    maxWidth: 490,
                    maxHeight: 450
                }).progress(function(h) {
                    if (h.type == "error") {
                        $(".media-preview").remove();
                        return
                    }
                    var f = /twitter\.com\/.+\/status\//.test(e);
                    if (h.type == "link" && !f) {
                        return
                    }
                    $(".media-preview").remove();
                    if (h.provider_name == "YouTube") {
                        h.html = a.youtubeEmbed(h.original_url, h.html)
                    }
                    var g = a.customizePreviewData(h);
                    a.addMediaPreview(g)
                })
            }, 300)
        });
        $("#questions-box").on("click", ".user-name", function(c) {
            Facecard.create($(this).data("user-id"), {
                coords: {
                    x: c.pageX,
                    y: c.pageY
                }
            })
        });
        $("#ask").click(function(c) {
            if (Spree.shouldBlockUser() || a.checkBlockQuestion()) {
                return
            }
            var d = $("#question").val();
            if (d === "") {
                return
            }
            a.submitFlash()
        })
    },
    addMediaPreview: function(e) {
        var b = this;
        var a = e.thumbnail_height;
        a = (100 * a) / e.thumbnail_width;
        var f = e.title ? e.title : e.url;
        var c = e.description ? e.description : "";
        var d = spree.hbTemplate("media-item-preview", {
            height: a,
            image_url: e.thumbnail_url,
            title: f,
            description: c,
            link: e.original_url
        });
        d.find(".close-icon").click(function(g) {
            $(".media-preview").remove()
        });
        $("#question-input").after(d);
        b.embedData = e
    },
    insert: function(d) {
        var c = d.question || d.mediaItem;
        var b = {
            user: {
                id: c.user().alt(),
                name: c.user().name(),
                thumb: spree.generateProfilePhotoAddress(c.user(), "large")
            },
            id: c.id(),
            type: c.modelName() == "question" ? "Question" : "MediaItem",
            question: c.text(),
            text: $("<p>" + c.text() + "</p>").text(),
            classList: Questions.getClasses(c).join(" ")
        };
        var a;
        if (b.type == "MediaItem") {
            b.title = c.title();
            b.imageURL = c.imageURL();
            b.embed = this.forceMediaDeliveryProtocol(c.embed());
            b.url = c.url();
            b.description = c.description()
        }
        a = spree.hbTemplate("question", b);
        var e = a.find(".media-thumbnail");
        e.bind("load", function() {
            a.find(".media-description").multiLine({
                rows: 2
            })
        });
        this.$question_list.append(a);
        this.adjustCounter()
    },
    submitFlash: function() {
        var a = $("#question-prompt");
        var e = $("#question");
        var b = $("#ask");
        var c = $("#question-feedback");
        var d = e.val();
        spree.ecma.eventController.questionController().submit({
            text: d
        }, "/rt/questions/create", function() {
            b.attr("disabled", false);
            e.val("");
            a.hide();
            c.show();
            setTimeout(function() {
                c.hide()
            }, 2500)
        }, function() {
            b.attr("disabled", false)
        })
    },
    submitMain: function() {
        var a = this;
        var f = $("#question-input");
        var e = f.val();
        if (!e && !this.embedData) {
            return
        }
        var d = {
                event_id: spree.event.event_id,
                text: e,
                role: spree.user.role,
                embed: this.embedData
            },
            b = this.embedData ? "/media_items" : "/rt/questions/create";
        var c = $("#ask2");
        c.attr("disabled", true);
        this.eventController.questionController().submit(d, b, function() {
            delete a.embedData;
            $(".media-preview").remove();
            c.attr("disabled", false);
            f.val("")
        }, function() {
            c.attr("disabled", false)
        })
    },
    update: function(d) {
        var c, b;
        if (d.question) {
            b = "Question"
        } else {
            b = "MediaItem"
        }
        c = d.question || d.mediaItem;
        var a = $("[data-type=" + b + "][data-id=" + c.id() + "]");
        a.attr("class", Questions.getClasses(c).join(" "))
    },
    remove: function(d) {
        var c, b;
        if (d.question) {
            b = "Question"
        } else {
            b = "MediaItem"
        }
        c = d.question || d.mediaItem;
        var a = $("[data-type=" + b + "][data-id=" + c.id() + "]");
        a.remove();
        this.adjustCounter()
    },
    adjustCounter: function() {
        $("#question_number").text($("#question-list li:visible").length)
    },
    checkBlockQuestion: function() {
        if (!spree.user.producer && !spree.event.questions_enabled) {
            spree.blockWithTakeQuestionsCommentsDisabled();
            return true
        }
        return false
    }
});
Questions.getClasses = function(b) {
    var a = ["question-content"];
    if ( !! b.starTimestamp()) {
        a.push("starred")
    }
    return a
};
Questions.addMixin(MediaParse);
Questions.addMixin(MediaInteractions);
var InviteManager = ViewerListing.extend({
    init: function(a) {
        this._super();
        this.inviteTypes = a;
        this.perPage = 5;
        this.followersPath = "/users/invite_followers";
        this.friendsPath = "/users/invite_friends";
        this.messageText = 'Join me in the spreecast "' + spree.event.name + '"'
    },
    bindMenuEvents: function(b) {
        var a = this;
        b.on("click", ".picker-item", function() {
            var d = b.find("#invite-tabs").attr("data-selected");
            var c = $(this).attr("data-invite-method");
            if (d !== c) {
                a.switchMethod(c)
            }
        });
        this.$inviteButton.click(function() {
            a.sendInvitations($(this))
        });
        $("#invite-all").click(function() {
            a.inviteAllFollowers(a.$inviteButton, a.$inviteFollowersButton)
        })
    },
    bindEvents: function(a) {
        var b = this;
        this._super(a);
        a.on("click", ".viewer-listing [data-invite-type]", function(c) {
            if ($(this).prop("checked")) {
                $(this).siblings("[data-invite-type]").not("[data-invite-type=" + $(this).attr("data-invite-type") + "]").attr("checked", false)
            }
            b.updateCheckboxTotals()
        });
        a.on("keyup", ".email-invite-entry", function(c) {
            b.updateTextareaTotals()
        })
    },
    goToPage: function(a) {
        this.currentPage = Math.max(0, Math.min(a, this.filteredPageCount));
        var b = this.$modal.find("#invite-tabs").attr("data-selected");
        this.populateViewers()
    },
    inviteAllFollowers: function(c, b) {
        var a = this;
        c.attr("disabled", true);
        b.attr("disabled", true);
        $.ajax({
            type: "POST",
            url: "/event_actions/invite_all",
            data: {
                event_id: spree.event.event_id,
                user_id: spree.user.alt
            },
            dataType: "json",
            complete: function(e, f, d) {
                c.attr("disabled", false)
            },
            success: function(e, f, d) {
                a.showInviteComplete(e.response.invites)
            }
        })
    },
    show: function() {
        var a = this;
        spree.modalMgr.create("event-invite", function(b) {
            b.find(".invite-section[data-invite-method=viewers] .invite-head.viewer").remove();
            a.$inviteButton = b.find(".modal-footer input[type=submit]");
            a.$inviteFollowersButton = b.find("#invite-all");
            a.$inviteFollowersButton.hide();
            a.$inviteBlocker = b.find("#invite-blocker");
            a.$modal = b;
            a.bindMenuEvents(a.$modal);
            $(document).one("keydown.cancelInvite", function(d) {
                if (d.keyCode == 27) {
                    b.modal("hide")
                }
            });
            var c = (spree.user.producer ? "viewers" : "email");
            a.switchMethod(c)
        }, null, {
            user: {
                producer: spree.user.producer,
                authenticated: spree.user.has_been_authenticated
            }
        })
    },
    populateViewers: function() {
        var a = this.$modal.find("#invite-tabs").attr("data-selected");
        this["populate_" + a]()
    },
    populate_email: function() {
        this.$div.removeClass("waiting")
    },
    populate_friends: function() {
        this.getUserList(this.friendsPath)
    },
    populate_spreecast: function() {
        this.getUserList(this.followersPath)
    },
    populateUserList: function(c) {
        var a = this;
        var b = this.$modal.find("#invite-tabs").attr("data-selected");
        this.$list.empty();
        _.each(c, function(d) {
            if (!("user_id" in d) || (User.find({
                user_id: d.user_id
            }) !== spree.user)) {
                a.$list.append(spree.hbTemplate("invite-viewers", {
                    user: {
                        id: d.user_id,
                        name: d.first_name,
                        profile_thumb_url: d.profile_photo_thumb_url,
                        fbId: d.fb_id
                    },
                    inviteMethod: b,
                    inviteTypes: a.inviteTypes
                }))
            }
        })
    },
    sendInvitations: function(f) {
        var b = this;
        var e = this.$modal.find("#invite-tabs").attr("data-selected");
        var c = {},
            d = 0,
            a = $.param({
                t: "message",
                uid: spree.user.user_id,
                a: "spree_invite"
            });
        if (e !== "email") {
            _.each(this.$div.find(".viewer-listing input[type=checkbox]:checked"), function(h) {
                var g = $(h).attr("data-invite-type"),
                    k = $(h).parents("li");
                if (!c[g]) {
                    c[g] = []
                }
                var j = k.attr("data-user-id");
                if (j) {
                    c[g].push(j);
                    d++
                }
            })
        } else {
            _.each(this.$div.find("textarea"), function(h) {
                var g = $(h).attr("data-invite-type");
                if (!(g in c)) {
                    c[g] = []
                }
                var j = b.getEmailsInTextarea($(h));
                if (j.length > 0) {
                    c[g] = c[g].concat(j);
                    d += j.length
                }
            })
        }
        if (d < 1) {
            return
        }
        f.attr("disabled", true);
        $.ajax({
            type: "POST",
            url: "/event_actions",
            data: {
                event_action: {
                    invite_type: e,
                    action: "bulk_invite",
                    event_id: spree.event.friendly_id,
                    invites: c
                }
            },
            dataType: "json",
            complete: function(h, j, g) {
                f.attr("disabled", false)
            },
            success: function(h, j, g) {
                b.showInviteComplete(c)
            }
        })
    },
    showInviteComplete: function(c) {
        var a = this,
            b = 0;
        _.each(a.inviteTypes, function(f) {
            var e = f.type,
                d = c[e] ? c[e].length : 0;
            b += d;
            if (d) {
                a.$inviteBlocker.find("[data-promote-type=" + e + "]").text("" + d + " friend" + (d > 1 ? "s" : "") + " invited " + f.verb)
            }
        });
        this.$inviteBlocker.find(".sent-invite-total").html("" + b + " Invitation" + (b > 1 ? "s" : "") + " Sent!");
        this.$inviteBlocker.show();
        setTimeout(function() {
            a.$inviteBlocker.hide().find("h1, h2").empty();
            a.$div.find(".email-invite-entry").val("");
            a.$div.find(".viewer-listing input[type=checkbox]").attr("checked", false);
            a.updateTotals()
        }, 5000)
    },
    switchMethod: function(a) {
        delete this.filteredPageCount;
        delete this.unfilteredPageCount;
        delete this.prevSearchText;
        this.currentPage = 1;
        this.$modal.find(".picker-item").removeClass("tab-selected");
        this.$modal.find(".picker-item[data-invite-method=" + a + "]").addClass("tab-selected");
        this.$modal.find("#invite-tabs").attr("data-selected", a);
        this.$div = this.$modal.find(".invite-section[data-invite-method=" + a + "]");
        this.$div.find(".invite-totals .total").text("0");
        this.bindEvents(this.$div);
        $(".fake-header-transition").remove();
        this.$div.addClass("waiting").show();
        this.$list = this.$div.find("ul").empty();
        if (a === "spreecast") {
            this.$inviteFollowersButton.show()
        } else {
            this.$inviteFollowersButton.hide()
        }
        this.$inviteButton.show();
        this.populateViewers()
    },
    updateTotals: function() {
        if (this.$div.attr("data-invite-method") == "email") {
            this.updateTextareaTotals()
        } else {
            this.updateCheckboxTotals()
        }
    },
    getEmailsInTextarea: function(a) {
        if (a.val().length) {
            var b = a.val().match(/[A-Z0-9._%+-]+@\w+\.\w+/gi);
            if (b) {
                return b
            }
        }
        return []
    },
    updateTextareaTotals: function() {
        var a = this;
        _.each(a.inviteTypes, function(d) {
            var c = a.$div.find("textarea[data-invite-type=" + d.type + "]");
            if (c.length) {
                var b = a.getEmailsInTextarea(c).length;
                a.$div.find(".invite-head [data-invite-type=" + d.type + "]").text(b)
            }
        })
    },
    updateCheckboxTotals: function() {
        var a = this;
        _.each(a.inviteTypes, function(c) {
            var b = a.$div.find("input[data-invite-type=" + c.type + "]:checked").length;
            a.$div.find(".invite-totals [data-invite-type=" + c.type + "]").text(b.toString())
        })
    }
});