var express = require('express');
var router  = express.Router();
var jwt = require('jsonwebtoken');

router.get('/login', function(req, res) {
    res.render('login.html');
});

router.post('/login', function(req, res) {
    if(!req.body._email) {
        return res.status(400).send('Email requried');
    }

    if(!req.body._password) {
        return res.status(400).send('Password requried');
    }

    /*User.findOne({where: {email: req.body.email}}).then(function(user){

        // @todo validate password
        if(!user){
            return res.status(403).send('Invalid username or password');
        }

        var token = jwt.sign({email: req.body.email}, 's3cr3t');
        return res.status(200).json(token);
    });*/
});

router.get('/signup', function(req, res) {
    res.render('signup.html');
});

router.post('/signup', function(req, res) {
  return res.json({});
});


module.exports = router;
