var App = (function(nunjucks, ROUTE_CONFIG, socket) {

  var router = null;

  return {
    init: function() {
      nunjucks.configure('/_tpl');
      router = new Navigo();
      ROUTE_CONFIG.init(router, nunjucks);

      this.loadPlaylists();
      this.listenSocketEvents();
      this.listenClickPlay();
    },

    loadPlaylists: function() {
      $.get('/api/playlists', function(playlists) {
          var plNav = nunjucks.render('playlist-nav.html', {playlists: playlists});
          $(playlistNav).html(plNav);

          router.updatePageLinks();
      });
    },

    listenClickPlay: function() {
      // listent track played
       $(document).on('click', 'a.track', function(e) {
         e.preventDefault();

         var li = $(this).parents('li');
         var index = li.index();
         var video_id = $(this).data('id');
         socket.emit('track.played', video_id, index);
       });
    },

    listenSocketEvents: function() {
          socket.on('new-playlist', function(plname) {
              window.location.reload(true);
          });

          socket.on('playlist.changed', function(plid) {
            $.get('/api/playlist/'+plid+'/tracks', function(tracks) {
                var c =  nunjucks.render('tracks.html', {tracks: tracks, playlist_id: plid});
                $('#tracks-container').html(c);
            });
          });

          socket.on('playlist-deleted', function(plid) {
              window.location.replace(1);
          });

          socket.on('delete-track-success', function(trackid, selector) {
              $(selector).slideUp();
          });

          socket.on('track.played', function(video_id, index){

            // player.loadVideoById(video_id);
            // player.playVideo();

            // @todo add playing state
          });

          socket.on('playlist-sorted', function(ids) {
              window.location.reload(true);
          });
    }

  }
})(nunjucks, ROUTE_CONFIG, socket);
