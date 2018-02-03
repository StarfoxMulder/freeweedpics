var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3030;
var path     = require('path');
var server   = require('http').createServer(app);
var axios    = require('axios');
var configDB = require('./config/database.js');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var querystring = require('querystring');
var cloudinary  = require('cloudinary');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// Configuration ==============
mongoose.connect(configDB.url); // connect to database

// require('./config/passport')(passport); // pass passport for configuration

require('dotenv').config();
//app.use(express.static("./public"));

cloudinary.config({ 
  cloud_name: 'freeweedpics', 
  api_key: '936646858396893', 
  api_secret: 'biTDnB7Mxnxz5X2KP2WJhYKM8fM' 
});


var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport




var instance = axios.create({
  baseURL: 'https://api.imgur.com/3/',
  headers: { 'Authorization': 'Client-ID ' + process.env.IMGUR_CLIENT_ID }
});

/*
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
*/

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV !== 'production') {
  require('reload')(server, app);
}

// launch ======================================================================
app.listen(port);
console.log("I got bags of funk and I sell'em by the ton on port " + port);
