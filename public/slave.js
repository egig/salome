(function($) {

  var socket = io();
  var playlist = $('#playlist');

  socket.on('playlist.updated', function(h){
    playlist.append(h);
  });

  $(document).on('click', 'a.track', function(e){
      e.preventDefault();
      var a = $(this);
      current = a.parent().index();
      // run(link, audio[0]);
      var link = a.attr('href');

      socket.emit('track.played', link, socket.id);
  });

  playlist.load("/init-playlist.html");

})(jQuery);
