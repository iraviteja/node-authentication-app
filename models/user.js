const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  photo: {
    type: String
  },
  tweets: [
    {
      tweet: {
        type: Schema.Types.ObjectId,
        ref: "tweet"
      }
    }
  ]
});

userSchema.pre("save", function(next) {
  var user = this;
  if (!user.isModified("password")) return next();
  if (user.password) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) next(err);
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) next(err);
        user.password = hash;
        next(err);
      });
    });
  }
});

userSchema.methods.gravatar = size => {
  if (!size) size = 200;
  if (!this.email) return "https://gravatar.com/avatar/?s=" + size + "&d=retro";
  var md5 = crypto
    .createHash("md5")
    .update(this.email)
    .digest("hex");
  return "https://gravatar.com/avatar/" + md5 + "?s=" + size + "&d=retro";
};

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
