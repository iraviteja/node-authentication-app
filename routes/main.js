const router = require("express").Router();
const User = require("../models/user");

router.route("/").get((req, res, next) => {
  res.render("main/landing");
});

router.route("/");

module.exports = router;
