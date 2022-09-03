const controller = require("../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = new (class extends controller {
  async register(req, res) {
    let user = await this.User.findOne({ phone: req.body.phone });
    if (user) {
      return this.response({
        res,
        code: 400,
        message: "this user already registered",
      });
    }

    user = await this.Barber.findOne({ phone: req.body.phone });
    if (user) {
      return this.response({
        res,
        code: 400,
        message: "this barber already registered",
      });
    }

    const { role } = _.pick(req.body, ["role"]);
    if (role == "user") {
      user = new this.User(_.pick(req.body, ["name", "phone", "password"]));

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      await user.save();

      this.response({
        res,
        message: "the user successfuly registered",
        data: _.pick(user, ["_id", "name", "phone"]),
      });
    } else {
      user = new this.Barber(
        _.pick(req.body, ["name", "phone", "password", "location"])
      );

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      await user.save();

      this.response({
        res,
        message: "the barber successfuly registered",
        data: _.pick(user, ["_id", "name", "phone", "location"]),
      });
    }
  }

  async login(req, res) {
    let user =
      (await this.User.findOne({ phone: req.body.phone })) ||
      (await this.Barber.findOne({ phone: req.body.phone }));
    if (!user) {
      return this.response({
        res,
        code: 400,
        message: "invaild phone or password",
      });
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return this.response({
        res,
        code: 400,
        message: "invalid phone or password",
      });
    }

    const token = jwt.sign({ _id: user.id }, process.env.JWT_KEY);
    this.response({
      res,
      message: "successfuly logged in",
      data: { token },
    });
  }
})();
