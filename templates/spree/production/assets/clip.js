var SpreeTimeline = Class.extend({
    init: function (opts) {
        var self = this;
        spree.clipMgr.timeline = this;
        _.each(opts, function (val, key) { self[key] = opts[key]; });
        $('input#clip_playback_start').val(spree.clipMgr.startTime);
        $('input#clip_playback_end').val(spree.clipMgr.endTime);
        $(document).click(function () { self.selectClip(); });
    }

    , addToolTips: function () {
        _.each($('#clip-timeline div'), function (el) {
            if ($(el).css('cursor') == 'e-resize') $(el).addClass('timeline-resize-right');
            if ($(el).css('cursor') == 'w-resize') $(el).addClass('timeline-resize-left');
        });
        _.each({
            '.timeline-resize-left': 'Click and drag to adjust start time'
            , '.timeline-resize-right': 'Click and drag to adjust end time'
            , '.zoom-in-icon': 'Zoom in on the timeline'
            , '.zoom-out-icon': 'Zoom out on the timeline'
            , '.left-caret-icon': 'Shift the timeline left'
            , '.right-caret-icon': 'Shift the timeline right'
            , '.timeline-customtime': 'Select a thumbnail image'
            , '#clip-preview': 'Preview your clip'

        }, function (text, selector) { $(selector).attr('title', text); });
        _.each($(".timeline-resize-left, .timeline-resize-right"), function (resize) {
            $(resize).append($("<i class='slide-bar-icon'></i>"))
        });
    }

    , bindEvents: function () {
        var self = this;
        links.events.addListener(this.timeline, 'timechange', function () {
            spree.clipMgr.showThumb(self.timeline.getCustomTime().getTime());
        });
        links.events.addListener(this.timeline, 'change', function () {
            var data = self.timeline.getData()[0];
            var timeOpts = { 'start' : data.start.getTime(), 'end' : data.end.getTime() };
            self.updateTimeFields(timeOpts);
            spree.clipMgr.populateTimes(timeOpts);
        });
        $("#clip-time-inputs input").change(function(){
            var start_time = spree.clipMgr.eventStartTime + 1000*(
                parseInt($("#start_time_hours").val())*3600 +
                parseInt($("#start_time_mins").val())*60 +
                parseInt($("#start_time_seconds").val()));
            var end_time = spree.clipMgr.eventStartTime + 1000*(
                parseInt($("#end_time_hours").val())*3600 +
                parseInt($("#end_time_mins").val())*60 +
                parseInt($("#end_time_seconds").val()));
            var timeOpts = {start: start_time, end: end_time}
            self.updateTimeFields(timeOpts);
            self.timeline.changeItem(0, {start: new Date(timeOpts.start), end: new Date(timeOpts.end) })
        });
    }

    , updateTimeFields: function (timeOpts) {
        if (timeOpts["start"]) {
            time = Math.max(timeOpts["start"], spree.clipMgr.eventStartTime);
            spree.clipMgr.startTime = time;
            $('input#clip_playback_start').val(time);
            spree.clipMgr.seek(time);
        }
        if (timeOpts["end"]) {
            time = Math.min(timeOpts["end"], spree.clipMgr.eventEndTime);
            spree.clipMgr.endTime = time;
            $('input#clip_playback_end').val(time);
        }
        spree.clipMgr.pause();
    }

    , selectClip: function () {
        if (this.timeline) {
            this.timeline.selectItem(0);
            this.timeline.redrawDragAreas();
            this.timeline.trigger('select');
        }
    }

    , show: function () {
        this.timeline = new links.Timeline(this.$div[0]);
        this.timeline.draw(this.data, this.options);
        this.timeline.setVisibleChartRange(this.options.min, this.options.max);
        this.bindEvents();
        this.selectClip();
        this.addToolTips();
        spree.clipMgr.getThumbs();
    }

});

