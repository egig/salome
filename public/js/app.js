var App = (function(nunjucks, ROUTE_CONFIG, socket) {

  var router = null;

  return {
    currentPlaylistID: null,
    init: function() {
      nunjucks.configure('/_tpl');
      router = new Navigo();
      ROUTE_CONFIG.init(router, nunjucks);

      this.loadPlaylists();
      this.listenSocketEvents();
      this.listenClickPlay();
      this.handleSearchForm();
      this.lisenAddTrackFromSearch();
      this.handleNewPlaylist();
      this.listenDeleteTrack();
      this.listenDeletePlaylist();
    },

    listenDeletePlaylist: function() {
      $(document).on('click', 'a.playlist-delete', function(e) {
        e.preventDefault();

        if (!confirm("Are You Sure ?")) {
          return false;
        }

        console.log(App.currentPlaylistID);

        socket.emit('playlist.deleted', App.currentPlaylistID);
      })
    },

    listenDeleteTrack: function() {
      $(document).on('click', 'a.track-delete', function(e) {
        e.preventDefault();

        if (!confirm("Are You Sure ?")) {
          return false;
        }
        var trackid = $(this).data('track-id');
        socket.emit('track.deleted', trackid, App.currentPlaylistID);
      })

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
      var _this = this;
        socket.on('playlist.new', function(plname, plid) {
          _this.loadPlaylists();
        });

          socket.on('playlist.changed', function(plid) {
            $.get('/api/playlist/'+plid+'/tracks', function(tracks) {
                var c =  nunjucks.render('tracks.html', {tracks: tracks, playlist_id: plid});
                $('#tracks-container').html(c);
            });

            App.currentPlaylistID =  plid;
          });

          socket.on('track.played', function(video_id, index){
            // @todo add playing state
          });

          socket.on('track.added', function(video_id, title, thumbnail, plid){
            App.reloadPlaylist();
          });

          socket.on('track.deleted', function(video_id, plid){
            App.reloadPlaylist();
          });

          socket.on('playlist.deleted', function(plid){
            _this.loadPlaylists();
            router.navigate('/list/1'); //to default
          });
    },

    handleSearchForm: function() {
      $(document).on('keyup', '#search-q', function(e) {
        if($('#search-q').val().length < 3 ) {
          return;
        }

        $('#search-result').html('<ul class="mdl-list" id="video-list" style="border:none;">  </ul>');
        $('#search-result').show();

        var apiKey = 'AIzaSyCib4u1AhhD-AYScV1hmdskxjDEZJC7Jc8';
        var q = $('#search-q').val();
        var url = 'https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&key='+apiKey+'&q='+encodeURI(q);

        $.getJSON(url, function(data) {

            for(var i=0; i< data.items.length;i++ ) {
              nunjucks.render('video-item.html', { item: data.items[i] }, function(err, res){
                  if(err) {
                    console.log(err);
                  }

                  $('#video-list').append(res);
              });
            }

        });

      });
    },

    lisenAddTrackFromSearch: function() {
      $(document).on('click', '.add-track', function(e) {
        var video_id = $(this).data('video-id');
        var title = $(this).data('video-title');
        var thumbnail = $(this).data('video-thumbnail');
        socket.emit('track.added', video_id, title, thumbnail, App.currentPlaylistID);
        $('#search-result').hide();
      });
    },

    reloadPlaylist: function() {
      var plid = App.currentPlaylistID;
      $.get('/api/playlist/'+plid+'/tracks', function(tracks) {
          var c =  nunjucks.render('tracks.html', {tracks: tracks, playlist_id: plid});
          $('#tracks-container').html(c);
      });
    },

    handleNewPlaylist: function() {
      $('#add-playlist-form').on('submit', function(e){
        e.preventDefault();

        var name = $(this).find('[name="playlist-name"]').val();
          socket.emit('playlist.new', name);
      });
    }
  }
})(nunjucks, ROUTE_CONFIG, socket);
