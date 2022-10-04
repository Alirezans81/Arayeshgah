const controller = require("../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async dashboard(req, res) {
    res.send("barber dashboard");
  }

  async me(req, res) {
    this.response({
      res,
      data: _.pick(req.user, ["name", "phone", "location"]),
    });
  }

  async signup(req, res) {
    const { phone, id, location, name } = req.body;

    const foundBarberbs = await this.Barbershop.find({ phone: phone });

    if (foundBarberbs.length != 0) {
      this.response({ res, message: "این شماره قبلا ثبت شده است" });
    } else {
      const OTPpass = this.getVarifactionCode();

      if (req.body.pass != OTPpass) {
        this.response({ res, message: "کد احراز هویت صحیح نمی باشد" });
      } else {
        const newBarber = new this.Barbershop({
          phone,
          id,
          location,
          name,
        });

        newBarber.save((err, result) => {
          if (err) {
            this.response({ res, message: err.message });
          }
          else this.response({ res, message: result.message });
        });
      }
    }
  }
})();
