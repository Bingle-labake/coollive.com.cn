      createAudio = function(e) {
        var audio = document.createElement('audio');
        var source = document.createElement('source');
        source.src = 'http://timg2.saiku.com.cn/static/assets/img/game/runfield/'+e+'.ogg';
        source.type = 'audio/ogg; codecs="vorbis"';
        audio.appendChild(source);
        var source = document.createElement('source');
        source.src = 'http://timg2.saiku.com.cn/static/assets/img/game/runfield/'+e+'.ogg.mp3';
        source.type = 'audio/mpeg; codecs="mp3"';
        audio.appendChild(source);
        return audio;
      }
