const router = require("express").Router();
const routeGuards = require("../middlewares/route-guard");

router.get("/", routeGuards.isLoggedIn, (req, res, next) => {
  res.render("user/user");
});

module.exports = router;
