const mongoose = require("mongoose");

module.exports = mongoose.connect(
  "mongodb://localhost/authentication",
  err => {
    if (err) throw err;
    console.log("Database connected");
  }
);
