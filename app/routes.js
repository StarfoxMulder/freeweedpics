



router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});
router.get('/upload', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/upload.html'));
});
router.get('/evelyn', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/evelyn.html'));

/***** This is the correct syntax for posting an img
  cloudinary.uploader.upload("./public/weedBkg1.jpg", function(result) { 
    console.log(result) 
  });
*/
});