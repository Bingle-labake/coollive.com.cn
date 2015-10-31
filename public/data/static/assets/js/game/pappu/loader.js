(function () {

  var Obj = {};
  Obj.size = function(obj) {
      var size = 0, key;
      for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
      }
      return size;
  };

  // Preloading audio stuff
  var loadMusic = document.getElementById("start"),
      loadAngry = document.getElementById("angry_jump"), 
      loadSad = document.getElementById("sad_jump"),
      loadHappy = document.getElementById("happy_jump"),
      loadFlap = document.getElementById("flap"),
      loadTing = document.getElementById("ting");

  // Preloading image stuff

  mit.audio = [
    loadMusic, 
    loadAngry, 
    loadSad, 
    loadHappy,
    loadFlap, 
    loadTing,
  ];

  var images = {
    angry_pakia : "http://timg2.saiku.com.cn/static/assets/img/game/pappu/angry_pakia.png",
    backtrees : "http://timg2.saiku.com.cn/static/assets/img/game/pappu/back_trees.png",
    berries : "http://timg2.saiku.com.cn/static/assets/img/game/pappu/berries.png",
    bg_combined: "http://timg2.saiku.com.cn/static/assets/img/game/pappu/bg_combined.png",
    branch : "http://timg2.saiku.com.cn/static/assets/img/game/pappu/branch.png",
    clouds : "http://timg2.saiku.com.cn/static/assets/img/game/pappu/clouds.png",
    coins : "http://timg2.saiku.com.cn/static/assets/img/game/pappu/coins.png",
    controls : "http://timg2.saiku.com.cn/static/assets/img/game/pappu/controls.png",
    //dig : "http://timg2.saiku.com.cn/static/assets/img/game/pappu/dig.png",
    fork_handle : "http://timg2.saiku.com.cn/static/assets/img/game/pappu/fork_handle.png",
    fork_head : "http://timg2.saiku.com.cn/static/assets/img/game/pappu/fork_head.png",
    fronttrees : "http://timg2.saiku.com.cn/static/assets/img/game/pappu/front_trees.png",
    grass : "http://timg2.saiku.com.cn/static/assets/img/game/pappu/grass.png",
    ground : "http://timg2.saiku.com.cn/static/assets/img/game/pappu/ground.png",
    happy_pakia : "http://timg2.saiku.com.cn/static/assets/img/game/pappu/happy_pakia.png",
    log : "http://timg2.saiku.com.cn/static/assets/img/game/pappu/log.png",
    pappu : "http://timg2.saiku.com.cn/static/assets/img/game/pappu/pappu.png",
    plank_bot : "http://timg2.saiku.com.cn/static/assets/img/game/pappu/plank_bot.png",
    plank_mid : "http://timg2.saiku.com.cn/static/assets/img/game/pappu/plank_mid.png",
    plank_top : "http://timg2.saiku.com.cn/static/assets/img/game/pappu/plank_top.png",
    sad_pakia : "http://timg2.saiku.com.cn/static/assets/img/game/pappu/sad_pakia.png",
    stand : "http://timg2.saiku.com.cn/static/assets/img/game/pappu/stand.png",
    star : "http://timg2.saiku.com.cn/static/assets/img/game/pappu/star.png"
  };

  mit.image = {};

  // Get the size of an Obj
  var size = Obj.size(images);
  size += mit.audio.length;

  var counter = 0,
      percent = 0;

  var loading = document.getElementById("bar");
  var loader = document.getElementById("loading");
  var loadText = document.getElementById("loadText");

  if(!($.browser.webkit && !$.browser.chrome)) {
    for(var i = 0; i < mit.audio.length; i++) {
      var file = mit.audio[i];

      if (isNaN(file.duration)) { 
        file.addEventListener("loadeddata", function() {
          counter++;
          percent = Math.floor((counter/size*100));
          loading.style.width = percent + "%";
          loadText.innerHTML = "Loading... " + percent + "%";

          if(percent >= 100) {
            $("#loading").fadeOut();
            mit.main();
          }
        });
      }

      else {
        counter++;
        percent = Math.floor((counter/size*100));
        loading.style.width = percent + "%";
        loadText.innerHTML = "Loading... " + percent + "%";

        if(percent >= 100) {
          $("#loading").fadeOut();
          mit.main();
        }

      }
    }
  }

  else {counter += mit.audio.length}

  for(var src in images) {
    mit.image[src] = new Image();
    mit.image[src].onload = function() {
      counter++;

      percent = Math.floor(((counter)/size*100));
      loading.style.width = percent + "%";
      loadText.innerHTML = "Loading... " + percent + "%";
      
      if(percent >= 100) {
        $("#loading").fadeOut();
        mit.main();
      }

    };

    mit.image[src].src = images[src];
  }

}());