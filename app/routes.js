//module.exports = function(app, passport) {

  var express  = require('express');
  var app = express();
  var router = express.Router();
  var passport = require('passport');

  router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
  });
  router.get('/upload', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/upload.html'));
  });
  router.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/signup.html'));
  });
  router.get('/evelyn', function(req, res) {
    //res.sendFile(path.join(__dirname + '/views/evelyn.html'));

    res.render("evelyn");
  /***** This is the correct syntax for posting an img
    cloudinary.uploader.upload("./public/weedBkg1.jpg", function(result) { 
      console.log(result) 
    });
  */
  });
  router.get('/dashboard', isLoggedIn, function(req, res) {
    res.sendFile(path.join(__dirname + '/views/dashboard.html'));    
  });

  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/dashboard', // redirect to the secure dashboard section
    failureRedirect : '/signup' // redirect back to the signup page if there is an error
  }));
//};

module.exports = router;

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}