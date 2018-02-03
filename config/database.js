var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Creating schema
var UserSchema = new Schema({

  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  permission1: {
    type: String,
    required: false
  },
  permission2: {
    type: String
  }
});

// Create the User model with the UserSchema
var User = mongoose.model("User", UserSchema);

// Export the model
module.exports = User;