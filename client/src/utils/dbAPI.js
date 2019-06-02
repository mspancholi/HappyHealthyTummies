import axios from "axios";

export default {
  // Get all user
  getUsers: function() {
    return axios.get("/api/user");
  },
  // Get specific user by ID
  getUser: function(id) {
    return axios.get("/api/user/" + id);
  },
  // Update user 
  updateUser: function(userData) {
    return axios.put("/api/user/" + userData.userID, userData);
  },
   // Create user
   createUser: function(userData) {
    return axios.post("/api/user", userData);
  },

  // Get favorites for user
  getFavorite: function(userId) {
    return axios.get("/api/favorite/" + userId);
  },
  // Add favorite for user
  addFavorite: function(favoriteData) {
    return axios.post("/api/favorite", favoriteData);
  },
  // Delete favorite for user
  deleteFavorite: function(id) {
    return axios.delete("/api/favorite/" + id);
  }
}