const express = require("express");
const authentication = require("../config/auth");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
//lets create route, which will only be accessible if user is authenticated
router.get("/welcome", authentication, userController.welcome);
module.exports = router;
