var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  res.render('index.html')
});

router.get('/player', function(req, res) {
  res.render('player.html')
});

router.get('/playlist*', function(req, res) {
  var viewData = {
    youtubeApiKey: req.app.get('config').salome.youtubeApiKey
  }
  res.render('playlist.html', viewData)
});

router.get('/api/playlists', function(req, res) {

    var knex = req.app.get('knex');
    knex('playlists').select('*').then(function(playlists){
        return res.json(playlists);
    });
});

router.get('/api/playlist/:id/tracks', function(req, res) {

    var id = req.params.id;
    var knex = req.app.get('knex');
    knex.select('tracks.*', 'playlists_tracks.playlists_id', 'playlists_tracks.id as pltrackid')
      .from('playlists_tracks')
      .where('playlists_tracks.playlists_id', id)
      .leftJoin('tracks', 'tracks.id', 'playlists_tracks.tracks_id')
      .then(function(tracks){
          return res.json(tracks);
      });

});

module.exports = router;
