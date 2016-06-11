window.PLAYER = (function($) {

  var socket = io();

  function get_vid(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      //error
    }
  }

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.

  return {

    init:function(apiKey, playlistId, player) {

      this.listenDeleteTrack();
      this.listenAddPlaylist();
      this.listenSocketEvents(player);
      this.listenAddTrack(apiKey, playlistId);
      this.listenTrackPlayed();
      this.listenChangePlaylist();

    },

    listenChangePlaylist: function() {
      $(document).on("click", 'a.playlist-item', function(e){
        e.preventDefault();
        var plid  = $(this).data('plid');
        socket.emit("playlist-changed", plid);
      });
    },

    listenDeleteTrack: function() {
      $(document).on("click", '.delete-track', function(e){
        var pltrackid = $(this).data("pltrack-id");
        socket.emit("delete-track", pltrackid);
      });
    },

    listenAddPlaylist: function() {

      $(add_playlist_form).on("submit", function(e) {
        e.preventDefault();
         var plname = add_playlist_form.playlist_name.value;
         socket.emit("new-playlist", plname);
       });

    },

    listenSocketEvents: function(player) {
      socket.on('new-playlist', function(plname) {
          window.location.reload(true);
      });

      socket.on('delete-track', function(plname) {
          window.location.reload(true);
      });

      socket.on('playlist-changed', function(plid) {
          window.location.replace(plid);
      });

      socket.on('yttrack.played', function(video_id){
        player.loadVideoById(video_id);
        player.playVideo();
      });

      socket.on('ytplaylist.updated', function(video, plid) {
          $(playlist).prepend('<li><a class="track" data-id="'+video.id+'" href="javascript:;"><img height="40px"  src="'+video.snippet.thumbnails.medium.url+'">'+video.snippet.title+'</a></li>');
      });
    },

    listenAddTrack: function(apiKey, playlistId) {
      $(add_track_form).on('submit', function(e) {
        e.preventDefault();
        var url = $(yt_url).val();
        var video_id = get_vid(url);

        $.getJSON("https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+video_id+"&key="+apiKey,
        function(data){
          socket.emit('ytplaylist.updated', data.items[0], playlistId);
        });
      });
    },

    listenTrackPlayed: function() {
      $(document).on('click', 'a.track', function(e) {
        e.preventDefault();
        var video_id = $(this).data('id');
        socket.emit('yttrack.played', video_id);
      });
    },
  }

})(jQuery);
