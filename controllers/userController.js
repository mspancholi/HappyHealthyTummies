// Importing models
const db = require("../models");

// Defining methods for the userController
module.exports = {

    findAll: function (req, res) {
        db.User.find()
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err));
    },
    findById: function (req, res) {
        db.User.findOne({ userID: req.params.id })
            .then(dbModel => {
                res.json(dbModel)
            })
            .catch(err => res.json(err));
    },
    update: function (req, res) {
        console.log("Update: " + req.params.id + " " + req.body);
        db.User.findOneAndUpdate({ userID: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err));
    },

    create: function (req, res) {
        db.User.create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err));
    }
    
};