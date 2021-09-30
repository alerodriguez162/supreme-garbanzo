const router = require("express").Router();
const routeGuards = require("../middlewares/route-guard");
const pdpController = require("../controllers/pdp.controller");

router.get("/:productId", pdpController.getProductById);

module.exports = router;
