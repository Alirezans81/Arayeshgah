const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const barberRouter = require("./barber");
const adminRouter = require("./admin");
const error = require("../middlewares/error");

router.use("/auth", authRouter);

router.use("/user", userRouter);
router.use("/barber", barberRouter);
router.use("/admin", adminRouter);

router.use(error);

module.exports = router;
