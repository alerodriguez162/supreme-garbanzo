const router = require("express").Router();
const routeGuards = require("../middlewares/route-guard");
const CartController = require("../controllers/cart.controller");

router.get("/", routeGuards.isLoggedIn, CartController.getCart);
router.post("/add", routeGuards.isLoggedIn, CartController.addToCart);
router.post("/remove", routeGuards.isLoggedIn, CartController.removeFromCart);
router.delete("/delete", routeGuards.isLoggedIn, CartController.clearCart);
module.exports = router;
