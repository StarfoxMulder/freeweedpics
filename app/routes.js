module.exports = function(app, passport) {

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
  });
  app.get('/upload', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/upload.html'));
  });
  app.get('/evelyn', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/evelyn.html'));

  /***** This is the correct syntax for posting an img
    cloudinary.uploader.upload("./public/weedBkg1.jpg", function(result) { 
      console.log(result) 
    });
  */
  });
  app.get('/dashboard', isLoggedIn, function(req, res) {
    res.sendFile(path.join(__dirname + '/views/dashboard.html'));    
  });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}