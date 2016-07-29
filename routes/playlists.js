var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : 'pw',
    database : 'onlyp_test'
  }
});

/* GET users listing. */
router.get('/', function(req, res) {
    knex('playlists').select('*').then(function(playlists){
        return res.json(playlists);
    });
});

module.exports = router;
