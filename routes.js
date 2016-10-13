var express = require('express');
var router = express.Router();


router.get('/api/playlists', function(req, res) {

    var knex = req.app.get('knex');
    knex('playlists').select('*').then(function(playlists){
        return res.json(playlists);
    });
});

router.get('/api/playlist/:id/tracks', function(req, res) {

    var knex = req.app.get('knex');
    knex.select('tracks.*', 'playlists_tracks.playlists_id', 'playlists_tracks.id as pltrackid')
      .from('playlists_tracks')
      .leftJoin('tracks', 'tracks.id', 'playlists_tracks.tracks_id')
      .then(function(tracks){
          return res.json(tracks);
      });

});

module.exports = router;
