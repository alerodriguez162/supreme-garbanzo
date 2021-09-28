const router = require("express").Router();
const routeGuards = require("../middlewares/route-guard");
const CartController = require("../controllers/cart.controller");

router.get("/", CartController.getCart);
router.post("/add", CartController.addToCart);
router.post("/remove", CartController.removeFromCart);
router.delete("/delete", CartController.clearCart);
module.exports = router;
