const router = require("express").Router();
const routeGuards = require("../middlewares/route-guard");

router.get("/", (req, res, next) => {
  res.render("plp/plp");
});

module.exports = router;
