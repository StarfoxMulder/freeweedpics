var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var axios = require('axios');
var querystring = require('querystring');
var cloudinary = require('cloudinary');

require('dotenv').config();
app.use(express.static("./public"));

cloudinary.config({ 
  cloud_name: 'freeweedpics', 
  api_key: '936646858396893', 
  api_secret: 'biTDnB7Mxnxz5X2KP2WJhYKM8fM' 
});

var bodyParser = require('body-parser');
app.use( bodyParser.json() );

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/upload', function(req, res) {
  res.sendFile(path.join(__dirname + '/upload.html'));
});
app.get('/evelyn', function(req, res) {
  res.sendFile(path.join(__dirname + '/evelyn.html'));

/***** This is the correct syntax for posting an img
  cloudinary.uploader.upload("./public/weedBkg1.jpg", function(result) { 
    console.log(result) 
  });
*/
});

var instance = axios.create({
  baseURL: 'https://api.imgur.com/3/',
  headers: { 'Authorization': 'Client-ID ' + process.env.IMGUR_CLIENT_ID }
});

app.get('/search/:query', function(req, res) {
  const url = 'gallery/search/top/0/?' + querystring.stringify({ q: req.params.query });
  instance.get(url)
    .then(function (result) {
      res.send(result.data.data.filter(item => !item.is_album && !item.animated));
    })
    .catch(function (error) {
      console.log(error);
    })
  ;
});

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV !== 'production') {
  require('reload')(server, app);
}

server.listen(process.env.PORT, function () {
  console.log('Listening on port '.concat(process.env.PORT))
});
