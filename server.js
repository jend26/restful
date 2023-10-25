var express = require('express');
var app = express();
var fs = require("fs");

// List Song

app.get('/listSongs', function (req, res) {
   fs.readFile( __dirname + "/" + "songs.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

// Add Song

var song = {
    "song6" : {
        "name" : "Bad Day",
        "artist" : "Daniel Powter",
        "genre" : "Pop",
        "link": "https://youtu.be/-reIEyYxgxA",
        "id": 6
    }
 }
 
 app.post('/addSong', function (req, res) {
   // First read existing songs.
   fs.readFile( __dirname + "/" + "songs.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      data["song6"] = song["song6"];
      console.log( data );
      res.end( JSON.stringify(data));
   });
})

// Delete Song

var id = 2;

app.delete('/deleteSong', function (req, res) {
   // First read existing songs.
   fs.readFile( __dirname + "/" + "songs.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["song" + 2];
       
      console.log( data );
      res.end( JSON.stringify(data));
   });
})

// Show Detail

app.get('/:id', function (req, res) {
   // First read existing songs.
   fs.readFile( __dirname + "/" + "songs.json", 'utf8', function (err, data) {
      var songs = JSON.parse( data );
      var song = songs["song" + req.params.id] 
      console.log( song );
      res.end( JSON.stringify(song));
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})