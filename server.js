const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const hbs = require("hbs");
const expressHbs = require("express-handlebars");
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const db = require("./dbconnect.js");

const app = express();

app.engine(".hbs", expressHbs({ defaultLayout: "layout", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "ravi-teja",
    store: new mongoStore({
      url: "mongodb://localhost/authentication",
      autoReconnect: true
    })
  })
);
app.use(flash());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

const mainRoutes = require("./routes/main");
const userRoutes = require("./routes/user");

app.use("/", mainRoutes);
app.use("/", userRoutes);

app.get("/addFlash", function(req, res) {
  req.flash("info", "Flash Message Added");
});

const port = process.env.PORT || 3000;
app.listen(port, err => {
  if (err) throw err;
  console.log(`Server is running in port ${port}`);
});
