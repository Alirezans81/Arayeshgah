const express = require("express");
const app = express();

const router = require("./src/routes");

require("./startup/config")(app, express);
require("./startup/db")();
require("./startup/logging")();

app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200).json({
    data: null,
    message: "app works!",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
