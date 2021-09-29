const router = require("express").Router();
const routeGuards = require("../middlewares/route-guard");
const checkoutController = require("../controllers/checkout.controller");

router.get("/", routeGuards.isLoggedIn, checkoutController.createCheckout);
router.post("/", routeGuards.isLoggedIn, checkoutController.submitCheckout);
module.exports = router;
