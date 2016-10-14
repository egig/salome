var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: '',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

var CURRENT_PLAYLIST_ID = null;

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {

    var listc = $('ul.track-list').find('li');

    if(PLAYER.currentIndex == (listc.length-1)) {
      PLAYER.currentIndex = 0;
    } else {
      PLAYER.currentIndex += 1;
    }

    var nextVid = listc.eq(PLAYER.currentIndex).find('a.track').data('id');

    socket.emit('track.played', nextVid, PLAYER.currentIndex);
  }
}

function onPlayerReady() {
     // listen event
     socket.on('track.played', function(video_id, index){
       player.loadVideoById(video_id);
       player.playVideo();
     });
}

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
