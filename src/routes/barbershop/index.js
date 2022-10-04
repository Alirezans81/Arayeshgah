const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.dashboard);
router.get("/me", controller.me);

router.post("/signup", controller.signup);
router.post("/signin", controller.signin);

module.exports = router;
