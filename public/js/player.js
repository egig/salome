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

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {

    var listc = $('li.media');

    if(PLAYER.currentIndex == (listc.length-1)) {
      PLAYER.currentIndex = 0;
    } else {
      PLAYER.currentIndex += 1;
    }

    var nextVid = listc.eq(PLAYER.currentIndex).find('a.track').data('id');

    socket.emit('yttrack.played', nextVid, PLAYER.currentIndex);
  }
}

function onPlayerReady() {
   // listent track played
     $(document).on('click', 'a.track', function(e) {
       e.preventDefault();

       var li = $(this).parents('li.media');

       var index = li.index();
       var video_id = $(this).data('id');
       socket.emit('track.played', video_id, index);
     });
}
