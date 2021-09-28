const router = require("express").Router();
const routeGuards = require("../middlewares/route-guard");
const plpController = require("../controllers/plp.controller");

router.get("/", plpController.getProducts);

module.exports = router;
