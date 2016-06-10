var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

app.use(express.static('public'));

app.get('/', function(req, res){

  fs.stat(__dirname+"/storage/playlist.txt", function(err, stat) {
    if(err == null) {
        console.log('File exists');
        fs.unlink(__dirname+"/storage/playlist.txt");
    } else if(err.code == 'ENOENT') {
        // fs.writeFile('log.txt', 'Some log\n');
        return;
    } else {
        console.log('Some other error: ', err.code);
    }
});

    res.sendFile(__dirname + '/index.html');
});

app.get('/slave', function(req, res){
  res.sendFile(__dirname + '/slave.html');
});

app.get('/youtube', function(req, res){
  res.sendFile(__dirname + '/youtube.html');
});

app.get('/yt-slave', function(req, res){
  res.sendFile(__dirname + '/yt-slave.html');
});

app.get("/init-playlist.html", function(req, res) {

  fs.readFile(__dirname + "/storage/playlist.txt", 'utf8', function (err,data) {
    if (err) {
      console.log(err);
      return false;
    }

    res.end(data);
  });
});

io.on('connection', function(socket){

  console.log('a user connected: ', socket.id);

  socket.on('disconnect', function(){
   console.log('user disconnected');
  });

  socket.on('playlist.updated', function(t){
     io.emit('playlist.updated', t);

    // save playlist
    fs.appendFile(__dirname + "/storage/playlist.txt", t+"\r\n", function(err) {
          if(err) {
              return console.log(err);
          }
          console.log("The file was saved!");
      });
  });

  socket.on('track.played', function(link, host){
     io.emit('track.played', link, host);
  });

  socket.on('yttrack.played', function(vid){
     io.emit('yttrack.played', vid);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
