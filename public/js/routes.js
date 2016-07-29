var ROUTE_CONFIG = (function($) {

  return {
     init: function(router, nunjucks) {
       router.on({
           '/playlist/:id': function (param) {
               $.get('/api/playlist/'+param.id+'/tracks', function(tracks) {
                   var c =  nunjucks.render('tracks.html', {tracks: tracks, playlist_id: param.id});
                   $('#content').html(c);
               });
           },
           '/': function() {
               $('#content').html('home');
           }
       });

       router.resolve();
     }
  }
})(jQuery);
