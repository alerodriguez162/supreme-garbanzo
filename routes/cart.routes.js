const router = require("express").Router();
const routeGuards = require("../middlewares/route-guard");

router.get("/", (req, res, next) => {
  res.render("cart/cart");
});

module.exports = router;
