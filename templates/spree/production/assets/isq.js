var PageFollowBanner = FollowBanner.extend({
    showCallback: function() {
        this._super()
    },
    hiddenCallback: function() {
        this._super()
    }
});
var ViewerRail = Class.extend({
    init: function(b) {
        var a = this;
        this.$container = b;
        this.$showMore = this.$container.find(".show-more-viewers");
        this.$showMore.hide();
        this.showingMore = false;
        this.scroll = new UserScroll(b, b.find(".viewer-types-list"), {
            list: this,
            topOffset: spree.user.producer ? 50 : 0
        });
        this.opened = false;
        this.hidden = false;
        this.lastScrollPercent = 0;
        this.visibleCount = 0;
        this.cachedHeight = 0;
        this.maxBubbles = parseInt(this.$container.data("max-bubbles"));
        this.categories = [ViewerRail.CATEGORY_ON_AIR, ViewerRail.CATEGORY_PRODUCER, ViewerRail.CATEGORY_CAMERAQUEUE, ViewerRail.CATEGORY_VIEWER];
        this.$container.on("click", ".star-field", function(g) {
            g.stopPropagation();
            var f = $(this);
            var c = f.parents("[data-user-id]").data("user-id");
            var d = f.parents(".starred").length;
            if (d === 0) {
                spree.ecma.eventController.producerController().userStar(c)
            } else {
                spree.ecma.eventController.producerController().userUnstar(c)
            }
        });
        $(".producer-list-button").click(function() {
            a.openProducerRail()
        });
        $("#close-producer-list").click(function() {
            a.closeProducerRail()
        });
        this.$container.on("click", ".viewer-list-listing", function(d) {
            if ($(this).hasClass("guest")) {
                return
            }
            $(this).find(".chat-status").text("");
            $(this).removeClass("chat-alert");
            var c = $(this).data("user-id");
            var f = spree.user.producer ? "producer" : "viewer";
            Facecard.create(c, {
                rail: f,
                y: d.pageY
            })
        });
        this.$showMore.click(function() {
            Faceblock.showAll()
        })
    },
    closedProducerRail: function() {
        this.opened = false
    },
    closeProducerRail: function() {
        var a = this;
        performAfterTransition($("#producers-viewer-list"), function() {
            a.closedProducerRail()
        });
        spree.spreecast.faceblock.show(function() {
            spree.viewerChat.saveScrollPos();
            spree.producerChat.saveScrollPos()
        }, function(b) {
            spree.viewerChat.restoreScrollPos();
            spree.producerChat.restoreScrollPos()
        });
        this.saveScrollPos();
        $("body").removeClass("viewer-list-engaged")
    },
    displayShowMore: function() {
        if (this.visibleCount >= this.maxBubbles) {
            if (!this.showingMore) {
                this.$showMore.show();
                this.showingMore = true;
                this.updateHeight(ViewerRail.USER_HEIGHT)
            }
        } else {
            if (this.showingMore) {
                this.$showMore.hide();
                this.showingMore = false;
                this.updateHeight(-ViewerRail.USER_HEIGHT)
            }
        }
    },
    getCameraStatus: function(a) {
        if (a.producer()) {
            return ""
        }
        if (a.proposedPromotion() == 1) {
            return "Awaiting your reply"
        } else {
            if (a.broadcastStatus() > 0) {
                if (!a.isPublishing()) {
                    return "Setting up camera"
                } else {
                    if (a.pane() == -1) {
                        return "Waiting to be put on air"
                    }
                }
            }
        }
        return ""
    },
    getClasses: function(a) {
        var b = ["viewer-list-listing"].concat(ViewerListing.getClasses(a));
        return b
    },
    getUser: function(a) {
        return this.$container.find(this.userSelector(a))
    },
    hide: function() {
        this.hidden = true;
        this.saveScrollPos();
        this.$container.parents(".social-box").addClass("hidden");
        this.$container.addClass("hidden")
    },
    insert: function(e) {
        var d = e.user();
        var b = e.globalPosition();
        var g = e.categoryPosition();
        var f = e.category();
        var a = $("#viewer-type-listing-" + f);
        this.updateCategoryHeader(a, f);
        var c = {
            id: d.alt(),
            full_name: d.name(),
            profile_photo_thumb_url: spree.generateProfilePhotoAddress(d, "medium")
        };
        var h = spree.hbTemplate("viewer-rail-listing", {
            user: c,
            renderForProducer: spree.user.producer,
            classList: this.getClasses(d).join(" ")
        });
        h.find(".camera-status").text(this.getCameraStatus(d));
        if (d.alt() !== spree.user.alt && f === ViewerRail.CATEGORY_CAMERAQUEUE) {
            this.showNotification()
        }
        if (this.visibleCount === this.maxBubbles) {
            $(".viewer-list-listing").last().remove();
            this.updateHeight(-ViewerRail.USER_HEIGHT)
        } else {
            this.visibleCount++
        }
        if (g < a.find(".viewer-list").children().length) {
            a.find(".viewer-list").children().eq(g).before(h)
        } else {
            a.find(".viewer-list").append(h)
        }
        this.updateHeight(ViewerRail.USER_HEIGHT);
        this.displayShowMore()
    },
    move: function(e) {
        var c = e.user();
        var a = e.category();
        var b = e.categoryPosition();
        var g = e.globalPosition();
        var h = $("#viewer-type-listing-" + a);
        var i = this.getUser(c.alt());
        if (i.length) {
            var d = i.parents(".viewer-type-listing").data("type");
            i.detach();
            if (b < h.find(".viewer-list").children().length) {
                h.find(".viewer-list").children().eq(b).before(i)
            } else {
                h.find(".viewer-list").append(i)
            }
            var f = $("#viewer-type-listing-" + d);
            if (f.find(".viewer-list").children().length === 0 && !f.hasClass("empty")) {
                f.addClass("empty");
                this.updateHeight(-ViewerRail.HEADER_HEIGHT)
            }
            this.updateCategoryHeader(h, a)
        }
        this.update(c)
    },
    openedProducerRail: function() {
        this.opened = true;
        this.restoreScrollPos();
        $(".question-container").multiLine({
            rows: 2
        })
    },
    openProducerRail: function() {
        $(".producer-list-button").removeClass("alert");
        var a = this;
        performAfterTransition($("#producers-viewer-list"), function() {
            a.openedProducerRail()
        });
        spree.spreecast.faceblock.hide(function() {
            spree.viewerChat.saveScrollPos();
            spree.producerChat.saveScrollPos()
        }, function(b) {
            spree.viewerChat.restoreScrollPos();
            spree.producerChat.restoreScrollPos()
        });
        $("body").addClass("viewer-list-engaged")
    },
    remove: function(c) {
        var b = this.getUser(c);
        if (b.length) {
            var d = b.parents(".viewer-type-listing").data("type");
            b.remove();
            this.updateHeight(-ViewerRail.USER_HEIGHT);
            var a = $("#viewer-type-listing-" + d);
            if (a.find(".viewer-list").children().length === 0 && !a.hasClass("empty")) {
                a.addClass("empty");
                this.updateHeight(-ViewerRail.HEADER_HEIGHT)
            }
            this.visibleCount--
        }
        this.displayShowMore()
    },
    resetHeight: function() {
        this.cachedHeight = 0
    },
    restoreScrollPos: function() {
        this.scroll.updateWithPercentage(this.lastScrollPercent)
    },
    saveScrollPos: function() {
        this.lastScrollPercent = this.scroll.handlePercentage()
    },
    set: function(a) {
        this.$visibleList = [];
        if (a.length > 0) {
            var d = Math.min(a.length, this.maxBubbles);
            this.visibleCount = d;
            this.resetHeight();
            this.showingMore = false;
            var c = 0;
            for (var b = 0; b < this.categories.length; b++) {
                c = this.setCategory(a, this.categories[b], c, d)
            }
            this.updateHeight(d * ViewerRail.USER_HEIGHT)
        }
        this.displayShowMore()
    },
    setCategory: function(e, d, g, c) {
        var h = g;
        var j = [];
        var l = $("#viewer-type-listing-" + d);
        for (h; h < c; h++) {
            var f = e[h].user();
            var b = e[h].category();
            if (b !== d) {
                l.find(".viewer-list").html(j);
                this.setCategoryHeader(j, l, d);
                return h
            }
            var k = {
                id: f.alt(),
                full_name: f.name(),
                profile_photo_thumb_url: spree.generateProfilePhotoAddress(f, "medium")
            };
            var a = spree.hbTemplate("viewer-rail-listing", {
                user: k,
                renderForProducer: spree.user.producer,
                classList: this.getClasses(f).join(" ")
            });
            a.find(".camera-status").text(this.getCameraStatus(f));
            if (f.alt() !== spree.user.alt && d === ViewerRail.CATEGORY_CAMERAQUEUE) {
                this.showNotification()
            }
            j.push(a)
        }
        l.find(".viewer-list").html(j);
        this.setCategoryHeader(j, l, d);
        return h
    },
    setCategoryHeader: function(b, a, c) {
        if (b.length > 0) {
            a.removeClass("empty");
            if (spree.user.producer || c !== ViewerRail.CATEGORY_CAMERAQUEUE) {
                this.updateHeight(ViewerRail.HEADER_HEIGHT)
            }
        } else {
            if (!a.hasClass("empty")) {
                a.addClass("empty")
            }
        }
    },
    setViewerCount: function(a) {
        var c = $("#viewer-type-listing-viewer .viewer-list-heading");
        if (a > this.maxBubbles) {
            c.addClass("over-max")
        } else {
            c.removeClass("over-max")
        }
        var b = $("#viewer-type-listing-onair").find(".viewer-list").children().length;
        b += $("#viewer-type-listing-producer").find(".viewer-list").children().length;
        b += $("#viewer-type-listing-cameraqueue").find(".viewer-list").children().length;
        c.attr("data-viewer-count", a - b)
    },
    show: function() {
        this.hidden = false;
        this.restoreScrollPos();
        this.$container.parents(".social-box").removeClass("hidden");
        this.$container.removeClass("hidden")
    },
    showChatNotification: function(a) {
        var b = a.alt();
        var c = this.getUser(b);
        if (c.length) {
            c.addClass("chat-alert");
            c.find(".chat-status").text("Awaiting your reply")
        }
    },
    showNotification: function() {
        if (!this.opened) {
            $(".producer-list-button").addClass("alert")
        }
    },
    update: function(a) {
        var b = this.getUser(a.alt());
        b.attr("class", this.getClasses(a).join(" "));
        b.find(".camera-status").text(this.getCameraStatus(a))
    },
    updateCategoryHeader: function(a, b) {
        if (a.hasClass("empty")) {
            a.removeClass("empty");
            if (spree.user.producer || b !== ViewerRail.CATEGORY_CAMERAQUEUE) {
                this.updateHeight(ViewerRail.HEADER_HEIGHT)
            }
        }
    },
    updateHeight: function(a) {
        this.cachedHeight += a;
        this.scroll.updateHandle()
    },
    updateQualityScore: function(f) {
        if (!f) {
            return
        }
        var d = f.bitrate();
        var h = f.ping();
        var a = f.packetLoss();
        var c = f.displayQuality();
        if (isNaN(d) || isNaN(h) || isNaN(a) || isNaN(c)) {
            return
        }
        var g = this.getUser(f.userId());
        var e = g.find(".status-panel, .total-connection-percentage");
        e.attr("data-display-quality", c);
        var b = g.find(".preview-stats");
        b.find("[data-unit=kbps]").text(d);
        b.find("[data-unit=ms]").text(h);
        b.find("[data-unit=percent]").text(a)
    },
    userSelector: function(a) {
        return ("#viewer-list-listing-" + a)
    }
});
ViewerRail.USER_HEIGHT = 60;
ViewerRail.HEADER_HEIGHT = 40;
ViewerRail.CATEGORY_ON_AIR = "onair";
ViewerRail.CATEGORY_PRODUCER = "producer";
ViewerRail.CATEGORY_CAMERAQUEUE = "cameraqueue";
ViewerRail.CATEGORY_VIEWER = "viewer";
var QuestionTicker = Class.extend({
    init: function(a) {
        this.$container = $("#the-real-rapper");
        this.$onair = $("#question-on-air-container");
        this.$currentQues = $("#current-question-wrapper");
        this.$prevQues = $("#previous-question-wrapper");
        this.ec = a;
        if (spree.event.status === 1) {
            this.update()
        }
        this.bindEvents()
    },
    bindEvents: function() {
        var a = this;
        $(document).on("click", ".remove-on-air-question-wrapper", function(b) {
            if (a.$currentQues.attr("data-type") === "MediaItem") {
                a.ec.producerController().mediaItemOffAir()
            } else {
                a.ec.producerController().questionOffAir()
            }
        });
        this.$currentQues.on("click", ".toggle-content", function(b) {
            b.preventDefault();
            if ($(this).attr("data-state") === "more") {
                a.expandOnAir()
            } else {
                a.contractOnAir()
            }
        });
        this.$currentQues.on("click", ".user-name, .user-avatar", function(c) {
            var b = $(c.target).attr("data-user-id");
            Facecard.create(b, {
                coords: {
                    x: c.pageX,
                    y: c.pageY
                }
            })
        });
        $("#screen_queue").on("click", ".media-title a, .media-thumbnail a", function(c) {
            if (!spree.user.producer) {
                return true
            }
            c.preventDefault();
            var b = $(c.target).parents("[data-id]");
            a.previewMedia(b)
        });
        this.$currentQues.on("click", ".media-title a, .media-thumbnail a", function(c) {
            if (spree.user.producer || spree.device === "ipad") {
                return true
            }
            c.preventDefault();
            var b = $(c.target).parents("[data-id]");
            a.openMedia(b)
        })
    },
    updateMessage: function(a) {
        if (a > 0) {
            this.$onair.attr("data-questions", "queued")
        } else {
            this.$onair.attr("data-questions", "none")
        }
    },
    update: function() {
        var a = $(".question-listing").length;
        this.updateMessage(a);
        var b = this.ec.questionController().questionOnAir();
        if (!b) {
            this.$onair.attr("data-prompt", true)
        }
    },
    onAir: function(d) {
        var i = d.question || d.media_item;
        if (!i) {
            return
        }
        var j = this;
        var k = i.modelName() === "question" ? "Question" : "MediaItem";
        var g = this.$currentQues.children().length > 0;
        var e = i.user();
        var c = {
            id: e.alt(),
            name: e.name(),
            thumbUrl: spree.generateProfilePhotoAddress(e, "medium")
        };
        var h = {
            text: i.text(),
            user: c,
            type: k
        };
        var b = $("<p>" + i.text() + "</p>");
        h.text = b.html();
        if (d.media_item) {
            h.id = i.id();
            h.title = i.title() || h.text;
            h.imageURL = i.imageURL();
            h.embed = i.embed();
            h.url = i.url();
            h.profileImage = i.user().profilePhotoThumbUrl_100x100();
            h.ownerId = i.user().alt();
            h.ownerName = i.user().name();
            h.ownerLocked = i.user().is_locked;
            h.description = i.description()
        }
        var a = spree.hbTemplate("on-air-question", h);
        if (g) {
            var f = this.$currentQues.children().detach();
            this.$prevQues.append(f);
            this.animatePrevItem();
            this.$currentQues.append(a);
            this.$currentQues.attr("data-type", k);
            this.animateNextItem(function() {
                $(".current-question").multiLineToggle()
            })
        } else {
            this.$currentQues.append(a);
            this.$currentQues.attr("data-type", k);
            this.animateOnAir(function() {
                $(".current-question").multiLineToggle()
            })
        }
        this.contractOnAir()
    },
    offAir: function(b) {
        if (b.action !== "explicit") {
            return
        }
        var a = this;
        this.$currentQues.on(transitionend, function() {
            a.$currentQues.off(transitionend);
            a.$currentQues.empty();
            a.$currentQues.removeAttr("data-type");
            a.$onair.attr("data-prompt", "true")
        });
        this.$onair.removeAttr("data-arrow data-content")
    },
    animatePrevItem: function() {
        var a = this;
        this.$prevQues.on(transitionend, function() {
            a.$prevQues.off(transitionend);
            a.$prevQues.empty();
            a.$onair.attr("data-prev", true)
        });
        this.$onair.removeAttr("data-prev")
    },
    animateOnAir: function(a) {
        if (a) {
            performAfterTransition(this.$currentQues, a)
        }
        this.$onair.attr("data-content", true);
        this.$onair.attr("data-arrow", true);
        this.$onair.removeAttr("data-prompt")
    },
    animateNextItem: function(a) {
        this.$currentQues.removeClass("animated");
        this.$onair.removeAttr("data-content");
        this.$currentQues[0].offsetHeight;
        this.$currentQues.addClass("animated");
        if (a) {
            performAfterTransition(this.$currentQues, a)
        }
        this.$onair.attr("data-content", true)
    },
    expandOnAir: function() {
        this.$onair.addClass("showing-all")
    },
    contractOnAir: function() {
        this.$onair.removeClass("showing-all")
    }
});
QuestionTicker.addMixin(MediaInteractions);
console.log("ScreenQueueInput");
var ScreenQueueInput = Class.extend({
    init: function(a) {
        console.log("ScreenQueueInput::init");
        //this.ec = a;
        this.$input = $("#viewer-queue .queue-input");
        this.$container = $("#queue-input-container");
        this.$submit = $("#queue-submit .queue-submit");
        this.$cancel = $("#queue-submit .queue-cancel");
        this.$info = $("#queue-info");
        this.$length = $("#queue-input-length");
        //$("#queue-input-user").attr("src", spree.generateProfilePhotoAddress(this.ec.user(), "medium"));
        this.bindEvents()
    },
    bindEvents: function() {
        console.log("ScreenQueueInput::bindEvents");
        var a = this;
        this.$container.click(function(b) {
            b.preventDefault();
            b.stopPropagation();
            b.stopImmediatePropagation()
        });
        $("#supported-providers").click(function() {
            window.open($(this).attr("href"))
        });
        this.$input.click(function() {
            a.onfocus()
        });
        $(document).click(function() {
            a.onblur()
        });
        this.$cancel.click(function() {
            a.clear();
            a.onblur()
        });
        this.$submit.click(function() {
            a.submit()
        });
        this.$input.on("keyup", function(b) {
            var d = $(this);
            if (b.keyCode === 13 && !a.$submit.attr("disabled")) {
                b.preventDefault();
                b.stopPropagation();
                a.submit();
                return
            }
            var c = d.val();
            if (c.length >= 421) {
                c = c.slice(0, 420);
                a.$input.val(c);
                a.$length.text(c.length + "/420");
                return
            }
            a.$length.text(c.length + "/420");
            clearTimeout(a.embedCheck);
            if (!validURL(c)) {
                a.$info.removeClass("loading");
                return
            } else {
                a.$info.addClass("loading")
            }
            a.embedCheck = setTimeout(function() {
                $.embedly.oembed(c, {
                    maxWidth: 490,
                    maxHeight: 450
                }).progress(function(g) {
                    if (g.type === "error") {
                        a.removeMediaPreview();
                        a.$info.removeClass("loading");
                        return
                    }
                    var e = /twitter\.com\/.+\/status\//.test(c);
                    if (g.type === "link" && !e) {
                        return
                    }
                    a.removeMediaPreview();
                    if (g.provider_name == "YouTube") {
                        g.html = a.youtubeEmbed(g.original_url, g.html)
                    }
                    var f = a.customizePreviewData(g);
                    a.addMediaPreview(f)
                })
            }, 300)
        })
    },
    setEnabledState: function(a) {
        if (!spree.user.producer) {
            this.$container.attr("disabled", !a);
            this.$input.attr("disabled", !a);
            if (!a) {
                this.onblur()
            }
        }
    },
    onfocus: function() {
        console.log("ScreenQueueInput::onfocus");
        this.$container.addClass("focused");
        this.$input.addClass("focused")
    },
    onblur: function() {
        console.log("ScreenQueueInput::onblur");
        this.$container.removeClass("focused");
        this.$input.removeClass("focused")
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
            b.removeMediaPreview()
        });
        this.$info.removeClass("loading").addClass("hide");
        $("#preview-container").append(d);
        this.$input.addClass("preview-engaged");
        d.find(".media-preview-desc").ellipsis();
        this.embedData = e
    },
    removeMediaPreview: function() {
        this.embedData = null;
        this.$input.removeClass("preview-engaged");
        $(".media-preview").remove();
        this.$info.removeClass("hide")
    },
    submit: function() {
        var a = this;
        if (Spree.shouldBlockUser() || this.checkBlockQuestion()) {
            Spree.blockUser("question", "注册或登录提问");
            return false
        }
        var d = this.$input.val();
        if (!d && !this.embedData) {
            return
        }
        clearTimeout(a.embedCheck);
        var c = {
                event_id: spree.event.event_id,
                text: d,
                role: spree.user.role,
                embed: this.embedData
            },
            b = this.embedData ? "/media_items" : "/questions/create";
        this.$submit.attr("disabled", true);

        this.ec.questionController().submit(c, b, function() {
            delete a.embedData;
            var f = $("#queue-info");
            var e = spree.hbTemplate("queue-input-submitted", {
                question_submitted: true
            });
            f.addClass("submitted");
            f.append(e);
            a.clear();
            a.$length.text("0/420");
            window.setTimeout(function() {
                e.remove();
                f.removeClass("submitted");
                a.$submit.attr("disabled", false)
            }, 3000)
        }, function(g, e, f) {
            var h = $("#queue-info");
            var i = spree.hbTemplate("queue-input-submitted", {
                question_submitted: false,
                error_message: JSON.parse(g.responseText).error
            });
            h.addClass("submitted");
            h.append(i);
            window.setTimeout(function() {
                i.remove();
                h.removeClass("submitted");
                a.$submit.attr("disabled", false)
            }, 3000)
        })

    },
    clear: function() {
        this.$input.val("");
        this.$input.blur();
        this.removeMediaPreview()
    },
    checkBlockQuestion: function() {
        if (!spree.user.producer && !spree.event.questions_enabled) {
            spree.blockWithTakeQuestionsCommentsDisabled();
            return true
        }
        return false
    }
});
ScreenQueueInput.addMixin(MediaParse);
var ScreenQueue = Class.extend({
    init: function(b) {
        var a = this;
        this.$queue = $("#question-list");
        this.input = new ScreenQueueInput(b);
        this.updatesLeft = 0;
        this.updateInProgress = false;
        this.indexOffsets = [];
        this.insertions = {
            Question: {},
            MediaItem: {}
        };
        this.insertionBuffer = [];
        this.deletions = {
            Question: {},
            MediaItem: {}
        };
        this.deletionBuffer = [];
        this.myVotes = {
            Question: {},
            MediaItem: {}
        };
        this.scores = {
            Question: {},
            MediaItem: {}
        };
        this.eventController = b;
        this.bindEvents()
    },
    animateUndo: function(d, f, e) {
        var c = this.getQueueItem(d, f);
        var b = c.find(".reaction-icon");
        this.stopFaceAnimation(b);
        var a = e == 1 ? -1 : 1;
        this.startNumberAnimation(c.find(".vote-feedback[data-vote=" + a + "]"))
    },
    animateVote: function(c, f, e) {
        var b = this.getQueueItem(c, f);
        var d = b.find(".vote-button[data-vote=" + e + "]");
        var a = b.find(".reaction-icon");
        this.stopFaceAnimation(a);
        this.startButtonAnimation(d);
        this.startFaceAnimation(e, a);
        this.startNumberAnimation(b.find(".vote-feedback[data-vote=" + e + "]"))
    },
    applyUpdateDeletions: function(b) {
        var a = this;
        _.each(this.serializeQuestionList(), function(e, d) {
            var c = a.getItemIndex({
                id: e.id,
                type: e.type
            }, b);
            if (c < 0) {
                a.insertions[e.type][e.id] = d
            }
        })
    },
    applyUpdateInsertions: function(a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b].type;
            var d = a[b].id;
            if (!this.getQueueItem(c, d).length) {
                this.deletions[c][d] = b
            }
        }
    },
    bindEvents: function() {
        var a = this;
        if (spree.user.producer) {
            $("#question-toggle-wrapper").click(function() {
                $(this).toggleClass("starred");
                a.$queue.toggleClass("hide-unstarred-questions");
                a.$queue.toggleClass("producer-starred")
            })
        }
        this.$queue.on("click", ".toggle-content", function(b) {
            b.stopPropagation()
        });
        this.$queue.on("click", ".user-name, .reaction-wrapper", function(c) {
            var b = $(c.target).data("user-id");
            if (b) {
                Facecard.create(b, {
                    coords: {
                        x: c.pageX,
                        y: c.pageY
                    }
                })
            }
        });
        this.$queue.on("click", ".vote-button", function(c) {
            if (!spree.user.has_been_authenticated) {
                spree.loginMgr.showSignup("vote", true, null, {
                    signUpText: "Sign up to vote on questions"
                });
                return
            }
            if (!spree.eventIsScheduledOrLive()) {
                return
            }
            var f = $(this).parents(".queue-content-wrapper");
            var h = f.data("id"),
                b = f.data("type");
            var g = $(this).data("vote");
            var d = a.myVotes[b][h];
            if (d && g != d) {
                a.eventController.voteController().submit(h, b, g, spree.event.status, function() {
                    a.undoVote(b, h);
                    a.vote(b, h, g)
                })
            } else {
                if (d) {
                    a.eventController.voteController().submit(h, b, 0, spree.event.status, function() {
                        a.undoVote(b, h)
                    })
                } else {
                    a.eventController.voteController().submit(h, b, g, spree.event.status, function() {
                        a.vote(b, h, g)
                    })
                }
            }
        });
        this.$queue.on("click.star", ".star-field", function(d) {
            d.preventDefault();
            var b = $(this).parents("[data-id]");
            var f = a.getItemSubject(b);
            var c = b.hasClass("starred") ? "Unstar" : "Star";
            var g = b.attr("data-id");
            a.eventController.producerController()[f + c](g)
        });
        this.$queue.on("click.delete", ".trash-can-svg", function(c) {
            c.preventDefault();
            var b = $(this).parents("[data-id]");
            a.eventController.producerController()[a.getItemSubject(b) + "Withdraw"](b.data("id"), function() {
                $("#external-media").modal("hide")
            })
        });
        this.$queue.on("click", ".put-on-screen", function(f) {
            f.preventDefault();
            var d = $(this);
            d.attr("disabled", true);
            var b = $(this).parents("[data-id]");
            var c = a.getItemSubject(b);
            a.eventController.producerController()[c + "OnAir"](b.data("id"), null, function() {
                d.attr("disabled", false)
            })
        })
    },
    computeAnimationOffsets: function(f) {
        var b = this.indexOffsets.length;
        var a = [];
        for (var d = 0; d < b; d++) {
            a[d] = 0
        }
        var e, g, c;
        for (e in f) {
            for (g in f[e]) {
                c = f[e][g];
                this.decrementAfterIndex(c, a)
            }
        }
        return a
    },
    computeIndexOffsets: function() {
        var b, c, a;
        for (b in this.deletions) {
            for (c in this.deletions[b]) {
                a = this.deletions[b][c];
                this.decrementAfterIndex(a, this.indexOffsets)
            }
        }
        for (b in this.insertions) {
            for (c in this.insertions[b]) {
                a = this.insertions[b][c];
                this.incrementFromIndex(a, this.indexOffsets)
            }
        }
    },
    decrementAfterIndex: function(a, c) {
        for (var b = a + 1; b < c.length; b++) {
            c[b]--
        }
    },
    displayScore: function(d, g) {
        var b = Math.max(0, this.scores[d][g]);
        var c = this.getQueueItem(d, g);
        c.find(".vote-scoring .vote").html(b);
        var e = c.find(".vote-button[data-vote=1]");
        var f = c.find(".vote-button[data-vote=-1]");
        var a = this.myVotes[d][g];
        switch (a) {
            case 1:
                e.addClass("voted", true);
                f.removeClass("voted");
                break;
            case -1:
                e.removeClass("voted");
                f.addClass("voted", true);
                break;
            default:
                e.removeClass("voted");
                f.removeClass("voted");
                break
        }
        e.setTooltip();
        f.setTooltip()
    },
    finishUpdates: function() {
        var a = this;
        _.each(this.$queue.find(".queue-content[data-destination]"), function(d) {
            var c = $(d);
            var e = c.parent();
            var b = parseInt(c.attr("data-destination")) - 1;
            e.detach();
            e.attr("style", "");
            e.removeAttr("style");
            c.attr("data-destination", "");
            c.removeAttr("data-destination");
            a.$queue.find("[data-position=" + b + "]").append(e)
        });
        this.updateInProgress = false;
        this.resetIndexOffsets();
        this.performBufferedTasks()
    },
    getItemIndex: function(c, a) {
        for (var b = 0; b < a.length; b++) {
            if (a[b].id === c.id && a[b].type === c.type) {
                return b
            }
        }
        return -1
    },
    getItemSubject: function(a) {
        var b = a.data("type");
        return b.charAt(0).toLowerCase() + b.slice(1)
    },
    getPixelDiff: function(b, a) {
        return ((a - b) * 95) + "px"
    },
    getQueueItem: function(a, b) {
        return $(ScreenQueue.queueItemSelector(a, b))
    },
    identifyUnstarred: function(a) {
        var d;
        var c = {
            Question: {},
            MediaItem: {}
        };
        for (var b = 0; b < a.length; b++) {
            d = this.getQueueItem(a[b].type, a[b].id);
            if (!d.hasClass("starred")) {
                c[a[b].type][a[b].id] = b
            }
        }
        return c
    },
    incrementFromIndex: function(a, c) {
        for (var b = a; b < c.length; b++) {
            c[b]++
        }
    },
    initQuestionCardModal: function(a) {
        a.find(".question-add-to-screen").click(function(b) {
            b.preventDefault();
            var c = $(this).parents("[data-question-id]").attr("data-question-id");
            spree.ecma.eventController.producerController().questionOnAir(c, function() {
                a.modal("hide")
            }, function() {
                a.modal("hide")
            })
        })
    },
    insert: function(f) {
        if (this.updateInProgress) {
            console.log("buffering insert", f);
            this.insertionBuffer.push(f);
            return
        }
        $("#viewer-queue").removeClass("empty");
        var g = this.questionCount();
        this.indexOffsets.push(0);
        var h = spree.hbTemplate("queue-slot", {
            position: g
        });
        this.$queue.append(h);
        var n = f.question || f.mediaItem;
        var b = n.id();
        var p = n.modelName() === "question" ? "Question" : "MediaItem";
        var d = n.voteTotal() || 0;
        var j = n.myVote(spree.user.alt);
        var l = {
            id: b,
            type: p,
            text: n.text(),
            classList: ScreenQueue.getClasses(n).join(" "),
            voteScore: d,
            user: {
                thumb: spree.generateProfilePhotoAddress(n.user(), "large"),
                name: n.user().name(),
                id: n.user().alt(),
                isProducer: spree.user.producer
            },
            viewerRank: ScreenQueue.destinationDisplay(g)
        };
        var c = $("<p>" + n.text() + "</p>");
        l.text = c.html();
        var o;
        if (n.url) {
            l.title = n.title() || l.text;
            l.imageURL = n.imageURL();
            l.embed = n.embed();
            l.url = n.url();
            l.profileImage = n.user().profilePhotoThumbUrl_100x100();
            l.ownerId = n.user().alt();
            l.ownerName = n.user().name();
            l.description = n.description()
        }
        this.scores[p][b] = d;
        if (j != null) {
            this.myVotes[p][b] = j
        }
        o = spree.hbTemplate("queue-item", l);
        var m = this;
        o.find(".media-image").bind("load", function() {
            o.find(".media-description").multiLine({
                rows: 2
            })
        });
        this.$queue.find("[data-position=" + g + "]").append(o);
        o.on("click", ".question-show-more", function(s) {
            var r = {
                id: b,
                type: p,
                classList: ScreenQueue.getClasses(n).join(" "),
                voteScore: d,
                closeable: true,
                hbTemplateName: "question-popup",
                noBackdrop: true,
                user: {
                    id: n.user().id(),
                    name: n.user().name(),
                    thumbUrl: spree.generateProfilePhotoAddress(n.user(), "large"),
                    about: n.user().aboutMe(),
                    is_locked: n.user().is_locked,
                    isProducer: (spree.user.producer && spree.event.status != 2)
                },
                controls: {
                    live_event: spree.eventIsScheduledOrLive(),
                    id: b
                },
                coords: {
                    x: s.pageX,
                    y: s.pageY
                }
            };
            var q = $("<p>" + n.text() + "</p>");
            r.text = q.html();
            m.showQuestionCard(r)
        });
        if (n.user().alt() !== spree.user.alt) {
            this.mostRecentQuestion = o.data("id");
            var a = o.data("id");
            var k = $("#new-question-title");
            if (!k.hasClass("new-questions") && !(this.$queue.hasClass("hide-unstarred-questions") || this.$queue.hasClass("hide-all-questions"))) {
                var e = 50;
                var i = 95;
                $("#question-list-new").css("top", (g * i) - e + "px");
                k.addClass("new-questions")
            }
            setTimeout(function() {
                if (m.mostRecentQuestion === a) {
                    k.removeClass("new-questions")
                }
            }, 5000)
        } else {
            o.find(".trash-can-wrapper").addClass("visible")
        }
        o.addClass("new-question");
        setTimeout(function() {
            o.removeClass("new-question")
        }, 30000);
        this.displayScore(p, b);
        this.insertions[p][b] = g
    },
    performBufferedTasks: function() {
        while (this.deletionBuffer.length > 0) {
            var a = this.deletionBuffer.splice(0, 1)[0];
            this.remove(a)
        }
        while (this.insertionBuffer.length > 0) {
            var a = this.insertionBuffer.splice(0, 1)[0];
            this.insert(a)
        }
    },
    performScoreUpdates: function(t) {
        this.updateInProgress = true;
        this.setupScoreUpdates(t);
        if (t.length === 0) {
            this.finishUpdates();
            return
        }
        var c, h;
        var k = $("#question-toggle-wrapper").hasClass("starred");
        var q = this.$queue.hasClass("hide-unstarred-questions");
        var a = k || q;
        if (a) {
            var g = this.serializeQuestionList();
            var b = this.identifyUnstarred(g);
            var m = this.identifyUnstarred(t);
            c = this.computeAnimationOffsets(b);
            h = this.computeAnimationOffsets(m)
        }
        var n = this.indexOffsets.length;
        var e = this.indexOffsets[n - 1];
        var d, s, l, j, o, r;
        for (var p = 0; p < t.length; p++) {
            d = this.getQueueItem(t[p].type, t[p].id);
            if (!d.length) {
                this.scoreUpdated();
                continue
            }
            r = {
                origin: parseInt(d.parent().attr("data-position")),
                dest: (p >= n) ? (p + e) : (p + this.indexOffsets[p]),
                filtered: d.hasClass("starred") && a
            };
            if (!k) {
                r.animStart = r.origin + (r.filtered ? c[r.origin] : 0);
                r.animEnd = r.dest + (r.filtered ? h[r.dest] : 0);
                this.resortQuestion(d, r)
            }
            this.scores[t[p].type][t[p].id] = t[p].vote_total;
            if (t[p].votes) {
                var f = t[p].votes[spree.user.alt];
                if (f == null) {
                    delete this.myVotes[t[p].type][t[p].id]
                } else {
                    this.myVotes[t[p].type][t[p].id] = f
                }
            }
            this.displayScore(t[p].type, t[p].id);
            this.updateViewerRank(d, r.dest)
        }
    },
    questionCount: function() {
        return this.$queue.children().length
    },
    remove: function(b, f) {
        if (this.updateInProgress) {
            console.log("buffering remove", b);
            this.deletionBuffer.push(b);
            return
        }
        var h = this;
        var g = b.question || b.mediaItem;
        var i = g.modelName() === "question" ? "Question" : "MediaItem";
        var a = g.id();
        var e = this.getQueueItem(i, a);
        var d = e.parent();
        var c = parseInt(d.attr("data-position"));
        d.remove();
        this.upshift(c);
        this.repaint();
        if (this.insertions[i][a]) {
            delete this.insertions[i][a]
        } else {
            this.deletions[i][a] = c
        }
        if (this.questionCount() === 0) {
            $("#viewer-queue").addClass("empty")
        }
    },
    repaint: function() {
        this.$queue.css("webkitTransform", "rotateZ(0deg)");
        this.$queue[0].offsetHeight;
        this.$queue.css("webkitTransform", "")
    },
    resetIndexOffsets: function() {
        var b = this.questionCount();
        while (this.indexOffsets.length > b) {
            this.indexOffsets.pop()
        }
        for (var a = 0; a < this.indexOffsets.length; a++) {
            this.indexOffsets[a] = 0
        }
    },
    resortQuestion: function(a, d) {
        var c = this;
        var e = ScreenQueue.destinationDisplay(d.dest);
        a.children(".queue-content").attr("data-destination", e);
        if (!a.is(":visible") || d.animStart === d.animEnd) {
            this.scoreUpdated();
            return
        }
        var b = this.getPixelDiff(d.animStart, d.animEnd);
        performAfterTransition(a, function() {
            c.scoreUpdated()
        });
        a.translate(0, b, 0)
    },
    scoreUpdated: function() {
        this.updatesLeft--;
        if (this.updatesLeft === 0) {
            this.finishUpdates()
        }
    },
    serializeQuestionList: function() {
        var a = [];
        _.each($(".queue-content-wrapper"), function(b) {
            a.push({
                type: $(b).data("type"),
                id: $(b).data("id")
            })
        });
        return a
    },
    setupScoreUpdates: function(b) {
        var a = this;
        this.updatesLeft = b.length;
        this.syncLocalDiffs(b);
        this.computeIndexOffsets()
    },
    showQuestionCard: function(a) {
        if (spree.device !== "ipad") {
            $("#question-popup").modal("hide");
            this.$div = spree.modalMgr.create(a.hbTemplateName, this.initQuestionCardModal, null, a);
            position = this.computePosition(a.coords);
            this.$div.css(position);
            this.$div.draggable({
                containment: "body",
                revert: false,
                scroll: false,
                handle: ".modal-header"
            });
            this.$div.find(".description-about").multiLine({
                row: 3
            })
        }
    },
    startButtonAnimation: function(a) {
        a.one(animationend, function(b) {
            $(this).removeClass("jump")
        });
        a.addClass("jump")
    },
    startFaceAnimation: function(e, b) {
        var a = this;
        var c = e === 1 ? "up-vote-reaction-icon" : "down-vote-reaction-icon";
        var d = b.parent();
        b.addClass(c);
        d.addClass("cycle-fade");
        d.on(animationend, function(f) {
            a.stopFaceAnimation(b)
        })
    },
    startNumberAnimation: function(b) {
        var a = b.data("vote") === 1 ? "rise-fade" : "sink-fade";
        b.one(animationend, function(c) {
            $(this).removeClass(a)
        });
        b.addClass(a)
    },
    stopFaceAnimation: function(a) {
        var b = a.parent();
        b.off(animationend);
        b.removeClass("cycle-fade");
        a.removeClass("up-vote-reaction-icon").removeClass("down-vote-reaction-icon");
        b[0].offsetHeight
    },
    syncDeletionDiff: function(b) {
        var a = this;
        for (var d in a.deletions) {
            var c = Object.keys(a.deletions[d]);
            _.each(c, function(f) {
                var e = a.getItemIndex({
                    id: f,
                    type: d
                }, b);
                if (e < 0) {
                    delete a.deletions[d][f]
                }
            })
        }
    },
    syncInsertionDiff: function(a) {
        for (var b = 0; b < a.length; b++) {
            delete this.insertions[a[b].type][a[b].id]
        }
    },
    syncLocalDiffs: function(a) {
        this.syncInsertionDiff(a);
        this.syncDeletionDiff(a);
        this.applyUpdateDeletions(a);
        this.applyUpdateInsertions(a)
    },
    toggleEmptyQuestions: function(a) {
        if (this.questionCount() === 0 && !spree.user.producer) {
            $("#viewer-queue").toggleClass("empty", a)
        }
    },
    undoVote: function(a, c) {
        var b = this.myVotes[a][c];
        delete this.myVotes[a][c];
        if (b == 1) {
            this.scores[a][c] -= b
        }
        this.displayScore(a, c);
        this.animateUndo(a, c, b)
    },
    update: function(d) {
        var c = d.question || d.mediaItem,
            b;
        if (c.modelName() === "question") {
            b = "Question"
        } else {
            b = "MediaItem"
        }
        var a = this.getQueueItem(b, c.id());
        a.attr("class", ScreenQueue.getClasses(c).join(" "))
    },
    updateNewQuestions: function() {
        this.$queue.find(".new-question").removeClass("new-question")
    },
    updateViewerRank: function(b, a) {
        b.find(".queue-content").attr("data-viewer-rank", ScreenQueue.destinationDisplay(a))
    },
    upshift: function(b) {
        var a = this;
        _.each($(".question-listing"), function(c) {
            var d = parseInt($(c).attr("data-position"));
            if (d >= b) {
                $(c).attr("data-position", d - 1)
            }
        })
    },
    vote: function(a, c, b) {
        this.myVotes[a][c] = b;
        if (b == 1) {
            this.scores[a][c] += b
        }
        this.displayScore(a, c);
        this.animateVote(a, c, b)
    }
});
ScreenQueue.queueItemSelector = function(a, b) {
    return ("#" + (a + "_" + b))
};
ScreenQueue.destinationDisplay = function(b) {
    var a = b + 1;
    return (a < 10) ? ("0" + a) : a
};
ScreenQueue.getClasses = function(b) {
    var a = ["queue-content-wrapper"];
    if (b.user().alt() == spree.user.alt) {
        a.push("own-question")
    }
    if ( !! b.starTimestamp()) {
        a.push("starred")
    }
    return a
};
var ts = function() {
    return ("[" + (new Date()).toLocaleTimeString().split(" ")[0] + "]")
};
ScreenQueue.addMixin(MediaInteractions);
ScreenQueue.addMixin(FloatingContent);
var UserScroll = SpreeScroll.extend({
    init: function(d, b, c) {
        this.list = c.list;
        var a = this;
        this._super(d, b, c)
    },
    setContentPosition: function() {
        this._super();
        var a = 0;
        var d = -this.contentPosition;
        var b = this;
        var c = $(".viewer-type-listing");
        _.each(c, function(h) {
            var e = $(h);
            var j = e.data("type");
            var f = e.find(".viewer-list-heading");
            var i = e.find(".viewer-list").children().length;
            if (i === 0) {
                return
            }
            if (d > a) {
                var g = Math.min(d - h.offsetTop, (i * ViewerRail.USER_HEIGHT));
                f.css({
                    top: g
                })
            } else {
                f.css({
                    top: ""
                })
            }
            a += (i * ViewerRail.USER_HEIGHT);
            if (spree.user.producer || j !== ViewerRail.CATEGORY_CAMERAQUEUE) {
                a += ViewerRail.HEADER_HEIGHT
            }
        })
    },
    contentHeight: function() {
        var a = this.list.cachedHeight;
        return a
    }
});