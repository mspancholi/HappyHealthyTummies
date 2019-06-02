// Dependencies
const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/user"
router.route("/")

    .get(userController.findAll)
    .post(userController.create);

router.route("/:id")
    .get(userController.findById)
    .put(userController.update);

// Exporting
module.exports = router;