var SpreeClipManager = Class.extend({

    init: function (opts) {
        var self = this;
        _.each(opts, function (value, name) { self[name] = value; });
        this.startTime = this.eventStartTime;
        this.endTime = this.eventEndTime;
        this.spreecastLength = spree.stringifyTime(this.endTime - this.startTime);
        this.maxSeconds = Math.round((this.endTime - this.startTime)/1000);
        this.$div = $('#new-clip');
        this.bindEvents();
        this.populateTimes({start: this.clipStartTime, end: this.clipEndTime});
    }

    , bindEvents: function () {
        var self = this;
        this.bindFormEvents();
        this.bindKeyEvents();
        $('#broadcast_wrapper .notice .remove').on('click', function () { self.deselectThumb(); });
        $('#clip-preview').on('click', function () { self.preview(); });
        $('.toggle-clip').on('click', function() { self.toggleClip() });
        $('.go-back').on('click', function() { history.back() });
        $(document).on('click', '#clip-done-button', function() {
            window.location.href = $('#clip_url').attr('href');
        });
    }

    , toggleClip: function () {
        if (Spree.shouldBlockUser()) { return false; }

        if ($('#clip_url').val()) return window.location.href = $('#clip_url').val();
        this.$div.toggle();
        this.reset();
        if (!this.channels) this.getChannels();
        this.timeline.show();
        this.toggleEditButton();
        spree.recommended.hideRecommendedContent();
        if (this.editingClip()) {
            window.location.hash = "#broadcast_wrapper"
        }
    }

    , toggleEditButton: function () {
        if (this.editingClip()){
            $(".toggle-clip.create-clip").hide()
            $(".toggle-clip.cancel-clip").show()
        }
        else {
            $(".toggle-clip.create-clip").show()
            $(".toggle-clip.cancel-clip").hide()
        }
    }

    , editingClip: function () {
        return $("#new_clip").is(":visible");
    }

    , bindFormEvents: function () {
        var self = this;
        this.$div.find('form').on({
            'ajax:beforeSend': function (e) {
                if (self.timeOutOfRange) return false;
                $('#clip-cancel, #clip_submit, #event_main .notice').hide();
                self.reset();
            }
            , 'ajax:complete': function () { $('#clip-cancel, #clip_submit').show();  }
            , 'ajax:error': function (e, data) { $('#main_error.error_field').addClass('error').text(data.responseText); }
            , 'ajax:success': function (e, data) {
                $(".toggle-clip").hide()
                $('#new-clip').html(data);
            }
        });
    }

    , bindKeyEvents: function () {
        var self = this;
        $('#clip-time-fields input[type=text]').on({
            'keydown': function (e) {
                var code = e.keyCode ? e.keyCode : e.which
                    , chr = String.fromCharCode(code);
                if ((code > 31 || code > 126) && !chr.match(/\d/)) { return e.preventDefault(); }
            }
            , 'change' : function () {
                var times = {start: self.startTime, end: self.endTime}
                    , pos = $(this).attr('id').split('_')[0]
                    , getVal = function (pos, part) {
                        var val = parseInt($('input#' + pos + '_time_' + part).val().replace(/^0+/,''));
                        return isNaN(val) ? 0 : val;
                    };
                times[pos] = self.eventStartTime + ((getVal(pos, 'hours') * 3600) +
                (getVal(pos, 'mins') * 60) +
                (getVal(pos, 'seconds'))) * 1000;

                if ( (times['start'] < 0) || (times['start'] >= times['end']) || (times['end'] > self.eventEndTime) ) {
                    times = {start: self.startTime, end: self.endTime};
                } else {
                    self.seek(times[pos]);
                    self.pause();
                }
                self.populateTimes(times);
                self.timeline.timeline.setData([{start: new Date(times['start']), end: new Date(times['end']), content: 'clip'}]);
                self.timeline && self.timeline.selectClip();
            }
        });
    }

    , getChannels: function () {
        var self = this;
        $.get('/channels', function (data) {
            self.channels = data;
            _.each(self.channels, function (channel) {
                $('select#clip_channel_id').append($('<option>', {value: channel[1]}).html(channel[0]));
            });
            self.$div.find('select').selectmenu({style: 'dropdown'});
            if (self.channels.length < 2) {
                $("#clip_channel_id-button").hide()
            }
        });
    }

    , getThumbs: function () {
        return;
        var self = this;
        $.get(['', 'events', spree.event.friendly_id, 'screenshots'].join('/'), function (data) {
            self.thumbData = data;
            self.timeline.timeline.setCustomTime(new Date(spree.clipMgr.eventStartTime));
        });
    }

    , pad: function (n) {
        return( ((n < 10) ? '0' : '') + n);
    }

    , pause: function () {
        delete this.isPlaying;
        $('#clip-preview').removeClass('pause');
        spree.ecma.eventController.unsubscribe('ARCHIVE_TIMESTAMP', this.ecmaSub);
        document.broadcast.pause && document.broadcast.pause();
    }

    , populateTimes: function (opts) {
        var self = this;
        _.each(opts, function (time, attr) {
            self[attr+'Time'] = time;
            var seconds = parseInt((time - self.eventStartTime)/1000)
                , hours = Math.floor(seconds/3600)
                , mins = Math.floor((seconds - (hours * 3600))/60)
                , base = 'input#' + attr + '_time_';
            seconds -= (hours * 3600) + (mins * 60);

            $(base + 'seconds').val(self.pad(seconds));
            $(base + 'mins').val(self.pad(mins));
            $(base + 'hours').val(self.pad(hours));
            $('input#clip_playback_' + attr).val(time);
        });
        this.timeline && this.timeline.selectClip();
    }

    , preview: function () {
        var self = this;
        if (this.isPlaying) return this.pause();
        this.isPlaying = true;
        $('#clip-preview').addClass('pause');
        document.broadcast.seek(this.startTime - this.eventStartTime); // seek video to changed time
        this.ecmaSub = spree.ecma.eventController.subscribe('ARCHIVE_TIMESTAMP', function (e) {
            if ((e.timestamp * 1000) >= self.endTime) {
                self.pause();
            }
        });
    }

    , reset: function () {
        this.resetPreview();
        $('.error_field').removeClass('error').empty();
    }

    , resetPreview: function () {
        var classes = 'initial fullscreen splitscreen triscreen quadscreen thumbnail-notice';
        $('#event_stage').removeClass(classes);
        $('#broadcast_wrapper').removeClass(classes).children('img').remove();
    }

    , seek: function (time) {
        spree.spreecast.setBroadcastVideoDigest('archive', spree.spreecast.videoDigest);
        document.broadcast.seek(time - this.eventStartTime); // seek video to changed time
    }

    , setSelect: function (start, end) {
        var $el = $('#clip-resizor')
            , totalLength = this.endTime - this.startTime
            , width = $el.parent().width();
        $el.css({ left: ((start * 1000) / totalLength ) * width
            , width: (((end - start) * 1000) / totalLength) * width });
    }

    , showThumb: function (time) {
        var data = spree.clipMgr.thumbData;
        var idx = spree.binarySearch(data.time_stamps, time/1000);
        if (idx >= data.time_stamps.length) idx = data.time_stamps.length - 1;
        var imgs = _.pluck(data.data[data.time_stamps[idx]].data, 'url');
        //    $('.notice img').attr('src', imgs[0]).show();
        //   $('.notice').show();
    }

});