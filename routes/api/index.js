// Dependencies
const router = require("express").Router();
const userRoutes = require("./user");
const favoriteRoutes = require("./favorite");
const nutrRoutes = require("./nutr");

router.use("/user", userRoutes);
router.use("/favorite", favoriteRoutes);
router.use("/nutr", nutrRoutes);

//Exporting
module.exports = router;
