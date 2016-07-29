var express = require('express');
var router = express.Router();


/* GET playlists listing. */
router.get('/playlists', function(req, res) {

    var knex = req.app.get('knex');
    knex('playlists').select('*').then(function(playlists){
        return res.json(playlists);
    });
});

/* GET playlists listing. */
router.get('/playlist/:id/tracks', function(req, res) {

    var knex = req.app.get('knex');
    knex.select('tracks.*', 'playlists_tracks.playlists_id')
      .from('playlists_tracks')
      .leftJoin('tracks', 'tracks.id', 'playlists_tracks.tracks_id')
      .then(function(tracks){
          return res.json(tracks);
      });

});

module.exports = router;
