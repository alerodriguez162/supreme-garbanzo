const router = require("express").Router();
const routeGuards = require("../middlewares/route-guard");
//const controller    = require("./../controllers/")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
