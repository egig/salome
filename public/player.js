window.PLAYER = (function($, socket) {

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.

  return {

    init:function(player) {

      this.listenSocketEvents(player);

    },

    listenSocketEvents: function(player) {

      socket.on('yttrack.played', function(video_id){
        player.loadVideoById(video_id);
        player.playVideo();
      });
    }
  }

})(jQuery, socket);
