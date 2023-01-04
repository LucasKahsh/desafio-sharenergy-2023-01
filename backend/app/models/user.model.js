const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    picture: Object,
    name:String,
    age: Number,
    fullName:String
  })
);

module.exports = User;