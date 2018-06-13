const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const hbs = require("hbs");
const expressHbs = require("express-handlebars");

const app = express();

app.engine(".hbs", expressHbs({ defaultLayout: "layout", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
app.listen(port, err => {
  if (err) throw err;
  console.log(`Server is running in port ${port}`);
});
