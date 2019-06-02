// Dependencies
const router = require("express").Router();
const nutrController = require("../../controllers/nutrController");

// Matches with "/api/nutr"
router.route("/")

    .post(nutrController.search);



// Exporting
module.exports = router;