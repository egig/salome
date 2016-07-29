var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res) {

    var knex = req.app.get('knex');
    knex('playlists').select('*').then(function(playlists){
        return res.json(playlists);
    });
});

module.exports = router;
