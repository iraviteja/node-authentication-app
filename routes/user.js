const router = require("express").Router();
const User = require("../models/user.js");

router
  .route("/signup")
  .get((req, res, next) => {
    res.render("accounts/signup", { message: req.flash("error") });
  })
  .post((req, res, next) => {
    User.findOne({ email: req.body.email }, (err, existingUser) => {
      if (existingUser) {
        req.flash("error", "Account with that email address already exist");
        res.redirect("/signup");
      } else {
        var user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.photo = user.gravatar();
        user.password = req.body.password;

        user.save(err => {
          if (err) throw err;
          req.flash("error", "Account Successfully Created");
          res.redirect("/signup");
        });
      }
    });
  });

module.exports = router;
