const router = require("express").Router();
const routeGuards = require("../middlewares/route-guard");
const homeController = require("./../controllers/home.controller");

/* GET home page */
router.get("/", homeController.getHomePage);

module.exports = router;
