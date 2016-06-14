window.PLAYER = (function($, socket) {

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.

  return {
    currentIndex: 0,

    init:function(player) {

      this.listenSocketEvents(player);

    },

    listenSocketEvents: function(player) {

      var _this = this;
      socket.on('yttrack.played', function(video_id, index){
        player.loadVideoById(video_id);
        player.playVideo();

        _this.currentIndex = index;
      });

      socket.on('volume-updated', function(v){
          player.setVolume(v);
      });

    }
  }

})(jQuery, socket);
