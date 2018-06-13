const router = require("express").Router();

router.route("/").get((req, res, next) => {
  res.render("main/landing");
});

module.exports = router;
