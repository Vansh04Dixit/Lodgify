const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/user.js");
const wrapAsync = require("../utils/wrapAsync.js");

router.route("/signup").get(userController.renderSignUpForm)
.post(wrapAsync(userController.postUser));

router.route("/login").get(userController.renderLoginForm)
.post(passport.authenticate("local", {failureRedirect: "/login", failureFlash: true,}), userController.loginUser)

router.get("/logout",userController.logOutUser)

module.exports = router;