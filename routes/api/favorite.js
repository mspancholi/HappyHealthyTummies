// Dependencies
const router = require("express").Router();
const favoriteController = require("../../controllers/favoriteController");

// Matches with "/api/favorite"
router.route("/")
    .post(favoriteController.create);

router.route("/:id")
    .get(favoriteController.findByUserId)
    .delete(favoriteController.delete);

// Exporting
module.exports = router;