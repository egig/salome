var ROUTE_CONFIG = (function($) {

  return {
     init: function(router, nunjucks) {
       router.on({
           '/list/:id': function (param) {

             $.get('/api/playlist/'+param.id+'/tracks', function(tracks) {

                // @todo change this to react
                 var c =  nunjucks.render('tracks.html', {tracks: tracks, playlist_id: param.id});
                 $('#tracks-container').html(c);

                 App.currentPlaylistID =  param.id;

             });

           },
       });

       router.resolve();
     }
  }
})(jQuery);
