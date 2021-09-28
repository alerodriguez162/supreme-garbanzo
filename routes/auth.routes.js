const router = require("express").Router();
const routeGuards = require("../middlewares/route-guard");

const authController = require("../controllers/auth.controller");

router.get("/login", routeGuards.isLoggedOut, authController.getLoginForm);
router.post("/login", authController.postLogin);

router.get("/signup", routeGuards.isLoggedOut, authController.getSignUpForm);
router.post("/signup", authController.postSignUp);

router.get("/forgotpassword", authController.getForgotPasswordForm);
router.post("/forgotpassword", authController.postForgotPassword);

router.post("/logout", authController.logout);

module.exports = router;
