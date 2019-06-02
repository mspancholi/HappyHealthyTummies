var mongoose = require("mongoose");
  
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
var UserSchema = new Schema({
  userID: {
    type: String,
    index: {unique: true, dropDups: true},
    required: true
  },
  userName: { type:String },
  calories: { type: Number },
  carbs: { type: Number },
  protein: { type: Number },
  sugars: { type: Number }
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the Note model
module.exports = User;
