var CURRENT_PLAYLIST_ID = null;
var CURRENT_INDEX = 0;

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('o-player', {
        height: '390',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        events: {
            'onReady': onReady
        }
    });
}

function onReady() {
    player.addEventListener('onStateChange', function(event) {

        if (event.data == YT.PlayerState.ENDED) {

          var listc = $('ul.track-list').find('li');

          if(CURRENT_INDEX == (listc.length-1)) {
            CURRENT_INDEX = 0;
          } else {
            CURRENT_INDEX += 1;
          }

          console.log("Current index: ",CURRENT_INDEX);

          var nextVid = listc.eq(CURRENT_INDEX).find('a.track').data('id');

          socket.emit('track.played', nextVid, CURRENT_INDEX, CURRENT_PLAYLIST_ID);
        }
    });

    listenSocketEvents();

    /*socket.on('track.played', function(video_id, index, plid){
      player.loadVideoById(video_id);
      player.playVideo();
    });*/
}


// Configuser view
nunjucks.configure('/_tpl');

function listenSocketEvents() {

      socket.on('playlist.changed', function(plid) {
        //..
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

      socket.on('track.played', function(video_id, index, plid){

        if(CURRENT_PLAYLIST_ID !== plid) {
          $.get('/api/playlist/'+plid+'/tracks', function(tracks) {
              var c =  nunjucks.render('tracks.html', {tracks: tracks, playlist_id: plid});
              $('#tracks-container').html(c);
              CURRENT_PLAYLIST_ID = plid;
          });
        }

        CURRENT_INDEX = index;

        player.loadVideoById(video_id);
        player.playVideo();

        // @todo add playing state
      });

      socket.on('playlist-sorted', function(ids) {
          window.location.reload(true);
      });
}
// listenSocketEvents();

function reloadPlaylist() {
  var plid = CURRENT_PLAYLIST_ID;
  $.get('/api/playlist/'+plid+'/tracks', function(tracks) {
      var c =  nunjucks.render('tracks.html', {tracks: tracks, playlist_id: plid});
      $('#tracks-container').html(c);
  });
}
