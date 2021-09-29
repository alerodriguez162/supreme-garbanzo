const router = require("express").Router();
const routeGuards = require("../middlewares/route-guard");

router.get("/:productId", (req, res, next) => {
  res.render("pdp/pdp");
});

module.exports = router;
