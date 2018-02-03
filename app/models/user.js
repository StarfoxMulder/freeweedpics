var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
//var Schema = mongoose.Schema;

// Creating schema
var userSchema = mongoose.Schema({

  local            : {
    email        : String,
    password     : String,
  }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};


// Create the User model with the UserSchema
var User = mongoose.model("User", userSchema);

// Export the model
module.exports = User;