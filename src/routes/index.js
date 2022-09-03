const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const barberRouter = require("./barber");
const adminRouter = require("./admin");
const { isLoggined, isAdmin } = require("../middlewares/auth");
const error = require("../middlewares/error");

router.use("/auth", authRouter);

router.use("/user", isLoggined, userRouter);
router.use("/barber", isLoggined, barberRouter);
router.use("/admin", isLoggined, isAdmin, adminRouter);

router.use(error);

module.exports = router;
