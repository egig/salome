(function($) {

  var socket = io();
  var playlist = $('#playlist');
  var audio = $('audio');

  $(track_chooser).change(function() {

    for (var i = 0; i<track_chooser.files.length; i++) {
      var url = URL.createObjectURL(track_chooser.files[i]);
      var h = "<li><a class='track' href="+url+">"+track_chooser.files[i].name+"</a></li>";
      socket.emit('playlist.updated', h);
    }
  });

  socket.on('playlist.updated', function(h){
    playlist.append(h);
  });

  socket.on('track.played', function(link, host){

    console.log(link);
    console.log(socket.id);
    //if(socket.id == host) {
      run(link, audio[0]);
    //}

  });

  var playlist;
  var tracks;
  var current;

  init();
  function init(){
      current = 0;
      playlist = $('#playlist');
      tracks = playlist.find('li a.track');

      var len = tracks.length - 1;
      audio[0].volume = .10;
      //audio[0].play();

      $(document).on('click', 'a.track', function(e){
          e.preventDefault();
          var a = $(this);
          current = a.parent().index();
          // run(link, audio[0]);
          var link = a.attr('href');

          socket.emit('track.played', link, socket.id);
      });

      audio[0].addEventListener('ended',function(e){
          current++;
          if(current == len){
              current = 0;
              link = playlist.find('a.track')[0];
          }else{
              link = playlist.find('a.track')[current];
          }

           run($(link).attr("href") , audio[0]);
          //socket.emit('track.played', link);
      });
  }

  function run(link, player){
      player.src = link
      audio[0].load();
      audio[0].play();
  }

  playlist.load("/init-playlist.html");

})(jQuery);
