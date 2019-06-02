// Importing models
const db = require("../models");

// Defining methods for the userController
module.exports = {
    findByUserId: function (req, res) {
        db.Favorite.find({ userID: req.params.id })
            .then(dbModel => {
                res.json(dbModel)
            })
            .catch(err => res.json(err));
    },
    delete: function (req, res) {
        db.Favorite.findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Favorite.create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err));
    }
    
};