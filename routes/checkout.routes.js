const router = require("express").Router();
const routeGuards = require("../middlewares/route-guard");
const checkoutController = require("../controllers/checkout.controller");

router.get("/", checkoutController.createCheckout);
router.post("/", checkoutController.submitCheckout);
module.exports = router;
