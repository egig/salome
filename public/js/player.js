// Configuser view
nunjucks.configure('/_tpl');

function listenSocketEvents() {

      socket.on('playlist.changed', function(plid) {
        $.get('/api/playlist/'+plid+'/tracks', function(tracks) {
            var c =  nunjucks.render('tracks.html', {tracks: tracks, playlist_id: plid});
            $('#tracks-container').html(c);
            CURRENT_PLAYLIST_ID = plid;
        });
      });

      socket.on('track.added', function(video_id, title, thumbnail, plid){
        reloadPlaylist();
      });

      socket.on('track.deleted', function(video_id, plid){
        reloadPlaylist();
      });

      socket.on('playlist.new', function(plname) {
        //..
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
listenSocketEvents();

function reloadPlaylist() {
  var plid = CURRENT_PLAYLIST_ID;
  $.get('/api/playlist/'+plid+'/tracks', function(tracks) {
      var c =  nunjucks.render('tracks.html', {tracks: tracks, playlist_id: plid});
      $('#tracks-container').html(c);
  });
}
