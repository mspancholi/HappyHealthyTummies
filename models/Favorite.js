var mongoose = require("mongoose");
  
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
var FavoriteSchema = new Schema({
  userID: {
    type: String,
    required: true
  },
  food: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  restaurant: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  navigate: {
    type: String,
    required: true
  }
});

FavoriteSchema.index({
  userID: 1,
  food: 1,
  brand: 1
}, {
  unique: true,
});

// This creates our model from the above schema, using mongoose's model method
var Favorite = mongoose.model("Favorite", FavoriteSchema);

// Export the Note model
module.exports = Favorite;
